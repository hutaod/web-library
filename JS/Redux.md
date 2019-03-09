# Redux

## Redux注意事项
1. `store` 是唯一的
2. 只有 `store` 能改变自己的内容
3. `reducer` 必须是纯函数， `reducer` 可以接收 `state` ，但是决不能修改 `state` ，给固定的输入，就一定会有固定的输出，而不会有任何副作用（不能在reducer中使用定时器，请求ajax等）

## 常用方法
* `createStore` 创建store
* `store.dispatch` 派发action给store
* `store.getState` 获取store中的所有数据
* `store.subscribe` 订阅store数据的改变,只要store数据改变就会调用传入 `store.subscribe` 的回调函数