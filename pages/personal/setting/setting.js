// pages/personal/setting/setting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value:"",
    },

    txtVal(e){
        this.setData({
            value: e.detail.value
        })
    },
    submitClick(){
        console.log(this.data.value);
        if (this.data.value.length>=5){
            wx.request({
                url: '',
                data: {},
                header: {}
            })
        }else{
            wx.showToast({
                title:"内容不能少于5字",
                icon:"none",
            })
        }
        
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