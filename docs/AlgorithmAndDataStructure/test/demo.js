/**
 * 1. 两数之和
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	// 暴力解法，双层循环
	// let length = nums.length
	// for (let index = 0; index < length; index++) {
	//   const num = nums[index];
	//   let start = 1
	//   while (start < length - index) {
	//     if(num + nums[start+index] === target) {
	//       return [index, start+index]
	//     }
	//     start++
	//   }
	// }
	// 经典解法，用obj缓存数据和索引
	var obj = {}
	for (var i = 0; i < nums.length; i++) {
		var otherIndex = obj[target - nums[i]]
		if (otherIndex !== undefined) {
			return [i, otherIndex].sort((a, b) => a - b)
		}
		obj[nums[i]] = i
	}
}
const nums = [3, 2, 4], target = 6
// console.log(twoSum(nums,target));

/**
 * 2. 整数反转
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  // js种常见解法
  if(x === 0){
    return 0
  }
  let preFix = x < 0 ? '-' : ''
  const num = Number(Math.abs(x).toString().split("").reverse().join(""))
  const res = Number(preFix + num);
  if(res < (-2)**31 || res > 2**31 - 1) {
    return 0
  }
  return res
};
console.log(reverse(123))