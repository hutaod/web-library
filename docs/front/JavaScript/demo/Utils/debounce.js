/**
 * 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {Number} wait 等待时间
 * @param {Boolean} immediate 是否立即执行 默认false
 */
export function debounce(func, wait, immediate) {
  var timeout, // 定时器变量
    result; // 返回结果

  var debounced = function() {
    var context = this;
    var args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate) {
      if (!timeout) {
        // 立即执行时，判断wait时间内是否已执行过func
        result = func.apply(context, args);
        // 有很多实现方法把下面这个定时器放在了if(!timeout) 判断之外
        // 我更倾向于当设置立即执行时，
        // 执行完一次后wait秒后触发func就能立即执行func，而不是上一次没
        // 有正常执行也会阻碍下一次执行
        // timeout = setTimeout(() => {
        //   timeout = null
        // }, wait)
      }
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }

    return result;
  };

  // 把正在等待执行的方法取消
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
