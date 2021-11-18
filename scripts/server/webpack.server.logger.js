/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */
const chalk = require('chalk')
const ip = require('ip')
const { LOGGER_DIVIDER } = require('../constant')

const error = (error_) => {
  console.error(chalk.red(error_))
}

const logInfo = (host, port) => {
  console.log(`Server started! ${chalk.green('✓')}`)
  const info = `
  ${chalk.bold('App running at:')}
  ${LOGGER_DIVIDER}
  - Local: ${chalk.blue(`  http://${host}:${port}`)}
  - Network: ${chalk.blue(`http://${ip.address()}:${port}`)}
  ${LOGGER_DIVIDER}
  ${chalk.magenta(
    `Press ${chalk.italic('Ctrl+c')} to stop`,
  )}
`
  console.log(info)
}

const start = (port, host) => {
  logInfo(host, port)
}

module.exports = {
  start,
  error,
}
