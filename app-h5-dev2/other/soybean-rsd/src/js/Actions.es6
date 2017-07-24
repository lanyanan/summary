'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'handleShakeSwitch', //appBtnList选择模式
    'getData',//初始化路由
    'clockSwitch',//定时器取消
    'selectTime',//定时器选择
    'modeStart',//模式启动
    'timeclock',//倒计时
    'modeCancel',//取消的模式
    'modeFinish',//完成模式
    'timeclock',//分钟的变化
    'timeclocker',//时分的变化
    'workCompSta',//工作中
    'getting',//实时拉取运行数据
    'setting',//发送控制数据
]);