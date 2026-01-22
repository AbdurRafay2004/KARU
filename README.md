# KARU Marketplace

> A premium handicraft marketplace connecting artisans with conscious buyers. Available all over Bangladesh, not globally.

## Current Status
✅ **Phase E Complete** - Checkout, Orders & Admin Dashboard
✅ **Phase D Complete** - Vercel Deployment & Environment Fix
✅ **Phase C Complete** - User Authentication & Cart
✅ **Phase B Complete** - Homepage Integration
✅ **Phase A Complete** - Page-to-Page Linking Fixed
✅ **Phase 6 Complete** - Convex Backend Integration

### Implementation Log
- [x] **Checkout Flow & Orders**
  - [x] Checkout page with shipping address form
  - [x] Order creation and cart clearing
  - [x] Order confirmation page
  - [x] Order history page with expandable details
  - [x] Status badges (pending/processing/shipped/delivered)
- [x] **Admin Dashboard**
  - [x] Artisan selector for multi-artisan support
  - [x] Overview tab with sales stats
  - [x] Products tab with add/edit/delete
  - [x] Orders tab with status management
- [x] **Vercel Deployment**
  - [x] Configured `VITE_CONVEX_URL` in Vercel for production connectivity
  - [x] Updated `SITE_URL` in Convex for authentication redirects
- [x] React 19 + Vite + TypeScript setup
- [x] Tailwind CSS v3 with custom earth-tone theme
- [x] Google Fonts (Epilogue, Manrope, Noto Serif)
- [x] Header with logo, search, cart/wishlist icons, orders link
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
  - [x] HTTP actions enabled for auth
  - [x] JWT environment variables configured
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

## Environment Variables
For production (Vercel), ensure the following are set:
- `VITE_CONVEX_URL`: Your Convex deployment URL (from `npx convex dev` or Convex dashboard).
- `SITE_URL`: (In Convex Dashboard) Your Vercel deployment URL (e.g., `https://karu-bd.vercel.app`).

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
├── pages/              # Home, Products, ProductDetail, Artisan, Login, Signup, Cart, Checkout, Orders, Admin
└── router.tsx          # Route definitions
convex/
├── schema.ts           # Database schema + auth tables
├── auth.ts             # Convex Auth configuration
├── users.ts            # User and cart mutations
├── products.ts         # Product queries
├── artisans.ts         # Artisan queries
├── categories.ts       # Category queries
├── orders.ts           # Order mutations and queries
└── admin.ts            # Admin dashboard queries and product CRUD
```

## Routing Architecture

All routes are defined in [`src/router.tsx`](file:///y:/Antigravity%20workspace/Handicraft%20Marketplace/KARU/src/router.tsx) using React Router DOM v6.

### Route Map

```mermaid
flowchart TB
    subgraph Public["🌐 Public Routes"]
        HOME["/  HomePage"]
        PRODUCTS["/products  ProductListingPage"]
        PRODUCT_DETAIL["/products/:id  ProductDetailPage"]
        ARTISAN["/artisans/:id  ArtisanProfilePage"]
    end
    
    subgraph Guest["👤 Guest Only"]
        LOGIN["/login  LoginPage"]
        SIGNUP["/signup  SignupPage"]
    end
    
    subgraph Auth["🔐 Authenticated"]
        CART["/cart  CartPage"]
        CHECKOUT["/checkout  CheckoutPage"]
        ORDERS["/orders  OrdersPage"]
    end
    
    subgraph Artisan["🎨 Artisan Dashboard"]
        ADMIN["/admin  AdminDashboardPage"]
    end
    
    HOME --> PRODUCTS
    PRODUCTS --> PRODUCT_DETAIL
    PRODUCT_DETAIL --> ARTISAN
    PRODUCT_DETAIL --> CART
    CART --> CHECKOUT
    CHECKOUT --> ORDERS
    LOGIN --> HOME
    SIGNUP --> HOME
```

### Route Table

| Route | Component | Access Level | Description |
|-------|-----------|--------------|-------------|
| `/` | `HomePage` | Public | Hero, trending products, categories, featured artisan |
| `/products` | `ProductListingPage` | Public | Filterable product grid with category/price/material filters |
| `/products/:id` | `ProductDetailPage` | Public | Product gallery, details, add-to-cart, artisan info |
| `/artisans/:id` | `ArtisanProfilePage` | Public | Artisan biography, story, studio, and product collection |
| `/login` | `LoginPage` | Guest | Email/password authentication |
| `/signup` | `SignupPage` | Guest | New user registration |
| `/cart` | `CartPage` | Authenticated | Shopping cart with quantity controls |
| `/checkout` | `CheckoutPage` | Authenticated | Shipping address form, order placement |
| `/orders` | `OrdersPage` | Authenticated | Order history with expandable details and status |
| `/admin` | `AdminDashboardPage` | Artisan | Product CRUD, order management, sales stats |

### Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (Global)                         │
│  Logo → Home | Search | Cart Badge | Orders Link | Auth Links   │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   [Browse Flow]         [Auth Flow]          [Purchase Flow]
        │                     │                     │
   Home Page             Login/Signup           Cart Page
        │                     │                     │
   Product Listing       ──► Redirect ──►      Checkout
        │                     to Home               │
   Product Detail                              Order Confirm
        │                                          │
   Artisan Profile                             Orders Page
```

### Layout Wrapper

All routes use the shared `<Layout>` component which provides:
- **Header**: Logo, navigation, search, cart/wishlist icons, auth state
- **Footer**: Navigation columns, newsletter, social links
- **Consistent styling**: Earth-tone theme, responsive breakpoints

### Dynamic Route Parameters

| Parameter | Route | Usage |
|-----------|-------|-------|
| `:id` | `/products/:id` | Convex product `_id` (e.g., `jh7a...`) |
| `:id` | `/artisans/:id` | Convex artisan `_id` |

### Future Routes (Planned)

| Route | Purpose |
|-------|---------|
| `/wishlist` | Saved/favorited products |
| `/artisan/register` | Artisan onboarding wizard |
| `/search` | Dedicated search results page |
| `/order/:id` | Individual order details |

## Next Steps
3. [ ] Product image upload (image url)
4. [ ] Artisan registration flow  

## Known Issues
- Images are using Unsplash URLs (production should use local assets)
- Admin dashboard requires authentication to view products/orders
