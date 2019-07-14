import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import About from '../pages/about'
Vue.use(Router)

export function createRouter() {
  return new Router({
    routes: [
      { path: '/', component: Home },
      { path: '/kkb', component: About }
      // ...
    ]
  })
}
