'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';
 import {Funs} from '../../../common/src/fun.es6';
let  AppData = {
    deviceStatus:4,
    timeArr:[0,0,0,0,0,0],
    onceConfigData:true,
    //模式名称时间数组
    modeNameArrs:[
                {hotSpray1:156,coldSpray1:24,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:15,workSeconds:0},//弹力修护
                {hotSpray1:72,coldSpray1:18,hotSpray2:36,coldSpray2:18,hotSpray3:36,coldSpray3:0,workMinutes:15,workSeconds:0},//皮肤清洁
                {hotSpray1:72,coldSpray1:12,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:7,workSeconds:0},//快速温热1          
                {hotSpray1:72,coldSpray1:6,hotSpray2:27,coldSpray2:5,hotSpray3:36,coldSpray3:9,workMinutes:12,workSeconds:55 },//醒肤模式 
                {hotSpray1:72,coldSpray1:12,hotSpray2:36,coldSpray2:12,hotSpray3:36,coldSpray3:12,workMinutes:15,workSeconds:0},//控油护理
                {hotSpray1:12,coldSpray1:0,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:1,workSeconds:0},//我的模式
                {hotSpray1:0,coldSpray1:0,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:0,workSeconds:0},//空数据只用于显示
                {hotSpray1:0,coldSpray1:0,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:0,workSeconds:0},//空数据只用于显示
                {hotSpray1:108,coldSpray1:12,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:10,workSeconds:0}//快速温热2
                ],
    //设备模式时间数组
    deviceModeItems:[                                        
                    {hotSpray1:0,coldSpray1:0,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:0,workSeconds:0},//日常
                    {hotSpray1:0,coldSpray1:0,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:0,workSeconds:0},//加强
                    {hotSpray1:72,coldSpray1:12,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:7,workSeconds:0},//温热  
                    {hotSpray1:180,coldSpray1:0,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:15,workSeconds:0},//热雾  
                    {hotSpray1:0,coldSpray1:36,hotSpray2:0,coldSpray2:0,hotSpray3:0,coldSpray3:0,workMinutes:3,workSeconds:0}//冷雾
                    ]
};

