/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */

// eslint-disable-next-line unicorn/import-style
const { resolve } = require('path')
const { glob } = require('glob')
const { merge } = require('webpack-merge')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const webpack = require('webpack')
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer')
const { PROJECT_PATH } = require('../constant')
const common = require('./webpack.common')

const STYLE_PATHS = glob.sync(
  `${resolve(
    PROJECT_PATH,
    './src',
  )}/**/*.{tsx,scss,less,css}`,
  {
    nodir: true,
  },
)

const PURGE_CSS_PLUGIN = new PurgeCssPlugin({
  paths: STYLE_PATHS,
  whitelist: ['html', 'body'],
})

const BANNER_PLUGIN = new webpack.BannerPlugin({
  raw: true,
  banner: `
    /* @preserve Powered by BL */
  `,
})

const BUNDLE_ANALYZER_PLUGIN = new BundleAnalyzerPlugin({
  analyzerMode: 'server',
  analyzerHost: '127.0.0.1',
  analyzerPort: 8888,
})

const mode = 'production'

/**
 * Webpack 5 you dont need to specify the devtool
 */
module.exports = merge(common, {
  mode,
  plugins: [
    PURGE_CSS_PLUGIN,
    BANNER_PLUGIN,
    BUNDLE_ANALYZER_PLUGIN,
  ],
})
