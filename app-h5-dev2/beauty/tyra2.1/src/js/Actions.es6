'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'receiveRepaint', // 接收到数据，重新渲染
    'repaint', // 直接重新渲染
    'toggleBusi', // 自动/手动模式切换
    'selectMode',//选择模式
    'selectGear',//选择档位
    'sync' // 同步数据
]);