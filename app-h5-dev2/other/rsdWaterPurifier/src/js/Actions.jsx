'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'back',//回退重新请求数据
    'slide',
    'washDevice',
    'resetFilter',//重置滤芯
    'waterLines',

    'postData', //post请求数据
    'intervalData', //轮询获取运行数据
    'getFaultData'// 获取故障数据,
]);
