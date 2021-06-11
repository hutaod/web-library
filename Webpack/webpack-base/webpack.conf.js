const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const production = process.env.NODE_ENV === "production";

const TestReplacePlugin = require("./TestReplacePlugin");

process.env.APP_NAME = "in";

module.exports = {
  mode: "development",
  entry: {
    // login: './src/login.js',
    main: "./src/login.js",
  },
  output: {
    filename: production ? "[name]_[chunkhash:8].js" : "[name].js",
    path: __dirname + "/dist",
  },
  devtool: "inline-source-map",
  devServer: {
    port: 8090,
    // open: true,
    contentBase: "./dist/index.html",
    // hot: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // },
      {
        test: /\.less$/,
        exclude: /\.(module.less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(module.less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            // options: {
            //   import: (url, media, resourcePath) => {
            //       console.log(4444, url, resourcePath)
            //     // resourcePath - css 文件路径

            //     // 不处理 `style.css` 的导入
            //     // if (url.includes("style.css")) {
            //     //   return false;
            //     // }

            //     return true;
            //   },
            //   // url: (url, resourcePath) => {
            //   //   // resourcePath - css 文件的路径
            //   //   console.log(4444, url, resourcePath)
            //   //   // 不处理 `img.png` url
            //   //   // if (url.includes("img.png")) {
            //   //   //   return false;
            //   //   // }

            //   //   return true;
            //   // },
            // },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: async (content, loaderContext) => {
                // More information about available properties https://webpack.js.org/api/loaders/
                const { resourcePath, rootContext } = loaderContext;
                const relativePath = path.relative(rootContext, resourcePath);
                console.log(3333, relativePath);
                if (relativePath === "styles/foo.scss") {
                  return "$value: 100px;" + content;
                }

                return `$APP_NAME: ${process.env.APP_NAME};` + content;
              },
              // sassOptions: (loaderContext) => {
              //   // 有关可用属性的更多信息 https://webpack.js.org/api/loaders/
              //   const { resourcePath, rootContext } = loaderContext;
              //   const relativePath = path.relative(rootContext, resourcePath);
              //   // console.log(3333, relativePath, loaderContext)
              //   if (relativePath === "styles/foo.scss") {
              //     return {
              //       includePaths: ["absolute/path/c", "absolute/path/d"],
              //     };
              //   }

              //   return {
              //     includePaths: ["absolute/path/a", "absolute/path/b"],
              //   };
              // },
            },
          },
          "postcss-loader",
          // {
          //   loader: 'resolve-url-loader',

          // }
          // {
          //   loader: 'file-replace-loader',
          //   options: {
          //     condition: "always",
          //     // condition: process.env.NODE_ENV === 'development',
          //     // replacement: resolve('./config.dev.js'),
          //     replacement(resourcePath) {
          //       console.log(1111, resourcePath)
          //       if (resourcePath.endsWith('common/var.scss')) {
          //         return resolve('common/test/var.scss');
          //       }
          //     },
          //     async: true,
          //   }
          // }
        ],
      },
      // {
      //   test: /\.(png|svg|jpe?g|gif)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name]_[hash:8].[ext]'
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
              limit: 10240,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      title: "首页",
      template: "./src/index.html",
      inject: true,
      chunks: ["main"],
      filename: "index.html",
    }),
    // new webpack.NormalModuleReplacementPlugin(
    //   /src\/common\.scss/,
    //   './src/common/test/var.scss'
    // ),
    // new HtmlWebpackPlugin({
    //   title: '登录',
    //   template: './src/index.html',
    //   inject: true,
    //   chunks: ['login'],
    //   filename: 'login.html'
    // }),
    // 以下两个用于热模块替换
    // new webpack.NamedModulesPlugin(), // development 内置了
    new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/assets'),
    //     to: path.resolve(__dirname, 'dist/assets')
    //   }
    // ])
    new TestReplacePlugin(),
    // new webpack.NormalModuleReplacementPlugin(
    //   /\.scss$/,
    //   function (resource) {
    //     console.log(1111, resource)
    //     // resource.request = resource.request.replace(
    //     //   /-APP_TARGET/,
    //     //   `-${appTarget}`
    //     // );
    //   }
    // ),
    new webpack.DefinePlugin({
      "process.env.APP_NAME": JSON.stringify(process.env.APP_NAME),
    }),
  ],
  resolve: {
    // extensions: tenantizeExtensions(process.env.TENANT, [".scss"]),
    alias: {
      // [path.resolve(__dirname, "src/counter.js")]: path.resolve(__dirname, "src/counter2.js")
      // [path.resolve(__dirname, "src/common/var.scss")]: path.resolve(__dirname, "src/common/test/var.scss")
    },
  },
  // watch: true, // 默认false
  // watchOptions: {
  //   // 忽略node_modules的变化
  //   ignored: /node_modules/,
  //   // 监听到文件变化后，等300ms再去执行，默认300ms
  //   aggregateTimeout: 300,
  //   // 判断文件是否发生变化时通过不停的询问系统指定文件有没有变化，默认每秒询问1次
  //   poll: 1000 // 单位ms
  // }
};

// function tenantizeExtensions (tenant, extensions){
//   console.log(123, [
//     ...extensions.map(ext => `.${tenant}${ext}`),
//     ...extensions,
//   ])
//   return  [
//     ...extensions.map(ext => `.${tenant}${ext}`),
//     ...extensions,
//     ".js", ".jsx", ".css", ".scss"
//   ];
// }
