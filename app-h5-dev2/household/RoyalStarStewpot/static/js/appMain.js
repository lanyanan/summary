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
	'local', 'selectMode', 'cancelSelect', 'submitSelect', 'launchMode', 'cancel']);

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

	var appData = {};
	//    {id:0,name:'待机'},
	//{id:1,name:'大骨汤'},
	//{id:2,name:'婴儿粥'},
	//{id:3,name:'煲仔饭',heatinghour:0,heatingmin:15},
	//{id:4,name:'营养饭',heatinghour:0,heatingmin:16},
	//{id:5,name:'营养汤',heatinghour:0,heatingmin:18},
	//{id:6,name:'老火汤',heatinghour:0,heatingmin:22},
	//{id:7,name:'乌鸡汤',heatinghour:0,heatingmin:24},
	//{id:8,name:'老鸭汤',heatinghour:0,heatingmin:35},
	//{id:9,name:'八宝粥',heatinghour:1,heatingmin:0},
	//{id:10,name:'五谷粥',heatinghour:0,heatingmin:20},
	//{id:11,name:'砂锅粥',heatinghour:0,heatingmin:20},
	//{id:12,name:'隔水炖',heatinghour:0,heatingmin:20},
	//{id:13,name:'药膳',heatinghour:0,heatingmin:20},
	//{id:14,name:'甜品',heatinghour:0,heatingmin:20},
	//{id:15,name:'盐焗',heatinghour:0,heatingmin:20},
	//{id:16,name:'焖烧',heatinghour:0,heatingmin:20},
	//{id:17,name:'保温',heatinghour:0,heatingmin:20},
	//{id:18,name:'云菜单',heatinghour:0,heatingmin:20},
	var modeArray = [{ id: 0, name: '待机' }, { id: 1, name: '待机' }, { id: 2, name: '营养汤', functimeset: 70, minTime: 45, maxTime: 120 }, { id: 3, name: '八宝粥', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 4, name: '药膳', functimeset: 60, minTime: 45, maxTime: 300 }, { id: 5, name: '老火汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 6, name: '五谷粥', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 7, name: '甜品', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 8, name: '乌鸡汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 9, name: '砂锅粥', functimeset: 60, minTime: 45, maxTime: 120 }, { id: 10, name: '盐焗', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 11, name: '老鸭汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 12, name: '隔水炖', functimeset: 60, minTime: 45, maxTime: 120 }, { id: 13, name: '焖烧', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 14, name: '大骨汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 15, name: '婴儿粥', functimeset: 60, minTime: 60, maxTime: 120 }, { id: 16, name: '煲仔饭', functimeset: 45, minTime: 0, maxTime: 0 }, { id: 17, name: '营养饭', functimeset: 35, minTime: 0, maxTime: 0 }, { id: 18, name: '保温', functimeset: 0, minTime: 0, maxTime: 0 }];

	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        return '设备已离线';
	    }
	    return false;
	};
	// 数据过滤计时器
	var dataFilterTimers = {
	    AppointmentOrHeat: 0
	};

	// 返回过滤后的数据
	function dataFilter(data) {
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    return result;
	}

	// 设置过滤器过期时间
	function setDataTimer() {
	    var time = new Date().getTime() + 20e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {
	        //缓存数据到appData里，协议定义中文>_<，中转一下字段发送
	        //console.log('appData data:',data);
	        var data = dataFilter(datas);
	        //console.log("onRepaint data====>"+JSON.stringify(data));
	        appData.modeArray = modeArray;
	        //运行数据
	        //当前模式
	        if (data.function != undefined) appData.mode = data.function, appData.modeName = modeArray[data.function].name;
	        //预约设定时间
	        if (data.ordertimehour != undefined) appData.reservehour = data.ordertimehour;
	        if (data.ordertimemin != undefined) appData.reservemin = data.ordertimemin;
	        //预约剩余时间
	        if (data.orderfreehour != undefined) appData.surplusreservehour = data.orderfreehour;
	        if (data.orderfreemin != undefined) appData.surplusreservemin = data.orderfreemin;
	        //功能设定时间
	        if (data.functimeset != undefined) appData.heatingTime = data.functimeset;
	        //功能剩余时间
	        if (data.functimefree != undefined) appData.surplusHeatingTime = data.functimefree;
	        //当前温度
	        if (data.temperature != undefined) appData.curTemp = data.temperature;
	        //离线&故障
	        if (data.online) appData.online = data.online; //1在线 2 离线
	        if (data.networkavailable) appData.networkavailable = data.networkavailable; //1可用 2不可用
	        if (data.soaktimehour) appData.soaktimehour = data.soaktimehour; //保温时间（小时）
	        if (data.soaktimeminute) appData.soaktimeminute = data.soaktimeminute; //保温时间（分钟）
	        //传感器故障
	        if (data.sensorflag != undefined) appData.error = data.sensorflag;
	        //烹饪阶段  1预约  2加热
	        if (data.AppointmentOrHeat != undefined) appData.AppointmentOrHeat = data.AppointmentOrHeat;
	        //console.log('appData',appData);
	        this.trigger(appData);
	    },
	    onLocal: function onLocal(data) {
	        this.trigger(appData);
	    },
	    onSelectMode: function onSelectMode(data) {
	        console.log('onSelectMode------------', data);
	        this.trigger(data);
	    },

	    //时间控件的取消
	    onCancelSelect: function onCancelSelect(data) {
	        this.trigger({ selectshow: false });
	        this.trigger({ openSubscribeClock: false });
	    },
	    onSubmitSelect: function onSubmitSelect(h, m, where, selectMode) {
	        console.log('onSubmitSelect------------', h, m, where, selectMode);
	        var selectArray = {};
	        switch (parseInt(where)) {
	            //预约时间
	            case 0:

	                if (parseInt(m) % 60 == 0) {
	                    selectArray.ordertimehour = parseInt(h) + parseInt(m) / 60;
	                    selectArray.ordertimemin = 0;
	                } else {
	                    selectArray.ordertimehour = parseInt(h);
	                    selectArray.ordertimemin = parseInt(m);
	                }

	                if (selectArray.ordertimehour >= 24) {
	                    selectArray.ordertimehour = 24;
	                    selectArray.ordertimemin = 0;
	                } else if (selectArray.ordertimehour == 0 && selectArray.ordertimemin == 30) {
	                    selectArray.ordertimehour = 1;
	                    selectArray.ordertimemin = 0;
	                }

	                break;
	            //加热时间
	            case 1:
	                //加热时间选择h为分钟数的值

	                selectArray.runtime = parseInt(h) * 60 + parseInt(m);
	                if (selectArray.runtime > modeArray[selectMode].maxTime) {
	                    selectArray.runtime = modeArray[selectMode].maxTime;
	                }

	                break;
	        }
	        this.trigger(selectArray);
	        console.log('selectArray------------', selectArray, modeArray[selectMode].maxTime);
	    },
	    onLaunchMode: function onLaunchMode(data) {
	        //置位字段加入计算，其他的按协议或约定发送
	        //let updateFlag = het.hexUpFlag(1, 2, 2,het.hexUpFlag(2, 1, 2,het.hexUpFlag(3, 1, 2)));

	        //硬件预约时间的概念是 所有工作完成时间,app的预约概念是  等待工作开始的时间.
	        //所以处理传给硬件的预约时间   预约时间+加热时间
	        //console.log('ordertimehour,ordertimemin,runtime',typeof(data.ordertimehour),typeof(data.ordertimemin),data.runtime);

	        //let _surplusreservehour = data.ordertimehour;
	        //let _surplusreservemin = data.ordertimemin;
	        //if(data.ordertimehour!=0||data.ordertimemin!=0){
	        //    console.log('&1111');
	        //    if(data.runtime>=60){
	        //        data.ordertimehour=data.ordertimehour +parseInt(data.runtime/60);
	        //        data.ordertimemin = data.ordertimemin+ data.runtime%60;
	        //        console.log('&&&&&&&&&&&&&',data.ordertimehour,data.ordertimemin);
	        //    }else{
	        //        console.log('&2222');
	        //        data.ordertimemin = data.ordertimemin+ data.runtime;
	        //    }
	        //}

	        var updateFlag = void 0;
	        if (data.ordertimehour == 0 && data.ordertimemin == 0) {
	            updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 2, 2));
	        } else {
	            updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2, het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 2, 2))));
	        }
	        data.updateFlag = updateFlag;
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        setDataTimer('AppointmentOrHeat');
	        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
	        appData.mode = data.function;
	        appData.modeName = modeArray[data.function].name;
	        ////预约剩余时间
	        appData.surplusreservehour = data.ordertimehour;
	        appData.surplusreservemin = data.ordertimemin;
	        ////功能剩余时间
	        appData.surplusHeatingTime = data.runtime;
	        if (appData.mode != 1 && appData.mode != 0 && appData.mode != 18) {
	            if (appData.surplusreservehour != 0 || appData.surplusreservemin != 0) {
	                appData.AppointmentOrHeat = 1;
	            } else {
	                appData.AppointmentOrHeat = 2;
	            }
	        } else {
	            appData.AppointmentOrHeat = 0;
	        }
	        this.trigger(appData);
	        this.trigger({ selectshow: false });
	        this.trigger({ openSubscribeClock: false });
	        console.log("appDataappDataappDataappDataappDataappData", data, appData);
	        console.log("Store/// surplusreservehour,surplusreservemin,AppointmentOrHeat", appData.surplusreservehour, pData.surplusreservemin, appData.AppointmentOrHeat);
	    },
	    //取消之前选择的模式
	    onCancel: function onCancel(data) {
	        var updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2, het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 2, 2))));
	        data.updateFlag = updateFlag;
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        console.log('取消', data);
	        //协议定义为拼音不便阅读，映射一遍，存到全局变量里trigger，物理返回键和回退操作都调用了local方法重新请求了一次缓存数据
	        appData.mode = data.function;
	        appData.modeName = '模式';
	        appData.AppointmentOrHeat = 0;
	        appData.reservehour = data.ordertimehour;
	        appData.reservemin = data.ordertimemin;
	        appData.surplusreservehour = data.ordertimehour;
	        appData.surplusreservemin = data.ordertimemin;
	        appData.heatingTime = data.runtime;
	        this.trigger(appData);
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

	var _FirstPage = __webpack_require__(7);

	var _FirstPage2 = _interopRequireDefault(_FirstPage);

	var _SettingPage = __webpack_require__(8);

	var _Alert = __webpack_require__(11);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            onoff: 1, //开关机状态 1关机 2开机
	            online: 1, //是否在线 1在线 2不在线
	            //故障数据计时器，防止一直刷，故障弹窗一直弹
	            countErrror: 1
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.local();
	        _this.slide = _this.slide.bind(_this);
	        _this.cancel = _this.cancel.bind(_this);
	        //子组件更改父组件字段
	        _this.childSetState = _this.childSetState.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            het.toast("chealth_potmode_save");
	        }
	    }, {
	        key: 'slide',
	        value: function slide() {
	            //alert('slide');
	            console.log("进入模式");
	            //if(this.state.onoff!=2)return;
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            //het.toast('hide_navigation_bar');
	            het.toast("chealth_potmode_set");
	            window.location.href = '#/settingPage';
	        }
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            if (this.state.mode != 18 && this.state.surplusreservehour == 0 && this.state.surplusreservemin == 0) {
	                this.setState({ isShowAlert: true });
	            } else {
	                _Actions.Actions.cancel({
	                    function: 1,
	                    runtime: 0,
	                    ordertimehour: 0,
	                    ordertimemin: 0
	                });
	            }
	        }
	    }, {
	        key: 'childSetState',
	        value: function childSetState(state, fn) {
	            var _this2 = this;

	            //预约中直接取消
	            setTimeout(function () {
	                _this2.setState({ isShowAlert: state.isShowAlert });
	                state.sure && _Actions.Actions.cancel({
	                    function: 1,
	                    runtime: 0,
	                    ordertimehour: 0,
	                    ordertimemin: 0
	                });
	            }, 200);
	        }
	    }, {
	        key: 'liveError',
	        value: function liveError() {
	            //console.log("liveError------------------------------------",this.state.online,this.state.networkavailable,this.state.error);
	            if (this.state.online == 2) {
	                return '设备与APP已断开连接！';
	            }
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            if (this.state.error == 2) {
	                //传感器开路
	                return '传感器开路';
	            }
	            if (this.state.error == 3) {
	                //传感器短路
	                return '传感器短路';
	            }
	            if (this.state.error == 4) {
	                //传感器温度高温（超过190度）
	                return '传感器温度高温（超过190度)';
	            }
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var title = '取消提醒';
	            var message = '主人，停止工作可能会损失食材，确定要这么做吗？';
	            //设备故障自动弹出(干烧，高温保护，开路，短路)，且只弹一次
	            //console.log("进入进入进入进入countErrror",this.state.errtext,this.state.error);
	            if (this.state.countErrror != (this.state.error != undefined ? this.state.error : 1)) {
	                this.state.countErrror = this.state.error;
	                var errtext = void 0;
	                if (this.state.error == 2) {
	                    //传感器开路
	                    errtext = '传感器开路';
	                }
	                if (this.state.error == 3) {
	                    //传感器短路
	                    errtext = '传感器短路';
	                }
	                if (this.state.error == 4) {
	                    //传感器温度高温（超过190度）
	                    errtext = '传感器温度高温（超过190度)';
	                }

	                het.toast('{"title":"' + errtext + '故障", "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}');
	            }

	            console.log('this.state.online', this.state.online);
	            var operate = {
	                //故障&&离线
	                online: this.state.online != undefined ? this.state.online : 1,
	                error: this.state.error != undefined ? this.state.error : 1,

	                ////控制数据
	                modeName: this.state.modeName,
	                mode: this.state.mode != undefined ? this.state.mode : 1,
	                reservehour: this.state.reservehour != undefined ? this.state.reservehour : '',
	                reservemin: this.state.reservemin != undefined ? this.state.reservemin : '',
	                heatingTime: this.state.heatingTime != undefined ? this.state.heatingTime : 0,
	                surplusreservehour: this.state.surplusreservehour != undefined ? this.state.surplusreservehour : '',
	                surplusreservemin: this.state.surplusreservemin != undefined ? this.state.surplusreservemin : '',
	                surplusHeatingTime: this.state.surplusHeatingTime != undefined ? this.state.surplusHeatingTime : '',
	                soaktimehour: this.state.soaktimehour != undefined ? this.state.soaktimehour : 0,
	                soaktimeminute: this.state.soaktimeminute != undefined ? this.state.soaktimeminute : 0,
	                AppointmentOrHeat: this.state.AppointmentOrHeat != undefined ? this.state.AppointmentOrHeat : 0

	            };
	            return React.createElement(
	                'main',
	                null,
	                React.createElement(_FirstPage2.default, { operate: operate, slide: this.slide, cancel: this.cancel }),
	                this.state.isShowAlert ? React.createElement(_Alert2.default, { title: title, message: message, childSetState: this.childSetState }) : ''
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('荣事达电炖锅');
	    //// 无路由方式
	    //ReactDOM.render(<App />, document.getElementById('ROOT'));
	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/settingPage', component: _SettingPage.SettingPage })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 7 */
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
	 * Created by ben on 2016/12/5.
	 */
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;
	var DevPicture = exports.DevPicture = React.createClass({
	    displayName: 'DevPicture',
	    render: function render() {
	        return React.createElement('section', { className: 'app_bgimghg' });
	    }
	});

	//<img src="../static/img/dev-screen01.jpg"/>  app_bgimgHG  dev-screen  app_bgimgHG

	var FirstPage = function (_React$Component) {
	    _inherits(FirstPage, _React$Component);

	    function FirstPage(props) {
	        _classCallCheck(this, FirstPage);

	        var _this = _possibleConstructorReturn(this, (FirstPage.__proto__ || Object.getPrototypeOf(FirstPage)).call(this, props));

	        _this.state = {};

	        return _this;
	    }

	    _createClass(FirstPage, [{
	        key: 'render',
	        value: function render() {
	            //传值
	            var operate = this.props.operate;
	            var mode = operate.mode;
	            var online = operate.online;
	            //let reservehour = operate.reservehour;
	            //let reservemin = operate.reservemin;
	            var surplusreservehour = operate.surplusreservehour;
	            var surplusreservemin = operate.surplusreservemin;
	            var surplusHeatingTime = operate.surplusHeatingTime;
	            var reserveEnd = surplusreservehour == 0 && surplusreservemin == 0 ? false : true;
	            var soaktimehour = operate.soaktimehour;
	            var soaktimeminute = operate.soaktimeminute;
	            var error = operate.error;
	            var AppointmentOrHeat = operate.AppointmentOrHeat;

	            //故障
	            var errorText = void 0;
	            var errorCss = void 0;
	            //console.log("error",error);
	            if (error != 1) {
	                errorCss = 'errorLabon';
	                if (error == 2) {
	                    errorText = '传感器开路';
	                } else if (error == 3) {
	                    errorText = '传感器短路';
	                } else if (error == 4) {
	                    errorText = '传感器温度高温（超过190度)';
	                }
	            } else {
	                errorCss = 'errorLaboff';
	            }

	            //工作状态Label
	            var workingStatusCss = void 0;
	            var workingLab = void 0;
	            //console.log('-----------------------AppointmentOrHeat----------',AppointmentOrHeat);

	            //if(mode ==1||mode==0){
	            //    workingStatusCss = "working-status green";
	            //    workingLab= '待机中';
	            //}else if(mode ==18){
	            //    workingLab = '保温中';
	            //    workingStatusCss = "working-status orange";
	            //}else{
	            //    if(reserveEnd){
	            //        workingLab= '预约中';
	            //        workingStatusCss = "working-status green";
	            //    }else{
	            //        workingLab = '加热中';
	            //        workingStatusCss = "working-status orange";
	            //    }
	            //}

	            console.log('FirstPage AppointmentOrHeat', AppointmentOrHeat);
	            if (AppointmentOrHeat == 1) {
	                workingLab = '预约中';
	                workingStatusCss = "working-status green";
	            } else if (AppointmentOrHeat == 2) {
	                workingLab = '加热中';
	                workingStatusCss = "working-status orange";
	            } else {
	                if (mode == 18) {
	                    workingLab = '保温中';
	                    workingStatusCss = "working-status orange";
	                } else {
	                    workingStatusCss = "working-status green";
	                    workingLab = '待机中';
	                }
	            }

	            //工作状态时长
	            var workingTextCss = mode == 0 || mode == 1 ? 'workingText off' : 'workingText on';
	            var workingTime = void 0;
	            var workStatusLab = void 0;
	            if (mode == 18) {

	                if (soaktimehour < 10) {
	                    soaktimehour = "0" + soaktimehour;
	                }
	                if (soaktimeminute < 10) {
	                    soaktimeminute = "0" + soaktimeminute;
	                }
	                console.log('soaktimehoursoaktimehour', soaktimehour, soaktimeminute);
	                workStatusLab = '保温时长 ' + soaktimehour + ":" + soaktimeminute;
	            } else {
	                workingTime = surplusHeatingTime == 0 ? "" : surplusHeatingTime + '分钟';
	                workStatusLab = "加热剩余时长" + workingTime;
	            }

	            //圆形按钮
	            var roundCss = mode == 0 || mode == 1 ? "dev-round on" : "dev-round";
	            var switchModePic = mode == 0 || mode == 1 ? 'url(../static/img/m-1-on.png) no-repeat center center' : 'url(../static/img/m-' + mode + '-off.png) no-repeat center center';
	            var ModeText = mode == 0 || mode == 1 ? "设置模式" : operate.modeName;
	            var liveModeSet = mode == 0 || mode == 1 ? this.props.slide : '';
	            //预约工作状态时长
	            var subscribeTextCss = void 0;
	            //console.log('surplusreservehour,mode',surplusreservehour,surplusreservemin,mode);
	            if (AppointmentOrHeat == 1) {
	                subscribeTextCss = 'subscribeText';
	                //if(surplusHeatingTime>60){
	                //    surplusreservehour=surplusreservehour +parseInt(surplusHeatingTime/60);
	                //    surplusreservemin = surplusreservemin+ surplusHeatingTime%60;
	                //}else{
	                //    surplusreservemin = surplusreservemin+ surplusHeatingTime%60;
	                //}
	            } else {
	                subscribeTextCss = 'subscribeText off';
	            }

	            var subscribeTime = surplusreservehour == 0 ? surplusreservemin == 0 ? '' : surplusreservemin + '分钟' : surplusreservemin == 0 ? surplusreservehour + '小时' : surplusreservehour + '小时' + surplusreservemin + '分钟';
	            //console.log('surplusHeatingTime,surplusreservehour,surplusreservemin,subscribeTime',surplusHeatingTime,surplusreservehour,surplusreservemin,subscribeTime);
	            //取消
	            var cancelCss = mode != 0 && mode != 1 ? 'cancel on show' : 'cancel off hide';
	            var cancelEvent = mode == 0 || mode == 1 ? '' : this.props.cancel;

	            //设备不在线
	            //let onlineHint = online==2?'dev-offline slide-up':'dev-offline slide-down';
	            var onlineHint = online == 2 ? 'dev-offline show' : 'dev-offline hide';

	            return React.createElement(
	                'div',
	                { className: 'first-page' },
	                React.createElement(DevPicture, null),
	                React.createElement(
	                    'section',
	                    { className: 'dev-operate' },
	                    React.createElement(
	                        'h3',
	                        { className: 'errorLab' },
	                        React.createElement(
	                            'span',
	                            { className: errorCss },
	                            '\u6545\u969C\u63D0\u793A:',
	                            errorText
	                        )
	                    ),
	                    React.createElement(
	                        'h4',
	                        { className: workingStatusCss },
	                        React.createElement(
	                            'span',
	                            null,
	                            workingLab
	                        )
	                    ),
	                    React.createElement(
	                        'h3',
	                        { className: workingTextCss },
	                        workStatusLab
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'dev-1' },
	                        React.createElement(
	                            'div',
	                            { className: roundCss, onTouchStart: liveModeSet },
	                            React.createElement('i', { style: { background: switchModePic } }),
	                            React.createElement(
	                                'h5',
	                                null,
	                                ModeText
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'h3',
	                        { className: subscribeTextCss },
	                        subscribeTime,
	                        '\u540E\u7ED3\u675F'
	                    ),
	                    React.createElement(
	                        'figure',
	                        { className: cancelCss, onClick: cancelEvent },
	                        '\u53D6\u6D88'
	                    ),
	                    React.createElement(
	                        'figure',
	                        { className: onlineHint },
	                        '主人您的设备不在线哦~!'
	                    )
	                )
	            );
	        }
	    }]);

	    return FirstPage;
	}(React.Component);

	exports.default = FirstPage;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingPage = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _TimeSelect = __webpack_require__(9);

	var _Loading = __webpack_require__(10);

	var _Alert = __webpack_require__(11);

	var _Alert2 = _interopRequireDefault(_Alert);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ben on 2016/12/6.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	/**
	 * Created by ben on 2016/11/15.
	 */


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	var appData = {};

	var modeArray = [
	//{id:0,name:'待机'},
	//{id:1,name:'待机'},
	{ id: 2, name: '营养汤', functimeset: 70, minTime: 45, maxTime: 120 }, { id: 3, name: '八宝粥', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 4, name: '药膳', functimeset: 60, minTime: 45, maxTime: 300 }, { id: 5, name: '老火汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 6, name: '五谷粥', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 7, name: '甜品', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 8, name: '乌鸡汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 9, name: '砂锅粥', functimeset: 60, minTime: 45, maxTime: 120 }, { id: 10, name: '盐焗', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 11, name: '老鸭汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 12, name: '隔水炖', functimeset: 60, minTime: 45, maxTime: 120 }, { id: 13, name: '焖烧', functimeset: 60, minTime: 30, maxTime: 120 }, { id: 14, name: '大骨汤', functimeset: 90, minTime: 45, maxTime: 120 }, { id: 15, name: '婴儿粥', functimeset: 60, minTime: 60, maxTime: 120 }, { id: 16, name: '煲仔饭', functimeset: 45, minTime: 0, maxTime: 300 }, { id: 17, name: '营养饭', functimeset: 35, minTime: 0, maxTime: 300 }, { id: 18, name: '保温', functimeset: 0, minTime: 0, maxTime: 300 }];

	var SettingPage = exports.SettingPage = function (_BaseComponent) {
	    _inherits(SettingPage, _BaseComponent);

	    function SettingPage(props) {
	        _classCallCheck(this, SettingPage);

	        var _this = _possibleConstructorReturn(this, (SettingPage.__proto__ || Object.getPrototypeOf(SettingPage)).call(this, props));

	        _this.state = {
	            show: 0,
	            boot: 0,
	            function: 2
	        };
	        // 监听Store
	        _this.listenStore(_Store.Store);
	        _this.handleBack = _this.handleBack.bind(_this);
	        _this.selectMode = _this.selectMode.bind(_this);
	        _this.launchMode = _this.launchMode.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        _this.cancelClock = _this.cancelClock.bind(_this);
	        _this.openHeatingClock = _this.openHeatingClock.bind(_this);
	        _this.openSubscribeClock = _this.openSubscribeClock.bind(_this);
	        _this.childSetState = _this.childSetState.bind(_this);

	        return _this;
	    }

	    _createClass(SettingPage, [{
	        key: 'handleBack',
	        value: function handleBack() {
	            history.back();
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            //未传任何参数，trigger返回一个假值，关闭控件
	            _Actions.Actions.cancelSelect();
	            //console.log('关闭')
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            //传入选择控件选中的小时数组和分钟数组
	            var where = this.state.boot;
	            var selectMode = this.state.function;
	            _Actions.Actions.submitSelect(h, m, where, selectMode);
	            //console.log('选中的值',h,m);
	            this.setState({
	                selectshow: false,
	                openSubscribeClock: false
	            });
	        }
	        //选择模式

	    }, {
	        key: 'selectMode',
	        value: function selectMode(e) {
	            console.log('进入模式选择方法');

	            var selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
	            var items = modeArray /*|| this.state.modeArray?this.state.modeArray:[]*/;
	            //console.log('selectMode = '+selectMode);
	            //console.log('items[selectMode-2]',items[selectMode-2]);
	            //console.log('runtime',items[selectMode-2].functimeset);
	            //TimeSelect.setFunciton(selectMode);

	            appData.selectArray = {};
	            appData.selectArray = {
	                function: selectMode,
	                ordertimehour: 0,
	                ordertimemin: 0,
	                runtime: items[selectMode - 2].functimeset
	            };
	            //选择模式的默认参数用于本地维护，若发送到APP，用对应协议字段维护，会导致控件被不停隐藏，无法选中时间
	            _Actions.Actions.selectMode(appData.selectArray);
	        }
	    }, {
	        key: 'openSubscribeClock',
	        value: function openSubscribeClock(e) {
	            console.log('选择预约时间');
	            if (this.state.function != 18) {
	                //let where = parseInt(e.currentTarget.getAttribute('data-seat'));
	                this.setState({
	                    openSubscribeClock: true,
	                    boot: 0
	                });
	            }
	        }
	    }, {
	        key: 'openHeatingClock',
	        value: function openHeatingClock(e) {
	            console.log('选择加热时间方法');
	            if (this.state.function != 18 && this.state.function != 16 && this.state.function != 17) {
	                //let where = parseInt(e.currentTarget.getAttribute('data-seat'));
	                this.setState({
	                    selectshow: true,
	                    boot: 1 });
	            }
	        }
	    }, {
	        key: 'launchMode',
	        value: function launchMode(e) {
	            var _this2 = this;

	            console.log('进入改变模式');
	            //方式1 获取存到全局变量中的选中参数  VS  方式2 获取绑定到dom中的选中参数
	            e.preventDefault();
	            var _function = this.state.function != undefined ? this.state.function : 2;
	            var _ordertimehour = this.state.ordertimehour != undefined ? this.state.ordertimehour : 0;
	            var _ordertimemin = this.state.ordertimemin != undefined ? this.state.ordertimemin : 0;
	            var _runtime = this.state.runtime != undefined ? this.state.runtime : 70;

	            var orderTime = _ordertimehour * 60 + _ordertimemin;
	            console.log('_ordertimehour,_ordertimemin', _ordertimehour, _ordertimemin);
	            //预约时间小于运行时间的时候,直接启动
	            if (orderTime <= _runtime && (_ordertimehour != 0 || _ordertimemin != 0)) {
	                this.setState({ isShowAlert: true });
	            } else {
	                appData.sendArray = {
	                    //工作模式
	                    function: _function,
	                    //预约时间
	                    ordertimehour: _ordertimehour,
	                    ordertimemin: _ordertimemin,
	                    runtime: _runtime
	                };
	                //if(this.state.selectHeatinghour==undefined&&this.state.selectHeatingmin==undefined){
	                //    appData.sendArray.selectHeatinghour = 1;
	                //}
	                //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%',appData.sendArray);
	                _Actions.Actions.launchMode(appData.sendArray);

	                var me = this;
	                this.setState({
	                    show: true
	                });
	                setTimeout(function () {
	                    _this2.setState({
	                        show: false
	                    });
	                }, 2000);
	                setTimeout(function () {
	                    window.history.back();
	                    //history.back();
	                }, 1500);
	            }
	        }
	    }, {
	        key: 'childSetState',
	        value: function childSetState(state, fn) {
	            var _this3 = this;

	            //预约中直接取消
	            var _function = this.state.function != undefined ? this.state.function : 2;
	            var _ordertimehour = 0;
	            var _ordertimemin = 0;
	            var _runtime = this.state.runtime != undefined ? this.state.runtime : 70;
	            appData.sendArray = {
	                //工作模式
	                function: _function,
	                //预约时间
	                ordertimehour: _ordertimehour,
	                ordertimemin: _ordertimemin,
	                runtime: _runtime
	            };
	            this.setState({ isShowAlert: state.isShowAlert });
	            if (state.sure) {
	                _Actions.Actions.launchMode({
	                    function: _function,
	                    //预约时间
	                    ordertimehour: _ordertimehour,
	                    ordertimemin: _ordertimemin,
	                    runtime: _runtime
	                });
	                var me = this;
	                this.setState({
	                    show: true
	                });
	                setTimeout(function () {
	                    _this3.setState({
	                        show: false
	                    });
	                }, 2000);
	                setTimeout(function () {
	                    window.history.back();
	                    //history.back();
	                }, 1500);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'nav ios' : 'nav android';

	            var selectMode = this.state.function ? this.state.function : 2;

	            //let items = this.state.modeArray?this.state.modeArray:[];//拉取刷新第一个icon需要点击才能加载
	            var items = {};
	            items = modeArray;

	            //预约时间
	            var selectReservehour = this.state.ordertimehour != undefined ? this.state.ordertimehour : 0;
	            var selectReservemin = this.state.ordertimemin != undefined ? this.state.ordertimemin : 0;
	            var selectHeatingmin = this.state.runtime != undefined ? parseInt(this.state.runtime) : selectMode == 18 ? 0 : 70;
	            var selectReserveTxt = selectReservehour == 0 ? selectReservemin == 0 ? '' : selectReservemin + '分钟' : selectReservemin == 0 ? selectReservehour + '小时' : selectReservehour + '小时' + selectReservemin + '分钟';
	            var selectHeatingText = void 0;
	            //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%selectHeatingmin',selectHeatingmin);
	            if (selectHeatingmin / 60 >= 1) {
	                selectHeatingText = parseInt(selectHeatingmin / 60) + '小时' + (selectHeatingmin % 60 == 0 ? '' : selectHeatingmin % 60 + '分钟');
	            } else {

	                selectHeatingText = selectHeatingmin == 0 ? '' : selectHeatingmin + '分钟';
	            }

	            //选择控件参数
	            var boot = this.state.boot !== '' ? this.state.boot : false;
	            var selectshow = this.state.selectshow ? this.state.selectshow : false;
	            var openSubscribeClock = this.state.openSubscribeClock ? this.state.openSubscribeClock : false;
	            var selecttitle = ['预约时间', '加热时间'][boot];
	            var statusshow = [1, 0][boot];
	            var hourshow = [true, true][boot];
	            var minuteshow = [true, true][boot];
	            //最大小时
	            //最大最小时间
	            var maxTime = items[selectMode - 2].maxTime;
	            var minTime = items[selectMode - 2].minTime;
	            //let HotTimeArr = [0,1,2,3,4,5,6,7,8,9,10,11];
	            //let minArr;
	            //let maxArr;
	            //if(minTime<60){
	            //    minArr = 0;
	            //}else{
	            //    minArr = 1;
	            //}
	            //maxArr = maxTime/60;
	            //if(selectMode!=16&&selectMode!=17){
	            //    HotTimeArr = HotTimeArr.slice(HotTimeArr.indexOf(minArr),HotTimeArr.indexOf(maxArr)+1);
	            //}
	            //console.log('maxTimemaxTime:',maxTime,minTime,HotTimeArr);

	            //let minminuteSelect;
	            //if(selectMode==7||selectMode==10||selectMode==13){
	            //    minminuteSelect=30;
	            //}else if(selectMode==16||selectMode==17||selectMode==15){
	            //    minminuteSelect=0;
	            //}else{
	            //    minminuteSelect=45;
	            //
	            //}
	            //console.log("minminuteSelect@@@@@@@@@@@@@@@@",selectMode,minminuteSelect);

	            //let maxhour = [14,8][boot];
	            //let maxmin = [30,60][boot];
	            //let minhour = [1,1][boot];
	            //let minminute = [0,minminuteSelect][boot==undefined?0:boot];
	            //let hourstep = [1,1][boot];
	            //let minutestep = [30,1][boot];
	            //let hourunit = '小时';
	            //let minuteunit = '分钟';
	            //let defaulthour = 0;
	            //let defaultminute = 0;
	            //let hourarray = [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],HotTimeArr][boot];
	            //let ArrayInit = true;//是否重置控件，以下判断防止选择中被数据流跳变
	            //if(this.state.selectShow==false){
	            //    ArrayInit= [true, true][boot];
	            //}else{
	            //    ArrayInit= [false, false][boot];
	            //}
	            //let statusname = ["后结束","开启"][boot];
	            //console.log("minminuteminminuteminminute",minminute);
	            var HeatingClockShow = this.state.function == 16 || this.state.function == 17 || this.state.function == 18 ? { opacity: .5 } : { opacity: 1 };

	            //直接启动提醒
	            var title = '取消提醒';
	            var message = '预约时间完成时间小于加热时间,直接进入工作模式？';

	            return React.createElement(
	                'section',
	                { className: 'setting-page' },
	                React.createElement(
	                    'nav',
	                    { className: navigation },
	                    React.createElement('i', { className: 'back', onTouchStart: this.handleBack }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u6A21\u5F0F'
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: 'flex mode-items' },
	                    items.map(function (o) {
	                        return React.createElement(
	                            'dd',
	                            { className: 'mode' + (o.id == selectMode ? ' on' : ''),
	                                'data-mode': o.id,
	                                onClick: this.selectMode,
	                                style: { 'display': o.id == 0 ? 'none' : 'auto', 'backgroundImage': 'url(../static/img/m-' + o.id + (o.id == selectMode ? '-on' : '-off') + '.png)' }, key: o.id },
	                            o.name
	                        );
	                    }.bind(this))
	                ),
	                React.createElement(
	                    'dl',
	                    { className: 'flex set', 'data-seat': '0', onTouchStart: this.openSubscribeClock, style: this.state.function != 18 ? { opacity: 1 } : { opacity: .5 } },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u9884\u7EA6\u7ED3\u675F\u65F6\u95F4'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            selectReserveTxt
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: 'flex set', 'data-seat': '1', onTouchStart: this.openHeatingClock, style: HeatingClockShow },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u52A0\u70ED\u65F6\u95F4'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            selectHeatingText
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'h2',
	                    { className: 'toggle-mode', onTouchStart: this.launchMode },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u542F\u52A8'
	                    )
	                ),
	                React.createElement(_Loading.Loading, { show: this.state.show }),
	                React.createElement(_TimeSelect.TimeSelect, {
	                    show: openSubscribeClock,
	                    title: '预约时间',
	                    statusshow: 1,

	                    hourshow: true,
	                    hourstep: 1,
	                    hourunit: '小时',
	                    minhour: 1,
	                    maxhour: 23,

	                    minuteshow: true,
	                    minutestep: 30,
	                    minuteunit: '分钟',
	                    minminute: 0,
	                    maxmin: 30,

	                    defaulthour: 0,
	                    defaultminute: 0,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    hourarray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
	                    ArrayInit: false,
	                    statusname: "后结束"
	                }),
	                React.createElement(_TimeSelect.TimeSelect, {
	                    show: selectshow,
	                    title: '加热时间',
	                    statusshow: 0,

	                    hourshow: false,
	                    hourstep: 1,
	                    hourunit: '小时',
	                    minhour: 1,
	                    maxhour: 8,

	                    minuteshow: true,
	                    minutestep: 15,
	                    minuteunit: '分钟',
	                    minminute: minTime //minminuteSelect
	                    , maxmin: maxTime,

	                    defaulthour: 0,
	                    defaultminute: 0,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    hourarray: [0],
	                    ArrayInit: true,
	                    statusname: '开启'
	                }),
	                this.state.isShowAlert ? React.createElement(_Alert2.default, { title: title, message: message, childSetState: this.childSetState }) : ''
	            );
	        }
	    }]);

	    return SettingPage;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 9 */
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
	 * @prop {boolean} ArrayInit 是否更新可选数组
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
				timeDisplay: false,
				resetTimer: null
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || 60;
			var minhour = parseInt(next.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || 1;
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
			if (next.defaulthour !== undefined) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = parseInt(next.maxmin) || 60;
			var minminute = parseInt(next.minminute) || 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
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
			console.log("hourstep,minhour,maxhour,ArrayInit", next.hourstep != this.props.hourstep, next.minhour != this.props.minhour, next.maxhour != this.props.maxhour, next.ArrayInit === true);
			//更新时间可选值数组
			//||next.minminute!=this.props.minminute||next.maxmin!=this.props.maxmin
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.ArrayInit === true) {
				console.log("重新进入了timearrInit");
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 1;
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
			var value = (yvalue - oldy) / 1.72; //获取滑动距离，px为单位，但是要转换为百分比，所以除以1.72当范围大于20的时候，算作一格，负数一样
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
				var hourValue = this.state.hourarr[0];
				var minuteValue = this.state.minutearr[0];
				var me = this;
				me.setState({
					hourtime: hourValue,
					minutetime: minuteValue,
					hourindex: 0,
					minuteindex: 0
				});
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			if (typeof this.props.submitClock === 'function') {
				this.props.submitClock(this.state.hourtime, this.state.minutetime);
				var hourValue = this.state.hourarr[0];
				var minuteValue = this.state.minutearr[0];
				var me = this;
				me.setState({
					hourtime: hourValue,
					minutetime: minuteValue,
					hourindex: 0,
					minuteindex: 0
				});
				/*//不让用户看到重置的过程，呵呵哒
	    this.state.resetTimer && clearTimeout(this.state.resetTimer);
	    this.state.resetTimer = setTimeout(()=>{
	    me.setState({
	    hourindex:0,
	    minuteindex:0
	    });
	    console.log('10000');
	    },2000);*/
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var _React$createElement;

			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusshow = this.props.statusshow || false;
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
			var hourunit = this.props.hourunit || '时';
			var minuteunit = this.props.minuteunit || '分';
			minuteindex = hourindex == 14 ? 0 : minuteindex;
			//visibility:this.state.timeDisplay?"initial":"hidden" visibility这个属性在华为某些机型下居然hidden不掉...，呵呵哒
			return React.createElement(
				'section',
				(_React$createElement = { ref: 'selecter', style: { display: this.state.timeDisplay ? 'block' : 'none', opacity: this.state.showOpacity } }, _defineProperty(_React$createElement, 'ref', 'timeSelect'), _defineProperty(_React$createElement, 'className', 'timeSelect'), _React$createElement),
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
								{ style: { left: 4 + '%' }, className: statusshow ? 'status show' : 'status' },
								'电炖锅将在'
							),
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 38 + '%' : 56 + '%', display: hourshow ? 'inline-block' : 'none' } },
								hourunit
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								minuteunit
							),
							React.createElement(
								'span',
								{ className: statusshow ? 'status show' : 'status' },
								'后结束' || statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 30 + '%' : 45 + '%', display: hourshow ? 'block' : 'none' } },
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
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? 'block' : 'none', left: hourshow ? 58 + '%' : 40 + '%' } },
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
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 菊花
	 * @prop {boolean} show  是否显示loading动画
	 * @prop {string}  info  显示文案信息，可选
	 * @author   tomy
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Loading = exports.Loading = React.createClass({
		displayName: 'Loading',

		getInitialState: function getInitialState() {
			return {
				show: false,
				info: '请耐心等待，正在准备联动设备...'
			};
		},
		render: function render() {
			var show = this.props.show;
			var showOpacity = show ? 1 : 0;
			var showInfo = this.props.info || this.state.info;
			return React.createElement(
				'section',
				{ ref: 'loading', className: 'loading', style: { visibility: show ? "initial" : "hidden", opacity: showOpacity } },
				React.createElement('figure', null),
				React.createElement(
					'figure',
					{ className: 'loading-flower' },
					React.createElement(
						'span',
						null,
						showInfo
					)
				)
			);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var Alert = React.createClass({
		displayName: 'Alert',

		propTypes: {
			isShowTitle: React.PropTypes.bool, // 是否显示标题
			title: React.PropTypes.string, // 提示对话框上显示的标题内容
			message: React.PropTypes.string, // 提示对话框上显示的内容
			btnCancel: React.PropTypes.string, //提示对话框取消按钮显示的内容
			btnSure: React.PropTypes.string, // 提示对话框上确认按钮显示的内容
			onAnimationLeave: React.PropTypes.func // 提示对话框上关闭后的回调函数
		},
		getInitialState: function getInitialState() {
			return {
				animationClassName: 'animation-alert-enter',
				opacity: 1
			};
		},
		getDefaultProps: function getDefaultProps() {
			return {
				isShowTitle: true,
				title: '提示',
				message: '请添加内容',
				btnCancel: '取消',
				btnSure: '确定',
				onAnimationLeave: function onAnimationLeave() {}
			};
		},

		animationType: 'enter', //自定义对象属性，用以维护动画显隐
		animationEnd: function animationEnd() {
			if (this.animationType == 'enter') {
				this.animationType = 'leave';
				this.setState({ opacity: 1 });
			} else {
				this.animationType = 'enter';
				//this.setState({opacity: 0});
				/*,()=>{
	   	this.props.onAnimationLeave()
	   }*/
			}
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			//onAnimationEnd react 0.14版本不支持标签上的直接量写法onAnimationEnd={this.animationEnd}
			this.refs['cancel'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false });
			}, false);

			this.refs['sure'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false, sure: true });
			}, false);

			this.refs['wrapper'].addEventListener('webkitAnimationEnd', function () {
				_this.animationEnd();
			}, false);
		},
		btnTouchClose: function btnTouchClose(e) {
			this.setState({ animationClassName: 'animation-alert-leave', close: 1 });
		},
		render: function render() {
			var _innerBox, _style;

			var style = (_style = {
				wrapper: {
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: '-webkit-box',
					WebkitBoxAlign: 'center',
					WebkitBoxPack: 'center',
					background: 'rgba(0,0,0,0.5)',
					opacity: this.state.opacity
				},
				innerBox: (_innerBox = {
					width: '86%',
					maxHeight: '60%',
					borderRadius: '5px',
					boxSizing: 'border-box',
					WebkitBoxSizing: 'border-box',
					background: 'rgba(255,255,255,1)',
					padding: '14px 0 0'
				}, _defineProperty(_innerBox, 'borderRadius', '4px'), _defineProperty(_innerBox, 'boxShadow', '0 0 40px rgba(0,0,0,0.4)'), _innerBox),
				title: {
					padding: '0 17px 5px',
					color: 'black',
					fontSize: '18px',
					fontWeight: 'bold',
					textAlign: 'center'
				},
				message: {
					margin: '0 17px 14px'
				},
				text: {
					margin: 0,
					fontSize: '16px',
					lineHeight: '26px',
					wordBreak: 'break-all',
					color: 'rgba(60,60,60,1)'
				},
				btnWrapperSingle: {
					height: '48px',
					textAlign: 'center',
					borderTop: '1px solid #e2e2e4'
				},
				btnWrapperAll: {
					height: '48px',
					lingHeight: '48px',
					textAlign: 'center',
					borderTop: '1px solid #e2e2e4'
				}
			}, _defineProperty(_style, 'btnWrapperAll', {
				before: {
					content: '',
					height: '100%',
					width: '1px'
				}
			}), _defineProperty(_style, 'btnCancel', {
				width: '50%',
				border: '0',
				background: 'rgba(255,255,255,1)',
				borderRadius: '5px',
				color: '#000',
				fontSize: '17px',
				fontWeight: '700',
				outline: 'none',
				lineHeight: '48px',
				verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			}), _defineProperty(_style, 'btnSure', {
				width: '50%',
				border: '0',
				borderRadius: '5px',
				background: 'rgba(255,255,255,1)',
				color: '#3285ff',
				fontSize: '17px',
				fontWeight: '700',
				outline: 'none',
				lineHeight: '48px',
				verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			}), _style);
			var btnWrapperName = '';
			var animationClassName = this.state.animationClassName;
			var title = this.props.isShowTitle ? React.createElement(
				'h1',
				{ style: style.title },
				this.props.title
			) : null;

			return React.createElement(
				'div',
				{ style: style.wrapper, className: animationClassName, ref: 'wrapper', onAnimationEnd: this.animationEnd },
				React.createElement(
					'div',
					{ style: style.innerBox },
					title,
					React.createElement(
						'div',
						{ style: style.message },
						React.createElement(
							'p',
							{ style: style.text },
							this.props.message
						)
					),
					React.createElement(
						'div',
						{ className: 'two-btn-wrapper' },
						React.createElement('input', { type: 'button', ref: 'cancel', value: this.props.btnCancel, style: style.btnCancel, onTouchStart: this.btnTouchClose }),
						React.createElement('input', { type: 'button', ref: 'sure', value: this.props.btnSure, style: style.btnSure, onTouchStart: this.btnTouchClose })
					)
				)
			);
		}
	});

	exports.default = Alert;
	//                      

/***/ }
/******/ ]);