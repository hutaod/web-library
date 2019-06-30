function Queue(params) {
  let data = [];
  // 向队列末尾添加一个元素
  this.enqueue = function(item) {
    data.push(item);
  };
  // 移除队列头部的元素
  this.dequeue = function() {
    return data.shift();
  };
  // 返回队列头部元素
  this.head = function() {
    return data[0];
  };
  // 返回队列尾部元素
  this.tail = function() {
    return data[data.length - 1];
  };
  // 判断队列是否为空
  this.isEmpty = function() {
    return data.length === 0;
  };
  // 返回队列的大小
  this.size = function() {
    return data.length;
  };
  // 清空队列
  this.clear = function() {
    data = [];
  };
}

/**
 * 练习1：约瑟夫环（普通模式）
 * 有一个数组a[100]存放0--99；要求每隔两个数删掉一个数，到末尾时循环至开头继续进行，求最后一个被删除的数
 */

let defaultArr = [];
for (let index = 0; index < 100; index++) {
  defaultArr.push(index);
}
function lastDelNum(arr) {
  const que = new Queue();
  for (let index = 0; index < arr.length; index++) {
    que.enqueue(arr[index]);
  }
  let index = 0;
  while (que.size() > 1) {
    index++;
    const item = que.dequeue();
    if (index % 3 !== 0) {
      que.enqueue(item);
    }
  }
  console.log(index, que.size());
  return que.head();
}

console.log(lastDelNum(defaultArr));

/**
 * 练习2: 斐波拉契数列
 */

function fibonacciSequence(n) {
  if (n < 3) {
    throw new RangeError("n必须大于或等于3");
  }
  const que = new Queue();
  que.enqueue(1);
  que.enqueue(2);
  let index = 0;
  while (index < n - 3) {
    index++;
    let del_item = que.dequeue();
    let head_item = que.head();
    que.enqueue(del_item + head_item);
  }

  return que.tail();
}

console.log(fibonacciSequence(3));
console.log(fibonacciSequence(4));
console.log(fibonacciSequence(5));
console.log(fibonacciSequence(6));

/**
 * 练习3: 用队列实现栈（困难模式）
 */

function Stack() {
  let que_1 = new Queue();
  let que_2 = new Queue();
  let data_que = null; // 放数据的队列
  let empty_que = null; // 空队列，备份使用

  // 从栈顶添加元素，也叫压栈
  function init_que() {
    if (que_1.isEmpty() && que_2.isEmpty()) {
      data_que = que_1;
      empty_que = que_2;
    } else if (que_1.isEmpty()) {
      data_que = que_2;
      empty_que = que_1;
    } else {
      data_que = que_1;
      empty_que = que_2;
    }
  }

  this.push = function(item) {
    init_que();
    data_que.enqueue(item);
  };
  // 弹出栈顶元素
  this.pop = function() {
    init_que();
    while (data_que.size() > 1) {
      empty_que.enqueue(data_que.dequeue());
    }
    return data_que.pop();
  };
  // 返回栈顶元素
  this.top = function() {
    init_que();
    return data_que.head();
  };
  // 判断栈是否为空
  this.isEmpty = function() {
    init_que();
    return data_que.size() === 0;
  };
  // 返回栈的大小
  this.size = function() {
    init_que();
    return data_que.size();
  };
  // 清空栈
  this.clear = function() {
    init_que();
    data_que.clear();
  };
}
