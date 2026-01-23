import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { MapPin, Star } from 'lucide-react';

export function ArtisansPage() {
    const artisans = useQuery(api.artisans.list);

    return (
        <div className="min-h-screen bg-karu-cream">
            {/* Hero */}
            <section className="bg-gradient-to-br from-karu-charcoal to-karu-clay py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                        Meet Our Artisans
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Discover the talented makers behind every handcrafted piece.
                        Each artisan brings generations of skill and passion to their craft.
                    </p>
                </div>
            </section>

            {/* Artisan Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {artisans === undefined ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="animate-pulse bg-white rounded-karu p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 bg-karu-sand rounded-full" />
                                        <div className="flex-1">
                                            <div className="h-5 bg-karu-sand rounded w-3/4 mb-2" />
                                            <div className="h-4 bg-karu-sand rounded w-1/2" />
                                        </div>
                                    </div>
                                    <div className="h-20 bg-karu-sand rounded" />
                                </div>
                            ))}
                        </div>
                    ) : artisans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {artisans.map((artisan) => (
                                <Link
                                    key={artisan._id}
                                    to={`/artisans/${artisan._id}`}
                                    className="group bg-white rounded-karu overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                                >
                                    {/* Cover Image */}
                                    <div className="h-32 overflow-hidden">
                                        <img
                                            src={artisan.coverImage}
                                            alt=""
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 -mt-8 relative">
                                        {/* Avatar */}
                                        <img
                                            src={artisan.avatar}
                                            alt={artisan.name}
                                            className="w-16 h-16 rounded-full border-4 border-white object-cover mb-3"
                                        />

                                        <h3 className="font-heading text-lg font-semibold text-karu-charcoal group-hover:text-karu-terracotta transition-colors">
                                            {artisan.name}
                                        </h3>

                                        <p className="text-sm text-karu-terracotta font-medium mb-2">
                                            {artisan.specialty}
                                        </p>

                                        <div className="flex items-center gap-1 text-sm text-karu-stone mb-3">
                                            <MapPin className="w-4 h-4" />
                                            {artisan.location}
                                        </div>

                                        <p className="text-sm text-karu-stone line-clamp-2">
                                            {artisan.bio}
                                        </p>

                                        {artisan.isFeatured && (
                                            <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-karu-ochre/10 text-karu-ochre text-xs font-medium rounded-full">
                                                <Star className="w-3 h-3" />
                                                Featured Artisan
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-karu-stone text-lg">No artisans found.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 px-4 bg-white">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-heading text-2xl font-bold text-karu-charcoal mb-4">
                        Are You an Artisan?
                    </h2>
                    <p className="text-karu-stone mb-6">
                        Join our community of makers and share your craft with Bangladesh.
                    </p>
                    <Link
                        to="/sell"
                        className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                    >
                        Start Selling on Karu
                    </Link>
                </div>
            </section>
        </div>
    );
}
