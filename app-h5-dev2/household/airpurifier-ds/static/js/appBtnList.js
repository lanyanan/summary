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

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store

	        _this.handleSwitch = _this.handleSwitch.bind(_this);
	        _this.handleShakeSwitch = _this.handleShakeSwitch.bind(_this);

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleSwitch',
	        value: function handleSwitch(e) {
	            //处理开关机事件
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            var S0 = this.state.S0;
	            console.log('2222222222222', S0);
	            _Actions.Actions.switch(S0);
	        }
	    }, {
	        key: 'handleShakeSwitch',
	        value: function handleShakeSwitch(e) {
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            var type = e.currentTarget.getAttribute('data-type');
	            var S0 = this.state.S0;
	            var S1 = this.state.S1;
	            if (type != S1) {
	                _Actions.Actions.handleShakeSwitch(type);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var S0 = this.state.S0;
	            var S1 = this.state.S1;
	            var online = this.state.online;
	            console.log(S0, S1);
	            return React.createElement(
	                'div',
	                null,
	                online == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    S0 == '01' ? '开机' : '关机  ' + '   当前无模式',
	                    S1 == '01' && S0 == '01' ? '  快速模式' : S1 == '02' && S0 == '01' ? '  标准模式' : S1 == '03' && S0 == '01' ? '  智能模式' : ''
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchStart: this.handleSwitch },
	                        React.createElement('img', { src: S0 == '01' ? "../static/img/btnlist/kaiji1.png" : "../static/img/btnlist/kaiji2.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            S0 == '01' ? '开机' : '关机'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '01', className: 'flex-cell', onTouchStart: this.handleShakeSwitch },
	                        React.createElement('img', { src: S1 == '01' || S0 == '02' ? "../static/img/btnlist/kuaisu2.png" : "../static/img/btnlist/kuaisu1.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5FEB\u901F'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '02', className: 'flex-cell', onTouchStart: this.handleShakeSwitch },
	                        React.createElement('img', { src: S1 == '02' || S0 == '02' ? "../static/img/btnlist/biaozhun2.png" : "../static/img/btnlist/biaozhun1.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6807\u51C6'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '03', className: 'flex-cell', onTouchStart: this.handleShakeSwitch },
	                        React.createElement('img', { src: S1 == '03' || S0 == '02' ? "../static/img/btnlist/zhineng2.png" : "../static/img/btnlist/zhineng1.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u667A\u80FD'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
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

/***/ }
/******/ ]);