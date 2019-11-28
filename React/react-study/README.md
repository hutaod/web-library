# React 学习笔记

## React 基础

### React 概念

React 把用户界面抽象成一个组件，有了这层抽象，React 把代码和真实渲染目标隔离开来

#### 专注视图层

#### `Virtual DOM` 也可叫抽象语法树

`React` 把真实 `DOM` 树转换成 `JavaScript` 对象树

优点：

- 简化 `dom` 操作 通过数据驱动来进行 `dom` 操作，即：每次数据更新后，重新计算 `Virtual DOM`，并和上一次生成的 `Virtual DOM` 做对比，对发生变化部分做更新。
- 方便与其他平台集成。比如 `react-native` 就是基于 `Virtual DOM` 渲染出原生控件

#### 函数式编程

如果说人脑最擅长的是分析问题，那么电脑最擅长的就是执行命令，电脑只需要几条汇编指令就可以轻松算出我们需要很长时间才能解出的运算。命令式编程就像是给电脑下命令。而函数式编程，对应的是声明式编程，它是人类模仿自己思维逻辑方式发明出来的。声明式编程的本质是 `lambda` 演算。试想当我们操作数组的每个元素都返回一个新数组时，如果是计算机的思考方式，则需要一个新数组，然后遍历原数组，并计算赋值;如果是人的思考方式，则是构建一个规则，这个过程就变成构建一个 `f` 函数作用在数组上，然后返回新数组。这样，计算可以被重复利用。

`React` 就是把过去不断重复构建 `UI` 的过程抽象成了组件，并在给定参数的情况下约定对应的 `UI` 界面。`React` 能充分利用很多函数式方法去减少冗余代码。此外，由于它本身是简单函数，所以易于测试。可以说，函数式编程才是 `React` 的精髓。

### JSX 语法

`JSX` 与 `React` 之间的关系：`React` 为方便 `View` 层组件化，承载了构建 `HTML` 结构化页面的职责，而 `Jsx` 就是 `React` 创建虚拟元素的语法糖。虚拟元素可分为 `DOM 元素`（DOM element）和`组件元素`（component element）。

- `DOM 元素`: 首字母小写
- `组件元素`: 首字母大写，支持命名空间的方式使用组件

### React 组件

`React` 组件基本上由三部分组成：

- 属性(`props`)
- 状态(`state`)
- 生命周期

#### React 组件与 Web Components

从 React 组件来看，它与 `Web Components` 传达的理念是一致的，但两者的实现方式不同：

- `React` 自定义元素是库自己构建的，与 `Web Components` 规范不通用
- `React` 渲染过程包含了模板概念，即 JSX
- `React` 组件的实现均在方法和类中，因此可以做到相互隔离，但不包括样式
- `React` 引用方式遵循 ES6 modules 标准

#### React 组件的构建方法

- `Class Component`
- `Function Component`

### React 数据流

在 React 中，数据是自顶向下单向流动的，即从父组件到子组件。这条原则让组件之间的关系变得简单且可预测。

state 与 props 是 React 组件中最重要得概念。如果顶层组件初始化 props，那么 React 会向下遍历整棵组件树，重新尝试渲染所有相关得子组件。而 state 只关心每个组件自己内部的状态，这些状态只能在组件内部改变。把组件看成一个函数，那么它接受了 props 作为参数，内部由 state 作为函数的内部参数，返回一个 Virtual DOM 的实现。

#### state

组件内部状态，需要用 `setState` 进行改变内部状态，也只建议这样做。

#### props

props 是 React 中另外一个重要的概念，它是 properties 的缩写。props 是 React 用来让组件之间相互联系的一种机制，通俗地说就像方法的参数一样。

### React 生命周期

React 组件的生命周期根据广义定义描述，可以分为挂载、渲染和卸载这几个阶段。当渲染后的组件需要更新时，我们会重新去渲染组件，直至卸载。
因此，我们可以把 React 生命周期分为两类：

- 当组件在挂载或卸载时
- 当组件接收新的数据时，即组件更新时

挂载时生命周期顺序：

1. `constructor` 父组件先执行
2. `getDerivedStateFromProps` 父组件先执行
3. `render` 父组件先执行
4. `componentDidMount` 子组件先执行

更新时：

1. `getDerivedStateFromProps`
2. `shouldComponentUpdate`: state 或者 props 改变时会触发，但如果用 forceUpdate 强制刷新会跳过改步骤
3. `render`
4. `getSnapshotBeforeUpdate`
5. `componentDidUpdate`

卸载：

1. `componentWillUnmount` 父组件先执行

### React 与 DOM

#### ReactDOM 中常用的方法

1. `findDOMNode` 当组件被渲染到 DOM 后，`findDOMNode` 返回该组件实例相应的 DOM 节点

```js
// this 为当前组件的实例
const dom = ReactDOM.findDOMNode(this)
```

如果 `render` 中返回 `null`，那么 `findDOMNode` 也返回 `null`

2 `render` 有三个参数

- `ReactElement element`
- `DOMElement container`
- `[function callback]`

```js
ReactDOM.render(<App />, document.getElementById('root'), (...args) => {
  // 在所有组件挂载完成后触发，componentDidMount后
  console.log('所有组件挂载完成', args)
})
```

该方法把元素挂载到 `container` 下，并返回 `element` 的实例(即用`ref`引用)。当然，如果是函数组件，`render`会返回 `null`，在组件装载完成后，`callback` 就会被调用。

当组件初次渲染后再次更新时，`React` 不会把整个组件重新渲染一次，而会用它高效的 `DOM diff` 算法做局部的更新

3. `hydrate`
4. `createPortal`
5. `flushSync`
6. `unmountComponentAtNode`

#### ReactDOM 的不稳定方法

## React 其他知识点

### 事件系统

- React 基于 Virtual DOM 实现了一个 SyntheticEvent（合成事件）层
- 事件委派：它并不会把事件处理函数直接绑定到真实节点上，而是把所有事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象；当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做简化了事件处理和回收机制，效率也有很大的提升。
