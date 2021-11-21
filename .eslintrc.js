const OFF = 0
const WARN = 1
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
  'plugin:react/recommended',
  'plugin:promise/recommended',
  'plugin:@typescript-eslint/recommended',
  'prettier',
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

const plugins = ['react', 'promise', '@typescript-eslint']

const importRules = {
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
  'import/prefer-default-export': OFF,
  'import/no-unresolved': ERROR,
  'import/no-dynamic-require': OFF,
}

const typescriptRules = {
  '@typescript-eslint/no-useless-constructor': ERROR,
  '@typescript-eslint/no-empty-function': WARN,
  '@typescript-eslint/no-var-requires': OFF,
  '@typescript-eslint/explicit-function-return-type': OFF,
  '@typescript-eslint/explicit-module-boundary-types': OFF,
  '@typescript-eslint/no-explicit-any': OFF,
  '@typescript-eslint/no-use-before-define': ERROR,
  '@typescript-eslint/no-unused-vars': WARN,
}

const reactRules = {
  'react/jsx-filename-extension': [
    ERROR,
    { extensions: ['.tsx', 'ts', '.jsx', 'js'] },
  ],
  'react/jsx-indent-props': [ERROR, 2],
  'react/jsx-indent': [ERROR, 2],
  'react/jsx-one-expression-per-line': OFF,
  'react/destructuring-assignment': OFF,
  'react/state-in-constructor': OFF,
  'react/jsx-props-no-spreading': OFF,
  'react/prop-types': OFF,
  'react/function-component-definition': [
    ERROR,
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    },
  ],
  'jsx-quotes': [ERROR, 'prefer-single'],
  'jsx-a11y/click-events-have-key-events': OFF,
  'jsx-a11y/no-noninteractive-element-interactions': OFF,
  'jsx-a11y/no-static-element-interactions': OFF,
}

const commonRules = {
  'no-unused-vars': OFF,
  'no-plusplus': OFF,
  'no-console': OFF,
  'no-continue': OFF,
  'lines-between-class-members': [ERROR, 'always'],
  'global-require': OFF,
}

const rules = {
  ...importRules,
  ...typescriptRules,
  ...reactRules,
}

module.exports = {
  env: environment,
  settings,
  extends: extendsList,
  parser: parser.name,
  parserOptions: parser.options,
  plugins,
  rules,
}
