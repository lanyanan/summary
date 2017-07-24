'use strict';
/**
 * 配置数据生成html格式处理类
 * @author   vilien
 * @datetime 2016-01-09
 */

import {BaseClass} from '../../core/Base.class';
import {getTemplate} from './MobileTemplate'; // 导入移动设备HTML模板
import {WidgetPropsParser} from './WidgetPropsParser'; // 导入控件解析类

// 产生私有成员key
const _html_ = Symbol('_html_'); // 内部维护的html
const _js_ = Symbol('_js_'); // 内部维护的js
const _createApp_ = Symbol('_createApp_'); // 生成App组件
const _createConfig_ = Symbol('_createConfig_'); // 生成config
const _createRoute_ = Symbol('_createRoute_'); // 生成route
const _createActions_ = Symbol('_createActions_'); // 生成Actions
const _createStore_ = Symbol('_createStore_'); // 生成Store
const _createPages_ = Symbol('_createPages_'); // 生成页面
const _createRepaint_ = Symbol('_createRepaint_'); // 生成repaint处理回调

export class MakeHtml extends BaseClass{
    constructor(data){
        super();
        var configsData = data.protocolConfigs;
        for (var i in configsData) {
            if (configsData[i].type == 2) {
                for (var j in configsData[i].propertyConfigs) {
                    if (configsData[i].propertyConfigs[j].property == 'updateFlag') {
                        this.updateFlagLength = configsData[i].propertyConfigs[j].byteLength;
                    } 
                }
            }
        }
        this.pages = data.pages.pageList;
        this[_js_] = []; // 页面JS
        this.updateFlagLength = this.updateFlagLength || 1;
        return this.init();
    }

    // 初始化
    init(){
        let initJs = `
            var _extends = Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; 
            var AppData = {updateFlag:0};
            var Route=ReactRouter.Route,
                RouteHandler=ReactRouter.RouteHandler;
                DefaultRoute=ReactRouter.DefaultRoute;
            React.initializeTouchEvents(true);
        `;
        this[_js_].push(initJs);
    }

    // 获得HTML
    getHtml(){
        return getTemplate(this.getCss(), this.getApp());
    }

    // 获得App
    getApp(){
        this[_createActions_]();
        this[_createStore_]();
        this[_createConfig_]();
        this[_createPages_]();
        this[_createRoute_]();
        this[_createRepaint_]();
        this[_createApp_]();
        return this[_js_].join('');
    }

    // 获得CSS
    getCss(){
        let css = '';
        this.pages.forEach(page=>page.widgetList.forEach(widget=>{
            css += widget.cssCode + '\n';
            if(widget.id===1019){
               widget.widgetListItem.forEach(tab=>{tab.forEach(tabChild=>{
                    css += tabChild.cssCode + '\n';
               })})
            }
            if(widget.id===1020){
                widget.gridChildList.forEach(tab => {
                    css += tab.cssCode + '\n';
                })
            }
        }));
        return css;
    }

