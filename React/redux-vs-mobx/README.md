# Redux Vs Mobx

对比Redux和Mobx

## 前言
当我们使用React开发web应用程序时，在React组件内，可以使用this.setState()和this.state处理或访问组件内状态，但是随着项目变大，状态变复杂，通常需要考虑组件间通信问题，主要包括以下两点：

某一个状态需要在多个组件间共享（访问，更新）；
某组件内交互需要触发其他组件的状态更新；

关于这些问题，React组件开发实践推荐将公用组件状态提升：

  通常多组件需要处理同一状态，我们推荐将共享状态提升至他们的共同最近祖先组件内。

当项目越发复杂时，我们发现仅仅是提升状态已经无法适应如此复杂的状态管理了，程序状态变得比较难同步，操作，到处是回调，发布，订阅，这意味着我们需要更好的状态管理方式，于是就引入了状态管理库，如`Redux`，`Mobx`等。

## 状态管理
状态管理库，无论是Redux，还是Mobx这些，其本质都是为了解决状态管理混乱，无法有效同步的问题，它们都支持：

统一维护管理应用状态；
某一状态只有一个可信数据来源（通常命名为store，指状态容器）；
操作更新状态方式统一，并且可控（通常以action方式提供更新状态的途径）；
支持将store与React组件连接，如`react-redux`，`mobx-react`；通常使用状态管理库后，我们将React组件从业务上划分为两类：

容器组件（Container Components）：负责处理具体业务和状态数据，将业务或状态处理函数传入展示型组件；
展示型组件（Presentation Components）：负责展示视图，视图交互回调内调用传入的处理函数；

## Redux Vs Mobx

目前来看，Redux已是React应用状态管理库中的霸主了，而Mobx则是一方诸侯，我们为什么要选择Mobx，而不是继续沿用Redux呢，那就需要比较他们的异同了。
Mobx和Redux都是JavaScript应用状态管理库，都适用于React，Angular，VueJs等框架或库，而不是局限于某一特定UI库。

### Redux

要介绍Redux，我们就不得不谈到Flux了

  Flux是Facebook用来开发客户端-服务端web应用程序的应用架构，它更多是一种架构模式，而非一个特定框架。

而Redux更多的是遵循Flux模式的一种实现，是一个JavaScript库，它关注点主要是以下几方面：
- Action：一个JavaScript对象，描述动作相关信息，主要包含type属性和payload属性：
  - type：action 类型；
  - payload：负载数据；
- Reducer：定义应用状态如何响应不同动作（action），如何更新状态；
- Store：管理action和reducer及其关系的对象，主要提供以下功能：
  - 维护应用状态并支持访问状态（getState()）；
  - 支持监听action的分发，更新状态（dispatch(action)）；
  - 支持订阅store的变更（subscribe(listener)）；
- 异步流：由于Redux所有对store状态的变更，都应该通过action触发，异步任务（通常都是业务或获取数据任务）也不例外，而为了不将业务或数据相关的任务混入React组件中，就需要使用其他框架配合管理异步任务流程，如`redux-thunk`，`redux-saga`等；

### Mobx

Mobx是一个透明函数响应式编程（Transparently Functional Reactive Programming，TFRP）的状态管理库，它使得状态管理简单可伸缩：

  Anything that can be derived from the application state, should be derived. Automatically.
  任何起源于应用状态的数据应该自动获取。

它关注点主要是以下几方面：
- Action：定义改变状态的动作函数，包括如何变更状态；
- Store：集中管理模块状态（State）和动作（action）；
- Derivation（衍生）：从应用状态中派生而出，且没有任何其他影响的数据，我们称为derivation（衍生），衍生在以下情况下存在：
  - 用户界面；
  - 衍生数据；
    衍生主要有两种：
    - Computed Values（计算值）：计算值总是可以使用纯函数（pure function）从当前可观察状态中获取；
    - Reactions（反应）：反应指状态变更时需要自动发生的副作用，这种情况下，我们需要实现其读写操作；

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
