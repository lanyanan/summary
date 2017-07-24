'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';
import {orderDataArray, waterLevelDataArray, processDataArray, specialDataArray, washerModeS} from  './washerConstData.js';
import {setDeviceInfo, getDeviceInfo, hasSetRequest} from './DeviceTokenCache.js';

const appData = {
    isFirstInputThisPage:true,
    isWorking: false,
    count: 1,
    online: 2,
    onLinestatue:false,
    networkavailable: '1',
    get_selectModeValue:0,    //modex  index
    get_orderTimeValue:0,
    get_waterLevelValue:'6档',
    get_processValue:'洗涤+漂洗+脱水',
    get_specialValue:'无',
    washerIsStop:true,   // 洗衣机是否暂定
    washerChildLock:false,  // 童锁关闭  true 童锁打开
    washerSwitchLock:false,  // true 开机
    WorkStep:8,

}


// ModeKey: mode,                      CodeMode
//     OrderKey: orderIndex + 1,       OrderMode
//     WaterLevelKey:waterLevel + 1,   MaxWaterLevel
//     ProcessKey:processKey + 1,      ProcessMode
//     FuntionKey:specialKey + 1,      FuntionMode
//     StartStopKey: parseInt("1",10),  MachineRunStatus
//     updateFlag: updateFlagSpecial,

let dataFilterTimers = {
    CodeMode:0,
    ChildLock:0,
    MachineRunStatus:0,
    WorkMode:0,
    OrderMode:0,
    ProcessMode:0,
    FuntionMode:0,
    MaxWaterLevel:0,

    CurWashModeSurplusTim:0,
    CurOrderSurplusTime:0,
    CurSoakSurplusTime:0,
    CurWashSurplusTime:0,
    CurRinseSurplusTime:0,
    CurDehydrationSurplusTime:0,

    WorkStep:0

};
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

// 运行
//   工作模式  0x00关机模式 0x03为洗衣模式       WorkMode = 0;
//   工作阶段  0 -8 0=参数设置阶段 1=预约 2=称重 3=浸泡 4=洗涤  WorkStep
//                 05=漂洗  6=脱水  7=风干  8=洗涤结束阶段

//   机器运行状态   0x00为暂停状态 0x01为运行状态    MachineRunStatus
//   童锁状态       0x00 为无童锁 0x01 为有童锁   ChildLock
// OrderMode      预约模式否属性值定义删除
// ProcessMode    过程模式否属性值定义删除
// FuntionMode    特殊功能模式否属性值定义删除
// MaxWaterLevel

//   当前洗衣总时间   十六进制数据，单位分钟        CurWashModeTotalTime
///  当前洗衣剩余时间                           CurWashModeSurplusTim
//   当前程序预约总时间                         CurOrderTotalTime
//   当前程序预约剩余时间                       CurOrderSurplusTime
//   前洗衣浸泡总时间                          CurSoakTotalTime
//   当前洗衣浸泡剩余时间                       CurSoakSurplusTime
//   当前洗衣洗涤总时间                         CurWashTotalTime
//   当前洗衣洗涤剩余时间                       CurWashSurplusTime
//   当前洗衣漂洗总时间                        CurRinseTotalTime
//   当前洗衣漂洗剩余时间                      CurRinseSurplusTime
//   当前洗衣漂洗次数                        CurRinseTimes
//   当前洗衣脱水总时间                       CurDehydrationTotalTime
//   当前洗衣脱水剩余时间                    CurDehydrationSurplusTime
//   当前洗衣风干总时间                       CurAirDryTotalTime
//   当前洗衣风干剩余时间                      CurAirDrySurplusTime
//    留水状态 0x00,非留水状态 0x01,留水状态     LeaveWaterStatus




