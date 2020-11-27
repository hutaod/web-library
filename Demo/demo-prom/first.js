const express = require('express')

const promClient = require('prom-client')
promClient.collectDefaultMetrics();

const app = express()
const port = 10122

// const counter = new promClient.Counter({
//   name: 'my_metric_identifier',
//   help: 'an example counter metric for this tutorial',
// });

app.get('/stuff', function (req, res) {
  // counter.inc()
  res.type('json')
  res.send(JSON.stringify({ hello: "world" }))
})

app.get('/metrics', function (req, res) {
  res.send(
    require('prom-client').register.metrics()
  )
})

app.listen(
  port,
  function () {
    console.log(`Example app listening at http://localhost:${port}`)
  }
)