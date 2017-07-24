'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染  
    'getbedroom',		//获取卧室数据
    'getToken' ,         //获取token
    'locations',         //获取全国城市的列表
    'place',             //定位
    'getOnlineData',     //获取授权 获取设备运行数据
    'onoffLight',        //指示灯开关
    'getAllSleepData',       //获取全国睡眠数据
    'otherCity',             //选择其他城市
    'historyData' ,        //个人历史数据
    'getDetailbed' ,         //个人详细数据             
    'getScoreLevel'  ,       // 盒子首页环境评分
    'getTime' ,                //获取当前时间
    'newCity' ,                 //选取其它城市的
    'checkOnline'           //判断设备是否在线

]);