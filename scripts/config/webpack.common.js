/* eslint-disable unicorn/import-style */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */

/* Node Modules */
const { resolve } = require('path')

/* plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const POST_CSS_PLUGIN_BUG_FIXER = require('postcss-flexbugs-fixes')
const POST_CSS_PLUGIN_PRESET_ENV = require('postcss-preset-env')
const POST_CSS_PLUGIN_NORMALIZER = require('postcss-normalize')
const POST_CSS_AUTOPREFIX = require('autoprefixer')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')

/* Customized */
const { PROJECT_PATH, IS_DEV } = require('../constant')

const OUT_PUT_FILE_NAME = `js/[name]${
  IS_DEV ? '' : '.[hash:8]'
}.js`

const entry = {
  app: resolve(PROJECT_PATH, './src/index.tsx'),
}

const output = {
  filename: OUT_PUT_FILE_NAME,
  path: resolve(PROJECT_PATH, './dist'),
}

const htmlWebpackPluginMinifyOpt = {
  removeAttributeQuotes: true,
  collapseWhitespace: true,
  removeComments: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  useShortDoctype: true,
}

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: resolve(PROJECT_PATH, './public/index.html'),
  filename: 'index.html',
  cache: false,
  minify: IS_DEV ? false : htmlWebpackPluginMinifyOpt,
})

const cleanWebpackPlugin = new CleanWebpackPlugin()

const plugins = [htmlWebpackPlugin, cleanWebpackPlugin]

const getCssLoaders = (importLoaders) => [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: false,
      sourceMap: IS_DEV,
      importLoaders, // loader before css-loader
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: [
          POST_CSS_PLUGIN_BUG_FIXER,
          POST_CSS_PLUGIN_PRESET_ENV({
            stage: 3,
          }),
          POST_CSS_PLUGIN_NORMALIZER,
          POST_CSS_AUTOPREFIX({
            grid: true,
            flexbox: 'no-2009',
          }),
        ],
      },
      sourceMap: IS_DEV,
    },
  },
]

const STYLE_LODERS = {
  test: /\.css$/,
  use: getCssLoaders(1),
}

const LESS_LODERS = {
  test: /\.less$/,
  use: [
    ...getCssLoaders(2),
    {
      loader: 'less-loader',
      options: {
        sourceMap: IS_DEV,
      },
    },
  ],
}

const SCSS_LOADER = {
  test: /\.scss$/,
  use: [
    ...getCssLoaders(2),
    {
      loader: 'sass-loader',
      options: {
        sourceMap: IS_DEV,
      },
    },
  ],
}

const FONT_LOADER = {
  test: /\.(ttf|woff|woff2|eot|otf)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[name].[contenthash:8].[ext]',
        outputPath: 'assets/fonts',
      },
    },
  ],
}

const IMG_LOADER = {
  test: /\.(bmp|gif|jpe|jpeg|png)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10 * 1024,
        name: '[name].[contenthash:8].[ext]',
        outputPath: 'assets/images',
      },
    },
  ],
}

const BABEL_LOADER = {
  test: /\.(tsx?|jsx?)$/,
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
  },
  exclude: /node_modules/,
}

const rules = [
  STYLE_LODERS,
  LESS_LODERS,
  SCSS_LOADER,
  FONT_LOADER,
  IMG_LOADER,
  BABEL_LOADER,
]

const resolveExtions = {
  extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
  alias: {
    Src: resolve(PROJECT_PATH, './src'),
    Components: resolve(PROJECT_PATH, './src/components'),
    Utils: resolve(PROJECT_PATH, './src/utils'),
  },
}

module.exports = {
  entry,
  output,
  plugins,
  module: {
    rules,
  },
  resolve: resolveExtions,
}
