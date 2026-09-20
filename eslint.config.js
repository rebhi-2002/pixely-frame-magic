import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi", ".vercel"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
            {
              name: "@sentry/tanstackstart-react",
              message:
                "No static Sentry imports outside src/instrument.client.ts — they end up in the SSR bundle and take down every page (500 ERR_MODULE_NOT_FOUND) when the package is missing from the serverless function. Use dynamic import() with catch (see src/lib/server-sentry.ts).",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // الملف الوحيد المسموح له بـimport ثابت لـSentry: نقطة دخول المتصفح فقط.
    files: ["src/instrument.client.ts"],
    rules: { "no-restricted-imports": "off" },
  },
  eslintPluginPrettier,
);
