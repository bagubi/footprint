// api.js
// 路径不变
// 从API获取数据的函数
export function fetchData(endpoint) {
  const apiUrl = `https://jsonplaceholder.typicode.com/${endpoint}`;

  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      // 如果网络响应不成功，抛出错误
      throw new Error("网络响应不正常" + response.statusText);
    }
    // 解析并返回JSON格式的数据
    return response.json();
  });
}
