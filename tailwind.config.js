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
                    cream: '#FDF8F3',
                    sand: '#E8DDD3',
                    terracotta: '#C75D3C',
                    clay: '#8B5A3C',
                    charcoal: '#2D2D2D',
                    stone: '#6B6B6B',
                    warm: '#F5EDE6',
                }
            },
            fontFamily: {
                heading: ['Epilogue', 'sans-serif'],
                body: ['Manrope', 'sans-serif'],
                accent: ['Noto Serif', 'serif'],
            },
            borderRadius: {
                'karu': '12px',
                'karu-lg': '20px',
            },
            boxShadow: {
                'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'gradient-x': {
                    '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
                    '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
                }
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'gradient-x': 'gradient-x 3s ease infinite',
            },
        },
    },
    plugins: [],
}
