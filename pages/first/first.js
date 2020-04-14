// pages/first/first.js
const app = getApp();
var intimes
Page({

  /**
   * 页面的初始数据
   */
  data: {
    honor:"游客暂无",
    musicState: 1,
    day: 1,
    hideNotice: false,
    countTime: '',
    popup: 0,
    background: ['https://rui.20181206.top/weixin/image/first/66.png', 'https://rui.20181206.top/weixin/image/first/77.png'],
    indicatorDots: false,
    signState: 0,
    explan: "https://rui.20181206.top/weixin/image/first/first2.png",
    ranking: "https://rui.20181206.top/weixin/image/first/first3.png",
    me: "https://rui.20181206.top/weixin/image/first/first4.png",
    music: "https://rui.20181206.top/weixin/image/first/first5.png",
    earth: "https://rui.20181206.top/weixin/image/first/99.png",
    earthBnt: "https://rui.20181206.top/weixin/image/first/first12.png",
    popup01: "https://rui.20181206.top/weixin/image/first/pop11.png",
    popup02: "https://rui.20181206.top/weixin/image/first/popup02.png",
    popup03: "../../images/popup03.png",
    //初始化数据
    hideNotice: false,
    notice: '哈哈哈哈哈哈，我是滚动的公告，快来抓我呀~',
    marqueePace: 1,//滚动速度
    marqueeDistance: 10,//初始滚动距离
    size: 12,
    interval: 20, // 时间间隔
    countTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   var that = this
    that.run1();
    var animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    this.animation = animation
    var next = true;
    setInterval(function () {
      if (next) {
        animation.translateX(4).step();
        animation.rotate(10).step()
        next = !next;
      } else {
        animation.translateX(-4).step();
        animation.rotate(-10).step()
        next = !next;
      }
      this.setData({
        animation: animation.export()
      })
    }.bind(this), 500)
    wx.request({
      url: 'https://rui.20181206.top/parper_question.php',
      method: 'POST',
      data: {
        id: 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
        app.globalData.sub = res.data.question
          console.log(app.globalData.sub)
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
          }
        })
      }
    })
    wx.request({
      url: 'https://rui.20181206.top/get_notice_info.cls.php',
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
          intimes = res.data.intimes
          that.setData({
            intimes: res.data.intimes,
            notice: res.data.notice_text
          })
          app.globalData.pdp = res.data.intimes
        }
      }
    })
    wx.request({
      url: 'https://rui.20181206.top/update_usersign_info.cls.php',
      method: 'POST',
      data: {
        sign: 2,
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
          if (app.globalData.honor != res.data.honor) {
            app.globalData.honor = res.data.honor
            var upgrade = 1
          } else {
            var upgrade = 2
          }
          if (res.data.sign == 0) {
            that.setData({
              signState: 1
            })
          } else {
            that.setData({
              signState: 0
            })
          }
          if (res.data.identity == '游客') {
            res.data.honor = "游客暂无"
          }
          that.setData({
            upgrade: upgrade,
            day: res.data.day,
            honor: res.data.honor,
            identity: res.data.identity,
            upgradetext: res.data.honor,
            kk: 1,
          })
        }

      }
    })
    this.initAnimation(this.data.text)
  },
  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady: function () { 
    app.puclicFun()
  },
  run1: function () {
    var that = this;
    let data = {};
    var length = that.data.notice.length * that.data.size; //文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    that.setData({ length, windowWidth });
    that.setData({
      marqueeDistance: windowWidth
    });
    that.data.countTime = setInterval(function () {
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });
      } else {
        clearInterval(that.data.countTime);
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.run1();
      }
    }, that.data.interval);
  },
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function () {
    return {
      path: '/pages/index/index', //转发的路径

    }
  },

  /*签到*/
  openSign: function() {
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/update_sign_info.cls.php',
      method: 'POST',
      data: {
        sign: 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
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
          if (res.data.sign == -1) {
            that.setData({
              signState: 1
            })
          } else if (res.data.ten == 10) {
            console.log('adssad'+ res.data.ten)
            that.setData({
              signState: 1,
              ten: res.data.ten
            })
          } else {
            that.setData({
              signState: 1
            })
          }
        }

      }
    })
    var circleCount = 0;
    this.animationMiddleHeaderItem = wx.createAnimation({
      duration: 1000, 
      timingFunction: 'linear',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function(res) {}
    });
    setInterval(function() {
      if (circleCount % 2 == 0) {
        this.animationMiddleHeaderItem.scale(1.15).step();
      }else{
        this.animationMiddleHeaderItem.scale(1.10).step();
      }

      this.setData({
        animationMiddleHeaderItem: this.animationMiddleHeaderItem.export() //输出动画
      });

      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1000);
    this.setData({
      signState: 1,
      popup: 2,
      condition: 2,
    });
  },
  upgrade:function(){
    var animation = wx.createAnimation({
      duration: 2000, 
      timingFunction: "linear", 
      delay: 0 
    });
    this.animation = animation;
    animation.opacity(0).scaleZ(-100).step();
    this.setData({
      animationData: animation.export(),
    })
    var that = this
    setTimeout(function () {
      that.setData({
        upgrade: 2
      })
    },2000)
  },
  /*说明按键函数*/
  openExplan: function() {
    this.setData({
      popup: 1
    });
  },

  /*排行按键函数*/
  openRanking: function() {
    wx.navigateTo({
      url: '../ranking/ranking',
    })
  },

  /*我的按键函数*/
  openMe: function() {
    wx.navigateTo({
      url: '../me/me',
    })
  },

  openAnswer: function() {
    console.log(app.globalData.dpd)
    if (app.globalData.dpd == 1){
      if (intimes > 0 || intimes==null) {
        wx.navigateTo({
          url: '../answer/answer',
        })
      } else {
        wx.showToast({
          title: '今日答题次数已满，请明日再来',
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '今日答题次数已满，请明日再来',
        icon: 'none',
        duration: 2000
      })
    }
  },

  openranking:function(){
    console.log(4354)
    wx.navigateTo({
      url: '../ranking/ranking',
    })
  },

  closePopup: function() {
    this.setData({
      popup: 0,
      condition: 1
    });
    this.onShow();
  },
  mucControl: function() {
    if (this.data.musicState == 1) {
      app.back()
      this.setData({
        musicState:0
      })
    } else if (this.data.musicState == 0) {
      app.puclicFun()
      this.setData({
        musicState: 1
      })
    }
  },




  onHide() {
    this.destroyTimer()
    this.setData({
      timer: null
    })
  },
  onUnload() {
    this.destroyTimer()
    this.setData({
      timer: null
    })
  },
  destroyTimer() {
    if (this.data.timer) {
      clearTimeout(this.data.timer);
    }
  },
  /**
   * 开启公告字幕滚动动画
   * @param {String} text 公告内容
   * @return {[type]} 
   */
  initAnimation(text) {
    let that = this
    this.data.duration = 15000
    this.data.animation = wx.createAnimation({
      duration: this.data.duration,
      timingFunction: 'linear'
    })
    let query = wx.createSelectorQuery()
    query.select('.content-box').boundingClientRect()
    query.select('#text').boundingClientRect()

  },

})