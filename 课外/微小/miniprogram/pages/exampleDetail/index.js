// pages/exampleDetail/index.js
Page({
  data: {
    type: '',
    envId: '',
    showTip: false,
    title:"",
    content:"",

    haveGetOpenId: false,
    openId: '',

    haveGetCodeSrc: false,
    codeSrc: '',

    haveGetRecord: false,
    record: '',

    haveGetImgSrc: false,
    imgSrc: '',
  },

  onLoad(options) {
    this.setData({ type: options?.type, envId: options?.envId });
  },

  getOpenId() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid
      });
      wx.hideLoading();
    }).catch((e) => {
      wx.hideLoading();
      const {errCode,errMsg}=e
      if(errMsg.includes('Environment not found')){
        this.setData({
          showTip: true,
          title:"云开发环境未找到",
          content:"如果已经开通云开发，请检查环境ID与 `miniprogram/app.js` 中的 `env` 参数是否一致。"  
        });
        return
      }
      if(errMsg.includes('FunctionName parameter could not be found')){
        this.setData({
          showTip: true,
          title:"请上传云函数",
          content:"在'cloudfunctions/quickstartFunctions'目录右键，选择【上传并部署-云端安装依赖】，等待云函数上传完成后重试。"  
        });
        return
      }
    });
  },

  clearOpenId() {
    this.setData({
      haveGetOpenId: false,
      openId: ''
    });
  },

  getCodeSrc() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'getMiniProgramCode'
      }
    }).then((resp) => {
      this.setData({
        haveGetCodeSrc: true,
        codeSrc: resp.result
      });
      wx.hideLoading();
    }).catch((e) => {
      wx.hideLoading();
      const {errCode,errMsg}=e
      if(errMsg.includes('Environment not found')){
        this.setData({
          showTip: true,
          title:"云开发环境未找到",
          content:"如果已经开通云开发，请检查环境ID与 `miniprogram/app.js` 中的 `env` 参数是否一致。"  
        });
        return
      }
      if(errMsg.includes('FunctionName parameter could not be found')){
        this.setData({
          showTip: true,
          title:"请上传云函数",
          content:"在'cloudfunctions/quickstartFunctions'目录右键，选择【上传并部署-云端安装依赖】，等待云函数上传完成后重试。"  
        });
        return
      }
    });
  },

  clearCodeSrc() {
    this.setData({
      haveGetCodeSrc: false,
      codeSrc: ''
    });
  },

  getRecord() {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'selectRecord'
      }
    }).then((resp) => {
      this.setData({
        haveGetRecord: true,
        record: resp.result.data
      });
      wx.hideLoading();
    }).catch((e) => {
      this.setData({
        showTip: true
      });
      wx.hideLoading();
    });
  },

  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    });
  },

  uploadImg() {
    wx.showLoading({
      title: '',
    });
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'my-photo.png',
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
        }).then(res => {
          this.setData({
            haveGetImgSrc: true,
            imgSrc: res.fileID
          });
          wx.hideLoading();
        }).catch((e) => {
          wx.hideLoading();
        });
      },
    });
  },

  clearImgSrc() {
    this.setData({
      haveGetImgSrc: false,
      imgSrc: ''
    });
  },

  goOfficialWebsite() {
    const url = 'https://docs.cloudbase.net/toolbox/quick-start';
    wx.navigateTo({
      url: `../web/index?url=${url}`,
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
})