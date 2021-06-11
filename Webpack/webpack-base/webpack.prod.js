const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const production = process.env.NODE_ENV === "production";

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
    contentBase: "./public/login.html",
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
        use: ["style-loader", "css-loader", "sass-loader"],
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
    // new HtmlWebpackPlugin({
    //   title: '登录',
    //   template: './src/index.html',
    //   inject: true,
    //   chunks: ['login'],
    //   filename: 'login.html'
    // }),
    // 以下两个用于热模块替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/assets'),
    //     to: path.resolve(__dirname, 'dist/assets')
    //   }
    // ])
  ],
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
