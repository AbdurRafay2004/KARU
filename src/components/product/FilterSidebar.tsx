import { X } from 'lucide-react';

interface FilterSidebarProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    selectedArtisans: string[];
    setSelectedArtisans: (artisans: string[]) => void;
}

const CATEGORIES = ['Home Decor', 'Jewelry', 'Textiles', 'Pottery', 'Woodwork'];
const ARTISANS = ['Elena Rossi', 'Maria Santos', 'Aisha Khan', 'James Chen', 'Fatima Ahmed'];

export function FilterSidebar({
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    selectedArtisans,
    setSelectedArtisans,
}: FilterSidebarProps) {
    const toggleCategory = (category: string) => {
        setSelectedCategories(
            selectedCategories.includes(category)
                ? selectedCategories.filter(c => c !== category)
                : [...selectedCategories, category]
        );
    };

    const toggleArtisan = (artisan: string) => {
        setSelectedArtisans(
            selectedArtisans.includes(artisan)
                ? selectedArtisans.filter(a => a !== artisan)
                : [...selectedArtisans, artisan]
        );
    };

    const hasActiveFilters = selectedCategories.length > 0 || selectedArtisans.length > 0 || priceRange[0] > 0 || priceRange[1] < 500;

    const clearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedArtisans([]);
        setPriceRange([0, 500]);
    };

    return (
        <div className="bg-white rounded-karu p-6 sticky top-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-karu-charcoal">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-karu-terracotta hover:underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="mb-8">
                <h3 className="font-medium text-karu-charcoal mb-3">Category</h3>
                <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="w-4 h-4 rounded border-karu-sand text-karu-terracotta focus:ring-karu-terracotta"
                            />
                            <span className="text-sm text-karu-stone group-hover:text-karu-charcoal transition-colors">
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8">
                <h3 className="font-medium text-karu-charcoal mb-3">Price Range</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-karu-stone mb-1 block">Min</label>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="w-full px-3 py-2 border border-karu-sand rounded-karu text-sm focus:outline-none focus:ring-2 focus:ring-karu-terracotta"
                                min="0"
                                max={priceRange[1]}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-karu-stone mb-1 block">Max</label>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full px-3 py-2 border border-karu-sand rounded-karu text-sm focus:outline-none focus:ring-2 focus:ring-karu-terracotta"
                                min={priceRange[0]}
                                max="1000"
                            />
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="500"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full accent-karu-terracotta"
                    />
                    <div className="flex justify-between text-xs text-karu-stone">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Artisan Filter */}
            <div className="mb-4">
                <h3 className="font-medium text-karu-charcoal mb-3">Artisan</h3>
                <div className="space-y-2">
                    {ARTISANS.map((artisan) => (
                        <label key={artisan} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedArtisans.includes(artisan)}
                                onChange={() => toggleArtisan(artisan)}
                                className="w-4 h-4 rounded border-karu-sand text-karu-terracotta focus:ring-karu-terracotta"
                            />
                            <span className="text-sm text-karu-stone group-hover:text-karu-charcoal transition-colors">
                                {artisan}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
                <div className="pt-6 border-t border-karu-sand">
                    <h3 className="font-medium text-karu-charcoal mb-3 text-sm">Active Filters</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className="flex items-center gap-1 px-2 py-1 bg-karu-sand rounded-full text-xs hover:bg-karu-terracotta hover:text-white transition-colors"
                            >
                                <span>{category}</span>
                                <X className="w-3 h-3" />
                            </button>
                        ))}
                        {selectedArtisans.map((artisan) => (
                            <button
                                key={artisan}
                                onClick={() => toggleArtisan(artisan)}
                                className="flex items-center gap-1 px-2 py-1 bg-karu-sand rounded-full text-xs hover:bg-karu-terracotta hover:text-white transition-colors"
                            >
                                <span>{artisan}</span>
                                <X className="w-3 h-3" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
