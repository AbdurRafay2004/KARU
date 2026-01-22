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
        let products = await ctx.db.query("products").collect();

        // Apply filters
        if (args.category) {
            products = products.filter((p) => p.category === args.category);
        }
        if (args.minPrice !== undefined) {
            products = products.filter((p) => p.price >= args.minPrice!);
        }
        if (args.maxPrice !== undefined) {
            products = products.filter((p) => p.price <= args.maxPrice!);
        }
        if (args.artisanId) {
            products = products.filter((p) => p.artisanId === args.artisanId);
        }

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