    /**
     * 生成单页
     * @param    {json}   page 页面配置json
     * @return   {string}      返回reactDom字符串
     */
    createPage(page){
        let pageName = `Page${page.pageId}`;
        let list = page.widgetList;
        let tabList = [],
            gridChildList = [],
            tabStyle,
            pagination ='',
            colorpickerIntab ='',
            colorpickerStr ='';
        let pageColor = ""+page.pageColor;
        let pageBgHeight = page.bgHeight || "100%";
        let pageBgUrl = page.pageBgUrl;

        list.map((widget,i)=>{//选项里颜色盘处理
            if(widget.id ===1019){
                widget.widgetListItem.map((tabList,j)=>{
                    tabList.map((tabChild,k)=>{
                        if(tabChild.id===1014){
                            colorpickerIntab = j;
                        }
                    })
                }) 
            }
        })
        if(colorpickerIntab.toString()){
            colorpickerStr="var swiperdom= document.getElementsByClassName('swiper-slide'); pagebody = swiperdom["+colorpickerIntab+"];"
        }
        let pageString = `
            var ${pageName}=React.createClass({displayName:"${pageName}", 
                mixins:[Reflux.connect(AppStore)],
                componentWillMount:function(){
                    
                    het.setTitle("${page.pageName}");
                },
                componentDidMount: function() {
                    var pagebody = document.querySelector('#pagebody');
                    ${colorpickerStr}
                    var canvasShow = pagebody.querySelector('#canvasWrap') ? pagebody.querySelector('#canvasWrap').getAttribute('data-show') : '';
                    if(pagebody && canvasShow == 'true'){
                        var c = document.createElement('canvas');
                        c.width = 225;
                        c.height = 225;
                        c.id = 'colorpicker';
                        c.style.position = 'absolute';
                        c.style.left = 0;
                        c.style.top = 0;
                        c.style.opacity = 0;
                        pagebody.appendChild(c);
                    }
                  /*选项卡 触摸滑动*/
                    var mySwiper = new Swiper('.swiper-container',{
                        loop: false,
                        pagination : '.swiper-pagination',
                        resistanceRatio : 0
                    });
                    if(document.querySelector('.widgetTabBar')) document.querySelector('.widgetTabBar').className= '';

                },
                shouldComponentUpdate: function(nextProps, nextState) {
                    // console.log(nextProps);
                    // console.log(nextState);
                    // console.log(this.state);
                    // console.log(this.props);
                    // for(var key in nextState){
                    //     if(this.state[key] == nextState[key]) return false;
                    // }
                    return true;
                },
                componentWillUpdate: function(nextProps, nextState) {
                    if(this.state.colorpicker){
                         document.querySelector('#colorpicker') && document.querySelector('#colorpicker').style.zIndex = this.state.colorstyle.zIndex;
                    }
                },
                componentDidUpdate: function(prevProps, prevState) {
                    if(document.querySelector('.widgetTabBar')) document.querySelector('.widgetTabBar').className= '';
                    var arr = this.state.hiddenArray || [];
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i]!==null && arr[i]!==undefined){
                            if(React.findDOMNode(this.refs[arr[i]])){
                                React.findDOMNode(this.refs[arr[i]]).style.display = 'none';
                            }
                        }
                    }
                    if(this.state.colorpicker){
                        document.querySelector('#colorpicker') && document.querySelector('#colorpicker').style.zIndex = "-9998";
                    }
                    if(prevState.colorpicker !== this.state.colorpicker){
                        var can = document.querySelector('#colorpicker');
                        can.style.top = this.state.colorstyle.top.indexOf('rem')>-1?
                                        this.state.colorstyle.top : this.state.colorstyle.top+'px';
                        can.style.left = this.state.colorstyle.left.indexOf('rem')>-1?
                                        this.state.colorstyle.left : this.state.colorstyle.left+'px';
                        can.style.opacity = 1;
                        var cxt=can.getContext('2d');
                        var img=new Image();
                        var wh = 225;
                        img.src= this.state.colorpicker;
                        img.onload = function(){
                            cxt.drawImage(img, 0, 0, wh, wh);
                        };
                    }
                },
                render:function(){
                    var __props = this.state;
                    return React.createElement("div",
                        {id:'pagebody'},React.createElement("div",
                        {style:{
                            backgroundColor:"${pageColor}",
                            height:"${pageBgHeight}",
                            width:"100%",
                            position:"absolute",
                            backgroundRepeat:"no-repeat",
                            top:0,
                            left:0,
                            zIndex:'-9998',
                            backgroundImage:'${pageBgUrl ? `url("${pageBgUrl}")` : ""}',
                            backgroundSize:"100% 100%",
                            overflowX:"hidden"
                        }})
                        ${list.length > 0 ? 
                            ',' +   list.map((widget,i)=>{
                                        if(widget.id === 1019 && widget.widgetListItem.length > 0){
                                            tabStyle = this.createWidget(widget,1); //获取控件行内样式
                                            widget.widgetListItem.map((widgetChild)=>{
                                                tabList.push(widgetChild);            
                                            })
                                            if(tabList.length > 1)  pagination = ',React.createElement("div", {className:"swiper-pagination"},"")';
                                        }else if(widget.id === 1020 && widget.gridChildList.length > 0){
                                            widget.gridChildList.map((widgetChild)=>{
                                                gridChildList.push(widgetChild);
                                            })
                                        }
                                        return this.createWidget(widget)
                                    }) 
                            : ''
                        }

                        ${
                            tabList.length > 0 ? 
                            ',React.createElement("div", {className:"swiper-container",style:' + tabStyle + '}' + pagination + ',React.createElement("div", {className:"swiper-wrapper"},' + 
                                tabList.map((tab)=>{
                                    var swiperStr = tabList && tabList.length < 2 ? "swiper-no-swiping" : "";
                                    return  'React.createElement("div", {className:"swiper-slide ' + swiperStr + '"},' + 
                                                tab.map((widget)=>{
                                                    return this.createWidget(widget);
                                                })
                                            + ')';
                                })
                            +'))'
                            : ''
                        }
                        ${
                            gridChildList.length > 0 ?

                            ',' + gridChildList.map((widget)=>{
                                return this.createWidget(widget);
                            })
                            : ''
                        }
                    );
                }
            });
        `;
        return pageString;
    }

