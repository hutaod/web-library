# rollup 学习笔记

[官方文档](https://rollupjs.org/guide/en/)

## rollup 打包输出格式

cli 命令标志
`-f`: 相当于`--format` `--output.format`
`-o`: 相当于`--file` `--output.file`
`-c`: 相当于`--config`
`-d`: `--dir <dirname>`

format:

- `iife`： 对于 `浏览器`
- `cjs`： 对于 `Nodejs`
- `umd`： 对于 `浏览器` 和 `Nodejs`

命令行：

```js
export default function(a + b) {
  return a + b
}

```

```bash
# 把 main.js 打包成 浏览器可使用的 bundle.js 全局变量名为myBundle，代码中有导出就必须要定义--output.name
rollup main.js --file bundle.js --format iife --output.name myBundle
# 把 main.js 打包成 Node.js可使用的 bundle-cjs.js
rollup main.js --file bundle-cjs.js --format cjs
# 把 main.js 打包成 浏览器 和 Node.js 都可使用的 bundle-umd.js，代码中有导出就必须要定义--output.name
rollup main.js --file bundle-umd.js --format umd --output.name myBundle
```

### Tree-shaking (摇树优化)

让你使用 `ES6` 模块同时， `rollup` 会静态分析 `import` ，并排除任何未实际使用的代码。

## JavaScript Api

Rollup 提供 JavaScript 接口那样可以通过 Node.js 来使用。你可以很少使用，而且很可能使用命令行接口，除非你想扩展 Rollup 本身，或者用于一些难懂的任务，例如用代码把文件束生成出来。

```js
// 手动调用rollup api进行打包配置
const rollup = require('rollup')
const pkg = require('./package.json')
console.log(pkg.browser)

const inputOptions = {
  input: 'utils/main.js'
}
const outputOptions = {
  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'utils'
  }
}

async function build() {
  const bundle = await rollup.rollup(inputOptions)
  // console.log(bundle.watchFiles)
  const { output } = await bundle.generate(outputOptions)

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      console.log('Asset', chunkOrAsset)
    } else {
      console.log('Chunk', chunkOrAsset.modules)
    }
  }
  await bundle.write(outputOptions)
}

build()
```

## 常用插件

- `rollup-plugin-node-resolve` 用于打包时找到引入的外部模块(`node_modules` 中的包)
- `rollup-plugin-commonjs` 将 `CommonJS` 模块转换为 `ES6`，以便可以将它们包含在汇总包中

### `rollup-plugin-node-resolve` 插件

使用 `Node resolution` 算法查找模块，以便在中使用第三方模块 `node_modules`

安装：

```bash
npm install --save-dev rollup-plugin-node-resolve
```

使用：

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'MyModule'
  },
  plugins: [
    resolve({
      // 在package.json中扫描的字段，以确定此列表是否包含“浏览器”的入口点，
      // 将使用在“ pkg.browser”中指定的替代
      mainFields: ['module', 'main'], // 默认: ['module', 'main']

      // 不推荐使用：如果可能，使用“ mainFields”代替ES6模块的“ module”字段
      module: true, // 默认: true

      // 不推荐使用：如果可能的指向第三方库中ES6模块的旧字段，
      // 请使用“ mainFields”而不是“ jsnext：main”，
      // 不建议使用“ pkg.module”：- see: https://github.com/rollup/rollup/wiki/pkg.module
      jsnext: true, // 默认: false

      // 不推荐使用：即使不是ES6模块（需要将其从CommonJS转换为ES6），
      // 也可以使用“ mainFields”或“ main.field”或index.js
      // –参见https://github.com/rollup/rollup-plugin-CommonJS的
      main: true, // 默认: true

      // 一些package.json文件具有一个“浏览器”字段，该字段指定供捆绑用于浏览器的用户加载的替代文件。
      // 如果是这样，请使用此选项或在“ mainfields”选项中添加“浏览器”，否则pkg.browser将被忽略。
      browser: true, // 默认: false

      // 并非您要解析的所有文件都是.js文件
      extensions: ['.mjs', '.js', '.jsx', '.json'], // 默认: [ '.mjs', '.js', '.json', '.node' ]

      // 是更喜欢内置模块（例如fs，path）还是本地名称相同的模块
      preferBuiltins: false, // 默认: true

      // 将模块搜索锁定在此路径中（例如chroot）。 在此路径之外定义的模块将被标记为外部
      jail: '/my/jail/path', // 默认: '/'

      // 设置为字符串或正则表达式的数组，以将模块搜索锁定到至少匹配一个条目的模块。
      // 与任何条目都不匹配的模块将被标记为外部
      only: ['some_module', /^@some_scope\/.*$/], // 默认: null

      // 如果为true，请检查已解析的文件以检查它们是否为 ES2015 modules
      modulesOnly: true, // 默认: false

      // 强制将这些模块解析为root的node_modules，如果从依赖项导入程序包，
      // 则有助于防止多次捆绑同一程序包。
      dedupe: ['react', 'react-dom'], // 默认: []

      // 应该传递给节点解析的所有其他选项
      customResolveOptions: {
        moduleDirectory: 'js_modules'
      }
    })
  ]
}
```

注意：由于 `node_modules` 文件夹中的大多数软件包可能都是旧版`CommonJS`而不是 `JavaScript` 模块，因此您可能需要使用 `rollup-plugin-commonjs`

### `rollup-plugin-commonjs`

将 `CommonJS` 模块转换为 `ES6`，以便可以将它们包含在汇总包中

安装：

```bash
npm install --save-dev rollup-plugin-commonjs
```

使用：
通常，您可以将此插件与 `rollup-plugin-node-resolve` 一起使用，以便将 `CommonJS` 依赖项捆绑在中 `node_modules` 。

```js
// rollup.config.js
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),

    commonjs({
      // 非CommonJS模块将被忽略，但是您也可以专门包含/排除文件
      include: 'node_modules/**', // 默认: undefined
      exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // 默认: undefined
      // 这些值也可以是正则表达式，包括：/ node_modules /

      // 搜索.js文件以外的文件（必须已由以前的插件编译！）
      extensions: ['.js', '.coffee'], // 默认: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // 默认: false

      // 如果为true，则此插件不会处理`global`的使用
      sourceMap: false, // 默认: true

      // 明确指定无法解析的命名出口（有关更多详细信息，请参见下文）
      namedExports: { react: ['createElement', 'Component'] }, // 默认: undefined

      // 有时您必须保留require语句不转换。 传递一个包含ID或`id => boolean`函数的数组。
      // 仅当您知道自己在做什么时才使用此选项！
      ignore: ['conditional-runtime-dependency']
    })
  ]
}
```

### `rollup-plugin-babel`

`Rollup` 和 `Babel` 之间的无缝集成。以使用浏览器和 `Node.js` 尚不支持的最新 `JavaScript` 功能

安装：

```
npm i -D rollup-plugin-babel @babel/core @babel/preset-env
```

将其添加到 rollup.config.js：

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只翻译我们的源代码
    })
  ]
}
```

