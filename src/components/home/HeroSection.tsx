import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center hero-gradient grain-texture overflow-hidden">
            {/* Decorative Nakshi Kantha Pattern */}
            <svg className="absolute top-0 right-0 w-1/3 h-auto opacity-3 pointer-events-none hidden lg:block" viewBox="0 0 200 200">
                <defs>
                    <pattern id="nakshi" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="2" fill="#C75D3C" />
                        <path d="M5,5 L15,5 L15,15 L5,15 Z" stroke="#8B5A3C" strokeWidth="0.5" fill="none" />
                    </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#nakshi)" />
            </svg>

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-karu-indigo/10 via-transparent to-karu-cream pointer-events-none"></div>

            {/* Frosted Background Elements */}
            <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-karu-terracotta/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-karu-coral/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-[40%] right-[30%] w-64 h-64 bg-karu-emerald/5 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ animationDelay: '4s' }}></div>

            {/* Bright Orange Organic Circles (User Requested #f78f20) */}
            <div className="absolute top-[20%] left-[15%] w-56 h-56 bg-[#f78f20]/25 rounded-full blur-[90px] animate-organic pointer-events-none"></div>
            <div className="absolute bottom-[10%] left-[40%] w-72 h-72 bg-[#f78f20]/20 rounded-full blur-[100px] animate-organic-slow pointer-events-none"></div>
            <div className="absolute bottom-[2%] left-[75%] w-82 h-82 bg-[#f78f20]/20 rounded-full blur-[70px] animate-organic-slow pointer-events-none"></div>
            {/* Global Frost Layer */}
            <div className="absolute inset-0 backdrop-blur-[30px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-karu-terracotta/10 text-karu-terracotta text-sm font-medium mb-6 animate-fade-in">
                            <Sparkles className="h-4 w-4" />
                            <span>Handcrafted with love</span>
                        </div>

                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight mb-6 text-karu-charcoal">
                            <span className="font-bangla text-gradient-sunset">কারু</span> — Discover the{" "}
                            <span className="font-display italic text-gradient-sunset">artistry</span>

                            {" "}behind every piece
                        </h1>

                        <p className="text-lg md:text-xl text-karu-stone mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 animate-slide-up animation-delay-200">
                            Where <span className="font-semibold text-karu-saffron">Bangladeshi artisans</span> meet conscious collectors
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slide-up animation-delay-300">
                            <Link to="/products">
                                <Button variant="gradient-glow">
                                    Explore Marketplace
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link to="/artisans">
                                <Button variant="hero-outline">
                                    Meet Our Artisans
                                </Button>
                            </Link>
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
                                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl transition-shadow duration-500 animate-float">
                                    <img
                                        src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=400&h=500&fit=crop"
                                        alt="Handmade pottery"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                                <div className="rounded-3xl overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition-shadow duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=300&h=300&fit=crop"
                                        alt="Woven basket"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 pt-12">
                                <div className="rounded-3xl overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition-shadow duration-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=300&h=300&fit=crop"
                                        alt="Handmade jewelry"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl transition-shadow duration-500 animate-float" style={{ animationDelay: "1.5s" }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop"
                                        alt="Handmade textiles"
                                        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 transition-all duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-karu-saffron/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-karu-emerald/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-20">
                <ChevronDown className="w-8 h-8 text-karu-stone opacity-60 hover:opacity-100 transition-opacity" />
            </div>
        </section>
    );
};

export default HeroSection;
