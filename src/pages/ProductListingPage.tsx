import { useState, useMemo } from 'react';
import { useQuery } from 'convex/react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton';
import { FilterSidebar } from '../components/product/FilterSidebar.tsx';
import { SlidersHorizontal, Grid3x3, LayoutGrid, X } from 'lucide-react';

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';
export type GridSize = 3 | 4;

export function ProductListingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [gridSize, setGridSize] = useState<GridSize>(3);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);

    // Fetch artisans for filter
    const artisans = useQuery(api.artisans.list) || [];

    // Determine which query to run
    // For listing, we push filtering to backend
    const productsList = useQuery(api.products.list, {
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        categories: selectedCategories,
        artisanIds: selectedArtisans.length > 0 ? selectedArtisans as Id<"artisans">[] : undefined,
    });

    const searchResults = useQuery(api.products.search, searchQuery ? { query: searchQuery } : "skip");

    // Use search results if query exists, updates automatically when query changes
    const products = searchQuery ? searchResults : productsList;

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = products;

        // Search results don't support price/category/artisan filtering at database level yet,
        // so client-side filter if search is active
        if (searchQuery) {
            filtered = filtered.filter(product => {
                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
                const artisanMatch = selectedArtisans.length === 0 || selectedArtisans.includes(product.artisanId);
                return categoryMatch && artisanMatch;
            });
            filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
        }

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
    }, [products, selectedCategories, selectedArtisans, sortBy, searchQuery, priceRange]);

    // Clear search
    const clearSearch = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('search');
        setSearchParams(newParams);
    };

    // Loading state with skeleton screens
    if (products === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream">
                <div className="bg-white border-b border-karu-sand">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="h-10 bg-gray-200 rounded shimmer w-96 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded shimmer w-64"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-karu-cream">
            {/* Page Header */}
            <div className="bg-white border-b border-karu-sand">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {searchQuery ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="font-heading text-4xl font-bold text-karu-charcoal">
                                        Search Results: "{searchQuery}"
                                    </h1>
                                    <button
                                        onClick={clearSearch}
                                        className="p-1 hover:bg-karu-sand rounded-full transition-colors"
                                        title="Clear search"
                                    >
                                        <X className="w-6 h-6 text-karu-stone" />
                                    </button>
                                </div>
                                <p className="text-karu-stone">
                                    Found {filteredProducts.length} items matching your search
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className="font-heading text-4xl font-bold text-karu-charcoal mb-2">
                                Discover Handcrafted Treasures
                            </h1>
                            <p className="text-karu-stone">
                                Explore {filteredProducts.length} unique pieces from talented artisans across Bangladesh
                            </p>
                        </>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter Sidebar */}
                    {showFilters && (
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <FilterSidebar
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedArtisans={selectedArtisans}
                                setSelectedArtisans={setSelectedArtisans}
                                artisans={artisans}
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
                                <div className="hidden md:flex gap-1 border border-karu-sand rounded-karu p-1">
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
                            <div className={`grid gap-6 grid-cols-2 md:grid-cols-3 ${gridSize === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
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
