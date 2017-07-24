'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';
let Toast = require('../../../common/src/lib/Toast.jsx');

// 定义toast函数，以供多次调用
let mytoast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    React.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};

function getCurrentDeviceSn(){
    return het.getDeviceId();
    // if(!window.AppJsBridge) return "";
    // return window.AppJsBridge.service.deviceService.getCurrentDeviceSn();
}

let AppData = {};
const appId = '30590';
const appSecret = "98889238ed6e441aaf9b0691b017695f";

export const Store = Reflux.createStore({
    listenables: [Actions],
    onGetData(getUrl,callback){
        if(!getUrl) return;
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
                            _this.trigger({updateFlag: AppData.updateFlag});
                        }
                    } else {
                        mytoast('同步失败');
                        _this.trigger({updateFlag: AppData.updateFlag});
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
            let onlineUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/device/getDeviceInfo";
            let timestamp = +new Date();
            let accessToken = data;
            let deviceId = getCurrentDeviceSn();
            if(!deviceId) return;
            let appType = !!(navigator.userAgent.indexOf('Android')+1) ? 1 : 2;
            //获取在线状态
            onlineUrl = onlineUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId+"&appType="+appType;
            let infoCall = function(data){
                let result = {"onlineStatus":data.onlineStatus};
                AppData.onlineStatus = data.onlineStatus;
                _this.trigger({onlineStatus:data.onlineStatus});
            }
            _this.onGetData(onlineUrl,infoCall);
            //进入页面拉取默认数据
            if(!AppData.getDefault){
                let runUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/portablesprayerKym/defaultMode";
                runUrl = runUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId;
                _this.onGetData(runUrl,_this.onRepaint);
                AppData.getDefault = true;
            }
            //获取运行数据,若离线状态则不拉取运行数据
            if(AppData.onlineStatus==2) return;
            let statusUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/device/data/get";
            statusUrl = statusUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId;
            _this.onGetData(statusUrl,_this.onRepaint);
        }
        let errCall = function(){
            _this.trigger({updateFlag: AppData.updateFlag});
            mytoast('请检查网络或设备在线状况');
        };
        het.getToken(callback,errCall);
    },
    onRepaint(data) {
        if (AppData.updateFlag) return; // 未同步前忽略新接收到的数据
        if(AppData.busiSwitch === undefined && data.busiSwitch==1){
            AppData.updateFlag = data.updateFlag = 256;
            data.configMode = data.mode;
            data.configType = "commonConfig";
            this.onSync(data);
            delete data.updateFlag;
            delete data.configMode;
            delete data.configType;
        }
        AppData = Funs._extends(AppData, data);
        data.currentSprayGrade = data.currentSprayGrade ? data.currentSprayGrade : data.sprayGrade;
        data.currentRunTime =  data.currentRunTime ? data.currentRunTime : data.timeSet;
        this.trigger(data);
    },
    onChangeUpdateFlag(value){
        AppData.updateFlag = value;
    },
    onSync(data) {
        // 同步数据至app
        let sendData = Funs._extends(AppData,data);
        AppData = Funs._extends(AppData, data);
        let _this = this;
        let callback = function(data){
            let accessToken = data;
            let url = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/portablesprayerKym/config/set";
            let timestamp = +new Date();
            let deviceId = getCurrentDeviceSn();
            let source = 2;
            let trigger = function (){
                AppData.needSave = false; // 重置标记位
                AppData.updateFlag = 0; //重置updateFlag
                _this.trigger({needSave: false,updateFlag:0});
                mytoast("同步成功");
            }
            let json = JSON.stringify(sendData);
            let sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST"+url+"accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&"+appSecret));
            let obj = "accessToken="+accessToken+"&appId="+appId+"&deviceId="+deviceId+"&json="+json+"&source="+source+"&timestamp="+timestamp+"&sign="+sign;
            _this.onPostData(url,obj,trigger);
        };
        this.trigger({updateFlag: 0});
        let errCall = function(){
            _this.trigger({updateFlag: AppData.updateFlag});
            mytoast('请检查网络或设备在线状况');
        };
        het.getToken(callback,errCall);
    }
});