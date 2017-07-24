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
	// var storage = window.localStorage;//

	var speed; //风速

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
	        webDataMap: {
	            'OnOffStatus': 'OnOffKey', // 1开机 2关机
	            'LightStatus': "LightKey", //模式：灯光 1:是 2 ：否
	            'SprayStatus': 'SprayKey', //模式 喷射 1:是 0 ：否
	            'FanSpeedStatus': 'FanSpeedKey', //
	            'LockStatus': 'LockKey' },
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

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = { speedOff: false };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'startup',
	        value: function startup(e) {
	            //开关机
	            _Actions.Actions.startup(this);
	        }
	    }, {
	        key: 'handleLight',
	        value: function handleLight(index) {
	            //灯光处理
	            _Actions.Actions.selectModes('3', index);
	        }
	    }, {
	        key: 'handleSpray',
	        value: function handleSpray(index, speed) {
	            //喷射处理
	            _Actions.Actions.handleSpray(index, speed);
	        }
	    }, {
	        key: 'handleSpeed',
	        value: function handleSpeed(speedIndex) {
	            //风速处理
	            if (this.state.speedOff) {
	                _Actions.Actions.selectSpeed(speedIndex);
	            } else {
	                _Actions.Actions.selectSpeed(speedIndex + 1 > 5 ? 1 : speedIndex + 1);
	            }
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            //console.log(this.state,nextState);
	            if (nextState.FanSpeedStatus != 0) {
	                speed = nextState.FanSpeedStatus;
	            } else {
	                speed = this.state.FanSpeedStatus;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var isStartup = this.state.OnOffStatus,
	                isLight = this.state.LightStatus,

	            // speed = this.state.FanSpeedStatus||1,
	            isJet = this.state.SprayStatus,
	                speedImgPath = '../static/img/btnList/2.png',
	                imgPath = '../static/img/btnList/',
	                speedName = '自动',
	                pm = this.state.PM25 ? +this.state.PM25 : 0,
	                online = this.state.online ? +this.state.online : 0,
	                OnOffStatus = this.state.OnOffStatus ? +this.state.OnOffStatus : 0,
	                modeName = '';
	            switch (+speed) {
	                case 1:
	                    speedImgPath = imgPath + '2.png';speedName = '自动';break;
	                case 2:
	                    speedImgPath = imgPath + '3.png';speedName = '高风';break;
	                case 3:
	                    speedImgPath = imgPath + '4.png';speedName = '中风';break;
	                case 4:
	                    speedImgPath = imgPath + '5.png';speedName = '低风';break;
	                case 5:
	                    speedImgPath = imgPath + '6.png';speedName = '睡眠';break;
	            }
	            if (this.state.speedOff) {
	                modeName = '喷射';
	            }

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    online == 2 ? '设备已离线' : OnOffStatus == 2 ? '关机' : modeName != '' ? modeName : speedName + "　　PM2.5:" + pm
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.startup.bind(isStartup === 1 ? 2 : 1) },
	                        React.createElement('img', { style: isStartup === 1 ? { opacity: 1 } : { opacity: 0.5 }, src: '../static/img/btnList/ic-onoff.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            isStartup === 1 ? '开机' : "关机"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleLight.bind(this, isLight === 1 ? 2 : 1) },
	                        React.createElement('img', { style: isLight === 1 && isStartup === 1 ? { opacity: 1 } : { opacity: 0.5 }, src: '../static/img/btnList/ic-light.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u706F\u5149'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleSpray.bind(this, isJet === 1 ? 2 : 1, speed) },
	                        React.createElement('img', { style: isJet === 1 && isStartup === 1 ? { opacity: 1 } : { opacity: 0.5 }, src: '../static/img/btnList/ic-spray.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u55B7\u5C04'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleSpeed.bind(this, speed) },
	                        React.createElement('img', { style: !this.state.speedOff && isStartup === 1 ? { opacity: 1 } : { opacity: 0.4 }, src: speedImgPath, alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            speedName
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

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

/***/ }
/******/ ]);