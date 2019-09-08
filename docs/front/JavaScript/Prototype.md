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
