import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  js.configs.recommended,
  ...compat.config({
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ["@babel/preset-react"]
      },
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: { jsx: true }
    },
    env: {
      browser: true, // now window, document, localStorage, prompt are recognized
      es2021: true
    },
    plugins: ["react", "react-hooks"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": [
        "warn",
        { "varsIgnorePattern": "React|Routes|Route|Link|Navigate|Login|Register|Contacts|Nav|Protected|App|MemoryRouter|BrowserRouter" }
      ]
    }
  })
];
