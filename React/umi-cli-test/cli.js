#!/usr/bin/env node

console.log('hello demacia')

process.env.UMI_PLUGINS = require.resolve('./plugin')
const umiBinPath = require.resolve('umi/bin/umi')

console.log(process.argv)

require('child_process').fork(umiBinPath, process.argv.slice(2), {
  stdio: 'inherit'
})
