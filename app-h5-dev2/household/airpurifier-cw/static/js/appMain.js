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
	'getData', // 获取数据
	'clockSwitch', //定时开关
	'selectTime', //选取定时时间
	'switchOpen', // 开关机
	'modelSel', //选择模式
	'timeClock', //定时倒计时
	'detection', //质量检测
	'switch', //appBtnList开关机
	'handleShakeSwitch', //appBtnList模式
	'remainTimer', //存取路由跳转的数据
	'remainMin', //倒计时差
	'getRemainMin', // 路由回来的时间
	'getRemainS0', //获取开关机
	'setTime', //倒计时
	'setClose' //倒计时关机
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

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var AppData = {};
	var OldData = {};

	var isOffline = function isOffline() {
	    return AppData.online == 2;
	};
	// 判断是否关机状态
	var isShutdown = function isShutdown() {
	    return AppData.S0 != '01';
	};
	//判断手机是否断网
	var isNetOff = function isNetOff() {

	    return AppData.networkavailable == 2;
	};

	var decToHex = function decToHex(dec) {
	    var hex = parseInt(dec).toString(16);
	    return hex.length === 1 ? '0' + hex : hex;
	};
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        var index = 0;
	        if (data.S0) AppData.S0 = data.S0;
	        if (data.S1) AppData.S1 = data.S1;
	        if (data.S4) AppData.S4 = data.S4;
	        if (data.S4) data.CD = parseInt(data.S4, 16) * 60;
	        if (data.S3) AppData.S3 = data.S3;
	        if (data.S2) {
	            AppData.S2 = data.S2;
	        }
	        if (data.deviceName) {
	            AppData.deviceName = data.deviceName;
	        }
	        if (data.S8) {
	            AppData.S8 = data.S8;
	        }
	        if (data.networkavailable) {
	            AppData.networkavailable = data.networkavailable;
	        }
	        if (data.online) AppData.online = data.online;
	        if (data.S7) AppData.S7 = data.S7;

	        AppData.S6 = data.S6 ? data.S6 : AppData.S6;
	        AppData.S5 = data.S5 ? data.S5 : AppData.S5;
	        data.S5 = data.S5 ? data.S5 : AppData.S5;
	        data.S6 = data.S6 ? data.S6 : AppData.S6;
	        // 设置计时器原点
	        if (data.S4) {
	            // 当不在主页面时，不允许刷新originPointTimer
	            if (AppData.originPointTimer && location.hash.replace(/\?.+$/, '').length > 2) {
	                data.originPointTimer = AppData.originPointTimer;
	            } else {
	                data.originPointTimer = parseInt(new Date().getTime() / 1000);
	                AppData.originPointTimer = data.originPointTimer;
	            }
	        }
	        this.trigger(data);

	        if (parseInt(data.S4) == 0 && data.S3 != 0) {
	            AppData.S0 = '02';
	            AppData.Updateflag1 = het.hexUpFlag(0, 1, 1);
	            AppData.Updateflag2 = '00';
	            het.send(AppData, function (data) {
	                // console.log(data)
	            }, function (data) {
	                het.toast("命令发送失败");
	            });
	        }
	    },

	    onGetData: function onGetData() {
	        this.trigger(AppData);
	    },
	    onSetTime: function onSetTime(m, s, ori) {
	        AppData.CD = m * 60 + s;
	        AppData.S4 = decToHex(m);
	        AppData.originPointTimer = ori;
	    },
	    onClockSwitch: function onClockSwitch(value, type) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        if (isShutdown()) {
	            return false;
	        }

	        AppData.timingMode = value;
	        if (value == 3 && type !== 'cancel') {
	            AppData.Updateflag1 = het.hexUpFlag(3, 1, 1);
	            this.trigger({ clockId: value, clockShow: value, remainTime: 0, remainTimeL: 0, remainTimeH: 0 });
	            het.send(AppData, function (data) {
	                // console.log(data)
	            }, function (data) {
	                het.toast("命令发送失败");
	            });
	        } else {
	            this.trigger({ clockId: value, clockShow: value });
	        }
	    },
	    onSelectTime: function onSelectTime(hour, minute) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            return false;
	        }
	        AppData.S3 = '0' + Number(minute) / 20;
	        AppData.S4 = decToHex(minute);
	        AppData.Updateflag1 = het.hexUpFlag(3, 1, 1);
	        AppData.Updateflag2 = '00';
	        // console.log('fffffffffffff',AppData);
	        this.trigger({ clockShow: 3, remainSec: 59, S4: '00', CD: 0 });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        // }
	    },
	    onSwitchOpen: function onSwitchOpen(S0) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            //AppData.S0 = '01';

	            this.trigger({ remainTime: 0, remainSec: 0, S2: '02', S8: AppData.S8 });
	        } else {
	            //AppData.S0 = '02';
	            this.trigger(_defineProperty({ S2: '02', remainTime: 0, remainSec: 0, S8: '01' }, 'S8', AppData.S8));
	        }
	        S0 == '02' ? (AppData.S0 = '01', AppData.S3 == '00') : AppData.S0 = '02';
	        // AppData.S2 = '01';

	        AppData.Updateflag1 = het.hexUpFlag(0, 1, 1);
	        AppData.Updateflag2 = '00';
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onModelSel: function onModelSel(value) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            return false;
	        }
	        if (value == '1') {
	            this.trigger({ mode: value, 'S1': '01' });
	        }
	        if (value == '2') {
	            this.trigger({ mode: value, 'S1': '02' });
	        }
	        if (value == '3') {
	            this.trigger({ mode: value, 'S1': '03' });
	        } else {
	            this.trigger({ mode: value });
	        }
	        AppData.S1 = '0' + value;
	        AppData.Updateflag1 = het.hexUpFlag(1, 1, 1);
	        AppData.Updateflag2 = '00';
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onDetection: function onDetection() {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            return false;
	        }
	        AppData.S2 = '01';
	        AppData.Updateflag1 = het.hexUpFlag(2, 1, 1);
	        // console.log(AppData.S7,'777777777777');
	        AppData.Updateflag2 = '00';
	        //console.log('ooooooooooooooo',AppData);
	        this.trigger({ S2: '01' });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSwitch: function onSwitch(boot) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            AppData.S0 = '01';
	            this.trigger({ S0: '01' });
	        } else {
	            AppData.S0 = '02';
	            this.trigger({ S0: '02' });
	        }
	        AppData.Updateflag1 = het.hexUpFlag(0, 1, 1);
	        AppData.Updateflag2 = '00';
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onHandleShakeSwitch: function onHandleShakeSwitch(type) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            return false;
	        }
	        if (!isShutdown()) {
	            if (type == '01') {
	                AppData.S1 = '01';
	                this.trigger({ S1: '01' });
	            }
	            if (type == '02') {
	                AppData.S1 = '02';
	                this.trigger({ S1: '02' });
	            }
	            if (type == '03') {
	                AppData.S1 = '03';
	                this.trigger({ S1: '03' });
	            }
	        }

	        AppData.Updateflag1 = het.hexUpFlag(1, 1, 1);
	        AppData.Updateflag2 = '00';
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onRemainTimer: function onRemainTimer(state, type) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            return false;
	        }
	        // Object.assign(AppData,state);
	        if (type == 'get') {
	            this.trigger(AppData);
	        } else if (type == 'set') {
	            Object.assign(AppData, state);
	        }
	    },
	    onRemainMin: function onRemainMin(lastTime, remainTime, remainSec, S0on) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            return false;
	        }
	        AppData.lastTime = lastTime;
	        AppData.remainTime = remainTime;
	        AppData.remainSec = remainSec;
	        AppData.S0 = S0on;
	        this.trigger({ lastTime: lastTime, remainTime: remainTime, remainSec: remainSec, S0: S0on });
	    },
	    onGetRemainMin: function onGetRemainMin(firstTime) {
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }

	        if (isShutdown()) {
	            return false;
	        }
	        if (!AppData.lastTime) return;
	        var time = firstTime - AppData.lastTime;
	        // console.log('time',time);
	        if (time < 0) return;
	        var sectime = parseInt(time / 1000);
	        var min = AppData.remainTime - parseInt(sectime / 60);
	        var sec = AppData.remainSec - (sectime - parseInt(sectime / 60) * 60);
	        if (sec < 0) return;
	        // console.log(time,min,sec);
	        this.trigger({ remainTime: min, remainSec: sec });
	    },
	    onGetRemainS0: function onGetRemainS0() {
	        // console.log(AppData.S0);
	        this.trigger({ S0: AppData.S0 });
	    },
	    onSetClose: function onSetClose() {
	        AppData.S0 = '02';
	        AppData.Updateflag1 = het.hexUpFlag(0, 1, 1);
	        AppData.Updateflag2 = '00';
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
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

	var _TimeSelect = __webpack_require__(7);

	var _ModeSelect = __webpack_require__(8);

	var _Strainer = __webpack_require__(9);

	var _Timer = __webpack_require__(10);

	var _reactMask = __webpack_require__(11);

	var _reactMask2 = _interopRequireDefault(_reactMask);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true,
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

	        // het.setTitle('德赛空气净化器');
	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            headerTop: isAndroid ? 73 : 64,
	            change: false
	        };

	        _Store.Store.listen(function (data) {

	            _this2.setState(data, function () {
	                // console.log('data-2',appData);
	            });
	        }); // 监听Store

	        _this2.switchOpen = _this2.switchOpen.bind(_this2);
	        _this2.componentWillUnmount = _this2.componentWillUnmount.bind(_this2);
	        _this2.submitClock = function (h, m) {
	            //定时器确定
	            // clearInterval(this.tclock);
	            _Actions.Actions.selectTime(h, m);
	            var _this = this;
	            // this.tclock = setInterval(function(){_this.timeclock()},1000);
	        }.bind(_this2);
	        _this2.cancelClock = function () {
	            //定时器取消
	            _Actions.Actions.clockSwitch(3, 'cancel');
	        };

	        _this2.detection = _this2.detection.bind(_this2);
	        _Actions.Actions.getData();

	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'switchOpen',
	        value: function switchOpen(e) {
	            var S0 = this.state.S0;
	            // if(S0 == '01') clearInterval(this.tclock);
	            // console.log('this.state.S0',this.state.S0);
	            S0 == '02' ? this.setState({ open: '01', close: '02' }) : this.setState({ open: '02', close: '01' });

	            clearInterval(this.tclocker);
	            var _this = this;
	            this.tclocker = setInterval(function () {
	                _this.timeclocker();
	            }, 3000);

	            _Actions.Actions.switchOpen(S0);
	        }
	    }, {
	        key: 'timeclocker',
	        value: function timeclocker() {
	            clearInterval(this.tclocker);

	            this.state.open == '01' ? this.setState({ open: '02' }) : this.setState({ close: '02' });
	        }
	    }, {
	        key: 'showMode',
	        value: function showMode() {

	            var ModeSelect = document.getElementById("ModeSelect").getAttribute("class");
	            // console.log(ModeSelect);
	            ModeSelect == 'Moders' ? ModeSelect = 'ModeSelect' : ModeSelect = 'Moders';
	            document.getElementById("ModeSelect").setAttribute("class", ModeSelect);
	        }
	    }, {
	        key: 'setswitch',
	        value: function setswitch(e) {

	            var type = e.currentTarget.getAttribute('data-type');
	            var value = 1;
	            _Actions.Actions.clockSwitch(value);
	        }
	    }, {
	        key: 'detection',
	        value: function detection() {

	            // let oldS8 = this.state.S8;
	            this.state.S0 == '01' ? this.setState({ classNameCheck: 'jiance ' }) : this.setState({ classNameCheck: 'jiance' });
	            //setTimeout(function(){this.setState({classNameCheck: '',S8:oldS8})}.bind(this),1200);  

	            _Actions.Actions.detection();
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _Actions.Actions.getRemainS0();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            _Actions.Actions.remainTimer(this.state, 'get');
	            // let _this = this;
	            // this.tclock = setInterval(function(){_this.timeclock()},1000);
	            var date = new Date();
	            var firstTime = date.getTime();
	            _Actions.Actions.getRemainMin(firstTime);
	        }
	        // change(){
	        //     this.setState({change:true});

	        // }

	    }, {
	        key: 'render',
	        value: function render() {
	            var clockShow = { visibility: this.state.mode == 2 ? 'visible' : 'hidden' };
	            var selectshow = this.state.clockShow == 1 || this.state.clockShow == 2 ? true : false;
	            var windType = this.state.wind || 6;
	            var modeName = '';
	            var rate = 40;

	            var disable = this.state.boot == 2 ? false : true;
	            var rangedisable = this.state.boot == 2 && windType > 0 && windType < 4 ? false : true;
	            var windStall = this.state.windStall || 1;
	            // windStall = windStall*rate>120 ? parseInt(120/rate) : windStall;
	            var shookHeadStatus = this.state.shookHead || 1;
	            var boot = this.state.boot || 1;
	            // let remainTime = this.state.remainTime===undefined? this.state.S4 : this.state.remainTime;
	            // remainTime =  remainTime　|| '- -';
	            // let remainSec = this.state.remainSec==0&&remainTime=='- -'?'-':this.state.remainSec;
	            var humidity = this.state.humidity || '80';
	            var temp = this.state.temp || '20';
	            var selectTitle = boot == 2 ? '定时关机设置' : '定时关机设置';
	            var statusname = boot == 2 ? '' : '';
	            var classNameCheck = this.state.classNameCheck;
	            var modes = this.state.modes || 'modes1';
	            var S1mode = this.state.S1;
	            var modeTitle = this.state.modeTitle || '快速';
	            if (S1mode == '01') {
	                modeTitle = '快速';
	            }
	            if (S1mode == '02') {
	                modes = 'modes2';modeTitle = '标准';
	            }
	            if (S1mode == '03') {
	                modes = 'modes3';modeTitle = '智能';
	            }
	            var grade = this.state.S8 || '01';

	            var S7 = this.state.S7 || 0;
	            if (S7) {
	                if (Number(parseInt(S7, 16)) < 11) {
	                    S7 = 0;
	                } else if (Number(parseInt(S7, 16)) > 100) {
	                    S7 = 5;
	                } else {
	                    S7 = Math.ceil(Number(parseInt(S7, 16)) / 20);
	                }
	            }
	            var indexShow = this.state.indexShow || 'indexShow';
	            var S0 = this.state.S0 || 'shutDown';
	            var cityName = this.state.cityName || '深圳';
	            var pm25 = this.state.pm25 || '30';
	            var graders = void 0;
	            var rank = void 0;
	            var S2 = this.state.S2 || '02';
	            if (grade == '01') {
	                graders = 'graders1';rank = 'rank1';grade = '良好';
	            }
	            if (grade == '02') {
	                graders = 'graders2';rank = 'rank2';grade = '较差';
	            }
	            if (grade == '03') {
	                graders = 'graders3';rank = 'rank3';grade = '很差';
	            }
	            if (grade == '04' || S2 == '01') {
	                graders = 'graders4';rank = 'rank4';grade = '检测中';
	            }
	            het.setTitle(this.state.deviceName);
	            var open = this.state.open || '02';
	            var close = this.state.close || '02';
	            if (grade == '检测中' && S1mode == '01') {
	                modes = 'modes1';
	            }
	            if (grade == '检测中' && S1mode == '02') {
	                modes = 'modes2';
	            }
	            if (grade == '检测中' && S1mode == '03') {
	                modes = 'modes3';
	            }

	            if (grade == '良好' && S1mode == '01') {
	                modes = 'modes4';
	            }
	            if (grade == '良好' && S1mode == '02') {
	                modes = 'modes5';
	            }
	            if (grade == '良好' && S1mode == '03') {
	                modes = 'modes6';
	            }

	            if (grade == '较差' && S1mode == '01') {
	                modes = 'modes7';
	            }
	            if (grade == '较差' && S1mode == '02') {
	                modes = 'modes8';
	            }
	            if (grade == '较差' && S1mode == '03') {
	                modes = 'modes9';
	            }

	            if (grade == '很差' && S1mode == '01') {
	                modes = 'modes10';
	            }
	            if (grade == '很差' && S1mode == '02') {
	                modes = 'modes11';
	            }
	            if (grade == '很差' && S1mode == '03') {
	                modes = 'modes12';
	            }
	            var S3 = this.state.S3;
	            // let S4 = parseInt(this.state.S4,16)*60;
	            var S4 = parseInt(this.state.CD);
	            // console.log('4444444444444444',S4);
	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { className: close == '01' ? 'layer-loading' : 'layer-loader' },
	                    React.createElement(
	                        'div',
	                        { className: 'icon-loading' },
	                        React.createElement(
	                            'span',
	                            null,
	                            React.createElement('img', { src: '../static/img/iconfont-loadc-white.svg', className: 'waiting-rotation' })
	                        )
	                    ),
	                    React.createElement(_reactMask2.default, null)
	                ),
	                React.createElement(
	                    'div',
	                    { className: indexShow + ' ' + 'indexMain flexBox' },
	                    React.createElement(
	                        'div',
	                        { className: 'dshead' + ' ' + graders, style: { paddingTop: this.state.headerTop } },
	                        React.createElement(
	                            'div',
	                            { className: 'rankTitle' },
	                            React.createElement(
	                                'div',
	                                { className: 'battery' + S7 + ' ' + 'rankTitle1' },
	                                React.createElement('i', null),
	                                '\u8BBE\u5907\u7535\u91CF'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'rankTitle2' },
	                                React.createElement('i', null),
	                                cityName,
	                                ' PM2.5:',
	                                pm25,
	                                ' ',
	                                React.createElement(
	                                    'i',
	                                    null,
	                                    '\u4F18'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'rank' + ' ' + rank },
	                            React.createElement('div', { className: S2 == '01' ? 'jiance jiance-animation' : '' }),
	                            React.createElement(
	                                'div',
	                                { className: 'rankCon' },
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    React.createElement(
	                                        'em',
	                                        null,
	                                        '\u5F53\u524D\u7A7A\u6C14\u7B49\u7EA7'
	                                    ),
	                                    React.createElement('br', null),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        grade
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'powerOff' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5173\u673A\u5012\u8BA1\u65F6'
	                            ),
	                            React.createElement(_Timer.Timer, { origin: this.state.originPointTimer, time: S3 == '00' ? 0 : this.state._S4 == '00' ? '00:00' : parseInt(S4), change: this.state.change })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'close', onTouchStart: this.switchOpen },
	                            React.createElement('i', null),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5173\u673A'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'dscontent flexBox' },
	                        React.createElement(
	                            'div',
	                            { className: 'grid flexBox' },
	                            React.createElement(
	                                'div',
	                                { className: 'flexBox' },
	                                React.createElement(
	                                    Link,
	                                    { to: 'strainer' },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        React.createElement(
	                                            'p',
	                                            null,
	                                            React.createElement('i', null)
	                                        ),
	                                        React.createElement(
	                                            'p',
	                                            null,
	                                            '\u6EE4\u7F51'
	                                        )
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { onTouchStart: this.showMode.bind(this), className: modes + ' flexBox' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        React.createElement('i', null)
	                                    ),
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        modeTitle
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'grid flexBox' },
	                            React.createElement(
	                                'div',
	                                { onTouchStart: this.detection.bind(this), className: 'flexBox' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        React.createElement('i', null)
	                                    ),
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        '\u8D28\u91CF\u68C0\u6D4B'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { 'data-type': 'clock', onTouchStart: this.setswitch.bind(this), className: 'flexBox' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        React.createElement('i', { rangedisable: selectshow ? true : rangedisable })
	                                    ),
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        '\u5B9A\u65F6'
	                                    )
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_ModeSelect.ModeSelect, { mode: this.state.S1 || 1, grade: grade }),
	                React.createElement(_TimeSelect.TimeSelect, { title: selectTitle, hourshow: false, minuteshow: true, hourstep: 1,
	                    minutestep: 20, defaulthour: 1, defaultminute: 20, minhour: 20, statusname: statusname, cancelClock: this.cancelClock,
	                    submitClock: this.submitClock, show: selectshow, minutearr: [20, 40, 60] }),
	                React.createElement(
	                    'div',
	                    { className: this.state.S0 == '01' ? 'shutUp' : 'shutDown' },
	                    React.createElement(
	                        'div',
	                        { className: 'startUp', onTouchStart: this.switchOpen },
	                        React.createElement('a', { href: 'javascript:' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u70B9\u51FB\u5F00\u542F'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: open == '01' ? 'layer-loading' : 'layer-loader' },
	                        React.createElement(
	                            'div',
	                            { className: 'icon-loading' },
	                            React.createElement(
	                                'span',
	                                null,
	                                React.createElement('img', { src: '../static/img/iconfont-loadc-white.svg', className: 'waiting-rotation' })
	                            )
	                        ),
	                        React.createElement(_reactMask2.default, null)
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {

	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/strainer', component: _Strainer.Strainer })
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
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell btnCan', onTouchEnd: this.cancelclock },
							'\u53D6\u6D88'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell btnSbm', onTouchEnd: this.submitclock },
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
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206'
							),
							'            '
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
					)
				)
			);
		}
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 标准风/自然风/睡眠风/智能风/采集风
	 * @prop {integer} windType  模式索引，与id对应。取值1-5，超出范围默认为6
	 * @act  Actions.selectMode([integer])  切换模式时触发该动作
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModeSelect = undefined;

	var _Actions = __webpack_require__(2);

	var ModeSelect = exports.ModeSelect = React.createClass({
	    displayName: 'ModeSelect',

	    showMode: function showMode() {
	        var ModeSelect = document.getElementById("ModeSelect").getAttribute("class");
	        ModeSelect == 'Moders' ? ModeSelect = 'ModeSelect' : ModeSelect = 'Moders';
	        document.getElementById("ModeSelect").setAttribute("class", ModeSelect);
	    },
	    modelSel: function modelSel(e) {
	        e.stopPropagation();
	        e.preventDefault();
	        var value = e.currentTarget.getAttribute('data-value');
	        _Actions.Actions.modelSel(value);
	    },
	    render: function render() {
	        var mode = this.props.mode;
	        var grade = this.props.grade;
	        return React.createElement(
	            'section',
	            { className: 'Moders', id: 'ModeSelect' },
	            React.createElement('section', { className: 'ModeBG', onTouchEnd: this.showMode }),
	            React.createElement(
	                'section',
	                { className: 'modeCon' },
	                React.createElement(
	                    'p',
	                    { className: 'modeCon-p' },
	                    '\u6A21\u5F0F'
	                ),
	                React.createElement(
	                    'ul',
	                    null,
	                    React.createElement(
	                        'li',
	                        { className: mode == 1 ? grade == '检测中' ? 'active1' : grade == '良好' ? 'active4' : grade == '较差' ? 'active7' : 'active10' : '' },
	                        React.createElement(
	                            'span',
	                            { 'data-value': '1', onTouchEnd: this.modelSel },
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement('i', null)
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5FEB\u901F'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: mode == 2 ? grade == '检测中' ? 'active2' : grade == '良好' ? 'active5' : grade == '较差' ? 'active8' : 'active11' : '' },
	                        React.createElement(
	                            'span',
	                            { 'data-value': '2', onTouchEnd: this.modelSel },
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement('i', null)
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6807\u51C6'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: mode == 3 ? grade == '检测中' ? 'active3' : grade == '良好' ? 'active6' : grade == '较差' ? 'active9' : 'active12' : '' },
	                        React.createElement(
	                            'span',
	                            { 'data-value': '3', onTouchEnd: this.modelSel },
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement('i', null)
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u667A\u80FD'
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 进度条组件
	 * @prop {boolean} rangedisable  滑动条是否可用
	 * @prop {integer} windStall  	运行速率，取值0-92
	 * @prop {integer} rate  		每档间隔值 用来确定档位范围
	 * @act  Actions.selectRate([integer])  切换档位时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Strainer = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(5);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;

	var Strainer = exports.Strainer = function (_BaseComponent) {
	  _inherits(Strainer, _BaseComponent);

	  function Strainer(props) {
	    _classCallCheck(this, Strainer);

	    het.setTitle('滤网寿命');

	    var _this = _possibleConstructorReturn(this, (Strainer.__proto__ || Object.getPrototypeOf(Strainer)).call(this, props));

	    _this.state = {};
	    _this.listenStore(_Store.Store); // 监听Store
	    //Actions.pushGuiderData(); // 请求推送向导数据
	    _Actions.Actions.getData();
	    _this.getArc = _this.getArc.bind(_this);
	    return _this;
	  }

	  _createClass(Strainer, [{
	    key: 'skip',
	    value: function skip(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      het.toast('het://skip_buy_strainer');
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var rect = this.refs.remainCon.getBoundingClientRect();
	      this.canvasWidth = rect.width;
	      this.canvasHeight = rect.height;
	      this.setState({ canvasWidth: this.canvasWidth, canvasHeight: this.canvasHeight }, function () {
	        var life = parseInt(_this2.state.S5, 16) * 256 + parseInt(_this2.state.S6, 16) || 600;
	        _this2.getArc(life);
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(nextProps, nextState) {
	      var life = parseInt(this.state.S5, 16) * 256 + parseInt(this.state.S6, 16) || 600;

	      this.getArc(life);
	    }
	  }, {
	    key: 'getArc',
	    value: function getArc(life) {
	      var c = this.refs.circle;
	      var ctx = c.getContext("2d");

	      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	      ctx.beginPath();
	      ctx.strokeStyle = "#fff";
	      ctx.lineWidth = 12;
	      ctx.arc(this.canvasWidth / 2, this.canvasHeight / 2, this.canvasHeight / 2 - 6, 0 * Math.PI, life / 600 * 2 * Math.PI);
	      ctx.stroke();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var life = parseInt(this.state.S5, 16) * 256 + parseInt(this.state.S6, 16) || 600;
	      var remain = 600 - life;
	      // let remainCon2,remainCon3,remainCon3Class;
	      // if(remain <= 300){remainCon2 = 0; remainCon3Class = 'noChange';remainCon3 = 180+360 * remain/600;}
	      // if(remain > 300){remainCon3Class = 'change';remainCon3 = 180; remainCon2 = 360 * (remain-300)/600;}
	      return React.createElement(
	        'section',
	        { className: 'strBody' },
	        React.createElement(
	          'div',
	          { className: 'remain' },
	          React.createElement(
	            'div',
	            { className: 'remainCon', ref: 'remainCon', style: { border: '0.9rem solid rgb(110,186,226)' } },
	            React.createElement(
	              'p',
	              null,
	              '\u5269\u4F59\u6EE4\u7F51\u5BFF\u547D'
	            ),
	            React.createElement(
	              'p',
	              null,
	              React.createElement(
	                'span',
	                { className: 'remainConSpan' },
	                life
	              ),
	              '\u5C0F\u65F6'
	            )
	          ),
	          React.createElement('canvas', { ref: 'circle', className: 'arc', width: this.state.canvasWidth, height: this.state.canvasHeight })
	        )
	      );
	    }
	  }]);

	  return Strainer;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 倒计时显示组件
	 * @prop    time 传入一个十进制的时间参数，如120min
	 * @author  tomy
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Timer = undefined;

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var Timer = exports.Timer = React.createClass({
		displayName: 'Timer',

		getInitialState: function getInitialState() {
			return {
				time: 0,
				timer: null
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间
			this.timerInit(this.props);
		},
		componentWillUnmount: function componentWillUnmount(next) {
			//console.log('卸载定时器状态'+this.state.timer)
			//需要路由才能触发
			clearInterval(this.state.timer);
		},
		timerInit: function timerInit(next) {
			var _this = this;

			//console.log('当前定时器状态'+this.state.timer)
			var t = parseInt(next.time);
			next.change == true && (t = 0);
			var ori = next.origin || parseInt(new Date().getTime() / 1000);
			// console.log(next.origin, ori);
			var time = function time() {
				if (t > 0) {
					var now = parseInt(new Date().getTime() / 1000);
					// t--;
					t -= now - ori;
					ori = now;
					var rest = 0;
					var h = Math.floor(t / 3600);
					rest = t % 3600;
					var m = Math.floor(rest / 60);
					rest = rest % 60;
					var s = Math.floor(rest);
					h = h < 10 ? '0' + h : h;
					m = m < 10 ? '0' + m : m;
					s = s < 10 ? '0' + s : s;
					if (t < 0) {
						_this.setState({ h: '', m: '00:', s: '00', t: 0 });
					} else {
						_this.setState({ h: h, m: m, s: s, t: t });
					}
					//console.log('m',m,'s',s);
					_Actions.Actions.setTime(m, s, ori);
				} else if (t <= 0) {

					clearInterval(_this.state.timer);
					_this.setState({ h: '', m: '00:', s: '00', t: 0 });
					_Actions.Actions.setClose();
					//het.toast('预约完成');
					//if(callback){callback()}
				}
			};

			if (t == 0 || t == false) {
				clearInterval(this.state.timer);
				this.setState({ h: '', m: '00:', s: '00', t: 0 });
			} else {
				this.state.timer = setInterval(time, 1000);
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			// next.time!=this.props.time
			// console.log(next.time, this.props.time, next.origin, 'hhhhhhhhhhhhhhh');
			if (next.time == 0) {
				clearInterval(this.state.timer);
				this.setState({ h: '', m: '', s: '', t: 0 });
			}
			if (Math.abs(parseInt(next.time || 0) - parseInt(this.props.time || 0)) > 59) {
				clearInterval(this.state.timer);
				this.timerInit(next);
			}
			if (next.change == true) {
				clearInterval(this.state.timer);
				this.timerInit(next);
			}
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'timer', style: { fontSize: '16px', height: '1.6rem', color: '#fff' } },
				React.createElement(
					'span',
					null,
					this.state.m || '- -'
				),
				this.state.t === 0 || this.state.t == null ? '' : React.createElement(
					'span',
					null,
					':'
				),
				React.createElement(
					'span',
					null,
					this.state.s
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
	var Mask = React.createClass({
	    displayName: 'Mask',
	    // 栏目管理弹窗遮罩
	    propTypes: {
	        opacity: React.PropTypes.number, // 透明度
	        zIndex: React.PropTypes.number },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            opacity: 50,
	            zIndex: 100
	        };
	    },

	    render: function render() {
	        var opacity = this.props.opacity;
	        var zIndex = this.props.zIndex;
	        var style = {
	            width: '100%',
	            height: '100%',
	            position: 'fixed',
	            left: 0,
	            top: 0,
	            opacity: opacity / 100,
	            filter: 'alpha(opacity=' + opacity + ')',
	            backgroundColor: 'black',
	            zIndex: zIndex
	        };
	        return React.createElement('div', { style: style });
	    }
	});

	exports.default = Mask;

/***/ }
/******/ ]);