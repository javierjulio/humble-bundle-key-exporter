import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
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
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        HumbleBundleKeyExporter: "readonly"
      }
    }
  }
]);
