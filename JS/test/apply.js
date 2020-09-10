function apply(func, args) {
  func()
}

Function.prototype.myApply = function (content = window, args) {
  const func = this;
  // 如果content已经有名为func的方法，就备份
  let funcBak = null;
  if(content.func) {
    funcBak = content.func
  }
  content.func = func
  const res = content["func"](...args)
  delete content.func
  // 欢迎备份方法
  if(funcBak) {
    content.func = funcBak
  }
  return res
}

Function.prototype.myCall = function (content = window, ...args) {
  const func = this;
  // 如果content已经有名为func的方法，就备份
  let funcBak = null;
  if(content.func) {
    funcBak = content.func
  }
  content.func = func
  const res = content["func"](...args)
  delete content.func
  // 欢迎备份方法
  if(funcBak) {
    content.func = funcBak
  }
  return res
}

Function.prototype.myBind = function (content = window, ...args1) {
  const func = this;
  return function F(...args2) {
    if (this instanceof F) {
      this.__func__ = func
      const res = this["__func__"](...args1, ...args2)
      delete this.__func__
      return res
    } else {
      content.__func__ = func
      const res = content.__func__(...args1, ...args2)
      delete content.__func__
      return res
    }
  }
}

var a = {
  name: '哈哈哈'
}

function test(...args) {
  console.log(this.name, args)
}

test.myCall(a, [123, 22])