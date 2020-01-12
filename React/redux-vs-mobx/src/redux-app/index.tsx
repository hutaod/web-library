import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { Button, Input, List } from 'antd'

type TTodo = {
  id: number
  title: string
}

type TInitState = {
  todos: Array<TTodo>
}

const initState: TInitState = {
  todos: [],
}

type TAction = {
  type: string
  payload?: any
}

function reducer(state = initState, action: TAction) {
  switch (action.type) {
    case 'init':
      return { todos: action.payload || [] }
    case 'add':
      return { todos: [...state.todos, action.payload] }
    default:
      return state
  }
}

const store = createStore(reducer)

type TProps = {
  todos: Array<TTodo>
  dispatch: Function
}

class TodoList extends Component<TProps> {
  state = {
    inputVal: '',
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'init',
      payload: [{ id: Math.random(), title: 'web前端' }],
    })
  }
  render() {
    const { todos, dispatch } = this.props

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
              dispatch({
                type: 'add',
                payload: {
                  id: Math.random(),
                  title: this.state.inputVal,
                },
              })
              this.setState({
                inputVal: '',
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

const TodoListView = connect((state: TInitState) => {
  return {
    todos: state.todos,
  }
})(TodoList)

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <div>ReduxApp</div>
      <TodoListView />
    </Provider>
  )
}

export default ReduxApp
