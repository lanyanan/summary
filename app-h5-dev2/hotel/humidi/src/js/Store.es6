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
import Path from './ApiPath.es6';
import {TipView,TipState} from './TipView.es6';

import {Funs} from '../../../common/src/fun.es6';

const deviceId = Funs.getUrlParam('deviceId');

const source = 8; // 来源

// 数据过滤计时器
let dataFilterTimers = {
    mode:0,
    blue:0,
    green:0,
    red:0,
    brightness:0,
    mist:0,
    timeCloseH:0,
    timeCloseM:0,
    remainingTimeH:0,
    remainingTimeM:0,

    /* 定时开启设置 */
    orderBlue:0,
    orderGreen:0,
    orderRed:0,
    orderBrightness:0,
    orderMist:0,
    presetOpenH:0,
    presetOpenM:0,
    remainPresetOpenH:0,
    remainPresetOpenM:0,
    
    presetRuntimeH:0,
    presetRuntimeM:0,
    remainPresetRuntimeH:0,
    remainPresetRuntimeM:0,
};

// 返回过滤后的数据
function dataFilter(data) {
    let time = (new Date).getTime();
    let result = {};
    for (let k in data) {
        if (typeof dataFilterTimers[k] !== 'undefined') {
            if (dataFilterTimers[k] < time) {
                dataFilterTimers[k] = 0;
                result[k] = data[k];
            }
        } else {
            result[k] = data[k];
        }
    }
    return result;
}

// 设置过滤器过期时间
function setDataTimer(...keys) {
    let time = (new Date).getTime() + 15e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}


