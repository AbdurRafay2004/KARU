import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function FeaturedArtisan() {
    // Fetch featured artisan from Convex
    const artisan = useQuery(api.artisans.featured);

    // Loading state
    if (artisan === undefined) {
        return (
            <section className="py-16 md:py-20 bg-karu-warm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center animate-pulse">
                        <div>
                            <div className="h-4 bg-karu-sand rounded w-32 mb-4"></div>
                            <div className="h-10 bg-karu-sand rounded w-48 mb-6"></div>
                            <div className="h-24 bg-karu-sand rounded mb-6"></div>
                            <div className="h-20 bg-karu-sand rounded mb-8"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-[3/4] bg-karu-sand rounded-karu"></div>
                            <div className="space-y-4">
                                <div className="aspect-square bg-karu-sand rounded-karu"></div>
                                <div className="aspect-square bg-karu-sand rounded-karu"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // No featured artisan
    if (!artisan) {
        return null;
    }

    return (
        <section className="py-16 md:py-20 bg-karu-warm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <span className="text-xs font-medium text-karu-stone uppercase tracking-wider">
                            Featured Artisan
                        </span>

                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-karu-charcoal mt-4 mb-6">
                            {artisan.name}
                        </h2>

                        <blockquote className="font-accent text-lg md:text-xl italic text-karu-charcoal/80 mb-6 leading-relaxed">
                            "{artisan.bio}"
                        </blockquote>

                        <p className="text-karu-stone mb-8 leading-relaxed">
                            {artisan.story.split('\n\n')[0]}
                        </p>

                        <Link
                            to={`/artisans/${artisan.slug}`}
                            className="inline-flex items-center gap-2 text-karu-terracotta font-medium hover:gap-3 transition-all"
                        >
                            Read the Full Story
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] rounded-karu overflow-hidden">
                            <img
                                src={artisan.avatar}
                                alt={artisan.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-4">
                            {artisan.processPhotos.slice(0, 2).map((photo, index) => (
                                <div key={index} className="aspect-square rounded-karu overflow-hidden">
                                    <img
                                        src={photo}
                                        alt={`${artisan.name}'s work`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
