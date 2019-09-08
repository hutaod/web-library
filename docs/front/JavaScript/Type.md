# 类型

## 原始类型

在 js 中，存在 6 中原始值，分别是：

- `boolean`
- `null`
- `undefined`
- `number`
- `string`
- `symbol`

原始类型存储的都是值，是没有函数可以调用的，比如`undefined.toString()`会直接报错。
注意点：

- `'1'.toString()`或者`false.toString()`等可以用的原因是被强制转换成了 String 类型也就是对象类型，所以可以调用 `toString` 函数。
- 对于`null`来说，很多人会认为它是个对象类型，其实是错误的。`typeof null` 会输出 `object`，这只是 JS 存在的一个悠久 Bug。注: 在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，`000`开头代表是对象，然而 `null` 表示为全零，所以将它错误的判断为 `object` 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 对象类型

    除了原始类型，其他的都是对象类型。

对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址。

## typeof vs instanceof

`typeof`：对于原始类型，除了 `null` 都可以显示正确的类型；对于对象类型来说，除了函数都会显示 object。

`instanceof`：用于测试构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

`Symbol.hasInstance`：用于自定义判断某对象是否为某构造器的实例。即用于自定义 `instanceof` 操作符在某个类上的行为。

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
  }
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
