const marked = require('marked')

module.exports = (source) => {
  const html = marked(source)
  return html
  // const code = `module.exports=${JSON.stringify(html)}`
  // const code = `export default ${JSON.stringify(html)}`
  // return code
}
