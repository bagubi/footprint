/**
 * (打包入口文件src/index.js)
 * 1.体验 webpack 打包过程
 */
// //1.1准备项目和源代码
import { checkPhone, checkCode } from '../utils/check.js';
// //传入手机号
// console.log(checkPhone('123456'));
// //传入验证码
// console.log(checkCode('123456'));

//1.2准备 webpack 打包的环境：npm i webpack webpack-cli --save-dev
//去package.json中添加打包命令："build": "webpack"


//1.3执行自定义打包命令：npm run 自定义命令（build）


//2.修改打包入口和出口（看官方文档）
//2.1项目根目录新建webpack.config.js文件
//2.2配置入口entry和出口output


//3.用户登录
//3.1准备登录页面
//3.2准备登录页面的js代码（src/login/index.js）
//3.3打包并手动复制html网页到dist文件夹中，引入打包后的js文件运行

//3.2 JS代码
// src/login/index.js（修正版）
// document.getElementById('loginForm').addEventListener('submit', (e) => {
//     e.preventDefault();

//     const phone = document.getElementById('phone').value;
//     const password = document.getElementById('password').value;

//     // 校验手机号
//     if (!checkPhone(phone)) {
//         console.log('手机号格式不正确！必须是11位数字');
//         return;
//     }

//     // 简单校验密码非空（或可加长度限制）
//     if (password.length < 6) {
//         console.log('密码至少6位');
//         return;
//     }

//     console.log('手机号:', phone);
//     console.log('密码:', password);
//     alert('登录成功（演示）！');
// });

//4.使用插件自动生成html文件并引入打包后的js文件
//4.1安装插件：npm i html-webpack-plugin --save-dev
//4.2在webpack.config.js中引入插件并配置


//5.使用loader加载css文件
//5.1把css引入js文件中：import './style.css';
import './login.css';
//5.2安装loader：npm i style-loader css-loader --save-dev

//如果用bootstrap等第三方库
//npm i bootstrap
import 'bootstrap/dist/css/bootstrap.css';


//6.优化-提取css文件
//6.1安装插件：npm i mini-css-extract-plugin --save-dev （不能和style-loader一起使用）
//6.2在webpack.config.js中引入插件并配置


//7.优化-压缩css文件
//7.1安装插件：npm i css-minimizer-webpack-plugin --save-dev
//7.2在webpack.config.js中引入插件并配置（生产环境推荐）


//8.打包less代码
//8.1新建less代码（设置背景图）并引入到src/login/index.js中
import './index.less';
//8.2安装loader：npm i less less-loader --save-dev
//8.3在webpack.config.js中配置loader


//9.打包图片
//9.1新建图片并引入到src/login/index.js中
//9.2在webpack.config.js中配置loader（webpack5内置asset模块）
//注意： js 中引入本地图片资源要用 import 方式（如果是网络图片http地址，字符串可以直接写）
import logo from './assets/logo.png';
// 添加前检查是否已存在 logo 图片
const container = document.querySelector('.login-container');
// 添加前检查是否已存在 logo 图片
const existingLogo = document.querySelector('.login-container img.logo-img');
if (!existingLogo) {
    const img1 = document.createElement('img');
    img1.src = logo;
    img1.classList.add('logo-img');  // 添加类名便于识别
    img1.alt = 'Logo';
    document.querySelector('.login-container').appendChild(img1);
}


//10.完成登录功能
//10.1 使用npm 下载axios库：npm i axios
//10.2 准备并修改 utils 工具包源代码导出实现函数
//10.3 导入并编写逻辑弹幕，打包后运行观察效果

import myAxios from '../utils/request.js';
import { myAlert } from '../utils/alert.js';
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const btn = document.querySelector('button[type="submit"]');

    // 校验手机号
    if (!checkPhone(phone)) {
        myAlert(false, '手机号格式不正确！必须是11位数字');
        console.log('手机号格式不正确！必须是11位数字');
        return;
    }

    // 简单校验密码非空（或可加长度限制）
    if (!checkCode(password)) {
        myAlert(false, '密码至少6位');
        console.log('密码至少6位');
        return;
    }

    console.log('手机号:', phone);
    console.log('密码:', password);
    myAxios({
        url: '/login',
        method: 'post',
        data: { mobile: phone, code: password },

    }).then(res => {
        myAlert(true, '登录成功！');
    }).catch(err => {
        const errorMessage = err?.response?.data?.message || err?.message || '登录失败！';
        myAlert(false, errorMessage);
    });
});


