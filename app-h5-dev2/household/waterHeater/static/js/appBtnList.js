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
	        key: 'touchNormalAction',
	        value: function touchNormalAction(e) {
	            // var index = e.currentTarget.getAttribute("data-index");
	            // if(lastTouchModeIndex == index || lastTouchModeIndex == '4'){
	            //     return;
	            // }
	            // lastTouchModeIndex = index;
	            // Actions.modeAction(index);

	            var data = {
	                set_waterTempIndex: 35,
	                set_waterMode: 0
	            };
	            _Actions.Actions.startWataerAction(data);
	        }
	    }, {
	        key: 'touchJNAction',
	        value: function touchJNAction(e) {
	            // var index = e.currentTarget.getAttribute("data-index");
	            // if(lastTouchModeIndex == index || lastTouchModeIndex == '4'){
	            //     return;
	            // }
	            // lastTouchModeIndex = index;
	            // Actions.modeAction(index);

	            var data = {
	                set_waterTempIndex: 35,
	                set_waterMode: 1
	            };
	            _Actions.Actions.startWataerAction(data);
	        }
	    }, {
	        key: 'closeAction',
	        value: function closeAction() {
	            _Actions.Actions.setWaterHeaterPowerOn();
	        }
	    }, {
	        key: 'childLockAction',
	        value: function childLockAction() {
	            _Actions.Actions.setWaterHeaterChildOn();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var modeIndex = this.state.waterHeaterWorkMode || 0;
	            var switchLock = this.state.set_switchLockOn || false;
	            var childLock = this.state.set_childerLockOn || false;
	            var online = this.state.online != '2' && this.state.onlineStatus || false;
	            console.log("************this.state.onlineStatus :" + this.state.onlineStatus);

	            // if (switchLock!==true){
	            //     childLock = true;
	            //     modeIndex = 2;
	            // }
	            var selectedColor = "selected";
	            var unSelectedColor = "unselected";

	            var swichLockStatue = online && !childLock ? selectedColor : unSelectedColor;
	            var childLockStatue = online && switchLock ? selectedColor : unSelectedColor;
	            var warmfontColor = modeIndex != 0 && online && !childLock ? selectedColor : unSelectedColor;
	            var intefontColor = modeIndex != 1 && online && !childLock ? selectedColor : unSelectedColor;
	            var switchTitle = online && switchLock ? '待机' : '运行';

	            var modeName = "--";
	            var switchMode = "运行";
	            switch (modeIndex) {
	                case 0:
	                    {
	                        modeName = "常规";switchMode = "运行";break;
	                    }
	                case 1:
	                    {
	                        modeName = "节能";switchMode = "运行";break;
	                    }
	                case 2:
	                    {
	                        modeName = "智能";switchMode = "运行";break;
	                    }
	                case 3:
	                    {
	                        modeName = "快速";switchMode = "运行";break;
	                    }
	                case 4:
	                    {
	                        modeName = "厨房";switchMode = "运行";break;
	                    }
	                case 5:
	                    {
	                        modeName = "浴缸";switchMode = "运行";break;
	                    }
	                case 6:
	                    {
	                        modeName = "夜间";switchMode = "运行";break;
	                    }
	                case 7:
	                    {
	                        modeName = "季节";switchMode = "运行";break;
	                    }
	                default:
	                    {
	                        switchMode = "待机";modeName = "--";
	                    }
	            }
	            if (!switchLock) {
	                switchMode = "待机";modeName = "--";
	            }
	            var statusBar = switchMode + ' 模式:' + modeName;
	            if (this.state.online == '2') statusBar = '设备已离线';
	            if (this.state.networkavailable == '2') statusBar = '当前网络不可用';
	            console.log("render mode111: " + modeIndex + " " + statusBar + ' ' + appData.online);

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
	                        { className: "flex-cell " + swichLockStatue, key: '0', 'data-index': '0', onTouchStart: this.closeAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: '../static/image/main/pic_main_0.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: swichLockStatue },
	                            React.createElement(
	                                'p',
	                                null,
	                                switchTitle
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: "flex-cell " + childLockStatue, key: '1', 'data-index': '1', onTouchStart: this.childLockAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: '../static/image/main/pic_main_1.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: childLockStatue },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u7AE5\u9501'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: "flex-cell " + warmfontColor, key: '2', 'data-index': '2', onTouchStart: this.touchNormalAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: '../static/image/main/pic_main_2.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: warmfontColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5E38\u89C4'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: "flex-cell " + intefontColor, key: '3', 'data-index': '3', onTouchStart: this.touchJNAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: '../static/image/main/pic_main_3.png' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: intefontColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u8282\u80FD'
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
	'changeToWorkingPage', 'appMainViewUpdateState', 'startWataerAction', 'setWaterHeaterPowerOn', 'setWaterHeaterChildOn', 'addTempAction', 'subTempAction', 'setingPageSetModeAction', 'setingPageSetOrderTimeAction', 'setingPageSet']);

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

	var _WasherCommonData = __webpack_require__(6);

	// type : 0  控制数据
	//     "cplock" : 0,
	//     "cpnodef" : "00",
	//     "cpnodef1" : "00",
	//     "cprevs" : 0,
	//     "updateFlag" : "0000",
	//     "cponoff" : 0,
	//     "cpworkmod" : 3,
	//     "cpnodef3" : "00",
	//     "cpnodef2" : "00",
	//     "cpsettemp" : 35

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

	var dataFilterTimers = {
	    workmod: 0,
	    oplock: 0,
	    worksts: 0,
	    cplock: 0,
	    settemp: 0,
	    cpsettemp: 0
	};

	var appData = {
	    isWorking: false,
	    count: 1,
	    online: 2,
	    onlineStatus: false,
	    networkavailable: '2',
	    set_childerLockOn: false, // 童锁默认是关闭的
	    set_switchLockOn: false,
	    waterHeaterTemp: 35,
	    waterHeaterWorkMode: 0,
	    worksts: 1, // 默认为待机状态
	    isFirtInput: false
	};

	function NetWorkCheck() {

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

	function childLockCheck() {
	    if (appData.set_childerLockOn) {
	        het.toast("童锁已打开");
	        return true;
	    }
	    return false;
	}

	function powerOffCheck() {

	    if (!appData.set_switchLockOn) {
	        het.toast("设备已待机");
	        return true;
	    }
	    return false;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {

	        var data = dataFilter(datas);
	        console.log("收到数据   " + data);

	        // 运行数据
	        if (data.oplock != undefined) {
	            appData.oplock = data.oplock;appData.set_childerLockOn = parseInt(data.oplock) == '1';
	        } //童锁状态 1开启 0 关闭
	        if (data.settemp != undefined) {
	            appData.settemp = data.settemp;appData.waterHeaterTemp = appData.settemp;
	        } //设定水温
	        if (data.outtemp != undefined) {
	            appData.outtemp = data.outtemp;
	        } // 出水温度
	        if (data.intemp != undefined) {
	            appData.intemp = data.intemp;
	        } //进水温度
	        if (data.waterspd != undefined) {
	            appData.waterspd = data.waterspd;
	        } // 水流速度
	        if (data.water != undefined) {
	            appData.water = data.water;
	        } //本次用水量
	        if (data.pcbtemp != undefined) {
	            appData.pcbtemp = data.pcbtemp;
	        } //PCBA环境温度

	        if (data.powervol != undefined) {
	            appData.powervol = data.powervol;
	        } //电源电压
	        if (data.powercur != undefined) {
	            appData.powercur = data.powercur;
	        } //整机电流
	        if (data.worksts != undefined) {
	            appData.worksts = data.worksts;appData.isWorking = parseInt(appData.worksts) == 2;appData.set_switchLockOn = !(parseInt(appData.worksts) == 1);
	        } //工作状态 1待机 2运行 3故障
	        if (data.workmod != undefined) {
	            appData.workmod = data.workmod;appData.waterHeaterWorkMode = parseInt(data.workmod) - 1;
	        } //工作模式
	        if (data.showertm != undefined) {
	            appData.showertm = data.showertm;
	        } //洗浴时长  (1~8)

	        if (data.waterspd != undefined) {
	            appData.waterspd = data.waterspd;
	        } //总计耗水量  (L)
	        if (data.devicetm != undefined) {
	            appData.devicetm = data.devicetm;
	        } //总计通电时长  (H)

	        // type = 0
	        // 模式
	        if (data.cpworkmod != undefined) {
	            appData.waterHeaterWorkMode = parseInt(data.cpworkmod) - 1;
	            // 收到工作控制命令模式后，过滤掉运行数据工作模式
	            console.log("currentMode:" + appData.waterHeaterWorkMode);
	            setDataTimer("workmod");
	        }
	        // 水温
	        if (data.cpsettemp != undefined) {
	            appData.waterHeaterTemp = data.cpsettemp;
	        }
	        // 开关
	        console.log("^^^^^^^^^^^^^^^^^appData.set_switchLockOn:" + appData.set_switchLockOn + "    data.cponoff     " + data.cponoff);
	        if (data.cponoff != undefined) {
	            appData.set_switchLockOn = parseInt(data.cponoff) == '1';

	            console.log("^^^^^^^^^^^^^^^^^appData.set_switchLockOn:" + appData.set_switchLockOn);
	        }
	        // 童锁
	        if (data.cplock != undefined) {
	            appData.set_childerLockOn = parseInt(data.cplock) == '1';
	            // 收到工作控制命令模式后，过滤掉运行数据工作模式
	            setDataTimer("oplock");
	        }

	        // 故障数据
	        if (data.BK1 != undefined) {
	            appData.BK1 = data.BK1;
	        }
	        if (data.BK2 != undefined) {
	            appData.BK2 = data.BK2;
	        }
	        if (data.BK3 != undefined) {
	            appData.BK3 = data.BK3;
	        }
	        if (data.BK4 != undefined) {
	            appData.BK4 = data.BK4;
	        }
	        if (data.BK5 != undefined) {
	            appData.BK5 = data.BK5;
	        }
	        if (data.BK6 != undefined) {
	            appData.BK6 = data.BK6;
	        }
	        if (data.BK7 != undefined) {
	            appData.BK7 = data.BK7;
	        }
	        if (data.BK8 != undefined) {
	            appData.BK8 = data.BK8;
	        }
	        if (data.BK9 != undefined) {
	            appData.BK9 = data.BK9;
	        }
	        if (data.BK10 != undefined) {
	            appData.BK10 = data.BK10;
	        }
	        if (data.BK11 != undefined) {
	            appData.BK11 = data.BK11;
	        }
	        if (data.BK12 != undefined) {
	            appData.BK12 = data.BK12;
	        }
	        if (data.BK13 != undefined) {
	            appData.BK13 = data.BK13;
	        }
	        if (data.BK14 != undefined) {
	            appData.BK14 = data.BK14;
	        }
	        if (data.BK15 != undefined) {
	            appData.BK15 = data.BK15;
	        }
	        if (data.BK16 != undefined) {
	            appData.BK16 = data.BK16;
	        }
	        if (data.BK17 != undefined) {
	            appData.BK17 = data.BK17;
	        }
	        if (data.BK18 != undefined) {
	            appData.BK18 = data.BK18;
	        }

	        //离线&故障
	        if (data.online) appData.online = data.online;
	        if (data.networkavailable != undefined) {
	            appData.networkavailable = data.networkavailable;
	        } else {
	            appData.networkavailable = 1;
	        }
	        if (data.online == 2) {
	            appData.onlineStatus = false;
	        } else {
	            appData.onlineStatus = true;
	        }

	        if (data.waterall != undefined) {
	            appData.waterall = data.waterall;
	        }

	        console.log("waterall = " + data.waterall + "    " + appData.waterall);
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
	    onStartWataerAction: function onStartWataerAction(data) {
	        if (!NetWorkCheck()) {
	            return;
	        }

	        // if(powerOffCheck()){
	        //     return;
	        // }

	        if (childLockCheck()) {
	            return;
	        }

	        if (appData.waterHeaterWorkMode === data.set_waterMode) {
	            return;
	        }
	        console.log("onStartWataerAction");
	        // appData.set_waterTempIndex=data.set_waterTempIndex;
	        appData.set_waterMode = data.set_waterMode;
	        appData.waterHeaterWorkMode = data.set_waterMode;
	        appData.isWorking = true;
	        // appData.waterHeaterTemp = waterTempArray[data.set_waterTempIndex];


	        var mode = data.set_waterMode + 1;
	        // let updateFlagTemp = het.hexUpFlag(4 , 1, 2);
	        var updateFlag = het.hexUpFlag(5, 1, 2);
	        var switchData = {};

	        switchData = {
	            // cpsettemp:appData.waterHeaterTemp,
	            cpworkmod: parseInt(mode, 10),
	            updateFlag: updateFlag
	        };

	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log("setTemp: " + appData.set_waterTempIndex + " setMode: " + mode);
	        this.trigger(appData);

	        setDataTimer("workmod");
	    },
	    onSetWaterHeaterPowerOn: function onSetWaterHeaterPowerOn() {

	        if (!NetWorkCheck()) {
	            return;
	        }

	        if (appData.isWorking && childLockCheck()) {
	            return;
	        }

	        appData.set_switchLockOn = !appData.set_switchLockOn;
	        console.log("++++++++++++++++++appData.set_switchLockOn:" + appData.set_switchLockOn);
	        if (!appData.set_switchLockOn) {
	            appData.isWorking = false;
	        } else {
	            appData.isWorking = true;
	        }
	        // let updateFlagTemp = het.hexUpFlag(7 , 1, 2);
	        // let updateFlag = het.hexUpFlag(6 , 1, 2,updateFlagTemp);
	        var updateFlag = het.hexUpFlag(6, 1, 2);
	        var switchData = {};
	        if (appData.set_switchLockOn) {
	            switchData = {
	                cponoff: parseInt("1", 10),
	                cplock: parseInt("0", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            switchData = {
	                cponoff: parseInt("0", 10),
	                cplock: parseInt("0", 10),
	                updateFlag: updateFlag
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log("setPower: " + appData.set_switchLockOn);

	        //
	        setDataTimer("oplock", "worksts");
	        this.trigger(appData);
	    },
	    onSetWaterHeaterChildOn: function onSetWaterHeaterChildOn() {
	        if (!NetWorkCheck()) {
	            return;
	        }

	        if (powerOffCheck()) {
	            return;
	        }

	        // if (!appData.set_switchLockOn){
	        //     return;
	        // }
	        appData.set_childerLockOn = !appData.set_childerLockOn;
	        var updateFlag = het.hexUpFlag(7, 1, 2);
	        var switchData = {};
	        if (appData.set_childerLockOn) {
	            switchData = {
	                cplock: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            switchData = {
	                cplock: parseInt("0", 10),
	                updateFlag: updateFlag
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log("childLock: " + appData.set_childerLockOn);
	        setDataTimer("oplock");
	        this.trigger(appData);
	    },
	    onAddTempAction: function onAddTempAction() {

	        if (!NetWorkCheck()) {
	            return;
	        }

	        // if(powerOffCheck()){
	        //     return;
	        // }

	        if (childLockCheck()) {
	            return;
	        }
	        var LitterTemp = 25;
	        var BigTemp = 45;
	        if (appData.workmod == 2 || appData.workmod == 5) {
	            BigTemp = 35;
	        } else if (appData.workmod == 4) {
	            LitterTemp = 45;
	        } else if (appData.workmod == 7) {
	            LitterTemp = 35;
	        }
	        if (appData.waterHeaterTemp >= BigTemp) {
	            if (LitterTemp != BigTemp) {
	                het.toast("温度可调范围" + LitterTemp + "℃-" + BigTemp + "℃");
	            } else {
	                het.toast("温度可调范围" + BigTemp + "℃");
	            }

	            return;
	        }

	        appData.waterHeaterTemp = appData.waterHeaterTemp + 1;
	        var temp = appData.waterHeaterTemp;
	        var updateFlag = het.hexUpFlag(4, 1, 2);
	        var switchData = {
	            cpsettemp: parseInt(temp, 10),
	            updateFlag: updateFlag
	        };
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log("temp: " + appData.waterHeaterTemp);
	        setDataTimer("settemp");
	        this.trigger(appData);
	    },
	    onSubTempAction: function onSubTempAction() {
	        if (!NetWorkCheck()) {
	            return;
	        }

	        // if(powerOffCheck()){
	        //     return;
	        // }

	        if (childLockCheck()) {
	            return;
	        }
	        var LitterTemp = 25;
	        var BigTemp = 45;
	        if (appData.workmod == 2 || appData.workmod == 5) {
	            BigTemp = 35;
	        } else if (appData.workmod == 4) {
	            LitterTemp = 45;
	        } else if (appData.workmod == 7) {
	            LitterTemp = 35;
	        }
	        console.log("&&&&&&&&&&&&&&&&&&&&appData.workmod" + appData.workmod + "LittetTemp" + LitterTemp + "BigTemp" + BigTemp);
	        if (appData.waterHeaterTemp <= LitterTemp) {
	            if (LitterTemp != BigTemp) {
	                het.toast("温度可调范围" + LitterTemp + "℃-" + BigTemp + "℃");
	            } else {
	                het.toast("温度可调范围" + BigTemp + "℃");
	            }

	            return;
	        }
	        appData.waterHeaterTemp = appData.waterHeaterTemp - 1;
	        var temp = appData.waterHeaterTemp;
	        var updateFlag = het.hexUpFlag(4, 1, 2);
	        var switchData = {
	            cpsettemp: parseInt(temp, 10),
	            updateFlag: updateFlag
	        };
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log("temp: " + appData.waterHeaterTemp);
	        setDataTimer("settemp");
	        this.trigger(appData);
	    },
	    onSetingPageSet: function onSetingPageSet(data) {
	        console.log("#############################data = " + data);
	        appData.isFirtInput = data;
	        this.trigger(appData);
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by luojourney on 17/1/12.
	 */

	var washerModeS = [{ id: 0, name: '常规' }, { id: 1, name: '节能' }, { id: 2, name: '智能' }, { id: 3, name: '快速' }, { id: 4, name: '厨房' }, { id: 5, name: '浴缸' }, { id: 6, name: '夜间' }, { id: 7, name: '季节' }];

	var waterTempArray = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
	var defaultTempIndex = 10;
	var defaultWasherModesIndex = 0;

	exports.washerModeS = washerModeS;
	exports.waterTempArray = waterTempArray;
	exports.defaultTempIndex = defaultTempIndex;
	exports.defaultWasherModesIndex = defaultWasherModesIndex;

/***/ }
/******/ ]);