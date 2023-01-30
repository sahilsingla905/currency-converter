/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'teal': '#009688',
      'green': '#94C720',
      'red': '#C70D38',
      'silver': '#8D8D8D',
      'default': '#404040',
    },
    extend: {},
  },
  plugins: [],
}
