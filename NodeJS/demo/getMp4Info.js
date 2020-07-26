// 这里会有 xxx.mp4 n 个视频
// 可以用promise并发计算时长，最后汇总叠加
// 叠加总时长如果不超过 1 个小时，比如 55 分钟，就打印 55 分钟
// 如果超过 1 个小时，比如 65 分钟，就打印 1 小时 5分钟
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const util = require('util')
const open = util.promisify(fs.open)
const read = util.promisify(fs.read)
const close = util.promisify(fs.close)
const readFile = util.promisify(fs.readFile)

function getTime(buffer, index) {
  const start = buffer.indexOf(Buffer.from('mvhd')) + 17
  const timeScale = buffer.readUInt32BE(start)
  const duration = buffer.readUInt32BE(start + 4)
  const movieLength = Math.floor(duration / timeScale)
  // console.log(index, start, movieLength)
  return movieLength
}

function getLocaleTime(seconds) {
  return moment
    .duration(seconds, 'seconds')
    .toJSON()
    .replace(/[PTHMS]/g, str => {
      switch (str) {
        case 'H':
          return '小时'
        case 'M':
          return '分钟'
        case 'S':
          return '秒'
        default:
          return ''
      }
    })
}

;(async function() {
  const dir = '/Users/hutao/Desktop/my/学习资料/React源码解读/视频'
  // const dir = path.resolve(__dirname + '/video')
  const files = fs.readdirSync(dir).map(file => path.resolve(dir, file))
  const videos = await Promise.all(
    files.map(async (file, index) => {
      const fd = await open(file, 'r')
      const buff = Buffer.alloc(100)
      const { buffer } = await read(fd, buff, 0, 100, 0)
      // const buffer = await readFile(file)
      await close(fd)
      const time = getTime(buffer, index)
      console.log(index, time, file)
      return { file, time }
    })
  )

  const res = {
    视频总数: videos.length,
    视频总时长: getLocaleTime(
      videos.reduce((prev, e) => {
        return prev + e.time
      }, 0)
    ),
  }
  console.log(res)
  return res
})()
