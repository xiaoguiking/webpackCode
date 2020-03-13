const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 以前，clean-webpack-plugin 是默认导出的，现在不是，所以引用的时候，需要注意一下。另外，现在构造函数接受的参数是一个对象，可缺省。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: '[name][hash:4].js', // 打包后的文件名,随机名+ hash 防止缓存
        path: path.resolve(__dirname, 'dist')
    },
    //开发服务器配置
    devServer: {
        //指向指定的目录
        contentBase: './dist',
        // 热更新机制
        hot: true,
        // 使用端口  
        port: 3000,
        // 进度条
        progress: true,
        compress: true //是否启用 gzip 压缩
    },
    module: { // 模块
        rules: [ // 规则 css-loader 接续@import语法
            //  style-loader 插入到head标签中
            // loader特点 希望单一
            // 多个loader需要 []
            // loader执行顺序从右到左  从下到上
            //loader 可以写成对象形式，方便写参数
            // 配置css
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', 
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            },
            // 处理less文件
            {
                test: /\.less/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     // options:{

                    //     // }    
                    // },
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                                })
                            ]
                        }
                    },
                    'less-loader',
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
    // 放着所有的webpack 插件
    plugins: [
        // 设定 HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            // title: 'Webpack world',
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['index'], // 对应index.html
            minify: {
                // 删除多余双引号
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            },
            // 防止缓存
            hash: true
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        // 压缩css
        new OptimizeCSSAssetsPlugin(),
    ]
}

