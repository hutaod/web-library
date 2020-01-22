/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
  let stack = []
  path = path.split('/')
  let len = path.length
  for (let i = 0; i < len; i++) {
    const p = path[i]
    if (p === '..') {
      stack.pop()
    } else if (p !== '' && p !== '.') {
      stack.push(p)
    }
  }
  return '/' + stack.join('/')
}
// @lc code=end

console.log(simplifyPath('/home/'))
