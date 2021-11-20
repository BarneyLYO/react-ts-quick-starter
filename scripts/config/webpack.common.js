/* eslint-disable unicorn/no-array-push-push */
/* eslint-disable unicorn/import-style */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */

/* Node Modules */
const { resolve } = require('path')

/* plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TeserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/* post css plugin */
const POST_CSS_PLUGIN_BUG_FIXER = require('postcss-flexbugs-fixes')
const POST_CSS_PLUGIN_PRESET_ENV = require('postcss-preset-env')
const POST_CSS_PLUGIN_NORMALIZER = require('postcss-normalize')
const POST_CSS_AUTOPREFIX = require('autoprefixer')

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

const copyPlugin = new CopyPlugin({
  patterns: [
    {
      context: resolve(PROJECT_PATH, './public'),
      from: '*',
      to: resolve(PROJECT_PATH, './dist'),
      toType: 'dir',
      globOptions: {
        dot: true,
        gitignore: true,
        ignore: ['**/index.html'],
      },
    },
  ],
})

const webpackbar = new WebpackBar({
  name: IS_DEV ? 'bootstrapping' : 'packaging',
  color: '#f68c16',
})

const forkTsCheckerWebpackPlugin =
  new ForkTsCheckerWebpackPlugin({
    typescript: {
      configFile: resolve(PROJECT_PATH, './tsconfig.json'),
    },
  })

const plugins = [
  htmlWebpackPlugin,
  cleanWebpackPlugin,
  copyPlugin,
  webpackbar,
  forkTsCheckerWebpackPlugin,
]

if (!IS_DEV) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
  )
}

const getCssLoaders = (importLoaders) => [
  IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
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

const terserPlugin = new TeserPlugin({
  extractComments: false,
  terserOptions: {
    compress: {
      pure_funcs: ['console.log'],
    },
  },
})

const optimizeCssAssetsPlugin =
  new OptimizeCssAssetsPlugin()

const minimizer = []

if (!IS_DEV) {
  minimizer.push(terserPlugin)
  minimizer.push(optimizeCssAssetsPlugin)
}

const optimization = {
  splitChunks: {
    chunks: 'all',
    minSize: 0,
  },
  minimize: !IS_DEV,
  minimizer,
}

module.exports = {
  entry,
  output,
  plugins,
  module: {
    rules,
  },
  resolve: resolveExtions,
  optimization,
}
