# JS进阶

## 手写call、apply和bind函数

call实现：
```
Function.prototype.myCall = function(context){
    // 判断调用者是否是一个函数
	if(typeof this !== "function"){
		throw new TypeError("Error");
	}
    // 判断上下文(context)是否是对象类型或者函数或者undefined
    // 如果不是的话，就进行类型处理，把基础类型转换成对象类型
	if(typeof context !== "undefined" && typeof context !== "object" && typeof context !== "function"){
		var type = typeof context;
        // 首字母大写
        type = type.charAt(0).toUpperCase()+type.substr(1);
        if(type === "Symbol"){
            // Symbol类型时进行处理，不处理的最后context就会为window
            // 实际中call中进行了处理
        } else {
            context = new window[type](context);
        }
	}
    // 如果context是null,或者undefined时就为window
	context = context || window;
	context.fn = this;
	const args = [...arguments].splice(1);
	const result = context.fn(...args);
	delete context.fn;
	return result
}
```

apply实现：
```
Function.prototype.myApply = function(context){
    // 判断调用者是否是一个函数
	if(typeof this !== "function"){
		throw new TypeError("Error");
	}
    // 判断上下文(context)是否是对象类型或者函数或者undefined
    // 如果不是的话，就进行类型处理，把基础类型转换成对象类型
	if(typeof context !== "undefined" && typeof context !== "object" && typeof context !== "function"){
		var type = typeof context;
        // 首字母大写
        type = type.charAt(0).toUpperCase()+type.substr(1);
        if(type === "Symbol"){
            // Symbol类型时进行处理，不处理的最后context就会为window
            // 实际中call中进行了处理
        } else {
            context = new window[type](context);
        }
	}
    // 如果context是null,或者undefined时就为window
	context = context || window;
	context.fn = this;
    var result;
    if(arguments[1]){
        result = context.fn(...arguments[1]);
    } else {
        result = context.fn();
    }
	delete context.fn;
	return result
}
```

bind实现：
```
Function.prototype.myBind = function(context){
	if(typeof this !== "function"){
		throw new TypeError("Error");
	}
	const _this = this;
	const args = [...arguments].splice(1);
	return function F() {
		// if(this instanceof F){
			// return new _this(...args,...arguments);
		// }
        console.log(this instanceof F);
		return _this.apply(context,args.concat(...arguments));
	}
}
```

## new
在调用 `new` 的过程中会发生四件事情：
1. 新生成一个对象
2. 链接到原型
3. 绑定this
4. 返回新对象

根据上面几个过程，实现一个 `new`:
```
function create(){
    let obj = {};//创建一个空对象
    let Con = [].shift.call(arguments); //获取构造函数
    if(!Con || (typeof Con !== "function")){
        throw new TypeError("error");
    }
    obj.__proto__ = Con.prototype; //设置空对象的原型
    let result = Con.apply(obj,arguments); //执行构造函数，把this绑定到新对象上。并把移除构造函数后的所有参数传递给构造函数当参数
    return result instanceof Object ? result: obj; //确保返回值为对象。确保构造函数内部是否有返回值
}
```

## instanceof原理
instanceof可以正确的判断对象的类型， 因为内部机制是通过判断对象的原理链中是否能找到类型的prototype。
手写实现instanceof
```
function myInstanceof(child, parent){
    let prototype = parent.prototype;// 获取类型(构造函数)的原型
    let proto = child.__proto__;// 对象的原型链
    while(true){ //递归判断对象的原型是否等于类型的原型
        if(proto === null || proto === undefined){ //如果不存在原型链返回false
            return false
        }
        if(prototype === proto){ //如果类型的原型存在于对象的原型链上返回true
            return true;
        }
        proto = proto.__proto__;// 递归获取对象的原型链
    }
}
```

