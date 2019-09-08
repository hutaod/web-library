# ES6

## var、let 及 const 区别

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用于顶部，变量提升只会把声明挪到作用域顶部。
- `var` 存在提升，我们能在声明前使用，`let`、 `const` 因为暂时性死区的原因，不能在声明前使用。
- 在全局作用域下使用 `let` 和 `const` 声明的变量，并不会挂载到 `window` 上， 而 `var` 会。
- `let` 和 `const` 作用基本一致，但 `const` 声明的变量不能再次赋值。
- 暂时性死区：`let`和`const`也存在提升，但是规定不能在声明前使用。

## 原型继承和 Class 继承

class：其实 JS 中并不存在类， `class` 只是语法糖，本质还是函数。

### 组合继承

在子类的构造函数中通过 Parent.call(this) 继承父类的属性，然后改变子类的原型为 new Parent() 来继承父类的函数。如下：

```javascript
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

优点：构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数。
缺点：在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。

![error](https://raw.githubusercontent.com/ht1131589588/web-library/master/image/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f31332f31363231653861.png)

### 寄生组合继承

```javascript
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value) // 调用父构造函数
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。

### Class 继承

类声明的特点：

1. 与 let、const 一样，有临时死区
2. 类声明中的代码全部运行在严格模式下
3. 必须使用 new 调用

```javascript
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

`class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，因为这段代码可以看成 `Parent.call(this, value)`。

## 模块化

使用模块化的原因(好处)：

- 解决命名冲突
- 提供代码复用性
- 提高代码可维护性

#### 立即执行函数

在早期，是实现模块化的常见手段，通过函数作用域解决了命名冲突、污染全局作用域等问题

#### AMD 和 CMD

```javascript
// AMD
define(['./a', './b'], function(a, b) {
  // 加载模块完毕可以使用
  a.do()
  b.do()
})
// CMD
define(function(require, exports, module) {
  // 加载模块
  // 可以把 require 写在函数体的任意地方实现延迟加载
  var a = require('./a')
  a.doSomething()
})
```

#### CommonJS

exports 和 module.exports 用法相似，但是不能对 exports 直接赋值。因为 var exports = module.exports 这句代码表明了 exports 和 module.exports 享有相同地址，通过改变对象的属性值会对两者都起效，但是如果直接对 exports 赋值就会导致两者不再指向同一个内存地址，修改并不会对 module.exports 起效。

#### ES Module

ES Module 是原生实现的模块化方案，与 CommonJS 有以下几个区别

- CommonJS 支持动态导入，也就是 require(\${path}/xx.js)，后者目前不支持，但是已有提案
- CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
- ES Module 会编译成 require/exports 来执行的

```javascript
// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}
```

## Object.is()

结果基本与 `===` 类似，除去以下特例

```javascript
Object.is(0, -0) // false
Object.is(-0, -0) // true
Object.is(NaN, NaN) // true
```

## 迭代器

可以迭代的对象都有 `Symbol.iterator` 属性
可迭代的对象有：数组，Set，Map，字符串，NodeList
ES6 新增的 `for-of` 就用到了迭代器的功能，只有可迭代的对象能使用

```javascript
let a = [1, 'a']
// 获取数组的迭代器
let iterator = a[Symbol.iterator]()
// 当调用 next 时会输出当前迭代的 value 和 是否迭代完成
console.log(iterator.next()) // {value: 1, done: false}
console.log(iterator.next()) // {value: 'a', done: false}
console.log(iterator.next()) //迭代完成时输出 {value: undefined, done: true}

// 这里可以使用新特性数组解构 let [index, value]
for (let value of a.entries()) {
  console.log(value) // -> [0, 1]   [1, 'a']
}
```

对于除去上述可迭代的对象以外的对象是没有 `Symbol.iterator` 方法的，但是可以让它变成可迭代的。

```javascript
let b = { a: 1, b: 2 }
// 下面代码报错 Uncaught TypeError: {(intermediate value)(intermediate value)} is not iterable
for (let item of b) {
  console.log(item)
}

//用Symbol.iterator给对象添加迭代方法
let a = {
  array: [],
  // 这是一个 Generator 函数， 这里用于自定义对象迭代器
  *[Symbol.iterator]() {
    for (let item in this.array) {
      yield item
    }
  }
}
a.array.push(...[1, 'a'])
//  for-of 会正常输出, 但是a不存在 entries 方法
for (let item of a) {
  console.log(item) // -> 1, 'a'
}

let itervtor = a[Symbol.iterator]()

console.log(iterator.next()) // {value: 1, done: false}
console.log(iterator.next()) // {value: 'a', done: false}
console.log(iterator.next()) //迭代完成时输出 {value: undefined, done: true}
```

## Proxy

待完善...
[MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
