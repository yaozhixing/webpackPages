const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html解析
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除 dist 目录

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

    // new HtmlWebpackPlugin({
    //   // 在src目录下创建一个index.html
    //   filename: 'index.html',
    //   template: './src/pages/index/index.html',
    //   hash: true, // 会在打包好的bundle.js后面加上hash串
    // }),

    // new HtmlWebpackPlugin({
    //   filename: 'aboutUs.html',
    //   template: './src/pages/aboutUs/index.html',
    //   hash: true,
    // }),

    // new HtmlWebpackPlugin({
    //   filename: 'company.html',
    //   template: './src/pages/company/index.html',
    //   hash: true,
    // }),

    // new HtmlWebpackPlugin({
    //   filename: 'product.html',
    //   template: './src/pages/product/index.html',
    //   hash: true,
    // })
  ]
}

// const renderHtmlPlugins = (item) => {
//   return new HtmlWebpackPlugin({
//     filename: `${item}.html`,
//     template: `./src/pages/${item}/index.html`,
//     // template: `./src/pages/${item}/index.html`,
//     hash: true
//   })
// }


// 批量生成 html 模板
Object.keys(getEntry()).forEach((item) => {
  console.log("-----------------------", item)
  // module.exports.plugins.push(renderHtmlPlugins(item))
  module.exports.plugins.push(new HtmlWebpackPlugin({
    filename: `${item}.html`,
    template: `./src/pages/${item}/index.html`,
    hash: true
  }))
});
