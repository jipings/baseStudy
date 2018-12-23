import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import path from 'path';
// import ExPlugin from './js/webpackPlugin';
import FilePlugin from './js/FileListPlugin';

const config = {
  entry: './js/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
    // new ExPlugin()
    new FilePlugin(),
  ]
};

export default config;