//11.使用webpack-dev-server开发服务器热更新
//11.1安装开发服务器：npm i webpack-dev-server --save-dev
//11.2在package.json中设置为开发模式，配置添加启动命令："dev": "webpack serve"
//11.3执行启动命令：npm run dev（要自动弹出浏览器加--open）
//注意：1.webpack-dev-server借助http模块创建8080默认web服务
//注意：2.webpack-dev-server默认拿public文件夹作为静态资源目录打开到浏览器，如果要修改，在webpack.config.js中配置
//可以直接自己拼接访问 dist 目录下的内容
console.log('观察页面是否有自动打包更新');


//12.打包模式设置
// development: 调试代码，实时加载，不压缩，包含完整的错误信息和调试工具（快）
// production: 生产环境，压缩代码，去除调试工具和错误信息，优化性能（小）

// 设置方式:

// 1.在webpack.config.js中配置
// module.exports = {
// ... ...
// mode: 'development',
// ... ...
// };

// 2.在package.json中配置："build": "webpack --mode production"(优先级高)
// 3.执行打包命令：npm run build


//13.打包模式的应用
//需求：在开发模式下用 stylw-loader 内嵌更快，在生产模式下提取css代码
//方案1：webpack.config.js配置导出函数，但是局限性大（只接受两种模式）
//方案2：借助cross-env(跨平台通用)包命令，设置参数区分环境
/**
 *
 * "scripts": {
 *   "dev": "cross-env NODE_ENV=development webpack --mode=development",
 *   "build": "cross-env NODE_ENV=production webpack --mode=production"
 *  }
 *
 * */

//运行	npm run dev （方便调试） 只有 JS文件  使用 style-loader  打包到内存看不出来
//运行	npm run build  (性能优化)  独立 .css 文件 使用 MiniCssExtractPlugin.loader
//方案3:配置不同的webpack.config.js(适用多种模型差异性较大的情况)

//14.前端-注入环境变量(根据不同的环境变量，注入不同的值)
//需求:前端项目中,开发模式下打印语句生效,生产模式下console.log失效
//问题:cross-env设置的只在Node,js中生效,前端代码无法访问process.env.NODE_ENV
//解决:使用 webpack.DefinePlugin (是webpack内置插件)

// const webpack = require('webpack');
// module.exports = {
//     // ... ...
//     plugins: [
//         //...
//         new webpack.DefinePlugin({
//             //key 是注入到打包后的前端JS代码中作为全局变量
//             //value 是注入的值，必须是字符串（如果是其他类型需要转换成字符串）
//             //（在corss-env 注入在node.js中的环境变量）
//             'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//         })
//     ]
// };

//一般放顶部
if (process.env.NODE_ENV === 'production') {
    //生产模式下重写console.log函数，使其失效
    console.log = function () { };
}
console.log('开发模式可见，生成模式下失效');


//15.开发环境调错-source map
//source map:可以追踪error和warning在初始代码的位置
//在webpack.config.js中配置devtool: 'source-map'（生产环境推荐）
console.warn('警告：观察source map效果');


//16.解析别名 alias
//解析别名：配置模块如何解析，创建 import 或 require 的别名，来确保模块引入变得更简单
//例如：import checkPhone from '../../utils/check.js';（相对路径）
//配置别名后：import { checkPhone } from '@/utils/check.js';（绝对路径，@代表src目录）

//在webpack.config.js中配置resolve.alias
// const config = {
//     //解析
//     resolve: {
//         //别名
//         alias: {
//             '@': path.resolve(__dirname, 'src'),

//         }
//     }
// }

import youAxios from '@/utils/request.js';
console.log(youAxios);


//17.优化-生产模式下使用CDN
//CDN:内容分发网络，是指一组分布在各个地区的服务器，将静态资源托管在CDN上，-----------访问速度更快------
//需求：开发模式使用本地资源，生产模式使用CDN资源

//17.1 在html中引入第三方的CDN地址并用模板语法判断
// <% if (process.env.NODE_ENV === 'production') { %>
//     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
// <% } %>
//比如要引入axios库，可以在html中添加以下代码：
// <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.min.js"></script>
// <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.3.8/css/bootstrap-grid.min.css" rel="stylesheet"></link>

//17.2 配置webpack 中 externals（外部扩展）告诉webpack哪些模块不需要打包，直接从CDN引入



//18.wedpack 多页面打包


//19.打包发布文章页面


//20.优化-分割公共代码


//21.总结