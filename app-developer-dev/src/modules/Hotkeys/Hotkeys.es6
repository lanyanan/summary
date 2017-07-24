'use strict';
/**
 * 快捷键操作类
 * 场景中的快捷键
 * @author   vilien
 * @datetime 2016-01-04
 */

import Reflux from 'reflux';
import {BaseClass} from '../../core/Base.class';
import {Actions} from '../../apps/playground/Actions';

class HotkeysClass extends BaseClass{
    constructor(){
        super();
        this.ctrlKey = false; // ctrl键是否被按下
        this.shiftKey = false; // ctrl键是否被按下
        this.keyCode = 0; // 键值
    }

    // 捕获event
    capture(e){
        if((e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA' || e.target.tagName == 'SELECT')
            && e.target.type != 'range' && e.target.type != 'date'&& e.target.type != 'button') return;
        if (e.currentTarget.toString() !== '[object HTMLDocument]') return; // 仅捕获document元素绑定的event
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.keyCode = e.keyCode || e.which;
        if (e.target.tagName != 'SELECT' && e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA'){
            e.stopPropagation();
        }else{
            e.preventDefault();
        }
        switch (this.keyCode){
            case 8:
            case 46: // delete键
            case 110: // del键
                this.delWidget();
                break;
            case 37: // 向左键
                this.leftWidget();
                break;
            case 38: // 向上键
                this.upWidget();
                break;
            case 39: // 向右键
                this.rightWidget();
                break;
            case 40: // 向下键
                this.downWidget();
                break;
            case 67: // C键
                this.copyWidget();
                break;
            case 85: // U键
                this.undo();
                break;
            case 86: // V键
                this.pasteWidget();
                break;
            case 89: // Y键
                this.ctrlKey && this.redo();
                break;
            case 90: // Z键
                this.ctrlKey && this.undo();
                break;
        }
    }

    // 删除控件
    delWidget(){
        Actions.delUserWidget();
    }

    // 复制控件
    copyWidget(){
        if (this.ctrlKey) {
            Actions.markCopyingUserWidget();
        }
    }

    // 粘贴控件
    pasteWidget(){
        if (this.ctrlKey) {
            Actions.pasteUserWidget();
        }
    }

    // 向左调节控件
    leftWidget(){
        if (this.shiftKey) { // 组合shift，向左调节宽度
            Actions.resizeUserWidget(0, -1, 1, 0);
        } else {
            Actions.moveUserWidget(-1, 0);
        }
    }

    // 向右调节控件
    rightWidget(){
        if (this.shiftKey) { // 组合shift，向右调节宽度
            Actions.resizeUserWidget(0, 0, 1, 0);
        } else {
            Actions.moveUserWidget(1, 0);
        }
    }

    // 向上调节控件
    upWidget(){
        if (this.ctrlKey) { // 组合ctrl，调节z轴
            Actions.upZIndexUserWidget();
        } else if (this.shiftKey) { // 组合shift，向上调节高度
            Actions.resizeUserWidget(-1, 0, 0, 1);
        } else {
            Actions.moveUserWidget(0, -1);
        }
    }

    // 向下调节控件
    downWidget(){
        if (this.ctrlKey) { // 组合ctrl，调节z轴
            Actions.downZIndexUserWidget();
        } else if (this.shiftKey) { // 组合shift，向下调节高度
            Actions.resizeUserWidget(0, 0, 0, 1);
        } else {
            Actions.moveUserWidget(0, 1);
        }
    }

    // 撤销一步
    undo(){
        Actions.historyBack();
    }

    // 往前一步
    redo(){
        Actions.historyForward();
    }


};

export const Hotkeys = new HotkeysClass();