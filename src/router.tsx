import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ArtisanProfilePage } from './pages/ArtisanProfilePage';

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
]);
