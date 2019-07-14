// csr 和ssr统一入口
import Vue from 'vue'
import App from './client/App.vue'
import { createRouter } from './client/router'

export function createApp(context) {
  const router = createRouter()
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  })
  return { app, router }
}
