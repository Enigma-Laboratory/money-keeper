import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,

  {
    linterOptions: {},
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    overrides: [],
    languageOptions: {
      globals: {
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
    plugins: ['react', '@typescript-eslint', 'import'],
    rules: {
      semi: ['error', 'always'],
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
);
