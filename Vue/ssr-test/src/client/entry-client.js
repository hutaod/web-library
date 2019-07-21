import { createApp } from './createapp'

const { app, router } = createApp()
router.onReady(() => {
  console.log(app)
  app.$mount('#app')
})
