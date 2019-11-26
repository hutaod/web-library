import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import App from './App'
import reducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

console.log(ReactDOM)

const Content = () => {
  const [show, setShow] = useState(true)
  return (
    <div id="test-app">
      <Provider store={store}>{show ? <App /> : <div></div>}</Provider>
      <div onClick={() => setShow(!show)}>隐藏</div>
    </div>
  )
}

const vm = ReactDOM.render(
  <Content />,
  document.getElementById('root'),
  (...args) => {
    // 在所有组件挂载完成后触发，componentDidMount后
    console.log(22222, args)
  }
)

console.log('vm', vm) // 函数组件是为null
