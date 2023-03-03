// @ts-check
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      fontFamily: {
        oxygen: ["Oxygen Mono", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        a1a: "auto 1fr auto",
      },
    },
  },
  plugins: [],
};

module.exports = config;
