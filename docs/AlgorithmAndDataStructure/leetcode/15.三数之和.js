/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let result = []
  let cache = {}
  let arr = []
  let rest = 0
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i] // 一个
    rest = rest - current // 剩余2值之和
    const second = cache[rest] // 剩余2值之和是否存在
    if (second !== undefined) {
      // 剩余两个之和是否存在就寻找第三个
      for (let j = i + 1; j < nums.length; j++) {
        const third = nums[j]
        if (third === -second) {
          arr = [current, second, third]
        }
      }
    }
    cache[current] = i
    if (arr.length === 3) {
      result.push(arr)
    }
  }
  return result
}
// @lc code=end
