/** @type {import('tailwindcss').Config} */
// content for ejs and express
module.exports = {
  content: [
    "./views/**/*.ejs", "./views/*.ejs", "./public/**/*.js", "./public/**/*.css", "./public/**/*.html", "./public/**/*.json",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
