import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { ArtisansPage } from './pages/ArtisansPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SellPage } from './pages/SellPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { WishlistPage } from './pages/WishlistPage';
import { SettingsPage } from './pages/SettingsPage';
import {
    MarketplacePage,
    StoryPage,
    GiftCardsPage,
    SustainabilityPage,
    CareersPage,
    PressPage,
    ShippingPage,
    HelpPage,
    ContactPage,
    PrivacyPage,
    TermsPage,
} from './pages/PlaceholderPages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout><HomePage /></Layout>,
    },
    {
        path: '/products',
        element: <Layout><ProductListingPage /></Layout>,
    },
    {
        path: '/products/:id',
        element: <Layout><ProductDetailPage /></Layout>,
    },
    {
        path: '/artisans',
        element: <Layout><ArtisansPage /></Layout>,
    },
    {
        path: '/artisans/:id',
        element: <Layout><ArtisanProfilePage /></Layout>,
    },
    {
        path: '/marketplace',
        element: <Layout><MarketplacePage /></Layout>,
    },
    {
        path: '/login',
        element: <Layout><LoginPage /></Layout>,
    },
    {
        path: '/signup',
        element: <Layout><SignupPage /></Layout>,
    },
    {
        path: '/cart',
        element: <Layout><CartPage /></Layout>,
    },
    {
        path: '/checkout',
        element: <Layout><CheckoutPage /></Layout>,
    },
    {
        path: '/orders',
        element: <Layout><OrdersPage /></Layout>,
    },
    {
        path: '/admin',
        element: <Layout><AdminDashboardPage /></Layout>,
    },
    {
        path: '/sell',
        element: <Layout><SellPage /></Layout>,
    },
    {
        path: '/onboarding',
        element: <Layout><OnboardingPage /></Layout>,
    },
    {
        path: '/wishlist',
        element: <Layout><WishlistPage /></Layout>,
    },
    {
        path: '/settings',
        element: <Layout><SettingsPage /></Layout>,
    },
    // Footer placeholder pages
    {
        path: '/story',
        element: <Layout><StoryPage /></Layout>,
    },
    {
        path: '/gift-cards',
        element: <Layout><GiftCardsPage /></Layout>,
    },
    {
        path: '/sustainability',
        element: <Layout><SustainabilityPage /></Layout>,
    },
    {
        path: '/careers',
        element: <Layout><CareersPage /></Layout>,
    },
    {
        path: '/press',
        element: <Layout><PressPage /></Layout>,
    },
    {
        path: '/shipping',
        element: <Layout><ShippingPage /></Layout>,
    },
    {
        path: '/help',
        element: <Layout><HelpPage /></Layout>,
    },
    {
        path: '/contact',
        element: <Layout><ContactPage /></Layout>,
    },
    {
        path: '/privacy',
        element: <Layout><PrivacyPage /></Layout>,
    },
    {
        path: '/terms',
        element: <Layout><TermsPage /></Layout>,
    },
]);
