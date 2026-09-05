// utils/weather-helper.js
// 天气数据处理与温度区间判断

/**
 * 根据温度获取推荐菜谱
 * @param {number} temp - 温度（摄氏度）
 * @returns {Array} 推荐菜谱列表
 */
export function getRecipesByTemp(temp) {
  // 温度可能为0或空值
  if (temp === undefined || temp === null || temp === '') {
    return getDefaultRecipes();
  }

  const t = Number(temp);
  
  if (t > 30) {
    // 🔥 高温 > 30°C → 凉拌/清爽
    return [
      { name: '凉拌黄瓜', icon: '🥒', desc: '清爽开胃，解暑必备' },
      { name: '凉拌木耳', icon: '🍄', desc: '口感爽脆，营养丰富' },
      { name: '凉拌鸡丝', icon: '🍗', desc: '低脂高蛋白，夏日最爱' },
      { name: '水果沙拉', icon: '🥗', desc: '缤纷水果，维生素满满' }
    ];
  } else if (t < 10) {
    // ❄️ 低温 < 10°C → 火锅/暖胃
    return [
      { name: '麻辣火锅', icon: '🍲', desc: '热辣滚烫，驱寒暖身' },
      { name: '番茄牛腩锅', icon: '🥩', desc: '酸甜浓郁，暖心暖胃' },
      { name: '羊肉汤锅', icon: '🐑', desc: '温补养生，冬日必备' },
      { name: '菌菇鸡汤', icon: '🍄', desc: '鲜香滋补，暖心暖身' }
    ];
  } else if (t >= 10 && t <= 20) {
    // 🌤️ 温和 10-20°C → 家常菜
    return [
      { name: '红烧肉', icon: '🥩', desc: '肥而不腻，经典家常' },
      { name: '鱼香肉丝', icon: '🍛', desc: '酸甜微辣，下饭神器' },
      { name: '清炒时蔬', icon: '🥬', desc: '清淡爽口，营养均衡' },
      { name: '番茄炒蛋', icon: '🍅', desc: '国民家常，百吃不厌' }
    ];
  } else {
    // 🌡️ 20-30°C → 清爽炒菜
    return [
      { name: '清炒虾仁', icon: '🦐', desc: '鲜嫩Q弹，清淡健康' },
      { name: '宫保鸡丁', icon: '🍗', desc: '麻辣鲜香，开胃下饭' },
      { name: '蒜蓉西兰花', icon: '🥦', desc: '脆嫩爽口，营养丰富' },
      { name: '糖醋里脊', icon: '🥩', desc: '酸甜可口，外酥里嫩' }
    ];
  }
}

/**
 * 获取默认菜谱（温度数据异常时使用）
 */
function getDefaultRecipes() {
  return [
    { name: '番茄炒蛋', icon: '🍅', desc: '国民家常，百吃不厌' },
    { name: '清炒时蔬', icon: '🥬', desc: '清淡爽口，营养均衡' },
    { name: '红烧肉', icon: '🥩', desc: '肥而不腻，经典家常' }
  ];
}

/**
 * 获取推荐语
 * @param {number} temp - 温度
 * @returns {string} 推荐语
 */
export function getRecipeTip(temp) {
  if (temp === undefined || temp === null || temp === '') {
    return '今日推荐';
  }
  
  const t = Number(temp);
  if (t > 30) {
    return '🔥 天热宜吃凉拌';
  } else if (t < 10) {
    return '❄️ 天冷宜吃火锅';
  } else if (t >= 10 && t <= 20) {
    return '🌤️ 温和宜家常菜';
  } else {
    return '🌡️ 适宜清爽炒菜';
  }
}