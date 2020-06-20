# create-react-app 源码解读

`create-react-app` 是 react 官方的脚手架（后面简写 cra），也是 react 主要开发人员 Dan Abramov 大神写的。如果你想自己打造一个通用的脚手架，可以参考下 cra 的源码，下面会主要以部分原理加代码注释来解读 cra 的源码。

## 模块划分

cra 拆分成了 11 个包，下面简单介绍一些核心的包的作用。

- `create-react-app`： 脚手架工具，也就是 cli 的核心代码
- `react-scripts`： npm scripts 命令工具，主要封装了开发/打包/测试/暴露自身核心代码功能。
- `react-dev-utils`：主要提供给`react-scripts`包使用的一些工具类方法
- `cra-template`：cra 创建的 react js 项目模板代码
- `cra-template-typescript`：cra 创建的 react ts 项目模板代码
- `eslint-config-react-app`：eslint 规则配置
- `babel-preset-react-app`：babel 配置
- ......

其实主要核心在`create-react-app`和`react-scripts`这两个包里面，后面就主要着重介绍它俩的实现。其他模块也会在后续慢慢更新。

## create-react-app

该包提供了一个 cli —— `create-react-app`，用于生成一个 react 项目。

先看一下`package.json`，一般而言，看一个包或者一个项目先看`package.json`：

```json
// 只列出来了一些核心配置
{
  "name": "create-react-app", // 包名，用于npm识别
  "engines": {
    "node": ">=10" // 说明node版本兼容性
  },
  // npm 发布时保留的文件
  "files": ["index.js", "createReactApp.js", "yarn.lock.cached"],
  // 命令行
  "bin": {
    "create-react-app": "./index.js"
  }
}
```

当使用 `npx create-react-app` 进行初始化项目的时候，会默认使用 bin 中的第一条命令（这一点在很多相关文章都没说明，自测的）。

cra 包里面只有两个 js 文件：`index.js`和`createReactApp.js`。

```js
// index.js
#!/usr/bin/env node

// 此处一大堆注释说明了版权和cra一些描述。

'use strict';

// 获取nodejs的版本
var currentNodeVersion = process.versions.node;
// 把 aa.bb.cc转换成[aa,bb,cc]
var semver = currentNodeVersion.split('.');
// 获取nodejs 大版本
var major = semver[0];

// 如果nodejs 大版本小于10，则在控制台打印错误说明，并终止进程
if (major < 10) {
  console.error(
    'You are running Node ' +
      currentNodeVersion +
      '.\n' +
      'Create React App requires Node 10 or higher. \n' +
      'Please update your version of Node.'
  );
  process.exit(1); // 默认为0，代表执行成功，1为失败
}

// 引入并执行createReactApp.js
require('./createReactApp');
```

从上面代码可以看出，`index.js` 文件仅仅只是对 nodejs 版本进行了简单校验，以及引入核心文件。下面我们来看 cra 的核心文件 `createReactApp.js`。

