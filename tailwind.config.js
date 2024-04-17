/** @type {import('tailwindcss').Config} */
const { addDynamicIconSelectors } = require("@iconify/tailwind");
module.exports = {
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./docs/*.md",
    "./docs/**/*.{vue,ts,md}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  fontFamily: {
    sans: ["Graphik", "sans-serif"],
    serif: ["Merriweather", "serif"],
  },
  variants: {
    extend: {},
  },
  plugins: [
    // Iconify plugin
    addDynamicIconSelectors(),
  ],
};
