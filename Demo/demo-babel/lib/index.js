"use strict";

require("@babel/polyfill");

var isHas = [1, 2, 3].includes(2);
var p = new Promise(function (resolve, reject) {
  resolve(100);
});