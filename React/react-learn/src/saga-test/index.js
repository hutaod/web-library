import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import A from './A'

function SagaTest() {
  return (
    <Provider store={store}>
      <A />
    </Provider>
  )
}

export default SagaTest
