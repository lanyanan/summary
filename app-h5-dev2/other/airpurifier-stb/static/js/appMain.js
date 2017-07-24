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

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _Clock = __webpack_require__(8);

	var _Modes = __webpack_require__(9);

	var _PM = __webpack_require__(10);

	var _Alarm = __webpack_require__(11);

	var _Speed = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	var domain = het.getHost();
	// const domain = 'http://api.clife.cn';


	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var weatherUrl = domain + '/v1/web/env/weather/clife/now?city=ip',
	                //天气
	            getRunUrl = domain + '/v1/device/data/get',
	                // 获取设备运行数据接口 
	            getCtrlUrl = domain + '/v1/device/config/get',
	                // 获取设备控制数据接口 
	            getOnlineUrl = domain + '/v1/device/getDeviceInfo',
	                // 获取设备基本信息 
	            isAndroid = !!(navigator.userAgent.indexOf('Android') + 1),
	                data = { appType: isAndroid ? 1 : 2 };
	            this.lxClock = setInterval(function () {
	                _Actions.Actions.getData(getRunUrl);
	                //Actions.getData(getCtrlUrl);//不刷控制数据 减少跳变的频率
	            }, 5000);

	            _Actions.Actions.getData(getOnlineUrl, 0, data);
	            _Actions.Actions.getData(getRunUrl, 0);
	            _Actions.Actions.getData(getCtrlUrl, 0);
	            _Actions.Actions.getData(weatherUrl, 1);
	        }
	    }, {
	        key: 'childlock',
	        value: function childlock() {
	            het.toast('童锁状态下无法控制设备');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var modeIndex = this.state.work ? this.state.work : '';
	            var location = this.state.cityName ? this.state.cityName : '';
	            var weather = this.state.wtext ? this.state.wtext : '';
	            var online = this.state.online ? this.state.online : 1;
	            var lock = this.state.childLock ? this.state.childLock : 1;

	            var indoorTemp = this.state.currentTemp ? this.state.currentTemp : '',
	                //室内温度
	            outdoorTemp = this.state.temp ? this.state.temp : '',
	                //室外温度
	            currentHumidity = this.state.currentHumidity ? this.state.currentHumidity : '',
	                //运行数据当前湿度
	            thirstWarn = this.state.thirstWarn ? this.state.thirstWarn : '',
	                //运行数据缺水状态
	            thirstVoice = this.state.thirstVoice ? this.state.thirstVoice : '',
	                //缺水报警开关
	            strong = this.state.leave ? this.state.leave : '',
	                //强效状态
	            wind = this.state.wind ? this.state.wind : '',
	                //风速状态
	            pmLow = this.state.pmLow || '未知',
	                //室内pm低位
	            pmHigh = this.state.pmHigh,
	                //室内pm高位
	            pmOut = this.state.pm25 || '未知',
	                //室外pm
	            bookTime = this.state.reservationTime ? this.state.reservationTime : ''; //预约时间


	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { id: 'panel-scroller', style: { display: typeof this.state.boot === 'undefined' || this.state.boot == 1 ? "none" : "block" } },
	                    React.createElement(
	                        'section',
	                        null,
	                        React.createElement(
	                            'section',
	                            { className: "startupface " + (typeof this.state.boot === 'undefined' || this.state.boot == 1 ? "slide-down" : "slide-up") },
	                            React.createElement(_PM.PM, { location: location, weather: weather, outdoorTemp: outdoorTemp, thirstWarn: thirstWarn,
	                                humidity: currentHumidity, marker: this.state.marker,
	                                indoorTemp: indoorTemp, PMOutdoor: pmOut, pmLow: pmLow, pmHigh: pmHigh, lock: lock }),
	                            React.createElement('div', { id: 'childlock', style: { display: lock == 2 ? 'block' : 'none' }, onTouchEnd: this.childlock.bind(this) }),
	                            React.createElement(_Modes.Modes, { modeIndex: modeIndex, strong: strong }),
	                            React.createElement(_Speed.Speed, { speedIndex: wind }),
	                            React.createElement(_Alarm.Alarm, { thirstVoice: thirstVoice }),
	                            React.createElement(_Clock.Clock, { online: online, bookTime: bookTime })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { style: { display: this.state.boot == 1 ? "block" : "none" } },
	                    React.createElement(
	                        'div',
	                        { className: "shutdownface " + (typeof this.state.boot === 'undefined' || this.state.boot == 1 ? "slide-up" : "slide-down"), style: { 'paddingTop': this.state.headerTop } },
	                        React.createElement('div', { className: 'pic' }),
	                        React.createElement('a', { href: 'javascript:', className: 'power', onTouchEnd: _Actions.Actions.switch })
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('生泰宝空气净化器');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    het.config({
	        debugMode: 'print', // 打印调试数据
	        appId: '30590', //用华为openlife的appid跟secret
	        appSecret: '98889238ed6e441aaf9b0691b017695f'
	    });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(3);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(5);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['getData', //轮询获取运行数据
	'repaint', // 接收到数据，重新渲染
	'selectAny', // 选择模式
	'switch', // 开关机
	'toggleTimeClock', // 切换定时时间
	'toggleAlarm', //切换报警声开关
	'selectSpeed', // 切换风速
	'toggleStrong', // 切换强效
	'bookTime', // 预约时间
	'childLock' //童锁开关
	]);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * 额 此设备数据  1为非 2为真 叼啊
	 * @type {store}
	 *Byte0 返回开关机状态
	Byte1   返回缺水报警状态
	Byte2   返回离开模式状态
	Byte3   返回童锁状态
	Byte4   返回工作模式状态
	Byte5   返回风速状态
	Byte6   预约剩余时间
	Byte7   返回缺水报警声状态

	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _Actions = __webpack_require__(6);

	var _fun = __webpack_require__(2);

	var AppData = {};
	var domain = het.getHost();
	// const domain = 'http://api.clife.cn';
	var postCtrlUrl = domain + '/v1/device/config/set'; // 下发设备控制数据接口 


	// 数据过滤计时器
	var dataFilterTimers = {
	    boot: 0,
	    childLock: 0,
	    reservationTime: 0,
	    wind: 0,
	    leave: 0,
	    thirstVoice: 0,
	    work: 0
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
	    var time = new Date().getTime() + 10e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	//判断设备是否离线
	var isOffline = function isOffline() {
	    return AppData.online == 2;
	};
	//判断手机是否断网
	var isNetOff = function isNetOff() {
	    return !navigator.onLine;
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(dt) {
	        var data = dataFilter(dt);
	        if (data.online) AppData.online = data.onlineStatus;
	        if (data.boot) AppData.boot = data.boot;
	        if (data.leave) AppData.leave = data.leave;
	        if (data.reservationTime) AppData.reservationTime = data.reservationTime;
	        if (data.thirstVoice) AppData.thirstVoice = data.thirstVoice;
	        if (data.childLock) AppData.childLock = data.childLock;
	        if (data.work) AppData.work = data.work;
	        if (data.wind) AppData.wind = data.wind;

	        this.trigger(data);
	        // console.log(data);
	    },
	    /* 
	    * @param    {json}     data        发送的数据，要求json格式
	    * @param    {integer}  needArg    接口是否需要参数拼接，0-需要，1-不需要
	    */
	    onGetData: function onGetData(url, needArg, data) {
	        var _this = this;

	        het.get(url, data ? data : '', function (response) {
	            var result = JSON.parse(response);
	            if (result.code == 100022006) {
	                AppData.online = 2;
	                //het.toast("错误信息："+result.msg);
	            } else if (result.code == 0) {
	                AppData.online = 1;
	            }
	            _this.onRepaint(result.data);
	        }, function (response) {
	            het.toast(result.msg);
	        }, needArg);
	    },
	    onSend: function onSend(AppData) {
	        het.post(postCtrlUrl, AppData, function (response) {
	            var result = JSON.parse(response);
	            //result.code === 0 ? console.log('下发成功') : console.log(`下发失败,原因:${result.msg}`);
	        }, function (responseTxt) {
	            het.toast(responseTxt);
	        });
	    },

	    onSwitch: function onSwitch() {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        var boot = AppData.boot;
	        AppData.boot = boot == 1 ? 2 : 1;
	        AppData.updateFlag = het.hexUpFlag(8, 1, 2);
	        setDataTimer('boot');
	        this.trigger(AppData);
	        this.onSend(AppData);
	    },
	    onSelectAny: function onSelectAny(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        if (value == 2) {
	            //睡眠档 风速只能选择静音
	            AppData.wind = 2;
	        }
	        AppData.updateFlag = het.hexUpFlag(12, 1, 2);
	        AppData.work = value;
	        setDataTimer('work', 'wind');
	        this.trigger({ work: value, wind: AppData.wind });
	        this.onSend(AppData);
	    },
	    onToggleStrong: function onToggleStrong(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.updateFlag = het.hexUpFlag(10, 1, 2);
	        AppData.leave = value;
	        setDataTimer('leave');
	        this.trigger({ leave: value });
	        this.onSend(AppData);
	    },
	    onToggleAlarm: function onToggleAlarm(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.updateFlag = het.hexUpFlag(15, 1, 2);
	        AppData.thirstVoice = value;
	        setDataTimer('thirstVoice');
	        this.trigger({ thirstVoice: value });
	        this.onSend(AppData);
	    },
	    onSelectSpeed: function onSelectSpeed(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        if (AppData.work == 2) {
	            het.toast('睡眠模式下不能选择风速哦');
	            return false;
	        }
	        AppData.updateFlag = het.hexUpFlag(13, 1, 2);
	        AppData.wind = value;
	        setDataTimer('wind');
	        this.trigger({ wind: value });
	        this.onSend(AppData);
	    },
	    onChildLock: function onChildLock(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.updateFlag = het.hexUpFlag(11, 1, 2);
	        AppData.childLock = value;
	        setDataTimer('childLock');
	        this.trigger({ childLock: value });
	        this.onSend(AppData);
	    },
	    onBookTime: function onBookTime(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.updateFlag = het.hexUpFlag(14, 1, 2);
	        AppData.reservationTime = value;
	        setDataTimer('reservationTime');
	        this.trigger({ reservationTime: value });
	        this.onSend(AppData);
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 预约选择组件
	 * @prop {integer} bookTime  定时，取值1-24
	 * @act  Actions.toggleTimeClock([integer])  选择时间时触发
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Clock = undefined;

	var _Actions = __webpack_require__(6);

	var Clock = exports.Clock = React.createClass({
		displayName: 'Clock',

		getInitialState: function getInitialState() {
			return { bookTime: this.props.bookTime };
		},
		handlerPlusClick: function handlerPlusClick(e) {
			var bookTime = this.state.bookTime;
			if (bookTime < 24) {
				++bookTime;
				this.setState({ bookTime: bookTime });
				_Actions.Actions.bookTime(bookTime);
			}
		},
		handlerMinusClick: function handlerMinusClick(e) {
			var bookTime = this.state.bookTime;
			if (bookTime > 0) {
				--bookTime;
				this.setState({ bookTime: bookTime });
				_Actions.Actions.bookTime(bookTime);
			}
		},
		render: function render() {
			var bookTime = this.state.bookTime;
			return React.createElement(
				'section',
				{ className: 'clock flex' },
				React.createElement(
					'span',
					{ className: 'boxtitle flex-cell' },
					'\u9884\u7EA6'
				),
				React.createElement('span', { className: 'flex-cell left-btn', onTouchEnd: this.handlerMinusClick }),
				React.createElement(
					'span',
					{ className: 'flex-cell time' },
					React.createElement(
						'b',
						null,
						bookTime > 0 ? bookTime : ''
					),
					React.createElement(
						'span',
						{ className: 'svalue' },
						bookTime > 0 ? '(小时)' : '无预约'
					)
				),
				React.createElement('span', { className: 'flex-cell right-btn', onTouchEnd: this.handlerPlusClick })
			);
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 自动/标准/速净/省电/睡眠
	 * @prop {integer} modeIndex  模式索引，与id对应。取值1-3，超出范围默认为1
	 * @prop {integer} strong  强效 为 独立功能 1 非 2真
	 * @act  Actions.selectAny([integer])  切换灯时触发该动作
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Modes = undefined;

	var _Actions = __webpack_require__(6);

	var Modes = exports.Modes = React.createClass({
	    displayName: 'Modes',

	    items: [{ id: 3, name: "标准" }, { id: 1, name: "加湿" }, { id: 2, name: "睡眠" }],
	    getInitialState: function getInitialState() {
	        return { strong: this.props.strong };
	    },
	    handlerClick: function handlerClick(e) {
	        var index = e.currentTarget.getAttribute('data-value');
	        //console.log('index',index,this.props.modeIndex);
	        if (index == this.props.modeIndex) return;
	        _Actions.Actions.selectAny(index);
	    },
	    switchStrong: function switchStrong(e) {
	        var strong = this.props.strong;
	        _Actions.Actions.toggleStrong(strong == 1 ? 2 : 1);
	    },
	    render: function render() {
	        var idx = this.props.modeIndex,
	            strong = this.props.strong;

	        return React.createElement(
	            'section',
	            { className: 'modes flex' },
	            this.items.map(function (o) {
	                return React.createElement(
	                    'dl',
	                    { key: o.id, className: (idx == o.id ? "on " : "") + "flex-cell", 'data-value': o.id, onTouchEnd: this.handlerClick },
	                    React.createElement(
	                        'dd',
	                        null,
	                        React.createElement('img', { src: idx == o.id ? "../static/img/mode" + o.id + "-on.png" : "../static/img/mode" + o.id + "-off.png" })
	                    ),
	                    React.createElement(
	                        'dt',
	                        null,
	                        o.name
	                    )
	                );
	            }.bind(this)),
	            React.createElement(
	                'dl',
	                { key: 4, className: (strong == 2 ? "on " : "") + "flex-cell", onTouchEnd: this.switchStrong },
	                React.createElement(
	                    'dd',
	                    null,
	                    React.createElement('img', { src: strong == 2 ? "../static/img/mode4-on.png" : "../static/img/mode4-off.png" })
	                ),
	                React.createElement(
	                    'dt',
	                    null,
	                    '\u5F3A\u6548'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 主界面组件
	 * @prop {integer} airIndoorValue  室内空气质量值
	 * @prop {integer} marker  机型 2
	 * @prop {integer} PMIndoorValue  室内PM2.5值
	 * @prop {integer} PMOutdoorValue  室外PM2.5值
	 * @act  Actions.switch([event])  更改开机开关时触发
	 * @act  Actions.childLock([event])  更改童锁开关时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PM = undefined;

	var _Actions = __webpack_require__(6);

	function indoorPMLevel(marker, pmLow, pmHigh) {
	    if (marker == 2) {
	        switch (pmLow) {
	            case 1:
	                return "优";
	                break;
	            case 2:
	                return "良";
	                break;
	            case 3:
	                return "中";
	                break;
	            case 4:
	                return "差";
	                break;
	        }
	    } else {
	        return pmHigh + pmLow;
	    }
	}
	function outdoorPMLevel(pm) {
	    var str = "";
	    if (pm < 35) {
	        str = "优";
	    } else if (pm < 75) {
	        str = "良";
	    } else if (pm < 115) {
	        str = "中";
	    } else if (pm < 150) {
	        str = "差";
	    } else {
	        str = "严重";
	    }
	    return str;
	}

	var PM = exports.PM = React.createClass({
	    displayName: 'PM',

	    items: [{ id: 1, name: "优", value: "bg-y" }, { id: 2, name: "良", value: "bg-l" }, { id: 3, name: "中", value: "bg-z" }, { id: 4, name: "差", value: "bg-c" }, { id: 5, name: "---", value: "bg-y" }, { id: 6, name: "故障", value: "bg-w" }],
	    handlerSwitch: function handlerSwitch(e) {
	        return _Actions.Actions.switch(e);
	    },
	    handlerChildLock: function handlerChildLock() {
	        _Actions.Actions.childLock(this.props.lock == 1 ? 2 : 1);
	    },
	    render: function render() {
	        var lock = this.props.lock,
	            marker = this.props.marker;

	        return React.createElement(
	            'section',
	            { className: 'mainscreen bg-l' },
	            React.createElement(
	                'section',
	                { className: 'devscreen' },
	                React.createElement(
	                    'ul',
	                    { className: 'screenul' },
	                    React.createElement(
	                        'li',
	                        { className: 'titleli' },
	                        '\u5BA4\u5185\u7A7A\u6C14\u8D28\u91CF'
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'airli' },
	                        indoorPMLevel(marker, this.props.pmLow, this.props.pmHigh)
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'templi' },
	                        '\u6E29\u5EA6\uFF1A',
	                        this.props.indoorTemp,
	                        '\u2103  |  \u6E7F\u5EA6\uFF1A',
	                        this.props.humidity,
	                        '%'
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'pmli' },
	                        'PM2.5\u503C\uFF1A',
	                        indoorPMLevel(marker, this.props.pmLow, this.props.pmHigh)
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: this.props.thirstWarn == 1 ? "pmli" : 'pmli warn' },
	                        this.props.thirstWarn == 1 ? '正常' : '缺水'
	                    )
	                )
	            ),
	            React.createElement(
	                'section',
	                { className: 'flex outdoorscreen' },
	                React.createElement(
	                    'div',
	                    { className: 'flex-cell divl' },
	                    React.createElement('img', { src: '../static/img/airPurifier/location.png' }),
	                    this.props.location,
	                    React.createElement(
	                        'span',
	                        { className: 'inforspacing' },
	                        this.props.weather
	                    ),
	                    this.props.outdoorTemp,
	                    '\u2103'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'flex-cell divr' },
	                    '\u5BA4\u5916PM2.5 : ',
	                    this.props.PMOutdoor,
	                    ' (',
	                    outdoorPMLevel(this.props.PMOutdoor),
	                    ')'
	                )
	            ),
	            React.createElement(
	                'a',
	                { href: 'javascript:void(0)', className: 'pos-a al' },
	                React.createElement('img', { src: "../static/img/airPurifier/mood" + (lock == 2 ? "-on" : "") + ".png", onTouchEnd: this.handlerChildLock })
	            ),
	            React.createElement(
	                'a',
	                { href: 'javascript:void(0)', className: 'pos-a ar' },
	                React.createElement('img', { src: '../static/img/airPurifier/switch.png', onTouchEnd: this.handlerSwitch })
	            )
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 报警声开关组件
	 * @prop {integer} thirstVoice  开关value值
	 * @act  Actions.toggleUV([integer])  更改报警声开关时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Alarm = undefined;

	var _Actions = __webpack_require__(6);

	var Alarm = exports.Alarm = React.createClass({
	    displayName: 'Alarm',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    handlerSwitch: function handlerSwitch(e) {
	        var thirstVoice = this.props.thirstVoice;
	        _Actions.Actions.toggleAlarm(thirstVoice == 1 ? 2 : 1);
	    },
	    render: function render() {
	        var thirstVoice = this.props.thirstVoice;
	        return React.createElement(
	            'section',
	            { className: 'flex uv' },
	            React.createElement(
	                'span',
	                { className: 'boxtitle flex-cell' },
	                '\u62A5\u8B66\u58F0'
	            ),
	            React.createElement(
	                'span',
	                { className: 'flex-cell ' },
	                React.createElement('a', { href: 'javascript:void(0);', onTouchEnd: this.handlerSwitch, className: thirstVoice == 1 ? "off" : "on" })
	            )
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 自动/静音/低档/中档/强档/
	 * 
	 * @prop {integer} speedIndex  模式索引，与id对应。取值1-5，超出范围默认为1
	 * @act  Actions.selectSpeed([integer])  切换风速时触发该动作
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Speed = undefined;

	var _Actions = __webpack_require__(6);

	var Speed = exports.Speed = React.createClass({
	    displayName: 'Speed',

	    items: [{ id: 1, name: "自动" }, { id: 2, name: "静音" }, { id: 3, name: "低档" }, { id: 4, name: "中档" }, { id: 5, name: "强档" }],
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
	                    { key: o.id, className: 'flex-cell', 'data-value': o.id, onTouchEnd: this.handlerClick },
	                    React.createElement(
	                        'dd',
	                        { className: idx == o.id ? "on" : "off" },
	                        o.name
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});

/***/ }
/******/ ]);