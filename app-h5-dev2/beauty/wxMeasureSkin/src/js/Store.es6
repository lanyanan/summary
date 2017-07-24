'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
	function ajax(opt) {
        opt = opt || {};
        opt.method = opt.method.toUpperCase() || 'POST';
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        opt.error = opt.error || function () {};
        let xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data){  
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        } 
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                opt.success(JSON.parse(xmlHttp.responseText));
            }else{
            	opt.error();
            }
        };
    }

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * Toast提示
 * @param    {String}      msg提示信息
 */
function showToast(msg){
    clearTimeout(st);
    let toast = document.getElementById('toast');
    toast.style.display = 'block';
    toast.innerHTML = msg;
    var st = setTimeout(function(){
        toast.style.display = 'none';
    },3000);
}

function setCookie(c_name,value,expireSeconds,path) {
    var exdate=new Date();
    exdate.setTime(exdate.getTime()+expireSeconds*1000);
    document.cookie=c_name+ "=" +escape(value)+ ((expireSeconds==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
}

function getCookie(c_name) {
    if (document.cookie.length>0) {
        let c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1) { 
            c_start=c_start + c_name.length+1 ;
            let c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return "";
}

function delCookie(name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);   
    document.cookie = name + "=a;expires=" + date.toGMTString() + ";path=/";
}

function getQueryString(name){
     let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     let hash = window.location.hash;
     let r = hash.substr(hash.indexOf('?')+1).match(reg);
     if(r!=null) return decodeURI(r[2]);
     return '';
}

/**
 * 部位转换
 * @param    {String}      part
 */
 function changePart(part){
 	//1:额头 2:左脸 3:右脸 4:鼻子 5:眼周 6:手部
 	//11:额头 13:左脸 15:右脸 12:鼻子 2:眼周 3:手部
 	let val = 0;
 	switch(part){
 		case 1:
 			val = 11;break;
 		case 2:
 			val = 13;break;
 		case 3:
 			val = 15;break;
 		case 4:
 			val = 12;break;
 		case 5:
 			val = 2;break;
 		case 6:
 			val = 3;break;
 	}
 	return val;
 }

 function refreshToken(sucFun){
    let token = getCookie('accessToken');
    let refreshToken = getCookie('refreshToken');
    if(token){
        sucFun()
    }else if(refreshToken&&!token){
        let url = docker.host + '/v1/account/token/refresh';
        ajax({
            method: 'GET',
            url: url,
            data: {
                appId: docker.appId,
                refreshToken: getCookie('refreshToken'),
                timestamp: new Date().getTime()
            },
            async: true,
            success: function(res){
                if(res.code==0){
                    setCookie('openid',res.data.openId,res.data.refreshTokenExpires,'/');
                    setCookie('accessToken',res.data.accessToken,res.data.accessTokenExpires,'/');
                    setCookie('refreshToken',res.data.accessToken,res.data.refreshTokenExpires,'/');
                    sucFuc()
                }else if(res.code==100010102){
                    delCookie('openid');
                    delCookie('accessToken');
                    delCookie('refreshToken');
                    let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                    window.location.replace(loginUrl);
                }
            }
        });
    }else{
        let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
        window.location.replace(loginUrl); 
    }
}

/**
 * 微信分享配置
 * @param    {String}    title   分享标题 
 * @param    {String}    desc    分享描述
 * @param    {String}    link    分享链接
 * @param    {String}    imgUrl  分享图标
 * @param    {String}    type    分享类型,music、video或link，不填默认为link
 * @param    {String}    dataUrl 如果type是music或video，则要提供数据链接，默认为空
 * @param    {function}  success 用户确认分享后执行的回调函数
 * @param    {function}  error   用户取消分享后执行的回调函数
 */
function wxShareConfig(data){
    // alert(JSON.stringify(data));
    let title = data.title || '';// 分享标题
    let title1 = data.title1 || data.title; // 分享到朋友圈
    let desc = data.desc || '';// 分享描述
    let link = data.link || '';// 分享链接
    let imgUrl = data.imgUrl || '';// 分享图标
    let type = data.type || '';// 分享类型,music、video或link，不填默认为link
    let dataUrl = data.dataUrl || '';// 如果type是music或video，则要提供数据链接，默认为空
    //分享给微信朋友
    wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        type: type,
        dataUrl: dataUrl,
        success: function () { 
            // // 用户确认分享后执行的回调函数
            
            data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        }
    });
    //分享给朋友圈
    wx.onMenuShareTimeline({
        title: title1, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            
            data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
    //分享到QQ
    wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
           
           data.success && data.success();
        },
        cancel: function () { 
           // 用户取消分享后执行的回调函数
           data.error && data.error();
        }
    });
    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
           
           data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        }
    });
    //分享到QQ空间
    wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () { 
           // 用户确认分享后执行的回调函数
           
           data.success && data.success();
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            data.error && data.error();
        }
    });
}

