'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'selectAny', // 选择模式
    'switch', // 开关机
    'toggleTimeClock', // 切换定时时间
    'toggleTimeId',//切换定时模式ID
    'toggleUV', // 切换紫外线
    'toggleAnion', // 切换负离子
    'childLock' //童锁开关
]);