import React, { useReducer } from 'react'
import { Provider, connect } from './model'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1
      }
    case 'decrement':
      return {
        count: state.count - 1
      }
    default:
      throw new Error()
  }
}

// const actions = {
//   add: dispatch => {
//     setTimeout(() => {
//       dispatch({ type: 'increment' })
//     })
//   }
// }

const SomeChild = connect()(props => {
  console.log(props)
  return (
    <div>
      Count: {props.count}
      <button
        onClick={() => {
          props.increment()
        }}
      >
        +
      </button>
      <button onClick={() => props.dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
})

function ReducerHook() {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)
  return (
    <Provider>
      Count: {state.count}
      <button
        onClick={() => {
          setTimeout(() => {
            dispatch({ type: 'increment' })
          }, 1000)
        }}
      >
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <SomeChild />
    </Provider>
  )
}

export default ReducerHook
