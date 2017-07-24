'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';
import {washerModeS, waterTempArray,  defaultTempIndex,defaultWasherModesIndex} from "./WasherCommonData.js";
// type : 0  控制数据
//     "cplock" : 0,
//     "cpnodef" : "00",
//     "cpnodef1" : "00",
//     "cprevs" : 0,
//     "updateFlag" : "0000",
//     "cponoff" : 0,
//     "cpworkmod" : 3,
//     "cpnodef3" : "00",
//     "cpnodef2" : "00",
//     "cpsettemp" : 35

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
 } // 设置过滤器过期时间 

 function setDataTimer(...keys)
 { 
     let time = (new Date).getTime() + 10e3; // 10秒内不接收新数据 
       for (let i in keys) { 
           dataFilterTimers[keys[i]] = time; 
       }
}

let dataFilterTimers = {
    workmod:0,
    oplock:0,
    worksts:0,
    cplock:0,
    settemp:0,
    cpsettemp:0,
};

const appData = {
    isWorking: false,
    count: 1,
    online: 2,
    onlineStatus:false,
    networkavailable: '2',
    set_childerLockOn:false,  // 童锁默认是关闭的
    set_switchLockOn:false,
    waterHeaterTemp:35,
    waterHeaterWorkMode:0,
    worksts: 1, // 默认为待机状态
    isFirtInput:false,
}

function NetWorkCheck(){

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

    return true;
}

function childLockCheck(){
    if(appData.set_childerLockOn){
        het.toast("童锁已打开");
        return true;
    }
    return false;
}

