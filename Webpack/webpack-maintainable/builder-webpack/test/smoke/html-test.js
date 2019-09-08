const glob = require('glob-all')

describe('Checking generated html files', () => {
  it('shold generated html files', (done) => {
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html',
    ]);

    if(files && files.length) {
      done()
    } else {
      throw new Error('no html files generated')
    }

  })
});
