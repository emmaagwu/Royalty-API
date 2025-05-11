module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
};
