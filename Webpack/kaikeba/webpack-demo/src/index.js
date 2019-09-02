import './index.css'
import './index.less'
import logo from './logo.gif'
console.log(logo)
var img = new Image()
img.src = logo
img.classList.add('logo')

var root = document.getElementById('root')
root.appendChild(img)

document.write('hello webpack')
console.log('hello')
