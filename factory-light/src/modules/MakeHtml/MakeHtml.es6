'use strict';
/**
 * 配置数据生成html格式处理类
 * @author   vilien
 * @datetime 2016-01-09
 */

import {BaseClass} from '../../core/Base.class.es6';
import {getTemplate} from './MobileTemplate.es6'; // 导入移动设备HTML模板
import {WidgetPropsParser} from './WidgetPropsParser.es6'; // 导入控件解析类
import {LightNum} from './LightNum.es6'; // 导入控件解析类
import {LightBtn} from './LightBtn.es6'; // 导入控件解析类
import {DomMark} from './DomMark.es6'; // 导入控件解析类

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
        var controllerData = null;
        for (var i in configsData) {
            if (configsData[i].type == 2) {
                controllerData =configsData[i].propertyConfigs;
                for (var j in configsData[i].propertyConfigs) {
                    if (configsData[i].propertyConfigs[j].property == 'updateFlag') {
                        this.updateFlagLength = configsData[i].propertyConfigs[j].byteLength;
                    } 
                }
            }
        }
        this.pages = data.pages.pageList;
        this[_js_] = []; // 页面JS
        this.updateFlagLength = this.updateFlagLength || 1;//拿取updataFalg长度照明的是6个字节 
        this.controllerData = controllerData; //拿取灯的功能字节长度为1 和灯标示位index
        return this.init();
    }

    // 初始化
    init(){
        let initJs = `
            var _extends = Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; 
            var AppData = {};
            var ControlData = {};
            ControlData.dataFilter=false;
            var controllerData = ${this.controllerData};
            var touchMark = -1;
            var _timer = '';
            var Route=ReactRouter.Route,
                RouteHandler=ReactRouter.RouteHandler;
                DefaultRoute=ReactRouter.DefaultRoute;
            React.initializeTouchEvents(true);
            het.ready(function(data){
                window.AppActions.ready(data);
            });

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
        let pageColor = page.pageColor;
        let pageImg = page.layoutImg.src;
        let pageString = `
            var ${pageName}=React.createClass({displayName:"${pageName}", 
                mixins:[Reflux.connect(AppStore)],
                getDefaultProps: function () {
                    return {scale: "scale(0.46875, 0.46875)"};
                },
                getInitialState:function(){
                    return {
                        data:{lightOffNum:0,
                        lightOnNum:0,
                        lightOutNum:0,
                    },
                        switchShow:false,
                        switchOn:false,
                        left:0,
                        top:0,
                        scale:0.46875
                    }
                },
                componentWillMount:function(){
                },
                componentDidMount: function() {
                    var _this =this;
                    function setGesture(el){
                        var obj={}; //定义一个对象
                        var istouch=false;
                        var startD = 0;
                        var scale='';
                        var scal = 1;
                        var startOffset=[];
                        el.addEventListener("touchstart",function(e){
                            if(e.touches.length>=2){  //判断是否有两个点在屏幕上
                                if(el.style.transform==""){
                                    scal=1;
                                }else{
                                    var sc = el.style.transform;
                                    var sca = sc.substring(6, sc.length-1);
                                    scal = sca.substring(0, sc.length-2)*1;
                                }
                                istouch=true;
                                var touch1 = e.touches[0];
                                var touch2 = e.touches[1];
                                var x = touch1.pageX -touch2.pageX;
                                var y = touch1.pageY -touch2.pageY;
                                startD = Math.sqrt((x * x) + (y * y));
                                obj.gesturestart&&obj.gesturestart.call(el); //执行gesturestart方法
                            };
                        },false);
                        el.addEventListener("touchmove",function(e){
                            if(e.touches.length>=2&&istouch){
                                var now=e.touches;  //得到第二组两个点
                                scale=getDistance(now[0],now[1])/startD; //得到缩放比例，getDistance是勾股定理的一个方法
                                obj.gesturemove&&obj.gesturemove.call(el,scale*scal);  //执行gesturemove方法
                            }else{

                               
                            };
                        },false);
                        el.addEventListener("touchend",function(e){
                            if(istouch){
                                istouch=false
                                obj.gestureend&&obj.gestureend.call(el,scale*scal);  //执行gestureend方法
                            } 
                        },false);
                        return obj;
                    };
                    function getDistance(p1, p2) {
                        var x = p2.pageX - p1.pageX,
                            y = p2.pageY - p1.pageY;
                        return Math.sqrt((x * x) + (y * y));
                    };
                    function getMove(p1, p2){
                        var offSet = {};
                        offSet.x = p1.pageX - p2.pageX;
                        offSet.y = p1.pageY - p2.pageY;
                        return offSet
                    }
                    function getAngle(p1, p2) {
                        var x = p1.pageX - p2.pageX,
                            y = p1.pageY- p2.pageY;
                        return Math.atan2(y, x) * 180 / Math.PI;
                    };
                    var box = document.querySelector('#pagebody');
                    var boxGesture=setGesture(box);  //得到一个对象
                    boxGesture.gesturestart=function(){  //双指开始
                        box.style.backgroundColor="yellow";
                    };
                    boxGesture.gesturemove=function(data){  //双指移动
                        var x = document.querySelector('#pagebody');
                        x.style.transform = 'scale('+ data +')';
                    };
                    boxGesture.pointMove=function(startOffset, offSet){  //双指移动
                        box.style.left = (parseInt(startOffset[0]) + offSet.x) + "px";
                        box.style.top = (parseInt(startOffset[1]) + offSet.y) + "px"; 
                    };
                    boxGesture.pointEnd=function(offSet){  //双指移动
                        box.style.left = offSet[0]+'px';
                        box.style.top = offSet[1]+'px';
                    };
                    boxGesture.gestureend=function(data){  //双指结束
                        _this.setState({
                            scale:data
                        })
                    };

                    
                },
                componentDidUpdate: function(prevProps, prevState) {
                    var arr = this.state.hiddenArray || [];
                    for(var i = 0;i<arr.length;i++){
                        if(arr[i]!==null && arr[i]!==undefined){
                            if(React.findDOMNode(this.refs[arr[i]])){
                                React.findDOMNode(this.refs[arr[i]]).style.display = 'none';
                            }
                        }
                    }
                },
                render:function(){
                    var scale = 'scale('+ this.state.scale +')';
                    var top = this.state.top;
                    var left = this.state.left;
                    var __props = this.state;
                    var domPage = React.createElement("div",
                        {id:'pagebody',style:{background:'url(${pageImg}) no-repeat left top', backgroundSize:'cover',width:'800',height:'800',position:'absolute',top:top,left:left,zIndex:"-9998",transform:scale,transformOrigin:'left top'}}
                        ${list.length>0 ? ',' + list.map((widget)=>{
                            return this.createWidget(widget);
                        }) : ''}
                    );
                    var domMark = React.createElement('div', {id:'mark',style:{width:'20',height:'25',position:'absolute',top:10,right:20,zIndex:"-10000"}},${this.createDomMark()});
                    var domTop = React.createElement('div', {id:'page',style:{overflow:'scroll',width:'373',height:'373',position:'absolute',top:50,left:0,zIndex:"-10000",border:'1px solid #c6c6c6'}}, domPage);
                    var domLightMsg = React.createElement('div', {id:'lightMsg',style:{width:'375',height:'30',position:'absolute',bottom:90,left:0}}, ${this.createLightNum()});
                    var domBottom = React.createElement('div', {id:'domBottom',style:{width:'375',height:'50',position:'absolute',bottom:0,left:0}}, ${this.createLightBtn()});
                    return React.createElement("div",
                        {id:'pages',style:{width:'100%',height:'100%',position:'absolute',top:0,left:0,zIndex:"-9998"}}
                        ,domMark,domTop,domLightMsg,domBottom
                    );
                }
            });
        `;
        return pageString;
    }

    /**
     * 生成控件
     * @param    {json}   widget 控件配置json
     * @return   {string}        返回reactDom字符串
     */
    createWidget(widget){
        let parser = new WidgetPropsParser(widget);
        return parser.getReactDom();
    }

    createLightNum(){
        let lightNum = new LightNum();
        return lightNum.getReactDom();
    }
    createLightBtn(){
        let lightBtn = new LightBtn();
        return lightBtn.getReactDom();
    }
    createDomMark(){
        let domMark= new DomMark();
        return domMark.getReactDom();
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
                'init',
                'changeLightSwitch',
                'changeLightOn',
                'ready'
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
                    if(data){
                        if(ControlData.dataFilter){
                        }else{
                            if(data.errorFromNull=='errorNull'||data.error=="当前网络不可用，请检查你的网络设置"||data.dictData.length<1){
                                AppData.dictData = [];
                                this.trigger(AppData);
                                ControlData.switchShow= false;
                                this.trigger(ControlData)
                            }else{
                                AppData = data;
                                this.trigger(AppData);
                            }
                        }    
                    }  
                },
                onReady: function(data) {
                    ControlData = data;
                    
                    this.trigger(ControlData)
                },
                onChangeLightSwitch: function(id, name, deviceId, ref) {
                    het.toast("deviceId:"+deviceId)
                    ControlData.name = name;
                    ControlData.id = id;
                    ControlData.ref = ref;
                    ControlData.deviceId = deviceId;
                    ControlData.switchShow= true;
                    var controllLight = 'Switch'+id+'State';
                    var _list = AppData.dictData;
                    for(var i = 0;i<_list.length;i++){
                        if(_list[i].deviceId==deviceId){
                            var _data_ = _list[i];
                            if(_data_ [controllLight]==128){
                                ControlData.switchOn=false
                            }else if(_data_ [controllLight]==129){
                                ControlData.switchOn=true
                            }else{
                                ControlData.switchShow= false;
                            }
                        }
                    }
                    this.trigger(ControlData);
                },
                onChangeLightOn: function(id, name, deviceId) { 
                    var arr= []
                    for(var i = 1; i<41;i++){
                        var text = 'Switch'+i+'ControlCom';
                        arr.push(text)
                    }
                    var _this = this;
                    var controllLight = 'Switch'+id+'ControlCom';
                    var _list = AppData.dictData;
                    var _data_ = {};
                    for(var i = 0;i<_list.length;i++){
                        if(_list[i].deviceId==deviceId){
                            _data_= _list[i];
                            for(var i = 0;i<40;i++){
                                _data_[arr[i]] = 0;
                            }
                            _data_.updateFlag = het.hexUpFlag((id-1),1,6);//参数1灯的标示位index , 2灯的功能字节长度 ，3照明这个项目的updataFlag的长度   本项目是标示位是id 所有灯的功能字节长度是都是1字节 updataFlag全为6字节
                            _data_[controllLight] = ControlData.switchOn==true?0x22:0x11;
                        }
                    }
                    het.send(AppData,function(data){
                        var state = 'Switch'+id+'State';
                        _data_[state] = ControlData.switchOn==true?128:129;
                        _data_[controllLight] = 0;
                        ControlData.dataFilter = true;
                        
                        clearTimeout(_timer);
                        _timer = setTimeout(function(){
                            ControlData.dataFilter = false;
                            _this.trigger(ControlData);
                        }, 15000)
                        if(ControlData.switchOn==true){
                           AppData.dictData[0].lightOnNum =  AppData.dictData[0].lightOnNum - 1 < 0?0:AppData.dictData[0].lightOnNum-1;
                           AppData.dictData[0].lightOffNum = AppData.dictData[0].lightOffNum + 1
                           het.toast("tipsForError:灯已关闭")
                        }else{
                            AppData.dictData[0].lightOnNum =  AppData.dictData[0].lightOnNum + 1;
                            AppData.dictData[0].lightOffNum =  AppData.dictData[0].lightOffNum - 1<0?0:AppData.dictData[0].lightOffNum-1;
                            het.toast("tipsForError:灯已开启")
                        }
                        ControlData.switchOn=ControlData.switchOn==true?false:true;
                        _this.trigger(AppData)
                        _this.trigger(ControlData);

                    },function(data){
                         var tip = JSON.parse(data)
                         het.toast("tipsForError:" + tip.error)
                    })
                },
                onInit:function(wid){
                    AppData.hiddenArray = AppData.hiddenArray || [];
                    if(AppData.hiddenArray.indexOf(wid)===-1){
                        AppData.hiddenArray.push(wid);
                    }
                    this.trigger(AppData);
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
                    debugMode: 'print',
                    onceConfigData:'false',
                    updateFlagMap: {
                    },
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
                AppActions.repaint(data);
            });
        `;
        this[_js_].push(repaint); 
    }
};