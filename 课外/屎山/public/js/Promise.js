// 创建一个 Promise
const myPromise = new Promise((resolve, reject) => {
  const isSuccess = true; // 模拟异步操作的成功或失败

  if (isSuccess) {
    resolve("操作成功!"); // 成功时调用 resolve
  } else {
    reject("操作失败!"); // 失败时调用 reject
  }
});

// 使用 Promise
myPromise
  .then((result) => {
    console.log(result); // 输出: 操作成功!
  })
  .catch((error) => {
    console.error(error); // 如果失败，输出错误信息
  });
