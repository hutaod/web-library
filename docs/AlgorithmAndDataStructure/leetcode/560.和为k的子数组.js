/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为K的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let start = 0
  let res = 0
  while (start < nums.length) {
    let sum = 0
    for (let i = start; i < nums.length; i++) {
      sum += nums[i]
      if (sum >= k) {
        if (sum === k) {
          res += 1
        }
        console.log(sum, start, i)
        if (i < nums.length - 1) {
          sum -= nums[start]
          start = i - 1 > start ? i - 1 : start + 1
        } else {
          console.log('结束')
          start = nums.length
        }
        break
      }
    }
  }
  console.log(res)
  return res
}
// @lc code=end

subarraySum([1, 1, 1], 2)
