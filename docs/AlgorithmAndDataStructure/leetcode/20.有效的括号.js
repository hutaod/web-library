/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  var stack = []
  var obj = {
    '(': 1,
    ')': -1,
    '[': 2,
    ']': -2,
    '{': 3,
    '}': -3,
  }
  let flag = true
  for (let i = 0; i < s.length; i++) {
    const e = s[i]
    // 判断是否是括号
    if (obj[e]) {
      if (obj[e] > 0) {
        stack.push(obj[e])
      } else if (stack.length > 0) {
        let a = stack.pop()
        if (a !== -obj[e]) {
          flag = false
          break
        }
      } else {
        flag = false
        break
      }
    }
  }
  return flag && stack.length === 0
}
// @lc code=end

console.log(isValid('(((())[]}))'))
