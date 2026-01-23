import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
    User,
    Store,
    Save,
    Loader2,
    AlertCircle,
    CheckCircle,
    ArrowLeft,
} from 'lucide-react';

type Tab = 'profile' | 'shop';

export function SettingsPage() {
    const currentUser = useQuery(api.userProfiles.getCurrentUserWithProfile);
    const myArtisan = useQuery(api.userProfiles.getMyArtisan);

    const updateProfile = useMutation(api.userProfiles.updateProfile);
    const updateArtisanProfile = useMutation(api.userProfiles.updateArtisanProfile);

    const [activeTab, setActiveTab] = useState<Tab>('profile');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Profile form state
    const [profileForm, setProfileForm] = useState({
        displayName: '',
        avatarUrl: '',
    });

    // Shop form state
    const [shopForm, setShopForm] = useState({
        name: '',
        bio: '',
        story: '',
        location: '',
        specialty: '',
        email: '',
        website: '',
        avatarUrl: '',
        coverImageUrl: '',
        instagram: '',
        facebook: '',
        twitter: '',
    });

    // Populate profile form with existing data
    useEffect(() => {
        if (currentUser?.profile && '_id' in currentUser.profile) {
            setProfileForm({
                displayName: currentUser.profile.displayName || '',
                avatarUrl: currentUser.profile.avatarUrl || '',
            });
        }
    }, [currentUser]);

    // Populate shop form with existing data
    useEffect(() => {
        if (myArtisan) {
            setShopForm({
                name: myArtisan.name || '',
                bio: myArtisan.bio || '',
                story: myArtisan.story || '',
                location: myArtisan.location || '',
                specialty: myArtisan.specialty || '',
                email: myArtisan.email || '',
                website: myArtisan.website || '',
                avatarUrl: myArtisan.avatar || '',
                coverImageUrl: myArtisan.coverImage || '',
                instagram: myArtisan.social?.instagram || '',
                facebook: myArtisan.social?.facebook || '',
                twitter: myArtisan.social?.twitter || '',
            });
        }
    }, [myArtisan]);

    // Loading state
    if (currentUser === undefined) {
        return (
            <div className="min-h-screen bg-karu-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-karu-terracotta mx-auto mb-4"></div>
                    <p className="text-karu-stone">Loading settings...</p>
                </div>
            </div>
        );
    }

    // Not logged in
    if (!currentUser) {
        return (
            <div className="min-h-screen bg-karu-cream py-12 px-4">
                <div className="max-w-lg mx-auto text-center bg-white rounded-karu p-8 shadow-sm">
                    <AlertCircle className="w-16 h-16 text-karu-terracotta mx-auto mb-4" />
                    <h1 className="font-heading text-2xl font-bold text-karu-charcoal mb-2">
                        Sign In Required
                    </h1>
                    <p className="text-karu-stone mb-6">
                        Please sign in to access your settings.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    const isArtisan = currentUser.profile && '_id' in currentUser.profile && !!currentUser.profile.artisanId;

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            await updateProfile({
                displayName: profileForm.displayName || undefined,
                avatarUrl: profileForm.avatarUrl || undefined,
            });
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShopSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            await updateArtisanProfile({
                name: shopForm.name || undefined,
                bio: shopForm.bio || undefined,
                story: shopForm.story || undefined,
                location: shopForm.location || undefined,
                specialty: shopForm.specialty || undefined,
                email: shopForm.email || undefined,
                website: shopForm.website || undefined,
                avatarUrl: shopForm.avatarUrl || undefined,
                coverImageUrl: shopForm.coverImageUrl || undefined,
                instagram: shopForm.instagram || undefined,
                facebook: shopForm.facebook || undefined,
                twitter: shopForm.twitter || undefined,
            });
            setSuccessMessage('Shop profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Failed to update shop profile:', error);
            alert('Failed to update shop profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const tabs = [
        { id: 'profile' as Tab, label: 'Profile', icon: User },
        ...(isArtisan ? [{ id: 'shop' as Tab, label: 'Shop', icon: Store }] : []),
    ];

    return (
        <div className="min-h-screen bg-karu-cream">
            {/* Header */}
            <div className="bg-white border-b border-karu-sand">
                <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            to="/"
                            className="p-2 text-karu-stone hover:text-karu-charcoal transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-heading text-2xl font-bold text-karu-charcoal">
                                Settings
                            </h1>
                            <p className="text-karu-stone text-sm mt-1">
                                Manage your account and preferences
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-karu font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-karu-terracotta text-white'
                                    : 'text-karu-stone hover:bg-karu-sand'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Success Message */}
                {successMessage && (
                    <div className="mb-6 flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-karu">
                        <CheckCircle className="w-5 h-5" />
                        {successMessage}
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-karu p-6 shadow-sm">
                        <h2 className="font-heading text-xl font-bold text-karu-charcoal mb-6">
                            Your Profile
                        </h2>

                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.displayName}
                                    onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                                    placeholder="How would you like to be called?"
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Avatar URL
                                </label>
                                <input
                                    type="url"
                                    value={profileForm.avatarUrl}
                                    onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                                    placeholder="https://example.com/your-avatar.jpg"
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                                {profileForm.avatarUrl && (
                                    <div className="mt-3">
                                        <p className="text-sm text-karu-stone mb-2">Preview:</p>
                                        <img
                                            src={profileForm.avatarUrl}
                                            alt="Avatar preview"
                                            className="w-20 h-20 rounded-full object-cover border-2 border-karu-sand"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Profile
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Shop Tab */}
                {activeTab === 'shop' && isArtisan && (
                    <div className="bg-white rounded-karu p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-heading text-xl font-bold text-karu-charcoal">
                                Shop Profile
                            </h2>
                            {myArtisan && (
                                <Link
                                    to={`/artisans/${myArtisan._id}`}
                                    className="text-sm text-karu-terracotta hover:underline"
                                >
                                    View Public Profile →
                                </Link>
                            )}
                        </div>

                        <form onSubmit={handleShopSubmit} className="space-y-6">
                            {/* Basic Info */}
                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                        Shop Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={shopForm.name}
                                        onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                        Specialty *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={shopForm.specialty}
                                        onChange={(e) => setShopForm({ ...shopForm, specialty: e.target.value })}
                                        placeholder="e.g., Hand-woven Textiles"
                                        className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={shopForm.location}
                                    onChange={(e) => setShopForm({ ...shopForm, location: e.target.value })}
                                    placeholder="e.g., Dhaka, Bangladesh"
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Short Bio *
                                </label>
                                <textarea
                                    required
                                    rows={2}
                                    value={shopForm.bio}
                                    onChange={(e) => setShopForm({ ...shopForm, bio: e.target.value })}
                                    placeholder="A brief description of your craft..."
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                    Your Story
                                </label>
                                <textarea
                                    rows={4}
                                    value={shopForm.story}
                                    onChange={(e) => setShopForm({ ...shopForm, story: e.target.value })}
                                    placeholder="Share your journey as an artisan..."
                                    className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                />
                            </div>

                            {/* Contact */}
                            <div className="border-t border-karu-sand pt-6">
                                <h3 className="font-medium text-karu-charcoal mb-4">Contact Information</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={shopForm.email}
                                            onChange={(e) => setShopForm({ ...shopForm, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            value={shopForm.website}
                                            onChange={(e) => setShopForm({ ...shopForm, website: e.target.value })}
                                            placeholder="https://yoursite.com"
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="border-t border-karu-sand pt-6">
                                <h3 className="font-medium text-karu-charcoal mb-4">Social Media</h3>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                        <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                            Instagram
                                        </label>
                                        <input
                                            type="text"
                                            value={shopForm.instagram}
                                            onChange={(e) => setShopForm({ ...shopForm, instagram: e.target.value })}
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
                                            value={shopForm.facebook}
                                            onChange={(e) => setShopForm({ ...shopForm, facebook: e.target.value })}
                                            placeholder="facebook.com/..."
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                            Twitter
                                        </label>
                                        <input
                                            type="text"
                                            value={shopForm.twitter}
                                            onChange={(e) => setShopForm({ ...shopForm, twitter: e.target.value })}
                                            placeholder="@username"
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Images */}
                            <div className="border-t border-karu-sand pt-6">
                                <h3 className="font-medium text-karu-charcoal mb-4">Shop Images</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                            Avatar URL
                                        </label>
                                        <input
                                            type="url"
                                            value={shopForm.avatarUrl}
                                            onChange={(e) => setShopForm({ ...shopForm, avatarUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                        />
                                        {shopForm.avatarUrl && (
                                            <div className="mt-2">
                                                <img
                                                    src={shopForm.avatarUrl}
                                                    alt="Shop avatar"
                                                    className="w-16 h-16 rounded-full object-cover border border-karu-sand"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-karu-charcoal mb-2">
                                            Cover Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={shopForm.coverImageUrl}
                                            onChange={(e) => setShopForm({ ...shopForm, coverImageUrl: e.target.value })}
                                            placeholder="https://..."
                                            className="w-full px-4 py-3 border border-karu-sand rounded-karu focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                                        />
                                        {shopForm.coverImageUrl && (
                                            <div className="mt-2">
                                                <img
                                                    src={shopForm.coverImageUrl}
                                                    alt="Cover preview"
                                                    className="w-full max-w-md h-24 object-cover rounded-karu border border-karu-sand"
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-karu-terracotta text-white rounded-karu font-medium hover:bg-karu-clay transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Shop Profile
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
