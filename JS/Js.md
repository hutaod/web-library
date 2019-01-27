# [类型](./Type.md)
1. [原始类型](./Type.md#原始类型)
2. [对象类型](./Type.md#原始类型)
3. [typeof和instanceof](./Type.md#typeof和instanceof)
4. [类型转换](./Type.md#类型转换)
5. [四则运算符](./Type.md#四则运算符)
6. [比较运算符](./Type.md#比较运算符)

# [this](./This.md)
* 直接声明的函数默认是指向`window`,一个对象上声明的函数，默认是指向该对象。函数的`this`默认指向改函数的调用者
* 非箭头函数的情况下，哪怕一个函数声明的地方在一个对象的某个方法内部，也默认指向`window`。
* 对于`new`方式实例化的方法，`this`永远被绑定到了该对象上,不会被任何方式所改变。
* 箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`，对箭头函数使用 `bind` 这类函数是无效的
* `bind` 中 `this` 取决于第一个参数,如果第一个参数为空,那么就是 `window` 。如果对一个函数进行多次 `bind`, 该函数的 `this` 只取决于第一次的 `bind`。
  
# [闭包](./This.md)
定义：函数A内部有一个函数B,函数B可以访问到函数A中的变量，那么函数B就是闭包。

    闭包存在的意义就是让我们可以间接访问函数内部的变量。

# [深浅拷贝](./Copy.md)
1. [浅拷贝常用方法](./Copy.md#浅拷贝常用方法)
2. [深拷贝](./Copy.md#深拷贝)

# [原型链](./Prototype.md)
1. 原型就是一个对象,并且这个对象中包含了很多函数。结论：对于 `obj` 来说，可以通过 `__proto__` 找到y一个原型对象, 在该对象中定义了很多函数让我们使用。
2. 原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型，但是并不是所有函数都具有这个属性，Function.prototype.bind() 就没有这个属性。
3. 原型链就是多个对象通过 __proto__ 的方式连接了起来。为什么 obj 可以访问到 valueOf 函数，就是因为 obj 通过原型链找到了 valueOf 函数。

# [ES6](./ES6.md)
1. [var、let及const区别](./ES6.md#var、let及const区别)
2. [原型继承和Class继承](./ES6.md#原型继承和Class继承)
3. [模块化](./ES6.md#模块化)

# [JS异步编程](./Async.md)
1. 并发与并行
2. 回调函数
3. Generator
4. Promise
5. async及await
6. 常用定时器函数

# [Promise](./Promise.md)
1. [Promise理解](./Promise.md#Promise理解)
2. [Promise对象方法](./Promise.md#Promise对象方法)
3. [Promise的静态方法](./Promise.md#Promise的静态方法)
4. [手写实现Promise](./Promise.md#手写实现Promise)
