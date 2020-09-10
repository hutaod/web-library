function deepClone(target, map = new Map()) {
  if (typeof target === "object" && target !== null) {
    if (map.get(target)) {
      return map.get(target);
    }
    if (target instanceof Date) {
      return new Date(target);
    }
    if (target instanceof RegExp) {
      return new RegExp(target);
    }
    // 用于让克隆的对象继承原型链上的属性
    const cloneObj = new target.constructor();
    map.set(target, cloneObj);
    for (let key in target) {
      // 只可能自身的属性，不可能原型链上的属性
      if (target.hasOwnProperty(key)) {
        cloneObj[key] = deepClone(target[key], map);
      }
    }
    return cloneObj;
  }
  return target;
}

var a = {
  name: "haha",
  func: () => {},
  arr: [1, 2, 4]
};

a.parent = a;
const b = deepClone(a);
console.log(a, b);
// a.arr.push(3);
// a.parent = null;
// console.log(a, b);

// 测试new a.constructor();
// function A() {
//   this.name = 123;
//   this.hello = () => {};
// }

// A.prototype.haha = () => {
//   console.log("haha");
// };

// var a = new A();

// for (let key in a) {
//   if (a.hasOwnProperty(key)) {
//     console.log(key);
//   } else {
//     console.log(111, key);
//   }
// }
// const a1 = new a.constructor();
// a1.haha();
// console.log(a1.haha);
