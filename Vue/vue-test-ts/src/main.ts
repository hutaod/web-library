import Vue from 'vue'
import App from './App.vue'
import './ts-test'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
