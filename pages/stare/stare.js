// pages/stare/stare.js
var config = require("../../utils/config");
var app = getApp();
Page({

    data: {
        code: "",
        btnShow: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        if (wx.getStorageSync('token')) {
            wx.request({
                url: config.serverUrl + "/login/byToken",
                header: { 
                    'content-type': 'application/x-www-form-urlencoded',
                    'token': wx.getStorageSync('token')
                },
                method:'GET',
                success(res){
                    console.log(res);
                    if (res.data.code == 0){
                        wx.setStorage({
                            key: 'token',
                            data: res.data.data.token,
                        })
                        wx.setStorage({
                            key: 'userInfo',
                            data: res.data.data,
                        })
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                    }else{
                        that.getCode()
                    }
                },
                fail(){

                },
                complete(){

                }
            })
        } else {
            that.getCode()
        }
    },

    // 获取code登录
    getCode(){
        var that =this ; 
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId

                that.setData({
                    code: res.code
                })
                wx.getSetting({
                    success: res => {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            that.setData({
                                btnShow: false
                            })
                            wx.getUserInfo({
                                success: res => {
                                    // 可以将 res 发送给后台解码出 unionId
                                    app.globalData.userInfo = res.userInfo
                                    console.log(res.userInfo)
                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    var data = {
                                        name: res.userInfo.nickName,
                                        avatar: res.userInfo.avatarUrl,
                                        gender: res.userInfo.gender,
                                        code: that.data.code,
                                        device: app.globalData.model,
                                    }
                                    that.loginWx(data)
                                    // 所以此处加入 callback 以防止这种情况
                                    if (this.userInfoReadyCallback) {
                                        this.userInfoReadyCallback(res)
                                    }
                                }
                            })
                        } else {
                            // 没有授权
                            that.setData({
                                btnShow: true
                            })
                        }
                    }
                })
            }
        })
    },
    bindGetUserInfo(e){
        var that = this;
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo;
            //用户按了允许授权按钮
            wx.login({
                success: res => {
                    that.setData({
                        code: res.code
                    })
                    var data = {
                        name: app.globalData.nickName,
                        avatar: app.globalData.avatarUrl,
                        gender: app.globalData.gender,
                        code: res.code,
                        device: app.globalData.model,
                    }
                    this.loginWx(data)
                }
            })
        } else {
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    },
    loginWx(data) {
        wx.request({
            url: config.serverUrl +"/login/byWxCode",
            data: data,
            header: { 'content-type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            success: function (res) {
                console.log(res)
                if(res.data.code == 0){
                    wx.setStorage({
                        key: 'token',
                        data: res.data.data.token,
                    })
                    wx.setStorage({
                        key: 'userInfo',
                        data: res.data.data,
                    })
                    wx.setStorage({
                        key: 'myUsername',
                        data: res.data.data.userId,
                    })
                    wx.switchTab({
                        url: '/pages/index/index'
                    })
                }else{
                    
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

})