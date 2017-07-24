'use strict';
/**
 * 配置数据生成html格式处理类
 * @author   vilien
 * @datetime 2016-01-09
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MakeHtml = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../../core/Base.class');

var _MobileTemplate = require('./MobileTemplate');

var _WidgetPropsParser = require('./WidgetPropsParser');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 导入移动设备HTML模板


// 导入控件解析类

// 产生私有成员key
var _html_ = Symbol('_html_'); // 内部维护的html
var _js_ = Symbol('_js_'); // 内部维护的js
var _createApp_ = Symbol('_createApp_'); // 生成App组件
var _createConfig_ = Symbol('_createConfig_'); // 生成config
var _createRoute_ = Symbol('_createRoute_'); // 生成route
var _createActions_ = Symbol('_createActions_'); // 生成Actions
var _createStore_ = Symbol('_createStore_'); // 生成Store
var _createPages_ = Symbol('_createPages_'); // 生成页面
var _createRepaint_ = Symbol('_createRepaint_'); // 生成repaint处理回调

var MakeHtml = exports.MakeHtml = function (_BaseClass) {
    _inherits(MakeHtml, _BaseClass);

    function MakeHtml(data) {
        var _ret;

        _classCallCheck(this, MakeHtml);

        var _this = _possibleConstructorReturn(this, (MakeHtml.__proto__ || Object.getPrototypeOf(MakeHtml)).call(this));

        var configsData = data.protocolConfigs;
        for (var i in configsData) {
            if (configsData[i].type == 2) {
                for (var j in configsData[i].propertyConfigs) {
                    if (configsData[i].propertyConfigs[j].property == 'updateFlag') {
                        _this.updateFlagLength = configsData[i].propertyConfigs[j].byteLength;
                    }
                }
            }
        }
        _this.pages = data.pages.pageList;
        _this[_js_] = []; // 页面JS
        _this.updateFlagLength = _this.updateFlagLength || 1;
        return _ret = _this.init(), _possibleConstructorReturn(_this, _ret);
    }

    // 初始化


    _createClass(MakeHtml, [{
        key: 'init',
        value: function init() {
            var initJs = '\n            var _extends = Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; \n            var AppData = {updateFlag:0};\n            var Route=ReactRouter.Route,\n                RouteHandler=ReactRouter.RouteHandler;\n                DefaultRoute=ReactRouter.DefaultRoute;\n            React.initializeTouchEvents(true);\n        ';
            this[_js_].push(initJs);
        }

        // 获得HTML

    }, {
        key: 'getHtml',
        value: function getHtml() {
            return (0, _MobileTemplate.getTemplate)(this.getCss(), this.getApp());
        }

        // 获得App

    }, {
        key: 'getApp',
        value: function getApp() {
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

    }, {
        key: 'getCss',
        value: function getCss() {
            var css = '';
            this.pages.forEach(function (page) {
                return page.widgetList.forEach(function (widget) {
                    css += widget.cssCode + '\n';
                    if (widget.id === 1019) {
                        widget.widgetListItem.forEach(function (tab) {
                            tab.forEach(function (tabChild) {
                                css += tabChild.cssCode + '\n';
                            });
                        });
                    }
                    if (widget.id === 1020) {
                        widget.gridChildList.forEach(function (tab) {
                            css += tab.cssCode + '\n';
                        });
                    }
                });
            });
            return css;
        }

        /**
         * 生成单页
         * @param    {json}   page 页面配置json
         * @return   {string}      返回reactDom字符串
         */

    }, {
        key: 'createPage',
        value: function createPage(page) {
            var _this2 = this;

            var pageName = 'Page' + page.pageId;
            var list = page.widgetList;
            var tabList = [],
                gridChildList = [],
                tabStyle = void 0,
                pagination = '',
                colorpickerIntab = '',
                colorpickerStr = '';
            var pageColor = "" + page.pageColor;
            var pageBgHeight = page.bgHeight || "100%";
            var pageBgUrl = page.pageBgUrl;

            list.map(function (widget, i) {
                //选项里颜色盘处理
                if (widget.id === 1019) {
                    widget.widgetListItem.map(function (tabList, j) {
                        tabList.map(function (tabChild, k) {
                            if (tabChild.id === 1014) {
                                colorpickerIntab = j;
                            }
                        });
                    });
                }
            });
            if (colorpickerIntab.toString()) {
                colorpickerStr = "var swiperdom= document.getElementsByClassName('swiper-slide'); pagebody = swiperdom[" + colorpickerIntab + "];";
            }
            var pageString = '\n            var ' + pageName + '=React.createClass({displayName:"' + pageName + '", \n                mixins:[Reflux.connect(AppStore)],\n                componentWillMount:function(){\n                    \n                    het.setTitle("' + page.pageName + '");\n                },\n                componentDidMount: function() {\n                    var pagebody = document.querySelector(\'#pagebody\');\n                    ' + colorpickerStr + '\n                    var canvasShow = pagebody.querySelector(\'#canvasWrap\') ? pagebody.querySelector(\'#canvasWrap\').getAttribute(\'data-show\') : \'\';\n                    if(pagebody && canvasShow == \'true\'){\n                        var c = document.createElement(\'canvas\');\n                        c.width = 225;\n                        c.height = 225;\n                        c.id = \'colorpicker\';\n                        c.style.position = \'absolute\';\n                        c.style.left = 0;\n                        c.style.top = 0;\n                        c.style.opacity = 0;\n                        pagebody.appendChild(c);\n                    }\n                  /*\u9009\u9879\u5361 \u89E6\u6478\u6ED1\u52A8*/\n                    var mySwiper = new Swiper(\'.swiper-container\',{\n                        loop: false,\n                        pagination : \'.swiper-pagination\',\n                        resistanceRatio : 0\n                    });\n                    if(document.querySelector(\'.widgetTabBar\')) document.querySelector(\'.widgetTabBar\').className= \'\';\n\n                },\n                shouldComponentUpdate: function(nextProps, nextState) {\n                    // console.log(nextProps);\n                    // console.log(nextState);\n                    // console.log(this.state);\n                    // console.log(this.props);\n                    // for(var key in nextState){\n                    //     if(this.state[key] == nextState[key]) return false;\n                    // }\n                    return true;\n                },\n                componentWillUpdate: function(nextProps, nextState) {\n                    if(this.state.colorpicker){\n                        document.querySelector(\'#colorpicker\').style.zIndex = this.state.colorstyle.zIndex;\n                    }\n                },\n                componentDidUpdate: function(prevProps, prevState) {\n                    if(document.querySelector(\'.widgetTabBar\')) document.querySelector(\'.widgetTabBar\').className= \'\';\n                    var arr = this.state.hiddenArray || [];\n                    for(var i = 0;i<arr.length;i++){\n                        if(arr[i]!==null && arr[i]!==undefined){\n                            if(React.findDOMNode(this.refs[arr[i]])){\n                                React.findDOMNode(this.refs[arr[i]]).style.display = \'none\';\n                            }\n                        }\n                    }\n                    if(this.state.colorpicker){\n                        document.querySelector(\'#colorpicker\').style.zIndex = "-9998";\n                    }\n                    if(prevState.colorpicker !== this.state.colorpicker){\n                        var can = document.querySelector(\'#colorpicker\');\n                        can.style.top = this.state.colorstyle.top.indexOf(\'rem\')>-1?\n                                        this.state.colorstyle.top : this.state.colorstyle.top+\'px\';\n                        can.style.left = this.state.colorstyle.left.indexOf(\'rem\')>-1?\n                                        this.state.colorstyle.left : this.state.colorstyle.left+\'px\';\n                        can.style.opacity = 1;\n                        var cxt=can.getContext(\'2d\');\n                        var img=new Image();\n                        var wh = 225;\n                        img.src= this.state.colorpicker;\n                        img.onload = function(){\n                            cxt.drawImage(img, 0, 0, wh, wh);\n                        };\n                    }\n                },\n                render:function(){\n                    var __props = this.state;\n                    return React.createElement("div",\n                        {id:\'pagebody\'},React.createElement("div",\n                        {style:{\n                            backgroundColor:"' + pageColor + '",\n                            height:"' + pageBgHeight + '",\n                            width:"100%",\n                            position:"absolute",\n                            backgroundRepeat:"no-repeat",\n                            top:0,\n                            left:0,\n                            zIndex:\'-9998\',\n                            backgroundImage:\'' + (pageBgUrl ? 'url("' + pageBgUrl + '")' : "") + '\',\n                            backgroundSize:"100% 100%",\n                            overflowX:"hidden"\n                        }})\n                        ' + (list.length > 0 ? ',' + list.map(function (widget, i) {
                if (widget.id === 1019 && widget.widgetListItem.length > 0) {
                    tabStyle = _this2.createWidget(widget, 1); //获取控件行内样式
                    widget.widgetListItem.map(function (widgetChild) {
                        tabList.push(widgetChild);
                    });
                    if (tabList.length > 1) pagination = ',React.createElement("div", {className:"swiper-pagination"},"")';
                } else if (widget.id === 1020 && widget.gridChildList.length > 0) {
                    widget.gridChildList.map(function (widgetChild) {
                        gridChildList.push(widgetChild);
                    });
                }
                return _this2.createWidget(widget);
            }) : '') + '\n\n                        ' + (tabList.length > 0 ? ',React.createElement("div", {className:"swiper-container",style:' + tabStyle + '}' + pagination + ',React.createElement("div", {className:"swiper-wrapper"},' + tabList.map(function (tab) {
                var swiperStr = tabList && tabList.length < 2 ? "swiper-no-swiping" : "";
                return 'React.createElement("div", {className:"swiper-slide ' + swiperStr + '"},' + tab.map(function (widget) {
                    return _this2.createWidget(widget);
                }) + ')';
            }) + '))' : '') + '\n                        ' + (gridChildList.length > 0 ? ',' + gridChildList.map(function (widget) {
                return _this2.createWidget(widget);
            }) : '') + '\n                    );\n                }\n            });\n        ';
            return pageString;
        }

        /**
         * 生成控件
         * @param    {json}   widget 控件配置json
         * @param    {number}   style 该参数存在时返回 控件行内样式
         * @return   {string}        返回reactDom字符串
         */

    }, {
        key: 'createWidget',
        value: function createWidget(widget, style) {
            var parser = new _WidgetPropsParser.WidgetPropsParser(widget);
            return style ? parser.getStyleString() : parser.getReactDom();
        }

        // 生成App组件

    }, {
        key: _createApp_,
        value: function value() {
            var app = '\n            var App=React.createClass({displayName:"App",\n                mixins:[Reflux.connect(AppStore)],\n                render:function() {\n                    return React.createElement(RouteHandler,null);\n                }\n            });\n        ';
            this[_js_].push(app);
        }

        // 生成Actions

    }, {
        key: _createActions_,
        value: function value() {
            var actions = '\n            window.AppActions = Reflux.createActions([\n                \'repaint\',\n                \'trigger\',\n                \'submit\',\n                \'submitTime\',\n                \'submitColor\',\n                \'toggle\',\n                \'init\',\n                \'initCanvas\',\n                \'complexCommand\'\n            ]);\n        ';
            this[_js_].push(actions);
        }

        // 生成Store

    }, {
        key: _createStore_,
        value: function value() {
            var store = '\n            window.AppStore = Reflux.createStore({\n                listenables: [AppActions],\n                onRepaint: function(data) {\n                    this.trigger(data);\n                },\n                onInit:function(wid){\n                    AppData.hiddenArray = AppData.hiddenArray || [];\n                    if(AppData.hiddenArray.indexOf(wid) === -1){\n                        AppData.hiddenArray.push(wid);\n                    }\n                    this.trigger(AppData);\n                },\n                onInitCanvas:function(imgurl, style){\n                    AppData.colorpicker = imgurl;\n                    AppData.colorstyle = style;\n                    this.trigger(AppData);\n                },\n                onTrigger: function(field, value, updateFlag, length,sucMsg,errMsg) {\n                    if(field===\'\' || value===\'\') {\n                        this.trigger(AppData);\n                        return;\n                    }\n                    console.log(field);\n                    AppData[field] = value;\n                    AppData.updateFlag = het.hexUpFlag(updateFlag, length, ' + this.updateFlagLength + ');\n                    this.trigger(AppData);\n                    het.send(AppData, function(data) {\n                        AppData.updateFlag = 0;\n                        het.toast("ddd");\n                    },function(){\n\n                    });\n                },\n                onComplexCommand:function(list){\n                    var commandList = list instanceof Array ? list : [];\n                    AppData.updateFlag = 0;\n                    commandList.map(function(item,index){\n                        AppData.updateFlag = het.hexUpFlag(item.updateFlag,item.byteLength, ' + this.updateFlagLength + ',AppData.updateFlag);\n                    });\n                    this.trigger(AppData);\n                    het.send(AppData, function(data) {\n                        AppData.updateFlag = 0;\n                    });\n                },\n                onSubmitTime:function(item){\n                    var hour = item.hourSet;\n                    var minute = item.minuteSet;\n                    AppData.updateFlag = 0;\n                    AppData[hour.field] = item.hourValue;\n                    AppData.updateFlag = het.hexUpFlag(hour.updateFlag,hour.byteLength, ' + this.updateFlagLength + ',AppData.updateFlag);\n                    AppData[minute.field] = item.minuteValue;\n                    AppData.updateFlag = het.hexUpFlag(minute.updateFlag,minute.byteLength, ' + this.updateFlagLength + ',AppData.updateFlag);\n                    this.trigger(AppData);\n                    het.send(AppData, function(data) {\n                        AppData.updateFlag = 0;\n                    });\n                },\n                onSubmitColor:function(item){\n                    var rcolor = item.rSet;\n                    var gcolor = item.gSet;\n                    var bcolor = item.bSet;\n                    AppData.updateFlag = 0;\n                    AppData[rcolor.field] = item.rValue;\n                    AppData.updateFlag = het.hexUpFlag(rcolor.updateFlag,rcolor.byteLength, ' + this.updateFlagLength + ',AppData.updateFlag);\n                    AppData[gcolor.field] = item.gValue;\n                    AppData.updateFlag = het.hexUpFlag(gcolor.updateFlag,gcolor.byteLength, ' + this.updateFlagLength + ',AppData.updateFlag);\n                    AppData[bcolor.field] = item.bValue;\n                    AppData.updateFlag = het.hexUpFlag(bcolor.updateFlag,bcolor.byteLength, ' + this.updateFlagLength + ',AppData.updateFlag);\n                    this.trigger(AppData);\n                    het.send(AppData, function(data) {\n                        AppData.updateFlag = 0;\n                    });\n                },\n                onToggle:function(arg){\n                    AppData.hiddenArray = AppData.hiddenArray || [];\n                    console.log(arg);\n                    if(arg.eventType==3){\n                        if(arg.showWidgetList.length>0){\n                            for(var i=0;i<arg.showWidgetList.length;i++){\n                                var index = AppData.hiddenArray.indexOf(arg.showWidgetList[i]);\n                                if(index>-1){\n                                    AppData.hiddenArray.splice(index,1);\n                                }\n                            }\n                        }\n                        if(arg.status){\n                            for(var key in arg.status){\n                                if(arg.status[key]) AppData[arg.status[key][\'statusField\']] = arg.status[key][\'statusValue\'];\n                            }\n                        }\n                        this.trigger(AppData);\n                    }else if(arg.eventType==4){\n                        if(arg.hiddenWidgetList.length>0){\n                            for(var i=0;i<arg.hiddenWidgetList.length;i++){\n                                var index = AppData.hiddenArray.indexOf(arg.hiddenWidgetList[i]);\n                                if(index===-1){\n                                    AppData.hiddenArray.push(arg.hiddenWidgetList[i]);\n                                }\n                            }\n                        }\n                        this.trigger(AppData);\n                    }\n                },\n                onSubmit: function() {\n                    het.send(AppData, function(data) {\n                        AppData.updateFlag = 0;\n                    });\n                }\n            });\n        ';
            this[_js_].push(store);
        }

        // 生成配置

    }, {
        key: _createConfig_,
        value: function value() {
            var config = '\n            het.domReady(function(){\n                sessionStorage.clear();\n                het.config({\n                });\n            });\n        ';
            this[_js_].push(config);
        }

        // 生成页面

    }, {
        key: _createPages_,
        value: function value() {
            var _this3 = this;

            var pages = this.pages.map(function (page) {
                return _this3.createPage(page);
            });
            this[_js_].push(pages.join(''));
        }

        // 生成route

    }, {
        key: _createRoute_,
        value: function value() {
            var route = '\n            var Routes = (\n                React.createElement(Route,{path:"/",handler:App},\n                    ' + this.pages.map(function (_ref) {
                var pageId = _ref.pageId;

                return 'React.createElement(Route,{path:"/page/' + pageId + '",handler:Page' + pageId + '})';
            }) + '\n                    ,React.createElement(DefaultRoute,{handler:Page0})\n\n                )\n            );\n            het.domReady(function(){\n                ReactRouter.run(Routes, ReactRouter.HashLocation, function(Root){  \n                    React.render(React.createElement(Root, null), document.body);\n                });\n            });\n        ';
            this[_js_].push(route);
        }

        // 生成repaint处理回调

    }, {
        key: _createRepaint_,
        value: function value() {
            var repaint = '\n            het.repaint(function(data){\n                _extends(AppData, data);\n                AppActions.repaint(AppData);\n            });\n        ';
            this[_js_].push(repaint);
        }
    }]);

    return MakeHtml;
}(_Base.BaseClass);

;