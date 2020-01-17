# 类型

JavaScript 定义了 8 种内建类型：

- `null`
- `undefined`
- `boolean`
- `number`
- `object`
- `symbol` -- 在 es6 中被加入
- `bigint` -- es6+ 被加入

注意点：

- 在 JS 中，变量是没有类型的，值才有类型。变量可以在任何时候，持有任何值

## 原始类型（基本类型）

在 js 中，除了 `object` 都是原始类型，存在 7 种原始值，分别是：

- `boolean`
- `null`
- `undefined`
- `number`
- `string`
- `symbol`
- `bigint`

原始类型存储的都是值，是没有函数可以调用的，比如`undefined.toString()`会直接报错。
注意点：

- `'1'.toString()`或者`false.toString()`等可以用的原因是被强制转换成了 String 类型也就是对象类型，所以可以调用 `toString` 函数。
- 对于`null`来说，很多人会认为它是个对象类型，其实是错误的。`typeof null` 会输出 `object`，这只是 JS 存在的一个悠久 Bug，而且好像永远不会也不会被修复，因为有太多已经存在的 web 的内容依存着这个 bug。注: 在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000`开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 对象类型

    除了原始类型，其他的都是对象类型。

对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址。

### Array

在 JS 中 Array 的一些注意事项：

- 在一个 `array` 值上使用 `delete` 将会从这个 `array` 上移出一个值槽，但是就算`delete`的是最后一个元素，它也不会更新 `length` 的属性，所以要多加小心。
- `array`也是对象，可以在它上面添加 `string` 属性，但是这些属性不会计算在 `array` 的 `length` 中，但需要注意：如果一个可以被强制转换为 10 进制 `numver` 的 `string`被用作键的话，它会认为你想使用 `number` 索引而不是一个 `string`

结论：一般来说，向 `array` 添加 `string` 属性不是一个好主意，最好使用 `object` 来处理有键/属性形式的值，而将 array 专用于严格地数字索引的值。

### 类 Array 对象

常见的类 array 对象：

- [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

## typeof

`typeof`总是返回一个字符串，所以：

```js
typeof typeof 42 // "string"
```

总结性的一句话：`typeof`对于原始类型，除了 `null` 都可以显示正确的类型；对于对象类型来说，除了函数都会显示 object。

注意点：

- `typeof` 作用于 `function` 时，结果为 `function`，很容易认为 JS 中`function`是一直顶层的内建类型，然而它实际上是对象（object）的"子类型"。因此，一个函数也被称为"可调用对象"————一个拥有 [[Call]] 内部属性、允许被调用的对象。
- 当对一个未声明的变量使用 `typeof` 时，`typeof` 上的安全防卫机制在特定的情况下非常有用（防止抛出错误）。

## instanceof

`instanceof`用于测试构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。

`Symbol.hasInstance`用于自定义判断某对象是否为某构造器的实例。即用于自定义 `instanceof` 操作符在某个类上的行为。

```javascript
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance)
  }
}
console.log([] instanceof MyArray) // true
```

## 类型转换

JS 中类型转换只有三种情况：

- 转换为布尔值
- 转换为数字
- 转换为字符串

对象转换为原始类型时，先调用 `valueof()` ，如果没有返回原始类型，再调用 `toString()`，如果两者都没有返回原始类型，就会报错。
如果重写了`Symbol.toPrimitive`，就会直接调用该方法。

    Symbol.toPrimitive指将被调用的指定函数值的属性转换为相对应的原始值。如果定义后就不会再调用`valueof()`和`toString()`方法

```javascript
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  },
}
1 + a // => 3
```

注意点：在条件判断时，除了 undefined、null、false、NaN、 ''、 0、 -0，其他所有值都转为 true，包括所有对象。虽然 [] == false 的结果为 true，但是在 if 判断语句时 [] 依然会转为为 true

## 四则运算符

1. 加法运算符：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

2. 其他运算符:

- 只要其中一方是数字，那么另一方就会被转为数字

## 比较运算符

1. 如果是对象，就通过 toPrimitive 转换对象
2. 如果是字符串，就通过 unicode 字符索引来比较