const isOffline = () => {
    return AppData.onlineStatus == 2;
};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint: function(data){
        if(AppData.a) return;
        if(typeof data.steamfaceConfig === 'object' && AppData.onceConfigData){
            AppData = Funs._extends(AppData,data.steamfaceConfig);
            AppData.onceConfigData = false;
        }
        if(typeof data.recomondConfig === 'object'){
            AppData.recomondConfig = data.recomondConfig;
        }
        if(AppData.returnModeSwitch){
            data.smartModeSwitch = AppData.smartModeSwitch;
            data.modeName = AppData.modeName;
            data.deviceMode = AppData.deviceMode;
        }
        if(AppData.smartModeSwitch==0 && AppData.modeName==16){
            AppData.hotSpray1=data.hotSpray1;
            AppData.hotSpray2=data.hotSpray2;
            AppData.hotSpray3=data.hotSpray3;
            AppData.coldSpray1=data.coldSpray1;
            AppData.coldSpray2=data.coldSpray2;
            AppData.coldSpray3=data.coldSpray3;
            AppData.workMinutes=data.workMinutes;
            AppData.workSeconds=data.workSeconds;
        } 
        //智能模式下  当用户切换至设备模式时，把剩余时间都置为0
        if(AppData.smartModeSwitch==1 && AppData.modeName==16){
            AppData.hotSpray1Leave=0;
            AppData.hotSpray2Leave=0;
            AppData.hotSpray3Leave=0;
            AppData.coldSpray1Leave=0;
            AppData.coldSpray2Leave=0;
            AppData.coldSpray3Leave=0;
        }
        AppData.skinDataCode=data.skinDataCode?data.skinDataCode:AppData.skinDataCode;
        AppData.skinTypeName=data.skinTypeName?data.skinTypeName:AppData.skinTypeName;
        AppData.onlineStatus = data.onlineStatus;
        data.deviceStatus = data.steamfaceConfig==null ? data.deviceStatus : (data.steamfaceConfig.deviceStatus==null ? data.deviceStatus : data.steamfaceConfig.deviceStatus);   
            
        data.deviceStatus=(data.deviceStatus>=1 && data.deviceStatus<=4)?data.deviceStatus:AppData.deviceStatus;
        AppData.deviceStatus=data.deviceStatus;
        data.modeNameArrs = AppData.modeNameArrs;
        data.deviceModeItems = AppData.deviceModeItems;
        data.onOff = data.onOff?data.onOff:AppData.oldOnOff;
        this.trigger(data);
    },
    onRefreshData: function(){
        AppData.onOff=0
        this.trigger(AppData);
    },
    onClockSwitch:function() {
        AppData.onOff=0;
       this.trigger({timeshow:false});
    },
    onSelectTime:function(minute,modArr) {
        AppData.onOff=0;
        var remaintime = parseInt(minute);
        AppData.remaintime = remaintime;
        AppData.timeshow=false;
        AppData.updateFlag = het.calcUpdateFlag(12)+het.calcUpdateFlag(3)+het.calcUpdateFlag(4);
        AppData.modArr[AppData.index] = remaintime;
        if(isOffline()){
            het.toast("设备已离线!");
            return;
        }
        this.trigger({remainTime:AppData.remaintime,modArr:AppData.modArr,timeshow:AppData.timeshow});
        AppData.a=true;
        het.send(AppData, function(data){
            AppData.a =false;
            het.toast("同步成功");
        },function(data){
            het.toast("同步失败");
        });
    },
    //智能模式点击
    //参数值            设备模式    模式名称  app开关值  智能手动开关 设备状态
    onSwitchMode:function(deviceMode,modeName,onOff,smartModeSwitch,deviceStatus) {
        AppData.onOff=0;
        AppData = Funs._extends(AppData,AppData.recomondConfig);
        if(isOffline()){
            het.toast("设备已离线!");
            return;
        }
        AppData.smartModeSwitch=1;
        AppData.recomondConfig.modeName=modeName;
        AppData.recomondConfig.deviceMode=deviceMode;
        AppData.returnModeSwitch=false;
        this.trigger({smartModeSwitch:AppData.smartModeSwitch,deviceMode:deviceMode,modeName:modeName,hiddenText:false,
        returnModeSwitch:AppData.returnModeSwitch});
        
        AppData.updateFlag = het.calcUpdateFlag(10)+het.calcUpdateFlag(11)+het.calcUpdateFlag(10)+het.calcUpdateFlag(8)+het.calcUpdateFlag(12);
        
        if(AppData.returnModeSwitch) return;
        AppData.a=true;
        het.send(AppData, function(data){
            AppData.a=false;
            het.toast("同步成功");
        },function(data){
            het.toast("同步失败");
        });
    },
    //手动模式点击   参数值   设备模式    模式名称  app开关值  智能手动开关     设备状态
    onSwitchModeHand:function(deviceMode,modeName,onOff,smartModeSwitch,deviceStatus,type,deviceModeIndexThree){
        AppData.smartModeSwitch = 0;
        AppData.deviceMode=0;
        AppData.modeName=0;//智能模式点击手动模式时改变modeName的值，但是不下发
        if(AppData.returnModeSwitch===undefined){
            AppData.returnModeSwitch = true;
            this.trigger({smartModeSwitch: 0,returnModeSwitch:AppData.returnModeSwitch,deviceMode:AppData.deviceMode,modeName:AppData.modeName,hiddenText:true});
        }else{
            AppData.returnModeSwitch = true;
            this.trigger({smartModeSwitch:0,deviceMode:AppData.deviceMode,modeName:AppData.modeName,returnModeSwitch:AppData.returnModeSwitch,hiddenText:true});
        }
    },
    onAddMinue:function(index){
        AppData.onOff=0;
        AppData.index=index;
    },
    onSetTimeFromApp:function(items){
        AppData.onOff=0;
        AppData.hotSpray1=items[0];
        AppData.coldSpray1=items[1];
        AppData.hotSpray2=items[2];
        AppData.coldSpray2=items[3];
        AppData.hotSpray3=items[4];
        AppData.coldSpray3=items[5];
        AppData.deviceStatus=4;
        AppData.refresh = true;
        AppData.myAllTime = items;
        AppData.workMinutes = items[6];
        AppData.workSeconds = items[7];
        AppData.modeName = 10;
        AppData.hotSpray1Leave=items[0];
        AppData.coldSpray1Leave=items[1];
        AppData.hotSpray2Leave=items[2];
        AppData.coldSpray2Leave=items[3];
        AppData.hotSpray3Leave=items[4];
        AppData.coldSpray3Leave=items[5];
        AppData.updateFlag = het.calcUpdateFlag(18)+het.calcUpdateFlag(19)+het.calcUpdateFlag(20)+het.calcUpdateFlag(21)+het.calcUpdateFlag(22)+het.calcUpdateFlag(23)+het.calcUpdateFlag(24)+het.calcUpdateFlag(25);
       if(isOffline()){
            het.toast("设备已离线!");
            return;
        }
        if(AppData.hotSpray1+AppData.hotSpray2+AppData.hotSpray3+AppData.coldSpray1+AppData.coldSpray2+AppData.coldSpray3<=0){
            het.toast("您未选择时间，请选择");
            return;
        }

        this.trigger({myAllTime:items,modeName:AppData.modeName,deviceStatus:AppData.deviceStatus,hotSpray3:AppData.hotSpray3,hotSpray1:AppData.hotSpray1,coldSpray1:AppData.coldSpray1,hotSpray2:AppData.hotSpray2,coldSpray2:AppData.coldSpray2,coldSpray3:AppData.coldSpray3,hotSpray1Leave:AppData.hotSpray1,hotSpray2Leave:AppData.hotSpray2,hotSpray3Leave:AppData.hotSpray3,coldSpray1Leave:AppData.coldSpray1,coldSpray2Leave:AppData.coldSpray2,coldSpray3Leave:AppData.coldSpray3,workMinutes:AppData.workMinutes,workSeconds:AppData.workSeconds});
       AppData.a=true;
       het.send(AppData, function(data){
        this.trigger({hotSpray1Leave:AppData.hotSpray1,hotSpray2Leave:AppData.hotSpray2,hotSpray3Leave:AppData.hotSpray3,coldSpray1Leave:AppData.coldSpray1,coldSpray2Leave:AppData.coldSpray2,coldSpray3Leave:AppData.coldSpray3,myAllTime:items,workMinutes:AppData.workMinutes,workSeconds:AppData.workSeconds,deviceStatus:4});
        AppData.a=false;
        het.toast("同步成功");
        }.bind(this),function(data){
            het.toast("同步失败");
        });
       history.back();
    },
    onSelectTimeArr:function(deviceModeIndexThree,type,deviceMode,modeName,smartModeSwitch,timearray,onOff){
       AppData.deviceModeIndexThree=parseInt(deviceModeIndexThree);
       AppData.smartModeSwitch = smartModeSwitch;
       AppData.deviceType= type;
       AppData.onOff=0;
       AppData.deviceMode=smartModeSwitch==0?0:deviceMode;
       AppData.modeName = modeName;
       if(modeName==3) AppData.modeName=6;
       AppData.hotSpray1=parseInt(AppData.modeNameArrs[modeName-1].hotSpray1);
       AppData.hotSpray2=parseInt(AppData.modeNameArrs[modeName-1].hotSpray2);
       AppData.hotSpray3=parseInt(AppData.modeNameArrs[modeName-1].hotSpray3);
       AppData.coldSpray1=parseInt(AppData.modeNameArrs[modeName-1].coldSpray1);
       AppData.coldSpray2=parseInt(AppData.modeNameArrs[modeName-1].coldSpray2);
       AppData.coldSpray3=parseInt(AppData.modeNameArrs[modeName-1].coldSpray3);
       AppData.workMinutes=parseInt(AppData.modeNameArrs[modeName-1].workMinutes);
       AppData.workSeconds=parseInt(AppData.modeNameArrs[modeName-1].workSeconds);
       
       if(modeName==6) {
           AppData.modeName=10;
           if(AppData.myAllTime){
            AppData.hotSpray1=parseInt(AppData.myAllTime[0]);
            AppData.hotSpray2=parseInt(AppData.myAllTime[2]);
           AppData.hotSpray3=parseInt(AppData.myAllTime[4]);
           AppData.coldSpray1=parseInt(AppData.myAllTime[1]);
           AppData.coldSpray2=parseInt(AppData.myAllTime[3]);
           AppData.coldSpray3=parseInt(AppData.myAllTime[5]);
           AppData.workMinutes=parseInt(AppData.myAllTime[6]);
           AppData.workSeconds=parseInt(AppData.myAllTime[7]);
           }else{
             AppData.myAllTime = [12,0,0,0,0,0,1,0];
             this.trigger({myAllTime:AppData.myAllTime});
           }
       }else{
        AppData.modArr=[AppData.hotSpray1,AppData.coldSpray1,AppData.hotSpray2,AppData.coldSpray2,AppData.hotSpray3,AppData.coldSpray3,AppData.workMinutes,AppData.workSeconds];
       };
      
       AppData.updateFlag =het.calcUpdateFlag(10)+het.calcUpdateFlag(17)+het.calcUpdateFlag(12)+het.calcUpdateFlag(16)+het.calcUpdateFlag(18)+het.calcUpdateFlag(19)+het.calcUpdateFlag(20)+het.calcUpdateFlag(21)+het.calcUpdateFlag(22)+het.calcUpdateFlag(23);
        if(isOffline()){
            het.toast("设备已离线!");
            return;
        }
        this.trigger({deviceModeIndexThree:AppData.deviceModeIndexThree,type:AppData.deviceType,smartModeSwitch:AppData.smartModeSwitch,deviceMode:AppData.deviceMode,modeName:AppData.modeName,returnModeSwitch:false,
            hotSpray3:AppData.hotSpray3,coldSpray1:AppData.coldSpray1,hotSpray2:AppData.hotSpray2,coldSpray2:AppData.coldSpray2,coldSpray3:AppData.coldSpray3,hotSpray1:AppData.hotSpray1,onOff:AppData.oldOnOff,hotSpray1Leave:AppData.hotSpray1,hotSpray2Leave:AppData.hotSpray2,hotSpray3Leave:AppData.hotSpray3,coldSpray1Leave:AppData.coldSpray1,coldSpray2Leave:AppData.coldSpray2,coldSpray3Leave:AppData.coldSpray3,workMinutes:AppData.workMinutes,workSeconds:AppData.workSeconds,modArr:AppData.modArr});
        AppData.a=true;
        het.send(AppData, function(data){
            AppData.returnModeSwitch = false;
            if(AppData.modeName==10){
                this.trigger({hiddenText:false,hotSpray1Leave:AppData.hotSpray1,hotSpray2Leave:AppData.hotSpray2,hotSpray3Leave:AppData.hotSpray3,coldSpray1Leave:AppData.coldSpray1,coldSpray2Leave:AppData.coldSpray2,coldSpray3Leave:AppData.coldSpray3,workMinutes:AppData.workMinutes,workSeconds:AppData.workSeconds});
            }else{
                this.trigger({hiddenText:false,hotSpray1Leave:AppData.hotSpray1,hotSpray2Leave:AppData.hotSpray2,hotSpray3Leave:AppData.hotSpray3,coldSpray1Leave:AppData.coldSpray1,coldSpray2Leave:AppData.coldSpray2,coldSpray3Leave:AppData.coldSpray3,workMinutes:AppData.workMinutes,workSeconds:AppData.workSeconds});
            }
            AppData.a=false;
            het.toast("同步成功");
        }.bind(this),function(data){
            het.toast("同步失败");
        });
    },
    //主页面的开关
    onOpeenOrClose:function(state,modArr){
        AppData = Funs._extends(AppData,state);
        AppData.onOff=state.onOff=2;
        AppData.oldOnOff=2;
        AppData.smartModeSwitch=state.smartModeSwitch; //智能手动开关
        AppData.deviceModeIndexThree=parseInt(state.deviceModeIndexThree);
        AppData.deviceType= state.deviceType;
        AppData.deviceStatus= 4;
        AppData.requestType = 2;
        AppData.hotSpray1=modArr[0];
        AppData.coldSpray1=modArr[1];
        AppData.hotSpray2=modArr[2];
        AppData.coldSpray2=modArr[3];
        AppData.hotSpray3=modArr[4];
        AppData.coldSpray3=modArr[5];
        AppData.workMinutes=modArr[6];
        AppData.workSeconds=modArr[7];
        // AppData.hotSpray1Leave=modArr[0],
        // AppData.coldSpray1Leave=modArr[1],
        // AppData.hotSpray2Leave=modArr[2],
        // AppData.coldSpray2Leave=modArr[3],
        // AppData.hotSpray3Leave=modArr[4],
        // AppData.coldSpray3Leave=modArr[5]
        let modeName;
        AppData.modeName=state.modeName;
        if(state.smartModeSwitch==1){
            AppData.workMinutes=state.recomondConfig.workMinutes;
            AppData.workSeconds=state.recomondConfig.workSeconds;
        }else{
            if(state.modeName==10){
                let myAllTime = modArr;
                AppData.workMinutes=modArr[6];
                AppData.workSeconds=modArr[7];
            }
            
        }
        AppData.deviceMode=state.smartModeSwitch==0?state.deviceMode:state.recomondConfig.deviceMode;
        AppData.updateFlag = het.calcUpdateFlag(10)+het.calcUpdateFlag(8)+het.calcUpdateFlag(7)+het.calcUpdateFlag(16)+het.calcUpdateFlag(17)+het.calcUpdateFlag(11)+het.calcUpdateFlag(18)+het.calcUpdateFlag(19)+het.calcUpdateFlag(20)+het.calcUpdateFlag(21)+het.calcUpdateFlag(22)+het.calcUpdateFlag(23)+het.calcUpdateFlag(24)+het.calcUpdateFlag(25);

        if(isOffline()){
            het.toast("设备已离线!");            
            return;
        }
        this.trigger({deviceMode:AppData.deviceMode,modeName:AppData.modeName});
        AppData.a=true;
        het.send(AppData, function(data){
            this.trigger({hotSpray1Leave:modArr[0],hotSpray2Leave:modArr[2],hotSpray3Leave:modArr[4],coldSpray1Leave:modArr[1],coldSpray2Leave:modArr[3],coldSpray3Leave:modArr[5],workMinutes:modArr[6],workSeconds:modArr[7],onOff:2});
            AppData.a=false;
            het.toast("同步成功");
            this.trigger({deviceStatus:4});
         }.bind(this),function(data){
            het.toast("同步失败");
        }); 
    },
    onShowMaxminute:function(maxminute){
        if(maxminute<=0){
             het.toast("您选择的时间足够15min，已不能选择");           
        }else if(maxminute>=15){
            het.toast("请编辑、选择时间");
        }
    },
    //工作页面的开关
    onChangeDeviceStatus:function(deviceStatus,deviceMode,modeName,onOff,smartModeSwitch,type,deviceModeIndexThree,hotSpray1,hotSpray2,hotSpray3,coldSpray1,coldSpray2,coldSpray3,workMinutes,workSeconds,modArr){
        if((hotSpray1+hotSpray2+hotSpray3+coldSpray1+coldSpray2+coldSpray3<=0 )|| (modeName==0 && deviceMode==0) ){
            AppData.hotSpray1=modArr[0];
            AppData.coldSpray1=modArr[1];
            AppData.hotSpray2 = modArr[2];
            AppData.coldSpray2=modArr[3];
            AppData.hotSpray3=modArr[4];
            AppData.coldSpray3=modArr[5];
            AppData.workMinutes=modArr[6];
            AppData.workSeconds=modArr[7];
        }
        AppData.onOff=1;
        AppData.oldOnOff=1;
        AppData.deviceStatus=2;
        AppData.modeName=modeName;
        if(AppData.returnModeSwitch){
            AppData.smartModeSwitch = 1;
        }
        if(smartModeSwitch==0 && modeName==16){
            AppData.deviceMode=deviceMode;
            AppData.modeName=modeName;
            AppData.hotSpray1=hotSpray1;
            AppData.hotSpray2=hotSpray2;
            AppData.hotSpray3=hotSpray3;
            AppData.coldSpray1=coldSpray1;
            AppData.coldSpray2=coldSpray2;
            AppData.coldSpray3=coldSpray3;
            AppData.workMinutes=workMinutes;
            AppData.workSeconds=workSeconds;
        }else if(smartModeSwitch==0){
            AppData.deviceMode=0;}
        else if(smartModeSwitch==1){
            AppData.deviceMode=deviceMode;
        } 
        AppData.updateFlag = het.calcUpdateFlag(10)+het.calcUpdateFlag(7)+het.calcUpdateFlag(16);
        
        if(isOffline()){
            het.toast("设备已离线!");            
            return;
        }
        this.trigger(AppData);
        AppData.a=true;
        het.send(AppData, function(data){
            AppData.a=false;
            het.toast("同步成功");
            this.trigger({deviceStatus:2});
        }.bind(this),function(data){
            het.toast("同步失败");
        });
    },
    //手动模式 我的模式 的设置按钮
    onSetEditing:function(name){
        if(!name && AppData.refresh){
            AppData.refresh = false;
            AppData.onOff = AppData.oldOnOff;
            this.trigger(AppData);
        }
        if(name==='return'){
            AppData.refresh = true;
            AppData.deviceStatus = 4;
            this.trigger({myAllTime:AppData.myAllTime});
        }
    }
});