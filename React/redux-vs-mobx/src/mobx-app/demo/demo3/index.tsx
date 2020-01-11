import React, { Component } from 'react'
import { observable, autorun, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Checkbox, Button } from 'antd'

type todo = {
  id: number
  title: string
  checked: boolean
}

type TypeTodos = Array<todo>

class AppState {
  @observable todos: TypeTodos = [
    { id: Math.random(), title: 'haha', checked: false },
  ]
  @computed get toDoLength() {
    return this.todos.length
  }
}

const appState = new AppState()

autorun(() => {
  console.log('todos.length', appState.todos.length)
})

autorun(() => {
  console.log('toDoLength', appState.toDoLength)
})

// appState.todos.push({ id: Math.random(), title: 'haha-1', checked: false })
// appState.todos[1] = {
//   id: Math.random(),
//   title: 'haha-1-replace',
//   checked: false,
// }
// // 输出如下：
// // 'todos.length' 2
// // 'toDoLength' 2
// // 'todos.length' 2
type IProps = {
  appState: {
    todos: TypeTodos
    toDoLength: number
  }
}

@observer
class Demo1 extends Component<IProps> {
  render() {
    const { appState } = this.props
    const { todos } = appState
    return (
      <div>
        <h2>Todo List</h2>
        <Button
          onClick={() => {
            appState.todos.push({
              id: Math.random(),
              title: 'todo-add',
              checked: false,
            })
          }}
        >
          Add
        </Button>
        <Button
          onClick={() => {
            appState.todos[0] = {
              id: Math.random(),
              title: 'todo-replace',
              checked: false,
            }
          }}
        >
          Replace
        </Button>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <Checkbox
                checked={todo.checked}
                onChange={() => {
                  todo.checked = !todo.checked
                }}
              >
                {todo.title}
              </Checkbox>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default <Demo1 appState={appState} />
