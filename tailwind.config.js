/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#052d5a',
          dark: '#041E3D',
          light: '#0A3D73',
        },
        teal: {
          brand: '#08a39c',
          soft: '#E6F6F5',
        },
        surface: '#F5F8FC',
        wgreen: '#25D366',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
