'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';
var Toast = require('../../../common/src/lib/Toast.jsx');
let configData = null;

// 智能模式（展会版本使用）
var AppModes = {
    1:{ //清洁
        ut : 3,
        imp : 0,
        exp : 3,
        knead : 6,
        light : 8,
        time : 15,
        configMode : 1
    },
    2:{ // 回春
        ut : 0,
        imp : 3,
        exp : 0,
        knead : 6,
        light : 9,
        time : 10,
        configMode : 2
    },
    3:{ // 滋养
        ut : 0,
        imp : 3,
        exp : 0,
        knead : 6,
        light : 7,
        time : 15,
        configMode : 3
    },
    4:{ // 美白
        ut : 3,
        imp : 0,
        exp : 3,
        knead : 6,
        light : 9,
        time : 13,
        configMode : 4
    },
    5:{ // 自定义
        ut : 0,
        imp : 0,
        exp : 0,
        knead : 0,
        light : 0,
        time : 5,
        configMode : 5
    }
};
/**
 * 获取自动模式数据
 * ! 该方法为展会版本专用
 * @param    {json}   data 原始数据
 * @return   {json}        提取到的自动模式数据
 */
function getBusiData(data){
    // var tmp = data.importExportConfig;
    // var busiData = {};
    // for (var i in AppModes) {
    //     if (AppModes[i].id==AppData.recommendMode) {
    //         busiData = AppModes[i].data;
    //         break;
    //     }
    // }
    // if (tmp) {
    //     busiData["ut"] = tmp["gears1"], // 超声波
    //     busiData["exp"] = tmp["gears2"]; // 导出
    //     busiData["imp"] = tmp["gears3"]; // 导入
    //     busiData["knead"] = tmp["gears4"]; // 按摩
    //     busiData["light"] = tmp["gears5"]; // 采光
    //     busiData["time"] = tmp["runTime"];  // 时长
    // }
    // return busiData;
    return AppModes[AppData.recommendMode];
}
// 定义toast函数，以供多次调用
var mytoast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    React.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};
/**
 * 判断是否需要保存
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getSaveFlag() {
    // return !!Object.keys(hetsdk.diff(AppData)).length;
    // var rData = {};
    // for (var k in AppData) {
    //     if (typeof webDataMap[k] !== 'undefined') {
    //         rData[webDataMap[k]] = AppData[k];
    //     } else {
    //         rData[k] = AppData[k];
    //     }
    // }
    // console.log('rData',rData);
    // var result = {};
    // for (var k in rData) {
    //     if (typeof configData[k] !== 'undefined' && rData[k] != configData[k]) {
    //         result[k] = rData[k];
    //     }
    // }
    // console.log('result',result);
    var count = 0;
    var data = hetsdk.diff(AppData);
    // console.log('diff',data);
    for (var k in data) {
        if (k==='updateFlag') continue;
        count ++;
    }
    return !!count;
}
function getCurrentDeviceSn(){
    return het.getDeviceId();
}
let AppData = {};
const appId = '30590';
const appSecret = "98889238ed6e441aaf9b0691b017695f";
const webDataMap = {
            "recommendMode" : "mode", // 推荐模式
            "skinType"      : "skinType5", // 肤质
            "moisture"      : "waterTrend", // 水分提升
            "ut"            : "gears1", // 超声波
            "exp"           : "gears2", // 导出
            "imp"           : "gears3", // 导入
            "knead"         : "gears4", // 按摩
            "light"         : "gears5", // 采光
            "time"          : "runTime",  // 时长
            "battery"       : "electricity" // 电量
        };

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(getUrl,callback){
        if(!getUrl) return;
        let _this = this;
        var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if (xhr.readyState===4) {
                    if (xhr.status===200 || xhr.status===304) {
                        var result = JSON.parse(xhr.responseText);
                        if(result.code==0){
                            callback(result.data);
                        }else{
                            // mytoast(result.msg);
                        }
                    } else {
                        mytoast('获取运行数据失败');
                    }
                }
            };
            xhr.open('GET', getUrl, true);
            xhr.send();
    },
    onPostData(POSTUrl,data="",callback){
        if(!POSTUrl) return;
        var _this = this;
        var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if (xhr.readyState===4) {
                    if (xhr.status===200 || xhr.status===304) {
                        var result = JSON.parse(xhr.responseText);
                        if(result.code==0){
                            callback(result.data);
                        }else{
                            mytoast('同步失败');
                            _this.trigger({needSave: true});
                        }
                    } else {
                        mytoast('同步失败');
                        _this.trigger({needSave: true});
                    }
                }
            };
            xhr.open("POST", POSTUrl, true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.send(data);
    },
    onIntervalData(){
        let _this = this;
        let callback = function(data){
            let statusUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/device/getDeviceInfo";
            let timestamp = +new Date();
            let accessToken = data;
            let deviceId = getCurrentDeviceSn();
            let appType = !!(navigator.userAgent.indexOf('Android')+1) ? 1 : 2;
            if(!deviceId) return;
            statusUrl = statusUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId+"&appType="+appType;
            let infoCall = function(data){
                let result = {"onlineStatus":data.onlineStatus};
                AppData.onlineStatus = data.onlineStatus;
                _this.trigger({onlineStatus:data.onlineStatus});
            };
            _this.onGetData(statusUrl,infoCall);
            if(AppData.onlineStatus == 2) return;//离线状态,停止发送请求
            let runUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/importExportKym/defaultMode";
            runUrl = runUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId;
            let defaultCall = function(data){
                let result = Funs._extends(data,data.currentRunConfig);
                _this.onRepaint(result);
            };
            _this.onGetData(runUrl,defaultCall);
        };
        let errCall = function(){
            _this.trigger({needSave: true});
        };
        het.getToken(callback,errCall);
    },
    onRepaint(data) {
        if(AppData.needSave) return;
        if(AppData.busiSwitch === undefined && data.busiSwitch==1){
            let _this = this;
            let objData = Funs._extends({},data.currentRunConfig,data,{"configMode":data.mode,"updateFlag":0});
            let callback = function(data){
                let accessToken = data;
                let url = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/importExportKym/config/set";
                let timestamp = +new Date();
                let deviceId = getCurrentDeviceSn();
                let source = 2;
                let trigger = function (){
                    AppData.needSave = false; // 重置标记位
                    AppData.updateFlag = 0; //重置updateFlag
                    _this.trigger({needSave: false});
                    mytoast("同步成功");
                }
                let json = JSON.stringify(objData);
                let sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&"+appSecret));
                let obj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
                _this.onPostData(url,obj,trigger);
            };
            let errCall = function(){
                _this.trigger({needSave: true});
            };
            het.getToken(callback,errCall);
            this.trigger({needSave: false});
        }
        //对数据进行过滤
        for(let key in webDataMap){
            if(webDataMap[key] && typeof data[webDataMap[key]] !== undefined){
                data[key] = data[webDataMap[key]];
                delete data[webDataMap[key]];
            }
        }
        AppData = Funs._extends(AppData, data);
        if (AppData.busiSwitch) { // 展会版本添加
            AppModes[5].ut = typeof data.ut!=='undefined' ? data.ut : AppModes[5].ut;
            AppModes[5].imp = typeof data.imp!=='undefined' ? data.imp : AppModes[5].imp;
            AppModes[5].exp = typeof data.exp!=='undefined' ? data.exp : AppModes[5].exp;
            AppModes[5].knead = typeof data.knead!=='undefined' ? data.knead : AppModes[5].knead;
            AppModes[5].light = typeof data.light!=='undefined' ? data.light : AppModes[5].light;
            AppModes[5].time = typeof data.time!=='undefined' ? data.time : AppModes[5].time;
            AppModes[5].configMode = typeof data.configMode!=='undefined' ? data.configMode : AppModes[5].configMode;
            data = Funs._extends({}, data, getBusiData(AppData));
        }
        this.trigger(data);
    },
    onToggleBusi() {
        if (AppData.skinDataCode==0 || !AppData.skinDataCode) {
            mytoast('您还未测试肤质，请先测试肤质！');
            return;
        }
        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
        if (AppData.busiSwitch) { // 自动模式
            AppModes[5].ut = AppData.ut;
            AppModes[5].imp = AppData.imp;
            AppModes[5].exp = AppData.exp;
            AppModes[5].knead = AppData.knead;
            AppModes[5].light = AppData.light;
            AppModes[5].time = AppData.time;
            AppModes[5].configMode = AppData.configMode;
            Funs._extends(AppData, getBusiData(AppData));
        } else { // 切回手动模式
            AppData.ut = AppModes[5].ut;
            AppData.imp = AppModes[5].imp;
            AppData.exp = AppModes[5].exp;
            AppData.knead = AppModes[5].knead;
            AppData.light = AppModes[5].light;
            AppData.time = AppModes[5].time;
            AppData.configMode = AppModes[5].configMode;
        }
        AppData.needSave = getSaveFlag();
        this.trigger(AppData);
    },
    onSelectAny(data) {
        // updateFlag映射表
        var flagMap = {
            "ut" : 0x01, // 超声波标记位
            "exp" : 0x02, // 导出标记位
            "imp" : 0x04, // 导入标记位
            "knead" : 0x08, // 按摩标记位
            "light" : 0x10, // 采光标记位
            "time" : 0x20 // 运行时间标记位
        };
        for (var k in data) {
            AppData.updateFlag |= flagMap[k]; // 设置标记位
            AppData[k] = data[k]; // 设置修改数据
        }
        AppData.needSave = getSaveFlag();
        data.needSave = AppData.needSave;
        data.updateFlag = AppData.updateFlag;
        this.trigger(data);
    },
    onSync() {
        // 同步数据至app
        var sendData = Funs._extends({}, AppData);
        let _this = this;
        if (AppData.needSave) {
            //对数据进行过滤
            for(let key in webDataMap){
                if(webDataMap[key] && typeof sendData[key] !== undefined){
                    sendData[webDataMap[key]] = sendData[key];
                    delete sendData[key];
                }
            }
            if(!sendData["configMode"]) sendData["configMode"] = AppData.currentRunMode;
            if(sendData["gears4"]==6) sendData["gears4"]=1;
            if(sendData["gears5"]>6) sendData["gears5"]=sendData["gears5"]-6;
            if(sendData["currentRunConfig"]) delete sendData["currentRunConfig"];
            let callback = function(data){
                let accessToken = data;
                let url = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/importExportKym/config/set";
                let timestamp = +new Date();
                let deviceId = getCurrentDeviceSn();
                let source = 2;
                let trigger = function (){
                    AppData.needSave = false; // 重置标记位
                    AppData.updateFlag = 0; //重置updateFlag
                    _this.trigger({needSave: false});
                    mytoast("同步成功");
                }
                let json = JSON.stringify(sendData);
                let sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&"+appSecret));
                let obj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
                _this.onPostData(url,obj,trigger);
            };
            let errCall = function(){
                _this.trigger({needSave: true});
            };
            het.getToken(callback,errCall);
            this.trigger({needSave: false});
        }
    }
});