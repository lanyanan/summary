'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
const AppData = {};
const OldData = {};

const isOffline = ()=>{
    return (AppData.online==2);
}
// 判断是否关机状态
const isShutdown = ()=>{
    return (AppData.S0!='01');
};
//判断手机是否断网
const isNetOff = ()=>{

    return (AppData.networkavailable==2);
};

const decToHex = (dec)=> {
    let hex = parseInt(dec).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        let index =0;
        if(data.S0) AppData.S0 = data.S0;
        if(data.S1) AppData.S1 = data.S1;
        if(data.S4) AppData.S4 = data.S4;
        if(data.S4) data.CD = parseInt(data.S4,16)*60;
        if(data.S3) AppData.S3 = data.S3;
        if(data.S2) {AppData.S2 = data.S2;}
        if(data.deviceName) {AppData.deviceName = data.deviceName;}
        if(data.S8) {AppData.S8 = data.S8;}
        if(data.networkavailable) {AppData.networkavailable = data.networkavailable;}
        if(data.online) AppData.online = data.online;
        if(data.S7) AppData.S7 = data.S7;
         
        AppData.S6 = data.S6 ? data.S6 : AppData.S6;
        AppData.S5 = data.S5 ? data.S5 : AppData.S5;
        data.S5 = data.S5 ? data.S5 : AppData.S5;
        data.S6 = data.S6 ? data.S6 : AppData.S6;
        // 设置计时器原点
        if (data.S4) {
            // 当不在主页面时，不允许刷新originPointTimer
            if (AppData.originPointTimer && location.hash.replace(/\?.+$/, '').length > 2) {
                data.originPointTimer = AppData.originPointTimer;
            } else {
                data.originPointTimer = parseInt(new Date().getTime() / 1000);
                AppData.originPointTimer = data.originPointTimer;
            }
        }
        this.trigger(data);

        if(parseInt(data.S4) == 0 && data.S3 !=0){
            AppData.S0 = '02';
            AppData.Updateflag1 = het.hexUpFlag(0,1,1);
            AppData.Updateflag2 = '00';
            het.send(AppData, function(data){
                // console.log(data)
            },function(data){
                het.toast("命令发送失败");
            });
        }
        
    },
    onGetData:function(){
        this.trigger(AppData);
    },
    onSetTime:function(m,s, ori){
        AppData.CD = m*60+s;
        AppData.S4 = decToHex(m);
        AppData.originPointTimer = ori;
    },
    onClockSwitch:function(value,type) {
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        if(isShutdown()){
            return false;
        }
        
        
        AppData.timingMode = value;
        if(value==3 && type !== 'cancel'){
            AppData.Updateflag1 = het.hexUpFlag(3,1,1);
            this.trigger({clockId:value,clockShow:value,remainTime:0,remainTimeL:0,remainTimeH:0});
            het.send(AppData, function(data){
                // console.log(data)
            },function(data){
                het.toast("命令发送失败");
            }); 
        }else{
            this.trigger({clockId:value,clockShow:value});
        }
    },
    onSelectTime:function(hour,minute) {
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        } 
        
        if(isShutdown()){
            return false;
        }
        AppData.S3 = '0'+Number(minute)/20;
        AppData.S4 = decToHex(minute);
        AppData.Updateflag1 = het.hexUpFlag(3,1,1);
        AppData.Updateflag2 = '00';
        // console.log('fffffffffffff',AppData);
        this.trigger({clockShow:3,remainSec:59, S4: '00', CD: 0});
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
        // }
    },
    onSwitchOpen: function(S0){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        if(isShutdown()){
            //AppData.S0 = '01';

            this.trigger({remainTime:0,remainSec:0,S2:'02',S8:AppData.S8});

        }else{
            //AppData.S0 = '02';
            this.trigger({S2:'02',remainTime:0,remainSec:0,S8:'01',S8:AppData.S8});
        }
        S0 =='02'?(AppData.S0='01',AppData.S3 =='00'):(AppData.S0 = '02');
        // AppData.S2 = '01';

        AppData.Updateflag1 = het.hexUpFlag(0,1,1);
        AppData.Updateflag2 = '00';
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });

    },
    onModelSel: function(value){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        if(isShutdown()){
            return false;
        }
        if(value =='1'){
            this.trigger({mode:value,'S1':'01'});
        }
        if (value == '2') {
           this.trigger({mode:value,'S1':'02'});
        }
        if (value == '3') {
            this.trigger({mode:value,'S1':'03'});
        }else{
            this.trigger({mode:value});
        }
        AppData.S1 = '0'+value;
        AppData.Updateflag1 = het.hexUpFlag(1,1,1);
        AppData.Updateflag2 = '00';
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
        
    },
    onDetection(){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        if(isShutdown()){
            return false;
        }
        AppData.S2 = '01';
        AppData.Updateflag1 = het.hexUpFlag(2,1,1);
        // console.log(AppData.S7,'777777777777');
        AppData.Updateflag2 = '00';
        //console.log('ooooooooooooooo',AppData);
        this.trigger({S2:'01'});
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    },
    onSwitch(boot){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        
        if(isShutdown()){
            AppData.S0 = '01';
            this.trigger({S0:'01'});

        }else{
            AppData.S0 = '02';
            this.trigger({S0:'02'});
        }
        AppData.Updateflag1 = het.hexUpFlag(0,1,1);
        AppData.Updateflag2 = '00';
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    },
    onHandleShakeSwitch(type){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        if(isShutdown()){
            return false;
        }
        if(!isShutdown()){
           if (type == '01') {
                AppData.S1 = '01';
                this.trigger({S1:'01'});
           }
           if (type == '02') {
                AppData.S1 = '02';
                this.trigger({S1:'02'});
           }
           if (type == '03') {
                AppData.S1 = '03';
                this.trigger({S1:'03'});
           }

        }
        

        AppData.Updateflag1 = het.hexUpFlag(1,1,1);
        AppData.Updateflag2 = '00';
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    },
    onRemainTimer(state,type){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        if(isShutdown()){
            return false;
        }
        // Object.assign(AppData,state);
        if(type=='get'){
            this.trigger(AppData);
        }else if(type=='set'){
            Object.assign(AppData,state);
        }
    },
    onRemainMin(lastTime,remainTime,remainSec,S0on){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        if(isShutdown()){
            return false;
        }
        AppData.lastTime = lastTime;
        AppData.remainTime = remainTime;
        AppData.remainSec = remainSec;
        AppData.S0 = S0on;
        this.trigger({lastTime:lastTime,remainTime:remainTime,remainSec:remainSec,S0:S0on});
    },
    onGetRemainMin(firstTime){
        if(isNetOff()){
            het.toast('网络连接失败，请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
        
        if(isShutdown()){
            return false;
        }
        if(!AppData.lastTime) return;
        let time = firstTime - AppData.lastTime;
        // console.log('time',time);
        if (time<0) return;
        let sectime = parseInt(time/1000);
        let min = AppData.remainTime - parseInt(sectime/60);
        let sec = AppData.remainSec - (sectime - parseInt(sectime/60)*60);
        if (sec<0) return;
        // console.log(time,min,sec);
        this.trigger({remainTime:min,remainSec:sec});
    },
    onGetRemainS0(){
        // console.log(AppData.S0);
        this.trigger({S0:AppData.S0});
    },
    onSetClose(){
        AppData.S0 = '02';
        AppData.Updateflag1 = het.hexUpFlag(0,1,1);
        AppData.Updateflag2 = '00';
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    }
});