/* eslint-disable import/no-import-module-exports */
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'Src/app'

module?.hot?.accept()

ReactDOM.render(
  <App name="a" age={12} />,
  document.querySelector('#root'),
)
