import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SellPage } from './pages/SellPage';
import { OnboardingPage } from './pages/OnboardingPage';

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
        path: '/artisans/:id',
        element: <Layout><ArtisanProfilePage /></Layout>,
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
]);
