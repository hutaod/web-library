const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log('method: ', req.method)
  if (req.method === 'GET') {
    const url = req.url
    console.log('url: ', url)
    req.query = querystring.parse(url.split('?')[1])
    console.log('query: ', req.query)
    res.end(JSON.stringify(req.query))
  }

  if (req.method === 'POST') {
    // 数据格式
    console.log('content-type', req.headers['content-type'])
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      console.log(chunk)
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log(postData)
      res.end('hello world') // 在这里返回，因为是异步
    })
  }
})

server.listen(3000, () => {
  console.log('server on 3000')
})
