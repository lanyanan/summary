'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getParam',//获得实时数据和睡眠报告的请求参数
    'getDeviceList',//获取设备列表
    'setWechatId',//微信授权
    'changeStatus',//改变监测的状态
    'getBattery',//获取电量
    'getDateTime',//获取有数据的月份
    'getConnect',//获取连接状态,
]);