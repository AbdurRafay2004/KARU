import { Link } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Authenticated, Unauthenticated } from 'convex/react';
import {
    Store,
    DollarSign,
    Users,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Globe,
    Heart,
    TrendingUp,
} from 'lucide-react';

export function SellPage() {
    const currentUser = useQuery(api.users.getCurrentUser);
    const isArtisan = !!currentUser?.profile?.artisanId;

    // If already an artisan, redirect to dashboard
    if (isArtisan) {
        return (
            <div className="min-h-screen bg-karu-cream py-16 px-4">
                <div className="max-w-lg mx-auto text-center bg-white rounded-karu p-8 shadow-sm">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        You're Already a Seller!
                    </h1>
                    <p className="text-karu-stone mb-6">
                        You already have a shop on Karu. Head to your dashboard to manage it.
                    </p>
                    <Link
                        to="/admin"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                    >
                        <Store className="w-5 h-5" />
                        Go to Shop Manager
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-karu-cream">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-karu-charcoal via-karu-clay to-karu-terracotta py-24 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                        Share Your Craft with Bangladesh
                    </h1>
                    <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                        Join Karu's community of artisans and turn your passion into a thriving business.
                        Reach customers who value authentic, handcrafted goods.
                    </p>

                    <Authenticated>
                        <Link
                            to="/onboarding"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-sunset text-white rounded-full font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all shadow-lg"
                        >
                            Start Selling Today
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Authenticated>

                    <Unauthenticated>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-sunset text-white rounded-full font-semibold text-lg hover:scale-105 hover:shadow-xl transition-all shadow-lg"
                        >
                            Create Account to Start
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="mt-4 text-white/60 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white underline hover:no-underline">
                                Sign in
                            </Link>
                        </p>
                    </Unauthenticated>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="font-heading text-3xl font-bold text-karu-charcoal text-center mb-4">
                        Why Sell on Karu?
                    </h2>
                    <p className="text-karu-stone text-center mb-12 max-w-2xl mx-auto">
                        We're building the premier marketplace for handcrafted goods in Bangladesh.
                        Here's what sets us apart.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <BenefitCard
                            icon={Users}
                            title="Reach Conscious Buyers"
                            description="Connect with customers who actively seek authentic, handmade products and appreciate the story behind each creation."
                        />
                        <BenefitCard
                            icon={DollarSign}
                            title="Fair Pricing"
                            description="Set your own prices. We believe artisans should earn what they deserve for their skill and dedication."
                        />
                        <BenefitCard
                            icon={Globe}
                            title="Bangladesh-Wide Delivery"
                            description="We handle logistics across all 64 districts, so you can focus on creating while we deliver."
                        />
                        <BenefitCard
                            icon={Sparkles}
                            title="Tell Your Story"
                            description="Create a beautiful artisan profile showcasing your craft, process photos, and the unique story behind your work."
                        />
                        <BenefitCard
                            icon={TrendingUp}
                            title="Grow Your Business"
                            description="Access analytics, customer insights, and marketing tools to help your craft reach more people."
                        />
                        <BenefitCard
                            icon={Heart}
                            title="Community Support"
                            description="Join a community of makers. Share knowledge, get feedback, and grow together with fellow artisans."
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-heading text-3xl font-bold text-karu-charcoal text-center mb-12">
                        Getting Started is Simple
                    </h2>

                    <div className="space-y-8">
                        <Step
                            number={1}
                            title="Create Your Shop"
                            description="Fill out a simple form with your shop name, craft specialty, and a brief introduction."
                        />
                        <Step
                            number={2}
                            title="Add Your Products"
                            description="Upload photos, set prices, and write descriptions that bring your products to life."
                        />
                        <Step
                            number={3}
                            title="Start Selling"
                            description="Once approved, your shop goes live. Customers can discover and purchase your handcrafted items."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto text-center bg-karu-charcoal rounded-2xl p-12">
                    <h2 className="font-heading text-3xl font-bold text-white mb-4">
                        Ready to Share Your Craft?
                    </h2>
                    <p className="text-white/70 mb-8">
                        Join hundreds of artisans already selling on Karu. It only takes a few minutes to get started.
                    </p>

                    <Authenticated>
                        <Link
                            to="/onboarding"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-sunset text-white rounded-full font-semibold text-lg hover:scale-105 hover:shadow-glow-strong transition-all shadow-glow animate-glow"
                        >
                            Start Your Shop
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Authenticated>

                    <Unauthenticated>
                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-sunset text-white rounded-full font-semibold text-lg hover:scale-105 hover:shadow-glow-strong transition-all shadow-glow animate-glow"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Unauthenticated>
                </div>
            </section>
        </div>
    );
}

function BenefitCard({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white rounded-karu p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-karu-terracotta/10 rounded-full flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-karu-terracotta" />
            </div>
            <h3 className="font-heading text-lg font-semibold text-karu-charcoal mb-2">
                {title}
            </h3>
            <p className="text-karu-stone text-sm">{description}</p>
        </div>
    );
}

function Step({
    number,
    title,
    description,
}: {
    number: number;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-karu-terracotta text-white rounded-full flex items-center justify-center font-bold text-xl">
                {number}
            </div>
            <div>
                <h3 className="font-heading text-xl font-semibold text-karu-charcoal mb-1">
                    {title}
                </h3>
                <p className="text-karu-stone">{description}</p>
            </div>
        </div>
    );
}
