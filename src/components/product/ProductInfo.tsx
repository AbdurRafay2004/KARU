import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductInfoProps {
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

export function ProductInfo({ name, price, category, description, artisan }: ProductInfoProps) {
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
                <button className="flex-1 flex items-center justify-center gap-2 bg-karu-charcoal text-white px-8 py-4 rounded-full font-semibold hover:bg-karu-charcoal/90 transition-all">
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                </button>
                <button className="flex items-center justify-center p-4 border border-karu-sand rounded-full hover:bg-karu-sand/20 transition-all text-karu-charcoal">
                    <Heart className="w-6 h-6" />
                </button>
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
