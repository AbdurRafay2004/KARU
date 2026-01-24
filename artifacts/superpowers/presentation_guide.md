# KARU Project Presentation Guide
**Duration:** 2:00 - 2:30 minutes
**Goal:** Showcase UI/UX, AI Integration, and Artisan features.

## 🛠️ Preparation
1.  **Run the App:** Ensure `npm run dev` and `npx convex dev` are running.
2.  **Clean State:** Close unnecessary tabs. Set browser zoom to 100%.
3.  **Login:**
    *   **Tab 1 (Buyer View):** Logged in as a regular user (or Guest).
    *   **Tab 2 (Artisan View):** Logged in as an artisan (e.g., in Incognito window) at `/admin`.

---

## 🎬 Step-by-Step Script

| Time | Visual / Action | Script / Talking Points |
| :--- | :--- | :--- |
| **0:00 - 0:25** | **[Scene: Home Page Top]**<br>Refresh the page to trigger the **Hero Animations** (Text fade-in, Statistics staggered load).<br>Hover over the "Explore Marketplace" button. | "Welcome to **KARU**, a premium digital marketplace connecting Bangladesh's artisans with conscious buyers.<br><br>Our mission is to preserve fading heritage by providing a modern, high-tech platform for traditional crafts." |
| **0:25 - 0:55** | **[Scene: Browsing]**<br>Scroll down slowly.<br>1. Hover over a **Trending Product** card (show the lift effect).<br>2. Click on a **Category** (e.g., "Bags" or "Pottery"). | "We've rebuilt the visual experience using **React 19** and **Tailwind CSS**. We focused on 'Glassmorphism' and premium micro-interactions.<br><br>Notice the smooth animations and the custom Bangla typography that blends cultural identity with modern design constraints." |
| **0:55 - 1:30** | **[Scene: AI Chat]**<br>Click the **Floating Chat Widget**.<br>Type: *"I'm looking for a birthday gift under 1500 taka."*<br>Wait for the AI response related to products. | "A key innovation is our **GenAI Integration**. Powered by **Google Gemini** and our **Convex** backend.<br><br>This isn't just a chatbot. It has context of our entire inventory. It understands queries like price ranges and materials, guiding users to the perfect product instantly." |
| **1:30 - 2:00** | **[Scene: Artisan Dashboard]**<br>Switch to the **Admin/Dashboard Tab**.<br>Show the **Sales Overview** graph.<br>Click **"Add Product"** to show the modal form. | "For our artisans, we built a dedicated **Shop Manager**. <br><br>It enables real-time inventory management and order tracking. We use **Convex Auth** and Row-Level Security to ensure artisans can effectively manage their digital storefronts without technical hurdles." |
| **2:00 - 2:20** | **[Scene: Closing]**<br>Navigate to an **Artisan Profile Page** (e.g., "Jamdani Weavers").<br>Slowly scroll through their story. | "KARU is more than a store; it's a bridge between the past and the future.<br><br>Built with a real-time database and modern web tech, we are empowering the next generation of artisans. Thank you." |

---

## 💡 Pro Tips for Recording
*   **Audio:** Speak clearly and strictly follow the time limits to keep it under 3 mins.
*   **Cursor:** Move the mouse smoothly; avoid jerky movements.
*   **Resolution:** Record in 1080p (1920x1080) for the best clarity.
*   **Tech Highlight:** If you have extra time, briefly show the `schema.ts` or `gemini.ts` file in VS Code to prove the technical depth.
