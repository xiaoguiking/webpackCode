# WebPack 

中文官网： https://www.webpackjs.com/

`学习过程使用yarn安装`

- [01webpack介绍](###01webpack介绍)  
- [02webpack基础配置](###02webpack基础配置)  
- [### 03手动配置webpack文件](###03手动配置webpack文件)  
- [04html插件](###04html插件)
- [05css样式处理(1)](###05css样式处理(1))
- [06css样式处理(2)](###06css样式处理(2))
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()


## 01webpack介绍

```
"webpack": "^4.42.0",
"webpack-cli": "^3.3.11",
```

**1.webpack概念**
webpack是现代JavaScript应用程冠希的静态模块打包器(module bundler)
,当webpack处理应用程序时候，会递归构建一个依赖关系图，应用程序使用到的每一个模块，将所有的模块打包成一个或多个bundle,webpack是基于node写出，需要使用node写法

**2.核心概念**
- 入口entry
- 输出output
- loader
- 插件plugins


**3.具体功能**
> 代码转换 文件优化 代码分割 模块合并 自动刷新 代码校验 自动发布


### 02webpack基础配置

- 初始化环境环境
  ```
  yarn init -y 
  效果生成 package.json
  ```
- 安装webpack依赖
  ```
  yarn add webpack webpack-cli -D
  ```
- 建立对应文件夹 `src/index.js`
  ```
  console.log('webpack hello')
  ```
- 此刻直接可以使用npx webpack 打包
  ```
  生成dist/main.js
  ```
- 在dist建立index.html 引入main.js
  ```
  查看console 时候有打印结果
  ```

### 03手动配置webpack文件

- 根目录建立`webpack.config.js`
  ```
  const path = require('path');
  module.exports = {
    mode: 'development',  // 默认模式是production, 选择开发dev,能够清楚过程
    entry: './src/index.js', // 入口文件
    output: {
      filename: 'bundle.js',  // 打包后的文件名
      path: path.resolve('__dirname', 'dist'), // 路径必须是绝对路径
    }
  }
  ```
- 方便执行在`package.json`写入对应的脚本命令
    ```
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",   // 参数1： 执行， 参数2：指定对应的文件
    "dev": "webpack-dev-server --open"      // 默认自动弹出对应端口
  },
    ```

### 04html插件

- 安装启动服务插件
  ```
    yarn add webpack-dev-server -D

    默认效果： 浏览器可以使用localhost: 8080 
  ```
- `webpack.config.js`相关配置
  ```
  //开发服务器配置
  devServer: {
    // 指向指定的目录
    contentBase: './dist',
    // 热更新
    hot: true,
    // 使用端口
    port: 3000,
    // 进度条
    progress: true,
  }
  ```

- 安装html插件
  ```
  yarn add html-webpack-plugin -D
  ```
- src/index.html
  ```
  <body>
    <div>webpack hello<div>
  </body>
  ```
- 配置webpack.config.js
  ```
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    // 放置所有的插件
    plugins: [
      // 设定 HtmlWebpackPlugin
      new  HtmlWebpackPlugin({
        // 放入模板
        template: './src/index.html',
        // 打包后的文件名
        filename: 'index.html',
        minify: {
        // 删除双引号
        removeAttributeQuotes: true,
        // 折叠成一行
        },
        // 防止缓存
        hash: true
      })
    ]
  ```

  ### 05css样式处理(1)

- 安装css解析插件
  ```
    yarn add css loader-css style-loader -D
  ```
- 配置webpack.config.js
  ```
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
                    'style-loader', 
                    'css-loader',
                ]
            },
        ]
    },
  ```
- 引入css文件
   ```
   src/index.js
   import './style.css'
   ```
- 安装less 插件
    ```
    yarn add less less-loader -D
    ```
- 创建引入
    ```
    src/index.less
    body {
      .test{
        color: cyan;
      }
    }

    // 引入 src/index.js
    import './index.less'
    ```

  ### 06css样式处理(2)