在 Babel 实际编译您的代码之前，需要对其进行配置。创建一个新文件 src/.babelrc：

```js
{
  "presets": [
    ["@babel/env", {"modules": false}]
  ]
}
```

此设置有一些不寻常的元素。首先，我们要设置`"modules": false`，否则 `Babel` 将在 `Rollup` 有机会执行其操作之前将我们的模块转换为 `CommonJS`，从而导致其失败。

其次，我们将 `.babelrc` 文件放在中 `src` ，而不是项目根目录中。`.babelrc` 如果以后需要，这可以使我们对测试等事物有所不同–通常，对单独的任务进行单独的配置是一个好主意。

# rollup

## rollup 打包输出格式

cli 命令标志
`-f`: 相当于`--format` `--output.format`
`-o`: 相当于`--file` `--output.file`
`-c`: 相当于`--config`
`-d`: `--dir <dirname>`

format:

- `iife`： 对于 `浏览器`
- `cjs`： 对于 `Nodejs`
- `umd`： 对于 `浏览器` 和 `Nodejs`

命令行：

```js
export default function(a + b) {
  return a + b
}

```

```bash
# 把 main.js 打包成 浏览器可使用的 bundle.js 全局变量名为myBundle，代码中有导出就必须要定义--output.name
rollup main.js --file bundle.js --format iife --output.name myBundle
# 把 main.js 打包成 Node.js可使用的 bundle-cjs.js
rollup main.js --file bundle-cjs.js --format cjs
# 把 main.js 打包成 浏览器 和 Node.js 都可使用的 bundle-umd.js，代码中有导出就必须要定义--output.name
rollup main.js --file bundle-umd.js --format umd --output.name myBundle
```

