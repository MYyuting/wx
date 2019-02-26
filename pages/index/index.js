//index.js
//获取应用实例
var config = require("../../utils/config.js")
const app = getApp();
Page({
    data: {
        nvabarData:{
            noticeState: false, //是否显示左上角图标   1表示显示    0表示不显示
            title: '美星会', //导航栏 中间的标题
        },
        height: app.globalData.height * 2 + 22,
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        banner: [
            '../../images/banner.jpg',
        ],
        swiperIndex:0,
        consult: [],
        actorList:[],
    },
    //艺人详情点击
    actorClick: function (e) {
        var actorId = e.currentTarget.dataset.actorid
        wx.navigateTo({
            url: '../public/actorDetails/actorDetails?actorId='+actorId
        })
    },
    starClick: function () {
        wx.navigateTo({
            url: '../public/starDetails/starDetails'
        })
    },
    sosClick(){
        wx.navigateTo({
            url: '../public/search/search',
        })
    },
    consulsClick (e) {  
        var consultId = e.currentTarget.dataset.infoid //咨询ID
        wx.navigateTo({
            url: '../public/consultDetails/consultDetails?consultId=' + consultId
        })
    },
    chuangEvent: function (e) {
        this.setData({
            swiperIndex: e.currentTarget.id
        })
    },
    swiperChange(e) {
        this.setData({
            swiperIndex: e.detail.current
        })
    },
    //   点击更多 more
    moreClick:function(e){
        console.log(e.currentTarget.dataset.more);
        if (e.currentTarget.dataset.more == "艺人"){
            wx.navigateTo({
                url: '../public/moreActor/moreActor'
            })
        }else{
            wx.navigateTo({
                url: '../public/moreStar/moreStar'
            }) 
        }
    },
    onLoad: function() {
        this.getBanner();
        this.getMations();
        this.getActor();
    },
    //艺人获取列表
    getActor(){
        var that = this;
        wx.request({
            url: config.serverUrl + '/actor/getActorByState',
            method: "GET",
            header: { 'token': wx.getStorageSync("token") },
            data:{
                page:0,
                pageSize:5
            },
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.setData({
                        actorList: res.data.data
                    })
                }
            }
        })
    },
    // 获取轮播数据
    getBanner(){
        var that = this;
        wx.request({
            url: config.serverUrl +'/homePage/getBanners',
            success(res){
                console.log(res)
                if(res.data.code == 0){
                    that.setData({
                        banner:res.data.data
                    })
                }
            }
        })
    },
    // 获取质询讯列表
    getMations() {
        var that = this;
        wx.request({
            url: config.serverUrl + '/homePage/getInfomations',
            method:"GET",
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.setData({
                        consult: res.data.data
                    })
                }
            }
        })
    },
    // 获取推送信息状态
    getState(){
        var that = this;
        wx.request({
            url: config.serverUrl +'/homePage/chargeIsRead',
            method:"GET",
            header:{'token':wx.getStorageSync("token")},
            success(res){
                console.log(res)
                if(res.data.code == 202){
                    // 没有未读
                    that.setData({
                        'nvabarData.noticeState': true
                    })
                }else{
                    // 有未读
                    that.setData({
                        'nvabarData.noticeState':false
                    })
                }
            }
        })
    },
    onShow: function () {
        this.getState()
    },
})