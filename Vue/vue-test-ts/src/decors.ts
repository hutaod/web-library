// 装饰器模式

/**
 * 类装饰器
 * @param {Function} target 构造函数
 */
function isFoo(target: any) {
  // target 是构造函数
  console.log(target, Foo)
  // console.log(target === Foo) // true 这时候还获取不到FOO
  // 判断是否作为装饰器
  if (target === Foo) {
    target.isFoo = true
  } else {
    target.isFoo = false
  }

  return target
}

/**
 * 属性装饰器
 * @param {Object} target 构造函数的原型
 * @param {String} name 属性名
 */
function mua(target: any, name: string) {
  // target 是原型, name是属性名
  console.log(target, Foo)
  // console.log(target === Foo.prototype)
  target[name] = 'mua~~'
}

/**
 * 方法装饰器
 * @param {Object} target 构造函数的原型
 * @param {String} name 方法名
 * @param {Object} descriptor 方法描述
 */
function dong(target: any, name: string, descriptor: any) {
  // target是原型, name是方法名, descriptor是描述符
  // console.log(target === Foo.prototype)
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

@isFoo
class Foo {
  @mua
  public aaa!: string
  constructor() {
    console.log('Foo构造函数')
  }
  @dong
  public bar() {
    console.log('bar~')
  }
}

const foo = new Foo()
console.log(foo.aaa)
console.log(foo.bar())
// console.log(Foo.isFoo)

export {}
