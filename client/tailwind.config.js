/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        highlights: "#000000",
        bg: "#FFFFFF"
      }
    },
  },
  plugins: [],
}

