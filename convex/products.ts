import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all products with optional filters
export const list = query({
    args: {
        category: v.optional(v.string()),
        categories: v.optional(v.array(v.string())),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        artisanId: v.optional(v.id("artisans")),
        artisanNames: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        // Resolve artisan names to IDs if provided
        let targetArtisanIds = null;
        if (args.artisanNames && args.artisanNames.length > 0) {
            const artisans = await ctx.db.query("artisans")
                .filter((q) =>
                    q.or(...args.artisanNames!.map(name => q.eq(q.field("name"), name)))
                )
                .collect();
            targetArtisanIds = artisans.map(a => a._id);
        }

        const products = await ctx.db.query("products")
            .filter((q) => {
                const filters = [];

                // Category filter
                if (args.categories && args.categories.length > 0) {
                    filters.push(
                        q.or(...args.categories.map(c => q.eq(q.field("category"), c)))
                    );
                } else if (args.category) {
                    filters.push(q.eq(q.field("category"), args.category));
                }

                // Price filter
                if (args.minPrice !== undefined) {
                    filters.push(q.gte(q.field("price"), args.minPrice));
                }
                if (args.maxPrice !== undefined) {
                    filters.push(q.lte(q.field("price"), args.maxPrice));
                }

                // Artisan filter
                if (targetArtisanIds !== null) {
                    if (targetArtisanIds.length === 0) {
                        return false;
                    }
                    filters.push(
                        q.or(...targetArtisanIds.map(id => q.eq(q.field("artisanId"), id)))
                    );
                } else if (args.artisanId) {
                    filters.push(q.eq(q.field("artisanId"), args.artisanId));
                }

                return filters.length > 0 ? q.and(...filters) : q.eq(true, true);
            })
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
