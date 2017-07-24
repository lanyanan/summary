'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'deviceInfo',// 获取设备信息
    'setPart', //选择部位进行测试
    'getData', //轮询获取测试数据
    'getResult', //获取水油弹分析报告
    'location', //获取位置信息
    'clearTest', //页面跳转时，清空测试信息
    'initTest', //测肤页面退出时清空信息
    'clearProTest', //退出护肤品测试页面清空测试肤质信息
    'getContrastData', //获取护肤品测试前后的对比数据
    'getBrandList',//获取品牌列表
    'confirmLogin',//登录
    'getDeviceList',//获取设备列表
    'getSkinDevice',//获取测肤仪列表
    'getPosition',//获取省市列表
    'getproductinfo',//获取护肤品信息
    'configWx',//配置微信
    'getBrandLogo',//获得品牌logo
    'getSingleResult',//单点测试用户结果
    'saveUseInfo',//保存用户信息
    'uploadProcuctInfo',//上传护肤品信息
    'hideShareMenu',//批量隐藏分享菜单
    'showShareMenu',//批量显示分享菜单
    'setShareInfo',//配置分享信息
]);