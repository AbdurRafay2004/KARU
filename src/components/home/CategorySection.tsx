import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function CategorySection() {
    // Fetch categories from Convex
    const categories = useQuery(api.categories.list);

    return (
        <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-end justify-between mb-8">
                    <h2 className="font-heading text-2xl md:text-3xl font-semibold text-karu-charcoal">
                        Shop by Category
                    </h2>
                    <Link
                        to="/products"
                        className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-karu-terracotta hover:gap-2 transition-all"
                    >
                        View All Products
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Category Grid */}
                {categories === undefined ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse aspect-[4/3] bg-karu-sand rounded-karu-lg"></div>
                        ))}
                    </div>
                ) : categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category._id}
                                to={`/products?category=${category.slug}`}
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
                ) : (
                    <p className="text-center text-karu-stone py-8">No categories available.</p>
                )}

                {/* Mobile Link */}
                <div className="mt-6 sm:hidden text-center">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-1 text-sm font-medium text-karu-terracotta"
                    >
                        View All Products
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
