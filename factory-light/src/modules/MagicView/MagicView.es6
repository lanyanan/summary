'use strict';
/**
 * 手机魔方
 * 场景中的虚拟手机
 * @author   vilien
 * @datetime 2015-11-19T19:00:05+0800
 */

import {BaseComponent} from '../../../libs/BaseComponent.class.es6';
import {transform} from 'react-tools'; // 导入transform方法用于转换jsx
import {BaseClass} from '../../core/Base.class.es6';
import * as Comm from '../common.es6'; // 公共函数库
import {subscribe,publish} from '../../core/pubsub.es6'; // 发布/订阅模式库
import {Widgets} from '../WidgetsPanel/Widgets.class.es6'; // 控件库
import {Actions} from '../../app/Actions.es6';
import {Store} from '../../app/Store.es6';
import {getWidgetStyle} from './StyleParse.es6'; // 样式解析类

// 产生私有成员key
const _phoneDocument_ = Symbol('_phoneDocument_');  // 手机document
const _phoneCanvas_ = Symbol('_phoneCanvas_');  // 手机画布
const _dropArea_ = Symbol('_dropArea_');  // 拖放接受区
const _initPhoneCanvas_ = Symbol('_initPhoneCanvas_'); // 初始化画布
const _userWidgetList_ = Symbol('_userWidgetList_'); // 用户控件列表
const _cacheCssCode_ = Symbol('_cacheCssCode_'); // CSS缓存
const _cacheClassName_ = Symbol('_cacheClassName_'); // CSS类名缓存
const _activeWidgetDom_ = Symbol('_activeWidgetDom_'); // CSS缓存

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
        return class Ghost extends BaseComponent {
            constructor(props) {
                super(props);
                this.state = {
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
                        pageList:[
                            {pageName:'主页',pageId:0,
                            layoutImg:{
                                src:'',
                                height:800,
                                width:800
                            }
                            ,widgetList:[]}
                        ]
                    },
                    editDisplay:false,
                    multipleEditDisplay:false
                };
                this.listenStore(Store); // 监听Store
            }
            componentDidMount(){
                $mv[_dropArea_] = ReactDOM.findDOMNode(this.refs.dropArea);
                ReactDOM.findDOMNode(this.refs.phoneCanvas).onload = function(){
                    $mv[_phoneDocument_] = this.contentDocument;
                    $mv[_phoneCanvas_] = $mv[_phoneDocument_].getElementById('phoneCanvas');
                    $mv[_initPhoneCanvas_]();
                    $mv[_phoneDocument_].addEventListener('keydown', (e)=>Hotkeys.capture(e));
                };
            }
            handleGhostClick(e){
                e.stopPropagation();
            }
            handleGhostDBClick(e){
                //双击进入编辑模式 只有scheme包含text的widget可以编辑
                e.stopPropagation();
                let widget = this.state.pages.pageList[this.state.pages.activePage]
                            .widgetList[this.state.pages.activeWidget];
                if(widget.scheme && widget.scheme.indexOf('text') >=0){
                    let editText = typeof widget === 'object' ? widget.editText : '';
                    if(widget.id == 1002){
                        this.setState({
                            multipleEditDisplay:true,
                            editDisplay:false
                        },()=>{
                            document.querySelector('#multipletextedit').focus();
                            document.querySelector('#multipletextedit').value = editText;
                            document.querySelector('#multipletextedit').style.fontSize = widget.propertySet[0].fontSize || 20;
                        });
                    }else{
                        this.setState({
                            editDisplay:true,
                            multipleEditDisplay:false
                        },()=>{
                            document.querySelector('#textedit').focus();
                            document.querySelector('#textedit').value = editText;
                            document.querySelector('#textedit').style.fontSize = widget.propertySet[0].fontSize?widget.propertySet[0].fontSize:(widget.id==1001?36:20);
                        });
                    }
                }
            }
            handleEditChange(e){
                //处理新编辑的text
                let snvalue = e.target.value;
                Actions.changeWidgetText(snvalue);
            }
            handleEditBlur(e){
                //处理失去焦点(编辑结束)事件 隐藏编辑框
                this.setState({
                    editDisplay:false,
                    multipleEditDisplay:false
                });
            }
            editKeydown(e){//回车快捷键 提交命名结束
                e.stopPropagation();
                if(e.keyCode == 13){
                    this.handleEditBlur(e);
                }
                else{
                    return;
                }
            }
            render(){
                let ghostStyle = {
                    display: this.state.ghost.display ? 'block' : 'none',
                    top: this.state.ghost.top,
                    left: this.state.ghost.left,
                    width: this.state.ghost.width,
                    height: this.state.ghost.height,
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
                
                
                let snapline = this.state.ghost.rotate ?'none' : (this.state.panelSwitch.snapLineSwitch==1?'block':'none');

                let canvasHeight = 800;
                // if(this.state.phone&&this.state.phone.height&&this.state.phone.minHeight){
                //     let scrollHeight = (this.state.phone.height-this.state.phone.minHeight)>0?(this.state.phone.height-this.state.phone.minHeight):0;
                //     document.querySelector('.scene-screen').scrollTop = scrollHeight+176;
                // }
                return  <div id="magicview">
                        {/*<div className="canvas-range">
                            <input type='range' />
                            <span></span>
                        </div>*/}
                        <div className="canvas-wrap" id='canvas-wrap' style={{width:'800', height:canvasHeight}}>
                            <div ref="dropArea" className="drop-area"></div>
                            <div className="ghost" style={ghostStyle} onClick={this.handleGhostClick}  data-dragtype="customer" data-dragable={this.state.ghost.dragable}>
                                <div className="handle tr" data-dragtype="remove">X</div>
                                <div className='handleline lv' style={{top:'0px',display:snapline, height:this.state.ghost.height + 'px'}}></div>
                                <div className='handleline th' style={{left:'0px',display:snapline, width:this.state.ghost.width + 'px'}}></div>
                                <div className='handleline rv' style={{top:'0px',display:snapline, height:this.state.ghost.height + 'px'}}></div>
                                <div className='handleline bh' style={{left:'0px',display:snapline, width:this.state.ghost.width + 'px'}}></div> 
                            </div>
                            <iframe ref="phoneCanvas" src="./pages/phoneCanvas.html" width="100%" height="100%"></iframe>
                            <input onBlur={this.handleEditBlur} onKeyDown={this.editKeydown} id='textedit' type='text' onChange={this.handleEditChange} style={editStyle} defaultValue='' />
                            <textarea onBlur={this.handleEditBlur} id='multipletextedit' onChange={this.handleEditChange} style={multiEditStyle} defaultValue=''></textarea>
                            <div className="resize-canvas" data-dragtype="canvas"></div>
                        </div>
                    </div>
            }
        }
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
        this.offsetX = this.startX + x - rect.left - widget.width/2 ;
        this.offsetY = this.startY + y - rect.top - widget.height/2 - document.getElementsByTagName('body')[0].scrollTop;
        if (this.offsetX < -widget.width || this.offsetX > this[_dropArea_].parentNode.offsetWidth || this.offsetY < -widget.height) return;
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
        this[_dropArea_].style.display = 'none'; // 隐藏拖放接受区
        Actions.addUserWidget(Object.assign({userWidgetID:activeID}, widget));
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
        this[_activeWidgetDom_] = this[_phoneDocument_].querySelector("[data-widgetno='"+activeWidget+"']");
        // if(this[_activeWidgetDom_]){
        //     this.oldIndex = this[_activeWidgetDom_].style.zIndex;
        //     this[_activeWidgetDom_].style.zIndex = this[_activeWidgetDom_].style.zIndex==0?999:this[_activeWidgetDom_].style.zIndex;
        // }
    }

    /**
     * 接受到拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    moveDragUserWidget(wId, x, y){
        this[_activeWidgetDom_].style.left=parseInt(this[_activeWidgetDom_].style.left)+x+'px';
        this[_activeWidgetDom_].style.top=parseInt(this[_activeWidgetDom_].style.top)+y+'px';
    }

    /**
     * 接受到拖拽的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  y   y轴偏移量
     */
    canvasDragUserWidget(wId, y){
        let canvasHeight = parseInt(document.querySelector('#canvas-wrap').style.height);
        document.querySelector('#canvas-wrap').style.height = (canvasHeight+y)<=667?667+'px':(canvasHeight+y)+'px';
        document.querySelector('#pageHeight').value = parseInt(document.querySelector('#canvas-wrap').style.height);
    }

    /**
     * 接受到调整的订阅消息后调用该方法
     * @param    {string}   wId 组件id
     * @param    {integer}  x   x轴偏移量
     * @param    {integer}  y   y轴偏移量
     */
    resizeDragUserWidget(wId, x, y,w,h){
        let preX = parseInt(this[_activeWidgetDom_].style.left);
        let preY = parseInt(this[_activeWidgetDom_].style.top);
        let preW = parseInt(this[_activeWidgetDom_].style.width);
        let preH = parseInt(this[_activeWidgetDom_].style.height);
        if (preW+w>1){
            this[_activeWidgetDom_].style.left = preX+x+'px';
            this[_activeWidgetDom_].style.width = preW+w+'px';
        }
        if (preH+h>1){
            this[_activeWidgetDom_].style.top = preY+y+'px';
            this[_activeWidgetDom_].style.height = preH+h+'px';
        }
    }

    /**
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
    onWidgetClick(e, widgetNo, wId, index){
        let dom = e.currentTarget,
            x = dom.offsetLeft,
            y = dom.offsetTop;
        Actions.selectUserWidget(index, {
            top: y,
            left: x
        });
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
            devStyle = document.createElement('style');
            // 手机画布
        class Canvas extends BaseComponent{
            constructor(props) {
                super(props);
                this.state = {
                    pages:{
                            activePage:0,
                            pageList:[{
                                layoutImg:{
                                    src:'',
                                    height:800,
                                    width:800
                                },
                                widgetList:[]
                            }]
                        }
                };
                this.listenStore(Store); // 监听Store
            }
            clickHandle(widgetNo, wId, index){
                return function(e) {
                    $mv.onWidgetClick(e, widgetNo, wId, index);
                };
            }
            componentDidMount() {
                //修复画布初始化而缓存数组未初始化导致的样式丢失BUG
                let cssCode = $mv[_phoneDocument_].head.querySelector('#widgetStyle').innerText;
                if($mv[_cacheCssCode_].length>0&&cssCode==''){
                    $mv[_phoneDocument_].head.querySelector('#widgetStyle').innerText = $mv[_cacheCssCode_].join(' ');
                    // console.log($mv[_phoneDocument_].head.querySelector('#widgetStyle').innerText);
                }
            }
            render(){
                let dropStyle={};
                if(this.state.pages.pageList[0].layoutImg.src!=undefined&&this.state.pages.pageList[0].layoutImg.src!=''){
                    if(this.state.pages.pageList[0].layoutImg.height>800 || this.state.pages.pageList[0].layoutImg.width>800){
                        if(this.state.pages.pageList[0].layoutImg.height >this.state.pages.pageList[0].layoutImg.width ) {
                            let width  =  ( 800 * this.state.pages.pageList[0].layoutImg.width ) / this.state.pages.pageList[0].layoutImg.height;
                            dropStyle = {
                                backgroundImage: 'URL('+ this.state.pages.pageList[0].layoutImg.src+')',
                                backgroundSize:width+"px"+" "+"800px",
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                height:'100%',
                                width:'100%',
                                position:'absolute',
                                top:0,
                                left:0,
                                zIndex:'-9998'
                            }
                        }else{
                            let height  =  ( 800 * this.state.pages.pageList[0].layoutImg.height ) / this.state.pages.pageList[0].layoutImg.width;
                            dropStyle = {
                                backgroundImage: 'URL('+ this.state.pages.pageList[0].layoutImg.src+')',
                                backgroundSize:"800px"+" "+height+"px",
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                height:'100%',
                                width:'100%',
                                position:'absolute',
                                top:0,
                                left:0,
                                zIndex:'-9998'
                            }
                        }
                    }else {
                        dropStyle = {
                            backgroundImage: 'URL('+ this.state.pages.pageList[0].layoutImg.src+')',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundAttachment: 'fixed',
                            height:'100%',
                            width:'100%',
                            position:'absolute',
                            top:0,
                            left:0,
                            zIndex:'-9998'
                        }
                    }
                }
                let pageIndex = this.state.pages.activePage;
                let widgetStyleList = this.state.widgetStyleList;
                let pageColor = this.state.pages.pageList[pageIndex].pageColor || '';
                return (<div style={dropStyle}>
                    {this.state.pages.pageList[pageIndex].widgetList.map((widget, i)=>{
                        let W = Object.assign({unsaved:false}, Widgets.getWidgetById(widget.id), widget);
                        $mv.getWidgetCss(W);
                        let style = getWidgetStyle(widget);
                        let Dom = $mv.getReactClass(W.userWidgetID, W.dom);
                        let path = typeof widget.propertySet[0].statusSet === 'undefined'? '' :
                                   widget.propertySet[0].statusSet[widget.propertySet[0].activeStatus].bgImagePath;
                        return (
                            <Dom key={i}  text={W.editText} data-index={i} className={W.className} style={style} stallShow={widget.propertySet[0].stallShow}
                            data-wid={W.id} data-widgetno={W.userWidgetID} onClick={this.clickHandle(W.userWidgetID, W.id, i)} minValue={widget.propertySet[0].minValue} styleList={widgetStyleList}
                            imagePath={path} activeStatus={widget.propertySet[0].activeStatus} timeTitle={widget.propertySet[0].timeTitle} statusSet={widget.propertySet[0].statusSet} />
                        );
                    })}
                </div>);
            }
        }
        
        devGrid.className = 'dev-grid';
        devStyle.id = 'widgetStyle';
        devCss.rel='stylesheet';
        devCss.href = '../libs/phoneCanvas-dev.css';
        this[_phoneDocument_].body.appendChild(devGrid);
        this[_phoneDocument_].body.addEventListener('click',function(e){
            if(e.target.className == 'dev-grid'){
                Actions.selectUserWidget(-1);
            };
        });
        this[_phoneDocument_].head.appendChild(devCss);
        this[_phoneDocument_].head.appendChild(devStyle);
        ReactDOM.render(<Canvas />, this[_phoneCanvas_]);
    }
}