import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSageMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { helloSaga } from './sagas'
import globalReducer from './globalReducer'
// 1.创建saga中间件并注册
const sagaMiddleware = createSageMiddleware()

const store = createStore(
  combineReducers({
    globalReducer
  }),
  applyMiddleware(logger, sagaMiddleware)
)
// 2.中间件运行saga
sagaMiddleware.run(helloSaga)
export default store
