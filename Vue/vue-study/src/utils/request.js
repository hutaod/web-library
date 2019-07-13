import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from './auth'

console.log(process.env.VUE_APP_BASE_API)
// 1. 创建axios实例
const service = axios.create({
  // url基础地址，解决不同数据源url变化
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间
  timeout: 5000
})

// 2. 请求拦截
service.interceptors.request.use(
  config => {
    // do something
    // 把令牌添加到请求头
    if (store.getters.token) {
      // 设置令牌请求头
      config.headers['x-token'] = getToken()
    }
    return config
  },
  error => {
    // 请求错误预处理
    // console.log(error)
    return Promise.reject(error)
  }
)

// 3. 相应拦截
service.interceptors.response.use(
  response => {
    // 仅返回数据部分
    const res = response.data
    if (res.code !== 1) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 2000
      })

      // 假设： 10008-非法令牌； 10012-其他客户端已登录； 10014-令牌过期；
      if ([10008, 10012, 10014].includes(res.code)) {
        // 重新登录
        MessageBox.confirm('登录状态异常，请重新登录', '确认登录信息', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 2000
    })
    return Promise.reject(error)
  }
)

export default service
