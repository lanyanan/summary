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

	var _washerConstData = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 16/11/24.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	var appData = {};


	het.domReady(function () {
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数据
	        filter: {}
	    });
	});
	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});

	var lastTouchModeIndex = 0;

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _Store.Store.listen(function (data) {
	            if (!_this.isMounted(_this)) return;
	            _this.setState(data);
	        }); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'isMounted',
	        value: function isMounted(component) {
	            try {
	                ReactDOM.findDOMNode(component);
	                return true;
	            } catch (e) {
	                return false;
	            }
	        }
	    }, {
	        key: 'childLockAction',
	        value: function childLockAction() {
	            var childLockData = !this.state.washerChildLock;
	            _Actions.Actions.childLockAction(childLockData);
	        }
	    }, {
	        key: 'washMode1Action',
	        value: function washMode1Action() {
	            console.log("biaozhun biaozhun ");
	            _Actions.Actions.biaozhunModeAction();
	        }
	    }, {
	        key: 'washMode2Action',
	        value: function washMode2Action() {
	            _Actions.Actions.kuaisuModeAction();
	        }
	    }, {
	        key: 'closeAction',
	        value: function closeAction() {

	            var switchData = !this.state.washerSwitchLock;
	            _Actions.Actions.switchAction(switchData);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var modeIndex = this.state.get_selectModeValue || 0;
	            var childLockValue = this.state.washerChildLock || false; // true 童锁打开
	            var switchLockValue = this.state.washerSwitchLock || false; // true 开机
	            var washerIsStop = this.state.washerIsStop != undefined ? this.state.washerIsStop : true;
	            var selectedColor = "selected";
	            var unSelectedColor = "unselected";
	            var switchColor = unSelectedColor;
	            var whitefontColor = childLockValue ? selectedColor : unSelectedColor;
	            var biaozhunColor = modeIndex == 0 && !washerIsStop ? selectedColor : unSelectedColor;
	            var kuaisuColor = modeIndex == 1 && !washerIsStop ? selectedColor : unSelectedColor;

	            var modeName = _washerConstData.washerModeS[modeIndex].name;

	            if (childLockValue) {
	                modeName = "童锁";
	                switchColor = selectedColor;
	                whitefontColor = unSelectedColor;
	                biaozhunColor = selectedColor;
	                kuaisuColor = selectedColor;
	            }

	            var switchMode = "关机";
	            var switchTitle = "开机";
	            if (switchLockValue) {
	                switchMode = "开机";
	                switchTitle = "关机";
	                if (washerIsStop) {
	                    modeName = "待机中";
	                }

	                if (childLockValue) {
	                    modeName = "童锁";
	                }
	            } else {
	                // 关机
	                modeName = "--";
	            }

	            if (!switchLockValue) {
	                switchColor = unSelectedColor;
	                whitefontColor = selectedColor;
	                biaozhunColor = selectedColor;
	                kuaisuColor = selectedColor;
	            }

	            var workModeIndex = this.state.WorkStep || 0; // 工作状态  预约步骤
	            if (workModeIndex == 1) {
	                biaozhunColor = selectedColor;
	                kuaisuColor = selectedColor;
	            }

	            var statusBar = switchMode + ' 模式:' + modeName;
	            if (this.state.online == '2') {
	                statusBar = '设备已离线';
	                whitefontColor = selectedColor;
	                switchColor = selectedColor;
	                biaozhunColor = selectedColor;
	                kuaisuColor = selectedColor;
	            }
	            if (this.state.networkavailable == '2') statusBar = '当前网络不可用';
	            console.log("render mode1: " + modeIndex + " " + statusBar + ' ' + appData.online);

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    statusBar
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btn-list' },
	                    React.createElement(
	                        'dl',
	                        { className: "flex-cell", key: '0', 'data-index': '0', onTouchStart: this.closeAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            { className: switchColor },
	                            React.createElement('img', { src: '../static/image/main/pic_main_0.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: switchColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                switchTitle
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: "flex-cell", key: '1', 'data-index': '1', onTouchStart: this.childLockAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            { className: whitefontColor },
	                            React.createElement('img', { src: '../static/image/main/pic_main_1.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: whitefontColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u7AE5\u9501'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: "flex-cell", key: '2', 'data-index': '2', onTouchStart: this.washMode1Action.bind(this) },
	                        React.createElement(
	                            'dd',
	                            { className: biaozhunColor },
	                            ' ',
	                            React.createElement('img', { src: '../static/image/main/pic_main_2.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: biaozhunColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6807\u51C6'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'flex-cell', key: '3', 'data-index': '3', onTouchStart: this.washMode2Action.bind(this) },
	                        React.createElement(
	                            'dd',
	                            { className: kuaisuColor },
	                            React.createElement('img', { src: '../static/image/main/pic_main_4.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: kuaisuColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5FEB\u901F'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	het.domReady(function () {
	    het.setTitle('C-Life 快捷方式');
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));
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
	'changeToWorkingPage', 'appMainViewUpdateState', 'startAction', 'stopAction', 'switchAction', 'childLockAction', 'kuaisuModeAction', 'biaozhunModeAction', 'setFirstInputSetingPage']);

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

	var _washerConstData = __webpack_require__(6);

	var _DeviceTokenCache = __webpack_require__(7);

	var appData = {
	    isFirstInputThisPage: true,
	    isWorking: false,
	    count: 1,
	    online: 2,
	    onLinestatue: false,
	    networkavailable: '1',
	    get_selectModeValue: 0, //modex  index
	    get_orderTimeValue: 0,
	    get_waterLevelValue: '6档',
	    get_processValue: '洗涤+漂洗+脱水',
	    get_specialValue: '无',
	    washerIsStop: true, // 洗衣机是否暂定
	    washerChildLock: false, // 童锁关闭  true 童锁打开
	    washerSwitchLock: false, // true 开机
	    WorkStep: 8

	};

	// ModeKey: mode,                      CodeMode
	//     OrderKey: orderIndex + 1,       OrderMode
	//     WaterLevelKey:waterLevel + 1,   MaxWaterLevel
	//     ProcessKey:processKey + 1,      ProcessMode
	//     FuntionKey:specialKey + 1,      FuntionMode
	//     StartStopKey: parseInt("1",10),  MachineRunStatus
	//     updateFlag: updateFlagSpecial,

	var dataFilterTimers = {
	    CodeMode: 0,
	    ChildLock: 0,
	    MachineRunStatus: 0,
	    WorkMode: 0,
	    OrderMode: 0,
	    ProcessMode: 0,
	    FuntionMode: 0,
	    MaxWaterLevel: 0,

	    CurWashModeSurplusTim: 0,
	    CurOrderSurplusTime: 0,
	    CurSoakSurplusTime: 0,
	    CurWashSurplusTime: 0,
	    CurRinseSurplusTime: 0,
	    CurDehydrationSurplusTime: 0,

	    WorkStep: 0

	};
	function dataFilter(data) {
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	            } else {
	                console.log("yy filter: " + k);
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    return result;
	}
	// 设置过滤器过期时间
	function setDataTimer() {
	    var time = new Date().getTime() + 10e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	// 运行
	//   工作模式  0x00关机模式 0x03为洗衣模式       WorkMode = 0;
	//   工作阶段  0 -8 0=参数设置阶段 1=预约 2=称重 3=浸泡 4=洗涤  WorkStep
	//                 05=漂洗  6=脱水  7=风干  8=洗涤结束阶段

	//   机器运行状态   0x00为暂停状态 0x01为运行状态    MachineRunStatus
	//   童锁状态       0x00 为无童锁 0x01 为有童锁   ChildLock
	// OrderMode      预约模式否属性值定义删除
	// ProcessMode    过程模式否属性值定义删除
	// FuntionMode    特殊功能模式否属性值定义删除
	// MaxWaterLevel

	//   当前洗衣总时间   十六进制数据，单位分钟        CurWashModeTotalTime
	///  当前洗衣剩余时间                           CurWashModeSurplusTim
	//   当前程序预约总时间                         CurOrderTotalTime
	//   当前程序预约剩余时间                       CurOrderSurplusTime
	//   前洗衣浸泡总时间                          CurSoakTotalTime
	//   当前洗衣浸泡剩余时间                       CurSoakSurplusTime
	//   当前洗衣洗涤总时间                         CurWashTotalTime
	//   当前洗衣洗涤剩余时间                       CurWashSurplusTime
	//   当前洗衣漂洗总时间                        CurRinseTotalTime
	//   当前洗衣漂洗剩余时间                      CurRinseSurplusTime
	//   当前洗衣漂洗次数                        CurRinseTimes
	//   当前洗衣脱水总时间                       CurDehydrationTotalTime
	//   当前洗衣脱水剩余时间                    CurDehydrationSurplusTime
	//   当前洗衣风干总时间                       CurAirDryTotalTime
	//   当前洗衣风干剩余时间                      CurAirDrySurplusTime
	//    留水状态 0x00,非留水状态 0x01,留水状态     LeaveWaterStatus


	//控制
	// FuntionKey = 1;
	// LockOnOffKey = 2;
	// ModeKey = 1;
	// OrderKey = 1;
	// PowerOnOffKey = 1;
	// ProcessKey = 1;
	// StartStopKey = 2;  {1, 2}对应工作模式={启动，暂停}
	// WaterLevelKey = 6;

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {

	        var data = dataFilter(datas);

	        //运行数据
	        if (data.CodeMode != undefined) {
	            appData.CodeMode = data.CodeMode;appData.get_selectModeValue = parseInt(appData.CodeMode) - 1;
	        } // 工作模式  程序 标准,快速,强力,羊毛,化纤,牛仔,棉麻,仿生,童衣,内衣
	        if (data.WorkMode != undefined) {
	            appData.WorkMode = data.WorkMode;appData.washerSwitchLock = appData.WorkMode == 3;
	        }
	        if (data.WorkStep != undefined) {
	            appData.WorkStep = data.WorkStep;
	        }
	        if (data.MachineRunStatus != undefined) {
	            appData.MachineRunStatus = data.MachineRunStatus;appData.washerIsStop = appData.MachineRunStatus == 0;
	        }
	        if (data.ChildLock != undefined) {
	            appData.ChildLock = data.ChildLock;appData.washerChildLock = appData.ChildLock == 1;
	        }

	        if (data.OrderMode != undefined) {
	            appData.OrderMode = data.OrderMode;
	            var index = parseInt(appData.OrderMode) > 0 ? parseInt(appData.OrderMode) - 1 : 0;
	            appData.get_orderTimeValue = _washerConstData.orderDataArray[index];
	        }
	        if (data.ProcessMode != undefined) {
	            appData.ProcessMode = data.ProcessMode;
	            var _index = parseInt(appData.ProcessMode) > 0 ? parseInt(appData.ProcessMode) - 1 : 0;
	            appData.get_processValue = _washerConstData.processDataArray[_index];
	        }
	        if (data.FuntionMode != undefined) {
	            appData.FuntionMode = data.FuntionMode;
	            var _index2 = parseInt(appData.FuntionMode) > 0 ? parseInt(appData.FuntionMode) - 1 : 0;
	            appData.get_specialValue = _washerConstData.specialDataArray[_index2];
	            if (appData.get_specialValue == '洁桶') {
	                appData.CurWashSurplusTime = '8';
	                appData.get_processValue = '洗涤+脱水';
	            }
	        }
	        if (data.MaxWaterLevel != undefined) {
	            appData.MaxWaterLevel = data.MaxWaterLevel;
	            var _index3 = parseInt(appData.MaxWaterLevel) > 0 ? parseInt(appData.MaxWaterLevel) - 1 : 0;
	            appData.get_waterLevelValue = _washerConstData.waterLevelDataArray[_index3];
	        }

	        //洗衣总时间
	        if (data.CurWashModeTotalTime != undefined) {
	            appData.CurWashModeTotalTime = data.CurWashModeTotalTime;
	        }
	        if (data.CurWashModeSurplusTim != undefined) {
	            appData.CurWashModeSurplusTim = data.CurWashModeSurplusTim;
	        }
	        // 预约时间
	        if (data.CurOrderTotalTime != undefined) {
	            appData.CurOrderTotalTime = data.CurOrderTotalTime;
	        }
	        if (data.CurOrderSurplusTime != undefined) {
	            appData.CurOrderSurplusTime = data.CurOrderSurplusTime;
	        }
	        // 浸泡时间
	        if (data.CurSoakTotalTime != undefined) {
	            appData.CurSoakTotalTime = data.CurSoakTotalTime;
	        }
	        if (data.CurSoakSurplusTime != undefined) {
	            appData.CurSoakSurplusTime = data.CurSoakSurplusTime;
	        }
	        // 洗涤时间
	        if (data.CurWashTotalTime != undefined) {
	            appData.CurWashTotalTime = data.CurWashTotalTime;
	        }
	        if (data.CurWashSurplusTime != undefined) {
	            appData.CurWashSurplusTime = data.CurWashSurplusTime;
	        }
	        //漂洗 时间
	        if (data.CurRinseTotalTime != undefined) {
	            appData.CurRinseTotalTime = data.CurRinseTotalTime;
	        }
	        if (data.CurRinseSurplusTime != undefined) {
	            appData.CurRinseSurplusTime = data.CurRinseSurplusTime;
	        }
	        if (data.CurRinseTimes != undefined) {
	            appData.CurRinseTimes = data.CurRinseTimes;
	        }
	        //脱水时间
	        if (data.CurDehydrationTotalTime != undefined) {
	            appData.CurDehydrationTotalTime = data.CurDehydrationTotalTime;
	        }
	        if (data.CurDehydrationSurplusTime != undefined) {
	            appData.CurDehydrationSurplusTime = data.CurDehydrationSurplusTime;
	        }
	        // 风干时间
	        if (data.CurAirDryTotalTime != undefined) {
	            appData.CurAirDryTotalTime = data.CurAirDryTotalTime;
	        }
	        if (data.CurAirDrySurplusTime != undefined) {
	            appData.CurAirDrySurplusTime = data.CurAirDrySurplusTime;
	        }
	        // 留水
	        if (data.LeaveWaterStatus != undefined) {
	            appData.LeaveWaterStatus = data.LeaveWaterStatus;
	        }

	        // 控制数据
	        if (data.FuntionKey != undefined) {
	            appData.FuntionKey = data.FuntionKey;
	        } //功能
	        if (data.LockOnOffKey != undefined) {
	            appData.LockOnOffKey = data.LockOnOffKey;appData.washerChildLock = appData.LockOnOffKey == 1;
	        } //开/关童锁
	        if (data.ModeKey != undefined) {
	            appData.ModeKey = data.ModeKey;appData.get_selectModeValue = appData.ModeKey - 1;
	        } // 程序 标准,快速,强力,羊毛,化纤,牛仔,棉麻,仿生,童衣,内衣
	        if (data.OrderKey != undefined) {
	            appData.OrderKey = data.OrderKey;
	        } //预约
	        if (data.ProcessKey != undefined) {
	            appData.ProcessKey = data.ProcessKey;
	        } // 过程 洗涤+漂洗+脱水,浸泡+洗涤+漂洗+脱水,洗涤,洗涤+漂洗,漂洗+脱水,脱水
	        if (data.StartStopKey != undefined) {
	            appData.StartStopKey = data.StartStopKey;appData.washerIsStop = appData.StartStopKey == 2;
	        } //启动/暂停
	        if (data.WaterLevelKey != undefined) {
	            appData.WaterLevelKey = data.WaterLevelKey;
	        } //水位
	        if (data.PowerOnOffKey != undefined) {
	            appData.PowerOnOffKey = data.PowerOnOffKey;
	            console.log("yy receive switch: " + appData.PowerOnOffKey);
	            appData.washerSwitchLock = appData.PowerOnOffKey == 1;
	        } //开关机


	        //离线&故障
	        if (data.online) appData.online = data.online;
	        if (data.networkavailable) appData.networkavailable = data.networkavailable;
	        if (data.online == 2) {
	            appData.onLinestatue = false;
	        } else {
	            appData.onLinestatue = true;
	        }

	        if (data.appId != undefined) appData.appId = data.appId;
	        if (data.deviceId != undefined) appData.deviceId = data.deviceId;
	        if (data.accessToken != undefined) appData.accessToken = data.accessToken;
	        if (data.deviceId != undefined && data.accessToken != undefined && !(0, _DeviceTokenCache.hasSetRequest)()) {
	            (0, _DeviceTokenCache.setDeviceInfo)(data.accessToken, data.deviceId);
	        }

	        // 故障数据
	        if (data.Error1 != undefined) {
	            appData.Error1 = data.Error1;
	        }
	        if (data.Error2 != undefined) {
	            appData.Error2 = data.Error2;
	        }
	        if (data.Error3 != undefined) {
	            appData.Error3 = data.Error3;
	        }
	        if (data.Error4 != undefined) {
	            appData.Error4 = data.Error4;
	        }
	        if (data.Error5 != undefined) {
	            appData.Error5 = data.Error5;
	        }
	        if (data.Error6 != undefined) {
	            appData.Error6 = data.Error6;
	        }
	        if (data.Error7 != undefined) {
	            appData.Error7 = data.Error7;
	        }
	        if (data.Error8 != undefined) {
	            appData.Error8 = data.Error8;
	        }
	        if (data.Error9 != undefined) {
	            appData.Error9 = data.Error9;
	        }
	        if (data.Error10 != undefined) {
	            appData.Error10 = data.Error10;
	        }
	        if (data.Error11 != undefined) {
	            appData.Error11 = data.Error11;
	        }
	        if (data.Error12 != undefined) {
	            appData.Error12 = data.Error12;
	        }
	        if (data.Error13 != undefined) {
	            appData.Error13 = data.Error13;
	        }
	        if (data.Error14 != undefined) {
	            appData.Error14 = data.Error14;
	        }
	        if (data.Error15 != undefined) {
	            appData.Error15 = data.Error15;
	        }
	        if (data.Error16 != undefined) {
	            appData.Error16 = data.Error16;
	        }
	        if (data.Error17 != undefined) {
	            appData.Error17 = data.Error17;
	        }

	        // 工作状态
	        if (!appData.washerIsStop && appData.washerSwitchLock && appData.onLinestatue) {
	            console.log("yy set isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);
	            appData.isWorking = true;
	        }
	        // 预约状态
	        else if (appData.washerIsStop && appData.washerSwitchLock && appData.onLinestatue && appData.WorkStep > 0 && appData.WorkStep < 8) {
	                console.log("yy set yuyue isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);
	                appData.isWorking = true;
	            } else {
	                console.log("yy set clear isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);

	                appData.isWorking = false;
	            }

	        this.trigger(appData);
	    },
	    onChangeToWorkingPage: function onChangeToWorkingPage(value) {
	        appData.isWorking = value;
	        console.log("stroe is work: " + appData.isWorking);
	        var count = appData.count;

	        count += 1;
	        appData.count = count;
	        this.trigger(appData);
	    },
	    onAppMainViewUpdateState: function onAppMainViewUpdateState() {
	        this.trigger(appData);
	    },
	    onStartAction: function onStartAction(data) {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        if (!orderCheck()) {
	            return;
	        }

	        startWasher(data.set_selectModeValue, data.set_orderTimeValue, data.set_waterLevelValue, data.set_processValue, data.set_specialValue);
	    },
	    onStopAction: function onStopAction(data) {
	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        appData.washerIsStop = data;

	        var updateFlag = het.hexUpFlag(11, 1, 4);
	        var switchData = {};
	        if (appData.washerIsStop) {
	            switchData = {
	                StartStopKey: parseInt("2", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            switchData = {
	                StartStopKey: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });

	        console.log("控制命令 设置暂停: " + appData.washerIsStop);
	        setDataTimer("MachineRunStatus");
	        this.trigger(appData);
	    },
	    onSwitchAction: function onSwitchAction(data) {

	        if (!NetWokrCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        // Actions.changeToWorkingPage(false);
	        appData.isWorking = false;
	        appData.washerSwitchLock = data;

	        var updateFlag = het.hexUpFlag(4, 1, 4);
	        var switchData = {};
	        if (appData.washerSwitchLock) {
	            switchData = {
	                PowerOnOffKey: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            appData.MachineRunStatus = 0;
	            appData.washerIsStop = true;
	            appData.WorkStep = 0;
	            var updateFlagStop = het.hexUpFlag(11, 1, 4, updateFlag);
	            switchData = {
	                StartStopKey: parseInt("2", 10),
	                PowerOnOffKey: parseInt("2", 10),
	                updateFlag: updateFlagStop
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });

	        setDataTimer("WorkMode", "MachineRunStatus", 'WorkStep');
	        console.log("控制命令 ");
	        this.trigger(appData);
	    },
	    onChildLockAction: function onChildLockAction(data) {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        appData.washerChildLock = data;

	        var updateFlag = het.hexUpFlag(5, 1, 4);
	        var switchData = {};
	        if (appData.washerChildLock) {
	            switchData = {
	                LockOnOffKey: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            switchData = {
	                LockOnOffKey: parseInt("2", 10),
	                updateFlag: updateFlag
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log("控制命令 ");
	        setDataTimer("ChildLock");
	        this.trigger(appData);
	    },
	    onSetFirstInputSetingPage: function onSetFirstInputSetingPage(data) {
	        appData.isFirstInputThisPage = data;
	        this.trigger(appData);
	    },
	    onKuaisuModeAction: function onKuaisuModeAction() {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        if (!orderCheck()) {
	            return;
	        }

	        var modeIndex = appData.get_selectModeValue || 0;
	        var onWashing = appData.washerIsStop != undefined ? appData.washerIsStop : true;
	        if (!onWashing) {
	            if (modeIndex != 1) {
	                het.toast("正在洗衣，请暂停后切换模式");
	            }
	            return;
	        }

	        startWasher("1", "0", "6档", "洗涤+漂洗+脱水", "无");
	    },
	    onBiaozhunModeAction: function onBiaozhunModeAction() {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }
	        if (!childLockCheck()) {
	            return;
	        }
	        if (!orderCheck()) {
	            return;
	        }

	        var modeIndex = appData.get_selectModeValue || 0;
	        var onWashing = appData.washerIsStop != undefined ? appData.washerIsStop : true;
	        if (!onWashing) {
	            console.log("正在洗衣服");
	            if (modeIndex != 0) {
	                het.toast("正在洗衣，请暂停后切换模式");
	            }
	            return;
	        }
	        startWasher("0", "0", "6档", "洗涤+漂洗+脱水", "无");
	    }
	});

	function startWasher(selectMode, orderTimerValue, waterLevelValue, processValue, specialValue) {
	    appData.get_selectModeValue = parseInt(selectMode);
	    appData.get_orderTimeValue = orderTimerValue;
	    appData.get_waterLevelValue = waterLevelValue;
	    appData.get_processValue = processValue;
	    appData.get_specialValue = specialValue;
	    appData.washerIsStop = false;
	    appData.isWorking = true;

	    var currentModeConfigData = _washerConstData.washerModeS[appData.get_selectModeValue];

	    // 设置模式后，强制设置一次时间，方便显示
	    //洗衣总时间
	    appData.CurWashModeSurplusTim = currentModeConfigData.totalTime;
	    // 预约时间
	    appData.CurOrderSurplusTime = parseInt(appData.get_orderTimeValue) * 60;
	    // 浸泡时间
	    appData.CurSoakSurplusTime = currentModeConfigData.SoakTotalTime;
	    // 洗涤时间
	    appData.CurWashSurplusTime = currentModeConfigData.WashTotalTime;
	    //漂洗 时间
	    appData.CurRinseSurplusTime = currentModeConfigData.RinseTotalTime;
	    //脱水时间
	    appData.CurDehydrationSurplusTime = currentModeConfigData.DehydrationTotalTime;

	    if (specialValue == '洁桶') {
	        appData.CurWashSurplusTime = '8';
	        appData.get_processValue = '洗涤+脱水';
	    }

	    // 模式发送
	    var updateFlag = het.hexUpFlag(11, 1, 4);
	    var updateFlagMode = het.hexUpFlag(6, 1, 4, updateFlag);
	    var updateFlagOrder = het.hexUpFlag(7, 1, 4, updateFlagMode);
	    var updateFlagWater = het.hexUpFlag(8, 1, 4, updateFlagOrder);
	    var updateFlagProcess = het.hexUpFlag(9, 1, 4, updateFlagWater);
	    var updateFlagSpecial = het.hexUpFlag(10, 1, 4, updateFlagProcess);

	    var mode = appData.get_selectModeValue + 1;
	    var orderIndex = _washerConstData.orderDataArray.indexOf(appData.get_orderTimeValue) || 0;
	    var waterLevel = _washerConstData.waterLevelDataArray.indexOf(appData.get_waterLevelValue) || 0;
	    var processKey = _washerConstData.processDataArray.indexOf(appData.get_processValue) || 0;
	    var specialKey = _washerConstData.specialDataArray.indexOf(appData.get_specialValue) || 0;

	    var switchData = {
	        ModeKey: mode,
	        OrderKey: orderIndex + 1,
	        WaterLevelKey: waterLevel + 1,
	        ProcessKey: processKey + 1,
	        FuntionKey: specialKey + 1,
	        updateFlag: updateFlagSpecial,
	        StartStopKey: parseInt("1", 10)
	    };

	    // if( appData.get_orderTimeValue == 0){
	    //    // switchData["StartStopKey"] = parseInt("1",10);
	    // }else{
	    //   //  switchData["StartStopKey"] = parseInt("2",10);
	    //     appData.WorkStep = 1;
	    //     appData.OrderMode =  orderIndex + 1;
	    // }

	    var workModeArray = ["参数设置阶段", "预约", "称重", "浸泡", "洗涤", "漂洗", "脱水", "风干", "洗涤结束"];
	    var processData = appData.get_processValue || '洗涤+漂洗+脱水';
	    var processArray = processData.split("+");
	    if (appData.get_orderTimeValue != 0) {
	        processArray.splice(0, 0, "预约");
	    }
	    var firstStep = processArray[0] || "";
	    var firstStepIndex = workModeArray.indexOf(firstStep);
	    appData.WorkStep = firstStepIndex;

	    het.send(switchData, function (data) {}, function (data) {
	        het.toast("发送失败");
	    });

	    console.log("控制命令 预设第一个模式：" + firstStepIndex);

	    //强制设置模式后，不在获取模式，工作步骤等，先强制设置，如果成功了，就取这个结果
	    setDataTimer("CodeMode", "OrderMode", "ProcessMode", "FuntionMode", "MaxWaterLevel", "MachineRunStatus", "WorkStep");

	    setDataTimer("CurWashModeSurplusTim", "CurOrderSurplusTime", "CurSoakSurplusTime", "CurWashSurplusTime", "CurRinseSurplusTime", "CurDehydrationSurplusTime");

	    console.log("启动模式：" + _washerConstData.washerModeS[appData.get_selectModeValue].name + " " + appData.get_orderTimeValue + " " + appData.get_waterLevelValue + " " + appData.get_processValue + " " + appData.get_specialValue);
	    this.trigger(appData);
	}

	function orderCheck() {
	    var workStep = appData.WorkStep || 0;
	    if (workStep == 1) {
	        het.toast("预约中");
	        return false;
	    }
	    return true;
	}

	function childLockCheck() {
	    var childlOCKData = appData.washerChildLock;
	    if (childlOCKData) {
	        het.toast("童锁已打开");
	        return false;
	    }
	    return true;
	}

	function switchAndNetWorkCheck() {

	    if (!NetWokrCheck()) {
	        return false;
	    }

	    var switchStatua = appData.washerSwitchLock;
	    if (!switchStatua) {
	        het.toast("请开机");
	        return false;
	    }

	    return true;
	}

	function NetWokrCheck() {
	    var netWorkStatus = appData.networkavailable == 2;
	    if (netWorkStatus) {
	        het.toast("当前网络不可用");
	        return false;
	    }

	    var onLineStatus = appData.online == 2;
	    if (onLineStatus) {
	        het.toast("设备已离线");
	        return false;
	    }
	    return true;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by yuanyunlong on 2017/1/10.
	 */

	var orderDataArray = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	var waterLevelDataArray = ['1档', '2档', '3档', '4档', '5档', '6档', '7档', '8档', '9档', '10档'];
	var processDataArray = ['洗涤+漂洗+脱水', '浸泡+洗涤+漂洗+脱水', '洗涤', '洗涤+漂洗', '漂洗+脱水', '脱水'];
	var specialDataArray = ['无', '留水', '夜间', '洁桶', '风干90分钟'];

	// totalTime 【洗衣总时间】 SoakTotalTime【浸泡总时间】 WashTotalTime【洗涤总时间】  RinseTotalTime【漂洗总时间】  DehydrationTotalTime【脱水总时间】
	var washerModeS = [{ id: 0, name: '标准', totalTime: 43, SoakTotalTime: 12, WashTotalTime: 12, RinseTotalTime: 24, DehydrationTotalTime: 5 }, { id: 1, name: '快速', totalTime: 26, SoakTotalTime: 12, WashTotalTime: 9, RinseTotalTime: 9, DehydrationTotalTime: 3 }, { id: 2, name: '强力', totalTime: 48, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 30, DehydrationTotalTime: 7 }, { id: 3, name: '羊毛', totalTime: 31, SoakTotalTime: 12, WashTotalTime: 9, RinseTotalTime: 18, DehydrationTotalTime: 2 }, { id: 4, name: '化纤', totalTime: 43, SoakTotalTime: 12, WashTotalTime: 12, RinseTotalTime: 24, DehydrationTotalTime: 5 }, { id: 5, name: '牛仔', totalTime: 59, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 45, DehydrationTotalTime: 7 }, { id: 6, name: '棉麻', totalTime: 48, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 30, DehydrationTotalTime: 7 }, { id: 7, name: '仿生', totalTime: 43, SoakTotalTime: 12, WashTotalTime: 12, RinseTotalTime: 24, DehydrationTotalTime: 5 }, { id: 8, name: '童衣', totalTime: 59, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 45, DehydrationTotalTime: 7 }, { id: 9, name: '内衣', totalTime: 26, SoakTotalTime: 12, WashTotalTime: 9, RinseTotalTime: 9, DehydrationTotalTime: 3 }];
	exports.orderDataArray = orderDataArray;
	exports.waterLevelDataArray = waterLevelDataArray;
	exports.processDataArray = processDataArray;
	exports.specialDataArray = specialDataArray;
	exports.washerModeS = washerModeS;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by yuanyunlong on 2017/2/22.
	 */

	var requestInfo = {
	    userToken: '',
	    deviceId: ''
	};

	var hasSet = false;

	function setDeviceInfo(uerToken1, deviceid1) {
	    if (uerToken1 && deviceid1) {
	        requestInfo.userToken = uerToken1;
	        requestInfo.deviceId = deviceid1;

	        if (uerToken1.length > 3 && deviceid1.length > 3) {
	            hasSet = true;
	        }
	    }
	}

	function getDeviceInfo() {
	    return requestInfo;
	}

	function hasSetRequest() {
	    return hasSet;
	}

	module.exports = { setDeviceInfo: setDeviceInfo, getDeviceInfo: getDeviceInfo, hasSetRequest: hasSetRequest };

/***/ }
/******/ ]);