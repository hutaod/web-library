import React, { useReducer } from 'react'

const model = {
  name: 'test',
  state: {
    count: 0
  },
  reducer: {
    increment(state) {
      state.count++
      return state
    },
    decrement(state) {
      state.count--
      return state
    }
  },
  action: {}
}

let dispatch = () => {}

const connect = (mapStateToProps, mapActionToProps) => {
  let states = model.state
  if (typeof mapStateToProps === 'function') {
    mapStateToProps(model.state)
  }

  let actions = model.reducer
  if (typeof mapActionToProps === 'function') {
    mapActionToProps(model.reducer)
  }
  return Comp => props => {
    return Comp({ ...props, ...states, ...actions, dispatch })
  }
}

function reducer(state, action) {
  if (model.reducer[action.type]) {
    const newState = model.reducer[action.type](state)
    console.log(newState)
    return newState
  }
  throw new Error()
}

export { connect }

const storeContext = React.createContext()

const StoreProvider = storeContext.Provider

export function Provider(props) {
  const [store, call] = useReducer(reducer, props.store || model.state)
  dispatch = call
  console.log(store)
  return <StoreProvider value={store}>{props.children}</StoreProvider>
}
