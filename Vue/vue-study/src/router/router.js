import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List'
import Detail from '../views/Detail'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      // {
      //   path: "list",
      //   component: List,
      //   props: { testName: "world" }
      // },
      {
        path: 'list',
        component: List,
        props: route => ({
          query: route.query
        })
      },
      {
        path: 'detail/:id',
        component: Detail,
        props: true
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    meta: { auth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter: (to, from, next) => {
      console.log(2)
      next()
      // ...
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL
})

router.addRoutes(routes)

// 守卫元素
router.beforeEach((to, from, next) => {
  console.log(1)
  // 要访问需要登录权限的页面时的判断
  if (to.meta.auth && !window.isLogin) {
    if (window.confirm('请登录')) {
      window.isLogin = true
      next() // 登录成功， 继续
    } else {
      next('/') // 放弃登录，回首页
    }
  } else {
    next() // 不需要登录， 继续
  }
})

export default router
