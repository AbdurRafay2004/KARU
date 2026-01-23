import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { Unauthenticated } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { ProductCard } from '../components/product/ProductCard';
import type { Id } from '../../convex/_generated/dataModel';
import { useState } from 'react';

export function WishlistPage() {
    const wishlist = useQuery(api.wishlist.getWishlist);
    const removeFromWishlist = useMutation(api.wishlist.removeFromWishlist);
    const addToCart = useMutation(api.users.addToCart);
    const [addingToCart, setAddingToCart] = useState<string | null>(null);

    const handleAddToCart = async (productId: Id<"products">) => {
        setAddingToCart(productId);
        try {
            await addToCart({ productId, quantity: 1 });
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setAddingToCart(null);
        }
    };

    // Loading state
    if (wishlist === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-8">
                        My Wishlist
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-square bg-karu-sand rounded-karu mb-3"></div>
                                <div className="h-4 bg-karu-sand rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-karu-sand rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Unauthenticated state
    if (wishlist === null) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center px-4">
                <Unauthenticated>
                    <div className="max-w-md text-center">
                        <div className="w-20 h-20 bg-karu-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-karu-terracotta" />
                        </div>
                        <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-3">
                            Save Your Favorites
                        </h1>
                        <p className="text-karu-stone mb-6">
                            Sign in to create a wishlist and save items you love for later.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/login"
                                className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-flex px-6 py-3 border border-karu-charcoal text-karu-charcoal rounded-karu font-medium hover:bg-karu-charcoal hover:text-white transition-colors"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </Unauthenticated>
            </div>
        );
    }

    // Empty wishlist state
    if (wishlist.products.length === 0) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <div className="w-20 h-20 bg-karu-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-10 h-10 text-karu-terracotta" />
                    </div>
                    <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-3">
                        Your Wishlist is Empty
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Start browsing and save items you love by clicking the heart icon.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                    >
                        Explore Products
                    </Link>
                </div>
            </div>
        );
    }

    // Wishlist with items
    return (
        <div className="min-h-screen bg-karu-cream py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-heading text-3xl font-bold text-karu-charcoal">
                            My Wishlist
                        </h1>
                        <p className="text-karu-stone mt-1">
                            {wishlist.products.length} {wishlist.products.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {wishlist.products.map((product) => (
                        <div key={product._id} className="group relative">
                            <ProductCard
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                artisan={product.artisan?.name || 'Unknown'}
                                artisanSlug={product.artisan?.slug}
                                image={product.images[0]}
                                isTrending={product.isTrending}
                            />

                            {/* Quick Actions */}
                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={() => handleAddToCart(product._id)}
                                    disabled={addingToCart === product._id}
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-emerald text-white text-sm rounded-karu hover:scale-105 hover:shadow-lg transition-all shadow-md disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    {addingToCart === product._id ? 'Adding...' : 'Add to Cart'}
                                </button>
                                <button
                                    onClick={() => removeFromWishlist({ productId: product._id })}
                                    className="p-2 text-karu-stone hover:text-red-500 transition-colors"
                                    title="Remove from wishlist"
                                >
                                    <Heart className="w-4 h-4 fill-current" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
