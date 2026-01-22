import { MapPin, Mail, Globe, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { ProductCard } from '../components/product/ProductCard';

export function ArtisanProfilePage() {
    const { id } = useParams<{ id: string }>();

    // Fetch artisan by slug from Convex
    const artisan = useQuery(
        api.artisans.getBySlug,
        id ? { slug: id } : "skip"
    );

    // Fetch artisan's products
    const products = useQuery(
        api.products.byArtisan,
        artisan?._id ? { artisanId: artisan._id } : "skip"
    );

    // Loading state
    if (artisan === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading artisan profile...</p>
                </div>
            </div>
        );
    }

    // Not found state
    if (artisan === null) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-4">
                        Artisan Not Found
                    </h1>
                    <p className="text-karu-stone mb-6">
                        The artisan you're looking for doesn't exist.
                    </p>
                    <Link to="/products" className="text-karu-terracotta hover:underline">
                        Browse all products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-karu-cream">
            {/* Cover Image */}
            <div className="relative h-80 bg-karu-sand overflow-hidden">
                <img
                    src={artisan.coverImage}
                    alt={`${artisan.name}'s workshop`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="relative -mt-20 mb-12">
                    <div className="bg-white rounded-karu p-8 shadow-lg">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    src={artisan.avatar}
                                    alt={artisan.name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h1 className="font-heading text-4xl font-bold text-karu-charcoal mb-2">
                                    {artisan.name}
                                </h1>
                                <p className="text-lg text-karu-terracotta font-medium mb-4">
                                    {artisan.specialty}
                                </p>
                                <div className="flex items-center gap-2 text-karu-stone mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span>{artisan.location}</span>
                                </div>
                                <p className="text-karu-stone leading-relaxed">
                                    {artisan.bio}
                                </p>
                            </div>

                            {/* Contact & Social */}
                            <div className="flex-shrink-0 space-y-3">
                                <a
                                    href={`mailto:${artisan.email}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-karu-terracotta text-white rounded-karu hover:bg-karu-clay transition-colors"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-medium">Contact</span>
                                </a>
                                {artisan.website && (
                                    <a
                                        href={artisan.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 border border-karu-sand rounded-karu hover:bg-karu-sand transition-colors"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span className="text-sm font-medium">Website</span>
                                    </a>
                                )}
                                <div className="flex gap-2 pt-2">
                                    {artisan.social?.instagram && (
                                        <a
                                            href={`https://instagram.com/${artisan.social.instagram.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 border border-karu-sand rounded-karu hover:bg-karu-sand transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <Instagram className="w-5 h-5 text-karu-charcoal" />
                                        </a>
                                    )}
                                    {artisan.social?.facebook && (
                                        <a
                                            href={`https://facebook.com/${artisan.social.facebook}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 border border-karu-sand rounded-karu hover:bg-karu-sand transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <Facebook className="w-5 h-5 text-karu-charcoal" />
                                        </a>
                                    )}
                                    {artisan.social?.twitter && (
                                        <a
                                            href={`https://twitter.com/${artisan.social.twitter}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 border border-karu-sand rounded-karu hover:bg-karu-sand transition-colors"
                                            aria-label="Twitter"
                                        >
                                            <Twitter className="w-5 h-5 text-karu-charcoal" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Story Section */}
                <section className="mb-12">
                    <div className="bg-white rounded-karu p-8">
                        <h2 className="font-heading text-3xl font-bold text-karu-charcoal mb-6">
                            My Story
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            {artisan.story.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="text-karu-stone leading-relaxed mb-4">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process Photos */}
                <section className="mb-12">
                    <div className="bg-white rounded-karu p-8">
                        <h2 className="font-heading text-3xl font-bold text-karu-charcoal mb-6">
                            The Process
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {artisan.processPhotos.map((photo, index) => (
                                <div
                                    key={index}
                                    className="aspect-square rounded-karu overflow-hidden bg-karu-sand group cursor-pointer"
                                >
                                    <img
                                        src={photo}
                                        alt={`Process step ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="pb-16">
                    <div className="mb-8">
                        <h2 className="font-heading text-3xl font-bold text-karu-charcoal mb-2">
                            Products by {artisan.name}
                        </h2>
                        <p className="text-karu-stone">
                            {products?.length || 0} handcrafted pieces available
                        </p>
                    </div>

                    {products === undefined ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-karu-terracotta mx-auto"></div>
                        </div>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    artisan={artisan.name}
                                    artisanSlug={artisan.slug}
                                    image={product.images[0]}
                                    isTrending={product.isTrending}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-karu-stone text-center py-8">
                            No products available yet.
                        </p>
                    )}

                    <div className="text-center mt-8">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-karu-terracotta text-karu-terracotta rounded-karu hover:bg-karu-terracotta hover:text-white transition-colors font-medium"
                        >
                            View All Products
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
