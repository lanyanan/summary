'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {CommonFun} from './CommonFun.es6';
import {Macro} from './DefinMarco.es6';
import {ModeState} from './AromaSegView.es6';
import {MistState} from './AromaMistAndTimeView.es6';
let configPath = ""
let runDataPath = ""
export const Store = Reflux.createStore({
    displayData:{},
    listenables: [Actions],
    onGetRunData(){

        // let url ="http://200.200.200.50/v1/device/data/get?appId=10014&deviceId=CF2029A87083A6CC3B59CB4AD9F9ECA2&timestamp=1484567551163&accessToken=5cbcd063a76b4efab4c5e295105e8383&sign=ca692f2371f76a9da0404a12871e9e43";

        let url = CommonFun.urlStr("GET",Macro.kHETHostName+Macro.kURLDeviceDomain+Macro.kURLDeviceRunDataGet,
        {deviceId:"CF2029A87083A6CC3B59CB4AD9F9ECA2",accessToken:"c452b642cb7744ac83f1ca5ec0735e63"});
        het.get(url, {},(res)=>{
            console.log(res);
            this.displayData = res;
        });
    },
    onGetConfigData(){
        let url = CommonFun.urlStr("GET",Macro.kHETHostName+Macro.kURLDeviceDomain+Macro.kURLDeviceConfigGet,
        {deviceId:"CF2029A87083A6CC3B59CB4AD9F9ECA2",accessToken:"c452b642cb7744ac83f1ca5ec0735e63"});
        het.get(url, {},(res)=>{
            console.log(res);
        });
    },
    onGetDisplayData(){
        this.trigger(this.displayData);
    },
    onRepaint(data,type){
        $.extend(this.displayData,data);
        this.trigger(this.displayData);
    },
    onChangeColor(color){
        color = color.slice(1);
        let colorObj = {};
        let colorInt = parseInt(color,16);
        colorObj["red"] = colorInt>>16;
        colorObj["green"] = (colorInt&0x00ff00)>>8;
        colorObj["blue"] = (colorInt&0x0000ff);
        colorObj["updateFlag"] = 0x22;
        colorObj["mode"] = 3;

        // het.send(colorObj);
        // $.extend(this.displayData,colorObj);
        // this.trigger(this.displayData);
        this.sendObjAndTrig(colorObj);
    },
    onChangeMode(mode){
        let sendObj;
        if(mode === ModeState.ModeState1){
            sendObj = {"mode":ModeState.ModeState1,"updateFlag":2};
        }else if(mode === ModeState.ModeState3){
            sendObj = {"mode":ModeState.ModeState3,"brightness":50,"updateFlag":6};
        }
        this.sendObjAndTrig(sendObj);
    },
    onChangeBrightness(value){
        this.sendObjAndTrig({brightness:value,updateFlag:4});
    },
    onChangeMist(value){
        let sendObj = {mist:value,updateFlag:1};
        this.sendObjAndTrig(sendObj);
    },
    changeCloseTime(value){
        let timeCloseH = parseInt(value/60);
        let timeCloseM = parseInt(value%60);
        let sendObj = {timeCloseH:timeCloseH,timeCloseM:timeCloseM,updateFlag:8};
        this.sendObjAndTrig(sendObj);
    },
    onChangeSwitch(value){
        let sendObj = (value === 0)?{"brightness":100,"mist":MistState.MistStateHigh,"mode":ModeState.ModeState3,"updateFlag":0x07}:{"brightness":0,"mist":MistState.MistStateClose,"mode":ModeState.ModeState3,"updateFlag":0x07};
        this.sendObjAndTrig(sendObj);
    },
    onGetRecentlyColor(){
        let  colorStr = "#"+this.displayData["red"].toTwoHex()+this.displayData["green"].toTwoHex()+this.displayData["blue"].toTwoHex();
        this.trigger({colorStr:colorStr});
    },
    onChangeOrderInfo(dic){
        let color = dic["orderColor"];
        color = color.slice(1);
        color = parseInt(color,16);
        let presetRun = $.parseIntInvalidToZero(dic["presetRunTime"]);
        let sendObj = {"presetOpenH":$.parseIntInvalidToZero(dic["presetOpenH"]),
        "presetOpenM":$.parseIntInvalidToZero(dic["presetOpenM"]),
        "orderRed":(color>>16),"orderGreen":((color&0x00ff00)>>8),
        "orderBlue":(color&0x0000ff),
        "orderBrightness":$.parseIntInvalidToZero(dic["orderBrightness"]),
        "orderMist":$.parseIntInvalidToZero(dic["orderMist"]),
        "presetRuntimeH":parseInt(presetRun/60),
        "presetRuntimeM":parseInt(presetRun%60),
        "updateFlag":0x10};
        this.sendObjAndTrig(sendObj);
    },
    sendObjAndTrig(sendObj){

        het.send(sendObj,()=>{
            alert("succ");
        },()=>{
            alert("fail");
        });
        $.extend(this.displayData,sendObj);
        // console.log(this.displayData);
        this.trigger(this.displayData);
    }
});
