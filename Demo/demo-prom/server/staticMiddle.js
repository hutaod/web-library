const path = require('path')
const fs = require('fs')
const zlib = require('zlib')
const pug = require('pug')
const { promisify } = require('util')
const mimeType = require('./utils/mimeType')

const readdir = promisify(fs.readdir)

/**
 * 创建静态服务器，拦截资源
 * @param {string} root 静态服务器目录
 */
function static(root) {
  return async function serve(ctx, next) {
    let done = false

    if (ctx.method === 'HEAD' || ctx.method === 'GET') {
      try {
        done = await send(ctx, path.resolve(root))
      } catch (err) {
        if (err.status !== 404) {
          throw err
        }
      }
    }
    if (!done) {
      await next()
    }
    return done
  }
}

module.exports = static

/**
 * 发送资源到客户端
 * @param {object} ctx koa ctx
 * @param {string} root 静态服务器目录
 */
async function send(ctx, root) {
  // 格式化pathname
  const pathname = path.normalize(ctx.path + '/').slice(0, -1)
  // 获取文件路径
  const filePath = path.join(root, pathname)
  // 获取文件后缀
  const ext = path.extname(pathname)

  // 参数合法性校验
  // 1. 判断文件是否存在
  if (!fs.existsSync(filePath)) {
    throw { status: 404, message: '找不到资源' }
  }

  // 2. 若文件存在，判断是否是文件类型
  const fStat = fs.statSync(filePath)
  if (fStat.isFile()) {
    // 2.1 文件类型则判断后缀合法性，合法则返回
    // 非允许后缀的资源不予返回
    if (!mimeType[ext]) {
      throw new Error('非允许后缀的资源不予返回')
    } else {
      // 若合法存在，判断是否位于 root 目录下
      if (!filePath.startsWith(root)) {
        throw new Error(`文件不位于 ${root} 目录下`)
      }

      // 304 缓存有效期判断, 使用 If-Modified-Since，用 Etag 也可以
      const modified = ctx.req.headers['if-modified-since']
      const expectedModified = new Date(fStat.mtime).toGMTString()
      if (modified && modified == expectedModified) {
        ctx.status = 304
        ctx.type = mimeType[ext]
        ctx.res.setHeader('Cache-Control', 'max-age=3600')
        ctx.res.setHeader('Last-Modified', expectedModified)
        return true
      }

      // 文件头信息设置
      ctx.status = 200
      ctx.type = mimeType[ext]
      ctx.res.setHeader('Cache-Control', 'max-age=3600')
      ctx.res.setHeader('Content-Encoding', 'gzip')
      ctx.res.setHeader('Last-Modified', expectedModified)

      // gzip 压缩后，把文件流 pipe 回去
      const stream = fs.createReadStream(filePath, {
        flags: 'r',
      })
      stream.on('error', () => {
        ctx.res.statusCode = 404
        ctx.res.end()
      })
      ctx.body = stream.pipe(zlib.createGzip())
    }
  } else {
    // 2.2 文件夹类型则返回文件列表的html页面
    const dirList = await readdir(filePath)
    // 处理文件路径显示字符串
    const fileList = dirList
      .map((file) => {
        // 判断文件类型，根绝不同类型返回的字符串不同
        const stat = fs.statSync(path.join(filePath, file))
        if (stat.isDirectory()) {
          return `${pathname}/${file}/`
        } else {
          // 获取文件后缀
          const ext = path.extname(file)
          // 判断后缀合法性
          if (mimeType[ext]) {
            return `${pathname}/${file}`
          }
        }
      })
      .filter((file) => !!file)
    // 判断是否需要加入'../'，以返回上一级
    if (pathname.length > 0) {
      fileList.unshift('../')
    }
    // 读取pug模板，并生成html
    const html = pug.renderFile(
      path.resolve(__dirname, '../template/fileList.pug'),
      {
        pageTitle: pathname,
        fileList,
      }
    )
    // 把生成的html发送出去
    ctx.body = html
  }

  return true
}
