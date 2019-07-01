new KVue({});
class KVue {
  constructor(options) {
    this.$options = options;

    this.$data = options.data;

    // 响应化
    this.observe(this.$data);
  }

  observe(value) {
    if (!value || typeof value !== "object") {
      return;
    }
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key]);
    });
  }

  defineReactive(obj, key, val) {
    this.observe(val);
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
        }
      }
    });
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(watcher) {
    this.deps.push(watcher);
  }

  notify() {
    this.deps.forEach(watcher => watcher.update());
  }
}

// 保存ui中依赖， 实现update函数可以更新之
class Watcher {
  constructor(vm, key) {
    this.vm = vm;
    this.key = key;

    // 将当前实例指向Dep.target
    Dep.target = this;
  }

  update() {
    console.log(`${this.key}属性更新了`);
  }
}
