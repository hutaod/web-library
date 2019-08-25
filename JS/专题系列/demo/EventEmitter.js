function EventEmitter() {
  this._events = {}
}
// 向事件队列添加事件
// prepend为true表示向事件队列头部添加事件
EventEmitter.prototype.on = function(eventName, listener, prepend) {
  if (!this._events) {
    this._events = {}
  }
  if (Array.isArray(this._events[eventName])) {
    if (prepend) {
      this._events[eventName].unshift(listener)
    } else {
      this._events[eventName].push(listener)
    }
  } else {
    this._events[eventName] = [listener]
  }
}
// 向事件队列添加事件，只执行一次
EventEmitter.prototype.once = function(eventName, listener, prepend) {
  const only = (...args) => {
    const result = listener(...args)
    this.remove(eventName, only)
    return result
  }
  only.origin = listener
  this.on(eventName, only, prepend)
}
// 移除某个事件
EventEmitter.prototype.remove = function(eventName, listener) {
  if (Array.isArray(this._events[eventName])) {
    if (listener) {
      this._events[eventName] = this._events[eventName].filter(
        a => a !== listener
      )
    } else {
      delete this._events[eventName]
    }
  }
}
// 执行某类事件
EventEmitter.prototype.emit = function(eventName, ...args) {
  if (Array.isArray(this._events[eventName])) {
    this._events[eventName].forEach(cb => cb.apply(this, [...args]))
  }
}

const event = new EventEmitter()
const lister = (...args) => {
  console.log('on', args)
}
event.on('test', lister)

event.once('test', (...args) => {
  console.log('once', args)
})

setInterval(() => {
  event.remove('test', lister)
  event.emit('test', 1, 2, 3)
  // event.emit('test', 1, 2, 3)
}, 2000)
