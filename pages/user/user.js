const app = getApp()
var user_city
var user_project
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    popupBg1: "https://rui.20181206.top/weixin/image/index/index1.png",
    popupBg2: "https://rui.20181206.top/weixin/image/index/index2.png",
    popBnt1: "https://rui.20181206.top/weixin/image/index/index3.png",
    popBnt2: "https://rui.20181206.top/weixin/image/index/index4.png",
    changeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/get_project_info.cls.php',
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

            wx.redirectTo({
              url: '/pages/index/index'
            })
        } else {
          that.setData({
            countryList:res.data.city,
            countryIndex:0,
            addlist:res.data.addlist,
            user_city: res.data.city[0],
            changeIndex: 0,
            add: res.data.addlist[0],
            user_project: res.data.addlist[0][0]
          });
        }
      }
    })
    
  },
  onGotUserInfo: function (e) {
    wx.getUserInfo({
      success(res) {
        app.globalData.userInfo = res.userInfo
      }
    })
  },
  // 选择城市
  changeCountry(e) {
    user_city= this.data.countryList[e.detail.value],
      user_project = this.data.addlist[e.detail.value][0]
    this.setData({
      changeIndex:0,
      countryIndex: e.detail.value,
      add: this.data.addlist[e.detail.value],
      user_city: this.data.countryList[e.detail.value],
      user_project: this.data.addlist[e.detail.value][0]
    });
  },
  change(e) {
    user_project = this.data.add[e.detail.value]
    this.setData({
      changeIndex: e.detail.value,
      user_project: this.data.add[e.detail.value]
    });
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
  /**跳转至first页面**/
  openFirst1: function (e) {
    if (this.data.countryIndex == 0){
      wx.showToast({
        title: '请选择城市',
        icon: 'none',
        duration: 2000
      })
    }else if (e.detail.value.rname == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
    } else if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请输入电话',
        icon: 'none',
        duration: 2000
      })
    } else {
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
                    code: res.code,
                    user_city: user_city,
                    user_project: user_project,
                    user_name: e.detail.value.rname,
                    user_phone: e.detail.value.phone
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    //'cookie': 'PHPSESSID=' + app.globalData.phpsessId
                  },
                  success: res => {
                    app.globalData.phpsessId = res.data.phpsessid
                    app.globalData.openId = res.data.openid
                    app.globalData.userInfo = res.userInfo
                    if (res.data.state == 1) {
                      wx.redirectTo({
                        url: '/pages/first/first'
                      })
                    } else {
                      wx.redirectTo({
                        url: '/pages/index/index'
                      })
                    }
                  },
                  fail: function (res) {
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

  },
  openPopup2:function(e){
    this.setData({
      popupState:2
    })
  },
  // 游客登录
  openFirst2: function () {
      wx.redirectTo({
        url: '../first/first',
      })
  },
  /**弹出登录框**/
  openPopup1: function () {
    this.setData({
      popupState: 1
    })
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
})
