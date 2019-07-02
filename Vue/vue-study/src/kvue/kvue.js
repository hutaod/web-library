// new KVue({});

class KVue {
  constructor(options) {
    this.$options = options;
    if (typeof options.data === "function") {
      this.$data = options.data();
    } else {
      this.$data = options.data;
    }

    // 劫持监听所有属性
    this.observe(this.$data);

    new Compiler(options.el, this);

    // 生命周期
    if (options.created) {
      options.created.call(this);
    }
  }

  // 劫持监听所有属性
  observe(obj) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    // 遍历对象
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key]);
      // 代理到vm上
      this.proxyData(key);
    });
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 将Dep.target 添加到dep中
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          dep.notify();
        }
      }
    });

    // 递归
    this.observe(val);
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    });
  }
}

let uid = 0;

// 发布者
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.map(sub => sub.update());
  }
}

// 观察者
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;
    this.vm[this.key]; // 触发key属性的get 添加watcher到dep
    Dep.target = null;
  }

  update() {
    // 更新属性触发回调，回调函数进行更新
    this.cb.call(this.vm, this.vm[this.key]);
  }
}

// new Complie(el, vm)
// 解析指令、插值表达式、事件等
class Compiler {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
      // 提取宿主中模板内容到Fragment标签，dom操作会提高效率
      this.$fragment = this.nodeToFragment(this.$el);
      // 编译模板内容，同时进行依赖收集
      this.compile(this.$fragment);
      // 把Fragment放入dom
      this.$el.appendChild(this.$fragment);
    }
  }

  // 把真实dom转移到虚拟dom(Fragment)里
  nodeToFragment(el) {
    const fragment = document.createDocumentFragment();
    let child;
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 判断节点类型
      if (node.nodeType === 1) {
        // element元素节点
        console.log("编译元素节点名称：" + node.nodeName);
        this.compileElement(node);
      } else if (this.isInterpolation(node)) {
        // 插值表达式
        console.log("编译插值文本：" + node.textContent);
        this.compileText(node);
      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  compileElement(node) {
    // <div k-model="foo"></div>
    // <div k-text="test"></div>
    // <div @click="onClick"></div>
    let nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      // 是否时指令
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2);
        // 执行指令对应的方法
        this[dir] && this[dir](node, this.$vm, exp);
      }
      // 是否是事件
      if (this.isEvent(attrName)) {
        const event = attrName.substring(1);
        this.eventHandler(node, this.$vm, exp, event);
      }
    });
  }

  // 检查是否是k-指令
  isDirective(attrName) {
    return attrName.indexOf("k-") === 0;
  }

  isEvent(attrName) {
    return attrName.indexOf("@") === 0;
  }

  compileText(node) {
    this.update(node, this.$vm, RegExp.$1.trim(), "text");
  }

  // k-text 指令
  text(node, vm, exp) {
    this.update(node, vm, exp, "text");
  }

  // k-html 指令
  html(node, vm, exp) {
    this.update(node, vm, exp, "html");
  }

  // k-model 指令
  model(node, vm, exp) {
    // data => view
    this.update(node, vm, exp, "model");

    // view => data
    node.addEventListener("input", e => {
      vm[exp] = e.target.value;
    });
  }

  // 首次更新视图 并添加watcher
  update(node, vm, exp, dir) {
    console.log(node, dir);
    let updaterFn = this[dir + "Updater"];

    updaterFn && updaterFn(node, vm[exp]);

    // 依赖收集 当数据更改时再次更新对应试图
    new Watcher(vm, exp, function(value) {
      updaterFn && updaterFn(node, value);
    });
  }

  textUpdater(node, value) {
    node.textContent = value;
  }

  htmlUpdater(node, value) {
    node.innerHtml = value;
  }

  modelUpdater(node, value) {
    node.value = value;
  }

  // 事件处理 获取实例methods里面的方法并执行
  eventHandler(node, vm, exp, event) {
    const fn = vm.$options.methods && vm.$options.methods[exp];
    if (event && fn) {
      node.addEventListener(event, fn.bind(vm));
    }
  }
}
