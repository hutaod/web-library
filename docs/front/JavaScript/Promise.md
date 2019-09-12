# Promise

## Promise 理解

`promise` 相当于一个状态机。
`promise` 的三种状态：

- pending
- resolved
- rejected

`promise` 对象初始化状态为为 `pending`。
当调用`resolve`(成功)，状态由 `pending` 转为 `resolved`。
当调用`reject`(失败)，状态由 `pending` 转为 `rejected`。

    promise状态只能由pending => resolved/rejected，一旦修改就不能再变

## Promise 对象方法

1. `then`方法注册当`resolve`(成功)/`reject`(失败)的回调函数。`then` 方法是异步的。
2. `resolve`(成功)时，`onResolved` 会被调用。
3. `rejected`(失败)时，`onRejected` 会被调用。
4. `catch` 在链式写法中可以捕获前面 `then` 中发送的异常。

```javascript
promise.catch(onRejected)
// 相当于
promise.then(null, onRrejected)

// 注意
// onRejected 不能捕获当前onResolved中的异常
promise.then(onResolved, onRrejected)

// 可以写成：
promise.then(onResolved).catch(onRrejected)
```

5. `promise.then`方法每次调用 都返回一个新的`promise`对象 所以可以链式写法

```javascript
function taskA() {
  console.log('Task A')
}
function taskB() {
  console.log('Task B')
}
function onRejected(error) {
  console.log('捕获A或B错误', error)
}

var promise = Promise.resolve()
promise
  .then(taskA)
  .then(taskB)
  .catch(onRejected) // 捕获前面then方法中的异常
```

## Promise 的静态方法

1. `Promise.resolve` 返回一个`resolved`状态的`promise`对象。

```javascript
Promise.resolve('test').then(val => {
  console.log(val)
})

Promise.resolve('test')
// 相当于
new Promise(resolve => {
  resolve('test')
})
```

2. `Promise.reject` 返回一个`rejected`状态的`promise`对象。

```javascript
Promise.reject('err')
// 相当于
new Promise((resolve, reject) => {
  reject('err')
})
```

3. `Promise.all` 接收一个`promise`对象数组为参数。通常会用来处理 多个并行异步操作。
   只有全部为 resolve 才用`Promise.all`方法，否则 then 方法 onResolved 不会执行，直接执行 onRejected。
   `const p1 = Promise.resolve(1); const p2 = Promise.resolve(2); const p3 = Promise.resolve(3); Promise.all([p1,p2,p3]).then(data => { console.log(data); // [1, 2, 3] 结果顺序和promise实例数组顺序是一致的 },err => { console.log(err); //只要有一个是Rejected就会执行 })`
1. `Promise.race` 接收一个 promise 对象数组为参数。
   `Promise.race` 只要有一个 `promise` 对象进入 Resolved 或者 Rejected 状态的话，就会继续进行后面的处理。
   `const p1 = Promise.resolve(1); const p2 = Promise.resolve(2); const p3 = Promise.resolve(3); Promise.race([p1,p2,p3]).then(data => { console.log(data); // 1 },err => { console.log(err); //只有当第一个状态为Rejected时才会执行 })`

## 手写实现 Promise

简单版 Promise

```javascript
const MyPromise = (function() {
  const PENDING = 'pending' //等待态
  const RESOLVED = 'resolved' //执行态
  const REJECTED = 'rejected' //拒绝态

  function MyPromise(fn) {
    var that = this
    that.state = PENDING
    that.value = null
    that.resolvedCallbacks = []
    that.rejectedCallbacks = []

    function resolve(value) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }

    function reject(value) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      resolve(error)
    }
  }

  MyPromise.prototype.then = function(onResolved, onRejected) {
    const that = this
    onResolved = typeof onResolved === 'function' ? onResolved : v => v
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : r => {
            throw r
          }

    if (that.state === PENDING) {
      that.resolvedCallbacks.push(onResolved)
      that.rejectedCallbacks.push(onRejected)
    }

    if (that.state === RESOLVED) {
      onResolved(that.value)
    }

    if (that.state === REJECTED) {
      onRejected(that.value)
    }
  }

  return MyPromise
})()
```
