'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

import Reflux from 'reflux';

export const Actions = Reflux.createActions([
    'loadStoreData', // 加载Store
    'saveProject', // 保存项目
    'makeHtml', // 生成html，同时提供可选的preview参数，以决定是否可预览
    'publishProject', // 发布项目
    'saveWidgets', // 保存控件集
    'saveWidget', // 保存单个控件
    'changePage', // 切换页面
    'deletePage', //删除页面
    'createPage', //新建页面
    'renamePage', //重命名页面
    'addUserWidget',  // 向画布中添加组件
    'selectUserWidget',  // 点击画布中的用户组件
    'moveUserWidget', // 移动用户组件
    'resizeUserWidget', // 调整用户控件大小
    'uploadBgImage', //上传背景图片
    'changeFgColor', //更改控件前景色
    'changeBorderColor', //更改控件边框颜色
    'changeBgColor', //更改控件背景色
    'changeWidgetOpacity', //更改控件不透明度
    'changeBorderWidth', //更改控件边框宽度
    'changeExterior',//更改外观属性
    'showPanel', //面板的显示状态
    'stepCountrol', //操作步骤控制
    'resizeCanvas', //更改画布大小（只能改高度）,
    'drawSelectCover', // 绘制多选cover
    'delUserWidget', // 删除用户控件
    'addProperty',	//增加属性
    'changeBooleanProperty', //更改boolean类型的属性值
    'changeStringProperty',//修改string类型的属性值
    'changeField', //修改选中字段
    'changeValue',  //修改选中字段对应值
    'changeEventType', //修改事件类型
    'changeCheckedPage',//修改点击跳转的页面ID
    'changeSize',   //通过尺寸面板修改尺寸
    'markCopyingUserWidget', // copy标记
    'pasteUserWidget', // 粘贴操作
    'upZIndexUserWidget', // 向上调节控件index
    'downZIndexUserWidget', // 向下调节控件index
    'historyGo', // 跳转到指定索引的历史记录
    'historyBack', // 回退一条历史记录
    'historyForward', // 往前一条历史记录
    'historyPush', // 存储一条历史记录（非特殊情况不建议使用，建议在store里操作）
    'refreshState', // 更新状态，用于某些react组件无法及时收到状态的处理
    'changeWidgetCode', // 修改控件代码
    'changeCommandType',  //修改指令发送类型
    'addCheckedCommand',  //新增指令选中项
    'delCheckedCommand',  //删除指令选中项
    'changeWidgetCaption',  //修改控件标题
    'changeWidgetTitle',  //修改控件头部内容（标题）
    'addCheckedWidget',  //新增控件显示隐藏选中项
    'delCheckedWidget',  //删除控件显示隐藏选中项
    'changeWidgetText',  //修改控件编辑文本
    'addEvent',//添加点击事件
    'delEvent',//删除点击事件
    'addStatus',//添加状态
    'delStatus',//删除状态
    'changeStatusName',//更改状态名称
    'changeStatusValue',//更改状态值
    'changePageBg',//更改页面背景属性
    'addTab',//选项卡里添加一个选项
    'delTab',//选项卡里删除一个选项
    'changeTabName',//选项卡 修改选项名
    'serializeTab',//选项 优先显示
    'changeWidgetInfo',//修改组件一些属性
    'selectGrid',//修改组件一些属性
    'changeColorPickerType',  //修改颜色盘的样式
    'uploadPageImage', //上传页面背景图
    'getPicList', //获取更新的图片列表
]);