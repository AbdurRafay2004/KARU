# KARU Marketplace

> A premium handicraft marketplace connecting artisans with conscious buyers.

## Current Status
✅ **Phase 1-3 Complete** - Foundation, Layout, and Homepage

### Implementation Log
- [x] React 19 + Vite + TypeScript setup
- [x] Tailwind CSS v3 with custom earth-tone theme
- [x] Google Fonts (Epilogue, Manrope, Noto Serif)
- [x] Header with logo, search, cart/wishlist icons
- [x] Footer with navigation columns and social links
- [x] Hero section - "Handcrafted with Soul" banner
- [x] Trending Now product grid with filter tabs
- [x] Shop by Category cards (Home Decor, Jewelry, Textiles)
- [x] Featured Artisan spotlight (Elena Rossi)
- [x] Join Artisan Community CTA
- [x] React Router configuration

## Quick Start
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Backend**: Convex (ready for integration)

## Project Structure
```
src/
├── components/
│   ├── layout/         # Header, Footer, Layout
│   ├── home/           # Homepage sections
│   └── product/        # ProductCard
├── pages/              # HomePage
└── router.tsx          # Route definitions
```

## Next Steps
1. [ ] Product detail pages with gallery
2. [ ] Artisan profile pages
3. [ ] Convex backend integration
4. [ ] User authentication
5. [ ] Shopping cart functionality

## Known Issues
- Images are using Unsplash URLs (production should use local assets)
- Mock data in Trending section (for prototype)
