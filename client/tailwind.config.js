/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all React files for classes
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5044E5", // custom color
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"], // custom font
      },
    },
  },
  plugins: [],
}
