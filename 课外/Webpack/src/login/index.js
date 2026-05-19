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
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    // 校验手机号
    if (!checkPhone(phone)) {
        console.log('手机号格式不正确！必须是11位数字');
        return;
    }

    // 简单校验密码非空（或可加长度限制）
    if (password.length < 6) {
        console.log('密码至少6位');
        return;
    }

    console.log('手机号:', phone);
    console.log('密码:', password);
    alert('登录成功（演示）！');
});

//4.使用插件自动生成html文件并引入打包后的js文件
//4.1安装插件：npm i html-webpack-plugin --save-dev
//4.2在webpack.config.js中引入插件并配置

//5.使用loader加载css文件
//5.1把css引入js文件中：import './style.css';
import './login.css';
//5.2安装loader：npm i style-loader css-loader --save-dev

//如果用bootstrap等第三方库
//npm i bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//6.优化-提取css文件
//6.1安装插件：npm i mini-css-extract-plugin --save-dev （不能和style-loader一起使用）
//6.2在webpack.config.js中引入插件并配置

