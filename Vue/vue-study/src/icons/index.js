import Vue from 'vue'
import SvgIcon from '@/components/svg-icon'

Vue.component('svg-icon', SvgIcon)

// 第一个参数是目录，第二个参数为false表面svg文件夹不会再嵌套其他文件夹
// 第三个参数为匹配规则
const req = require.context('./svg', false, /\.svg$/)
// req.keys() 为 ['qq.svg', 'wx.svg']
req.keys().map(req)
