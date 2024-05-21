import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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
      parserOptions: {
        sourceType: 'module',
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['public', 'build', 'node_modules', './src/services/HttpService/HttpClientService.ts'],
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
    },
  },
);

// "eslintConfig": {
//   "extends": [
//     "react-app"
//   ]
// }

// export default [
//   {
//     files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
//     rules: {
//       'no-unused-vars': 'error',
//       'no-undef': 'error',
//     },
//   },
// ];
