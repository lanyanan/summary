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

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _RunUI = __webpack_require__(7);

	var _ConfigUI = __webpack_require__(9);

	var _Wave = __webpack_require__(10);

	var _ControlFilter = __webpack_require__(11);

	var _TimeSelect = __webpack_require__(12);

	var _DialogStyle = __webpack_require__(13);

	var _TipsDialogStyle = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	// <div className="main_box_top">
	//     <RunUI/>
	// </div>
	// <div className="main_box_bottom">
	//     <Wave/>
	//     <ConfigUI/>
	//     <ControlFilter/>
	//     <TimeSelect title={selectTitle} minuteshow={true} hourshow={false} timeLeftTitle={timeLeftTitle}
	// minutestep={1} statusname={statusname} cancelClock={this.handleClickCancel}
	// submitClock={this.handleClickSure} show={selectshow} minutearr={tempArray} />
	//     </div>


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: false,
	        torporTime: 10000,
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // console.log("---------------------------  "+data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件 mom349253356

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store

	        _this.handleClickCancel = _this.handleClickCancel.bind(_this);
	        _this.handleClickSure = _this.handleClickSure.bind(_this);

	        _this.canceldia = _this.canceldia.bind(_this);
	        _this.submitdia = _this.submitdia.bind(_this);

	        _this.handleFilterBtnCancel = _this.handleFilterBtnCancel.bind(_this);
	        _this.handleFilterBtnSure = _this.handleFilterBtnSure.bind(_this);

	        _this.closeLifeTips = _this.closeLifeTips.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleFilterBtnCancel',
	        value: function handleFilterBtnCancel() {
	            this.setState({
	                filterRemainTime: 2000
	            });
	        }
	    }, {
	        key: 'handleFilterBtnSure',
	        value: function handleFilterBtnSure() {
	            this.setState({
	                filterRemainTime: 2000
	            });
	        }
	    }, {
	        key: 'handleClickCancel',
	        value: function handleClickCancel() {
	            this.setState({
	                selectshow: false
	            });
	        }
	    }, {
	        key: 'handleClickSure',
	        value: function handleClickSure(h, m) {

	            if (m == "智能") {
	                //uvSw:uv,anionSw:anion,ozoneSw:ozone
	                _Actions.Actions.controllMode(0, 2, this.state.uvSw, 1); //紫外线，负离子，臭氧,
	            } else if (m == "标准") {
	                _Actions.Actions.controllMode(1, 4, 1, 1, this.state.ozoneSw);
	            } else if (m == "速净") {
	                _Actions.Actions.controllMode(2, 8, 1, 1, this.state.ozoneSw);
	            } else if (m == "节能") {
	                _Actions.Actions.controllMode(3, 2, 1, 1, this.state.ozoneSw);
	            } else if (m == "睡眠") {
	                _Actions.Actions.controllMode(4, 1, this.state.uvSw, this.state.anionSw, this.state.ozoneSw);
	            } else if (m == "假日") {
	                _Actions.Actions.controllMode(5, 1, this.state.uvSw, this.state.anionSw, this.state.ozoneSw);
	            } else if (m == "手动") {
	                _Actions.Actions.controllMode(6, this.state.uvSw, this.state.anionSw, this.state.ozoneSw);
	            } else if (m == "停") {
	                if (this.state.workMode == 0) {
	                    _Actions.Actions.controllMode2(6, 0);
	                } else {
	                    _Actions.Actions.controllWindSpeed(0);
	                }
	            } else if (m == "低档") {
	                if (this.state.workMode != 5 || this.state.workMode != 6) {
	                    _Actions.Actions.controllMode2(6, 1);
	                } else {
	                    _Actions.Actions.controllWindSpeed(1);
	                }
	            } else if (m == "中档") {
	                if (this.state.workMode != 0 || this.state.workMode != 3) {
	                    _Actions.Actions.controllMode2(6, 2);
	                } else {
	                    _Actions.Actions.controllWindSpeed(2);
	                }
	            } else if (m == "高档") {
	                if (this.state.workMode != 1) {
	                    _Actions.Actions.controllMode2(6, 4);
	                } else {
	                    _Actions.Actions.controllWindSpeed(4);
	                }
	            } else if (m == "超高档") {
	                if (this.state.workMode != 2) {
	                    _Actions.Actions.controllMode2(6, 8);
	                } else {
	                    _Actions.Actions.controllWindSpeed(8);
	                }
	            } else if (m == 1) {
	                _Actions.Actions.controllTime(1);
	            } else if (m == 2) {
	                _Actions.Actions.controllTime(2);
	            } else if (m == 4) {
	                _Actions.Actions.controllTime(4);
	            } else if (m == 8) {
	                _Actions.Actions.controllTime(8);
	            } else if (m == "关闭") {
	                _Actions.Actions.controllTime(255);
	            }
	            this.setState({
	                selectshow: false

	            });
	        }
	    }, {
	        key: 'canceldia',
	        value: function canceldia() {
	            this.setState({
	                isShowAlert: false,
	                PM25SnrErr: 0,
	                NTCSnrErr: 0,
	                AirQtyErr: 0,
	                DCVoltageErr: 0,
	                LeakCurrentErr: 0,
	                FLASHErr: 0
	            });
	        }
	    }, {
	        key: 'submitdia',
	        value: function submitdia() {
	            this.setState({
	                isShowAlert: false,
	                PM25SnrErr: 0,
	                NTCSnrErr: 0,
	                AirQtyErr: 0,
	                DCVoltageErr: 0,
	                LeakCurrentErr: 0,
	                FLASHErr: 0
	            });
	            location.href = "tel:0755-26727188";
	        }
	    }, {
	        key: 'closeLifeTips',
	        value: function closeLifeTips() {
	            this.setState({
	                lifeShow: false,
	                filterRemainTime: 2000
	            });
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {//render 之前可以先判断是否改变了
	            // let olderrs = this.state.Errs || [];//故障列表
	            // let  ErrItems= nextState.Errs || [];
	            // //故障判断
	            // if (this.ischangeErr2(olderrs,ErrItems)) {
	            //     this.setState({
	            //         diaErrShow : 0,
	            //         showdialogC : false
	            //     });
	            // }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (this.state.modeType == undefined) {
	                this.state.modeType = 1;
	            }
	            var modeType = this.state.modeType;
	            var statusname = '';
	            var tempArray = void 0;
	            var timeLeftTitle = "选择模式";
	            var defaultIndex = 0;
	            if (modeType == 1) {
	                timeLeftTitle = "选择模式";
	                tempArray = ["智能", "标准", "速净", "节能", "睡眠", "假日", "手动"];
	                if (this.state.workMode == 0) {
	                    defaultIndex = tempArray[0];
	                } else if (this.state.workMode == 1) {
	                    defaultIndex = tempArray[1];
	                } else if (this.state.workMode == 2) {
	                    defaultIndex = tempArray[2];
	                } else if (this.state.workMode == 3) {
	                    defaultIndex = tempArray[3];
	                } else if (this.state.workMode == 4) {
	                    defaultIndex = tempArray[4];
	                } else if (this.state.workMode == 5) {
	                    defaultIndex = tempArray[5];
	                } else if (this.state.workMode == 6) {
	                    defaultIndex = tempArray[6];
	                }
	            } else if (modeType == 2) {
	                timeLeftTitle = "选择风速";
	                tempArray = ["停", "低档", "中档", "高档", "超高档"];
	                if (this.state.motorGear == 0) {
	                    defaultIndex = tempArray[0];
	                } else if (this.state.motorGear == 1) {
	                    defaultIndex = tempArray[1];
	                } else if (this.state.motorGear == 2) {
	                    defaultIndex = tempArray[2];
	                } else if (this.state.motorGear == 4) {
	                    defaultIndex = tempArray[3];
	                } else if (this.state.motorGear == 8) {
	                    defaultIndex = tempArray[4];
	                }
	            } else if (modeType == 3) {
	                timeLeftTitle = "定时关机";
	                statusname = "小时后关机";
	                tempArray = ["1", "2", "4", "8", "关闭"];
	                if (this.state.RemainTime == 1) {
	                    defaultIndex = tempArray[0];
	                } else if (this.state.RemainTime == 2) {
	                    defaultIndex = tempArray[1];
	                } else if (this.state.RemainTime == 4) {
	                    defaultIndex = tempArray[2];
	                } else if (this.state.RemainTime == 8) {
	                    defaultIndex = tempArray[3];
	                } else if (this.state.RemainTime == 255) {
	                    defaultIndex = tempArray[4];
	                }
	            }
	            var selectTitle = '';
	            var selectshow = this.state.selectshow;

	            var title = "设备故障";
	            var myError = [];
	            var isShowAlert = false;
	            //如果是没出手的，那就去判断是否有异常
	            console.log("isShowAlert== " + this.state.isShowAlert);
	            if (this.state.isShowAlert == undefined) {
	                if (this.state.PM25SnrErr == 1) {
	                    myError.push("PM2.5质量传感器");
	                }
	                if (this.state.NTCSnrErr == 1) {
	                    myError.push("温度传感器");
	                }
	                if (this.state.AirQtyErr == 1) {
	                    myError.push("空气质量传感器");
	                }
	                if (this.state.DCVoltageErr == 1) {
	                    myError.push("空气质量传感器故障");
	                }
	                if (this.state.LeakCurrentErr == 1) {
	                    myError.push("漏电保护异常");
	                }
	                if (this.state.FLASHErr == 1) {
	                    myError.push("FLASH异常");
	                }
	                if (myError.length > 0) {
	                    isShowAlert = true;
	                } else {
	                    isShowAlert = false;
	                }
	            }

	            var lifeShow = this.state.lifeShow;
	            if (lifeShow == undefined) {
	                if (this.state.filterRemainTime < 5) {
	                    lifeShow = true;
	                }
	            }
	            // if(this.state.filterRemainTime!=undefined){
	            //     if(this.state.filterRemainTime<5){
	            //         lifeShow = true;
	            //     }
	            // }

	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { className: 'main_box' },
	                    React.createElement(_RunUI.RunUI, null),
	                    React.createElement(
	                        'div',
	                        { className: 'main_box_bottom' },
	                        React.createElement(_Wave.Wave, null),
	                        React.createElement(_ConfigUI.ConfigUI, null),
	                        React.createElement(_ControlFilter.ControlFilter, null),
	                        React.createElement(_TimeSelect.TimeSelect, { title: selectTitle, minuteshow: true, hourshow: false, timeLeftTitle: timeLeftTitle,
	                            minutestep: 1, statusname: statusname, cancelClock: this.handleClickCancel, defaultminute: defaultIndex,
	                            submitClock: this.handleClickSure, show: selectshow, minutearr: tempArray })
	                    )
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: isShowAlert, cancelClock: this.canceldia,
	                    submitClock: this.submitdia,
	                    title: title, content: "", errs: myError, rightpam: '\u8054\u7CFB\u5BA2\u670D' }),
	                React.createElement(_TipsDialogStyle.TipsDialogStyle, { show: lifeShow, closeLifeTips: this.closeLifeTips })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RunUI = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Store = __webpack_require__(5);

	var _Actions = __webpack_require__(4);

	var _Wave = __webpack_require__(8);

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Created by mindray on 2017/1/4.
	 *
	 * 显示室内空气参数的UI部分
	 */

	// 接收app推送数据
	het.repaint(function (data) {
	    // console.log(data);
	    _Actions.Actions.repaint(data);
	});

	var RunUI = exports.RunUI = function (_BaseComponent) {
	    _inherits(RunUI, _BaseComponent);

	    /**
	     * 控件初始化的时候，设置的默认参数
	     * */
	    function RunUI(props) {
	        _classCallCheck(this, RunUI);

	        var _this = _possibleConstructorReturn(this, (RunUI.__proto__ || Object.getPrototypeOf(RunUI)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(RunUI, [{
	        key: 'render',
	        value: function render() {
	            var ambientTemp = void 0;
	            if (this.state.ambientTemp == undefined) {
	                ambientTemp = "- -";
	            } else {
	                ambientTemp = "温度:" + (this.state.ambientTemp - 100) + "℃";
	            }
	            var pmVal = void 0;
	            if (this.state.pmVal == undefined) {
	                pmVal = "- -";
	            } else {
	                pmVal = "PM2.5:" + this.state.pmVal;
	            }
	            var str = pmVal + " | " + ambientTemp;

	            var airQty = void 0;
	            if (this.state.airQty == undefined) {
	                airQty = "未知";
	            } else {
	                if (this.state.airQty == 0) {
	                    airQty = "优";
	                } else if (this.state.airQty == 1) {
	                    airQty = "良";
	                } else if (this.state.airQty == 2) {
	                    airQty = "中";
	                } else if (this.state.airQty == 3) {
	                    airQty = "差";
	                }
	            }
	            // let controlShowStype="main_top_center_x"
	            var conent1 = "净化器已关闭";
	            var conent2 = "点击[开机]开启";
	            var close_container = "device_close_container";
	            if (this.state.networkavailable == 2) {
	                conent1 = "手机网络异常";
	                conent2 = "请查看手机网络是否打开";
	                close_container = "device_close_container show";
	            } else if (this.state.online == 2) {
	                conent1 = "净化器已离线";
	                conent2 = "";
	                close_container = "device_close_container show";
	            } else if (this.state.powerOn == undefined) {
	                //controlShowStype="main_top_center_x hide"
	                close_container = "device_close_container show";
	            } else if (this.state.powerOn == 1) {
	                //controlShowStype="main_top_center_x show"
	                close_container = "device_close_container hide";
	            } else if (this.state.powerOn == 2) {
	                //controlShowStype="main_top_center_x hide"
	                close_container = "device_close_container show";
	                conent1 = "净化器已关闭";
	                conent2 = "点击[开机]开启";
	            }
	            // console.log("this.state.isShowAlert message onoff "+this.state.powerOn );
	            return React.createElement(
	                'div',
	                { className: 'main_top' },
	                React.createElement(
	                    'div',
	                    { className: "main_top_center_x" },
	                    React.createElement(
	                        'div',
	                        { className: 'main_top_center' },
	                        React.createElement(
	                            'div',
	                            { className: 'main_top_center_inner_1' },
	                            React.createElement(_Wave.Wave2, null)
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'mian_top_show_data' },
	                            React.createElement(
	                                'p',
	                                { className: 'show_indoor_item' },
	                                '\u5BA4\u5185'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'show_indoor_air_quality_item' },
	                                airQty
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'show_indoor_pm_and_temp_item' },
	                                str
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: close_container },
	                    React.createElement(
	                        'div',
	                        { className: 'off_line' },
	                        React.createElement(
	                            'div',
	                            { className: 'content' },
	                            conent1
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'content' },
	                            conent2
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return RunUI;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	/**
	 *波浪动画组件
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Wave2 = exports.Wave2 = React.createClass({
	    displayName: 'Wave2',
	    componentDidMount: function componentDidMount() {
	        var canvas = document.getElementById('waveCanvas3');
	        var ctx = canvas.getContext('2d');
	        // var leaf=new Image();
	        canvas.width = canvas.parentNode.offsetWidth;
	        canvas.height = canvas.parentNode.offsetHeight / 1.0;
	        window.requestAnimFrame = function () {
	            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	                window.setTimeout(callback, 1000 / 60);
	            };
	        }();
	        var step = 0;
	        var lines = ["rgba(135,252,195, 1)", "rgba(135,252,195, 0.5)"];
	        function loop() {
	            ctx.clearRect(0, 0, canvas.width, canvas.height);
	            step++;
	            //画3个不同颜色的矩形
	            for (var j = lines.length - 1; j >= 0; j--) {
	                if (j === 0) {
	                    var imageY = canvas.height / 2 + deltaHeight - 75;
	                    imageY = imageY < 10 ? Math.abs(imageY) : imageY;
	                }
	                //每个矩形的角度都不同，每个之间相差45度
	                var angle = (step + j * 45) * Math.PI / 180;
	                var deltaHeight = Math.sin(angle) * 20;
	                var deltaHeightRight = Math.cos(angle) * 20;
	                ctx.beginPath();
	                ctx.fillStyle = lines[j];
	                ctx.moveTo(0, canvas.height / 1.5 + deltaHeight);
	                ctx.bezierCurveTo(canvas.width / 1.5, canvas.height / 1.5 + deltaHeight - 20, canvas.width / 2, canvas.height / 1.5 + deltaHeightRight - 20, canvas.width, canvas.height / 1.5 + deltaHeightRight);
	                ctx.lineTo(canvas.width, canvas.height);
	                ctx.lineTo(0, canvas.height);
	                ctx.lineTo(0, canvas.height / 3 + deltaHeight);
	                ctx.closePath();
	                ctx.fill();
	            }
	            requestAnimFrame(loop);
	        }
	        loop();
	    },
	    render: function render() {
	        return React.createElement('canvas', { id: 'waveCanvas3' });
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ConfigUI = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by mindray on 2017/1/4.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;
	// 接收app推送数据

	het.repaint(function (data) {
	    // console.log('1111111111111111111111111111111 repaint  data ');
	    _Actions.Actions.repaint(data);
	});
	//创建 ConfigUI React组件

	var ConfigUI = exports.ConfigUI = function (_BaseComponent) {
	    _inherits(ConfigUI, _BaseComponent);

	    // 构造函数，传入按钮的标题和状态
	    function ConfigUI(props) {
	        _classCallCheck(this, ConfigUI);

	        var _this = _possibleConstructorReturn(this, (ConfigUI.__proto__ || Object.getPrototypeOf(ConfigUI)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store

	        _this.handleArrowUp = _this.handleArrowUp.bind(_this);
	        _this.handleSwitch = _this.handleSwitch.bind(_this);

	        _this.handleStandard = _this.handleStandard.bind(_this);
	        _this.handleSpeedWind = _this.handleSpeedWind.bind(_this);

	        _this.handleTiming = _this.handleTiming.bind(_this);
	        _this.handleUV = _this.handleUV.bind(_this);

	        _this.handleAnion = _this.handleAnion.bind(_this);
	        _this.handleOzone = _this.handleOzone.bind(_this);

	        _this.handleChildLock = _this.handleChildLock.bind(_this);

	        return _this;
	    }

	    _createClass(ConfigUI, [{
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
	        key: 'handleSwitch',
	        value: function handleSwitch() {
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };

	            if (this.state.childLock == 2) {
	                het.toast('童锁开启，不能点击其他按钮');return false;
	            }
	            if (this.state.powerOn == 1) {
	                //如果当前是1-开机
	                _Actions.Actions.controllSwitch(2); //就触发关机事件
	            } else {
	                _Actions.Actions.controllSwitch(1);
	            }
	            // het.hexUpFlag(9, 1, 2);//功能指示，功能所占的字节数，updataFlag
	        }
	        //处理模式

	    }, {
	        key: 'handleStandard',
	        value: function handleStandard() {
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            if (this.state.childLock == 2) {
	                het.toast('童锁开启，不能点击其他按钮');return false;
	            }
	            //显示模式选择对话框
	            _Actions.Actions.controllShowModeDialog(1);
	        }
	        //处理风速

	    }, {
	        key: 'handleSpeedWind',
	        value: function handleSpeedWind() {
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁开启，不能点击其他按钮');return false;
	            }
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            _Actions.Actions.controllShowModeDialog(2);
	        }
	        //处理定时

	    }, {
	        key: 'handleTiming',
	        value: function handleTiming() {
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁开启，不能点击其他按钮');return false;
	            }
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            //if(this.state.mode==5){het.toast('假期的模式,不能操作定时'); return false;}
	            _Actions.Actions.controllShowModeDialog(3);
	        }
	        //处理UV

	    }, {
	        key: 'handleUV',
	        value: function handleUV() {
	            //console.log("-- online -- "+this.state.online+" -- onoff -- "+this.state.onoff)
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁开启，不能点击其他按钮');return false;
	            }
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            if (this.state.uvSw == 1) {
	                _Actions.Actions.controllUV(2);
	            } else {
	                _Actions.Actions.controllUV(1);
	            }
	            // het.hexUpFlag(6, 1, 2);//功能指示，功能所占的字节数，updataFlag
	        }
	    }, {
	        key: 'handleAnion',
	        value: function handleAnion() {
	            //处理负离子
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁开启，不能点击其他按钮');return false;
	            }
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            if (this.state.anionSw == 1) {
	                _Actions.Actions.controllAnion(2);
	            } else {
	                _Actions.Actions.controllAnion(1);
	            }
	        }
	    }, {
	        key: 'handleOzone',
	        value: function handleOzone() {
	            //处理臭氧
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.childLock == 2) {
	                het.toast('童锁开启，不能点击其他按钮');return false;
	            }
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            if (this.state.ozoneSw == 1) {
	                _Actions.Actions.controllOzone(2);
	            } else {
	                _Actions.Actions.controllOzone(1);
	            }
	            // het.hexUpFlag(5, 1, 2);//功能指示，功能所占的字节数，updataFlag
	        }
	    }, {
	        key: 'handleChildLock',
	        value: function handleChildLock() {
	            //处理童锁
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            };
	            if (this.state.powerOn == 2) {
	                het.toast('设备已关机');return false;
	            }
	            if (this.state.childLock == 1) {
	                _Actions.Actions.controllChildLock(2);
	            } else {
	                _Actions.Actions.controllChildLock(1);
	            }
	            // het.hexUpFlag(3, 1, 2);//功能指示，功能所占的字节数，updataFlag
	        }
	    }, {
	        key: 'handleArrowUp',
	        value: function handleArrowUp() {
	            //处理箭头
	            //如果开始是隐藏的，就显示出来
	            if (this.state.modeWindowState == 1) {
	                _Actions.Actions.controllShowOrModeOrFilterUI(2, 1);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var switchImg = "../static/img/home_button_kaiguan_disabled.png";
	            var switchText = "开机";
	            var switchTextStyle = "text_switch";

	            // 模式设置
	            var modeImg = "../static/img/home_button_moshi_selected.png";
	            var modeText = "智能";
	            var modeTextStyle = "text_switch";

	            //风速
	            var windSpeedImg = "../static/img/home_button_fefengsu_selected.png";
	            var windSpeedText = "停止";
	            var windSpeedTextStyle = "text_switch";

	            //定时部分
	            var timeImg = "../static/img/home_button_time_normal.png";
	            var timeTextStyle = "text_switch";
	            var timeText = "定时";
	            var llStype = "item_value_hide";
	            var settimer = 255;

	            var uvImg = "../static/img/home_button_UV_normal.png";
	            var uvTextStyle = "text_switch";
	            var uvText = "UV";
	            //负离子
	            var anionImg = "../static/img/home_button_fulizi_normal.png";
	            var anionTextStyle = "text_switch";
	            var anionText = "负离子";
	            //臭氧
	            var OzoneImg = "../static/img/home_button_chouyang_normal.png";
	            var ozoneTextStyle = "text_switch";
	            var ozoneText = "臭氧";

	            //童锁
	            var childLockImg = "../static/img/home_button_tongsuo_normal.png";
	            var childLockText = "童锁关";
	            var childLockTextStyle = "text_switch";

	            //如果开关没获取到状态值，那么所以的控制设置为不可用
	            if (this.state.powerOn == undefined || this.state.networkavailable == 2 || this.state.online == 2) {
	                //console.log("llStype= onoff ==networkavailable "+llStype);
	                switchImg = "../static/img/home_button_kaiguan_disabled.png";
	                modeImg = "../static/img/home_button_moshi_disabled.png";
	                windSpeedImg = "../static/img/home_button_fefengsu_disabled.png";
	                timeImg = "../static/img/home_button_time_disabled.png";
	                uvImg = "../static/img/home_button_UV_disabled.png";
	                anionImg = "../static/img/home_button_fulizi_disabled.png";
	                OzoneImg = "../static/img/home_button_chouyang_disabled.png";
	                childLockImg = "../static/img/home_button_tongsuo_disabled.png";

	                switchTextStyle = "text_switch_disable";
	                modeTextStyle = "text_switch_disable";
	                windSpeedTextStyle = "text_switch_disable";

	                timeTextStyle = "text_switch_disable";
	                uvTextStyle = "text_switch_disable";
	                anionTextStyle = "text_switch_disable";
	                ozoneTextStyle = "text_switch_disable";
	                childLockTextStyle = "text_switch_disable";
	                llStype = "item_value_hide";
	            } else if (this.state.powerOn == 1) {
	                //console.log("llStype= onoff == "+llStype);

	                switchImg = "../static/img/home_button_kaiguan_normal.png";
	                switchText = "关机";
	                if (this.state.workMode == undefined) {
	                    modeImg = "../static/img/home_button_moshi_disabled.png";
	                    modeTextStyle = "text_switch_disable";
	                } else if (this.state.workMode == 0) {
	                    modeText = "智能";
	                    modeTextStyle = "text_switch";
	                } else if (this.state.workMode == 1) {
	                    modeText = "标准";
	                    modeTextStyle = "text_switch";
	                } else if (this.state.workMode == 2) {
	                    modeText = "速净";
	                    modeTextStyle = "text_switch";
	                } else if (this.state.workMode == 3) {
	                    modeText = "节能";
	                    modeTextStyle = "text_switch";
	                } else if (this.state.workMode == 4) {
	                    modeText = "睡眠";
	                    modeTextStyle = "text_switch";
	                } else if (this.state.workMode == 5) {
	                    modeText = "假日";
	                    modeTextStyle = "text_switch";
	                } else if (this.state.workMode == 6) {
	                    modeText = "手动";
	                    modeTextStyle = "text_switch";
	                }

	                if (this.state.motorGear == undefined) {
	                    windSpeedImg = "../static/img/home_button_fefengsu_disabled.png";
	                    windSpeedTextStyle = "text_switch_disable";
	                } else if (this.state.motorGear == 0) {
	                    windSpeedImg = "../static/img/home_button_fefengsu_normal.png";
	                    windSpeedText = "停止";
	                    windSpeedTextStyle = "text_switch";
	                } else if (this.state.motorGear == 1) {
	                    windSpeedText = "低档";
	                    windSpeedTextStyle = "text_switch";
	                } else if (this.state.motorGear == 2) {
	                    windSpeedText = "中档";
	                    windSpeedTextStyle = "text_switch";
	                } else if (this.state.motorGear == 4) {
	                    windSpeedText = "高档";
	                    windSpeedTextStyle = "text_switch";
	                } else if (this.state.motorGear == 8) {
	                    windSpeedText = "超高档";
	                    windSpeedTextStyle = "text_switch";
	                }

	                if (this.state.RemainTime == undefined) {
	                    timeImg = "../static/img/home_button_time_disabled.png";
	                    timeTextStyle = "text_switch_disable";
	                    llStype = "item_value_hide";
	                } else if (this.state.RemainTime > 0 && this.state.RemainTime <= 8) {
	                    //==1 || this.state.RemainTime==2|| this.state.RemainTime==4|| this.state.RemainTime==8
	                    timeImg = "../static/img/home_button_time_selected.png";
	                    timeTextStyle = "text_switch";
	                    llStype = "item_value";
	                    settimer = this.state.RemainTime;
	                } else if (this.state.RemainTime == 255) {
	                    timeImg = "../static/img/home_button_time_normal.png";
	                    timeTextStyle = "text_switch";
	                    llStype = "item_value_hide";
	                }
	                //uv 1开启 ，2 关闭
	                if (this.state.uvSw == undefined) {
	                    uvImg = "../static/img/home_button_UV_disabled.png";
	                    uvTextStyle = "text_switch_disable";
	                } else if (this.state.uvSw == 1) {
	                    uvImg = "../static/img/home_button_UV_selected.png";
	                    uvTextStyle = "text_switch";
	                } else if (this.state.uvSw == 2) {
	                    uvImg = "../static/img/home_button_UV_normal.png";
	                    uvTextStyle = "text_switch";
	                }
	                //anion 1开启 ，2 关闭
	                if (this.state.anionSw == undefined) {
	                    anionImg = "../static/img/home_button_fulizi_disabled.png";
	                    anionTextStyle = "text_switch_disable";
	                } else if (this.state.anionSw == 1) {
	                    anionImg = "../static/img/home_button_fulizi_selected.png";
	                    anionTextStyle = "text_switch";
	                } else if (this.state.anionSw == 2) {
	                    anionImg = "../static/img/home_button_fulizi_normal.png";
	                    anionTextStyle = "text_switch";
	                }

	                if (this.state.ozoneSw == undefined) {
	                    OzoneImg = "../static/img/home_button_chouyang_disabled.png";
	                    ozoneTextStyle = "text_switch_disable";
	                } else if (this.state.ozoneSw == 1) {
	                    OzoneImg = "../static/img/home_button_chouyang_selected.png";
	                    ozoneTextStyle = "text_switch";
	                } else if (this.state.ozoneSw == 2) {
	                    OzoneImg = "../static/img/home_button_chouyang_normal.png";
	                    ozoneTextStyle = "text_switch";
	                }

	                if (this.state.childLock == undefined) {
	                    childLockImg = "../static/img/home_button_tongsuo_disabled.png";
	                    childLockTextStyle = "text_switch_disable";
	                } else if (this.state.childLock == 1) {
	                    childLockImg = "../static/img/home_button_tongsuo_normal.png";
	                    childLockText = "童锁关";
	                    childLockTextStyle = "text_switch";
	                } else if (this.state.childLock == 2) {
	                    childLockImg = "../static/img/home_button_tongsuo_selected.png";
	                    childLockText = "童锁开";
	                    childLockTextStyle = "text_switch";

	                    switchImg = "../static/img/home_button_kaiguan_disabled.png";
	                    modeImg = "../static/img/home_button_moshi_disabled.png";
	                    windSpeedImg = "../static/img/home_button_fefengsu_disabled.png";
	                    timeImg = "../static/img/home_button_time_disabled.png";
	                    uvImg = "../static/img/home_button_UV_disabled.png";
	                    anionImg = "../static/img/home_button_fulizi_disabled.png";
	                    OzoneImg = "../static/img/home_button_chouyang_disabled.png";

	                    switchTextStyle = "text_switch_disable";
	                    modeTextStyle = "text_switch_disable";
	                    windSpeedTextStyle = "text_switch_disable";

	                    timeTextStyle = "text_switch_disable";
	                    uvTextStyle = "text_switch_disable";
	                    anionTextStyle = "text_switch_disable";
	                    ozoneTextStyle = "text_switch_disable";
	                }
	            } else if (this.state.powerOn == 2) {
	                switchImg = "../static/img/home_button_kaiguan_normal.png";
	                switchText = "开机";

	                //如果关机，把其他的控制按钮全部重置为不可用状态
	                modeImg = "../static/img/home_button_moshi_disabled.png";
	                windSpeedImg = "../static/img/home_button_fefengsu_disabled.png";
	                timeImg = "../static/img/home_button_time_disabled.png";
	                uvImg = "../static/img/home_button_UV_disabled.png";
	                anionImg = "../static/img/home_button_fulizi_disabled.png";
	                OzoneImg = "../static/img/home_button_chouyang_disabled.png";
	                childLockImg = "../static/img/home_button_tongsuo_disabled.png";

	                modeTextStyle = "text_switch_disable";
	                windSpeedTextStyle = "text_switch_disable";
	                timeTextStyle = "text_switch_disable";
	                uvTextStyle = "text_switch_disable";
	                anionTextStyle = "text_switch_disable";
	                ozoneTextStyle = "text_switch_disable";
	                childLockTextStyle = "text_switch_disable";
	                //timerState
	                if (this.state.RemainTime <= 0 || this.state.RemainTime == undefined || this.state.RemainTime > 8) {
	                    llStype = "item_value_hide";
	                } else {
	                    llStype = "item_value";
	                    settimer = this.state.RemainTime;
	                }
	            }
	            var colorStyle = "control_mode";
	            if (this.state.modeWindowState == undefined) {
	                this.state.modeWindowState = 1;
	                colorStyle = "control_mode slide-up";
	                if (this.state.RemainTime <= 0 || this.state.RemainTime == undefined || this.state.RemainTime > 8) {
	                    llStype = "item_value_hide";
	                } else {
	                    llStype = "item_value";
	                    settimer = this.state.RemainTime;
	                }
	            } else if (this.state.modeWindowState == 1) {
	                colorStyle = "control_mode slide-up";
	                if (this.state.RemainTime <= 0 || this.state.RemainTime == undefined || this.state.RemainTime > 8) {
	                    llStype = "item_value_hide";
	                } else {
	                    llStype = "item_value";
	                    settimer = this.state.RemainTime;
	                }
	            } else {
	                colorStyle = "control_mode slide-down";
	                llStype = "item_value_hide";
	            }
	            return React.createElement(
	                'div',
	                { className: colorStyle },
	                React.createElement(
	                    'div',
	                    { className: 'control_layout_1' },
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleSwitch },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: switchImg })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: switchTextStyle },
	                            switchText
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleStandard },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: modeImg })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: modeTextStyle },
	                            modeText
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleSpeedWind },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: windSpeedImg })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: windSpeedTextStyle },
	                            windSpeedText
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleTiming },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: timeImg }),
	                            React.createElement(
	                                'span',
	                                { className: llStype },
	                                settimer
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: timeTextStyle },
	                            timeText
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'control_layout_2' },
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleUV },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: uvImg })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: uvTextStyle },
	                            uvText
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleAnion },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: anionImg })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: anionTextStyle },
	                            anionText
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleOzone },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: OzoneImg })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: ozoneTextStyle },
	                            ozoneText
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'control_mode_btn', onClick: this.handleChildLock },
	                        React.createElement(
	                            'div',
	                            { className: 'mode_btn_icon_or_num' },
	                            React.createElement('img', { className: 'my_icon', src: childLockImg })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: childLockTextStyle },
	                            childLockText
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'arrow_layout_control' },
	                    React.createElement('img', { src: '../static/img/home_button_up.png', onClick: this.handleArrowUp })
	                )
	            );
	        }
	    }]);

	    return ConfigUI;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/**
	 *波浪动画组件
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Wave = exports.Wave = React.createClass({
	    displayName: 'Wave',
	    componentDidMount: function componentDidMount() {
	        var canvas = document.getElementById('waveCanvas');
	        var ctx = canvas.getContext('2d');
	        // var leaf=new Image();
	        canvas.width = canvas.parentNode.offsetWidth;
	        canvas.height = canvas.parentNode.offsetHeight * 2;
	        window.requestAnimFrame = function () {
	            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	                window.setTimeout(callback, 1000 / 60);
	            };
	        }();

	        var step = 0;
	        var lines = ["rgba(255,255,255, 1)", "rgba(255,255,255, 0.5)", "rgba(255,255,255, 0.3)"];
	        function loop() {
	            ctx.clearRect(0, 0, canvas.width, canvas.height);
	            step++;
	            //画3个不同颜色的矩形
	            for (var j = lines.length - 1; j >= 0; j--) {
	                if (j === 0) {
	                    var imageY = canvas.height / 2 + deltaHeight - 75;
	                    imageY = imageY < 10 ? Math.abs(imageY) : imageY;
	                }
	                //每个矩形的角度都不同，每个之间相差45度
	                var angle = (step + j * 45) * Math.PI / 180;
	                var deltaHeight = Math.sin(angle) * 20;
	                var deltaHeightRight = Math.cos(angle) * 20;
	                ctx.beginPath();
	                ctx.fillStyle = lines[j];
	                ctx.moveTo(0, canvas.height / 2 + deltaHeight);
	                ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 20, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 20, canvas.width, canvas.height / 2 + deltaHeightRight);
	                ctx.lineTo(canvas.width, canvas.height);
	                ctx.lineTo(0, canvas.height);
	                ctx.lineTo(0, canvas.height / 2 + deltaHeight);
	                ctx.closePath();
	                ctx.fill();
	            }
	            requestAnimFrame(loop);
	        }
	        loop();
	    },
	    render: function render() {
	        return React.createElement('canvas', { id: 'waveCanvas' });
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ControlFilter = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by mindray on 2017/1/4.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	// 接收app推送数据

	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});
	/**
	 * 创建 ControlFilter React组件
	 * 该组件主要负责滤网的一些基本功能
	 *
	 */

	var ControlFilter = exports.ControlFilter = function (_BaseComponent) {
	    _inherits(ControlFilter, _BaseComponent);

	    // 构造函数，传入按钮的标题和状态
	    function ControlFilter(props) {
	        _classCallCheck(this, ControlFilter);

	        var _this = _possibleConstructorReturn(this, (ControlFilter.__proto__ || Object.getPrototypeOf(ControlFilter)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store
	        _this.handleArrowDown = _this.handleArrowDown.bind(_this);
	        return _this;
	    }

	    _createClass(ControlFilter, [{
	        key: 'handleArrowDown',
	        value: function handleArrowDown() {
	            _Actions.Actions.controllShowOrModeOrFilterUI(1, 2);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var control_filter_state = "control_filter";
	            if (this.state.filterWindowState == undefined) {
	                this.state.filterWindowState = 2;
	                control_filter_state = "control_filter slide-down";
	            } else if (this.state.filterWindowState == 2) {
	                control_filter_state = "control_filter slide-down";
	            } else {
	                control_filter_state = "control_filter slide-up";
	            }
	            //整机累计耗电量
	            var accDeviceKwh = void 0;
	            if (this.state.accDeviceKwh == undefined) {
	                accDeviceKwh = "- -";
	            } else {
	                accDeviceKwh = this.state.accDeviceKwh;
	            }
	            //整机累计运行时间
	            var accDeviceRunTime = void 0;
	            if (this.state.accDeviceRunTime == undefined) {
	                accDeviceRunTime = "- - ";
	            } else {
	                accDeviceRunTime = this.state.accDeviceRunTime;
	            }

	            var filterRemainTime = void 0;
	            var lv = void 0;
	            if (this.state.filterRemainTime == undefined) {
	                filterRemainTime = "距离下次清洁滤网还剩 - - 天";
	                lv = "- -";
	            } else {
	                var day = parseInt(this.state.filterRemainTime / 24);
	                var htime = this.state.filterRemainTime % 24;
	                filterRemainTime = "距离下次清洁滤网还剩 " + day + "天 " + htime + "小时";
	                lv = this.state.filterRemainTime / 20 + "%";
	            }
	            return React.createElement(
	                'div',
	                { className: control_filter_state },
	                React.createElement(
	                    'div',
	                    { className: 'arrow_layout_control' },
	                    React.createElement('img', { src: '../static/img/home_button_down.png', onClick: this.handleArrowDown })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'filter_item_layout_1' },
	                    React.createElement(
	                        'div',
	                        { className: 'layout_1_left' },
	                        React.createElement(
	                            'div',
	                            { className: 'title_name' },
	                            '\u6E05\u6D01\u6EE4\u7F51'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'clean_filter_tips' },
	                            filterRemainTime
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'layout_1_right' },
	                        React.createElement(
	                            'div',
	                            { className: 'title_name filter_life' },
	                            lv
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'filter_item_layout_2' },
	                    React.createElement(
	                        'div',
	                        { className: 'layout2_item_1' },
	                        React.createElement(
	                            'div',
	                            { className: 'layout2_item_1_cell' },
	                            React.createElement(
	                                'p',
	                                { className: 'runTotalTime' },
	                                accDeviceRunTime,
	                                React.createElement(
	                                    'span',
	                                    { className: 'unit' },
	                                    '\u5C0F\u65F6'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'filter_title' },
	                                '\u7D2F\u8BA1\u8FD0\u884C'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'layout2_item_2_cell' },
	                            React.createElement(
	                                'div',
	                                { className: 'total_power_consume' },
	                                accDeviceKwh,
	                                React.createElement(
	                                    'span',
	                                    { className: 'unit' },
	                                    'KWH'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'filter_title' },
	                                '\u7D2F\u8BA1\u8017\u7535'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return ControlFilter;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 12 */
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
	 * @prop {array} minutearr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
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
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			// console.log("minhour == "+minhour)
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (this.props.hourarray && this.props.hourarray instanceof Array) {
				hourarr = this.props.hourarray;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : value;
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
			if (this.props.minutearr && this.props.minutearr instanceof Array) {
				minutearr = this.props.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : _value;
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
				var mindex = next.minutearr.indexOf(next.defaultminute);
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
			//console.log("defaultminute == "+this.props.defaultminute)
			// this.setState({
			// 	minuteindex:this.props.defaultminute
			// });
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.arrayInit === true || this.props.defaultminute != next.defaultminute) {
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
			var minutearr = this.props.minutearr; //分钟可选值数组
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
			var selecttitle = this.props.title || ' ';
			var statusname = this.props.statusname || ' ';
			var timeLeftTitle = this.props.timeLeftTitle || ' ';
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
			var minutearr = this.props.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			var status = "status";
			if (this.state.minutetime == "关闭") {
				status = "status hide";
			} else {
				status = "status show";
			}

			return React.createElement(
				'section',
				{ style: { display: this.state.timeDisplay ? "block" : "none", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
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
					),
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
								{ className: 'timeLeft' },
								timeLeftTitle
							),
							React.createElement('span', { className: 'hour', style: { left: minuteshow ? 49 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } }),
							React.createElement('span', { className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } }),
							React.createElement(
								'span',
								{ className: status },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 41 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
					)
				)
			);
		}
	});

/***/ },
/* 13 */
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
	 * 弹出框组件
	 * @prop {string}   title 标题
	 * @prop {string}   leftpam 左边点击框文字
	 * @prop {string}   rightpam 左边点击框文字
	 * @prop {boolean}   show 是否显示
	 * @prop {function}  cancelClock   取消，点击后的回调函数
	 * @prop {function} submitClock   确定，点击后的回调函数
	 * @prop {string} content   内容
	 */
	var DialogStyle = exports.DialogStyle = function (_React$Component) {
	    _inherits(DialogStyle, _React$Component);

	    function DialogStyle(props) {
	        _classCallCheck(this, DialogStyle);

	        var _this = _possibleConstructorReturn(this, (DialogStyle.__proto__ || Object.getPrototypeOf(DialogStyle)).call(this, props));

	        _this.state = {
	            showOpacity: 0,
	            timeDisplay: false
	        };
	        return _this;
	    }

	    _createClass(DialogStyle, [{
	        key: 'endDefault',
	        value: function endDefault(e) {
	            //阻止touchend事件向上冒泡
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    }, {
	        key: 'touchconform',
	        value: function touchconform(e) {
	            e.stopPropagation();
	            if (typeof this.props.submitClock === 'function') {
	                this.props.submitClock();
	            }
	        }
	    }, {
	        key: 'touchcanle',
	        value: function touchcanle(e) {
	            e.stopPropagation(); //取消时间冒泡
	            if (typeof this.props.cancelClock === 'function') {
	                this.props.cancelClock();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var title = this.props.title == undefined ? "默认标题" : this.props.title;
	            // let content = this.props.content == undefined?"--":this.props.content;
	            var leftpam = this.props.leftpam == undefined ? "取消" : this.props.leftpam;
	            var rightpam = this.props.rightpam == undefined ? "确定" : this.props.rightpam;
	            var show = this.props.show;

	            var ErrItems = this.props.errs == undefined ? [] : this.props.errs;

	            var items = [];
	            for (var index in ErrItems) {
	                if (index > 2) break;
	                var item = ErrItems[index];
	                items.push(React.createElement(
	                    'li',
	                    { key: index },
	                    item
	                ));
	            }

	            return React.createElement(
	                'section',
	                { style: { display: show ? "" : "none" }, className: 'fade_c_section' },
	                React.createElement(
	                    'section',
	                    { className: 'fade_c_section', onTouchEnd: this.touchcanle.bind(this) },
	                    React.createElement(
	                        'section',
	                        { onTouchMove: this.endDefault },
	                        React.createElement('div', { className: 'fade_c' }),
	                        React.createElement(
	                            'div',
	                            { className: 'succ-pop' },
	                            React.createElement(
	                                'p',
	                                { className: 'title' },
	                                title
	                            ),
	                            React.createElement(
	                                'section',
	                                { className: 'pop_div' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'pop_content' },
	                                    React.createElement(
	                                        'ul',
	                                        { className: 'pop_con' },
	                                        items
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex conformd' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell', onTouchEnd: this.touchcanle.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        leftpam
	                                    )
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell btn_sure', onTouchEnd: this.touchconform.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        rightpam
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return DialogStyle;
	}(React.Component);

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var /**
	     * 弹出框组件
	     * @prop {string}   title 标题
	     * @prop {string}   leftpam 左边点击框文字
	     * @prop {string}   rightpam 左边点击框文字
	     * @prop {boolean}   show 是否显示
	     * @prop {function}  cancelClock   取消，点击后的回调函数
	     * @prop {function} submitClock   确定，点击后的回调函数
	     * @prop {string} content   内容
	     */
	TipsDialogStyle = exports.TipsDialogStyle = function (_React$Component) {
	    _inherits(TipsDialogStyle, _React$Component);

	    function TipsDialogStyle(props) {
	        _classCallCheck(this, TipsDialogStyle);

	        var _this = _possibleConstructorReturn(this, (TipsDialogStyle.__proto__ || Object.getPrototypeOf(TipsDialogStyle)).call(this, props));

	        _this.state = {
	            showOpacity: 0,
	            timeDisplay: false
	        };
	        return _this;
	    }

	    _createClass(TipsDialogStyle, [{
	        key: 'endDefault',
	        value: function endDefault(e) {
	            //阻止touchend事件向上冒泡
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    }, {
	        key: 'touchconform',
	        value: function touchconform(e) {
	            e.stopPropagation();
	            if (typeof this.props.closeLifeTips === 'function') {
	                this.props.closeLifeTips();
	            }
	        }
	    }, {
	        key: 'touchcanle',
	        value: function touchcanle(e) {
	            e.stopPropagation(); //取消时间冒泡
	            if (typeof this.props.closeLifeTips === 'function') {
	                this.props.closeLifeTips();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var title = this.props.title == undefined ? "滤芯到期" : this.props.title;
	            // let content = this.props.content == undefined?"--":this.props.content;
	            var leftpam = this.props.leftpam == undefined ? "我知道了" : this.props.leftpam;
	            // let rightpam = this.props.rightpam == undefined?"确定":this.props.rightpam;
	            var show = this.props.show;

	            // let ErrItems = this.props.errs == undefined ? [] : this.props.errs;

	            var items = "您的滤芯寿命已小于5小时";
	            // for(var index in ErrItems){
	            //     if(index>2)break;
	            //     let item = ErrItems[index];
	            //     items.push(<li key={index}>{item}</li>);
	            // }

	            return React.createElement(
	                'section',
	                { style: { display: show ? "" : "none" }, className: 'fade_c_section' },
	                React.createElement(
	                    'section',
	                    { className: 'fade_c_section', onTouchEnd: this.touchcanle.bind(this) },
	                    React.createElement(
	                        'section',
	                        { onTouchMove: this.endDefault },
	                        React.createElement('div', { className: 'fade_c' }),
	                        React.createElement(
	                            'div',
	                            { className: 'succ-pop' },
	                            React.createElement(
	                                'p',
	                                { className: 'title' },
	                                title
	                            ),
	                            React.createElement(
	                                'section',
	                                { className: 'pop_div' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'pop_content' },
	                                    items
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex conformd' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell', onTouchEnd: this.touchcanle.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        leftpam
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return TipsDialogStyle;
	}(React.Component);

/***/ }
/******/ ]);