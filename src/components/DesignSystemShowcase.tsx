import { Heart, ShoppingCart, Star, Sparkles } from 'lucide-react';

/**
 * Design System Showcase - Phase 1 Test Component
 * Demonstrates the new premium design system capabilities
 */
export function DesignSystemShowcase() {
    return (
        <div className="min-h-screen bg-karu-cream p-8">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center animate-slide-up">
                    <h1 className="font-display text-karu-indigo mb-4">
                        Design System 2.0
                    </h1>
                    <p className="text-xl text-karu-stone font-body">
                        Premium components with vibrant aesthetics
                    </p>
                </div>

                {/* Color Palette */}
                <section className="animate-fade-in animation-delay-200">
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Color Palette</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <ColorSwatch name="Saffron" color="bg-karu-saffron" />
                        <ColorSwatch name="Amber" color="bg-karu-amber" />
                        <ColorSwatch name="Emerald" color="bg-karu-emerald" />
                        <ColorSwatch name="Indigo" color="bg-karu-indigo" />
                        <ColorSwatch name="Coral" color="bg-karu-coral" />
                    </div>
                </section>

                {/* Gradients */}
                <section className="animate-fade-in animation-delay-300">
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Gradients</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="h-32 rounded-2xl bg-gradient-sunset flex items-center justify-center text-white font-display text-xl shadow-lg">
                            Sunset
                        </div>
                        <div className="h-32 rounded-2xl bg-gradient-earth flex items-center justify-center text-white font-display text-xl shadow-lg">
                            Earth
                        </div>
                        <div className="h-32 rounded-2xl bg-gradient-emerald flex items-center justify-center text-white font-display text-xl shadow-lg">
                            Emerald
                        </div>
                    </div>
                </section>

                {/* Typography Scale */}
                <section className="animate-fade-in animation-delay-400">
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Typography</h2>
                    <div className="space-y-4 bg-white p-8 rounded-3xl shadow-md">
                        <h1 className="font-display text-karu-indigo">H1 - Playfair Display</h1>
                        <h2 className="font-display text-karu-indigo">H2 - Heading Level 2</h2>
                        <h3 className="font-display text-karu-indigo">H3 - Heading Level 3</h3>
                        <p className="font-body text-karu-stone">
                            Body text using Inter - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <p className="font-bangla text-2xl text-karu-terracotta">
                            কারুশিল্প - Anek Bangla Font
                        </p>
                    </div>
                </section>

                {/* Buttons */}
                <section className="animate-fade-in animation-delay-500">
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Interactive Buttons</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-8 py-4 bg-gradient-sunset text-white font-semibold rounded-full shadow-glow hover:shadow-glow-strong transition-all duration-300 hover:scale-105">
                            Gradient Button
                        </button>
                        <button className="px-8 py-4 btn-gradient-sunset text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                            Animated Gradient
                        </button>
                        <button className="px-8 py-4 bg-karu-emerald text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 animate-glow">
                            Glow Effect
                        </button>
                    </div>
                </section>

                {/* Product Card Examples */}
                <section>
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Premium Product Card</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ProductCardDemo />
                        <ProductCardDemo highlighted />
                        <ProductCardDemo />
                    </div>
                </section>

                {/* Glassmorphism */}
                <section className="animate-fade-in">
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Glassmorphism</h2>
                    <div className="relative h-64 rounded-3xl overflow-hidden bg-gradient-sunset p-8">
                        <div className="absolute inset-4 glass rounded-2xl p-8 text-white">
                            <h3 className="font-display text-2xl mb-3">Glass Card</h3>
                            <p className="font-body opacity-90">
                                Premium frosted glass effect with backdrop blur
                            </p>
                        </div>
                    </div>
                </section>

                {/* Shadows */}
                <section>
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Shadow System</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center font-body">SM</div>
                        <div className="h-32 bg-white rounded-xl shadow-md flex items-center justify-center font-body">MD</div>
                        <div className="h-32 bg-white rounded-xl shadow-lg flex items-center justify-center font-body">LG</div>
                        <div className="h-32 bg-white rounded-xl shadow-xl flex items-center justify-center font-body">XL</div>
                    </div>
                </section>

                {/* Animations */}
                <section>
                    <h2 className="font-display text-3xl mb-6 text-karu-charcoal">Micro-Animations</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="h-32 bg-karu-saffron rounded-xl flex items-center justify-center text-white font-body animate-fade-in">
                            Fade In
                        </div>
                        <div className="h-32 bg-karu-amber rounded-xl flex items-center justify-center text-white font-body animate-slide-up">
                            Slide Up
                        </div>
                        <div className="h-32 bg-karu-emerald rounded-xl flex items-center justify-center text-white font-body animate-float">
                            Float
                        </div>
                        <div className="h-32 bg-karu-indigo rounded-xl flex items-center justify-center text-white font-body animate-bounce-in">
                            Bounce In
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

// Helper Components
function ColorSwatch({ name, color }: { name: string; color: string }) {
    return (
        <div className="group cursor-pointer">
            <div className={`h-24 ${color} rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300`}></div>
            <p className="text-sm font-body text-karu-stone mt-2 text-center">{name}</p>
        </div>
    );
}

function ProductCardDemo({ highlighted = false }: { highlighted?: boolean }) {
    return (
        <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${highlighted ? 'ring-2 ring-karu-saffron' : ''}`}>
            {/* Image */}
            <div className="relative aspect-square bg-gradient-to-br from-karu-sand to-karu-warm overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-karu-terracotta opacity-30 group-hover:scale-150 transition-transform duration-700" />
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Quick actions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-karu-saffron hover:text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2 text-karu-charcoal group-hover:text-karu-saffron transition-colors">
                    Artisan Product
                </h3>
                <p className="text-sm text-karu-stone mb-4 line-clamp-2 font-body">
                    Handcrafted with love by skilled artisans
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-karu-terracotta font-display">৳499</span>

                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                    </div>
                </div>
            </div>

            {/* New badge */}
            {highlighted && (
                <div className="absolute top-4 right-4 bg-gradient-sunset text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg animate-glow">
                    Featured
                </div>
            )}
        </div>
    );
}
