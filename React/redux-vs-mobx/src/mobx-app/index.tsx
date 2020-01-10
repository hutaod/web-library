import React from 'react'
import { Provider } from 'mobx-react'
import stores from './store'
import TodoListView from './TodoList'
import Counter from './Counter'

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

export default MobxApp
