const net = require('net')

/**
 * 检查port，如果port被使用，就让port自增1，然后再进行检查
 * @param {number} port
 * @param {string} hostname
 */
function detectPort(port, hostname) {
  const server = new net.Server()
  return new Promise((resolve, reject) => {
    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        resolve(detectPort(port + 1)) //注意这句，如端口号+1
        console.log(`this port ${port} is occupied. try another.`)
      } else {
        reject(err)
      }
    })

    server.listen(port, hostname, () => {
      port = server.address().port
      server.close()
      resolve(port)
    })
  })
}

module.exports = detectPort
