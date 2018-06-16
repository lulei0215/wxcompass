//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    rotate:0,
    direction:'--',
    angule:'--'
  },
  onLoad:function(){
    var me = this;
    wx:wx.onCompassChange(function(res){
      console.log(res);
      var value = res.direction;
      me.setData({
        rotate:- value,
        direction:me.getDirectionText(value),
        angule:value.toFixed(2)+'°'
      })
    })

    //5秒后判断是否发生改变
    setTimeout(function(){
      console.log(12);
      if(me.data.direction == '--' && me.data.angule == '--'){
        wx.showToast({
          title: '您的手机不支持电子罗盘或者被禁用',
          icon:'loading',
          duration:5000
        })
      }
    },5000)
  },
  //获取当前对应的文案
  getDirectionText:function(value){
    var dir = '正北 东北 正东 东南 正南 西南 正西 西北'.split(' ')
    //定义角度区域
    var dirAngle = 360 / 8;
    var index = Math.floor(( value + dirAngle / 2) / dirAngle % 8);
    return dir[index];


  }


})
