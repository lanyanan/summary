'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'setMode',//设置模式
    'setGear',//选择档位
    'setExport',//选择导入导出
    'modeSwicth',//取消开关
    'setLight',//取消灯光
    'busiSwitch',//手动 智能切换
    'submitRunTime',//运行时间确认
    'submit',//保存
]);