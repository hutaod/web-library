// import 'lib-flexible'
import React from 'react'
import ReactDOM from 'react-dom'
import largeNumber from '@ht1131589588/large-number';
// import { common } from '../../common/index'
import logo from '../images/logo.png'
// import { a } from './tree-shaking'
import './index.less'

// console.log(largeNumber('99999999999999999999999999', '1'))

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
      // console.log(Text)
      this.setState({
        Text: Text.default,
      })
    })
  }

  render() {
    const { Text } = this.state
    return (
      <div className="app">
        <div className="search-text">搜索文字的内容111</div>
        <img src={logo} alt="" />
        <p />
        {/* {common()} */}
        {Text ? <Text /> : null}
        {largeNumber('99999999999999999999999999', '1')}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