### Tree-shaking (摇树优化)

让你使用 `ES6` 模块同时， `rollup` 会静态分析 `import` ，并排除任何未实际使用的代码。

## JavaScript Api

Rollup 提供 JavaScript 接口那样可以通过 Node.js 来使用。你可以很少使用，而且很可能使用命令行接口，除非你想扩展 Rollup 本身，或者用于一些难懂的任务，例如用代码把文件束生成出来。

```js
// 手动调用rollup api进行打包配置
const rollup = require('rollup')
const pkg = require('./package.json')
console.log(pkg.browser)

const inputOptions = {
  input: 'utils/main.js'
}
const outputOptions = {
  output: {
    file: pkg.browser,
    format: 'umd',
    name: 'utils'
  }
}

async function build() {
  const bundle = await rollup.rollup(inputOptions)
  // console.log(bundle.watchFiles)
  const { output } = await bundle.generate(outputOptions)

  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      console.log('Asset', chunkOrAsset)
    } else {
      console.log('Chunk', chunkOrAsset.modules)
    }
  }
  await bundle.write(outputOptions)
}

build()
```

## 常用插件

- `rollup-plugin-node-resolve` 用于打包时找到引入的外部模块(`node_modules` 中的包)
- `rollup-plugin-commonjs` 将 `CommonJS` 模块转换为 `ES6`，以便可以将它们包含在汇总包中

### `rollup-plugin-node-resolve` 插件

使用 `Node resolution` 算法查找模块，以便在中使用第三方模块 `node_modules`

安装：

```bash
npm install --save-dev rollup-plugin-node-resolve
```

