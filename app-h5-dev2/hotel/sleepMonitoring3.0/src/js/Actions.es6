'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
	'login',//授权登录
    'repaint', // 接收到数据，重新渲染
    'getData', // 用于scene获取数据,
    'switchUserScene',//用于设置场景的开启与关闭
    'getSceneList',//获取场景数据,
    'submitTime', //用于设置唤醒灯光的时间,
    'getDayReportData',//用于获取睡眠日报,
    'getDayReportTotal',//用于获取日报的统计,
    'getRealTimeData',//用于获取实时数据,
    'getMonthDateList',//获取月报
    'saveClock', //保存闹铃
    'getDeviceList',//设备列表
    'getSceneLog',//场景日志
    'getAuthAccess',//用户是否扫码
    'getAuthAccessTiming',//
]);