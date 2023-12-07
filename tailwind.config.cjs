const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/*.html', './templates/*/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Code Pro', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
