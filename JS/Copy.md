# 深浅拷贝

## 浅拷贝常用方法：

- `Object.assign`
- 通过展开运算符 `...` 来实现浅拷贝

## 深拷贝

通常可以用 `JSON.parse(JSON.stringify(object))` 来进行深拷贝。
但方法有局限性。

- 会忽略值为 undefined 和 symbol 的属性, 和键为 symbol 的属性
- 会忽略函数
- 不能解决循环引用的对象

## 实现一个深拷贝

```javascript
/**
 * 是否是正常对象
 * @param {any} obj
 */
function isNormalObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 是否是数组
 * @param {any} obj
 */
var isArray =
  Array.isArray ||
  function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

/**
 * 深度拷贝函数
 * @param { Object } elements
 */
function deepCopy(elements) {
  // 判断是否是数组和普通对象
  if (!isArray(elements) && !isNormalObj(elements)) {
    return elements
  }

  var newElements = isArray(elements) ? [] : {}

  for (var key in elements) {
    newElements[key] = deepCopy(elements[key])
  }

  return newElements
}
```

[测试代码](./demo/copy.js)
