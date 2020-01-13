import React, { Component } from 'react'
import { observable, action, autorun } from 'mobx'
import { Provider, inject } from 'mobx-react'
import { Button, Input, List } from 'antd'

var a = observable.box()

autorun(() => {
  console.log(a.get())
})

setTimeout(() => {
  a.set(11)
}, 1000)

type TTodo = {
  id: number
  title: string
}
// state
class TodoListState {
  @observable todos: Array<TTodo> = []
  @action init = () => {
    this.todos = [{ id: Math.random(), title: 'web前端' }]
  }
  @action addTodo = (todo: TTodo) => {
    this.todos.push(todo)
  }
}

const store = new TodoListState()

type TProps = {
  todos?: Array<TTodo>
  init?: Function
  addTodo?: Function
}

@inject((stores: any) => {
  return {
    todos: stores.store.todos,
    init: stores.store.init,
    addTodo: stores.store.addTodo
  }
})
class TodoList extends Component<TProps> {
  state = {
    inputVal: ''
  }
  componentDidMount() {
    this.props.init!()
  }
  render() {
    const { todos, addTodo } = this.props

    return (
      <div>
        <h2>todolist</h2>
        <div>
          <Input
            style={{ width: 200 }}
            value={this.state.inputVal}
            onChange={e => {
              this.setState({ inputVal: e.target.value })
            }}
          />
          <Button
            onClick={() => {
              addTodo!({
                id: Math.random(),
                title: this.state.inputVal
              })
              this.setState({
                inputVal: ''
              })
            }}
          >
            Add
          </Button>
        </div>
        <List
          header={<div>TodoList</div>}
          bordered
          dataSource={todos}
          renderItem={item => <List.Item key={item.id}>{item.title}</List.Item>}
        />
      </div>
    )
  }
}

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <div>MobxApp</div>
      <TodoList />
    </Provider>
  )
}

export default ReduxApp
