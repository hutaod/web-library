/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var obj = {}
  for (var i = 0; i < nums.length; i++) {
    // 另一个值
    var otherIndex = obj[target - nums[i]]
    // 另一个值存在于obj中，就返回剩余另一个值的索引
    if (otherIndex !== undefined) {
      return [i, otherIndex].sort((a, b) => a - b)
    }
    // 另一个值不存在于obj中，就把值作为key，索引作为值存入obj
    obj[nums[i]] = i
  }
}
// @lc code=end
