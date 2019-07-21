const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

// 开放dist目录
app.use(
  express.static(path.join(__dirname, './dist'), {
    index: false
  })
)

// 第 2 步： 获得一个createBundleRenderer
const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync('./public/index.temp.html', 'utf-8'),
  clientManifest
})

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        reject(err)
      }
      resolve(html)
    })
  })
}

app.get('*', async (req, res) => {
  console.log(req.url, 123)
  const context = {
    title: 'ssr text',
    url: req.url
  }
  const html = await renderToString(context)
  res.send(html)
})

const port = 3001
app.listen(port, function() {
  console.log(`server started at localhost:${port}`)
})
