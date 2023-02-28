/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint","prettier"],
  extends: [
    "../../.eslintrc.js",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
    "plugin:prettier/solidity"
  ],
  rules: {
    "rules": {
      "prettier/prettier": "error"
    },
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
  },
};
