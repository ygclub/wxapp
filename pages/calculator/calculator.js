//index.js
//获取应用实例
Page({
  data: {
    result: true,
    sumbitStyle: {},
    money:{
      people:"",
      student:""
    },
    sumbitData:[
      {
        title:"计算AA金额",
        style:"defult",
        status:"0",
        type:"submit"
      },
      {
        title: "计算AA金额",
        style: "isCalculator",
        status: "0",
        type: "submit"
      },
      {
        title: "重新计算",
        style: "isCalculator",
        status: "1",
        type: "reset"
      }
    ]
  },
  onLoad: function (options) {
    this.setData({
      sumbitStyle : this.data.sumbitData[0]
    })
  },
  onShow: function () {
   
  },
  flagMoney:false,
  flagPeople:false,
  bindconfirm:function(e){
    if (e.target.id =="money")
    {
      if(e.detail)
      {
        this.flagMoney = true;
      }else{
        this.flagMoney = false;
      }
      this.buttonStyle();
    } else if (e.target.id ="allpeople")
    {
      if (e.detail)
       {
        this.flagPeople = true;
      }else{
        this.flagPeople = false;
      }
      this.buttonStyle();
    }
  },
  buttonStyle:function(){
    if (this.flagMoney == true && this.flagPeople == true)
    {
      this.setData({
        sumbitStyle: this.data.sumbitData[1],
        result: true
      })
    }else{
      this.setData({
        sumbitStyle: this.data.sumbitData[0],
        result: true
      })
    }
  },
  formReset:function(e){
    this.setData({
      sumbitStyle: this.data.sumbitData[0],
      result: true
    })
    this.flagMoney=false;
    this.flagPeople=false;
  },
  formSubmit:function(e){
    if (this.data.sumbitStyle.status==1)
    {
      this.formReset(e);
    }else{
      var money = e.detail.value.money;
      var people = e.detail.value.allpeople;
      var student = e.detail.value.student || 0;
      if (parseInt(student)>=parseInt(people))
      {
        wx.showModal({
          title: '阳光提示',
          content: '这次学生太多了，就不半价了',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return false;
      }
      if (money && people) 
      {
        this.setData({
          money: {
            people: Math.ceil(money / (parseInt(people) + student / 2)),
            student: Math.ceil(money / (parseInt(people) + student / 2)) / 2
          },
          sumbitStyle: this.data.sumbitData[2],
          result: false
        })
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title: '本次聚餐金额',
      path: '/page/user?id=123'
    }
  }
})

