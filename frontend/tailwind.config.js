/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Cursive: ["Satisfy", "cursive"],
      Poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [
    require("tailwindcss-brand-colors"),
    require("tailwindcss-debug-screens"),
  ],
};
