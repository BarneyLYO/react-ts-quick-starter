/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-module */
const detect = require('detect-port-alt')
const isRoot = require('is-root')
const chalk = require('chalk')

const isInteractive = process.stdout.isTTY

async function choosePort(port, host) {
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const resPort = await detect(port, host)
  if (resPort === port) {
    return resPort
  }
  const message =
    process.platform !== 'win32' && port < 1024 && !isRoot()
      ? 'Admin permissions are required to run a server on a port below 1024.'
      : `Something is already running on port ${port}.`

  if (isInteractive) {
    console.log(chalk.yellow(message))
    return resPort
  }
  console.log(chalk.red(message))
  // eslint-disable-next-line unicorn/no-null
  return null
}

module.exports = choosePort
