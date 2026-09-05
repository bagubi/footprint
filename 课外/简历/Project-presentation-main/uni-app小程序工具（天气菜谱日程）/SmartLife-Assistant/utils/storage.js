// utils/storage.js
// 缓存工具 - 使用 uni.setStorageSync

const CACHE_KEY = 'weather_data';
const CACHE_EXPIRE = 5 * 60 * 1000; // 5分钟过期

/**
 * 获取缓存的天气数据
 * @param {string} city - 城市名称
 * @returns {Object|null} 缓存数据或null
 */
export function getCachedWeather(city) {
  try {
    const cached = uni.getStorageSync(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp, cacheCity } = cached;
    
    // 检查是否过期 & 城市是否匹配
    if (Date.now() - timestamp < CACHE_EXPIRE && cacheCity === city) {
      console.log('✅ 命中缓存:', city);
      return data;
    }
    console.log('⏰ 缓存已过期或城市不匹配');
    return null;
  } catch (e) {
    console.warn('读取缓存失败:', e);
    return null;
  }
}

/**
 * 缓存天气数据
 * @param {string} city - 城市名称
 * @param {Object} data - 天气数据
 */
export function setCachedWeather(city, data) {
  try {
    uni.setStorageSync(CACHE_KEY, {
      data,
      cacheCity: city,
      timestamp: Date.now()
    });
    console.log('💾 天气数据已缓存:', city);
  } catch (e) {
    console.warn('缓存写入失败:', e);
  }
}

/**
 * 清除天气缓存
 */
export function clearWeatherCache() {
  try {
    uni.removeStorageSync(CACHE_KEY);
    console.log('🗑️ 缓存已清除');
  } catch (e) {
    console.warn('清除缓存失败:', e);
  }
}