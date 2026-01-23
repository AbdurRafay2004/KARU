import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Settings, LogOut, Store, ChevronDown } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

interface UserMenuProps {
    className?: string;
}

export function UserMenu({ className = '' }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { signOut } = useAuthActions();

    const currentUser = useQuery(api.users.getCurrentUser);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on escape
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') setIsOpen(false);
        }
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleSignOut = async () => {
        await signOut();
        setIsOpen(false);
        navigate('/');
    };

    const isArtisan = !!currentUser?.profile?.artisanId;
    const displayName = currentUser?.profile?.displayName || currentUser?.name || currentUser?.email?.split('@')[0] || 'User';
    const avatarUrl = currentUser?.profile?.avatarUrl || currentUser?.image;
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            {/* Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-karu-cream transition-colors focus:outline-none focus:ring-2 focus:ring-karu-terracotta/20"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover border border-karu-sand"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            // Fallback to initial logic if needed, but keeping it simple for now, 
                            // the sibling div below could be shown conditionally if image fails/is missing
                        }}
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-karu-terracotta to-karu-ochre flex items-center justify-center text-white font-medium text-sm shadow-sm">
                        {initial}
                    </div>
                )}
                <ChevronDown className={`w-4 h-4 text-karu-stone transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-karu-sand overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-karu-sand bg-karu-cream/50">
                        <p className="font-medium text-karu-charcoal truncate">{displayName}</p>
                        <p className="text-sm text-karu-stone truncate">{currentUser?.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <Link
                            to="/orders"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-karu-charcoal hover:bg-karu-cream transition-colors"
                        >
                            <Package className="w-4 h-4 text-karu-stone" />
                            <span>My Orders</span>
                        </Link>

                        {/* Artisan-specific section */}
                        {isArtisan ? (
                            <Link
                                to="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-karu-charcoal hover:bg-karu-cream transition-colors"
                            >
                                <Store className="w-4 h-4 text-karu-terracotta" />
                                <span className="font-medium text-karu-terracotta">Shop Manager</span>
                            </Link>
                        ) : (
                            <Link
                                to="/sell"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-karu-charcoal hover:bg-karu-cream transition-colors"
                            >
                                <Store className="w-4 h-4 text-karu-stone" />
                                <span>Sell on Karu</span>
                            </Link>
                        )}

                        <div className="border-t border-karu-sand my-2" />

                        <Link
                            to="/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-karu-charcoal hover:bg-karu-cream transition-colors"
                        >
                            <Settings className="w-4 h-4 text-karu-stone" />
                            <span>Settings</span>
                        </Link>

                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-karu-charcoal hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign out</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
