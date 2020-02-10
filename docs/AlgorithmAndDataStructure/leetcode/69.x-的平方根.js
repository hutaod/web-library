/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * 迭代法
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  if (x === 0) {
    return x
  }
  let s = x
  while (s) {
    if (s * s <= x) {
      while (s) {
        s += 1
        if (s * s > x) {
          return s - 1
        }
      }
      return s
    }
    s >>>= 1
  }
}
// @lc code=end