function powerOffCheck(){

    if(!appData.set_switchLockOn){
        het.toast("设备已待机");
        return true;
    }
    return false;
}

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(datas, type){



        let  data = dataFilter(datas);
        console.log("收到数据   "+data);

        // 运行数据
        if (data.oplock != undefined) { appData.oplock = data.oplock;  appData.set_childerLockOn =parseInt(data.oplock)=='1' } //童锁状态 1开启 0 关闭
        if (data.settemp != undefined) { appData.settemp = data.settemp; appData.waterHeaterTemp = appData.settemp} //设定水温
        if (data.outtemp != undefined) { appData.outtemp = data.outtemp; } // 出水温度
        if (data.intemp != undefined) { appData.intemp = data.intemp; } //进水温度
        if (data.waterspd != undefined) { appData.waterspd = data.waterspd; } // 水流速度
        if (data.water != undefined) { appData.water = data.water; }         //本次用水量
        if (data.pcbtemp != undefined) { appData.pcbtemp = data.pcbtemp; }    //PCBA环境温度

        if (data.powervol != undefined) { appData.powervol = data.powervol; } //电源电压
        if (data.powercur != undefined) { appData.powercur = data.powercur; } //整机电流
        if (data.worksts != undefined) { appData.worksts = data.worksts; appData.isWorking = (parseInt(appData.worksts) == 2);appData.set_switchLockOn = !(parseInt(appData.worksts) == 1);}    //工作状态 1待机 2运行 3故障
        if (data.workmod != undefined) { appData.workmod = data.workmod; appData.waterHeaterWorkMode = parseInt(data.workmod) - 1;}    //工作模式
        if (data.showertm != undefined) { appData.showertm = data.showertm;  } //洗浴时长  (1~8)

        if (data.waterspd != undefined) { appData.waterspd = data.waterspd;  } //总计耗水量  (L)
        if (data.devicetm != undefined) { appData.devicetm = data.devicetm;  } //总计通电时长  (H)

        // type = 0
        // 模式
        if(data.cpworkmod != undefined) {
            appData.waterHeaterWorkMode = parseInt(data.cpworkmod) - 1;
            // 收到工作控制命令模式后，过滤掉运行数据工作模式
            console.log("currentMode:" +  appData.waterHeaterWorkMode );
            setDataTimer("workmod");
        }
        // 水温
        if(data.cpsettemp != undefined) { appData.waterHeaterTemp = data.cpsettemp ; }
        // 开关
        console.log("^^^^^^^^^^^^^^^^^appData.set_switchLockOn:" +  appData.set_switchLockOn +"    data.cponoff     "+data.cponoff);
        if(data.cponoff != undefined) {
            appData.set_switchLockOn =  parseInt(data.cponoff) == '1';

            console.log("^^^^^^^^^^^^^^^^^appData.set_switchLockOn:" +  appData.set_switchLockOn );
        }
        // 童锁
        if(data.cplock != undefined) {
            appData.set_childerLockOn =  parseInt(data.cplock) == '1' ;
            // 收到工作控制命令模式后，过滤掉运行数据工作模式
            setDataTimer("oplock");
        }

        // 故障数据
        if(data.BK1 != undefined) {appData.BK1 = data.BK1; }
        if(data.BK2 != undefined) {appData.BK2 = data.BK2; }
        if(data.BK3 != undefined) {appData.BK3 = data.BK3; }
        if(data.BK4 != undefined) {appData.BK4 = data.BK4; }
        if(data.BK5 != undefined) {appData.BK5 = data.BK5; }
        if(data.BK6 != undefined) {appData.BK6 = data.BK6; }
        if(data.BK7 != undefined) {appData.BK7 = data.BK7; }
        if(data.BK8 != undefined) {appData.BK8 = data.BK8; }
        if(data.BK9 != undefined) {appData.BK9 = data.BK9; }
        if(data.BK10 != undefined) {appData.BK10 = data.BK10; }
        if(data.BK11 != undefined) {appData.BK11 = data.BK11; }
        if(data.BK12 != undefined) {appData.BK12 = data.BK12; }
        if(data.BK13 != undefined) {appData.BK13 = data.BK13; }
        if(data.BK14 != undefined) {appData.BK14 = data.BK14; }
        if(data.BK15 != undefined) {appData.BK15 = data.BK15; }
        if(data.BK16 != undefined) {appData.BK16 = data.BK16; }
        if(data.BK17 != undefined) {appData.BK17 = data.BK17; }
        if(data.BK18 != undefined) {appData.BK18 = data.BK18; }


        //离线&故障
        if(data.online)                                 appData.online = data.online;
        if(data.networkavailable!= undefined) {
            appData.networkavailable = data.networkavailable;
        }
        else {
            appData.networkavailable = 1;
        }
        if(data.online == 2){
            appData.onlineStatus = false;
        }
        else {
            appData.onlineStatus = true;
        }

        if(data.waterall!= undefined){
            appData.waterall=data.waterall;
        }

        console.log("waterall = "+data.waterall+"    "+appData.waterall);
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
    onStartWataerAction(data){
        if(!NetWorkCheck()){
            return;
        }

        // if(powerOffCheck()){
        //     return;
        // }

        if(childLockCheck()){
            return ;
        }

        if(appData.waterHeaterWorkMode === data.set_waterMode){
            return;
        }
        console.log("onStartWataerAction");
        // appData.set_waterTempIndex=data.set_waterTempIndex;
       appData.set_waterMode=data.set_waterMode;
        appData.waterHeaterWorkMode = data.set_waterMode;
        appData.isWorking=true;
        // appData.waterHeaterTemp = waterTempArray[data.set_waterTempIndex];


        let mode =  data.set_waterMode + 1;
        // let updateFlagTemp = het.hexUpFlag(4 , 1, 2);
        let updateFlag = het.hexUpFlag(5 , 1, 2);
        let switchData = {};

        switchData = {
            // cpsettemp:appData.waterHeaterTemp,
            cpworkmod: parseInt(mode,10),
            updateFlag: updateFlag
        }

        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});
        console.log("setTemp: " +  appData.set_waterTempIndex + " setMode: " + mode);
        this.trigger(appData);

        setDataTimer("workmod");
    },
    onSetWaterHeaterPowerOn(){

        if(!NetWorkCheck()){
            return;
        }

        if(appData.isWorking&&childLockCheck()){
            return ;
        }

        appData.set_switchLockOn = !appData.set_switchLockOn;
        console.log("++++++++++++++++++appData.set_switchLockOn:" +  appData.set_switchLockOn );
        if( !appData.set_switchLockOn){
            appData.isWorking=false;
        }else{
            appData.isWorking=true;
        }
        // let updateFlagTemp = het.hexUpFlag(7 , 1, 2);
        // let updateFlag = het.hexUpFlag(6 , 1, 2,updateFlagTemp);
        let updateFlag = het.hexUpFlag(6 , 1, 2);
        let switchData = {};
        if(appData.set_switchLockOn){
            switchData = {
                cponoff: parseInt("1",10),
                cplock: parseInt("0",10),
                updateFlag: updateFlag
            }
        }else{
            switchData = {
                cponoff: parseInt("0",10),
                cplock: parseInt("0",10),
                updateFlag: updateFlag
            }
        }
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});
        console.log("setPower: " +  appData.set_switchLockOn);

        //
        setDataTimer("oplock","worksts");
        this.trigger(appData);
    },
    onSetWaterHeaterChildOn(){
        if(!NetWorkCheck()){
            return;
        }

        if(powerOffCheck()){
            return;
        }

        // if (!appData.set_switchLockOn){
        //     return;
        // }
        appData.set_childerLockOn = !appData.set_childerLockOn;
        let updateFlag = het.hexUpFlag(7 , 1, 2);
        let switchData = {};
        if(appData.set_childerLockOn){
            switchData = {
                cplock: parseInt("1",10),
                updateFlag: updateFlag
            }
        }else{
            switchData = {
                cplock: parseInt("0",10),
                updateFlag: updateFlag
            }
        }
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});
        console.log("childLock: " +  appData.set_childerLockOn);
        setDataTimer("oplock");
        this.trigger(appData);
    },
    onAddTempAction(){

        if(!NetWorkCheck()){
            return;
        }

        // if(powerOffCheck()){
        //     return;
        // }

        if(childLockCheck()){
            return ;
        }
        let LitterTemp=25;
        let BigTemp=45;
        if(appData.workmod ==2||appData.workmod ==5){
            BigTemp=35;
        }
        else if(appData.workmod ==4){
            LitterTemp=45;
        }
        else if(appData.workmod ==7){
            LitterTemp=35;
        }
        if(appData.waterHeaterTemp>=BigTemp){
            if(LitterTemp!=BigTemp){
                het.toast("温度可调范围"+LitterTemp+"℃-"+BigTemp+"℃");
            }
            else {
                het.toast("温度可调范围"+BigTemp+"℃");
            }

            return;
        }

        appData.waterHeaterTemp =  appData.waterHeaterTemp + 1;
        let temp =  appData.waterHeaterTemp;
        let updateFlag = het.hexUpFlag(4 , 1, 2);
        let switchData = {
            cpsettemp: parseInt(temp,10),
            updateFlag: updateFlag
        };
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});
        console.log("temp: " +  appData.waterHeaterTemp);
        setDataTimer("settemp");
        this.trigger(appData);
    },
    onSubTempAction(){
        if(!NetWorkCheck()){
            return;
        }

        // if(powerOffCheck()){
        //     return;
        // }

        if(childLockCheck()){
            return ;
        }
        let LitterTemp=25;
        let BigTemp=45;
        if(appData.workmod ==2||appData.workmod ==5){
            BigTemp=35;
        }
        else if(appData.workmod ==4){
            LitterTemp=45;
        }
        else if(appData.workmod ==7){
            LitterTemp=35;
        }
        console.log("&&&&&&&&&&&&&&&&&&&&appData.workmod"+appData.workmod+"LittetTemp"+LitterTemp+"BigTemp"+BigTemp);
        if(appData.waterHeaterTemp<=LitterTemp){
            if(LitterTemp!=BigTemp){
                het.toast("温度可调范围"+LitterTemp+"℃-"+BigTemp+"℃");
            }
            else {
                het.toast("温度可调范围"+BigTemp+"℃");
            }

            return;
        }
        appData.waterHeaterTemp =  appData.waterHeaterTemp - 1;
        let temp =  appData.waterHeaterTemp;
        let updateFlag = het.hexUpFlag(4 , 1, 2);
        let switchData = {
            cpsettemp: parseInt(temp,10),
            updateFlag: updateFlag
        };
        het.send(switchData, (data)=>{}, (data)=>{het.toast("发送失败");});
        console.log("temp: " +  appData.waterHeaterTemp);
        setDataTimer("settemp");
        this.trigger(appData);
    },
    onSetingPageSet(data){
        console.log("#############################data = "+data);
        appData.isFirtInput = data;
        this.trigger(appData);
    }
});