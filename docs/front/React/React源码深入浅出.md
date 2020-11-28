# React 原理深入浅出

一般而已，框架的使用者关注的是 API 使用，而框架开发者关注的是框架的设计理念。而如果想学懂源码，我们需要转变这个关注点。

下面我们从三个方面来讲解 React 的原理。

- React 设计理念
- React 架构设计
- React 具体实现

## 前言

学习 React 的源码的目的在于：

- 对 React 的理解上升一个层次，在使用 React 相关技术栈会更加得心应手
- 巩固基础知识，React 大量吸收了函数式编程中代数效应的思想，大量使用链表的数据结构，在调度模块使用了小顶堆这种数据结构，还能更深入的加深开发者对浏览器运行机制的理解以及闭包的使用等前端知识。
- 掌握学习源码的技巧

## React 设计理念

React 理念我们从主要从以下三点开进行讲解：

- 设计理念
- 架构演进史
- Fiber 架构

除了这三点，会介绍一下 React 源码的文件目录以及如何调试源码。

### 设计理念

我们从 [官方文档-react 哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html) 官方文档中看到 `React` 的理念：

> 我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。

这里我们重点关注 `快速响应`。

那是什么因素制约 `快速响应` 呢？可能是由于我们正在进行大量的计算，或者当前网络状况不佳，正在等待网络请求返回，换句话说，就是 `计算能力` 和 `网络延迟`这两个原因导致了我们的应用不能快速响应。其根本原因就是 `CPU` 的拼接 和 IO 的瓶颈。

那 React 中 是怎么来解决这两个瓶颈问题呢？

主流的浏览器刷新频率为 `60Hz`。 也就是说， 每 `1000ms / 60Hz = 16.6ms` 浏览器刷新一次。

而在这 `16.6ms` 中，会依次执行：`JS脚本执行` 、 `样式布局` 、 `样式绘制` 。

