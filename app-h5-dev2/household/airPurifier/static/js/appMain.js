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
	'selectSpeed', //风速选择
	'startup', //开机 关机
	'selectModes', //模式选择
	'setTime', //定时关机
	'cancelTime', //取消 定时关机
	'handleSpray', //
	'cancelSpeed']);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 *
	 * Updateflag1  第6位：开关键设置
	 *				第7位：锁定键设置
	 * Updateflag2	第0位：风速键设置 8
	 * 				第1位：喷射键设置9
	 *				第2位：预约定时关机时间键（小时）10
	 *
	 *Updateflag3	第3位：灯光键 19
	 *
	 * PM25SensorAlarm   PM2.5传感器故障
	 * TempratureSensorAlarm  温度传感器故障
	 * HumiditySensorAlarm  湿度传感器故障
	 * LightSensorAlarm  光线传感器故障
	 * 
	 * */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Store = undefined;

	var _Actions = __webpack_require__(4);

	var AppData = {};
	var lockTimer = 0; // 锁定 弹框计时器，防止操作过频繁
	var controlTimer = 0; //控制页面限制用户快速点击，中间时间间隔超过600ms才发送最后一次请求

	//判断设备是否离线,是否断网 
	var isRun = function isRun() {
		var flag = true;
		if (parseInt(AppData.online) != 1 || AppData.online == undefined) {
			het.toast('设备不在线');
			flag = false;
		}
		if (parseInt(AppData.networkavailable) == 2) {
			het.toast('请检查网络');
			flag = false;
		}
		return flag;
	};

	// 判断是否关机状态
	var isShutdown = function isShutdown() {
		var flag = false;
		if (AppData.OnOffStatus == 1) {
			flag = true;
		}
		return flag;
	};
	// 判断是否锁定状态   2解锁
	var isLock = function isLock() {
		var flag = true;
		clearTimeout(lockTimer);
		lockTimer = setTimeout(function () {
			if (AppData.LockStatus === 1) {
				het.toast('当前设备处于锁定状态，请解除后在操作');
			}
		}, 600);
		if (AppData.LockStatus === 1) {
			flag = false;
		}
		return flag;
	};

	var Store = exports.Store = Reflux.createStore({
		listenables: [_Actions.Actions],
		onRepaint: function onRepaint(data) {
			//console.log(data);
			if (data.OnOffStatus) AppData.OnOffStatus = data.OnOffStatus;
			if (data.LightStatus) AppData.LightStatus = data.LightStatus;
			if (data.LockStatus) AppData.LockStatus = data.LockStatus;
			if (data.online) AppData.online = data.online;
			if (data.networkavailable) AppData.networkavailable = data.networkavailable;
			if (data.FanSpeedStatus != undefined) {
				if (data.FanSpeedStatus == 0) {
					this.trigger({ speedOff: true });
				} else {
					this.trigger({ speedOff: false });
				}
			}

			this.trigger(data);
		},
		onSend: function onSend(AppData) {
			het.send(AppData, function (data) {
				// console.log(data)
			}, function (data) {
				het.toast("命令发送失败");
			});
		},

		//按风速键时取消喷射功能
		onSelectSpeed: function onSelectSpeed(speedIndex) {
			var _this2 = this;

			clearTimeout(controlTimer);
			controlTimer = setTimeout(function () {
				if (isRun() && isShutdown() && isLock()) {
					AppData.updateFlag = het.hexUpFlag(8, 1, 4, het.hexUpFlag(9));
					AppData.FanSpeedStatus = speedIndex;
					AppData.SprayStatus = 2;
					//五档（睡眠）与灯光互斥
					if (speedIndex == "5" && AppData.LightStatus == 1) {
						_this2.trigger({ FanSpeedStatus: speedIndex, SprayStatus: 2, speedOff: false, LightStatus: 2 });
					} else {
						_this2.trigger({ FanSpeedStatus: speedIndex, SprayStatus: 2, speedOff: false });
					}
					_this2.onSend(AppData);
				}
			}, 600);
		},

		//小页  按喷射键时取消风速功能
		onHandleSpray: function onHandleSpray(isOn, speed) {
			var _this3 = this;

			clearTimeout(controlTimer);
			controlTimer = setTimeout(function () {
				if (isRun() && isShutdown() && isLock()) {
					AppData.SprayStatus = isOn;
					AppData.updateFlag = het.hexUpFlag(8, 1, 4, het.hexUpFlag(9));
					if (isOn === 1) {
						AppData.FanSpeedStatus = 0;
						_this3.trigger({ SprayStatus: isOn, speedOff: true });
					} else {
						_this3.trigger({ SprayStatus: isOn, speedOff: false, FanSpeedStatus: speed });
					}
					_this3.onSend(AppData);
				}
			}, 600);
		},
		onStartup: function onStartup(status) {
			var _this4 = this;

			clearTimeout(controlTimer);
			controlTimer = setTimeout(function () {
				if (isRun() && isLock()) {
					AppData.OnOffStatus = status;
					AppData.updateFlag = het.hexUpFlag(6);
					_this4.trigger({ OnOffStatus: status });
					_this4.onSend(AppData);
				}
			}, 600);
		},
		onSelectModes: function onSelectModes(index, isOn) {
			var _this5 = this;

			clearTimeout(controlTimer);
			controlTimer = setTimeout(function () {
				var _this = _this5;
				if (isRun()) {
					if (index == '1') {
						AppData.LockStatus = isOn;
						AppData.updateFlag = het.hexUpFlag(7);
						_this5.trigger({ LockStatus: isOn });
						_this5.onSend(AppData);
						return;
					}
					if (isShutdown() && isLock()) {
						switch (index) {
							case "2":
								AppData.updateFlag = het.hexUpFlag(10);
								_this.trigger({ timeSelect: true });
								break;
							case "3":
								//灯光与风速五档（睡眠）互斥
								AppData.LightStatus = isOn;
								AppData.updateFlag = het.hexUpFlag(19);
								if (isOn === 1 && AppData.FanSpeedStatus == 5) {
									_this.trigger({ LightStatus: isOn, FanSpeedStatus: 0, FanSpeedStatusOff: true });
								} else {
									_this.trigger({ LightStatus: isOn });
								}
								_this5.onSend(AppData);
								break;
							case "4":
								//按喷射键时取消风速设定
								AppData.SprayStatus = isOn;
								AppData.updateFlag = het.hexUpFlag(8, 1, 4, het.hexUpFlag(9));
								if (isOn === 1) {
									AppData.FanSpeedStatus = 0;
									_this.trigger({ SprayStatus: isOn, FanSpeedStatus: "0" });
								} else {
									_this.trigger({ SprayStatus: isOn });
								}
								_this5.onSend(AppData);
								break;
						}
					}
				}
			}, 600);
		},
		onCancelTime: function onCancelTime() {
			if (isRun() && isShutdown() && isLock()) {
				AppData.OffElapseTime = 0;
				this.trigger({ OffElapseTime: "0", timeSelect: false });
				this.onSend(AppData);
			}
		},
		onSetTime: function onSetTime(value) {
			if (isRun() && isShutdown() && isLock()) {
				console.log('8888888', value);
				AppData.OffElapseTime = value;
				this.trigger({ OffElapseTime: value, timeSelect: false });
				this.onSend(AppData);
			}
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

	var _Modes = __webpack_require__(7);

	var _Speed = __webpack_require__(8);

	var _TimeSelect = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	// 时钟组件


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数据
	        webDataMap: {
	            'city': 'cityName',
	            'weather': 'wtext',
	            'indoorTemp': 'Temperature',
	            'outdoorTemp': 'temp',
	            'indoorPM25': 'PM25',
	            'outdoorPM25': 'pm25',
	            'humidity': 'Humidity', //湿度
	            'lifetime': 'WorkeTime', // 滤芯使用寿命百分比(worktime/360 * 10) 距下次清洁滤网还剩多少小时(360-worktime)
	            'OnOffStatus': 'OnOffKey', // 1开机 2关机
	            'LockStatus': 'LockKey', //模式 锁定 1:是 2 ：否
	            'OffElapseTime': 'TimerOffKey', //模式：定时 大于等于1:是 0 ：否
	            'LightStatus': "LightKey", //模式：灯光 1:是 2 ：否
	            'SprayStatus': 'SprayKey', //模式 喷射 1:是 0 ：否
	            'FanSpeedStatus': 'FanSpeedKey' }
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    console.log(data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = { timeSelect: false, headerTop: isAndroid ? 55 : 64, speed: '', OffElapseTime: '' };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'pmLevel',
	        value: function pmLevel(pmValue) {
	            var level = '优';
	            if (0 < pmValue && pmValue <= 35) {
	                level = '优';
	            } else if (35 < pmValue && pmValue <= 75) {
	                level = '良';
	            } else if (75 < pmValue && pmValue <= 115) {
	                level = '轻度污染';
	            } else if (115 < pmValue && pmValue <= 150) {
	                level = '中度污染';
	            } else if (150 < pmValue && pmValue <= 250) {
	                level = '重度污染';
	            } else if (250 < pmValue && pmValue <= 500) {
	                level = '严重污染';
	            }
	            return level;
	        }
	    }, {
	        key: 'startup',
	        value: function startup(e) {
	            // let  isStartup = this.state.isStartup||this.state.OnOffStatus;
	            _Actions.Actions.startup(this);
	        }
	    }, {
	        key: 'cancelTime',
	        value: function cancelTime() {
	            //this.setState({timeSelect:false,isSettime:0});
	            _Actions.Actions.cancelTime();
	        }
	    }, {
	        key: 'setTime',
	        value: function setTime(value) {
	            _Actions.Actions.setTime(value);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            //console.log(this.state,nextState)
	            //故障判断 
	            var isUpdate = false,
	                alarmStr = '';
	            if (this.state.PM25SensorAlarm != nextState.PM25SensorAlarm) {
	                isUpdate = true;
	            }
	            if (this.state.TempratureSensorAlarm != nextState.TempratureSensorAlarm) {
	                isUpdate = true;
	            }
	            if (this.state.HumiditySensorAlarm != nextState.HumiditySensorAlarm) {
	                isUpdate = true;
	            }
	            if (this.state.LightSensorAlarm != nextState.LightSensorAlarm) {
	                isUpdate = true;
	            }
	            if (isUpdate) {
	                var index = 0;
	                if (nextState.PM25SensorAlarm == 1) {
	                    index++;
	                    alarmStr = index + " " + 'PM2.5传感器故障' + '\n';
	                }
	                if (nextState.TempratureSensorAlarm == 1) {
	                    index++;
	                    alarmStr += index + " " + '温度传感器故障' + '\n';
	                }
	                if (nextState.HumiditySensorAlarm == 1) {
	                    index++;
	                    alarmStr += index + " " + '湿度传感器故障' + '\n';
	                }
	                if (nextState.LightSensorAlarm == 1) {
	                    index++;
	                    alarmStr += index + " " + '光线传感器故障' + '\n';
	                }
	                if (alarmStr != '') {
	                    //alert('8888888'+alarmStr);
	                    het.toast('xuesheng:' + alarmStr);
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var outdoorPM25 = this.state.outdoorPM25 ? this.state.outdoorPM25 : 0,
	                indoorPM25 = this.state.indoorPM25 ? this.state.indoorPM25 : 0,
	                isStartup = this.state.OnOffStatus,
	                isLocked = this.state.LockStatus,
	                isLight = this.state.LightStatus,
	                OffElapseTime = this.state.OffElapseTime,
	                speed = this.state.FanSpeedStatus,
	                isJet = this.state.SprayStatus;

	            //console.log(isSettime);
	            return React.createElement(
	                'article',
	                { className: 'airPurifier' },
	                React.createElement(
	                    'section',
	                    { className: 'status-area' },
	                    React.createElement('header', { style: { 'paddingTop': this.state.headerTop } }),
	                    React.createElement(
	                        'ul',
	                        { className: 'statusline' },
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement('img', { src: '../static/img/ic-locate.png', className: 'locate', alt: '\u57CE\u5E02' }),
	                            this.state.city ? this.state.city : ''
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            (this.state.weather ? this.state.weather : '') + (this.state.outdoorTemp ? this.state.outdoorTemp : 0),
	                            '\u2103'
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            '\u5BA4\u5916PM2.5\uFF1A',
	                            outdoorPM25,
	                            '\uFF08',
	                            this.pmLevel(outdoorPM25),
	                            '\uFF09'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'circleInfo' },
	                        React.createElement(
	                            'ul',
	                            null,
	                            React.createElement(
	                                'li',
	                                null,
	                                '\u5BA4\u5185PM2.5\u503C'
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                this.state.indoorPM25
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                '\u6E29\u5EA6\uFF1A',
	                                this.state.indoorTemp,
	                                '\u2103 | \u6E7F\u5EA6\uFF1A',
	                                this.state.humidity,
	                                '%'
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                this.pmLevel(indoorPM25)
	                            )
	                        ),
	                        React.createElement('img', { src: '../static/img/ic-dot.png', className: 'dot', alt: '\u5706\u5708' }),
	                        React.createElement('img', { src: '../static/img/bg-dots.png', className: 'bg-dots', alt: '\u5706\u5708' })
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'startup' },
	                        React.createElement(
	                            'dd',
	                            { onTouchEnd: this.startup.bind(isStartup === 1 ? 2 : 1) },
	                            React.createElement('img', { src: '../static/img/ic-startup.png', alt: '\u5173\u673A' })
	                        ),
	                        React.createElement(
	                            'dt',
	                            null,
	                            isStartup === 1 ? '开机' : "关机"
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'control-area' },
	                    React.createElement(_Modes.Modes, { isLocked: isLocked, isSettime: OffElapseTime, isLight: isLight, isJet: isJet, isStartup: isStartup, online: (this.state.online ? this.state.online : '').toString() }),
	                    React.createElement(_Speed.Speed, { speedIndex: speed, isStartup: isStartup, online: (this.state.online ? this.state.online : '').toString() }),
	                    React.createElement(
	                        'div',
	                        { className: 'filter' },
	                        React.createElement(
	                            'dl',
	                            null,
	                            React.createElement(
	                                'dt',
	                                null,
	                                '\u6E05\u6D01\u6EE4\u7F51'
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '\u8DDD\u79BB\u4E0B\u6B21\u6E05\u6D01\u6EE4\u7F51\u8FD8\u5269',
	                                600 - (this.state.lifetime ? this.state.lifetime : 600),
	                                '\u5C0F\u65F6'
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'percent' },
	                            parseInt((this.state.lifetime ? this.state.lifetime : 0) / 600 * 100),
	                            React.createElement(
	                                'b',
	                                null,
	                                '\uFE6A'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { title: '', minuteshow: false, hourshow: true,
	                    show: this.state.timeSelect, statusname: ' ', minhour: '1', hourstep: '1', maxhour: '12',
	                    cancelClock: this.cancelTime.bind(this), submitClock: this.setTime.bind(this) })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    // 路由方式
	    // ReactDOM.render((
	    //     <Router history={hashHistory}>
	    //         <Route path="/" component={App} />
	    //     </Router>
	    // ), document.getElementById('ROOT'));
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 锁定/定时/灯光/喷射
	 * @prop {integer} 'isLocked':1,//模式 锁定 1:是 0 ：否
	 * @prop {integer}'isSettime':0,//模式：定时 1:是 0 ：否
	  * @prop {integer}'isLight':1,//模式：灯光 1:是 0 ：否
	   * @prop {integer}'isJet':1,//模式 喷射(可以同时选中多项) 1:是 0 ：否  
	 * @act  Actions.selectAny([integer])  切换模式时触发该动作
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Modes = undefined;

	var _Actions = __webpack_require__(4);

	var Modes = exports.Modes = React.createClass({
	    displayName: 'Modes',

	    timer: 0,
	    getInitialState: function getInitialState() {
	        return {
	            isLocked: this.props.isLocked,
	            isSettime: this.props.isSettime,
	            isLight: this.props.isLight,
	            isJet: this.props.isJet
	        };
	    },
	    items: function items() {
	        var isSettime = this.props.isSettime,
	            timeTip = isSettime >= 1 ? isSettime + 'h' : '',
	            items = [{ id: 1, isOn: this.props.isLocked, name: "锁定", tip: '长按3秒' }, { id: 2, isOn: isSettime, name: "定时", tip: timeTip }, { id: 3, isOn: this.props.isLight, name: "灯光" }, { id: 4, isOn: this.props.isJet, name: "喷射" }];
	        return items;
	    },
	    handlerClick: function handlerClick(e) {
	        var index = e.currentTarget.getAttribute('data-value'),
	            isOn = e.currentTarget.getAttribute('data-ison');
	        if (index == 1) {
	            e.preventDefault();
	            this.timer = setTimeout(function () {
	                _Actions.Actions.selectModes(index, isOn === "1" ? 2 : 1);
	            }, 3000);
	        } else if (index == 2) {
	            _Actions.Actions.selectModes(index, isOn);
	        } else {
	            _Actions.Actions.selectModes(index, isOn === "1" ? 2 : 1);
	        }
	    },
	    endTimer: function endTimer(e) {
	        var index = e.currentTarget.getAttribute('data-value');
	        if (index == 1) {
	            clearTimeout(this.timer);
	        }
	    },
	    render: function render() {
	        var isStartup = this.props.isStartup,
	            online = this.props.online;
	        return React.createElement(
	            'section',
	            { className: 'modes flex' },
	            this.items().map(function (o) {
	                var noDisable = false,
	                    onFlag = false;
	                if (online === '1') {
	                    if (isStartup === 1 || o.id == 1) {
	                        noDisable = true;
	                        if (o.isOn === 1 || o.id == 2 && o.isOn > 0) {
	                            onFlag = true;
	                        }
	                    }
	                }

	                return React.createElement(
	                    'dl',
	                    { key: o.id, className: (isStartup === 1 && online === '1' && o.isOn === 1 || o.id == 1 && o.isOn === 1 ? "on" : "") + " flex-cell", 'data-value': o.id, 'data-ison': o.isOn, onTouchStart: this.handlerClick, onTouchEnd: this.endTimer },
	                    React.createElement(
	                        'dd',
	                        null,
	                        React.createElement('img', { src: noDisable ? onFlag ? "../static/img/modes/ic-" + o.id + "-on.png" : "../static/img/modes/ic-" + o.id + "-off.png" : "../static/img/modes/ic-" + o.id + "-disable.png" })
	                    ),
	                    React.createElement(
	                        'dt',
	                        null,
	                        o.name
	                    ),
	                    React.createElement(
	                        'dd',
	                        null,
	                        o.tip ? o.tip : ''
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 自动/高/中/低/睡眠/
	 * 
	 * @prop {integer} speedIndex  模式索引，与id对应。取值1-5，超出范围默认为1
	 * @act  Actions.selectSpeed([integer])  切换风速时触发该动作
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Speed = undefined;

	var _Actions = __webpack_require__(4);

	var Speed = exports.Speed = React.createClass({
	    displayName: 'Speed',

	    items: [1, 2, 3, 4, 5],
	    handlerClick: function handlerClick(e) {
	        var index = e.currentTarget.getAttribute('data-value');
	        //console.log('index',index,this.props.speedIndex);
	        if (index == this.props.speedIndex) return;
	        _Actions.Actions.selectSpeed(index);
	    },
	    render: function render() {
	        var idx = this.props.speedIndex,
	            isStartup = this.props.isStartup,
	            online = this.props.online;
	        return React.createElement(
	            'section',
	            { className: 'speed flex' },
	            React.createElement(
	                'span',
	                null,
	                '\u98CE\u901F'
	            ),
	            this.items.map(function (o) {
	                return React.createElement(
	                    'dl',
	                    { key: o, className: (idx == o ? "on" : "") + " flex-cell", 'data-value': o, onTouchEnd: this.handlerClick },
	                    React.createElement(
	                        'dd',
	                        null,
	                        React.createElement('img', { src: isStartup === 1 && online === '1' ? idx == o ? "../static/img/speed/ic-" + o + "-on.png" : "../static/img/speed/ic-" + o + "-off.png" : "../static/img/speed/ic-" + o + "-disable.png" })
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});

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
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 * @update   pan
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
					// value = value<10?'0'+value:value;
					hourarr.push(value);
				}
				// maxhour = maxhour<10?'0'+maxhour:maxhour;
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
			for (var j = 0; j <= maxlength2; j++) {
				var _value = minminute + j * minutestep;
				// value = value<10?'0'+value:value;
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
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			console.log('next.show', next.show);
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
				hourindex = hourindex < 0 ? hourindex + hourarr.length : hourindex;
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
				hourindex = hourindex >= hourarr.length ? hourindex - hourarr.length : hourindex;
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
			var selecttitle = this.props.title || '';
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
							{ className: '', onTouchEnd: this.cancelclock },
							'\u5173\u95ED\u5B9A\u65F6'
						),
						React.createElement(
							'span',
							{ className: '', onTouchEnd: this.submitclock },
							'\u5F00\u542F\u5B9A\u65F6'
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
								'\u5C0F\u65F6\u540E\u5173\u673A'
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
								{ className: 'line1' },
								hourindex - 3 < 0 ? hourarr[hourarr.length - 3] : hourarr[hourindex - 3]
							),
							React.createElement(
								'span',
								{ className: 'line1' },
								hourindex - 2 < 0 ? hourarr[hourarr.length - 2] : hourarr[hourindex - 2]
							),
							React.createElement(
								'span',
								{ className: 'line2' },
								hourindex - 1 < 0 ? hourarr[hourarr.length - 1] : hourarr[hourindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								hourarr[hourindex]
							),
							React.createElement(
								'span',
								{ className: 'line2' },
								hourindex + 1 >= hourarr.length ? hourarr[hourindex - hourarr.length + 1] : hourarr[hourindex + 1]
							),
							React.createElement(
								'span',
								{ className: 'line1' },
								hourindex + 2 >= hourarr.length ? hourarr[hourindex - hourarr.length + 2] : hourarr[hourindex + 2]
							),
							React.createElement(
								'span',
								{ className: 'line1' },
								hourindex + 3 >= hourarr.length ? hourarr[hourindex - hourarr.length + 3] : hourarr[hourindex + 3]
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

/***/ }
/******/ ]);