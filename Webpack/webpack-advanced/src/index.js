import 'lib-flexible'
import React from 'react'
import ReactDOM from 'react-dom'
import logo from './images/logo.png'
import './index.less'

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div className="search-text">搜索文字的内容</div>
        <img src={logo} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
