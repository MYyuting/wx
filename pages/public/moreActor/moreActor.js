// pages/moreActor/moreActor.js
var config = require("../../../utils/config.js")
Page({

    data: {
        followList:[],
        hiddenName:true,    //关注   
        follow:'',
    },
    details(e){
        var id = e.currentTarget.dataset.actorid
        wx.navigateTo({
            url: '../actorDetails/actorDetails?goodId='+ id,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            follow: options.follow
        })
        if(options.follow == 1){
            // 关注的请求
            this.getActorFollow()
        }else{
            this.getActorList()
        }
    },
    // 请求关注的艺人列表
    getActorFollow(){
        var that = this;
        wx.request({
            url: config.serverUrl + '/concern/getConrnList',
            data:{},
            header:{'token':wx.getStorageSync("token")},
            success(res){
                console.log(res.data);
                if(res.data.code == 0){
                    that.setData({
                        followList:res.data.data
                    })
                }else{
                    wx.showToast({
                        title: '网络错误',
                    })
                }
            }
        })
    },
    // 请求没有关注的
    getActorList(){
        var that =this;
        wx.request({
            url: config.serverUrl +'/actor/getActorByState',
            data:{
                page:0,
                pageSize:0,
            },
            header: { 'token': wx.getStorageSync("token") },
            success(res){
                console.log(res);
                if (res.data.code == 0) {
                    that.setData({
                        followList: res.data.data
                    })
                } else {
                    wx.showToast({
                        title: '网络错误',
                    })
                }
            }
        })
    },
    // 点击关注
    addFollow(e){
        console.log(e.currentTarget.dataset.actorid)
        var goodId = e.currentTarget.dataset.actorid
        this.Follow(goodId, 1)
    },
    // 点击取消关注
    calerFollow(e) {
        console.log(e.currentTarget.dataset.actorid);
        var goodId = e.currentTarget.dataset.actorid
        this.Follow(goodId,0)
    },
    // 点击取消\添加关注
    Follow(goodsId, state){
        var that = this;
        wx.request({
            url: config.serverUrl + '/concern/addConcern',
            data: {
                goodsId: goodsId,
                state: state,
            },
            method:"GET",
            header: { 
                // 'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync("token") 
            },
            success(res) {
                console.log(res);
                if (res.data.code == 0) {
                    if (that.data.follow){
                        that.getActorFollow()
                    }else{
                        that.getActorList()
                    }
                } else {
                    wx.showToast({
                        title: '网络错误',
                    })
                }
            }
        })
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

    }
})