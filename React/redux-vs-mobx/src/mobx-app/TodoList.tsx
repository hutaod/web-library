import React from 'react'
import { Button, Checkbox } from 'antd'
import { observer } from 'mobx-react'
import { observable, computed, autorun } from 'mobx'

class Todo {
  id = Math.random()
  @observable title = ''
  @observable finished = false
  constructor({ title }: { title: string }) {
    this.title = title
    this.finished = false
  }
}

class TodoList {
  @observable todos: Array<Todo> = []
  @computed get unfinishedTodoCount() {
    // console.log(this.todos)

    return this.todos.filter(todo => !todo.finished).length
  }
}

const store = new TodoList()

// autorun(function() {
//   console.log(2)
//   console.log('Completed %d of %d items', store.unfinishedTodoCount)
// })

// setTimeout(() => {
//   console.log(1)
//   store.todos.push(
//     new Todo({ title: 'todo' }),
//     new Todo({ title: '"Write simpler code"' })
//   )
//   console.log(3)
//   store.todos[0].finished = true
// }, 2000)

type IProps = {
  todoList: TodoList
}

const TodoListView = observer((props: IProps) => {
  const { todoList } = props
  // console.log(todoList)

  return (
    <div>
      <Button
        onClick={() => {
          store.todos.push(
            new Todo({ title: 'todo' }),
            new Todo({ title: '"Write simpler code"' })
          )
          store.todos[0].finished = true
        }}
      >
        Add
      </Button>
      <ul>
        {todoList.todos.map(todo => (
          <li key={todo.id}>
            <Checkbox
              checked={todo.finished}
              onChange={() => {
                todo.finished = !todo.finished
              }}
            >
              {todo.title}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default () => {
  return <TodoListView todoList={store} />
}
