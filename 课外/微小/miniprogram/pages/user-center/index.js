const { envList } = require('../../envList');

// pages/me/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    showTip: false,
    title:"",
    content:""
  },

  getOpenId() {
    wx.showLoading({
      title: '',
    });
    wx.cloud
      .callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'getOpenId',
        },
      })
      .then((resp) => {
        this.setData({
          haveGetOpenId: true,
          openId: resp.result.openid,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        wx.hideLoading();
        const { errCode, errMsg } = e
        if (errMsg.includes('Environment not found')) {
          this.setData({
            showTip: true,
            title: "云开发环境未找到",
            content: "如果已经开通云开发，请检查环境ID与 `miniprogram/app.js` 中的 `env` 参数是否一致。"
          });
          return
        }
        if (errMsg.includes('FunctionName parameter could not be found')) {
          this.setData({
            showTip: true,
            title: "请上传云函数",
            content: "在'cloudfunctions/quickstartFunctions'目录右键，选择【上传并部署-云端安装依赖】，等待云函数上传完成后重试。"
          });
          return
        }
      });
  },

  gotoWxCodePage() {
    wx.navigateTo({
      url: `/pages/exampleDetail/index?envId=${envList?.[0]?.envId}&type=getMiniProgramCode`,
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   * (一个页面只会调用一次)
   */
  onLoad(options) {
    console.log("加载完成");
  },

  /**
   * 生命周期函数--监听页面显示
   * （显示时触发）
   */
  onShow() {
    console.log("页面显示成功");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * (一个页面只会调用一次)
   */
  onReady() {
    console.log("初次渲染完成");
  },

  /**
   * 生命周期函数--监听页面隐藏
   * (切入后台触发)
   */
  onHide() {
    console.log("页面已隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("页面已卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉（刷新）动作
   */
  onPullDownRefresh() {
    console.log("用户下拉刷新");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("用户上拉触底");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    console.log("用户点击右上角分享");
  }
});
