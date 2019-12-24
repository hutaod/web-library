import React, { forwardRef } from 'react'
// import hoistNonReactStatic from 'hoist-non-react-statics'
import isNode from 'detect-node'
// import { compose } from 'redux'
// import { connect } from 'react-redux'
import checkModel from './utils/checkModel'
import createReducer from './createReducer'
import { injectReducer, injectEffects, allModels } from './store'

/**
 *
 * @param {Object} model
 * {
 *  namespace, // model 命名空间
 *  state, 初始值
 *  reducers，唯一可以修改state的地方，由action触发
 *  effects，用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。
 * }
 */
export default function model(model) {
  if (!isNode) {
    checkModel(model, allModels)
  }
  const { namespace, state, reducers, effects } = model
  if (typeof state !== 'undefined') {
    if (reducers) {
      // 修改reducer键值
      Object.keys(reducers).forEach((reducerKey) => {
        model.reducers[`${namespace}/${reducerKey}`] = reducers[reducerKey]
        delete model.reducers[reducerKey]
      })
      const reducer = createReducer(model)
      injectReducer(namespace, reducer)
    }
    if (effects) {
      injectEffects(namespace, effects)
    }
  }
  return (Comp) => {
    function ModelHoc(props, ref) {
      return <Comp {...props} ref={ref} />
    }
    // hoistNonReactStatic(ModelHoc, Comp)
    return forwardRef(ModelHoc)
  }
}
