/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '375px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF9F5',
          50: '#FFFFFF',
          100: '#FFFDFB',
          200: '#FFF9F5',
          300: '#FDEEE5',
        },
        blush: {
          DEFAULT: '#F9D5DC',
          50: '#FDF2F4',
          100: '#FBE8EC',
          200: '#F9D5DC',
          300: '#F2B3C0',
          400: '#E88BA0',
        },
        lavender: {
          DEFAULT: '#E4DAF6',
          50: '#F7F4FD',
          100: '#EFEAFC',
          200: '#E4DAF6',
          300: '#CDB9EE',
        },
        mint: {
          DEFAULT: '#D5EFE3',
          50: '#F2FAF6',
          100: '#E5F6EE',
          200: '#D5EFE3',
          300: '#B2E2CC',
          400: '#8CD1B0',
        },
        peach: {
          DEFAULT: '#FFE2CF',
          50: '#FFF7F2',
          100: '#FFEECE',
          200: '#FFE2CF',
          300: '#FFC8A6',
        },
        butter: {
          DEFAULT: '#FFF1B8',
          50: '#FFFDEB',
          100: '#FFF9D4',
          200: '#FFF1B8',
          300: '#FFE382',
        },
        sky: {
          DEFAULT: '#D8E8F8',
          50: '#F3F8FD',
          100: '#E5F1FC',
          200: '#D8E8F8',
          300: '#B0D3F2',
        },
        plum: {
          DEFAULT: '#4A3F5C',
          light: '#65577D',
          soft: '#8A7F9C',
          dark: '#352C43',
        },
        'rose-deep': {
          DEFAULT: '#D9718A',
          hover: '#C85C76',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 8px 30px -4px rgba(74, 63, 92, 0.07)',
        'soft-lg': '0 16px 40px -6px rgba(74, 63, 92, 0.10)',
        'soft-blush': '0 12px 32px -4px rgba(217, 113, 138, 0.16)',
        'soft-mint': '0 12px 32px -4px rgba(140, 209, 176, 0.20)',
        'soft-lavender': '0 12px 32px -4px rgba(205, 185, 238, 0.22)',
        'inner-glow': 'inset 0 2px 8px 0 rgba(255, 255, 255, 0.6)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'stitch': 'dash 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        dash: {
          to: { strokeDashoffset: '-1000' },
        }
      }
    },
  },
  plugins: [],
}