```js
// 一般来说遇到这些引入一大堆的依赖，可以直接略过去，没有必要都去属性每一个依赖，了解它干啥的，直接读后面的代码，读完也大概知道这些依赖的作用，这里我简单的写一下注释
const chalk = require('chalk') // 用于改变console.log的颜色
const commander = require('commander') // node.js 命令行的完整解决方案，提供了一套命令行解析规则
const dns = require('dns') // 具有Web UI并使用Redis配置存储的DNS服务器
const envinfo = require('envinfo') // 用于生成有关对软件问题进行故障排除所需的常见详细信息的报告，例如您的操作系统，二进制版本，浏览器，安装的语言等
const execSync = require('child_process').execSync // 用于同步执行命令，使用exec默认最大是200k
const fs = require('fs-extra') // fs扩展，继承了fs，并新增了一些方法
const hyperquest = require('hyperquest') // 将http请求应答过程变成stream形式返回
const inquirer = require('inquirer') // 常见的交互式命令行用户界面的集合
const os = require('os') // nodejs os 模块，在cra中用于获取不同系统的结束标识：os.EOL
const path = require('path') // nodejs path 模块
const semver = require('semver') // Npm使用的语义版本解析器
const spawn = require('cross-spawn') // 封装了child_process.spawnSync 用于同步执行命令，与execSync类似，但不限制大小，并做了多系统兼容
const tmp = require('tmp') // 一个简单的node.js临时文件和目录创建器
const unpack = require('tar-pack').unpack // 用于解压tar压缩包
const url = require('url') // nodejs url 模块
const validateProjectName = require('validate-npm-package-name') // 验证npm包名是否合法

const packageJson = require('./package.json')

let projectName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>') // 处理输入的文件夹名
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action(name => {
    projectName = name
  })
  // 显示安装详细信息
  .option('--verbose', 'print additional logs')
  // 打印环境调试信息
  .option('--info', 'print environment debug info')
  // 用于修改`react-scripts`版本，默认使用最新稳定版本
  .option(
    '--scripts-version <alternative-package>',
    'use a non-standard version of react-scripts'
  )
  // 用于选择使用的模板
  .option(
    '--template <path-to-template>',
    'specify a template for the created project'
  )
  // 设置是否使用npm，默认会使用yarn
  .option('--use-npm')
  // 设置开启Yarn的pnp功能
  .option('--use-pnp')
  // 允许命令行未知参数
  .allowUnknownOption()
  // 处理--help帮助命令，比如执行npx create-react-app --help 时
  .on('--help', () => {
    // ...
  })
  .parse(process.argv)

if (program.info) {
  console.log(chalk.bold('\nEnvironment Info:'))
  console.log(
    `\n  current version of ${packageJson.name}: ${packageJson.version}`
  )
  console.log(`  running from ${__dirname}`)
  return envinfo
    .run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'npm', 'Yarn'],
        Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
        npmPackages: ['react', 'react-dom', 'react-scripts'],
        npmGlobalPackages: ['create-react-app'],
      },
      {
        duplicates: true,
        showNotFound: true,
      }
    )
    .then(console.log)
}

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  )
  console.log()
  console.log('For example:')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}`)
  console.log()
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  )
  process.exit(1)
}

createApp(
  projectName,
  program.verbose,
  program.scriptsVersion,
  program.template,
  program.useNpm,
  program.usePnp
)

function createApp(name, verbose, version, template, useNpm, usePnp) {
  const unsupportedNodeVersion = !semver.satisfies(process.version, '>=10')
  if (unsupportedNodeVersion) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to Node 10 or higher for a better, fully supported experience.\n`
      )
    )
    // Fall back to latest supported react-scripts on Node 4
    version = 'react-scripts@0.9.x'
  }

  const root = path.resolve(name)
  const appName = path.basename(root)

  checkAppName(appName)
  fs.ensureDirSync(name)
  if (!isSafeToCreateProjectIn(root, name)) {
    process.exit(1)
  }
  console.log()

  console.log(`Creating a new React app in ${chalk.green(root)}.`)
  console.log()

  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  }
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )

  const useYarn = useNpm ? false : shouldUseYarn()
  const originalDirectory = process.cwd()
  process.chdir(root)
  if (!useYarn && !checkThatNpmCanReadCwd()) {
    process.exit(1)
  }

  if (!useYarn) {
    const npmInfo = checkNpmVersion()
    if (!npmInfo.hasMinNpm) {
      if (npmInfo.npmVersion) {
        console.log(
          chalk.yellow(
            `You are using npm ${npmInfo.npmVersion} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
              `Please update to npm 6 or higher for a better, fully supported experience.\n`
          )
        )
      }
      // Fall back to latest supported react-scripts for npm 3
      version = 'react-scripts@0.9.x'
    }
  } else if (usePnp) {
    const yarnInfo = checkYarnVersion()
    if (yarnInfo.yarnVersion) {
      if (!yarnInfo.hasMinYarnPnp) {
        console.log(
          chalk.yellow(
            `You are using Yarn ${yarnInfo.yarnVersion} together with the --use-pnp flag, but Plug'n'Play is only supported starting from the 1.12 release.\n\n` +
              `Please update to Yarn 1.12 or higher for a better, fully supported experience.\n`
          )
        )
        // 1.11 had an issue with webpack-dev-middleware, so better not use PnP with it (never reached stable, but still)
        usePnp = false
      }
      if (!yarnInfo.hasMaxYarnPnp) {
        console.log(
          chalk.yellow(
            'The --use-pnp flag is no longer necessary with yarn 2 and will be deprecated and removed in a future release.\n'
          )
        )
        // 2 supports PnP by default and breaks when trying to use the flag
        usePnp = false
      }
    }
  }

  if (useYarn) {
    let yarnUsesDefaultRegistry = true
    try {
      yarnUsesDefaultRegistry =
        execSync('yarnpkg config get registry')
          .toString()
          .trim() === 'https://registry.yarnpkg.com'
    } catch (e) {
      // ignore
    }
    if (yarnUsesDefaultRegistry) {
      fs.copySync(
        require.resolve('./yarn.lock.cached'),
        path.join(root, 'yarn.lock')
      )
    }
  }

  run(
    root,
    appName,
    version,
    verbose,
    originalDirectory,
    template,
    useYarn,
    usePnp
  )
}

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

