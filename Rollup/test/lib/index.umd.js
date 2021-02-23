(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rem = factory());
}(this, (function () { 'use strict';

  var sum = function sum(a, b) {
    return a + b;
  };

  console.log(sum(1, 2));

  return sum;

})));
