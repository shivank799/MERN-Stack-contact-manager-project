import pluginReact from "eslint-plugin-react";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig({
  ignores: ["node_modules/**", "build/**"],
  files: ["src/**/*.{js,jsx}"],
  languageOptions: {
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false, // allows parsing without a separate Babel config
      babelOptions: {
        presets: ["@babel/preset-react"] // enables JSX parsing
      },
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: globals.browser
  },
  plugins: {
    react: pluginReact
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
});
