'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getOnlineData', // 获取运行数据
    'getDefaultData',   //获取默认数据
    'onoffLight'   ,    //指示灯开关
    'positions'    ,  //定位
    'echartsData' ,   //首页数据渲染   
    'getOnlineData',  //获取授权 获取设备运行数据
    'getbedroom',		//获取卧室数据
    'setChange',
    'news',
    'place',
    'gan'

  
]);