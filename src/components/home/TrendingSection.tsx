import { useState, useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ProductCard } from '../product/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

type FilterTab = 'all' | 'new' | 'bestsellers';

export function TrendingSection() {
    const [activeTab, setActiveTab] = useState<FilterTab>('all');

    // Fetch trending products from Convex
    const trendingProducts = useQuery(api.products.trending);

    // Filter products based on active tab
    const filteredProducts = useMemo(() => {
        if (!trendingProducts) return undefined;

        switch (activeTab) {
            case 'new':
                // Sort by creation time (newest first) and take top items
                return [...trendingProducts]
                    .sort((a, b) => (b._creationTime || 0) - (a._creationTime || 0))
                    .slice(0, 4);
            case 'bestsellers':
                // For now, show products with higher prices as "bestsellers" (mock logic)
                return [...trendingProducts]
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 4);
            case 'all':
            default:
                return trendingProducts;
        }
    }, [trendingProducts, activeTab]);

    const tabs: { id: FilterTab; label: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'new', label: 'New Arrivals' },
        { id: 'bestsellers', label: 'Best Sellers' },
    ];

    return (
        <section className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-karu-charcoal">
                            Trending Now
                        </h2>
                        <p className="text-karu-stone mt-1">Curated pieces that are making waves</p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1 bg-karu-sand/30 p-1 rounded-full relative">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors z-10 ${activeTab === tab.id
                                    ? 'text-karu-charcoal'
                                    : 'text-karu-stone hover:text-karu-charcoal'
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.span
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="min-h-[400px]">
                    {filteredProducts === undefined ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="aspect-square bg-karu-sand rounded-karu mb-3"></div>
                                    <div className="h-4 bg-karu-sand rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-karu-sand rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProductCard
                                            id={product._id}
                                            name={product.name}
                                            price={product.price}
                                            artisan={product.artisan?.name || 'Unknown'}
                                            artisanSlug={product.artisan?.slug}
                                            image={product.images[0]}
                                            isTrending={product.isTrending}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-karu-stone">No products found for this filter.</p>
                        </div>
                    )}
                </div>

                {/* Load More */}
                <div className="mt-10 text-center">
                    <button className="inline-flex items-center justify-center px-6 py-3 border border-karu-charcoal text-karu-charcoal rounded-full font-medium hover:bg-karu-charcoal hover:text-white transition-colors">
                        Load More Products
                    </button>
                </div>
            </div>
        </section>
    );
}
