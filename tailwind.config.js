/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#050509',
          soft: '#0b0b14',
        },
        cream: '#f6f3ec',
        accent: {
          DEFAULT: '#7c5cff',
          soft: '#a78bfa',
          warm: '#ff9d6c',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}
