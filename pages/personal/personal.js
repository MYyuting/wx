// pages/personal/personal.js
const app = getApp();
var config = require("../../utils/config");
Page({
    data: {
        nvabarData: {
            showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
            title: '个人中心', //导航栏 中间的标题
        },
        height: app.globalData.height * 2 + 22,
        mylist:[
            {
                imgurl: '/images/help.png',
                txt: '帮助',
                type:"help"
            },
            {
                imgurl: '/images/seting.png',
                txt: '设置',
                type: "setting"
            }
        ],
        token:"",
        personMsg:{},  //个人数据
        autState: {},   //认证状态 status * 0:认证通过 * 1:待完善 * 2:待认证 * 3:认证未通过
        actorNum:0,
        phoneShow:false,
        phone:'',
        codeYzm:'',
    },
    // 填写资料
    fellInfo(){
        wx.navigateTo({
            url: 'datum/datum',
        })
    },
    phoneChange(e){
        // console.log(e)
        this.setData({
            phone: e.detail.value
        })
    },
    codeChange(e){
        this.setData({
            codeYzm: e.detail.value
        })
    },
    onCancel(){
        this.setData({
            phoneShow:false
        })
    },
    onConfirm(){
        var that = this;
        wx.request({
            url: config.serverUrl + "/bind/tel",
            data: {
                tel: that.data.phone,
                code: that.data.codeYzm
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': that.data.token
            },
            method: 'POST',
            success: function (res) {
                console.log(res)
                if (res.data.code == 0) {
                    that.setData({
                        phoneShow: false
                    })
                    that.personData();
                } else if (res.data.code == 103){
                    that.showToast('验证码错误或超时');
                } else if (res.data.code == 106) {
                    that.showToast('账号已被绑定，请勿重复绑定');
                } else if (res.data.code == 107) {
                    that.showToast('手机号已绑定其他账号，请勿重复绑定');
                }
            },
            fail: function (res) {
                console.log(res)
            },
            complete: function (res) {

            },
        })
    },
    sendYzm(){
        var that = this;
        if (this.data.phone.length != 11){
            wx.showToast({
                title: '请输入正确的手机号',
                icon:'none'
            })
            return
        }
        wx.request({
            url: config.serverUrl + "/sms/sendByTel",
            data: {
                tel: that.data.phone,
                type: '0'
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': that.data.token
            },
            method: 'POST',
            success: function (res) {
                console.log(res)
                if(res.data.code == 0){
                    that.showToast('发送成功');
                } else if (res.data.code == 2) {
                    that.showToast(res.data.message)
                } else if (res.data.code == 101) {
                    that.showToast(res.data.message)
                }else {
                    that.showToast('请稍后再试')
                }
            }
        })
    },
    showToast(msg){
        wx.showToast({
            title: msg,
            icon:'none'
        })
    },
    // 点击认证
    authentic(){
        if (!this.data.personMsg.userTel){
            this.setData({
                phoneShow: true
            })
            return;
        }
        console.log(this.data.autState.identityStatus)
        switch (this.data.autState.identityStatus){
            case '2':
                wx.showToast({
                    title: '正在认证中...',
                    icon: "none",
                })
                break;
            case '1':
                wx.navigateTo({
                    url: 'fellinfo/fellinfo1/fellinfo1',
                })
                break;
            case '3':
                wx.navigateTo({
                    url: 'fellinfo/fellinfo',
                }) 
        }
    },
    // 关注的人
    followTap(){
        wx.navigateTo({
            url: '../public/moreActor/moreActor?follow=1',
        })
    },
    // 充值中心
    rechargeClick(){
        wx.navigateTo({
            url: 'recharge/recharge',
        })
    },
    listClick(e){
        let type = e.currentTarget.dataset.type;
        if(type == "setting"){
            wx.navigateTo({
                url: 'setting/setting',
            })
        }else{
            wx.navigateTo({
                url: 'help/help',
            })
        }
    },
    // 获取关注艺人
    getActor(){
        var that = this ;
        wx.request({
            url: config.serverUrl +'/concern/getCount',
            data:{token:wx.getStorageSync("token")},
            success(res){
                console.log(res);
                if(res.data.code == 0){
                    that.setData({
                        actorNum:res.data.data
                    })
                }
            }
        })
    },
    // 获取认证状态信息
    getAutState(){
        var that = this;
        wx.request({
            url: config.serverUrl + "/aut/getAutInfo",
            data: {},
            header: { 'token': this.data.token},
            method: 'GET',
            success: function (res) {
                console.log(res)
                if (res.data.data) {
                    that.setData({
                        autState: res.data.data
                    })
                }
            },
            fail: function (res) {
                console.log(res)
            },
            complete: function (res) {

            },
        })
    },
    // 获取用户信息
    personData(token){
        var that = this;
        wx.request({
            url: config.serverUrl + "/cen/getUserInfo",
            data: {
                token: that.data.token
            },
            method: 'GET',
            success: function (res) {
                console.log(res)
                if(res.data.code == 0){
                    that.setData({
                        personMsg:res.data.data
                    })
                }
            },
            fail: function (res) {
                console.log(res)
            },
            complete: function (res) {
                
            },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        that.setData({
            token: wx.getStorageSync("token")
        })
        this.personData();
        this.getAutState();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.getActor();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})