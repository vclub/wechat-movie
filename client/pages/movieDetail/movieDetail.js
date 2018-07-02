// pages/movieDetail/movieDetail.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.getMovie(options.id)
  },

  getMovie(id) {
    wx.showLoading({
      title: '正在加载...',
    })

    qcloud.request({
      url: config.service.movieDetail + id,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            movie: result.data.data
          })
        } else {
          wx.showToast({
            title: '获取电影数据失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '获取电影数据失败',
        })
      }
    })
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

  }
})