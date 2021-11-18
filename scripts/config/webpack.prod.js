/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const mode = 'production'

/**
 * Webpack 5 you dont need to specify the devtool
 */
module.exports = merge(common, {
  mode,
})