## 为什么0.1+0.2!=0.3?
原因：
因为 JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题。这句话我感觉很官方，大多数可能并不知道IEEE 754是什么，它一种二进制浮点数算术标准。
详细点来说，`0.1+0.2`时，中间进行了浮点数转换成2进制。
```
// 0.0001 1001 1001 1001…（1001无限循环）
// 0.2 => 0.0011 0011 0011 0011…（0011无限循环）
```
0.1 在二进制中是无限循环的一些数字，其实不只是 0.1，其实很多十进制小数用二进制表示都是无限循环的。但是 JS 采用的浮点数标准却会裁剪掉我们的数字。所以这些循环的数字被裁剪了，就会出现精度丢失的问题，也就造成了 0.1 不再是 0.1 了，而是变成了 0.100000000000000002。
```
(0.1).toString(2) // 0.0001100110011001100110011001100110011001100110011001101
(0.2).toString(2) // 0.001100110011001100110011001100110011001100110011001101
0.100000000000000002 === 0.1 // true
0.200000000000000002 === 0.2 // true
0.1 + 0.2 === 0.30000000000000004 //true
```
那为什么 console.log(0.1) 能正确打印出0.1？因为在输入内容的时候，二进制被转换为了十进制，十进制又被转换为了字符串，在这个转换的过程中发生了取近似值的过程，所以打印出来的其实是一个近似值。
```
console.log(0.100000000000000002) // 0.1
```
解决方法：
parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true

## 垃圾回收机制
问题：V8下的垃圾回收机制是怎么样的？
V8实现了准确式GC，GC算法采用了分代式垃圾回收机制。因此，V8将内存（堆）分为新生代和老生代两部分。

### 新生代算法
新生代中的对象一般存活时间比较短，使用Scavenge GC 算法。
新生代空间，内存空间分成两份，分别为from空间和to空间。在这两个空间中，必定有一个空间是使用的，另外一个空间是空闲的。新分配的对象会放在from空间中，当from空间被占满时，新生代GC就会启动了，算法会检查from空间中存活的对象并复制到to空间，如果有失活的对象就会销毁。当完成复制后将from空间与to空间互换。GC结束。

### 老生代算法
老生代中的对象一般存活时间比较长且数量也多，使用两个算法，标记清除算法和标记压缩算法。
什么情况下对象会出现在老生代空间中：
* 新生代的对象是否已经经历过一次Scavenge算法，如果经历过的话，会将对象从新生代空间移到老生代空间中。
* To空间的对象占比超过25%时，为了不影响到内存分配，会将对象从新生代空间移到老生代空间中。

老生代的空间很复杂：
```
enum AllocationSpace {
  // TODO(v8:7464): Actually map this space's memory as read-only.
  RO_SPACE,    // 不变的对象空间
  NEW_SPACE,   // 新生代用于 GC 复制算法的空间
  OLD_SPACE,   // 老生代常驻对象空间
  CODE_SPACE,  // 老生代代码对象空间
  MAP_SPACE,   // 老生代 map 对象
  LO_SPACE,    // 老生代大空间对象
  NEW_LO_SPACE,  // 新生代大空间对象

  FIRST_SPACE = RO_SPACE,
  LAST_SPACE = NEW_LO_SPACE,
  FIRST_GROWABLE_PAGED_SPACE = OLD_SPACE,
  LAST_GROWABLE_PAGED_SPACE = MAP_SPACE
};
```

以下情况会先启动标记清除算法：
* 某一空间没有分块的时候
* 空间中被对象超过一定限制
* 空间不能保证新生代中的对象移动到老生代中

在这个阶段，会遍历堆中所有的对象，然后标记活的对象，在标记完成后，销毁所有未被标记的对象。在标记大型对象时，可能需要几百毫秒才能完成一次标记，这会导致一些性能问题。为了解决这个问题，2011年，V8从stop-the-world标记切换到增量标志。在增量标记期间，GC将标记工作分解成更小的模块，可以让JS应用逻辑在模块间隙执行一会，从而不导致应用出现停顿的情况。但在2018年，GC技术又一次重大突破，这项技术名为并发标记。该技术可以让GC扫描标记对象时，同时允许JS运行。
清除对象后会造成堆内存出现碎片的情况，当碎片超过一定限制后会启动压缩算法。在压缩的过程中，将活的对象向一端移动，直到所有对象都移动完成后清理掉不需要的内存。
