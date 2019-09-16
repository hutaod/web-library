function Stack() {
  var items = []
  // 添加元素
  this.push = (item) => {
    items.push(item)
  }
  // 弹出栈顶元素
  this.pop = () => {
    return items.pop()
  }
  // 查看栈顶元素
  this.top = () => {
    return items[item.length - 1]
  }
  // 获取栈的大小
  this.size = () => {
    return items.length
  }
  // 判断栈是否为空
  this.isEmpty = () => {
    return items.length === 0
  }
  // 清空栈
  this.clear = () => {
    item.length = 0
  }
}

// 判断字符串括号是否成对出现
function isLegalBracket(str) {
  let stack = new Stack()
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i])
    }
    if (str[i] === ')') {
      if (stack.isEmpty()) {
        return false
      }
      stack.pop()
    }
  }
  if (!stack.isEmpty()) {
    return false
  }
  return true
}

// 测试 isLegalBracket
console.log(isLegalBracket('()()))'))
console.log(isLegalBracket('aaa(ww(ee(fd)fs)rwqq)123'))
console.log(isLegalBracket('()()sd()(sd()fw))('))

// 逆波兰表达式
function calcExp(array) {
  var stack = new Stack()
  let res
  var operators = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/'
  }
  for (let i = 0; i < array.length; i++) {
    if (!operators[array[i]]) {
      // 如果元素不是 `+ - * /` 中的某一个，就压入栈中
      stack.push(array[i])
    } else {
      // 如果元素是 `+ - * /` 中的某一个
      let element2 = stack.pop()
      let element1 = stack.pop()
      if (element1 && element2) {
        res = eval(element1 + array[i] + element2)
        stack.push(res)
      } else {
        return 'err'
      }
    }
  }
  return res
}

// 测试 calcExp
console.log(calcExp(['4', '10', '5', '/', '+']))
console.log(
  calcExp(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'])
)
