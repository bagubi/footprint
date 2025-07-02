// pages/teach/teach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'Bagubi',
    id1: 'id1',
    color: 'yellow',
    condition: true,
    flag: 1234,
    a: 1,
    b: 2,
    list: [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' }
    ],
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