/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    //console.log("repaint ::: type : "+type+", data : "+data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store
	        // this.handleTouchTap = this.handleTouchTap.bind(this);
	        _this.changeSwitch = _this.changeSwitch.bind(_this);

	        _this.changeMode = _this.changeMode.bind(_this);
	        _this.changeWindSpeed = _this.changeWindSpeed.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'changeSwitch',
	        value: function changeSwitch() {

	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁已经开启，不能操作');
	                return false;
	            }
	            var onoff = void 0;
	            if (this.state.powerOn == undefined) {
	                onoff = 1;
	            } else if (this.state.powerOn == 1) {
	                onoff = 2;
	            } else if (this.state.powerOn == 2) {
	                onoff = 1;
	            }
	            //console.log("onoff == "+onoff)
	            _Actions.Actions.controllSwitch(onoff);
	        }
	    }, {
	        key: 'changeMode',
	        value: function changeMode() {
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁已经开启，不能操作');
	                return false;
	            }
	            //"智能0","标准1","速净2","节能3","睡眠4","假日5","手动6"
	            //"停0","低档1","中档2","高档4","超高档8"
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            var mode = this.state.workMode;
	            var fanGear = this.state.motorGear;
	            var uvSw = this.state.uvSw;
	            var anionSw = this.state.anionSw;
	            var ozoneSw = this.state.ozoneSw;
	            if (mode == undefined) {
	                mode = 0; //智能
	                fanGear = 2;
	                anionSw = 1;
	            } else if (mode == 0) {
	                mode = 1;
	                fanGear = 4;
	                uvSw = 1;
	                anionSw = 1;
	            } else if (mode == 1) {
	                mode = 2;
	                fanGear = 8;
	                uvSw = 1;
	                anionSw = 1;
	            } else if (mode == 2) {
	                mode = 3;
	                fanGear = 2;
	                uvSw = 1;
	                anionSw = 1;
	            } else if (mode == 3) {
	                mode = 4;
	                fanGear = 1;
	                uvSw = 1;
	                anionSw = 1;
	            } else if (mode == 4) {
	                mode = 5;
	                fanGear = 1;
	            } else if (mode == 5) {
	                mode = 6;
	                fanGear = 0;
	            } else if (mode == 6) {
	                mode = 0;
	                fanGear = 2;
	            }
	            //console.log("mode == "+mode)
	            _Actions.Actions.controllMode(mode, fanGear, uvSw, anionSw, ozoneSw);
	        }
	    }, {
	        key: 'changeWindSpeed',
	        value: function changeWindSpeed() {
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁已经开启，不能操作');
	                return false;
	            }
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            var fanGear = this.state.motorGear;
	            var mode = this.state.workMode;

	            if (this.state.motorGear == undefined) {
	                this.state.motorGear = 0;
	                fanGear = 0;
	                if (mode != 6) {
	                    mode = 6;
	                }
	            } else if (fanGear == 0) {
	                fanGear = 1;
	                if (mode != 4) {
	                    mode = 6;
	                }
	            } else if (fanGear == 1) {
	                fanGear = 2;
	                if (mode != 0) {
	                    mode = 6;
	                }
	            } else if (fanGear == 2) {
	                fanGear = 4;
	                if (mode != 1) {
	                    mode = 6;
	                }
	            } else if (fanGear == 4) {
	                fanGear = 8;
	                if (mode != 2) {
	                    mode = 6;
	                }
	            } else if (fanGear == 8) {
	                fanGear = 0;
	                if (mode != 6) {
	                    mode = 6;
	                }
	            }
	            //console.log("fanGear == "+fanGear)
	            _Actions.Actions.controllMode2(mode, fanGear);
	        }
	    }, {
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            if (this.state.online == 2) {
	                return '设备与APP已断开连接！';
	            }
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var online = void 0;
	            if (this.state.online == undefined) {
	                online = 1;
	            } else {
	                online = this.state.online;
	            }

	            var networkavailable = void 0;
	            if (this.state.networkavailable == undefined) {
	                networkavailable = 1;
	            } else {
	                networkavailable = this.state.networkavailable;
	            }

	            var onoff = void 0;
	            if (this.state.powerOn == undefined) {
	                // this.state.powerOn =2;
	                onoff = 2;
	            } else {
	                onoff = this.state.powerOn;
	            }
	            // let statusBar="开机";
	            // if (networkavailable==2){
	            //     statusBar = "当前网络不可用";
	            // } else if (online==2) {
	            //     statusBar = "设备已离线";
	            // }else if (onoff == 2){
	            //     statusBar = "关机";
	            // }


	            var textMode = "";
	            if (this.state.workMode == undefined) {
	                textMode = "无";
	            } else if (this.state.workMode == 0) {
	                textMode = "智能";
	            } else if (this.state.workMode == 1) {
	                textMode = "标准";
	            } else if (this.state.workMode == 2) {
	                textMode = "速净";
	            } else if (this.state.workMode == 3) {
	                textMode = "节能";
	            } else if (this.state.workMode == 4) {
	                textMode = "睡眠";
	            } else if (this.state.workMode == 5) {
	                textMode = "假日";
	            } else if (this.state.workMode == 6) {
	                textMode = "手动";
	            }
	            //console.log("Mode= "+this.state.mode);

	            var textOnOff = "";
	            if (onoff == undefined || onoff == 1) {
	                textOnOff = "开机";
	            } else {
	                textOnOff = "关机";
	            }
	            //console.log("Onoff= "+this.state.onoff);

	            var textFanGear = "";
	            // let fanGear;
	            if (this.state.motorGear == undefined) {
	                textFanGear = "停";
	                this.state.fanGear = 0;
	            } else if (this.state.motorGear == 0) {
	                textFanGear = "停";
	            } else if (this.state.motorGear == 1) {
	                textFanGear = "低风速";
	            } else if (this.state.motorGear == 2) {
	                textFanGear = "中风速";
	            } else if (this.state.motorGear == 4) {
	                textFanGear = "高风速";
	            } else if (this.state.motorGear == 8) {
	                textFanGear = "超高风速";
	            }
	            //console.log("FanGear= "+textFanGear);
	            var childlock = this.state.childLock;

	            var switchStatus = networkavailable === 2 || online == 2 || onoff === 2 ? "flex-cell  triggered" : "flex-cell";
	            var device_mode = networkavailable === 2 || online == 2 || onoff === 2 ? "flex-cell  triggered" : "flex-cell";
	            var device_speed = networkavailable === 2 || online == 2 || onoff === 2 ? "flex-cell  triggered" : "flex-cell";
	            //let device_child_lock = networkavailable===2 || online==2 || onoff === 2 ?"flex-cell  triggered":"flex-cell";

	            //console.log("fanGear== "+ textFanGear +" textMode= "+textMode);

	            var runningOk = online == 2 || networkavailable == 2 || onoff === 2 || childlock == 2 ? false : true;
	            var title = "";
	            if (networkavailable == 2) {
	                // title="工作中 模式："+textMode
	                title = "当前网络不可用";
	            } else if (online == 2) {
	                title = "设备已离线";
	            } else if (onoff == 2) {
	                title = "设备已经关机";
	            } else if (onoff == 1) {
	                if (childlock == 2) {
	                    title = title + " 童锁开 ";
	                }
	                if (this.state.RemainTime != 255 && this.state.RemainTime != 0 && this.state.RemainTime != undefined) {
	                    title = title + "" + this.state.RemainTime + "小时后关机 ";
	                }
	                title = title + " " + textMode + " " + textFanGear;
	            }

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    title
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'btnlist flex' },
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '1', className: switchStatus, onClick: this.changeSwitch, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/device_switch.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            textOnOff
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '2', className: device_mode, onClick: this.changeMode, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/device_mode.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            textMode
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-mode': '3', className: device_speed, onClick: this.changeWindSpeed, style: runningOk ? { opacity: 1 } : { opacity: .5 } },
	                        React.createElement('img', { src: '../static/img/device_speed.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            textFanGear
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	//
	//


	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(3);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BaseComponent = exports.BaseComponent = function (_React$Component) {
	    _inherits(BaseComponent, _React$Component);

	    function BaseComponent(props) {
	        _classCallCheck(this, BaseComponent);

	        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this, props));

	        var originComponentDidMount = _this.componentDidMount; // 接管子类方法
	        var originComponentWillUnmount = _this.componentWillUnmount; // 接管子类方法
	        _this.state = {};
	        _this._isMounted = false;
	        // 重定义子类componentDidMount
	        _this.componentDidMount = function () {
	            _this.superComponentDidMount();
	            if (typeof originComponentDidMount === 'function') {
	                originComponentDidMount.call(_this);
	            }
	        };
	        // 重定义子类componentWillUnmount
	        _this.componentWillUnmount = function () {
	            _this.superComponentWillUnmount();
	            if (typeof originComponentWillUnmount === 'function') {
	                originComponentWillUnmount.call(_this);
	            }
	        };
	        return _this;
	    }

	    /**
	     * 监听Store通用方法
	     * @param    {object}   store   Reflux之Store对象
	     */


	    _createClass(BaseComponent, [{
	        key: 'listenStore',
	        value: function listenStore(store) {
	            var _this2 = this;

	            store.listen(function (data) {
	                if (_this2.isMounted()) {
	                    _this2.setState(data);
	                }
	            });
	        }
	        // 基类DidMount方法

	    }, {
	        key: 'superComponentDidMount',
	        value: function superComponentDidMount() {
	            this._isMounted = true;
	        }
	        // 基类WillUnmount方法

	    }, {
	        key: 'superComponentWillUnmount',
	        value: function superComponentWillUnmount() {
	            this._isMounted = false;
	        }
	        // 判断组件是否已挂载

	    }, {
	        key: 'isMounted',
	        value: function isMounted() {
	            return this._isMounted;
	            // exceptions for flow control :(
	            /*if (!this._isMounted) {
	                try {
	                    ReactDOM.findDOMNode(this);
	                    this._isMounted = true;
	                } catch (e) {
	                    // Error: Invariant Violation: Component (with keys: props,context,state,refs,_reactInternalInstance) contains `render` method but is not mounted in the DOM
	                    this._isMounted = false;
	                } 
	            }
	            return this._isMounted;*/
	        }
	    }]);

	    return BaseComponent;
	}(React.Component);

	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'controllSwitch', //控制开关
	'controllMode', //控制模式
	'controllMode2', 'controllWindSpeed', //控制风速
	'controllTime', //控制时间
	'controllUV', //控制UV
	'controllAnion', //控制负离子
	'controllOzone', //控制臭氧
	'controllChildLock', //控制童锁
	'controllShowFilterUI', //控制显示滤网窗口
	'controllShowModeUI', //控制显示模式窗口
	'controllWindSpeedUI', //控制显示风速模式窗口
	'controllWindSpeedUI', //控制显示风速模式窗口
	'controllTimeUI', //控制显示风速模式窗口
	'controllRsetFilterUI', //控制显示重置滤芯窗口
	'controllShowErrorUI', //控制显示重置滤芯窗口
	'controllShowOrModeOrFilterUI', 'controllShowModeDialog']);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _Actions = __webpack_require__(4);

	// 整个应用的数据存储的地方,定义原生app数据上报上来的字段和默认值
	var AppData = {};var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {

	        //断网离线
	        // if(!!data.online) {AppData.online = data.online;}
	        // if(!!data.networkavailable) {AppData.networkavailable = data.networkavailable;}
	        if (data.childlock) AppData.childlock = data.childlock;
	        if (data.anionsw) AppData.anionsw = data.anionsw;
	        if (data.ozonesw) AppData.ozonesw = data.ozonesw;
	        if (data.uvsw) AppData.uvsw = data.uvsw;
	        if (data.fanGear) AppData.fanGear = data.fanGear;
	        if (data.mode) AppData.mode = data.mode;
	        if (data.onoff) AppData.onoff = data.onoff;
	        if (data.settimer) AppData.settimer = data.settimer;

	        this.trigger(data);
	    },

	    //控制开关
	    onControllSwitch: function onControllSwitch(value) {
	        this.trigger({ powerOn: value, RemainTime: 0 });
	        // let updateFlag = het.hexUpFlag(9, 1, 2);
	        AppData.onoff = value;
	        AppData.updateFlag = het.hexUpFlag(9, 1, 2);
	        // console.log("onControllSwitch updateFlag== "+updateFlag);
	        //{onoff: value,updateFlag:het.hexUpFlag(9, 1, 2)}
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },

	    //控制模式           风速， 紫外线，负离子，臭氧
	    onControllMode: function onControllMode(value, value1, uv, anion, ozone) {
	        this.trigger({ workMode: value, motorGear: value1, uvSw: uv, anionSw: anion, ozoneSw: ozone });
	        //het.hexUpFlag(8, 1, 2,het.hexUpFlag(7, 1, 2,het.hexUpFlag(6, 1, 2,het.hexUpFlag(4, 1, 2,het.hexUpFlag(5, 1, 2)))))
	        AppData.mode = value;
	        AppData.fanGear = value1;
	        AppData.updateFlag = het.hexUpFlag(8, 1, 2, het.hexUpFlag(7, 1, 2));
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onControllMode2: function onControllMode2(value, value1) {
	        this.trigger({ workMode: value, motorGear: value1 });
	        //het.hexUpFlag(8, 1, 2,het.hexUpFlag(7, 1, 2,het.hexUpFlag(6, 1, 2,het.hexUpFlag(4, 1, 2,het.hexUpFlag(5, 1, 2)))))
	        AppData.mode = value;
	        AppData.fanGear = value1;
	        AppData.updateFlag = het.hexUpFlag(7, 2, 2);
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },

	    //控制风速
	    onControllWindSpeed: function onControllWindSpeed(value) {
	        this.trigger({ motorGear: value });
	        AppData.fanGear = value;
	        AppData.updateFlag = het.hexUpFlag(7, 1, 2);

	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },

	    //控制时间
	    onControllTime: function onControllTime(value) {
	        this.trigger({ RemainTime: value });
	        AppData.settimer = value;
	        AppData.updateFlag = het.hexUpFlag(10, 1, 2);
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },

	    //控制UV
	    onControllUV: function onControllUV(value) {
	        this.trigger({ uvSw: value });
	        AppData.uvsw = value;
	        AppData.updateFlag = het.hexUpFlag(6, 1, 2);
	        //{uvsw: value,updateFlag:het.hexUpFlag(6, 1, 2)}
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },

	    //控制负离子
	    onControllAnion: function onControllAnion(value) {
	        this.trigger({ anionSw: value });
	        AppData.anionsw = value;
	        AppData.updateFlag = het.hexUpFlag(4, 1, 2);
	        //{anionsw: value, updateFlag:het.hexUpFlag(4, 1, 2)}
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },

	    //控制臭氧
	    onControllOzone: function onControllOzone(value) {
	        this.trigger({ ozoneSw: value });
	        AppData.ozonesw = value;
	        AppData.updateFlag = het.hexUpFlag(5, 1, 2);
	        //{ozonesw: value,updateFlag:het.hexUpFlag(5, 1, 2)}
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },

	    //控制童锁
	    onControllChildLock: function onControllChildLock(value) {
	        this.trigger({ childLock: value });
	        AppData.childlock = value;
	        AppData.updateFlag = het.hexUpFlag(3, 1, 2);
	        //{childlock: value,updateFlag:het.hexUpFlag(3, 1, 2)}
	        het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onControllShowModeUI: function onControllShowModeUI(value) {
	        this.trigger({ modeWindowState: value, selectshow: true });
	    },
	    onControllShowFilterUI: function onControllShowFilterUI(value) {
	        this.trigger({ filterWindowState: value });
	    },
	    onControllShowOrModeOrFilterUI: function onControllShowOrModeOrFilterUI(value1, value2) {
	        this.trigger({ modeWindowState: value1, filterWindowState: value2 });
	    },

	    //显示窗口类型
	    onControllShowModeDialog: function onControllShowModeDialog(value) {

	        this.trigger({ modeType: value, selectshow: true });
	    }
	});

/***/ }
/******/ ]);