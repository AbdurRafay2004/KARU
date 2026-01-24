import { query } from "./_generated/server";
import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";

// Get all products with optional filters
export const list = query({
    args: {
        category: v.optional(v.string()), // Deprecated, use categories
        categories: v.optional(v.array(v.string())),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        artisanId: v.optional(v.id("artisans")), // Deprecated, use artisanIds
        artisanIds: v.optional(v.array(v.id("artisans"))),
    },
    handler: async (ctx, args) => {
        const categories = args.categories || (args.category ? [args.category] : []);
        const artisanIds = args.artisanIds || (args.artisanId ? [args.artisanId] : []);

        let products: Doc<"products">[] = [];

        if (artisanIds.length > 0) {
            // Fetch by artisans
            const results = await Promise.all(
                artisanIds.map((id) =>
                    ctx.db
                        .query("products")
                        .withIndex("by_artisan", (q) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            let res: any = q.eq("artisanId", id);
                            if (args.minPrice !== undefined) {
                                res = res.gte("price", args.minPrice);
                            }
                            if (args.maxPrice !== undefined) {
                                res = res.lte("price", args.maxPrice);
                            }
                            return res;
                        })
                        .collect()
                )
            );
            products = results.flat();

            // Filter by category if needed (in memory intersection)
            if (categories.length > 0) {
                products = products.filter((p) => categories.includes(p.category));
            }
        } else if (categories.length > 0) {
            // Fetch by categories
            const results = await Promise.all(
                categories.map((cat) =>
                    ctx.db
                        .query("products")
                        .withIndex("by_category", (q) => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            let res: any = q.eq("category", cat);
                            if (args.minPrice !== undefined) {
                                res = res.gte("price", args.minPrice);
                            }
                            if (args.maxPrice !== undefined) {
                                res = res.lte("price", args.maxPrice);
                            }
                            return res;
                        })
                        .collect()
                )
            );
            products = results.flat();
        } else if (args.minPrice !== undefined || args.maxPrice !== undefined) {
            products = await ctx.db
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
                })
                .collect();
        } else {
            products = await ctx.db.query("products").collect();
        }

        // Enrich with artisan data
        // Optimization: Deduplicate artisan IDs
        const uniqueArtisanIds = [...new Set(products.map((p) => p.artisanId))];

        // Batch fetch artisans
        const artisans = await Promise.all(uniqueArtisanIds.map((id) => ctx.db.get(id)));
        const artisansMap = new Map();
        uniqueArtisanIds.forEach((id, index) => {
            if (artisans[index]) {
                artisansMap.set(id, artisans[index]);
            }
        });

        const enrichedProducts = products.map((product) => {
            const artisan = artisansMap.get(product.artisanId);
            return {
                ...product,
                artisan: artisan ? { name: artisan.name, slug: artisan.slug } : null,
            };
        });

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
        const artisanIds = [...new Set(products.map((p) => p.artisanId))];
        const artisans = await Promise.all(artisanIds.map((id) => ctx.db.get(id)));
        const artisansMap = new Map();
        artisanIds.forEach((id, index) => {
            artisansMap.set(id, artisans[index]);
        });

        const enrichedProducts = products.map((product) => {
            const artisan = artisansMap.get(product.artisanId);
            return {
                ...product,
                artisan: artisan ? { name: artisan.name, slug: artisan.slug } : null,
            };
        });

        return enrichedProducts;
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

        // Enrich with artisan data
        const artisanIds = [...new Set(products.map((p) => p.artisanId))];
        const artisans = await Promise.all(artisanIds.map((id) => ctx.db.get(id)));
        const artisansMap = new Map();
        artisanIds.forEach((id, index) => {
            artisansMap.set(id, artisans[index]);
        });

        const enrichedProducts = products.map((product) => {
            const artisan = artisansMap.get(product.artisanId);
            return {
                ...product,
                artisan: artisan ? { name: artisan.name, slug: artisan.slug } : null,
            };
        });

        return enrichedProducts;
    },
});
