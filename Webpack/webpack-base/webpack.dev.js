const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
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
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.less$/,
        // exclude: /\.(module.less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      // {
      //   test: /\.(module.less)$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     },
      //     'less-loader',
      //     'postcss-loader'
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
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    // 以下两个用于热模块替换
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /src\/common\.scss/,
      "./src/common/test/var.scss"
    ),
  ],
};
