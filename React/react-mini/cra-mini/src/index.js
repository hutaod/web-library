import React, { Component } from './hreact'
import ReactDOM from './hreact/ReactDOM'

class Comp2 extends Component {
  render() {
    console.log(this.props.children)
    return <div>{this.props.children}</div>
  }
}

function Comp(props) {
  return <div>{props.name}</div>
}

const jsx = (
  <div id="dome">
    <span name="span" style={{ color: 'red' }}>
      h1
      <b>122</b>
      <b>122</b>
    </span>
    <Comp name="hello comp">
      <b>222</b>
    </Comp>
    <Comp2>
      hello
      <div>1222</div>
      <Comp2>
        hello
        <div>1222</div>
      </Comp2>
    </Comp2>
  </div>
)

console.log(jsx)

ReactDOM.render(jsx, document.getElementById('root'))
