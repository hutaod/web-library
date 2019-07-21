let name = '122' // 类型推论
let title: string = 'hello' // 类型注解

name = '22'
// name = {}

// let name2
// name2 = '123'
// name2 = {}

let a: symbol
a = Symbol()

title = 'world'

// 数组类型
// let names: string[]
// names = ['tom', 2]

// 任意类型
// let foo: any = '123'
// foo = [122, 22, { a: 23 }]

// 类型用于函数 必须有返回值
function greeting(person: string): string {
  return '1'
}

// 必须无返回值 后面不写：void 就是不控制返回值
function warnUser(msg: string): void {
  // return '1'
}

// 多种类型
// let multiType: string | number
// multiType = '1'
// multiType = 3

// 类似枚举类型
// let multiType2: 1 | 2 // 只能为 1 或者 2
// multiType2 = 2

greeting('1')

export { name, title, greeting, warnUser }

// 内置类型
// string number boolean void any

// 函数参数如果声明，默认就是必选参数
// ?: 可选参数
function sayHello(name: string, age?: number): string {
  console.log(name, age)
  return name + age
}

sayHello('tom', 20)

// 重载： 通过参数或返回值类型或个数区别同名参数，先声明，再实现
// 声明1
function info(a: object): string
// 声明2
function info(a: string): object
// 实现
function info(a: any): any {
  if (typeof a === 'object') {
    return a.name
  } else {
    return {
      name: a
    }
  }
}

console.log(info({ name: 'tom' }))
console.log(info('tom'))
// console.log(info(123)) 报错

// class
class MyComp {
  // 访问修饰符private、public、protected
  // private fooo: string // 私有属性，不能在类的外部访问
  // private bar: string // 保护属性
  // readonly mua = 'mua' // 只读属性

  constructor(private fooo: string, public bar: string) {
    // this.fooo = foo
    // this.bar = bar
  }

  get foo() {
    return this.fooo
  }

  set foo(val) {
    this.fooo = val
  }

  // get muaa() {
  //   return this.mua
  // }
}

const mc = new MyComp('123', '234')
console.log(mc.foo)

interface Person {
  name: string
  say(): any
}

class Student implements Person {
  constructor(public name: string) {}

  public say() {
    console.log(this.name)
  }
}

function greeting2(person: Person) {
  return person.say()
}
const stu = new Student('hello')

greeting2(stu)

interface Feature {
  id: number
  name: string
}

// 不用泛行
// interface Result {
//   ok: 0 | 1
//   data: Feature[]
// }

// 泛型
interface Result<T> {
  ok: 0 | 1
  data: T[]
}
