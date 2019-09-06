// import 'lib-flexible'
import React from 'react'
import ReactDOM from 'react-dom'
// import { common } from '../../common/index'
import logo from '../images/logo.png'
// import { a } from './tree-shaking'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Text: null,
    }
    this.loadComponent()
  }

  loadComponent() {
    import('./test.js').then((Text) => {
      console.log(Text)
      this.setState({
        Text: Text.default,
      })
    })
  }

  render() {
    const { Text } = this.state
    return (
      <div className="app">
        <div className="search-text">搜索文字的内容</div>
        <img src={logo} alt="" />
        <p />
        {/* {common()} */}
        {Text ? <Text /> : null}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
