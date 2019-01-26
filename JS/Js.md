# 类型

## 原始类型
在js中，存在6中原始值，分别是：
* `boolean`
* `null`
* `undefined`
* `number`
* `string`
* `symbol`
  
原始类型存储的都是值，是没有函数可以调用的，比如`undefined.toString()`会直接报错。
注意点：
* `'1'.toString()`或者`false.toString()`等可以用的原因是被强制转换成了 String 类型也就是对象类型，所以可以调用 `toString` 函数。
* 对于`null`来说，很多人会认为它是个对象类型，其实是错误的。`typeof null` 会输出 `object`，这只是 JS 存在的一个悠久 Bug。注: 在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000`开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 对象类型
    除了原始类型，其他的都是对象类型。
对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址。

## `typeof` vs `instanceof`
`typeof`：对于原始类型，除了 `null` 都可以显示正确的类型；对于对象类型来说，除了函数都会显示object。

`instanceof`：用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置。

`Symbol.hasInstance`：用于自定义判断某对象是否为某构造器的实例。即用于自定义 `instanceof` 操作符在某个类上的行为。
```
class MyArray {  
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof MyArray); // true
```

## 类型转换
JS中类型转换只有三种情况：
* 转换为布尔值
* 转换为数字
* 转换为字符串
  
对象转换为原始类型时，先调用 `valueof()` ，如果没有返回原始类型，再调用 `toString()`，如果两者都没有返回原始类型，就会报错。
如果重写了`Symbol.toPrimitive`，就会直接调用该方法。

    Symbol.toPrimitive指将被调用的指定函数值的属性转换为相对应的原始值。如果定义后就不会再调用`valueof()`和`toString()`方法
```
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

## 四则运算符
1. 加法运算符：
  * 运算中其中一方为字符串，那么就会把另一方也转换为字符串
  * 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
2. 其他运算符:
  * 只要其中一方是数字，那么另一方就会被转为数字

## 比较运算符
1. 如果是对象，就通过 toPrimitive 转换对象
2. 如果是字符串，就通过 unicode 字符索引来比较

# this
* 直接声明的函数默认是指向`window`,一个对象上声明的函数，默认是指向该对象。函数的`this`默认指向改函数的调用者
* 非箭头函数的情况下，哪怕一个函数声明的地方在一个对象的某个方法内部，也默认指向`window`。
* 对于`new`方式实例化的方法，`this`永远被绑定到了该对象上,不会被任何方式所改变。
* 箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`，对箭头函数使用 `bind` 这类函数是无效的
* `bind` 中 `this` 取决于第一个参数,如果第一个参数为空,那么就是 `window` 。如果对一个函数进行多次 `bind`, 该函数的 `this` 只取决于第一次的 `bind`。
  
# 闭包 
定义：函数A内部有一个函数B,函数B可以访问到函数A中的变量，那么函数B就是闭包。

    闭包存在的意义就是让我们可以间接访问函数内部的变量。

# 深浅拷贝
## 浅拷贝常用方法： 
* `Object.assign`
* 通过展开运算符 `...` 来实现浅拷贝

## 深拷贝
通常可以用 `JSON.parse(JSON.stringify(object))` 来进行深拷贝。
但方法有局限性。
  * 会忽略值为 undefined和symbol 的属性, 和键为symbol的属性
  * 会忽略函数
  * 不能解决循环引用的对象

# 原型链
1. 原型就是一个对象,并且这个对象中包含了很多函数。结论：对于 `obj` 来说，可以通过 `__proto__` 找到y一个原型对象, 在该对象中定义了很多函数让我们使用。
2. 原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型，但是并不是所有函数都具有这个属性，Function.prototype.bind() 就没有这个属性。
3. 原型链就是多个对象通过 __proto__ 的方式连接了起来。为什么 obj 可以访问到 valueOf 函数，就是因为 obj 通过原型链找到了 valueOf 函数。

总结：
* Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
* Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
* Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建
* 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的
* 函数的 prototype 是一个对象，也就是原型
* 对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链

# ES6
## var、let 及 const 区别
* 函数提升优先于变量提升，函数提升会把整个函数挪到作用于顶部，变量提升只会把声明挪到作用域顶部。
* `var` 存在提升，我们能在声明前使用，`let`、 `const` 因为暂时性死区的原因，不能在声明前使用。
* 在全局作用域下使用 `let` 和 `const` 声明的变量，并不会挂载到 `window` 上， 而 `var` 会。
* `let` 和 `const` 作用基本一致，但 `const` 声明的变量不能再次赋值。 
* 暂时性死区：`let`和`const`也存在提升，但是规定不能在声明前使用。

## 原型继承和Class继承
class：其实JS中并不存在类， `class` 只是语法糖，本质还是函数。
### 组合继承
在子类的构造函数中通过 Parent.call(this) 继承父类的属性，然后改变子类的原型为 new Parent() 来继承父类的函数。如下：
```
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
```
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
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
```
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
* 解决命名冲突
* 提供代码复用性
* 提高代码可维护性

