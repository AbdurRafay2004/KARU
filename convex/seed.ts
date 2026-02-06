import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Create Artisans
    const artisans = [
      {
        name: "Ayesha Rahman",
        slug: "ayesha-crafts",
        bio: "Master weaver from Tangail, dedicated to preserving the art of Jamdani weaving.",
        story: "I learned weaving from my grandmother...",
        location: "Tangail, Bangladesh",
        specialty: "Jamdani Saree",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
        coverImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
        processPhotos: [],
        email: "ayesha@karu.bd",
        social: { instagram: "@ayesha_weaves" }
      },
      {
        name: "Rafiqul Islam",
        slug: "rafiq-pottery",
        bio: "Traditional potter creating sustainable clayware.",
        story: "Clay is in my blood...",
        location: "Comilla, Bangladesh",
        specialty: "Terracotta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        coverImage: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1600&q=80",
        processPhotos: [],
        email: "rafiq@karu.bd",
        social: { facebook: "rafiqpottery" }
      }
    ];

    const artisanIds = [];
    for (const artisan of artisans) {
      const id = await ctx.db.insert("artisans", artisan);
      artisanIds.push(id);
    }

    // 2. Define Products
    const products = [
      {
        name: "Red Jamdani Saree",
        description: "Authentic red Jamdani saree with gold thread work.",
        price: 12000,
        images: ["https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&w=800&q=80"],
        category: "Clothing",
        artisanId: artisanIds[0],
        stock: 5,
        isTrending: true,
        materials: ["Cotton", "Gold Thread"],
        dimensions: "6 yards",
        weight: "500g"
      },
      {
        name: "Terracotta Vase",
        description: "Hand-molded clay vase for home decor.",
        price: 1500,
        images: ["https://images.unsplash.com/photo-1578749556935-ef38ab034c6c?auto=format&fit=crop&w=800&q=80"],
        category: "Home Decor",
        artisanId: artisanIds[1],
        stock: 20,
        isTrending: false,
        materials: ["Clay"],
        dimensions: "12x6 inches",
        weight: "1.2kg"
      },
      {
         name: "Blue Cotton Saree",
         description: "Soft cotton saree for daily wear.",
         price: 2500,
         images: ["https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&w=800&q=80"],
         category: "Clothing",
         artisanId: artisanIds[0],
         stock: 15,
         materials: ["Cotton"],
      }
    ];

    // Add more dummy products to make the loop interesting
    for(let i=0; i<15; i++) {
        products.push({
            name: `Handicraft Product ${i}`,
            description: `Description for product ${i}`,
            price: 1000 + i * 100,
            images: ["https://example.com/image.jpg"],
            category: "Clothing",
            artisanId: artisanIds[0],
            stock: 10,
            materials: ["Cotton"],
        });
    }

    // 3. Insert Products (Optimized)
    await Promise.all(products.map((product) => ctx.db.insert("products", product)));

    return { success: true, count: products.length };
  },
});
