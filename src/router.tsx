import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout><HomePage /></Layout>,
    },
    // Future routes
    // { path: '/products', element: <Layout><ProductsPage /></Layout> },
    // { path: '/products/:id', element: <Layout><ProductDetailPage /></Layout> },
    // { path: '/artisans/:id', element: <Layout><ArtisanPage /></Layout> },
]);
