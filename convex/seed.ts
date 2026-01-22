import { mutation } from "./_generated/server";

// Seed the database with initial data
export const seedDatabase = mutation({
    args: {},
    handler: async (ctx) => {
        // Check if data already exists
        const existingArtisans = await ctx.db.query("artisans").collect();
        if (existingArtisans.length > 0) {
            return { message: "Database already seeded" };
        }

        // Seed Categories
        const categories = [
            {
                name: "Home Decor",
                slug: "home-decor",
                description: "Handcrafted items to beautify your living space",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500",
            },
            {
                name: "Jewelry",
                slug: "jewelry",
                description: "Unique handmade jewelry pieces",
                image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
            },
            {
                name: "Textiles",
                slug: "textiles",
                description: "Woven fabrics and textile art",
                image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
            },
            {
                name: "Pottery",
                slug: "pottery",
                description: "Handcrafted ceramic and pottery items",
                image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",
            },
            {
                name: "Woodwork",
                slug: "woodwork",
                description: "Carved and crafted wooden pieces",
                image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500",
            },
        ];

        await Promise.all(
            categories.map((category) => ctx.db.insert("categories", category))
        );

        // Seed Artisans
        const elenaId = await ctx.db.insert("artisans", {
            name: "Elena Rossi",
            slug: "elena-rossi",
            bio: "Master weaver with 15+ years of experience creating sustainable, handcrafted textiles using traditional techniques passed down through generations.",
            story: `I discovered my passion for weaving at the age of 12, learning from my grandmother in our small village. What started as a childhood fascination became my life's work.

Today, I work with natural fibers sourced from local farmers, creating pieces that tell stories of our heritage. Each thread is carefully selected, each pattern thoughtfully designed to honor both tradition and contemporary aesthetics.

My workshop employs 8 local artisans, all women from my community. Together, we're preserving ancient techniques while creating sustainable livelihoods. Every piece that leaves our studio carries the warmth of our hands and the pride of our craft.`,
            location: "Dhaka, Bangladesh",
            specialty: "Handwoven Textiles & Baskets",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            coverImage: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200",
            processPhotos: [
                "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600",
                "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600",
                "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600",
                "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600",
            ],
            email: "elena@karumarketplace.com",
            website: "https://elenarossi-weaves.com",
            social: {
                instagram: "@elenarossi_weaves",
                facebook: "ElenaRossiTextiles",
            },
            isFeatured: true,
        });

        const mariaId = await ctx.db.insert("artisans", {
            name: "Maria Santos",
            slug: "maria-santos",
            bio: "Ceramic artist specializing in hand-thrown pottery with organic glazes and earthy tones.",
            story: "My journey with clay began 20 years ago. Each piece I create is a meditation, a connection between earth and spirit.",
            location: "Chittagong, Bangladesh",
            specialty: "Ceramic Pottery",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            coverImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200",
            processPhotos: [
                "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600",
                "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
            ],
            email: "maria@karumarketplace.com",
            social: {
                instagram: "@mariasantos_pottery",
            },
            isFeatured: false,
        });

        const aishaId = await ctx.db.insert("artisans", {
            name: "Aisha Khan",
            slug: "aisha-khan",
            bio: "Jewelry designer creating contemporary pieces inspired by traditional Bangladeshi motifs.",
            story: "I blend ancient metalworking techniques with modern design sensibilities to create jewelry that tells a story.",
            location: "Sylhet, Bangladesh",
            specialty: "Handcrafted Jewelry",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
            coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200",
            processPhotos: [
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
                "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
            ],
            email: "aisha@karumarketplace.com",
            social: {
                instagram: "@aishakhan_jewelry",
                facebook: "AishaKhanDesigns",
            },
            isFeatured: false,
        });

        const jamesId = await ctx.db.insert("artisans", {
            name: "James Chen",
            slug: "james-chen",
            bio: "Woodworker and sculptor creating functional art from reclaimed and sustainable wood.",
            story: "Every piece of wood has a story. I listen to the grain, honor the tree, and create pieces that will last generations.",
            location: "Dhaka, Bangladesh",
            specialty: "Woodwork & Sculpture",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200",
            processPhotos: [
                "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600",
                "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600",
            ],
            email: "james@karumarketplace.com",
            website: "https://jameschen-wood.com",
            social: {
                instagram: "@jameschen_woodwork",
            },
            isFeatured: false,
        });

        // Seed Products
        const products = [
            {
                name: "Handwoven Basket",
                description: "Beautiful handwoven basket made from natural jute fibers. Perfect for storage or as a decorative piece.",
                price: 45,
                images: [
                    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500",
                    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&sat=-100",
                ],
                category: "Home Decor",
                artisanId: elenaId,
                stock: 12,
                isTrending: true,
                materials: ["Jute", "Cotton"],
                dimensions: "12\" x 12\" x 8\"",
            },
            {
                name: "Ceramic Bowl Set",
                description: "Set of 4 hand-thrown ceramic bowls with organic glaze finish.",
                price: 89,
                images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500"],
                category: "Pottery",
                artisanId: mariaId,
                stock: 8,
                isTrending: true,
                materials: ["Ceramic", "Natural Glaze"],
            },
            {
                name: "Silver Pendant Necklace",
                description: "Handcrafted sterling silver pendant with traditional motifs.",
                price: 125,
                images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"],
                category: "Jewelry",
                artisanId: aishaId,
                stock: 5,
                isTrending: true,
                materials: ["Sterling Silver"],
            },
            {
                name: "Embroidered Cushion",
                description: "Hand-embroidered cushion cover with geometric patterns.",
                price: 35,
                images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500"],
                category: "Textiles",
                artisanId: elenaId,
                stock: 20,
                isTrending: false,
                materials: ["Cotton", "Silk Thread"],
                dimensions: "16\" x 16\"",
            },
            {
                name: "Wooden Wall Art",
                description: "Carved wooden wall art depicting natural scenes.",
                price: 150,
                images: ["https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500"],
                category: "Woodwork",
                artisanId: jamesId,
                stock: 3,
                isTrending: true,
                materials: ["Reclaimed Teak"],
                dimensions: "24\" x 18\"",
            },
            {
                name: "Brass Earrings",
                description: "Lightweight brass earrings with intricate detailing.",
                price: 55,
                images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500"],
                category: "Jewelry",
                artisanId: aishaId,
                stock: 15,
                isTrending: false,
                materials: ["Brass"],
            },
            {
                name: "Hand-dyed Scarf",
                description: "Naturally dyed silk scarf with unique patterns.",
                price: 68,
                images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500"],
                category: "Textiles",
                artisanId: elenaId,
                stock: 10,
                isTrending: false,
                materials: ["Silk", "Natural Dyes"],
            },
            {
                name: "Terracotta Vase",
                description: "Hand-shaped terracotta vase with matte finish.",
                price: 42,
                images: ["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500"],
                category: "Pottery",
                artisanId: mariaId,
                stock: 7,
                isTrending: true,
                materials: ["Terracotta"],
                dimensions: "8\" height",
            },
            {
                name: "Beaded Bracelet",
                description: "Colorful beaded bracelet with traditional patterns.",
                price: 38,
                images: ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500"],
                category: "Jewelry",
                artisanId: aishaId,
                stock: 25,
                isTrending: false,
                materials: ["Glass Beads", "Cotton Thread"],
            },
            {
                name: "Woven Table Runner",
                description: "Handwoven table runner with geometric designs.",
                price: 52,
                images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500"],
                category: "Textiles",
                artisanId: elenaId,
                stock: 14,
                isTrending: false,
                materials: ["Cotton", "Jute"],
                dimensions: "72\" x 14\"",
            },
            {
                name: "Pottery Planter",
                description: "Handmade ceramic planter with drainage hole.",
                price: 48,
                images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"],
                category: "Pottery",
                artisanId: mariaId,
                stock: 11,
                isTrending: false,
                materials: ["Ceramic"],
                dimensions: "6\" diameter",
            },
            {
                name: "Gold Ring",
                description: "Delicate gold ring with traditional filigree work.",
                price: 195,
                images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500"],
                category: "Jewelry",
                artisanId: aishaId,
                stock: 4,
                isTrending: true,
                materials: ["18K Gold"],
            },
        ];

        for (const product of products) {
            await ctx.db.insert("products", product);
        }

        return {
            message: "Database seeded successfully",
            stats: {
                categories: categories.length,
                artisans: 4,
                products: products.length,
            },
        };
    },
});
