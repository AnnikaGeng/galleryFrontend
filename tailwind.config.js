/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#0B1320',
        'navyBlue': '#1C3F60',
        'mistyBlue': '#AFC1D0',
        'babyBlue': '#B1D4E0',
      },
    },
  },
  plugins: [],
}

