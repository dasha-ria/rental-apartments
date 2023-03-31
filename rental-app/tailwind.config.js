/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        half: "0.2rem",
        pic: "30rem",
      },
      height: {
        half: "0.2rem",
        thin: "0.06rem",
        pic: "30rem",
      },
      borderWidth: {
        focusBorder: "0.1rem",
      },
    },
  },
  plugins: [],
};
