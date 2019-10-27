# Flutter 学习

## flutter 发展历程

[Flutter 的发展历程](https://www.jianshu.com/p/58110c993a29)

## Flutter 生命周期

Flutter 生命周期可以分为 3 个阶段：

1. 实例化组件并添加到树， 即 Navigator.push；
2. 状态变化，即打开新的 widget 或者依赖的上级 widget 发生变化；
3. 从树中移除, 即 Navigator.pop。

在 Flutter 中 Widget 都是不可变的， 但实际上需要根据对应的状态刷新 Widget。 从而产生了 StatelessWidget 和 StatefulWdiget, StatefulWidget 是由 2 个对象 Widget 和 State 组成的。

- `StatelessWidget`: 当创建的 widget 不需要管理任何形式的内部 state 时使⽤
- `StatefulWdiget`: 当创建一个能随时间动态改变的 widget，并且不依赖于其初始化状态时使用

  为什么将 State 和 Widget 分开呢？

答案是性能， State 管理状态（可以理解为 Controller），Widget 是 UI（即 View)。 根据状态变化每次生成 Widget(即 View）可以节省内存，即不必每次创建状态对象 State。

flutter 中的生命周期函数：

- `initState`: 构造函数：同其它高级语言， 只执行一次；插入到渲染树时调用，只执行一次。
- `didChangeDependencies`: 1、在初始化 initState 后执行； 2、显示/关闭其它 widget。 3、可执行多次；
- `didUpdateWidget`: 上级节点 rebuild widget 时， 即上级组件状态发生变化时会触发子 widget 执行 didUpdateWidget;
- `deactivate`: 有点像 Android 的 onStop 函数， 在打开新的 Widget 或回到这个 widget 时会执行； 可执行多次；
- `dispose`: 类似于 Android 的 onDestroy， 在执行 Navigator.pop 后会调用该办法， 表示组件已销毁；
- `reassemble`: 点击闪电会执行，只用于调试时的 hot reload。 release 版本不会执行该函数。

常见业务场景：

1. Widget A 打开 Widget B： Navigator.push(B)

B 构造函数--->B initState--->B didChangeDependencies--->B build--->A deactivate--->A didChangeDependencies.

2. Widget B 退出： Navigator.pop

A deactive--->A didChangeDependencies--->A build--->B deactive--->B dispose

## flutter 组件列表

[flutter 官方 widget 列表](https://flutter.cn/docs/reference/widgets)
[中文网 flutter widget 列表](https://flutterchina.club/widgets/widgetindex/)

### MaterialApp

封装了应用程序实现 Material Design 所需要的一些 Widget，实际是一种设计风格，里面会有已有的一些组件（eg: theme）

- `title`: 该属性会在 Android 应⽤用管理理器器的 App 上⽅方显示，对于 iOS 设备是没有效果的
- `home`: Widget 类型，这是在应用程序正常启动时⾸先显示的 Widget，除非指定了 `initialRoute` 。如果 `initialRoute` 显示失败，也该显示该 Widget。
- `routes`: `Map<String, WidgetBuilder>` 类型，是应用的顶级路由表，当使
  ⽤ `Navigator.pushNamed` 进⾏命名路由的跳转时，会在此路表中进行查找并跳转

### Scaffold: 实现了了基本的 Material Design 布局结构

- `appBar`: 显示在界⾯顶部的一个 AppBar
- `body`: 当前界⾯所显示的主要内容 Widget
- `drawer`: 抽屉菜单控件
- `bottomNavigationBar`: 显示在底部的导航栏，items 必须大于 2 个

## 参考链接

[Flutter 生命周期](https://www.jianshu.com/p/7e8dff26f81a)
[Flutter 生命周期详解](https://www.jianshu.com/p/00ff0c2b8336)
