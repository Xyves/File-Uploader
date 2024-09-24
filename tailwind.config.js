/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      backgroundImage: {
        'body-background': "url('./assets/dark-1845685_1920.jpg')",
      },
      textColor:{
        "gray-font":"rgb(230, 230, 230)",
    },
    backgroundColor:{
      "black-background":"rgb(20, 20, 25);"
    }
  },
  
  plugins: [require("tailwindcss"), require("autoprefixer")],
  }
};
