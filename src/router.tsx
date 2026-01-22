import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout><HomePage /></Layout>,
    },
    {
        path: '/products/:id',
        element: <Layout><ProductDetailPage /></Layout>,
    },
    // Future routes
    // { path: '/products', element: <Layout><ProductsPage /></Layout> },
    // { path: '/products/:id', element: <Layout><ProductDetailPage /></Layout> },
    // { path: '/artisans/:id', element: <Layout><ArtisanPage /></Layout> },
]);
