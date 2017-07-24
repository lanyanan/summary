'use strict';
/**
 * 处理调整旋转事件
 * @author   Yanan
 * @datetime 2017-02-09
 */

import {BaseClass} from './../../core/Base.class';
import {publish} from '../../core/pubsub'; // 发布/订阅模式库
import {Actions} from '../../apps/playground/Actions';
// 产生私有成员key
const _getOffset_ = Symbol('_getOffset_'); // 获取偏移矩阵
const _timer_ = Symbol('_timer_'); // 计时器
const _offsetCache_ = Symbol('_offsetCache_'); // 偏移缓冲器

export class DragRotateClass extends BaseClass{
    constructor(){
        super();
        this.oldMoveX = 0;
        this.oldMoveY = 0;
        this[_timer_] = 0;
        this.ghostDom = null;
        this.rotate = 0;
        this.rotateX = 0;
        this.rotateY = 0;
        this.dom = {};
        this.rotateWidth = 0;
        this.rotateHeight = 0;
        this.DomWidth = 0;
        this.DomHeight = 0;
    }

    /**
     * 获取需要操作的dom，如不需要操作其它dom，可直接返回自身
     * ! 该方法将由Drag模块直接调用
     * @param    {document}   dom 传入dom
     * @return   {document}       返回用于操作的dom
     */
    getMoveDom(dom){
        this.dom = dom;
        this.dir = dom.className.match(/ro/);
        let tmp = document.createElement('div');
        this.ghostDom = dom.parentNode.className=='ghost'&&dom.parentNode;
        return tmp; 
    }

    /**
     * 
     * 开始拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   起始横坐标
     * @param    {integer}    y   起始纵坐标
     */
    onStart(dom, x, y){
        this.DomWidth = parseInt(this.dom.parentNode.style.width);
        this.DomHeight = parseInt(this.dom.parentNode.style.height);
        if(this.rotate == 0) {
          this.rotateY = this.dom.parentNode.parentNode.offsetTop + 58 + parseInt(this.dom.parentNode.style.top) + parseInt(this.dom.parentNode.style.height)/2;
          this.rotateX = this.dom.parentNode.parentNode.offsetLeft + 10 + parseInt(this.dom.parentNode.style.left) + parseInt(this.dom.parentNode.style.width)/2;
        } else {

        }
       /* this.oldMoveX = 0;
        this.oldMoveY = 0;
         console.log(this.obj.node.parentNode.parentNode.offsetTop + 58 + parseInt(this.obj.node.parentNode.style.top))
                    console.log(this.obj.node.parentNode.parentNode.offsetLeft + 10 + parseInt(this.obj.node.parentNode.style.left))
        publish('start_rotate_user_widget', 0, 0); // 发布消息：开始拖放
        Actions.showPanel('rightPanel');*/
    }

    /**
     * 正在拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */
    onMove(dom, x, y){
        this.getRotate(x, y);
        this.getRotateWidth();
        this.getRotateHeight();
       // this.ghostDom.style["WebkitTransform"] = "rotate(" + this.rotate + "deg)";  
        publish('resize_rotate_user_widget', 0, this.rotate, this.rotateWidth, this.rotateHeight); // 发布消息：开始旋转
        Actions.rotateUserWidget(this.rotate, this.rotateWidth, this.rotateHeight);
    }

    /**
     * 结束拖放时将触发该方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */

    onEnd(dom, x, y){
        this.getRotate(x, y);
        this.getRotateWidth();
        this.getRotateHeight();
        Actions.rotateUserWidget(this.rotate, this.rotateWidth, this.rotateHeight);
        Actions.showPanel('rightPanel');
        Actions.historyPush();
        publish('end_rotate_user_widget', 0, 0, 0); // 发布消息：拖放结束*/
    }

    /**
     * 获取旋转角度的方法
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */

    getRotate(x, y){
        let Dx = x - this.rotateX;
        let Dy = y - this.rotateY;
        if(x >= this.rotateX && y < this.rotateY) {
            this.rotate = ((Math.atan( - Dx / Dy)) * 180) / Math.PI;
        } else if (x >= this.rotateX && y > this.rotateY) {
            this.rotate = 90 + ((Math.atan(  Dy / Dx)) * 180) / Math.PI
        } else if (x < this.rotateX && y > this.rotateY) {
            this.rotate = 180 + ((Math.atan( -Dx / Dy)) * 180) / Math.PI
        } else if (x <= this.rotateX && y < this.rotateY) {
            this.rotate = 270 + ((Math.atan( Dy / Dx)) * 180) / Math.PI
        }
    }


