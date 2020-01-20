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
  const result = []
  var obj = {}
  const cache = {}
  for (let i = 0; i < nums.length - 2; i++) {
    rest = 0 - nums[i] // 剩余2数之和
    for (var j = i + 1; j < nums.length - 1; j++) {
      // 另一个值
      var otherIndex = obj[rest - nums[j]]
      // 另一个值存在于obj中，就返回剩余另一个值的索引
      if (otherIndex !== undefined) {
        let arr = [nums[i], nums[j], nums[otherIndex]].sort((a, b) => a - b)
        let key = arr.join('-')
        if (!cache[key]) {
          cache[arr.join('-')] = arr
          result.push(arr)
        }
      }
      // 另一个值不存在于obj中，就把值作为key，索引作为值存入obj
      obj[nums[j]] = j
    }
  }
  return result
}
// @lc code=end
