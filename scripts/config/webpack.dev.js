/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const Webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const paths = require('../paths')

const mode = 'development'
const devtool = 'cheap-module-source-map'
const target = 'web'
const output = {
  filename: 'js/[name].js',
  path: paths.appBuild,
}
const devServer = {
  compress: true,
  stats: 'errors-only',
  clientLoglevel: 'silent',
  open: true,
  hot: true,
  noInfo: true,
  // proxy: {
  //   // ...require(paths.appProxySetup),
  // },
}

const plugins = [
  new Webpack.HotModuleReplacementPlugin(),
  new ErrorOverlayPlugin(),
]

const optimization = {
  minimize: false,
  minimizer: [],
  splitChunks: {
    chunks: 'all',
    minSize: 0,
  },
}

module.exports = merge(common, {
  mode,
  devtool,
  target,
  output,
  devServer,
  plugins,
  optimization,
})
