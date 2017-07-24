'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染'
    'ready',
    'readyData',
    'getData',
    'postHisData',
    'readyHisData',
    'getHisData',
    'getNoData',
    'sendDate',
    'postDate',
    'getCalendarData', // 获取日历数据
    //App
    'getAppHisData',
    'selectedDate' // 选择日期
]);