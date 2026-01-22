# KARU Marketplace

> A premium handicraft marketplace connecting artisans with conscious buyers. Available all over Bangladesh, not globally.

## Current Status
✅ **Phase C Complete** - User Authentication & Cart
✅ **Phase B Complete** - Homepage Integration
✅ **Phase A Complete** - Page-to-Page Linking Fixed
✅ **Phase 6 Complete** - Convex Backend Integration

### Implementation Log
- [x] React 19 + Vite + TypeScript setup
- [x] Tailwind CSS v3 with custom earth-tone theme
- [x] Google Fonts (Epilogue, Manrope, Noto Serif)
- [x] Header with logo, search, cart/wishlist icons
- [x] Footer with navigation columns and social links
- [x] Premium Hero section - 2-column layout with 4-image grid
- [x] Trending Now product grid with filter tabs
- [x] Shop by Category cards
- [x] Featured Artisan spotlight
- [x] React Router configuration
- [x] Product Detail Page with responsive gallery
- [x] Product Listing Page with comprehensive filters
- [x] Artisan Profile Page with biography and story
- [x] **Convex Backend Integration**
- [x] Database schema (products, artisans, categories, users, cart, orders)
- [x] Real-time queries and mutations
- [x] Seed data (4 artisans, 12 products, 5 categories)
- [x] **All Pages Connected to Convex**
- [x] ProductDetailPage, ArtisanProfilePage, TrendingSection
- [x] FeaturedArtisan, CategorySection
- [x] **User Authentication & Cart**
- [x] Convex Auth with Password provider
- [x] Login and Signup pages
- [x] Cart page with quantity controls
- [x] Auth-aware Header with cart count
- [x] Add to Cart functionality

## Quick Start
```bash
npm install
npm run dev          # Start Vite dev server
npx convex dev      # Start Convex backend (in separate terminal)
```
Open http://localhost:5173

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Backend**: Convex (real-time database)
- **Auth**: @convex-dev/auth

## Project Structure
```
src/
├── components/
│   ├── layout/         # Header, Footer, Layout
│   ├── home/           # Homepage sections
│   └── product/        # ProductCard, FilterSidebar, Gallery, Info
├── pages/              # Home, Products, ProductDetail, Artisan, Login, Signup, Cart
└── router.tsx          # Route definitions
convex/
├── schema.ts           # Database schema + auth tables
├── auth.ts             # Convex Auth configuration
├── users.ts            # User and cart mutations
├── products.ts         # Product queries
├── artisans.ts         # Artisan queries
└── categories.ts       # Category queries
```

## Next Steps
1. [ ] Set up Convex Auth environment variables for production
2. [ ] Checkout flow implementation
3. [ ] Order history page
4. [ ] Admin dashboard for artisans

## Known Issues
- Images are using Unsplash URLs (production should use local assets)
