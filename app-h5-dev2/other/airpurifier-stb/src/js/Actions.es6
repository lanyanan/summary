'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getData' ,//轮询获取运行数据
    'repaint', // 接收到数据，重新渲染
    'selectAny', // 选择模式
    'switch', // 开关机
    'toggleTimeClock', // 切换定时时间
    'toggleAlarm',//切换报警声开关
    'selectSpeed', // 切换风速
    'toggleStrong', // 切换强效
    'bookTime', // 预约时间
    'childLock' //童锁开关
]);