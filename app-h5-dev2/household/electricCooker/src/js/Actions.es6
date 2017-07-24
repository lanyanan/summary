'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getData', // 获取页面状态
    'keep', // //处理保温事件 (7-保温)
    'swicthModel', // //切换直接开始烘焙模式
    'modelCancel', //取消状态
    'selectTime', //选择时间
    'modelStart', //模式选择
]);