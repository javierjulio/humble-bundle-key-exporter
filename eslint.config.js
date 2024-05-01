import globals from "globals";
import js from "@eslint/js";

export default [
  {
    // as the sole object key, this ignores globally
    ignores: [
      ".git/**",
      "coverage/**",
      "dist/**",
      "node_modules/**",
      "notes.js"
    ]
  },
  {
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        HumbleBundleKeyExporter: "readonly"
      }
    }
  }
];
