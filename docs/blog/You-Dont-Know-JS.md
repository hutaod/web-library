# You-Dont-Know-JS 学习笔记

- “入门与进阶篇”
- “作用域与闭包”
- “this 与对象原型”
- “类型与文法”
- “异步与性能”
- “ES6 与未来”

## “入门与进阶篇”

## “作用域与闭包”

## “this 与对象原型”

## “类型与文法”

### 类型

1. JavaScript 有七种内建类型：`null`、`undefined`、`boolean`、`number`、`string`、`object`、`symbol`。他们可以被`typeof`操作符识别。

2. `null` 是唯一一个`falsy`，但是在`typeof`检查中返回`object`的基本类型，所以可以用一下方法检查 null

```js
var a = null

var isNull = !a && typeof a === 'object' // true
```

3. `typeof` 操作符总是返回字符串

```js
typeof typeof 42 // "string"
```

4. 许多开发者会认为 “undefined” 和 “undeclared” 大体上是同一个东西，但是在 JavaScript 中，它们是十分不同的。undefined 是一个可以由被声明的变量持有的值。“未声明”意味着一个变量从来没有被声明过。

JavaScript 很不幸地将这两个词在某种程度上混为了一谈，不仅体现在它的错误消息上（“ReferenceError: a is not defined”），也体现在 typeof 的返回值上：对于两者它都返回 "undefined"。

然而，当对一个未声明的变量使用 typeof 时，typeof 上的安全防卫机制（防止一个错误）可以在特定的情况下非常有用。

### 值

1.  在一个 array 值上使用 delete 将会从这个 array 上移除一个值槽，但就算你移除了最后一个元素，它也 不会 更新 length 属性
2.  类 Array（一个数字索引的值的集合），通常你可以对这些值的集合调用数组的工具函数（比如 indexOf(..)、concat(..)、forEach(..) 等等），偶尔你需要将一个类 array 值（一个数字索引的值的集合）转换为一个真正的 array，常见的转换方式是借用 `slice(..)` 工具，比如：

```js
function foo() {
  var arr = Array.prototype.slice.call(arguments)
  arr.push('3')
  console.log(arr)
}

foo('1', '2')
```

在 es6 中，可以使用 `Array.from(..)` 的内建工具实现转换：

```js
var arr = Array.from(arguments)
```

3. String 与 array 有很肤浅的相似性， -- 也就是上面说的，类 array -- 举例来说，它们都有一个 length 属性，一个 indexOf(..) 方法（在 ES5 中仅有 array 版本），和一个 concat(..) 方法，它们都有的其他方法还有`slice(..)`。但 JavaScript 的 `string` 是不可变的，而 `array` 是相当可变的。另外，在 JavaScript 中用位置访问字符的 `a[1]` 形式不总是广泛合法的。老版本的 IE 就不允许这种语法（但是它们现在允许了）。相反，正确的 方式是 `a.charAt(1)`。另外，许多 `array` 方法在处理 `string` 时非常有用，虽然这些方法不属于 `string`，但我们可以对我们的 string “借用”非变化的 `array` 方法：

```js
a.join // undefined
a.map // undefined

var c = Array.prototype.join.call(a, '-')
var d = Array.prototype.map
  .call(a, function(v) {
    return v.toUpperCase() + '.'
  })
  .join('')

c // "f-o-o"
d // "F.O.O."
```

另外需要注意的是：但反改变是改变自身，而不是返回一个新值的 Array 方法，都不能“借用”给`string`，比如：`Array.prototype.reverse.call(str)`、`Array.prototype.reverse.splice(str)`都会执行失败

4. JavaScript 的 number 的实现基于“IEEE 754”标准，通常被称为“浮点”，跟大多数现代计算机语言，以及几乎所有的脚本语言一样。JavaScript 明确地使用了这个标准的“双精度”（也就是“64 位二进制”）格式。

使用二进制浮点数的最出名（臭名昭著）的副作用是（这是对 所有 使用 IEEE 754 的语言都成立的 —— 不是许多人认为/假装 仅 在 JavaScript 中存在的问题）：

```js
0.1 + 0.2 === 0.3 // false
```

从数学的意义上，我们知道这个语句应当为 true。为什么它是 false？

简单地说，0.1 和 0.2 的二进制表示形式是不精确的，所以它们相加时，结果不是精确地 0.3。而是 非常 接近的值：0.30000000000000004，但是如果你的比较失败了，“接近”是无关紧要的。

我们可以使用这个 Number.EPSILON 来比较两个 number 的“等价性”（带有错误舍入的容差）：

```js
function isEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}

var a = 0.1 + 0.2
var b = 0.3

isEqual(a, b) // true
isEqual(0.0000001, 0.0000002) // false
```

测试整数:

测试一个值是否是整数，你可以使用 ES6 定义的 Number.isInteger(..)：

```js
Number.isInteger(42) // true
Number.isInteger(42.0) // true
Number.isInteger(42.3) // false
```

可以为前 ES6 填补 Number.isInteger(..)：

```js
if (!Number.isInteger) {
  Number.isInteger = function(num) {
    return typeof num == 'number' && num % 1 === 0
  }
}
```

要测试一个值是否是 安全整数，使用 ES6 定义的 Number.isSafeInteger(..)：

```js
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Math.pow(2, 53)) // false
Number.isSafeInteger(Math.pow(2, 53) - 1) // true
```

可以为前 ES6 浏览器填补 Number.isSafeInteger(..)：

```js
if (!Number.isSafeInteger) {
  Number.isSafeInteger = function(num) {
    return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER
  }
}
```

5. 虽然整数可以安全地最大达到约九万亿（53 比特），但有一些数字操作（比如位操作符）是仅仅为 32 位 number 定义的，所以对于被这样使用的 number 来说，“安全范围”一定会小得多。
