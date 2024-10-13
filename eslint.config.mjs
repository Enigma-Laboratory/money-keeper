import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./packages/*/tsconfig.json'],
  },
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
});
