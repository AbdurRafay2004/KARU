import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';

// Mock data for initial implementation
const MOCK_PRODUCT = {
    id: '1',
    name: 'Woven Jute Rug',
    price: 120,
    category: 'Home Decor',
    description: 'Our hand-woven jute rug is more than just a floor covering. Each piece is crafted using sustainable, high-quality jute fibers sourced from local farmers. The subtle patterns and earthy tones reflect the natural beauty of the material, bringing a touch of warmth and craftsmanship to any room. This rug is designed to be durable, eco-friendly, and uniquely yours.',
    images: [
        'https://images.unsplash.com/photo-1600166898405-da9535204843?w=1200&q=80',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
        'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=1200&q=80',
    ],
    artisan: {
        id: 'studio-craft',
        name: 'Studio Craft',
        description: 'Based in the serene mountains, Studio Craft focuses on ancient weaving techniques passed down through generations. They believe in the soul of handmade goods and ethical production.',
    }
};

export function ProductDetailPage() {
    const { id: _id } = useParams();

    // In a real app, you would fetch data here
    const product = MOCK_PRODUCT;

    return (
        <div className="pt-8 pb-16 md:pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb / Back button */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-karu-stone hover:text-karu-terracotta transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
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
                            artisan={product.artisan}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
