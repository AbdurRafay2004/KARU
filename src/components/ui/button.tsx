import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    variant?: 'hero' | 'hero-outline' | 'outline' | 'primary' | 'gradient-sunset' | 'gradient-glow' | 'gradient-emerald';
    className?: string;
    onClick?: () => void;
}

export const Button = ({ children, variant = 'primary', className = '', onClick }: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300";

    const variants = {
        // Legacy variants (preserved)
        hero: "btn-gradient-animate text-white shadow-soft-lg hover:translate-y-[-2px]",
        "hero-outline": "bg-white/50 backdrop-blur-sm border border-karu-sand text-karu-charcoal hover:bg-white hover:border-karu-terracotta",
        primary: "bg-karu-terracotta text-white hover:bg-karu-terracotta/90",
        outline: "border border-karu-charcoal text-karu-charcoal hover:bg-karu-charcoal hover:text-white",

        // NEW: Premium gradient variants
        "gradient-sunset": "bg-gradient-sunset text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100",
        "gradient-glow": "btn-gradient-sunset text-white shadow-glow hover:shadow-glow-strong hover:scale-105 active:scale-100 animate-glow",
        "gradient-emerald": "bg-gradient-emerald text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100",
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
