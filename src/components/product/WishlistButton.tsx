import { Heart } from 'lucide-react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface WishlistButtonProps {
    productId: Id<"products">;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
}

export function WishlistButton({
    productId,
    className = '',
    size = 'md',
    showText = false
}: WishlistButtonProps) {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const currentUser = useQuery(api.users.getCurrentUser);
    const isInWishlist = useQuery(
        api.wishlist.isInWishlist,
        currentUser ? { productId } : "skip"
    );
    const toggleWishlist = useMutation(api.wishlist.toggleWishlist);

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Require authentication
        if (!currentUser) {
            navigate('/login');
            return;
        }

        setIsProcessing(true);
        try {
            await toggleWishlist({ productId });
        } catch (error) {
            console.error('Failed to toggle wishlist:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isProcessing}
            className={`
                inline-flex items-center justify-center gap-2
                p-2 rounded-full transition-all
                ${isInWishlist
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-karu-charcoal hover:text-karu-terracotta'
                }
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
                ${className}
            `}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <Heart
                className={`${sizeClasses[size]} transition-all`}
                fill={isInWishlist ? 'currentColor' : 'none'}
                strokeWidth={2}
            />
            {showText && (
                <span className="text-sm font-medium">
                    {isInWishlist ? 'Saved' : 'Save'}
                </span>
            )}
        </button>
    );
}
