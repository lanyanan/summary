'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';
let Toast = require('../../../common/src/lib/Toast.jsx');

let needSave = false; // 是否需要保存设置
let smartModeSwitch = 0; //智能模式开关：0-手动，1-自动
let showTestSkin = 0; // 智能模式的描述显示
const AppData = {
    'skinType':null
};
let sendData = {
    updateFlag:0
};
let recConfigMark = {};
let currentData = {};
const appId = '30590';
const appSecret = "98889238ed6e441aaf9b0691b017695f";

// 定义toast函数，以供多次调用
var mytoast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(
        <Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,
        document.getElementById('mytoast')
    );
};

/**
 * 配置数组到配置对象的转换
 * @param    {array}      items 设置参数
 * @return   {json}        返回设置对象
 */
function arrToObj(array){
    let data = {};
    data.foreheadGears = array[0].speed;//额头档位
    data.foreheadRuntime = array[0].time;//额头时间
    data.foreheadChanged = array[0].changed;
    data.noseGears = array[1].speed;//鼻子档位
    data.noseRuntime = array[1].time;//鼻子时间
    data.noseChanged = array[1].changed;
    data.chinGears = array[2].speed;//下巴档位
    data.chinRuntime = array[2].time;//下巴时间
    data.chinChanged = array[2].changed;
    data.leftfaceGears = array[3].speed;//左脸档位
    data.leftfaceRuntime = array[3].time;//左脸时间
    data.leftfaceChanged = array[3].changed;
    data.rightfaceGears = array[4].speed;//右脸档位
    data.rightfaceRuntime = array[4].time;//右脸时间
    data.rightfaceChanged = array[4].changed;
    return data;
}

function getCurrentDeviceSn(){
    return het.getDeviceId();
}

/**
 * 拼接返回给页面的字段
 * @return   {object}        返回给页面的字段
 */
function getTriggerData(){
    let data = {
        smartModeSwitch:AppData.smartModeSwitch,
        skinType : AppData.skinType,
        needSave : needSave,
        electricity : AppData.electricity,
        onlineStatus : AppData.onlineStatus,
        chargeStatus : AppData.chargeStatus
    };
    return data;
}

function getFaceCleanerConfig(array){

    let data = {
    }

    //part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
    array.map((item,index)=>{
        if (item.part == 11){
            data.foreheadGears = item.gears;
            data.foreheadRuntime = item.runTime;
            data.foreheadRemarks = item.remark;
        }
        if (item.part == 14){
            data.chinGears = item.gears;
            data.chinRuntime = item.runTime;
            data.chinRemarks = item.remark;
        }
        if (item.part == 13){
            data.leftfaceGears = item.gears;
            data.leftfaceRuntime = item.runTime;
            data.leftfaceRemarks = item.remark;
        }
        if (item.part == 15){
            data.rightfaceGears = item.gears;
            data.rightfaceRuntime = item.runTime;
            data.rightfaceRemarks = item.remark;
        }
        if (item.part == 12){
            data.noseGears = item.gears;
            data.noseRuntime = item.runTime;
            data.noseRemarks = item.remark;
        }
    })
    return data;
}

