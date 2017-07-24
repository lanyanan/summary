'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

const AppData = {
};

const isFault = () => {
    if(AppData.networkavailable == 2){
        return '请检查网络';
    }
    if(AppData.online == 2){
        return '设备已离线';
    }
    return false;  
};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint: function(data){
        if(data.online) AppData.online = data.online;
        if(data.online == 2){data.boot = 1};
        if(data.networkavailable) AppData.networkavailable = data.networkavailable;
        if(data.wind){data.wind = data.wind%8;}
        if(data.remainTimeH || data.remainTimeL){
            AppData.remaintime = data.remainTime = +data.remainTimeH*256+(+data.remainTimeL);
        }
        if(data.windStall){AppData.windStall = data.windStall};
        if(data.tip) AppData.tip = data.tip;
        if(data.remainTime!=0){
            data.clockId = data.timingMode;
        }
        if(data.timingMode==3){
            data.clockId = 3;
        }
        this.trigger(data);
    },
    onSwitch:function(value) {
        if(isFault()){het.toast(isFault());return false};
		AppData.boot = value;
        if(AppData.timingMode==1 || AppData.timingMode==2){
            AppData.timingMode = 3;
            AppData.updateFlag = 3*256;
        }else{
            AppData.updateFlag = 1*256;
        }
        if(this.tclock) clearInterval(this.tclock);
        this.trigger({boot:value,clockId:3,remainTimeL:0,remainTimeH:0,remainTime:0,clockShow:3,wind:1,windStall:1,shookHead:1});
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    },
    onShakeSwitch:function(value) {
        if(isFault()){het.toast(isFault());return false};
        AppData.shookHead = value;
        AppData.updateFlag = 32*256;
        this.trigger({shookHead:value});
        het.send(AppData, function(data){
            // console.log(data)
        });
    },
    onClockSwitch:function(value,type) {
        if(isFault()){het.toast(isFault());return false};
        AppData.timingMode = value;
        if(value==3 && type !== 'cancel'){
            AppData.updateFlag = 2*256;
            this.trigger({clockId:value,clockShow:value,remainTime:0,remainTimeL:0,remainTimeH:0});
            het.send(AppData, function(data){
                // console.log(data)
            },function(data){
                het.toast("命令发送失败");
            }); 
        }else{
            this.trigger({clockId:value,clockShow:value,remainTime:0,remainTimeL:0,remainTimeH:0});
        }
    },
    onSelectTime:function(hour,minute) {
        if(isFault()){het.toast(isFault());return false};
        var remaintime = parseInt(hour*60)+parseInt(minute);
        AppData.tip = hour;
        AppData.remaintime = remaintime;
        AppData.updateFlag = 6*256;
        this.trigger({remainTime:remaintime,clockShow:3});
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
        // }
    },
    onSelectRate:function(value) {
        if(isFault()){het.toast(isFault());return false};
        AppData.windStall = value;
        AppData.updateFlag = 16*256;
        this.trigger({windStall:value});
        het.send(AppData, function(data){
            // console.log('调用了--onSelectRate')
        },function(data){
            het.toast("命令发送失败");
        });
    },
    onSelectRateValue:function(value){
        if(isFault()){het.toast(isFault());return false};
        AppData.windStall = value;
        // AppData.updateFlag = 16*256;
        this.trigger({windStall:value});
    },
    onSelectMode:function(value) {
        if(isFault()){het.toast(isFault());return false};
        var windStall = AppData.windStall;
        AppData.wind = value;
        AppData.updateFlag = 8*256;
        this.trigger({wind:value,windStall:windStall});
        // AppData.windStall = 0;
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    }
});