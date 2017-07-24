'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'selectSpeed',//风速选择
    'startup',//开机 关机
    'selectModes',//模式选择
    'setTime',//定时关机
    'cancelTime',//取消 定时关机
    'handleSpray',//
    'cancelSpeed',//喷射时取消风速
]);