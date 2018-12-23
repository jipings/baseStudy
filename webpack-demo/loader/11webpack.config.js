// const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack'); //访问内置的插件
const path = require('path');

const config = {
  entry: './js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     use: 'babel-loader'
    //   },
       {
          test: /\.js$/,
          use: [{ // 指向编写的loader文件
              loader: path.resolve('./loader.js'),
            // 匹配多个loaders, 可以使用 resolveLoader.modules配置，webpack将会在
            // 这些目录中搜索这些loaders。如果你有一个 /loaders本地目录
            //   resolveLoader: {
            //       modules: [
            //           'node_modules',
            //           path.resolve(__dirname, 'loaders'),
            //       ]
            //   },
              options: {} 
          }]
      }
    ],

  },
//   plugins: [
//     new webpack.optimize.UglifyJsPlugin(),
//     new HtmlWebpackPlugin({template: './index.html'})
//   ]
};

module.exports = config;