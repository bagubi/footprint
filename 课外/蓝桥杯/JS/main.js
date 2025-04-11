// 使用 promise 模拟请求 + 3000ms后完成得到发射后结果
function createRequest(i) {
  return function () {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      setTimeout(() => {
        if (Math.random() >= 0.05) {
          resolve(
            `第${i + 1}艘曲率飞船达到光速，成功逃离，用时${Date.now() - start}`
          );
        } else {
          reject(
            `第${i + 1}艘曲率飞船出现故障，无法达到光速，用时${
              Date.now() - start
            }`
          );
        }
      }, 3000 + i * 100);
    });
  };
}

class RequestControl {
  constructor({ max, el }) {
    this.max = max;
    this.requestQueue = [];
    this.el = document.querySelector(el);
    setTimeout(() => {
      this.requestQueue.length > 0 && this.run();
    });
    this.startTime = Date.now();
  }
  addRequest(request) {
    this.requestQueue.push(request);
  }
  run() {
    // TODO：待补充代码
  }
  render(context) {
    const childNode = document.createElement("li");
    childNode.innerText = context;
    this.el.appendChild(childNode);
  }
}

let requestControl = new RequestControl({ max: 10, el: "#app" });
for (let i = 0; i < 25; i++) {
  const request = createRequest(i);
  requestControl.addRequest(request);
}

module.exports = {
  requestControl,
};
