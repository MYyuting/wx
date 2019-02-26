// pages/connection/invite/invite.js
var config = require("../../../utils/config");
Page({

    data: {
        showModal:false,
        inputVal:'',
    },
    weiFriends(){
        wx.addPhoneContact({
            success:res => {
                console.log(res)
            }
        })
    },
    onCancel(){
        this.setData({
            showModal:false,
        })
    },
    onConfirm() {
        console.log(this.data.inputVal)
        if (this.data.inputVal.length == 11){
            this.invitTel()
            
        }else{
            wx.showToast({
                title: '请输入正确手机号',
                icon: "none",
                duration: 1000
            })
        }
        
    },
    inputChange(e){
        // console.log(e.detail.value)
        this.setData({
            inputVal: e.detail.value
        })
    },
    phoneClick() {
        this.setData({
            showModal: true
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    // 邀请好友接口
    invitTel(){
        var that = this ;
        wx.request({
            url: config.serverUrl + "/sms/sendByTel",
            data: {
                tel: this.data.inputVal,
                type:'1',
            },
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'POST',
            success(res) {
                console.log(res);
                if (res.data.code == 0) {
                    that.setData({
                        showModal: false,
                    })
                    wx.showToast({
                        title: '邀请好友成功',
                        icon: 'none'
                    })
                }else{
                    wx.showToast({
                        title: '邀请好友失败',
                        icon:'none'
                    })
                }
            },
            fail() {

            },
            complete: function () {

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
        return {
            title: '美星会',
            path: '/pages/index/index',
            imageUrl:'/images/qidong.png'
        }
    }
})