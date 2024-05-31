module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['plugin:react-hooks/recommended', 'airbnb', 'airbnb-typescript', 'eslint-config-prettier'],
  ignorePatterns: ['dist', 'vite.config.ts', 'vitest.config.ts', 'tests', '*.cjs', '*.html'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'off',
    'no-console': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
  },
};
