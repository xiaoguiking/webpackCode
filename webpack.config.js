const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
    mode: 'development',
    entry: {
        index:'./src/index.js',
        other:'./src/other.js'
    },
    output: {
         // 添加hash可以防止文件缓存，每次都会生成4位的hash串
         filename: '[name].js', // 打包后的文件名子
         path: path.resolve (__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        hot: true,    // 热更新机制
        port: 3000,   // 使用端口
    },
    module: {
        rules: [
            // 配置css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            // 配置html
            {
                test: /\.(html|html)/,
                use: [
                    'raw-loader'
                ]
            }
        ]
    },
    // 设定 HtmlWebpackPlugin
    plugins: [  
        new HtmlWebpackPlugin({
            title: 'Webpack world',
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index']  // 对应index.html
        }),
        new HtmlWebpackPlugin({
            title: 'world',
            filename: 'other.html',
            template: './src/other.html',
            chunks: ['other'],   // 对应的是other.js
        })
    ]
}

