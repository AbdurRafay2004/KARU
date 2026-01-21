import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function FeaturedArtisan() {
    return (
        <section className="py-16 md:py-20 bg-karu-warm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <span className="text-xs font-medium text-karu-stone uppercase tracking-wider">
                            Featured Artisan
                        </span>

                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-karu-charcoal mt-4 mb-6">
                            Elena Rossi
                        </h2>

                        <blockquote className="font-accent text-lg md:text-xl italic text-karu-charcoal/80 mb-6 leading-relaxed">
                            "In a world of mass production, every weave carries a story of
                            time, patience, and human touch. I aim to preserve the
                            ancient art of Tuscan weaving."
                        </blockquote>

                        <p className="text-karu-stone mb-8 leading-relaxed">
                            Elena works from her small studio in Florence, using looms that have
                            been in her family for three generations. She sources local, sustainable
                            wool and linen to create textiles that are both sustainable and
                            timeless.
                        </p>

                        <Link
                            to="/artisans/elena-rossi"
                            className="inline-flex items-center gap-2 text-karu-terracotta font-medium hover:gap-3 transition-all"
                        >
                            Read the Full Story
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] rounded-karu overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=600&q=80"
                                alt="Elena Rossi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            <div className="aspect-square rounded-karu overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80"
                                    alt="Woven textile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="aspect-square rounded-karu overflow-hidden bg-karu-sand">
                                <img
                                    src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&q=80"
                                    alt="Textile detail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
