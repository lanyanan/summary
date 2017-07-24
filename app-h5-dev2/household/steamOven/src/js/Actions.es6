'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'repaint', // 接收到数据，重新渲染
    'rename',//自定义烘焙的名称
    'selectMode',//选中烘焙模式
    'selectTime',//烹饪时间及温度确认
    'orderTime',//预约烹饪时间
    'workStyle', //确定烘焙模式
    'turn',//处理开关机事件
    'turnLight',//切换卢灯事件
    'getData',//运行数据初始化界面
    'stop',//暂停按钮事件
    'sethumidity',//设置高低湿度
    'calWork',//退出工作模式，进入待机状态
    'resetTime',//重新设置烘焙时间
    'startWork',//首页快速启动工作模式
    'wetSet',//高低湿设置
    'pullData',//自定义模式从接口拉取数据
    'saveMode',//保存自定义模式
    'modeData',//获取自定义模式保存好的数量
    'deleteMode',//删除自定义模式
    'redefine',//重新定义模式命名
    'begainWork',//自定义工作模式
    
]);