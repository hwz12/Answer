var app = getApp()
const myaudio = wx.createInnerAudioContext({});
var i = 0
var init
var opacity
var opacity1
var opacitynum = 0.1
var size
var choose = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pdp: app.globalData.pdp,
    musicState:1,
    times:1,
    timer: '',//定时器名字
    countDownNum: '10',//倒计时初始值
    second: 9,
    millisecond: 100,
    newscoreopen:2,
    score: 0,
    scores: 0,
    winscore:0,
    state: 0,
    coloDtateA: 'default',
    coloDtateB: 'default',
    coloDtateC: 'default',
    background: "https://rui.20181206.top/weixin/image/answer/answer1.jpg",
    ansBg1: "../../images/time.png",
    ansBg2: "../../images/win.gif",
    ansBg3: "../../images/lose.gif",
    "prompt": [
      "稳住！胜利就在你眼前",
      "可以当无事发生重新来过？",
      " 距离胜利就差一丢丢",
      "心态好才是真的好",
      "懵懂少年，纯真如你"
    ],
    "prompt1": [
      "恭喜你距离赛季大奖又进一步",
      "越战越勇，还有谁！",
      "聪明机智，速度过人"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    i = 0
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/get_times.php',
      method: 'POST',
      data: {
        data: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
          that.setData({
            times: res.data.user_dayplay
          })
        if (res.data.user_dayplay <= 1) {
          app.globalData.dpd = 2
        }else{
          app.globalData.dpd = 1
        }
      }
    })
    var nowstate = that.data.state
    opacitynum = 0.1
    size = 55
    if (0 == nowstate) {
      opacity = setInterval(function () { that.opacitynum() }, 10);
      setTimeout(function () {
        opacitynum = 0.1
        size = 55
        opacity1 = setInterval(function () { that.opacitynum() }, 10);
        that.setData({
          state: 11,
        })
        setTimeout(function () {
          that.setData({
            state: 1,
          })
          that.countDown();
        }, 1500) //延迟时间 这里是3秒
      }, 1500) //延迟时间 这里是3秒
    }
      wx.request({
        url: 'https://rui.20181206.top/get_question_info.cls.php',
        method: 'POST',
        data: {
          data:1
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': 'PHPSESSID=' + app.globalData.phpsessId
        },
        success: function (res) {
          wx.hideLoading()
          if (res.data.code == 1) {
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
            app.globalData.sub = res.data.question
            that.setData({
              kk: 1,
              centont: app.globalData.sub,
              honor:res.data.honor,
              day: res.data.user_id,
              user_name: res.data.user_name,
              amt:1
            })
            
          }
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.fun()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var circleCount = 0;
    this.animationMiddleHeaderItem = wx.createAnimation({
      duration: 2000, // 以毫秒为单位  
      timingFunction: 'linear',
      delay: 200,
      transformOrigin: '50% 50%',
      success: function (res) { }
    });
    setInterval(function () {
      if (circleCount % 2 == 0) {
        this.animationMiddleHeaderItem.scaleX(1.15).step();
      } else {
        this.animationMiddleHeaderItem.scaleX(1.0).step();
      }

      this.setData({
        animationMiddleHeaderItem: this.animationMiddleHeaderItem.export() //输出动画
      });

      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1000);
    myaudio.src = "/images/butmusic.mp3"
  },

  opacitynum:function(){
    opacitynum = opacitynum + 0.01
    size = size - 0.5
    this.setData({
      opacitynum:opacitynum,
      size: size
    })
    if (size < 25){
      clearInterval(opacity1)
    }
    if (size < 25) {
      clearInterval(opacity)
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

  

  chooseA: function () {
    if(choose == 1){
    this.butmusic()
    var that = this
    var a = 'A'
    var num = this.data.state - 1
    var nowans = this.data.centont[num].question_ture
    var nowscore = this.data.score
    if (a == nowans) {
      clearInterval(init);
      var newstate = that.data.state + 1
      var newcore = that.data.score + 1 * that.data.countDownNum + 0.01 * this.data.millisecond
      var scores = 1 * that.data.countDownNum + 0.01 * this.data.millisecond
      this.setData({
        winscore: newcore.toFixed(2),
        score: newcore,
        scores: scores.toFixed(2),
        coloDtateA: 'primary',
        newscoreopen:1,
        promptnum:1
      })
      setTimeout(function () {
        if (newstate == 6) {
          that.get();
        }
        that.setData({
          state: newstate,
          coloDtateA: 'default',
          newscoreopen:2
        })
        if (num<4){
          that.countDown();
        }
      }, 2000) //延迟时间 这里是2秒
    } else {
      clearInterval(init);
      this.setData({
        coloDtateA: 'warn',
        promptnum:0
      })
      setTimeout(function () {
        that.setData({
          state: 7
        })
        that.get();
      }, 1000) //延迟时间 这里是1秒
    }
    choose = 0;
    this.fun()
    }
  },

  chooseB: function () {
    if (choose == 1) {
    this.butmusic()
    var that = this
    var b = 'B'
    var num = this.data.state - 1
    var nowans = this.data.centont[num].question_ture
    var nowscore = this.data.score
    if (b == nowans) {
      clearInterval(init);
      var newstate = that.data.state + 1
      var newcore = that.data.score + 1 * that.data.countDownNum + 0.01 * this.data.millisecond
      var scores = 1 * that.data.countDownNum + 0.01 * this.data.millisecond
      this.setData({
        winscore: newcore.toFixed(2),
        score: newcore,
        scores: scores.toFixed(2),
        coloDtateB: 'primary',
        newscoreopen: 1,
        promptnum:1
      })
      setTimeout(function () {
        if (newstate == 6) {
          that.get();
        }
        that.setData({
          state: newstate,
          coloDtateB: 'default',
          newscoreopen: 2
        })
        if (num < 4) {
          that.countDown();
        }
      }, 2000) //延迟时间 这里是2秒
    } else {
      clearInterval(init);
      this.setData({
        coloDtateB: 'warn',
        promptnum:0
      })
      setTimeout(function () {
        that.setData({
          state: 7
        })
        that.get();
      }, 1000) //延迟时间 这里是1秒
    }
    choose = 0;
    this.fun()
    }
  },

  chooseC: function () {
    if (choose == 1) {
    this.butmusic()
    var that = this
    var c = 'C'
    var num = this.data.state - 1
    var nowans = this.data.centont[num].question_ture
    var nowscore = this.data.score
    if (c == nowans) {
      clearInterval(init);
      var newstate = that.data.state + 1
      var newcore = that.data.score + 1 * that.data.countDownNum + 0.01 * this.data.millisecond
      var scores = 1 * that.data.countDownNum + 0.01 * this.data.millisecond
      this.setData({
        winscore: newcore.toFixed(2),
        score: newcore,
        scores: scores.toFixed(2),
        coloDtateC: 'primary',
        newscoreopen: 1,
        promptnum:1
      })
      setTimeout(function () {
        if (newstate == 6){
          that.get();
        }
        that.setData({
          state: newstate,
          coloDtateC: 'default',
          newscoreopen: 2
        })
        if (num < 4) {
          that.countDown();
        }
      }, 2000) //延迟时间 这里是2秒
    } else {
      clearInterval(init);
      this.setData({
        coloDtateC: 'warn',
        promptnum:0
      })
      setTimeout(function () {
        that.setData({
          state: 7
        })
        that.get();
      }, 1000) //延迟时间 这里是1秒
    }
    choose = 0; 
    this.fun()
    }
  },
  butmusic: function () {
    myaudio.play();
  },
  get:function(){
    
    app.globalData.pdp --
    this.setData({
      pdp: app.globalData.pdp
    })
    console.log(this.data.pdp)
    var that = this
    wx.request({
      url: 'https://rui.20181206.top/update_question_times.php',
      method: 'POST',
      data: {
        score: this.data.score,
        num:i,
        yes: this.data.state
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
        i=0
      }
    })
    
  },
  lastgo: function () {
    var that = this
    wx.redirectTo({
      url: '/pages/answer/answer'
    })
    // this.onLoad()
  },
  last: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  lastup: function () {
    wx.navigateBack({
      delta: 1 
    })
  },
  
  countDown: function () {
    clearInterval(init);
    var that = this;
    that.setData({
      countDownNum: 9,
      millisecond: 100
    })
    init = setInterval(function () {
      that.timer()
    }, 50);
  },
  timer: function () {
    choose = 1;
    var that = this;
    that.setData({
      millisecond: that.data.millisecond - 5
    })
    if (that.data.millisecond <= 0) {
      that.setData({
        millisecond: 100,
        countDownNum: that.data.countDownNum - 1
      })
    }
    if (that.data.countDownNum < 1) {
      clearInterval(init);
      var nowstate = that.data.state
      if (nowstate == 6) {

      } else {
        that.setData({
          state: 7
        })
      }
    }
    that.setData({
      countDownNum: that.data.countDownNum,
      millisecond: that.data.millisecond
    })
  },
  fun:function(){
    var circleCount = 0;
    this.animationMiddle = wx.createAnimation({
      duration: 2000, // 以毫秒为单位  
      timingFunction: 'linear',
      delay: 0,
      transformOrigin: '50% 50%',
      success: function (res) { }
    });
    setInterval(function () {
      if (circleCount % 2 == 0) {
        this.animationMiddle.scale(1.5).step();
      }

      this.setData({
        animationMiddle: this.animationMiddle.export() //输出动画
      });
        circleCount = 1;
    }.bind(this), 100);
    var that = this
     i++
    if (that.data.state == 5){
      setTimeout(function () {
        that.setData({
          newscoreopen:2,
          animations: null,
        })
      },2000)
    }
    if (this.data.promptnum == 1){
      var number = Math.floor(Math.random() * 2)
      that.setData({
        prompts: that.data.prompt1[number],
      })
    }else{
      var number = Math.floor(Math.random() * 5)
      that.setData({
        prompts: that.data.prompt[number],
      })
    }
  },
  music: function () {
    if (this.data.musicState == 1) {
      app.back()
      this.setData({
        musicState: 0
      })
    } else if (this.data.musicState == 0) {
      app.puclicFun()
      this.setData({
        musicState: 1
      })
    }
  },
})