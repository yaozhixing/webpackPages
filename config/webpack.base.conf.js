const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html解析
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除 dist 目录

/* 外部引入文件 */
const entry = require("./entry.config"); // 入口集合
const rules = require("./webpack.rules.conf"); // rules集合

module.exports = {
  entry,

  module: {
    rules: [...rules]
  },

  resolve: {
    extensions: [".js", ".json", ".jsx", ".vue", ".less", ".scss", ".css"],
    // 别名
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/pages/index/index.html",
      hash: true
    })
  ]
}