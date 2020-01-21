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
  const res = []
  const cache = {}
  // 排队，最左边是最小的，最右边是最大的
  const arr = nums.concat([]).sort((a, b) => a - b)

  // 排序后，如果最大值大于0切最小值小于0才会有解
  if (arr[0] <= 0 && arr[arr.length - 1] >= 0) {
    if (arr.length >= 3 && arr[0] === 0 && arr[arr.length - 1] === 0) {
      return [[0, 0, 0]]
    }
    for (let i = 1; i < arr.length - 1; i++) {
      // c 位人选
      let first = 0
      let last = arr.length - 1
      if (arr[first] > 0 || arr[last] <= 0) {
        break
      }
      while (first < last) {
        let result = arr[i] + arr[first] + arr[last]
        if (result === 0 && i !== first && first !== last && i !== last) {
          // 我们是不是可以一起组队
          const A = [arr[i], arr[first], arr[last]]
          const key = A.concat([])
            .sort((a, b) => a - b)
            .join('@')
          if (!cache[key]) {
            cache[key] = A
            res.push(A)
          }
        }
        if (result <= 0 && first < i) {
          // 实力太弱，把菜鸟右移一位
          ++first // 如果相等就跳过
        } else if (result > 0 && last > i) {
          // 实力太强，把大神左移一位
          --last // 如果相等就跳过
        } else {
          break // 某一边已经没有人选了
        }
      }
    }
  }
  console.log(res)

  return res
}
// @lc code=end

threeSum([0, 0, 0, 0])

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
