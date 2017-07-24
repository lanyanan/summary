'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.jsx';
// 整个应用的数据存储的地方,定义原生app数据上报上来的字段和默认值
const AppData = {

};

export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){

        //断网离线
        // if(!!data.online) {AppData.online = data.online;}
        // if(!!data.networkavailable) {AppData.networkavailable = data.networkavailable;}
        if(data.childlock) AppData.childlock = data.childlock;
        if(data.anionsw) AppData.anionsw = data.anionsw;
        if(data.ozonesw) AppData.ozonesw = data.ozonesw;
        if(data.uvsw) AppData.uvsw = data.uvsw;
        if(data.fanGear) AppData.fanGear = data.fanGear;
        if(data.mode) AppData.mode = data.mode;
        if(data.onoff) AppData.onoff = data.onoff;
        if(data.settimer) AppData.settimer = data.settimer;


        this.trigger(data);
    },
    //控制开关
    onControllSwitch(value){
        this.trigger({powerOn:value,RemainTime:0});
        // let updateFlag = het.hexUpFlag(9, 1, 2);
        AppData.onoff = value;
        AppData.updateFlag =  het.hexUpFlag(9, 1, 2);
        // console.log("onControllSwitch updateFlag== "+updateFlag);
        //{onoff: value,updateFlag:het.hexUpFlag(9, 1, 2)}
        het.send(AppData,(data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    //控制模式           风速， 紫外线，负离子，臭氧
    onControllMode(value,value1,uv,anion,ozone){
        this.trigger({workMode:value,motorGear:value1,uvSw:uv,anionSw:anion,ozoneSw:ozone});
        //het.hexUpFlag(8, 1, 2,het.hexUpFlag(7, 1, 2,het.hexUpFlag(6, 1, 2,het.hexUpFlag(4, 1, 2,het.hexUpFlag(5, 1, 2)))))
        AppData.mode = value;
        AppData.fanGear = value1;
        AppData.updateFlag = het.hexUpFlag(8, 1, 2,het.hexUpFlag(7, 1, 2));
        het.send(AppData,(data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },

    onControllMode2(value,value1){
        this.trigger({workMode:value,motorGear:value1});
        //het.hexUpFlag(8, 1, 2,het.hexUpFlag(7, 1, 2,het.hexUpFlag(6, 1, 2,het.hexUpFlag(4, 1, 2,het.hexUpFlag(5, 1, 2)))))
        AppData.mode = value;
        AppData.fanGear = value1;
        AppData.updateFlag = het.hexUpFlag(7, 2, 2);
        het.send(AppData, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    //控制风速
    onControllWindSpeed(value){
        this.trigger({motorGear:value});
        AppData.fanGear = value;
        AppData.updateFlag =het.hexUpFlag(7, 1, 2);

        het.send(AppData, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    //控制时间
    onControllTime(value){
        this.trigger({RemainTime:value});
        AppData.settimer = value;
        AppData.updateFlag =het.hexUpFlag(10, 1, 2);
        het.send(AppData,(data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    //控制UV
    onControllUV(value){
        this.trigger({uvSw:value});
        AppData.uvsw = value;
        AppData.updateFlag =het.hexUpFlag(6, 1, 2);
        //{uvsw: value,updateFlag:het.hexUpFlag(6, 1, 2)}
        het.send(AppData,(data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    //控制负离子
    onControllAnion(value){
        this.trigger({anionSw:value});
        AppData.anionsw = value;
        AppData.updateFlag =het.hexUpFlag(4, 1, 2);
        //{anionsw: value, updateFlag:het.hexUpFlag(4, 1, 2)}
        het.send(AppData,(data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    //控制臭氧
    onControllOzone(value){
        this.trigger({ozoneSw:value});
        AppData.ozonesw = value;
        AppData.updateFlag =het.hexUpFlag(5, 1, 2);
        //{ozonesw: value,updateFlag:het.hexUpFlag(5, 1, 2)}
        het.send(AppData, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    //控制童锁
    onControllChildLock(value){
        this.trigger({childLock:value});
        AppData.childlock = value;
        AppData.updateFlag =het.hexUpFlag(3, 1, 2);
        //{childlock: value,updateFlag:het.hexUpFlag(3, 1, 2)}
        het.send(AppData, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    onControllShowModeUI(value){
        this.trigger({modeWindowState:value,selectshow:true});
    },
    onControllShowFilterUI(value){
        this.trigger({filterWindowState:value});
    },
    onControllShowOrModeOrFilterUI(value1,value2){
        this.trigger({modeWindowState:value1,filterWindowState:value2});
    },
    //显示窗口类型
    onControllShowModeDialog(value){

        this.trigger({modeType:value,selectshow:true});
    }


});