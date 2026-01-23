import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
    title: string;
    description?: string;
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    return (
        <div className="min-h-screen bg-karu-cream flex items-center justify-center px-4">
            <div className="max-w-md text-center">
                <div className="w-20 h-20 bg-karu-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Construction className="w-10 h-10 text-karu-terracotta" />
                </div>
                <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-3">
                    {title}
                </h1>
                <p className="text-karu-stone mb-6">
                    {description || 'This page is coming soon. We\'re working hard to bring you this feature.'}
                </p>
                <Link
                    to="/"
                    className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

// Export individual placeholder pages
export function MarketplacePage() {
    return <PlaceholderPage title="Marketplace" description="Our full marketplace experience is coming soon!" />;
}

export function StoryPage() {
    return <PlaceholderPage title="Our Story" description="Learn about KARU's journey to connect artisans with buyers." />;
}

export function GiftCardsPage() {
    return <PlaceholderPage title="Gift Cards" description="Give the gift of handcrafted treasures. Coming soon!" />;
}

export function SustainabilityPage() {
    return <PlaceholderPage title="Sustainability" description="Our commitment to sustainable and ethical practices." />;
}

export function CareersPage() {
    return <PlaceholderPage title="Careers" description="Join our team and help support artisan communities." />;
}

export function PressPage() {
    return <PlaceholderPage title="Press" description="Media resources and press coverage." />;
}

export function ShippingPage() {
    return <PlaceholderPage title="Shipping & Returns" description="Information about delivery and return policies." />;
}

export function HelpPage() {
    return <PlaceholderPage title="Help Center" description="Find answers to common questions and get support." />;
}

export function ContactPage() {
    return <PlaceholderPage title="Contact Us" description="Get in touch with our team." />;
}

export function PrivacyPage() {
    return <PlaceholderPage title="Privacy Policy" description="How we protect and handle your data." />;
}

export function TermsPage() {
    return <PlaceholderPage title="Terms of Service" description="Terms and conditions for using KARU." />;
}
