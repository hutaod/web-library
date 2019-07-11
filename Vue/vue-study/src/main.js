import Vue from 'vue'
import App from './App.vue'
// import create from './utils/create'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// import store from "./hstore";

import router from './router'
// import router from "./hrouter";

// 加入图标
import './icons'

// 路由守卫
import './permission'

// 自定义指令
import premission from './directive/premission'
Vue.directive('premission', premission)

Vue.config.productionTip = false

// // 向所有父元素发布事件
// Vue.prototype.$dispatch = function(eventName, data) {
//   let parent = this.$parent
//   // 查找父元素
//   while (parent) {
//     // 父元素用$emit触发
//     parent.$emit(eventName, data)
//     // 递归查找父元素
//     parent = parent.$parent
//   }
// }

// // 广播给所有监听事件的子元素
// Vue.prototype.$boardcast = function(eventName, data) {
//   boardcast.call(this, eventName, data)
// }

// function boardcast(eventName, data) {
//   this.$children.forEach(child => {
//     // 子元素触发$emit
//     child.$emit(eventName, data)
//     if (child.$children.length) {
//       // 递归调用，通过call修改this指向 child
//       boardcast.call(child, eventName, data)
//     }
//   })
// }

// // Bus: 事件派发、监听和回调管理
// class Bus {
//   constructor() {
//     this.callbacks = []
//   }

//   $on(name, fn) {
//     this.callbacks[name] = this.callbacks[name] || []
//     this.callbacks[name].push(fn)
//   }

//   $emit(name, args) {
//     if (this.callbacks[name]) {
//       this.callbacks[name].forEach(cb => cb(args))
//     }
//   }
// }

// Vue.prototype.$bus = new Bus()
// Vue.prototype.$create = create

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
