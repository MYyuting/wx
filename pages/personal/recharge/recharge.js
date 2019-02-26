// pages/personal/recharge/recharge.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        moneyNum:'',
    },

    money(e){
        // console.log(e.detail.value);
        this.setData({
            moneyNum: e.detail.value
        })
    },
    confirm(){
        console.log(this.data.moneyNum);
        if (this.data.moneyNum==''){
            this.alterView('金额不能为空')
        }else{

        }
    },
    // 弹框提示
    alterView(msg){
        wx.showToast({
            title: msg,
            icon:"none",
            duration: 1000,
        })
    },
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

    }
})