//控制
// FuntionKey = 1;
// LockOnOffKey = 2;
// ModeKey = 1;
// OrderKey = 1;
// PowerOnOffKey = 1;
// ProcessKey = 1;
// StartStopKey = 2;  {1, 2}对应工作模式={启动，暂停}
// WaterLevelKey = 6;

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){

        let data =  dataFilter(datas);

        //运行数据
        if(data.CodeMode != undefined){appData.CodeMode = data.CodeMode ; appData.get_selectModeValue = parseInt(appData.CodeMode) -1 ;} // 工作模式  程序 标准,快速,强力,羊毛,化纤,牛仔,棉麻,仿生,童衣,内衣
        if(data.WorkMode != undefined){appData.WorkMode = data.WorkMode ;  appData.washerSwitchLock = (appData.WorkMode ==3);}
        if(data.WorkStep != undefined){appData.WorkStep = data.WorkStep ; }
        if(data.MachineRunStatus != undefined){appData.MachineRunStatus = data.MachineRunStatus ; appData.washerIsStop = (appData.MachineRunStatus ==0); }
        if(data.ChildLock != undefined){appData.ChildLock = data.ChildLock ;  appData.washerChildLock = (appData.ChildLock ==1); }

        if(data.OrderMode != undefined){appData.OrderMode = data.OrderMode ;
            let index = parseInt(appData.OrderMode) > 0 ? (parseInt(appData.OrderMode)-1) : 0 ;
            appData.get_orderTimeValue = orderDataArray[index];
        }
        if(data.ProcessMode != undefined){appData.ProcessMode = data.ProcessMode ;
            let index = parseInt(appData.ProcessMode) > 0 ? (parseInt(appData.ProcessMode)-1 ): 0 ;
            appData.get_processValue = processDataArray[index];
        }
        if(data.FuntionMode != undefined){appData.FuntionMode = data.FuntionMode ;
            let index = parseInt(appData.FuntionMode) > 0 ? (parseInt(appData.FuntionMode)-1 ): 0 ;
            appData.get_specialValue = specialDataArray[index];
            if(appData.get_specialValue == '洁桶'){
                appData.CurWashSurplusTime = '8';
                appData.get_processValue = '洗涤+脱水';
            }
        }
        if(data.MaxWaterLevel != undefined){appData.MaxWaterLevel = data.MaxWaterLevel ;
           let index = parseInt(appData.MaxWaterLevel) > 0 ? (parseInt(appData.MaxWaterLevel)-1 ): 0 ;
            appData.get_waterLevelValue = waterLevelDataArray[index];
        }

        //洗衣总时间
        if(data.CurWashModeTotalTime != undefined){appData.CurWashModeTotalTime = data.CurWashModeTotalTime ; }
        if(data.CurWashModeSurplusTim != undefined){appData.CurWashModeSurplusTim = data.CurWashModeSurplusTim ; }
        // 预约时间
        if(data.CurOrderTotalTime != undefined){appData.CurOrderTotalTime = data.CurOrderTotalTime ; }
        if(data.CurOrderSurplusTime != undefined){appData.CurOrderSurplusTime = data.CurOrderSurplusTime ; }
        // 浸泡时间
        if(data.CurSoakTotalTime != undefined){appData.CurSoakTotalTime = data.CurSoakTotalTime ; }
        if(data.CurSoakSurplusTime != undefined){appData.CurSoakSurplusTime = data.CurSoakSurplusTime ; }
        // 洗涤时间
        if(data.CurWashTotalTime != undefined){appData.CurWashTotalTime = data.CurWashTotalTime ; }
        if(data.CurWashSurplusTime != undefined){appData.CurWashSurplusTime = data.CurWashSurplusTime ; }
        //漂洗 时间
        if(data.CurRinseTotalTime != undefined){appData.CurRinseTotalTime = data.CurRinseTotalTime ; }
        if(data.CurRinseSurplusTime != undefined){appData.CurRinseSurplusTime = data.CurRinseSurplusTime ; }
        if(data.CurRinseTimes != undefined){appData.CurRinseTimes = data.CurRinseTimes ; }
        //脱水时间
        if(data.CurDehydrationTotalTime != undefined){appData.CurDehydrationTotalTime = data.CurDehydrationTotalTime ; }
        if(data.CurDehydrationSurplusTime != undefined){appData.CurDehydrationSurplusTime = data.CurDehydrationSurplusTime ; }
        // 风干时间
        if(data.CurAirDryTotalTime != undefined){appData.CurAirDryTotalTime = data.CurAirDryTotalTime ; }
        if(data.CurAirDrySurplusTime != undefined){appData.CurAirDrySurplusTime = data.CurAirDrySurplusTime ; }
        // 留水
        if(data.LeaveWaterStatus != undefined){appData.LeaveWaterStatus = data.LeaveWaterStatus ; }

        // 控制数据
        if(data.FuntionKey != undefined)   {appData.FuntionKey    = data.FuntionKey ; }    //功能
        if(data.LockOnOffKey != undefined) {appData.LockOnOffKey  = data.LockOnOffKey ; appData.washerChildLock = (appData.LockOnOffKey ==1); }  //开/关童锁
        if(data.ModeKey != undefined)      {appData.ModeKey       = data.ModeKey ; appData.get_selectModeValue = appData.ModeKey - 1; }       // 程序 标准,快速,强力,羊毛,化纤,牛仔,棉麻,仿生,童衣,内衣
        if(data.OrderKey != undefined)     {appData.OrderKey      = data.OrderKey ; }      //预约
        if(data.ProcessKey != undefined)   {appData.ProcessKey    = data.ProcessKey ; }    // 过程 洗涤+漂洗+脱水,浸泡+洗涤+漂洗+脱水,洗涤,洗涤+漂洗,漂洗+脱水,脱水
        if(data.StartStopKey != undefined) {appData.StartStopKey  = data.StartStopKey ; appData.washerIsStop = (appData.StartStopKey ==2); }  //启动/暂停
        if(data.WaterLevelKey != undefined){appData.WaterLevelKey = data.WaterLevelKey ; } //水位
        if(data.PowerOnOffKey != undefined){appData.PowerOnOffKey = data.PowerOnOffKey ;
            console.log("yy receive switch: " + appData.PowerOnOffKey);
            appData.washerSwitchLock = (appData.PowerOnOffKey ==1); } //开关机



        //离线&故障
        if(data.online)                                 appData.online = data.online;
        if(data.networkavailable)                       appData.networkavailable = data.networkavailable;
        if(data.online == 2){
            appData.onLinestatue = false;
        }else{
            appData.onLinestatue = true;
        }

        if(data.appId != undefined) appData.appId = data.appId;
        if(data.deviceId != undefined) appData.deviceId = data.deviceId;
        if(data.accessToken != undefined) appData.accessToken = data.accessToken;
        if(data.deviceId != undefined  && !hasSetRequest()){
            setDeviceInfo(data.accessToken,data.deviceId);
        }

        // 故障数据
        if(data.Error1 != undefined) {appData.Error1 = data.Error1; }
        if(data.Error2 != undefined) {appData.Error2 = data.Error2; }
        if(data.Error3 != undefined) {appData.Error3 = data.Error3; }
        if(data.Error4 != undefined) {appData.Error4 = data.Error4; }
        if(data.Error5 != undefined) {appData.Error5 = data.Error5; }
        if(data.Error6 != undefined) {appData.Error6 = data.Error6; }
        if(data.Error7 != undefined) {appData.Error7 = data.Error7; }
        if(data.Error8 != undefined) {appData.Error8 = data.Error8; }
        if(data.Error9 != undefined) {appData.Error9 = data.Error9; }
        if(data.Error10 != undefined) {appData.Error10 = data.Error10; }
        if(data.Error11 != undefined) {appData.Error11 = data.Error11; }
        if(data.Error12 != undefined) {appData.Error12 = data.Error12; }
        if(data.Error13 != undefined) {appData.Error13 = data.Error13; }
        if(data.Error14 != undefined) {appData.Error14 = data.Error14; }
        if(data.Error15 != undefined) {appData.Error15 = data.Error15; }
        if(data.Error16 != undefined) {appData.Error16 = data.Error16; }
        if(data.Error17 != undefined) {appData.Error17 = data.Error17; }


        // 工作状态
        if(!appData.washerIsStop&&appData.washerSwitchLock&& appData.onLinestatue){
            console.log("yy set isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);
            appData.isWorking = true;
        }
        // 预约状态
        else if(appData.washerIsStop&&appData.washerSwitchLock&& appData.onLinestatue&&(appData.WorkStep > 0 && appData.WorkStep < 8)){
            console.log("yy set yuyue isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);
            appData.isWorking = true;
        }else {
            console.log("yy set clear isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);

            appData.isWorking =    false
        }

        this.trigger(appData);
    },
    onChangeToWorkingPage(value){
        appData.isWorking = value;
        console.log("stroe is work: " + appData.isWorking);
        let count = appData.count;

        count += 1;
        appData.count = count;
        this.trigger(appData);
    },
    onAppMainViewUpdateState(){
        this.trigger(appData);
    },
    onStartAction(data){

        if(!switchAndNetWorkCheck()){
            return;
        }

        if(!childLockCheck()){
            return;
        }

        if(!orderCheck()){
            return;
        }

        startWasher(data.set_selectModeValue,data.set_orderTimeValue,data.set_waterLevelValue,data.set_processValue,data.set_specialValue);

    },
    onStopAction(data){
        if(!switchAndNetWorkCheck()){
            return;
        }

        if(!childLockCheck()){
            return;
        }

        appData.washerIsStop = data;

        let updateFlag = het.hexUpFlag(11 , 1, 4);
        let switchData = {};
        if(appData.washerIsStop){
            switchData = {
                StartStopKey: parseInt("2",10),
                updateFlag: updateFlag
            }
        }else{
            switchData = {
                StartStopKey: parseInt("1",10),
                updateFlag: updateFlag
            }
        }
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});


        console.log("控制命令 设置暂停: " +  appData.washerIsStop);
        setDataTimer("MachineRunStatus");
        this.trigger(appData);
    },
    onSwitchAction(data){

        if(!NetWokrCheck()){
            return ;
        }

        if(!childLockCheck()){
            return;
        }

       // Actions.changeToWorkingPage(false);
        appData.isWorking = false;
        appData.washerSwitchLock = data;

        let updateFlag = het.hexUpFlag(4 , 1, 4);
        let switchData = {};
        if(appData.washerSwitchLock){
            switchData = {
                PowerOnOffKey: parseInt("1",10),
                updateFlag: updateFlag
            }
        }else{
            appData.MachineRunStatus = 0;
            appData.washerIsStop = true;
            appData.WorkStep = 0;
            let updateFlagStop = het.hexUpFlag(11 , 1, 4,updateFlag);
            switchData = {
                StartStopKey: parseInt("2",10),
                PowerOnOffKey: parseInt("2",10),
                updateFlag: updateFlagStop
            }
        }
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});

        setDataTimer("WorkMode","MachineRunStatus",'WorkStep');
        console.log("控制命令 ");
        this.trigger(appData);
    },

    onChildLockAction(data){

        if(!switchAndNetWorkCheck()){
            return;
        }

        appData.washerChildLock = data;

        let updateFlag = het.hexUpFlag(5 , 1, 4);
        let switchData = {};
        if(appData.washerChildLock){
            switchData = {
                LockOnOffKey: parseInt("1",10),
                updateFlag: updateFlag
            }
        }else{
            switchData = {
                LockOnOffKey: parseInt("2",10),
                updateFlag: updateFlag
            }
        }
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});
        console.log("控制命令 ");
        setDataTimer("ChildLock");
        this.trigger(appData);


    },
    onSetFirstInputSetingPage( data){
        appData.isFirstInputThisPage = data;
        this.trigger(appData);
    },
    onKuaisuModeAction(){

        if(!switchAndNetWorkCheck()){
            return;
        }

        if(!childLockCheck()){
            return;
        }

        if(!orderCheck()){
            return;
        }

        let modeIndex =  appData.get_selectModeValue || 0;
        let onWashing = appData.washerIsStop != undefined ? appData.washerIsStop : true;
        if(!onWashing){
            if(modeIndex != 1){
                het.toast("正在洗衣，请暂停后切换模式");
            }
            return;
        }

        startWasher("1","0","6档","洗涤+漂洗+脱水","无");
    },
    onBiaozhunModeAction(){

        if(!switchAndNetWorkCheck()){
            return;
        }
        if(!childLockCheck()){
            return;
        }
        if(!orderCheck()){
            return;
        }

        let modeIndex =  appData.get_selectModeValue || 0;
        let onWashing = appData.washerIsStop != undefined ? appData.washerIsStop : true;
        if(!onWashing){
            console.log("正在洗衣服");
            if(modeIndex != 0){
                het.toast("正在洗衣，请暂停后切换模式");
            }
            return;
        }
        startWasher("0","0","6档","洗涤+漂洗+脱水","无");
    }

});


