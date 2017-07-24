'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
import {Funs} from '../../../common/src/fun.es6';
let AppData={};
const OldData={};
//判断设备是否离线
const isOffline = ()=>{
    return (AppData.online==2);
}
// 判断是否关机状态
// const isShutdown = ()=>{
//     return (AppData.bootMode==16);
// };
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
        // if(typeof data.OperationWorkMode!=="undefined"&&data.OperationWorkMode !== AppData.OperationWorkMode) alert(JSON.stringify(data));
        AppData=Funs._extends(AppData,data);
        console.log(location.href+data.OperationWorkMode+data.FuntionSelect);
        // let errormsg = [];
        // if(data.TopNTCShort==1)  errormsg.push('xuesheng:顶部发热丝短路');
        // if(data.TopNTCOpen==1) errormsg.push('xuesheng:顶部发热开路');
        // if(data.BottomNTCShort==1)errormsg.push('底部发热丝短路');
        // if(data.BottomNTCOpen==1)errormsg.push('底部发热开路');
        // if(data.HighTemperature==1)errormsg.push('高温保护');
        // if(errormsg.length>0&&data.HighTemperature==0) {het.toast(errormsg.join(';'));}
        // if(errormsg.length>0&&data.HighTemperature==1){het.toast('xuesheng:高温保护');}
      
         // if(data.WorkReturnTimeHour)AppData.WorkReturnTimeHour=data.WorkReturnTimeHour;
    	// if(data.WorkReturnTimeMinute)AppData.WorkReturnTimeMinute=data.WorkReturnTimeMinute;
    	// if(data.OperationWorkMode)AppData.OperationWorkMode=data.OperationWorkMode;
     //    if(data.PresetTimehour)AppData.PresetTimehour=data.PresetTimehour;
     //    if(data.PresetTimeMinute)AppData.PresetTimeMinute=data.PresetTimeMinute;
     //    if(data.KouGanSheZhi)AppData.KouGanSheZhi=data.KouGanSheZhi;
     //    if(data.FuntionSelect)AppData.FuntionSelect=data.FuntionSelect;
     //    if(data.status)AppData.status=data.status;
     //    if(data.PresetTimeHour)AppData.PresetTimeHour=data.PresetTimeHour;
     //    if(data.PresetTimeMinute)AppData.PresetTimeMinute=data.PresetTimeMinute;
     //    if(data.PresetSet)AppData.PresetSet=data.PresetSet;
     //    if(data.networkavailable)AppData.networkavailable=data.networkavailable;
     //    if(data.online)AppData.online=data.online;
     //    if(data.TopNTCShort)AppData.TopNTCShort=data.TopNTCShort;
     //    if(data.HighTemperature)AppData.HighTemperature=data.HighTemperature;
        this.trigger(data);
    },
    // onTasteSwitch(){
    // 	AppData.Index = 2;
    // 	this.trigger({Index:2})
    // },
    onTasteChoose(index){
    	AppData.tasteIndex = index;
    	this.trigger({tasteIndex:AppData.tasteIndex});
    	AppData.KouGanSheZhi=index;
    },
  //   onClockSwitch(hour,minute){
  //       if(hour==0&& minute== 0){
  //       	AppData.hourIndex=0;
  //       	AppData.minuteIndex=0;
  //       	this.trigger({hourIndex:AppData.hourIndex,minuteIndex:AppData.minuteIndex});
		// }
  //   },
    onSelectTime(hour,minute){
    	AppData.hour=hour;
    	AppData.minute=minute;
		this.trigger({hour:AppData.hour,minute:AppData.minute});
	},
	onGetData(){
		this.trigger(AppData);
		
	},
	onWorkStyle(i){
		AppData.workIndex=i;
		this.trigger({workIndex:i});
	},
	onCalWork(){
        AppData.workIndex=null;
        AppData.status=0;
        AppData.OperationWorkMode=0;
        AppData.hour=null;
        AppData.minute=null;
        AppData.PresetTimehour=0;
        AppData.PresetTimeMinute=0;
        AppData.KouGanSheZhi=0;
        AppData.contentIndex=0;
        AppData.temperHour=0;
        AppData.temperMinute=0;
        AppData.PresetSet=0;
        AppData.FuntionSelect=0;
        AppData.WorkReturnTimeHour=0;
        AppData.WorkReturnTimeMinute=0;
        AppData.PresetTimeHour=0;
        AppData.PresetTimeMinute=0;
        AppData.updateFlag = het.hexUpFlag(5,1,2,het.hexUpFlag(0,1,2));
        // AppData.updateFlag=het.hexUpFlag(5,1,2)
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
        this.trigger({workIndex:AppData.workIndex,status:AppData.status,OperationWorkMode: AppData.OperationWorkMode,hour:AppData.hour,minute:AppData.minute,contentIndex:0,temperHour:AppData.temperHour,temperMinute:AppData.temperMinute,PresetTimeMinute:AppData.PresetTimehour,PresetTimeMinute:AppData.PresetTimeMinute,PresetSet:AppData.PresetSet,FuntionSelect:AppData.FuntionSelect,WorkReturnTimeHour:AppData.WorkReturnTimeHour,WorkReturnTimeMinute:AppData.WorkReturnTimeMinute,PresetTimeHour:AppData.PresetTimeHour,PresetTimeMinute:AppData.PresetTimeMinute});
    },
	onModeStart(workIndex,tasteIndex){
		AppData.status=1;
		AppData.contentIndex=1;
        AppData.PresetTimehour=0;
        AppData.PresetTimeMinute=0;
        AppData.PresetSet=0;
        AppData.FuntionSelect=workIndex;
        AppData.KouGanSheZhi='0'+tasteIndex;
        this.trigger({status:AppData.status,contentIndex:AppData.contentIndex})//为烹饪模式的UI界面
        this.trigger(AppData);
        //AppData.updateFlag = het.hexUpFlag(0,1,1,het.hexUpFlag(5,1,1));
       if(workIndex==5) { AppData.updateFlag = het.hexUpFlag(5,1,2,het.hexUpFlag(0,1,2))}
       else{ AppData.updateFlag = het.hexUpFlag(5,1,2)}
        
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
	},
	onWillStart(hour,minute,workIndex,tasteIndex){
		AppData.status=1;
		AppData.contentIndex=4;
        AppData.FuntionSelect=workIndex;
        AppData.PresetSet=1;
        AppData.PresetTimehour=hour;
        AppData.PresetTimeMinute=minute;
        AppData.KouGanSheZhi=tasteIndex;
		this.trigger({status:AppData.status,contentIndex:AppData.contentIndex})//为预约烹饪模式
        this.trigger(AppData);
        AppData.updateFlag = het.hexUpFlag(0,1,2,het.hexUpFlag(1,1,2,het.hexUpFlag(2,1,2,het.hexUpFlag(5,1,2,het.hexUpFlag(6,1,2)))));
        het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
	},
    onSetTmep(){
        AppData.OperationWorkMode=1;
        AppData.status=0;
        AppData.contentIndex=0;
        this.trigger({
            OperationWorkMode:AppData.OperationWorkMode,
            status:AppData.status,
            contentIndex:AppData.contentIndex
        })
    },
    // onWorkPattern(index){
    //     AppData.OperationWorkMode=index;
    //     AppData.status=0;
    //     this.trigger({OperationWorkMode:AppData.OperationWorkMode,
    //                   status:AppData.status  
    //     })
    // },
    onSetPattern(index){
        AppData.FuntionSelect=index;
        this.trigger({FuntionSelect:AppData.FuntionSelect});
        AppData.updateFlag = het.hexUpFlag(5,1,2);
         het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });

    },
    onHandleShakeSwitch(type){
        AppData.FuntionSelect=type;
        AppData.OperationWorkMode=type;
        if(type==5){
          AppData.KouGanSheZhi=3;
          AppData.updateFlag=het.hexUpFlag(5,1,2,het.hexUpFlag(0,1,2))  
        }
        AppData.updateFlag=het.hexUpFlag(5,1,2);
        this.trigger({OperationWorkMode:AppData.OperationWorkMode});
        this.trigger(AppData);
         het.send(AppData, function(data){
            // console.log(data)
        },function(data){
            het.toast("命令发送失败");
        });
    }


});