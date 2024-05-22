import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import react from 'eslint-plugin-react';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  {
    linterOptions: {},
    languageOptions: {
      globals: {
        // ...globals.serviceworker,
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['/public', '/build', '/node_modules'],
    files: ['/src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      // react,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // '@typescript-eslint/no-explicit-any': 'error',
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
    },
  },
);
