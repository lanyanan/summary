'use strict';
/**
 * 处理面板拖放事件
 * @author   xinglin
 * @datetime 2016-05-24
 */

import {BaseClass} from './../../core/Base.class';

export class DragPanelClass extends BaseClass{
    constructor(){
        super();
        this.oldMoveY=0;
        this.oldMoveX=0;
        this.panelType='';
        this.tmp='';
        this.odom='';
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */
    getMoveDom(dom){
        this.panelType = dom.getAttribute('data-dragvalue');
        dom.className = dom.className==='tabs-off'?'tabs-on':'tabs-off';
        this.odom = dom;
        let vdom = document.createElement('div');
        return vdom;
    }

    /**
     * 开始拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   起始横坐标
     * @param    {integer}    y   起始纵坐标
     */
    onStart(dom, x, y){
        switch(this.panelType){
            case 'size':
                this.tmp = document.querySelector('#size-view');
                this.tmp.style.zIndex = Math.max(document.querySelector('#exterior-view').style.zIndex,document.querySelector('#property-view').style.zIndex)+1;
            break;
            case 'exterior':
                this.tmp = document.querySelector('#exterior-view');
                this.tmp.style.zIndex = Math.max(document.querySelector('#size-view').style.zIndex,document.querySelector('#property-view').style.zIndex)+1;
            break;
            case 'property':
                this.tmp = document.querySelector('#property-view');
                this.tmp.style.zIndex = Math.max(document.querySelector('#exterior-view').style.zIndex,document.querySelector('#size-view').style.zIndex)+1;
            break;
            default:;
        }
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
        this.oldMoveY = y;
        let offsetX = x - this.oldMoveX;
        this.oldMoveX = x;
        if(this.panelType!=='property'){
            this.tmp.style.top=parseInt(this.tmp.style.top)+offsetY+'px';
            this.tmp.style.left=parseInt(this.tmp.style.left)+offsetX+'px';
            // if(parseInt(this.tmp.style.top)<0) this.tmp.style.top=0+'px';
            // if(parseInt(this.tmp.style.left)<0) this.tmp.style.left=0;
        }else{
            this.tmp.style.top=parseInt(this.tmp.style.top)+offsetY+'px';
            this.tmp.style.right=parseInt(this.tmp.style.right)-offsetX+'px';
            // if(parseInt(this.tmp.style.top)<0) this.tmp.style.top=0+'px';
            // if(parseInt(this.tmp.style.right)<0) this.tmp.style.right=0;
        }
    }

    /**
     * 结束拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onEnd(dom, x, y){
        this.oldMoveX = 0;
        this.oldMoveY = 0;
        this.odom.className = this.odom.className==='tabs-off'?'tabs-on':'tabs-off';
    }
}