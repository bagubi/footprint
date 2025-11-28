// 导入React库，用于构建用户界面
import React from "react";

// 导入ReactDOM库，用于将React元素渲染到HTML文档中
import ReactDOM from "react-dom/root";

// 导入App组件，该组件是应用程序的入口
import App from "./App";

// 创建React根元素，用于渲染整个应用
// 这里解释了为什么要使用document.getElementById('root')：通常，这个id='root'的元素是HTML文件中专门为React准备的，用于作为React组件树的DOM容器
const root = ReactDOM.createRoot(document.getElementById("root"));
// 渲染应用的主组件到HTML文档中
root.render(<App />);
