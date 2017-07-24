'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getData', // 获取数据
    'changeSwitch', // 开关切换
    'changeColor', // 颜色切换
    'changeLight', // 亮度切换
    'changeMist', // 喷雾切换
    'changeClock', // 改变时间
]);