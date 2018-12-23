var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: ['webpack-hot-middleware/client','./src/index.js'],
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    module: {
        rules: [
            { // loader-css
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, { // loader-image
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }, { // loader-font
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // use loaders when it is array. Or it comes error maybe.
                loaders: [ 'babel-loader'],
              },{
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            }, {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
            
            ]
    },
    resolve: {
        modules: [
          path.join(__dirname, "src"),
          "node_modules",
        ],
        extensions: ['.ts', '.tsx', '.js'],
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            favicon: './src/favicon.ico'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1.5,
            moveToParents: true
          }),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
              context: __dirname,
              debug: true,
              ROOT_PATH: path.resolve(__dirname, '..'),
              APP_PATH: path.resolve(__dirname, 'src'),

            }
          }),
    ]
};