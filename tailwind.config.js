/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        'body-background': "url('./assets/dark-1845685_1920.jpg')",
      }
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