const docker = {
    appId: '10101',
    appSecret: "afd55f877bad4aaeab45fb4ca567d234",//唯一
    appType: !!(navigator.userAgent.indexOf('Android')+1) ? 1:2,
    host: 'https://dp.clife.net',
    location: '101280601',
    src: '/manages/mobile/cBeauty/wxMeasureSkin/page/'
}
let url = docker.host+'/v1/app/chairdressing/elasticskinmeter/config/set';
let appId =  docker.appId;
let source =  2;
let timestamp = new Date().getTime();
let appSecret = docker.appSecret;
let sign = CryptoJS.enc.Hex.stringify(
        CryptoJS.MD5("POST"+url+"&appId="+appId
            +"&timestamp="+timestamp+"&"+appSecret
        )
);
const AppData = {};
window.dataTimer = null;
window.deviceTimer = null;
let setPartAjax = null;

export const Store = Reflux.createStore({
    listenables: [Actions],
    onDeviceInfo() {
    	clearInterval(window.deviceTimer);
    	let _this = this;
        let sucFuc = ()=>{
            function getDeviceInfo() {
                let url = docker.host + '/v1/device/getDeviceInfo';
                ajax({
                    method: 'GET',
                    url: url,
                    data: {
                        accessToken:getCookie('accessToken'),
                        appId:docker.appId,
                        appType:docker.appType,
                        deviceId:getCookie('deviceId'),
                        timestamp:new Date().getTime()
                    },
                    async: true,
                    success: function(res){
                        if(res.code==0){
                            AppData.onlineStatus = res.data.onlineStatus;
                        }else if(res.code==100010101||res.code==100021006){
                            delCookie('openid');
                            delCookie('accessToken');
                            delCookie('refreshToken');
                            let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                            window.location.replace(loginUrl);
                        }else{
                            AppData.onlineStatus = 2;
                        }
                        _this.trigger(AppData);
                    }
                });
            }
            getDeviceInfo();
            window.deviceTimer = setInterval(getDeviceInfo,5000);            
        }
        refreshToken(sucFuc);
    	
    },
    onSetPart(part,pro,qrcode,lastId){//设备初始化清零接口
    	clearInterval(window.dataTimer);
        setPartAjax && setPartAjax.abort();
        let _this = this;
        let sucFuc = ()=>{
            AppData.part = part;
            AppData.status = 2;
            AppData.btnStatus = false;
            let url = docker.host+'/v1/app/chairdressing/elasticskinmeter/config/set';
            let part1 = pro ? part : changePart(part);
            let accessToken = getCookie('accessToken');
            let appId =  docker.appId;
            let deviceId = getCookie('deviceId');
            let source =  2;
            let timestamp = new Date().getTime();
            let appSecret = docker.appSecret;
            let json = JSON.stringify({"part":part1,"updateFlag":1});
            let sign =
                CryptoJS.enc.Hex.stringify(
                    CryptoJS.MD5("POST"+url+"accessToken="+accessToken +"&appId="+appId+"&deviceId="+deviceId+"&json="+json
                        +"&source="+source+"&timestamp="+timestamp+"&"+appSecret
                    )
                );
            let data = {
                    appId: docker.appId,
                    timestamp : timestamp,
                    accessToken: accessToken,
                    deviceId:deviceId,
                    source: source,
                    json:json,
                    sign:sign
                }
            //设备初始化 超过5000ms 直接回到初始状态并提示设备初始化失败
            setTimeout(function(){
                if(AppData.optTimestamp){
                    console.log(setPartAjax);
                    setPartAjax && setPartAjax.abort();
                    // showToast('初始化失败');
                }
            },5000);

            setPartAjax = $.ajax({
                type:'POST',
                url:url,
                data:data,
                success:function(res){
                    if(res.code==0){
                        AppData.optTimestamp = res.data.optTimestamp;
                        AppData.status = 3;
                        _this.trigger(AppData);
                        _this.onGetData(part1,pro,qrcode,lastId);
                    }else if(res.code==100010101||res.code==100021006){
                        delCookie('openid');
                        delCookie('accessToken');
                        delCookie('refreshToken');
                        let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                        window.location.replace(loginUrl);
                    }else{
                        if(pro){
                            AppData.status = 1;
                            AppData.btnStatus = true;
                        }else{
                            AppData.status = 1;
                            AppData.part = 0;
                            showToast('初始化失败');
                        }
                        _this.trigger(AppData);
                    }
                },
                error:function(res){
                    if(pro){
                        AppData.status = 1;
                        AppData.btnStatus = true;
                    }else{
                        AppData.status = 1;
                        AppData.part = 0;
                        showToast('初始化失败');
                    }
                    _this.trigger(AppData);
                    // showToast('初始化失败');
                }
            })
        }
    	refreshToken(sucFuc);
    },
    onGetData(part,pro,qrcode,lastId){//获取运行数据（测试状态，水油弹）接口
    	let _this = this;
        let sucFuc = ()=>{
            let url = docker.host+'/v1/app/chairdressing/elasticskinmeter/data/get';
            let accessToken = getCookie('accessToken');
            let appId =  docker.appId;
            let deviceId = getCookie('deviceId');
            let timestamp = new Date().getTime();
            let optTimestamp = AppData.optTimestamp;
            let requestNum = 0;
            let tempStatus = 0;
            function getWotData(){
                ajax({
                    method: 'GET',
                    url: url,
                    data: {
                        appId:appId,
                        accessToken:accessToken,
                        timestamp:timestamp,
                        deviceId:deviceId,
                        part:part,
                        optTimestamp:optTimestamp
                    },
                    async: true,
                    success: function(res){
                        AppData.optTimestamp = null;
                        requestNum++;
                        if(requestNum > 20){
                            clearInterval(window.dataTimer);
                            AppData.status = 1;
                            AppData.btnStatus = true;
                            if(!pro){
                                AppData.part = 0;
                                showToast('测试失败');
                            }else{
                                AppData.status = 0;
                            }
                            _this.trigger(AppData);
                            return;
                        }
                        if(res.code==0){
                            AppData.cleanStatus = res.data.cleanStatus;
                            AppData.testStatus = res.data.testStatus;
                            AppData.elasticityStatus = res.data.elasticityStatus;
                            AppData.water = res.data.water;
                            AppData.oil = res.data.oil;
                            AppData.elasticity = res.data.elasticity;
                            AppData.electricity = res.data.electricity;
                            if(res.data.testStatus == 1){//清零成功，但没有测试数据
                                if(tempStatus < 1){
                                    tempStatus++;
                                }else{
                                    AppData.status = 4;
                                }
                            }else if(res.data.testStatus == 0 && res.data.water && res.data.oil && res.data.elasticity){//测试成功
                                AppData.status = 5;
                                AppData.btnStatus = true;
                                clearInterval(window.dataTimer);
                                _this.onGetResult(part,pro,qrcode,lastId);
                            }
                            if(res.data.testFailDescrip){
                                AppData.status = 1;
                                AppData.btnStatus = true;
                                if(!pro){
                                    AppData.part = 0;
                                    showToast('测试失败');
                                }else{
                                    AppData.status = 0;
                                }
                                clearInterval(window.dataTimer);
                                _this.trigger(AppData);
                                return;
                            }
                            _this.trigger(AppData);
                        }else if(res.code==100010101||res.code==100021006){
                            delCookie('openid');
                            delCookie('accessToken');
                            delCookie('refreshToken');
                            let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                            window.location.replace(loginUrl);
                        }else{
                            clearInterval(window.dataTimer);
                            AppData.status = 1;
                            if(!pro){
                                AppData.part = 0;
                                showToast('测试失败')
                            }else{
                                AppData.status = 0;
                            }
                            AppData.btnStatus = true;
                            _this.trigger(AppData);
                        }
                    }
                });
            }
            getWotData();
            window.dataTimer = setInterval(getWotData,2000); 
        }
        refreshToken(sucFuc);
        
    },
    onGetResult(part,pro,qrcode,lastId){
    	let _this = this;
        let sucFuc = ()=>{
            let url = docker.host+'/v1/web/wechat/hairdressing/beautyshop/partmeasure/uploadpartskintestresult';
            let accessToken = getCookie('accessToken');
            let appId =  docker.appId;
            let timestamp = new Date().getTime();
            let isNeedQR = qrcode ? 1 : 0;
            let data = {
                    appId: docker.appId,
                    timestamp : timestamp,
                    accessToken: accessToken,
                    part:part,
                    water:AppData.water,
                    oil:AppData.oil,
                    elasticity:AppData.elasticity,
                    measureTime:new Date().Format("yyyy-MM-dd hh:mm:ss"),
                    skinMeterId:getCookie('deviceId'),
                    isNeedQR:isNeedQR,
                    location:docker.location
                }
            if(pro && lastId){
                data.lastPartMeasureId = lastId;
                data.productId = pro;
            }
            ajax({
                method: 'POST',
                url: url,
                data: data,
                async: true,
                success: function(res){
                    if(res.code==0){
                        let data = {};
                        data.qrUrl = res.data.qrUrl;
                        window.qrUrl = res.data.qrUrl;
                        data.skinTypeName = res.data.skinTypeName;
                        data.lastInsertId = res.data.lastInsertId;
                        _this.trigger(data);
                    }else if(res.code==100010101||res.code==100021006){
                        delCookie('openid');
                        delCookie('accessToken');
                        delCookie('refreshToken');
                        let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                        window.location.replace(loginUrl);
                    }else{
                        AppData.status = 1;
                        AppData.btnStatus = true;
                        AppData.part = 0;
                        _this.trigger(AppData);
                    }
                }
            });
        }
        refreshToken(sucFuc);
        
    },
    onLocation(){
        let url = docker.host+'/v1/web/env/location/get?city=ip';
        ajax({
            method: 'GET',
            url: url,
            async: true,
            success: function(res){
                if(res.code==0){
                	docker.location = res.data.cityCode;
                }
            }
        });
    },
    onClearTest(part) {
        AppData.part = part;
    	AppData.status = 2;
    	AppData.btnStatus = false;
    	this.trigger(AppData);
    },
    onInitTest() {
        AppData.status = 1;
        // AppData.part = 0;
        setPartAjax && setPartAjax.abort();
        this.trigger(AppData);
    },
    onClearProTest() {
        AppData.status = 1;
        AppData.part = 0;
        setPartAjax && setPartAjax.abort();
        this.trigger(AppData);
    },
    onGetContrastData(openid,lastInsertId,lastPartMeasureId){//护肤品测肤扫码
    	let _this = this;
    	let url = docker.host+'/v1/web/wechat/hairdressing/beautyshop/partmeasure/getuserskintestdatas';
        ajax({
            method: 'GET',
            url: url,
            data:{
            	openid:openid,
            	lastInsertId:lastInsertId,
            	lastPartMeasureId:lastPartMeasureId
            },
            async: true,
            success: function(res){
                if(res.code==0){
                	console.log(res);
                	let value = res.data;
                	let data = {};
                	data.part = value.skinTestAfter.part;
                	data.skinTypeName = value.skinTestAfter.skinTypeName;
                	data.productName = value.productName;
                	data.imgUrl = value.imgUrl;
                	data.beforeWater = value.skinTestBefore.water;
                	data.beforeOil = value.skinTestBefore.oil;
                	data.beforeElasticity = value.skinTestBefore.elasticity;
                	data.afterWater = value.skinTestAfter.water;
                	data.afterOil = value.skinTestAfter.oil;
                	data.afterElasticity = value.skinTestAfter.elasticity;
                	_this.trigger(data);
                }
            }
        });
    },
    onGetBrandList: function(){
        let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/dropList';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {

            },
            async: true,
            success: function(res){
                if(res.code===0){
                    _this.trigger({list: res.data});
                }
            }
        })
    },
    onConfirmLogin(account,password,access,brandId,openid){
        let _this = this;
        let sucFuc = ()=>{
            let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/login';
            let paw = CryptoJS.enc.Hex.stringify(CryptoJS.MD5(CryptoJS.MD5(password).toString(CryptoJS.enc.Base64)+appSecret));
            ajax({
                method: 'POST',
                url: url,
                data: {
                    appId: docker.appId,
                    timestamp: new Date().getTime(),
                    account: account,
                    password: paw,
                    sign: sign,
                    brandIdentify: brandId,
                    authCode: access,
                    openId: openid,
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                         setCookie('openid',res.data.openId,res.data.refreshTokenExpires,'/');
                         setCookie('accessToken',res.data.accessToken,res.data.accessTokenExpires,'/');
                         setCookie('refreshToken',res.data.accessToken,res.data.refreshTokenExpires,'/');
                         let url = '#/brandShow?openid=' + getQueryString('openid')||getCookie('openid'); 
                         window.location.replace (url);
                    }
                    else if(res.code==='100021001'){
                        showToast('账号未注册');
                    }else if(res.code==='100021500'){
                        showToast('密码错误')
                    }else if(res.code==='100010201'){
                        showToast('参数错误')
                    }
                    else{
                        showToast(res.msg);
                    }
                }
            })
        }
        sucFuc()
        
    },
    onGetDeviceList(){
        let _this = this;
        let sucFuc = ()=>{
            let url = docker.host + '/v1/device/getBind';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    appId: docker.appId,
                    timestamp: new Date().getTime(),
                    accessToken: getCookie('accessToken'),
                    appType: docker.appType
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        console.log(res);
                        let list = [];
                        if(res.data.length>0){
                            for(let i=0;i<res.data.length;i++){
                                if(res.data[i].deviceTypeId===31){
                                    list.push(res.data[i]);
                                }
                            }
                        }
                        if(list.length===1){
                            setCookie('deviceId',list[0].deviceId)
                        }
                        _this.trigger({deviceList: list});
                    }else if(res.code==100010101||res.code==100021006){
                            delCookie('openid');
                            delCookie('accessToken');
                            delCookie('refreshToken');
                            let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                            window.location.replace(loginUrl);
                        }
                }
            })
        }
        refreshToken(sucFuc)
        
    },
    onGetSkinDevice(){
        let _this = this;
        let sucFuc = ()=>{
            let url = docker.host + '/v1/device/getBind';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    appId: docker.appId,
                    timestamp: new Date().getTime(),
                    accessToken: getCookie('accessToken'),
                    appType: docker.appType
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        console.log('getBind',res);
                        let list = [];
                        if(res.data.length>0){
                            for(let i=0;i<res.data.length;i++){
                                if(res.data[i].deviceTypeId===31){
                                    list.push(res.data[i]);
                                }
                            }
                        }
                        if(list.length===1){
                            setCookie('deviceId',list[0].deviceId)
                        }
                        _this.trigger({deviceList: list});
                    }else if(res.code==100010101||res.code==100021006){
                            delCookie('openid');
                            delCookie('accessToken');
                            delCookie('refreshToken');
                            let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                            window.location.replace(loginUrl);
                        }
                }
            })
        }
        refreshToken(sucFuc)
        
    },
    onGetPosition(area){
        let _this = this;
        let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/allRegion';
        ajax({
            method: 'GET',
            url: url,
            data: {

            },
            async: true,
            success: function(res){
                console.log(res.data);
                if(res.code===0){
                    new MultiPicker({
                        input: 'area-picker',
                        container: 'area-con',
                        jsonData:  res.data,
                        success: function(arr){
                            console.log(arr)
                            area.innerHTML = arr[0].regionName+arr[1].regionName;
                            _this.trigger({proId: arr[0].regionId,cityId: arr[1].regionId})
                        }
                    });
                    //_this.trigger({posList: res.data});
                }
            }
        })
    },
    onGetproductinfo(){
        let _this = this;
        let sucFuc = ()=>{
            let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/getproductinfo';
            ajax({
                method: 'GET',
                url: url,
                data: {
                    accessToken: getCookie('accessToken'),
                    appId: docker.appId,
                    timestamp: new Date().getTime()
                },
                async: true,
                success: function(res){
                    if(res.code===0){
                        _this.trigger({proList: res.data});
                    }else if(res.code==100010101||res.code==100021006){
                            delCookie('openid');
                            delCookie('accessToken');
                            delCookie('refreshToken');
                            let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                            window.location.replace(loginUrl);
                        }
                }
            })
        }
        refreshToken(sucFuc)
        
    },
    onConfigWx(oid){
        let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/sign';
        let _url = window.location.href;
        let config = {};
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                url: _url
            },
            async:true,
            success: function(r){
                    //console.log(r)
                    if(r.code==0){
                        config.nonceStr = r.data.nonceStr;
                        config.signature = r.data.signature;
                        config.appId = r.data.appId;
                        config.timestamp = r.data.timestamp;
                        wx.config({
                             debug:false,
                             appId: config.appId,   
                             timestamp: config.timestamp,    
                             nonceStr: config.nonceStr,    
                             signature: config.signature,    
                             jsApiList: [
                             'checkJsApi',
                             'chooseImage',
                             'hideMenuItems',
                             'showMenuItems',
                             'uploadImage',
                             'onMenuShareAppMessage',
                             'onMenuShareTimeline',
                             'onMenuShareQQ',
                             'onMenuShareWeibo',
                             'onMenuShareQZone'
                             ]  
                        });
                        wx.ready(function(){
                            if(window.location.href.indexOf('userView') != -1|| window.location.href.indexOf('proResult') != -1){
                                let url = window.location.href;
                                wxShareConfig({
                                    title: '微信测肤仪',
                                    desc: '我刚刚测试了自己俊俏小脸蛋的肤质，小伙伴们快来围观吧！',
                                    link: url,
                                    imgUrl: '',
                                    type: '',
                                    dataUrl: '',
                                });
                            }else{
                                wx.hideMenuItems({
                                    menuList: [
                                        "menuItem:share:appMessage",
                                        "menuItem:share:timeline",
                                        "menuItem:share:qq",
                                        "menuItem:share:weiboApp",
                                        "menuItem:favorite",
                                        "menuItem:share:facebook",
                                        "menuItem:share:QZone"
                                    ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                                });
                            }
                            
                        });
            
                    }else{
                        showToast('访问异常！')
                    }
                }
            })
    },
    getBrandLogo(oid){
        let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/brandInfo';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                sellerId: oid
            },
            async: true,
            success: function(res){
                if(res.code===0){
                    _this.trigger({logoSrc: res.data.logoUrl});
                }
            }
        })
    },
    onGetSingleResult(oid,lastInsertId){
        let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/partmeasure/getuserskintestdata';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                openid: oid,
                lastInsertId: lastInsertId
            },
            async: true,
            success: function(res){
                console.log(res)
                if(res.code===0){
                    _this.trigger(res.data);
                }
            }
        })
    },
    onSaveUseInfo(oid,birthday,sex,province,city){
        let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/userinfo/saveuserinfo';
        let _this = this;
        ajax({
            method: 'GET',
            url: url,
            data: {
                consumerOpenid: oid,
                birthday: birthday,
                sex:  sex,
                province: province,
                city: city
            },
            async: true,
            success: function(res){
                if(res.code===0){
                    _this.trigger({userInfoStatus: 1})
                }
            }
        })
    },
    onUploadProcuctInfo(productName,img,part,productId,flag1,flag2){
        let _this = this;
        let sucFuc = ()=>{
            if(productId===''){
                wx.uploadImage({
                    localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        let serverId = res.serverId; // 返回图片的服务器端ID
                        //alert(serverId+'      这是serverID');
                        let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/saveproductinfo';
                        ajax({
                            method: 'POST',
                            url: url,
                            data: {
                                accessToken: getCookie('accessToken'),
                                appId: docker.appId,
                                timestamp:  new Date().getTime(),
                                productId: '',
                                isBase64: false,
                                productName: productName,
                                imageBase64: serverId,
                                imageSuffix: 'png',
                            },
                            async: true,
                            success: function(res){
                                if(res.code===0){
                                    let url = 'https://' + window.location.host + docker.src +'#/protest/'+part+'/'+res.data.productId + '?openid=' + getQueryString('openid')||getCookie('openid');
                                    //alert(url+'    产品名和图片都变了');
                                    window.location.href = url;
                                }else if(res.code==100010101||res.code==100021006){
                                        delCookie('openid');
                                        delCookie('accessToken');
                                        delCookie('refreshToken');

                                        let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                                        window.location.replace(loginUrl);
                                    }
                            }
                        })
                    }
                });
            }else{
                if(flag1&&flag2){
                    let url = 'https://' + window.location.host + docker.src +'#/protest/'+part+'/'+productId + '?openid=' + getQueryString('openid')||getCookie('openid');
                    //alert(url + '    无需上传东西');
                    window.location.href = url;
                }else if(!flag1&&flag2){
                    let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/saveproductinfo';
                    ajax({
                        method: 'POST',
                        url: url,
                        data: {
                            accessToken: getCookie('accessToken'),
                            appId: docker.appId,
                            timestamp:  new Date().getTime(),
                            productId: '',
                            isBase64: false,
                            productName: productName,
                            imageBase64: img,
                            imageSuffix: 'png',
                        },
                        async: true,
                        success: function(res){
                            if(res.code===0){
                                let url = 'https://' + window.location.host + docker.src +'#/protest/'+part+'/'+res.data.productId + '?openid=' + getQueryString('openid')||getCookie('openid');
                                //alert(url+'    产品名变了图片不变');
                                window.location.href = url;
                            }else if(res.code==100010101||res.code==100021006){
                                    delCookie('openid');
                                    delCookie('accessToken');
                                    delCookie('refreshToken');

                                    let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                                    window.location.replace(loginUrl);
                                }
                        }
                    })

                }else{
                    wx.uploadImage({
                        localId: img, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            let serverId = res.serverId; // 返回图片的服务器端ID
                            //alert(serverId+'      这是serverID');
                            let url = docker.host + '/v1/web/wechat/hairdressing/beautyshop/productinfo/saveproductinfo';
                            ajax({
                                method: 'POST',
                                url: url,
                                data: {
                                    accessToken: getCookie('accessToken'),
                                    appId: docker.appId,
                                    timestamp:  new Date().getTime(),
                                    productId: '',
                                    isBase64: false,
                                    productName: productName,
                                    imageBase64: serverId,
                                    imageSuffix: 'png',
                                },
                                async: true,
                                success: function(res){
                                    if(res.code===0){
                                        let url = 'https://' + window.location.host + docker.src +'#/protest/'+part+'/'+res.data.productId + '?openid=' + getQueryString('openid')||getCookie('openid');
                                        //alert(url+'    产品名和图片都变了');
                                        window.location.href = url;
                                    }else if(res.code==100010101||res.code==100021006){
                                            delCookie('openid');
                                            delCookie('accessToken');
                                            delCookie('refreshToken');

                                            let loginUrl = 'https://'+window.location.host + docker.src+ '#/?openid=' + getQueryString('openid')||getCookie('openid');
                                            window.location.replace(loginUrl);
                                        }
                                }
                            })
                        }
                    });
                }
            }
            
        }
        refreshToken(sucFuc)
    },
    onHideShareMenu(){
        wx.hideMenuItems({
            menuList: [
                "menuItem:share:appMessage",
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:favorite",
                "menuItem:share:facebook",
                "menuItem:share:QZone"
            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    },
    onShowShareMenu(){
        wx.showMenuItems({
            menuList: [
                "menuItem:share:appMessage",
                "menuItem:share:timeline",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:favorite",
                "menuItem:share:facebook",
                "menuItem:share:QZone"
            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
    },
    onSetShareInfo(){
        wxShareConfig({
            title: '微信测肤仪',
            desc: '我刚刚测试了自己俊俏小脸蛋的肤质，小伙伴们快来围观吧！',
            link: '',
            imgUrl: '',
            type: '',
            dataUrl: '',
        });
    }
});