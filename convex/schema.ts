import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,

    // Products table
    products: defineTable({
        name: v.string(),
        description: v.string(),
        price: v.number(),
        images: v.array(v.string()),
        category: v.string(),
        artisanId: v.id("artisans"),
        stock: v.number(),
        isTrending: v.optional(v.boolean()),
        materials: v.optional(v.array(v.string())),
        dimensions: v.optional(v.string()),
        weight: v.optional(v.string()),
    }).index("by_artisan", ["artisanId", "price"])
        .index("by_category", ["category", "price"])
        .index("by_trending", ["isTrending"])
        .index("by_price", ["price"]),

    // Artisans table
    artisans: defineTable({
        name: v.string(),
        slug: v.string(),
        bio: v.string(),
        story: v.string(),
        location: v.string(),
        specialty: v.string(),
        avatar: v.string(),
        coverImage: v.string(),
        processPhotos: v.array(v.string()),
        email: v.string(),
        website: v.optional(v.string()),
        social: v.object({
            instagram: v.optional(v.string()),
            facebook: v.optional(v.string()),
            twitter: v.optional(v.string()),
        }),
        isFeatured: v.optional(v.boolean()),
    }).index("by_slug", ["slug"])
        .index("by_featured", ["isFeatured"]),

    // Categories table
    categories: defineTable({
        name: v.string(),
        slug: v.string(),
        description: v.string(),
        image: v.string(),
    }).index("by_slug", ["slug"]),

    // Cart table - now linked to auth users
    cart: defineTable({
        userId: v.id("users"),
        items: v.array(
            v.object({
                productId: v.id("products"),
                quantity: v.number(),
            })
        ),
    }).index("by_user", ["userId"]),

    // Orders table
    orders: defineTable({
        userId: v.id("users"),
        items: v.array(
            v.object({
                productId: v.id("products"),
                productName: v.string(),
                price: v.number(),
                quantity: v.number(),
            })
        ),
        total: v.number(),
        status: v.union(
            v.literal("pending"),
            v.literal("processing"),
            v.literal("shipped"),
            v.literal("delivered"),
            v.literal("cancelled")
        ),
        shippingAddress: v.object({
            name: v.string(),
            street: v.string(),
            city: v.string(),
            state: v.string(),
            zip: v.string(),
            country: v.string(),
        }),
    }).index("by_user", ["userId"])
        .index("by_status", ["status"]),
});
