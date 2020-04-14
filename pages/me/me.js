//index.js
//开始页动画
const app = getApp()
var fb_userid
var fb_user
var fb_text
Page({
  data: {
    maxle: '您的姓名',
    allgame: '电话/微信',
    vgame: '留言',
    wid: 1,
    popup: 0,
    backBnt: "https://rui.20181206.top/weixin/image/me/me2.png",
    textBg: "https://rui.20181206.top/weixin/image/me/me3.png",
    popupSrc: "https://rui.20181206.top/weixin/image/me/me4.png"
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/get_user_info.cls.php',
      method: 'POST',
      data: {
        id: 1,
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
            data:res.data,
            honer_name: res.data.honer_name
          })
          if (res.data.user_project == "无"){
            console.log(1234)
            that.setData({
              honer_name: '无'
            })
          }
        }
      }
    })
  },
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
  name: function (e) {
    console.log(e.detail.value)
      fb_userid= e.detail.value
  },
  phone: function (e) {
      fb_user=e.detail.value
  },
  text: function (e) {
    console.log(e.detail.value)
      fb_text= e.detail.value
  },
  but:function(e){
    var that = this
    if (fb_userid == undefined){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
    } else if (fb_user == undefined){
      wx.showToast({
        title: '请输入电话或微信',
        icon: 'none',
        duration: 2000
      })
    } else if (fb_text == undefined){
      wx.showToast({
        title: '请输入留言',
        icon: 'none',
        duration: 2000
      })
    }else{
    wx.request({
      url: 'https://rui.20181206.top/update_feedback_info.cls.php',
      method: 'POST',
      data: {
        fb_userid: fb_userid,
        fb_user: fb_user,
        fb_text: fb_text
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
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
            fb_userid= undefined,
            fb_user = undefined,
            fb_text = undefined
          that.setData(
            {
              popup: 0
            }
          );
        }
      }
    })
    }
  },



  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index', //转发的路径

    }
  },
  
  openFirst: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})