import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";
import type { Id } from "./_generated/dataModel";

/**
 * Helper: Get current user's artisan profile
 * Returns artisanId if user is a linked artisan, throws otherwise
 */
async function getMyArtisanId(ctx: any): Promise<Id<"artisans">> {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const profile = await ctx.db
        .query("userProfiles")
        .withIndex("by_user", (q: any) => q.eq("userId", userId))
        .first();

    if (!profile?.artisanId) {
        throw new Error("Not an artisan - you need to register as a seller first");
    }

    return profile.artisanId;
}

/**
 * Helper: Verify user owns this product
 */
async function verifyProductOwnership(ctx: any, productId: Id<"products">): Promise<void> {
    const myArtisanId = await getMyArtisanId(ctx);
    const product = await ctx.db.get(productId);

    if (!product) throw new Error("Product not found");
    if (product.artisanId !== myArtisanId) {
        throw new Error("You don't have permission to modify this product");
    }
}

// Get artisan dashboard stats - uses authenticated user's artisan
export const getDashboardStats = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        // Get user's artisan profile
        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!profile?.artisanId) return null;

        const artisanId = profile.artisanId;

        // Get products by artisan
        const products = await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", artisanId))
            .collect();

        // Get all orders
        const allOrders = await ctx.db.query("orders").collect();

        // Filter orders that contain this artisan's products
        const productIds = new Set(products.map((p) => p._id));
        const artisanOrders = allOrders.filter((order) =>
            order.items.some((item) => productIds.has(item.productId))
        );

        // Calculate total sales
        const totalSales = artisanOrders.reduce((sum, order) => {
            const artisanItems = order.items.filter((item) =>
                productIds.has(item.productId)
            );
            return (
                sum +
                artisanItems.reduce(
                    (itemSum, item) => itemSum + item.price * item.quantity,
                    0
                )
            );
        }, 0);

        const pendingOrders = artisanOrders.filter(
            (o) => o.status === "pending" || o.status === "processing"
        ).length;

        return {
            productCount: products.length,
            orderCount: artisanOrders.length,
            pendingOrders,
            totalSales,
        };
    },
});

// Get my products (for artisan dashboard)
export const getMyProducts = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!profile?.artisanId) return null;

        const artisanId = profile.artisanId;

        return await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", artisanId))
            .collect();
    },
});

// Get orders containing my products
export const getMyOrders = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!profile?.artisanId) return null;

        const artisanId = profile.artisanId;

        // Get my products
        const products = await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", artisanId))
            .collect();

        const productIds = new Set(products.map((p) => p._id));

        // Get all orders
        const allOrders = await ctx.db.query("orders").order("desc").collect();

        // Filter and enrich orders with customer information
        const enrichedOrders = await Promise.all(
            allOrders
                .filter((order) =>
                    order.items.some((item) => productIds.has(item.productId))
                )
                .map(async (order) => {
                    // Fetch customer/user information
                    const customer = await ctx.db.get(order.userId);

                    return {
                        ...order,
                        customerName: order.shippingAddress?.name || customer?.name || "Unknown Customer",
                        // Only include items from this artisan
                        relevantItems: order.items.filter((item) =>
                            productIds.has(item.productId)
                        ),
                    };
                })
        );

        return enrichedOrders;
    },
});

// Add new product - artisanId derived from auth
export const addProduct = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        price: v.number(),
        images: v.array(v.string()),
        category: v.string(),
        stock: v.number(),
        materials: v.optional(v.array(v.string())),
        dimensions: v.optional(v.string()),
        weight: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const artisanId = await getMyArtisanId(ctx);

        return await ctx.db.insert("products", {
            ...args,
            artisanId,
            isTrending: false,
        });
    },
});

// Update product - verifies ownership
export const updateProduct = mutation({
    args: {
        productId: v.id("products"),
        name: v.optional(v.string()),
        description: v.optional(v.string()),
        price: v.optional(v.number()),
        images: v.optional(v.array(v.string())),
        category: v.optional(v.string()),
        stock: v.optional(v.number()),
        materials: v.optional(v.array(v.string())),
        dimensions: v.optional(v.string()),
        weight: v.optional(v.string()),
        isTrending: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        // Verify user owns this product
        await verifyProductOwnership(ctx, args.productId);

        const { productId, ...updates } = args;
        // Filter out undefined values
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([, v]) => v !== undefined)
        );

        await ctx.db.patch(productId, filteredUpdates);
    },
});

// Delete product - verifies ownership
export const deleteProduct = mutation({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        // Verify user owns this product
        await verifyProductOwnership(ctx, args.productId);

        await ctx.db.delete(args.productId);
    },
});

// Update order status - for artisan dashboard
export const updateOrderStatus = mutation({
    args: {
        orderId: v.id("orders"),
        status: v.union(
            v.literal("pending"),
            v.literal("processing"),
            v.literal("shipped"),
            v.literal("delivered"),
            v.literal("cancelled")
        ),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const profile = await ctx.db
            .query("userProfiles")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!profile?.artisanId) {
            throw new Error("Not an artisan");
        }

        const artisanId = profile.artisanId;

        // Verify order contains products from this artisan
        const order = await ctx.db.get(args.orderId);
        if (!order) throw new Error("Order not found");

        const myProducts = await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", artisanId))
            .collect();

        const myProductIds = new Set(myProducts.map((p) => p._id));
        const hasMyProducts = order.items.some((item) =>
            myProductIds.has(item.productId)
        );

        if (!hasMyProducts) {
            throw new Error("You don't have permission to update this order");
        }

        await ctx.db.patch(args.orderId, { status: args.status });
    },
});

// Get all artisans (for admin or public listing)
export const getAllArtisans = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("artisans").collect();
    },
});

// ============================================
// LEGACY: Keep old queries for backward compatibility during migration
// These accept artisanId as argument - will be removed after full migration
// ============================================

export const getArtisanProducts = query({
    args: { artisanId: v.id("artisans") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        return await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", args.artisanId))
            .collect();
    },
});

export const getArtisanOrders = query({
    args: { artisanId: v.id("artisans") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const products = await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", args.artisanId))
            .collect();

        const productIds = new Set(products.map((p) => p._id));
        const allOrders = await ctx.db.query("orders").order("desc").collect();

        return allOrders
            .filter((order) =>
                order.items.some((item) => productIds.has(item.productId))
            )
            .map((order) => ({
                ...order,
                relevantItems: order.items.filter((item) =>
                    productIds.has(item.productId)
                ),
            }));
    },
});
