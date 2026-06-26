/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'arctic-powder': '#F1F6F4',
        'mystic-mint': '#D9E8E2',
        'forsythia': '#FFC801',
        'deep-saffron': '#FF9932',
        'nocturnal': '#114C5A',
        'oceanic': '#172B36',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
