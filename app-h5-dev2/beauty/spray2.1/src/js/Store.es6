'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

var Toast = require('../../../common/src/lib/Toast.jsx');
// 定义toast函数，以供多次调用
var topToast = function(msg) {
    document.getElementById('mytoast').innerHTML = "";
    ReactDOM.render(<Toast verticalAlign="0" secs="10" block={true}>{msg}</Toast>,document.getElementById('mytoast'));
};
let AppData = {};
let needSave = false;
let times = [0, 100, 40, 80, 50, 40];
let sendDate = {
    "updateFlag": 0,
    "busiSwitch": 0,
    "configMode": 0,
    "runTime": 0
};
let myMode;
let myTime;
let isSmart;
let isModeChanged = false;
let isTimeChanged = false;
/**
 * 拼接返回给页面的字段
 * @return   {object}        返回给页面的字段
 */
function getTriggerData(){
    let data = {
        skinTypeName : AppData.skinTypeName,
        needSave : needSave,
        electricity : AppData.electricity,
        onlineStatus : AppData.onlineStatus,
    };
    return data;
}
/**
 * 判断是否需要保存
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getSaveFlag(idx, time) {
    let index = parseInt(idx);
    let t = parseInt(time);
    if (isSmart) {
        return true;
    }
    if (myMode == index && myTime == t) {
        return false;
    }else{
        return true;
    }
}
/**
 * 判断模式是否改变
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getModeFlag(idx) {
    let index = parseInt(idx);
    if (isSmart) {
        return true;
    }
    if (myMode == index) {
        return false;
    }else{
        return true;
    }
}
/**
 * 判断时间是否改变
 * @return   {boolean}   如需保存返回true，否则返回false
 */
function getTimeFlag(time) {
    let t = parseInt(time);
    if (isSmart) {
        return true;
    }
    if (myTime == t && !isModeChanged) {
        return false;
    }else{
        return true;
    }
}
export const Store = Reflux.createStore({
    listenables: [Actions],

    onRepaint: function(data) {
        console.log("data====", data);
        if (AppData.updateFlag !==1) {
            AppData.mode = typeof data.mode!=='undefined' ? data.mode : AppData.mode;
            AppData.chargeStatus = typeof data.chargeStatus!=='undefined' ? data.chargeStatus : AppData.chargeStatus;
            AppData.electricity = typeof data.electricity!=='undefined' ? data.electricity : AppData.electricity;
            AppData.currentRunMode = typeof data.currentRunMode!=='undefined' ? data.currentRunMode : AppData.currentRunMode;
            AppData.currentRunTime = typeof data.currentRunTime!=='undefined' ? data.currentRunTime : AppData.currentRunTime;
            AppData.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : AppData.onlineStatus;
            AppData.skinDataCode = typeof data.skinDataCode!=='undefined' ? data.skinDataCode : AppData.skinDataCode;
            AppData.busiSwitch = typeof data.busiSwitch!=='undefined' ? data.busiSwitch : AppData.busiSwitch;
            if (typeof data.configMode=='undefined') {
                AppData.runTime = typeof data.runTime!=='undefined' ? data.runTime : AppData.runTime;
            }
            data.updateFlag = 0;
            AppData.updateFlag = 0;
            if(+AppData.busiSwitch) {
                isSmart = 1;
                myMode = typeof AppData.mode!=='undefined' ? AppData.mode : AppData.currentRunMode;
                myTime = typeof AppData.runTime!=='undefined' ? AppData.runTime : AppData.currentRunTime;
            } else {
                isSmart = 0;
                myMode = AppData.currentRunMode;
                myTime = AppData.currentRunTime;
            }
            isModeChanged = false;
            isTimeChanged = false;
            this.trigger(data);
            }else{
               data.chargeStatus = typeof data.chargeStatus!=='undefined' ? data.chargeStatus : AppData.chargeStatus;
               data.electricity = typeof data.electricity!=='undefined' ? data.electricity : AppData.electricity;
               data.onlineStatus = typeof data.onlineStatus!=='undefined' ? data.onlineStatus : AppData.onlineStatus;
               this.trigger({chargeStatus: data.chargeStatus, electricity: data.electricity, onlineStatus: data.onlineStatus}); 
            }
    },

    onSync: function(uf,bs,m,t) {
        // 同步数据至app
        let mode = myMode;
        let time = myTime;
        let smart = isSmart;
        sendDate.updateFlag = parseInt(uf);
        sendDate.busiSwitch = parseInt(bs);
        sendDate.configMode = parseInt(m);
        sendDate.runTime = parseInt(t);
        isSmart = parseInt(bs);
        myMode = parseInt(m);
        myTime = parseInt(t);
        AppData.updateFlag = 0;
        this.trigger({updateFlag: 0});
        het.send(sendDate, (data)=>{
            het.toast('同步成功！');
            isModeChanged = false;
            isTimeChanged = false;
            AppData.updateFlag = 0; // 重置标记位
            this.trigger({updateFlag: AppData.updateFlag, isModeChange: isModeChanged, isTimeChange: isTimeChanged});   
            topToast("使用完喷雾仪,建议进行肤质测试,以得到更好的效果...");
        }, (data)=>{
            het.toast('同步失败！');
            isSmart = smart;
            myMode = mode;
            myTime = time;
            AppData.updateFlag = 1; // 重置标记位
            this.trigger({updateFlag: AppData.updateFlag, isModeChange: isModeChanged, isTimeChange: isTimeChanged});   
        });        
    },

    onChangeMode: function(idx) {
       let mIndex = parseInt(idx)+1;
       let mTime = times[mIndex];
       // let changeStatus = getSaveFlag(mIndex, mTime);
       isModeChanged = getModeFlag(mIndex);      
       AppData.currentRunMode = mIndex;
       AppData.currentRunTime = mTime;
       if(isModeChanged) {
           // 更改发送App数据
           AppData.updateFlag |= 0x01;
       } else {
           AppData.updateFlag &= 0x10;
       }
       this.trigger({isModeChange: isModeChanged, updateFlag: AppData.updateFlag, currentRunMode: AppData.currentRunMode, currentRunTime: AppData.currentRunTime}); 
    },

    onChooesTime: function(min) {
       let mTime = parseInt(min);
       isTimeChanged = getTimeFlag(mTime);
       AppData.currentRunTime = mTime;
       if(isTimeChanged) {
           // 更改发送App数据
           AppData.updateFlag |= 0x01;
       } else {
           AppData.updateFlag &= 0x10;
       }
       this.trigger({isModeChange: isModeChanged, isTimeChange: isTimeChanged, updateFlag: AppData.updateFlag, currentRunTime: AppData.currentRunTime}); 
    },

    onChangeSmart: function(busiSwitch) {
       let mbusiSwitch = parseInt(busiSwitch);
       if ((mbusiSwitch == 0 && mbusiSwitch !== isSmart)||(mbusiSwitch !== isSmart && !isModeChanged && !isTimeChanged)) {
            AppData.updateFlag = 0;
       }else{
            AppData.updateFlag = 1;
       }
       if (mbusiSwitch == 1) {
            mbusiSwitch = 0;
       }else{
            mbusiSwitch = 1;
       }
       this.trigger({updateFlag: AppData.updateFlag, busiSwitch: mbusiSwitch}); 
    }
});
