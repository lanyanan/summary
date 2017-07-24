'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'cancelSelect', // 取消时间选择控件
    'submitSelect', // 选择时间选择控件
    'showTimeSelect', // 显示时间选择控件
    'powerDevice', // 开关机
    'switchHistoryTab', //切换列表ul->li的选中位置
    'getAllData', //获取某一天的数据
    'getLatestData', //获取最近一条运行数据
    'getWeather', //获取天气信息
    'refreshCreateTime', //刷新时间
    'submitDialogButtonOne', //弹窗按钮 我知道了 点击事件
    'local', //回退不会促发repaint，在constructor里调用该方法，获取到保存在全局变量（缓存姑且叫做缓存吧）里的状态字段
    'hintOffLineTip', //
]);