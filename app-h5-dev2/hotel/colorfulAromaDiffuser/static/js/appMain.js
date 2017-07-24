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

	var _Colors = __webpack_require__(8);

	var _SimpleSelect = __webpack_require__(11);

	var _range = __webpack_require__(12);

	var _range2 = _interopRequireDefault(_range);

	var _TimeSelect = __webpack_require__(13);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	var dataTimer = 0;

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            colorR: 255,
	            colorG: 255,
	            colorB: 255,
	            light: 0,
	            mist: 3,
	            tipsShow: true,
	            timeCloseH: 0,
	            timeCloseM: 0
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getData();
	            this.reGetData();
	        }
	    }, {
	        key: 'reGetData',
	        value: function reGetData() {
	            clearInterval(dataTimer);
	            dataTimer = setInterval(_Actions.Actions.getData, 6000);
	        }
	    }, {
	        key: 'changeSwitch',
	        value: function changeSwitch(e) {
	            e.preventDefault();
	            clearInterval(dataTimer);
	            setTimeout(this.reGetData, 5000);
	            _Actions.Actions.changeSwitch();
	        }
	    }, {
	        key: 'changeColor',
	        value: function changeColor(color, index) {
	            if (!this.getRunning()) return;
	            this.reGetData();
	            _Actions.Actions.changeColor(color, index);
	        }
	    }, {
	        key: 'changeLight',
	        value: function changeLight(value) {
	            if (!this.getRunning()) return;
	            this.reGetData();
	            _Actions.Actions.changeLight(value);
	        }
	    }, {
	        key: 'changeMist',
	        value: function changeMist(value) {
	            if (!this.getRunning()) return;
	            this.reGetData();
	            _Actions.Actions.changeMist(value);
	        }
	    }, {
	        key: 'showMistSelect',
	        value: function showMistSelect() {
	            if (!this.getRunning()) return;
	            this.setState({ mistSelectShow: true });
	        }
	    }, {
	        key: 'showClock',
	        value: function showClock() {
	            if (!this.getRunning()) return;
	            this.setState({ clockShow: true });
	        }
	    }, {
	        key: 'closeTips',
	        value: function closeTips() {
	            this.setState({ tipsShow: false });
	        }
	    }, {
	        key: 'changeClock',
	        value: function changeClock(h, m) {
	            _Actions.Actions.changeClock(m);
	            this.setState({ clockShow: false });
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            this.setState({ clockShow: false });
	        }
	    }, {
	        key: 'getRunning',
	        value: function getRunning() {
	            return !(this.state.light == 0 && this.state.mist == 3);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var isRunning = this.getRunning();
	            var cssColor = isRunning ? 'rgba(' + this.state.colorR + ', ' + this.state.colorG + ', ' + this.state.colorB + ', 1)' : 'rgba(255, 255, 255, 0)';
	            // let time = (isRunning ? this.state.presetShutdownTime : this.state.presetStartupTime) || 0;
	            var time = this.state.timeCloseH * 60 + this.state.timeCloseM;
	            var mistStrs = {
	                3: '关闭',
	                2: '一档',
	                1: '二档'
	            };
	            var mistOptions = [{ label: '关闭', value: 3 }, { label: '一档', value: 2 }, { label: '二档', value: 1 }];
	            return React.createElement(
	                'div',
	                { className: isRunning ? '' : 'all-off' },
	                React.createElement(
	                    'header',
	                    null,
	                    React.createElement(
	                        'p',
	                        { className: 'tips', style: { visibility: this.state.tips && this.state.tipsShow ? 'visible' : 'hidden' }, onTouchStart: this.closeTips.bind(this) },
	                        this.state.tips
	                    ),
	                    React.createElement(
	                        'figure',
	                        null,
	                        React.createElement('img', { src: '../static/img/pic-07.png', style: { WebkitFilter: 'drop-shadow(0px -5px 5px ' + cssColor + ')' } })
	                    ),
	                    React.createElement('a', { href: '#', onTouchStart: this.changeSwitch.bind(this), className: 'switch' })
	                ),
	                React.createElement(
	                    'h2',
	                    null,
	                    '\u989C\u8272'
	                ),
	                React.createElement(_Colors.Colors, { colorIndex: this.state.colorIndex, disabled: !isRunning, cb: this.changeColor.bind(this) }),
	                React.createElement(
	                    'div',
	                    { className: 'light-percent' },
	                    this.state.light,
	                    '%'
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex light-range-wrap' },
	                    React.createElement('i', { className: 'l-low' }),
	                    React.createElement(
	                        'div',
	                        { className: 'flex-cell' },
	                        React.createElement(_range2.default, { disabled: !isRunning, value: this.state.light, min: '0', max: '100', fnFeedback: this.changeLight.bind(this) })
	                    ),
	                    React.createElement('i', { className: 'l-high' })
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex fn-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'flex-cell', onTouchStart: this.showMistSelect.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            mistStrs[this.state.mist]
	                        ),
	                        React.createElement(
	                            'dt',
	                            null,
	                            '\u96FE\u5316'
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'flex-cell', onTouchStart: this.showClock.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            time,
	                            React.createElement(
	                                'sub',
	                                null,
	                                'min'
	                            )
	                        ),
	                        React.createElement(
	                            'dt',
	                            null,
	                            '\u5B9A\u65F6\u5173\u95ED'
	                        )
	                    )
	                ),
	                React.createElement(_SimpleSelect.SimpleSelect, { show: this.state.mistSelectShow, options: mistOptions, value: this.state.mist, cb: this.changeMist.bind(this) }),
	                React.createElement(_TimeSelect.TimeSelect, { title: '\u8BBE\u7F6E\u65F6\u95F4', defaultminute: time || 5, minuteshow: true, hourshow: false, minutestep: 1, statusname: ' ', show: this.state.clockShow,
	                    cancelClock: this.cancelClock.bind(this), minutearr: [5, 10, 30, 60, 120], submitClock: this.changeClock.bind(this) })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('香薰机');
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
	var Actions = exports.Actions = Reflux.createActions(['getData', // 获取数据
	'changeSwitch', // 开关切换
	'changeColor', // 颜色切换
	'changeLight', // 亮度切换
	'changeMist', // 喷雾切换
	'changeClock']);

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

	var _fun = __webpack_require__(6);

	var deviceId = _fun.Funs.getUrlParam('deviceId');
	var path = location.host === 'weixin.clife.cn' || location.host === '127.0.0.1' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
	location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
	'/clife-wechat/wechat/hotel'; // 正式环境
	var source = 8; // 来源
	var postUrl = path + '/device/config/set';

	var AppData = {
	    light: 0,
	    mist: 3
	};

	var isShutdown = function isShutdown() {
	    return AppData.light == 0 && AppData.mist == 3;
	};

	// 数据过滤计时器
	var dataFilterTimers = {
	    colorR: 0,
	    colorG: 0,
	    colorB: 0,
	    light: 0,
	    mist: 0,
	    timeCloseH: 0,
	    timeCloseM: 0
	};
	var lightTimer = 0; // 亮度计时器，防止操作过频繁

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
	    var time = new Date().getTime() + 20e3; // 20秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	function getRGBColorIndex() {
	    var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	    var colors = ['#ff7b7c', '#ffffff', '#fcaa6b', '#fcda6f', '#a0e674', '#59bdef', '--'];
	    var color = '#' + pad0(r.toString(16)) + pad0(g.toString(16)) + pad0(b.toString(16));
	    function pad0(hex) {
	        return hex.replace(/^\b(?=.$)/, '0');
	    }
	    return (colors.indexOf(color) || 0) + 1;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onGetData: function onGetData() {
	        var _this = this;
	        var timestamp = +new Date();
	        var url = path + '/device/data/get?deviceId=' + deviceId;
	        het.get(url, {}, function (res) {
	            // res = '{"code":0,"data":{"cumulativeWorkTimes1":2,"downFlag":255,"version":1,"colorG":189,"presetStartupTimeM":0,"_bindUserId":19166,"remainingTimeM":0,"cumulativeTime4":2,"colorR":89,"presetShutdownTimeLeftH":0,"cumulativeTime1":2,"light":100,"remainingTimeH":0,"cumulativeWorkTimes2":1,"cumulativeTime2":1,"cumulativeWorkTimes3":72,"cumulativeTime3":72,"workMode":0,"outputLoad1":255,"outputLoad2":255,"colorB":239,"presetStartupTimeH":0,"presetShutdownTimeLeftM":0,"presetShutdownTimeH":0,"color":255,"presetStartupTimeLeftH":0,"warningStatus2":0,"presetShutdownTimeM":0,"presetStartupTimeLeftM":0,"setTimeM":0,"workStatus":2,"setTimeH":0,"mist":1,"warningStatus1":0}}';
	            var json = JSON.parse(res);
	            var data = json.data;
	            if (json.code == 103005001) {
	                // 未授权，跳转授权页面
	                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
	            }
	            if (data) {
	                data.tips = '';
	                data.tipsShow = false;
	                if (data.warningStatus1 && data.warningStatus1 == 1) {
	                    data.tips = '设备已经因缺水暂停，注意加水不能超过最高刻度线';
	                    data.tipsShow = true;
	                }
	                if (data.onlineStatus && data.onlineStatus != 1) {
	                    data.tips = '设备不在线';
	                    data.tipsShow = true;
	                }
	                data.timeCloseH = data.remainingTimeH;
	                data.timeCloseM = data.remainingTimeM;
	                var fData = dataFilter(data);
	                if (fData.colorR && fData.colorG && fData.colorB) {
	                    // 处理颜色指针跳变问题
	                    fData.colorIndex = getRGBColorIndex(fData.colorR, fData.colorG, fData.colorB);
	                }
	                _this.trigger(fData);
	            } else if (json.msg) {
	                _this.trigger({ tips: json.msg, tipsShow: true });
	            }
	        });
	    },
	    onChangeSwitch: function onChangeSwitch() {
	        if (isShutdown()) {
	            // 关机
	            AppData.light = 100;
	            AppData.mist = 1;
	        } else {
	            AppData.light = 0;
	            AppData.mist = 3;
	        }
	        setDataTimer('light', 'mist');
	        this.trigger(AppData);
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                light: AppData.light,
	                mist: AppData.mist,
	                updateFlag: 0x01 | 0x02
	            })
	        };
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('调节开关成功');
	            } else {
	                dataFilterTimers['light'] = 0;
	                dataFilterTimers['mist'] = 0;
	            }
	        });
	    },
	    onChangeColor: function onChangeColor(color, index) {
	        setDataTimer('colorR', 'colorG', 'colorB');
	        this.trigger({
	            colorR: color.r,
	            colorG: color.g,
	            colorB: color.b,
	            colorIndex: index
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                colorR: color.r,
	                colorG: color.g,
	                colorB: color.b,
	                updateFlag: 0x08
	            })
	        };
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('调节颜色成功');
	            } else {
	                // dataFilterTimers['colorR'] = 0;
	                // dataFilterTimers['colorG'] = 0;
	                // dataFilterTimers['colorB'] = 0;
	            }
	        });
	    },
	    onChangeLight: function onChangeLight(value) {
	        AppData.light = parseInt(value);
	        this.trigger({ light: AppData.light });
	        clearTimeout(lightTimer);
	        lightTimer = setTimeout(function () {
	            var data = {
	                deviceId: deviceId,
	                source: source,
	                json: JSON.stringify({
	                    light: AppData.light,
	                    updateFlag: 0x02
	                })
	            };
	            setDataTimer('light');
	            het.post(postUrl, data, function (res) {
	                var d = JSON.parse(res);
	                if (d.code === 0) {
	                    console.log('调节亮度成功');
	                } else {
	                    dataFilterTimers['light'] = 0;
	                }
	            });
	        }, 600);
	    },
	    onChangeMist: function onChangeMist(value) {
	        AppData.mist = parseInt(value);
	        this.trigger({
	            mist: AppData.mist,
	            mistSelectShow: false
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                mist: AppData.mist,
	                updateFlag: 0x01
	            })
	        };
	        setDataTimer('mist');
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('调节喷雾成功');
	            } else {
	                dataFilterTimers['mist'] = 0;
	            }
	        });
	    },
	    onChangeClock: function onChangeClock(value) {
	        var minutes = parseInt(value, 10);
	        var h = Math.floor(minutes / 60);
	        var m = minutes % 60;
	        var obJson = {};
	        /*if (isShutdown()) {
	            this.trigger({
	                presetStartupTime : m
	            });
	            obJson.presetStartupTime = m;
	            obJson.updateFlag = 0x20;
	        } else {*/
	        this.trigger({
	            timeCloseH: h,
	            timeCloseM: m
	        });
	        obJson.timeCloseH = h;
	        obJson.timeCloseM = m;
	        obJson.updateFlag = 0x10;
	        // }
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify(obJson)
	        };
	        setDataTimer('timeCloseH', 'timeCloseM');
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                console.log('调节时间成功');
	            } else {
	                dataFilterTimers['timeCloseH'] = 0;
	                dataFilterTimers['timeCloseM'] = 0;
	            }
	        });
	    }
	});

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
	    }, // 公共函数模块
	    /**
	     * 格式化时间函数
	     * @param    {string}   date   日期字符串或时间戳
	     * @param    {string}   format 格式，缺省为：yyyy-MM-dd hh:mm:ss
	     * @param    {Boolean}  isUTC  是否UTC时间，如传入为UTC时间，将自动转为本地时间
	     * @return   {string}          按format格式输出日期
	     */
	    dateFormat: function dateFormat(date, format, isUTC) {
	        var timezoneOffset = 0;
	        var dateObj = new Date(date);
	        var patt = /^(?:(\d+)-(\d+)-(\d+))?\s?(?:(\d+):(\d+):(\d+))?$/;
	        var dateArr;
	        var now = new Date();
	        // IOS 解析失败时尝试手动解析
	        if (dateObj.toString() === 'Invalid Date' && typeof date === 'string') {
	            dateArr = date.match(patt) || [];
	            dateObj = new Date(dateArr[1] || now.getFullYear(), dateArr[2] - 1 || now.getMonth(), dateArr[3] || now.getDate(), dateArr[4] || now.getHours(), dateArr[5] || now.getMinutes(), dateArr[6] || now.getSeconds());
	        }
	        format = format || 'yyyy-MM-dd hh:mm:ss';
	        if (isUTC) {
	            // 处理utc时间
	            timezoneOffset = new Date().getTimezoneOffset();
	            dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset);
	        }
	        var map = {
	            'M': dateObj.getMonth() + 1, //月份 
	            'd': dateObj.getDate(), //日 
	            'h': dateObj.getHours(), //小时 
	            'm': dateObj.getMinutes(), //分 
	            's': dateObj.getSeconds(), //秒 
	            'q': Math.floor((dateObj.getMonth() + 3) / 3), //季度 
	            'S': dateObj.getMilliseconds() //毫秒 
	        };
	        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
	            var v = map[t];
	            if (v !== undefined) {
	                if (all.length > 1) {
	                    v = '0' + v;
	                    v = v.substr(v.length - 2);
	                }
	                return v;
	            } else if (t === 'y') {
	                return (dateObj.getFullYear() + '').substr(4 - all.length);
	            }
	            return all;
	        });
	        return format;
	    },
	    /**
	     * [dateFormatFull description]
	     * @param  {[type]} dateTime [时间戳]
	     * @param  {[type]} type     [“-”] 返回2016-07-30   [“month”] 返回2016-07    [“day”] 返回 日   
	     * @param  {[type]} flag     [1]  返回12：30
	     * @return {[type]}          [description]
	     */
	    dateFormatFull: function dateFormatFull(dateTime, type, flag) {
	        var d = new Date(dateTime * 1000),
	            y = d.getFullYear(),
	            m = d.getMonth() + 1,
	            day = d.getDate(),
	            h = d.getHours(),
	            mn = d.getMinutes(),
	            s = d.getSeconds(),
	            res;
	        m = m > 9 ? m : '0' + m;
	        day = day > 9 ? day : '0' + day;
	        h = h > 9 ? h : '0' + h;
	        mn = mn > 9 ? mn : '0' + mn;
	        s = s > 9 ? s : '0' + s;
	        if (type === '-') {
	            res = y + '-' + m + '-' + day;
	            if (flag) {
	                res = h + ':' + mn;
	            }
	        } else if (type === 'month') {
	            res = y + '-' + m;
	        } else if (type === 'day') {
	            res = d.getDate();
	        } else if (type === 'full') {
	            res = y + '-' + m + '-' + day + " " + h + ':' + mn;
	        }
	        return res;
	    },
	    /**
	     * [utcToLocal utc时间转换为本地时间]
	     * @param  {[type]} utc [utc 时间 格式为‘2016-06-06 12:12:12’]
	     * @param  {[type]} type [返回格式  1：时+分 ]
	     * @return {[type]}     [description]
	     */
	    utcToLocal: function utcToLocal(utc, type) {
	        var utcDay = utc.split(' '),
	            utcDate = utcDay[0].split('-'),
	            utcTime = utcDay[1].split(':'),
	            timestamp = Math.round(Date.UTC(utcDate[0], utcDate[1] - 1, utcDate[2], utcTime[0], utcTime[1], utcTime[2]) / 1000),
	            time = this.dateFormatFull(timestamp, "full");
	        if (type == 1) {
	            time = this.dateFormatFull(timestamp, "-", 1);
	        }
	        return time;
	    },
	    timestampToUtc: function timestampToUtc(timestamp, type) {
	        var d = new Date(timestamp * 1000),
	            y = d.getUTCFullYear(),
	            m = d.getUTCMonth() + 1,
	            day = d.getUTCDate(),
	            h = d.getUTCHours(),
	            mn = d.getUTCMinutes(),
	            s = d.getUTCSeconds(),
	            res;
	        m = m > 9 ? m : '0' + m;
	        day = day > 9 ? day : '0' + day;
	        h = h > 9 ? h : '0' + h;
	        mn = mn > 9 ? mn : '0' + mn;
	        s = s > 9 ? s : '0' + s;
	        if (type === '-') {
	            res = y + '-' + m + '-' + day + " " + h + ':' + mn + ':' + s;
	        }
	        return res;
	    },
	    // 设置cookies
	    setCookie: function setCookie(name, value) {
	        var Days = 30;
	        var exp = new Date();
	        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	    },
	    // 获取cookies
	    getCookie: function getCookie(name) {
	        var arr,
	            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	        if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
	    },
	    // 删除cookies
	    delCookie: function delCookie(name) {
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval = getCookie(name);
	        if (cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
	    }
	};
	module.exports = Funs;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Colors = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ColorPicker = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 7颜色选择组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer}  colorIndex 颜色索引，设置不同颜色，取值1-7
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {boolean}  disabled   是否可用，缺省为可用
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {function} cb         切换颜色时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Colors = exports.Colors = function (_React$Component) {
	    _inherits(Colors, _React$Component);

	    function Colors() {
	        _classCallCheck(this, Colors);

	        var _this = _possibleConstructorReturn(this, (Colors.__proto__ || Object.getPrototypeOf(Colors)).call(this));

	        _this.items = [1, 2, 3, 4, 5, 6];
	        // 颜色数组，注：必须6位十六进制值
	        _this.colors = ['#ff7b7c', '#ffffff', '#fcaa6b', '#fcda6f', '#a0e674', '#59bdef', '--'];
	        _this.state = {
	            colorPickerShow: false
	        };
	        return _this;
	    }

	    _createClass(Colors, [{
	        key: 'handlerClick',
	        value: function handlerClick(e) {
	            e.preventDefault();
	            if (this.props.disabled) return;
	            var index = parseInt(e.currentTarget.getAttribute('data-val'));
	            var color = this.toRGB(this.colors[index - 1]);
	            if (typeof this.props.cb === 'function') {
	                this.props.cb(color, index);
	            }
	        }
	    }, {
	        key: 'cusColorChange',
	        value: function cusColorChange(color) {
	            var index = 1;
	            this.colors[0] = '#' + pad0(color.r.toString(16)) + pad0(color.g.toString(16)) + pad0(color.b.toString(16));
	            if (typeof this.props.cb === 'function') {
	                this.props.cb(color, index);
	            }
	            function pad0(hex) {
	                return hex.replace(/^\b(?=.$)/, '0');
	            }
	        }
	    }, {
	        key: 'cusColorClick',
	        value: function cusColorClick(e) {
	            e.preventDefault();
	            if (this.props.disabled) return;
	            this.setState({
	                colorPickerShow: true
	            });
	        }
	    }, {
	        key: 'colorPickerClose',
	        value: function colorPickerClose(e) {
	            this.setState({
	                colorPickerShow: false
	            });
	        }
	    }, {
	        key: 'toRGB',
	        value: function toRGB(hexStr) {
	            var hex = hexStr.replace(/^#/, '');
	            return {
	                r: parseInt(hex.substring(0, 2), 16),
	                g: parseInt(hex.substring(2, 4), 16),
	                b: parseInt(hex.substring(4, 6), 16)
	            };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var idx = this.props.colorIndex || 1;
	            return React.createElement(
	                'section',
	                { className: 'colors flex' },
	                this.items.map(function (i) {
	                    return React.createElement(
	                        'a',
	                        { key: i, 'data-val': i, href: '#', className: (i == idx ? 'on' : '') + ' flex-cell', onTouchStart: this.handlerClick.bind(this) },
	                        React.createElement('b', { style: { backgroundColor: this.colors[i - 1] } })
	                    );
	                }.bind(this)),
	                React.createElement(
	                    'a',
	                    { 'data-val': '7', href: '#', className: (7 === idx ? 'on' : '') + ' flex-cell', onClick: this.cusColorClick.bind(this) },
	                    React.createElement('b', { className: 'c7' })
	                ),
	                React.createElement(_ColorPicker.ColorPicker, { show: this.state.colorPickerShow, cb: this.cusColorChange.bind(this), close: this.colorPickerClose.bind(this) })
	            );
	        }
	    }]);

	    return Colors;
	}(React.Component);

	;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ColorPicker = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _base64img = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 颜色拾取组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {boolean}  show    是否显示
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {function} close   关闭按钮回调函数
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {function} cb      选择完成时的回调函数
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var ColorPicker = exports.ColorPicker = function (_React$Component) {
	    _inherits(ColorPicker, _React$Component);

	    function ColorPicker() {
	        _classCallCheck(this, ColorPicker);

	        var _this = _possibleConstructorReturn(this, (ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call(this));

	        _this.wh = document.body.clientWidth * 0.6;
	        _this.state = {
	            x: _this.wh / 2 - 10,
	            y: _this.wh / 2 - 10,
	            r: 255,
	            g: 255,
	            b: 255,
	            a: 1
	        };
	        return _this;
	    }

	    _createClass(ColorPicker, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            var c = ReactDOM.findDOMNode(this.refs.canvas);
	            var cxt = c.getContext('2d');
	            var img = new Image();
	            img.src = _base64img.Base64Img;
	            img.onload = function () {
	                cxt.drawImage(img, 0, 0, _this2.wh, _this2.wh);
	            };
	        }
	    }, {
	        key: 'selectColor',
	        value: function selectColor(e) {
	            var c = ReactDOM.findDOMNode(this.refs.canvas);
	            var cxt = c.getContext('2d');
	            var offset = this.getOffset(c);
	            var x = e.targetTouches[0].pageX - offset.x;
	            var y = e.targetTouches[0].pageY - offset.y;
	            var rgba = cxt.getImageData(x, y, 1, 1).data;
	            this.setState({
	                x: x,
	                y: y,
	                r: rgba[0],
	                g: rgba[1],
	                b: rgba[2],
	                a: rgba[3] / 255
	            });
	        }
	    }, {
	        key: 'closePicker',
	        value: function closePicker(e) {
	            e.preventDefault();
	            if (typeof this.props.close === 'function') {
	                this.props.close({
	                    r: this.state.r,
	                    g: this.state.g,
	                    b: this.state.b,
	                    a: this.state.a
	                });
	            }
	        }
	    }, {
	        key: 'submitColor',
	        value: function submitColor(e) {
	            if (typeof this.props.cb === 'function') {
	                this.props.cb({
	                    r: this.state.r,
	                    g: this.state.g,
	                    b: this.state.b,
	                    a: this.state.a
	                });
	            }
	        }
	    }, {
	        key: 'getOffset',
	        value: function getOffset(dom) {
	            var xy = { x: 0, y: 0 };
	            while (dom.className != 'colorpicker' && dom.tagName != 'BODY' && dom.tagName != 'HTML') {
	                xy.x += dom.offsetLeft;
	                xy.y += dom.offsetTop;
	                dom = dom.parentNode;
	            }
	            // xy.y += dom.offsetTop;
	            xy.y += document.body.scrollTop;
	            return xy;
	        }
	        // 阻止页面滚动

	    }, {
	        key: 'stopBodyScroll',
	        value: function stopBodyScroll(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var rgba = 'rgba(' + this.state.r + ', ' + this.state.g + ', ' + this.state.b + ', ' + this.state.a + ')';
	            return React.createElement(
	                'section',
	                { className: 'colorpicker', style: { display: this.props.show ? 'block' : 'none' }, onTouchStart: this.closePicker.bind(this) },
	                React.createElement(
	                    'div',
	                    { className: 'cp-wrap', onTouchStart: this.stopBodyScroll },
	                    React.createElement(
	                        'div',
	                        { className: 'cp-hd' },
	                        React.createElement('div', { className: 'cp-preview', style: { backgroundColor: rgba } }),
	                        React.createElement(
	                            'b',
	                            { onTouchStart: this.closePicker.bind(this) },
	                            'X'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { ref: 'wrap', className: 'canvas-wrap', style: { width: this.wh, height: this.wh }, onTouchMove: this.selectColor.bind(this),
	                            onTouchStart: this.selectColor.bind(this), onTouchEnd: this.submitColor.bind(this) },
	                        React.createElement('canvas', { ref: 'canvas', width: this.wh, height: this.wh }),
	                        React.createElement('i', { style: { top: this.state.y - 10, left: this.state.x - 10 } })
	                    )
	                )
	            );
	        }
	    }]);

	    return ColorPicker;
	}(React.Component);

	;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Base64Img = exports.Base64Img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZoAAAGaCAYAAAA2BoVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QTE4OUU3OTY5MDYxMUU2QjRCQUNGMEUyNTdFODE5RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QTE4OUU3QTY5MDYxMUU2QjRCQUNGMEUyNTdFODE5RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZBMTg5RTc3NjkwNjExRTZCNEJBQ0YwRTI1N0U4MTlFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZBMTg5RTc4NjkwNjExRTZCNEJBQ0YwRTI1N0U4MTlFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+CrnoqgAAx5pJREFUeNrsvXuwLNtd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';