export const Store = Reflux.createStore({
    data:{
        // 当前状态
        currState:{
            mode:ModeState.ModeState3,     // 模式
            color:'rgb(255,123,124)',                    // 颜色
            brightness:50,                      // 亮度
            mist:MistState.MistStateHalf,       // 雾化
            timeClose:30,                       // 定时
            timeRemain:30,
            switchState:false                  // flase是开机，true是关机
        },

        // 预约设置
        orderState:null,
        /*orderState:{
            hour:1,
            minute:10,
            color:'rgb(255,123,124)',
            brightness:50,
            mist:MistState.MistStateHalf,
            runTime:30
        },*/
        
        tipState:TipState.TipStateMistTip  // 提示
    },

    listenables: [Actions],

    // 获取数据源
    getData(){
        return this.data;
    },

    // 获取预约设置
    getOrder(){
        return this.data.orderState;
    },

    // 获取运行数据
    onGetRunData(){
        var url = `${Path.wPath}/wechat/hotel/device/data/get?deviceId=${deviceId}`;

        het.get(url, {}, (res)=>{
            res = JSON.parse(res);
            this.handleData(dataFilter(res.data));
            this.trigger(this.data);
        });
    },

    // 设置数据
    setData(data, callback){

        var url = `${Path.wPath}/wechat/hotel/device/config/set`,
            s = data.updateFlag.toString(16),
            postData;

        s = Array(8-s.length+1).join(0) + s;
        data.updateFlag = s;

        postData = {
            deviceId: deviceId,
            source: source,
            json: JSON.stringify(data)
        }

        console.log(JSON.stringify(postData));
        het.post(url, postData, (res)=>{
            res = JSON.parse(res);
            if (res.code===0) {
                callback && callback();
            }
        });
    },

    // 改变颜色
    onChangeColor(color){
        this.data.currState.color = color;

        color = color.match(/\((.*?)\)/)[1].split(',');
        
        var sendObj = {
            red: +color[0],
            green: +color[1],
            blue: +color[2],
            updateFlag: 0x22,
            mode: 3
        }

        setDataTimer('mode','red','green','blue');
        this.setData(sendObj);
        this.trigger(this.data);
    },

    // 改变模式
    onChangeMode(mode){
        let sendObj;

        if(mode === ModeState.ModeState1){
            sendObj = {"mode":mode,"updateFlag":0x02};
            setDataTimer('mode');
        }else if(mode === ModeState.ModeState3){
            sendObj = {"mode":mode,"brightness":50,"updateFlag":0x06};
            setDataTimer('mode','brightness');
            this.data.currState.brightness = 50;
        }

        this.data.currState.mode = mode;

        
        this.setData(sendObj);
        this.trigger(this.data);
    },

    // 改变亮度
    onChangeBrightness(value){
        this.data.currState.brightness = value;

        setDataTimer('brightness');
        
        this.brightTimer && clearTimeout(this.brightTimer);
        this.brightTimer = setTimeout(()=>{
            this.setData({brightness:value,updateFlag:4});
        },500)
        
        this.trigger(this.data);
    },

    // 改变雾化
    onChangeMist(value){
        this.data.currState.mist = value;

        setDataTimer('mist');
        this.setData({mist:value,updateFlag:1});
        this.trigger(this.data);
    },

    // 改变定时关闭时间
    changeCloseTime(value){
        var sendObj = {
            timeCloseH: parseInt(value/60),
            timeCloseM: parseInt(value%60),
            updateFlag: 8
        }

        this.data.currState.timeRemain = sendObj.timeCloseH*60 + sendObj.timeCloseM;

        setDataTimer('timeCloseH','timeCloseM','remainingTimeH','remainingTimeM');
        this.setData(sendObj);
        this.trigger(this.data);
    },

    onChangeOrderInfo(dic){
        var {hour, minute, color, brightness, mist, runTime} = dic,
            arr = color.match(/\((.*?)\)/)[1].split(',');

        this.data.orderState = dic;

        var sendObj = {
            presetOpenH: hour,
            presetOpenM: minute,
            orderRed: +arr[0],
            orderGreen: +arr[1],
            orderBlue: +arr[2],
            orderBrightness: brightness,
            orderMist: mist,
            presetRuntimeH: parseInt(runTime/60),
            presetRuntimeM: parseInt(runTime%60),
            updateFlag: 0x10
        }

        setDataTimer('presetOpenH','presetOpenM','orderRed','orderGreen','orderBlue','orderBrightness','orderMist','presetRuntimeH','presetRuntimeM');
        this.setData(sendObj);
        this.trigger(this.data);
    },

    // 开关设置
    onChangeSwitch(value){
        var obj, sendObj = {updateFlag: 0x07};

        obj = value ? {brightness:0, mist:MistState.MistStateClose, mode: ModeState.ModeState3} 
                    : {brightness:100, mist:MistState.MistStateHigh, mode: ModeState.ModeState3};

        $.extend(sendObj, obj);
        $.extend(this.data.currState, obj,{switchState:value});

        setDataTimer('brightness','mist','mode');
        this.setData(sendObj);
        this.trigger(this.data);
    },

    // 获取颜色
    onGetRecentlyColor(){
        this.trigger({colorStr:this.data.currState.color});
    },

    handleData(dic){
        // 提示控制
        if(dic.warring1 == 1){
            this.data.tipState = TipState.TipStateLackWater;

        }else if(this.data.tipState === TipState.TipStateLackWater){
            this.data.tipState = TipState.TipStateClose;
        }

        $.extend(this.data.currState, this.getCurrState(dic));
        var obj = this.getOrderState(dic)
        if(obj!==null) this.data.orderState = obj;
    },

    /* 获取当前状态 */
    getCurrState(dic){
        var curr = {/*mode:dic.mode, mist:dic.mist*/},
            {red, green, blue} = dic;

        
        if(dic.mode!==undefined) curr.mode = dic.mode;
        if(dic.mist!==undefined) curr.mist = dic.mist;
        if(dic.brightness!==undefined) curr.brightness = dic.brightness;

        if(red!==undefined&&green!==undefined&&blue!==undefined) 
            curr.color = `rgb(${red},${green},${blue})`;

        if(dic.timeCloseH!==undefined&&dic.timeCloseM!==undefined){
            curr.timeClose = dic.timeCloseH*60 + dic.timeCloseM;
            curr.timeRemain = dic.remainingTimeH*60 + dic.remainingTimeM;
        }

        if(dic.brightness!==undefined&&dic.mist!==undefined&&dic.mode!==undefined){
            curr.switchState = dic.brightness==0&&dic.mist==MistState.MistStateClose&&dic.mode==ModeState.ModeState3
        }

        return curr;
    },
 
    /* 获取预约设置 */
    getOrderState(dic){

        if(dic.orderRed===undefined) return null;

        var order, mistArr = ["关闭","大雾","小雾","睡眠"],
            {presetOpenH, presetOpenM, orderBrightness, orderMist} = dic,
            {orderRed, orderGreen, orderBlue} = dic;

        //有预约开机设置
        if ((presetOpenH*60+presetOpenM)>0 || orderBrightness>0 || orderMist>0) { 
            var color = `rgb(${orderRed},${orderGreen},${orderBlue})`;

            color === "rgb(0,0,0)" && (color === "rgb(255,255,255)")
                
            order = {
                hour:presetOpenH,
                minute:presetOpenM,
                color: color,
                brightness: orderBrightness,
                mist: orderMist
            }
        }

        return order;
    }
});
