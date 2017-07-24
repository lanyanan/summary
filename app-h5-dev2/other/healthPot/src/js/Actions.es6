'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'switch',//开关机
    'getDefaultData',
    'submitSelect',//提交选择
    'cancleSelect',//取消选择
    'toggleSelectShow',
    'toggleMode',//
    'toggleModeShow',//展开模式设置面板
    'toggleModeSelect',//选择模式
    'toggleModeChange',//切换工作模式
    'toggleBack',//返回按钮,
    'toggleOuter',//快捷按钮

    'intervalData',//轮询
    'getFaultData',// 获取故障数据,
    'getCtrlData' // 轮询控制数据
]);