function getCurrentRunConfig(array){

    let data = {
    }

    //part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
    array.map((item,index)=>{
        if (item.part == 11){
            data.foreheadGears = item.gears;
            data.foreheadRuntime = item.runTime;
            data.foreheadRemarks = item.remark;
        }
        if (item.part == 14){
            data.chinGears = item.gears;
            data.chinRuntime = item.runTime;
            data.chinRemarks = item.remark;
        }
        if (item.part == 13){
            data.leftfaceGears = item.gears;
            data.leftfaceRuntime = item.runTime;
            data.leftfaceRemarks = item.remark;
        }
        if (item.part == 15){
            data.rightfaceGears = item.gears;
            data.rightfaceRuntime = item.runTime;
            data.rightfaceRemarks = item.remark;
        }
        if (item.part == 12){
            data.noseGears = item.gears;
            data.noseRuntime = item.runTime;
            data.noseRemarks = item.remark;
        }
    })
    return data;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        let skinType,runData;
        if(AppData.currentConfig === undefined || AppData.currentConfig == null){
            AppData.currentConfig = {};
        }
        if(AppData.faceCleanerConfig === undefined || AppData.faceCleanerConfig == null){
            AppData.faceCleanerConfig = {};
        }
        if(!needSave){//无数据保存时，接受所有字段
            if(data.currentRunConfig){
                let tempData = getCurrentRunConfig(data.currentRunConfig);
                currentData =  Funs._extends({},tempData);// 这个是最原始的当前数据
                // console.log('原始的当前运行数据转换后的数据',currentData);
                AppData.currentConfig = Funs._extends({},currentData);
            }
            if(data.faceCleanerConfig){

                let tempData = getFaceCleanerConfig(data.faceCleanerConfig);

                AppData.faceCleanerConfig = tempData;
                AppData.skinType = 1;
                AppData.faceCleanerConfig.foreheadChanged = false;
                AppData.faceCleanerConfig.noseChanged = false;
                AppData.faceCleanerConfig.chinChanged = false;
                AppData.faceCleanerConfig.leftfaceChanged = false;
                AppData.faceCleanerConfig.rightfaceChanged = false;
                recConfigMark.foreheadRemarks = tempData.foreheadRemarks;
                recConfigMark.noseRemarks = tempData.noseRemarks;
                recConfigMark.chinRemarks = tempData.chinRemarks;
                recConfigMark.leftfaceRemarks = tempData.leftfaceRemarks;
                recConfigMark.rightfaceRemarks = tempData.rightfaceRemarks;
            }
            AppData.electricity = typeof data.electricity!=='undefined' ? data.electricity : AppData.electricity;
            AppData.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : AppData.onlineStatus;
            AppData.chargeStatus = typeof data.chargeStatus!=='undefined' ? data.chargeStatus : AppData.chargeStatus;
            AppData.smartModeSwitch = typeof data.currentRunMode!=='undefined' ? data.currentRunMode : AppData.smartModeSwitch;

            if(AppData.smartModeSwitch == 1){
                let tempData = getTriggerData();
                this.trigger(Funs._extends(AppData.faceCleanerConfig, tempData, recConfigMark));// 推荐数据，和当前的运行数据，每个部位的描述合并
            }else{
                let tempData = getTriggerData();
                if(data.currentConfig){
                    AppData.currentConfig = Funs._extends(AppData.currentConfig,data.currentConfig);
                }else{
                    if(AppData.skinType == null || AppData.skinType === undefined){//设备以前绑定了有肤质的智能模式，但是现在绑到了无肤质的用户下
                        AppData.currentConfig = Funs._extends(AppData.currentConfig,data,{smartModeSwitch:0});
                    }else{
                        AppData.currentConfig = Funs._extends(AppData.currentConfig,data);
                    }
                }
                let runData = Funs._extends(AppData.currentConfig, tempData, recConfigMark);
                this.trigger(runData);
            }
        }else{//有数据保存时，仅接受部分字段
            if(AppData.smartModeSwitch == 1){
                let tempData = getTriggerData();
                this.trigger(Funs._extends(AppData.faceCleanerConfig, tempData, recConfigMark));
            }else{
                let tempData = getTriggerData();
                runData = Funs._extends(AppData.currentConfig, tempData, recConfigMark);
                this.trigger(runData);
            }
        }
        if(AppData.currentRunMode === undefined && data.currentRunMode==1){
            let _this = this;
            let objData = {
                "updateFlag":1023,
                "gears1":data.currentRunConfig[0].gears,
                "runtime1":data.currentRunConfig[0].runTime,
                "gears2":data.currentRunConfig[1].gears,
                "runtime2":data.currentRunConfig[1].runTime,
                "gears3":data.currentRunConfig[2].gears,
                "runtime3":data.currentRunConfig[2].runTime,
                "gears4":data.currentRunConfig[3].gears,
                "runtime4":data.currentRunConfig[3].runTime,
                "gears5":data.currentRunConfig[4].gears,
                "runtime5":data.currentRunConfig[4].runTime,
                "source":2,
                "configMode":1
            };
            let callback = function(data){
                let accessToken = data;
                let url = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/facecleaner/config/set";
                let timestamp = +new Date();
                let deviceId = getCurrentDeviceSn();
                let source = 2;
                let trigger = function (){
                    needSave = false;
                    sendData.updateFlag = 0;//每次提交重置自动模式的updateFlag
                    _this.trigger({needSave:false});
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
        }
    },
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
            //获取设备在线离线状态
            let onlineUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/device/getDeviceInfo";
            let appType = !!(navigator.userAgent.indexOf('Android')+1) ? 1 : 2;
            let timestamp = +new Date();
            let accessToken = data;
            let deviceId = getCurrentDeviceSn();
            if(!deviceId) return;
            onlineUrl = onlineUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId+"&appType="+appType;
            let infoCall = function(data){
                let result = {"onlineStatus":data.onlineStatus};
                AppData.onlineStatus = data.onlineStatus;
                _this.trigger({onlineStatus:data.onlineStatus});
            };
            _this.onGetData(onlineUrl,infoCall);
            if(AppData.onlineStatus==2) return;//离线状态,停止获取数据
            //获取default接口数据
            let statusUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/faceCleaner/defaultMode";
            statusUrl = statusUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId;
            //获取运行数据
            let runUrl = (het.getHost() || "https://test.api.clife.cn")+"/v1/device/data/get";
            runUrl = runUrl+"?appId="+appId+"&accessToken="+accessToken+"&timestamp="+timestamp+"&deviceId="+deviceId;
            _this.onGetData(statusUrl,_this.onRepaint);
            _this.onGetData(runUrl,_this.onRepaint);
        };
        let errCall = function(){
            _this.trigger({needSave: true});
        };
        het.getToken(callback,errCall);
    },
    onSwitchStateChange(value){
        needSave = true;
        if(value==1){
            // 先改变value的值，然后再合并
            AppData.smartModeSwitch = 0;
            let tempData = getTriggerData();
            this.trigger(Funs._extends(AppData.currentConfig,tempData,recConfigMark));
        }else if(value==0){
            // 先改变value的值，然后再合并
            if(AppData.faceCleanerConfig){
                AppData.smartModeSwitch = 1;
            }
            let tempData = getTriggerData();
            // if(AppData.faceCleanerConfig && AppData.skinType !== null){
            //     AppData.faceCleanerConfig.showTestSkin = 1;//智能模式有推荐数据
            // }else{
            //     AppData.faceCleanerConfig.showTestSkin = 2;//智能模式无推荐数据
            // }
            this.trigger(Funs._extends(AppData.faceCleanerConfig,tempData,recConfigMark));
        }
    },

    //  这个是选择器点击了确定之后
    onChangeGears(items){
        needSave = true;
        let data = arrToObj(items);
        // console.log(items);
        let tempData = getTriggerData();
        AppData.currentConfig = Funs._extends(AppData.currentConfig, data, tempData, recConfigMark);
        // console.log("222222",AppData.currentConfig);
        this.trigger(AppData.currentConfig);
    },

    onSubmit(items){
        let _this = this;
        // console.log("currentData ....",currentData);
        // needSave = false;
        sendData.gears1 = items[0].speed;//额头档位
        sendData.runtime1 = items[0].time;//额头时间
        sendData.gears2 = items[1].speed;//鼻子档位
        sendData.runtime2 = items[1].time;//鼻子时间
        sendData.gears3 = items[2].speed;//下巴档位
        sendData.runtime3 = items[2].time;//下巴时间
        sendData.gears4 = items[3].speed;//左脸档位
        sendData.runtime4 = items[3].time;//左脸时间
        sendData.gears5 = items[4].speed;//右脸档位
        sendData.runtime5 = items[4].time;//右脸时间
        sendData.source = 2;
        sendData.configMode = AppData.smartModeSwitch;
        // needSave = false;

        // console.log("sendData ....",sendData);
        // this.trigger({needSave:false});
        if (AppData.smartModeSwitch == 1) {
            if (AppData.faceCleanerConfig.foreheadGears!=AppData.currentConfig.foreheadGears) {
                sendData.updateFlag |= Math.pow(2, 0);
            };
            if (AppData.faceCleanerConfig.noseGears!=AppData.currentConfig.noseGears) {
                sendData.updateFlag |= Math.pow(2, 2);
            };
            if (AppData.faceCleanerConfig.leftfaceGears!=AppData.currentConfig.leftfaceGears) {//左脸 gear4
                sendData.updateFlag |= Math.pow(2, 6);
            };
            if (AppData.faceCleanerConfig.chinGears!=AppData.currentConfig.chinGears) {//下巴  gear3
                sendData.updateFlag |= Math.pow(2, 4);
            };
            if (AppData.faceCleanerConfig.rightfaceGears!=AppData.currentConfig.rightfaceGears) {
                sendData.updateFlag |= Math.pow(2, 8);
            };

            if (AppData.faceCleanerConfig.foreheadRuntime!=AppData.currentConfig.foreheadRuntime) {
                sendData.updateFlag |= Math.pow(2, 1);
            };
            if (AppData.faceCleanerConfig.noseRuntime!=AppData.currentConfig.noseRuntime) {
                sendData.updateFlag |= Math.pow(2, 3);
            };
            if (AppData.faceCleanerConfig.leftfaceRuntime!=AppData.currentConfig.leftfaceRuntime) {
                sendData.updateFlag |= Math.pow(2, 7);
            };
            if (AppData.faceCleanerConfig.chinRuntime!=AppData.currentConfig.chinRuntime) {
                sendData.updateFlag |= Math.pow(2, 5);
            };
            if (AppData.faceCleanerConfig.rightfaceRuntime!=AppData.currentConfig.rightfaceRuntime) {
                sendData.updateFlag |= Math.pow(2, 9);
            };
        }else{
            // console.log("AcurrentData.foreheadGears",currentData.foreheadGears)
            // console.log("sendData.gears1",sendData.gears1)
            if (currentData.foreheadGears!=sendData.gears1) {
                sendData.updateFlag |= Math.pow(2, 0);
            };
            if (currentData.noseGears!=sendData.gears2) {
                sendData.updateFlag |= Math.pow(2, 2);
            };
            if (currentData.leftfaceGears!=sendData.gears4) {//左脸 gear4
                sendData.updateFlag |= Math.pow(2, 6);
            };
            if (currentData.chinGears!=sendData.gears3) {//下巴  gear3
                sendData.updateFlag |= Math.pow(2, 4);
            };
            if (currentData.rightfaceGears!=sendData.gears5) {
                sendData.updateFlag |= Math.pow(2, 8);
            };

            if (currentData.foreheadRuntime!=sendData.runtime1) {
                sendData.updateFlag |= Math.pow(2, 1);
            };
            if (currentData.noseRuntime!=sendData.runtime2) {
                sendData.updateFlag |= Math.pow(2, 3);
            };
            if (currentData.chinRuntime!=sendData.runtime3) {
                sendData.updateFlag |= Math.pow(2, 5);
            };
            if (currentData.leftfaceRuntime!=sendData.runtime4) {
                sendData.updateFlag |= Math.pow(2, 7);
            };
            if (currentData.rightfaceRuntime!=sendData.runtime5) {
                sendData.updateFlag |= Math.pow(2, 9);
            };
        }

        let callback = function(data){
            let accessToken = data;
            let url = (het.getHost() || "https://test.api.clife.cn")+"/v1/app/chairdressing/facecleaner/config/set";
            let timestamp = +new Date();
            let deviceId = getCurrentDeviceSn();
            let source = 2;
            let trigger = function (){
                needSave = false;
                sendData.updateFlag = 0;//每次提交重置自动模式的updateFlag
                _this.trigger({needSave:false});
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
        AppData.currentConfig.foreheadChanged = false;
        AppData.currentConfig.noseChanged = false;
        AppData.currentConfig.chinChanged = false;
        AppData.currentConfig.leftfaceChanged = false;
        AppData.currentConfig.rightfaceChanged = false;
    }
});