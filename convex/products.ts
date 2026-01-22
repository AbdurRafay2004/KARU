import { query } from "./_generated/server";
import { v } from "convex/values";

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

        // Enrich with artisan data
        const enrichedProducts = await Promise.all(
            products.map(async (product) => {
                const artisan = await ctx.db.get(product.artisanId);
                return {
                    ...product,
                    artisan: artisan ? { name: artisan.name, slug: artisan.slug } : null,
                };
            })
        );

        return enrichedProducts;
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

        // Enrich with artisan data
        const enrichedProducts = await Promise.all(
            products.map(async (product) => {
                const artisan = await ctx.db.get(product.artisanId);
                return {
                    ...product,
                    artisan: artisan ? { name: artisan.name, slug: artisan.slug } : null,
                };
            })
        );

        return enrichedProducts;
    },
});
