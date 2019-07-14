// ssr的入口文件entry-server.js
import { createApp } from '../createapp'

export default context => {
  // 我们返回一个 Promise
  // 确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context)
    // 跳转到首屏的地址
    router.push(context.url)
    router.onReady(() => {
      resolve(app)
    }, reject)
  })
}
