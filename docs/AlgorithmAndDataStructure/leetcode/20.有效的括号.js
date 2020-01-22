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
  for (let i = 0; i < s.length; i++) {
    const e = s[i]
    // 判断是否是括号
    if (obj[e]) {
      if (obj[e] > 0) {
        stack.push(obj[e])
      } else if (stack.length > 0) {
        let a = stack.pop()
        if (a !== -obj[e]) {
          return false
        }
      } else {
        return false
      }
    }
  }
  return stack.length === 0
}
// @lc code=end

// 复合题目的解
// var isValid = function(s) {
//   var stack = []
//   var obj = {
//     '(': ')',
//     '[': ']',
//     '{': '}',
//   }
//   for (let i = 0; i < s.length; i++) {
//     const e = s[i]
//     // 判断是否是括号
//     if (obj[e]) {
//       stack.push(e)
//     } else if (e !== obj[stack.pop()]) {
//       return false
//     }
//   }
//   return !stack.length
// }
