'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', 				// 接收到数据，重新渲染
    'slide',      			//滑动数据
    'getdata',    			//获取设备运行数据
    'consoleData',   		//发送控制命令
    'allOpen',        		//全开
    'allClose',       		//全关
    'stopOpenClose'	,		//停止开合
    'test',
    'selectRange',          //发送滑动命令
    'pauseOpenClose'        //新停止开合
]);