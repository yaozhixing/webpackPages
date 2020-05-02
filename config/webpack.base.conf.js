const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html解析
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除 dist 目录
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* 外部引入文件 */
const getEntry = require("./entry.config"); // 入口集合
const rules = require("./webpack.rules.conf"); // rules集合

module.exports = {
  entry: getEntry(),

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

  //将外部变量或者模块加载进来
  externals: {
    'jquery': 'window.jQuery'
  },

  plugins: [
    new CleanWebpackPlugin(),

    // 分离css插件参数为提取出去的路径
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:8].min.css',
    })

  ]
}


// 批量生成 html 模板
Object.keys(getEntry()).forEach((item) => {
  module.exports.plugins.push(new HtmlWebpackPlugin({
    filename: `${item}.html`,
    template: `./src/pages/${item}/index.html`,
    inject: true,
    //按chunks的顺序对js进行引入
    chunkSortMode: 'dependency',
    hash: true,
    chunks: [item], // 【注意】：加载相对应的js入口文件，不然会加载全部的入口文件
    minify: {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, //去除属性引用
    },
  }))
});