/***/ },
/* 11 */
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
	 * 选择组件
	 * @prop {array}    options 选择列表，例：[{label:'选项1', value:1}, {label:'选项2', value:2}, ...]
	 * @prop {other}    value   当前已选中值
	 * @prop {function} cb      回调函数
	 */
	var SimpleSelect = exports.SimpleSelect = function (_React$Component) {
	    _inherits(SimpleSelect, _React$Component);

	    function SimpleSelect() {
	        _classCallCheck(this, SimpleSelect);

	        return _possibleConstructorReturn(this, (SimpleSelect.__proto__ || Object.getPrototypeOf(SimpleSelect)).call(this));
	    }

	    _createClass(SimpleSelect, [{
	        key: 'select',
	        value: function select(e) {
	            var value = e.currentTarget.getAttribute('data-val');
	            if (typeof this.props.cb === 'function') {
	                this.props.cb(value);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'section',
	                { className: 'simple-select', style: { display: this.props.show ? 'block' : 'none' } },
	                React.createElement(
	                    'ul',
	                    { className: 'simple-select-wrap' },
	                    this.props.options.map(function (it, idx) {
	                        return React.createElement(
	                            'li',
	                            { key: idx, 'data-val': it.value, className: this.props.value == it.value ? 'selected' : '', onTouchStart: this.select.bind(this) },
	                            it.label
	                        );
	                    }.bind(this))
	                ),
	                React.createElement('div', { className: 'simple-select-mask' })
	            );
	        }
	    }]);

	    return SimpleSelect;
	}(React.Component);

	;

/***/ },
/* 12 */
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
	        var value = parseInt(e.target.value);
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
/* 13 */
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