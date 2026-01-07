/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'landing-bg': "url('/src/assets/Green.jpg')", // waterfall image
      },
      keyframes: {
        // Fade in content
        fadeIn: {
          '0%': { opacity: 0, filter: 'blur(5px)' },
          '100%': { opacity: 0.9, filter: 'blur(0)' },
        },
        // Vertical waterfall flow
        waterfallFlow: {
          '0%': { 'background-position': 'center 0%' },
          '100%': { 'background-position': 'center 100%' },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        waterfallFlow: "waterfallFlow 15s linear infinite",
      },
    },
  },
  plugins: [],
};