function install(root, useYarn, usePnp, dependencies, verbose, isOnline) {
  return new Promise((resolve, reject) => {
    let command
    let args
    if (useYarn) {
      command = 'yarnpkg'
      args = ['add', '--exact']
      if (!isOnline) {
        args.push('--offline')
      }
      if (usePnp) {
        args.push('--enable-pnp')
      }
      ;[].push.apply(args, dependencies)

      // Explicitly set cwd() to work around issues like
      // https://github.com/facebook/create-react-app/issues/3326.
      // Unfortunately we can only do this for Yarn because npm support for
      // equivalent --prefix flag doesn't help with this issue.
      // This is why for npm, we run checkThatNpmCanReadCwd() early instead.
      args.push('--cwd')
      args.push(root)

      if (!isOnline) {
        console.log(chalk.yellow('You appear to be offline.'))
        console.log(chalk.yellow('Falling back to the local Yarn cache.'))
        console.log()
      }
    } else {
      command = 'npm'
      args = [
        'install',
        '--save',
        '--save-exact',
        '--loglevel',
        'error',
      ].concat(dependencies)

      if (usePnp) {
        console.log(chalk.yellow("NPM doesn't support PnP."))
        console.log(chalk.yellow('Falling back to the regular installs.'))
        console.log()
      }
    }

    if (verbose) {
      args.push('--verbose')
    }

    const child = spawn(command, args, { stdio: 'inherit' })
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
  })
}

function run(
  root,
  appName,
  version,
  verbose,
  originalDirectory,
  template,
  useYarn,
  usePnp
) {
  Promise.all([
    getInstallPackage(version, originalDirectory),
    getTemplateInstallPackage(template, originalDirectory),
  ]).then(([packageToInstall, templateToInstall]) => {
    const allDependencies = ['react', 'react-dom', packageToInstall]

    console.log('Installing packages. This might take a couple of minutes.')

    Promise.all([
      getPackageInfo(packageToInstall),
      getPackageInfo(templateToInstall),
    ])
      .then(([packageInfo, templateInfo]) =>
        checkIfOnline(useYarn).then(isOnline => ({
          isOnline,
          packageInfo,
          templateInfo,
        }))
      )
      .then(({ isOnline, packageInfo, templateInfo }) => {
        let packageVersion = semver.coerce(packageInfo.version)

        const templatesVersionMinimum = '3.3.0'

        // Assume compatibility if we can't test the version.
        if (!semver.valid(packageVersion)) {
          packageVersion = templatesVersionMinimum
        }

        // Only support templates when used alongside new react-scripts versions.
        const supportsTemplates = semver.gte(
          packageVersion,
          templatesVersionMinimum
        )
        if (supportsTemplates) {
          allDependencies.push(templateToInstall)
        } else if (template) {
          console.log('')
          console.log(
            `The ${chalk.cyan(packageInfo.name)} version you're using ${
              packageInfo.name === 'react-scripts' ? 'is not' : 'may not be'
            } compatible with the ${chalk.cyan('--template')} option.`
          )
          console.log('')
        }

        console.log(
          `Installing ${chalk.cyan('react')}, ${chalk.cyan(
            'react-dom'
          )}, and ${chalk.cyan(packageInfo.name)}${
            supportsTemplates ? ` with ${chalk.cyan(templateInfo.name)}` : ''
          }...`
        )
        console.log()

        return install(
          root,
          useYarn,
          usePnp,
          allDependencies,
          verbose,
          isOnline
        ).then(() => ({
          packageInfo,
          supportsTemplates,
          templateInfo,
        }))
      })
      .then(async ({ packageInfo, supportsTemplates, templateInfo }) => {
        const packageName = packageInfo.name
        const templateName = supportsTemplates ? templateInfo.name : undefined
        checkNodeVersion(packageName)
        setCaretRangeForRuntimeDeps(packageName)

        const pnpPath = path.resolve(process.cwd(), '.pnp.js')

        const nodeArgs = fs.existsSync(pnpPath) ? ['--require', pnpPath] : []

        await executeNodeScript(
          {
            cwd: process.cwd(),
            args: nodeArgs,
          },
          [root, appName, verbose, originalDirectory, templateName],
          `
        var init = require('${packageName}/scripts/init.js');
        init.apply(null, JSON.parse(process.argv[1]));
      `
        )

        if (version === 'react-scripts@0.9.x') {
          console.log(
            chalk.yellow(
              `\nNote: the project was bootstrapped with an old unsupported version of tools.\n` +
                `Please update to Node >=10 and npm >=6 to get supported tools in new projects.\n`
            )
          )
        }
      })
      .catch(reason => {
        console.log()
        console.log('Aborting installation.')
        if (reason.command) {
          console.log(`  ${chalk.cyan(reason.command)} has failed.`)
        } else {
          console.log(chalk.red('Unexpected error. Please report it as a bug:'))
          console.log(reason)
        }
        console.log()

        // On 'exit' we will delete these files from target directory.
        const knownGeneratedFiles = [
          'package.json',
          'yarn.lock',
          'node_modules',
        ]
        const currentFiles = fs.readdirSync(path.join(root))
        currentFiles.forEach(file => {
          knownGeneratedFiles.forEach(fileToMatch => {
            // This removes all knownGeneratedFiles.
            if (file === fileToMatch) {
              console.log(`Deleting generated file... ${chalk.cyan(file)}`)
              fs.removeSync(path.join(root, file))
            }
          })
        })
        const remainingFiles = fs.readdirSync(path.join(root))
        if (!remainingFiles.length) {
          // Delete target folder if empty
          console.log(
            `Deleting ${chalk.cyan(`${appName}/`)} from ${chalk.cyan(
              path.resolve(root, '..')
            )}`
          )
          process.chdir(path.resolve(root, '..'))
          fs.removeSync(path.join(root))
        }
        console.log('Done.')
        process.exit(1)
      })
  })
}

