import React, { Component } from './kreact'
import ReactDOM from './kreact-dom'

class Comp2 extends Component {
  render() {
    return <div>Comp2</div>
  }
}

function Comp(params) {
  return <div>comp</div>
}

const jsx = (
  <div id="dome">
    <span>h1</span>
    <Comp />
    <Comp2 />
  </div>
)

console.log(jsx)

ReactDOM.render(jsx, document.getElementById('root'))
