/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        sm: '4px',
      },
      colors: {
        textMain: "#FFF",
        bg: "#1F201D"
      }
    },
  },
  plugins: [],
}

