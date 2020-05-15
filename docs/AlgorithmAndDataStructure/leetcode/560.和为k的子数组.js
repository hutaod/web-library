/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为K的子数组
 */

// @lc code=start
/**
 * 优化解法
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  if (nums.length === 0) {
    return 0
  }
  let map = { 0: 1 }
  let prefixSum = 0
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i]
    if (map[prefixSum - k]) {
      count += map[prefixSum - k]
    }
    if (map[prefixSum]) {
      map[prefixSum]++
    } else {
      map[prefixSum] = 1
    }
  }
  return count
}
// @lc code=end

subarraySum([1, 1, 1], 2)
/**
 * 暴力解法，回溯+迭代
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// var subarraySum = function(nums, k) {
//   let start = 0
//   let res = 0
//   while (start < nums.length) {
//     let sum = 0
//     for (let i = start; i < nums.length; i++) {
//       const cur = nums[i]
//       if (sum + cur === k) {
//         res += 1
//       }
//       sum += cur
//     }
//     start += 1
//   }
//   console.log(res)
//   return res
// }
