const http = require("http")
const cluster = require('cluster');

console.log(1111)
console.log(cluster.isMaster)
console.log(process.env.pm_id)

http.createServer((req, res) => {
  console.log("hhhh3", req.url)
  res.end("hello world")
}).listen(10001, () => {
  console.log("server in http://localhost:10001")
})