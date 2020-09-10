/*
 * @lc app=leetcode.cn id=150 lang=javascript
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start
/**
 * @param {string[]} tokens
 * @return {number}
 */
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
// @lc code=end

evalRPN(['1', '3', '*', '5'])