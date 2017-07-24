'use strict';
/**
 * 手机魔方
 * 场景中的虚拟手机
 * @author   vilien
 * @datetime 2015-11-19T19:00:05+0800
 */

import React from 'react';
import {transform} from 'react-tools'; // 导入transform方法用于转换jsx
import Reflux from 'reflux';
import {BaseClass} from '../../core/Base.class';
import * as Comm from '../common'; // 公共函数库
import {subscribe,publish} from '../../core/pubsub'; // 发布/订阅模式库
import {Widgets} from '../WidgetsPanel/Widgets.class'; // 控件库
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
import {Hotkeys} from '../Hotkeys/Hotkeys'; // 快捷键处理类
import {getWidgetStyle} from './StyleParse'; // 样式解析类

// 产生私有成员key
const _phoneDocument_ = Symbol('_phoneDocument_');  // 手机document
const _phoneCanvas_ = Symbol('_phoneCanvas_');  // 手机画布
const _dropArea_ = Symbol('_dropArea_');  // 拖放接受区
const _initPhoneCanvas_ = Symbol('_initPhoneCanvas_'); // 初始化画布
const _userWidgetList_ = Symbol('_userWidgetList_'); // 用户控件列表
const _cacheCssCode_ = Symbol('_cacheCssCode_'); // CSS缓存
const _cacheClassName_ = Symbol('_cacheClassName_'); // CSS类名缓存
const _activeWidgetDom_ = Symbol('_activeWidgetDom_'); // CSS缓存

let deepcopy = (o) => {
    if (o instanceof Array) {
        var n = [];
        for (var i = 0; i < o.length; ++i) {
            n[i] = deepcopy(o[i]);
        }
        return n;
    } else if (o instanceof Function) {
        var n = new Function("return " + o.toString())();
        return n
    } else if (o instanceof Object) {
        var n = {}
        for (var i in o) {
            n[i] = deepcopy(o[i]);
        }
        return n;
    } else {
        return o;
    }
};


export default class MagicView extends BaseClass {
    constructor(){
        super();
        this[_phoneDocument_] = null;
        this[_phoneCanvas_] = null; // 手机画布
        this[_dropArea_] = null; // 拖放接受区
        this[_userWidgetList_] = {};
        this[_cacheCssCode_] = [];
        this[_cacheClassName_] = {};
        this[_activeWidgetDom_] = null;
        this.startX = 0; // 横坐标起始点
        this.startY = 0; // 纵坐标起始点
        this.offsetX = 0;  // 横坐标偏移量
        this.offsetY = 0;  // 纵坐标偏移量
        this.init();
    }

