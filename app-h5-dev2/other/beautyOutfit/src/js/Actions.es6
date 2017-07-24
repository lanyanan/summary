'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */
const DataAction = Reflux.createActions([
    'getCatgory',//获取数据列表
    'getStep',//获取资讯详情
]);
export {DataAction};