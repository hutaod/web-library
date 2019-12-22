;(function fn(name) {
  console.log(fn)
  return `hello ${name}`
})
// a()
console.log(fn)

// 函数表达式的函数名只能内部访问，外部作用域不能访问
