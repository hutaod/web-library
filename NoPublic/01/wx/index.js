const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const conf = require('./conf')
app.use(bodyParser())
const router = new Router()
app.use(static(__dirname + '/'))
const axios = require('axios')

// 插件处理消息
const wechat = require('co-wechat')
router.all(
  '/wechat',
  wechat(conf).middleware(async (message) => {
    console.log('wechat:', message)
    return 'Hello World ' + message.Content
  })
)

// 处理消息原理
// const xml2js = require('xml2js')
// const url = require('url')
// const crypto = require('crypto')
// const xmlParser = require('koa-xml-body')
// app.use(xmlParser())
// router.get('/wechat', (ctx) => {
//   console.log('微信认证...', ctx.url)
//   const { query } = url.parse(ctx.url, true)
//   const {
//     signature, // 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
//     echostr, // 随机字符串 正确的话返回该字段
//     timestamp, // 时间戳
//     nonce // 随机数
//   } = query
//   console.log(query)

//   // 将 token timestamp nonce 三个参数进行字典序排序并用sha1加密
//   let str = [conf.token, timestamp, nonce].sort().join('')
//   console.log('str', str)
//   let strSha1 = crypto
//     .createHash('sha1')
//     .update(str)
//     .digest('hex')

//   console.log(`自己加密后的字符串为：${strSha1}`)
//   console.log(`微信传入的加密字符串为：${signature}`)
//   console.log(`两者比较结果为：${signature == strSha1}`)

//   // 签名对比，相同则按照微信要求返回echostr参数值
//   if (signature === strSha1) {
//     ctx.body = echostr
//   } else {
//     ctx.body = '不是微信'
//   }
// })
// // 接收消息
// router.post('/wechat', (ctx) => {
//   const { xml: msg } = ctx.request.body
//   console.log('Receive:', msg)
//   const builder = new xml2js.Builder()
//   const result = builder.buildObject({
//     xml: {
//       ToUserName: msg.FromUserName,
//       FromUserName: msg.ToUserName,
//       CreateTime: Date.now(),
//       MsgType: msg.MsgType,
//       Content: 'Hello ' + msg.Content
//     }
//   })

//   ctx.body = result
// })
// 处理消息原理结束

// 不用插件情况下获取access_token
const tokenCache = {
  access_token: '',
  updateTime: Date.now(),
  expires_in: 7200
}

router.get('/getToken', async (ctx) => {
  const wxDomain = `https://api.weixin.qq.com`
  const path = '/cgi-bin/token'
  const param = `?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`
  const url = wxDomain + path + param
  const res = await axios.get(url)
  // console.log(res.data)
  Object.assign(tokenCache, res.data, {
    updateTime: Date.now()
  })
  ctx.body = res.data
})

// router.get('/getFollowers', async (ctx) => {
//   const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
//   const res = await axios.get(url)
//   console.log('getFollowers:', res)
//   ctx.body = res.data
// })

const { ServerToken } = require('./mongoose')

// 使用插件情况下自动获取access_token，调用封装好的微信api接口
const WechatAPI = require('co-wechat-api')
// 自动获取acess_token
const api = new WechatAPI(
  conf.appid,
  conf.appsecret,
  // 自定义取Token
  async () => await ServerToken.findOne(),
  // 自定义存Token
  async (token) => await ServerToken.updateOne({}, token, { upsert: true })
)
router.get('/getFollowers', async (ctx) => {
  let res = await api.getFollowers() // 获取用户userId
  // 获取用户详细信息
  res = await api.batchGetUsers(res.data.openid, 'zh_CN')
  ctx.body = res
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())
app.listen(3000)
