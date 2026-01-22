# KARU Marketplace

> A premium handicraft marketplace connecting artisans with conscious buyers. Available all over bangladesh, not globally.

## Current Status
✅ **Phase 6 Complete** - Convex Backend Integration
✅ **Phase 5 Complete** - Artisan Profile System implemented
✅ **Phase 4 Complete** - Product Listing with Filters implemented


### Implementation Log
- [x] React 19 + Vite + TypeScript setup
- [x] Tailwind CSS v3 with custom earth-tone theme
- [x] Google Fonts (Epilogue, Manrope, Noto Serif)
- [x] Header with logo, search, cart/wishlist icons
- [x] Footer with navigation columns and social links
- [x] Premium Hero section - 2-column layout with 4-image grid and animations
- [x] Reusable Button component system (hero, outline, primary variants)
- [x] Trending Now product grid with filter tabs
- [x] Shop by Category cards (Home Decor, Jewelry, Textiles)
- [x] Featured Artisan spotlight (Elena Rossi)
- [x] Join Artisan Community CTA
- [x] React Router configuration
- [x] Product Detail Page with responsive gallery
- [x] Product Information component with artisan links and policies
- [x] Product Listing Page with comprehensive filters
- [x] Filter sidebar (category, price range, artisan)
- [x] Sort functionality (newest, price low/high, popular)
- [x] Grid size toggle (3 or 4 columns)
- [x] Artisan Profile Page with biography and story
- [x] Process photos gallery
- [x] Artisan product listings
- [x] Social links and contact info
- [x] **Convex Backend Integration**
- [x] Database schema (products, artisans, categories, users, cart, orders)
- [x] Real-time queries and mutations
- [x] Seed data (4 artisans, 12 products, 5 categories)
- [x] ConvexProvider setup
- [x] Product listing with Convex queries

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
- **State Management**: Convex React hooks

## Project Structure
```
src/
├── components/
│   ├── layout/         # Header, Footer, Layout
│   ├── home/           # Homepage sections
│   └── product/        # ProductCard, FilterSidebar, Gallery, Info
├── pages/              # HomePage, ProductListingPage, ProductDetailPage, ArtisanProfilePage
└── router.tsx          # Route definitions
convex/
├── schema.ts           # Database schema
├── products.ts         # Product queries
├── artisans.ts         # Artisan queries
├── categories.ts       # Category queries
└── seed.ts             # Database seeding
```

## Next Steps
1. [ ] Update remaining pages to use Convex (ProductDetail, ArtisanProfile, HomePage)
2. [ ] User authentication (Convex Auth)
3. [ ] Shopping cart functionality
4. [ ] Checkout flow
5. [ ] Admin dashboard for artisans

## Known Issues
- Images are using Unsplash URLs (production should use local assets)
- ProductDetailPage and ArtisanProfilePage still using mock data (migration in progress)
