import { query } from "./_generated/server";
import type { QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";

// Helper to enrich products with artisan data
async function enrichProducts(ctx: QueryCtx, products: Doc<"products">[]) {
    const artisanIds = [...new Set(products.map((p) => p.artisanId))];
    const artisans = await Promise.all(artisanIds.map((id) => ctx.db.get(id)));
    const artisansMap = new Map();
    artisanIds.forEach((id, index) => {
        artisansMap.set(id, artisans[index]);
    });

    return products.map((product) => {
        const artisan = artisansMap.get(product.artisanId);
        return {
            ...product,
            artisan: artisan ? { name: artisan.name, slug: artisan.slug } : null,
        };
    });
}

// Get all products with optional filters
export const list = query({
    args: {
        category: v.optional(v.string()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        artisanId: v.optional(v.id("artisans")),
    },
    handler: async (ctx, args) => {
        let productsQuery;

        if (args.artisanId) {
            productsQuery = ctx.db
                .query("products")
                .withIndex("by_artisan", (q) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    let res: any = q.eq("artisanId", args.artisanId!);
                    if (args.minPrice !== undefined) {
                        res = res.gte("price", args.minPrice);
                    }
                    if (args.maxPrice !== undefined) {
                        res = res.lte("price", args.maxPrice);
                    }
                    return res;
                });

            if (args.category) {
                productsQuery = productsQuery.filter((q) =>
                    q.eq(q.field("category"), args.category)
                );
            }
        } else if (args.category) {
            productsQuery = ctx.db
                .query("products")
                .withIndex("by_category", (q) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    let res: any = q.eq("category", args.category!);
                    if (args.minPrice !== undefined) {
                        res = res.gte("price", args.minPrice);
                    }
                    if (args.maxPrice !== undefined) {
                        res = res.lte("price", args.maxPrice);
                    }
                    return res;
                });
        } else if (args.minPrice !== undefined || args.maxPrice !== undefined) {
            productsQuery = ctx.db
                .query("products")
                .withIndex("by_price", (q) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    let res: any = q;
                    if (args.minPrice !== undefined) {
                        res = res.gte("price", args.minPrice);
                    }
                    if (args.maxPrice !== undefined) {
                        res = res.lte("price", args.maxPrice);
                    }
                    return res;
                });
        } else {
            productsQuery = ctx.db.query("products");
        }

        const products = await productsQuery.collect();
        return await enrichProducts(ctx, products);
    },
});

// Get single product by ID
export const get = query({
    args: { id: v.id("products") },
    handler: async (ctx, args) => {
        const product = await ctx.db.get(args.id);
        if (!product) return null;

        const artisan = await ctx.db.get(product.artisanId);
        return {
            ...product,
            artisan,
        };
    },
});

// Get products by artisan
export const byArtisan = query({
    args: { artisanId: v.id("artisans") },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", args.artisanId))
            .collect();

        return products;
    },
});

// Get trending products
export const trending = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db
            .query("products")
            .withIndex("by_trending", (q) => q.eq("isTrending", true))
            .collect();

        return await enrichProducts(ctx, products);
    },
});

// Search products
export const search = query({
    args: { query: v.string() },
    handler: async (ctx, args) => {
        const products = await ctx.db
            .query("products")
            .withSearchIndex("search_body", (q) => q.search("name", args.query))
            .take(20);

        return await enrichProducts(ctx, products);
    },
});
