import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Браузерные глобальные переменные
  { languageOptions: { globals: globals.browser } },
  // Node.js и Jest глобальные переменные
  { languageOptions: { globals: { ...globals.node, ...globals.jest } } },
  // Базовые правила ESLint
  pluginJs.configs.recommended,
];