使用：

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'MyModule'
  },
  plugins: [
    resolve({
      // 在package.json中扫描的字段，以确定此列表是否包含“浏览器”的入口点，
      // 将使用在“ pkg.browser”中指定的替代
      mainFields: ['module', 'main'], // 默认: ['module', 'main']

      // 不推荐使用：如果可能，使用“ mainFields”代替ES6模块的“ module”字段
      module: true, // 默认: true

      // 不推荐使用：如果可能的指向第三方库中ES6模块的旧字段，
      // 请使用“ mainFields”而不是“ jsnext：main”，
      // 不建议使用“ pkg.module”：- see: https://github.com/rollup/rollup/wiki/pkg.module
      jsnext: true, // 默认: false

      // 不推荐使用：即使不是ES6模块（需要将其从CommonJS转换为ES6），
      // 也可以使用“ mainFields”或“ main.field”或index.js
      // –参见https://github.com/rollup/rollup-plugin-CommonJS的
      main: true, // 默认: true

      // 一些package.json文件具有一个“浏览器”字段，该字段指定供捆绑用于浏览器的用户加载的替代文件。
      // 如果是这样，请使用此选项或在“ mainfields”选项中添加“浏览器”，否则pkg.browser将被忽略。
      browser: true, // 默认: false

      // 并非您要解析的所有文件都是.js文件
      extensions: ['.mjs', '.js', '.jsx', '.json'], // 默认: [ '.mjs', '.js', '.json', '.node' ]

      // 是更喜欢内置模块（例如fs，path）还是本地名称相同的模块
      preferBuiltins: false, // 默认: true

      // 将模块搜索锁定在此路径中（例如chroot）。 在此路径之外定义的模块将被标记为外部
      jail: '/my/jail/path', // 默认: '/'

      // 设置为字符串或正则表达式的数组，以将模块搜索锁定到至少匹配一个条目的模块。
      // 与任何条目都不匹配的模块将被标记为外部
      only: ['some_module', /^@some_scope\/.*$/], // 默认: null

      // 如果为true，请检查已解析的文件以检查它们是否为 ES2015 modules
      modulesOnly: true, // 默认: false

      // 强制将这些模块解析为root的node_modules，如果从依赖项导入程序包，
      // 则有助于防止多次捆绑同一程序包。
      dedupe: ['react', 'react-dom'], // 默认: []

      // 应该传递给节点解析的所有其他选项
      customResolveOptions: {
        moduleDirectory: 'js_modules'
      }
    })
  ]
}
```

注意：由于 `node_modules` 文件夹中的大多数软件包可能都是旧版`CommonJS`而不是 `JavaScript` 模块，因此您可能需要使用 `rollup-plugin-commonjs`

### `rollup-plugin-commonjs`

将 `CommonJS` 模块转换为 `ES6`，以便可以将它们包含在汇总包中

安装：

```bash
npm install --save-dev rollup-plugin-commonjs
```

使用：
通常，您可以将此插件与 `rollup-plugin-node-resolve` 一起使用，以便将 `CommonJS` 依赖项捆绑在中 `node_modules` 。

```js
// rollup.config.js
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'main.js',
  output: {
    file: 'bundle.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),

    commonjs({
      // 非CommonJS模块将被忽略，但是您也可以专门包含/排除文件
      include: 'node_modules/**', // 默认: undefined
      exclude: ['node_modules/foo/**', 'node_modules/bar/**'], // 默认: undefined
      // 这些值也可以是正则表达式，包括：/ node_modules /

      // 搜索.js文件以外的文件（必须已由以前的插件编译！）
      extensions: ['.js', '.coffee'], // 默认: [ '.js' ]

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // 默认: false

      // 如果为true，则此插件不会处理`global`的使用
      sourceMap: false, // 默认: true

      // 明确指定无法解析的命名出口（有关更多详细信息，请参见下文）
      namedExports: { react: ['createElement', 'Component'] }, // 默认: undefined

      // 有时您必须保留require语句不转换。 传递一个包含ID或`id => boolean`函数的数组。
      // 仅当您知道自己在做什么时才使用此选项！
      ignore: ['conditional-runtime-dependency']
    })
  ]
}
```

### `rollup-plugin-babel`

`Rollup` 和 `Babel` 之间的无缝集成。以使用浏览器和 `Node.js` 尚不支持的最新 `JavaScript` 功能

安装：

```
npm i -D rollup-plugin-babel @babel/core @babel/preset-env
```

将其添加到 rollup.config.js：

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // 只翻译我们的源代码
    })
  ]
}
```

在 Babel 实际编译您的代码之前，需要对其进行配置。创建一个新文件 src/.babelrc：

```js
{
  "presets": [
    ["@babel/env", {"modules": false}]
  ]
}
```

此设置有一些不寻常的元素。首先，我们要设置`"modules": false`，否则 `Babel` 将在 `Rollup` 有机会执行其操作之前将我们的模块转换为 `CommonJS`，从而导致其失败。

其次，我们将 `.babelrc` 文件放在中 `src` ，而不是项目根目录中。`.babelrc` 如果以后需要，这可以使我们对测试等事物有所不同–通常，对单独的任务进行单独的配置是一个好主意。
