'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'switch',   //开关机
    'shakeSwitch', //摇头开关
    'clockSwitch', //定时开关
    'selectTime', //选取定时时间
    'selectRate', //选取档位
    'selectMode', //选取模式
    'selectRateValue' //档位回显
]);