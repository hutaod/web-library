/**
 * 节流
 * @param {Function} func
 * @param {Number} wait
 * @param {Object} options
 *  leading：false 表示禁用第一次执行
 *  trailing: false 表示禁用停止触发的回调
 */
function throttle(
  func,
  wait,
  options = {
    leading: true,
    trailing: true
  }
) {
  var timeout,
    context,
    args,
    result,
    previous = 0;

  var throttled = function() {
    var now = new Date().getTime();
    var overTime = wait - (now - previous); //剩余时间
    context = this;
    args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    if (overTime <= 0 && options.leading !== false) {
      previous = now;
      result = func.call(context, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        // if (options.trailing !== false) {
        //   timeout = null;
        // }
        timeout = null;
        result = func.call(context, args);
      }, overTime);
    }

    return result;
  };

  return throttled;
}

const test = throttle(() => [console.log(1)], 2000);

let i = 0;
const interval = setInterval(() => {
  test();
  i++;
  if (i >= 100) {
    clearInterval(interval);
  }
}, 100);
