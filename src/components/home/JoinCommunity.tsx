import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Heart } from 'lucide-react';

export function JoinCommunity() {
    return (
        <section className="py-16 md:py-20 bg-karu-charcoal text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center md:text-left md:mx-0">
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
                        Join the Artisan Community
                    </h2>

                    <p className="text-karu-sand/80 mb-8 max-w-xl">
                        Turn your craft into a business. We provide the platform, you provide
                        the passion. Join thousands of makers sharing their art with the
                        world.
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-6 mb-8 justify-center md:justify-start">
                        <div className="flex items-center gap-2 text-sm">
                            <ShieldCheck className="w-5 h-5 text-karu-terracotta" />
                            <span className="text-karu-sand/80">Zero Fees</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Truck className="w-5 h-5 text-karu-terracotta" />
                            <span className="text-karu-sand/80">Global Shipping</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Heart className="w-5 h-5 text-karu-terracotta" />
                            <span className="text-karu-sand/80">Secure Payments</span>
                        </div>
                    </div>

                    <Link
                        to="/sell"
                        className="inline-flex items-center justify-center px-6 py-3 bg-white text-karu-charcoal rounded-full font-medium hover:bg-karu-cream transition-colors"
                    >
                        Become a Seller
                    </Link>
                </div>
            </div>
        </section>
    );
}
