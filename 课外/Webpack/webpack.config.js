const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 引入 mini-css-extract-plugin 插件
// 作用：将 CSS 从 JS 中提取到独立的 .css 文件（生产环境推荐）
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 判断当前是否为开发环境
// process.env.NODE_ENV 是 Node.js 环境变量
// 如果不是 'production'（生产环境），则 devMode 为 true（即开发模式）
const devMode = process.env.NODE_ENV !== 'production';




// webpack 配置文件，建在根目录

//找包->下包->配置->试运行

//只能有一个module.exports
module.exports = {
    // 入口文件
    entry: path.resolve(__dirname, 'src/login/index.js'),
    // path.resolve()方法将路径或路径片段解析为绝对路径

    // 输出文件
    output: {
        // 输出文件名
        filename: "./login/index.js",
        // 输出文件路径
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 每次打包前清空dist文件夹(在webpage 5.20.0以上支持)

    },
    // 添加插件
    plugins: [
        // 提取html
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/login/index.html'),//输出文件
            template: path.resolve(__dirname, 'public/login.html'),//模板文件
        }),
        // 提取css到文件夹，和style-loader不能一起使用
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),//生成css文件
    ],
    // 模块加载器(让webpack能够处理非js文件)
    module: {
        //模块加载规则
        rules: [
            {
                test: /\.css$/i,    //匹配以.css结尾的文件（/i 忽略大小写）
                // use: ['style-loader', 'css-loader'],    //使用style-loader和css-loader
                use: [MiniCssExtractPlugin.loader, 'css-loader'],    //使用MiniCssExtractPlugin.loader和css-loader（生产环境推荐）
            },
            // {
            //     // 匹配所有 .sass、.scss、.css 文件（/i 表示忽略大小写）
            //     test: /\.(sa|sc|c)ss$/i,
            //     use: [
            //         // 根据环境动态选择 loader：
            //         // - 开发环境 (devMode=true)：用 style-loader → 将 CSS 注入 <style> 标签（热更新友好）
            //         // - 生产环境 (devMode=false)：用 MiniCssExtractPlugin.loader → 提取为独立 CSS 文件
            //         devMode ? 'style-loader' : MiniCssExtractPlugin.loader,

            //         // css-loader：解析 CSS 中的 @import 和 url()，并将 CSS 转为 JS 模块
            //         'css-loader',

            //         // postcss-loader：用于 autoprefixer 等 CSS 兼容性处理（需额外配置 postcss.config.js）
            //         'postcss-loader',

            //         // sass-loader：编译 .sass/.scss 文件为 CSS（需安装 node-sass 或 dart-sass）
            //         'sass-loader',
            //     ],
            // },
        ],
    },


}