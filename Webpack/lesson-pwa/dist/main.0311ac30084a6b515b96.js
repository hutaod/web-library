(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */
/***/ (function(module, exports) {

console.log('hello, haiyang');

if ('serviceWorker' in navigator) {
  //如果浏览器支持serviceWorker，就执行以下代码
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      //注册成功
      console.log('service-worker registed');
    }).catch(error => {
      //没注册成功
      console.log('service-worker register error');
    });
  });
}

/***/ })
],[[0,1]]]);
//# sourceMappingURL=main.0311ac30084a6b515b96.js.map