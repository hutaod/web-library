# React 运用技巧

React是一种很灵活的前端框架，灵活代表了使用技巧可以很丰富，本篇文章就用于总结工作中遇到的一些运用React的技巧。

React 在 hooks 出现之后，衍生了更多的使用方式，因此，本文在讲解过程中，会针对 `Class Component` 和 `Function Component` 中的运用进行对比讲解。

## 前言

`React` 每一个组件的使用都是对函数的调用，属性就是传递给函数的参数，只不过属性都聚合在了函数的第一个参数，我们叫做`props`，具体实现是 `babel` 把 `JSX` 编译转换为 `React.createElement` 函数调用，编译细节可以看一下这篇文章（TODO:缺失文章链接），里面详细的介绍了 `JSX` 的编译原理 。

因此，React中的很多技巧都可以看作 `JS` 的使用，下面我将会分成一下几步来进行讲解。

- 跨层级通信
- 组件封装
- 高阶组件
- 其他 `hooks` 的运用
- 性能优化、及注意事项
- 其他小技巧

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



## 组件封装

## 高阶组件

## 其他 hooks 的运用

## 性能注意事项

## 其他小技巧

除了上面那些主要事项，再介绍一些其他使用小巧

- createPortal 


## 总结

大家不管使用 React 还是其他前端框架，甚至这门语言，都要多进行思考，总结出更好的运用技巧，并沉掉下来，以便于少做重复的事情，并不断提升自己。文章中如果有问题请大家指出，有建议也欢迎在评论区留下建议，感谢阅读🙏。

## 参考资料

- https://zhuanlan.zhihu.com/p/347756111