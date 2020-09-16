module.exports = function CommentLoader(source) {
  const Type1Reg = /\/\/.*[\n\r]/
  const Type2Reg = /\/\*[^\/]*\*\//
  source = source.replace(Type1Reg, '')
  source = source.replace(Type2Reg, '')
  return source
}