import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        <section className="relative hero-gradient grain-texture overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-karu-terracotta/10 text-karu-terracotta text-sm font-medium mb-6">
                            <Sparkles className="h-4 w-4" />
                            <span>Handcrafted with love</span>
                        </div>

                        <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 text-karu-charcoal">
                            Discover the{" "}
                            <span className="text-gradient">artistry</span>{" "}
                            behind every piece
                        </h1>

                        <p className="text-lg text-karu-stone mb-8 max-w-lg leading-relaxed">
                            Connect directly with skilled artisans from around the world.
                            Each piece tells a story of tradition, creativity, and craftsmanship
                            passed down through generations.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/products">
                                <Button variant="hero">
                                    Explore Marketplace
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="/artisans">
                                <Button variant="hero-outline">
                                    Meet Our Artisans
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-karu-sand/50">
                            <div>
                                <p className="font-heading text-3xl font-semibold text-karu-terracotta">2,500+</p>
                                <p className="text-sm text-karu-stone">Artisans</p>
                            </div>
                            <div>
                                <p className="font-heading text-3xl font-semibold text-karu-terracotta">50k+</p>
                                <p className="text-sm text-karu-stone">Products</p>
                            </div>
                            <div>
                                <p className="font-heading text-3xl font-semibold text-karu-terracotta">180+</p>
                                <p className="text-sm text-karu-stone">Countries</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-soft-lg animate-float">
                                    <img
                                        src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=400&h=500&fit=crop"
                                        alt="Handmade pottery"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden aspect-square shadow-soft-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=300&h=300&fit=crop"
                                        alt="Woven basket"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="rounded-2xl overflow-hidden aspect-square shadow-soft-lg">
                                    <img
                                        src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300&h=300&fit=crop"
                                        alt="Handmade jewelry"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-soft-lg animate-float" style={{ animationDelay: "1.5s" }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop"
                                        alt="Handmade textiles"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-karu-terracotta/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-karu-clay/5 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
