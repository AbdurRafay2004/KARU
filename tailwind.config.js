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
        },
    },
    plugins: [],
}
