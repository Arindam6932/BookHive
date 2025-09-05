/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable dark mode
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#bfe0ff",
          300: "#94c8ff",
          400: "#63a8ff",
          500: "#2560e0",
          600: "#1e52c7",
          700: "#18439e",
          800: "#1b458f",
          900: "#193b73"
        },
        // Additional theme colors for light mode
        'theme-blue': {
          50: '#ebf5ff',
          100: '#d1e9ff',
          200: '#a6d4ff',
          300: '#73bfff',
          400: '#42aaff',
          500: '#1e90ff',
          600: '#1578e0',
          700: '#125bbd',
          800: '#0f44a3',
          900: '#0c3380'
        },
        'theme-green': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        },
        'theme-pink': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843'
        },
        'theme-purple': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95'
        }
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
