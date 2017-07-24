'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getData', // 接收到数据，重新渲染
    'changeSwitch', // 开关
    'changeTemp', // 调节温度
    'changeMode', // 调节模式
    'changeSpeed', // 调节速度
    'changeWind', // 调节风向
    'changeAutoWind', // 调节自动风向
    'changeSleep', // 睡眠开关
    'changeOrder', // 预约开关
]);