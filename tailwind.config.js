/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f8f5',
          100: '#e1f0e9',
          200: '#c4e2d4',
          300: '#97cdb5',
          400: '#63b290',
          500: '#3e9573',
          600: '#2c775a',
          700: '#235f49',
          800: '#1e4c3c',
          900: '#15362a',
          950: '#0b1f18',
        },
        sage: {
          50: '#f6f7f5',
          100: '#ebedea',
          200: '#d7dbd5',
          300: '#bbc4b8',
          400: '#9ba797',
          500: '#7f8d7b',
          600: '#647161',
          700: '#505a4e',
          800: '#424a41',
          900: '#383e37',
        },
        moss: {
          DEFAULT: '#606c38',
          dark: '#283618',
          light: '#a3b18a',
        },
        earth: {
          50: '#faf5f2',
          100: '#f4e9e4',
          200: '#ebd6cd',
          300: '#ddb9aa',
          400: '#cb9580',
          500: '#c86d51',
          600: '#ad5037',
          700: '#8e3f2c',
          800: '#733628',
          900: '#5e3025',
        },
        cream: {
          50: '#fbfbfa',
          100: '#f7f6f2',
          200: '#efeee6',
          300: '#e3e1d3',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'botanical': '0 20px 40px -15px rgba(21, 54, 42, 0.12)',
        'botanical-lg': '0 30px 60px -20px rgba(21, 54, 42, 0.22)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.35)',
      }
    },
  },
  plugins: [],
}