function getInstallPackage(version, originalDirectory) {
  let packageToInstall = 'react-scripts'
  const validSemver = semver.valid(version)
  if (validSemver) {
    packageToInstall += `@${validSemver}`
  } else if (version) {
    if (version[0] === '@' && !version.includes('/')) {
      packageToInstall += version
    } else if (version.match(/^file:/)) {
      packageToInstall = `file:${path.resolve(
        originalDirectory,
        version.match(/^file:(.*)?$/)[1]
      )}`
    } else {
      // for tar.gz or alternative paths
      packageToInstall = version
    }
  }

  const scriptsToWarn = [
    {
      name: 'react-scripts-ts',
      message: chalk.yellow(
        `The react-scripts-ts package is deprecated. TypeScript is now supported natively in Create React App. You can use the ${chalk.green(
          '--template typescript'
        )} option instead when generating your app to include TypeScript support. Would you like to continue using react-scripts-ts?`
      ),
    },
  ]

  for (const script of scriptsToWarn) {
    if (packageToInstall.startsWith(script.name)) {
      return inquirer
        .prompt({
          type: 'confirm',
          name: 'useScript',
          message: script.message,
          default: false,
        })
        .then(answer => {
          if (!answer.useScript) {
            process.exit(0)
          }

          return packageToInstall
        })
    }
  }

  return Promise.resolve(packageToInstall)
}

function getTemplateInstallPackage(template, originalDirectory) {
  let templateToInstall = 'cra-template'
  if (template) {
    if (template.match(/^file:/)) {
      templateToInstall = `file:${path.resolve(
        originalDirectory,
        template.match(/^file:(.*)?$/)[1]
      )}`
    } else if (
      template.includes('://') ||
      template.match(/^.+\.(tgz|tar\.gz)$/)
    ) {
      // for tar.gz or alternative paths
      templateToInstall = template
    } else {
      // Add prefix 'cra-template-' to non-prefixed templates, leaving any
      // @scope/ intact.
      const packageMatch = template.match(/^(@[^/]+\/)?(.+)$/)
      const scope = packageMatch[1] || ''
      const templateName = packageMatch[2]

      if (
        templateName === templateToInstall ||
        templateName.startsWith(`${templateToInstall}-`)
      ) {
        // Covers:
        // - cra-template
        // - @SCOPE/cra-template
        // - cra-template-NAME
        // - @SCOPE/cra-template-NAME
        templateToInstall = `${scope}${templateName}`
      } else if (templateName.startsWith('@')) {
        // Covers using @SCOPE only
        templateToInstall = `${templateName}/${templateToInstall}`
      } else {
        // Covers templates without the `cra-template` prefix:
        // - NAME
        // - @SCOPE/NAME
        templateToInstall = `${scope}${templateToInstall}-${templateName}`
      }
    }
  }

  return Promise.resolve(templateToInstall)
}

