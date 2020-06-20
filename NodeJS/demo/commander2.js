#!/usr/bin/env node

const program = require('commander')

program
  .version('0.1.0')
  .arguments('<cmd> [env]') // 用于指定action中的参数
  .action(function(cmd, env) {
    cmdValue = cmd
    envValue = env
  })

program.parse(process.argv)

if (typeof cmdValue === 'undefined') {
  console.error('no command given!')
  process.exit(1)
}
console.log('command:', cmdValue)
console.log('environment:', envValue || 'no environment given')
