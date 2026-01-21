# KARU Marketplace - Implementation Plan

Building a premium handicraft marketplace with storytelling-first design, based on the CraftedRoots reference.

## Reference Design

![CraftedRoots Reference](C:/Users/abdur/.gemini/antigravity/brain/de91c6fe-f738-4334-9ff5-9c5d6d3f8ede/uploaded_image_1769037890637.png)

## Design System

### Color Palette (Earth Tones)
| Token | Value | Usage |
|-------|-------|-------|
| `karu-cream` | `#FDF8F3` | Primary background |
| `karu-sand` | `#E8DDD3` | Secondary background, cards |
| `karu-terracotta` | `#C75D3C` | Primary CTA, accents |
| `karu-clay` | `#8B5A3C` | Secondary accents |
| `karu-charcoal` | `#2D2D2D` | Primary text |
| `karu-stone` | `#6B6B6B` | Secondary text |

### Typography
- **Epilogue** - Headings (modern, geometric)
- **Manrope** - Body text (readable, warm)
- **Noto Serif** - Accent quotes, artisan stories

---

## Proposed Changes

### Dependencies & Configuration

#### [MODIFY] [package.json](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/package.json)
Add required dependencies:
- `tailwindcss` v3 + `postcss` + `autoprefixer`
- `react-router-dom` for SPA routing
- `lucide-react` for premium icons

#### [NEW] [tailwind.config.js](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/tailwind.config.js)
Custom configuration with:
- KARU color palette
- Custom fonts (Epilogue, Manrope, Noto Serif)
- Custom spacing and border-radius tokens

#### [NEW] [postcss.config.js](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/postcss.config.js)
PostCSS configuration for Tailwind processing

---

### Core Structure

#### [MODIFY] [index.html](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/index.html)
- Add Google Fonts links
- Update meta tags and title

#### [MODIFY] [src/index.css](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/index.css)
- Tailwind directives
- CSS custom properties for design tokens
- Base typography styles

#### [MODIFY] [src/main.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/main.tsx)
- Add React Router BrowserRouter wrapper

---

### Layout Components

#### [NEW] [src/components/layout/Header.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/layout/Header.tsx)
- Logo (CraftedRoots style leaf icon + text)
- Search bar with icon
- Sign in link
- Cart & Wishlist icons with badge counts

#### [NEW] [src/components/layout/Footer.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/layout/Footer.tsx)
- Logo and tagline
- Social media links
- Column layout: Shop, About, Help
- Copyright and legal links

#### [NEW] [src/components/layout/Layout.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/layout/Layout.tsx)
- Wraps pages with Header and Footer

---

### Homepage Components

#### [NEW] [src/pages/HomePage.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/pages/HomePage.tsx)
Main landing page composing all sections

#### [NEW] [src/components/home/HeroSection.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/home/HeroSection.tsx)
- Background image of artisan hands
- "Handcrafted with Soul." headline
- Subtext about unique pieces
- "Explore Ceramics" CTA button

#### [NEW] [src/components/home/TrendingSection.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/home/TrendingSection.tsx)
- Section header with filter tabs (All, New Arrivals, Best Sellers)
- Grid of ProductCard components
- "Load More Products" button

#### [NEW] [src/components/home/CategorySection.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/home/CategorySection.tsx)
- "Shop by Category" header
- Category cards: Home Decor, Jewelry, Textiles
- Rounded corner images with overlaid names

#### [NEW] [src/components/home/FeaturedArtisan.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/home/FeaturedArtisan.tsx)
- Warm background color section
- Artisan name with serif typography
- Quote in italic
- Two product/process images
- "Read the Full Story" link

#### [NEW] [src/components/home/JoinCommunity.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/home/JoinCommunity.tsx)
- Dark background CTA section
- "Join the Artisan Community" headline
- Benefits list with icons
- "Become a Seller" button

---

### Product Components

#### [NEW] [src/components/product/ProductCard.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/components/product/ProductCard.tsx)
- Product image with hover effect
- "Trending" badge optional
- Product name, price, artisan link
- Heart icon for wishlist

---

### Routing

#### [NEW] [src/router.tsx](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/router.tsx)
React Router configuration:
- `/` - HomePage
- `/products` - ProductsPage (future)
- `/artisans/:id` - ArtisanPage (future)

---

## Verification Plan

### Dev Server Test
```bash
cd "y:/Antigravity workspace/Handicraft Marketplace/KARU"
npm run dev
```
Open `http://localhost:5173` and visually verify:
1. KARU design renders with correct earth-tone colors
2. Header shows logo, search, sign-in, cart, wishlist
3. Hero section displays with background image and CTA
4. Trending section shows product cards in grid
5. Categories display Home Decor, Jewelry, Textiles
6. Featured Artisan section has warm bg with images
7. Footer renders with all columns

### Build Verification
```bash
npm run build
```
Verify no TypeScript or build errors.

### Manual Browser Verification
1. Resize browser to test responsive breakpoints
2. Check hover states on buttons and cards
3. Verify fonts load correctly (Epilogue, Manrope)

---

## Implementation Priority

> [!IMPORTANT]
> This plan focuses on **Phase 1-3**: Foundation, Layout, and Homepage. Product/Artisan pages and authentication will be subsequent phases.

**Estimated time:** 2-3 hours for initial homepage implementation

---

## Questions for User

1. **Placeholder Images**: Should I use Unsplash API for real product images, or generate placeholder images for the prototype?
2. **Logo**: Would you like me to create a custom KARU logo, or use the CraftedRoots leaf-style logo from the reference?
3. **Routing**: Should I implement mock navigation links now, or keep the focus on the homepage only?
