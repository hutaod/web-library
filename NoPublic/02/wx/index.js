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

const { ServerToken, ClientToken } = require('./mongoose')
// 使用插件情况下自动获取access_token，调用封装好的微信api接口
const WechatAPI = require('co-wechat-api')
// 自动获取access_token
const api = new WechatAPI(
  conf.appid,
  conf.appsecret,
  // 自定义取Token
  async () => await ServerToken.findOne(),
  // 自定义存Token
  async (token) => await ServerToken.updateOne({}, token, { upsert: true })
)

const OAuth = require('co-wechat-oauth')
const oauth = new OAuth(
  conf.appid,
  conf.appsecret,
  async function(openid) {
    return await ClientToken.getToken(openid)
  },
  async function(openid, token) {
    return await ClientToken.setToken(openid, token)
  }
)

/**
 * 生成用户URL
 */
router.get('/wxAuthorize', async (ctx, next) => {
  const state = ctx.query.id
  console.log('state...' + state)
  console.log('ctx...' + ctx.href)
  let redirectUrl = ctx.href
  redirectUrl = redirectUrl.replace('wxAuthorize', 'wxCallback')
  // 授权方式：
  // 1. 用户授权snsapi_userinfo（弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
  // 2. 静默授权snsapi_base（不弹出授权页面，直接跳转，只能获取用户openid）
  const scope = 'snsapi_userinfo'
  // 获取授权页面的URL地址
  const url = oauth.getAuthorizeURL(redirectUrl, state, scope)
  console.log('url ' + url)
  ctx.redirect(url)
})

/**
 * 用户回调方法
 */
router.get('/wxCallback', async (ctx) => {
  const code = ctx.query.code
  await console.log('wxCallback code', code)
  const token = await oauth.getAccessToken(code)
  const accessToken = token.data.access_token
  const openid = token.data.openid
  console.log('accessToken', accessToken)
  console.log('openid', openid)
  // const res = await api.getUser({ openid, lang: 'zh_CN' })
  // console.log('userInfo ', res)
  ctx.redirect('/?openid=' + openid)
})

/**
 * 获取用户信息
 */
router.get('/getUser', async (ctx) => {
  const openid = ctx.query.openid
  const userInfo = await api.getUser({ openid, lang: 'zh_CN' })
  console.log('userInfo:', userInfo)
  ctx.body = userInfo
})

/**
 * 获取
 */
router.get('/getJSConfig', async (ctx) => {
  console.log('getJSSDK...', ctx.query)
  const res = await api.getJsConfig(ctx.query)
  ctx.body = res
})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())
app.listen(3000)
