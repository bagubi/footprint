// pages/teach/teach.js
// 注册页面：Page({})
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
    list: [{
        id: 1,
        name: '张三'
      },
      {
        id: 2,
        name: '李四'
      },
      {
        id: 3,
        name: '王五'
      }
    ],
  },

  /**
   * 生命周期函数--
   * 监听页面加载
   * (一个页面只会调用一次)
   */
  onLoad(options) {
    console.log("加载完成，显示action函数执行并修改data.a的值");
    console.log("a=", this.data.a);
    // 视图层数据更新：
    // （js虽然可以改变data中变量的值，但不会触发页面刷新数据）
    // 用以下方法可以刷新数据
    this.setData({
      a: 233,
    })
    console.log("a=", this.data.a);
    // 执行action()改变a的值但是不显示在页面
    this.action();
    console.log("a=", this.data.a);
   
  },

  /**
   * 监听页面显示
   * （显示时触发）
   */
  onShow() {
    console.log("页面显示成功");
  },

  /**
   * 监听页面初次渲染完成
   * (一个页面只会调用一次)
   */
  onReady() {
    console.log("初次渲染完成");
  },

  /**
   * 监听页面隐藏
   * (切入后台触发)
   */
  onHide() {
    console.log("页面已隐藏");
  },

  /**
   * 监听页面卸载
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
  },
  // 点击确定触发的函数
  onClickSure(event) {
    const hiValue = event.currentTarget.dataset.hi;
    console.log(hiValue + ", 为你展示登录API功能");
     // 事件监听API（以on开头，接受一个回调作为参数）
    // 同步API（以Sync结尾）
    //异步API（通常接受Object类型参数）
    // wx.login({...}) 是一个函数调用，不是合法的属性值。
    wx.login({
      success: (res) => {
        // API 调用成功时执行
        console.log("登录成功", res);
      },
      fail: (res) => {
        // API 调用失败时执行
        console.log("登录失败", res);
      },
      complete: (res) => {
        // 不论成功或失败，调用完毕后都会执行
        console.log("请求完成", res);
      }
    });
  },
  // 输入框聚焦和失焦
  // 聚焦事件
  onInputFocus(event) {
    console.log('输入框获得焦点');
    // 可选：获取输入框的值或标识符
    const inputId = event.currentTarget.id;
    console.log('聚焦的输入框 ID:', inputId);
  },

  // 失焦事件
  onInputBlur(event) {
    console.log('输入框失去焦点');
    const value = event.detail.value;
    console.log('输入内容为:', value);
  },
  action: function () {
    this.data.a = 666,
      console.log("这是新的action函数")
  },
  // 1.显示信息提示框
  showInfoToast() {
    wx.showToast({
      title: '这是一个提示', // 提示文字  
      //icon: 'none', // 不显示图标（默认是 success）
      icon: 'success',
      duration: 2000, // 持续时间（毫秒）
      mask: false, // 是否显示透明蒙层（默认为false）
    });
  },
  // 2.显示对话框
  showDialog() {
    wx.showModal({
      title: '提示', // 对话框标题
      content: '最近睡得好吗？', // 对话框内容
      showCancel: true, // 是否显示取消按钮，默认为 true
      cancelText: '取消', // 取消按钮文字
      confirmText: '确定', // 确定按钮文字
      success(res) {
        if (res.confirm) {
          console.log('用户点击了【确定】');
          // 在这里可以执行你需要的操作，如提交表单、跳转页面等
        } else if (res.cancel) {
          console.log('用户点击了【取消】');
        }
      },
      fail(err) {
        console.error('弹窗调用失败', err);
      }
    });
  },
    // 3.显示loading提示框
    showLoading() {
      // 显示loading提示框
      wx.showLoading({
        title: '浪费两秒...',  // 提示的文字内容
        mask: true           // 是否显示透明蒙层，防止触摸穿透，默认是false
      });
  
      // 模拟一个异步操作，例如网络请求
      setTimeout(() => {
        // 隐藏loading提示框
        wx.hideLoading();
        
        // 这里可以继续执行其他代码或跳转页面
        console.log('加载完成');
      }, 2000);  // 延迟2秒模拟网络请求
    },
});