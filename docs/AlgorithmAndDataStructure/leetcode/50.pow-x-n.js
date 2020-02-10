/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * 迭代方式
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (n === 0) {
    return 1
  }
  if (n < 0) {
    x = 1 / x
    n = -n
  }
  let result = 1
  while (n) {
    if (n & 1) {
      result *= x
    }
    if (n === 1) {
      return result
    }
    x *= x
    n >>>= 1
  }
}
// @lc code=end

/**
 * 递归方式
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
  if (x === 0) {
    return 0
  }
  if (n === 0) {
    return 1
  }
  if (n < 0) {
    return 1 / myPow(x, -n)
  }
  if (n & 1) {
    return x * myPow(x, n - 1)
  }
  return myPow(x * x, n / 2)
}
