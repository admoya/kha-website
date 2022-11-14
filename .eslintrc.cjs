module.exports = {
  parser: "@typescript-eslint/parser", // add the TypeScript parser
  plugins: [
    "svelte3",
    "@typescript-eslint", // add the TypeScript plugin
  ],
  overrides: [
    // this stays the same
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  rules: {
    "no-undef": "off",
  },
  settings: {
    "svelte3/typescript": true, // load TypeScript as peer dependency
  },
  extends: ["eslint:recommended"],
  env: {
    browser: true,
    node: true,
  },
};
