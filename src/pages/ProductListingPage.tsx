import { useState, useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar } from '../components/product/FilterSidebar.tsx';
import { SlidersHorizontal, Grid3x3, LayoutGrid } from 'lucide-react';

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';
export type GridSize = 3 | 4;

export function ProductListingPage() {
    const [showFilters, setShowFilters] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [gridSize, setGridSize] = useState<GridSize>(3);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);

    // Fetch products from Convex
    const products = useQuery(api.products.list, {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
    });

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = products.filter(product => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const artisanMatch = selectedArtisans.length === 0 ||
                (product.artisan && selectedArtisans.includes(product.artisan.name));
            return categoryMatch && artisanMatch;
        });

        // Sort products
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'newest':
                    return new Date(b._creationTime).getTime() - new Date(a._creationTime).getTime();
                case 'popular':
                    return 0; // Would use actual popularity metric
                default:
                    return 0;
            }
        });

        return filtered;
    }, [products, selectedCategories, selectedArtisans, sortBy]);

    // Loading state
    if (products === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-karu-cream">
            {/* Page Header */}
            <div className="bg-white border-b border-karu-sand">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="font-heading text-4xl font-bold text-karu-charcoal mb-2">
                        Discover Handcrafted Treasures
                    </h1>
                    <p className="text-karu-stone">
                        Explore {filteredProducts.length} unique pieces from talented artisans across Bangladesh
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    {showFilters && (
                        <aside className="w-64 flex-shrink-0">
                            <FilterSidebar
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedArtisans={selectedArtisans}
                                setSelectedArtisans={setSelectedArtisans}
                            />
                        </aside>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-karu-sand">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 border border-karu-sand rounded-karu hover:bg-karu-sand transition-colors"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {showFilters ? 'Hide' : 'Show'} Filters
                                </span>
                            </button>

                            <div className="flex items-center gap-4">
                                {/* Sort Dropdown */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="px-4 py-2 border border-karu-sand rounded-karu text-sm focus:outline-none focus:ring-2 focus:ring-karu-terracotta"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="popular">Most Popular</option>
                                </select>

                                {/* Grid Size Toggle */}
                                <div className="flex gap-1 border border-karu-sand rounded-karu p-1">
                                    <button
                                        onClick={() => setGridSize(3)}
                                        className={`p-2 rounded transition-colors ${gridSize === 3 ? 'bg-karu-terracotta text-white' : 'hover:bg-karu-sand'
                                            }`}
                                        aria-label="3 columns"
                                    >
                                        <Grid3x3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setGridSize(4)}
                                        className={`p-2 rounded transition-colors ${gridSize === 4 ? 'bg-karu-terracotta text-white' : 'hover:bg-karu-sand'
                                            }`}
                                        aria-label="4 columns"
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className={`grid gap-6 ${gridSize === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        name={product.name}
                                        price={product.price}
                                        artisan={product.artisan?.name || 'Unknown'}
                                        artisanSlug={product.artisan?.slug}
                                        image={product.images[0]}
                                        isTrending={product.isTrending}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-karu-stone text-lg">No products found matching your filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSelectedArtisans([]);
                                        setPriceRange([0, 500]);
                                    }}
                                    className="mt-4 text-karu-terracotta hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
