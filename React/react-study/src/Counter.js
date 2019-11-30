import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import { is } from 'immutable'

// PureComponent 基本比较原理
function shallowEqual(obj, newObj) {
  if (obj === newObj) {
    return true
  }
  const objKeys = Object.keys(obj)
  const newObjKeys = Object.keys(newObj)
  if (objKeys.length !== newObjKeys.length) {
    return false
  }
  return objKeys.every((key) => {
    return obj[key] === newObj[key]
  })
}

// 用Immutable加强版，只能用于props和state是用Immutable数据

function immutableNotEqual(nextProps, nextState, thisProps, thisState) {
  if (
    Object.keys(nextProps).length !== Object.keys(thisProps).length ||
    Object.keys(nextState).length !== Object.keys(thisState).length
  ) {
    return true
  }
  console.log(2221)

  for (const key in nextProps) {
    console.log(
      nextProps[key],
      thisProps[key],
      is(nextProps[key], thisProps[key])
    )

    if (nextProps.hasOwnProperty(key) && !is(thisProps[key], nextProps[key])) {
      return true
    }
  }
  console.log(2222)
  for (const key in nextState) {
    if (nextState.hasOwnProperty(key) && !is(thisState[key], nextState[key])) {
      return true
    }
  }
  console.log(2223)

  return false
}

class Hello extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps, nextState, this.props, this.state)

    // return !shallowEqual(this.props, nextProps)
    return immutableNotEqual(
      nextProps || {},
      nextState || {},
      this.props || {},
      this.state || {}
    )
  }
  render() {
    console.log(this.props)
    return <div>hello</div>
  }
}

class Counter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      conuter2: 1
    }
    console.log(1)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(2)

    return null
  }

  componentDidMount() {
    console.log(4)
    const dom = ReactDOM.findDOMNode(this)
    console.log('componentDidMount', dom.clientHeight)
  }

  // props或state更新时出发，forceUpdate强制刷新会跳过改步骤
  shouldComponentUpdate() {
    console.log(5)
    return true
  }

  // 在render之后，componentDidUpdate之前
  getSnapshotBeforeUpdate = (prevProps, prevState) => {
    console.log(6)
    return null
  }

  componentDidUpdate() {
    console.log(7)
  }

  componentWillUnmount() {
    console.log(8)
  }

  handleClick = () => {
    console.log(123)
  }

  render() {
    console.log(3)

    const { counter, onIncrement, dispatch } = this.props
    const style = {}
    return (
      <div>
        <p>{counter}</p>
        <p>state counter {this.state.conuter2}</p>
        <button
          onClick={() => {
            this.state.conuter2 = this.state.conuter2 + 1
            this.forceUpdate(function() {
              console.log('forceUpdateEnd') // 在生命周期执行结束
            })
            console.log('forceUpdate') // 在生命周期执行之前
            // this.setState({
            //   conuter2: this.state.conuter2 + 1
            // })
          }}
        >
          改变state 的counter
        </button>
        <Hello name={123}></Hello>
        <div>
          <button onClick={onIncrement}>+</button>
          <button
            onClick={() => {
              dispatch({
                type: 'DECREMENT'
              })
            }}
          >
            -
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch({
                type: 'INCREMENT_ASYNC',
                payload: 2
              })
              dispatch({
                type: 'INCREMENT_ASYNC',
                payload: 2
              })
            }}
          >
            延迟 +2
          </button>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => state,
  (dispatch) => {
    return {
      dispatch,
      onIncrement: () => {
        dispatch({
          type: 'INCREMENT'
        })
      }
    }
  }
)(Counter)
