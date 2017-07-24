'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';
//  运行数据
// "type" : "1",
//     "data" : {
//     "standardsittingstatus" : 0,

//         "lightlevel" : 0,
//         "Wrongsittingtime" : 0,
//         "Correctsittingtime" : 0,
//         "runmode" : 0,
//         "sittingstatus" : 1,
//         "workmode" : 3,
//         "modelightlevel" : 1
// }

//     控制数据
//     "warm" : 0,
//     "updateFlag" : "0200",
//     "mode" : 3,
//     "power" : 1,
//     "white" : 0,
//     "reserve" : "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
//     "sittingdetection" : 16,
//     "errortime" : 15

// 告警数据
// "IR" : 1,
//     "light" : 0,        // 亮度报警
//     "Ultrasonic" : 0,
//     "voice" : 0,
//     "reserve" : "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
//     "sitting" : 1     // 坐姿报警

// 数据过滤计时器
let dataFilterTimers = {
    workmode:0,
    standardsittingstatus:0,
    sittingstatus:0
};

var isFirstInput = true;
var countInputData = 0;
var yunxingshujuInputCount = 0;
var isReceiveControlData = false;
// 返回过滤后的数据
function dataFilter(data) {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
            }else{
                console.log("yy filter: " + k);
            }
        } else {
            result[k] = data[k];
        }
    }
    return result;
}
// 设置过滤器过期时间
function setDataTimer(...keys) {
    let time = (new Date).getTime() + 10e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

var appData = {
    timer:null,
    online:'2'
};

let lastSiteErrorRecordTime = 0;

function setLightValue(){
    // lignht Value
    let whiteValue = appData.white || 0;
    let warmValue  = appData.warm  || 0;
    let intelegeValue = appData.lightlevel || 0;
    var lightValue = 0;
    switch(appData.lightIndex){
        case 1: lightValue = whiteValue; break;
        case 2: lightValue = warmValue; break;
        case 3: lightValue = intelegeValue; break;
        case 0: lightValue = 0; break;
        default:
            lightValue = 4;
    }
    appData.lightValue = lightValue;
}

// 设置 第几个button
function setLightIndex(index){
    appData.lightIndex = index;
    if (index != 3){
        appData.sittingdetection = false;
        appData.sittingstatus = true;
    }
}

function switchAndNetWorkCheck(){
    let netWorkStatus = (appData.networkavailable ==2);
    if(netWorkStatus){
        het.toast("当前网络不可用");
        return false;
    }

    let onLineStatus = (appData.online == 2);
    if (onLineStatus){
        het.toast("设备已离线");
        return false;
    }

    let switchStatua = appData.switchStatue;
    if(!switchStatua){
        het.toast("请开机");
        return false;
    }

    return true;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){

        let data =  dataFilter(datas);
        console.log("yy" + JSON.stringify(data));

        //type 0
        // 坐姿检测开启后，默认坐姿正常，标准坐姿没有录入
        if(data.sittingdetection != undefined)
        {
            //console.log("i received the sittingdetection");
            appData.sittingdetection = (data.sittingdetection == 1);
        }

        if(data.mode != undefined){
            setLightIndex(data.mode);
            countInputData += 1;
            if(countInputData == 1){
                window.receiveAppData = data;
            }
            // 收到控制命令后，忽略模式设置字段10s
            // 第一次进来，过滤掉了这个数据
            // if(isFirstInput){
            //     isFirstInput = false;
            // }else{
                setDataTimer("workmode");
            // }

            if((data.mode == 0) && (data.power == 0) && (data.sittingdetection == 0)){
                appData.loadingShow = true;
            }else{
                appData.loadingShow = false;
            }

        }

        if(data.power != undefined)
        {

            appData.switchStatue = (data.power == 1) ;
            // if (!appData.switchStatue){
            //     // 收到关机命令后，10s不接受状态数据
            //     //  setDataTimer("workmode");
            // }
        }

        if(data.mode!= undefined)  appData.md = data.mode;
        if(data.white != undefined)                    appData.white    = data.white;
        if(data.warm  != undefined)                    appData.warm     = data.warm;

        //type 1
        if(data.lightlevel != undefined)               appData.lightlevel = data.lightlevel;
        if(data.Wrongsittingtime != undefined)         appData.Wrongsittingtime = data.Wrongsittingtime;
        if(data.Correctsittingtime != undefined)       appData.Correctsittingtime = data.Correctsittingtime;
        if(data.runmode != undefined)                  appData.runmode = data.runmode;

        // 坐姿状态  == 1 正常
        if(data.sittingstatus != undefined)            appData.sittingstatus = (data.sittingstatus == 2) ?  false : true;
        // 是否有采集标准坐姿   === 1 录入了
        if(data.standardsittingstatus != undefined)    appData.standardsittingstatus = (data.standardsittingstatus == 1);

        //模式选择 1 冷光 2 暖光 3 智能 0 待机
        if(data.workmode != undefined)                 {
            setLightIndex(data.workmode);
           // setDataTimer("workmode");
            yunxingshujuInputCount += 1;
        }
        if(data.modelightlevel != undefined)            appData.modelightlevel = data.modelightlevel;

        //离线&故障
        if(data.online)                                 appData.online = data.online;
        if(data.networkavailable)                       appData.networkavailable = data.networkavailable;
        if(data.online == 2){
            appData.switchStatue = false;
            appData.lightIndex = 4;
        }

        if (data.light != undefined )                   appData.light = (data.light == 1);
        if (data.Ultrasonic != undefined)               appData.Ultrasonic = (data.Ultrasonic == 1);

        // 坐姿报警
        // if(data.sitting != undefined)                 {
        //     let siteErrorRecordTime = data.record_time;
        //     if (lastSiteErrorRecordTime != siteErrorRecordTime) {
        //         lastSiteErrorRecordTime =  siteErrorRecordTime;
        //         let currentDate = (new Date()).valueOf();
        //         let valueOfTime =  currentDate - lastSiteErrorRecordTime;
        //         // 30s内报警有效
        //         if(valueOfTime < (90 + 8*60*60)*1000 ){
        //             appData.site  = (data.sitting == 1);
        //         }
        //         console.log("当前时间戳 " + currentDate +  " 硬件时间戳：" +lastSiteErrorRecordTime +" 时间差： " + valueOfTime);
        //     }
        //     console.log("i receive sitting alert " + appData.site + " " + siteErrorRecordTime );
        // }

        // 设置 灯的亮度级别
        setLightValue();

        console.log("运行数据 count: " + yunxingshujuInputCount + " 收到控制命令: " + countInputData);

        this.trigger(appData);
    },

    onCloseLightAction(){

        console.log("close start");
        if(appData.online == '2'){
            het.toast("设备已离线");
            return;
        }

        if(appData.switchStatue != undefined) {
            appData.switchStatue = !appData.switchStatue;
        }else{
            appData.switchStatue = true;
        }

        let switchData = {};
        // index length 总共的长度

        if (appData.switchStatue){
            let updateFlag = het.hexUpFlag(0 , 1, 2);
            switchData = {
                power: parseInt("1",10),
                updateFlag: updateFlag
            }
        }else{
            let updateFlag = het.hexUpFlag(0 , 1, 2);
            switchData = {
                power: parseInt("16",10),
                updateFlag:updateFlag

            }
        }
        console.log("before mode:"  + " " +appData.lightIndex);
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});
        this.trigger(appData);
        setDataTimer("power");
    },
    onModeAction(index){

        if(!switchAndNetWorkCheck()){
            return;
        }

        let updateFlag = het.hexUpFlag(1, 1, 2);
        let modeData = {
            mode: parseInt(index),
            updateFlag: updateFlag
        }
        setLightIndex(index);
        het.send(modeData, (data)=>{}, (data)=>{het.toast("发送失败");});
        this.trigger(appData);
        setDataTimer("workmode");
    },

    onLightValueAction(value){
        appData.lightValue = value;
        if(!switchAndNetWorkCheck()){
            return;
        }

        let currentMode = appData.lightIndex;
        var updateFlag = 0;
        var modeData = {};
        if (currentMode == 1){
            updateFlag  = het.hexUpFlag(2, 1,2);
            modeData = {
                white: value,
                updateFlag: updateFlag
            }
        }else if(currentMode == 2){
            updateFlag  = het.hexUpFlag(3, 1,2);
            modeData = {
                warm: value,
                updateFlag: updateFlag
            }
        }else{
            het.toast("当前模式不能设置亮度");
            this.trigger(appData);
            return ;
        }

        het.send(modeData, (data)=>{}, (data)=>{het.toast("发送失败");});
        this.trigger(appData);
    },
    onSiteCheckAction(){
        let cureentMode = appData.lightIndex;
        if(!switchAndNetWorkCheck()){
            return;
        }

        if(cureentMode != 3){
            het.toast("请在智能模式下，选择坐姿检测");
            return;
        }

        let siteMode = appData.sittingdetection;
        var updateFlag = het.hexUpFlag(4, 1, 2);
        var modeData = {};

        if(siteMode){
            modeData = {
                sittingdetection:parseInt("16",10),
                updateFlag: updateFlag
            };
            appData.sittingdetection = false;
        }else{
            modeData = {
                sittingdetection:parseInt("1",10),
                updateFlag: updateFlag
            };
            appData.sittingdetection = true;
        }
        het.send(modeData, (data)=>{}, (data)=>{het.toast("发送失败");});
        console.log(appData.lightIndex);
        this.trigger(appData);
    },
    onCloseAlert(){
        appData.site = false;
    }
});