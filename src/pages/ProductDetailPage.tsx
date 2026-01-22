import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { ChevronLeft } from 'lucide-react';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';

export function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();

    // Fetch product from Convex
    const product = useQuery(
        api.products.get,
        id ? { id: id as Id<"products"> } : "skip"
    );

    // Loading state
    if (product === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading product...</p>
                </div>
            </div>
        );
    }

    // Not found state
    if (product === null) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-4">
                        Product Not Found
                    </h1>
                    <p className="text-karu-stone mb-6">
                        The product you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-karu-terracotta text-white rounded-karu hover:bg-karu-clay transition-colors"
                    >
                        Browse All Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-8 pb-16 md:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb / Back button */}
                <div className="mb-8">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-sm text-karu-stone hover:text-karu-terracotta transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Products
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-7">
                        <ProductGallery images={product.images} />
                    </div>
                    <div className="lg:col-span-5">
                        <ProductInfo
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            description={product.description}
                            artisan={product.artisan ? {
                                id: product.artisan.slug,
                                name: product.artisan.name,
                                description: product.artisan.bio ?? '',
                            } : null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