    // 初始化
    init(){
        // 订阅控件拖拽消息（新控件）
        subscribe('start_drag_widget', (wId, x, y)=>this.startDragWidget(wId, x, y));
        subscribe('end_drag_widget', (wId, x, y)=>this.endDragWidget(wId, x, y));
        // 订阅控件调整位置消息（用户控件）
        subscribe('start_drag_user_widget', (wId, x, y)=>this.startDragUserWidget(wId, x, y));
        subscribe('move_drag_user_widget', (wId, x, y)=>this.moveDragUserWidget(wId, x, y));
        subscribe('canvas_drag_user_widget', (wId,y)=>this.canvasDragUserWidget(wId, y));
        subscribe('resize_drag_user_widget', (wId, x, y, w, h)=>this.resizeDragUserWidget(wId, x, y, w, h));
        subscribe('end_drag_user_widget', (wId, x, y)=>this.endDragUserWidget(wId, x, y));
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        let $mv = this;
        return React.createClass({
            mixins: [Reflux.connect(Store)],
            getInitialState: function(){
                return {
                    ghost:{
                        width:0,
                        height:0,
                        top:0,
                        left:0,
                        display:false,
                        index:-1,
                        rotate:0
                    },
                    phone:{height:0},
                    panelSwitch:{
                        snapLineSwitch:1
                    },
                    pages: {
                        activePage:0,
                        activeWidget:-1,
                        activeWidgetChild:-1,//选项卡里的选项index（儿子）
                        activeWidgetGrandchild:-1,//对应选项里的控件index（孙子）
                        pageList:[
                            {pageName:'主页',pageId:0,widgetList:[]}
                        ]
                    },
                    editDisplay:false,
                    multipleEditDisplay:false
                };
            },
            componentDidMount: function(){
                // let tabBarSession = {isEdit:false,userWidgetID:false,tabIndex:-1};
                // sessionStorage.setItem('tabBar',JSON.stringify(tabBarSession));
                $mv[_dropArea_] = React.findDOMNode(this.refs.dropArea);
                React.findDOMNode(this.refs.phoneCanvas).onload = function(){
                    $mv[_phoneDocument_] = this.contentDocument;
                    $mv[_phoneCanvas_] = $mv[_phoneDocument_].getElementById('phoneCanvas');
                    $mv[_initPhoneCanvas_]();
                    $mv[_phoneDocument_].addEventListener('keydown', (e)=>Hotkeys.capture(e));
                };
            },
            handleGhostClick: function(e){
                e.stopPropagation();
            },
            handleGhostDBClick: function(e){
                //双击进入编辑模式 只有scheme包含text的widget可以编辑
                e.stopPropagation();
                let pages = this.state.pages,
                    widget = pages.pageList[pages.activePage]
                            .widgetList[pages.activeWidget];
                if(widget && widget.id === 1019 && pages.activeWidgetGrandchild >-1){//选项卡 指定选项的控件集合
                    widget = widget.widgetListItem[pages.activeWidgetChild][pages.activeWidgetGrandchild];
                }
                if(widget.scheme && widget.scheme.indexOf('text') >= 0){
                    let editText = typeof widget === 'object' ? widget.editText : '';
                    if(widget.id == 1002 || widget.id == 1015 || widget.id == 1016){
                        this.setState({
                            multipleEditDisplay:true,
                            editDisplay:false
                        },()=>{
                            document.querySelector('#multipletextedit').focus();
                            document.querySelector('#multipletextedit').value = editText;
                            document.querySelector('#multipletextedit').style.fontSize = widget.propertySet[0].fontSize || 16 +"px";
                        });
                    }else{
                        this.setState({
                            editDisplay:true,
                            multipleEditDisplay:false
                        },()=>{
                            document.querySelector('#textedit').focus();
                            document.querySelector('#textedit').value = editText;
                            document.querySelector('#textedit').style.fontSize = widget.propertySet[0].fontSize?widget.propertySet[0].fontSize:(widget.id==1001?36:20)+"px";
                        });
                    }
                }
            /*    if(widget.id === 1019){//选项卡编辑
                    let tabBarSession = sessionStorage.getItem('tabBar')?JSON.parse(sessionStorage.getItem('tabBar')):{};
                    tabBarSession.isEdit = tabBarSession.isEdit?false:true;
                    console.log(tabBarSession.isEdit);
                    tabBarSession.userWidgetID = widget.userWidgetID;
                    sessionStorage.setItem('tabBar',JSON.stringify(tabBarSession));
                    // Actions.selectUserWidget(-1); // 取消控件选中状态
                }*/

                if(widget && widget.id === 1020 && this.state.pages.activeWidgetGridChild < 0){ //九宫格
                    let x = Number(e.pageX) - Number(e.target.getBoundingClientRect().left),
                        y = Number(e.pageY) - Number(e.target.getBoundingClientRect().top),
                        width = Number(e.target.offsetWidth),
                        height = Number(e.target.offsetHeight);

                    let widgetInfo = widget.widgetInfo,
                        row = widgetInfo.row,
                        column = widgetInfo.column;

                    let num = row * column;

                    function gridNum(x,y,w,h,row,column){
                        let a,
                            b,
                            gridWidth = width / column, //格子宽度
                            gridHeight = height / row;  //格子高度

                        a = Math.ceil(y / gridHeight);
                        b = Math.ceil(x / gridWidth);

                        let num = (a - 1) * column + b;
                        return num;
                    }
                    let index = gridNum(x,y,width,height,row,column) -1;
                    Actions.selectUserWidget(pages.activeWidget,{top: widget.gridChildList[index].top, left: widget.gridChildList[index].left},-1,-1, index);

                }
            },
            handleEditChange:function(e){
                //处理新编辑的text
                let snvalue = e.target.value;
                Actions.changeWidgetText(snvalue);
            },
            handleEditBlur:function(e){
                //处理失去焦点(编辑结束)事件 隐藏编辑框
                this.setState({
                    editDisplay:false,
                    multipleEditDisplay:false
                });
            },
            editKeydown : function(e){//回车快捷键 提交命名结束
                e.stopPropagation();
                if(e.keyCode == 13){
                    this.handleEditBlur(e);
                }
                else{
                    return;
                }
            },
            render: function(){
                let ghostStyle = {
                    display: this.state.ghost.display ? 'block' : 'none',
                    top: this.state.ghost.top,
                    left: this.state.ghost.left,
                    width: this.state.ghost.width,
                    height: this.state.ghost.height,
                    transform: 'rotate(' + this.state.ghost.rotate + 'deg)'
                };
                let editStyle = {
                    display:this.state.ghost.display&&this.state.editDisplay ? 'block' : 'none',
                    top: this.state.ghost.top,
                    left: this.state.ghost.left,
                    width: this.state.ghost.width,
                    height: this.state.ghost.height
                };
                let multiEditStyle = {
                    display:this.state.ghost.display&&this.state.multipleEditDisplay ? 'block' : 'none',
                    top: this.state.ghost.top,
                    left: this.state.ghost.left,
                    width: this.state.ghost.width,
                    height: this.state.ghost.height
                };

                let snapline = this.state.ghost.rotate ? 'none' : (this.state.panelSwitch.snapLineSwitch==1?'block':'none');

                let canvasHeight = this.state.phone.height > this.props.height ? this.state.phone.height : this.props.height;

                let dragStatus = this.state.ghost.dragStatus ? JSON.stringify(this.state.ghost.dragStatus) : "";
                return (
                    <div id="magicview">
                        <div className="canvas-wrap" id='canvas-wrap' style={{width:this.props.width, height:canvasHeight}}>
                            <div ref="dropArea" className="drop-area"></div>
                            <div id= "selection-frame" >
                                <div id="selection-frame-item" ></div>
                            </div>
                            <div className="ghost" style={ghostStyle} onClick={this.handleGhostClick} data-dragstatus={dragStatus} onDoubleClick={this.handleGhostDBClick} data-dragtype="customer" data-dragable={this.state.ghost.dragable}>
                                <div className="handle tl" data-dragtype="resize"></div>
                                <div className="handle tc" data-dragtype="resize"></div>
                                <div className="handle tr" data-dragtype="resize"></div>
                                <div className="handle ml" data-dragtype="resize"></div>
                                <div className="handle mr" data-dragtype="resize"></div>
                                <div className="handle bl" data-dragtype="resize"></div>
                                <div className="handle bc" data-dragtype="resize"></div>
                                <div className="handle br" data-dragtype="resize"></div>
                                <div className='handleline lv' style={{top: '0px', let: '0px', display: snapline, height: this.state.ghost.height}}></div>
                                <div className='handleline th' style={{left: '0px', top: '0px', width: ghostStyle.width, display: snapline}}></div>
                                <div className='handleline rv' style={{top: '0px', right: '0px', display: snapline, height: this.state.ghost.height}}></div>
                                <div className='handleline bh' style={{left: '0px', bottom: '0px', width: this.state.ghost.width, display: snapline}}></div> 
                            </div>
                            <iframe ref="phoneCanvas" src="phoneCanvas.html" width="100%" height="100%"></iframe>
                            <input onBlur={this.handleEditBlur} onKeyDown={this.editKeydown} id='textedit' type='text' onChange={this.handleEditChange} style={editStyle} defaultValue='' />
                            <textarea onBlur={this.handleEditBlur} id='multipletextedit' onChange={this.handleEditChange} style={multiEditStyle} defaultValue=''></textarea>
                            <div className="resize-canvas" data-dragtype="canvas"></div>
                        </div>
                    </div>
                );
            }
        });
    }

