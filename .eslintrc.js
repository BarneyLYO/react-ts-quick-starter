const OFF = 0
const WARN = 1
const ERROR = 2

const environment = {
  browser: true,
  es2021: true,
  node: true,
}

const setting = {
  'import/resolver': {
    node: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
  },
}

const extendsList = [
  'airbnb',
  'airbnb/hooks',
  // 'airbnb-typescript',
  'plugin:react/recommended',
  'plugin:unicorn/recommended',
  'plugin:promise/recommended',
  'plugin:@typescript-eslint/recommended',
  'prettier',
  // 'plugin:prettier/recommended',
  // 'prettier/@typescript-eslint',
  // 'prettier/react',
  // 'prettier/unicorn',
]

const parser = {
  name: '@typescript-eslint/parser',
  options: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
}

const plugins = [
  'react',
  'unicorn',
  'promise',
  '@typescript-eslint',
  // 'prettier',
]

const rules = {
  'import/extensions': [
    ERROR,
    'ignorePackages',
    {
      ts: 'never',
      tsx: 'never',
      json: 'never',
      js: 'never',
    },
  ],
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: environment,
  extends: extendsList,
  parser: parser.name,
  parserOptions: parser.options,
  plugins,
  rules,
}
