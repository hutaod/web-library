import React, { Component, useState, useContext } from 'react'

// const contextData = {
//   counter: 0
// }
const testContext = React.createContext()

// 抽离出来可以优化性能，只会刷新用到地方，而不会刷新内部其他组件
const TestContextComp = props => {
  const [counter, setCounter] = useState(0)

  return (
    <testContext.Provider
      value={{
        counter: counter,
        increasement: () => {
          setCounter(counter + 1)
        }
      }}
    >
      {props.children}
    </testContext.Provider>
  )
}

class HooksTest extends Component {
  render() {
    console.log(`HooksTest`)
    return (
      <div>
        {/* userContext */}
        <TestContextComp>
          <MiddleComp />
          <ButtonComp />
        </TestContextComp>
      </div>
    )
  }
}

const MiddleComp = () => {
  console.log(`MiddleComp`)
  return <TestUseContext />
}

class ButtonComp extends Component {
  static contextType = testContext
  render() {
    console.log(`ButtonComp`)
    return (
      <button
        onClick={() => {
          this.context.increasement()
        }}
      >
        测试Context
      </button>
    )
  }
}

const TestUseContext = () => {
  const contextVal = useContext(testContext)
  console.log('TestUseContext')
  return <div>{contextVal.counter}</div>
}

export default HooksTest
