import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

// Get artisan dashboard stats
export const getDashboardStats = query({
    args: { artisanId: v.id("artisans") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        // Get products by artisan
        const products = await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", args.artisanId))
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

// Get products by artisan
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

// Get orders containing artisan's products
export const getArtisanOrders = query({
    args: { artisanId: v.id("artisans") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        // Get artisan's products
        const products = await ctx.db
            .query("products")
            .withIndex("by_artisan", (q) => q.eq("artisanId", args.artisanId))
            .collect();

        const productIds = new Set(products.map((p) => p._id));

        // Get all orders
        const allOrders = await ctx.db.query("orders").order("desc").collect();

        // Filter and enrich orders
        return allOrders
            .filter((order) =>
                order.items.some((item) => productIds.has(item.productId))
            )
            .map((order) => ({
                ...order,
                // Only include items from this artisan
                relevantItems: order.items.filter((item) =>
                    productIds.has(item.productId)
                ),
            }));
    },
});

// Add new product
export const addProduct = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        price: v.number(),
        images: v.array(v.string()),
        category: v.string(),
        artisanId: v.id("artisans"),
        stock: v.number(),
        materials: v.optional(v.array(v.string())),
        dimensions: v.optional(v.string()),
        weight: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        return await ctx.db.insert("products", {
            ...args,
            isTrending: false,
        });
    },
});

// Update product
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
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const { productId, ...updates } = args;
        // Filter out undefined values
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([, v]) => v !== undefined)
        );

        await ctx.db.patch(productId, filteredUpdates);
    },
});

// Delete product
export const deleteProduct = mutation({
    args: { productId: v.id("products") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        await ctx.db.delete(args.productId);
    },
});

// Get all artisans (for selection)
export const getAllArtisans = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("artisans").collect();
    },
});
