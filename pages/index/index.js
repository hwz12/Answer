//index.js
//获取应用实例
const app = getApp();


Page({
  data: {
    skip: "http://rui.20181206.top/weixin/image/index/index0.png",
  },
  //事件处理函数

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.login({
      success: function (res) {
        //发送请求获取openid
        wx.request({
          url: 'https://rui.20181206.top/rui.php', //接口地址
          method: 'post',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', //默认值
            //'cookie': 'PHPSESSID=' + app.globalData.phpsessId
          },
          success: function (res) {
            app.globalData.phpsessId = res.data.phpsessid
            app.globalData.openId = res.data.openid
            app.globalData.userInfo = res.userInfo
            app.globalData.honor = res.data.at_first_result
            //返回openid
            if(res.data.intimes <1){
              app.globalData.dpd = 2
            }
           if(res.data.code == 1){
              that.setData({
                loginState:0,
                Jump:1
             })
             wx.onAccelerometerChange(function (e) {
               if (e.x > 0.5 && e.y > 0.5) {
                   wx.redirectTo({
                     url: '../first/first',
                   })
                }
             })
            }
          }
        })
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index', //转发的路径

    }
  },


  /**弹出登录框**/
  openPopup1: function() {
    if (this.data.Jump == 1){
      wx.redirectTo({
        url: '../first/first',
      })
    }else{
      wx.redirectTo({
        url: '../user/user',
      })
    }
  },
  openFirst2: function() {
    if (this.data.Jump == 1) {
      wx.redirectTo({
        url: '../first/first',
      })
    }

  }


})