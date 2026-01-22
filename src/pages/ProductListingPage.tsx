import { useState } from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar } from '../components/product/FilterSidebar.tsx';
import { SlidersHorizontal, Grid3x3, LayoutGrid } from 'lucide-react';

// Mock product data - will be replaced with Convex backend
const MOCK_PRODUCTS = [
    { id: '1', name: 'Handwoven Basket', price: 45, artisan: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500', category: 'Home Decor', dateAdded: '2024-01-15' },
    { id: '2', name: 'Ceramic Bowl Set', price: 89, artisan: 'Maria Santos', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500', category: 'Home Decor', dateAdded: '2024-01-20' },
    { id: '3', name: 'Silver Pendant Necklace', price: 125, artisan: 'Aisha Khan', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500', category: 'Jewelry', dateAdded: '2024-01-18' },
    { id: '4', name: 'Embroidered Cushion', price: 35, artisan: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500', category: 'Textiles', dateAdded: '2024-01-22' },
    { id: '5', name: 'Wooden Wall Art', price: 150, artisan: 'James Chen', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500', category: 'Home Decor', dateAdded: '2024-01-10' },
    { id: '6', name: 'Brass Earrings', price: 55, artisan: 'Aisha Khan', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500', category: 'Jewelry', dateAdded: '2024-01-25' },
    { id: '7', name: 'Hand-dyed Scarf', price: 68, artisan: 'Maria Santos', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500', category: 'Textiles', dateAdded: '2024-01-12' },
    { id: '8', name: 'Terracotta Vase', price: 42, artisan: 'James Chen', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500', category: 'Home Decor', dateAdded: '2024-01-28' },
    { id: '9', name: 'Beaded Bracelet', price: 38, artisan: 'Aisha Khan', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500', category: 'Jewelry', dateAdded: '2024-01-14' },
    { id: '10', name: 'Woven Table Runner', price: 52, artisan: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500', category: 'Textiles', dateAdded: '2024-01-30' },
    { id: '11', name: 'Pottery Planter', price: 48, artisan: 'Maria Santos', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500', category: 'Home Decor', dateAdded: '2024-01-16' },
    { id: '12', name: 'Gold Ring', price: 195, artisan: 'Aisha Khan', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500', category: 'Jewelry', dateAdded: '2024-01-21' },
];

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'popular';
export type GridSize = 3 | 4;

export function ProductListingPage() {
    const [showFilters, setShowFilters] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [gridSize, setGridSize] = useState<GridSize>(3);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
    const [selectedArtisans, setSelectedArtisans] = useState<string[]>([]);

    // Filter and sort products
    const filteredProducts = MOCK_PRODUCTS.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        const artisanMatch = selectedArtisans.length === 0 || selectedArtisans.includes(product.artisan);
        return categoryMatch && priceMatch && artisanMatch;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
            case 'popular':
                return 0; // Would use actual popularity metric
            default:
                return 0;
        }
    });

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
                                    <ProductCard key={product.id} {...product} />
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
