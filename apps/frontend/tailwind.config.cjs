/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.tsx"],
  // @ts-ignore
  presets: [require("@erc1155-template/tailwind-config")],
};

module.exports = config;
