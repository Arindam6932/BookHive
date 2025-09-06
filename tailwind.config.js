/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'; // Import the full color palette

export default {
  darkMode: 'class', // enable dark mode
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // UPDATE: The primary color is now Teal.
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a'
        },
        // ADD: Added slate for a cooler dark mode.
        slate: colors.slate,

        // UPDATE: Refreshed the selectable theme palette.
        'theme-teal': colors.teal,
        'theme-indigo': colors.indigo,
        'theme-rose': colors.rose,
        'theme-amber': colors.amber,
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.06)",
        heavy: "0 8px 30px rgba(0,0,0,0.12)"
      },
      borderRadius: {
        '2xl': "1rem",
        '3xl': "1.5rem"
      }
    },
  },
  plugins: [],
}