/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import './app.css'
import png404 from './assets/404.png'

interface IProp {
  name: string
  age: number
}

export const App = (props: IProp) => {
  const { name, age } = props
  return (
    <div className="app">
      <span onClick={() => Promise.resolve(1)}>
        Hello ! Im {name}, {age} years old
      </span>
      <img src={png404} alt="404" />
    </div>
  )
}
