// 暴力解法 - 2
// function threeSum(nums) {
//   const res = []
//   const cache = {}
//   nums = [...nums]
//   nums.sort((a, b) => a - b)
//   for (let i = 0; i < nums.length; i++) {
//     const a = nums[i];
//     let target = a;
//     let obj = {}
//     for (let j = i + 1; j < nums.length; j++) {
//       const c = obj[nums[j] + target]
//       if(c !== undefined) {
//         const key = `${a}_${nums[c]}_${nums[j]}`
//         if(!cache[key]) {
//           const arr = [a, nums[c], nums[j]]
//           res.push(arr)
//           cache[key] = arr
//         }
//       }
//       obj[-nums[j]] = j
//     }
//   }
//   return res
// }

// 暴力解法
// function threeSum(nums) {
//   const res = {}
//   for (let i = 0; i < nums.length - 2; i++) {
//     const a = nums[i];
//     for (let j = i + 1; j < nums.length - 1; j++) {
//       const b = nums[j];
//       for (let k = j + 1; k < nums.length; k++) {
//         const c = nums[k];
//         if(a + b + c === 0) {
//           const arr = [a, b, c].sort()
//           res[`${arr[0]}_${arr[1]}_${arr[2]}`] = arr
//         }
//       }
//     }
//   }
//   return Object.values(res)
// }

// 最优解
// /**
//  * @param {number[]} nums
//  * @return {number[][]}
//  */
// var threeSum = function(nums) {
//   const res = []
//   let len = nums.length
//   nums = [...nums].sort((a, b) => a - b)
//   // 排序后，只有第一个数小于0，最后一个数大于0，且数组长度大于等于3才有解
//   if (nums[0] <= 0 && nums[len - 1] >= 0 && len >=3) {
//     for (let i = 0; i < len - 2; ) {
//       // 最左值为正一定无解
//       if(nums[i] > 0) {
//         break
//       }
//       let second = i + 1
//       let last = len - 1
//       while (second < last) {
//         result = nums[i] + nums[second] + nums[last]
//         if(result === 0) {
//           // 组队成功
//           res.push([nums[i], nums[second], nums[last]])
//         }
//         if(result <= 0) {
//           // 实力太弱，把second右移一位，如果second小于last，且second右移后和未移动前相等，就继续右移
//           while (second < last && nums[second] === nums[++second]) {}
//         } else {
//           // 实力太强，把last左移一位，如果second小于last，且last左移后和未移动前相等，就继续左移
//           while (second < last && nums[last] === nums[--last]) {}
//         }
//       }
//       // 当前值和下一个值一样，直接跳过
//       while (nums[i] === nums[++i]) {}
//     }
//   }
//   return res
// }


// console.log(threeSum([[0,0,0]]))

/**
 * 全排列 - 迭代式解法一（结果因为顺序不一致而不会通过leetcode）
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let res = []
  let len = nums.length; // 数组长度
  let restLen = nums.length - 1; // 数组后续需要补充的长度
  for (let i = 0; i < len; i++) {
    // 生成当前数据开头的数组列表，并把每个数组第一位填充为自身
    const resN = Array.from({ length: restLen }, () => [nums[i]])
    // 组合开始填充用的数据在nums的指针位置
    let start = i;
    while (true) {
      // 大于restLen指针就指向0
      if(start >= restLen) {
        start = 0
      } else {
        // 否则自增
        start++
      }
      // 当指针等于自身时，说明已经遍历完剩下所有的数据了，跳出循环
      if(start === i) {
        break
      }
      // 拷贝获取子指针，子指针从当前子真开始
      let a = start
      // 索引
      let j = 0;
      while (true) {
        if(j >= restLen) {
          break
        }
        if(start === 1) {
          console.log(start, j, nums[a], a)
        }
        resN[j].push(nums[a])
        
        if(a >= restLen) {
          a = 0
          if(a === i) {
            a++
          }
        } else {
          a++
          if(a === i) {
            a++
            if(a >= restLen) {
              a = 0
            }
          }
        }
        j++
      }
    }
    res.push(...resN)
  }
  return res
};

/**
 * 全排列 - 迭代式解法二
 * @param {number[]} nums
 * @return {number[][]}
 */
// var permute = function(nums) {
//   // let res = []
//   // let len = nums.length; // 数组长度
//   // let restLen = nums.length - 1; // 数组后续需要补充的长度
//   // for (let i = 0; i < len; i++) {
//   //   // 生成当前数据开头的数组列表，并把每个数组第一位填充为自身
//   //   const resN = Array.from({ length: restLen }, () => [nums[i]])
//   //   // 组合开始填充用的数据在nums的指针位置
//   //   let start = i;
//   //   while (true) {
//   //     // 大于restLen指针就指向0
//   //     if(i === 0) {
//   //       if(start >= restLen) {
//   //         start = 0
//   //       } else {
//   //         // 否则自增
//   //         start++
//   //       }
//   //     } else {
//   //       if(start <= 0) {
//   //         start = restLen
//   //       } else {
//   //         // 否则自增
//   //         start--
//   //       }
//   //     }
//   //     // 当指针等于自身时，说明已经遍历完剩下所有的数据了，跳出循环
//   //     if(start === i) {
//   //       break
//   //     }
//   //     // 拷贝获取子指针，子指针从当前子真开始
//   //     let a = start
//   //     // 索引
//   //     let j = 0;
//   //     while (true) {
//   //       if(j >= restLen) {
//   //         break
//   //       }
//   //       resN[j].push(nums[a])

//   //       if(a >= restLen) {
//   //         a = 0
//   //         if(a === i) {
//   //           a++
//   //         }
//   //       } else {
//   //         if(++a === i) {
//   //           if(++a >= restLen) {
//   //             a = 0
//   //           }
//   //         }
//   //       }
//   //       j++
//   //     }
//   //   }
//   //   res.push(...resN)
//   // }
//   // return res
//   let res = []
//   let len = nums.length; // 数组长度
//   let restLen = nums.length - 1; // 数组后续需要补充的长度
//   for (let i = 0; i < len; i++) {
//     // 生成当前数据开头的数组列表，并把每个数组第一位填充为自身
//     const resN = Array.from({ length: restLen }, () => [nums[i]])
//     // 组合开始填充用的数据在nums的指针位置
//     let start = i;
//     while (true) {
//       // 大于restLen指针就指向0
//       if(start >= restLen) {
//         start = 0
//       } else {
//         // 否则自增
//         start++
//       }
//       // 当指针等于自身时，说明已经遍历完剩下所有的数据了，跳出循环
//       if(start === i) {
//         break
//       }
//       // 拷贝获取子指针，子指针从当前子真开始
//       let a = start
//       // 索引
//       let j = 0;
//       while (true) {
//         if(j >= restLen) {
//           break
//         }
//         resN[j].push(nums[a])

//         if(a <= 0) {
//           a = restLen
//           if(a === i) {
//             a--
//           }
//         } else {
//           if(--a === i) {
//             if(--a <= 0) {
//               a = restLen
//             }
//           }
//         }
//         j++
//       }
//     }
//     res.push(...resN)
//   }
//   return res
// };
console.log(permute([1, 2, 3]))