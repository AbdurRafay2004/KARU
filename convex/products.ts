import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all products with optional filters
export const list = query({
    args: {
        category: v.optional(v.string()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        artisanId: v.optional(v.id("artisans")),
        categories: v.optional(v.array(v.string())),
        artisanNames: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let products: any[] = [];

        // 1. Resolve Artisan Names to IDs
        let filterArtisanIds: string[] = [];
        if (args.artisanId) {
            filterArtisanIds.push(args.artisanId);
        }
        if (args.artisanNames && args.artisanNames.length > 0) {
            const artisans = await Promise.all(
                args.artisanNames.map(name =>
                    ctx.db.query("artisans")
                        .withIndex("by_name", q => q.eq("name", name))
                        .unique()
                )
            );

            artisans.forEach(a => {
                if (a) filterArtisanIds.push(a._id);
            });
        }
        // Remove duplicates
        filterArtisanIds = [...new Set(filterArtisanIds)];

        // 2. Resolve Categories
        let filterCategories: string[] = [];
        if (args.category) {
            filterCategories.push(args.category);
        }
        if (args.categories) {
            filterCategories.push(...args.categories);
        }
        filterCategories = [...new Set(filterCategories)];

        // 3. Fetch Products Strategy
        if (filterArtisanIds.length > 0) {
            // Fetch by Artisan
            const results = await Promise.all(
                filterArtisanIds.map(id =>
                    ctx.db.query("products")
                        .withIndex("by_artisan", q => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            let res: any = q.eq("artisanId", id as any);
                            if (args.minPrice !== undefined) res = res.gte("price", args.minPrice);
                            if (args.maxPrice !== undefined) res = res.lte("price", args.maxPrice);
                            return res;
                        })
                        .collect()
                )
            );
            products = results.flat();

            // Apply Category Filter in memory
            if (filterCategories.length > 0) {
                products = products.filter(p => filterCategories.includes(p.category));
            }

        } else if (filterCategories.length > 0) {
            // Fetch by Category
            const results = await Promise.all(
                filterCategories.map(cat =>
                    ctx.db.query("products")
                        .withIndex("by_category", q => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            let res: any = q.eq("category", cat);
                            if (args.minPrice !== undefined) res = res.gte("price", args.minPrice);
                            if (args.maxPrice !== undefined) res = res.lte("price", args.maxPrice);
                            return res;
                        })
                        .collect()
                )
            );
            products = results.flat();

        } else {
            // No specific filters -> Fetch all (filtered by price)
             const q = ctx.db.query("products");
             if (args.minPrice !== undefined || args.maxPrice !== undefined) {
                 products = await q.withIndex("by_price", q => {
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     let res: any = q;
                     if (args.minPrice !== undefined) res = res.gte("price", args.minPrice);
                     if (args.maxPrice !== undefined) res = res.lte("price", args.maxPrice);
                     return res;
                 }).collect();
             } else {
                 products = await q.collect();
             }
        }

        // Enrich with artisan data
        const uniqueArtisanIds = [...new Set(products.map((p) => p.artisanId))];
        const artisans = await Promise.all(uniqueArtisanIds.map((id) => ctx.db.get(id)));
        const artisansMap = new Map();
        uniqueArtisanIds.forEach((id, index) => {
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
