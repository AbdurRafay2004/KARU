"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";

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

        const systemPrompt = `You are a helpful customer support assistant for KARU, a Bangladeshi handicraft marketplace. 
You help customers with:
- Order tracking and status
- Shipping information (we ship all over Bangladesh, 3-5 business days)
- Return policy (7 days for damaged/incorrect items)
- Payment methods (Cash on Delivery, bKash, Nagad)
- General product inquiries

Keep responses concise, friendly, and helpful. Use emojis sparingly to be warm. 
If you don't know something specific about an order, suggest the customer check their "My Orders" page or contact support@karu.com.`;

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
