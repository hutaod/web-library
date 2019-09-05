import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import './styleLess.less'
import './styleSass.scss'
// import testImg from './assets/images/1567415814.jpg'
// import testImg2 from './assets/images/24310479.png'

const App = () => {
  return (
    <div className="app">
      <div className="hello">hello React!!</div>
      <h2 className="yellow">hahaha</h2>
      {/* <div className="img1">
        <img src="./assets/images/htxc.jpg" alt="" />
      </div> */}
      {/* <div className="img2">
        <img src={testImg} alt="" />
        <img src={testImg2} alt="" />
      </div> */}
      <div className="img3" />
      <div className="img4" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
