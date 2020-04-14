//index.js
//开始页动画
const app = getApp()

Page({
  data: {
    //初始化数据
    hideNotice: false,
    notice: '哈哈哈哈哈哈，我是滚动的公告，快来抓我呀~',
    marqueePace: 1,//滚动速度
    marqueeDistance: 10,//初始滚动距离
    size: 12,
    interval: 20, // 时间间隔
    countTime: ''
  },
  onLoad: function () {
    let data = {}, that = this;
    var length = that.data.notice.length * that.data.size; //文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    that.setData({ length, windowWidth });
    that.setData({
      marqueeDistance: windowWidth
    });
    that.run1();
  },

  run1: function () {
    var that = this;
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

  //
})