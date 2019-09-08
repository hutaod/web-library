# 专题系列

## 手写实现 call、apply、bind

### 实现 call

1. 判断当前 `this` 是否为函数，防止 `Function.prototype.myCall()` 直接被调用
2. `context` 为可选参数，如果不传的话默认上下文为 `window`
3. 为 `context` 创建 保证不重名的属性，将 `this` 赋值给这个属性
4. 处理参数，传入第一个参数后的参数
5. 调用函数后，删除 `context` 新增的不重名属性，并返回函数返回值

```javascript
Function.prototype.myCall = function(context, ...args) {
  if (typeof this === 'function') {
    throw new Error('error')
  }
  context = context || window
  const fn = Symbol() // 为了防止重名，实践运用中可以写一个相对比较复杂的就行，或者用uuid生成
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result // 返回函数返回值
}
```

### 实现 apply

和`call`的区别只在于传递的参数类型为数组

```javascript
Function.prototype.myApply = function(context, args) {
  if (this === Function.prototype) {
    throw new TypeError('error')
  }
  context = context || window
  const fn = Symbol() // 为了防止重名，实践运用中可以写一个相对比较复杂的就行，或者用uuid生成
  context[fn] = this
  let result
  if (Array.isArray(args)) {
    result = context[fn](...args)
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result // 返回函数返回值
}
```

### 实现 bind

1. 处理函数，返回一个函数
2. 判断是否为构造函数调用，如果是则使用 `new` 调用当前函数
3. 如果不是则使用 `apply` 将 `context` 和处理后的参数传入

```javascript
Function.prototype.myBind = function(context, ...args1) {
  if (this === Function.prototype) {
    throw new TypeError('error')
  }
  const _this = this
  return function Fn(...args2) {
    if (_this instanceof Fn) {
      return new _this(...args1, ...arg2)
    }
    return _this.apply(context, [...args1, ...arg2])
  }
}
```

## 实现一个 EventEmmiter

```javascript
function EventEmitter() {
  this._events = {}
}
// 向事件队列添加事件
// prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.on = function(eventName, listener, prepend) {
  if (!this._events) {
    this._events = {}
  }
  if (Array.isArray(this._events[eventName])) {
    if (prepend) {
      this._events[eventName].unshift(listener)
    } else {
      this._events[eventName].push(listener)
    }
  } else {
    this._events[eventName] = [listener]
  }
}
// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function(eventName, listener, prepend) {
  const only = (...args) => {
    const result = listener(...args)
    this.remove(eventName, only)
    return result
  }
  only.origin = listener
  this.on(eventName, only, prepend)
}
// 移除某个事件
EventEmitter.prototype.remove = function(eventName, listener) {
  if (Array.isArray(this._events[eventName])) {
    if (listener) {
      this._events[eventName] = this._events[eventName].filter(
        a => a !== listener
      )
    } else {
      delete this._events[eventName]
    }
  }
}
// 执行某类事件
EventEmitter.prototype.emit = function(eventName, ...args) {
  if (Array.isArray(this._events[eventName])) {
    this._events[eventName].forEach(cb => cb.apply(this, [...args]))
  }
}
```

## 防抖

```javascript
function debounce(fn, wait, immediate) {
  let timer = null
  const debounced = function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, wait)
      if (callNow) {
        return fn.apply(this, args)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, wait)
    }
  }

  debounced.cancel = () => {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}
```

## 节流

时间戳实现：第一次事件肯定触发，最后一次不会触发

```javascript
function throttle(fn, wait) {
  let pre = 0
  return function(...args) {
    if (Date.now() - pre > wait) {
      pre = Date.now()
      fn.apply(this, args)
    }
  }
}
```

定时器实现：第一次事件不会触发，最后一次一定触发

```javascript
function throttle(fn, wait) {
  let timeout = null
  return function(...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(this, args)
      }, wait)
    }
  }
}
```

结合版：第一次和最后一次都会触发

```javascript
function throttle(fn, wait) {
  let pre = 0
  let timeout = null
  return function(...args) {
    if (Date.now() - pre > wait) {
      clearTimeout(timeout)
      timeout = null
      pre = Date.now()
      event.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(this, args)
      }, wait)
    }
  }
}
```

