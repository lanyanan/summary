'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'deviceInfo',
    'getting',
    'setting',

    'intervalData', //轮询数据
    'runningData',//也许应该合并到intervalData
    'ctrlData',  //也许应该合并到intervalData
    'selectMode',//选中模式
    'echartsLines',//曲线数据
    'HttpGet',   //store内相互调用，这里注册便于维护
    'selectPart',//选择测试部位
    'reMeasure', //重新测试选中的部位,
    'measureStatus'
]);