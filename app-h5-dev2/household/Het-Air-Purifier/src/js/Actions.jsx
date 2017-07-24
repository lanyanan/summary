'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'controllSwitch',//控制开关
    'controllMode',//控制模式
    'controllMode2',
    'controllWindSpeed',//控制风速
    'controllTime',//控制时间
    'controllUV',//控制UV
    'controllAnion',//控制负离子
    'controllOzone',//控制臭氧
    'controllChildLock',//控制童锁
    'controllShowFilterUI',//控制显示滤网窗口
    'controllShowModeUI',//控制显示模式窗口
    'controllWindSpeedUI',//控制显示风速模式窗口
    'controllWindSpeedUI',//控制显示风速模式窗口
    'controllTimeUI',//控制显示风速模式窗口
    'controllRsetFilterUI',//控制显示重置滤芯窗口
    'controllShowErrorUI',//控制显示重置滤芯窗口
    'controllShowOrModeOrFilterUI',
    'controllShowModeDialog',
]);