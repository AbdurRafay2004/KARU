// AI Helper utilities for context building and intent analysis

export interface ProductContext {
    _id: string;
    name: string;
    price: number;
    category: string;
    materials?: string[];
    stock: number;
    artisan?: { name: string; slug: string } | null;
}

export interface ArtisanContext {
    _id: string;
    name: string;
    specialty: string;
    location: string;
    bio: string;
}

/**
 * Analyze user message to detect intent and extract filters
 */
export function analyzeIntent(message: string): {
    wantsProducts: boolean;
    wantsArtisans: boolean;
    category?: string;
    maxPrice?: number;
    material?: string;
} {
    const lowerMessage = message.toLowerCase();

    // Category detection
    const categories = {
        pottery: ["pottery", "ceramic", "clay", "bowl", "vase", "terracotta"],
        jewelry: ["jewelry", "jewellery", "necklace", "pendant", "earring", "bracelet", "ring"],
        textiles: ["textile", "fabric", "cloth", "scarf", "cushion", "embroidered", "woven"],
        woodwork: ["wood", "wooden", "carving", "carved"],
        "home decor": ["home decor", "decor", "decoration", "basket"],
    };

    let detectedCategory: string | undefined;
    for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some((kw) => lowerMessage.includes(kw))) {
            detectedCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
            break;
        }
    }

    // Material detection
    const materials = ["jute", "cotton", "silk", "brass", "silver", "ceramic", "terracotta"];
    const detectedMaterial = materials.find((mat) => lowerMessage.includes(mat));

    // Price detection (looking for "under X" or "below X")
    let maxPrice: number | undefined;
    const priceMatch = lowerMessage.match(/(?:under|below|less than|max)\s*(?:৳|tk|taka|bdt)?\s*(\d+)/);
    if (priceMatch) {
        maxPrice = parseInt(priceMatch[1], 10);
    }

    // Intent detection
    const productKeywords = [
        "show", "find", "search", "looking for", "want", "need", "buy",
        "available", "have", "sell", "product", "item", "recommend",
    ];
    const artisanKeywords = ["artisan", "maker", "craftsperson", "artist", "creator", "who made", "who makes"];

    const wantsProducts =
        productKeywords.some((kw) => lowerMessage.includes(kw)) ||
        detectedCategory !== undefined ||
        detectedMaterial !== undefined ||
        maxPrice !== undefined;

    const wantsArtisans = artisanKeywords.some((kw) => lowerMessage.includes(kw));

    return {
        wantsProducts,
        wantsArtisans,
        category: detectedCategory,
        maxPrice,
        material: detectedMaterial,
    };
}

/**
 * Build concise product context for AI prompt
 */
export function buildProductContext(products: ProductContext[], limit = 15): string {
    if (products.length === 0) {
        return "";
    }

    const limitedProducts = products.slice(0, limit);

    const productList = limitedProducts
        .map((p) => {
            const artisanName = p.artisan?.name || "Unknown Artisan";
            const materialsStr = p.materials?.join(", ") || "";
            const stockStatus = p.stock > 0 ? "✓ In Stock" : "✗ Out of Stock";

            return `- **${p.name}** (৳${p.price}) | ${p.category} | ${materialsStr} | By ${artisanName} | ${stockStatus}`;
        })
        .join("\n");

    return `AVAILABLE PRODUCTS (${limitedProducts.length} shown):\n${productList}`;
}

/**
 * Build concise artisan context for AI prompt
 */
export function buildArtisanContext(artisans: ArtisanContext[], limit = 10): string {
    if (artisans.length === 0) {
        return "";
    }

    const limitedArtisans = artisans.slice(0, limit);

    const artisanList = limitedArtisans
        .map((a) => {
            return `- **${a.name}** | Specialty: ${a.specialty} | Location: ${a.location}\n  ${a.bio.substring(0, 100)}...`;
        })
        .join("\n");

    return `OUR ARTISANS (${limitedArtisans.length} shown):\n${artisanList}`;
}

/**
 * Build enhanced system prompt with dynamic context
 */
export function buildSystemPrompt(productContext?: string, artisanContext?: string): string {
    const basePrompt = `You are KARU's AI shopping assistant for Bangladeshi handicrafts.

GENERAL INFO:
- Shipping: All over Bangladesh, 3-5 business days
- Return Policy: 7 days for damaged/incorrect items
- Payment Methods: Cash on Delivery, bKash, Nagad
- Location: Serving all 64 districts of Bangladesh

${productContext ? `\n${productContext}\n` : ""}
${artisanContext ? `\n${artisanContext}\n` : ""}

GUIDELINES:
- Recommend products based on user preferences (category, price, material)
- Mention artisan names when discussing products
- Include prices in BDT (৳) or Taka
- Be warm, friendly, and culturally aware
- Use emojis sparingly but appropriately
- If asked about specific orders, suggest checking "My Orders" page or contacting support@karu.com
- For general browsing, encourage visiting /products page

Keep responses concise and helpful!`;

    return basePrompt;
}
