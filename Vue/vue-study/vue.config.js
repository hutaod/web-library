const path = require('path')
// const bodyParser = require('body-parser')

function resolve(dir) {
  // 获取绝对路径
  return path.join(__dirname, dir)
}

const port = 7080
const title = 'vue项目最佳实践'

module.exports = {
  publicPath: 'best-practice',
  devServer: {
    port,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        // 如果后端服务托管在虚拟主机的时候，也就是一个IP对应多个域名，需要通过域名区分服务，
        // 那么参数changeOrigin必须为true(默认为false)，这样才会传递给后端正确的Host头，
        // 虚拟主机才能正确回应。否则http-proxy-middleware会原封不动将本地HTTP请求发往后端，
        // 包括Host: localhost而不是Host: httpbin.org，只有正确的Host才能使用虚拟主机，
        // 不然会返回404 Not Found。
        // 参考https://marskid.net/2018/01/14/webpack-devserver-proxy/
        changeOrigin: true, // 要不要改变origin头（request头的Host等信息）
        pathRewrite: {
          // 地址重写
          [`^${process.env.VUE_APP_BASE_API}`]: '/api'
        }
      }
    }
    // before: app => {
    //   app.use(bodyParser.json())
    //   // app.use(
    //   //   bodyParser.urlencoded({
    //   //     extended: true
    //   //   })
    //   // )

    //   // 登录接口
    //   app.post('/dev-api/user/login', (req, res) => {
    //     const { username } = req.body
    //     if (username === 'admin' || username === 'ht') {
    //       res.json({
    //         code: 1,
    //         data: username
    //       })
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: '用户或密码错误'
    //       })
    //     }
    //   })

    //   // 获取用户信息
    //   app.get('/dev-api/user/info', (req, res) => {
    //     // 从请求头中获取令牌
    //     // adwd;adwdwd;dwdww
    //     // 令牌头    令牌头            哈希
    //     // 加密算法  用户信息：有效期
    //     const roles =
    //       req.headers['x-token'] === 'admin' ? ['admin'] : ['editor']
    //     res.json({
    //       code: 1,
    //       data: roles
    //     })
    //   })
    // }
  },
  configureWebpack: {
    name: title
  },
  chainWebpack(config) {
    // svg规则配置，排除icons目录
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 新增icons规则，设置svg-sprite-loader
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' }) // 使用图片的名称
      .end()
  }
}
