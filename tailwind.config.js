/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
  boxShadow: {
    header: '0 1px 0 #dadada',
  },
  colors: {
    'green-teal': '#0ab463',
    'warm-grey-75': '#848484bf',
    'pinkish-grey-75': '#dadada',
    'pinkish-grey-50': '#c4c4c4',
  },
},

  },
  plugins: [],
}
