'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getData', // 获取数据
    'clockSwitch', //定时开关
    'selectTime', //选取定时时间
    'switchOpen',  // 开关机
    'modelSel',  //选择模式
    'timeClock',  //定时倒计时
    'detection', //质量检测
    'switch' ,  //appBtnList开关机
    'handleShakeSwitch', //appBtnList模式
    'remainTimer' ,//存取路由跳转的数据
    'remainMin' ,//倒计时差
    'getRemainMin', // 路由回来的时间
    'getRemainS0',//获取开关机
    'setTime',//倒计时
    'setClose'//倒计时关机
]);