const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer')
const common = require('./webpack.common')
const paths = require('../paths')
const {
  shouldOpenAnalyzer,
  ANALYZER_HOST,
  ANALYZER_PORT,
} = require('../conf')

const mode = 'production'
const devtool = false
const target = 'browserslist'
const output = {
  filename: 'js/[name].[contenthash:8].js',
  path: paths.appBuild,
  assetModuleFilename:
    'images/[name].[contenthash:8].[ext]',
}

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].chunk.css',
  }),
]

if (shouldOpenAnalyzer) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: ANALYZER_HOST,
      analyzerPort: ANALYZER_PORT,
    }),
  )
}

const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        compress: {
          pure_funcs: ['console.log'],
        },
      },
    }),
    new CssMinimizerPlugin(),
  ],
  splitChunks: {
    chunks: 'all',
    minSize: 0,
  },
}

/**
 * Webpack 5 you dont need to specify the devtool
 */
module.exports = merge(common, {
  mode,
  devtool,
  target,
  output,
  plugins,
  optimization,
})
