const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const chalk = require('chalk')
const webpackDevConfig = require('../config/webpack.dev')
const { SERVER_HOST, SERVER_PORT } = require('../conf')
const logger = require('./logger')
const choosePort = require('./chose-port')

const compiler = Webpack(webpackDevConfig)

const devServerOptions = {
  ...webpackDevConfig.devSer,
}

const server = new WebpackDevServer(
  compiler,
  devServerOptions,
)

const startServer = async () => {
  const resPort = await choosePort(SERVER_PORT, SERVER_HOST)
  if (resPort) {
    try {
      server.listen(resPort, SERVER_HOST, (err) => {
        if (err) return logger.error(err.message)
        return logger.start(resPort, SERVER_HOST)
      })
    } catch (e) {
      console.log(chalk.red(e.message))
    }
  }
}

startServer()
