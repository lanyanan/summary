'use strict';
/**
 * 处理控件拖放事件
 * @author   vilien
 * @datetime 2015-12-10
 */

import {BaseClass} from '../../core/Base.class.es6';
import {publish} from '../../core/pubsub.es6'; // 发布/订阅模式库
import {Widgets} from '../WidgetsPanel/Widgets.class.es6'; // 控件库

export class DragWidgetClass extends BaseClass{
    constructor(){
        super();
        this.widget = null; // 组件对象
        this.moveDom = document.createElement('div'); // 虚拟组件，用于拖放时占位
        this.moveDom.className = 'virtual-widget';
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */
    getMoveDom(dom){
        let wId = dom.getAttribute('data-wid');
        this.widget = Widgets.getWidgetById(wId);
        // this.moveDom.style.width = this.widget.width + 'px';
        // this.moveDom.style.height = this.widget.height + 'px';
        this.moveDom.style.width = 30 + 'px';
        this.moveDom.style.height = 40 + 'px';
        return this.moveDom;
    }

    /**
     * 开始拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   起始横坐标
     * @param    {integer}    y   起始纵坐标
     */
    onStart(dom, x, y){
        document.body.appendChild(this.moveDom);
        // this.moveDom.style.top = (y - this.widget.height / 2) + 'px';
        // this.moveDom.style.left = (x - this.widget.width / 2) + 'px';
        this.moveDom.style.top = (Number(y) -15) + 'px';
        this.moveDom.style.left = (Number(x) -20) + 'px';
        this.moveDom.style.display = 'block';
        publish('start_drag_widget', this.widget.id, x, y); // 发布消息：开始拖放
    }

    /**
     * 正在拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onMove(dom, x, y){
    }

    /**
     * 结束拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onEnd(dom, x, y){
        this.moveDom.style.display = 'none';
        this.moveDom.style.transform = 'translate(0, 0)'; // 重置位移
        publish('end_drag_widget', this.widget.id, x, y); // 发布消息：拖放结束
    }
}