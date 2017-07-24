'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'lock', // 童锁
    'swicthMode', // 切换模式
    'switchPower', // 电源开关
    'adjustCold', // 调节冷藏室
    'adjustFreez', // 调节冷冻室
    'adjustTime'  // 调节冷冻时间
]);