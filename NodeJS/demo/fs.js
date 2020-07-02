const fs = require('fs')

// 一次性读文件
// try {
//   const data = fs.readFileSync('./config.json', {
//     flag: 'r+',
//     encoding: 'utf8',
//   })
//   console.log(data)
// } catch (error) {
//   console.log('配置文件读取出错，请检查服务')
// }

// 先打开，再分段读文件
// fs.open('./a.txt', 'r', function(err, fd) {
//   if (!err) {
//     var buf = Buffer.alloc(1024)
//     var offset = 0
//     var len = buf.length
//     var pos = 101
//     console.log(len)
//     // 这里我定义了参数，文件打开后，会从第 100 个字节开始，读取其后的 1024 个字节的数据。读取完成后，回调方法中可以处理读取到的的缓冲的数据了
//     fs.read(fd, buf, offset, len, pos, function(err, bytes, buffer) {
//       console.log('读取了' + bytes + 'bytes')
//       console.log(buf.slice(0, bytes).toString())
//     })
//     // console.log(fd)
//     // fs.close(fd, (...rest) => {
//     //   console.log('close', rest)
//     // })
//   } else {
//     console.log('err', err)
//   }
// })

// 写入二进制到文件
// fs.open('./c.txt', 'a', function(err, fd) {
//   if (!err) {
//     var buf = new Buffer('I love juejin')
//     var offset = 0
//     var len = buf.length
//     var pos = 100
//     fs.write(fd, buf, offset, len, pos, function(err, bytes, buffer) {
//       console.log('写入了 ' + bytes + 'bytes')
//       // 数据已被填充到 buf 中
//       console.log(buf.slice(0, bytes).toString())
//       fs.close(fd, () => {})
//     })
//   } else {
//     console.log('err', err)
//   }
// })

// 写入字符串到文件
fs.open('./c.txt', 'a', function(err, fd) {
  if (!err) {
    var data = 'I love juejin'
    var offset = 0
    var pos = 100
    fs.write(fd, data, offset, 'utf-8', function(err, written, string) {
      console.log(written)
      console.log(string)
      fs.close(fd, () => {})
    })
  } else {
    console.log('err', err)
  }
})
