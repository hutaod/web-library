/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * 位运算解法，关键点：异或
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let temp = 0
  for (let i = 0; i < nums.length; i++) {
    temp ^= nums[i]
  }
  return temp
}
// @lc code=end

/**
 * 暴力解法
 * @param {number[]} nums
 * @return {number}
 */
// var singleNumber = function(nums) {
//   for(let i = 0; i< nums.length; i++) {
//     if(nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) {
//         return nums[i]
//     }
//   }
// };
