const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log('method: ', req.method)
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  // 返回 返回的都要是字符串
  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }

  // 返回 返回的都要是字符串
  console.log('123')
  if (method === 'POST') {
    console.log('123')
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      console.log(chunk)
      postData += chunk.toString()
    })

    req.on('end', () => {
      console.log('234')
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})

server.listen(3000, () => {
  console.log('server on 3000')
})
