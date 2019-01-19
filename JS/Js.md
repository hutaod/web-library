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
![error](https://raw.githubusercontent.com/ht1131589588/web-library/master/image/error1.png)
