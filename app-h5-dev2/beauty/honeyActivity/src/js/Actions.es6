'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getData', // 接收投票列表数据
    'getMyGroupData',// 获取我的组合信息
    'vote',//投票
    'registerPage',//页面访问记录
    'checkActivity',//校验是否参加活动，活动是否过期
    'repaint', // 接收到数据，重新渲染
    'configWx',//配置微信环境
    'getActivityInfo',//获取活动信息
    'isHasInvited',//检测是否邀请过
    'getTags',//获取标签
    'checkCombName',//检查组合名称是否存在
    'checkStatus',//检查是否参加过
    'chooseImage',//选择图片
    'tapPhoto',//点击图片预览
    'confirmApply',//转发给闺蜜
    'joinNow',//马上去参加
    'getInfo',//获取参与者信息
    'confirmBestie',//闺蜜确认
    'shareActivity',//活动详情页分享
    'checkStatus4ide',//信息编辑页面判断是否参加过
]);