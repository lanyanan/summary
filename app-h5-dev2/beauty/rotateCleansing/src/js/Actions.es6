'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'switchPart', // 切换部位
    'showSortPanel', // 显示排序面板
    'switchAuto', // 切换自动手动
    'switchWork', // 切换工作模式（洁面/按摩）
    'changeRuntime', // 调节洁面时间
    'submit', // 保存设置
    'refreshData', // 刷新数据
    'pushGuiderData', // 推送向导数据
    'changeMode',//更换智能模式
    'changeGears', // 调节档位
]);