如果 JS 脚本执行事件超过 `16.6ms`，那么这一帧就没有时间留给 `样式布局` 和 `样式绘制` ，浏览器就会掉帧，表现形式就是浏览器的滚动不流畅，在输入框输入的字符不能及时响应在页面上。下面我们来看一个 demo: [concurrent mode 的对比](https://codesandbox.io/s/concurrent-forked-u0ihp?file=/src/index.js) 。

从 demo 中可以看出，异步更新时效果最好，基本不会掉帧，而 React 给出的答案也是 `将同步更新变为异步可中断更新` ： react 和浏览器做了一个约定，浏览器将一帧中的剩余时间预留给 React，React 利用这部分预留时间来完成自己的工作。如果某一个工作的时间特别长，超出预留的时间，React 会中断自己的工作，让出控制权，交回给浏览器，等待下一帧预留的时间到来时，React 再继续之前被中断的工作。这样浏览器在每一帧都有时间进行 `样式布局` 和 `样式绘制` 。这样就减少了掉帧的可能性。

上面解决的是 CPU 的瓶颈，那 React 是怎么解决 IO 的瓶颈呢？比如一些需要等待数据请求结果才能进行响应的场景，用户如何才能感知到快速响应呢？ 我们看一下官方文档的一段话（[原文](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html#putting-research-into-production)）：

> 将人机交互研究的结果整合到真实的 UI 中。

研究表明，在屏幕之间切换时显示过多的中间加载状态会使切换的速度`变慢`。

类似，我们从研究得知悬停和文本输入之类的交互需要在很短的时间内处理，而点击和页面转换可以等待稍长时间而不会感到迟缓。Concurrent 模式在内部使用不同的“优先级”，大致对应于人类感知研究中的交互类别。

专注于用户体验的团队有时会通过一次性解决方案来解决类似的问题。但这些解决方案一般难以维护，很少能长期存活。在 React 中使用 Concurrent 模式，就提供了这样的一套解决方案，让框架使用者不必再去寻找这样的解决方案。

总结：

- React 设计理念核心：快速响应
- 制约瓶颈：CPU 与 IO
- 解决方法：异步可中断更新

### 架构演进史

React 架构的初衷就是践行 `快速响应` 这个设计理念，那老的 React 架构为什么不能满足设计理念以至于被重构，以及 React16 是怎么满足设计理念的呢？

我们来看一下老的 React 架构

- `Reconciler` 协调器：决定本次更新渲染什么组件
- `Renderer` 渲染器：将组件渲染到视图中，React 官方就提供了以下几个渲染器，分别再不同端或者不同场景使用
  - `ReactDOM` ： 浏览器，SSR
  - `ReactNative` ： 渲染 APP 原生组件
  - `ReactTest` ： 渲染 JS 对象

协调器决定本次更新渲染什么组件，大名鼎鼎的 `Diff算法` 就发生在协调器中。

在 React 15 中， Reconciler 和 Renderer 是交替工作的，就是发现一个改变，就会直接更新，更新一个完后再进入 Reconciler。

再看一下新的 React 架构

- `Scheduler` 调度器：接收到更新，是否有其他`高优先级更新`需要先被调度？没有其他高优先级，则将`更新`交给 `协调器`
- `Reconciler` 协调器：接收到`更新`，创建`虚拟DOM`树，给需要更新的节点打上标记，将打了`标记`的虚拟 DOM 交给渲染器
- `Renderer` 渲染器：接收到通知，查看有哪些哪些被打了标记的`虚拟DOM`，执行`更新DOM`的操作。

后面我们在 Fiber 架构中来看 React 是怎么实现 `异步可中断更新` 。

### Fiber 架构

在学习 Fiber 架构之前，我们先讲 Fiber 架构的理念。

#### Fiber架构的理念-心智模型

Sebastian Markbage 说：
  
> 我们在 React 中做的就是践行 `代数效应`

那什么是 `代数效应` , 它与 Fiber 架构的有什么关系呢？

一、什么是代数效应？

> `代数效应` 是函数式编程中的概念，用于将副作用从函数中分离

接下来，我们用虚构的语法进行解释。

假设我们有一个函数 `getTotalPicNum` ，传入 2 个 `用户名称` 后，分别查找该用户在平台保存的图片数量，最后将图片数量相加后返回。

```js
function getTotalPicNum (user1, user2) {
  const num1 = getPicNum(user1)
  const num2 = getPicNum(user2)

  return picNum1 + picNum2
}
```

在`getTotalPicNum`中，我们不关注`getPicNum`的实现，只在乎“获取到两个数字后将他们相加的结果返回”这一过程。

接下来我们来实现`getPicNum`。

"用户在平台保存的图片数量"是保存在服务器中的。所以，为了获取该值，我们需要发起异步请求。

为了尽量保持`getTotalPicNum`的调用方式不变，我们首先想到了使用`async await`：

```js
async function getTotalPicNum (user1, user2) {
  const num1 = await getPicNum(user1)
  const num2 = await getPicNum(user2)

  return picNum1 + picNum2
}
```

但是，`async await`是有`传染性`的 —— 当一个函数变为`async`后，这意味着调用他的函数也需要是`async`，这破坏了`getTotalPicNum`的同步特性。

有没有什么办法能保持`getTotalPicNum`保持现有调用方式不变的情况下实现异步请求呢？

没有。不过我们可以`虚构`一个。

我们虚构一个类似 `try...catch` 的语法 —— `try...handle`与两个操作符`perform`、`resume`。

```js
function getPicNum(name) {
  const picNum = perform name;
  return picNum;
}

try {
  getTotalPicNum('zhangSan', 'liSi');
} handle (who) {
  switch (who) {
    case 'zhangSan':
      resume with 230;
    case 'liSi':
      resume with 122;
    default:
      resume with 0;
  }
}
```

当执行到`getTotalPicNum`内部的`getPicNum`方法时，会执行`perform name`。

此时函数调用栈会从`getPicNum`方法内跳出，被最近一个`try...handle`捕获。类似`throw Error`后被最近一个`try...catch`捕获。

类似`throw Error`后`Error`会作为`catch`的参数，`perform name`后`name`会作为`handle`的参数。

与`try...catch`最大的不同在于：当`Error`被`catch`捕获后，之前的调用栈就销毁了。而`handle`执行`resume`后会回到之前`perform`的调用栈。

对于`case 'zhangSan'`，执行完`resume with 230;`后调用栈会回到`getPicNum`，此时`picNum === 230`

::: warning 注意

再次申明， `try...handle` 的语法是虚构的，只是为了演示 `代数效应` 的思想。

:::

总结一下：`代数效应` 能够将 `副作用` （例子中为 `请求图片数量` ）从函数逻辑中分离，使函数关注点保持纯粹。

并且，从例子中可以看出， `perform resume` 不需要区分同步异步。

二、代数效应在 React 中的应用

那么 `代数效应` 与 `React` 有什么关系呢？最明显的例子就是 `Hooks`。

对于类似 `useState` 、 `useReducer` 、 `useRef` 这样的 `Hook` ，我们不需要关注 `FunctionComponent` 的 `state` 在 `Hook` 中是如何保存的，`React` 会为我们处理。

我们只需要假设 `useState` 返回的是我们想要的 `state` ，并编写业务逻辑就行。

```js
function App () {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count => count + 1)}>{count}</button>
}
```

如果这个例子还不够明显，可以看看官方的[Suspense Demo](https://codesandbox.io/s/frosty-hermann-bztrp?file=/src/index.js:152-160)

在 `Demo` 中 `ProfileDetails` 用于展示 `用户名称` 。而 `用户名称` 是 `异步请求` 的。

但是 `Demo` 中完全是`同步`的写法。

```js
function ProfileDetails () {
  const user = resource.user.read()
  return <h1>{user.name}</h1>
}
```

三、代数效应与Generator

从`React15`到`React16`，协调器（`Reconciler`）重构的一大目的是：将老的`同步更新`的架构变为`异步可中断更新`。

`异步可中断更新`可以理解为：`更新`在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

这就是`代数效应`中`try...handle`的作用。

其实，浏览器原生就支持类似的实现，这就是`Generator`。

但是`Generator`的一些缺陷使`React`团队放弃了他：

- 类似`async`，`Generator`也是`传染性`的，使用了`Generator`则上下文的其他函数也需要作出改变。这样心智负担比较重。

- `Generator`执行的`中间状态`是上下文关联的。

考虑如下例子：

```js
function* doWork(A, B, C) {
  var x = doExpensiveWorkA(A);
  yield;
  var y = x + doExpensiveWorkB(B);
  yield;
  var z = y + doExpensiveWorkC(C);
  return z;
}
```

每当浏览器有空闲时间都会依次执行其中一个`doExpensiveWork`，当时间用尽则会中断，当再次恢复时会从中断位置继续执行。

只考虑“单一优先级任务的中断与继续”情况下`Generator`可以很好的实现`异步可中断更新`。

但是当我们考虑“高优先级任务插队”的情况，如果此时已经完成`doExpensiveWorkA`与`doExpensiveWorkB`计算出`x`与`y`。

此时`B`组件接收到一个`高优更新`，由于`Generator`执行的`中间状态`是上下文关联的，所以计算`y`时无法复用之前已经计算出的`x`，需要重新计算。

如果通过`全局变量`保存之前执行的`中间状态`，又会引入新的复杂度。

> 更详细的解释可以参考[这个issue](https://github.com/facebook/react/issues/7942#issuecomment-254987818)

基于这些原因，`React`没有采用`Generator`实现`协调器`。

四、代数效应与Fiber

`Fiber`并不是计算机术语中的新名词，他的中文翻译叫做`纤程`，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将`纤程`理解为`协程`的一种实现。在`JS`中，`协程`的实现便是`Generator`。

所以，我们可以将`纤程`(Fiber)、`协程`(Generator)理解为`代数效应`思想在`JS`中的体现。

`React Fiber`可以理解为：

`React`内部实现的一套状态更新机制。支持任务不同`优先级`，可中断与恢复，并且恢复后可以复用之前的`中间状态`。

其中每个任务更新单元为`React Element`对应的`Fiber节点`。

#### Fiber架构的实现原理

Fiber的起源：

> 最早的`Fiber`官方解释来源于[2016年React团队成员Acdlite的一篇介绍](https://github.com/acdlite/react-fiber-architecture)。[查看译文](https://www.jianshu.com/p/48c3f3b0125c)

从前面的学习我们知道：

在`React15`及以前，`Reconciler`采用递归的方式创建虚拟DOM，递归过程是不能中断的。如果组件树的层级很深，递归会占用线程很多时间，造成卡顿。

为了解决这个问题，`React16`将**递归的无法中断的更新**重构为**异步的可中断更新**，由于曾经用于递归的**虚拟DOM**数据结构已经无法满足需要。于是，全新的`Fiber`架构应运而生。

Fiber的含义：

`Fiber`包含三层含义：

1. 作为架构来说，之前`React15`的`Reconciler`采用递归的方式执行，数据保存在递归调用栈中，所以被称为`stack Reconciler`。`React16`的`Reconciler`基于`Fiber节点`实现，被称为`Fiber Reconciler`。

2. 作为静态的数据结构来说，每个`Fiber节点`对应一个`React element`，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。这时的Fiber节点就是我们所说的虚拟 DOM

3. 作为动态的工作单元来说，每个`Fiber节点`保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

Fiber的结构：

你可以从这里看到[Fiber节点的属性定义](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiber.new.js#L117)。虽然属性很多，但我们可以按三层含义将他们分类来看

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
) {
  // 作为静态数据结构的属性
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // 用于连接其他Fiber节点形成Fiber树
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  // 作为动态的工作单元的属性
  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  // 调度优先级相关
  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  // 指向该fiber在另一次更新时对应的fiber
  this.alternate = null;
}
```

作为架构来说：

每个Fiber节点有个对应的`React element`，多个`Fiber节点`是如何连接形成树呢？靠如下三个属性：

```js
// 指向父级Fiber节点
this.return = null;
// 指向子Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

举个例子，如下的组件结构：

```js
function App() {
	const [count, addCount] = useState(0)
  return (
    <div onClick={() => addCount(count + 1)}>
      XiaoMing
      {count}
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementId("root"))
```

对应的`Fiber树`结构：
<img :src="$withBase('/img/fiber.png')" alt="Fiber架构">

> 这里需要提一下，为什么父级指针叫做`return`而不是`parent`或者`father`呢？因为作为一个工作单元，`return`指节点执行完`completeWork`（本章后面会介绍）后会返回的下一个节点。子`Fiber节点`及其兄弟节点完成工作后会返回其父级节点，所以用`return`指代父级节点。

作为静态的数据结构：

作为一种静态的数据结构，保存了组件相关的信息：

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag;
// key属性
this.key = key;
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null;
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null;
// Fiber对应的真实DOM节点
this.stateNode = null;
```

作为动态的工作单元：

作为动态的工作单元，`Fiber`中如下参数保存了本次更新相关的信息，我们会在后续的更新流程中使用到具体属性时再详细介绍

```js

// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps;
this.memoizedProps = null;
this.updateQueue = null;
this.memoizedState = null;
this.dependencies = null;

this.mode = mode;

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect;
this.nextEffect = null;

this.firstEffect = null;
this.lastEffect = null;
```

如下两个字段保存调度优先级相关的信息，会在讲解`Scheduler`时介绍。

```js
// 调度优先级相关
this.lanes = NoLanes;
this.childLanes = NoLanes;
```

::: warning 注意
在2020年5月，调度优先级策略经历了比较大的重构。以`expirationTime`属性为代表的优先级模型被`lane`取代。详见[这个PR](https://github.com/facebook/react/pull/18796)

如果你的源码中`fiber.expirationTime`仍存在，请参照[调试源码](../preparation/source.html)章节获取最新代码。
:::

##### 总结

本节我们了解了`Fiber`的起源与架构，其中`Fiber节点`可以构成`Fiber树`。那么`Fiber树`和页面呈现的`DOM树`有什么关系，`React`又是如何更新`DOM`的呢？

我们会在下一节讲解。

## React 架构设计

React 架构我们从以下以下点开进行讲解：

- render 阶段
- commit 阶段

### render 阶段

render 阶段负责决定当前有哪些组件需要更新。这里会深入理解 JSX，并将 render 阶段划分为『递』与『归』两个字阶段进行分别讲解。

- 深入理解 JSX
- 『递』与『归』的两个阶段

### commit 阶段

commit 阶段将需要渲染的组件更新到视图中，我们会划分为以下三个子阶段进行讲解：

- before mutation 阶段
- mutation 阶段
- layout 阶段

## React 具体实现

React 具体实现细节主要讲解以下核心实现：

- Diff 算法
- 状态更新
- 生命周期
- Hooks
- 异步调度

### Diff 算法

- Diff 算法的局限与解决方法
- 单一节点的 Diff 的实现
- 多节点 Diff 的实现

### 状态更新

- Update 与 UpdateQueue 的关系和其数据结构
- Update 的优先级机制
- React.render 的执行流程
- this.setState 的执行流程

### 生命周期

- 介绍 UNSAFE_componentWillXXX 钩子以及对应的替代方案
- componentDidXXX 钩子
- shouldComponentUpdate 与性能优化

### Hooks

- 实现简单版的 useState
- useState 与 useReducer 的实现
- useEffect 与 useLayoutEffect 的实现
- useMemo 与 useCallback 的实现
- useRef 的实现

### 异步调度

- Scheduler 的实现
- lane 模型
- 更新的中断/继续/重置
- 如果通过 useTransition 参数不同优先级的更新

## 最后

本篇文章主要来源于 [React 技术揭秘](https://react.iamkasong.com/)。

如果想完整实现一个简单的 React，可以去看一下这一篇文章：[构建你自己的 React](https://pomb.us/build-your-own-react/) ，原文是英文，我之前翻译了以下，发到了掘金，可以参考下 [[译] 构建你自己的 React](https://juejin.im/post/6874246838124445703)
