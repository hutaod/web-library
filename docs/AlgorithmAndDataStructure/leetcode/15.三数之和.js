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
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  const res = []
  let len = nums.length
  nums = [...nums].sort((a, b) => a - b)
  // 排序后，只有第一个数小于等于0，最后一个数大于等于0，且数组长度大于等于3才有解
  if (nums[0] <= 0 && nums[len - 1] >= 0 && len >=3) {
    for (let i = 0; i < len - 2; ) {
      // 最左值为正一定无解
      if(nums[i] > 0) {
        break
      }
      let second = i + 1
      let last = len - 1
      while (second < last) {
        result = nums[i] + nums[second] + nums[last]
        if(result === 0) {
          // 组队成功
          res.push([nums[i], nums[second], nums[last]])
        }
        if(result <= 0) {
          // 实力太弱，把second右移一位，如果second小于last，且second右移后和未移动前相等，就继续右移
          while (second < last && nums[second] === nums[++second]) {}
        } else {
          // 实力太强，把last左移一位，如果second小于last，且last左移后和未移动前相等，就继续左移
          while (second < last && nums[last] === nums[--last]) {}
        }
      }
      // 当前值和下一个值一样，直接跳过
      while (nums[i] === nums[++i]) {}
    }
  }
  return res
}
// @lc code=end

threeSum([-1, 0, 1, 2, -1, -4])
// -4,-1,-1,0,1,2

/**
 * 暴力破解法 O(n3)
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function(nums) {
//   const res = []
//   const hash = {}
//   const cache = {}
//   // const arr = nums.concat([]).sort((a, b) => a - b)
//   const arr = nums.concat([])

//   for (let i = 0; i < arr.length - 2; i++) {
//     // 每个人
//     for (let j = i + 1; j < arr.length - 1; j++) {
//       // 依次拉上其他每个人
//       for (let k = j + 1; k < arr.length; k++) {
//         // 去问剩下的每个人
//         if (arr[i] + arr[j] + arr[k] === 0) {
//           // 我们是不是可以一起组队
//           const A = [arr[i], arr[j], arr[k]]
//           const key = A.concat([])
//             .sort((a, b) => a - b)
//             .join('@')
//           if (!cache[key]) {
//             cache[key] = A
//             res.push(A)
//           }
//         }
//       }
//     }
//   }
//   return res
// }

// @lc code=start
/**
 * 暴力破解法 + 第二层缓存 O(n2)
 * @param {number[]} nums
 * @return {number[][]}
 */
// var threeSum = function(nums) {
//   const res = []
//   const hash = {}
//   const cache = {}
//   const arr = nums.concat([]).sort((a, b) => a - b)

//   for (let i = 0; i < arr.length - 1; i++) {
//     // 每个人
//     for (let j = i + 1; j < arr.length - 0; j++) {
//       let rest = 0 - arr[i] - arr[j]
//       const hashData = hash[arr[j]]
//       if (hashData !== undefined && hashData.indexs.every(a => a !== j)) {
//         // 我们是不是可以一起组队
//         const A = [...hash[arr[j]].data, arr[j]]
//         const key = A.concat([])
//           .sort((a, b) => a - b)
//           .join('@')
//         if (!cache[key]) {
//           cache[key] = A
//           res.push(A)
//         }
//       } else {
//         hash[rest] = {
//           data: [arr[i], arr[j]],
//           indexs: [i, j]
//         }
//       }
//     }
//   }
//   return res
// }
