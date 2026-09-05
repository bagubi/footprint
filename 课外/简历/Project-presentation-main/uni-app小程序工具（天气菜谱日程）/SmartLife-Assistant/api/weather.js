// api/weather.js
// 调用云函数获取天气数据

export function getWeather(city) {
  return new Promise((resolve, reject) => {
    // 检查 uniCloud 是否可用
    if (typeof uniCloud === 'undefined') {
      reject('uniCloud 未初始化，请检查云函数环境');
      return;
    }

    uniCloud.callFunction({
      name: 'getWeather', // 云函数名称
      data: { city },
      success: (res) => {
        console.log('云函数返回结果:', res);
        
        // 检查返回结果
        if (res.result && res.result.code === 0) {
          resolve(res.result.data);
        } else {
          reject(res.result?.message || '获取天气失败');
        }
      },
      fail: (err) => {
        console.error('云函数调用失败:', err);
        reject(err.message || '网络请求失败');
      }
    });
  });
}