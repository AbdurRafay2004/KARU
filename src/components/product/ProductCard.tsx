import { Link } from 'react-router-dom';
import { WishlistButton } from './WishlistButton';
import type { Id } from '../../../convex/_generated/dataModel';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    artisan: string;
    artisanSlug?: string;
    image: string;
    isTrending?: boolean;
}

export function ProductCard({ id, name, price, artisan, artisanSlug, image, isTrending }: ProductCardProps) {
    // Use provided slug, or derive from artisan name as fallback
    const slug = artisanSlug || artisan.toLowerCase().replace(/\s+/g, '-');

    return (
        <article className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
            {/* Image Container */}
            <Link to={`/products/${id}`} className="block relative aspect-square overflow-hidden bg-karu-sand">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600"
                />

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Trending Badge */}
                {isTrending && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold rounded-full text-karu-charcoal shadow-sm">
                        Trending
                    </span>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <WishlistButton
                        productId={id as Id<"products">}
                        size="sm"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <div className="mb-3">
                    <h3 className="font-display text-lg font-semibold text-karu-charcoal mb-1 group-hover:text-karu-saffron transition-colors">
                        <Link to={`/products/${id}`}>
                            {name}
                        </Link>
                    </h3>
                    <p className="text-sm text-karu-stone">
                        by <Link to={`/artisans/${slug}`} className="hover:text-karu-terracotta transition-colors">{artisan}</Link>
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-bold text-karu-terracotta">৳{price}</span>
                </div>
            </div>
        </article>
    );
}
