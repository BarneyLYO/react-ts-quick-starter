const OFF = 0
// const WARN = 1
const ERROR = 2

const environment = {
  browser: true,
  es2021: true,
  node: true,
}

const settings = {
  'import/resolver': {
    node: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    typescript: {},
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
  'import/no-extraneous-dependencies': [
    ERROR,
    { devDependencies: true },
  ],
  'unicorn/prevent-abbreviations': OFF,
  'react/jsx-filename-extension': OFF,
  'react/function-component-definition': [
    ERROR,
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    },
  ],
  'import/prefer-default-export': OFF,
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: environment,
  settings,
  extends: extendsList,
  parser: parser.name,
  parserOptions: parser.options,
  plugins,
  rules,
}
