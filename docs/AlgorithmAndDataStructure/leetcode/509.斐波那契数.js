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
  const fibArr = [0, 1]
  for (let i = 2; i <= N; i++) {
    fibArr[i] = fibArr[i - 2] + fibArr[i - 1]
  }
  return fibArr[N]
}
// @lc code=end
