import React from 'react'
import { Provider } from 'mobx-react'
import stores from './store'
import TodoListView from './TodoList'
import Counter from './Counter'
import demo1 from './demo/demo1'
import demo2 from './demo/demo2'
import demo3 from './demo/demo3'
import demo4 from './demo/demo4'

const MobxApp = () => {
  return (
    <Provider {...stores}>
      <div>
        <h1>MobxApp</h1>
        <TodoListView></TodoListView>
        <Counter />
      </div>
    </Provider>
  )
}

const MobxDemoApp = () => {
  return (
    <div>
      {/* <div>{demo1}</div> */}
      <div>{demo2}</div>
      {demo3}
      {demo4}
    </div>
  )
}

export default MobxDemoApp
