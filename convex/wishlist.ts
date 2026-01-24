import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

// Get user's wishlist with enriched product details
export const getWishlist = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const wishlist = await ctx.db
            .query("wishlist")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!wishlist) return { productIds: [], products: [] };

        // Enrich with product details
        const fetchedProducts = await Promise.all(
            wishlist.productIds.map((productId) => ctx.db.get(productId))
        );

        // Filter out any null products (deleted items)
        const validProducts = fetchedProducts.filter((p) => p !== null);

        // Enrich with artisan info
        const artisanIds = [...new Set(validProducts.map((p) => p.artisanId))];
        const artisans = await Promise.all(artisanIds.map((id) => ctx.db.get(id)));
        const artisansMap = new Map();
        artisanIds.forEach((id, index) => {
            artisansMap.set(id, artisans[index]);
        });

        const products = validProducts.map((product) => {
            const artisan = artisansMap.get(product.artisanId);
            return {
                ...product,
                artisan,
            };
        });

        return {
            productIds: wishlist.productIds,
            products,
        };
    },
});

// Get wishlist count for header badge
export const getWishlistCount = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return 0;

        const wishlist = await ctx.db
            .query("wishlist")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!wishlist) return 0;
        return wishlist.productIds.length;
    },
});

// Check if a product is in the wishlist
export const isInWishlist = query({
    args: {
        productId: v.id("products"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return false;

        const wishlist = await ctx.db
            .query("wishlist")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!wishlist) return false;
        return wishlist.productIds.includes(args.productId);
    },
});

// Add product to wishlist (idempotent)
export const addToWishlist = mutation({
    args: {
        productId: v.id("products"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const existingWishlist = await ctx.db
            .query("wishlist")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (existingWishlist) {
            // Check if product already in wishlist
            if (!existingWishlist.productIds.includes(args.productId)) {
                await ctx.db.patch(existingWishlist._id, {
                    productIds: [...existingWishlist.productIds, args.productId],
                });
            }
        } else {
            // Create new wishlist
            await ctx.db.insert("wishlist", {
                userId,
                productIds: [args.productId],
            });
        }
    },
});

// Remove product from wishlist
export const removeFromWishlist = mutation({
    args: {
        productId: v.id("products"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const wishlist = await ctx.db
            .query("wishlist")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!wishlist) return;

        const updatedProductIds = wishlist.productIds.filter(
            (id) => id !== args.productId
        );

        await ctx.db.patch(wishlist._id, { productIds: updatedProductIds });
    },
});

// Toggle product in/out of wishlist (convenience method)
export const toggleWishlist = mutation({
    args: {
        productId: v.id("products"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const wishlist = await ctx.db
            .query("wishlist")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (wishlist) {
            const isInList = wishlist.productIds.includes(args.productId);
            if (isInList) {
                // Remove from wishlist
                const updatedProductIds = wishlist.productIds.filter(
                    (id) => id !== args.productId
                );
                await ctx.db.patch(wishlist._id, { productIds: updatedProductIds });
            } else {
                // Add to wishlist
                await ctx.db.patch(wishlist._id, {
                    productIds: [...wishlist.productIds, args.productId],
                });
            }
        } else {
            // Create new wishlist with this product
            await ctx.db.insert("wishlist", {
                userId,
                productIds: [args.productId],
            });
        }
    },
});
