import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { model } from '../../rayslog'
import store from '../../store'
model({
  namespace: 'test',
  state: { name: 'haha' },
  reducers: {
    changeName(state, { payload }) {
      return {
        ...state,
        name: payload
      }
    }
  }
})
function Home(props) {
  console.log(props)
  return (
    <div>
      <h2>首页</h2>
      <Link to="/detail">详情</Link>
      <div>{props.test.name}</div>
      {props.global.counter}
      <div>
        <button
          onClick={() => {
            props.dispatch({
              type: 'global/increment',
              payload: props.global.counter + 1
            })
          }}
        >
          increment
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            props.dispatch({
              type: 'global/decrement',
              payload: props.global.counter - 1
            })
          }}
        >
          decrement
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            const state = store.getState()
            console.log(state, store)
            console.time('异步请求')
            props.dispatch(async (dispatch) => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve(
                    dispatch({
                      type: 'test/changeName',
                      payload: '哈喽'
                    })
                  )
                }, 2000)
              })
            })
            props.dispatch({
              type: 'global/decrement',
              payload: props.global.counter - 1
            })
            console.timeEnd('异步请求')
            console.log(123)
          }}
        >
          thunk异步
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            console.time('异步请求2')
            await props.dispatch({
              type: 'global/add',
              payload: '哈喽'
            })
            // props.dispatch({
            //   type: 'global/decrement',
            //   payload: props.global.counter - 1
            // })
            console.timeEnd('异步请求2')
          }}
        >
          effects异步
        </button>
      </div>
      <div>
        saga
        <button
          onClick={() => {
            props.dispatch({
              type: 'USER_FETCH_REQUESTED',
              payload: { userId: 11 }
            })
          }}
        >
          测试saga
        </button>
      </div>
    </div>
  )
}

export default connect(
  (state) => {
    console.log(state)
    return { ...state }
  },
  (dispatch, props) => {
    console.log(dispatch, props)
    return {
      dispatch
    }
  },
  (stateProps, dispatchProps, props) => {
    console.log(stateProps, dispatchProps, props)
    return {
      ...stateProps,
      ...dispatchProps,
      ...props
    }
  }
)(Home)
