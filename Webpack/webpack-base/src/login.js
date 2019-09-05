// import styles from './index.module.less'
// import logo from './assets/images/logo.png'
// console.log(logo)
// var img = new Image()
// img.src = logo
// img.classList.add(styles.logo)

// var root = document.getElementById('root')
// root.appendChild(img)

// document.write('hello webpack!!')
// console.log('hello1122')

// import axios from 'axios'
// axios.get('/api/info').then(res => {
//   console.log(res)
// })

var btn = document.createElement('button')
import counter from './counter'

btn.innerHTML = '按钮'
btn.onclick = function() {
  var childNode = document.createElement('div')
  childNode.innerHTML = `123`
  document.body.appendChild(childNode)
}

document.body.appendChild(btn)
counter()
if (module.hot) {
  module.hot.accept('./counter', () => {
    document.getElementById('counter').remove()
    counter()
  })
}
