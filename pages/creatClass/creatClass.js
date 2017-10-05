// pages/creatClass/creatClass.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolArray: ["定福小学","朱房村社区","经纬学校"],
    classArray: ["数学", "英语", "围棋","化学","足球","计算机","绘本","舞蹈"],
    lessionArray: ["2015秋季", "2016春季", "2016秋季", "2017春季", "2017秋季", "2018春季", "2018秋季", "2019春季"],
    frequencyArray:["第一次","第二次","第三次","第四次","第五次"],
    schoolIndex: 0,
    classIndex:0,
    lessionIndex:0,
    frequencyIndex:0
  },
  bindPickerSchoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },
    bindPickerClassChange: function (e) {
      this.setData({
        classIndex: e.detail.value
      })
  },
    bindPickerLessionChange: function (e) {
      this.setData({
        lessionIndex: e.detail.value
      })
    },
    bindPickerFrequencyChange:function(e){
      this.setData({
        frequencyIndex: e.detail.value
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },
  toHost: function () {
    wx.navigateTo({
      url: '/pages/mainHost/mainHost'
    })
  }
})