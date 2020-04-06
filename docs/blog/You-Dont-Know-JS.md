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
