const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.post('/api/user/login', (req, res) => {
  const { username } = req.body
  if (username === 'admin' || username === 'ht') {
    res.json({
      code: 1,
      data: username
    })
  } else {
    res.json({
      code: 10204,
      message: '用户名或密码错误'
    })
  }
})

app.get('/api/user/info', (req, res) => {
  // console.log(req.headers, req.host) 测试devServer changeOrigin
  const roles = req.headers['x-token'] === 'admin' ? ['admin'] : ['editor']
  res.json({
    code: 1,
    data: roles
  })
})

app.listen(3000)