参考：
[JavaScript 专题之跟着 underscore 学节流](https://github.com/mqyqingfeng/Blog/issues/26)

## 拷贝

### 浅拷贝

```
arr.slice()
arr.concat()
[...arr]
```

### 深拷贝

最简单方式：

```javascript
JSON.parse(JSON.stringify(obj))
```

缺点：会丢失值为 `undefined` 、方法、`Symbol()` 的属性，会丢失键为`Symbol()`的属性

手动实现：

```javascript
function deepClone(target) {
  if (target !== null && typeof target === 'object') {
    let cloneTarget
    if (Array.isArray(target)) {
      cloneTarget = target.map(child => {
        return deepClone(child)
      })
    } else {
      cloneTarget = {}
      for (var key in target) {
        cloneTarget[key] = deepClone(target[key])
      }
    }
    return cloneTarget
  }
  return target
}
```

## 数组去重、扁平、最值

### 去重

1. 开辟一个外部存储空间用于标记元素是否出现过

```javascript
const unique = array => {
  const container = {}
  return array.filter((item, index) => {
    return container[item] ? false : (container[item] = true)
  })
}
```

2. indexOf + filter

```javascript
const unique = array => {
  return array.filter((item, index) => {
    return array.indexOf(item) === index
  })
}
```

3. Set

```javascript
const unique = array => {
  return Array.from(new Set(array))
}
```

```javascript
const unique = array => {
  return [...new Set(array)]
}
```

4. 去掉重复值

```javascript
const unique = array => {
  return array.filter((item, index) => {
    return array.indexOf(item) === array.lastIndexOf(item)
  })
}
```

### 扁平，实现一个`Array.flat()`方法

定义：把多维数组进行降维处理

1. 基本实现

```javascript
var flat = (array, deep = 1) => {
  let result = []
  array.forEach(item => {
    if (Array.isArray(item) && deep > 0) {
      result = result.concat(flat(item, deep - 1))
    } else {
      result.push(item)
    }
  })
  return result
}
```

2. `toString` 和 `split`

```javascript
const flat = array => array.toString().split(',')
```

缺点： 会转换 array 元素类型为字符串，只能进行简单字符串的数组进行扁平化

3. `reduce` 实现

```javascript
var flat = (array, deep = 1) => {
  return array.reduce((target, current) => {
    return Array.isArray(current) && deep > 1
      ? target.concat(flat(current, deep - 1))
      : target.concat(current)
  }, [])
}
```

### 最值

1. reduce 实现

```
array.reduce((a, b) => Math.max(a,b))
```

2. 上面那种方法一般用于 json 格式的数组，Math.max 本身就能获取多个数字的最大值

```javascript
const array = [4, 3, 24, 2]
Math.max.apply(null, array)
Math.max(...array)
```

### 使用 reduce 实现 map

```javascript
Array.prototype.reduceToMap = function(handler) {
  return this.reduce((target, current, index) => {
    target.push(handler.call(this, current, index, this))
    return target
  }, [])
}
```

### 使用 reduce 实现 filter

```javascript
Array.prototype.reduceToFilter = function(handler) {
  return this.reduce((target, current, index) => {
    if (handler.call(this, current, index, this)) {
      target.push(current)
    }
    return target
  }, [])
}
```

### 实现 reduce

```javascript
Array.prototype.myReduce = function(handler, target) {
  let result
  if (!target) {
    result = this[0]
    for (let i = 1; i < this.length; i++) {
      result = handler(result, this[i], i, this)
    }
  } else {
    result = target
    for (let i = 0; i < this.length; i++) {
      result = handler(result, this[i], i, this)
    }
  }
  return result
}
```

## 函数柯里化

定义：在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

### 实现

```javascript
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...args2) => {
      return curry(fn, ...args, ...args2)
    }
  }
}

// 测试
const fn = (a, b, c) => console.log(a, b, c)
const curryFn = curry(fn)
curryFn(1)(2)(3) // 1 2 3
curryFn(1, 2)(3) // 1 2 3
curryFn(1, 2, 3) // 1 2 3
```

## 实现 一个 符合 Promise/A+ 规范 的 promise

- 设定三个状态 `PENDING`、`FULFILLED`、`REJECTED` ，只能由 `PENDING` 改变为 `FULFILLED`、`REJECTED`，并且只能改变一次
- `Promise` 接收一个函数 `executor`，`executor` 有两个参数 `resolve` 方法和 `reject` 方法
- `resolve` 将 `PENDING` 改为 `FULFILLED`
- `reject` 将 `PENDING` 改为 `REJECTED`
- `promise` 变为 `FULFILLED` 状态后具有一个唯一的 `value`
- `promise` 变为 `REJECTED` 状态后具有一个唯一的 `reason`

```javascript
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(executor) {
  this.state = PENDING
  this.value = null
  this.reason = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []

  const resolve = value => {
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = RESOLVED
        this.value = value
        this.resolvedCallbacks.forEach(cb => cb(this.value))
      }
    })
  }

  const reject = reason => {
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.rejectedCallbacks.forEach(cb => cb(this.reason))
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : v => throw r

  const promise2 = new MyPromise((resolve, reject) => {
    switch (this.state) {
      case RESOLVED:
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolve(x)
          } catch (err) {
            reject(err)
          }
        })
        break
      case REJECTED:
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            reject(x)
          } catch (err) {
            reject(err)
          }
        })
        break
      case PENDING:
        this.resolvedCallbacks.push(onFulfilled)
        this.rejectedCallbacks.push(onRejected)
        break
    }
  })

  return promise2
}
```
