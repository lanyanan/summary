'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'ready', // 接收到ready数据
    'repaint', // 接收到数据，重新渲染
    'getData', // 获取数据
    'getTotals', // 获取今日统计数据
    'getHistoryData', // 获取历史数据
    'getCalendarData', // 获取日历数据
    'selectedDate', // 选择日期
    'submitResult', // 提交个人状态
]);