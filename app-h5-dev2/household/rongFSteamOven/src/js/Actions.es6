'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getData', // 获取页面状态
    'onOff', // //处理开机事件 (0-无操作，1-关机，2-待机，3-运行)
    'swicthMode', // //切换直接开始烘焙模式
    'swicthStove', // 炉灯开关事件
    'cancel', //取消状态
    'modeStart', //模式选择
    'changeTampTime',   //修改烘培温度及时间
    'menuMode',
    'nextStep',
    'getMenuList'
]);