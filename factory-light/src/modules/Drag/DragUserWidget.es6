'use strict';
/**
 * 处理用户控件拖放事件
 * @author   vilien
 * @datetime 2015-12-15
 */

import {BaseClass} from '../../core/Base.class.es6';
import {publish} from '../../core/pubsub.es6'; // 发布/订阅模式库
import {Actions} from '../../app/Actions.es6';

export class DragUserWidgetClass extends BaseClass{
    constructor(){
        super();
        this.oldMoveX = 0;
        this.oldMoveY = 0;
        this.ghostDom = null;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */
    getMoveDom(dom){
        let tmp = document.createElement('div');
        this.ghostDom = dom;
        return tmp;
        // return dom;
    }

    /**
     * 开始拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   起始横坐标
     * @param    {integer}    y   起始纵坐标
     */
    onStart(dom, x, y){
        this.oldMoveX = 0;
        this.oldMoveY = 0;
        publish('start_drag_user_widget', 1, x, y); // 发布消息：开始拖放
        console.log(8)
    }

    /**
     * 正在拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onMove(dom, x, y){
        let offsetX = x - this.oldMoveX;
        let offsetY = y - this.oldMoveY;
        this.oldMoveX = x;
        this.oldMoveY = y;
        this.ghostDom.style.left = parseInt(this.ghostDom.style.left)+offsetX+'px';
        this.ghostDom.style.top = parseInt(this.ghostDom.style.top)+offsetY+'px';
        publish('move_drag_user_widget', 1, offsetX, offsetY); // 发布消息：拖放中
        //Actions.moveUserWidget(offsetX, offsetY);
    }

    /**
     * 结束拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onEnd(dom, x, y){
        Actions.moveUserWidget(x,y);
        publish('end_drag_user_widget', 1, x, y); // 发布消息：拖放结束
    }
}