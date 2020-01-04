# React 源码解析

为什么要读源码，阅读源码并不只是让你深入的理解一个框架的运作原理，更能让你在一些实现方案上学习到一些更优的方法

## React 介绍

在 github 的 react 的仓库中，react 源码所放位置为 packages 目录下：
主要有以下包组成：

```bash
.
├── babel-plugin-react-jsx # babel配置
├── create-subscription # 用于创建订阅，订阅React组件中的外部数据源，不建议使用
├── dom-event-testing-library
├── eslint-plugin-react-hooks # hooks eslint配置
├── jest-mock-scheduler # 用于测试scheduler
├── jest-react # 用于测试React Test Renderer 的 Jest 匹配器和实用程序
├── legacy-events
├── react # react 核心库 包含核心方法和hooks等api
├── react-art # 用于使用React绘制矢量图的js库，它提供对[ART库]的声明性和反应性绑定。使用相同的声明性API，您可以将输出呈现为Canvas，SVG或VML（IE8）。
├── react-cache # React应用程序的基本缓存。不需要关注
├── react-debug-tools # 这是用于调试React渲染器的实验软件包。不需要关注
├── react-devtools # devtools
├── react-devtools-core # devtools
├── react-devtools-extensions # devtools
├── react-devtools-inline # devtools
├── react-devtools-shared # devtools
├── react-devtools-shell # devtools
├── react-dom # react 核心 - 渲染
├── react-flight # 使用自定义React流模型的实验包。实验包，不需要关注
├── react-flight-dom-webpack # 使用Webpack针对DOM进行实验性React Flight绑定。实验包，不需要关注
├── react-interactions # 它旨在与实验性React一起使用。内部测试的标志。实验包，不需要关注
├── react-is # 用于判断是否是特定的React元素类型，提供一系列判断的方法
├── react-native-renderer # react-native 渲染器
├── react-noop-renderer # 这个包是用于调试Fiber的渲染器。不能直接使用。
├── react-reconciler # 用于创建自定义React渲染器
├── react-refresh # 用于热重装的实验软件包。不需要关注
├── react-server # 用于创建自定义React流服务器渲染器的实验包。
├── react-test-renderer # 用于将React组件渲染为纯JavaScript对象，
├── scheduler # 用于实现任务调度
├── shared # 共享变量
└── use-subscription # 用于React hook在并发模式下安全的管理订阅
```

当然，所有包列出来只是为了介绍有哪些包及其作用，更好的明白主要需要关注的包，从上面可以看出 React 核心部分的包主要有：

```bash
.
├── react # react 核心库 包含核心方法和hooks等api
├── react-dom # react 核心 - 渲染
├── react-reconciler # 用于创建自定义React渲染器
├── scheduler # 用于实现任务调度
├── shared # 共享变量
└── use-subscription # 用于React hook在并发模式下安全的管理订阅
```

## React 核心
