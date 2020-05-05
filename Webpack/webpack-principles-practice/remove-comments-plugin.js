class RemoveCommentsPlugin {
  apply(complir) {
    // console.log('RemoveCommentsPlugin', complir)
    complir.hooks.emit.tap('RemoveCommentsPlugin', (compilation) => {
      // compilation可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // console.log(name) // 输出文件名称
        // console.log(compilation.assets[name].source()) // 输出文件代码内容
        if (name.endsWith('.js')) {
          console.log('compilation.assets[name]', compilation.assets[name])
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length,
          }
        }
      }
    })
  }
}

module.exports = RemoveCommentsPlugin
