'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getDefaultData',//获取默认数据
    'getOnlineData', // 获取运行数据
    'repaint', // 接收到数据，重新渲染
    'switch', // 开关
    'toggleLight', // 切换灯
    'toggleColor', // 切换颜色
    'toggleMist',//切换喷雾
]);