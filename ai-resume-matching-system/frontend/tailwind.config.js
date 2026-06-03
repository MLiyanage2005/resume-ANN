/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        card: 'rgba(10, 10, 10, 0.75)',
        accent: {
          DEFAULT: '#EAB308', // glowing golden yellow
          dark: '#CA8A04',
          light: '#FEF08A',
        },
        panel: {
          DEFAULT: 'rgba(15, 15, 15, 0.6)',
          border: 'rgba(234, 179, 8, 0.15)',
          borderHover: 'rgba(234, 179, 8, 0.4)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(234, 179, 8, 0.25)',
        'glow-lg': '0 0 25px rgba(234, 179, 8, 0.4)',
        'glow-intense': '0 0 35px rgba(234, 179, 8, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
