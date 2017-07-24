'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';

const AppData = {};
const OldData = {};
//判断设备是否离线
const isOffline = ()=>{
    return (AppData.online==2);
}
// 判断是否关机状态
const isShutdown = ()=>{
    return (AppData.bootMode==16);
};
//判断手机是否断网
const isNetOff = ()=>{
    return (AppData.networkavailable==2);
};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint: function(data){
        if(data.online)AppData.online = data.online;
        if(data.online == 2){data.bootMode = 16};
        if(data.networkavailable)AppData.networkavailable = data.networkavailable;
        if(data.bootMode)AppData.bootMode = data.bootMode;
        if(data.timeMode){
            AppData.timeMode = data.timeMode;
        }else{
            data.timeMode = AppData.timeMode;
        }
        this.trigger(data);
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
		if(isShutdown()){
			// 关机状态，开机
            AppData.updateFlag = 4096;
		    AppData.bootMode = 1;
		    AppData.childLockMode=1;
		    AppData.negativeIonSetup=16;
		    AppData.timeMode=25;
		    AppData.uvMode=1;
		    AppData.pattern=1;
		    AppData.returnRestTime=0;
		    this.trigger(AppData);
		}else{
			AppData.updateFlag = 4096;
		    AppData.bootMode = 16;
		    this.trigger(AppData);
		}
	    het.send(AppData, function(data){
	        // console.log(data)
	    },function(data){
            het.toast("命令发送失败");
        });
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
	    AppData.updateFlag = 32768;
	    AppData.pattern = value;
	    this.trigger({pattern:value});
	    het.send(AppData, function(data){
	        // console.log(data)
	    },function(data){
            het.toast("命令发送失败");
        });
	},
	onToggleTimeClock: function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            this.trigger({timeMode:25,returnRestTime:0});
            return;
        }
		AppData.updateFlag = 1;
	    AppData.timeMode = value;
        var truevalue = (value==25)? 0 : value*60;
	    this.trigger({timeMode:value,returnRestTime:truevalue});
	    het.send(AppData, function(data){
	        // console.log(data)
	    },function(data){
            het.toast("命令发送失败");
        });
	},
	onToggleTimeId:function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
		if(isOffline()){
            het.toast('设备不在线');
            this.trigger({timeMode:25,returnRestTime:0});
            return;
        }
        AppData.timeMode = value;
        this.trigger({timeMode:value});
	},
	onToggleUV: function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
		AppData.updateFlag = 256;
        AppData.uvMode = value;
        this.trigger({uvMode:value});
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
	},
	onToggleAnion: function(value){
        if(isNetOff()){
            het.toast('请检查网络');
            return;
        }
        if(isOffline()){
            het.toast('设备不在线');
            return;
        }
		AppData.updateFlag = 512;
        AppData.negativeIonSetup = value;
        this.trigger({negativeIonSetup:value});
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
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
		AppData.updateFlag = 2048;
        AppData.childLockMode = value;
        this.trigger({childLockMode:value});
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
	},
});