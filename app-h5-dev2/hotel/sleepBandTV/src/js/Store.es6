'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {DrawChart} from './drawChartFuns.es6';

const appId = 30635;
const appSecret = "013e6ba2a0ce456e900c097e53721dde";
let deviceId,
    uuid,
    path;
let accessToken;
const productArray = [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,136,138,139,
                      147,1122,1688,1689,1725,2123,2249];
const FlagData = {
    initReportChart : false,
    initHeartChart  : false
};
if(location.host === "cms.clife.cn") path = "https://api.clife.cn";
if(location.host === "test.cms.clife.cn") path = "https://test.api.clife.cn";
if(!path) path = "https://200.200.200.50";
// if(!path) path = "https://test.api.clife.cn";
let ajax = function ajax(url, data, type, sucCallback, errCallback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 304) {
                sucCallback(xhr.responseText);
            } else {
                errCallback('Request failed! Status code: ' + xhr.status);
            }
        }
    };
    xhr.open(type, url, true);
    // xhr.withCredentials = true;
    if (type === 'POST') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    xhr.send(data);
}
let calcSign = function(type, url, data) {
    if (!data || typeof data !== 'object') return;
    var arr = [];
    for (var key in data) {
        arr.push(key);
    }
    arr.sort();
    var str1 = (type === 'GET' || type === "get") ? "GET" : "POST";
    var signStr = str1 + url;
    arr.forEach(function(item, index) {
        if (index === 0) {
            signStr = signStr + item + '=' + data[item];
        } else {
            signStr = signStr + "&" + item + '=' + data[item];
        }
    });
    signStr = signStr + "&" + appSecret;
    return CryptoJS.enc.Hex.stringify(CryptoJS.MD5(signStr));
};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data, type){
        this.trigger(data);
    },
    onGetData(url,success,error){
        ajax(url,"","GET",success,error);
    },
    onPostData(url,data,success,error){
        ajax(url,data,"POST",success,error);
    },
    onGetRecentDateList(){
        if(!accessToken) return;
        let url = path+"/v1/app/csleep/summary/getRecentDateList";
        let token = accessToken;
        let timestamp = +new Date();
        url = url+"?accessToken="+token+"&timestamp="+timestamp+"&appId="+appId;
        if(deviceId) url = url+"&deviceId="+deviceId;
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                if(!deviceId) deviceId = result.data.deviceId;
                let dateList = result.data.dateList || [{}];
                if(dateList[0].dataTime) this.onGetDayReportData(dateList[0].dataTime);
                this.trigger({
                    deviceId:result.data.deviceId,
                    reportDateList:result.data.dateList
                });
            }else if(result.code==100021006){
                accessToken = null;
                localStorage.clear('user');
                location.hash = "login";
            }else if(result.code==100021603){
                this.trigger({
                    deviceId:'',
                    reportDateList:null
                });
            }
        },(data)=>{console.log('fail',data)});
    },
    onGetDayReportData(date){
        if(!accessToken) return;
        this.trigger({
            reportChartGet : false
        });
        let url = path+"/v1/app/csleep/summary/getDayGradeReport";
        let timestamp = +new Date();
        url = url+"?accessToken="+accessToken+"&timestamp="+timestamp+"&appId="+appId+"&queryFlag=0"+"&dataTime="+date;
        if(deviceId) url = url+"&relateDeviceIds="+deviceId;
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                this.onGetDayReportTotal(date);
                let sleepTypeList = result.data.sleepTypeList || [{}];
                this.trigger({
                    sleepQuality : result.data.sleepQuality,
                    sleepType : sleepTypeList[0].sleepTypeName,
                    analysisDetail : sleepTypeList[0].sleepTypeTips,
                    sleepRank : result.data.beatPercent,
                    sleepScope : result.data.sleepScope,
                    asleepDuration : result.data.asleepDuration,
                    fallSleepDuration : result.data.fallSleepDuration,
                    lightSleepDuration : result.data.lightSleepDuration,
                    deepSleepDuration : result.data.deepSleepDuration,
                    reportChartGet : true
                });
                if(!FlagData.initReportChart){
                    DrawChart.initReportChart(result.data);
                    FlagData.initReportChart = true;
                }else{
                    DrawChart.updateReportChart(result.data);
                }
            }
        },(data)=>{console.log('fail',data)});
    },
    onGetDayReportTotal(date){
        if(!accessToken) return;
        this.trigger({
            threeChartGet : false
        });
        let url = path+"/v1/app/csleep/summary/getDayReportTotal";
        let timestamp = +new Date();
        url = url+"?accessToken="+accessToken+"&timestamp="+timestamp+"&appId="+appId+"&queryFlag=0"+"&dataTime="+date;
        if(deviceId) url = url+"&relateDeviceIds="+deviceId;
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                //平均值
                let heartAllAverage = result.data.heartRateAnalysis?result.data.heartRateAnalysis.statisticalData:"--" ;
                let breathAllAverage = result.data.breathRateAnalysis?result.data.breathRateAnalysis.statisticalData:"--" ;
                let trunOverAllAverage = result.data.turnOverAnalysis?result.data.turnOverAnalysis.statisticalData:"--" ;
                this.trigger({
                    heartRate : heartAllAverage,
                    respirationRate : breathAllAverage,
                    bodyMovement : trunOverAllAverage,
                    threeChartGet : true
                });
                if(!FlagData.initHeartChart){
                    DrawChart.initHeartChart(result.data);
                    FlagData.initHeartChart = true;
                }else{
                    DrawChart.updateHeartChart(result.data);
                }
            }
        },(data)=>{console.log('fail',data)});
    },
    onGetQrcode(){
        FlagData.initHeartChart = false;
        FlagData.initReportChart = false;
        let userData = JSON.parse(localStorage.getItem('user'));
        if(userData && userData.accessToken) {
            accessToken = null;
            return;
        }
        let url = path+"/v1/account/scanLogin/getQrcode";
        let timestamp = +new Date();
        let obj = {
            appId : appId,
            timestamp : timestamp
        }
        let sign = calcSign("POST",url,obj);
        let str = "sign="+sign+"&timestamp="+timestamp+"&appId="+appId;
        this.onPostData(url,str,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                uuid = result.data.uuid;
                this.onGetToken();
                this.trigger({
                    qrcodeUrl : result.data.qrcode,
                    qrcodeInvaild : false,
                    qrcodeScaned : false,
                    btnActive : false
                });
            }
        },(data)=>{console.log('fail'+JSON.stringify(data));});
    },
    onGetToken(){
        let url = path+"/v1/account/scanLogin/scanStatus";
        let timestamp = +new Date();
        let obj = {
            appId : appId,
            timestamp : timestamp,
            uuid : uuid
        }
        let sign = calcSign("POST",url,obj);
        let str = "sign="+sign+"&timestamp="+timestamp+"&appId="+appId+"&uuid="+uuid;
        this.onPostData(url,str,(data)=>{
            let result = JSON.parse(data);
            if(result.code==100022900) this.onGetToken();
            if(result.code==100022901) this.trigger({qrcodeInvaild:true,qrcodeScaned:false});
            if(result.code==100022902) {
                this.trigger({qrcodeScaned:true});
                this.onGetToken();
            }
            if(result.code==100022903 || result.code==0){
                accessToken = result.data.accessToken;
                result.data.getTime = +new Date();
                localStorage.setItem('user',JSON.stringify(result.data));
                location.hash = "";
            }
        },(data)=>{console.log('fail',data)});
    },
    onGetWeather(){
        if(!accessToken) return;
        if(FlagData.weather){
            this.trigger({
                pm25 : FlagData.weather.pm25,
                temp1 : FlagData.weather.temp1,
                temp2 : FlagData.weather.temp2,
                cityName : FlagData.weather.cityName,
                wtext : FlagData.weather.wtext
            });
            return;
        }
        let url = path+"/v1/web/env/weather/clife/now";
        let city = "ip";
        url = url+"?city="+city;
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                FlagData.weather = result.data;
                this.trigger({
                    pm25 : result.data.pm25,
                    temp1 : result.data.temp1,
                    temp2 : result.data.temp2,
                    cityName : result.data.cityName,
                    wtext : result.data.wtext
                });
            }
        },(data)=>{console.log('fail',data)});
    },
    onGetUserInfo(){
        if(!accessToken) return;
        if(FlagData.userInfo){
            this.trigger({
                userName : FlagData.userInfo.userName,
                avatar : FlagData.userInfo.avatar
            });
            return;
        }
        let url = path+"/v1/user/get";
        let token = accessToken;
        let timestamp = +new Date();
        url = url+"?appId="+appId+"&accessToken="+token+"&timestamp="+timestamp;
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                FlagData.userInfo = result.data;
                this.trigger({
                    userName : result.data.userName,
                    avatar : result.data.avatar
                });
            }else if(result.code==100021006){
                accessToken = null;
                localStorage.clear('user');
                location.hash = "login";
            }
        },(data)=>{console.log('fail',data)});
    },
    onGetRealTimeData(sucCallback){
        FlagData.initReportChart = false;
        FlagData.initHeartChart = false;
        if(!accessToken) return;
        let url = path+"/v1/app/csleep/summary/getRawDataAndStatus";
        let token = accessToken;
        let timestamp = +new Date();
        if(deviceId){
            url = url+"?appId="+appId+"&accessToken="+token+"&timestamp="+timestamp+"&deviceId="+deviceId;
        }else{
            url = url+"?appId="+appId+"&accessToken="+token+"&timestamp="+timestamp;
        }
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                sucCallback(result.data);
            }else if(result.code==100021006){
                accessToken = null;
                localStorage.clear('user');
                location.hash = "login";
            }
        },(data)=>{console.log('fail',data)});
    },
    onConfirmLogin(type){
        // localStorage.clear();
        // if(type === 'report') this.onGetRecentDateList();
        let timestamp = +new Date();
        let userData = JSON.parse(localStorage.getItem("user"));
        if(!userData){
            deviceId = null;
            accessToken = null;
            location.hash = "login";
            return;
        }
        let getTime = Number(userData.getTime);
        let refreshTime = Number(userData.refreshTokenExpires)*1000;
        let accessTokenExpires = Number(userData.accessTokenExpires)*1000;
        if(timestamp>(getTime+refreshTime)){
            if(type !== 'login'){
                accessToken = null;
                localStorage.clear('user');
                location.hash = 'login';
            }
        }else if(timestamp>(getTime+accessTokenExpires)){
            accessToken = null;
            this.onRefreshToken(userData.refreshToken,type);
        }else{
            accessToken = userData.accessToken;
            if(type === 'login') location.hash = '';
            if(type === 'report' && deviceId) this.onGetRecentDateList();
            if(type === 'select' && FlagData.deviceList) {
                this.trigger({deviceList:FlagData.deviceList});
                return;
            }
            if(deviceId) return;
            this.getBind(type);
        }
    },
    onRefreshToken(refreshToken,type){
        let url = path+"/v1/account/token/refresh";
        let timestamp = +new Date();
        url = url+"?appId="+appId+"&refreshToken="+refreshToken+"&timestamp="+timestamp;
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                accessToken = result.data.accessToken;
                result.data.getTime = +new Date();
                localStorage.setItem('user',JSON.stringify(result.data));
                this.onGetWeather(); //刷新token时重新获取天气信息
                this.onGetUserInfo();//刷新token时重新获取用户信息
                if(type==='login') location.hash = '';
                if(type === 'report' && deviceId) this.onGetRecentDateList();
                if(type === 'select' && FlagData.deviceList) {
                    this.trigger({deviceList:FlagData.deviceList});
                    return;
                }
                if(deviceId) return;
                this.getBind(type);
            }else if(type !== 'login'){
                accessToken = null;
                localStorage.clear('user');
                location.hash = 'login';
            }
        },(data)=>{console.log('fail',data)});
    },
    getBind(type){
        let url = path+"/v1/device/getBind";
        let timestamp = +new Date();
        url = url+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp;
        url = url+"&version=1.2"+"&appType="+(navigator.userAgent.indexOf('Android')>-1 ? 1 : 1);
        this.onGetData(url,(data)=>{
            let result = JSON.parse(data);
            if(result.code==0){
                let len = result.data.length,
                    deviceArr = [],
                    i = 0;
                for(i;i<len;i++){
                    if(productArray.indexOf(result.data[i].productId)>-1 &&
                       result.data[i].share !== 1){
                       // 1){
                        deviceArr.push(result.data[i]);
                    }
                }
                if(deviceArr.length>1){
                    FlagData.initReportChart = false;
                    FlagData.initHeartChart = false;
                    FlagData.deviceList = deviceArr;
                    if(type === 'select') {
                        this.trigger({deviceList:deviceArr});
                        return;
                    }
                    location.hash = "select";
                    return;
                }else{
                    deviceId = deviceArr[0] ? deviceArr[0].deviceId : null;
                    if(type === 'report') this.onGetRecentDateList();
                    return;
                }
            }
            if(type === 'report') this.onGetRecentDateList();
        },(data)=>{if(type === 'report') this.onGetRecentDateList();});
    },
    onSelectDevice(value){
        FlagData.initReportChart = false;
        FlagData.initHeartChart = false;
        deviceId = value;
        location.hash = "";
    }
});

