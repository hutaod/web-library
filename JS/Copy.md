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