    /**
     * 由旋转角度获的外四边形的宽
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     * @param    {integer}    x   横坐标偏移量
     * @param    {integer}    y   纵坐标偏移量
     */

    getRotateWidth(){
        let  diagonal  =  Math.sqrt(Math.pow(this.DomWidth,2) + Math.pow(this.DomHeight,2));
        let  diagonalRotateMax = (Math.atan(this.DomWidth / this.DomHeight) * 180) / Math.PI;
        let  diagonalRotateMin = (Math.atan(this.DomHeight / this.DomWidth) * 180) / Math.PI;
        if(0 < this.rotate && this.rotate <= 90) {
            if (0 < (diagonalRotateMax + this.rotate) && (diagonalRotateMax + this.rotate) <= 90) {
                this.rotateWidth = diagonal * Math.sin(((diagonalRotateMax + this.rotate) * Math.PI) / 180);
            } else {
                this.rotateWidth = diagonal * Math.sin(((180 - diagonalRotateMax - this.rotate) * Math.PI) / 180); 
            }  
        } else if ( 90 < this.rotate && this.rotate<= 180) {
            if ((diagonalRotateMin + this.rotate) <= 180) {
                this.rotateWidth = diagonal * Math.sin(((diagonalRotateMin + this.rotate - 90) * Math.PI) / 180);
            } else {
                this.rotateWidth = diagonal * Math.sin(((270 - diagonalRotateMin - this.rotate) * Math.PI) / 180);
            }
        } else if (180 <  this.rotate &&  this.rotate <= 270) {
            if ((diagonalRotateMax + this.rotate) <= 270) {
                this.rotateWidth = diagonal * Math.sin(((diagonalRotateMax + this.rotate - 180) * Math.PI) / 180);
            } else {
                this.rotateWidth = diagonal * Math.sin(((360 - diagonalRotateMax - this.rotate ) * Math.PI) / 180);
            }
        } else if (270 <  this.rotate &&  this.rotate < 360) {
            if ((diagonalRotateMax + this.rotate) <= 360) {
                this.rotateWidth = diagonal * Math.sin(((diagonalRotateMin + this.rotate - 270) * Math.PI) / 180);
            } else {
                this.rotateWidth = diagonal * Math.sin(((450 - diagonalRotateMin - this.rotate ) * Math.PI) / 180);
            }
        }
    } 


     /**
     * 由旋转角度获的外四边形的高
     * ! 该方法将由Drag模块自动调用
     * @param    {document}   dom [description]
     *
     */

    getRotateHeight(){
        let  diagonal  =  Math.sqrt(Math.pow(this.DomWidth,2) + Math.pow(this.DomHeight,2));
        let  diagonalRotateMax = (Math.atan(this.DomWidth / this.DomHeight) * 180) / Math.PI;
        let  diagonalRotateMin = (Math.atan(this.DomHeight / this.DomWidth) * 180) / Math.PI;
        if((this.rotate) <= 90) {
            if (0 < (diagonalRotateMin + this.rotate) && (diagonalRotateMin + this.rotate) <= 90) {
               this.rotateHeight = diagonal * Math.sin(((diagonalRotateMin + this.rotate) * Math.PI) / 180);
            } else {
               this.rotateHeight = diagonal * Math.sin(((180 - diagonalRotateMin - this.rotate) * Math.PI) / 180);
            }  
        } else if ( 90 < (this.rotate) && (this.rotate) <= 180) {
            if ((diagonalRotateMax + this.rotate) <= 180) {
               this.rotateHeight = diagonal * Math.sin(((diagonalRotateMax + this.rotate - 90) * Math.PI) / 180);
            } else {
               this.rotateHeight = diagonal * Math.sin(((270 - diagonalRotateMax - this.rotate) * Math.PI) / 180);
            }
        } else if (180 < (this.rotate) && (this.rotate)<= 270) {
            if ((diagonalRotateMin + this.rotate) <= 270) {
               this.rotateHeight = diagonal * Math.sin(((diagonalRotateMin + this.rotate - 180) * Math.PI) / 180);
            } else {
               this.rotateHeight = diagonal * Math.sin(((360 - diagonalRotateMin - this.rotate ) * Math.PI) / 180);
            }
        } else if (270 < (this.rotate) && (this.rotate) < 360) {
            if ((diagonalRotateMin + this.rotate) <= 360) {
               this.rotateHeight = diagonal * Math.sin(((diagonalRotateMax + this.rotate - 270) * Math.PI) / 180);
            } else {
               this.rotateHeight = diagonal * Math.sin(((450 - diagonalRotateMax - this.rotate ) * Math.PI) / 180);
            }
        }
    } 
}