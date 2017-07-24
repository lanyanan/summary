'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'action',   //倒计时提示
    'share' ,   //分享到朋友圈之后
    'DreamEnergy',
    'emotionLayerLayer',
    'MStyleLayer',
    'PdlBoxLayer',
    'panduan',
    'closeLayer' ,          //蒙版点击取消
    'openBox',              //打开(提交)潘多拉魔盒
    'shareClick',           //分享取消倒计时
    'selectEmotion',        //选择情绪
    'selectStyle',          //选择风格
    'shareReturn',          //分享返回方法
    'token',                //app调用函数获取token
    'setTimer',             //定时器时间
    'moniResult',           //模拟分享返回结果
    'returnError',          //分享返回失败
    'judgeTitleLength',     //判断标题的长度
    'test',                 //过渡(首页)
    'localTwo',
    'numbers' ,              //判断次数
    'meng',               //蒙版判断
    'btn'                 //按钮隔1秒后出现--图片没加载出来分享
]);