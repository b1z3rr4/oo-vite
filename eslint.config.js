import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'always'],
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prefer-const': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
});
