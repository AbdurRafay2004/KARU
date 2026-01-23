import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

/**
 * Get the current user's profile (role, artisanId, etc.)
 */
export const getProfile = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        return profile;
    },
});

/**
 * Create or update user profile
 * Called after signup to initialize profile
 */
export const ensureProfile = mutation({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const existing = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (existing) return existing._id;

        // Create default profile with "user" role
        return await ctx.db.insert("userProfiles", {
            userId,
            role: "user",
        });
    },
});

/**
 * Get full user data with profile merged
 */
export const getCurrentUserWithProfile = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const user = await ctx.db.get(userId);
        if (!user) return null;

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        // If user is an artisan, fetch artisan details
        let artisan = null;
        if (profile?.artisanId) {
            artisan = await ctx.db.get(profile.artisanId);
        }

        return {
            ...user,
            profile: profile ?? { role: "user" as const },
            artisan,
        };
    },
});

/**
 * Link current user to an artisan (admin only or self-onboarding)
 */
export const linkToArtisan = mutation({
    args: {
        artisanId: v.id("artisans"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (profile) {
            await ctx.db.patch(profile._id, {
                artisanId: args.artisanId,
                role: "artisan",
            });
        } else {
            await ctx.db.insert("userProfiles", {
                userId,
                role: "artisan",
                artisanId: args.artisanId,
            });
        }

        // Also update the artisan record to link back to user
        await ctx.db.patch(args.artisanId, { userId });
    },
});

/**
 * Check if current user is an artisan with a shop
 */
export const isArtisan = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return false;

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        return !!profile?.artisanId;
    },
});

/**
 * Get my artisan data (for dashboard)
 */
export const getMyArtisan = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!profile?.artisanId) return null;

        return await ctx.db.get(profile.artisanId);
    },
});

/**
 * Register as an artisan (self-onboarding)
 * Creates artisan record and links to user profile
 */
export const registerArtisan = mutation({
    args: {
        name: v.string(),
        specialty: v.string(),
        bio: v.string(),
        story: v.string(),
        location: v.string(),
        email: v.string(),
        website: v.optional(v.string()),
        instagram: v.optional(v.string()),
        facebook: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        // Check if already an artisan
        const existingProfile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (existingProfile?.artisanId) {
            throw new Error("You already have an artisan shop");
        }

        // Generate a slug from the shop name
        const baseSlug = args.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        // Check for slug uniqueness and append number if needed
        let slug = baseSlug;
        let counter = 1;
        while (true) {
            const existing = await ctx.db
                .query("artisans")
                .withIndex("by_slug", (q) => q.eq("slug", slug))
                .first();
            if (!existing) break;
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        // Create the artisan record
        const artisanId = await ctx.db.insert("artisans", {
            name: args.name,
            slug,
            bio: args.bio,
            story: args.story,
            location: args.location,
            specialty: args.specialty,
            email: args.email,
            website: args.website,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop", // Default avatar
            coverImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=400&fit=crop", // Default cover
            processPhotos: [],
            social: {
                instagram: args.instagram,
                facebook: args.facebook,
            },
            isFeatured: false,
            userId, // Link to user
        });

        // Create or update user profile
        if (existingProfile) {
            await ctx.db.patch(existingProfile._id, {
                artisanId,
                role: "artisan",
            });
        } else {
            await ctx.db.insert("userProfiles", {
                userId,
                role: "artisan",
                artisanId,
            });
        }

        return artisanId;
    },
});
