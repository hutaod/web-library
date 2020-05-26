import React, { Component, useState, StrictMode } from 'react'
import PropTypes from 'prop-types'
import TestChildren from './TestChildren'
// console.log(React)
window.React = React
console.log(React.unstable_ConcurrentMode)

const Counter = function(props) {
  const [counter, setCounter] = useState(0)
  // console.log('Fragment', Fragment, <Fragment />)
  // console.log(props.ref) // 开发环境访问ref时会有错误提示

  return (
    <div>
      <h2>{counter}</h2>
      <button
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
        测试
      </button>
      <TestContext></TestContext>
    </div>
  )
}

const FuncTest = () => {
  return <div>FuncTest</div>
}

const ClsTest = () => {
  return <div>ClsTest</div>
}

class TestContext extends Component {
  // componentWillMount() {
  //   console.log('test StrictMode')
  // }
  render() {
    console.log(this.context)
    return (
      // <StrictMode>
      <div>TestContext: {this.context.value}</div>
      // </StrictMode>
    )
  }
}

TestContext.contextTypes = {
  value: PropTypes.number,
}

export default class Index extends Component {
  state = {
    counter: 0,
  }

  getChildContext() {
    return { value: this.state.counter, a: 'haha' }
  }

  render() {
    // const test = (
    //   <div>
    //     <h1>123</h1>
    //   </div>
    // )
    const funcTest = <FuncTest />
    const clsTest = <ClsTest />
    // console.log(funcTest, clsTest)

    return (
      // <StrictMode>
      <div>
        <h2>{this.state.counter}</h2>
        <button
          onClick={() => {
            this.setState({ counter: this.state.counter + 1 })
          }}
        >
          测试
        </button>
        <Counter />
        {funcTest}
        {clsTest}
        <TestChildren>
          <div>1</div>
          <div>
            <span>21</span>
            <span>22</span>
          </div>
          <div>3</div>
        </TestChildren>
        <div
          onClick={() => {
            // console.log(this.state)
            // this.setState(0)
          }}
          children={1}
        >
          123
        </div>
      </div>
      // </StrictMode>
    )
  }
}

Index.childContextTypes = {
  value: PropTypes.number,
  a: PropTypes.string,
}
