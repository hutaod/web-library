import React, { Component } from 'react'

/**
 * 注意：
 * 1. forceUpdate强制让组件重新渲染。会跳过该组件的shouldComponentUpdate()，
 * 但其子组件会触发正常的生命周期方法，包括 shouldComponentUpdate() 方法
 */

const Hello = () => {
  return (
    <button
      onClick={() => {
        const err = {}
        throw err
      }}
    >
      测试componentDidCatch()
    </button>
  )
}

export default class Lifeloop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    console.log('constructor')
  }

  hello = 'hello'

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps')
    return {}
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate')
    return 'hello'
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // snapshot 为getSnapshotBeforeUpdate的返回值
    console.log('componentDidUpdate:', snapshot)
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染可以显降级 UI
    // return { hasError: true };
    console.log('getDerivedStateFromError')
    return {}
  }

  componentDidCatch(error, info) {
    console.log(error, info)
    console.log('componentDidCatch')
  }

  render() {
    console.log('render')
    return (
      <div>
        <div>{this.state.count}</div>
        <div>{this.hello}</div>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1
            })
          }}
        >
          测试生命周期
        </button>
        <button
          onClick={() => {
            this.hello = 'world'
            this.forceUpdate()
          }}
        >
          测试forceUpdate()
        </button>
        <br />
        <Hello />
      </div>
    )
  }
}
