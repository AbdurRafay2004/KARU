import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { auth } from "./auth";

// Create a new order from cart
export const createOrder = mutation({
    args: {
        shippingAddress: v.object({
            name: v.string(),
            street: v.string(),
            city: v.string(),
            state: v.string(),
            zip: v.string(),
            country: v.string(),
        }),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        // Get cart
        const cart = await ctx.db
            .query("cart")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .first();

        if (!cart || cart.items.length === 0) {
            throw new Error("Cart is empty");
        }

        // Build order items with product details
        const orderItems = await Promise.all(
            cart.items.map(async (item) => {
                const product = await ctx.db.get(item.productId);
                if (!product) throw new Error("Product not found");
                return {
                    productId: item.productId,
                    productName: product.name,
                    price: product.price,
                    quantity: item.quantity,
                };
            })
        );

        // Calculate total
        const total = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // Add shipping cost (free over $150)
        const shippingCost = total >= 150 ? 0 : 10;
        const finalTotal = total + shippingCost;

        // Create order
        const orderId = await ctx.db.insert("orders", {
            userId,
            items: orderItems,
            total: finalTotal,
            status: "pending",
            shippingAddress: args.shippingAddress,
        });

        // Clear cart
        await ctx.db.delete(cart._id);

        return orderId;
    },
});

// Get all orders for current user
export const getOrders = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const orders = await ctx.db
            .query("orders")
            .withIndex("by_user", (q) => q.eq("userId", userId))
            .order("desc")
            .collect();

        return orders;
    },
});

// Get single order by ID
export const getOrderById = query({
    args: { orderId: v.id("orders") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) return null;

        const order = await ctx.db.get(args.orderId);
        if (!order || order.userId !== userId) return null;

        return order;
    },
});

// Update order status (admin function)
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

        // TODO: Add artisan authorization check
        await ctx.db.patch(args.orderId, { status: args.status });
    },
});