function startWasher(selectMode,orderTimerValue, waterLevelValue,processValue,specialValue) {
    appData.get_selectModeValue= parseInt(selectMode) ;
    appData.get_orderTimeValue = orderTimerValue;
    appData.get_waterLevelValue = waterLevelValue;
    appData.get_processValue = processValue;
    appData.get_specialValue = specialValue;
    appData.washerIsStop = false;
    appData.isWorking = true;


    let currentModeConfigData =  washerModeS[ appData.get_selectModeValue];

    // 设置模式后，强制设置一次时间，方便显示
    //洗衣总时间
    appData.CurWashModeSurplusTim =  currentModeConfigData.totalTime;
    // 预约时间
    appData.CurOrderSurplusTime = parseInt(appData.get_orderTimeValue)*60;
    // 浸泡时间
    appData.CurSoakSurplusTime =  currentModeConfigData.SoakTotalTime;
    // 洗涤时间
    appData.CurWashSurplusTime = currentModeConfigData.WashTotalTime;
    //漂洗 时间
    appData.CurRinseSurplusTime =  currentModeConfigData.RinseTotalTime;
    //脱水时间
    appData.CurDehydrationSurplusTime =   currentModeConfigData.DehydrationTotalTime;

    if(specialValue == '洁桶'){
        appData.CurWashSurplusTime = '8';
        appData.get_processValue = '洗涤+脱水';
    }

    // 模式发送
    let updateFlag = het.hexUpFlag(11 , 1, 4);
    let updateFlagMode = het.hexUpFlag(6 , 1, 4,updateFlag);
    let updateFlagOrder = het.hexUpFlag(7 , 1, 4,updateFlagMode);
    let updateFlagWater = het.hexUpFlag(8 , 1, 4,updateFlagOrder);
    let updateFlagProcess = het.hexUpFlag(9 , 1, 4,updateFlagWater);
    let updateFlagSpecial = het.hexUpFlag(10 , 1, 4,updateFlagProcess);


    let mode = appData.get_selectModeValue + 1;
    let orderIndex = orderDataArray.indexOf(appData.get_orderTimeValue) || 0;
    let waterLevel =  waterLevelDataArray.indexOf(appData.get_waterLevelValue) || 0 ;
    let processKey =  processDataArray.indexOf(appData.get_processValue) || 0 ;
    let specialKey =  specialDataArray.indexOf(appData.get_specialValue) || 0 ;

    let switchData = {
        ModeKey: mode,
        OrderKey: orderIndex + 1,
        WaterLevelKey:waterLevel + 1,
        ProcessKey:processKey + 1,
        FuntionKey:specialKey + 1,
        updateFlag: updateFlagSpecial,
        StartStopKey:parseInt("1",10),
    }

    // if( appData.get_orderTimeValue == 0){
    //    // switchData["StartStopKey"] = parseInt("1",10);
    // }else{
    //   //  switchData["StartStopKey"] = parseInt("2",10);
    //     appData.WorkStep = 1;
    //     appData.OrderMode =  orderIndex + 1;
    // }

    let workModeArray = ["参数设置阶段","预约","称重","浸泡","洗涤","漂洗","脱水","风干","洗涤结束"];
    let processData          = appData.get_processValue || '洗涤+漂洗+脱水';
    let processArray = processData.split("+");
    if(appData.get_orderTimeValue != 0){
        processArray.splice(0,0,"预约");
    }
    let firstStep = processArray[0] || "";
    let firstStepIndex = workModeArray.indexOf(firstStep);
    appData.WorkStep  = firstStepIndex;

    het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});

    console.log("控制命令 预设第一个模式：" + firstStepIndex);

    //强制设置模式后，不在获取模式，工作步骤等，先强制设置，如果成功了，就取这个结果
    setDataTimer("CodeMode","OrderMode","ProcessMode","FuntionMode","MaxWaterLevel","MachineRunStatus","WorkStep");

    setDataTimer("CurWashModeSurplusTim","CurOrderSurplusTime","CurSoakSurplusTime","CurWashSurplusTime","CurRinseSurplusTime","CurDehydrationSurplusTime");

    console.log("启动模式：" + washerModeS[appData.get_selectModeValue].name + " " + appData.get_orderTimeValue +" " + appData.get_waterLevelValue +" " + appData.get_processValue + " " +appData.get_specialValue);
    this.trigger(appData);
}

function orderCheck() {
    let workStep = appData.WorkStep || 0;
    if(workStep == 1){
        het.toast("预约中");
        return false;
    }
    return true;
}

function childLockCheck() {
    let childlOCKData = appData.washerChildLock;
    if(childlOCKData){
        het.toast("童锁已打开");
        return false;
    }
    return true;
}

function switchAndNetWorkCheck(){

    if(!NetWokrCheck()){
        return false;
    }

    let switchStatua = appData.washerSwitchLock;
    if(!switchStatua){
        het.toast("请开机");
        return false;
    }

    return true;
}


function NetWokrCheck(){
    let netWorkStatus = (appData.networkavailable == 2);
    if(netWorkStatus){
        het.toast("当前网络不可用");
        return false;
    }

    let onLineStatus = (appData.online == 2);
    if (onLineStatus){
        het.toast("设备已离线");
        return false;
    }
    return true;
}