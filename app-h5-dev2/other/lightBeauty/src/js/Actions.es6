'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 重绘
    'toggleBusi', // 自动/手动模式切换
    'selectAny', // 选择模式
    'sync', // 同步数据
    'getData', //get请求数据
    'getToken', //获取token
    'postData', //post请求数据
    'intervalData', //轮询获取运行数据
    'getDeviceID' //获取设备id
]);
