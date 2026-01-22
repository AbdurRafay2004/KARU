import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all artisans
export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("artisans").collect();
    },
});

// Get single artisan by ID
export const get = query({
    args: { id: v.id("artisans") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// Get artisan by slug
export const getBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const artisan = await ctx.db
            .query("artisans")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();

        return artisan;
    },
});

// Get featured artisan
export const featured = query({
    args: {},
    handler: async (ctx) => {
        const artisan = await ctx.db
            .query("artisans")
            .withIndex("by_featured", (q) => q.eq("isFeatured", true))
            .first();

        return artisan;
    },
});
