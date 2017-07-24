'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'updateEchart', // 更新echart,
    'lastXyml',// 上1次血氧脉率数据
    'lastBloodGlucose',// 上1次血糖数据
    'lastBloodPressure',// 上1次血压数据
    'lastTemp',// 上1次体温数据
    'lastECG',// 上1次心电心率数据（最新一次数据）
    'uploadData',//上传数据到服务器
    'resetGlucoseStatus',//血糖---改变状态（空腹，餐后） 
    'getECGHistoryData',// 心电历史数据
    'getHeartRateDetail'// 心电详情
]);