    /**
     * 生成控件
     * @param    {json}   widget 控件配置json
     * @param    {number}   style 该参数存在时返回 控件行内样式
     * @return   {string}        返回reactDom字符串
     */
    createWidget(widget,style){
        let parser = new WidgetPropsParser(widget);
        return style?parser.getStyleString():parser.getReactDom();
    }

    // 生成App组件
    [_createApp_](){
        let app = `
            var App=React.createClass({displayName:"App",
                mixins:[Reflux.connect(AppStore)],
                render:function() {
                    return React.createElement(RouteHandler,null);
                }
            });
        `;
        this[_js_].push(app);
    }

    // 生成Actions
    [_createActions_](){
        let actions = `
            window.AppActions = Reflux.createActions([
                'repaint',
                'trigger',
                'submit',
                'submitTime',
                'submitColor',
                'toggle',
                'init',
                'initCanvas',
                'complexCommand'
            ]);
        `;
        this[_js_].push(actions);
    }

    // 生成Store
    [_createStore_](){
        let store = `
            window.AppStore = Reflux.createStore({
                listenables: [AppActions],
                onRepaint: function(data) {
                    this.trigger(data);
                },
                onInit:function(wid){
                    AppData.hiddenArray = AppData.hiddenArray || [];
                    if(AppData.hiddenArray.indexOf(wid) === -1){
                        AppData.hiddenArray.push(wid);
                    }
                    this.trigger(AppData);
                },
                onInitCanvas:function(imgurl, style){
                    AppData.colorpicker = imgurl;
                    AppData.colorstyle = style;
                    this.trigger(AppData);
                },
                onTrigger: function(field, value, updateFlag, length,sucMsg,errMsg) {
                    if(field==='' || value==='') {
                        this.trigger(AppData);
                        return;
                    }
                    console.log(field);
                    AppData[field] = value;
                    AppData.updateFlag = het.hexUpFlag(updateFlag, length, ${this.updateFlagLength});
                    this.trigger(AppData);
                    het.send(AppData, function(data) {
                        AppData.updateFlag = 0;
                        het.toast("ddd");
                    },function(){

                    });
                },
                onComplexCommand:function(list){
                    var commandList = list instanceof Array ? list : [];
                    AppData.updateFlag = 0;
                    commandList.map(function(item,index){
                        AppData.updateFlag = het.hexUpFlag(item.updateFlag,item.byteLength, ${this.updateFlagLength},AppData.updateFlag);
                    });
                    this.trigger(AppData);
                    het.send(AppData, function(data) {
                        AppData.updateFlag = 0;
                    });
                },
                onSubmitTime:function(item){
                    var hour = item.hourSet;
                    var minute = item.minuteSet;
                    AppData.updateFlag = 0;
                    AppData[hour.field] = item.hourValue;
                    AppData.updateFlag = het.hexUpFlag(hour.updateFlag,hour.byteLength, ${this.updateFlagLength},AppData.updateFlag);
                    AppData[minute.field] = item.minuteValue;
                    AppData.updateFlag = het.hexUpFlag(minute.updateFlag,minute.byteLength, ${this.updateFlagLength},AppData.updateFlag);
                    this.trigger(AppData);
                    het.send(AppData, function(data) {
                        AppData.updateFlag = 0;
                    });
                },
                onSubmitColor:function(item){
                    var rcolor = item.rSet;
                    var gcolor = item.gSet;
                    var bcolor = item.bSet;
                    AppData.updateFlag = 0;
                    AppData[rcolor.field] = item.rValue;
                    AppData.updateFlag = het.hexUpFlag(rcolor.updateFlag,rcolor.byteLength, ${this.updateFlagLength},AppData.updateFlag);
                    AppData[gcolor.field] = item.gValue;
                    AppData.updateFlag = het.hexUpFlag(gcolor.updateFlag,gcolor.byteLength, ${this.updateFlagLength},AppData.updateFlag);
                    AppData[bcolor.field] = item.bValue;
                    AppData.updateFlag = het.hexUpFlag(bcolor.updateFlag,bcolor.byteLength, ${this.updateFlagLength},AppData.updateFlag);
                    this.trigger(AppData);
                    het.send(AppData, function(data) {
                        AppData.updateFlag = 0;
                    });
                },
                onToggle:function(arg){
                    AppData.hiddenArray = AppData.hiddenArray || [];
                    console.log(arg);
                    if(arg.eventType==3){
                        if(arg.showWidgetList.length>0){
                            for(var i=0;i<arg.showWidgetList.length;i++){
                                var index = AppData.hiddenArray.indexOf(arg.showWidgetList[i]);
                                if(index>-1){
                                    AppData.hiddenArray.splice(index,1);
                                }
                            }
                        }
                        if(arg.status){
                            for(var key in arg.status){
                                if(arg.status[key]) AppData[arg.status[key]['statusField']] = arg.status[key]['statusValue'];
                            }
                        }
                        this.trigger(AppData);
                    }else if(arg.eventType==4){
                        if(arg.hiddenWidgetList.length>0){
                            for(var i=0;i<arg.hiddenWidgetList.length;i++){
                                var index = AppData.hiddenArray.indexOf(arg.hiddenWidgetList[i]);
                                if(index===-1){
                                    AppData.hiddenArray.push(arg.hiddenWidgetList[i]);
                                }
                            }
                        }
                        this.trigger(AppData);
                    }
                },
                onSubmit: function() {
                    het.send(AppData, function(data) {
                        AppData.updateFlag = 0;
                    });
                }
            });
        `;
        this[_js_].push(store);
    }

    // 生成配置
    [_createConfig_](){
        let config = `
            het.domReady(function(){
                sessionStorage.clear();
                het.config({
                });
            });
        `;
        this[_js_].push(config); 
    }
    
    // 生成页面
    [_createPages_](){
        let pages = this.pages.map(page=>this.createPage(page));
        this[_js_].push(pages.join(''));
    }

    // 生成route
    [_createRoute_](){
        let route = `
            var Routes = (
                React.createElement(Route,{path:"/",handler:App},
                    ${this.pages.map(({pageId})=>{
                        return 'React.createElement(Route,{path:"/page/'+pageId+'",handler:Page'+pageId+'})';
                    })}
                    ,React.createElement(DefaultRoute,{handler:Page0})

                )
            );
            het.domReady(function(){
                ReactRouter.run(Routes, ReactRouter.HashLocation, function(Root){  
                    React.render(React.createElement(Root, null), document.body);
                });
            });
        `;
        this[_js_].push(route); 
    }

    // 生成repaint处理回调
    [_createRepaint_](){
        let repaint = `
            het.repaint(function(data){
                _extends(AppData, data);
                AppActions.repaint(AppData);
            });
        `;
        this[_js_].push(repaint); 
    }
};