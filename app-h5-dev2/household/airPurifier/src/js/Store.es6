'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 *
 * Updateflag1  第6位：开关键设置
 *				第7位：锁定键设置
 * Updateflag2	第0位：风速键设置 8
 * 				第1位：喷射键设置9
 *				第2位：预约定时关机时间键（小时）10
 *
 *Updateflag3	第3位：灯光键 19
 *
 * PM25SensorAlarm   PM2.5传感器故障
 * TempratureSensorAlarm  温度传感器故障
 * HumiditySensorAlarm  湿度传感器故障
 * LightSensorAlarm  光线传感器故障
 * 
 * */
import {Actions} from './Actions.es6';

const AppData = {};
let lockTimer=0; // 锁定 弹框计时器，防止操作过频繁
let controlTimer = 0;   //控制页面限制用户快速点击，中间时间间隔超过600ms才发送最后一次请求

//判断设备是否离线,是否断网 
const isRun = ()=>{
	let flag = true;
    if(parseInt(AppData.online)!= 1||AppData.online == undefined){
        het.toast('设备不在线');
		flag = false;	
    }
    if(parseInt(AppData.networkavailable) == 2){
        het.toast('请检查网络');
		flag = false;	
    }
    return flag;
}

// 判断是否关机状态
const isShutdown = ()=>{
	let flag = false;
    if(AppData.OnOffStatus == 1){
		flag = true;	
	}
    return flag;
};
// 判断是否锁定状态   2解锁
const isLock = ()=>{
	let flag = true;
	clearTimeout(lockTimer);
	lockTimer =  setTimeout(()=>{
		if(AppData.LockStatus === 1){
	   		het.toast('当前设备处于锁定状态，请解除后在操作');
		}
	},600);
	if(AppData.LockStatus === 1){
   		flag =false;
	}
    return flag;
};


export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
    	//console.log(data);
    	if(data.OnOffStatus) AppData.OnOffStatus = data.OnOffStatus;
    	if(data.LightStatus) AppData.LightStatus = data.LightStatus;
    	if(data.LockStatus) AppData.LockStatus = data.LockStatus;
    	if(data.online) AppData.online = data.online;
    	if(data.networkavailable) AppData.networkavailable = data.networkavailable;
    	if(data.FanSpeedStatus!=undefined){
	    	if(data.FanSpeedStatus == 0){
	    		this.trigger({speedOff:true});
	    	}else{
	    		this.trigger({speedOff:false});
	    	}
    	}

        this.trigger(data);
    },
    onSend(AppData){
        het.send(AppData, function(data){
	        // console.log(data)
	    },function(data){
            het.toast("命令发送失败");
        });
    },
    //按风速键时取消喷射功能
    onSelectSpeed(speedIndex){
    	clearTimeout(controlTimer);
    	controlTimer = setTimeout(()=>{
	    	if(isRun() && isShutdown() && isLock()){
	    		AppData.updateFlag = het.hexUpFlag(8,1,4,het.hexUpFlag(9));
		    	AppData.FanSpeedStatus = speedIndex ;
		    	AppData.SprayStatus = 2 ;
		        //五档（睡眠）与灯光互斥
		        if(speedIndex == "5" && AppData.LightStatus ==1){
			        this.trigger({FanSpeedStatus:speedIndex,SprayStatus:2,speedOff:false,LightStatus:2});
		        }else{
			        this.trigger({FanSpeedStatus:speedIndex,SprayStatus:2,speedOff:false});
		        }
		        this.onSend(AppData);
	    	}
    	},600);

    },
    //小页  按喷射键时取消风速功能
    onHandleSpray(isOn,speed){    	
    	clearTimeout(controlTimer);
    	controlTimer = setTimeout(()=>{
	    	if(isRun() && isShutdown() && isLock()){
				AppData.SprayStatus = isOn ;
	    		AppData.updateFlag = het.hexUpFlag(8,1,4,het.hexUpFlag(9));
				if(isOn===1){
					AppData.FanSpeedStatus = 0 ;
			   		this.trigger({SprayStatus:isOn,speedOff:true});
				}else{
			   		this.trigger({SprayStatus:isOn,speedOff:false,FanSpeedStatus:speed});
				}
		   		this.onSend(AppData);
	   		}
    	},600);
    },
    onStartup(status){
    	clearTimeout(controlTimer);
    	controlTimer = setTimeout(()=>{
		   	if(isRun() && isLock()){
	    		AppData.OnOffStatus = status ;
		    	AppData.updateFlag = het.hexUpFlag(6) ;
		        this.trigger({OnOffStatus:status}); 
		        this.onSend(AppData);
		    }
    	},600);
    },
    onSelectModes(index,isOn){
    	clearTimeout(controlTimer);
    	controlTimer = setTimeout(()=>{
		   	let _this = this;
		   	if(isRun()){
			   	if(index == '1'){
		   			AppData.LockStatus = isOn ;
				    AppData.updateFlag = het.hexUpFlag(7) ;
			   		this.trigger({LockStatus:isOn});
			        this.onSend(AppData);
			        return;
			   	}
		    	if(isShutdown() && isLock()){
				   	switch(index){
				   		case "2":
		   		    	AppData.updateFlag = het.hexUpFlag(10) ;
				   		_this.trigger({timeSelect:true});
				   		break;
				   		case "3"://灯光与风速五档（睡眠）互斥
				   		AppData.LightStatus = isOn ;  
			   		  	AppData.updateFlag = het.hexUpFlag(19) ;
				   		if(isOn === 1 && AppData.FanSpeedStatus == 5){
				   			_this.trigger({LightStatus:isOn,FanSpeedStatus:0,FanSpeedStatusOff:true});
				   		}else{
				   			_this.trigger({LightStatus:isOn});
				   		}
				   		this.onSend(AppData);
				   		break;
				   		case "4":
				   		//按喷射键时取消风速设定
						AppData.SprayStatus = isOn ;
		    			AppData.updateFlag = het.hexUpFlag(8,1,4,het.hexUpFlag(9));
						if(isOn===1){
							AppData.FanSpeedStatus = 0 ;
					   		_this.trigger({SprayStatus:isOn,FanSpeedStatus:"0"});
						}else{
					   		_this.trigger({SprayStatus:isOn});
						}
				   		this.onSend(AppData);
				   		break;
				   	}		
			   	}
		   	}
    	},600);

    },
    onCancelTime(){
    	if(isRun() && isShutdown() && isLock()){
			AppData.OffElapseTime = 0 ;
			this.trigger({OffElapseTime:"0",timeSelect:false});
	        this.onSend(AppData);
    	}
    },
    onSetTime(value){
    	if(isRun() && isShutdown() && isLock()){
			console.log('8888888',value);
			AppData.OffElapseTime = value ;
			this.trigger({OffElapseTime:value,timeSelect:false});
	        this.onSend(AppData);
    	}
    }
});