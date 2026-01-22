import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    variant?: 'hero' | 'hero-outline' | 'outline' | 'primary';
    className?: string;
    onClick?: () => void;
}

export const Button = ({ children, variant = 'primary', className = '', onClick }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300";

    const variants = {
        hero: "bg-karu-terracotta text-white hover:bg-karu-terracotta/90 shadow-soft-lg hover:translate-y-[-2px]",
        "hero-outline": "bg-white/50 backdrop-blur-sm border border-karu-sand text-karu-charcoal hover:bg-white hover:border-karu-terracotta",
        primary: "bg-karu-terracotta text-white hover:bg-karu-terracotta/90",
        outline: "border border-karu-charcoal text-karu-charcoal hover:bg-karu-charcoal hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
