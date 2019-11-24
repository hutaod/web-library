import React, { Component } from 'react'
import { connect } from 'react-redux'

class Counter extends Component {
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

  render() {
    console.log(3)

    const { counter, onIncrement, dispatch } = this.props
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
