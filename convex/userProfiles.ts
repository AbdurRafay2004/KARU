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
        avatarUrl: v.optional(v.string()),
        coverImageUrl: v.optional(v.string()),
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
            avatar: args.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
            coverImage: args.coverImageUrl || "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=400&fit=crop",
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

/**
 * Update current user's profile (displayName, avatar)
 */
export const updateProfile = mutation({
    args: {
        displayName: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const existingProfile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        // Filter out undefined values
        const updates: Record<string, string> = {};
        if (args.displayName !== undefined) updates.displayName = args.displayName;
        if (args.avatarUrl !== undefined) updates.avatarUrl = args.avatarUrl;

        if (existingProfile) {
            await ctx.db.patch(existingProfile._id, updates);
            return existingProfile._id;
        } else {
            // Create profile if it doesn't exist
            return await ctx.db.insert("userProfiles", {
                userId,
                role: "user",
                ...updates,
            });
        }
    },
});

/**
 * Update current user's artisan shop profile
 * Only accessible by users who are artisans
 */
export const updateArtisanProfile = mutation({
    args: {
        name: v.optional(v.string()),
        bio: v.optional(v.string()),
        story: v.optional(v.string()),
        location: v.optional(v.string()),
        specialty: v.optional(v.string()),
        email: v.optional(v.string()),
        website: v.optional(v.string()),
        avatarUrl: v.optional(v.string()),
        coverImageUrl: v.optional(v.string()),
        instagram: v.optional(v.string()),
        facebook: v.optional(v.string()),
        twitter: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!profile?.artisanId) {
            throw new Error("You are not an artisan");
        }

        // Build updates object, filtering out undefined values
        const updates: Record<string, unknown> = {};
        if (args.name !== undefined) updates.name = args.name;
        if (args.bio !== undefined) updates.bio = args.bio;
        if (args.story !== undefined) updates.story = args.story;
        if (args.location !== undefined) updates.location = args.location;
        if (args.specialty !== undefined) updates.specialty = args.specialty;
        if (args.email !== undefined) updates.email = args.email;
        if (args.website !== undefined) updates.website = args.website;
        if (args.avatarUrl !== undefined) updates.avatar = args.avatarUrl;
        if (args.coverImageUrl !== undefined) updates.coverImage = args.coverImageUrl;

        // Handle social links
        if (args.instagram !== undefined || args.facebook !== undefined || args.twitter !== undefined) {
            const artisan = await ctx.db.get(profile.artisanId);
            if (artisan) {
                updates.social = {
                    instagram: args.instagram ?? artisan.social?.instagram,
                    facebook: args.facebook ?? artisan.social?.facebook,
                    twitter: args.twitter ?? artisan.social?.twitter,
                };
            }
        }

        await ctx.db.patch(profile.artisanId, updates);
        return profile.artisanId;
    },
});
