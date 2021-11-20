/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { SERVER_HOST, SERVER_PORT } = require('../constant')

/* PROXY SETTING */
const PROXY_SETTING = require('../../src/set-proxy')

const mode = 'development'

const proxy = {
  // ...PROXY_SETTING
}

module.exports = merge(common, {
  mode,
  stats: 'errors-only',
  devtool: 'eval-source-map',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
    client: {
      logging: 'none',
    },
    proxy,
  },
})
