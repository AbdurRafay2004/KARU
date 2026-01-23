import { useState } from 'react';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { Authenticated, Unauthenticated } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { WishlistButton } from './WishlistButton';

interface ProductInfoProps {
    productId?: string;
    name: string;
    price: number;
    category: string;
    description: string;
    artisan?: {
        name: string;
        id: string;
        description: string;
    } | null;
}

export function ProductInfo({ productId, name, price, category, description, artisan }: ProductInfoProps) {
    const navigate = useNavigate();
    const addToCart = useMutation(api.users.addToCart);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAddToCart = async () => {
        if (!productId) return;
        setAdding(true);
        try {
            await addToCart({ productId: productId as Id<"products">, quantity: 1 });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        } catch (err) {
            console.error('Failed to add to cart:', err);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Product Heading */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-karu-terracotta uppercase tracking-wider bg-karu-terracotta/10 px-2 py-0.5 rounded-full">
                        {category}
                    </span>
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-karu-charcoal mb-4">
                    {name}
                </h1>
                <div className="flex items-center gap-4">
                    <span className="font-heading text-2xl font-semibold text-karu-terracotta">
                        ${price}
                    </span>
                    <span className="text-sm text-karu-stone">Free shipping on orders over $150</span>
                </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm text-karu-stone leading-relaxed">
                <p>{description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Authenticated>
                    <button
                        onClick={handleAddToCart}
                        disabled={adding || added}
                        className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${added
                            ? 'bg-green-600 text-white'
                            : 'bg-karu-charcoal text-white hover:bg-karu-charcoal/90'
                            } disabled:cursor-not-allowed`}
                    >
                        {added ? (
                            <>
                                <Check className="w-5 h-5" />
                                Added to Cart
                            </>
                        ) : adding ? (
                            'Adding...'
                        ) : (
                            <>
                                <ShoppingBag className="w-5 h-5" />
                                Add to Cart
                            </>
                        )}
                    </button>
                </Authenticated>
                <Unauthenticated>
                    <button
                        onClick={() => navigate('/login')}
                        className="flex-1 flex items-center justify-center gap-2 bg-karu-charcoal text-white px-8 py-4 rounded-full font-semibold hover:bg-karu-charcoal/90 transition-all"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Sign in to Add to Cart
                    </button>
                </Unauthenticated>
                {productId && (
                    <div className="flex items-center justify-center p-2 border border-karu-sand rounded-full hover:bg-karu-sand/20 transition-all">
                        <WishlistButton
                            productId={productId as Id<"products">}
                            size="lg"
                            showText
                        />
                    </div>
                )}
            </div>

            {/* Artisan Summary */}
            {artisan && (
                <div className="p-6 bg-karu-warm rounded-karu-lg border border-karu-sand/30">
                    <h3 className="font-heading font-semibold text-karu-charcoal mb-2">Meet the Artisan</h3>
                    <p className="text-sm text-karu-stone mb-4 line-clamp-2">
                        {artisan.description}
                    </p>
                    <Link
                        to={`/artisans/${artisan.id}`}
                        className="text-sm font-semibold text-karu-terracotta hover:underline"
                    >
                        View {artisan.name}'s Profile
                    </Link>
                </div>
            )}

            {/* Policies */}
            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-karu-sand">
                <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-karu-terracotta flex-shrink-0" />
                    <div>
                        <h4 className="text-xs font-semibold text-karu-charcoal uppercase mb-0.5">Ethically Shipped</h4>
                        <p className="text-xs text-karu-stone">Small-batch shipping to reduce footprint.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-karu-terracotta flex-shrink-0" />
                    <div>
                        <h4 className="text-xs font-semibold text-karu-charcoal uppercase mb-0.5">Quality Guaranteed</h4>
                        <p className="text-xs text-karu-stone">Each piece is inspected before leaving the studio.</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-karu-terracotta flex-shrink-0" />
                    <div>
                        <h4 className="text-xs font-semibold text-karu-charcoal uppercase mb-0.5">30-Day Returns</h4>
                        <p className="text-xs text-karu-stone">Full refund if you're not completely in love.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
