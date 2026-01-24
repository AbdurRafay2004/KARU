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

// Model fallback chain prioritizing speed and reliability
const MODEL_FALLBACK_CHAIN = [
    "gemini-2.5-flash-lite",      // Fastest, most cost-effective
    "gemini-2.0-flash-lite",      // Backup lite option
    "gemini-2.5-flash",           // Good balance of speed and quality
    "gemini-3-flash-preview",     // Latest flash model
    "gemini-2.0-flash",           // Stable fallback
] as const;

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
                    categories: intent.category ? [intent.category] : undefined,
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

        // Try each model in the fallback chain
        let lastError: any = null;

        for (const model of MODEL_FALLBACK_CHAIN) {
            try {
                console.log(`Attempting with model: ${model}`);

                const response = await ai.models.generateContent({
                    model,
                    contents: `${systemPrompt}\n\nCustomer message: ${args.message}`,
                });

                const text = response.text;

                if (!text) {
                    throw new Error("No response text from Gemini API");
                }

                console.log(`✓ Success with model: ${model}`);
                return text;
            } catch (error: any) {
                console.error(`✗ Model ${model} failed:`, error.message || error);
                lastError = error;

                // Check if it's a rate limit or availability error
                const errorStatus = error?.status;
                const shouldRetry = errorStatus === 404 ||
                    errorStatus === 429 ||
                    errorStatus === 503 ||
                    error?.message?.includes("not found") ||
                    error?.message?.includes("rate limit");

                if (!shouldRetry) {
                    // If it's not a retryable error, throw immediately
                    throw new Error(`Gemini API error: ${error.message || error}`);
                }

                // Continue to next model in chain
                continue;
            }
        }

        // All models failed
        console.error("All models in fallback chain failed");
        throw new Error(`Gemini API error: All models failed. Last error: ${lastError?.message || lastError}`);
    },
});
