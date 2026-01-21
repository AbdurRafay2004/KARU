import { useState } from 'react';
import { ProductCard } from '../product/ProductCard';

const SAMPLE_PRODUCTS = [
    {
        id: '1',
        name: 'Woven Jute Rug',
        price: 120,
        artisan: 'Studio Craft',
        image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&q=80',
    },
    {
        id: '2',
        name: 'Speckled Mug',
        price: 35,
        artisan: 'Clay Soul',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    },
    {
        id: '3',
        name: 'Pearl Drop Earrings',
        price: 85,
        artisan: 'Luna Jewelry',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    },
    {
        id: '4',
        name: 'Walnut Bowl',
        price: 65,
        artisan: 'Woodworks',
        image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&q=80',
        isTrending: true,
    },
];

type FilterTab = 'all' | 'new' | 'bestsellers';

export function TrendingSection() {
    const [activeTab, setActiveTab] = useState<FilterTab>('all');

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
                    <div className="flex items-center gap-1 bg-karu-sand/50 p-1 rounded-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${activeTab === tab.id
                                        ? 'bg-white text-karu-charcoal shadow-sm'
                                        : 'text-karu-stone hover:text-karu-charcoal'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {SAMPLE_PRODUCTS.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
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
