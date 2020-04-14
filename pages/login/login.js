// pages/user/user.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {

  },
  onGotUserInfo: function (e) {
    wx.getUserInfo({
      success(res) {
        app.globalData.userInfo = res.userInfo
        upLoad()
      }
    })
  }
})
function upLoad(){
  wx.login({
    success: function (res) {
      var code = res.code;//登录凭证
      console.log(code)
      if (code) {
        //2、调用获取用户信息接口
        wx.getUserInfo({
          success: function (r) {
            wx.request({
              url: 'https://rui.20181206.top/rui2.php',
              method: 'post',
              data: {
                encryptedData: r.encryptedData,
                iv: r.iv,
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                //'cookie': 'PHPSESSID=' + app.globalData.phpsessId
              },
              success: res =>{
                app.globalData.phpsessId = res.data.phpsessid
                app.globalData.openId = res.data.openid
                app.globalData.userInfo = res.userInfo
                if (res.data.code == 1) {
                  wx.redirectTo({
                    url: '/pages/first/first'
                  })
                } else{
                  wx.redirectTo({
                    url: '/pages/user/user'
                  })
                }
              },
              fail:function(res){
                console.log(4)
                wx.showModal({
                  title: '提示',
                  content: '失败',
                })
              }
            })
            
          }
        })
      } else {
        console.log('获取用户登录态失败！')
      }
    }
  })
}
