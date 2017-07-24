'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'login',  
    'getData',
    'changeSwitch',
    'changelightingPatternNumber',//改变模式
    'changeColor',//改变颜色
    'changeLight',//改变亮度
    'controlLight',//设备控制-控制智能灯光开关
    'resetFactory',//设备控制-恢复出厂协议
    'changeClock1Switch',//闹铃1的开关控制
    'changeClock2Switch',//闹铃2的开关控制
    'saveClock',//保存闹铃的设置
    'showData'//在修改闹铃的时候保存数据到store,
]);