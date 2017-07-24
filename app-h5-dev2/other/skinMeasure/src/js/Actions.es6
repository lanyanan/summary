'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint',//数据汇总返回
    'setting',//实际上只是设备清零
    'getting',//获取运行到的水油弹
    'measureResult',//拿到水油弹请求‘所谓的’测试结果
    'reMeasure',//清空数据，重新测试
    'location',//获取地理位置
    'deviceInfo',//获取是否在线等字段
    'getHistoryData', // 获取某一天历史数据
    'getValidDate', // 获取某一月有数据的日期
]);