function getTemporaryDirectory() {
  return new Promise((resolve, reject) => {
    // Unsafe cleanup lets us recursively delete the directory if it contains
    // contents; by default it only allows removal if it's empty
    tmp.dir({ unsafeCleanup: true }, (err, tmpdir, callback) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          tmpdir: tmpdir,
          cleanup: () => {
            try {
              callback()
            } catch (ignored) {
              // Callback might throw and fail, since it's a temp directory the
              // OS will clean it up eventually...
            }
          },
        })
      }
    })
  })
}

function extractStream(stream, dest) {
  return new Promise((resolve, reject) => {
    stream.pipe(
      unpack(dest, err => {
        if (err) {
          reject(err)
        } else {
          resolve(dest)
        }
      })
    )
  })
}

// Extract package name from tarball url or path.
function getPackageInfo(installPackage) {
  if (installPackage.match(/^.+\.(tgz|tar\.gz)$/)) {
    return getTemporaryDirectory()
      .then(obj => {
        let stream
        if (/^http/.test(installPackage)) {
          stream = hyperquest(installPackage)
        } else {
          stream = fs.createReadStream(installPackage)
        }
        return extractStream(stream, obj.tmpdir).then(() => obj)
      })
      .then(obj => {
        const { name, version } = require(path.join(obj.tmpdir, 'package.json'))
        obj.cleanup()
        return { name, version }
      })
      .catch(err => {
        // The package name could be with or without semver version, e.g. react-scripts-0.2.0-alpha.1.tgz
        // However, this function returns package name only without semver version.
        console.log(
          `Could not extract the package name from the archive: ${err.message}`
        )
        const assumedProjectName = installPackage.match(
          /^.+\/(.+?)(?:-\d+.+)?\.(tgz|tar\.gz)$/
        )[1]
        console.log(
          `Based on the filename, assuming it is "${chalk.cyan(
            assumedProjectName
          )}"`
        )
        return Promise.resolve({ name: assumedProjectName })
      })
  } else if (installPackage.startsWith('git+')) {
    // Pull package name out of git urls e.g:
    // git+https://github.com/mycompany/react-scripts.git
    // git+ssh://github.com/mycompany/react-scripts.git#v1.2.3
    return Promise.resolve({
      name: installPackage.match(/([^/]+)\.git(#.*)?$/)[1],
    })
  } else if (installPackage.match(/.+@/)) {
    // Do not match @scope/ when stripping off @version or @tag
    return Promise.resolve({
      name: installPackage.charAt(0) + installPackage.substr(1).split('@')[0],
      version: installPackage.split('@')[1],
    })
  } else if (installPackage.match(/^file:/)) {
    const installPackagePath = installPackage.match(/^file:(.*)?$/)[1]
    const { name, version } = require(path.join(
      installPackagePath,
      'package.json'
    ))
    return Promise.resolve({ name, version })
  }
  return Promise.resolve({ name: installPackage })
}

function checkNpmVersion() {
  let hasMinNpm = false
  let npmVersion = null
  try {
    npmVersion = execSync('npm --version')
      .toString()
      .trim()
    hasMinNpm = semver.gte(npmVersion, '6.0.0')
  } catch (err) {
    // ignore
  }
  return {
    hasMinNpm: hasMinNpm,
    npmVersion: npmVersion,
  }
}

function checkYarnVersion() {
  const minYarnPnp = '1.12.0'
  const maxYarnPnp = '2.0.0'
  let hasMinYarnPnp = false
  let hasMaxYarnPnp = false
  let yarnVersion = null
  try {
    yarnVersion = execSync('yarnpkg --version')
      .toString()
      .trim()
    if (semver.valid(yarnVersion)) {
      hasMinYarnPnp = semver.gte(yarnVersion, minYarnPnp)
      hasMaxYarnPnp = semver.lt(yarnVersion, maxYarnPnp)
    } else {
      // Handle non-semver compliant yarn version strings, which yarn currently
      // uses for nightly builds. The regex truncates anything after the first
      // dash. See #5362.
      const trimmedYarnVersionMatch = /^(.+?)[-+].+$/.exec(yarnVersion)
      if (trimmedYarnVersionMatch) {
        const trimmedYarnVersion = trimmedYarnVersionMatch.pop()
        hasMinYarnPnp = semver.gte(trimmedYarnVersion, minYarnPnp)
        hasMaxYarnPnp = semver.lt(trimmedYarnVersion, maxYarnPnp)
      }
    }
  } catch (err) {
    // ignore
  }
  return {
    hasMinYarnPnp: hasMinYarnPnp,
    hasMaxYarnPnp: hasMaxYarnPnp,
    yarnVersion: yarnVersion,
  }
}

function checkNodeVersion(packageName) {
  const packageJsonPath = path.resolve(
    process.cwd(),
    'node_modules',
    packageName,
    'package.json'
  )

  if (!fs.existsSync(packageJsonPath)) {
    return
  }

  const packageJson = require(packageJsonPath)
  if (!packageJson.engines || !packageJson.engines.node) {
    return
  }

  if (!semver.satisfies(process.version, packageJson.engines.node)) {
    console.error(
      chalk.red(
        'You are running Node %s.\n' +
          'Create React App requires Node %s or higher. \n' +
          'Please update your version of Node.'
      ),
      process.version,
      packageJson.engines.node
    )
    process.exit(1)
  }
}

function checkAppName(appName) {
  const validationResult = validateProjectName(appName)
  if (!validationResult.validForNewPackages) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because of npm naming restrictions:\n`
      )
    )
    ;[
      ...(validationResult.errors || []),
      ...(validationResult.warnings || []),
    ].forEach(error => {
      console.error(chalk.red(`  * ${error}`))
    })
    console.error(chalk.red('\nPlease choose a different project name.'))
    process.exit(1)
  }

  // TODO: there should be a single place that holds the dependencies
  const dependencies = ['react', 'react-dom', 'react-scripts'].sort()
  if (dependencies.includes(appName)) {
    console.error(
      chalk.red(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`
        )} because a dependency with the same name exists.\n` +
          `Due to the way npm works, the following names are not allowed:\n\n`
      ) +
        chalk.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
        chalk.red('\n\nPlease choose a different project name.')
    )
    process.exit(1)
  }
}

function makeCaretRange(dependencies, name) {
  const version = dependencies[name]

  if (typeof version === 'undefined') {
    console.error(chalk.red(`Missing ${name} dependency in package.json`))
    process.exit(1)
  }

  let patchedVersion = `^${version}`

  if (!semver.validRange(patchedVersion)) {
    console.error(
      `Unable to patch ${name} dependency version because version ${chalk.red(
        version
      )} will become invalid ${chalk.red(patchedVersion)}`
    )
    patchedVersion = version
  }

  dependencies[name] = patchedVersion
}

function setCaretRangeForRuntimeDeps(packageName) {
  const packagePath = path.join(process.cwd(), 'package.json')
  const packageJson = require(packagePath)

  if (typeof packageJson.dependencies === 'undefined') {
    console.error(chalk.red('Missing dependencies in package.json'))
    process.exit(1)
  }

  const packageVersion = packageJson.dependencies[packageName]
  if (typeof packageVersion === 'undefined') {
    console.error(chalk.red(`Unable to find ${packageName} in package.json`))
    process.exit(1)
  }

  makeCaretRange(packageJson.dependencies, 'react')
  makeCaretRange(packageJson.dependencies, 'react-dom')

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + os.EOL)
}

// If project only contains files generated by GH, it’s safe.
// Also, if project contains remnant error logs from a previous
// installation, lets remove them now.
// We also special case IJ-based products .idea because it integrates with CRA:
// https://github.com/facebook/create-react-app/pull/368#issuecomment-243446094
function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'docs',
    'LICENSE',
    'README.md',
    'mkdocs.yml',
    'Thumbs.db',
  ]
  // These files should be allowed to remain on a failed install, but then
  // silently removed during the next create.
  const errorLogFilePatterns = [
    'npm-debug.log',
    'yarn-error.log',
    'yarn-debug.log',
  ]
  const isErrorLog = file => {
    return errorLogFilePatterns.some(pattern => file.startsWith(pattern))
  }

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // IntelliJ IDEA creates module files before CRA is launched
    .filter(file => !/\.iml$/.test(file))
    // Don't treat log files from previous installation as conflicts
    .filter(file => !isErrorLog(file))

  if (conflicts.length > 0) {
    console.log(
      `The directory ${chalk.green(name)} contains files that could conflict:`
    )
    console.log()
    for (const file of conflicts) {
      try {
        const stats = fs.lstatSync(path.join(root, file))
        if (stats.isDirectory()) {
          console.log(`  ${chalk.blue(`${file}/`)}`)
        } else {
          console.log(`  ${file}`)
        }
      } catch (e) {
        console.log(`  ${file}`)
      }
    }
    console.log()
    console.log(
      'Either try using a new directory name, or remove the files listed above.'
    )

    return false
  }

  // Remove any log files from a previous installation.
  fs.readdirSync(root).forEach(file => {
    if (isErrorLog(file)) {
      fs.removeSync(path.join(root, file))
    }
  })
  return true
}

function getProxy() {
  if (process.env.https_proxy) {
    return process.env.https_proxy
  } else {
    try {
      // Trying to read https-proxy from .npmrc
      let httpsProxy = execSync('npm config get https-proxy')
        .toString()
        .trim()
      return httpsProxy !== 'null' ? httpsProxy : undefined
    } catch (e) {
      return
    }
  }
}

// See https://github.com/facebook/create-react-app/pull/3355
function checkThatNpmCanReadCwd() {
  const cwd = process.cwd()
  let childOutput = null
  try {
    // Note: intentionally using spawn over exec since
    // the problem doesn't reproduce otherwise.
    // `npm config list` is the only reliable way I could find
    // to reproduce the wrong path. Just printing process.cwd()
    // in a Node process was not enough.
    childOutput = spawn.sync('npm', ['config', 'list']).output.join('')
  } catch (err) {
    // Something went wrong spawning node.
    // Not great, but it means we can't do this check.
    // We might fail later on, but let's continue.
    return true
  }
  if (typeof childOutput !== 'string') {
    return true
  }
  const lines = childOutput.split('\n')
  // `npm config list` output includes the following line:
  // "; cwd = C:\path\to\current\dir" (unquoted)
  // I couldn't find an easier way to get it.
  const prefix = '; cwd = '
  const line = lines.find(line => line.startsWith(prefix))
  if (typeof line !== 'string') {
    // Fail gracefully. They could remove it.
    return true
  }
  const npmCWD = line.substring(prefix.length)
  if (npmCWD === cwd) {
    return true
  }
  console.error(
    chalk.red(
      `Could not start an npm process in the right directory.\n\n` +
        `The current directory is: ${chalk.bold(cwd)}\n` +
        `However, a newly started npm process runs in: ${chalk.bold(
          npmCWD
        )}\n\n` +
        `This is probably caused by a misconfigured system terminal shell.`
    )
  )
  if (process.platform === 'win32') {
    console.error(
      chalk.red(`On Windows, this can usually be fixed by running:\n\n`) +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` +
        chalk.red(`Try to run the above two lines in the terminal.\n`) +
        chalk.red(
          `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`
        )
    )
  }
  return false
}

function checkIfOnline(useYarn) {
  if (!useYarn) {
    // Don't ping the Yarn registry.
    // We'll just assume the best case.
    return Promise.resolve(true)
  }

  return new Promise(resolve => {
    dns.lookup('registry.yarnpkg.com', err => {
      let proxy
      if (err != null && (proxy = getProxy())) {
        // If a proxy is defined, we likely can't resolve external hostnames.
        // Try to resolve the proxy name as an indication of a connection.
        dns.lookup(url.parse(proxy).hostname, proxyErr => {
          resolve(proxyErr == null)
        })
      } else {
        resolve(err == null)
      }
    })
  })
}

function executeNodeScript({ cwd, args }, data, source) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [...args, '-e', source, '--', JSON.stringify(data)],
      { cwd, stdio: 'inherit' }
    )

    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `node ${args.join(' ')}`,
        })
        return
      }
      resolve()
    })
  })
}
```

## 参考资料

[create-react-app 使用工具与过程分析](https://github.com/jingzhiMo/jingzhiMo.github.io/issues/15)
