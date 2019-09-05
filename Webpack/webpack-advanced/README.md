# webpack 进阶

## 代码压缩

### JavaScript 代码压缩

`webpack4` 内置了 `uglifyjs-webpack-plugin`

### CSS 代码压缩

使用 `optimize-css-assets-webpack-plugin` ，需要配合 `cssnano`

```javascript
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  plugins: [
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano')
    })
  ]
}
```

### HTML 代码压缩

使用 `html-webpack-plugin` , 设置压缩参数

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: '首页',
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      // 压缩参数设置
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    })
  ]
}
```

## 清理构建目录

### 手动清理

rm -rf ./dist
rimraf ./dist

### 自动清理

避免构建前每次都需要⼿手动删除 `dist` 使⽤ `clean-webpack-plugin`

```javascript
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  // ...
  plugins: [
    // ...
    new CleanWebpackPlugin()
  ]
}
```

## 自动补全 CSS3 前缀

用 postcss-loader 配合 autoprefixer 插件 自动补⻬齐 CSS3 前缀

```javascript
module.exports = {
  module: {
    rules: [
      // ...
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 versions', '>1%']
                })
              ]
            }
          }
        ]
      }
    ]
  }
}
```

## 移动端 CSS px 自动转换成 rem

### 方式一 px2rem-loader + lib-flexible

使⽤ `px2rem-loader` 让 px 自动转换成 rem

⽤手淘的 `lib-flexible` 库⻚面渲染时计算根元素的 `font-size` 值

```javascript
module.exports = {
  module: {
    rules: [
      {
        loader: 'px2rem-loader',
        options: {
          remUnit: 37.5,
          remPrecision: 8
        }
      }
    ]
  }
}
```

## 资源内联

代码层面：

- 页面框架的初始化脚本
- 上报相关打点
- css 内联避免页面闪动

请求层面：减少 HTTP 网络请求数

- 小图片或者字体内联： `url-loader`

### HTML 和 JS 内联

使用 raw-loader 内联 html

```html
<script>
  ${require('raw-loader!babel-loader!./meta.html')}
</script>
```

使用 raw-loader 内联 js

```html
<script>
  ${require('raw-loader!babel-loader!../node_modules/lib-flexible')}
</script>
```

### CSS 内联

#### 借助 style-loader

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top', // 样式插入到 <head>
              singleton: true // 将所有的style标签合并成一个
            }
          },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

#### html-inline-css-webpack-loader
