---
description: How to add Gemini AI to a Convex project
---

# Gemini AI Integration with Convex

This workflow shows how to integrate Google's Gemini API into a Convex backend.

## Prerequisites
- Convex project already set up (`npx convex dev` running)
- Gemini API key from https://aistudio.google.com/app/apikey

## Step 1: Install the Google GenAI SDK

```bash
npm install @google/genai
```

## Step 2: Add API Key to Convex Environment Variables

In the Convex Dashboard (https://dashboard.convex.dev):
1. Select your project
2. Go to Settings → Environment Variables
3. Add `GEMINI_API_KEY` with your API key value

Or use CLI:
```bash
npx convex env set GEMINI_API_KEY "your-api-key-here"
```

## Step 3: Create the Convex Action

Create `convex/gemini.ts`:

```typescript
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

        // Customize this system prompt for your use case
        const systemPrompt = `You are a helpful assistant. Be concise and friendly.`;

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite", // Fast, cheap model
                contents: `${systemPrompt}\n\nUser: ${args.message}`,
            });

            return response.text || "No response";
        } catch (error) {
            console.error("Gemini API error:", error);
            throw new Error(`Gemini API error: ${error}`);
        }
    },
});
```

**IMPORTANT**: The `"use node";` directive at the top is REQUIRED for Convex actions that use Node.js packages.

## Step 4: Call from React Frontend

```tsx
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";

function ChatComponent() {
    const geminiChat = useAction(api.gemini.chat);
    const [response, setResponse] = useState("");

    const sendMessage = async (message: string) => {
        try {
            const result = await geminiChat({ message });
            setResponse(result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (/* your UI */);
}
```

## Available Models

| Model | Use Case | Speed | Cost |
|-------|----------|-------|------|
| `gemini-2.5-flash-lite` | Fast responses, chat | Fastest | Cheapest |
| `gemini-2.5-flash` | Balanced | Fast | Low |
| `gemini-2.5-pro` | Complex reasoning | Slower | Higher |

## Key Differences: SDK vs REST API

**Use the SDK** (`@google/genai`) - Recommended:
- Handles authentication and model names
- Simpler code
- Works with model names like `gemini-2.5-flash-lite`

**Avoid raw REST API** unless necessary:
- Model names differ from SDK
- More boilerplate code
- Harder to maintain
