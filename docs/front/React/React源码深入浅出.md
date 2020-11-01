# React 原理深入浅出

一般而已，框架的使用者关注的是 API 使用，而框架开发者关注的是框架的设计理念。而如果想学懂源码，我们需要转变这个关注点。

下面我们从三个方面来讲解 React 的原理。

- React 设计理念
- React 架构设计
- React 具体实现

## 前言

学习React的源码的目的在于：

- 对 React 的理解上升一个层次，在使用React相关技术栈会更加得心应手
- 巩固基础知识，React大量吸收了函数式编程中代数效应的思想，大量使用链表的数据结构，在调度模块使用了小顶堆这种数据结构，还能更深入的加深开发者对浏览器运行机制的理解以及闭包的使用等前端知识。
- 掌握学习源码的技巧

## React 设计理念

React 理念我们从主要从以下三点开进行讲解：

- 设计理念
- 架构演进史
- Fiber 架构

除了这三点，会介绍一下 React 源码的文件目录以及如何调试源码。

### 设计理念

我们从 [官方文档-react哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html) 官方文档中看到 `React` 的理念：

    我们认为，React 是用 JavaScript 构建快速响应的大型 Web 应用程序的首选方式。它在 Facebook 和 Instagram 上表现优秀。

这里我们重点关注 `快速响应`。

那是什么因素制约 `快速响应` 呢？可能是由于我们正在进行大量的计算，或者当前网络状况不佳，正在等待网络请求返回，换句话说，就是 `计算能力` 和 `网络延迟`这两个原因导致了我们的应用不能快速响应。其根本原因就是 `CPU` 的拼接 和 IO 的瓶颈。

那 React中 是怎么来解决这两个瓶颈问题呢？

主流的浏览器刷新频率为 `60Hz`。 也就是说， 每 `1000ms / 60Hz = 16.6ms` 浏览器刷新一次。

而在这 `16.6ms` 中，会依次执行：`JS脚本执行` 、 `样式布局` 、 `样式绘制` 。

如果JS脚本执行事件超过 `16.6ms`，那么这一帧就没有时间留给 `样式布局` 和 `样式绘制` ，浏览器就会掉帧，表现形式就是浏览器的滚动不流畅，在输入框输入的字符不能及时响应在页面上。下面我们来看一个demo: [concurrent mode的对比](https://codesandbox.io/s/concurrent-forked-u0ihp?file=/src/index.js) 。 

从demo中可以看出，异步更新时效果最好，基本不会掉帧，而React给出的答案也是 `将同步更新变为异步可中断更新` ： react和浏览器做了一个约定，浏览器将一帧中的剩余时间预留给React，React利用这部分预留时间来完成自己的工作。如果某一个工作的时间特别长，超出预留的时间，React会中断自己的工作，让出控制权，交回给浏览器，等待下一帧预留的时间到来时，React再继续之前被中断的工作。这样浏览器在每一帧都有时间进行 `样式布局` 和 `样式绘制` 。这样就减少了掉帧的可能性。

上面解决的是 CPU 的瓶颈，那React是怎么解决IO的瓶颈呢？比如一些需要等待数据请求结果才能进行响应的场景，用户如何才能感知到快速响应呢？ 我们看一下官方文档的一段话（[原文](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html#putting-research-into-production)）：

    将人机交互研究的结果整合到真实的 UI 中。

研究表明，在屏幕之间切换时显示过多的中间加载状态会使切换的速度`变慢`。

类似，我们从研究得知悬停和文本输入之类的交互需要在很短的时间内处理，而点击和页面转换可以等待稍长时间而不会感到迟缓。Concurrent 模式在内部使用不同的“优先级”，大致对应于人类感知研究中的交互类别。

专注于用户体验的团队有时会通过一次性解决方案来解决类似的问题。但这些解决方案一般难以维护，很少能长期存活。在React中使用 Concurrent 模式，就提供了这样的一套解决方案，让框架使用者不必再去寻找这样的解决方案。

总结：

- React设计理念核心：快速响应
- 制约瓶颈：CPU与IO
- 解决方法：异步可中断更新

### 架构演进史

React 架构的初衷就是践行 `快速响应` 这个设计理念，那老的React 架构为什么不能满足设计理念以至于被重构，以及 React16 是怎么满足设计理念的呢？

我们来看一下老的 React 架构

- `Reconciler` 协调器：决定本次更新渲染什么组件
- `Renderer` 渲染器：将组件渲染到视图中，React官方就提供了以下几个渲染器，分别再不同端或者不同场景使用
  - `ReactDOM` ： 浏览器，SSR
  - `ReactNative` ： 渲染APP原生组件
  - `ReactTest` ： 渲染JS对象 

协调器决定本次更新渲染什么组件，大名鼎鼎的 `Diff算法` 就发生在协调器中。

在 React 15 中， Reconciler 和 Renderer 是交替工作的，就是发现一个改变，就会直接更新，更新一个完后再进入 Reconciler。

再看一下新的 React 架构

- `Scheduler` 调度器：接收到更新，是否有其他`高优先级更新`需要先被调度？没有其他高优先级，则将`更新`交给 `协调器`
- `Reconciler` 协调器：接收到`更新`，创建`虚拟DOM`树，给需要更新的节点打上标记，将打了`标记`的虚拟DOM交给渲染器
- `Renderer` 渲染器：接收到通知，查看有哪些哪些被打了标记的`虚拟DOM`，执行`更新DOM`的操作。

后面我们在Fiber架构中来看React是怎么实现 `异步可中断更新` 。

### Fiber 架构

Sebastian Markbage 说： 

    我们在 React 中做的就是践行 `代数效应` 

代数效应与Fiber架构的关系：代数效应是函数式编程中的概念，用于将副作用从函数中分离，下面我们来看一个例子: [异步demo](https://codesandbox.io/s/cranky-waterfall-dh5qs)。



### 源码的文件目录

### 如何调试源码

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

本篇文章主要来源于 [React技术揭秘](https://react.iamkasong.com/)。

如果想完整实现一个简单的React，可以去看一下这一篇文章：[构建你自己的React](https://pomb.us/build-your-own-react/) ，原文是英文，我之前翻译了以下，发到了掘金，可以参考下 [[译] 构建你自己的React](https://juejin.im/post/6874246838124445703)