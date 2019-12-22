import React, { Component, useState, Fragment } from 'react'
import TestChildren from './TestChildren'

const Counter = function() {
  const [counter, setCounter] = useState(0)
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
    </div>
  )
}

const FuncTest = () => {
  return <div>FuncTest</div>
}

const ClsTest = () => {
  return <div>ClsTest</div>
}

export default class Index extends Component {
  state = {
    counter: 0,
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
      <div>
        <Counter />
        {funcTest}
        {clsTest}
        <TestChildren>
          {null}
          <div>123</div>
        </TestChildren>
      </div>
    )
  }
}
