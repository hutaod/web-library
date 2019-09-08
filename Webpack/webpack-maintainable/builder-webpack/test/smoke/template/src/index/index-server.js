'use strict';

const React = require('react')
const largeNumber = require('@ht1131589588/large-number');
const logo = require('../images/logo.png')
require('./index.less')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Text: null,
    }
  }

  loadComponent() {
    import('./test.js').then((Text) => {
      this.setState({
        Text: Text.default,
      })
    })
  }

  render() {
    const { Text } = this.state
    const num = largeNumber('111','9')
    return (
      <div className="app">
        <div className="search-text">搜索文字的内容111</div>
        <img src={logo} alt="" onClick={() => {
          this.loadComponent()
        }} />
        <p />
        {Text ? <Text /> : null}
        <div>{num}</div>
      </div>
    )
  }
}

// console.log(<App/>)

module.exports = <App/>

// ReactDOM.render(<App />, document.getElementById('root'))
