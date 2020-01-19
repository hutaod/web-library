/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
  if (N < 2) {
    return N
  }
  return fib(N - 1) + fib(N - 2)
}
// @lc code=end
