#!/usr/bin/env node

const { program, Command } = require('commander')

// program.version('0.0.1')

// console.log(program)

// const program = new Command()
// program.version('0.0.1')

program
  // .command('clone <source> [destination]')
  // .description('clone a repository into a newly created directory')
  // .action((source, destination) => {
  //   console.log('clone command called', source, destination)
  // })
  // .command('build') // 定义了command，在action之后的option都不会生效
  // .description('build web site for deployment')
  // .action(() => {
  //   console.log('build')
  // })
  // .command('deploy')
  // .description('deploy web site to production')
  // .action(() => {
  //   console.log('deploy')
  // })
  .option('-d, --debug', 'output extra debugging', true) // 默认值只能是boolean类型，也就是没有声明参数的情况下默认值只能是boolean类型
  .option('-s, --small', 'small pizza size')
  // .option('-p, --pizza-type <type>', 'flavour of pizza') // <type> 参数必须
  .option('--cheese [type]', 'add the specified type of cheese', 'blue') // [type] 参数非必须，不传参数的计算方式为 default || true
  .option('--no-sauce', 'Remove sauce') // 如果没有单独定义sauce，此处的定义会设置sauce为true
  .option('--no-cheese', 'plain with no cheese', true) // 默认值设置无效
  .option('-f, --float <number>', 'float argument', parseFloat)
  .option(
    '-i, --integer <number>',
    'integer argument',
    (value, dummyPrevious) => {
      console.log('integer', dummyPrevious + parseInt(value))
      return dummyPrevious + parseInt(value)
    },
    0
  )
  // .requiredOption(
  //   '-v, --verbose',
  //   'verbosity that can be increased',
  //   function(value, preValue) {
  //     console.log('verbose', value, preValue)
  //     return preValue + 1
  //   },
  //   0
  // ) // 声明必选项 如果命令行中不存在此选项 requiredOption 会在执行的阶段抛出异常
  .option('--help', 'help', true) // --help 是内置命令，重写会有一些问题，不建议重写，可以进行监听
  // .on(
  //   '--help',
  //   function() {
  //     // console.log('help', value, preValue)
  //   },
  //   0
  // ) // --help 是内置命令，可以通过on来监听
  .version('0.0.1') // 打印版本号（默认选项标识为-V和--version，用于查看命令行版本，一般设置自身的库的版本号），优先执行，执行完会直接退出，因此不会执行所有的option
  .version('0.0.1', '-v, --vers') // 自定义标识，通过给version方法再传递一个参数，语法与option方法一致。版本标识名字可以是任意的，但是必须要有长名字。
// .parse(process.argv) // parse需要写在最后面，否则不会解析写在它之后的option定义

program
  .command('build') // 定义了command，在action之后的option都不会生效，且下一个command不能在当前command后进行链式声明
  .description('build web site for deployment')
  .action(() => {
    console.log('build')
  })

program
  .command('deploy')
  .description('deploy web site to production')
  .action(() => {
    console.log('deploy')
  })

program
  .command('serve', { isDefault: true })
  .description('launch web server')
  .option('-p,--port <port_number>', 'web port') // 如果program本身有相同option声明，这里不会生效
  .action(opts => {
    console.log(`server on port ${opts.port}`)
  })

program.parse(process.argv)

// console.log(program)
console.log(program.opts())
// if (program.debug) {
//   console.log(program.opts())
// }
// console.log('pizza details:')
// if (program.small) {
//   console.log('- small pizza size')
// }
// if (program.pizzaType) {
//   console.log(`- ${program.pizzaType}`)
// }
// // if (program.cheese) {
// //   console.log(`cheese: ${program.cheese}`)
// // }
// console.log(`cheese: ${program.cheese}`)

console.log(program.sauce, program.cheese)
