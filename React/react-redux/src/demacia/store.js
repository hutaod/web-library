import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import isNode from 'detect-node'
import isPlainObject from './utils/isPlainObject'
import checkModel from './utils/checkModel'
import createReducer from './createReducer'

let store = null
const allReducer = {}
const allEffects = {}
export const allModels = {}

/**
 * 动态注入reducer
 * @param {String} namespace
 * @param {Function} reducer
 */
export function injectReducer(namespace, reducer) {
  if (!namespace || typeof namespace !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      throw Error('error')
    }
    return
  }
  if (!reducer || typeof reducer !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      throw Error('reducer must be a function')
    }
    return
  }
  allReducer[namespace] = reducer
  if (store) {
    store.replaceReducer(combineReducers(allReducer))
  }
}

/**
 * 动态注入effects
 * @param {String} namespace
 * @param {Function} effects
 */
export function injectEffects(namespace, effects) {
  console.log('effects', effects)

  if (!namespace || typeof namespace !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      throw Error('error')
    }
    return
  }
  if (!effects || typeof effects !== 'object' || Array.isArray(effects)) {
    if (process.env.NODE_ENV !== 'production') {
      throw Error('effects must be a object')
    }
    return
  }
  allEffects[namespace] = effects
  console.log(allEffects)
}

function createEffectsMiddle(effectsExtraArgument) {
  return (store) => (dispatch) => (action) => {
    if (isPlainObject(action) && typeof action.type === 'string') {
      const { type, ...args } = action
      const actionType = action.type.split('/')
      const namespace = actionType[0]
      const actualtype = actionType[1]

      if (allEffects[namespace] && allEffects[namespace][actualtype]) {
        return allEffects[namespace][actualtype](
          {
            dispatch: ({ type, ...rest }) => {
              console.log(`${namespace}/${type}`)

              return dispatch({
                type: `${namespace}/${type}`,
                ...rest,
              })
            },
            ...effectsExtraArgument,
          },
          { ...args }
        )
      }
      return dispatch(action)
    }
    return dispatch(action)
  }
}

function demacia({
  initialState,
  initialModels,
  middlewares = [],
  effectsExtraArgument = {},
}) {
  // 初始model
  if (isPlainObject(initialModels)) {
    for (const key in initialModels) {
      const initialModel = initialModels[key]
      if (isPlainObject(initialModel)) {
        if (!isNode) {
          checkModel(initialModel, allModels)
        }
        const { namespace, state, reducers, effects } = initialModel
        if (typeof state !== 'undefined') {
          if (reducers) {
            // 修改reducer键值
            Object.keys(reducers).forEach((reducerKey) => {
              initialModel.reducers[`${namespace}/${reducerKey}`] =
                reducers[reducerKey]
              delete initialModel.reducers[reducerKey]
            })
            const reducer = createReducer(initialModel)
            injectReducer(namespace, reducer)
          }
          if (effects) {
            injectEffects(namespace, effects)
          }
        }
      }
    }
  }

  // effects处理的中间件
  const effectsMiddle = createEffectsMiddle(effectsExtraArgument)

  let composeEnhancers = compose
  if (!isNode) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }
  // 创建store
  store = createStore(
    combineReducers(allReducer),
    initialState,
    composeEnhancers(applyMiddleware(effectsMiddle, ...middlewares))
  )

  return store
}

export default demacia

export function getStore() {
  return store
}
