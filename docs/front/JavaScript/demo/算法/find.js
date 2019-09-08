const linerSearch = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i
    }
  }
  return -1
}

function binarySearch(arr, target) {
  let max = arr.length - 1
  let min = 0
  while (min <= max) {
    let mid = Math.floor((max + min) / 2)
    if (target < arr[mid]) {
      max = mid - 1
    } else if (target > arr[mid]) {
      min = mid + 1
    } else {
      return mid
    }
  }
  return -1
}

// 快速生成数组
// Object.keys(Array.from({ length: 100 }))
// Object.keys(Array.apply(null, { length: 100 }))
// Object.keys(Array.from({ length: 100 })).map(function(item) {
// 	return +item;
// });

const arr = Object.keys(Array.from({ length: 10000000 }))
const start = Date.now()
console.log('start')
linerSearch(arr, '5000000')
console.log(Date.now() - start)
binarySearch(arr, '5000000')
console.log(Date.now() - start)
binarySearch(arr.indexOf('5000000'))
console.log(Date.now() - start)
