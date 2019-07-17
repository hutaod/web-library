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

var a = {
  name: 'zhangsan',
  school: {
    university: 'shanghai'
  },
  hobby: ['篮球', '足球'],
  classmates: [
    {
      name: 'lisi',
      age: 22
    },
    {
      name: 'wangwu',
      age: 21
    }
  ],
  getName: function() {
    return this.name
  }
}

const b = deepCopy(a)

b.name = 'lisi'
b.age = 24
b.school.highSchool = 'jiangsu'
b.hobby.push('🏃')
b.classmates[0].age = 25

console.log(a.getName())
console.log(b.getName())

a.getName = function() {
  return 'H ' + this.name
}

console.log(a.getName())
console.log(b.getName())

console.log(JSON.stringify(a))
console.log(JSON.stringify(b))
