function Person() {}

var person = new Person()
console.log(1, person)
console.log(2, person.__proto__)
console.log(3, Person.prototype)
console.log(4, Person.prototype === person.__proto__)
console.log(5, Person.prototype.constructor === Person)

// 获取对象的原型方式
// 1. person.__proto__
// 2. Object.getPrototypeOf(person)
console.log(6, Object.getPrototypeOf(person) === Person.prototype)

person.__proto__ = null
// 当改变__proto__时，__proto__会被重置为未定义，Object.getPrototypeOf(person) 为null
console.log(7, person.__proto__, Object.getPrototypeOf(person))

Object.setPrototypeOf(person, { name: 123 })
console.log(8, person.__proto__, Object.getPrototypeOf(person)) // true
