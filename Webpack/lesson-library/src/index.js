class App {
  handles = {
    effectError: []
  }

  on(type, callback) {
    if (!this.handles[type]) {
      this.handles[type] = []
    }
    this.handles[type].push(callback)
  }

  off(type, callback) {
    if (this.handles[type]) {
      this.handles = this.handles[type].filters(item => item !== callback)
    }
  }

  emit(type, ...rest) {
    if (this.handles[type]) {
      this.handles[type].forEach(cb => cb(...rest))
    }
  }
}

module.exports = new App()