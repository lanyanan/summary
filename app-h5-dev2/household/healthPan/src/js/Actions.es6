'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'local',//回退不会促发repaint，在constructor里调用该方法，获取到保存在全局变量（缓存姑且叫做缓存吧）里的状态字段
    'slide',//滑出模式选择
    'cancel',//取消按钮
    'cancelSelect',
    'submitSelect',
    'selectMode',
    'changeMode',
]);