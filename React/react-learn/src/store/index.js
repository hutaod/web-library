import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
// import createSagaMiddleware from 'redux-saga'
import { counterReducer } from './counter'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 自定义中间件
function myLogger({ getState }) {
  // console.log(midApi) midApi的dispatch为增强
  // 返回真正的中间件执行函数 下面的dispatch增强了
  return dispatch => {
    return action => {
      console.log('logger')
      console.log(getState())
      // 执行中间件任务
      console.log(action.type + '执行了！！！')
      const nextAction = dispatch(action)
      console.log(getState())
      console.log(nextAction)
      // return dispatch(action)
      // 执行下一个中间件
      // return action
    }
  }
}

function userReducer(state = {}, action) {
  console.log('userReducer执行了')
  return state
}

const store = createStore(
  combineReducers({
    counter: counterReducer,
    user: userReducer
  }),
  composeEnhancers(applyMiddleware(myLogger, logger, thunk))
)

export default store
