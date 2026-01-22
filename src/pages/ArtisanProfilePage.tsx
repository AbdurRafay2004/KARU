import { MapPin, Mail, Globe, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';

// Mock artisan data - will be replaced with Convex backend
const MOCK_ARTISANS: Record<string, {
    id: string;
    name: string;
    location: string;
    specialty: string;
    bio: string;
    story: string;
    avatar: string;
    coverImage: string;
    processPhotos: string[];
    email: string;
    website?: string;
    social: {
        instagram?: string;
        facebook?: string;
        twitter?: string;
    };
    products: Array<{
        id: string;
        name: string;
        price: number;
        artisan: string;
        image: string;
    }>;
}> = {
    'elena-rossi': {
        id: 'elena-rossi',
        name: 'Elena Rossi',
        location: 'Dhaka, Bangladesh',
        specialty: 'Handwoven Textiles & Baskets',
        bio: 'Master weaver with 15+ years of experience creating sustainable, handcrafted textiles using traditional techniques passed down through generations.',
        story: `I discovered my passion for weaving at the age of 12, learning from my grandmother in our small village. What started as a childhood fascination became my life's work.\n\nToday, I work with natural fibers sourced from local farmers, creating pieces that tell stories of our heritage. Each thread is carefully selected, each pattern thoughtfully designed to honor both tradition and contemporary aesthetics.\n\nMy workshop employs 8 local artisans, all women from my community. Together, we're preserving ancient techniques while creating sustainable livelihoods. Every piece that leaves our studio carries the warmth of our hands and the pride of our craft.`,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        coverImage: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200',
        processPhotos: [
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600',
            'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600',
            'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600',
        ],
        email: 'elena@karumarketplace.com',
        website: 'https://elenarossi-weaves.com',
        social: {
            instagram: '@elenarossi_weaves',
            facebook: 'ElenaRossiTextiles',
        },
        products: [
            { id: '1', name: 'Handwoven Basket', price: 45, artisan: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500' },
            { id: '4', name: 'Embroidered Cushion', price: 35, artisan: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500' },
            { id: '10', name: 'Woven Table Runner', price: 52, artisan: 'Elena Rossi', image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500' },
        ],
    },
};

export function ArtisanProfilePage() {
    const { id } = useParams<{ id: string }>();
    const artisan = id ? MOCK_ARTISANS[id] : null;

    if (!artisan) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-4">
                        Artisan Not Found
                    </h1>
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
                                    {artisan.social.instagram && (
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
                                    {artisan.social.facebook && (
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
                                    {artisan.social.twitter && (
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
                            {artisan.products.length} handcrafted pieces available
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {artisan.products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
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
