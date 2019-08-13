# JS 异步编程

## 并发与并行

在查看资料与自己理解下，对并发和并行的大概描述如下：

- 并发是指多个程序同时启动，但是这几个程序都在一个处理机上运行，同一个时间只有一个程序在执行，多个程序通过交替执行完成任务。
- 并行是指同时运行多个程序，有多个处理机一起运行程序。

## 回调函数

优点：早期用于实现异步编程的方式。现在仍然有不少人用。
缺点：

1. 容易写出回调地狱。原因在于嵌套函数耦合度高，嵌套过多，出现问题并不容易处理错误。
2. 不利于阅读和维护。
3. 不能在外部使用 try catch 捕获回调函数内部错误，只能在回调函数使用。
4. 不能直接 return。因为异步不会等到回调函数执行结束再往下继续执行，return 是接收不到的。

## Generator

`Generator` 最大的特点就是可以控制函数的执行。

```javascript
function* foo(x) {
  let y = 2 * (yield x + 1)
  let z = yield y / 3
  return x + y + z
}
let it = foo(5)
console.log(it.next(11)) // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

分析：

- 首先 Generator 函数调用与普通函数不一样，返回的是一个迭代器。
- 第一次执行 next 时，传参会被忽略掉，函数停在 yield (x + 1)处，返回值为：`5 + 1 = 6`
- 第二次 next 传递的参数会替代`yield (x + 1)`，也就是说`y = 2 * 12 = 24;` 返回值为： `24 / 3 = 8`
- 第三次 next 传递的参数会替代`yield (y / 3)`，也就是：`z = 13`; 返回值为： `5 + 24 + 13 = 42`。

实现一个co函数，让异步代码同步化
```javascript
function co(gen) {
  return function(...arg) {
    const g = gen(...arg)
    while (!g.done) {
      g.next(g.value)
    }
    return g.value
  }
}
```

## Promise

特点：

1. 在构造 `Promise` 的时候，构造函数内部的代码是立即执行的。
2. `Promise` 实现了链式调用，也就是说每次 `then` 之后返回的都是一个 `Promise` ，并且是一个全新的 `Promise`，原因也是因为 `Promise` 状态不可变。 如果你在 `then` 中使用了 `return` ，那么 `return` 的值会被 `Promise.resolve()` 包装
   优点：解决了回调地狱的问题。
   缺点：无法取消 `Promise`, 错误需要通过回调函数捕获。

实现一个promisify方法：
```javascript
// 只用于最后一个参数是回调函数的函数，比如function fn(a, cb){}
// const newFn = promisify(fn)
// newFn(a)  => 会执行promise方法
function promisify(fn) {
  return function(...args) {
    // 返回promise的实例
    return new Promise(function(reslove, reject) {
      // newFn(a) 时会执行到这里向下执行
      // 加入参数cb => newFn(a)
      args.push(function(err, data) {
        if (err) {
          reject(err)
        } else {
          reslove(data)
        }
      })
      // 这里才是函数真正执行的地方执行newFn(a, cb)
      fn.apply(null, args)
    })
  }
}
```

## async 及 await

一个函数如果加上了 `async`; 那么该函数就会返回一个 `Promise`

```javascript
async function test() {
  return '1'
}
console.log(test()) // Promise {<resolved>: "1"}
```

`async` 就是将函数返回值使用 `Promise.resolve()` 包裹。和 `then` 中处理返回值一样。`await` 只能与 `async` 配套使用。
`async` 和 `await` 可以说是现在这个阶段的异步终极解决方案。
优点：能解决回调地狱,代码相比于 `Promise` 更清晰。
缺点：`await` 把异步代码改造成了同步代码，如果多个异步代码没有依赖却使用了 `await` 会导致性能上的降低。注意使用方式就能避免这个不算缺点的缺点。

`await` 内部实现了 `generator`,其实 `await` 就是 `generator` 加上 `Promise` 的语法糖，且内部实现了自动执行`generator` 。

## 常用定时器函数

使用定时器也是一种异步编程方式。
常见的定时器有： `setTimeout`、`setInterval`、`requestAnimationFrame`。

setTimeout: 如果当前上下文代码影响了性能。就会导致`setTimeout`不会按期执行。

```javascript
function sleep(d) {
  let start = Date.now()
  while (Date.now() - d < start) {}
}

var now = Date.now
var start = now()
console.log(`开始时间：${start}`)
setTimeout(function() {
  console.log(`实际延时时间为：${now() - start}`) // 2000
}, 500)

sleep(2000)
```

所以，其实 `setTimeout` 设定的只是最少延时时间。
setInterval: 与 setTimeout 一样，也受到代码性能的影响，设定的也是最少间隔执行回调函数的时间。

```javascript
function demo() {
  let now = Date.now
  let start = now()
  setInterval(function() {
    console.log(now() - start) //2000,3000,4000,...
  }, 1000)
  sleep(2000)
}
demo()
```

requestAnimationFrame: 能够实现定时器的作用。

```javascript
// 实现setInterval功能
function mySetInterval(callback, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

let a = 0
mySetInterval(timer => {
  console.log(Date.now())
  a++
  if (a === 3) {
    cancelAnimationFrame(timer)
  }
}, 1000)

// 实现setTimeout功能
function mySetTimeout(callback, interval) {
  let timer
  const now = Date.now
  let startTime = now()
  let endTime = startTime
  const loop = () => {
    timer = window.requestAnimationFrame(loop)
    endTime = now()
    if (endTime - startTime >= interval) {
      startTime = endTime = now()
      cancelAnimationFrame(timer)
      callback(timer)
    }
  }
  timer = window.requestAnimationFrame(loop)
  return timer
}

let b = 0
mySetTimeout(timer => {
  console.log(Date.now())
  b++
}, 1000)
```

`requestAnimationFrame`自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题。
