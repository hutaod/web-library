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
  let reg = /[\/]+/g
  path = path.replace(reg, '/').split('/')
  for (let i = 0; i < path.length; i++) {
    const p = path[i]
    if (p === '.' || p === '..') {
      if (p === '..') {
        stack.pop()
      }
    } else if (p !== '') {
      stack.push(p)
    }
  }
  return '/' + stack.join('/')
}
// @lc code=end

console.log(simplifyPath('/home/'))
