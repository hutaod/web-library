/**
 * 创建reducer
 * @param {Object} model
 */
export default function createReducers(model) {
  const { namespace, state, reducers } = model
  // 修改reducer键值
  Object.keys(reducers).forEach(reducerKey => {
    model.reducers[`${namespace}/${reducerKey}`] = reducers[reducerKey]
    delete model.reducers[reducerKey]
  })
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
