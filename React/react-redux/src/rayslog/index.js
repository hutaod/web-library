import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import isPlainObject from './utils/isPlainObject'

let store
const rootReducers = {}
const rootEffects = {}

// 动态注入reducer
export const addReducer = (key, reducer, effects) => {
  if (!key || typeof key !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      throw Error('error')
    }
    return
  }
  if (!reducer || typeof reducer !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      throw Error('error')
    }
    return
  }
  if (rootReducers[key]) {
    throw Error('reducer has exist')
  }
  rootReducers[key] = reducer
  rootEffects[key] = effects

  if (store) {
    store.replaceReducer(combineReducers(rootReducers))
  }
}

/**
 *
 * @param {Object} options
 * {
 *  namespace, // model 命名空间
 *  state, 初始值
 *  reducers，唯一可以修改state的地方，由action触发
 *  effects，用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。
 * }
 */
export const model = ({ namespace, state, reducers, effects }) => {
  if (typeof namespace !== 'string' || namespace.trim().length === 0) {
    console.error('namespace not exist')
    return
  }
  if (typeof state !== 'undefined') {
    const reducer = function(prevState = state, action) {
      console.log(action.type)

      const typeArr = action.type.split('/')
      // 判断reducers是是符合要求的对象，并且判断action.type是否符合要求
      if (isPlainObject(reducers) && typeArr[0] === namespace) {
        const callFunc = reducers[typeArr[1]]

        if (typeof callFunc === 'function') {
          const nextState = callFunc(prevState, action)
          // 如果新的state是undefined就抛出对应错误
          if (typeof nextState === 'undefined') {
            throw new Error('return state error！')
          }
          return nextState
        }
      }
      return prevState
    }
    addReducer(namespace, reducer, effects)
  }
}

const rayslog = function({ initialState, initialModels, middlewares = [] }) {
  // 初始model
  if (isPlainObject(initialModels)) {
    for (const key in initialModels) {
      const initialModel = initialModels[key]
      if (isPlainObject(initialModel)) {
        model(initialModel)
      }
    }
  }

  const logger = (store) => (dispatch) => (action) => {
    console.log('disptach:', action)
    const nextAction = dispatch(action)
    console.log('finish:', action)
    return nextAction
  }

  const logger2 = (store) => (dispatch) => (action) => {
    console.log('disptach2:', action)
    const nextAction = dispatch(action)
    console.log('finish2:', action)
    return nextAction
  }

  const thunk = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, store)
    }
    return dispatch(action)
  }

  const effectsMiddle = (store) => (dispatch) => (action) => {
    if (isPlainObject(action) && typeof action.type === 'string') {
      const { type, ...args } = action
      const actionType = action.type.split('/')
      const namespace = actionType[0]
      const actualtype = actionType[1]
      if (rootEffects[namespace] && rootEffects[namespace][actualtype]) {
        return rootEffects[namespace][actualtype](
          {
            dispatch: ({ type, ...rest }) => {
              return dispatch({
                type: `${namespace}/${type}`,
                ...rest
              })
            }
          },
          { ...args }
        )
      }
      return dispatch(action)
    }
    return dispatch(action)
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // 创建store
  store = createStore(
    combineReducers(rootReducers),
    initialState,
    composeEnhancers(
      applyMiddleware(effectsMiddle, logger, thunk, logger2, ...middlewares)
    )
  )

  return {
    store,
    addReducer,
    getStore() {
      return store
    }
  }
}

export default rayslog
