// pages/commentDetail/commentDetail.js
let innerAudioContext

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: { "id": 1, "title": "复仇者联盟3：无限战争", "image": "https://rainbow-1256510055.cos.ap-beijing.myqcloud.com/images/p2517753454.webp", "category": "动作 / 科幻 / 奇幻 / 冒险", "description": "《复仇者联盟3：无限战争》是漫威电影宇宙10周年的历史性集结，将为影迷们带来史诗版的终极对决。面对灭霸突然发起的闪电袭击，复仇者联盟及其所有超级英雄盟友必须全力以赴，才能阻止他对全宇宙造成毁灭性的打击。", "create_time": "2018-07-02T01:49:42.000Z" 
  },
    comment: { "id": "2", "movie_id": "1", "open_id": "112321", "content": "fdsafdsafdsafdsafdsa", "type": "0" }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const { id } = options
    // qcloud.request({
    //   url: config.service.getComment(id),
    //   success: ({ data }) => {
    //     const { movie, comment } = data.data
    //     this.setData({ movie, comment })

    //     if (comment.type == 1) {
    //       this.initInnerAudioContext()
    //     }
    //   }
    // })
  },

  handleFavorite() {
    const { comment } = this.data
    app.checkSession({
      success: () => {
        qcloud.request({
          method: 'POST',
          url: config.service.favorite(comment.id),
          success: () => {
            wx.showToast({
              title: '收藏成功'
            })
          }
        })
      },
      fail: () => {
        console.log('fail.....')
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    })
  },

  initInnerAudioContext() {
    innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = false

    innerAudioContext.onPlay(() => {
      console.log('开始播放')
      this.setData({ isPlaying: true })
    })

    innerAudioContext.onStop(() => {
      console.log('播放停止')
      this.setData({ isPlaying: false })
    })

    innerAudioContext.onEnded(() => {
      console.log('播放结束');
      this.setData({ isPlaying: false });
    });

    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
      wx.showToast({
        icon: 'none',
        title: '播放异常'
      })
      this.setData({ isPlaying: false })
    })
  },

  handlePlay() {
    const { isPlaying } = this.data

    if (!isPlaying) {
      innerAudioContext.src = this.data.comment.content
      innerAudioContext.play()
    }
  },

  handleAddComment() {
    const { movie } = this.data

    app.checkSession({
      success: () => {
        wx.showActionSheet({
          itemList: ['文字', '音频'],
          success: (res) => {
            wx.setStorage({
              key: 'movie',
              data: movie,
              success: () => {
                wx.navigateTo({
                  url: `/pages/add-comment/add-comment?type=${res.tapIndex}`
                })
              }
            })
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
      },
      fail: () => {
        console.log('fail.....')
        wx.switchTab({
          url: '/pages/user/user'
        })
      }
    })
  },

})