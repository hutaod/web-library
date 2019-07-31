export function counterReducer(state = 0, action) {
  const num = action.payloa || 1
  console.log(1)
  switch (action.type) {
    case 'add':
      return state + num
    case 'minus':
      return state - num
    default:
      return state
  }
}

export const add = num => ({ type: 'add', payloa: num })
export const minus = num => ({ type: 'minus', payloa: num })
export const addAsync = num => dispatch => {
  setTimeout(() => {
    dispatch({ type: 'add', payloa: num })
  }, 1000)
}
