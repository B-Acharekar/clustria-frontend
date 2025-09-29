import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Global rules
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error", // strict globally
    },
  },

  // Allow `any` in legacy files only
  {
    files: [
      "src/app/**",
      "src/components/dashboard/**",
      "src/components/preview/**",
      "src/components/trash/**",
      "src/components/settings/**",
      "src/components/**",

      "src/utils/folderUtils.ts",
      "src/services/folder.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // allow `any` here
    },
  },
];

export default eslintConfig;
