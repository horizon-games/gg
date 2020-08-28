module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  ignorePatterns: ['node_modules', 'dist', 'coverage', 'config', 'src/vendor'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    // General
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    'no-redeclare': 'error',
    'comma-dangle': 'off',
    'no-prototype-builtins': 'off',
    'no-debugger': 'warn',
    'no-useless-catch': 'off',
    'no-extra-boolean-cast': 'off',
    'no-self-assign': 'off',

    // Plugins
    'simple-import-sort/sort': 'warn',

    // Typescript
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        accessibility: 'no-public'
      }
    ],
    '@typescript-eslint/no-implied-eval': 'off', // Keep off: Has performance implications and we never eval anyways
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/require-await': 'off',

    // Optional - Investigate if we can remove these
    'no-inner-declarations': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
