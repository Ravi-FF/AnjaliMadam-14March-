/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rgba-1': 'rgba(0, 0, 0, 0.5)',
        'rgba-2': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}