/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios'
import React, { Suspense } from 'react'
import './app.css'
import png404 from './assets/404.png'

import('./math').then((math) => {
  console.log('lazy load by webpack')
  console.log(math.add(19, 1))
})

const ComponentLazy = React.lazy(
  () => import('./lazy-load-component'),
)

interface IProp {
  name: string
  age: number
}

const click = () => {
  axios.get('https://www.boredapi.com/api/activity')
}

export const App = (props: IProp) => {
  const { name, age } = props
  return (
    <div className="app">
      <span onClick={click}>
        Hello ! Im {name}, {age} years old
      </span>
      <img src={png404} alt="404" />
      <br />
      <Suspense fallback={<div>Loading......</div>}>
        <ComponentLazy />
      </Suspense>
    </div>
  )
}
