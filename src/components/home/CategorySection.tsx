import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
    {
        id: 'home-decor',
        name: 'Home Decor',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80',
    },
    {
        id: 'jewelry',
        name: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
    },
    {
        id: 'textiles',
        name: 'Textiles',
        image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80',
    },
];

export function CategorySection() {
    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold text-karu-charcoal">
                        Shop by Category
                    </h2>
                    <Link
                        to="/categories"
                        className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-karu-terracotta hover:gap-2 transition-all"
                    >
                        View All Categories
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.id}
                            to={`/products?category=${category.id}`}
                            className="group relative aspect-[4/3] rounded-karu-lg overflow-hidden"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-karu-charcoal/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="font-heading text-xl font-semibold text-white">
                                    {category.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile Link */}
                <div className="mt-6 sm:hidden text-center">
                    <Link
                        to="/categories"
                        className="inline-flex items-center gap-1 text-sm font-medium text-karu-terracotta"
                    >
                        View All Categories
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
