'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getData', // 获取页面状态
    'cOnoff', // //处理开机事件 (1-关机，2-开机)
    'swicthMode', // //切换直接开始烘焙模式
    'swicthModefun', // //切换到功能选择的模式模式
    'swicthHotWind', // 热风的开机关机
    'cancelElm', //取消状态
    'selectTime', //选择时间
    'selectRateTime', //设置进度条 时间
    'selectRateTemp', //设置进度条 温度
    'modeStart', //模式选择
]);