import { mutation } from "./_generated/server";

// Seed the database with initial data
export const seedDatabase = mutation({
    args: {},
    handler: async (ctx) => {
        // Clear existing data
        const existingArtisans = await ctx.db.query("artisans").collect();
        for (const artisan of existingArtisans) {
            await ctx.db.delete(artisan._id);
        }
        const existingProducts = await ctx.db.query("products").collect();
        for (const product of existingProducts) {
            await ctx.db.delete(product._id);
        }
        const existingCategories = await ctx.db.query("categories").collect();
        for (const category of existingCategories) {
            await ctx.db.delete(category._id);
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
            {
                name: "Bags",
                slug: "bags",
                description: "Handcrafted leather and jute bags",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
            },
            {
                name: "Mats & Rugs",
                slug: "mats-and-rugs",
                description: "Woven floor mats, rugs, and runners",
                image: "https://images.unsplash.com/photo-1562967169-ab696d744b15?w=500",
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
            story:
                "My journey with clay began 20 years ago. Each piece I create is a meditation, a connection between earth and spirit.",
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
            story:
                "I blend ancient metalworking techniques with modern design sensibilities to create jewelry that tells a story.",
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
            story:
                "Every piece of wood has a story. I listen to the grain, honor the tree, and create pieces that will last generations.",
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

        // New Artisans
        const rahimId = await ctx.db.insert("artisans", {
            name: "Rahim Ahmed",
            slug: "rahim-ahmed",
            bio: "Expert leather craftsman specializing in handmade bags, wallets, and accessories using premium full-grain leather.",
            story: "Leather crafting has been in my family for three generations. I learned to stitch before I could write. My mission is to showcase the world-class quality of Bangladeshi leather through modern, minimalist designs.",
            location: "Hazaribagh, Dhaka",
            specialty: "Leather Goods",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            coverImage: "https://images.unsplash.com/photo-1485303429385-2e861d9a2656?w=1200",
            processPhotos: ["https://images.unsplash.com/photo-1508243603417-646bc5f6d532?w=600"],
            email: "rahim@karumarketplace.com",
            social: { instagram: "@rahimleather" },
            isFeatured: true
        });

        const chandraId = await ctx.db.insert("artisans", {
            name: "Chandra Tripura",
            slug: "chandra-tripura",
            bio: "Preserving the indigenous weaving traditions of the Chittagong Hill Tracts through vibrant, hand-loomed textiles.",
            story: "Each pattern in my fabric holds a meaning—a prayer for rain, a celebration of harvest, a memory of ancestors. I weave not just threads, but the history of my people.",
            location: "Khagrachari, Bangladesh",
            specialty: "Indigenous Textiles & Pinon Hadi",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
            coverImage: "https://images.unsplash.com/photo-1512413915633-90d407fc8c21?w=1200",
            processPhotos: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600"],
            email: "chandra@karumarketplace.com",
            social: { facebook: "ChandraWeaves" },
            isFeatured: true
        });

        const fatimaId = await ctx.db.insert("artisans", {
            name: "Fatima Begum",
            slug: "fatima-begum",
            bio: "Keeping the ancient art of Nakshi Kantha alive. Each stitch tells a story of rural Bengal.",
            story: "Nakshi Kantha is more than embroidery; it's a silent language of women. We sit together in the afternoons, stitching our joys and sorrows into colorful quilts.",
            location: "Jessore, Bangladesh",
            specialty: "Nakshi Kantha (Embroidered Quilts)",
            avatar: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400",
            coverImage: "https://images.unsplash.com/photo-1596704017254-9b1b1c6762c6?w=1200",
            processPhotos: ["https://images.unsplash.com/photo-1559563458-527698bf5295?w=600"],
            email: "fatima@karumarketplace.com",
            social: {},
            isFeatured: false
        });

        const bijoyId = await ctx.db.insert("artisans", {
            name: "Bijoy Sarker",
            slug: "bijoy-sarker",
            bio: "Traditional potter reviving the lost art of terracotta plaques and sculptures.",
            story: "My ancestors built the terracotta temples of Bengal. I am trying to keep that clay-fired spirit alive in a world of plastic.",
            location: "Bogra, Bangladesh",
            specialty: "Terracotta & Sculpture",
            avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400",
            coverImage: "https://images.unsplash.com/photo-1545663731-bf3f45710664?w=1200",
            processPhotos: ["https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600"],
            email: "bijoy@karumarketplace.com",
            social: { instagram: "@bijoyterracotta" },
            isFeatured: false
        });

        const nusratId = await ctx.db.insert("artisans", {
            name: "Nusrat Jahan",
            slug: "nusrat-jahan",
            bio: "Eco-friendly artisan turning golden jute fibers into chic home decor and fashion accessories.",
            story: "Jute is the 'Golden Fiber' of Bangladesh. I want to show the world that it can be as luxurious as silk and as durable as leather.",
            location: "Rangpur, Bangladesh",
            specialty: "Jute Crafts",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
            coverImage: "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=1200",
            processPhotos: ["https://images.unsplash.com/photo-1617300344585-7833c8bf0889?w=600"],
            email: "nusrat@karumarketplace.com",
            social: { twitter: "@nusratjute" },
            isFeatured: true
        });

        const kamalId = await ctx.db.insert("artisans", {
            name: "Kamal Hossain",
            slug: "kamal-hossain",
            bio: "Master of bamboo and cane weaving, creating sustainable furniture and lampshades.",
            story: "Bamboo bends but does not break. It teaches us resilience. I create furniture that brings nature's calm into modern homes.",
            location: "Sylhet, Bangladesh",
            specialty: "Bamboo & Cane Furniture",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
            coverImage: "https://images.unsplash.com/photo-1506198886361-b8ae026bd6ee?w=1200",
            processPhotos: ["https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=600"],
            email: "kamal@karumarketplace.com",
            social: { instagram: "@kamalbamboo" },
            isFeatured: false
        });


        // Seed Products
        const products = [
            // Existing Products (12)
            {
                name: "Handwoven Basket",
                description:
                    "Beautiful handwoven basket made from natural jute fibers. Perfect for storage or as a decorative piece.",
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
                dimensions: '12" x 12" x 8"',
            },
            {
                name: "Ceramic Bowl Set",
                description:
                    "Set of 4 hand-thrown ceramic bowls with organic glaze finish.",
                price: 89,
                images: [
                    "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",
                ],
                category: "Pottery",
                artisanId: mariaId,
                stock: 8,
                isTrending: true,
                materials: ["Ceramic", "Natural Glaze"],
            },
            {
                name: "Silver Pendant Necklace",
                description:
                    "Handcrafted sterling silver pendant with traditional motifs.",
                price: 125,
                images: [
                    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
                ],
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
                images: [
                    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
                ],
                category: "Textiles",
                artisanId: elenaId,
                stock: 20,
                isTrending: false,
                materials: ["Cotton", "Silk Thread"],
                dimensions: '16" x 16"',
            },
            {
                name: "Wooden Wall Art",
                description: "Carved wooden wall art depicting natural scenes.",
                price: 150,
                images: [
                    "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500",
                ],
                category: "Woodwork",
                artisanId: jamesId,
                stock: 3,
                isTrending: true,
                materials: ["Reclaimed Teak"],
                dimensions: '24" x 18"',
            },
            {
                name: "Brass Earrings",
                description: "Lightweight brass earrings with intricate detailing.",
                price: 55,
                images: [
                    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
                ],
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
                images: [
                    "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500",
                ],
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
                images: [
                    "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",
                ],
                category: "Pottery",
                artisanId: mariaId,
                stock: 7,
                isTrending: true,
                materials: ["Terracotta"],
                dimensions: '8" height',
            },
            {
                name: "Beaded Bracelet",
                description: "Colorful beaded bracelet with traditional patterns.",
                price: 38,
                images: [
                    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500",
                ],
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
                images: [
                    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500",
                ],
                category: "Textiles",
                artisanId: elenaId,
                stock: 14,
                isTrending: false,
                materials: ["Cotton", "Jute"],
                dimensions: '72" x 14"',
            },
            {
                name: "Pottery Planter",
                description: "Handmade ceramic planter with drainage hole.",
                price: 48,
                images: [
                    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
                ],
                category: "Pottery",
                artisanId: mariaId,
                stock: 11,
                isTrending: false,
                materials: ["Ceramic"],
                dimensions: '6" diameter',
            },
            {
                name: "Gold Ring",
                description: "Delicate gold ring with traditional filigree work.",
                price: 195,
                images: [
                    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
                ],
                category: "Jewelry",
                artisanId: aishaId,
                stock: 4,
                isTrending: true,
                materials: ["18K Gold"],
            },

            // New Products (38)

            // Rahim Ahmed - Leather Goods (6)
            { name: "Classic Leather Satchel", description: "Vegetable-tanned leather satchel with antique brass hardware.", price: 180, images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"], category: "Bags", artisanId: rahimId, stock: 8, isTrending: true, materials: ["Full Grain Leather", "Brass"], dimensions: "14\" x 10\" x 4\"" },
            { name: "Minimalist Bi-Fold Wallet", description: "Slim profile wallet crafted from premium cowhide.", price: 45, images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500"], category: "Bags", artisanId: rahimId, stock: 30, isTrending: true, materials: ["Leather"], dimensions: "4.5\" x 3.5\"" },
            { name: "Leather Travel Duffel", description: "Spacious weekender bag for the stylish traveler.", price: 250, images: ["https://images.unsplash.com/photo-1476900543704-4312b78632f8?w=500"], category: "Bags", artisanId: rahimId, stock: 5, isTrending: false, materials: ["Leather", "Canvas Lining"] },
            { name: "Hand-Stitched Belt", description: "Durable leather belt with hand-stitched detailing.", price: 55, images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500"], category: "Home Decor", artisanId: rahimId, stock: 20, isTrending: false, materials: ["Leather", "Steel Buckle"] },
            { name: "Leather Notebook Cover", description: "Refillable notebook cover that ages beautifully.", price: 35, images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=500"], category: "Home Decor", artisanId: rahimId, stock: 15, isTrending: false, materials: ["Leather"], dimensions: "A5 Standard" },
            { name: "Dopp Kit", description: "Essential toiletry bag for organizing your grooming kit.", price: 65, images: ["https://images.unsplash.com/photo-1610484967366-0744afc28c6e?w=500"], category: "Bags", artisanId: rahimId, stock: 12, isTrending: false, materials: ["Water-resistant Leather"] },

            // Chandra Tripura - Indigenous Textiles (6)
            { name: "Chakma Pinon Hadi", description: "Traditional two-piece dress woven on a backstrap loom.", price: 120, images: ["https://images.unsplash.com/photo-1596704017254-9b1b1c6762c6?w=500"], category: "Textiles", artisanId: chandraId, stock: 6, isTrending: true, materials: ["Cotton", "Silk"], dimensions: "Standard Traditional Fit" },
            { name: "Tribal Pattern Shawl", description: "Warm shawl woven with intricate tribal motifs.", price: 75, images: ["https://images.unsplash.com/photo-1582218841445-562db493c042?w=500"], category: "Textiles", artisanId: chandraId, stock: 12, isTrending: false, materials: ["Handspun Wool"] },
            { name: "Woven Floor Mat", description: "Durable floor mat featuring geometric hill tract designs.", price: 50, images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?w=500"], category: "Mats & Rugs", artisanId: chandraId, stock: 10, isTrending: false, materials: ["Jute", "Cotton"] },
            { name: "Handloom Tablecloth", description: "Colorful tablecloth to brighten up your dining area.", price: 60, images: ["https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=500"], category: "Home Decor", artisanId: chandraId, stock: 8, isTrending: false, materials: ["Cotton"] },
            { name: "Indigenous Print Tote", description: "Everyday tote bag made from traditional fabrics.", price: 30, images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500"], category: "Home Decor", artisanId: chandraId, stock: 25, isTrending: false, materials: ["Cotton Canvas"] },
            { name: "Decorative Wall Hanging", description: "Small tapestry showcasing Chakma weaving patterns.", price: 40, images: ["https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=500"], category: "Home Decor", artisanId: chandraId, stock: 15, isTrending: false, materials: ["Cotton", "Bamboo rod"] },

            // Fatima Begum - Nakshi Kantha (5)
            { name: "Storytelling Quilt (King)", description: "Masterpiece quilt depicting scenes from village folklore.", price: 350, images: ["https://images.unsplash.com/photo-1579762593175-202260549619?w=500"], category: "Textiles", artisanId: fatimaId, stock: 2, isTrending: true, materials: ["Vintage Cotton Sari Layers"], dimensions: "90\" x 100\"" },
            { name: "Embroidered Throw Pillow", description: "Accent pillow with delicate floral Nakshi embroidery.", price: 45, images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500"], category: "Home Decor", artisanId: fatimaId, stock: 15, isTrending: true, materials: ["Cotton"], dimensions: "18\" x 18\"" },
            { name: "Nakshi Wall Tapestry", description: "Framable embroidered art piece.", price: 90, images: ["https://images.unsplash.com/photo-1582218841445-562db493c042?w=500"], category: "Home Decor", artisanId: fatimaId, stock: 5, isTrending: false, materials: ["Cotton fabric", "Silk thread"] },
            { name: "Hand-Stitched Baby Blanket", description: "Soft, lightweight blanket with lucky motifs for newborns.", price: 65, images: ["https://images.unsplash.com/photo-1585244344445-31a3843f6567?w=500"], category: "Textiles", artisanId: fatimaId, stock: 10, isTrending: false, materials: ["Soft Cotton Layers"] },
            { name: "Embroidered Table Runner", description: "Nakshi Kantha runner for festive occasions.", price: 55, images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500"], category: "Home Decor", artisanId: fatimaId, stock: 8, isTrending: false, materials: ["Cotton"] },

            // Bijoy Sarker - Terracotta (5)
            { name: "Terracotta Horse", description: "Traditional Bankura-style terracotta horse sculpture.", price: 70, images: ["https://images.unsplash.com/photo-1515967060527-38019318a66a?w=500"], category: "Home Decor", artisanId: bijoyId, stock: 10, isTrending: false, materials: ["Clay"], dimensions: "12\" height" },
            { name: "Decorative Clay Tiles", description: "Set of 4 tiles with relief work for wall mounting.", price: 60, images: ["https://images.unsplash.com/photo-1620613904347-16017e94cb83?w=500"], category: "Home Decor", artisanId: bijoyId, stock: 12, isTrending: false, materials: ["Terracotta"] },
            { name: "Garden Planter Pot", description: "Large ornate planter for outdoor use.", price: 55, images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500"], category: "Pottery", artisanId: bijoyId, stock: 8, isTrending: false, materials: ["Fired Clay"] },
            { name: "Hanging Incense Burner", description: "Intricately vented incense holder.", price: 25, images: ["https://images.unsplash.com/photo-1602604297121-824df97b2520?w=500"], category: "Home Decor", artisanId: bijoyId, stock: 20, isTrending: false, materials: ["Clay"] },
            { name: "Clay Water Pitcher", description: "Traditional vessel to keep water cool naturally.", price: 35, images: ["https://images.unsplash.com/photo-1578357078586-4917d4b0900d?w=500"], category: "Pottery", artisanId: bijoyId, stock: 15, isTrending: false, materials: ["Clay"], dimensions: "2 Liter capacity" },


            // Nusrat Jahan - Jute Crafts (6)
            { name: "Jute Area Rug", description: "Round braided area rug, durable and eco-friendly.", price: 110, images: ["https://images.unsplash.com/photo-1562967169-ab696d744b15?w=500"], category: "Mats & Rugs", artisanId: nusratId, stock: 5, isTrending: true, materials: ["Natural Jute"], dimensions: "4ft diameter" },
            { name: "Macrame Plant Hanger", description: "Boho-style plant hanger made from heavy jute twine.", price: 28, images: ["https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500"], category: "Home Decor", artisanId: nusratId, stock: 25, isTrending: true, materials: ["Jute"] },
            { name: "Jute Tote Bag", description: "Stylish and sturdy shopping bag.", price: 22, images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?w=500"], category: "Bags", artisanId: nusratId, stock: 50, isTrending: false, materials: ["Jute", "Cotton handles"] },
            { name: "Decorative Coaster Set", description: "Set of 6 braided coasters.", price: 18, images: ["https://images.unsplash.com/photo-1572091421062-811c7932ee48?w=500"], category: "Home Decor", artisanId: nusratId, stock: 40, isTrending: false, materials: ["Jute"] },
            { name: "Storage Basket Trio", description: "Three nesting baskets for home organization.", price: 75, images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500"], category: "Home Decor", artisanId: nusratId, stock: 10, isTrending: false, materials: ["Jute", "Structure wire"] },
            { name: "Jute Table Mats", description: "Set of 4 placemats for natural dining aesthetics.", price: 35, images: ["https://images.unsplash.com/photo-1600588692683-176378e9102c?w=500"], category: "Mats & Rugs", artisanId: nusratId, stock: 20, isTrending: false, materials: ["Jute"] },

            // Kamal Hossain - Bamboo (6)
            { name: "Bamboo Pendant Light", description: "Modern open-weave bamboo lampshade.", price: 65, images: ["https://images.unsplash.com/photo-1513506003011-3b611ddabd26?w=500"], category: "Home Decor", artisanId: kamalId, stock: 12, isTrending: true, materials: ["Bamboo"], dimensions: "12\" diameter" },
            { name: "Cane Armchair", description: "Comfortable armchair with intricate cane weaving.", price: 220, images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500"], category: "Home Decor", artisanId: kamalId, stock: 3, isTrending: false, materials: ["Rattan", "Teak frame"] },
            { name: "Bamboo Serving Tray", description: "Lightweight and sturdy serving tray.", price: 32, images: ["https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"], category: "Home Decor", artisanId: kamalId, stock: 18, isTrending: false, materials: ["Bamboo laminate"] },
            { name: "Woven Waste Basket", description: "Elegant solution for office waste.", price: 25, images: ["https://images.unsplash.com/photo-1533681498877-c9179d6756eb?w=500"], category: "Home Decor", artisanId: kamalId, stock: 20, isTrending: false, materials: ["Cane"] },
            { name: "Bamboo Fruit Bowl", description: "Spiral spun bamboo bowl with lacquer finish.", price: 40, images: ["https://images.unsplash.com/photo-1603198647313-2d203975005e?w=500"], category: "Home Decor", artisanId: kamalId, stock: 15, isTrending: false, materials: ["Spun Bamboo"] },
            { name: "Reading Lamp", description: "Table lamp with bamboo base and shade.", price: 58, images: ["https://images.unsplash.com/photo-1507473888900-52a11b636de2?w=500"], category: "Home Decor", artisanId: kamalId, stock: 8, isTrending: false, materials: ["Bamboo", "LED fitting"] },

            // Extra Products to reach 50 (Total 44 so far. Need 6 more)
            // Add to Elena (Textiles)
            { name: "Shibori Indigo Tablecloth", description: "Hand-dyed indigo tablecloth using Shibori technique.", price: 85, images: ["https://images.unsplash.com/photo-1597072689227-8882273e8f6a?w=500"], category: "Textiles", artisanId: elenaId, stock: 5, isTrending: false, materials: ["Cotton", "Indigo Dye"] },

            // Add to Aisha (Jewelry)
            { name: "Oxidized Silver Anklet", description: "Traditional heavy silver anklets.", price: 95, images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500"], category: "Jewelry", artisanId: aishaId, stock: 6, isTrending: false, materials: ["Silver Alloy"] },
            { name: "Gemstone Ring", description: "Gold plated ring with semi-precious stone.", price: 65, images: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500"], category: "Jewelry", artisanId: aishaId, stock: 10, isTrending: true, materials: ["Brass", "Gold Plate", "Amethyst"] },

            // Add to James (Wood)
            { name: "Teak Chopping Board", description: "End-grain teak chopping board, knife friendly.", price: 55, images: ["https://images.unsplash.com/photo-1582299587440-a15d97f5f973?w=500"], category: "Woodwork", artisanId: jamesId, stock: 15, isTrending: false, materials: ["Teak"] },
            { name: "Wooden Coasters Set", description: "Set of 6 engraved wooden coasters.", price: 25, images: ["https://images.unsplash.com/photo-1602360490807-dac4b518c0c4?w=500"], category: "Woodwork", artisanId: jamesId, stock: 25, isTrending: false, materials: ["Mango Wood"] },
            { name: "Carved Jewelry Box", description: "Small jewelry box with intricate floral carving.", price: 48, images: ["https://images.unsplash.com/photo-1522756846979-45e34749a2a9?w=500"], category: "Woodwork", artisanId: jamesId, stock: 8, isTrending: false, materials: ["Rosewood"] },
        ];

        await Promise.all(
            products.map((product) => ctx.db.insert("products", product))
        );

        return {
            message: "Database seeded successfully",
            stats: {
                categories: categories.length,
                artisans: 10,
                products: products.length,
            },
        };
    },
});