    /**
     * 接受到开始拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    startDragWidget(wId, x, y){
        this.startX = x;
        this.startY = y;
        this[_dropArea_].style.display = 'block'; // 显示拖放接受区
    }
    setWidgetProperty(widget){
        widget.top = this.offsetY;
        widget.left = this.offsetX;
        widget.widgetOpacity = 100;
        widget.commandType = 1;
        widget.propertySet = [{
            propertyId:1,
            imageInfo:'',
            statusVisibility:1,
            widgetStatusName:'',
            fontSize:'',
            textColor:'',
            switchValue:1,
            multipleText:'',
            activeStatus:0,
            eventSet:[{
                eventType:1,
                eventField:'',
                eventValue:'',
                checkedPageId:'',
                updateFlag:undefined,
                activeStatusField:{},
                byteLength:0,
                hiddenWidgetList:[],
                showWidgetList:[]
            }],
            statusSet:[{
                statusField:'',
                statusValue:'',
                bgImagePath:'',
                statusName:''
            }],
        }];

        widget.widgetInfo = widget.widgetInfo ? widget.widgetInfo : {};
        widget.widgetInfo.dragStatus = widget.widgetInfo.dragStatus ? widget.widgetInfo.dragStatus : { 
            top: true,
            bottom: true,
            left: true,
            right: true,
            changeWidth: true,
            changeHeight: true
        }
        
        return widget;
    }
    /**
     * 接受到停止拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    endDragWidget(wId, x, y){
        let widget = Widgets.getWidgetById(wId),
            activeID = Widgets.newUserWidgetID(widget),
            rect = Comm.getElementRect(this[_dropArea_]);

        this.offsetX = this.startX + x - rect.left - widget.width / 2;
        this.offsetY = this.startY + y - rect.top - widget.height / 2;
        if (this.offsetX < -widget.width || this.offsetX > this[_dropArea_].parentNode.offsetWidth || this.offsetY < -widget.height) return;
        
        

        widget = this.setWidgetProperty(widget);
        
        
        if(widget.id === 1019) {
            var arr = [] ,arrChild = [];
            arr.push(arrChild);
            widget.widgetListItem = arr;
        }

        
        if(widget.id === 1018){
            let newStatusSet = (widget.propertySet[0].statusSet[0]);
            let newStatusSet2 = deepcopy(newStatusSet);
            widget.propertySet[0].statusSet.push(newStatusSet);
            widget.propertySet[0].statusSet.push(newStatusSet2);
        }

        if(widget.id === 1020 ) {
            let gridWidget = Widgets.getWidgetById(1021); //子宫格
            gridWidget = this.setWidgetProperty(gridWidget);
            gridWidget.userWidgetID = Widgets.newUserWidgetID(gridWidget);

            let gridTemplate = deepcopy(gridWidget);
            widget.gridTemplate = gridTemplate;

            widget.gridChildList = [];
            let row = widget.widgetInfo.row,
                column = widget.widgetInfo.column,
                num = row * column;

            gridTemplate.width = 375 / column;
            gridTemplate.height = 184;
            for(let i = 0; i < num; i++){
                let newGridWidget = deepcopy(gridTemplate);
                newGridWidget.userWidgetID = newGridWidget.userWidgetID + i + 1;
                newGridWidget.left = newGridWidget.width * i;
                newGridWidget.top = newGridWidget.top + 10;
                let newStatus = {statusValue: '',statusField: '',bgImagePath: '',statusName: ''};

                newGridWidget.propertySet[0].statusSet.push(newStatus);
                let newEvent = {
                    eventType: 1,
                    eventValue: '',
                    activeStatusField: {},
                    eventField: '',
                    checkedPageId: '',
                    hiddenWidgetList: [],
                    showWidgetList: []
                };

                newGridWidget.propertySet[0].statusSet[0].statusName = "开状态";
                newGridWidget.propertySet[0].statusSet[1].statusName = "关状态";

                newGridWidget.propertySet[0].eventSet.push(newEvent);

                widget.gridChildList.push(newGridWidget);
            }

            this[_dropArea_].style.display = 'none'; 
            Actions.addUserWidget(Object.assign({userWidgetID: activeID}, widget)); 

        }else{
            this[_dropArea_].style.display = 'none';
            Actions.addUserWidget(Object.assign({userWidgetID: activeID}, widget)); 
        }

    }

    /**
     * 接受到开始拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    startDragUserWidget(wId, x, y){
        this[_dropArea_].style.display = 'block'; // 显示拖放接受区
        let activeWidget = sessionStorage.getItem('activeWidget');
        this[_activeWidgetDom_] = this[_phoneDocument_].querySelector("[data-widgetno='" + activeWidget + "']");
        if(this[_activeWidgetDom_] && this[_activeWidgetDom_].style.left.indexOf("rem") > -1){
            this[_activeWidgetDom_].style.left=parseFloat(this[_activeWidgetDom_].style.left) * 12 + 'px';
        }
        if(this[_activeWidgetDom_] && this[_activeWidgetDom_].style.top.indexOf("rem") > -1){
            this[_activeWidgetDom_].style.top = parseFloat(this[_activeWidgetDom_].style.top) * 12 + 'px';
        }
    }

    /**
     * 接受到拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    moveDragUserWidget(wId, x, y){
        let id = this[_activeWidgetDom_].getAttribute('data-wid');
        if(id == 1020){
            let gridDom = this[_phoneDocument_].querySelectorAll(".grid");
            for(let i = 0; i < gridDom.length; i++){
                if(gridDom[i].style.top.indexOf('rem') > -1){
                    gridDom[i].style.top = parseInt(gridDom[i].style.top) * 12 + y + 'px';
                }else{
                    gridDom[i].style.top = parseInt(gridDom[i].style.top) + y + 'px';
                }
            }
        }
        this[_activeWidgetDom_].style.left = parseInt(this[_activeWidgetDom_].style.left) + x + 'px';
        this[_activeWidgetDom_].style.top = parseInt(this[_activeWidgetDom_].style.top) + y + 'px';
    }

    /**
     * 接受到拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  y   y轴偏移量
     */
    canvasDragUserWidget(wId, y){
        let canvasHeight = parseInt(document.querySelector('#canvas-wrap').style.height);
        document.querySelector('#canvas-wrap').style.height = (canvasHeight + y) <= 667 ? 667 + 'px':(canvasHeight + y) + 'px';
        document.querySelector('#pageHeight').value = parseInt(document.querySelector('#canvas-wrap').style.height);
    }

