const axios = require('axios');

exports.main = async (event, context) => {
  const { city } = event;
  
  // ⚠️ 在 uniCloud 控制台设置环境变量 QWEATHER_KEY
  const API_KEY = process.env.QWEATHER_KEY || '你的和风天气密钥';
  const BASE_URL = 'https://devapi.qweather.com/v7/weather/now';

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        location: city,
        key: API_KEY
      }
    });

    if (response.data.code === '200') {
      return {
        code: 0,
        data: {
          temp: response.data.now.temp,
          text: response.data.now.text,
          humidity: response.data.now.humidity,
          windDir: response.data.now.windDir,
          updateTime: response.data.updateTime
        }
      };
    } else {
      return {
        code: -1,
        message: response.data.code
      };
    }
  } catch (error) {
    console.error('天气API调用失败:', error);
    return {
      code: -1,
      message: '获取天气失败，请稍后重试'
    };
  }
};