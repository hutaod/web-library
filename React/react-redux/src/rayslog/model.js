import isPlainObject from './utils/isPlainObject'
import { addReducer } from './index'

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
export default function modal({ namespace, state, reducers, effects }) {
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
