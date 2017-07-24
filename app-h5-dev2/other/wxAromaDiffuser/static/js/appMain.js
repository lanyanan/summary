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

	__webpack_require__(1);
	module.exports = __webpack_require__(14);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _DevScreen = __webpack_require__(8);

	var _Lights = __webpack_require__(9);

	var _Clock = __webpack_require__(10);

	var _Colors = __webpack_require__(11);

	var _PowerClock = __webpack_require__(12);

	var _Mists = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';

	// 加载组件


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	// het.repaint 接收到的是一个回调函数，当作请求的res就好，然后传入到action的repaint方法里去
	// repaint方法监听到数据改变，执行dom diff算法，根据算法结果执行相关页面UI重绘
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});
	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        //setInterval(Actions.getOnlineData, 4000);//4秒刷新
	        if (_this.state.timer === null || _this.state.timer === undefined) {
	            _this.state.timer = setInterval(_Actions.Actions.getOnlineData, 4000); //4秒刷新
	        };
	        //setTimeout(()=>{Actions.getOnlineData(); // 获取运行数据}, 4000);
	        return _this;
	    }
	    //加载默认数据


	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getDefaultData();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { className: "startupface " + ((0, _Store.isShutdown)(this.state) ? "slide-down" : "slide-up") },
	                    React.createElement(_DevScreen.DevScreen, { colorIndex: this.state.color }),
	                    React.createElement(
	                        'div',
	                        { id: 'panel-scroller' },
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(_Lights.Lights, { lightIndex: this.state.light }),
	                            React.createElement(
	                                'h2',
	                                null,
	                                '喷雾'
	                            ),
	                            React.createElement(_Mists.Mists, { mistIndex: this.state.mist }),
	                            React.createElement(
	                                'h2',
	                                null,
	                                '颜色'
	                            ),
	                            React.createElement(_Colors.Colors, { colorIndex: this.state.color })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: "shutdownface " + ((0, _Store.isShutdown)(this.state) ? "slide-up" : "slide-down") },
	                    React.createElement('div', { className: 'pic' }),
	                    React.createElement('a', { href: 'javascript:', className: 'switch', onClick: _Actions.Actions.switch })
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('加湿器');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

	        var originComponentDidMount = _this.componentDidMount; // 接管子类方法
	        var originComponentWillUnmount = _this.componentWillUnmount; // 接管子类方法
	        _this.state = {};
	        _this._isMounted = false;
	        // 重定义子类componentDidMount
	        _this.componentDidMount = function () {
	            _this.superComponentDidMount();
	            if (typeof originComponentDidMount === 'function') {
	                originComponentDidMount();
	            }
	        };
	        // 重定义子类componentWillUnmount
	        _this.componentWillUnmount = function () {
	            _this.superComponentWillUnmount();
	            if (typeof originComponentWillUnmount === 'function') {
	                originComponentWillUnmount();
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
	var Actions = exports.Actions = Reflux.createActions(['getDefaultData', //获取默认数据
	'getOnlineData', // 获取运行数据
	'repaint', // 接收到数据，重新渲染
	'switch', // 开关
	'toggleLight', // 切换灯
	'toggleColor', // 切换颜色
	'toggleMist']);

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
	exports.isShutdown = exports.Store = undefined;

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

	var urlGet = '/clife-wechat-test/wechat/device/config/get';
	var urlSet = '/clife-wechat-test/wechat/device/config/set';
	// 默认数据行
	var runData = {
	    "_user_id": 1,
	    "_source": 6,
	    "presetStartupTimeH": 0,
	    "timeCloseM": 0,
	    "sourceFlag": 0,
	    "presetStartupTimeM": 0,
	    "_bindUserId": 10177,
	    "presetShutdownTimeH": 0,
	    "sessionId": "ACCF2353688C",
	    "color": 5,
	    "presetShutdownTimeM": 0,
	    "updateFlag": 255,
	    "light": 1,
	    "timeCloseH": 0,
	    "mist": 1
	};
	function padded8Char(str) {
	    var c = 8 - str.length,
	        a = [];
	    for (var i = 0; i < c; i++) {
	        a.push(0), a.join('');
	    };
	    return a.join('') + str;
	};
	// 运行数据行
	//webInterface.repaint({type:1, data:runData});

	var deviceId = _fun.Funs.getUrlParam('deviceId'); // clife_ACCF2353688C_7879
	var connType = _fun.Funs.getUrlParam('connType') || 'WIFI';
	var appId = _fun.Funs.getUrlParam('appId') || '10001';
	// console.log(connType, deviceId,appId);
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    //加载默认数据
	    onGetDefaultData: function onGetDefaultData() {
	        //模拟app发送给页面数据，造假数据
	        webInterface.repaint({ type: 1, data: runData });
	    },

	    //请求接口
	    onGetOnlineData: function onGetOnlineData() {
	        $.ajax({
	            url: urlGet + ('?deviceId=' + deviceId) + ('&appId=' + appId),
	            dataType: 'json',
	            success: function success(data) {
	                // console.log(data);
	                //默认初始化数据，如果没有数据不请求数据
	                if (data.data != null && data.data != '' && data.data != undefined) {
	                    runData = data.data;
	                }
	                webInterface.repaint({ type: 1, data: runData });
	            }
	        });
	    },
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    },
	    onSwitch: function onSwitch(e) {
	        if (isShutdown()) {
	            // 关机状态，开机
	            // runData.updateFlag = 0x01 | 0x02 | 0x08 | 0x10;
	            runData.light = 1;
	            runData.mist = 1;
	        } else {
	            // 开机状态，关机
	            // runData.updateFlag = 0x01 | 0x02 | 0x10;
	            runData.light = 3;
	            runData.mist = 2;
	        }
	        this.trigger(runData);
	        this.submit(runData);
	    },
	    onToggleColor: function onToggleColor(value) {
	        runData.color = value; //颜色值
	        runData.light = 1; //全灯亮
	        //runData.updateFlag = 0x40 | 0x00 | 0x08 | 0x00;
	        //计算updateFlag
	        var c1 = het.hexUpFlag(11, 1, 4);
	        var c = het.hexUpFlag(31, 1, 4, c1);
	        //runData.updateFlag = '80000800' || c;
	        runData.updateFlag = '80000800';
	        runData.timer = null;
	        this.trigger(runData);
	        this.submit(runData);

	        // this.trigger({color: value});
	    },
	    onToggleLight: function onToggleLight(value) {
	        runData.light = value;

	        runData.updateFlag = '80000000';
	        //runData.updateFlag = '80000000' || het.hexUpFlag(31, 1, 4);
	        runData.timer = null;
	        this.trigger(runData);
	        this.submit(runData);
	        // this.trigger({light: value});
	    },
	    onToggleMist: function onToggleMist(value) {
	        runData.mist = value;
	        runData.updateFlag = '40000000';
	        //runData.updateFlag = '40000000' || het.hexUpFlag(30, 1, 4);
	        runData.timer = null;
	        this.trigger(runData);
	        this.submit(runData);
	        // this.trigger({light: value});
	    },
	    submit: function submit(data) {
	        var cfgData = {
	            deviceId: deviceId,
	            connType: connType,
	            json: JSON.stringify(data)
	        };
	        $.ajax({
	            //设备id~~~
	            url: urlSet + ('?appId=' + appId),
	            type: 'POST',
	            dataType: 'json',
	            data: cfgData,
	            success: function success(data) {
	                //重置回0
	                runData.updateFlag = 0;
	                //console.log(data);
	                //console.log(cfgData);
	            }
	        });
	    }
	});

	// 判断是否关机状态
	var isShutdown = exports.isShutdown = function isShutdown() {
	    return runData.light == 3 && runData.mist == 2;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(7);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var Funs = {
	    /*
	        * 获取url参数
	        * sName ：参数名
	        * return : 返回参数值（没有的时候返回空）
	        */
	    getUrlParam: function getUrlParam(sName) {
	        var reg = new RegExp("(^|&)" + sName + "=([^&]*)(&|$)", "i");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return decodeURIComponent(r[2]); // (r[2]);
	        return "";
	    },

	    /**
	     * 合并对象
	     * target  target 对象
	     * return 合并后对象 
	     */
	    _extends: function _extends(target) {
	        for (var i = 1; i < arguments.length; i++) {
	            var source = arguments[i];
	            for (var key in source) {
	                if (Object.prototype.hasOwnProperty.call(source, key)) {
	                    target[key] = source[key];
	                }
	            }
	        }
	        return target;
	    } // 公共函数模块

	};
	module.exports = Funs;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DevScreen = undefined;

	var _Actions = __webpack_require__(4);

	var DevScreen = exports.DevScreen = React.createClass({
	    displayName: "DevScreen",

	    handlerClick: function handlerClick(e) {
	        return _Actions.Actions.switch(e);
	    },
	    render: function render() {
	        var idx = this.props.colorIndex;
	        return React.createElement(
	            "section",
	            { className: "screen" },
	            React.createElement(
	                "div",
	                { className: "pic" },
	                idx >= 1 && idx <= 8 ? React.createElement("img", { src: "../static/img/aromaDiffuser/aroma-c" + idx + ".png" }) : ""
	            ),
	            React.createElement("a", { href: "javascript:", onClick: this.handlerClick, className: "switch" })
	        );
	    }
	});

	// module.exports = DevScreen;
	/**
	 * 主显示组件
	 * @prop {integer} colorIndex   颜色索引，设置不同颜色，取值1-7，超出范围将显示白色
	 * @act  AppActions.switch() 点击开/关机按钮时触发
	 */

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Lights = undefined;

	var _Actions = __webpack_require__(4);

	var Lights = exports.Lights = React.createClass({
	    displayName: "Lights",

	    items: [{ id: 1, name: "全亮灯" }, { id: 2, name: "半亮灯" }, { id: 3, name: "关闭灯" }],
	    handlerClick: function handlerClick(index) {
	        return function () {
	            _Actions.Actions.toggleLight(index);
	        };
	    },
	    render: function render() {
	        var idx = this.props.lightIndex;
	        return React.createElement(
	            "section",
	            { className: "lights flex" },
	            this.items.map(function (o) {
	                return React.createElement(
	                    "dl",
	                    { key: o.id, className: (idx == o.id ? "on" : "") + " flex-cell", onClick: this.handlerClick(o.id) },
	                    React.createElement(
	                        "dd",
	                        null,
	                        React.createElement("img", { src: idx == o.id ? "../static/img/aromaDiffuser/light" + o.id + "-on.png" : "../static/img/aromaDiffuser/light" + o.id + "-off.png" })
	                    ),
	                    React.createElement(
	                        "dt",
	                        null,
	                        o.name
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});
	// module.exports = Lights;
	/**
	 * 全亮/半亮/关闭 灯
	 * @prop {integer} lightIndex  灯索引，与id对应。取值1-3，超出范围将不点亮任何灯
	 * @act  AppActions.toggleLight([integer])  切换灯时触发该动作
	 */

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 定时选择组件
	 * @prop {integer} timeValue  定时时间值，取值30分钟的整数倍
	 * @act  AppActions.toggleTimeClock([integer])  选择时间时触发
	 */
	var Clock = exports.Clock = React.createClass({
	    displayName: "Clock",

	    items: [{ name: "关闭", value: "0" }, { name: "30分钟", value: "30" }, { name: "60分钟", value: "60" }, { name: "120分钟", value: "120" }],
	    handlerClick: function handlerClick(value) {
	        return function () {
	            AppActions.toggleTimeClock(value);
	        };
	    },
	    render: function render() {
	        var time = this.props.timeValue;
	        return React.createElement(
	            "section",
	            { className: "clock flex" },
	            this.items.map(function (o, idx) {
	                return React.createElement(
	                    "dl",
	                    { key: idx, className: (o.value == time ? "on" : "") + " flex-cell", onClick: this.handlerClick(o.value) },
	                    React.createElement("dd", null),
	                    React.createElement(
	                        "dt",
	                        null,
	                        o.name
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});
	// module.exports = Clock;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Colors = undefined;

	var _Actions = __webpack_require__(4);

	var Colors = exports.Colors = React.createClass({
	    displayName: "Colors",

	    items: [1, 2, 3, 4, 5, 6, 7, 8],
	    handlerClick: function handlerClick(index) {
	        return function () {
	            event.preventDefault();
	            _Actions.Actions.toggleColor(index);
	        };
	    },
	    render: function render() {
	        var idx = this.props.colorIndex;
	        return React.createElement(
	            "section",
	            { className: "colors flex" },
	            this.items.map(function (i, k) {
	                return React.createElement(
	                    "a",
	                    { key: k, href: "#", className: (i == idx ? "on" : "") + " flex-cell", onClick: this.handlerClick(i) },
	                    React.createElement(
	                        "b",
	                        { className: "c" + i },
	                        "√"
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});
	// module.exports = Colors;
	/**
	 * 8颜色选择组件
	 * @prop {integer} colorIndex 颜色索引，设置不同颜色，取值1-7
	 * @act  AppActions.toggleColor([integer]) 切换颜色时触发
	 */

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 定时开/关机组件
	 * @prop {boolean} active      组件激活状态，用于控制组件开关
	 * @prop {boolean} beShutdown  设备开/关机状态，用于控制显示“定时开机”或“定时关机”
	 * @prop {integer} timeValue   定时开/关机时间
	 * @act  AppActions.updateOrderTime([integer])        设置时间时触发该动作
	 * @act  AppActions.toggleOrderTimeSwitch([boolean])  拨动开关时触发该动作
	 */
	var Clock2 = exports.Clock2 = React.createClass({
	    displayName: "Clock2",

	    lastSetTime: 0, // 缓存最后一次设置的时间，用于缓冲结束后发送
	    sendTimer: 0, // 缓冲发送计时器
	    isDelaying: false, // 缓冲标识
	    getInitialState: function getInitialState() {
	        return { timeValue: 0 };
	    },
	    // 分钟数转换成00:00格式
	    timeToValue: function timeToValue(time) {
	        return ("0" + Math.floor(time / 60)).slice(-2) + ":" + ("0" + time % 60).slice(-2);
	    },
	    // 00:00格式转换成分钟数
	    valueToTime: function valueToTime(value) {
	        var t = value.split(":");
	        return parseInt(t[0]) * 60 + parseInt(t[1]);
	    },
	    handlerChange: function handlerChange() {
	        var $this = this;
	        if (this.props.active) {
	            this.lastSetTime = this.valueToTime(event.target.value);
	            this.setState({ timeValue: this.lastSetTime });
	            this.isDelaying = true;
	            clearTimeout(this.sendTimer);
	            this.sendTimer = setTimeout(function () {
	                // 缓冲1秒才发送数据
	                $this.isDelaying = false;
	                AppActions.updateOrderTime($this.lastSetTime);
	            }, 1000);
	        }
	    },
	    handlerSwitch: function handlerSwitch() {
	        AppActions.toggleOrderTimeSwitch(!this.props.active);
	    },
	    render: function render() {
	        var isShutdown = this.props.beShutdown;
	        var time = this.isDelaying ? this.state.timeValue : this.props.timeValue;
	        var active = this.props.active;
	        time = typeof time === "undefined" ? 0 : time;
	        return React.createElement(
	            "section",
	            { className: "clock2 flex" },
	            React.createElement(
	                "dl",
	                { className: "flex-cell" },
	                React.createElement(
	                    "dt",
	                    null,
	                    isShutdown ? "定时开启" : "定时关机"
	                ),
	                React.createElement(
	                    "dd",
	                    null,
	                    React.createElement("input", { type: "time", onChange: this.handlerChange, value: this.timeToValue(time) })
	                )
	            ),
	            React.createElement(
	                "p",
	                { className: "flex-cell" },
	                React.createElement("b", { onClick: this.handlerSwitch, className: "wg-switch " + (this.props.active ? "on" : "") })
	            )
	        );
	    }
	});
	// module.exports = Clock2;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Mists = undefined;

	var _Actions = __webpack_require__(4);

	var Mists = exports.Mists = React.createClass({
	    displayName: "Mists",

	    items: [{ id: 1, name: "大喷雾" }, { id: 2, name: "小喷雾" }, { id: 3, name: "喷雾关" }],
	    handlerClick: function handlerClick(index) {
	        return function () {
	            _Actions.Actions.toggleMist(index);
	        };
	    },
	    render: function render() {
	        var idx = this.props.mistIndex;
	        return React.createElement(
	            "section",
	            { className: "mists flex" },
	            this.items.map(function (o) {
	                return React.createElement(
	                    "dl",
	                    { key: o.id, className: (idx == o.id ? "on" : "") + " flex-cell", onClick: this.handlerClick(o.id) },
	                    React.createElement(
	                        "dd",
	                        null,
	                        React.createElement("img", { src: idx == o.id ? "../static/img/aromaDiffuser/light" + o.id + "-on.png" : "../static/img/aromaDiffuser/light" + o.id + "-off.png" })
	                    ),
	                    React.createElement(
	                        "dt",
	                        null,
	                        o.name
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});
	// module.exports = Mists;
	/**
	 * 全亮/半亮/关闭 灯
	 * @prop {integer} lightIndex  灯索引，与id对应。取值1-3，超出范围将不点亮任何灯
	 * @act  AppActions.toggleLight([integer])  切换灯时触发该动作
	 */
	/** 大喷雾/小喷雾/关闭 喷雾*/

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(15);

	var _Store = __webpack_require__(16);

	var _DevScreen = __webpack_require__(17);

	var _Lights = __webpack_require__(18);

	var _Clock = __webpack_require__(19);

	var _Colors = __webpack_require__(20);

	var _PowerClock = __webpack_require__(21);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';

	// 加载组件


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        setInterval(_Actions.Actions.getOnlineData, 4000); //4秒刷新
	        //setTimeout(()=>{Actions.getOnlineData(); // 获取运行数据}, 4000);
	        return _this;
	    }
	    //加载默认数据


	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getDefaultData();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { className: "startupface " + ((0, _Store.isShutdown)(this.state) ? "slide-down" : "slide-up") },
	                    React.createElement(_DevScreen.DevScreen, { colorIndex: this.state.color }),
	                    React.createElement(
	                        'div',
	                        { id: 'panel-scroller' },
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(_Lights.Lights, { lightIndex: this.state.light }),
	                            React.createElement(
	                                'h2',
	                                null,
	                                '颜色'
	                            ),
	                            React.createElement(_Colors.Colors, { colorIndex: this.state.color })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: "shutdownface " + ((0, _Store.isShutdown)(this.state) ? "slide-up" : "slide-down") },
	                    React.createElement('div', { className: 'pic' }),
	                    React.createElement('a', { href: 'javascript:', className: 'switch', onClick: _Actions.Actions.switch })
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('加湿器');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['getDefaultData', //获取默认数据
	'getOnlineData', // 获取运行数据
	'repaint', // 接收到数据，重新渲染
	'switch', // 开关
	'toggleLight', // 切换灯
	'toggleColor']);

/***/ },
/* 16 */
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
	exports.isShutdown = exports.Store = undefined;

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(15);

	var urlGet = '/clife-wechat-test/wechat/device/config/get';
	var urlSet = '/clife-wechat-test/wechat/device/config/set';
	// 默认数据行
	var runData = {
	    "_user_id": 1,
	    "_source": 6,
	    "presetStartupTimeH": 0,
	    "timeCloseM": 0,
	    "sourceFlag": 0,
	    "presetStartupTimeM": 0,
	    "_bindUserId": 10177,
	    "presetShutdownTimeH": 0,
	    "sessionId": "ACCF2353688C",
	    "color": 5,
	    "presetShutdownTimeM": 0,
	    "updateFlag": 255,
	    "light": 1,
	    "timeCloseH": 0,
	    "mist": 1
	};
	// 运行数据行
	//webInterface.repaint({type:1, data:runData});

	var deviceId = _fun.Funs.getUrlParam('deviceId'); // clife_ACCF2353688C_7879
	var connType = _fun.Funs.getUrlParam('connType') || 'WIFI';
	var appId = _fun.Funs.getUrlParam('appId') || '10001';
	// console.log(connType, deviceId,appId);
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    //加载默认数据
	    onGetDefaultData: function onGetDefaultData() {
	        webInterface.repaint({ type: 1, data: runData });
	    },

	    //请求接口
	    onGetOnlineData: function onGetOnlineData() {
	        $.ajax({
	            url: urlGet + ('?deviceId=' + deviceId) + ('&appId=' + appId),
	            dataType: 'json',
	            success: function success(data) {
	                // console.log(data);
	                //默认初始化数据，如果没有数据不请求数据
	                if (data.data != null && data.data != '' && data.data != undefined) {
	                    runData = data.data;
	                }
	                webInterface.repaint({ type: 1, data: runData });
	            }
	        });
	    },
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    },
	    onSwitch: function onSwitch(e) {
	        if (isShutdown()) {
	            // 关机状态，开机
	            // runData.updateFlag = 0x01 | 0x02 | 0x08 | 0x10;
	            runData.light = 1;
	            runData.mist = 1;
	        } else {
	            // 开机状态，关机
	            // runData.updateFlag = 0x01 | 0x02 | 0x10;
	            runData.light = 3;
	            runData.mist = 2;
	        }
	        this.trigger(runData);
	        this.submit(runData);
	    },
	    onToggleColor: function onToggleColor(value) {
	        runData.color = value;
	        this.trigger(runData);
	        this.submit(runData);
	        // this.trigger({color: value});
	    },
	    onToggleLight: function onToggleLight(value) {
	        runData.light = value;
	        this.trigger(runData);
	        this.submit(runData);
	        // this.trigger({light: value});
	    },
	    submit: function submit(data) {
	        data.updateFlag = 255;
	        var cfgData = {
	            deviceId: deviceId,
	            connType: connType,
	            json: JSON.stringify(data)
	        };
	        $.ajax({
	            //设备id
	            url: urlSet + ('?appId=' + appId),
	            type: 'POST',
	            dataType: 'json',
	            data: cfgData,
	            success: function success(data) {
	                console.log(data);
	                console.log('--打印参数---');
	                console.log(cfgData);
	            }
	        });
	    }
	});

	// 判断是否关机状态
	var isShutdown = exports.isShutdown = function isShutdown() {
	    return runData.light == 3 && runData.mist == 2;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DevScreen = undefined;

	var _Actions = __webpack_require__(15);

	var DevScreen = exports.DevScreen = React.createClass({
	    displayName: "DevScreen",

	    handlerClick: function handlerClick(e) {
	        return _Actions.Actions.switch(e);
	    },
	    render: function render() {
	        var idx = this.props.colorIndex;
	        return React.createElement(
	            "section",
	            { className: "screen" },
	            React.createElement(
	                "div",
	                { className: "pic" },
	                idx >= 1 && idx <= 8 ? React.createElement("img", { src: "../static/img/aromaDiffuser/aroma-c" + idx + ".png" }) : ""
	            ),
	            React.createElement("a", { href: "javascript:", onClick: this.handlerClick, className: "switch" })
	        );
	    }
	});

	// module.exports = DevScreen;
	/**
	 * 主显示组件
	 * @prop {integer} colorIndex   颜色索引，设置不同颜色，取值1-7，超出范围将显示白色
	 * @act  AppActions.switch() 点击开/关机按钮时触发
	 */

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Lights = undefined;

	var _Actions = __webpack_require__(15);

	var Lights = exports.Lights = React.createClass({
	    displayName: "Lights",

	    items: [{ id: 1, name: "全亮灯" }, { id: 2, name: "半亮灯" }, { id: 3, name: "关闭灯" }],
	    handlerClick: function handlerClick(index) {
	        return function () {
	            _Actions.Actions.toggleLight(index);
	        };
	    },
	    render: function render() {
	        var idx = this.props.lightIndex;
	        return React.createElement(
	            "section",
	            { className: "lights flex" },
	            this.items.map(function (o) {
	                return React.createElement(
	                    "dl",
	                    { key: o.id, className: (idx == o.id ? "on" : "") + " flex-cell", onClick: this.handlerClick(o.id) },
	                    React.createElement(
	                        "dd",
	                        null,
	                        React.createElement("img", { src: idx == o.id ? "../static/img/aromaDiffuser/light" + o.id + "-on.png" : "../static/img/aromaDiffuser/light" + o.id + "-off.png" })
	                    ),
	                    React.createElement(
	                        "dt",
	                        null,
	                        o.name
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});
	// module.exports = Lights;
	/**
	 * 全亮/半亮/关闭 灯
	 * @prop {integer} lightIndex  灯索引，与id对应。取值1-3，超出范围将不点亮任何灯
	 * @act  AppActions.toggleLight([integer])  切换灯时触发该动作
	 */

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 定时选择组件
	 * @prop {integer} timeValue  定时时间值，取值30分钟的整数倍
	 * @act  AppActions.toggleTimeClock([integer])  选择时间时触发
	 */
	var Clock = exports.Clock = React.createClass({
	    displayName: "Clock",

	    items: [{ name: "关闭", value: "0" }, { name: "30分钟", value: "30" }, { name: "60分钟", value: "60" }, { name: "120分钟", value: "120" }],
	    handlerClick: function handlerClick(value) {
	        return function () {
	            AppActions.toggleTimeClock(value);
	        };
	    },
	    render: function render() {
	        var time = this.props.timeValue;
	        return React.createElement(
	            "section",
	            { className: "clock flex" },
	            this.items.map(function (o, idx) {
	                return React.createElement(
	                    "dl",
	                    { key: idx, className: (o.value == time ? "on" : "") + " flex-cell", onClick: this.handlerClick(o.value) },
	                    React.createElement("dd", null),
	                    React.createElement(
	                        "dt",
	                        null,
	                        o.name
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});
	// module.exports = Clock;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Colors = undefined;

	var _Actions = __webpack_require__(15);

	var Colors = exports.Colors = React.createClass({
	    displayName: "Colors",

	    items: [1, 2, 3, 4, 5, 6, 7, 8],
	    handlerClick: function handlerClick(index) {
	        return function () {
	            event.preventDefault();
	            _Actions.Actions.toggleColor(index);
	        };
	    },
	    render: function render() {
	        var idx = this.props.colorIndex;
	        return React.createElement(
	            "section",
	            { className: "colors flex" },
	            this.items.map(function (i, k) {
	                return React.createElement(
	                    "a",
	                    { key: k, href: "#", className: (i == idx ? "on" : "") + " flex-cell", onClick: this.handlerClick(i) },
	                    React.createElement(
	                        "b",
	                        { className: "c" + i },
	                        "√"
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});
	// module.exports = Colors;
	/**
	 * 8颜色选择组件
	 * @prop {integer} colorIndex 颜色索引，设置不同颜色，取值1-7
	 * @act  AppActions.toggleColor([integer]) 切换颜色时触发
	 */

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 定时开/关机组件
	 * @prop {boolean} active      组件激活状态，用于控制组件开关
	 * @prop {boolean} beShutdown  设备开/关机状态，用于控制显示“定时开机”或“定时关机”
	 * @prop {integer} timeValue   定时开/关机时间
	 * @act  AppActions.updateOrderTime([integer])        设置时间时触发该动作
	 * @act  AppActions.toggleOrderTimeSwitch([boolean])  拨动开关时触发该动作
	 */
	var Clock2 = exports.Clock2 = React.createClass({
	    displayName: "Clock2",

	    lastSetTime: 0, // 缓存最后一次设置的时间，用于缓冲结束后发送
	    sendTimer: 0, // 缓冲发送计时器
	    isDelaying: false, // 缓冲标识
	    getInitialState: function getInitialState() {
	        return { timeValue: 0 };
	    },
	    // 分钟数转换成00:00格式
	    timeToValue: function timeToValue(time) {
	        return ("0" + Math.floor(time / 60)).slice(-2) + ":" + ("0" + time % 60).slice(-2);
	    },
	    // 00:00格式转换成分钟数
	    valueToTime: function valueToTime(value) {
	        var t = value.split(":");
	        return parseInt(t[0]) * 60 + parseInt(t[1]);
	    },
	    handlerChange: function handlerChange() {
	        var $this = this;
	        if (this.props.active) {
	            this.lastSetTime = this.valueToTime(event.target.value);
	            this.setState({ timeValue: this.lastSetTime });
	            this.isDelaying = true;
	            clearTimeout(this.sendTimer);
	            this.sendTimer = setTimeout(function () {
	                // 缓冲1秒才发送数据
	                $this.isDelaying = false;
	                AppActions.updateOrderTime($this.lastSetTime);
	            }, 1000);
	        }
	    },
	    handlerSwitch: function handlerSwitch() {
	        AppActions.toggleOrderTimeSwitch(!this.props.active);
	    },
	    render: function render() {
	        var isShutdown = this.props.beShutdown;
	        var time = this.isDelaying ? this.state.timeValue : this.props.timeValue;
	        var active = this.props.active;
	        time = typeof time === "undefined" ? 0 : time;
	        return React.createElement(
	            "section",
	            { className: "clock2 flex" },
	            React.createElement(
	                "dl",
	                { className: "flex-cell" },
	                React.createElement(
	                    "dt",
	                    null,
	                    isShutdown ? "定时开启" : "定时关机"
	                ),
	                React.createElement(
	                    "dd",
	                    null,
	                    React.createElement("input", { type: "time", onChange: this.handlerChange, value: this.timeToValue(time) })
	                )
	            ),
	            React.createElement(
	                "p",
	                { className: "flex-cell" },
	                React.createElement("b", { onClick: this.handlerSwitch, className: "wg-switch " + (this.props.active ? "on" : "") })
	            )
	        );
	    }
	});
	// module.exports = Clock2;

/***/ }
/******/ ]);