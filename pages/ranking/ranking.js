// pages/ranking/ranking.js
var app = getApp()
var drop=1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rakingBgSt: 1,
    popup: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/get_ranking_list.cls.php',
      method: 'POST',
      data: {
        drop: 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
        if (res.data.code == -1) {
          wx.showToast({
            title: '登陆超时',
            icon: 'none',
            duration: 2000,
            mask: true
          })

          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }, 2000)
        } else {

          that.setData({
            content: res.data.rank,
            data:res.data,
          })
        }
      }
    })
  },
  openFirst: function () {
    wx.navigateBack({
      delta: 1 
    })
  },
  putinfo:function(){
    this.setData({
      pp:1
    })
  },
  pp: function () {
    this.setData({
      pp: 2
    })
  },
  scrollToLower:function(){
    console.log(drop)
    drop = drop + 1
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/get_ranking_list.cls.php',
      method: 'POST',
      data: {
        drop: drop,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
        if (res.data.code == -1) {
          wx.showToast({
            title: '登陆超时',
            icon: 'none',
            duration: 2000,
            mask: true
          })

          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }, 2000)
        } else {

          that.setData({
            content: res.data.rank,
            data: res.data,
          })
        }
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
    return {
      path: '/pages/index/index', //转发的路径

    }
  },


  //事件处理函数
  openPopup: function () {
    this.setData(
      {
        popup: 1
      }
    );
  },
  closePopup: function () {
    this.setData(
      {
        popup: 0
      }
    );
  },
  aaa:function(){
    console.log(1212)
  },
  love:function(e){
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/get_ranking_list.cls.php',
      method: 'POST',
      data: {
        likeput: 1,
        pl_userid: e.currentTarget.dataset.id,
        pl_praiseuserid: e.currentTarget.dataset.usr_id,
        pl_praiseuser: e.currentTarget.dataset.user_name
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
        if (res.data.code == -1) {
          wx.showToast({
            title: '登陆超时',
            icon: 'none',
            duration: 2000,
            mask: true
          })
            wx.redirectTo({
              url: '/pages/index/index'
            })
        } else {
          if (res.data.linke_state == 1){
            wx.showToast({
              title: '本期已经赞过他啦',
              icon: 'none',
              duration: 2000
            })
          }
          that.setData({
            content: res.data.rank,
          })
          that.onLoad()
        }
      }
    })
  }

})