import { observable, autorun, reaction } from 'mobx'

const todos = observable([
  {
    title: 'todo1',
    done: true,
  },
  {
    title: 'todo2',
    done: false,
  },
])

// reaction 的错误用法: 对 length 的变化作出反应, 而不是 title 的变化!
const reaction1 = reaction(
  () => todos.length,
  length => console.log('reaction 1:', todos.map(todo => todo.title).join(', '))
)

// reaction 的正确用法: 对 length 和 title 的变化作出反应
const reaction2 = reaction(
  () => todos.map(todo => todo.title),
  titles => console.log('reaction 2:', titles.join(', '))
)

// autorun 对它函数中使用的任何东西作出反应
const autorun1 = autorun(() =>
  console.log('autorun 1:', todos.map(todo => todo.title).join(', '))
)
console.log(autorun1, reaction1, reaction2)

todos.push({ title: 'todo3', done: false })
// 输出:
// reaction 1: todo1, todo2, todo3
// reaction 2: todo1, todo2, todo3
// autorun 1: todo1, todo2, todo3

todos[0].title = 'todo1 haha'
// 输出:
// reaction 2: todo1 haha, todo2, todo3
// autorun 1: todo1 haha, todo2, todo3
export default '123'
