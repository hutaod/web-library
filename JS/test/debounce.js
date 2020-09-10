// 定时器实现
// function debounce(func, wait) {
//   let timeout
//   return (...args) => {
//     if(timeout) {
//       clearTimeout(timeout)
//     }
//     timeout = setTimeout(() => {
//       timeout = null
//       func.apply(this, args)
//     }, wait)
//   }
// }

// Date实现
function debounce(func, wait) {
  let lastTime = 0
  return (...args) => {
    const now = Date.now()
    if(now - lastTime > wait) {
      func.apply(this, args)
    }
    lastTime = now
  }
}

function hello() {
  console.log("hello word")
}

const helloDebounce = debounce(hello, 1000)

// setInterval(() => {
//   helloDebounce()
// }, 1000);

function throttle(func, wait) {
  let lastTime = 0
  return (...args) => {
    const now = Date.now()
    if(now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

const helloThrottle = throttle(hello, 1000)

setInterval(() => {
  helloThrottle()
}, 20);
