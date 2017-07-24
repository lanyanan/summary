'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getData', // 微信授权，接收到数据，重新渲染
    'changeTotalTemperature', //改变整机温度
    'changeSleepTemperature', //改变睡眠温度
    'changePartitionTemperature', //改变2分区温度
    'changeMode', // 调节模式
    'changeStartUp', // 改变开始时间
    'changeClosing', // 改变结束时间
    'changeEquipment',  //开关机
    'changeAppointment', //预约
    'bootAppointment', //预约开机
]);