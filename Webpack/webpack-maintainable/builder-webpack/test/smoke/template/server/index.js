if(typeof window === 'undefined') {
  global.window = {}
}
const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/index-server')
const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
const data = require('./data.json')

const server = port => {
  const app = express()

  app.use(express.static('dist'));
  app.get('/index', (req, res) => {
    // console.log(SSR)
    const html = renderMarkup(renderToString(SSR))
    // console.log(html)
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('Server is running on port:', port)
  })
}

const renderMarkup = (str) => {
  const dataStr = JSON.stringify(data)
  return template.replace('<!--HTML_PLACEHOLDER-->', str).replace('<!--INITIAL_DATA_PLACEHOLDER-->',
    `<script>window.initial_data=${dataStr}</script>`
  )
}

server(process.env.PORT || 3000)
