'use strict';
/**
 * 处理画布大小调节拖放事件
 * @author   Vilien
 * @datetime 2015-12-25
 */

import {BaseClass} from './../../core/Base.class';
import {publish} from '../../core/pubsub'; // 发布/订阅模式库
import {Actions} from '../../apps/playground/Actions';

export class DragCanvasClass extends BaseClass{
    constructor(){
        super();
        this.oldMoveY = 0;
        this.scrollDOM = null;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */
    getMoveDom(dom){
        let tmp = document.createElement('div');
        this.scrollDOM = document.querySelector('.scene-screen');
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
        this.oldMoveY = 0;
        publish('start_drag_user_widget', 0, 0, 0); // 发布消息：开始拖放
    }

    /**
     * 正在拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onMove(dom, x, y){
        let offsetY = y - this.oldMoveY;
        this.scrollDOM.scrollTop += offsetY;
        this.oldMoveY = y;
        publish('canvas_drag_user_widget', 0,offsetY); // 发布消息：拖放结束
    }

    /**
     * 结束拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onEnd(dom, x, y){
        Actions.resizeCanvas(y);
        publish('end_drag_user_widget', 0, 0, 0); // 发布消息：拖放结束
    }
}