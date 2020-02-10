/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  var result = []
  function backtrack(list, nums, temp = []) {
    if (temp.length === nums.length) {
      return list.push([...temp])
    }
    for (var i = 0; i < nums.length; i++) {
      if (!temp.includes(nums[i])) {
        temp.push(nums[i])
        backtrack(list, nums, temp)
        temp.pop()
      }
    }
  }
  backtrack(result, nums)
  return result
}
// @lc code=end
