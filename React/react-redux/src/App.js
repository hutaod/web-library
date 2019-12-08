import React from 'react'
import { connect } from 'react-redux'
import { model } from './rayslog'
import store from './store'
import './App.css'
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
function App(props) {
  return (
    <div className="App">
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
            await props.dispatch(async (dispatch) => {
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
            console.timeEnd('异步请求')
            console.log(123)
          }}
        >
          异步
        </button>
      </div>
    </div>
  )
}

export default connect((state) => {
  console.log(state)
  return { ...state }
})(App)
