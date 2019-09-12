# JS 常见的设计模式

## 工厂模式

工厂模式类似于现实生活中的工厂，可以生成大量相似的商品，去做同样的事情，实现同样的效果。
简单的工厂模式可以理解为用于提供解决多个相似问题的手段。

复杂的工厂模式定义是：将其成员对象的实例化推迟到子类中，子类可以重写父类接口方法以便创建的时候指定自己的对象类型。

## 单体模式

单体模式提供了一种将代码组织为一个逻辑单元的手段，这个逻辑单元中的代码可以通过单一变量进行访问。

单体模式的有点：

1. 可以用来划分命名空间，减少全局变量的数量。
2. 使用单体模式可以使代码组织更为一致，使代码容易阅读和维护。
3. 可以被实例化，且实例化一次。

什么是单体模式？单体模式是一个用来划分命名空间并将一批属性和方法，

## 模块模式

## 策略模式

## 观察者模式(发布-订阅模式)

```javascript
var shoeObj = {} // 订阅发布者
shoeObj.list = [] // 缓存列表，存放订阅者回调函数

// 增加订阅者
shoeObj.listen = function(key, fn) {
  if (!this.list[key]) {
    // 如果还没有订阅过此类消息，给该消息创建一个缓存列表
    this.list[key] = []
  }
  this.list[key].push(fn) // 订阅消息添加到缓存列表
}

// 发布消息
shoeObj.trigger = function() {
  var key = Array.prototype.shift.call(arguments) // 取出消息类型名称
  var fns = this.list[key] // 取出该消息对应的回调函数集合
  if (!fns || fns.length === 0) {
    return
  }
  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments) // arguments 是发布消息时附送的参数
  }
}

// 小白订阅如下消息
shoeObj.listen('white', function(size) {
  console.log('尺码是：' + size)
})

// 小黑订阅如下消息
shoeObj.listen('block', function(size) {
  console.log('再次打印尺码是：' + size)
})

shoeObj.trigger('white', 12)
shoeObj.trigger('block', 12)
```

运行代码如下
![2](https://raw.githubusercontent.com/ht1131589588/web-library/master/image/2.png)

下面进行发布--订阅式模式的代码封装：

```javascript
var Event = (function() {
  var list = [],
    listen,
    trigger,
    remove
  listen = function(key, fn) {
    if (!list[key]) {
      list[key] = []
    }
    if (typeof fn === 'function') {
      list[key].push(fn)
      return
    }
    throw new TypeError('error')
  }
  trigger = function() {
    let key = Array.prototype.shift.call(arguments)
    let fns = list[key]
    if (!fns || fns.length === 0) {
      return
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments)
    }
  }
  remove = function(key, fn) {
    let fns = this.list[key]
    if (!fns) {
      return
    }
    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (var i = fns.length - 1; i >= 0; i--) {
        var _fn = fns[i]
        if (_fn === fn) {
          fns.splice(i, 1)
        }
      }
    }
  }
  return {
    listen,
    trigger,
    remove
  }
})()

//测试
Event.listen('color', function(size) {
  console.log('尺码为:' + size) // 打印出尺码为123
})
Event.trigger('color', 123) // 打印出尺码为123
```

## 装饰器模式

装饰器用于扩展类或者它的属性和方法. @xxx 就是装饰器的写法， 装饰器就是一个方法

- 类装饰器: 接受 1 个参数：类的构造函数
- 属性装饰器: 接受 2 个参数：1-类的原型、2-属性名
- 方法装饰器: 接受 3 个参数：1-类的原型、2-方法名、3-方法描述

```javascript
/**
 * 类装饰器
 * @param {Function} target 构造函数
 */
function isFoo(target: any) {
  target.isFoo = true
  return target
}

/**
 * 属性装饰器
 * @param {Object} target 构造函数的原型
 * @param {String} name 属性名
 */
function mua(target: any, name: string) {
  // target 是原型, name是属性名
  target[name] = 'mua~~'
}

/**
 * 方法装饰器
 * @param {Object} target 构造函数的原型
 * @param {String} name 方法名
 * @param {Object} descriptor 方法属性描述符
 */
function dong(target: any, name: string, descriptor: any) {
  // 方法的定义方式: Object.defineProperty(target, name, descriptor)
  console.log(target[name] === descriptor.value)
  // 这里通过修改descriptor.value 扩展了bar方法
  // Object.defineProperty(target, name, {
  //   get() {},
  //   set() {},
  //   configurable: true,
  //   enumerable: true,
  //   writable: true,
  //   value: function() {}
  // })

  const bar = descriptor.value
  descriptor.value = () => {
    console.log('dong~~')
    bar()
  }
  return descriptor
}
```

推荐文章：

- [JavaScript 设计模式](http://www.cnblogs.com/tugenhua0707/p/5198407.html#_labe0)
- [JavaScript 设计模式文章列表](http://www.cnblogs.com/bfwbfw/category/1090942.html)
