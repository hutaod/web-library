// a.js
console.log('a模块start')

undeclaredVariable = 'a模块未声明变量'

const b = require('./b')

console.log('a模块加载完毕: b.test值：', b.test)

exports.test = 1
