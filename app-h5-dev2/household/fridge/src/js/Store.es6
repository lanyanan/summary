'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.es6';

let currentMode = 5; // 记忆当前模式
// 退出模式记忆
let exitMode = {
    mode : 5,
    temp1 : -18,
    temp2 : 5
};
// 模式基本设定
let modes = {
    // 速冷模式
    1 : {
        mode : 1,
        temp1 : exitMode.temp1, // 冷冻室
        temp2 : 2, // 冷藏室
        power : 2
    },
    // 速冻模式
    2 : {
        mode : 2,
        temp1 : -24,
        temp2 : exitMode.temp2
    },
    // 假日模式
    3 : {
        mode : 3,
        temp1 : -15,
        temp2 : 7
    },
    // 智能模式
    4 : {
        mode : 4,
        temp1 : -18,
        temp2 : 5
    },
    // 退出模式
    5 : exitMode
};

// 记忆温度
function memorizeTemp(key, value) {
    let mode = key === 'temp1' ? 1 : 2;
    exitMode[key] = value;
    modes[mode][key] = value;
};

// 导出常量
export const Store = Reflux.createStore({
    listenables: [Actions],
    onRepaint(data){
        if (typeof data.temp1 !== 'undefined') {
            memorizeTemp('temp1', data.temp1);
        }
        if (typeof data.temp2 !== 'undefined') {
            memorizeTemp('temp2', data.temp2);
        }
        if (typeof data.mode !== 'undefined') {
            currentMode = data.mode;
        }
        if (currentMode==2) { // 冷冻模式只取预设温度
            this.trigger(modes[currentMode]);
        } else {
            this.trigger(data);
        }
    },
    onLock(value){
        this.trigger({childLock: value});
        /*het.send({childLock: value}, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });*/
    },
    onSwicthMode(value){
        currentMode = value;
        this.trigger(modes[value]);
        het.send(modes[value], (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    onSwitchPower(value){
        this.trigger({power: value});
        het.send({power: value}, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    onAdjustFreez(value){
        memorizeTemp('temp1', value);
        if (currentMode === 1) {
            this.trigger({temp1: value});
        } else {
            this.trigger({temp1: value, mode: 5});
        }
        het.send({temp1: value, mode: 5}, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    onAdjustCold(value){
        memorizeTemp('temp2', value);
        if (currentMode === 2) {
            this.trigger({temp2: value});
        } else {
            this.trigger({temp2: value, mode: 5});
        }
        het.send({temp2: value, mode: 5}, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    },
    onAdjustTime(value){ 
        this.trigger({hour: value});
        het.send({hour: value}, (data)=>{},(data)=>{
            het.toast("命令发送失败");
        });
    }
});