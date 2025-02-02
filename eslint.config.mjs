import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { rule } from "postcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // Disable unused variables check
      "no-unused-vars": "off",

      // OR if you want warnings instead of errors
      // 'no-unused-vars': 'warn',

      // OR for more specific control
      "no-unused-vars": [
        "off",
        {
          vars: "all",
          args: "none",
          ignoreRestSiblings: true,
        },
      ],

      // If you're using TypeScript, you might also want to disable the TypeScript-specific rule
      "@typescript-eslint/no-unused-vars": "off",
    },
    // ... other configurations
  },
];

export default eslintConfig;
