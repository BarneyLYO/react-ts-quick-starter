import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'Src/app'

ReactDOM.render(
  <App name="a" age={12} />,
  document.querySelector('#root'),
)
