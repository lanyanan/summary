'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * 额 此设备数据  1为非 2为真 叼啊
 * @type {store}
 *Byte0 返回开关机状态
Byte1   返回缺水报警状态
Byte2   返回离开模式状态
Byte3   返回童锁状态
Byte4   返回工作模式状态
Byte5   返回风速状态
Byte6   预约剩余时间
Byte7   返回缺水报警声状态

 * 
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

const AppData = {};
const domain = het.getHost();
// const domain = 'http://api.clife.cn';
const postCtrlUrl =`${domain}/v1/device/config/set`; // 下发设备控制数据接口 


// 数据过滤计时器
let dataFilterTimers = {
    boot : 0,
    childLock:0,
    reservationTime:0,
    wind:0,
    leave:0,
    thirstVoice:0,
    work:0,
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
    let time = (new Date).getTime() + 10e3; // 10秒内不接收新数据
    for (let i in keys) {
        dataFilterTimers[keys[i]] = time;
    }
}

//判断设备是否离线
const isOffline = ()=>{
    return (AppData.online==2);
}
//判断手机是否断网
const isNetOff = ()=>{
    return !navigator.onLine;
};


        
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint: function(dt){
        let data = dataFilter(dt);
        if(data.online)AppData.online = data.onlineStatus;
        if(data.boot)AppData.boot = data.boot;
        if(data.leave)AppData.leave = data.leave;
        if(data.reservationTime)AppData.reservationTime = data.reservationTime;
        if(data.thirstVoice)AppData.thirstVoice = data.thirstVoice;
        if(data.childLock)AppData.childLock = data.childLock;
        if(data.work) AppData.work = data.work;
        if(data.wind)AppData.wind = data.wind;
  
       
        this.trigger(data);
        // console.log(data);

    },
    /* 
    * @param    {json}     data        发送的数据，要求json格式
    * @param    {integer}  needArg    接口是否需要参数拼接，0-需要，1-不需要
    */
    onGetData(url,needArg,data) {
        let _this = this;

        het.get(url, (data?data:''), function(response) {
            const result = JSON.parse(response);
            if(result.code == 100022006 ){
                AppData.online =2;
                //het.toast("错误信息："+result.msg);
            }else if(result.code == 0){
                AppData.online =1;
            } 
            _this.onRepaint(result.data);

        }, function(response) {
            het.toast(result.msg);
        },needArg); 

    },
    onSend(AppData){
        het.post(postCtrlUrl, AppData, function(response) {
            const result = JSON.parse(response);
            //result.code === 0 ? console.log('下发成功') : console.log(`下发失败,原因:${result.msg}`);
        }, function(responseTxt) {
            het.toast(responseTxt);
        });
    },
    onSwitch:function(){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
		let boot = AppData.boot;
        AppData.boot = boot==1?2:1;
        AppData.updateFlag = het.hexUpFlag(8,1,2);
        setDataTimer('boot');
        this.trigger(AppData);
	    this.onSend(AppData);
	},
	onSelectAny:function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        if(value==2){//睡眠档 风速只能选择静音
            AppData.wind = 2;
        }
	    AppData.updateFlag = het.hexUpFlag(12,1,2);
	    AppData.work = value;
        setDataTimer('work','wind');
	    this.trigger({work:value,wind:AppData.wind});
	    this.onSend(AppData);
	},
    onToggleStrong: function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        AppData.updateFlag = het.hexUpFlag(10,1,2);
        AppData.leave = value;
        setDataTimer('leave');
        this.trigger({leave:value});
        this.onSend(AppData);
    },
	onToggleAlarm: function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        AppData.updateFlag = het.hexUpFlag(15,1,2);
        AppData.thirstVoice = value;
        setDataTimer('thirstVoice');
        this.trigger({thirstVoice:value});
        this.onSend(AppData);
	},
	onSelectSpeed: function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        if(AppData.work==2){
            het.toast('睡眠模式下不能选择风速哦');
            return false;
        }
        AppData.updateFlag = het.hexUpFlag(13,1,2);
        AppData.wind = value;
        setDataTimer('wind');
        this.trigger({wind:value});
        this.onSend(AppData);
	},
    onChildLock:function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        AppData.updateFlag = het.hexUpFlag(11,1,2);
        AppData.childLock = value;
        setDataTimer('childLock');
        this.trigger({childLock:value});
        this.onSend(AppData);
    },
	onBookTime:function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
		if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        AppData.updateFlag = het.hexUpFlag(14,1,2);
        AppData.reservationTime = value;
        setDataTimer('reservationTime');
        this.trigger({reservationTime:value});
        this.onSend(AppData);
	}
});