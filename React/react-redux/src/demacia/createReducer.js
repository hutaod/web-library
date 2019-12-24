/**
 * 创建reducer
 * @param {Object} model
 */
export default function createReducers(model) {
  const { state, reducers } = model
  return function finalReducer(initialState = state, action) {
    const reduceFn = reducers[action.type]
    if (typeof reduceFn === 'function') {
      const nextState = reduceFn(initialState, action)
      // 如果新的state是undefined就抛出对应错误
      if (typeof nextState === 'undefined') {
        throw new Error('return state error！')
      }
      return nextState
    }
    return initialState
  }
}
