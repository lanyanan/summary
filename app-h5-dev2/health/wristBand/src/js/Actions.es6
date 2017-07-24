'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getHistoryData',
    'getValidDate',
    'local',
    'showCalendar',//显示日历
    'getHeart',//获取心率数据
    'reqHistory',//获取睡眠，运动历史数据
]);