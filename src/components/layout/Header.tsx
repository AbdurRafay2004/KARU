import { useState, type FormEvent } from 'react';
import { Search, ShoppingBag, Heart, User, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Authenticated, Unauthenticated } from 'convex/react';
import { UserMenu } from './UserMenu';

export function Header() {
    const navigate = useNavigate();
    const currentUser = useQuery(api.users.getCurrentUser);
    const cartCount = useQuery(api.users.getCartCount);
    const [searchQuery, setSearchQuery] = useState('');

    const isArtisan = !!currentUser?.profile?.artisanId;

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="bg-white border-b border-karu-sand sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-karu-terracotta rounded-full flex items-center justify-center animate-logo-wiggle">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9C14.8 19 12 16 12 12s2.8-7 6.3-9.1C16.9 2.3 14.6 2 12 2z" fill="currentColor" />
                            </svg>
                        </div>
                        <span className="font-heading font-semibold text-xl text-karu-charcoal">KARU</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Find unique handcrafted items..."
                                className="w-full pl-10 pr-4 py-2 bg-karu-cream border border-karu-sand rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20 focus:border-karu-terracotta"
                            />
                            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Search className="w-4 h-4 text-karu-stone hover:text-karu-terracotta transition-colors" />
                            </button>
                        </form>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Unauthenticated: Show Sign in */}
                        <Unauthenticated>
                            <Link
                                to="/login"
                                className="hidden sm:inline-flex text-sm font-medium text-karu-charcoal hover:text-karu-terracotta transition-colors"
                            >
                                Sign in
                            </Link>
                        </Unauthenticated>

                        {/* Authenticated: Show user menu */}
                        <Authenticated>
                            {/* Shop Manager quick link for artisans (desktop) */}
                            {isArtisan && (
                                <Link
                                    to="/admin"
                                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-karu-terracotta bg-karu-terracotta/10 rounded-full hover:bg-karu-terracotta/20 transition-colors"
                                    title="Shop Manager"
                                >
                                    <Store className="w-4 h-4" />
                                    <span className="hidden lg:inline">Shop</span>
                                </Link>
                            )}

                            {/* User Menu Dropdown */}
                            <UserMenu className="hidden sm:block" />
                        </Authenticated>

                        {/* Wishlist */}
                        <Link to="/wishlist" className="p-2 text-karu-charcoal hover:text-karu-terracotta transition-colors relative">
                            <Heart className="w-5 h-5" />
                            <Authenticated>
                                {(() => {
                                    const wishlistCount = useQuery(api.wishlist.getWishlistCount);
                                    return (wishlistCount ?? 0) > 0 && (
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-karu-terracotta text-white text-xs rounded-full flex items-center justify-center">
                                            {wishlistCount}
                                        </span>
                                    );
                                })()}
                            </Authenticated>
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="p-2 text-karu-charcoal hover:text-karu-terracotta transition-colors relative">
                            <ShoppingBag className="w-5 h-5" />
                            {(cartCount ?? 0) > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-karu-terracotta text-white text-xs rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile User Icon */}
                        <Unauthenticated>
                            <Link to="/login" className="sm:hidden p-2 text-karu-charcoal">
                                <User className="w-5 h-5" />
                            </Link>
                        </Unauthenticated>

                        <Authenticated>
                            <UserMenu className="sm:hidden" />
                        </Authenticated>
                    </div>
                </div>
            </div>
        </header>
    );
}
