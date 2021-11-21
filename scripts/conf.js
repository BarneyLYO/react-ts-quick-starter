const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')
const PROJECT_NAME = path.parse(PROJECT_PATH).name

const SERVER_HOST = 'localhost'
const SERVER_PORT = 9000

const shouldOpenAnalyzer = false
const ANALYZER_HOST = SERVER_HOST
const ANALYZER_PORT = '8888'

const imageInlineSizeLimit = 4 * 1024

module.exports = {
  PROJECT_NAME,
  PROJECT_PATH,
  SERVER_HOST,
  SERVER_PORT,
  ANALYZER_HOST,
  ANALYZER_PORT,
  shouldOpenAnalyzer,
  imageInlineSizeLimit,
}
