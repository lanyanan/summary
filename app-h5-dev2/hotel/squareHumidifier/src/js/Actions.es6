'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getData', // 拉取数据
    'changeSwitch',//开关机
    'changeLight', //更改灯值
    'changeMist', //更改雾值
    'changeColor', //更改颜色值
    'changeTime', //更改时间
]);