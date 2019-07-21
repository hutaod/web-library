// ssr的入口文件entry-server.js
import { createApp } from '../client/createapp'

export default context => {
  // 我们返回一个 Promise
  // 确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context)
    // 跳转到首屏的地址
    router.push(context.url)
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        // eslint-disable-next-line
        return reject({ code: 404 })
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
