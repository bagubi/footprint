// 导入API数据获取函数和路由函数
// app.js应用逻辑文件

import { fetchData } from "../api/api.js";
import { route } from "../route/router.js";

/**
 * 渲染主页内容
 * 该函数负责向页面的content区域插入主页的HTML内容。
 */
export function renderHome() {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "<h1>Home Page</h1><p>Welcome to the home page.</p>";
}

/**
 * 渲染关于页面内容
 * 该函数从API获取帖子数据，并将这些数据渲染为HTML，展示在关于页面中。
 */
export function renderAbout() {
  const contentDiv = document.getElementById("content");
  fetchData("posts")
    .then((data) => {
      let postsHtml = "<h1>About Page</h1><p>Posts fetched from the API:</p>";
      data.forEach((post) => {
        postsHtml += `<div><h2>${post.title}</h2><p>${post.body}</p></div>`;
      });
      contentDiv.innerHTML = postsHtml;
    })
    .catch((error) => {
      contentDiv.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
    });
}

// 初始化路由

route();

// 为导航链接添加点击事件处理程序，以实现页面路由功能

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // 阻止默认的链接点击行为，避免页面刷新
    window.location.hash = link.getAttribute("data-page"); // 设置页面位置的哈希值，实现内部跳转
  });
});
