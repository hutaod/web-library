import Vue from "vue";
import App from "./App.vue";
import create from "./utils/create";
import router from './router'

Vue.config.productionTip = false;

// 向所有父元素发布事件
Vue.prototype.$dispatch = function(eventName, data) {
  let parent = this.$parent;
  // 查找父元素
  while (parent) {
    // 父元素用$emit触发
    parent.$emit(eventName, data);
    // 递归查找父元素
    parent = parent.$parent;
  }
};

// 广播给所有监听事件的子元素
Vue.prototype.$boardcast = function(eventName, data) {
  boardcast.call(this, eventName, data);
};

function boardcast(eventName, data) {
  this.$children.forEach(child => {
    // 子元素触发$emit
    child.$emit(eventName, data);
    if (child.$children.length) {
      // 递归调用，通过call修改this指向 child
      boardcast.call(child, eventName, data);
    }
  });
}

// Bus: 事件派发、监听和回调管理
class Bus {
  constructor() {
    this.callbacks = [];
  }

  $on(name, fn) {
    this.callbacks[name] = this.callbacks[name] || [];
    this.callbacks[name].push(fn);
  }

  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args));
    }
  }
}

Vue.prototype.$bus = new Bus();
Vue.prototype.$create = create;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
