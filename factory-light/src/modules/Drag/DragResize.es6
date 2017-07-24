'use strict';
/**
 * 处理调整大小拖放事件
 * @author   
 * @datetime 
 */

import {BaseClass} from '../../core/Base.class.es6';
import {publish} from '../../core/pubsub.es6'; // 发布/订阅模式库
import {Actions} from '../../app/Actions.es6';

// 产生私有成员key
const _getOffset_ = Symbol('_getOffset_'); // 获取偏移矩阵
const _timer_ = Symbol('_timer_'); // 计时器
const _offsetCache_ = Symbol('_offsetCache_'); // 偏移缓冲器

export class DragResizeClass extends BaseClass{
    constructor(){
        super();
        this.oldMoveX = 0;
        this.oldMoveY = 0;
        this[_timer_] = 0;
        this.ghostDom = null;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */
    getMoveDom(dom){
        this.dir = dom.className.match(/tl|tc|tr|ml|mr|bl|bc|br/)[0];
        let tmp = document.createElement('div');
        this.ghostDom = dom.parentNode.className=='ghost'&&dom.parentNode;
        return tmp;
    }

    /**
     * 开始拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   起始横坐标
     * @param    {integer}    y   起始纵坐标
     */
    onStart(dom, x, y){
       
    }

    /**
     * 正在拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onMove(dom, offsetX, offsetY){
        
        // Actions.resizeUserWidget(o.offsetTop, o.offsetLeft, o.offsetWidth, o.offsetHeight);
    }

    /**
     * 结束拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onEnd(dom, x, y){
        Actions.delUserWidget();
    }

    sendOffset(){
        let o = this[_offsetCache_];
        Actions.resizeUserWidget(o.offsetTop, o.offsetLeft, o.offsetWidth, o.offsetHeight);
        this[_offsetCache_] = {offsetTop:0, offsetLeft:0, offsetWidth:0, offsetHeight:0};
        this[_timer_] = setTimeout(()=>this.sendOffset(), 0);
    }

    /**
     * 获取偏移矩阵
     * @param {integer} x 偏移x
     * @param {integer} y 偏移y
     */
    [_getOffset_](x, y){
        let offsetTop = 0,
            offsetLeft = 0,
            offsetWidth = 0,
            offsetHeight = 0;
        switch (this.dir) {
            case 'tl': // 左上
                offsetTop = y;
                offsetLeft = x;
                offsetWidth = -offsetLeft;
                offsetHeight = -offsetTop;
                break;
            case 'tc': // 上
                offsetTop = y;
                offsetHeight = -offsetTop;
                break;
            case 'tr': // 右上
                offsetTop = y;
                offsetWidth = x;
                offsetHeight = -offsetTop;
                break;
            case 'ml': // 左
                offsetLeft = x;
                offsetWidth = -offsetLeft;
                break;
            case 'mr': // 右
                offsetWidth = x;
                break;
            case 'bl': // 左下
                offsetLeft = x;
                offsetWidth = -offsetLeft;
                offsetHeight = y;
                break;
            case 'bc': // 下
                offsetHeight = y;
                break;
            case 'br': // 右下
                offsetWidth = x;
                offsetHeight = y;
                break;
        }
        return {offsetTop, offsetLeft, offsetWidth, offsetHeight};
    }
}