    /**
     * 接受到调整的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    resizeDragUserWidget(wId, x, y,w,h){
        console.log(x, y,w,h);
        let preX = this[_activeWidgetDom_].style.left.indexOf('rem') > -1 ? 
                    parseFloat(this[_activeWidgetDom_].style.left) * 12 :
                    parseFloat(this[_activeWidgetDom_].style.left);
        let preY = this[_activeWidgetDom_].style.top.indexOf('rem') > -1 ? 
                    parseFloat(this[_activeWidgetDom_].style.top) * 12 :
                    parseFloat(this[_activeWidgetDom_].style.top);
        let preW = this[_activeWidgetDom_].style.width.indexOf('rem') > -1 ?
                    parseFloat(this[_activeWidgetDom_].style.width) * 12 : 
                    parseFloat(this[_activeWidgetDom_].style.width);
        let preH = this[_activeWidgetDom_].style.height.indexOf('rem') > -1 ?
                    parseFloat(this[_activeWidgetDom_].style.height) * 12 :
                    parseFloat(this[_activeWidgetDom_].style.height);
        if (preW + w > 1){
            this[_activeWidgetDom_].style.left = preX + x + 'px';
            this[_activeWidgetDom_].style.width = preW + w + 'px';
        }
        if (preH + h > 1){
            this[_activeWidgetDom_].style.top = preY + y + 'px';
            this[_activeWidgetDom_].style.height = preH + h + 'px';
        }
    }

    /**
     * 
     * 接受到开始拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    endDragUserWidget(wId, x, y){
        // if(this[_activeWidgetDom_]) {
        //     this[_activeWidgetDom_].style.zIndex = this.oldIndex;
        // }
        this[_dropArea_].style.display = 'none'; // 隐藏拖放接受区
    }

    /**
     * 点击画布中的控件时触发
     */
    onWidgetClick(e, widgetNo, wId,index,widget,activeWidget){
        let dom = e.currentTarget,
            x = dom.offsetLeft,
            y = dom.offsetTop;
        if(activeWidget >-1 && activeWidget == index && wId === 1019){
            return;      
        }

        if(widget){
            if(wId == 1021){
                Actions.selectUserWidget(widget.parent, {top: y,left: x},-1,-1,index);
            }else{
                Actions.selectUserWidget(widget.parent, {top: y,left: x},widget.tabIndex,widget.tabChildIndex);
            }
        }else{
            Actions.selectUserWidget(index, {top: y,left: x});
        }
    }

