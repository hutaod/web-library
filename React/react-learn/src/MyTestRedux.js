import React, { Component } from 'react'
import { createStore, applyMiddleware } from './redux'

export function counterReducer(state = 0, action) {
  const num = action.payloa || 1
  console.log(1222)
  switch (action.type) {
    case 'add':
      return state + num
    case 'minus':
      return state - num
    default:
      return state
  }
}

// 自定义中间件
function logger({ getState }) {
  // console.log(midApi) midApi的dispatch为增强
  // 返回真正的中间件执行函数 下面的dispatch增强了
  return dispatch => {
    return action => {
      console.log('logger')
      console.log(getState())
      // 执行中间件任务
      console.log(action.type + '执行了！！！')
      const nextAction = dispatch(action)
      console.log(getState())
      console.log(nextAction)
      // return dispatch(action)
      // 执行下一个中间件
      return nextAction
    }
  }
}

// 自定义中间件
function logger2({ getState }) {
  // console.log(midApi) midApi的dispatch为增强
  // 返回真正的中间件执行函数 下面的dispatch增强了
  return dispatch => {
    return action => {
      console.log('logger2')
      console.log(getState())
      // 执行中间件任务
      console.log(action.type + '执行了！！！')
      const nextAction = dispatch(action)
      console.log(getState())
      console.log(nextAction)
      // return dispatch(action)
      // 执行下一个中间件
      return nextAction
    }
  }
}
// 自定义中间件
function thunk({ getState }) {
  // 返回真正的中间件执行函数
  return dispatch => {
    return action => {
      // thunk逻辑，处理函数action
      // console.log(action)
      console.log('thunk')
      console.log(action)
      if (typeof action === 'function') {
        action(dispatch, getState)
        return
      }
      const nextAction = dispatch(action)
      console.log(nextAction)
    }
  }
}
const store = createStore(
  counterReducer,
  applyMiddleware(logger2, thunk, logger)
)

export default class MyTestRedux extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
      console.log(1112222)
      // this.unsubscribe()
    })
  }
  render() {
    return (
      <div>
        {store.getState()}
        <div>
          <button
            onClick={() => {
              console.log(123)
              store.dispatch({
                type: 'add'
              })
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              store.dispatch(dispatch => {
                setTimeout(() => {
                  dispatch({
                    type: 'minus'
                  })
                }, 1000)
              })
            }}
          >
            -
          </button>
        </div>
      </div>
    )
  }
}
