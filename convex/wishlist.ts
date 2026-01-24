import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import { getArtisansMap } from "./products";

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

        // Enrich with product details and artisan info
        const productsRaw = await Promise.all(
            wishlist.productIds.map((id) => ctx.db.get(id))
        );
        const products = productsRaw.filter((p) => p !== null);

        const artisansMap = await getArtisansMap(ctx, products);

        const validProducts = products.map((product) => {
            const artisan = artisansMap.get(product.artisanId);
            return {
                ...product,
                artisan: artisan ?? null,
            };
        });

        return {
            productIds: wishlist.productIds,
            products: validProducts,
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
