// import 'lib-flexible'
import React from 'react'
import ReactDOM from 'react-dom'
// import { common } from '../../common/index'
import logo from '../images/logo.png'
import { a } from './tree-shaking'
import './index.less'

// a()
// console.log(a())
if (false) {
  console.log(a())
}

class App extends React.Component {
  componentDidMount() {
    // console.log(a)
  }
  render() {
    return (
      <div className="app">
        <div className="search-text">搜索文字的内容</div>
        <img src={logo} />
        <p />
        {/* {common()} */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
