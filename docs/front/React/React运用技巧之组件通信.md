# React 运用技巧之组件通信

本章主要介绍 React 的组件之间通信方式，并梳理各种通信方式解决方法。

常见的通信解决方法有一下几种：

- `props` 传递
  - 动态属性
  - `callback funtion`
- 使用 `ref`
- 直接使用 `context` 
- `redux`
- 全局变量
- 普通的订阅发布模式
- Observe


通信方式有以下几种：

- 父组件 => 子组件
- 子组件 => 父组件
- 兄弟组件之间
- 跨层级组件之间

## 跨层级通信

在 hooks 出现之前，实现跨层级通信，不管是使用 `redux` 还是 `mobx`，想要接入 React，一般都需要基于 `context` 来实现。

下面我们通过 `context` 来实现一个简单的类 `redux` 的例子。

因为需要用到订阅发布功能，我们先来实现了一个可以订阅和发布的类 `Bus`。

```tsx
export class Bus {
  cbs: Function[] = [];
  // 订阅
  subscribe(cb: Function) {
    this.cbs.push(cb);
  }
  // 取消订阅
  unsubscribe(cb: Function) {
    this.cbs = this.cbs.filter((a) => a !== cb);
  }
  // 发布/广播
  publish(value) {
    this.cbs.forEach((cb) => {
      cb(value);
    });
  }
}

export default new Bus();
```

`Bus` 是用来给组件订阅数据变更的请求，当数据需要变更时可以接受到通知信息，进而执行数据的实际操作，具体后续会说明白。

先设计一个创建 `context` 的函数 `createMyContext`，用于做一些基本工作，以便于需要使用 `context` 可以省略很多基本工作。

`createMyContext` 的主要功能就是以下三点：

- 使用 `React.createContext` 创建 `context`
- 实现 `dispatch` 函数，派发 `action` 。用于传递需要更新的 `action` 描述，告知订阅者 `state` 需要进行更新。
- 重写了 `context.Provider`，添加订阅功能， 当 `action` 使用 `dispatch` 派发时，可以收到 `state` 变更申请，并执行 `reducer`，获取最新的 `state` ，更高 state ，重新渲染 `context.Provider`。

再来看看具体实现代码：

```tsx
import React, { useState, useEffect } from "react";
import { Bus } from "./Bus";

/**
 * 和redux中的Action类似
 */
export type Action<T, P> = {
  type: T;
  payload: P;
};

export type AnyAction = Action<string, any>;

/**
 * 创建 context
 * initState 创建时需要传递 context 的初始值
 * reducer 改变 state 的方法，和 redux 中的 reducer 基本类似
 */
export default function createContext<T>({
  initState,
  reducer
}: {
  initState: T;
  reducer: (state: T, action: AnyAction) => T;
}) {
  const bus = new Bus();

  // 创建context
  const context = React.createContext<T>(initState);

  /**
   * 派发action，触发订阅
   * @param {AnyAction} value
   */
  function dispatch(value: AnyAction) {
    bus.publish(value);
  }

  const ContextConsumer = context.Consumer;

  /**
   * 重写 context.Provider ，把初始化 value 和 数据变更的操作在此处封装
   */
  function ContextProvider({ children }: { children: React.ReactNode }) {
    /**
     * context 的 value
     */
    const [state, setState] = useState<T>(initState);

    useEffect(() => {
      /**
       * 订阅 action 方法
       */
      function subscribe(action: AnyAction) {
        /**
         * 执行 reducer 并传递 旧的 state 和 action
         * 获取新的 state
         */
        const newState = reducer(state, action);
        // 更新 state
        setState(newState);
      }
      // 添加订阅
      bus.subscribe(subscribe);
      return () => {
        // 取消订阅
        bus.unsubscribe(subscribe);
      };
    }, [state]);

    // 使用 context.Provider
    return <context.Provider value={state}>{children}</context.Provider>;
  }

  // 返回使用 context 需要用的一些函数、组件以及 context 实例
  return {
    context,
    ContextConsumer,
    ContextProvider,
    dispatch
  };
}
```

然后我们使用 `createContext` 来进行跨层级通信。

主要分为三个步骤：

- 定义 `state` 初识值，实现 `reducer` 用于处理 `action` 并返回新的 `state` 。
- 创建 `context` 
- 定义 修改 `state` 的 `action`
- 使用 `ContextConsumer` 或者 `useContext` 订阅 `context` 更新
- 派发 `action` ，`context` 更新后，已经订阅 `context` 更新的会进行重新渲染

一、初始化需要 context 初识值，我们这里统称 state，以及需要实现 reducer 用于处理 action 并返回新的 state。

```tsx
/**
 * state ts 类型定义
 */
export type StateValue = {
  // 具体根据业务而定...
};

/**
 * state初识值
 */
const initState: StateValue = {
  // 具体根据业务而定...
};

/**
 * 改变state的方法，类似 reducer
 * @param {StateValue} state
 * @param {Action<keyof typeof constants, any>} action
 */
function reducer(
  state: StateValue,
  action: Action<keyof typeof constants, any>
) {
  // 处理 action.type 返回新的 state
  switch (action.type) {
    case ACTION_TYPE:
      // 返回新的
      return {
        ...state,
      };
    default:
      return state;
  }
}
```

二、创建 context 

```tsx
/**
 * 创建context
 */
const { context, ContextProvider, ContextConsumer, dispatch } = createContext<StateValue>({ initState, reducer });
```

三、然后我们再定义 修改 state 的 action。

```tsx
/**
 * 新增，类似 redux 中的 action
 */
export const someAction = (payload) => ({
  type: ACTION_TYPE,
  payload: payload
});
```

四、使用 `ContextConsumer` 或者 `useContext` 订阅 `context` 更新

五、派发 `action` ，`context` 更新后，已经订阅 `context` 更新的会进行重新渲染



## 总结

## 参考资料

- https://zhuanlan.zhihu.com/p/326254966