/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#B8922A', light: '#D4AC52', dark: '#8A6C1E', pale: '#F5EDD8' },
        'warm-bg': '#FAFAF8',
        'warm-card': '#F4F0E8',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
