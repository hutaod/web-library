function create(Con, ...args) {
  const obj = {}
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, args)
  return result ? result : obj
}

function A(name, age) {
  this.name = name
  this.age = age
};

A.prototype.hello = () => {
  console.log("hello word")
}

const a = create(A, '小明', 20)

console.log(a)

a.hello()