'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'send', // 发送控制指令
    'getData',   //获取水质检测器最新的检测数据
    'postData',  //上传测量数据
    'getTrigger',   //更新页面
    'changeAddress',   //更新修改过的地址
    'getHisData',   //分页获取水质检测器历史检测数据
    'getNearestDistanceT10Data'  //获取指定位置最近的10条检测数据
]);