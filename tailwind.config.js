/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                karu: {
                    // Original earth tones
                    cream: '#FDF8F3',
                    sand: '#E8DDD3',
                    terracotta: '#C75D3C',
                    clay: '#8B5A3C',
                    charcoal: '#2D2D2D',
                    stone: '#6B6B6B',
                    warm: '#F5EDE6',
                    // NEW: Vibrant accents
                    saffron: '#FF6B35',
                    amber: '#F7931E',
                    emerald: '#2A9D8F',
                    indigo: '#264653',
                    coral: '#E88B6A',
                }
            },
            fontFamily: {
                display: ['Playfair Display', 'serif'],
                body: ['Inter', 'sans-serif'],
                bangla: ['Anek Bangla', 'sans-serif'],
                accent: ['Noto Serif', 'serif'],
                // Legacy fallbacks
                heading: ['Playfair Display', 'Epilogue', 'sans-serif'],
            },
            borderRadius: {
                'karu': '12px',
                'karu-lg': '20px',
            },
            boxShadow: {
                'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
                'xs': '0 1px 3px rgba(0, 0, 0, 0.05)',
                'sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
                'md': '0 4px 16px rgba(0, 0, 0, 0.12)',
                'lg': '0 8px 32px rgba(0, 0, 0, 0.16)',
                'xl': '0 12px 48px rgba(0, 0, 0, 0.20)',
                'glow': '0 0 20px rgba(255, 107, 53, 0.3)',
                'glow-strong': '0 0 40px rgba(255, 107, 53, 0.6)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'gradient-x': {
                    '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
                    '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
                },
                'fade-scale-in': {
                    'from': { opacity: '0', transform: 'scale(0.95)' },
                    'to': { opacity: '1', transform: 'scale(1)' },
                },
                'slide-up': {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'gradient-x': 'gradient-x 3s ease infinite',
                'fade-in': 'fade-scale-in 0.5s ease-out',
                'slide-up': 'slide-up 0.6s ease-out',
                'glow': 'glow-pulse 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
            },
        },
    },
    plugins: [],
}
