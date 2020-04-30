const rules = [
  /*
    css,scss,sass 处理
  */

  /*
    js 处理
  */

  /*
    html 处理
  */

  /*
    file-loader 图片文件处理
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

module.exports = rules