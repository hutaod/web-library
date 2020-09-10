const priority = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2
}

function transformToRpn(exp) {
  const stack = [] // 存放符号 (、+、-、*、/
  const after_stack = [] // 存放后缀表达式
  for (let i = 0; i < exp.length; i++) {
    const str = exp[i];
    // 如果是数字直接放入stack中
    if(!isNaN(str)) {
      after_stack.push(Number(str))
    } else if(str === '(') {
      // 左括号入栈
      stack.push(str)
    } else if(str === ')') {
      // 左括号出栈
      while (stack[stack.length - 1] !== '(') {
        // 把算术运算符加入
        after_stack.push(stack.pop())
      }
      // 左括号出栈
      stack.pop()
    } else {
      // 处理运算符

      // 处理符号优先级
      const top = stack[stack.length - 1]
      // 优先级高的先放到after_stack
      while(
        stack.length &&
        ['+', '-', '*', '/'].indexOf(top) >= 0 &&
        priority[top] >= priority[str]
      ) {
        after_stack.push(stack.pop())
      }
      stack.push(str)
    }
  }

  while(stack.length) {
    after_stack.push(stack.pop())
  }
  return after_stack
}

const execFuncMap = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => Math.trunc(a / b),
}

function execExp(exp) {
  const stack = [] // 用于计算
  const after_stack = transformToRpn(exp) // 获取后缀表达式
  for (let i = 0; i < after_stack.length; i++) {
    const str = after_stack[i];
    if(execFuncMap[str]) {
      // 如果是运算符，把前两个数字拿出来进行计算
      const num2 = Number(stack.pop())
      const num1 = Number(stack.pop())
      const exec_num = execFuncMap[str](num1, num2)
      stack.push(exec_num)
    } else {
      // 数字直接入栈
      stack.push(str)
    }
  }
  return stack[0]
}

execExp("1+2*3+2")

var evalRPN = function(tokens) {
  const stack = [] // 用于计算
  // 计算方法
  const execFuncMap = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => Math.floor(a / b),
  }
  for (let i = 0; i < tokens.length; i++) {
      const str = tokens[i];
      if(execFuncMap[str]) {
          // 如果是运算符，把前两个数字拿出来进行计算
          const num2 = Number(stack.pop())
          const num1 = Number(stack.pop())
          const exec_num = execFuncMap[str](num1, num2)
          stack.push(exec_num)
      } else {
          // 数字直接入栈
          stack.push(str)
      }
  }
  return stack[0]
};

evalRPN(["2","1","+","3","*"])