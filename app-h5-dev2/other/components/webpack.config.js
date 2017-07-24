var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080/',
        './index'
    ], //唯一的入口文件
    output: {
        path: path.resolve(__dirname, 'static'), // 打包后的文件存放的地方
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }, // resolve 指定可以被 import 的文件后缀
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.js|jsx$/, // loaders所处理的文件的拓展名的正则表达式（必须）
            exclude: /node_modules/, // 手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
            loader: 'babel' //在webpack的module部分的loaders里进行配置即可
        }, {
            test: /\.css$/,
            loader: 'style!css' // 感叹号的作用在于使同一文件能够使用不同类型的loader
        }, {
            test: /\.(png|gif|jpg|)$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080/'
        })
    ]
}
