// pages/commentEdit/commentEdit.js

let recorderManager

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {
    "title":"test",
    "cover":""
    },
    type: 1,
    content: '',
    isRecording: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!recorderManager) {
      this.initInnerAudioContext()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

    handleRecord() {
    const options = {
      duration: 60000,        // 录音默认长度一分钟
      sampleRate: 44100,      // 采样率
      numberOfChannels: 1,    // 录音通道数
      encodeBitRate: 192000,  // 编码码率
      format: 'mp3'
    }

    if (this.data.isRecording) {
      recorderManager.stop()
      this.setData({ isRecording: false })
    } else {
      recorderManager.start(options)
      this.setData({ isRecording: true })
    }
  },

    initInnerAudioContext() {
      recorderManager = wx.getRecorderManager()

      recorderManager.onStart(() => {
        console.log('recorder start')
        this.setData({ isRecording: true })
      })

      recorderManager.onStop((res) => {
        console.log('recorder stop', res)
        const { tempFilePath } = res
        setTimeout(() => {
          this.upload(tempFilePath)
        }, 1000);
        this.setData({ isRecording: false })
      })
    },
})