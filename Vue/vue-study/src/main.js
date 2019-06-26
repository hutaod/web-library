import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.prototype.$dispatch = function(eventName, data) {
  let parent = this.$parent;
  while (parent) {
    if (parent) {
      // 父元素用$emit触发
      parent.$emit(eventName, data);
      // 递归查找父元素
      parent = parent.$parent;
    } else {
      break;
    }
  }
};

new Vue({
  render: h => h(App)
}).$mount("#app");
