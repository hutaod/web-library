/**
 * @name 滑动窗口、指针
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
  let left = 1
  let right = 2
  const res = []
  while (left < right) {
    // 求和
    const sum = (left + right) * (right - left + 1) / 2
    if (sum === target) {
      // 生成数组
      res.push(Array.from({ length: right - left + 1 }, (_, i) => left + i))
      left++
    } else if(sum < target) {
      right++
    } else {
      left++
    }
  }
  return res
};
// /**
//  * @name 暴力解法
//  * @param {number} target
//  * @return {number[][]}
//  */
// var findContinuousSequence = function(target) {
//     const res = []
//     let start = 1
//     let sum = 0
//     const maxStart = (target / 2)
//     const maxNext = maxStart + 1
//     while (start < maxStart) {
//         let next = start + 1;
//         sum = start + next;
//         const arr = [start, next]
//         if (sum >= target) {
//             if(sum === target) {
//                 res.push(arr)
//             }
//         } else {
//             while (sum <= target && next < maxNext) {
//                 if (sum === target) {
//                     res.push(arr)
//                     break;
//                 }
//                 if (sum > target) {
//                     break;
//                 }
//                 next++
//                 arr.push(next)
//                 sum += next;
//             }
//         }
//         start ++
//     }
//     return res
// };