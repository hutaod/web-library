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
  // 递归方式 暴力解法
  // if (N < 2) {
  //   return N
  // }
  // return fib(N - 1) + fib(N - 2)

  // 递归方式 利用缓存优化
  // const cache = {}
  // function fibFn(N) {
  //   if (N < 2) {
  //     return N
  //   }
  //   // 利用缓存可以有效的减少执行栈
  //   let prev1 = cache[N - 1] || fibFn(N - 1)
  //   let prev2 = cache[N - 2] || fibFn(N - 2)
  //   let res = prev1 + prev2
  //   cache[N] = res
  //   return res
  // }
  // return fibFn(N)

  // 递推方式 O(n)
  const fibArr = [0, 1]
  for (let i = 2; i <= N; i++) {
    fibArr[i] = fibArr[i - 2] + fibArr[i - 1]
  }
  return fibArr[N]
}
// @lc code=end
