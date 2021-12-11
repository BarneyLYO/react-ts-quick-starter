/* eslint-disable import/no-import-module-exports */
import React from 'react'
import ReactDOM from 'react-dom'
// import barney from './a.barney'
import img from './assets/404.png'
// eslint-disable-next-line import/extensions
import json from './a.json'

try {
  module?.hot?.accept()
} catch (e) {
  console.log(e)
}
console.log(json)
ReactDOM.render(
  <span>
    {' '}
    13sfsdfsdf12
    <img src={img} alt="asd" />
  </span>,
  document.querySelector('#root'),
)
