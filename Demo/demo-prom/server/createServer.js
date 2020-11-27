'use strict'

const path = require('path')
const Koa = require('koa')

const detectPort = require('./utils/detectPort')
const staticMiddle = require('./staticMiddle')

/**
 * 创建server
 * @param {{ wwwroot: string; port: number }} params
 * wwwroot-server根目录设置 port-端口号设置 默认 9000
 */
async function createServer({ wwwroot = '', port = 7000 }) {
  // 创建一个Koa实例
  const app = new Koa()

  // 创建静态服务器
  app.use(staticMiddle(wwwroot))

  const IP = '127.0.0.1'
  let PORT = await detectPort(port, IP)
  // 把中间件压入队列，等待执行
  app.listen(PORT, () => {
    console.log(`server at http://${IP}:${PORT}`)
  })
}

module.exports = createServer
