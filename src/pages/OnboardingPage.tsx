import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
    Store,
    User,
    MapPin,
    Loader2,
    ChevronRight,
    ChevronLeft,
    Check,
    AlertCircle,
} from 'lucide-react';

type Step = 1 | 2 | 3;

interface FormData {
    // Step 1: Basic Info
    shopName: string;
    specialty: string;
    bio: string;

    // Step 2: Story
    story: string;

    // Step 3: Location & Contact
    location: string;
    email: string;
    website: string;
    instagram: string;
    facebook: string;
}

export function OnboardingPage() {
    const navigate = useNavigate();
    const currentUser = useQuery(api.users.getCurrentUser);
    const registerArtisan = useMutation(api.userProfiles.registerArtisan);

    const [step, setStep] = useState<Step>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<FormData>({
        shopName: '',
        specialty: 'pottery',
        bio: '',
        story: '',
        location: '',
        email: currentUser?.email || '',
        website: '',
        instagram: '',
        facebook: '',
    });

    // Redirect if already an artisan
    const isArtisan = !!currentUser?.profile?.artisanId;
    if (isArtisan) {
        navigate('/admin');
        return null;
    }

    // Redirect if not logged in
    if (currentUser === null) {
        navigate('/login');
        return null;
    }

    const updateField = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError(null);
    };

    const validateStep = (): boolean => {
        switch (step) {
            case 1:
                if (!formData.shopName.trim()) {
                    setError('Shop name is required');
                    return false;
                }
                if (!formData.bio.trim()) {
                    setError('Bio is required');
                    return false;
                }
                return true;
            case 2:
                if (!formData.story.trim()) {
                    setError('Please share your story');
                    return false;
                }
                return true;
            case 3:
                if (!formData.location.trim()) {
                    setError('Location is required');
                    return false;
                }
                if (!formData.email.trim()) {
                    setError('Email is required');
                    return false;
                }
                return true;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep((s) => Math.min(s + 1, 3) as Step);
        }
    };

    const prevStep = () => {
        setStep((s) => Math.max(s - 1, 1) as Step);
        setError(null);
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await registerArtisan({
                name: formData.shopName,
                specialty: formData.specialty,
                bio: formData.bio,
                story: formData.story,
                location: formData.location,
                email: formData.email,
                website: formData.website || undefined,
                instagram: formData.instagram || undefined,
                facebook: formData.facebook || undefined,
            });

            // Success! Redirect to dashboard
            navigate('/admin');
        } catch (err) {
            console.error('Registration failed:', err);
            setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const specialties = [
        { value: 'pottery', label: 'Pottery & Ceramics' },
        { value: 'textiles', label: 'Textiles & Weaving' },
        { value: 'woodwork', label: 'Woodwork' },
        { value: 'jewelry', label: 'Jewelry' },
        { value: 'basketry', label: 'Basketry' },
        { value: 'leather', label: 'Leather Goods' },
        { value: 'metalwork', label: 'Metalwork' },
        { value: 'other', label: 'Other' },
    ];

    return (
        <div className="min-h-screen bg-karu-cream py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-heading text-3xl font-bold text-karu-charcoal mb-2">
                        Create Your Shop
                    </h1>
                    <p className="text-karu-stone">
                        Let's set up your artisan profile. This will only take a few minutes.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <ProgressStep number={1} label="Basics" active={step >= 1} completed={step > 1} />
                    <div className="w-12 h-0.5 bg-karu-sand" />
                    <ProgressStep number={2} label="Story" active={step >= 2} completed={step > 2} />
                    <div className="w-12 h-0.5 bg-karu-sand" />
                    <ProgressStep number={3} label="Details" active={step >= 3} completed={step > 3} />
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-karu p-8 shadow-sm">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-karu flex items-center gap-3 text-red-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-karu-terracotta/10 rounded-full flex items-center justify-center">
                                    <Store className="w-5 h-5 text-karu-terracotta" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-xl font-semibold text-karu-charcoal">
                                        Basic Information
                                    </h2>
                                    <p className="text-sm text-karu-stone">Tell us about your shop</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Shop Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shopName}
                                    onChange={(e) => updateField('shopName', e.target.value)}
                                    placeholder="e.g., Maya's Handwoven Textiles"
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Primary Craft *
                                </label>
                                <select
                                    value={formData.specialty}
                                    onChange={(e) => updateField('specialty', e.target.value)}
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                >
                                    {specialties.map((s) => (
                                        <option key={s.value} value={s.value}>
                                            {s.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Short Bio *
                                </label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => updateField('bio', e.target.value)}
                                    placeholder="A brief introduction to you and your craft (2-3 sentences)"
                                    rows={3}
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Story */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-karu-terracotta/10 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-karu-terracotta" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-xl font-semibold text-karu-charcoal">
                                        Your Story
                                    </h2>
                                    <p className="text-sm text-karu-stone">Share your journey as an artisan</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Your Artisan Story *
                                </label>
                                <p className="text-sm text-karu-stone mb-3">
                                    Tell customers about your craft journey. How did you start? What inspires you?
                                    What makes your work unique?
                                </p>
                                <textarea
                                    value={formData.story}
                                    onChange={(e) => updateField('story', e.target.value)}
                                    placeholder="My journey with pottery began in my grandmother's kitchen..."
                                    rows={8}
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Location & Contact */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-karu-terracotta/10 rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-karu-terracotta" />
                                </div>
                                <div>
                                    <h2 className="font-heading text-xl font-semibold text-karu-charcoal">
                                        Location & Contact
                                    </h2>
                                    <p className="text-sm text-karu-stone">Where can customers find you?</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => updateField('location', e.target.value)}
                                    placeholder="e.g., Dhaka, Bangladesh"
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Contact Email *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>

                            <div className="pt-4 border-t border-karu-sand">
                                <p className="text-sm text-karu-stone mb-4">
                                    Optional: Add your social media or website
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => updateField('website', e.target.value)}
                                            placeholder="https://yourwebsite.com"
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                                Instagram
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.instagram}
                                                onChange={(e) => updateField('instagram', e.target.value)}
                                                placeholder="@username"
                                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                                Facebook
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.facebook}
                                                onChange={(e) => updateField('facebook', e.target.value)}
                                                placeholder="facebook.com/page"
                                                className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-karu-sand">
                        {step > 1 ? (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 px-6 py-3 text-karu-charcoal hover:text-karu-terracotta transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                            >
                                Continue
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating Shop...
                                    </>
                                ) : (
                                    <>
                                        Create My Shop
                                        <Check className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProgressStep({
    number,
    label,
    active,
    completed,
}: {
    number: number;
    label: string;
    active: boolean;
    completed: boolean;
}) {
    return (
        <div className="flex flex-col items-center">
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${completed
                        ? 'bg-green-500 text-white'
                        : active
                            ? 'bg-karu-terracotta text-white'
                            : 'bg-karu-sand text-karu-stone'
                    }`}
            >
                {completed ? <Check className="w-5 h-5" /> : number}
            </div>
            <span className={`text-xs mt-1 ${active ? 'text-karu-charcoal font-medium' : 'text-karu-stone'}`}>
                {label}
            </span>
        </div>
    );
}
