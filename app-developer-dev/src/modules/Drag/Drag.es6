'use strict';
/**
 * 拖放处理模块，所有拖放事件都在此分流处理
 * ! 此类为公共类，修改须谨慎
 * @author   vilien
 * @datetime 2015-12-10
 */

import {BaseClass} from './../../core/Base.class';
import * as Comm from '../common'; // 公共函数库
import {DragWidgetClass} from './DragWidget'; // 控件拖放处理类
import {DragResizeClass} from './DragResize'; // 调节大小拖放处理类
//import {DragRotateClass} from './DragRotate'; // 调节旋转处理类
import {DragPanelClass} from './DragPanel'; // 面板拖放处理类
import {DragUserWidgetClass} from './DragUserWidget'; // 用户控件拖放处理类
import {DragCanvasClass} from './DragCanvas'; // 用户控件拖放处理类
import {DrawSelectCoverClass} from './DrawSelectCover'; // 多选cover区域处理类
import {DragCodePanelClass} from './DragCodePanel'; // 多选cover区域处理类

// 实例化处理类
let DragWidget = new DragWidgetClass();
let DragResize = new DragResizeClass();
//let DragRotate = new DragRotateClass();
let DragPanel = new DragPanelClass();
let DragUserWidget = new DragUserWidgetClass();
let DragCanvas = new DragCanvasClass();
let DrawSelectCover = new DrawSelectCoverClass();
let DragCodePanel = new DragCodePanelClass();

// 产生私有成员key
const _isDraging_ = Symbol('_isDraging_'); // 是否正在拖动
const _dom_ = Symbol('_dom_'); // 正在拖动的dom对像
const _handler_ = Symbol('_handler_'); // 拖动事件处理程序

export class DragClass extends BaseClass{
    constructor(){
        super();
        this.config = {
            onUpResetMatrix: false  // 拖放结束后是否重置矩阵
        };
        this.matrix = [1, 0, 0, 1, 0, 0];
        this.reset();
        document.onmouseup = (e)=>this.onMouseUp(e);
    }

    // 拖放对象重置
    reset(){
        this[_isDraging_] = false;
        this.originX = 0;
        this.originY = 0;
        this.rotate = 0;
        this.startX = 0;
        this.startY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this[_dom_] = null;
        this[_handler_] = {};
        this.obj = {};
    }

    // 返回事件列表，以供React组件rest方式解构
    events(){
        return {
            onMouseDown: (e)=>this.onMouseDown(e),
            onMouseUp: (e)=>{if(this[_isDraging_])this.onMouseUp(e);},
            onMouseMove: (e)=>{if(this[_isDraging_])this.onMouseMove(e);}
        };
    }

    // 鼠标按下事件
    /*
     *  case 'rotate':   // 旋转类
     *      this[_handler_] = DragRotate;
     *      break;
     */
    onMouseDown(e){
        this.obj = this.getDragDomObject(e);
        this.startX = e.pageX;
        this.startY = e.pageY;
        if (this.obj.type) {
            e.preventDefault();
            e.stopPropagation();
            switch(this.obj.type){
                case 'widget':  // 控件类
                    this[_handler_] = DragWidget;
                    break;
                case 'resize':  // 大小调整类
                    this[_handler_] = DragResize;
                    break;
                case 'rotate':  // 旋转调整类
                    this[_handler_] = DragRotate;
                    break;
                case 'panel':   // 面板类
                    this[_handler_] = DragPanel;
                    break;
                case 'customer': // 用户控件类
                    this[_handler_] = DragUserWidget;
                    break;
                case 'canvas': // 画布类
                    this[_handler_] = DragCanvas;
                    break;
                case 'select': // 绘制多选区域
                    this[_handler_] = DrawSelectCover;
                    break;
                case 'codePanel': // 代码编辑面板类
                    this[_handler_] = DragCodePanel;
                    break;
            }
            this[_isDraging_] = true;
            this.initMatrix(this.obj.node);
            this[_handler_].config && Object.assign(this.config, this[_handler_].config);
            this[_dom_] = this[_handler_].getMoveDom(this.obj.node);
            this[_handler_].onStart && this[_handler_].onStart(this[_dom_], this.startX, this.startY);
        }
    }

    // 鼠标释放事件
    onMouseUp(e){
        this.offsetX = e.pageX - this.startX + this.originX;
        this.offsetY = e.pageY - this.startY + this.originY;
        if (this.obj.type == 'rotate') {
            this[_handler_].onEnd && this[_handler_].onEnd(this[_dom_], e.pageX, e.pageY);
        } else {
            this[_handler_].onEnd && this[_handler_].onEnd(this[_dom_], this.offsetX, this.offsetY);
        }
        this.config.onUpResetMatrix && this.resetMatrix();
        this.reset();
    }

    // 鼠标移动事件
    onMouseMove(e){
        this.offsetX = e.pageX - this.startX + this.originX;
        this.offsetY = e.pageY - this.startY + this.originY;  
        this.matrix[4] = this.offsetX;
        this.matrix[5] = this.offsetY;
        if (this.obj.type == 'rotate') {
            this[_handler_].onMove(this[_dom_], e.pageX, e.pageY);
        } else {
            this.transform();
            this[_handler_].onMove && this[_handler_].onMove(this[_dom_], this.offsetX, this.offsetY);
        }  
    }

    // 获取可移动对象
    getDragDomObject(e){
        let node = e.target,
            type = node.getAttribute('data-dragtype');
        while (!type && node.tagName.toLowerCase()!=='body') {
            node = node.parentNode;
            type = node.getAttribute('data-dragtype');
        }
        return {node, type};
    }

    /**
     * 调整dom矩阵
     * @param    {array}   matrix 矩阵数组
     */
    transform(matrix = this.matrix){
        if (Array.isArray(this[_dom_])) {
            this[_dom_].forEach(dom=>dom.style.transform = `matrix(${matrix})`);
        } else {
            this[_dom_].style.transform = `matrix(${matrix})`;
        }
    }

    /**
     * 重置矩阵
     */
    resetMatrix(){
        this.matrix[4] = this.originX;
        this.matrix[5] = this.originY;
        this.transform();
    }

    /**
     * 解析transform矩阵
     * @param    {[type]}   dom DOM对象
     */
    initMatrix(dom){
        let transform = Comm.getStyle(dom, 'transform'), // matrix(1, 0, 0, 1, X, Y)
            reMatrix = transform.match(/matrix\((.+?)\)/), // ["matrix(1, 0, 0, 1, X, Y)", "1, 0, 0, 1, X, Y"]
            arrMatrix = reMatrix && reMatrix[1].split(','); // ["1", "0", "0", "1", "X", "Y"]
        if (!arrMatrix) {
            this.matrix = [1, 0, 0, 1, 0, 0];
        } else {
            this.matrix = arrMatrix.map((n)=>+n);
        }
        this.originX = this.matrix[4];
        this.originY = this.matrix[5];
    }

}