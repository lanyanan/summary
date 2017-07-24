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

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */
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
	'lock', // 童锁
	'swicthMode', // 切换模式
	'switchPower', // 电源开关
	'adjustCold', // 调节冷藏室
	'adjustFreez', // 调节冷冻室
	'adjustTime' // 调节冷冻时间
	]);

/***/ },
/* 3 */
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

	var _Actions = __webpack_require__(2);

	var currentMode = 5; // 记忆当前模式
	// 退出模式记忆
	var exitMode = {
	    mode: 5,
	    temp1: -18,
	    temp2: 5
	};
	// 模式基本设定
	var modes = {
	    // 速冷模式
	    1: {
	        mode: 1,
	        temp1: exitMode.temp1, // 冷冻室
	        temp2: 2, // 冷藏室
	        power: 2
	    },
	    // 速冻模式
	    2: {
	        mode: 2,
	        temp1: -24,
	        temp2: exitMode.temp2
	    },
	    // 假日模式
	    3: {
	        mode: 3,
	        temp1: -15,
	        temp2: 7
	    },
	    // 智能模式
	    4: {
	        mode: 4,
	        temp1: -18,
	        temp2: 5
	    },
	    // 退出模式
	    5: exitMode
	};

	// 记忆温度
	function memorizeTemp(key, value) {
	    var mode = key === 'temp1' ? 1 : 2;
	    exitMode[key] = value;
	    modes[mode][key] = value;
	};

	// 导出常量
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (typeof data.temp1 !== 'undefined') {
	            memorizeTemp('temp1', data.temp1);
	        }
	        if (typeof data.temp2 !== 'undefined') {
	            memorizeTemp('temp2', data.temp2);
	        }
	        if (typeof data.mode !== 'undefined') {
	            currentMode = data.mode;
	        }
	        if (currentMode == 2) {
	            // 冷冻模式只取预设温度
	            this.trigger(modes[currentMode]);
	        } else {
	            this.trigger(data);
	        }
	    },
	    onLock: function onLock(value) {
	        this.trigger({ childLock: value });
	        /*het.send({childLock: value}, (data)=>{},(data)=>{
	            het.toast("命令发送失败");
	        });*/
	    },
	    onSwicthMode: function onSwicthMode(value) {
	        currentMode = value;
	        this.trigger(modes[value]);
	        het.send(modes[value], function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSwitchPower: function onSwitchPower(value) {
	        this.trigger({ power: value });
	        het.send({ power: value }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onAdjustFreez: function onAdjustFreez(value) {
	        memorizeTemp('temp1', value);
	        if (currentMode === 1) {
	            this.trigger({ temp1: value });
	        } else {
	            this.trigger({ temp1: value, mode: 5 });
	        }
	        het.send({ temp1: value, mode: 5 }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onAdjustCold: function onAdjustCold(value) {
	        memorizeTemp('temp2', value);
	        if (currentMode === 2) {
	            this.trigger({ temp2: value });
	        } else {
	            this.trigger({ temp2: value, mode: 5 });
	        }
	        het.send({ temp2: value, mode: 5 }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onAdjustTime: function onAdjustTime(value) {
	        this.trigger({ hour: value });
	        het.send({ hour: value }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(5);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _Temperate = __webpack_require__(7);

	var _ModeButton = __webpack_require__(9);

	var _ChildLockSurface = __webpack_require__(10);

	var _TimeSelect = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';
	// 温度组件
	// 模式组件
	// 童锁组件


	// 时钟组件

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        webDataMap: {
	            'childLock': 'lockSet',
	            'temp1': 'freezerTemp', // 冷冻室
	            'temp2': 'refgTemp', // 冷藏室
	            'mode': 'mode',
	            'power': 'refgSwitch',
	            'hour': 'freezerSetTime'
	        },
	        updateFlagMap: {
	            'mode': 9,
	            'temp2': 10,
	            'temp1': 12,
	            'hour': 13,
	            'power': 14,
	            'childLock': 16
	        },
	        renderConfigData: true,
	        filter: {
	            'childLock': 1,
	            'temp1': 0, // 冷冻室
	            'temp2': 0, // 冷藏室
	            'mode': 1,
	            'power': 1,
	            'hour': 1
	        }
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

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            showClock: false // 时间控件开关
	        };
	        _this.listenStore(_Store.Store);
	        return _this;
	    }
	    // 童锁控制


	    _createClass(App, [{
	        key: 'childLock',
	        value: function childLock() {
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            if (this.state.childLock == 2) _Actions.Actions.lock(1);else _Actions.Actions.lock(2);
	        }
	        // 切换模式

	    }, {
	        key: 'switchMode',
	        value: function switchMode(mode) {
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            var index = void 0;
	            switch (mode) {
	                case 'auto':
	                    index = 4;break;
	                case 'cold':
	                    index = 1;break;
	                case 'freeze':
	                    index = 2;break;
	                case 'holiday':
	                    index = 3;break;
	                case 'exit':
	                    index = 5;break;
	            }
	            _Actions.Actions.swicthMode(index);
	        }
	        // 电源键

	    }, {
	        key: 'switchPower',
	        value: function switchPower() {
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            if (this.state.power == 1) _Actions.Actions.switchPower(2);else _Actions.Actions.switchPower(1);
	        }
	        // 调节冷藏室

	    }, {
	        key: 'adjustCold',
	        value: function adjustCold(value) {
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            _Actions.Actions.adjustCold(value);
	        }
	        // 调节冷冻室

	    }, {
	        key: 'adjustFreez',
	        value: function adjustFreez(value) {
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            _Actions.Actions.adjustFreez(value);
	        }
	        // 调节冷冻时间

	    }, {
	        key: 'adjustTime',
	        value: function adjustTime(value) {
	            _Actions.Actions.adjustTime(value);
	            this.showClock();
	        }
	    }, {
	        key: 'showClock',
	        value: function showClock() {
	            this.setState({ showClock: !this.state.showClock });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var clockShow = { visibility: this.state.mode == 2 ? 'visible' : 'hidden' };
	            var powerShow = { visibility: this.state.mode == 1 ? 'hidden' : 'visible' };
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: 'flex dev-head', style: { 'paddingTop': this.state.headerTop } },
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell dev-name' },
	                        React.createElement(
	                            'b',
	                            null,
	                            '<'
	                        ),
	                        this.state.deviceName,
	                        React.createElement(
	                            'b',
	                            null,
	                            '>'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell online' },
	                        this.state.online == 1 ? '已连接' : '未连接'
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'main-wrap' },
	                        React.createElement(
	                            'div',
	                            { className: 'blue-box flex' },
	                            React.createElement(
	                                'dl',
	                                { className: 'flex-cell' },
	                                React.createElement(
	                                    'dt',
	                                    null,
	                                    '\u51B7\u51BB\u5BA4'
	                                ),
	                                React.createElement(
	                                    'dd',
	                                    null,
	                                    this.state.temp1 == 255 ? '-' : this.state.temp1,
	                                    React.createElement(
	                                        'sup',
	                                        null,
	                                        '\u2103'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'dl',
	                                { className: 'flex-cell' },
	                                React.createElement(
	                                    'dt',
	                                    null,
	                                    '\u51B7\u85CF\u5BA4'
	                                ),
	                                React.createElement(
	                                    'dd',
	                                    null,
	                                    this.state.temp2 == 255 ? '-' : this.state.temp2,
	                                    React.createElement(
	                                        'sup',
	                                        null,
	                                        '\u2103'
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell vice-wrap child-lock' },
	                        React.createElement(
	                            'dl',
	                            null,
	                            React.createElement(
	                                'dd',
	                                { onTouchStart: this.childLock.bind(this), className: 'child-lock-ico' },
	                                React.createElement('img', { src: '../static/img/childlock-off@3x.png' })
	                            ),
	                            React.createElement(
	                                'dt',
	                                { className: 'child-lock-txt' },
	                                '\u513F\u7AE5\u9501'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex main-panel' },
	                    React.createElement(
	                        'div',
	                        { className: 'main-wrap' },
	                        React.createElement(
	                            'div',
	                            { className: 'flex' },
	                            React.createElement(_Temperate.Temperate, { className: 'flex-cell', min: '-15', max: '-22', minus: true, value: this.state.temp1, cb: this.adjustFreez.bind(this) }),
	                            React.createElement(_Temperate.Temperate, { className: 'flex-cell', min: '2', max: '8', value: this.state.temp2, cb: this.adjustCold.bind(this) })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex bottom-buttons' },
	                            React.createElement(
	                                'dl',
	                                { onTouchStart: this.showClock.bind(this), className: 'flex-cell b-clock', style: clockShow },
	                                React.createElement(
	                                    'dd',
	                                    null,
	                                    React.createElement('img', { src: '../static/img/clock@3x.png' })
	                                ),
	                                React.createElement(
	                                    'dt',
	                                    null,
	                                    this.state.hour,
	                                    'H'
	                                )
	                            ),
	                            React.createElement(
	                                'dl',
	                                { onTouchStart: this.switchPower.bind(this), className: 'flex-cell b-switch', style: powerShow },
	                                React.createElement(
	                                    'dd',
	                                    null,
	                                    React.createElement('img', { src: '../static/img/switch-' + (this.state.power == 2 ? 'on' : 'off') + '@3x.png' })
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell vice-wrap mode-panel' },
	                        React.createElement(_ModeButton.ModeButton, { mode: 'auto', text: '\u667A\u80FD\u6A21\u5F0F', on: this.state.mode == 4 ? true : false, cb: this.switchMode.bind(this) }),
	                        React.createElement(_ModeButton.ModeButton, { mode: 'cold', text: '\u901F\u51B7\u6A21\u5F0F', on: this.state.mode == 1 ? true : false, cb: this.switchMode.bind(this) }),
	                        React.createElement(_ModeButton.ModeButton, { mode: 'freeze', text: '\u901F\u51BB\u6A21\u5F0F', on: this.state.mode == 2 ? true : false, cb: this.switchMode.bind(this) }),
	                        React.createElement(_ModeButton.ModeButton, { mode: 'holiday', text: '\u5047\u65E5\u6A21\u5F0F', on: this.state.mode == 3 ? true : false, cb: this.switchMode.bind(this) })
	                    )
	                ),
	                React.createElement(_ChildLockSurface.ChildLockSurface, { show: !!(this.state.childLock == 2), cb: this.childLock.bind(this) }),
	                React.createElement(_TimeSelect.TimeSelect, { title: '\u8BBE\u7F6E\u51B7\u51BB\u65F6\u95F4', minuteshow: false, hourshow: true,
	                    show: this.state.showClock, statusname: ' ', hourstep: '6', maxhour: '30',
	                    cancelClock: this.showClock.bind(this), submitClock: this.adjustTime.bind(this) })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	;

	// 开始渲染
	het.domReady(function () {
	    het.setTitle('惠而浦冰箱');
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(6);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Temperate = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _range = __webpack_require__(8);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 温度设置组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer}  value 当前温度值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer}  min   最小温度值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer}  max   最大温度值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {boolean}  minus 是否有负号
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {function} cb    可选，调节温度后的回调函数
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Temperate = exports.Temperate = function (_React$Component) {
	    _inherits(Temperate, _React$Component);

	    function Temperate(props) {
	        _classCallCheck(this, Temperate);

	        var _this = _possibleConstructorReturn(this, (Temperate.__proto__ || Object.getPrototypeOf(Temperate)).call(this, props));

	        _this.state = {
	            temp: null,
	            last: props.min // 上一次数据
	        };
	        return _this;
	    }

	    _createClass(Temperate, [{
	        key: 'feedback',
	        value: function feedback(value) {
	            var val = Math.round(value / 10);
	            this.setState({ temp: this.props.minus ? -val : val });
	        }
	    }, {
	        key: 'touchEnd',
	        value: function touchEnd(e) {
	            var val = this.isNum(this.state.temp) ? this.state.temp : this.state.last; // 防止无效操作
	            if (typeof this.props.cb === 'function' && this.state.temp != this.state.last) {
	                this.props.cb(val);
	            }
	            this.setState({ temp: null, last: val });
	        }
	    }, {
	        key: 'isNum',
	        value: function isNum(s) {
	            if (s !== null && s !== '') return !isNaN(s);
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var min = this.props.minus ? -this.props.min : this.props.min;
	            var max = this.props.minus ? -this.props.max : this.props.max;
	            var value = this.props.minus ? -this.props.value : this.props.value;
	            if (value < min) {
	                value = min;
	            } else if (value > max) {
	                value = max;
	            }
	            return React.createElement(
	                'ul',
	                { className: this.props.className + ' temperate' },
	                React.createElement(
	                    'li',
	                    null,
	                    this.props.min,
	                    '\u2103'
	                ),
	                React.createElement(
	                    'li',
	                    { className: 't-wrap' },
	                    React.createElement(
	                        'div',
	                        { className: 't-range', onTouchEnd: this.touchEnd.bind(this) },
	                        React.createElement(_range2.default, { min: min * 10, max: max * 10, value: value * 10, fnFeedback: this.feedback.bind(this) })
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 't-value' },
	                        this.state.temp === null ? this.props.value : this.state.temp,
	                        '\u2103'
	                    )
	                ),
	                React.createElement(
	                    'li',
	                    null,
	                    this.props.max,
	                    '\u2103'
	                )
	            );
	        }
	    }]);

	    return Temperate;
	}(React.Component);

	;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {integer}  value       传入初始值
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 * @prop {integer}  min         可选，最小值，缺省为0
	 * @prop {integer}  max         可选，最大值，缺省为100
	 * @prop {boolean}  disabled    可选，是否可以点击
	 */
	var Range = React.createClass({
	    displayName: "Range",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    min: function min() {
	        return this.props.min || "0";
	    },
	    max: function max() {
	        return this.props.max || "100";
	    },
	    // 定位
	    pos: function pos(value) {
	        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var rate = (value - this.min()) / (this.max() - this.min()); // 比率
	        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
	        cursor.style.left = left + "px";
	    },
	    handlerChange: function handlerChange(e) {
	        var value = parseInt(e.currentTarget.value);
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        this.pos(value);
	    },
	    componentDidMount: function componentDidMount() {
	        this.componentDidUpdate();
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "__range" },
	            React.createElement(
	                "label",
	                { ref: "wrap" },
	                React.createElement("input", { type: "range", min: this.min(), max: this.max(), onChange: this.handlerChange, value: value, disabled: this.props.disabled ? "disabled" : "" }),
	                React.createElement(
	                    "i",
	                    { ref: "cursor", className: "cursor" },
	                    value
	                )
	            )
	        );
	    }
	});

	module.exports = Range;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 温度设置组件
	 * @prop {string}   mode 模式名称
	 * @prop {string}   text 文字描述
	 * @prop {boolean}  on   是否开启状态
	 * @prop {function} cb   可选，点击后的回调函数
	 */
	var ModeButton = exports.ModeButton = function (_React$Component) {
	    _inherits(ModeButton, _React$Component);

	    function ModeButton(props) {
	        _classCallCheck(this, ModeButton);

	        return _possibleConstructorReturn(this, (ModeButton.__proto__ || Object.getPrototypeOf(ModeButton)).call(this, props));
	    }

	    _createClass(ModeButton, [{
	        key: 'touchStart',
	        value: function touchStart() {
	            if (typeof this.props.cb === 'function') {
	                if (this.props.on) {
	                    // 当前是开启状态，再点击时进入退出模式
	                    this.props.cb('exit');
	                } else {
	                    // 当前是关闭状态，可以被选择
	                    this.props.cb(this.props.mode);
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var src = '../static/img/mode-' + this.props.mode + (this.props.on ? '-on' : '-off') + '@3x.png';
	            return React.createElement(
	                'dl',
	                { className: this.props.className, onTouchStart: this.touchStart.bind(this) },
	                React.createElement(
	                    'dd',
	                    null,
	                    React.createElement('img', { src: src })
	                ),
	                React.createElement(
	                    'dt',
	                    { className: this.props.on ? 'on' : '' },
	                    this.props.text
	                )
	            );
	        }
	    }]);

	    return ModeButton;
	}(React.Component);

	;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 温度设置组件
	 * @prop {boolean}  show 是否开启童锁
	 * @prop {function} cb   可选，解锁后的回调函数
	 */
	var ChildLockSurface = exports.ChildLockSurface = function (_React$Component) {
	    _inherits(ChildLockSurface, _React$Component);

	    function ChildLockSurface(props) {
	        _classCallCheck(this, ChildLockSurface);

	        var _this = _possibleConstructorReturn(this, (ChildLockSurface.__proto__ || Object.getPrototypeOf(ChildLockSurface)).call(this, props));

	        _this.timer = 0;
	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            showClock: false // 时间控件开关
	        };
	        return _this;
	    }

	    _createClass(ChildLockSurface, [{
	        key: 'startTimer',
	        value: function startTimer(e) {
	            var _this2 = this;

	            e.preventDefault();
	            this.timer = setTimeout(function () {
	                if (typeof _this2.props.cb === 'function') {
	                    _this2.props.cb();
	                }
	            }, 3000);
	        }
	    }, {
	        key: 'endTimer',
	        value: function endTimer() {
	            clearTimeout(this.timer);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var headerTop = this.state.headerTop;

	            return React.createElement(
	                'div',
	                { className: 'childlock', style: { display: this.props.show ? 'block' : 'none' } },
	                React.createElement(
	                    'div',
	                    { className: 'flex surface' },
	                    React.createElement('div', { className: 'aux' }),
	                    React.createElement(
	                        'ul',
	                        { className: 'flex-cell lock', onTouchStart: this.startTimer.bind(this), onTouchEnd: this.endTimer.bind(this) },
	                        React.createElement(
	                            'li',
	                            { className: 'child-lock-ico' + ' ' + (headerTop == 73 ? 'child-lock-icos' : 'child-lock-icoser') },
	                            React.createElement('img', { src: '../static/img/childlock-on@3x.png' })
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: 's' },
	                            '\u957F\u6309\u6309\u94AE\u4E09\u79D2\u4EE5\u4E0A\u53EF\u4EE5\u89E3\u9501'
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: 'b' },
	                            '3S'
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'mask' })
	            );
	        }
	    }]);

	    return ChildLockSurface;
	}(React.Component);

	;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 时间选择组件
	 * @prop {boolean} show  时间选择组件是否显示(默认为false)
	 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
	 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
	 * @prop {string} title  时间组件的标题(默认为设置时间)
	 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
	 * @prop {number} hourstep  小时的间隔(默认为1)
	 * @prop {number} minutestep 分钟的间隔(默认为1)
	 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {array} minutearr 可选的分钟数组(默认无,通过最大最小分钟及分钟间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {boolean} arrayInit 是否需要更新数组
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var TimeSelect = exports.TimeSelect = React.createClass({
		displayName: 'TimeSelect',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 0,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
			if (this.props.show == true) {
				this.setState({
					showOpacity: 1,
					timeDisplay: true
				});
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarray && next.hourarray instanceof Array) {
				hourarr = next.hourarray;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : '' + value;
					hourarr.push(value);
				}
				maxhour = maxhour < 10 ? '0' + maxhour : maxhour;
				if (hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			}
			//设置默认小时
			if (next.defaulthour) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 59;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (next.minutearr && next.minutearr instanceof Array) {
				minutearr = next.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : '' + _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			}
			//设置默认分钟
			if (next.defaultminute) {
				var mindex = minutearr.indexOf(next.defaultminute);
				if (mindex != -1) {
					this.setState({
						minutetime: next.defaultminute,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.arrayInit === true) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 0.1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 0.1;
						// console.log('1',showOpacity,parseInt(showOpacity));
						if (showOpacity <= 0) {
							clearInterval(this.timr);
							this.setState({ timeDisplay: false });
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 30);
				}
			}
		},
		startrange: function startrange(e) {
			//开始滑动时间刻度 记录初始坐标值
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			this.setState({
				oldy: yvalue
			});
		},
		moverange: function moverange(e) {
			//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			var oldy = parseInt(this.state.oldy);
			var value = (yvalue - oldy) / 1.72;
			if (value > 20) value = 20;
			if (value < -20) value = -20;
			var type = e.target.getAttribute('data-type');
			if (type == 'hour') {
				this.setState({
					newy: yvalue,
					hourtop: value
				});
			}
			if (type == 'minute') {
				this.setState({
					newy: yvalue,
					minutetop: value
				});
			}
		},
		endrange: function endrange(e) {
			//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
			e.stopPropagation();
			e.preventDefault();
			var newy = parseInt(this.state.newy); //滑动结束时的y值
			var oldy = parseInt(this.state.oldy); //滑动开始时的y值
			var hour = parseInt(this.state.hourtime); //上一次选中的小时值
			var hourarr = this.state.hourarr; //小时可选值数组
			var hourindex = parseInt(this.state.hourindex); //上次选中的小时值对应数组中索引
			var minutearr = this.state.minutearr; //分钟可选值数组
			var minuteindex = parseInt(this.state.minuteindex); //上次选中的分钟值对应数组索引
			var minute = parseInt(this.state.minutetime); //上次选中的分钟值
			var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
			var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
			var maxhour = parseInt(this.props.maxhour) || 23; //设置的最大小时值
			var minhour = parseInt(this.props.minhour) || 0; //设置的最小小时值
			var type = e.target.getAttribute('data-type'); //滑动更改的类型
			//小时减小
			if (newy - oldy > 20 && type == 'hour') {
				var rangestep = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				hourindex = hourindex - rangestep;
				hourindex = hourindex < 0 ? 0 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//小时增加
			if (newy - oldy < -20 && type == 'hour') {
				var _rangestep = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				hourindex = hourindex + _rangestep;
				hourindex = hourindex >= hourarr.length ? hourarr.length - 1 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//分钟减小
			if (newy - oldy > 20 && type == 'minute') {
				var _rangestep2 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				minuteindex = minuteindex - _rangestep2;
				minuteindex = minuteindex < 0 ? 0 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//分钟增加
			if (newy - oldy < -20 && type == 'minute') {
				var _rangestep3 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				minuteindex = minuteindex + _rangestep3;
				minuteindex = minuteindex >= minutearr.length ? minutearr.length - 1 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//重置为未拖动状态
			this.setState({
				hourtop: 0,
				minutetop: 0
			});
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			if (typeof this.props.cancelClock === 'function') {
				this.props.cancelClock();
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			if (typeof this.props.submitClock === 'function') {
				this.props.submitClock(this.state.hourtime, this.state.minutetime);
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusname = this.props.statusname || '关闭';
			var hour = this.state.hourtime || '0';
			hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
			hour = hour < minhour ? minhour : hour;
			var minute = this.state.minutetime || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			return React.createElement(
				'section',
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '50%' : '100%', display: hourshow ? 'inline-block' : 'none' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'hour' }),
						React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '50%' : '100%', left: hourshow ? '50%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement(
							'section',
							{ className: 'timetext' },
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
							React.createElement(
								'span',
								{ className: hourindex - 3 < 0 ? 'line4' : 'line1' },
								hourindex - 3 < 0 ? '' : hourarr[hourindex - 3]
							),
							React.createElement(
								'span',
								{ className: hourindex - 2 < 0 ? 'line4' : 'line1' },
								hourindex - 2 < 0 ? '' : hourarr[hourindex - 2]
							),
							React.createElement(
								'span',
								{ className: hourindex - 1 < 0 ? 'line4' : 'line2' },
								hourindex - 1 < 0 ? '' : hourarr[hourindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								hourarr[hourindex]
							),
							React.createElement(
								'span',
								{ className: hourindex + 1 >= hourarr.length ? 'line4' : 'line2' },
								hourindex + 1 >= hourarr.length ? '' : hourarr[hourindex + 1]
							),
							React.createElement(
								'span',
								{ className: hourindex + 2 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 2 >= hourarr.length ? '' : hourarr[hourindex + 2]
							),
							React.createElement(
								'span',
								{ className: hourindex + 3 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
							)
						),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
							React.createElement(
								'span',
								{ className: minuteindex - 3 < 0 ? 'line4' : 'line1' },
								minuteindex - 3 < 0 ? '' : minutearr[minuteindex - 3]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 2 < 0 ? 'line4' : 'line1' },
								minuteindex - 2 < 0 ? '' : minutearr[minuteindex - 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 1 < 0 ? 'line4' : 'line2' },
								minuteindex - 1 < 0 ? '' : minutearr[minuteindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								minutearr[minuteindex]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 1 >= minutearr.length ? 'line4' : 'line2' },
								minuteindex + 1 >= minutearr.length ? '' : minutearr[minuteindex + 1]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 2 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 2 >= minutearr.length ? '' : minutearr[minuteindex + 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
							)
						)
					),
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.cancelclock },
							'\u53D6\u6D88'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.submitclock },
							'\u786E\u5B9A'
						)
					)
				)
			);
		}
	});

/***/ }
/******/ ]);