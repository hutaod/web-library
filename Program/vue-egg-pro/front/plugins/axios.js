import Vue from 'vue'
import axios from 'axios'

const servce = axios.create({
  timeout: 5000,
  // 设置请求前缀
  baseURL: '/api'
})

// 拦截器 管理token
// 请求拦截
servce.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截
servce.interceptors.response.use(config => {
  return config.data
}, err => {
  return Promise.reject(err)
})

Vue.prototype.$http = servce
