import './app.css'
import png404 from './assets/404.png'

const root = document.querySelector('#root')

const img = document.createElement('img')
img.src = png404

root.append(img)
root.classList.add('a')
const a = 1
