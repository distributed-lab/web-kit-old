module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 80,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
    'arrow-parens': 0,
    'no-debugger': 1,
    'no-warning-comments': [
      1,
      {
        terms: ['hardcoded'],
        location: 'anywhere',
      },
    ],
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-return-await': 0,
    'object-curly-spacing': ['error', 'always'],
    'no-var': 'error',
    'comma-dangle': [1, 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/no-var-requires': 0,
  }
}
