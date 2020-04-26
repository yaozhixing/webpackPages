// 这里需要用到node的path模块
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html解析
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除 dist 目录

const glob = require("glob")

function getEntry() {
  let entryObj = {}
  glob.sync("./src/pages/**/*.js").forEach((item) => {
    let entryArr = []
    const start = item.indexOf("pages/") + 6; // 起点
    const end = item.lastIndexOf("/"); // 终点，最后一个反斜杆
    const name = item.substring(start, end)
    entryArr.push(item)
    entryObj[name] = entryArr
  })
  return entryObj
  // { home: ['.src/pages/home/index.js'] }
}


module.exports = {
  mode: "development", // "production" | "development"

  // 指定需要打包的文件
  entry: {
    main: './src/index/index.js'
  },

  // 指定打包后文件输出的路径和输出文件的名称
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },

  // 打包前和打包后映射关系
  devtool: "cheap-module-eval-source-map",  // product: cheap-module-source-map

  module: {
    rules: [
      /*
        test：但凡正则表达式匹配到png、jpg、gif结尾的文件
        use：就使用file-loader进行处理
        */
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // file-loader新版本默认使用了esModule语法
              esModule: false,
              name: '[name].[ext]',
              // 指定打包后文件存放目录
              outputPath: 'images/',
              // 指定托管服务器地址(统一替换图片地址)
              // publicPath: ''
            }
          }
        ]
      }
    ]
  },

  // 热更新
  devServer: {
    contentBase: "./",
    historyApiFallback: true, // 404时返回index.html
    inline: true, // 用来支持dev-server自动刷新的配置
    hot: true, // 启动webpack热模块替换特性
    host: "0.0.0.0",
    port: 9000,
    compress: true,//是否启用gzip压缩
  },

  plugins: [
    // 打包前清除输出目录
    new CleanWebpackPlugin(),

    // 通过new一下这个类来使用插件
    new HtmlWebpackPlugin({
      // 在src目录下创建一个index.html
      template: './src/index/index.html',
      hash: true, // 会在打包好的bundle.js后面加上hash串
    })
  ]

}