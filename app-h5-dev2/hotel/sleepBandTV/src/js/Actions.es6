'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'getData', //get请求获取数据
    'postData', //post请求获取数据
    'getRecentDateList', //获取最近有汇总数据的日期列表
    'getDayReportData', //获取日报告数据
    'getDayReportTotal', //获取日报告心率、呼吸率、翻身、打鼾、咳嗽、呼吸暂停统计数据
    'getQrcode', //获取用户扫描登录的二维码
    'getToken', //查询用户是否已扫描登录并获取token
    'getWeather', //获取天气信息
    'getUserInfo', //获取用户信息
    'getRealTimeData', //获取实时数据信息
    'confirmLogin', //确认用户是否已登录
    'refreshToken', //刷新token
    'selectDevice' //选择设备
]);