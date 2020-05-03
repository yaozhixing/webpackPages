const path = require("path");
const glob = require("glob")
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html解析
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除 dist 目录
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // header的style => 打包独立的css
const PurifyCssWebpack = require("purifycss-webpack"); // 消除冗余(不用到的)css
const CopyWebpackPlugin = require("copy-webpack-plugin");

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

  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },

        // 抽离自己写的公共代码，common这个名字可以随意起
        utils: {
          chunks: "initial",
          name: "common",// 任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 2
        }
      }
    }
  },

  plugins: [
    new CleanWebpackPlugin(),

    //静态资源输出
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "../src/static"),
      to: './static',
      ignore: ['.*']
    }]),

    // 分离css插件参数为提取出去的路径
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:8].min.css',
    }),

    // 消除冗余的css代码
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, "../src/pages/*/*.html"))
    }),

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
    chunks: ['vendor', 'common', item], // 【注意】：加载相对应的js入口文件，不然会加载全部的入口文件
    minify: {
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: true, //折叠空白区域 也就是压缩代码
      removeAttributeQuotes: true, //去除属性引用
    },
  }))
});
