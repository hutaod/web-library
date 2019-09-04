import styles from './index.module.less'
import logo from './assets/images/logo.png'
console.log(logo)
var img = new Image()
img.src = logo
img.classList.add(styles.logo)

var root = document.getElementById('root')
root.appendChild(img)

document.write('hello webpack!!')
console.log('hello')
