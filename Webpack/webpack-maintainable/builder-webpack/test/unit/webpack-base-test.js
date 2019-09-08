const assert = require('assert')
describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base')
  // console.log(baseConfig.entry.index)
  // console.log(baseConfig.entry.search)
  it('entry', () => {
    assert.equal(baseConfig.entry.index.indexOf('builder-webpack/test/smoke/template/src/index/index.js') > -1, true)
    assert.equal(baseConfig.entry.search.indexOf('builder-webpack/test/smoke/template/src/search/index.js') > -1, true)
  })
})