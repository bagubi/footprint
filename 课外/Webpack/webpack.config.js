const path = require('path');
// 提取html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 作用：将 CSS 从 JS 中提取到独立的 .css 文件（生产环境推荐）
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 13.3判断当前是否为开发环境
// process.env.NODE_ENV 是 Node.js 环境变量
// 如果不是 'production'（生产环境），则 devMode 为 true（即开发模式）
// const devMode = process.env.NODE_ENV !== 'production';
//配合：

// module: {
//     //模块加载规则
//     rules: [
//         //打包css文件
//         {
//             test: /\.css$/i,    //匹配以.css结尾的文件（/i 忽略大小写）
//             // use: ['style-loader', 'css-loader'],    //使用style-loader和css-loader
//             //这行要改
//             use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],    //使用MiniCssExtractPlugin.loader和css-loader（生产环境推荐）
//         },
//如果不用devMode就写成下面这样


// 7.优化-压缩css文件（要配合MiniCssExtractPlugin.loader 使用）
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

//14.前端注入环境变量
const webpack = require('webpack');


//15.开发环境调错-source map(!!!!!!仅用于开发环境)
const config = {
    // 11.指定构建模式（development 开发模式 或 production），可被环境变量覆盖
    //设置方式1：在webpack.config.js中设置mode: 'development'或'mode: 'production'，默认值为production
    //设置方式2：在package.json的scripts里"dev": "webpack server --mode=development"，"build": "webpack --mode=production"
    //package.json里设置的命令行优先级高于webpack.config.js里的mode配置项
    // （推荐使用命令行设置）
    // mode: 'development',

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
        // 处理静态资源文件的输出路径和文件名（如图片），放在dist/assets目录下，保持原文件名和扩展名
        // assetModuleFilename: 'assets/[name][ext][query]',


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
            //只能写相对路径，不能写拼接路径
            filename: './login/index.css',
        }),//生成css文件

        //14.前端注入环境变量
        new webpack.DefinePlugin({
            //key 是注入到打包后的前端JS代码中作为全局变量
            //value 是注入的值，必须是字符串（在corss-env 注入在node.js中的环境变量）
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    // 模块加载器(让webpack能够处理非js文件)
    module: {
        //模块加载规则
        rules: [
            //打包css文件
            {
                test: /\.css$/i,    //匹配以.css结尾的文件（/i 忽略大小写）
                // use: ['style-loader', 'css-loader'],    //使用style-loader和css-loader
                use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],    //使用MiniCssExtractPlugin.loader和css-loader（生产环境推荐）
            },

            // 打包sass/scss代码
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

            // 打包less代码
            {
                test: /\.less$/i,
                use: [
                    // 提取为独立 CSS 文件
                    // MiniCssExtractPlugin.loader,
                    //升级成支持环境切换
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    // 将 CSS 代码注入到 HTML 页面（后
                    //不能和 MiniCssExtractPlugin.loader 一起使用（生产环境推荐）
                    // 'style-loader',
                    // 将 CSS 转化成 CommonJS 模块（中
                    'css-loader',
                    // 将 Less 编译成 CSS（先
                    'less-loader',
                ],
            },
            // 打包图片输出的路径(另一种输出路径的方式，和output.assetModuleFilename二选一即可)
            // 大于8kb的图片会被打包成单独的文件，小于8kb的图片会被转成base64字符串直接嵌入js文件中（默认值）
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset',
                parser: { // ← 必须添加
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 小于8KB转base64
                    }
                },
                generator: {
                    filename: 'assets/[hash][ext][query]'
                }
            }
        ],
    },
    // 优化项（自定义项）
    optimization: {
        // 最小化
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            // 压缩css要和 MiniCssExtractPlugin.loader 一起使用
            new CssMinimizerPlugin(),
        ],
    },


}
//开发环境下使用 source map 选项
if (process.env.NODE_ENV === 'development') {
    config.devtool = 'inline-source-map'; // 开发环境推荐使用 inline-source-map，生产环境推荐使用 source-map
}



// webpack 配置文件，建在根目录

//找包->下包->配置->试运行

//只能有一个module.exports
module.exports = config;