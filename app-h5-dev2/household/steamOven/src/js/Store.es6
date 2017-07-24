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
// const AppData.networkavailable==2 = ()=>{
//     return (AppData.online==2);
// }

// //判断手机是否断网
// const isNetOff = ()=>{
//     return (AppData.networkavailable==2);
// };
const decToHex = (dec)=> {
    let hex = parseInt(dec).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};
// 返回过滤后的数据
let dataFilterTimers = {
   'setTemperatureLow':0,
   'remainingTimeHour':0,
   'remainingTimeMin':0,
   'Mode':0,
   'reservationhour':0,
   'reservationmin':0,
};
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

export const Store = Reflux.createStore({
    listenables: [Actions],
     onRepaint(datas){
      //开启数据筛选
      let data = dataFilter(datas);
     	if(AppData.returnRepaint === true) return;
      if(data.end==1)data.defineWork==false;
       AppData=Funs._extends(AppData,data);

       this.trigger(data);
    },
    onRename(value){
    	 if(AppData.online==2){
             het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
          
             het.toast('请检查网络');
            return;
        }
    	AppData.value=value;
    	this.trigger({value:AppData.value});
    },
    onGetData(){
    
		this.trigger(AppData);
		
	},
   onSelectTime(hour,minute){
   	 if(AppData.online==2){
            het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
           het.toast('请检查网络');
           
            return;
        }
   	AppData.temperature=hour;
   	AppData.time=minute;
   	this.trigger({temperature:AppData.temperature,time:	AppData.time})
   },
   onOrderTime(h,m){
   	 if(AppData.online==2){
        het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
           het.toast('请检查网络');
           return;
        }
   	AppData.orderHour=h;
   	AppData.orderMinute=m;
   	this.trigger({orderHour:AppData.orderHour,orderMinute:AppData.orderMinute})
   },
   onWorkStyle(mode,tem,time,hour,minute){
   
     AppData.defineWork=false;
    AppData.returnRepaint = true;
    setTimeout(()=>{
       AppData.returnRepaint = false;
    }, 15000);
  setDataTimer('setTemperatureLow','remainingTimeHour','remainingTimeMin','Mode','reservationhour','reservationmin')
   	 if(AppData.online==2){
             het.toast('设备不在线');
          
            return;
        }
      if(AppData.networkavailable==2){
             het.toast('请检查网络');
            return;
        }
    switch(mode.length){
   		 case 1:
             AppData.mode=mode[0];
             AppData.temperatureHigh=0;
             AppData.temperatureLow=tem[0];
             AppData.timerHour=parseInt(parseInt(time[0])/60);
             AppData.timerMin=parseInt(time[0])%60;
             AppData.Mode=mode[0];
             AppData.remainingTimeHour=parseInt(parseInt(time[0])/60);
             AppData.remainingTimeMin=parseInt(time[0])%60;
             AppData.mode1=0;
             AppData.mode2=0;
             AppData.timerHour1=0;
             AppData.timerHour2=0;
             AppData.timerMin1=0;
             AppData.timerMin2=0;
             AppData.temperatureHigh1=0;
             AppData.tempertatureHigh2=0;
             AppData.temperatureLow1=0;
             AppData.temperatureLow2=0;
             AppData.features=1;
             AppData.start=1;
             AppData.power=1;
             AppData.setTemperatureLow=tem[0];
             if(hour==0&&minute==0){
             AppData.reservationHour=0;
             AppData.reservationMin=0;
            this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,Mode:AppData.Mode})
              let arr1 = [0,1,6,7,11,12,19,20];
              AppData.updateFlag = 0;
             for(let key=0;key<arr1.length;key++){
             	AppData.updateFlag = het.hexUpFlag(arr1[key],1,6,AppData.updateFlag);
             }
             this.trigger(AppData);	
             het.send(AppData, function(data){
          
               },function(data){
               het.toast("命令发送失败");
        	});
           }
            else{
             AppData.reservationHour=parseInt(hour)+parseInt(parseInt(time[0])/60);
             AppData.reservationMin=parseInt(minute)+parseInt(time[0])%60;
             AppData.reservationhour=parseInt(hour)+parseInt(parseInt(time[0])/60);
             AppData.reservationmin=parseInt(minute)+parseInt(time[0])%60;
             this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,reservationHour:AppData.reservationHour,reservationMin:AppData.reservationMin,reservationhour:AppData.reservationhour,reservationmin:AppData.reservationmin,Mode:AppData.Mode})
             let arr1 = [0,1,4,5,6,7,11,12,19,20];
              AppData.updateFlag = 0;
             for(let key=0;key<arr1.length;key++){
             	AppData.updateFlag = het.hexUpFlag(arr1[key],1,6,AppData.updateFlag);
             }
             this.trigger(AppData);	
             het.send(AppData, function(data){
          
               },function(data){
               het.toast("命令发送失败");
        	});
             
             }  

             break;
        case 2:
        	   AppData.mode=mode[0];
   			     AppData.mode1=mode[1];
   	         AppData.temperatureHigh=0;
   	         AppData.tempertatureHigh1=0;
   	         AppData.temperatureLow=tem[0];
         	   AppData.temperatureLow1=tem[1];
   	         AppData.timerHour=parseInt(parseInt(time[0])/60);
   	         AppData.timerHour1=parseInt(parseInt(time[1])/60);
             AppData.timerMin=parseInt(time[0])%60;
             AppData.timerMin1=parseInt(time[1])%60;
             AppData.reservationHour=hour;
             AppData.reservationMin=minute;
             AppData.Mode=mode[0];
             AppData.features=2;
             AppData.start=1;
             AppData.setTemperatureLow=tem[0];
             AppData.remainingTimeHour=parseInt(parseInt(time[0])/60);
             AppData.remainingTimeMin=parseInt(time[0])%60;
           	 AppData.power=1;
        	 if(hour==0&&minute==0){
        	   AppData.reservationHour=0;
             AppData.reservationMin=0;
             this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,Mode:AppData.Mode})	
              AppData.updateFlag = 0;
             let arr2 = [0,1,6,7,8,11,12,13,14,16,19,20,21,22]
             for(let key=0;key<arr2.length;key++){
             	AppData.updateFlag = het.hexUpFlag(arr2[key],1,6,AppData.updateFlag);
             	}
               	this.trigger(AppData);
              	het.send(AppData, function(data){
           
               	},function(data){
               	het.toast("命令发送失败");
             });
              }
              else{
              	 AppData.updateFlag = 0;
              	 AppData.reservationHour=parseInt(hour)+parseInt(parseInt(time[0])/60)
                 AppData.reservationMin=parseInt(minute)+parseInt(time[0])%60;
                 AppData.reservationhour=parseInt(hour)+parseInt(parseInt(time[0])/60)+parseInt(parseInt(time[1])/60);
                 AppData.reservationmin=parseInt(minute)+parseInt(time[0])%60+parseInt(time[1])%60;
              	 this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,reservationHour:AppData.reservationHour,reservationMin:AppData.reservationMin,reservationhour:AppData.reservationhour,reservationmin:AppData.reservationmin,Mode:AppData.Mode})
              	let arr2 = [0,1,4,5,6,7,8,11,12,13,14,16,19,20,21,22]
             	for(let key=0;key<arr2.length;key++){
             	AppData.updateFlag = het.hexUpFlag(arr2[key],1,6,AppData.updateFlag);
             	}
               	this.trigger(AppData);
              	het.send(AppData, function(data){
           
               	},function(data){
               	het.toast("命令发送失败");
             });
              	
              }  
              break;
         case 3:
             AppData.mode=mode[0];
   			     AppData.mode1=mode[1];
   			     AppData.mode2=mode[2];
   	         AppData.temperatureHigh=0;
   	         AppData.tempertatureHigh1=0;
   	         AppData.tempertatureHigh2=0;
   	         AppData.temperatureLow=tem[0];
         	   AppData.temperatureLow1=tem[1];
         	   AppData.temperatureLow2=tem[2];
   	         AppData.timerHour=parseInt(parseInt(time[0])/60);
   	         AppData.timerHour1=parseInt(parseInt(time[1])/60);
   	         AppData.timerHour2=parseInt(parseInt(time[2])/60);
             AppData.timerMin=parseInt(time[0])%60;
             AppData.timerMin1=parseInt(time[1])%60;
             AppData.timerMin2=parseInt(time[2])%60;
             AppData.reservationHour=hour;
             AppData.reservationMin=minute;
             AppData.updateFlag = 0;
             AppData.Mode=mode[0];
             AppData.remainingTimeHour=parseInt(parseInt(time[0])/60);
             AppData.remainingTimeMin=parseInt(parseInt(time[0])%60);
             AppData.features=2;
             AppData.updateFlag = 0;
             AppData.start=1;
             AppData.setTemperatureLow=tem[0];
             AppData.reservationhour=hour;
             AppData.reservationmin=minute;
             AppData.power=1;
             if(hour==0&&minute==0){
             AppData.reservationHour=0;
             AppData.reservationMin=0;
             this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,Mode:AppData.mode})
             AppData.updateFlag = 0;	
             let arr = [0,1,6,7,8,9,11,12,13,14,15,16,19,20,21,22,23,24]
             for(let key=0;key<arr.length;key++){
             	AppData.updateFlag = het.hexUpFlag(arr[key],1,6,AppData.updateFlag);
             }
            this.trigger(AppData);
                het.send(AppData, function(data){
           
               },function(data){
               het.toast("命令发送失败");
             });
           }
             else{
              	 AppData.updateFlag = 0;
              	 AppData.reservationHour=parseInt(hour)+parseInt(parseInt(time[0])/60);
                 AppData.reservationMin=parseInt(minute)+parseInt(time[0])%60;
                 AppData.reservationhour=parseInt(hour)+parseInt(parseInt(time[0])/60);
                 AppData.reservationmin=parseInt(minute)+parseInt(time[0])%60;
              	 this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,reservationHour:AppData.reservationHour,reservationMin:AppData.reservationMin,reservationhour:AppData.reservationhour,reservationmin:AppData.reservationmin,Mode:AppData.Mode})
              	let arr2 = [0,1,4,5,6,7,8,11,12,13,14,16,19,20,21,22,23,24]
             	for(let key=0;key<arr2.length;key++){
             	AppData.updateFlag = het.hexUpFlag(arr2[key],1,6,AppData.updateFlag);
             	}
               	this.trigger(AppData);
              	het.send(AppData, function(data){
           
               	},function(data){
               	het.toast("命令发送失败");
             });
              	
              }        
           default:
               
                break;     
   	}
   	
   },
   onTurn(nowper){
   
   	     if(AppData.online==2){
            het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
           
             het.toast('请检查网络');
            return;
        }
   		AppData.power=nowper;
   		this.trigger({power:AppData.power});
   		AppData.updateFlag=het.hexUpFlag(0,1,6);
   		het.send(AppData, function(data){
            
               },function(data){
               het.toast("命令发送失败");
             });
   		},
   	onTurnLight(light){
   		if(AppData.online==2){
            het.toast('请检查网络');
            return;
        }
        if(AppData.networkavailable==2){
            het.toast('设备不在线');
            return;
        }
   		AppData.ovenled=light;
   		AppData.updateFlag=het.hexUpFlag(2,1,6);
   		this.trigger(AppData);
   		het.send(AppData, function(data){
            
               },function(data){
               het.toast("命令发送失败");
             });

   	},
   	onStop(stop){
   		 if(AppData.online==2){
             het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
           het.toast('请检查网络');
          

            return;
        }
   		AppData.start=stop;
   		AppData.updateFlag=het.hexUpFlag(1,1,6);
   		this.trigger(AppData);
   		het.send(AppData, function(data){
             
               },function(data){
               het.toast("命令发送失败");
             });
   	},	
   onSethumidity(mode){
   	if(AppData.online==2){
            het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
           het.toast('请检查网络');
           
            return;
        }
   	AppData.humidityControl=mode;
   	AppData.updateFlag=het.hexUpFlag(3,1,6);
   	this.trigger({humidityControl:AppData.humidityControl});
   	het.send(AppData, function(data){
            
               },function(data){
               het.toast("命令发送失败");
             });
   },
   onCalWork(){
     
   	  AppData.returnRepaint = true;
    	setTimeout(()=>{
   		AppData.returnRepaint = false;
   	},15000);//防止数据对界面引起的跳变
   setDataTimer('Mode');
   	    if(AppData.online==2){
           het.toast('设备不在线');
          
            return;
        }
        if(AppData.networkavailable==2){
             het.toast('请检查网络');
            return;
        }
   		AppData.power=1;
   		AppData.ovenled=3;
   		AppData.mode=0;
   		AppData.mode1=0;
   		AppData.mode2=0;
   		AppData.temperatureHigh=0;
   		AppData.tempertatureHigh1=0;
   		AppData.tempertatureHigh2=0;
   		AppData.features=3;
   		AppData.reservationHour=0;
   		AppData.reservationMin=0;
   		AppData.timerHour=0;
   		AppData.timerHour1=0;
   		AppData.timerHour2=0;
   		AppData.timerMin=0;
   		AppData.timerMin1=0;
   		AppData.timeMin2=0;
   		AppData.temperatureLow=0;
   		AppData.temperatureLow1=0;
   		AppData.temperatureLow2=0;
   		AppData.humidityControl=0;
   		AppData.Mode=0;
      AppData.reservationhour=0;
   		AppData.reservationmin=0;
   		AppData.restart=false;
      AppData.defineWork=false;
      this.trigger({defineWork:AppData.defineWork}) 
   	  // AppData.start=16;
   		this.trigger({Mode:AppData.Mode,mode:AppData.mode,start:AppData.start,mode:AppData.mode});
   	 	let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,19,20,21,22,23,24]
             for(let key=0;key<arr.length;key++){
             	AppData.updateFlag = het.hexUpFlag(arr[key],1,2,AppData.updateFlag);
             }
        this.trigger(AppData);
        het.send(AppData, function(data){
             console.log(data)
               },function(data){
               het.toast("命令发送失败");
             });     

   },
   onResetTime(h,m){
   	    AppData.returnRepaint = true;
      setTimeout(()=>{
      AppData.returnRepaint = false;
    },15000);//防止数据对界面引起的跳变
   setDataTimer('remainingTimeHour','reservationmin');
   	 if(AppData.online==2){
            het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
           het.toast('请检查网络');
           
            return;
        }
   	 AppData.timerHour=h;
   	 AppData.timerMin=m;
   	 AppData.updateFlag=het.hexUpFlag(19,1,4,het.hexUpFlag(20,1,6));
   	 AppData.remainingTimeHour=h;
   	 AppData.remainingTimeMin=m;
   	 this.trigger({timerHour:AppData.timerHour,timerMin:AppData.timerMin,remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin})
   	 het.send(AppData, function(data){
             
               },function(data){
               het.toast("命令发送失败");
             });
   },
   onStartWork(pattern,tem){
      

   	 if(AppData.online==2){
            het.toast('设备不在线');
            return;
        }
        if(AppData.networkavailable==2){
           het.toast('请检查网络');
           
            return;
        }
   	AppData.mode=pattern;
    AppData.temperatureHigh=0;
    AppData.temperatureLow=tem;
    AppData.timerHour=0;
    AppData.timerMin=20;
    AppData.features=1;
    AppData.start=1;
    AppData.Mode=pattern;
    AppData.remainingTimeHour=0;
    AppData.remainingTimeMin=20;
    AppData.power=1;
    this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,Mode:AppData.Mode})
    let arr= [0,1,6,7,11,12,19,20];
     AppData.updateFlag = 0;
      for(let key=0;key<arr.length;key++){
      AppData.updateFlag = het.hexUpFlag(arr[key],1,6,AppData.updateFlag);
    }
     het.send(AppData, function(data){
             
       },function(data){
          het.toast("命令发送失败");
             
        });  
    },
    onPullData(){
         let deviceId=AppData.deviceId;
         let data={
            "deviceId":deviceId
         }
    	  let _this=this;
        let url='/v1/app/customization/royalstar/getModeList' ;
        let sucCallback=function(data){
          let res=JSON.parse(data);
             if(res.code==0)
              { 
             
              _this.trigger({modeArr:res.data.list,rePull:1});

                }
            else{het.toast(res.msg)};  
           };
       let errCallback=function(data){
            het.toast('网络异常或设备不在线');
          };
        het.get(url,data,sucCallback,errCallback);
    },
    onModeData(){
      let deviceId=AppData.deviceId;
      let data={
         "deviceId":deviceId
      }
      let url='/v1/app/customization/royalstar/getModeCount';
      let _this=this;
      let sucCallback=function(data){
        let res=JSON.parse(data);
        if(res.code==0){
        
         _this.trigger({modedata:res.data,rePull:1});
        }
        else{het.toast(res.msg)};
      };
     let errCallback=function(data){
            het.toast('网络异常或设备不在线');
      };
      het.get(url,data,sucCallback,errCallback); 
    },
    onSaveMode(mode,tem,time,value){
      let deviceId=AppData.deviceId;
      let url1='/v1/app/customization/royalstar/delUselessMode';
      let data1={
         "deviceId":deviceId
      }
      let sucCallback=function(data){
        
        let res=JSON.parse(data);
      if(res.code==0){
        let stepList;
        switch (mode.length) {
        case 1:
        stepList=JSON.stringify([{'modeType':mode[0],'temp':tem[0],'minutes':time[0]}]);
        break;
        case 2:
        stepList=JSON.stringify([{'modeType':mode[0],'temp':tem[0],'minutes':time[0]},{'modeType':mode[1],'temp':tem[1],'minutes':time[1]}]);  
          break;
        case 3:
         stepList=JSON.stringify([{'modeType':mode[0],'temp':tem[0],'minutes':time[0]},{'modeType':mode[1],'temp':tem[1],'minutes':time[1]},{'modeType':mode[2],'temp':tem[2],'minutes':time[2]}]);   
        break;    
        default:
         break;
      }
      let url='/v1/app/customization/royalstar/addMode';
      let data={
          "deviceId":deviceId,
          'stepList':stepList,
          'modeName':value
      };

      let sucCallback1=function(data){
         let res=JSON.parse(data);
        if(res.code==0){
         
        }
        else{het.toast(res.msg)};
      }
      let errCallback1=function(data){
            het.toast('网络异常或设备不在线');
        };
     het.get(url,data,sucCallback1,errCallback)
     }
        else{het.toast(res.msg)};
    }
      let errCallback=function(data){
            het.toast('网络异常或设备不在线');
      };
     
     het.get(url1,data1,sucCallback,errCallback);
      
    },
    
    onDeleteMode(mode){
      let url='/v1/app/customization/royalstar/delMode';
      let deviceId=AppData.deviceId;
      let data={
           "deviceId":deviceId,
           'modeId':mode
      };
      let _this=this;
      let sucCallback=function(data){
        let res=JSON.parse(data);
        if(res.code==0){
         _this.trigger({rePull:res.code});
          // alert('进来了没？')
          
        
        

        }
      else{het.toast(res.msg)};
      }
      let errCallback=function(data){
            het.toast('网络异常或设备不在线');
           
      };
    het.get(url,data,sucCallback,errCallback);
    },
    onRedefine(modeId,name){
      let url='/v1/app/customization/royalstar/updataMode';
      let deviceId=AppData.deviceId;
      let data={
        'deviceId':deviceId,
        'modeId':modeId,
        'modeName':name
      }
      
      let sucCallback=function(data){
      let res=JSON.parse(data);
        if(res.code==0){
         
        }
        else{het.toast(res.msg)};
      }
     let errCallback=function(data){
            het.toast('网络异常或设备不在线');
           
      };
      het.get(url,data,sucCallback,errCallback);
    },
    onBegainWork(modeArr){
      if(AppData.online==2){
            het.toast('请检查网络');
            return;
        }
        if(AppData.networkavailable==2){
            het.toast('设备不在线');
            return;
        }
      AppData.defineWork=true;
      this.trigger({defineWork:AppData.defineWork}) 
      this.trigger(AppData) 
      AppData.returnRepaint = true;
    setTimeout(()=>{
      AppData.returnRepaint = false;
    }, 15000);   
     switch(modeArr.length){
        case 1:
             AppData.mode=modeArr[0].modeType;
             AppData.temperatureHigh=0;
             AppData.temperatureLow=modeArr[0].temp;
             AppData.timerHour=parseInt(parseInt(modeArr[0].minutes)/60);
             AppData.timerMin=parseInt(modeArr[0].minutes)%60;
             AppData.Mode=modeArr[0].modeType;
             AppData.remainingTimeHour=parseInt(parseInt(modeArr[0].minutes)/60);
             AppData.remainingTimeMin=parseInt(modeArr[0].minutes)%60;
             AppData.features=1;
             AppData.start=1;
             AppData.power=1;
             AppData.setTemperatureLow=modeArr[0].temp;
             AppData.updateFlag = 0;
             AppData.reservationHour=0;
             AppData.reservationMin=0;
             this.trigger(AppData); 
            
             let arr1 = [0,1,6,7,11,12,19,20];  
             for(let key=0;key<arr1.length;key++){
              AppData.updateFlag = het.hexUpFlag(arr1[key],1,6,AppData.updateFlag);
             }
            het.send(AppData, function(data){
              
           },function(data){
            het.toast("命令发送失败");
             
        });  
           
          break;
        case 2:
             AppData.mode=modeArr[0].modeType;
             AppData.mode1=modeArr[1].modeType;
             AppData.temperatureHigh=0;
             AppData.tempertatureHigh1=0;
             AppData.temperatureLow=modeArr[0].temp;
             AppData.temperatureLow1=modeArr[1].temp;
             AppData.timerHour=parseInt(parseInt(modeArr[0].minutes)/60);
             AppData.timerHour1=parseInt(parseInt(modeArr[1].minutes)/60);
             AppData.timerMin=parseInt(modeArr[0].minutes)%60;
             AppData.timerMin1=parseInt(modeArr[1].minutes)%60;
             AppData.Mode=modeArr[0].modeType;
             AppData.features=2;
             AppData.start=1;
             AppData.setTemperatureLow=modeArr[0].temp;
             AppData.remainingTimeHour=parseInt(parseInt(modeArr[0].minutes)/60);
             AppData.remainingTimeMin=parseInt(modeArr[0].minutes)%60;
             AppData.power=1;
             AppData.reservationHour=0;
             AppData.reservationMin=0;
             this.trigger(AppData);
             let arr2 = [0,1,6,7,8,11,12,13,14,16,19,20,21,22]
             AppData.updateFlag = 0;
             for(let key=0;key<arr2.length;key++){
              AppData.updateFlag = het.hexUpFlag(arr2[key],1,6,AppData.updateFlag);
              }
              het.send(AppData, function(data){
                },function(data){
                het.toast("命令发送失败");
             });
          break;
        case 3:
             AppData.mode=modeArr[0].modeType;
             AppData.mode1=modeArr[1].modeType;
             AppData.mode2=modeArr[2].modeType;
             AppData.temperatureHigh=0;
             AppData.tempertatureHigh1=0;
             AppData.tempertatureHigh2=0;
             AppData.temperatureLow=modeArr[0].temp;
             AppData.temperatureLow1=modeArr[1].temp;
             AppData.temperatureLow2=modeArr[2].temp;
             AppData.timerHour=parseInt(parseInt(modeArr[0].minutes)/60);
             AppData.timerHour1=parseInt(parseInt(modeArr[1].minutes)/60);
             AppData.timerHour2=parseInt(parseInt(modeArr[2].minutes)/60);
             AppData.timerMin=parseInt(modeArr[0].minutes)%60;
             AppData.timerMin1=parseInt(modeArr[1].minutes)%60;
             AppData.timerMin2=parseInt(modeArr[2].minutes)%60;
             AppData.Mode=modeArr[0].modeType;
             AppData.remainingTimeHour=parseInt(parseInt(modeArr[0].minutes)/60);
             AppData.remainingTimeMin=parseInt(parseInt(modeArr[0].minutes)%60);
             AppData.features=2;
             AppData.start=1;
             AppData.setTemperatureLow=modeArr[0].temp;
             AppData.power=1;
             AppData.reservationHour=0;
             AppData.reservationMin=0;
             AppData.updateFlag = 0;
             this.trigger({remainingTimeHour:AppData.remainingTimeHour,remainingTimeMin:AppData.remainingTimeMin,setTemperatureLow:AppData.setTemperatureLow,Mode:AppData.mode})
             AppData.updateFlag = 0;  
             let arr = [0,1,6,7,8,9,11,12,13,14,15,16,19,20,21,22,23,24]
             for(let key=0;key<arr.length;key++){
              AppData.updateFlag = het.hexUpFlag(arr[key],1,6,AppData.updateFlag);
             }
            this.trigger(AppData);
                het.send(AppData, function(data){
           
               },function(data){
               het.toast("命令发送失败");
             });
          break; 

        default:
         break;

    }   
   }     

});
