'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'sync',   // 同步数据
    'changeMode',//手动模式下切换不同模式
    'chooesTime',//自定义模式下改变时间
    'changeSmart',//智能 手动状态切换
]);