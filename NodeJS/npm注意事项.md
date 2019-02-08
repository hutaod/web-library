## npm init

## npm install
1. `npm install -h` 用于查看 `npm install` 详细使用方式。
2. `npm i` 是 `npm install` 的简写，建议使用 `npm i`。
3. `npm i` 安装的模块是不会写入 package.json 的 dependencies (或 devDependencies)，需要添加其他参数：
   * `npm i express --save/npm i express -S` (安装 express，同时将 `"express": "^4.14.0"` 写入 dependencies )
   * `npm i express --save-dev/npm i express -D` (安装 express，同时将 `"express": "^4.14.0"` 写入 devDependencies )
   * `npm i express --save --save-exact` (安装 express，同时将 `"express": "4.14.0"` 写入 dependencies )， `--save-exact` 将固定版本号写入 dependencies。建议线上使用这种方式，可以预防第三方模块的新的小版本出现bug。
4. 运行```npm config set save-exact true```命令可以使每次 `npm i xxx --save` 的时候会锁定依赖的版本号，相当于加了 `--save-exact` 参数。
5. `npm config set` 命令将配置写到了 ~/.npmrc 文件，运行 `npm config list` 查看。

## npm shrinkwrap
`--save-exact` 并不能完全防止意外情况的发生，因为锁定的只是最外一层的依赖，而里层依赖的模块的 package.json 有可能写的是 `"mongoose": "*"`。为了彻底锁定依赖的版本，让你的应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层），通过运行 `npm shrinkwrap`，会在当前目录下产生一个 npm-shrinkwrap.json，里面包含了通过 node_modules 计算出的模块的依赖树及版本。只要目录下有 npm-shrinkwrap.json 则运行 `npm install` 的时候会优先使用 npm-shrinkwrap.json 进行安装，没有则使用 package.json 进行安装。

    注意: 如果 node_modules 下存在某个模块（如直接通过 `npm install xxx` 安装的）而 package.json 中没有，运行 `npm shrinkwrap` 则会报错。另外，`npm shrinkwrap` 只会生成 dependencies 的依赖，不会生成 devDependencies 的。