import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import About from '../pages/about'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'home', component: Home },
      { path: '/about', name: 'about', component: About }
      // ...
    ]
  })
}
