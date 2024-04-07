module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { after: true }],
    'object-curly-spacing': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-multi-spaces': 'error',
    'max-lines': ['error', 150],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    eqeqeq: 'error',
    'max-len': ['error', { 'code': 110 }]
  },
}
