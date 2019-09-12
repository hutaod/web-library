# React 常见面试题

## 为什么选择使用框架而不是原生?

## 虚拟 DOM 的优劣如何?

优点：

- 保证性能下限：虚拟 DOM 可以经过 diff 算法找出最小差异，然后批量进行 patch，这种操作虽然比不上手动优化，但比起粗暴的 dom 操作性能要好很多，因此虚拟 DOM 可以保证性能下限
- 提高开发效率，无需手动操作 DOM：虚拟 DOM 的 diff 和 patch 都是在一次更新中自动进行的，我们无需手动操作 DOM，极大提高开发效率
- 跨平台：虚拟 DOM 本质上是 JS 对象，而 DOM 与平台强相关,相比之下虚拟 DOM 可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

缺点：

- 无法进行极致优化：在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化，比如 VScode 采用手动操作 DOM 的方式进行极端的性能优化

## 虚拟 DOM 实现原理?

- 虚拟 DOM 本质上就是 JS 对象，是对真实 DOM 的抽象
- 状态变更时，记录新树和旧树的差异
- 最后把差异更新到真实 dom 中

## 生命周期

初始化：
`constructor`
=>
`getDerivedStateFromProps(nextProps, nextState)`
=>
`render`
=>
`componentDidMount`

更新：

`getDerivedStateFromProps(nextProps, nextState)`

=>

`shouldCompoentUpdate(prevProps, prevState)`

=>

`render`

=>

`getShapshotBeforeUpdate(prevProps, prevState)`

=>

`componentDidUpdate(prevProps, prevState, shapshot)`

卸载：

`componentWillUnmount()`

## React 的请求应该放在哪一个生命周期

1. 一般情况下在 `componentDidMount` 中
2. 特殊性况下可以在 `constructor` 中，比如需要服务端渲染时

## setState 是异步还是同步？

1. `setState` 只在合成事件和钩子函数中是"异步"的，在原生事件和定时器中都是同步的
2. `setState` 其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果
3. `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新

参考：

[深入 setState 机制](https://github.com/sisterAn/blog/issues/26)

[React 官方描述](https://reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)

## setState 之后发生了什么？

## React 组件如何实现通信？

1. props
2. Context
3. Redux
4. Mobx
5. 自己添加发布订阅模式（需要自己去监听数据改变）
