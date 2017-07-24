'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'changeMode',//切换智能手动模式
    'confirmMode',//手动模式下切换不同模式
    'confirmShock',//震动选择
    'submitHot',//改变热护理温度
    'submitCold',//改变冷护理温度
    'submitClock',//改变时长
    'submit',//保存设置
    'selectColdRate',//选取冷档位
    'selectHotRate',//选取热档位
    'cancelHotRange',//关闭档位选择
    'cancelColdRange',//关闭档位选择
]);