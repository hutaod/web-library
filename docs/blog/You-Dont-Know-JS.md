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
