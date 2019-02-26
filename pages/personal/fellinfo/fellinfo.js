// pages/personal/fellinfo/fellinfo.js
var config = require("../../../utils/config");
Page({
    data: {
        token:"",
        avatarurl:"",
        images:[],
        tempFilePaths:"",  //正
        tempFilePaths1:"", //反
        sexArr:["男","女"],
        region: ['北京市', '北京市', '东城区'],
        array: ['IT*互联网', '电子通信', '金融业', '房地产|建筑业', '商业服务', '工艺美术服务业', '娱乐*文化传媒', '农|林|牧|渔|业', '交通|运输|物流' ,'其他'],
        index:0,
        industry:'',  //行业
        userName:"",   //姓名
        userSex:"",    //性别
        address: '',   //城市
        company:"",    //公司
        duties:"",     //职务
        idenCode:"", //身份证号
    },
    
    myname(e){
        this.setData({
            userName:e.detail.value
        })
    },
    company(e) {
        this.setData({
            company: e.detail.value
        })
    },
    
    duties(e) {
        this.setData({
            duties: e.detail.value
        })
    },
    idenCode(e) {
        this.setData({
            idenCode: e.detail.value
        })
    },
    // 选择器省份
    bindRegionChange: function (e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value,
            address: e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2]
        })
    },
    // 性别
    bindSexChange(e){
        this.setData({
            userSex:e.detail.value
        })
    },
    // 行业选择
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        var industry = this.data.array[e.detail.value]
        this.setData({
            index: e.detail.value,
            industry: industry
        })
    },
    // 上传照片
    uploadFile(filePath,type) {
        var that = this;
        // 1: avatar / #头像 2: cardA / #身份证正面 3: cardB / #身份证反面 4: cardC / #营业执照或名片 
        wx.uploadFile({
            url: config.serverUrl +'/img/upload',
            filePath: filePath,
            name: 'file',
            formData: {
                type: type,
            },
            header: {
                // "Content-Type": "multipart/form-data",
                "token": that.data.token,
            },
            success: function (res) {
                console.log(res.data);
                console.log(JSON.parse(res.data))
                var data = JSON.parse(res.data)
                if(data.code == 0){
                    wx.hideToast();
                    if (type == 2){
                        that.setData({
                            tempFilePaths: data.data.url
                        })
                    }else if(type == 3){
                        that.setData({
                            tempFilePaths1: data.data.url
                        })
                    }else{
                        that.setData({
                            avatarurl: data.data.url
                        })
                        that.editAvatar()
                    }
                }else{
                    wx.hideToast();
                    wx.showToast({
                        title:"上传失败，请稍后再试",
                        icon:"none",
                        duration:1500
                    })
                }
            },
            fail: function (res) {
                wx.hideToast();
                wx.showToast({
                    title: "上传失败，请稍后再试",
                    icon: "none",
                    duration: 1500
                })
            }
        });
    },
    // 头像修改提交
    editAvatar(){
        wx.request({
            url: config.serverUrl +'/cen/editAvatar',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync("token")
            },
            method:"POST",
            success(res){
                console.log(res)
            },
        })
    },
    // 上传头像
    avatarTap(){
        var that = this ;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res)
                var tempFilePaths = res.tempFilePaths[0];
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 10000
                })
                this.uploadFile(tempFilePaths, 1)
            }
        })
    },
    // 正面
    fellImg(){
        var that = this ;
        wx.chooseImage({
            count:1,
            sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res)
                var tempFilePaths = res.tempFilePaths[0];
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 10000
                })
                this.uploadFile(tempFilePaths,2)
            }
        })
    },
    // 反面
    fellImg1(){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
            sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
            success: res => {
                console.log(res)
                var tempFilePaths1 = res.tempFilePaths[0];
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 10000
                })
                this.uploadFile(tempFilePaths1, 3)
            }
        })
    },
    nextBtn(){
        if (this.data.avatarurl == "") {
            wx.showToast({
                title: "未上传头像",
                icon: "none"
            })
            return;
        }
        if (this.data.userName == '' || this.data.userName.length<2){
            wx.showToast({
                title:"不能少于2个字符",// 2-10
                icon:"none"
            })
            return;
        }  
        if (this.data.userSex == '') {
            wx.showToast({
                title: "姓别不能为空", 
                icon: "none"
            })
            return;
        }
        if (this.data.industry == '') {
            wx.showToast({
                title: "行业不能为空",
                icon: "none"
            })
            return;
        }
        
        if (this.data.address == '') {
            wx.showToast({
                title: "地址不能为空", 
                icon: "none"
            })
            return;
        }    
        if (this.data.company == '') {
            wx.showToast({
                title: "不能少于2个字符",
                icon: "none"
            })
            return;
        }  
        if (this.data.duties == '' || this.data.duties.length<2) {
            wx.showToast({
                title: "职务格式错误",
                icon: "none"
            })
            return;
        }   
        if (this.data.idenCode == '' || this.data.idenCode.length<10) {
            wx.showToast({
                title: "身份证格式不正确",
                icon: "none"
            })
            return;
        }   
        if (this.data.tempFilePaths == "" || this.data.tempFilePaths1 == ""){
            wx.showToast({
                title: "请上传身份证照片",
                icon: "none"
            })
            return;
        }
        
        var subdata={
            token: this.data.token,
            identityIndustry: this.data.industry,     //行业
            identityName: this.data.userName,         //姓名
            identityGender: this.data.userSex-0+1,    //性别
            identityCity: this.data.address,          //城市
            identityCompany: this.data.company,       //公司
            identityTitle: this.data.duties,          //职务
            identityCode: this.data.idenCode,         //身份证号
        }
        wx.request({
            url: config.serverUrl + '/aut/addAutInfo',
            data: subdata,
            method:"POST",
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success:res => {
                console.log(res);
                if(res.data.code == 0){
                    wx.navigateTo({
                        url: 'fellinfo1/fellinfo1',
                    })
                }else{
                    wx.showToast({
                        title: '网络错误，稍后再试',
                        icon: "none"
                    })
                }
            },
            fail:res => {

            },
            complete:res => {

            }
        })
        
    },
    
    onLoad: function (options) {
        var that = this;
        that.setData({
            token: wx.getStorageSync("token"),
            avatarurl: wx.getStorageSync("userInfo").userAvatar
        })
        this.getAut()
    },
    // 获取认证信息接口
    getAut(){
        var that = this;
        wx.request({
            url: config.serverUrl +'/aut/getAutInfo',
            header: {
                'token': wx.getStorageSync("token"),
            },
            method:"GET",
            success(res){
                console.log(res.data.data)
                var data = res.data.data
                if(res.data.code == 0){
                    if (data.identityName){
                        that.setData({
                            userName: data.identityName
                        })
                    }
                    if (data.identityGender) {
                        that.setData({
                            userSex: data.identityGender-1
                        })
                    }
                    if (data.identityIndustry) {
                        that.setData({
                            industry: data.identityIndustry
                        })
                    }
                    if (data.identityCity) {
                        that.setData({
                            address: data.identityCity
                        })
                    }
                    if (data.identityCompany) {
                        that.setData({
                            company: data.identityCompany
                        })
                    }
                    if (data.identityTitle) {
                        that.setData({
                            duties: data.identityTitle
                        })
                    }
                    if (data.identityCode) {
                        that.setData({
                            idenCode: data.identityCode
                        })
                    }
                }
            },
            fail(){},
            complete(){}
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    
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