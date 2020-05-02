const rules = [
  /*
    css,scss,sass 处理
  */
  {
    test: /\.(css|scss|sass)$/,
    use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
  },

  /*
    js 处理
  */
  {
    test: /\.js$/,
    use: [{
      loader: "babel-loader"
    }],
    exclude: "/node_modules" // 不包括
  },

  /*
    html 处理
  */
  {
    test: /\.html$/,
    use: {
      loader: "html-loader",
      options: {
        attrs: ["img:src", "img:data-src", "audio:src"],
        minimize: true
      }
    }
  },

  /*
     url-loader 图片文件处理
   */
  {
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: "url-loader",
      options: {
        limit: 5 * 1024, // 小于这个以base64位图处理
        // 图片文件输出的文件夹
        publicPath: "../images/",
        outputPath: "images"
      }
    }]
  },

  /*
    file-loader 图片文件处理
  */
  /*{
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
  }*/

]

module.exports = rules