#### 立即执行函数
在早期，是实现模块化的常见手段，通过函数作用域解决了命名冲突、污染全局作用域等问题

#### AMD和CMD
```
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
* CommonJS 支持动态导入，也就是 require(${path}/xx.js)，后者目前不支持，但是已有提案
* CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
* CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
* ES Module 会编译成 require/exports 来执行的

```
// 引入模块 API
import XXX from './a.js'
import { XXX } from './a.js'
// 导出模块 API
export function a() {}
export default function() {}
```

# JS异步编程

## 并发与并行
在查看资料与自己理解下，对并发和并行的大概描述如下：
* 并发是指多个程序同时启动，但是这几个程序都在一个处理机上运行，同一个时间只有一个程序在执行，多个程序通过交替执行完成任务。
* 并行是指同时运行多个程序，有多个处理机一起运行程序。

## 回调函数
优点：早期用于实现异步编程的方式。现在仍然有不少人用。
缺点：
1. 容易写出回调地狱。原因在于嵌套函数耦合度高，嵌套过多，出现问题并不容易处理错误。
2. 不利于阅读和维护。
3. 不能在外部使用try catch捕获回调函数内部错误，只能在回调函数使用。
4. 不能直接return。因为异步不会等到回调函数执行结束再往下继续执行，return是接收不到的。

## Generator
`Generator` 最大的特点就是可以控制函数的执行。
```
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next(11))   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```
分析： 
* 首先Generator函数调用与普通函数不一样，返回的是一个迭代器。
* 第一次执行next时，传参会被忽略掉，函数停在yield (x + 1)处，返回值为：`5 + 1 = 6`
* 第二次next传递的参数会替代`yield (x + 1)`，也就是说`y = 2 * 12 = 24;` 返回值为： `24 / 3 = 8`
* 第三次next传递的参数会替代`yield (y / 3)`，也就是：`z = 13`; 返回值为： `5 + 24 + 13 = 42`。

## Promise
特点：
1. 在构造 `Promise` 的时候，构造函数内部的代码是立即执行的。
2. `Promise` 实现了链式调用，也就是说每次 `then` 之后返回的都是一个 `Promise` ，并且是一个全新的 `Promise`，原因也是因为 `Promise` 状态不可变。 如果你在 `then` 中使用了 `return` ，那么 `return` 的值会被 `Promise.resolve()` 包装
优点：解决了回调地狱的问题。
缺点：无法取消 `Promise`, 错误需要通过回调函数捕获。

## async及await
一个函数如果加上了 `async`; 那么该函数就会返回一个 `Promise`
```
async function test() {
  return '1';
}
console.log(test());// Promise {<resolved>: "1"}
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
```

function sleep(d){
	let start = Date.now();
	while(Date.now()-d<start){
		
	}
}

var now = Date.now;
var start = now();
console.log(`开始时间：${start}`);
setTimeout(function(){
	console.log(`实际延时时间为：${now()-start}`)	// 2000
},500);

sleep(2000);
```
所以，其实 `setTimeout` 设定的只是最少延时时间。
setInterval: 与setTimeout一样，也受到代码性能的影响，设定的也是最少间隔执行回调函数的时间。
```
function demo() {
	let now = Date.now;
	let start = now();
  setInterval(function(){
    console.log(now()-start); //2000,3000,4000,...
  },1000)
  sleep(2000);
}
demo()
```

requestAnimationFrame: 能够实现定时器的作用。
```
// 实现setInterval功能
function mySetInterval(callback, interval){
	let timer;
	const now = Date.now;
	let startTime = now();
	let endTime = startTime;
	const loop = () => {
		timer = window.requestAnimationFrame(loop);
		endTime = now();
		if(endTime - startTime >= interval){
			startTime = endTime = now();
			callback(timer);
		}
	}
	timer = window.requestAnimationFrame(loop);
	return timer
}

let a = 0
mySetInterval(timer => {
  console.log(Date.now())
  a++;
  if (a === 3){
	  cancelAnimationFrame(timer)
	}
}, 1000);

// 实现setTimeout功能
function mySetTimeout(callback, interval){
	let timer;
	const now = Date.now;
	let startTime = now();
	let endTime = startTime;
	const loop = () => {
		timer = window.requestAnimationFrame(loop);
		endTime = now();
		if(endTime - startTime >= interval){
			startTime = endTime = now();
      cancelAnimationFrame(timer)
			callback(timer);
		}
	}
	timer = window.requestAnimationFrame(loop);
	return timer
}

let b = 0
mySetTimeout(timer => {
  console.log(Date.now())
  b++;
}, 1000);
```
`requestAnimationFrame`自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题。

