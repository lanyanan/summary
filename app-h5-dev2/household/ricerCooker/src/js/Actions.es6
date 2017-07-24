'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getData',//运行数据初始化界面
    'tasteChoose',//口感选择
   	'tasteSwitch',//口感取消
   	//'clockSwitch',//定时取消
    'selectTime',//定时确认
    'workStyle', //确定烹饪模式
    'calWork',//退出工作模式，进入待机状态
    'modeStart',//启动烹饪模式，进入烹饪状态
    'willStart',//烹饪预约模式
    'setTmep',//烹饪完毕进入保温模式
    'workPattern',//预约倒计时完毕进入烹饪模式
    'setPattern',//设置清洗模式与保温模式
    'handleShakeSwitch' //appBtnList选择模式
]);