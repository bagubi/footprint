exports.main = async (event, context) => {
  const { text } = event;

  if (!text || text.trim() === '') {
    return {
      code: -1,
      message: '请输入待办内容'
    };
  }

  // 调用AI解析（这里用规则引擎，可替换为真实NLP API）
  const parsed = parseNaturalLanguage(text);

  return {
    code: 0,
    data: {
      title: parsed.title,
      time: parsed.time,
      priority: parsed.priority || 'normal',
      status: 'pending'
    }
  };
};

// 简易规则解析（生产环境可接入大模型NLP服务）
function parseNaturalLanguage(text) {
  const now = new Date();
  let title = text;
  let time = null;
  let priority = 'normal';

  // 1. 解析时间
  const timePatterns = [
    /(明天|后天|今天)\s*(上午|下午|早上|晚上)?\s*(\d{1,2})点(\s*(\d{1,2})分)?/,
    /(上午|下午|早上|晚上)\s*(\d{1,2})点(\s*(\d{1,2})分)?/
  ];

  for (const pattern of timePatterns) {
    const match = text.match(pattern);
    if (match) {
      const day = match[1] || '今天';
      const period = match[2] || '';
      const hour = parseInt(match[3] || match[2]);
      const minute = parseInt(match[5] || match[4] || 0);

      const date = new Date(now);
      if (day === '明天') date.setDate(date.getDate() + 1);
      else if (day === '后天') date.setDate(date.getDate() + 2);

      let finalHour = hour;
      if (period === '下午' || period === '晚上') {
        if (hour < 12) finalHour = hour + 12;
      }

      date.setHours(finalHour, minute, 0, 0);
      time = date.toISOString();
      title = text.replace(match[0], '').trim();
      break;
    }
  }

  // 2. 解析优先级
  if (/紧急|重要|立刻/.test(text)) {
    priority = 'high';
  } else if (/不急|随便|有空/.test(text)) {
    priority = 'low';
  }

  // 如果没有解析到时间，默认设置为明天
  if (!time) {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    time = tomorrow.toISOString();
  }

  return {
    title: title || text,
    time,
    priority
  };
}