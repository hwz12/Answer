//app.js
const back = wx.getBackgroundAudioManager();
App({

  data: {
    wid:'1',
    hruser:'',
    title:'',
    rname:'',
    iniitegral:'',
    score:'',
    maxle:'',
    allgame:'',
    vgame:'',
    endaign:'',
    signstate:'',
    signday:'',
    gamestate:'',
  },
  puclicFun: function () {
    player();
  },
  back: function(){
    back.pause()
  },
   onHide: function() {
    back.pause()
  },
  /**
     * 生命周期函数--监听页面卸载
     */
  onUnload: function () {
    back.pause()
  },
  onLaunch: function () {
    console.log(333)
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    phpsessId: 1,
    musicState:1,
    honor:1,
    dpd:1,
    pdp:5,
    music:1,
    sub:1
  }
})
function player() {
  back.title = "润答Zone";
  back.src = "http://rui.20181206.top/weixin/media/music.mp3";
  back.onEnded(() => {
    player();
  })
}