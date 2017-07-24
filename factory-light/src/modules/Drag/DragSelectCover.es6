'use strict';
/**
 * 处理画布大小调节拖放事件
 * @author   Vilien
 * @datetime 2015-12-25
 */

import {BaseClass} from '../../core/Base.class.es6';
import {publish} from '../../core/pubsub.es6'; // 发布/订阅模式库
import {Actions} from '../../app/Actions.es6';

export class DragSelectCoverClass extends BaseClass{
    constructor(){
        super();
        this.top = 0;
        this.left = 0;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */
    getMoveDom(dom){
        let tmp = document.createElement('div');
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
        this.left = x;
        this.top = y;
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
        console.log("画布拖放")
        this.width = x - this.left;
        this.height = y - this.top;
        // Actions.selectCover(offsetY);
    }

    /**
     * 结束拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onEnd(dom, x, y){
        publish('end_drag_user_widget', 0, 0, 0); // 发布消息：拖放结束
    }
}