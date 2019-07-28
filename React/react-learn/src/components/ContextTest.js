import React, { Component, useContext } from 'react'

// 1. 创建上下文
const Context = React.createContext()

// 2. 获取Provider和Consumer
const Provider = Context.Provider
const Consumer = Context.Consumer

// 把Consumer封装成高阶组件，它根据配置返回一个高阶函数
// 用Consumer方式使用时更方便
function withConsumer(Consumer) {
  return Comp => props => {
    return <Consumer>{value => <Comp {...value} />}</Consumer>
  }
}

// 第一种调用Context value的方式
const ChildComp = props => {
  return (
    <div
      onClick={() => {
        props.add()
      }}
    >
      {props.counter}
    </div>
  )
}

const Child = withConsumer(Consumer)(ChildComp)

// 第二种方式
class Child2 extends Component {
  static contextType = Context
  render() {
    return (
      <div
        onClick={() => {
          this.context.add()
        }}
      >
        {this.context.counter}
      </div>
    )
  }
}

// 第三种方式
const Child3 = props => {
  const context = useContext(Context)
  return (
    <div
      onClick={() => {
        context.add()
      }}
    >
      {context.counter}
    </div>
  )
}

const MiddleComp = () => {
  console.log('MiddleComp')
  return (
    <div>
      <Child />
      <Child2 />
      <Child3 />
    </div>
  )
}

// 创建ContextProvider组件用于存取Provider数据
class ContextProvider extends Component {
  state = {
    counter: 0
  }
  add = (num = 1) => {
    this.setState({
      counter: this.state.counter + num
    })
  }
  render() {
    return (
      <Provider
        value={{
          ...this.state,
          add: this.add
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export default class ContextTest extends Component {
  render() {
    return (
      <ContextProvider>
        <MiddleComp />
      </ContextProvider>
    )
  }
}
