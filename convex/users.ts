import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

// Get current user
export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const user = await ctx.db.get(userId);
        if (!user) return null;

        // Fetch user profile for role and artisan info
        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        return {
            ...user,
            profile: profile ?? null,
        };
    },
});

// Get user's cart
export const getCart = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const cart = await ctx.db
            .query("cart")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!cart) return { items: [] };

        // Enrich with product details
        const productIds = [...new Set(cart.items.map((item) => item.productId))];
        const products = await Promise.all(productIds.map((id) => ctx.db.get(id)));
        const productsMap = new Map();
        productIds.forEach((id, index) => {
            productsMap.set(id, products[index]);
        });

        const enrichedItems = cart.items.map((item) => {
            const product = productsMap.get(item.productId);
            return {
                ...item,
                product: product ?? null,
            };
        });

        return { ...cart, items: enrichedItems };
    },
});

// Add item to cart
export const addToCart = mutation({
    args: {
        productId: v.id("products"),
        quantity: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const existingCart = await ctx.db
            .query("cart")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (existingCart) {
            // Check if product already in cart
            const existingItem = existingCart.items.find(
                (item) => item.productId === args.productId
            );

            if (existingItem) {
                // Update quantity
                const updatedItems = existingCart.items.map((item) =>
                    item.productId === args.productId
                        ? { ...item, quantity: item.quantity + args.quantity }
                        : item
                );
                await ctx.db.patch(existingCart._id, { items: updatedItems });
            } else {
                // Add new item
                await ctx.db.patch(existingCart._id, {
                    items: [...existingCart.items, { productId: args.productId, quantity: args.quantity }],
                });
            }
        } else {
            // Create new cart
            await ctx.db.insert("cart", {
                userId,
                items: [{ productId: args.productId, quantity: args.quantity }],
            });
        }
    },
});

// Remove item from cart
export const removeFromCart = mutation({
    args: {
        productId: v.id("products"),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const cart = await ctx.db
            .query("cart")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!cart) return;

        const updatedItems = cart.items.filter(
            (item) => item.productId !== args.productId
        );

        await ctx.db.patch(cart._id, { items: updatedItems });
    },
});

// Update item quantity
export const updateCartQuantity = mutation({
    args: {
        productId: v.id("products"),
        quantity: v.number(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const cart = await ctx.db
            .query("cart")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!cart) return;

        const updatedItems = cart.items.map((item) =>
            item.productId === args.productId
                ? { ...item, quantity: args.quantity }
                : item
        );

        await ctx.db.patch(cart._id, { items: updatedItems });
    },
});

// Get cart item count
export const getCartCount = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return 0;

        const cart = await ctx.db
            .query("cart")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!cart) return 0;
        return cart.items.reduce((sum, item) => sum + item.quantity, 0);
    },
});
