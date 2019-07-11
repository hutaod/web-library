# Js防抖和节流

## 防抖
触发事件后n秒内函数只会执行一次，如果n秒内事件再次被触发，则重新计算时间
思路：每次触发事件时都取消之前的延时调用方法
实现：
```
/**
* 
*/
function debounce(func, wait, immediate) {
  let timeout, 
      result // 返回结果
  const debounced = function() {
    let context = this;
    let args = arguments;

    if(timeout) {
      clearTimeout(timeout)
    }
  
    if(immediate) {
      if(!timeout) {
        // 立即执行时，判断wait时间内是否已执行过func
        func.call(context, args)
        // 有很多实现方法把下面这个定时器放在了if(!timeout) 判断之外
        // 我更倾向于当设置立即执行时，
        // 执行完一次后wait秒后触发func就能立即执行func，而不是上一次没
        // 有正常执行也会阻碍下一次执行
        // timeout = setTimeout(() => {
        //   timeout = null
        // }, wait)
      }
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
    } else {
      timeout = setTimeout(() => {
        func.call(context, args)
      }, wait)
    }
  }

  // 把正在等待执行的方法取消
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

}
```

## 节流
高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
思路：每次触发事件时都判断当前是否有等待执行的延时函数

## 防抖和节流局别
防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。