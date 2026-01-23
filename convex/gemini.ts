"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";
import { api } from "./_generated/api";
import {
    analyzeIntent,
    buildProductContext,
    buildArtisanContext,
    buildSystemPrompt,
} from "./ai/helpers";

export const chat = action({
    args: {
        message: v.string(),
    },
    handler: async (ctx, args): Promise<string> => {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY environment variable is not set");
        }

        const ai = new GoogleGenAI({ apiKey });

        // Analyze user message to detect intent
        const intent = analyzeIntent(args.message);

        let productContext = "";
        let artisanContext = "";

        try {
            // Fetch products if relevant
            if (intent.wantsProducts) {
                const products = await ctx.runQuery(api.products.list, {
                    category: intent.category,
                    maxPrice: intent.maxPrice,
                });

                // Filter by material if detected
                let filteredProducts = products;
                if (intent.material) {
                    filteredProducts = products.filter((p) =>
                        p.materials?.some((m) =>
                            m.toLowerCase().includes(intent.material!.toLowerCase())
                        )
                    );
                }

                if (filteredProducts.length > 0) {
                    productContext = buildProductContext(filteredProducts, 15);
                }
            }

            // Fetch artisans if relevant OR as fallback for product queries
            if (intent.wantsArtisans || (intent.wantsProducts && !productContext)) {
                const artisans = await ctx.runQuery(api.artisans.list, {});
                if (artisans.length > 0) {
                    artisanContext = buildArtisanContext(artisans, 10);
                }
            }

            // If no specific intent detected, provide trending products as context
            if (!intent.wantsProducts && !intent.wantsArtisans) {
                const trendingProducts = await ctx.runQuery(api.products.trending, {});
                if (trendingProducts.length > 0) {
                    productContext = buildProductContext(trendingProducts, 10);
                }
            }
        } catch (dbError) {
            console.error("Database query error:", dbError);
            // Continue with empty context - AI can still answer general questions
        }

        // Build enhanced system prompt with dynamic context
        const systemPrompt = buildSystemPrompt(productContext, artisanContext);

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: `${systemPrompt}\n\nCustomer message: ${args.message}`,
            });

            const text = response.text;

            if (!text) {
                throw new Error("No response text from Gemini API");
            }

            return text;
        } catch (error) {
            console.error("Gemini API error:", error);
            throw new Error(`Gemini API error: ${error}`);
        }
    },
});
