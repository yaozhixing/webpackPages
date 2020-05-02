
const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackBaseConf = require('./webpack.base.conf');
const webpackDevConf = {

  mode: "development",

  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },

  // output: {
  //   filename: "bundle.js",
  //   path: path.resolve(__dirname, "dist")
  // },

  devtool: "cheap-module-eval-source-map",  // product: cheap-module-source-map

  devServer: {
    contentBase: path.join(__dirname, "../src/pages/index"),
    publicPath: "/",
    // historyApiFallback: true, // 404时返回index.html
    inline: true, // 用来支持dev-server自动刷新的配置
    hot: true, // 启动webpack热模块替换特性
    host: "0.0.0.0",
    port: 9000,
    compress: true,//是否启用gzip压缩
    // open: true, // 开启浏览器

    // 代理
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 域名
        changOrigin: true,
        pathRequiresRewrite: {
          "^/api": ""
        }
      }
    }

  }
}

module.exports = merge(webpackBaseConf, webpackDevConf);