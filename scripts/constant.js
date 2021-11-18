/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */
const path = require('path')

// path.resolve: parse the path into absolute path
// __dirname: the dirname of accessed js folder name

const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9000

const PROJECT_PATH = path.resolve(__dirname, '../')
const PROJECT_NAME = path.parse(PROJECT_PATH).name
const IS_DEV = process.env.NODE_ENV !== 'production'
const LOGGER_DIVIDER = `
================================================================================================
`

module.exports = {
  PROJECT_NAME,
  PROJECT_PATH,
  SERVER_HOST,
  SERVER_PORT,
  IS_DEV,
  LOGGER_DIVIDER,
}
