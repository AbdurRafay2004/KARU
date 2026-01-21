import { ArrowRight } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-karu-charcoal/80 to-karu-charcoal/40 z-10" />

            {/* Background image placeholder - pottery hands */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80')`,
                }}
            />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="max-w-xl">
                    <span className="inline-block px-3 py-1 bg-karu-terracotta/90 text-white text-xs font-medium rounded-full mb-6">
                        NEW COLLECTION 2026
                    </span>

                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                        Handcrafted<br />
                        <span className="font-accent italic font-normal">with Soul.</span>
                    </h1>

                    <p className="text-white/80 text-lg mb-8 max-w-md">
                        Discover unique pieces directly from artisans around the world. Quality that tells a story.
                    </p>

                    <button className="inline-flex items-center gap-2 bg-karu-terracotta hover:bg-karu-terracotta/90 text-white px-6 py-3 rounded-full font-medium transition-all hover:gap-3">
                        Explore Ceramics
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
