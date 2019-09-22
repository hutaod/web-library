import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'

const service = axios.create({
  timeout: 5000,
  // 设置请求前缀
  baseURL: '/api'
})

const TOKEN_KEY = 'HT_TOKEN';

// 拦截器 管理token，路由跳转
// 请求拦截
export default ({ store, redirect }) => {
  // 方法会自动执行
  service.interceptors.request.use(config => {
    // 请求添加token
    const token = localStorage.getItem(TOKEN_KEY)
    if(token) {
      // Bearer不加也可以
      config.headers.common.Authorization = 'Bearer ' + token
    }
    return config
  }, err => {
    return Promise.reject(err)
  })
  
  // 响应拦截
  service.interceptors.response.use(async response => {
    const { data, config } = response
    // if(data.data && data.data.token) {
    //   store.
    // }
    await console.log('测试拦截')
    if(data.code === 0) {
      if(config.url === '/api/user/login') {
        localStorage.setItem(TOKEN_KEY, data.data.token)
      }
    } else if(data.code === -666) {
      console.log('拦截器知道过期了');
      MessageBox.confirm('登录过期了','过期',{
        confirmButtonText: '登录',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        localStorage.removeItem(TOKEN_KEY)
        redirect({ path: '/login' })
      })
    }
    return data
  }, err => {
    return Promise.reject(err)
  })
}

Vue.prototype.$http = service

export const http = service