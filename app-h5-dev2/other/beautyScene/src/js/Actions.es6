'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getStrategy', //获取方案详情
    'getStep', //获取步骤详情
    'getSceneList',//获取场景列表
    'useMode',//启用该模式
]);