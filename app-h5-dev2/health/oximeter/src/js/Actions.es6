'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
	'ready', // 接收到ready数据
    'repaint', // 接收到数据，重新渲染
    'changeDay', // 前一天后一天
    'getLastestData', // 获取最后一次血氧脉率数据(首页)
    'getLastestHistoryData', // 获取最后一次历史数据(历史页面)
    'getAlert', // 获取预警值
    'getOneDayData', // 获取单日历史数据
    'getValidDate', // 获取当月有数据的日期
    'selectDate',//日历选择某一天返回
    'chartClick',//图标点击
]);