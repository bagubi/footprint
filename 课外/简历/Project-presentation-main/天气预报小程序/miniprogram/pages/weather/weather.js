Page({
  data: {
    search_city: '',
    city: '正在定位...',
    cityId: '', // 确保cityId在data中明确定义
    tmp: '--',
    imgsrc: '',
    wind_dir: '',
    wind_sc: '',
    hum: '',
    pres: '',
    hourly: [],
    daily_forecast: [],
    updateTime: ''
  },

  /**
   * 统一获取天气入口（核心方法）
   */
  getWeather(cityName) {
    const cityId = this.data.cityId;
    console.log('[getWeather] 开始获取天气', { cityName, cityId });
    
    if (!cityId) {
      console.error('cityId为空，无法请求天气');
      wx.showToast({ title: '城市ID获取失败', icon: 'none' });
      return;
    }

    this.getNowWeather(cityName); // 获取实时天气并自动触发后续预报
  },


  /**
   * 定位并获取天气
   */
  getLocationAndWeather() {
    console.log('[定位] 开始获取位置');
    
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log('[定位] 获取到坐标:', res.latitude, res.longitude);
        this.reverseGeocode(res.longitude, res.latitude);
      },
      fail: (err) => {
        console.error('[定位] 失败:', err);
        this.handleLocationError();
      }
    });
  },
  /**
   * 获取实时天气
   */
  getNowWeather(cityName) {
    const API_KEY = '1b2d487798b64172a41deb5000288abb';
    const cityId = this.data.cityId;
    
    console.log('[getNowWeather] 请求实时天气', { cityId });
    
    wx.request({
      url: `https://py3yfqrqwc.re.qweatherapi.com/v7/weather/now?key=${API_KEY}&location=${cityId}`,
      success: (res) => {
        console.log('[getNowWeather] 响应:', res.data);
        if (res.data.code !== "200") {
          throw new Error(`API响应异常: ${res.data.code}`);
        }

        const now = res.data.now;
        this.setData({
          city: cityName,
          tmp: now.temp,
          imgsrc: now.icon,
          wind_dir: now.windDir,
          wind_sc: now.windScale,
          hum: now.humidity,
          pres: now.pressure,
          updateTime: `更新于 ${new Date().toLocaleTimeString()}`
        });

        // 获取预报数据
        this.getHourlyForecast();
        this.getDailyForecast();
      },
      fail: (err) => {
        console.error('[getNowWeather] 请求失败:', err);
        this.fallbackToDefaultCity();
      }
    });
  },

  /**
   * 获取24小时预报
   */
  getHourlyForecast() {
    const API_KEY = '1b2d487798b64172a41deb5000288abb';
    
    wx.request({
      url: `https://py3yfqrqwc.re.qweatherapi.com/v7/weather/24h?key=${API_KEY}&location=${this.data.cityId}`,
      success: (res) => {
        console.log('[24h] 响应:', res.data);
        if (res.data.code === "200") {
          const hourly = res.data.hourly.map(item => ({
            imgsrc: item.icon,
            tmp: item.temp,
            time: item.fxTime.substring(11, 16),
            wind_dir: item.windDir,
            wind_sc: item.windScale
          }));
          this.setData({ hourly });
        }
      },
      fail: (err) => {
        console.error('[24h] 请求失败:', err);
      }
    });
  },

  /**
   * 获取7天预报
   */
  getDailyForecast() {
    const API_KEY = '1b2d487798b64172a41deb5000288abb';
    const weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    const todayStr = new Date().toISOString().split('T')[0];
    
    wx.request({
      url: `https://py3yfqrqwc.re.qweatherapi.com/v7/weather/7d?key=${API_KEY}&location=${this.data.cityId}`,
      success: (res) => {
        console.log('[7d] 响应:', res.data);
        if (res.data.code === "200") {
          const forecast = res.data.daily.map(day => {
            const date = new Date(day.fxDate);
            return {
              d_txt: day.fxDate === todayStr ? "今天" : weekArray[date.getDay()],
              d_date: day.fxDate.substring(5),
              imgsrc_d: day.iconDay,
              imgsrc_n: day.iconNight,
              tmp_max: `${day.tempMax}°`,
              tmp_min: `${day.tempMin}°`,
              wind_dir: day.windDirDay,
              wind_sc: day.windScaleDay
            };
          });
          this.setData({ daily_forecast: forecast });
        }
      },
      fail: (err) => {
        console.error('[7d] 请求失败:', err);
      }
    });
  },

  /**
   * 逆地理编码
   */
  reverseGeocode(longitude, latitude) {
    const API_KEY = '1b2d487798b64172a41deb5000288abb';
    
    wx.request({
      url: `https://py3yfqrqwc.re.qweatherapi.com/geo/v2/city/lookup?key=${API_KEY}&location=${longitude},${latitude}`,
      success: (res) => {
        console.log('[逆地理编码] 响应:', res.data);
        if (!res.data?.location?.length) {
          throw new Error('未找到城市数据');
        }

        const location = res.data.location[0];
        this.setData({
          city: location.adm2 || location.name,
          cityId: location.id
        }, () => {
          this.getWeather(this.data.city); // 确保cityId更新后调用
        });
      },
      fail: (err) => {
        console.error('[逆地理编码] 失败:', err);
        this.fallbackToDefaultCity();
      }
    });
  },

  /**
   * 搜索城市
   */
  search() {
    const city = this.data.search_city.trim();
    if (!city) return wx.showToast({ title: '请输入城市名', icon: 'none' });

    console.log('[搜索] 城市:', city);
    
    const API_KEY = '1b2d487798b64172a41deb5000288abb';
    wx.request({
      url: `https://py3yfqrqwc.re.qweatherapi.com/geo/v2/city/lookup?key=${API_KEY}&location=${city}`,
      success: (res) => {
        console.log('[搜索] 响应:', res.data);
        if (!res.data?.location?.length) {
          throw new Error('城市不存在');
        }

        const location = res.data.location[0];
        this.setData({
          city: location.adm2 || location.name,
          cityId: location.id,
          search_city: ''
        }, () => {
          this.getWeather(this.data.city);
        });
      },
      fail: (err) => {
        console.error('[搜索] 失败:', err);
        this.fallbackToDefaultCity();
      }
    });
  },

  fallbackToDefaultCity() {
    console.warn('降级到默认城市');
    this.setData({
      city: '北京',
      cityId: '101010100'
    }, () => {
      this.getWeather(this.data.city);
    });
  },

  handleLocationError() {
    wx.showModal({
      title: '定位失败',
      content: '请检查定位权限或手动搜索城市',
      success: (res) => {
        if (res.confirm) wx.openSetting();
      }
    });
    this.fallbackToDefaultCity();
  },

  bindKeyInput(e) {
    this.setData({ search_city: e.detail.value });
  },

  onLoad() {
    console.log('页面初始化');
    this.getLocationAndWeather();
  }
});