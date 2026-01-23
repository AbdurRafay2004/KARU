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
        <article className="group relative">
            {/* Image Container */}
            <Link to={`/products/${id}`} className="block relative aspect-square rounded-karu overflow-hidden bg-karu-sand">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Trending Badge */}
                {isTrending && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-karu-charcoal">
                        Trending
                    </span>
                )}

                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white">
                    <WishlistButton
                        productId={id as Id<"products">}
                        size="sm"
                    />
                </div>
            </Link>

            {/* Product Info */}
            <div className="mt-3">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="font-medium text-karu-charcoal">
                            <Link to={`/products/${id}`} className="hover:text-karu-terracotta transition-colors">
                                {name}
                            </Link>
                        </h3>
                        <p className="text-sm text-karu-stone">
                            by <Link to={`/artisans/${slug}`} className="hover:text-karu-terracotta transition-colors">{artisan}</Link>
                        </p>
                    </div>
                    <span className="font-heading font-semibold text-karu-terracotta">${price}</span>
                </div>
            </div>
        </article>
    );
}
