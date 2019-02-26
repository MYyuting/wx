// pages/public/actorDetails/actorDetails.js
var config = require("../../../utils/config.js")
Page({

    data: {
        banner: [
            '../../../images/banner.jpg',
        ],
        hornShow:"/images/follow.png",  //关注
        focusShow:false,
        introduce:{},    //艺人介绍
        productionList:[],   // 作品
        dynamicsList:[],     //动态
        actorId:"",
        isConcern: '0', // 1代表添加关注 0代表取消关注
        comentTxt:'',
        comentList:[], // 评论列表
    },
    // 点击关注
    hornClick(){
        var state = this.data.isConcern == 0 ? '1' :'0'
        console.log(state)
        var that = this;
        wx.request({
            url: config.serverUrl +'/concern/addConcern',
            data: {
                goodsId: that.data.actorId,
                state: state,   //1代表添加关注 0代表取消关注
            },
            header: {
                // 'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync("token")
            },
            success(res) {
                console.log(res)
                if(res.data.code == 0){
                    if (state == 1){
                        console.log('关注')
                        that.setData({
                            hornShow: "/images/follow1.png",
                            isConcern:'1'
                        })
                    }else{
                        console.log('取消关注')
                        that.setData({
                            hornShow: "/images/follow.png",
                            isConcern: '0'
                        }) 
                    }
                }else{
                    wx.showToast({
                        title: '网络请求错误',
                        icon:"none"
                    })
                }
            }
        })
        
    },
    inputFocus(){
        this.setData({
            focusShow:true
        })
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            actorId: options.actorId
        })
        this.getDetails(options.actorId)
        this.getCometns()
    },
    // 获取艺人详情
    getDetails(id){
        var that = this;
        wx.request({
            url: config.serverUrl + '/actor/getActorDetail',
            data:{
                actorId: id
            },
            header:{
                'token':wx.getStorageSync("token")
            },
            success(res){
                console.log(res)
                if(res.data.code == 0){
                    var strImg = res.data.data.good.actorBanner
                    var banner = strImg.split(',')
                    console.log(banner);
                    if (res.data.data.good.isConcern == 1){
                        that.setData({
                            hornShow:'/images/follow1.png'
                        })
                    }else{
                        that.setData({
                            hornShow: '/images/follow.png'
                        })
                    }
                    that.setData({
                        introduce:res.data.data.good,
                        banner:banner,
                        productionList: res.data.data.productionList,
                        dynamicsList: res.data.data.dynamicsList,
                        isConcern: res.data.data.good.isConcern
                    })

                }
            }
        })
    },
    // 获取用户评论
    getCometns(){
        var that = this;
        wx.request({
            url: config.serverUrl + '/cocern/getComment',
            data: {
                actorId: that.data.actorId,
            },
            method: "GET",
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.setData({
                        comentList:res.data.data
                    })
                }
            }
        })
    },
    // 点击发送评论
    addcoment(){
        var that = this;
        wx.request({
            url: config.serverUrl + '/actor/addComment',
            data: {
                actorId:that.data.actorId,
                contant: that.data.comentTxt,
                userUrl: wx.getStorageSync("userInfo").userAvatar,
                userName: wx.getStorageSync("userInfo").userName
            },
            method:"GET",
            header: {
                // 'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync("token")
            },
            success(res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.getCometns()
                }else{
                    wx.showToast({
                        title: '网络错误',
                        icon: 'none'
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
    comentTxt(e){
        this.setData({
            comentTxt: e.detail.value
        })
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