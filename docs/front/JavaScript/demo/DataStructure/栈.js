// 数组清空方式
/**
        1. arr.splice(0) // 不会改变原数组，速度最慢
        2. arr.length = 0 // 不会改变原数组，现代浏览器基本上无延迟
        3. arr = [] // 速度最快，但会改变原数组
      */
function Stack() {
  let data = [];
  // 从栈顶添加元素，也叫压栈
  this.push = function(item) {
    data.push(item);
  };
  // 弹出栈顶元素
  this.pop = function() {
    return data.pop();
  };
  // 返回栈顶元素
  this.top = function() {
    return data[data.length - 1];
  };
  // 判断栈是否为空
  this.isEmpty = function() {
    return data.length === 0;
  };
  // 返回栈的大小
  this.size = function() {
    return data.length;
  };
  // 清空栈
  this.clear = function() {
    data = [];
  };
  //
  this.min = function() {};
}

// 判断字符串里括号是否合法
function handleCheckBrackets(str) {
  const stack = new Stack();
  for (let index = 0; index < str.length; index++) {
    const cur = str[index];
    // 遇到左括号入栈
    if (cur === "(") {
      stack.push(cur);
    } else if (cur === ")") {
      // 遇到右括号，判断栈是否为空
      if (stack.isEmpty()) {
        return false;
      }
      stack.pop(); // 弹出左括号
    }
  }

  // 如果栈为空，说明字符串括号合法
  return stack.isEmpty();
}

function calcExp(array) {
  let stack = new Stack();
  try {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      // 遇到数字入栈
      if (typeof element === "number") {
        stack.push(element);
      } else if (["+", "-", "*", "/"].indexOf(element) >= 0) {
        if (stack.size() < 2) {
          throw new Error("参数错误");
        }
        // 遇到 运算符 连续出栈
        let a = stack.pop();
        let b = stack.pop();
        // 计算出结果并压入栈中
        stack.push(parseInt(eval(b + element + a)));
      }
    }
  } catch (error) {
    console.warn(error);
  }
  // 返回栈顶元素
  // console.log(stack.size());
  return stack.top();
}

console.log(calcExp([1, 2, "/", "+"]));


function minStack() {
  const stack = new Stack()
  const min_stack = new Stack()
  this.push = function(item) {
    stack.push(item)
    if(min_stack.size() === 0 || min_stack.top() > item) {
      min_stack.push(item)
    } else {
      min_stack.push(min_stack.top())
    }
  }
  this.pop() = function () {
    stack.pop()
    min_stack.pop()
  }
  this.min() = function() {
    return min_stack.top()
  }
}