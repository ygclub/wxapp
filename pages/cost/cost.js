// pages/cost/cost.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    money:{
      student:0,
      people:0
    },
    cost :{
      money:0,
      people:0,
      student:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      this.setData({
        money:{
          student: options.mStudent-0,
          people: options.mPeople-0
        },
        cost:{
          money: options.money-0,
          people: options.people-0,
          student: options.student-0
        }
      })
  },
})