    /**
     * 转换jsx
     * @param    {integer}    id  用户控件id
     * @param    {string}     jsx React格式的字符串
     * @return   {ReactClass}         返回ReactClass
     */
    getReactClass(id, jsx){
        window.React = React;
        if (!this[_userWidgetList_][id]) {
            this[_userWidgetList_][id] = eval(transform(jsx));
        }
        return this[_userWidgetList_][id];
    }

    /**
     * 注入控件CSS,拼接到head里的style中
     * @param  {json} widget 控件json对象
     */
    getWidgetCss(widget){
        if (this[_cacheCssCode_].indexOf(widget.cssCode) < 0) {
            if(!widget.cssCode.match(/\.(.*)\{/)) return;
            let className = widget.cssCode.match(/\.(.*)\{/)[1];
            if(this[_cacheClassName_][className]>=0&&this[_cacheClassName_][className]!==undefined){
                this[_cacheCssCode_][this[_cacheClassName_][className]-1] = widget.cssCode;
            }else{
                let index = this[_cacheCssCode_].push(widget.cssCode);
                this[_cacheClassName_][className] = index;
            }
            this[_phoneDocument_].head.querySelector('#widgetStyle').innerText=this[_cacheCssCode_].join(' ');
        }
    }

    /**
     * 初始化手机画布
     */
    [_initPhoneCanvas_](){
        let $mv = this,
            devGrid = document.createElement('div'),
            devCss = document.createElement('link'),
            devStyle = document.createElement('style'),
            // 手机画布
            Canvas = React.createClass({
                mixins: [Reflux.connect(Store)],
                getInitialState: function(){
                    return {
                        pages:{
                            activePage:0,
                            pageList:[{
                                widgetList:[],
                                gridChildList: [],
                            }]
                        }
                    };
                },
                clickHandle: function(widgetNo, wId, index,widget,activeWidget){
                    return function(e) {
                        $mv.onWidgetClick(e, widgetNo, wId, index,widget,activeWidget);
                    };
                },
                componentDidMount: function() {
                    //修复画布初始化而缓存数组未初始化导致的样式丢失BUG
                    let cssCode = $mv[_phoneDocument_].head.querySelector('#widgetStyle').innerText;
                    if($mv[_cacheCssCode_].length > 0 && cssCode == ''){
                        $mv[_phoneDocument_].head.querySelector('#widgetStyle').innerText = $mv[_cacheCssCode_].join(' ');
                    }
                },
                render: function(){
                    let pageIndex = this.state.pages.activePage;
                    let activeWidgetChild = this.state.pages.activeWidgetChild > -1 ? this.state.pages.activeWidgetChild : 0;
                    let widgetStyleList = this.state.widgetStyleList;
                    let pageColor = this.state.pages.pageList[pageIndex].pageColor || '';
                    let pageBgUrl = this.state.pages.pageList[pageIndex].pageBgUrl || '';
                    let pageBgHeight = this.state.pages.pageList[pageIndex].bgHeight || "100%";
                    let widgetTab = [];//选项卡 指定选项 控件集合
                    let gridChildList = []; //九宫格
                    this.state.pages.pageList[pageIndex].widgetList.map((widget, i)=>{
                        if(widget.widgetListItem && widget.widgetListItem != ''){
                            if(this.state.pages.activeWidget == i){//如果是指定的选项卡
                                widget.widgetListItem[activeWidgetChild].map((wgrandchild,k)=>{
                                    widgetTab.push(wgrandchild);
                                }) 
                            }else{
                                widget.widgetListItem[0].map((wgrandchild,k)=>{
                                    widgetTab.push(wgrandchild);
                                })
                            }
                        }
                    })

                    this.state.pages.pageList[pageIndex].widgetList.map((widget, i)=>{
                        if(widget.gridChildList && widget.gridChildList != ''){
                            widget.gridChildList.map((gridChild,j)=>{
                                gridChildList.push(gridChild);
                            });
                        }
                    });

                    return (
                        <div >
                            <div style={{backgroundColor:pageColor,height:pageBgHeight,width:'100%',position:'absolute',backgroundRepeat:'no-repeat',
                                     top:0,left:0,zIndex:'-9998',backgroundImage:`url(${pageBgUrl})`,backgroundSize:'100% 100%'}}></div>
                            {
                                this.state.pages.pageList[pageIndex].widgetList.map((widget, i)=>{
                                    let W = Object.assign({unsaved:false}, Widgets.getWidgetById(widget.id), widget);
                                    $mv.getWidgetCss(W);
                                    let style = getWidgetStyle(widget);
                                    let Dom = $mv.getReactClass(W.userWidgetID, W.dom);
                                    let path = typeof widget.propertySet[0].statusSet === 'undefined'? '' :
                                               widget.propertySet[0].statusSet[widget.propertySet[0].activeStatus].bgImagePath;
                                    return (
                                        
                                        <Dom key={W.userWidgetID}  text={W.editText} data-index={i} className={W.className} tabEdit={this.state.pages.activeWidgetChild} style={style} stallShow={widget.propertySet[0].stallShow} trans={widget.propertySet[0].trans?widget.propertySet[0].trans:W.trans}
                                         title={widget.propertySet[0].title ? widget.propertySet[0].title : W.title} bottonDetail={widget.propertySet[0].bottonDetail ? widget.propertySet[0].bottonDetail : W.bottonDetail}
                                        data-wid={W.id} data-widgetno={W.userWidgetID} onClick={this.clickHandle(W.userWidgetID, W.id, i, null, this.state.pages.activeWidget)} minValue={widget.propertySet[0].minValue} styleList={widgetStyleList}
                                        imagePath={path} activeType={widget.activeType} widgetInfo={widget.widgetInfo} activeStatus={widget.propertySet[0].activeStatus} timeTitle={widget.propertySet[0].timeTitle} statusSet={widget.propertySet[0].statusSet} />
                                    );
                                })
                            }
                            {
                                widgetTab.map((widget, i)=>{
                                    let W = Object.assign({unsaved: false}, Widgets.getWidgetById(widget.id), widget);
                                    $mv.getWidgetCss(W);
                                    let style = getWidgetStyle(widget);
                                    let Dom = $mv.getReactClass(W.userWidgetID, W.dom);
                                    let path = typeof widget.propertySet[0].statusSet === 'undefined'? '' :
                                               widget.propertySet[0].statusSet[widget.propertySet[0].activeStatus].bgImagePath;
                                    return (  
                                        <Dom key={W.userWidgetID}  text={W.editText} data-index={i} className={W.className} style={style} stallShow={widget.propertySet[0].stallShow} trans={widget.propertySet[0].trans?widget.propertySet[0].trans:W.trans}
                                         title={widget.propertySet[0].title?widget.propertySet[0].title:W.title} bottonDetail={widget.propertySet[0].bottonDetail?widget.propertySet[0].bottonDetail:W.bottonDetail}
                                        data-wid={W.id} data-widgetno={W.userWidgetID} onClick={this.clickHandle(W.userWidgetID, W.id, i,W)} minValue={widget.propertySet[0].minValue} styleList={widgetStyleList}
                                        imagePath={path} widgetInfo={widget.widgetInfo} activeStatus={widget.propertySet[0].activeStatus} timeTitle={widget.propertySet[0].timeTitle} statusSet={widget.propertySet[0].statusSet} />
                                    );
                                })
                            }
                            {
                                gridChildList.map((widget, i)=>{
                                    let W = Object.assign({unsaved:false}, Widgets.getWidgetById(widget.id), widget);
                                    $mv.getWidgetCss(W);
                                    let style = getWidgetStyle(widget);
                                    let Dom = $mv.getReactClass(W.userWidgetID, W.dom);

                                    return (
                                        <Dom key={W.userWidgetID} userImgWidgetID={W.userWidgetID}  text={W.editText} data-index={i} className={W.className} style={style}  
                                         title={widget.propertySet[0].title?widget.propertySet[0].title:W.title} 
                                        data-wid={W.id} data-widgetno={W.userWidgetID} onClick={this.clickHandle(W.userWidgetID, W.id, i,W)} styleList={widgetStyleList}
                                        widgetInfo={widget.widgetInfo} activeStatus={widget.propertySet[0].activeStatus} gridInfo={widget.gridInfo} statusSet={widget.propertySet[0].statusSet} />
                                    );
                                })
                            }
                        </div>
                    );
                }
            });
        devGrid.className = 'dev-grid';
        devStyle.id = 'widgetStyle';
        devCss.rel='stylesheet';
        devCss.href = '../static/modules/MagicView/phoneCanvas-dev.css';
        this[_phoneDocument_].body.appendChild(devGrid);
        this[_phoneDocument_].body.addEventListener('click',function(e){
            if(e.target.className == 'dev-grid'){
                Actions.selectUserWidget(-1);
            };
        });
        this[_phoneDocument_].head.appendChild(devCss);
        this[_phoneDocument_].head.appendChild(devStyle);
        React.render(<Canvas />, this[_phoneCanvas_]);
    }
}