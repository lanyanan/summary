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

	var _Actions = __webpack_require__(2);

	var _App = __webpack_require__(3);

	var _PageHeart = __webpack_require__(15);

	var _PageSleep = __webpack_require__(19);

	var _PageSport = __webpack_require__(21);

	var _PageConnect = __webpack_require__(17);

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	    het.setTitle('智能手环');
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: _App.App }),
	        React.createElement(Route, { path: '/PageHeart', component: _PageHeart.PageHeart }),
	        React.createElement(Route, { path: '/PageSleep', component: _PageSleep.PageSleep }),
	        React.createElement(Route, { path: '/PageSport', component: _PageSport.PageSport }),
	        React.createElement(Route, { path: '/PageConnect', component: _PageConnect.PageConnect })
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
	'getHistoryData', 'getValidDate', 'local', 'showCalendar', //显示日历
	'getHeart', //获取心率数据
	'reqHistory']);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(8);

	var _LocalFuns = __webpack_require__(9);

	var _CanvasBoard = __webpack_require__(10);

	var _Calendar = __webpack_require__(11);

	var _Mileage = __webpack_require__(13);

	var _Recording = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	var App = exports.App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            percent: 0,
	            showClndr: false,
	            month: new Date().getMonth() + 1,
	            connect: 'fail',
	            connectTxt: 1,
	            stepCount: 0,
	            walkTarget: 0,
	            networkavailable: 1
	        };
	        _this.listenStore(_Store.Store);
	        _Actions.Actions.local();
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            return false;
	        }
	    }, {
	        key: 'handleClndr',
	        value: function handleClndr(e) {
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            e.preventDefault();
	            //请求月有测试数据的日期
	            var year = new Date().getFullYear(),
	                month = new Date().getMonth() + 1,

	            //时区参数
	            timeZone = new Date().getTimezoneOffset() / 60,

	            //有数据日期接口参数
	            beginDate = _fun.Funs.dateFormat(new Date(year, month - 1, 1) - 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
	                //上月最后一天日期
	            endDate = _fun.Funs.dateFormat(new Date(year, month, 0), 'yyyy-MM-dd'); //本月最后一天
	            var showClndr = this.state.showClndr;
	            //请求当月有测试数据日期，用作渲染日历插件，UTC时间
	            _Actions.Actions.getValidDate({ beginDate: beginDate, endDate: endDate });
	            _Actions.Actions.showCalendar({ showClndr: !showClndr });
	            this.setState({ showClndr: !showClndr, month: month });
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //请求当日历史数据
	            var year = new Date().getFullYear(),
	                month = new Date().getMonth() + 1,

	            //时区参数
	            timeZone = new Date().getTimezoneOffset() / 60,

	            //历史数据参数
	            yesterday = _fun.Funs.dateFormat(new Date() - 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00',
	                today = _fun.Funs.dateFormat(new Date(), 'yyyy-MM-dd'),

	            //有数据日期接口参数
	            beginDate = _fun.Funs.dateFormat(new Date(year, month - 1, 1) - 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
	                //上月最后一天日期
	            endDate = _fun.Funs.dateFormat(new Date(year, month, 0), 'yyyy-MM-dd'); //本月最后一天

	            //请求当天历史数据
	            _Actions.Actions.getHistoryData({ date: today, showClndr: false });
	            //请求当月有测试数据日期，用作渲染日历插件，UTC时间
	            _Actions.Actions.getValidDate({ beginDate: beginDate, endDate: endDate });
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var calendar = {
	                showClndr: this.state.showClndr,
	                viewDate: this.state.viewDate ? this.state.viewDate : _fun.Funs.dateFormat(new Date(), 'yyyy-MM-dd'),
	                validDates: this.state.validDates ? this.state.validDates : [],
	                firstValidDates: this.state.firstValidDates ? this.state.firstValidDates : [],
	                handleClndr: this.handleClndr.bind(this)
	            },
	                canvasboard = {
	                connect: this.state.connect,
	                connectTxt: this.state.connectTxt != undefined ? this.state.connectTxt : 1,
	                showClndr: this.state.showClndr,
	                viewDate: this.state.viewDate ? this.state.viewDate : _fun.Funs.dateFormat(new Date(), 'yyyy-MM-dd'),
	                stepCount: this.state.stepCount,
	                walkTarget: this.state.walkTarget,
	                percent: parseInt(this.state.stepCount / this.state.walkTarget),
	                calories: this.state.calories ? this.state.calories : 0,
	                status: 1
	            },
	                mileage = {
	                showClndr: this.state.showClndr,
	                kilometer: this.state.kilometer ? this.state.kilometer : 0,
	                calories: this.state.calories ? this.state.calories : 0,
	                stepCount: this.state.stepCount ? this.state.stepCount : 0
	            },
	                recording = {
	                deepSleep: this.state.deepSleep ? this.state.deepSleep : '',
	                shallowSleep: this.state.shallowSleep ? this.state.shallowSleep : '',
	                sleepQuality: this.state.sleepQuality ? this.state.sleepQuality : ''
	            },
	                connect = this.state.connect ? this.state.connect : 'fail';
	            if (connect == 'scan' || connect == 'sync') window.location.href = '#/PageConnect';
	            // window.state = this.state;
	            // console.log('dates',this.state.viewDate);
	            return React.createElement(
	                'main',
	                { className: 'main' + _LocalFuns.isIOS },
	                React.createElement(
	                    'nav',
	                    { className: this.state.showClndr ? 'hide' : 'nav' + _LocalFuns.isIOS },
	                    React.createElement(
	                        'a',
	                        { href: 'request://back' },
	                        ' '
	                    ),
	                    React.createElement(
	                        'a',
	                        null,
	                        this.state.title ? this.state.title : '智能手环'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'request://detail' },
	                        ' '
	                    )
	                ),
	                React.createElement(_Calendar.Calendar, { data: calendar }),
	                React.createElement(_CanvasBoard.CanvasBoard, { data: canvasboard }),
	                React.createElement(_Mileage.Mileage, { data: mileage }),
	                React.createElement(_Recording.Recording, { data: recording })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

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
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 * param  connect  0 失败，1 连接中，2连接成功,开始同步，3同步成功
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _LocalFuns = __webpack_require__(9);

	var docker = {
	    appId: '10121',
	    appType: !!(navigator.userAgent.indexOf('Android') + 1) ? 1 : 2,
	    appSecret: '33c9f8898fbd409a9fe110d8f25cc764',
	    accessToken: '4680ac7d2e2f4679b60ae06b001eb6e1',
	    host: 'https://200.200.200.50' || 'https://api.clife.cn' || 'https://test.api.clife.cn',
	    locker: true,
	    clearLocker: true,
	    iSwitch: true,
	    timer: null,
	    cacheArr: [],
	    isProxy: true //是否由app代理接口请求,PC调试改为false拿token后可以请求到数据
	};
	var appData = {
	    showClndr: false
	};
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data, type) {
	        if (data.heartrate != undefined) {
	            docker.cacheArr.push(data.heartrate);
	            if (docker.cacheArr.length == 60) {

	                //.log('开始计算');心率平均值计算
	                appData.heartratemin = (0, _LocalFuns.arrayMin)(docker.cacheArr);
	                appData.heartratemax = (0, _LocalFuns.arrayMax)(docker.cacheArr);
	                appData.heartrateavg = parseInt((0, _LocalFuns.arrayAvg)(docker.cacheArr));
	                docker.cacheArr = [];
	            }
	        }
	        _fun.Funs._extends(appData, data);
	        if (data.networkavailable != undefined) appData.networkavailable = data.networkavailable;
	        this.trigger(appData);
	    },
	    onLocal: function onLocal(data) {
	        this.trigger(appData);
	    },
	    onGetHistoryData: function onGetHistoryData(data) {
	        //console.log('history request params',data);
	        var self = this,
	            url = '/v1/app/chealth/smartBracelet/getBraceletByDate',
	            params = {
	            accessToken: docker.accessToken,
	            appId: 10121,
	            timestamp: +new Date().getTime(),
	            date: data.date || '2017-03-01'
	        },
	            suc = function suc(xhr) {
	            typeof xhr === 'string' && (xhr = JSON.parse(xhr));
	            //模拟数据
	            // xhr.data= {
	            //     "movement": {
	            //         "calories": 3.6,//消耗的卡路里（单位：千卡）
	            //         "stepCount": 2000,//所走步数（单位：步）
	            //         "kilometer": 0.8,//所走公里数（单位：kl）
	            //     },
	            //     "sleep":{
	            //         "deepSleep": "03时05分", //深睡时间
	            //         "shallowSleep": "02时05分", //浅睡时间
	            //         "sleepQuality": "不好",//睡眠质量
	            //     }
	            // };
	            if (xhr.code == 0 && xhr.data) {
	                var res = xhr.data;
	                //真实数据
	                if (!(0, _LocalFuns.isEmptyObject)(res)) {
	                    //het.toast('ok');
	                    var renderData = {
	                        viewDate: data.date,
	                        calories: res.movement.calories,
	                        stepCount: res.movement.stepCount,
	                        kilometer: res.movement.kilometer,
	                        deepSleep: res.sleep ? res.sleep.deepSleep : '',
	                        shallowSleep: res.sleep ? res.sleep.shallowSleep : '',
	                        sleepQuality: res.sleep ? res.sleep.sleepQuality : '',
	                        showClndr: data.showClndr
	                    };
	                    _fun.Funs._extends(appData, renderData);
	                    self.trigger(renderData);
	                } else {
	                    var _renderData = {
	                        viewDate: data.date,
	                        showClndr: data.showClndr
	                    };
	                    _fun.Funs._extends(appData, _renderData);
	                    self.trigger(_renderData);
	                }
	            }
	        },
	            err = function err(_err) {};

	        if (docker.isProxy) {
	            //App proxy ajax
	            (0, _LocalFuns.reduceKey)(['accessToken', 'appId', 'timestamp'], params);
	            het.post(url, params, suc, err);
	        } else {
	            //自测试请求
	            (0, _LocalFuns.frontAjax)(url, params, suc, err);
	        }
	    },
	    onGetValidDate: function onGetValidDate(data, dateObj) {
	        //console.log('valid dates param',data,dateObj);
	        var self = this,
	            url = '/v1/app/chealth/smartBracelet/getBraceletDate',
	            params = {
	            accessToken: docker.accessToken,
	            appId: docker.appId,
	            timestamp: +new Date().getTime(),
	            beginDate: data.beginDate || '2017-03-01',
	            endDate: data.endDate || '2017-03-22',
	            type: 0
	        },
	            suc = function suc(xhr) {
	            //console.log(xhr);
	            typeof xhr === 'string' && (xhr = JSON.parse(xhr));
	            //console.log(typeof xhr,xhr);

	            //console.log('-------日历数据---------',xhr);
	            //模拟数据
	            xhr.data = xhr.data || [{
	                "date": "2016-04-12"
	            }, {
	                "date": "2016-04-14"
	            }, {
	                "date": "2016-04-16"
	            }, {
	                "date": "2016-04-19"
	            }];
	            if (xhr.code == 0 && xhr.data.length > 0) {
	                (function () {

	                    //真实数据
	                    var validDates = [];
	                    xhr.data.map(function (o) {
	                        validDates.push(Number(o.date.substring(8, 10)));
	                    });

	                    //重绘日历，日期对象函数返回方法tag(),在日历插件里
	                    if (dateObj) dateObj.tag(validDates);

	                    //缓存第一次请求月所有可用日期数组，用作每次日历打开时候渲染
	                    if (docker.iSwitch /*&& month!='undefined' && month == (new Date().getMonth()+1)*/) {
	                            docker.iSwitch = false;
	                            appData.firstValidDates = validDates;
	                            self.trigger({ firstValidDates: validDates });
	                        }
	                    appData.validDates = validDates;
	                    self.trigger({ validDates: validDates });

	                    //console.log(validDates,'---');
	                })();
	            } else {
	                //有数据的日期数组
	                var validDates = [];
	                if (dateObj) dateObj.tag(validDates);
	            }
	        },
	            err = function err(xhr) {
	            console.log(xhr, 'err');
	        };

	        if (docker.isProxy) {
	            //App proxy ajax
	            (0, _LocalFuns.reduceKey)(['accessToken', 'appId', 'timestamp'], params);
	            het.post(url, params, suc, err);
	        } else {
	            //自测试请求
	            (0, _LocalFuns.frontAjax)(url, params, suc, err);
	        }
	    },
	    onReqHistory: function onReqHistory(data) {
	        //console.log('history data request params',data);
	        var self = this,
	            url = '/v1/app/chealth/smartBracelet/' + (data.type === 'sport' ? 'getMovementByDate' : 'getSleepByDate'),
	            params = {
	            accessToken: docker.accessToken,
	            appId: 10121,
	            timestamp: +new Date().getTime(),
	            beginDate: data.beginDate,
	            endDate: data.endDate
	        },
	            suc = function suc(xhr) {
	            typeof xhr === 'string' && (xhr = JSON.parse(xhr));
	            //模拟数据

	            // xhr = xhr || {
	            //     code:0,
	            //     data:
	            //     {
	            //
	            //         //by weekly
	            //         "caloriesList": [
	            //             {
	            //                 "dateTime": "2017-04-02",
	            //                 "calories": 0
	            //             },
	            //             {
	            //                 "dateTime": "2017-04-03",
	            //                 "calories": 0
	            //             },
	            //             {
	            //                 "dateTime": "2017-04-04",
	            //                 "calories": 0
	            //             },
	            //             {
	            //                 "dateTime": "2017-04-05",
	            //                 "calories": 37.2
	            //             },
	            //             {
	            //                 "dateTime": "2017-04-06",
	            //                 "calories": 26
	            //             },
	            //             {
	            //                 "dateTime": "2017-04-07",
	            //                 "calories": 2.4
	            //             }
	            //         ],
	            //         "stepList": [
	            //             {
	            //                 "stepCount": 0,
	            //                 "dateTime": "2017-04-02"
	            //             },
	            //             {
	            //                 "stepCount": 0,
	            //                 "dateTime": "2017-04-03"
	            //             },
	            //             {
	            //                 "stepCount": 0,
	            //                 "dateTime": "2017-04-04"
	            //             },
	            //             {
	            //                 "stepCount": 810,
	            //                 "dateTime": "2017-04-05"
	            //             },
	            //             {
	            //                 "stepCount": 567,
	            //                 "dateTime": "2017-04-06"
	            //             },
	            //             {
	            //                 "stepCount": 52,
	            //                 "dateTime": "2017-04-07"
	            //             }
	            //         ]
	            //         //by daily
	            //         // "movement": {
	            //         //     "calories": 3.6,//消耗的卡路里（单位：千卡）
	            //         //     "stepCount": 1800,//所走步数（单位：步）
	            //         //     "kilometer": 0.8,//所走公里数（单位：kl）
	            //         // },
	            //     }
	            // };

	            if (xhr.code == 0 && xhr.data && data.type === 'sleep') {
	                var res = xhr.data;
	                //真实数据
	                if (!(0, _LocalFuns.isEmptyObject)(res)) {
	                    //alert('数据不为空')
	                    var result = {
	                        isEmpty: false,
	                        timestamp: +new Date().getTime()
	                    };

	                    if (res.list) result.list = res.list;
	                    if (res.sleep) result.sleep = res.sleep;

	                    // if(res.sleep){
	                    //     if(res.sleep.deepSleep)
	                    // };

	                    _fun.Funs._extends(appData, result);
	                    self.trigger(result);
	                    //console.log('sleep history data-------',xhr);
	                } else {
	                    //console.log('数据为空');
	                    var _result = { isEmpty: true, timestamp: +new Date().getTime() };
	                    _result.list = [];
	                    _result.sleep = {};
	                    _fun.Funs._extends(appData, _result);
	                    self.trigger(_result);
	                }
	            }
	            //运动历史数据逻辑，有时间放到view里处理，解耦
	            if (xhr.code == 0 && xhr.data && data.type === 'sport') {
	                var _res = xhr.data;
	                //真实数据
	                if (!(0, _LocalFuns.isEmptyObject)(_res)) {
	                    //alert('数据不为空')
	                    var _result2 = {
	                        isEmpty: false,
	                        timestamp: +new Date().getTime()
	                    };
	                    if (_res.movement) {
	                        //result.viewDate=data.date,
	                        //result.showClndr=false,
	                        _result2.calories = _res.movement.calories;
	                        _result2.stepCount = _res.movement.stepCount;
	                        _result2.kilometer = _res.movement.kilometer;
	                    }

	                    //虚拟数据
	                    // res.caloriesList  =   [
	                    //     {
	                    //         "dateTime": "2017-04-09",
	                    //         "calories": 0
	                    //     },
	                    //     {
	                    //         "dateTime": "2017-04-10",
	                    //         "calories": 162
	                    //     },
	                    //     {
	                    //         "dateTime": "2017-04-11",
	                    //         "calories": 54.2
	                    //     },
	                    //     {
	                    //         "dateTime": "2017-04-12",
	                    //         "calories": 153.3
	                    //     },
	                    //     {
	                    //         "dateTime": "2017-04-13",
	                    //         "calories": 201
	                    //     }
	                    // ];
	                    // res.stepList = [
	                    //     {
	                    //         "stepCount": 0,
	                    //         "dateTime": "2017-04-09"
	                    //     },
	                    //     {
	                    //         "stepCount": 1679,
	                    //         "dateTime": "2017-04-10"
	                    //     },
	                    //     {
	                    //         "stepCount": 1719,
	                    //         "dateTime": "2017-04-11"
	                    //     },
	                    //     {
	                    //         "stepCount": 4865,
	                    //         "dateTime": "2017-04-12"
	                    //     },
	                    //     {
	                    //         "stepCount": 11100,
	                    //         "dateTime": "2017-04-13"
	                    //     }
	                    // ];

	                    if (_res.stepList) _result2.stepList = _res.stepList;
	                    if (_res.caloriesList) _result2.caloriesList = _res.caloriesList;
	                    //是否有必要缓存起来
	                    _fun.Funs._extends(appData, _result2);
	                    self.trigger(_result2);
	                    //console.log(result,'resultresultresultresultresult');
	                } else {
	                    //console.log('数据为空');
	                    var _result3 = { isEmpty: true, timestamp: +new Date().getTime() };
	                    _result3.calories = '--';
	                    _result3.stepCount = '--';
	                    _result3.kilometer = '--';
	                    _result3.stepList = [];
	                    _result3.caloriesList = [];
	                    _fun.Funs._extends(appData, _result3);
	                    self.trigger(_result3);
	                }
	            }
	        },
	            err = function err(_err2) {
	            typeof xhr === 'string' && (_err2 = JSON.parse(_err2));
	            var result = { isEmpty: true, timestamp: +new Date().getTime() };
	            _fun.Funs._extends(appData, result);
	            self.trigger(result);
	        };

	        if (docker.isProxy) {
	            //App proxy ajax
	            (0, _LocalFuns.reduceKey)(['accessToken', 'appId', 'timestamp'], params);
	            het.post(url, params, suc, err);
	        } else {
	            //自测试请求
	            (0, _LocalFuns.frontAjax)(url, params, suc, err);
	        }
	    },
	    onGetHeart: function onGetHeart(data) {
	        appData.measurestatus = data.measurestatus;
	        this.trigger({ measurestatus: data.measurestatus });
	    },
	    onShowCalendar: function onShowCalendar(data) {
	        appData.showClndr = data.showClndr;
	        this.trigger({ showClndr: data.showClndr });
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 本地库
	 * @type {localCache}
	 * isIOS {string}   //导航栏判断安卓73，苹果64
	 * frontAjax {function}
	 * 步数，最大值50000 最小5000
	 **/

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var isIOS = exports.isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/) ? ' ios' : ' android';
	var frontAjax = exports.frontAjax = function frontAjax(url, params, suc, err) {
	    $.ajax({
	        type: 'POST',
	        url: url,
	        data: params,
	        dataType: 'json',
	        crossDomain: true,
	        success: suc,
	        error: err
	    });
	};
	var reduceKey = exports.reduceKey = function reduceKey(arr, json) {
	    arr.map(function (o) {
	        delete json[o];
	        return json;
	    });
	};
	var isEmptyObject = exports.isEmptyObject = function isEmptyObject(obj) {
	    for (var key in obj) {
	        return false;
	    }
	    return true;
	};

	var arrayMin = exports.arrayMin = function arrayMin(arr) {
	    if (Object.prototype.toString.call(arr) !== "[object Array]") return false;
	    arr.map(function (o) {
	        o < arr[0] && (arr[0] = o);
	    });
	    return arr[0];
	};
	var arrayMax = exports.arrayMax = function arrayMax(arr) {
	    if (Object.prototype.toString.call(arr) !== "[object Array]") return false;
	    var max = arr[0];
	    for (var i = 1; i < arr.length; i++) {
	        if (arr[i] > max) {
	            max = arr[i];
	        }
	    }
	    return max;
	};
	var arrayAvg = exports.arrayAvg = function arrayAvg(arr) {
	    if (Object.prototype.toString.call(arr) !== "[object Array]") return false;
	    var sum = 0,
	        avg = 0;
	    arr.map(function (o) {
	        sum += o;
	    });
	    avg = sum / arr.length;
	    return avg;
	};
	var fillZero = exports.fillZero = function fillZero(num) {
	    num = num < 10 ? '0' + num : num;
	    return num;
	};
	window.arrayAvg = arrayAvg;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CanvasBoard = undefined;

	var _LocalFuns = __webpack_require__(9);

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;

	var StrokeArc = function StrokeArc(obj, opts) {
	    if (obj.nodeType !== 1 && obj.nodeName == 'canvas') {
	        console.log('请传入一个有效的Canvas对象或dom对象');
	        return false;
	    };
	    this.ctx = obj.getContext('2d');
	    this.gradient = this.ctx.createLinearGradient(81, 190, 229, 188);
	    this.gradient.addColorStop("0", "#9555eb");
	    this.gradient.addColorStop("0.5", "#9a51e9");
	    this.gradient.addColorStop("0.7", "#6b76f9");
	    this.gradient.addColorStop("1", "#27c8ed");
	    this.init(opts);
	};
	StrokeArc.prototype = {
	    constructor: StrokeArc,
	    init: function init(opts) {
	        if (Object.prototype.toString.call(opts) === "[object Object]") {
	            this.ctx.save();
	            this.ctx.clearRect(0, 0, 480, 480);
	            this.ctx.beginPath();
	            !opts.hideLineCap && (this.ctx.lineCap = 'round');
	            this.ctx.strokeStyle = opts.lineColor || this.gradient;
	            this.ctx.lineWidth = opts.lineWidth || 20;
	            this.ctx.arc(opts.x || 240, opts.y || 240, opts.r || 220, Math.PI * 0.75, Math.PI * (opts.eAngle || 2.25));
	            this.ctx.stroke();
	            this.ctx.restore();
	        }
	    }
	};
	var CanvasBoard = exports.CanvasBoard = React.createClass({
	    displayName: 'CanvasBoard',
	    componentDidMount: function componentDidMount() {
	        var background = new StrokeArc(document.querySelector('#canvas1'), {
	            x: 240,
	            y: 240,
	            r: 220,
	            eAngle: 2.25,
	            lineWidth: 20,
	            lineColor: 'rgba(0,0,0,0.4)'
	        });
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {
	        var per = next.data.walkTarget == 0 ? 0.75 : 0.75 + next.data.stepCount / next.data.walkTarget * 100 * 0.015;

	        if (this.props.data.stepCount != next.data.stepCount || this.props.data.walkTarget != next.data.walkTarget) {
	            var progress = new StrokeArc(document.querySelector('#canvas'), {
	                x: 240,
	                y: 240,
	                r: 220,
	                eAngle: per > 2.25 ? 2.25 : per > 0.75 && per < 0.7615 ? 0.7615 : per,
	                lineWidth: 20,
	                hideLineCap: per == 0.75 ? true : false
	            });
	        }
	    },
	    render: function render() {
	        var percent = this.props.data.walkTarget == 0 ? 0 : this.props.data.stepCount / this.props.data.walkTarget * 100,
	            today = new Date().getFullYear() + '-' + (0, _LocalFuns.fillZero)(new Date().getMonth() + 1) + '-' + (0, _LocalFuns.fillZero)(new Date().getDate()),
	            isToday = this.props.data.viewDate == today ? 1 : 0;
	        percent > 0 && percent < 1 && (percent = 1);
	        percent = parseInt(percent);
	        return React.createElement(
	            'section',
	            { className: this.props.data.showClndr ? 'dashboard transparent' : 'dashboard' },
	            React.createElement(
	                'a',
	                { href: '#/PageSport', style: { display: 'block', width: '100%' } },
	                React.createElement(
	                    'canvas',
	                    { id: 'canvas1', className: 'canvas', width: '480', height: '480', style: { width: '21.55555556rem', height: '21.55555556rem' } },
	                    ' '
	                ),
	                React.createElement(
	                    'canvas',
	                    { id: 'canvas', className: 'canvas', width: '480', height: '480', style: { width: '21.55555556rem', height: '21.55555556rem' } },
	                    ' '
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'slogan' },
	                    isToday ? percent < 100 ? '目标进行中' : '恭喜，目标已完成' : percent < 100 ? '目标未完成' : '目标已完成'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'percent' },
	                    isNaN(percent) ? 0 : percent,
	                    React.createElement(
	                        'span',
	                        null,
	                        '%'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'status' },
	                    React.createElement('img', { src: '../static/img/layout/i-chain.png' }),
	                    this.props.data.connectTxt == 0 ? '连接已断开' : '手环已连接'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'steps' },
	                    '\u76EE\u6807:',
	                    this.props.data.walkTarget,
	                    '\u6B65'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Calendar = undefined;

	var _fun = __webpack_require__(6);

	var _Clndr = __webpack_require__(12);

	var Calendar = exports.Calendar = React.createClass({
	    displayName: 'Calendar',
	    render: function render() {
	        var data = this.props.data,
	            today = _fun.Funs.dateFormat(new Date(), 'yyyy.MM.dd'),
	            validDates = data.validDates,
	            firstValidDates = data.firstValidDates;
	        return React.createElement(
	            'section',
	            { className: data.showClndr ? "calendar-module expansion" : "calendar-module", style: { margin: '1rem' } },
	            React.createElement(
	                'span',
	                { className: data.showClndr ? 'transparent' : 'expansion-btn', onTouchStart: data.handleClndr },
	                React.createElement('img', { src: '../static/img/layout/i-calendar.png' }),
	                parseInt(data.viewDate.substring(5, 7)) + '月' + parseInt(data.viewDate.substring(8, 10)) + '日'
	            ),
	            data.showClndr ? React.createElement(
	                'section',
	                { className: 'calendar-wrap' },
	                React.createElement(
	                    'a',
	                    { className: 'calendar-ctrl', id: 'calendar-ctrl', onTouchStart: data.handleClndr },
	                    ' '
	                ),
	                React.createElement(_Clndr.Clndr, { tagDates: validDates, firstTagDates: firstValidDates, month: new Date().getMonth() + 1 })
	            ) : null
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 日历组件
	 * @prop {array} tagDates  有数据的日期
	 * @function  {fun} getTagDates 获取有请求月有数据的日期数组
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clndr = undefined;

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var timeZone = new Date().getTimezoneOffset() / 60;
	var timer = null;
	var Clndr = exports.Clndr = React.createClass({
	    displayName: 'Clndr',
	    render: function render() {
	        return React.createElement('div', { className: 'calendar-body', ref: 'calendar' });
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {},
	    componentDidMount: function componentDidMount(e) {
	        var self = this,
	            tagDates = self.props.tagDates ? self.props.tagDates : [],
	            firstTagDates = self.props.firstTagDates ? self.props.firstTagDates : [],
	            month = this.props.month;
	        clearTimeout(timer);
	        timer = setTimeout(function () {
	            //console.log('calendar',tagDates);
	            new Calendar({
	                target: '.calendar-body',
	                className: 'cal',
	                tagDates: month == new Date().getMonth() + 1 ? firstTagDates : tagDates,
	                onReady: function onReady(dateObj) {},
	                onChangeMonthBefore: function onChangeMonthBefore(dateObj, type) {
	                    self.getTagDates(dateObj, type);
	                },
	                onSelect: self.selectDate,
	                //onSelect: self.selectDate.bind(self),
	                onChangeMonth: function onChangeMonth(dateObj) {}
	            });
	        }, 100);
	    },
	    selectDate: function selectDate(dateObj, e) {
	        var tagDates = this.props.tagDates ? this.props.tagDates : [];
	        var day = dateObj.date > 9 ? dateObj.date : '0' + dateObj.date,
	            month = dateObj.month > 9 ? dateObj.month : '0' + dateObj.month,
	            newdate = dateObj.year + '-' + month + '-' + day;

	        var dateTime = new Date(newdate).getTime(),
	            todayTime = new Date().getTime();

	        if (dateTime > todayTime) {
	            //未来日期比较
	            het.toast("未来日期没有测试数据");
	            return false;
	        } else {
	            if (tagDates.indexOf(dateObj.date) != -1) {
	                //是否为有数据的日期
	                //het.toast('有测试数据'+newdate.toString());
	                var yesterday = _fun.Funs.dateFormat(dateTime - 24 * 60 * 60 * 1000, 'yyyy-MM-dd');
	                //het.toast('yesterday'+yesterday);
	                _Actions.Actions.getHistoryData({ "date": newdate, showClndr: false });
	            } else {
	                het.toast('今日没有测试数据`');
	            }
	        }
	    },
	    getTagDates: function getTagDates(dateObj, type) {
	        var month = dateObj.month,
	            year = dateObj.year,
	            newMonth = type === 'pre' ? month - 1 : type === 'today' ? month : month + 1,
	            trueMonth = newMonth > 9 ? newMonth : '0' + newMonth;
	        if (newMonth > 12) {
	            trueMonth = "01";
	            year++;
	        } else if (newMonth < 1) {
	            trueMonth = 12;
	            year--;
	        };
	        /*获取当月有数据日期  UTC时间*/
	        var firstdate = _fun.Funs.dateFormat(new Date(year, trueMonth - 1, 1) - 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
	            //每月第一天
	        lastdate = year + '-' + trueMonth + '-' + new Date(year, trueMonth, 0).getDate(); //没有最后一天

	        //月份变更，请求有数据的日期
	        _Actions.Actions.getValidDate({ beginDate: firstdate, endDate: lastdate }, dateObj);
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Mileage = exports.Mileage = React.createClass({
	    displayName: "Mileage",
	    render: function render() {
	        var data = this.props.data;
	        return React.createElement(
	            "section",
	            { className: data.showClndr ? "mileage flex transparent" : "mileage flex" },
	            React.createElement(
	                "aside",
	                { className: "flex-cell" },
	                React.createElement(
	                    "h2",
	                    null,
	                    data.calories
	                ),
	                React.createElement(
	                    "h5",
	                    null,
	                    "\u5343\u5361"
	                )
	            ),
	            React.createElement(
	                "aside",
	                { className: "flex-cell" },
	                React.createElement(
	                    "h2",
	                    null,
	                    data.stepCount
	                ),
	                React.createElement(
	                    "h5",
	                    null,
	                    "\u6B65\u6570"
	                )
	            ),
	            React.createElement(
	                "aside",
	                { className: "flex-cell" },
	                React.createElement(
	                    "h2",
	                    null,
	                    data.kilometer
	                ),
	                React.createElement(
	                    "h5",
	                    null,
	                    "\u516C\u91CC"
	                )
	            )
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;
	var Recording = exports.Recording = React.createClass({
	    displayName: "Recording",
	    handleRouter: function handleRouter() {
	        window.location.href = '#/PageSleep';
	    },
	    render: function render() {
	        var data = this.props.data,
	            deepSleep = data.deepSleep,
	            shallowSleep = data.shallowSleep,
	            empty = React.createElement(
	            "h5",
	            null,
	            "\u6682\u65E0\u6570\u636E"
	        );
	        return React.createElement(
	            "section",
	            { className: "recording" },
	            React.createElement(
	                Link,
	                { to: "PageHeart", className: "flex" },
	                React.createElement(
	                    "div",
	                    { className: "left" },
	                    React.createElement("img", { src: "../static/img/layout/i-heartrate.png" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "mid" },
	                    React.createElement(
	                        "h2",
	                        null,
	                        "\u5FC3\u7387"
	                    ),
	                    React.createElement(
	                        "h5",
	                        null,
	                        "\u6D4B\u91CF\u5FC3\u7387"
	                    )
	                ),
	                React.createElement("div", { to: "PageHeart", className: "right arrow" })
	            ),
	            React.createElement(
	                Link,
	                { to: "PageSleep", className: "flex", onTouchStart: this.handleRouter },
	                React.createElement(
	                    "div",
	                    { className: "left" },
	                    React.createElement("img", { src: "../static/img/layout/i-sleep.png" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "mid" },
	                    React.createElement(
	                        "h2",
	                        null,
	                        "\u7761\u7720"
	                    ),
	                    deepSleep ? React.createElement(
	                        "h5",
	                        null,
	                        "\u6DF1\u7761",
	                        React.createElement(
	                            "span",
	                            { className: "light" },
	                            parseInt(deepSleep.substring(0, 2))
	                        ),
	                        "\u65F6",
	                        React.createElement(
	                            "span",
	                            { className: "light" },
	                            parseInt(deepSleep.substring(3, 5))
	                        ),
	                        "\u5206"
	                    ) : empty
	                ),
	                React.createElement(
	                    "div",
	                    { className: "right" },
	                    React.createElement(
	                        "h2",
	                        { className: "blue" },
	                        data.sleepQuality ? data.sleepQuality : '暂无数据'
	                    ),
	                    shallowSleep ? React.createElement(
	                        "h5",
	                        null,
	                        "\u6D45\u7761",
	                        React.createElement(
	                            "span",
	                            { className: "light" },
	                            parseInt(shallowSleep.substring(0, 2))
	                        ),
	                        "\u65F6",
	                        React.createElement(
	                            "span",
	                            { className: "light" },
	                            parseInt(shallowSleep.substring(3, 5))
	                        ),
	                        "\u5206"
	                    ) : empty
	                )
	            )
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PageHeart = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(8);

	var _EchartsHeart = __webpack_require__(16);

	var _PageConnect = __webpack_require__(17);

	var _LocalFuns = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});
	var firstEnter = true;

	var PageHeart = exports.PageHeart = function (_BaseComponent) {
	    _inherits(PageHeart, _BaseComponent);

	    function PageHeart(props) {
	        _classCallCheck(this, PageHeart);

	        var _this = _possibleConstructorReturn(this, (PageHeart.__proto__ || Object.getPrototypeOf(PageHeart)).call(this, props));

	        _this.state = {
	            heartrate: '--',
	            heartratemax: '--',
	            heartratemin: '--',
	            heartrateavg: '--',
	            measurestatus: 0,
	            connect: 'syncOk'
	        };
	        _this.listenStore(_Store.Store);
	        _Actions.Actions.local();
	        return _this;
	    }

	    _createClass(PageHeart, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(next) {
	            //console.log('----measurestatus-----',this.state.measurestatus,next.measurestatus)
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(next) {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.setState({
	                heartrate: '--',
	                heartratemax: '--',
	                heartratemin: '--',
	                heartrateavg: '--'
	            });
	            _Actions.Actions.getHeart({
	                measurestatus: 0
	            });
	        }
	    }, {
	        key: 'conponentWillUnmount',
	        value: function conponentWillUnmount() {}
	    }, {
	        key: 'drawHeart',
	        value: function drawHeart(e) {
	            _Actions.Actions.getHeart({
	                measurestatus: !this.state.measurestatus
	            });
	            this.setState({
	                measurestatus: !this.state.measurestatus
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var measurestatus = this.state.measurestatus != undefined ? this.state.measurestatus : 0,
	                max = this.state.heartratemax,
	                min = this.state.heartratemin,
	                avg = this.state.heartrateavg == '--' ? '--' : parseInt(this.state.heartrateavg);
	            if (this.state.connect == 'scan') window.location.href = '#/PageConnect';
	            // console.log('---------心率----连接---measurestatus',this.state.heartrate,this.state.measurestatus);
	            // console.log('firstEnter',firstEnter.toString());
	            // console.log(measurestatus,'---------measurestatus--------');
	            return React.createElement(
	                'main',
	                { className: 'heartrate' + _LocalFuns.isIOS },
	                React.createElement(
	                    'nav',
	                    { className: 'nav' + _LocalFuns.isIOS },
	                    React.createElement(
	                        'a',
	                        { onClick: function onClick() {
	                                window.location.href = '#/';
	                            } },
	                        ' '
	                    ),
	                    React.createElement(
	                        'a',
	                        null,
	                        '\u5FC3\u7387'
	                    ),
	                    React.createElement(
	                        'a',
	                        { className: 'none' },
	                        ' '
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'times' },
	                    React.createElement(
	                        'h2',
	                        null,
	                        measurestatus == 0 ? '--' : this.state.heartrate
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        '\u6B21/\u5206'
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: "mileage flex" },
	                    React.createElement(
	                        'aside',
	                        { className: 'flex-cell' },
	                        React.createElement(
	                            'h2',
	                            null,
	                            max
	                        ),
	                        React.createElement(
	                            'h5',
	                            null,
	                            '\u6700\u9AD8\u503C'
	                        )
	                    ),
	                    React.createElement(
	                        'aside',
	                        { className: 'flex-cell' },
	                        React.createElement(
	                            'h2',
	                            null,
	                            avg
	                        ),
	                        React.createElement(
	                            'h5',
	                            null,
	                            '\u5E73\u5747\u503C'
	                        )
	                    ),
	                    React.createElement(
	                        'aside',
	                        { className: 'flex-cell' },
	                        React.createElement(
	                            'h2',
	                            null,
	                            min
	                        ),
	                        React.createElement(
	                            'h5',
	                            null,
	                            '\u6700\u4F4E\u503C'
	                        )
	                    )
	                ),
	                React.createElement(_EchartsHeart.EchartsHeart, { heartrate: this.state.heartrate, measurestatus: measurestatus }),
	                React.createElement(
	                    'section',
	                    { className: 'measure' },
	                    React.createElement(
	                        'a',
	                        { onTouchStart: this.drawHeart.bind(this),
	                            href: "request://" + (measurestatus == 0 ? 'end' : "start"),
	                            className: measurestatus ? 'stop' : "start" },
	                        measurestatus ? '停止' : "开始"
	                    )
	                )
	            );
	        }
	    }]);

	    return PageHeart;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EchartsHeart = undefined;

	var _LocalFuns = __webpack_require__(9);

	var echartsDOM = null,
	    myChart = null,
	    changeyAxis = 0,
	    data = [],
	    option = {
	    grid: {
	        left: '10%',
	        right: '10%',
	        top: '5%',
	        bottom: '5%'
	    },
	    xAxis: {
	        type: 'time',
	        splitLine: {
	            show: false
	        },
	        axisLine: {
	            lineStyle: {
	                color: '#2b2d48'
	            }
	        },
	        axisLabel: {
	            show: false
	        },
	        axisTick: {
	            length: 0
	        }
	    },
	    yAxis: {
	        type: 'value',
	        //boundaryGap: [0, '100%'],
	        min: 0,
	        max: 150,
	        interval: 30,
	        splitNumber: 4,
	        axisTick: {
	            length: 0
	        },
	        splitLine: {
	            show: true,
	            lineStyle: {
	                color: 'rgba(106,119,249,0.2)'
	            }
	        },
	        axisLine: {
	            show: false
	        },
	        axisLabel: {
	            textStyle: {
	                color: '#6e757b'
	            }
	        }
	    },
	    visualMap: {
	        top: 100,
	        right: 10,
	        show: false,
	        textStyle: {
	            color: 'red'
	        },
	        pieces: [{
	            gt: 0,
	            lte: 20,
	            color: '#fff'
	        }, {
	            gt: 20,
	            lte: 50,
	            color: '#ddd'
	        }, {
	            gt: 50,
	            lte: 60,
	            color: 'green'
	        }, {
	            gt: 60,
	            lte: 100,
	            color: '#ed5416'
	        }, {
	            gt: 100,
	            lte: 160,
	            color: '#cc0033'
	        }, {
	            gt: 160,
	            color: 'red'
	        }],
	        outOfRange: {
	            color: '#999'
	        }
	    },
	    series: [{
	        name: '模拟数据',
	        type: 'line',
	        showSymbol: false,
	        hoverAnimation: false,
	        data: data,
	        smooth: true
	    }]
	};
	var now = +new Date(1997, 9, 3),
	    oneDay = 24 * 3600 * 1000,
	    randomData = function randomData(x) {
	    now = new Date(+now + oneDay);
	    //value = value + Math.random() * 21 - 10;
	    var obj = {
	        name: now.toString(),
	        value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), x || 60]
	    };
	    return obj;
	};
	for (var i = 0; i < 100; i++) {
	    data.push(randomData());
	}

	var EchartsHeart = exports.EchartsHeart = React.createClass({
	    displayName: 'EchartsHeart',
	    getInitialState: function getInitialState() {
	        return {};
	    },
	    liveError: function liveError() {
	        if (this.props.data.online == 2) {
	            return '设备已离线';
	        }
	        if (this.props.data.networkavailable == 2) {
	            return '当前网络不可用！';
	        }
	        return false;
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        console.log('----nextProps.measurestatus,this.props.measurestatus-------', nextProps.measurestatus, this.props.measurestatus);
	        //当renderline == true 开始重绘，构造一个有60个数据的数组
	        // if(nextProps.measurestatus!=this.props.measurestatus){
	        //     for(let i=0;i<60;i++){
	        //         data.push(randomData())
	        //     }
	        // }
	        if (nextProps.measurestatus) {
	            for (var i = 0; i < 5; i++) {
	                data.shift();
	                data.push(randomData(nextProps.heartrate));
	            }
	            console.log('data-----------', data);

	            if (nextProps.heartrate > 150 && changeyAxis == 0) {
	                changeyAxis = 1;
	                option.yAxis.max = 200;
	                option.yAxis.interval = 40;
	                option.yAxis.splitNumber = 5;
	                myChart.setOption({
	                    yAxis: {
	                        max: 200,
	                        interval: 40,
	                        splitNumber: 5
	                    }
	                });
	            }
	            myChart.setOption({
	                series: [{
	                    data: data
	                }]
	            });
	        }

	        //停止，清空数据
	        // if(!nextProps.measurestatus){
	        //     data=[];
	        //     myChart.setOption({
	        //         series: [{
	        //             data: data
	        //         }]
	        //     });
	        // }
	    },
	    componentDidMount: function componentDidMount() {
	        echartsDOM = document.querySelector('#air-curve');
	        myChart = echarts.init(echartsDOM);
	        myChart.setOption(option);
	    },
	    render: function render() {
	        return React.createElement(
	            'aside',
	            { className: 'heart-echarts' },
	            React.createElement('div', { id: 'air-curve', ref: 'airCurve', style: { height: '200px' } })
	        );
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PageConnect = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(8);

	var _LocalFuns = __webpack_require__(9);

	var _CanvasAnimation = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	var PageConnect = exports.PageConnect = function (_BaseComponent) {
	    _inherits(PageConnect, _BaseComponent);

	    function PageConnect(props) {
	        _classCallCheck(this, PageConnect);

	        var _this = _possibleConstructorReturn(this, (PageConnect.__proto__ || Object.getPrototypeOf(PageConnect)).call(this, props));

	        _this.state = {
	            percent: 0,
	            showClndr: false,
	            month: new Date().getMonth() + 1,
	            connect: 'scan'
	        };
	        _this.listenStore(_Store.Store);
	        return _this;
	    }

	    _createClass(PageConnect, [{
	        key: 'render',
	        value: function render() {
	            var canvas = {
	                connect: this.state.connect != undefined ? this.state.connect : 'scan',
	                showClndr: this.state.showClndr,
	                percent: this.state.percent,
	                stepCount: this.state.stepCount ? this.state.stepCount : 0,
	                calories: this.state.calories ? this.state.calories : 0,
	                status: 1
	            },
	                connect = this.state.connect != undefined ? this.state.connect : 'scan';
	            if (connect == 'syncOk') window.location.href = '#/';
	            //console.log(connect,'---------------connect--');
	            return React.createElement(
	                'main',
	                { className: 'connect-page' },
	                React.createElement(
	                    'nav',
	                    { className: 'nav' + _LocalFuns.isIOS },
	                    React.createElement(
	                        'a',
	                        { href: 'request://back' },
	                        ' '
	                    ),
	                    React.createElement(
	                        'a',
	                        null,
	                        this.state.title ? this.state.title : '智能手环'
	                    ),
	                    React.createElement(
	                        'a',
	                        { className: 'none' },
	                        ' '
	                    )
	                ),
	                React.createElement(_CanvasAnimation.Canvas, { data: canvas }),
	                React.createElement(
	                    'p',
	                    { className: connect == 'scan' ? "hint dark" : "hint blue" },
	                    connect != 'fail' ? '请稍等' : '请检查您的手机蓝牙是否开启'
	                ),
	                connect != 'sync' ? React.createElement(
	                    'a',
	                    { className: connect == 'scan' ? 'btn cancel' : 'btn connect', href: 'request://' + (connect != 'fail' ? 'cancel' : 'connect') },
	                    connect != 'fail' ? '取消' : '重新连接'
	                ) : null
	            );
	        }
	    }]);

	    return PageConnect;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Canvas = undefined;

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(8);

	var _LocalFuns = __webpack_require__(9);

	var timer = null,
	    time = 0,
	    canvas = null,
	    canvasBg = null,
	    context = null,
	    contextBg = null,
	    rotating = function rotating(context, text, color) {
	    context.save();
	    context.clearRect(0, 0, 480, 480);
	    context.height = 480;
	    context.width = 480;
	    //drawNotChange(context,text,color);
	    context.translate(240, 240);
	    context.beginPath();
	    context.lineCap = 'round';
	    context.lineWidth = 20;
	    context.strokeStyle = '#637efa';
	    context.rotate(time * Math.PI / 180);
	    context.translate(0, 0);
	    context.arc(0, 0, 230, Math.PI, Math.PI * 1.5, false);

	    context.stroke();
	    context.restore();

	    time += 1;
	},
	    drawNotChange = function drawNotChange(context, text, color) {
	    context.clearRect(0, 0, 480, 480);
	    //context.translate(240,240);
	    context.beginPath();
	    context.font = "60px sans-serif";
	    context.fillStyle = color;
	    context.textBaseline = "middle";
	    context.textAlign = 'center';
	    //context.fillText(text,-context.measureText(text).width/2,0);
	    context.fillText(text, 240, 240);
	    context.beginPath();
	    context.lineWidth = 20;
	    context.strokeStyle = 'rgba(0,0,0,0.4)';
	    context.arc(240, 240, 230, 0 * Math.PI, 2 * Math.PI);
	    context.stroke();
	};
	var Canvas = exports.Canvas = React.createClass({
	    displayName: 'Canvas',
	    componentDidMount: function componentDidMount() {
	        //旋转圆弧动画dom
	        canvas = document.getElementById('canvas');
	        context = canvas.getContext('2d');

	        //脏区重绘面积太大，整体擦除重绘，背景圆弧dom不参与重绘，另起炉灶
	        canvasBg = document.getElementById('canvas-bg');
	        contextBg = canvasBg.getContext('2d');

	        //默认进入就进入连接中状态
	        drawNotChange(contextBg, "正在连接中...", '#637efa');
	        clearInterval(timer);
	        timer = setInterval(function () {
	            rotating(context, "正在连接中...", '#637efa');
	        }, 16);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {
	        console.log('----------------first-----------------');
	        //canvas旋转动画流程控制
	        console.log(next.data.connect, 'next.data.connect-this.props.data.connect)', this.props.data.connect);
	        time = 0;
	        clearInterval(timer);
	        switch (this.props.data.connect) {
	            case 'fail':
	                context.clearRect(0, 0, 480, 480);选;
	                clearInterval(timer);
	                drawNotChange(contextBg, "手环连接失败", '#e95316');break;
	            case 'scan':
	                contextBg.clearRect(0, 0, 480, 480);
	                drawNotChange(contextBg, "正在连接中...", '#637efa');
	                timer = setInterval(function () {
	                    rotating(context, "正在连接中...", '#637efa');
	                }, 16);
	                break;
	            case 'sync':
	                drawNotChange(contextBg, "数据同步中...", '#fff');
	                timer = setInterval(function () {
	                    rotating(context, "数据同步中...", '#fff');
	                }, 16);break;
	            case 'syncOk':
	                clearInterval(timer);break;
	        }
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: _LocalFuns.isIOS },
	            React.createElement(
	                'section',
	                { className: this.props.data.showClndr ? 'dashboard transparent' : 'dashboard' },
	                React.createElement('canvas', { id: 'canvas-bg', className: 'canvas',
	                    width: '480', height: '480', style: { width: '21.55555556rem', height: '21.55555556rem' } }),
	                React.createElement('canvas', { id: 'canvas', className: 'canvas',
	                    width: '480', height: '480', style: { width: '21.55555556rem', height: '21.55555556rem' } })
	            )
	        );
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PageSleep = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(8);

	var _LocalFuns = __webpack_require__(9);

	var _EchartsSleep = __webpack_require__(20);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	var appData = {
	    year: new Date().getFullYear(),
	    month: new Date().getMonth() + 1, //请勿修改这里
	    sDay: new Date().getDate(),
	    eDay: new Date().getDate(),
	    sWeek: '',
	    eWeek: '',
	    viewType: 0,
	    getMonthDays: function getMonthDays(y, m) {
	        y = y || new Date().getFullYear();
	        m = m || new Date().getMonth() + 1;
	        //new Date(2017,2,0).getDate()   获取当前月有多少天 month需要加1，因为0会往后减一个月
	        return new Date(y, m, 0).getDate();
	    },
	    Get_Monday_Date: function Get_Monday_Date(y, m, d) {
	        //m从0开始
	        //获取自然周第一天的日期，默认周日是第一天 //2007,0,6
	        y ? y : new Date().getFullYear();
	        m ? m : new Date().getMonth();
	        d ? d : new Date().getDate();
	        var year = new Date(y, m, d).getFullYear(),
	            month = new Date(y, m, d).getMonth(),
	            date = new Date(y, m, d).getDate(),
	            day = new Date(y, m, d).getDay(),
	            sunDate = date - day; //当前日期减去当前星期几得到该自然周星期日的date
	        //获取自然周 ,如果今天就是周日,如果今天不是周日
	        var sunDateUTC = new Date(year, month, sunDate),
	            sunYear = sunDateUTC.getFullYear(),
	            sunMonth = sunDateUTC.getMonth() + 1,
	            sun = sunDateUTC.getDate();
	        // console.log(year,month,date,day,sunDate,sunDateUTC);
	        return sunYear + '-' + (0, _LocalFuns.fillZero)(sunMonth) + '-' + (0, _LocalFuns.fillZero)(sun);
	    }
	};

	var PageSleep = exports.PageSleep = function (_BaseComponent) {
	    _inherits(PageSleep, _BaseComponent);

	    function PageSleep(props) {
	        _classCallCheck(this, PageSleep);

	        var _this = _possibleConstructorReturn(this, (PageSleep.__proto__ || Object.getPrototypeOf(PageSleep)).call(this, props));

	        _this.state = {
	            networkavailable: 1,
	            title: '睡眠',
	            sleepQuality: '暂无数据',
	            weeklyQuality: '',
	            monthlyQuality: '',
	            viewType: 0,
	            isLine: 1,
	            dateRange: '',
	            isEmpty: true,
	            list: [],
	            sleep: {
	                //多日数据
	                goodStatus: '--',
	                normalStatus: '--',
	                badStatus: '--',
	                //单日数据
	                deepSleep: null,
	                sleepTime: null,
	                shallowSleep: null,
	                sleepQuality: '--'
	            }
	        };
	        _this.listenStore(_Store.Store);
	        _this.timer = null;
	        _this.sendParams = function (sDay, eDay) {
	            _Actions.Actions.reqHistory({
	                beginDate: sDay,
	                endDate: eDay,
	                type: 'sleep'
	            });
	        };
	        _this.changeView = _this.changeView.bind(_this);
	        _this.changeDate = _this.changeDate.bind(_this);
	        return _this;
	    }

	    _createClass(PageSleep, [{
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            return false;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            appData.viewType = 0;
	            appData.year = new Date().getFullYear();
	            appData.month = new Date().getMonth() + 1; //谨慎修改这里
	            appData.sDay = new Date().getDate();
	            appData.eDay = new Date().getDate();
	            appData.sWeek = '';
	            appData.eWeek = '';
	            var beginDate = appData.year + '-' + (appData.month < 10 ? '0' + appData.month : appData.month) + '-' + (appData.sDay < 10 ? '0' + appData.sDay : appData.sDay),
	                endDate = beginDate;
	            //console.log(beginDate,'----------------beginDate');//
	            this.sendParams(beginDate, endDate);
	            this.setState({
	                dateRange: appData.year + '.' + appData.month + '.' + appData.sDay
	            });
	            var nav = document.querySelector('#nav').offsetHeight,
	                arrow = document.querySelector('#arrow-date').offsetHeight,
	                viewHeight = window.screen.height,
	                chartWrapperHeight = viewHeight - arrow - nav;
	            this.setState({
	                wrapperHeight: chartWrapperHeight + 'px'
	            });
	            console.log('xxxxxxxxx', appData.year + '.' + appData.month + '.' + appData.sDay);
	        }
	    }, {
	        key: 'changeDate',
	        value: function changeDate(e) {
	            var _this2 = this;

	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            clearTimeout(this.timer);
	            var self = this,
	                date = function date(i) {
	                if (i) {
	                    return new Date(i);
	                } else {
	                    return new Date();
	                }
	            },
	                nowDay = date().getDate(),
	                nowMonth = date().getMonth() + 1,
	                nowYear = date().getFullYear(),

	            //点击事件获取到的当前模块的对应索引，日周月索引和测试部位索引共用一个
	            index = e.currentTarget.getAttribute('data-index');

	            //按日/周/月减少 >>>  点击选择时间范围
	            if (e.currentTarget.getAttribute('data-type') === 'minus') {
	                //按日减少
	                if (appData.viewType == 0) {
	                    (function () {
	                        //1月1日再减判断
	                        if (appData.month == 1 && appData.eDay == 1) {
	                            --appData.year;
	                            console.log('appData.year------------', appData.year);
	                            appData.month = 12;
	                            appData.sDay = 31;
	                        } else {
	                            if (appData.sDay == 1) {
	                                --appData.month;
	                                //其实这里用了0值递减月的规律， new Date(2017,2,0).getDate() 2其实传入的3月，但是日期初始值是1，所以0，会递减一个月，得到2月的最后天
	                                appData.sDay = new Date(appData.year, appData.month, 0).getDate();
	                            } else {
	                                --appData.sDay;
	                            }
	                        }
	                        //按天减少时,开始和结束都是一天,只是时刻不同
	                        appData.eDay = appData.sDay;
	                        console.log('----------------appData.year------appData.month- sDay--', appData.year, appData.month, appData.sDay);
	                        self.setState({
	                            dateRange: appData.year + '.' + appData.month + '.' + appData.sDay
	                        });

	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.sDay);

	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, beginDate);
	                        }, 1000);
	                    })();
	                }
	                //按周减少
	                if (appData.viewType == 1) {
	                    console.log(appData.sWeek, appData.eWeek, 'init values');
	                    var sYear = new Date(appData.sWeek).getFullYear(),
	                        sMonth = new Date(appData.sWeek).getMonth(),
	                        sDate = new Date(appData.sWeek).getDate(),
	                        newEDate = sDate - 1;
	                    //特殊情况处理
	                    if (newEDate == 0) {
	                        var newEDateUTC = new Date(sYear, sMonth, 0);
	                        sYear = new Date(newEDateUTC).getFullYear();
	                        sMonth = new Date(newEDateUTC).getMonth();
	                        newEDate = new Date(newEDateUTC).getDate();
	                    }
	                    //根据计算出的newEDate计算newSDate
	                    appData.sWeek = appData.Get_Monday_Date(sYear, sMonth, newEDate);
	                    appData.eWeek = sYear + '-' + (sMonth + 1 < 10 ? '0' + (sMonth + 1) : sMonth + 1) + '-' + (newEDate < 10 ? '0' + newEDate : newEDate);
	                    console.log(newEDate, 'newEDate', appData.sWeek, appData.eWeek, 'appData.sWeek,appData.eWeek');

	                    this.setState({
	                        dateRange: appData.sWeek + '~' + appData.eWeek
	                    });
	                    self.timer = setTimeout(function () {
	                        self.sendParams(appData.sWeek, appData.eWeek);
	                    }, 1000);
	                    //console.log('-----appData.year--appData.month---------appData.sDay----appData.eDay----',appData.year,appData.month,appData.sDay,appData.eDay)
	                }
	                //按月减少
	                if (appData.viewType == 2) {
	                    (function () {
	                        if (appData.month == 1) {
	                            --appData.year, appData.month = 12, appData.eDay = 31;
	                        } else {
	                            --appData.month;
	                            appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                        }
	                        appData.sDay = 1;

	                        _this2.setState({
	                            dateRange: appData.year + '年' + appData.month + '月'
	                        });

	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + '01',
	                            endDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);
	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, endDate);
	                        }, 1000);
	                    })();
	                }
	            }
	            //按日/周/月增加 >>>  点击选择时间范围
	            if (e.currentTarget.getAttribute('data-type') === 'plus') {
	                //console.log('------nowYear--nowMonth--nowDay-----',nowYear,nowMonth,nowDay);
	                //console.log('--appData.sWeek,appData.eWeek',appData.sWeek,appData.eWeek)
	                //按日增加
	                if (appData.viewType == 0) {
	                    var _ret3 = function () {
	                        if (appData.month == nowMonth && appData.year == nowYear && appData.eDay == nowDay) {
	                            console.log('今天以后还没有数据');
	                            het.toast('未来日期没有数据');
	                            return {
	                                v: false
	                            };
	                        }
	                        //每个月中最大的一天
	                        var maxDay = new Date(appData.year, appData.month, 0).getDate();
	                        ++appData.eDay;
	                        console.log('appData.eDay', appData.eDay, 'appData.eDay', appData.eDay);
	                        if (appData.eDay > maxDay) {
	                            appData.month != 12 ? ++appData.month : (++appData.year, appData.month = 1);
	                            appData.eDay = 1;
	                        };
	                        appData.sDay = appData.eDay;
	                        console.log('----------------appData.year------appData.month-eDay--', appData.year, appData.month, appData.eDay);
	                        _this2.setState({
	                            dateRange: appData.year + '.' + appData.month + '.' + appData.eDay
	                        });

	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);

	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, beginDate);
	                        }, 1000); //
	                    }();

	                    if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	                }
	                //按周增加
	                if (appData.viewType == 1) {
	                    console.log(appData.sWeek, appData.eWeek, 'init values');
	                    var eYear = new Date(appData.eWeek).getFullYear(),
	                        eMonth = new Date(appData.eWeek).getMonth(),
	                        eDate = new Date(appData.eWeek).getDate(),
	                        cDate = new Date().getDate(),
	                        cMonth = new Date().getMonth(),
	                        cYear = new Date().getFullYear();

	                    if (eDate >= cDate && eMonth >= cMonth && eYear >= cYear) {
	                        console.log('今天以后的数据还没有测量哦!');
	                        het.toast('未来日期没有数据');
	                        return false;
	                    }

	                    var nSUTC = new Date(eYear, eMonth, eDate + 1),
	                        nEUTC = new Date(eYear, eMonth, eDate + 7),
	                        nSYear = new Date(nSUTC).getFullYear(),
	                        nSMonth = new Date(nSUTC).getMonth() + 1,
	                        nSDate = new Date(nSUTC).getDate(),
	                        nEYear = new Date(nEUTC).getFullYear(),
	                        nEMonth = new Date(nEUTC).getMonth() + 1,
	                        nEDate = new Date(nEUTC).getDate();

	                    appData.sWeek = nSYear + '-' + (0, _LocalFuns.fillZero)(nSMonth) + '-' + (0, _LocalFuns.fillZero)(nSDate);
	                    appData.eWeek = nEYear + '-' + (0, _LocalFuns.fillZero)(nEMonth) + '-' + (0, _LocalFuns.fillZero)(nEDate);
	                    //如果超过今天强置为今天
	                    if (nEYear >= cYear && nEMonth - 1 >= cMonth && nEDate >= cDate) {

	                        appData.eWeek = cYear + '-' + (0, _LocalFuns.fillZero)(cMonth + 1) + '-' + (0, _LocalFuns.fillZero)(cDate);
	                    }
	                    this.setState({
	                        dateRange: appData.sWeek + '~' + appData.eWeek
	                    });

	                    self.timer = setTimeout(function () {
	                        self.sendParams(appData.sWeek, appData.eWeek);
	                    }, 1000);

	                    console.log('nSUTC', nSUTC, 'nEUTC', nEUTC, 'appData.sWeek', appData.sWeek, 'appData.eWeek', appData.eWeek);
	                }
	                //按月增加
	                if (appData.viewType == 2) {
	                    var _ret4 = function () {
	                        if (appData.year == new Date().getFullYear() && appData.month == new Date().getMonth() + 1) {
	                            het.toast('未来日期没有数据');
	                            return {
	                                v: false
	                            };
	                        };
	                        appData.sDay = 1;
	                        //当前年就不用递增了
	                        if (appData.year < nowYear) {
	                            if (appData.month == 12) {
	                                ++appData.year;
	                                appData.month = 1;
	                                appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                            } else {
	                                ++appData.month;
	                                appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                            }
	                        } else {
	                            if (appData.month < nowMonth) {
	                                ++appData.month;
	                                appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                            }
	                            if (appData.month == nowMonth) {
	                                //如果等于了当前月，则重置当前月的结束时间为今天的时间
	                                appData.eDay = new Date().getDate();
	                            }
	                        }
	                        _this2.setState({
	                            dateRange: appData.year + '年' + appData.month + '月'
	                        });

	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + '01',
	                            endDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);
	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, endDate);
	                        }, 1000);
	                        //console.log('-------year--month---sDay--eDay-----',appData.year,appData.month,appData.sDay,appData.eDay)
	                    }();

	                    if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
	                };
	            }
	            console.log('选择的日月年', appData.eDay, appData.month, appData.year);
	        }
	    }, {
	        key: 'changeView',
	        value: function changeView(e) {
	            var _this3 = this;

	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            if (e.currentTarget['className'] == 'flex-cell active') return;
	            clearTimeout(this.timer);
	            var self = this,
	                viewType = e.currentTarget.getAttribute('data-i');
	            if (viewType == 0) {
	                (function () {
	                    appData.sDay = new Date().getDate();
	                    appData.eDay = appData.sDay;
	                    appData.month = new Date().getMonth() + 1;
	                    appData.eWeek = '';
	                    appData.sWeek = '';

	                    _this3.setState({
	                        dateRange: appData.year + '.' + appData.month + '.' + appData.sDay
	                    });

	                    var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.sDay);

	                    self.timer = setTimeout(function () {
	                        self.sendParams(beginDate, beginDate);
	                    }, 1000);
	                })();
	            }
	            if (viewType == 1) {
	                //获取当前时间
	                var eYear = new Date().getFullYear(),
	                    eMonth = new Date().getMonth(),
	                    eDay = new Date().getDate();

	                appData.eWeek = eYear + '-' + (0, _LocalFuns.fillZero)(eMonth + 1) + '-' + (0, _LocalFuns.fillZero)(eDay);
	                appData.sWeek = appData.Get_Monday_Date(eYear, eMonth, eDay);

	                this.setState({
	                    dateRange: appData.sWeek + '~' + appData.eWeek
	                });

	                self.timer = setTimeout(function () {
	                    self.sendParams(appData.sWeek, appData.eWeek);
	                }, 1000);
	                console.log('appData.eWeek', appData.eWeek, 'appData.sWeek', appData.sWeek);
	            }
	            if (viewType == 2) {
	                (function () {
	                    appData.year = new Date().getFullYear();
	                    appData.month = new Date().getMonth() + 1;
	                    appData.eDay = new Date().getDate();
	                    _this3.setState({
	                        dateRange: appData.year + '年' + appData.month + '月'
	                    });
	                    var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + '01',
	                        endDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);
	                    self.timer = setTimeout(function () {
	                        self.sendParams(beginDate, endDate);
	                    }, 1000);
	                })();
	            }
	            appData.viewType = viewType;
	            this.setState({
	                viewType: viewType
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var sleepTime = '--',
	                deepSleep = '--',
	                shallowSleep = '--',
	                sleepQuality = '--',
	                badStatus = '--',
	                goodStatus = '--',
	                normalStatus = '--',
	                viewType = this.state.viewType !== undefined ? this.state.viewType : 0,
	                config = {
	                isLine: this.state.isLine != undefined ? this.state.isLine : 0,
	                viewType: this.state.viewType,
	                list: this.state.list != undefined ? this.state.list : [],
	                timestamp: this.state.timestamp
	            };
	            if (this.state.sleep) {
	                badStatus = this.state.sleep.badStatus != undefined ? this.state.sleep.badStatus : '--', goodStatus = this.state.sleep.goodStatus != undefined ? this.state.sleep.goodStatus : '--', normalStatus = this.state.sleep.normalStatus != undefined ? this.state.sleep.normalStatus : '--';
	                if (this.state.sleep.sleepTime) {
	                    sleepTime = this.state.sleep.sleepTime.slice(0, 2) + ':' + this.state.sleep.sleepTime.slice(3, 5);
	                }
	                if (this.state.sleep.deepSleep) {
	                    deepSleep = this.state.sleep.deepSleep.slice(0, 2) + ':' + this.state.sleep.deepSleep.slice(3, 5);
	                }
	                if (this.state.sleep.shallowSleep) {
	                    shallowSleep = this.state.sleep.shallowSleep.slice(0, 2) + ':' + this.state.sleep.shallowSleep.slice(3, 5);
	                }
	                if (this.state.sleep) {
	                    sleepQuality = this.state.sleep.sleepQuality != undefined ? this.state.sleep.sleepQuality : '--';
	                }
	                console.log('sleepTime---------.state.sleep.sleepTime--', sleepTime, 1 /*this.state.sleep.sleepTime*/);
	            };
	            return React.createElement(
	                'main',
	                { className: 'page-heart' + _LocalFuns.isIOS },
	                React.createElement(
	                    'nav',
	                    { id: 'nav', className: 'nav' + _LocalFuns.isIOS },
	                    React.createElement(
	                        'a',
	                        { onClick: function onClick() {
	                                window.location.href = '#/';
	                            } },
	                        ' '
	                    ),
	                    React.createElement(
	                        'a',
	                        null,
	                        '\u7761\u7720'
	                    ),
	                    React.createElement(
	                        'a',
	                        { className: 'none' },
	                        ' '
	                    )
	                ),
	                React.createElement(
	                    'figure',
	                    { id: 'arrow-date', className: 'date-select' },
	                    React.createElement('i', { 'data-type': 'minus', onClick: this.changeDate }),
	                    React.createElement(
	                        'i',
	                        null,
	                        this.state.dateRange
	                    ),
	                    React.createElement('i', { 'data-type': 'plus', onClick: this.changeDate })
	                ),
	                React.createElement(
	                    'section',
	                    { style: { height: this.state.wrapperHeight ? this.state.wrapperHeight : 'auto', overflowY: 'scroll' } },
	                    React.createElement(
	                        'section',
	                        { className: viewType == 0 ? 'module-a sleep-a' : 'hide' },
	                        React.createElement(
	                            'h2',
	                            null,
	                            sleepQuality
	                        ),
	                        React.createElement(
	                            'div',
	                            null,
	                            '\u7761\u7720\u8D28\u91CF'
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: "mileage flex" },
	                        React.createElement(
	                            'aside',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'h2',
	                                { className: viewType == 0 ? '' : 'blue' },
	                                viewType == 0 ? sleepTime : goodStatus
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: 'dark-gray' },
	                                viewType == 0 ? '睡眠时长' : '很好'
	                            )
	                        ),
	                        React.createElement(
	                            'aside',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'h2',
	                                { className: viewType == 0 ? '' : 'blue' },
	                                viewType == 0 ? deepSleep : normalStatus
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: 'dark-gray' },
	                                React.createElement(
	                                    'b',
	                                    { className: viewType == 0 ? "purple" : 'hide' },
	                                    '\u2022\xA0'
	                                ),
	                                viewType == 0 ? '深睡' : '正常'
	                            )
	                        ),
	                        React.createElement(
	                            'aside',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'h2',
	                                { className: viewType == 0 ? '' : 'blue' },
	                                viewType == 0 ? shallowSleep : badStatus
	                            ),
	                            React.createElement(
	                                'h5',
	                                { className: 'dark-gray' },
	                                React.createElement(
	                                    'b',
	                                    { className: viewType == 0 ? "blue" : 'hide' },
	                                    '\u2022\xA0'
	                                ),
	                                viewType == 0 ? '浅睡' : '不好'
	                            )
	                        )
	                    ),
	                    React.createElement(_EchartsSleep.EchartsSleep, { config: config })
	                ),
	                React.createElement(
	                    'section',
	                    { className: "module-footer flex" },
	                    ['日', '周', '月'].map(function (o, i) {
	                        return React.createElement(
	                            'span',
	                            { className: "flex-cell" + (this.state.viewType == i ? ' active' : ''),
	                                key: i, 'data-i': i, onTouchTap: this.changeView },
	                            o
	                        );
	                    }.bind(this))
	                )
	            );
	        }
	    }]);

	    return PageSleep;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EchartsSleep = undefined;

	var _fun = __webpack_require__(6);

	var _LocalFuns = __webpack_require__(9);

	var echartsDOM = null,
	    myChart = null,
	    xAxisData = [],
	    sleepStatusData = [],
	    deepSleepData = [],
	    shallowSleepData = [],
	    stackSleepData = [],
	    data = [],

	//series data format
	// data= [
	//     ["2000-06-05",12],["2000-06-06",10],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73]
	// ];
	// data.map((o)=>{
	//     if(o[1] > 10 )  o[1] = parseInt(Math.random(10)*10)
	// });
	//defaultxAxisData = ['02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','23:59'],
	option = {
	    grid: {
	        left: '15%',
	        right: '5%',
	        top: '5%',
	        bottom: '15%'
	    },
	    tooltip: {
	        show: true,
	        trigger: "axis"
	    },
	    xAxis: {
	        data: [],
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            lineStyle: {
	                color: 'rgba(106,119,249,0.2)'
	            }
	        }
	    },
	    yAxis: {
	        type: 'category',
	        splitLine: {
	            show: false
	        },
	        nameLocation: 'middle',
	        axisTick: {
	            show: false
	        },
	        boundaryGap: false,
	        margin: 20,
	        nameGap: 0,
	        data: function () {
	            var arr = [];
	            for (var i = 0; i < 11; i++) {
	                arr[i] = '';
	                if (i == 1) {
	                    arr[1] = {
	                        value: '清醒',
	                        textStyle: {
	                            color: '#2fcbb3',
	                            baseline: 'middle'
	                        },
	                        splitLine: {
	                            show: false
	                        }
	                    };
	                }
	                if (i == 9) {
	                    arr[9] = {
	                        value: '浅睡',
	                        textStyle: {
	                            color: '#3f56ff',
	                            baseline: 'middle'
	                        },
	                        splitLine: {
	                            show: false
	                        }
	                    };
	                }
	                if (i == 10) {
	                    arr[10] = {
	                        value: '深睡',
	                        textStyle: {
	                            color: '#c930f5',
	                            baseline: 'middle'
	                        },
	                        splitLine: {
	                            show: false
	                        }
	                    };
	                }
	            }
	            return arr;
	        }(),
	        min: 0,
	        max: 11,
	        interval: 2,
	        splitNumber: 2,
	        onZero: true,
	        splitArea: {
	            interval: 3
	        },
	        axisLine: {
	            show: false
	        }

	    },
	    visualMap: {
	        top: 0,
	        right: 10,
	        show: false,
	        textStyle: {
	            color: 'red'
	        },
	        pieces: [{
	            gt: 0,
	            lte: 1,
	            color: '#2fcbb3'
	        }, {
	            gt: 1,
	            lte: 9,
	            color: 'blue'
	        }, {
	            gt: 9,
	            lte: 11,
	            color: '#c930f5'
	        }, {
	            gt: 300,
	            color: '#2fcbb3'
	        }],
	        outOfRange: {
	            color: '#999'
	        }
	    },
	    series: {
	        name: '睡眠质量',
	        type: 'line',
	        smooth: true,
	        data: [],
	        // itemStyle: {
	        //     normal:{
	        //         // color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [
	        //         //     {
	        //         //         offset: 0, color:  'green'
	        //         //     },{
	        //         //         offset: 0.2, color: '#fff'
	        //         //     },
	        //         //     {
	        //         //         offset: 1, color: '#ddd'
	        //         //     },
	        //         //     {
	        //         //         offset: 1, color: 'blue'
	        //         //     },
	        //         //     {
	        //         //         offset: 1, color: 'red'
	        //         //     }
	        //         //     ], false)
	        //     }
	        // },
	        markLine: {
	            silent: true,
	            symbolSize: 0,
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            lineStyle: {
	                normal: {
	                    type: 'solid',
	                    color: 'rgba(106,119,249,0.2)'
	                }
	            },
	            data: [{
	                yAxis: 1
	            }, {
	                yAxis: 9
	            }, {
	                yAxis: 10
	            }]
	        }
	    }
	},
	    optionBar = {
	    grid: {
	        left: '12%',
	        right: '5%',
	        bottom: '15%',
	        top: '15%'
	    },
	    legend: {
	        show: true,
	        itemWidth: 8,
	        top: 0,
	        right: '5%',
	        selectedMode: false,
	        data: [{
	            name: '深睡',
	            icon: 'circle',
	            textStyle: {
	                color: '#b0bac4',
	                fontSize: 13
	            }
	        }, {
	            name: '浅睡',
	            icon: 'circle',
	            textStyle: {
	                color: '#b0bac4',
	                fontSize: 13
	            }
	        }]
	    },
	    xAxis: {
	        type: 'category',
	        data: [],
	        axisTick: {
	            show: false
	        },
	        axisLabel: {
	            textStyle: {
	                color: '#6e757b'
	            }
	        }
	    },
	    yAxis: {
	        type: 'value',
	        min: 0,
	        max: 12,
	        splitNumber: 6,
	        interval: 2,
	        axisLabel: {
	            textStyle: {
	                color: '#6e757b'
	            },
	            formatter: function formatter(v, i) {
	                return v == 0 ? '' : v + 'h';
	            }
	        },
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        },
	        splitLine: {
	            lineStyle: {
	                color: 'rgba(106,119,249,0.2)'
	            }
	        }
	    },
	    tooltip: {
	        show: true,
	        trigger: "axis",
	        axisPointer: {
	            type: "shadow",
	            textStyle: {
	                color: "#fff"
	            }
	        },
	        formatter: function formatter(param) {
	            console.log('数据项', param);
	            return param[0].name + '<br/>' + '<i style="display:inline-block;width: 8px;height: 8px;margin-right:3px;background: #c52ff0;border-radius: 50%;"></i>' + param[0].seriesName + ':' + param[0].data + 'h' + '<br/>' + '<i style="display:inline-block;width: 8px;height: 8px;margin-right:3px;background: #3e55ff;border-radius: 50%;"></i>' + param[1].seriesName + ':' + param[1].data + 'h' + '<br/>'
	            //'<i style="display:inline-block;width: 8px;height: 8px;margin-right:3px;background: #ffffff;border-radius: 50%;"></i>' + param[2].seriesName+':'+param[2].data+'h'
	            ;
	        }
	    },
	    dataZoom: [{
	        "type": "inside",
	        "show": true,
	        "start": 0,
	        "end": 100
	    }],
	    series: [{
	        type: 'bar',
	        name: '深睡',
	        stack: 'All',
	        data: [],
	        barWidth: '8',
	        barGap: '-100%',
	        itemStyle: {
	            normal: {
	                color: '#c52ff0',
	                barBorderRadius: 4
	            }
	        },
	        markline: {
	            show: false
	        },
	        z: 30
	    }, {
	        type: 'bar',
	        name: '浅睡',
	        stack: 'All',
	        data: [],
	        barGap: '-100%',
	        barWidth: '8',
	        barCategoryGap: '30%',
	        itemStyle: {
	            normal: {
	                color: '#3e55ff',
	                barBorderRadius: 4
	            }
	        },
	        markline: {
	            show: false
	        },
	        z: 20
	    }, {
	        type: 'bar',
	        name: '总计',
	        data: [],
	        barWidth: '8',
	        barGap: '-100%',
	        itemStyle: {
	            normal: {
	                color: '#3e55ff',
	                barBorderRadius: 4
	            }
	        },
	        markline: {
	            show: false
	        },
	        z: 10
	    }]
	};

	var EchartsSleep = exports.EchartsSleep = React.createClass({
	    displayName: 'EchartsSleep',
	    getInitialState: function getInitialState() {
	        return {};
	    },
	    componentDidMount: function componentDidMount() {
	        echartsDOM = document.getElementById('echarts-sleep');
	        myChart = echarts.init(echartsDOM);

	        //周月和日不同的曲线
	        this.props.config.viewType == 0 ? myChart.setOption(option) : myChart.setOption(optionBar);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        xAxisData = [];
	        sleepStatusData = [];
	        deepSleepData = [];
	        shallowSleepData = [];
	        stackSleepData = [];
	        //日数据
	        var temp = '';
	        if (nextProps.config.viewType == 0) {
	            if (nextProps.config.list.length !== 0) {
	                nextProps.config.list.map(function (o, i) {
	                    //UTC+8小时，显示 20:33 分类似的格式
	                    temp = _fun.Funs.dateFormat(o.dateTime, 'hh:mm', true);
	                    //o.dateTime = temp;
	                    //o.dateTime = o.dateTime.slice(11,o.dateTime.length);
	                    //o.dateTime = o.dateTime.replace('-','.');
	                    xAxisData.push(temp);
	                    if (o.status == null || o.status == -1) o.status = 0;

	                    sleepStatusData.push(o.status);
	                    console.log('切换日数据');
	                });
	            }
	            //console.log(option.xAxis.data,option.series.data);
	            option.xAxis.data = xAxisData;
	            option.series.data = sleepStatusData;

	            if (nextProps.config.timestamp != this.props.config.timestamp) {
	                myChart = echarts.init(echartsDOM);

	                myChart.setOption(option);
	            }
	        }
	        //周或月数据
	        if (nextProps.config.viewType != 0) {
	            console.log('切换1周月数据');
	            if (nextProps.config.list.length !== 0) {
	                nextProps.config.list.map(function (o, i) {
	                    o.dateTime = o.dateTime.slice(-5, o.dateTime.length);
	                    o.dateTime = o.dateTime.replace('-', '.');
	                    xAxisData.push(o.dateTime);
	                    if (o.deepSleep == null) {
	                        o.deepSleep = 0;
	                    } else {
	                        o.deepSleep = parseInt(o.deepSleep / 60) == o.deepSleep / 60 ? o.deepSleep / 60 : (o.deepSleep / 60).toFixed(2);
	                        o.deepSleep > 24 && (o.deepSleep = 24);
	                    }

	                    if (o.shallowSleep == null) {
	                        o.shallowSleep = 0;
	                    } else {
	                        o.shallowSleep = parseInt(o.shallowSleep / 60) == o.shallowSleep / 60 ? o.shallowSleep / 60 : (o.shallowSleep / 60).toFixed(2);
	                        o.shallowSleep > 24 && (o.shallowSleep = 24);
	                    }
	                    var sum = (o.deepSleep * 100 + o.shallowSleep * 100) / 100;
	                    deepSleepData.push(parseFloat(o.deepSleep));
	                    shallowSleepData.push(parseFloat(o.shallowSleep));
	                    stackSleepData.push(sum);
	                });

	                //月柱显示判断
	                if (nextProps.config.viewType == 2) {
	                    if (xAxisData.length < 15) optionBar.dataZoom[0].end = 100;
	                    if (xAxisData.length >= 15 && xAxisData.length < 20) optionBar.dataZoom[0].end = 45;
	                    if (xAxisData.length >= 20) optionBar.dataZoom[0].end = 15;
	                }
	                //周柱恢复全显
	                if (nextProps.config.viewType == 1) optionBar.dataZoom[0].end = 100;
	                optionBar.yAxis.max = (0, _LocalFuns.arrayMax)(stackSleepData) > 12 ? 24 : 12;
	                console.log('optionBar.yAxis.max ', optionBar.yAxis.max, 'stackSleepData', stackSleepData);
	                if (optionBar.yAxis.max > 12) {
	                    optionBar.yAxis.interval = 4;
	                } else {
	                    optionBar.yAxis.interval = 2;
	                }
	                optionBar.xAxis.data = xAxisData;
	                optionBar.series[0].data = deepSleepData;
	                optionBar.series[1].data = shallowSleepData;
	                optionBar.series[2].data = stackSleepData;
	            }

	            //假数据
	            // xAxisData =        ["03.01", "03.02", "03.03", "03.04", "03.05", "03.06", "03.07", "03.08", "03.09", "03.10", "03.11", "03.12", "03.13"];
	            // deepSleepData =    [ 14.3, 11.8,  0,  14.3, 10.5, 0,  14, 0, 0, 10.3, 0, 0, 9.3 ];
	            // shallowSleepData = [ 0,     2.3,  0,  0   , 3.5 , 0,   0, 0, 0, 3.8 , 0, 0, 0   ];
	            // stackSleepData =   [ 14.3, 14.1,  0,  14.3, 14  , 0,  14, 0, 0, 14.1, 0, 0, 9.3 ];
	            if (nextProps.config.timestamp != this.props.config.timestamp) {
	                myChart = echarts.init(echartsDOM);

	                /*this.props.config.viewType==0 ? myChart.setOption(option) :*/myChart.setOption(optionBar);
	            }
	        }
	        //console.log(xAxisData,'xAxis----------- xAxisData',deepSleepData,shallowSleepData,stackSleepData);
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        xAxisData = [];
	        sleepStatusData = [];
	        deepSleepData = [];
	        shallowSleepData = [];
	        stackSleepData = [];

	        option.xAxis.data = [];
	        optionBar.xAxis.data = [];

	        this.props.config.viewType == 0 ? myChart.setOption(option) : myChart.setOption(optionBar);

	        if (this.props.config.viewType != 0) {
	            optionBar.series[0].data = [];
	            optionBar.series[1].data = [];
	            optionBar.series[2].data = [];
	            myChart.setOption(optionBar);
	        } else {
	            myChart.setOption(option);
	        }
	    },
	    render: function render() {
	        return React.createElement(
	            'aside',
	            { className: 'heart-echarts', style: { paddingBottom: '7rem' } },
	            React.createElement('div', { id: 'echarts-sleep', style: { height: '250px' } })
	        );
	    }
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PageSport = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(8);

	var _EchartsSport = __webpack_require__(22);

	var _LocalFuns = __webpack_require__(9);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var appData = {
	    year: new Date().getFullYear(), //接口参数的年
	    month: new Date().getMonth() + 1, //谨慎修改这里  接口参数的月
	    sDay: new Date().getDate(), //接口参数的开始日
	    eDay: new Date().getDate(), //接口参数的结束日
	    sWeek: '',
	    eWeek: '',
	    type: 0,
	    getMonthDays: function getMonthDays(y, m) {
	        y = y || new Date().getFullYear();
	        m = m || new Date().getMonth() + 1;
	        //new Date(2017,2,0).getDate()   获取当前月有多少天 month需要加1，因为0会往后减一个月
	        return new Date(y, m, 0).getDate();
	    },
	    Get_Monday_Date: function Get_Monday_Date(y, m, d) {
	        //m从0开始
	        //获取自然周第一天的日期，默认周日是第一天 //2007,0,6
	        y ? y : new Date().getFullYear();
	        m ? m : new Date().getMonth();
	        d ? d : new Date().getDate();
	        var year = new Date(y, m, d).getFullYear(),
	            month = new Date(y, m, d).getMonth(),
	            date = new Date(y, m, d).getDate(),
	            day = new Date(y, m, d).getDay(),
	            sunDate = date - day; //当前日期减去当前星期几得到该自然周星期日的date
	        //获取自然周 ,如果今天就是周日,如果今天不是周日
	        var sunDateUTC = new Date(year, month, sunDate),
	            sunYear = sunDateUTC.getFullYear(),
	            sunMonth = sunDateUTC.getMonth() + 1,
	            sun = sunDateUTC.getDate();
	        // console.log(year,month,date,day,sunDate,sunDateUTC);
	        return sunYear + '-' + (0, _LocalFuns.fillZero)(sunMonth) + '-' + (0, _LocalFuns.fillZero)(sun);
	    }
	};

	var PageSport = exports.PageSport = function (_BaseComponent) {
	    _inherits(PageSport, _BaseComponent);

	    function PageSport(props) {
	        _classCallCheck(this, PageSport);

	        var _this = _possibleConstructorReturn(this, (PageSport.__proto__ || Object.getPrototypeOf(PageSport)).call(this, props));

	        _this.state = _defineProperty({
	            networkavailable: 1,
	            type: 0,
	            dateRange: '',
	            calories: '--',
	            stepCount: '--',
	            kilometer: '--',
	            caloriesList: [],
	            stepList: [],
	            isEmpty: true,
	            title: '',
	            timestamp: +new Date().getTime()
	        }, 'dateRange', new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate());
	        _this.listenStore(_Store.Store);
	        _this.timer = null;
	        _this.sendParams = function (sDay, eDay) {
	            _Actions.Actions.reqHistory({
	                beginDate: sDay,
	                endDate: eDay,
	                type: 'sport'
	            });
	        };
	        _this.changeView = _this.changeView.bind(_this);
	        _this.changeDate = _this.changeDate.bind(_this);
	        return _this;
	    }

	    _createClass(PageSport, [{
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            return false;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            appData.type = 0;
	            appData.year = new Date().getFullYear();
	            appData.month = new Date().getMonth() + 1; //谨慎修改这里
	            appData.sDay = new Date().getDate();
	            appData.eDay = new Date().getDate();
	            appData.sWeek = '';
	            appData.eWeek = '';
	            var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(new Date().getMonth() + 1) + '-' + (0, _LocalFuns.fillZero)(new Date().getDate()),
	                endDate = beginDate;
	            console.log(beginDate, '----------------beginDate');
	            this.sendParams(beginDate, endDate);
	            this.setState({
	                dateRange: new Date().getFullYear() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getDate()
	            });

	            console.log('xxxxxxxxxxxxxxxxxx', appData.year + '.' + appData.month + '.' + appData.sDay);
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            appData.year = new Date().getFullYear();
	            appData.month = new Date().getMonth() + 1;
	            appData.sDay = new Date().getDate();
	            appData.eDay = new Date().getDate();
	            appData.sWeek = '';
	            appData.eWeek = '';
	        }
	    }, {
	        key: 'changeDate',
	        value: function changeDate(e) {
	            var _this2 = this;

	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            clearTimeout(this.timer);
	            var self = this,
	                date = function date(i) {
	                if (i) {
	                    return new Date(i);
	                } else {
	                    return new Date();
	                }
	            },
	                nowDay = date().getDate(),
	                nowMonth = date().getMonth() + 1,
	                nowYear = date().getFullYear(),

	            //点击事件获取到的当前模块的对应索引，日周月索引和测试部位索引共用一个
	            index = e.currentTarget.getAttribute('data-index');

	            //按日/周/月减少 >>>  点击选择时间范围
	            if (e.currentTarget.getAttribute('data-type') === 'minus') {
	                //按日减少
	                if (appData.type == 0) {
	                    (function () {
	                        //1月1日再减判断
	                        if (appData.month == 1 && appData.eDay == 1) {
	                            --appData.year;
	                            console.log('appData.year------------', appData.year);
	                            appData.month = 12;
	                            appData.sDay = 31;
	                        } else {
	                            if (appData.sDay == 1) {
	                                --appData.month;
	                                //其实这里用了0值递减月的规律， new Date(2017,2,0).getDate() 2其实传入的3月，但是日期初始值是1，所以0，会递减一个月，得到2月的最后天
	                                appData.sDay = new Date(appData.year, appData.month, 0).getDate();
	                            } else {
	                                --appData.sDay;
	                            }
	                        }
	                        //按天减少时,开始和结束都是一天,只是时刻不同
	                        appData.eDay = appData.sDay;
	                        console.log('----------------appData.year------appData.month- sDay--', appData.year, appData.month, appData.sDay);
	                        self.setState({
	                            dateRange: appData.year + '.' + appData.month + '.' + appData.sDay
	                        });
	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.sDay);

	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, beginDate);
	                        }, 1000);
	                    })();
	                }
	                //按周减少
	                if (appData.type == 1) {
	                    console.log(appData.sWeek, appData.eWeek, 'init values');
	                    var sYear = new Date(appData.sWeek).getFullYear(),
	                        sMonth = new Date(appData.sWeek).getMonth(),
	                        sDate = new Date(appData.sWeek).getDate(),
	                        newEDate = sDate - 1;
	                    //特殊情况处理
	                    if (newEDate == 0) {
	                        var newEDateUTC = new Date(sYear, sMonth, 0);
	                        sYear = new Date(newEDateUTC).getFullYear();
	                        sMonth = new Date(newEDateUTC).getMonth();
	                        newEDate = new Date(newEDateUTC).getDate();
	                    }
	                    //根据计算出的newEDate计算newSDate
	                    appData.sWeek = appData.Get_Monday_Date(sYear, sMonth, newEDate);
	                    appData.eWeek = sYear + '-' + (0, _LocalFuns.fillZero)(sMonth + 1) + '-' + (0, _LocalFuns.fillZero)(newEDate);
	                    console.log(newEDate, 'newEDate', appData.sWeek, appData.eWeek, 'appData.sWeek,appData.eWeek');

	                    this.setState({
	                        dateRange: appData.sWeek + '~' + appData.eWeek
	                    });
	                    self.timer = setTimeout(function () {
	                        self.sendParams(appData.sWeek, appData.eWeek);
	                    }, 1000);
	                    //console.log('-----appData.year--appData.month---------appData.sDay----appData.eDay----',appData.year,appData.month,appData.sDay,appData.eDay)
	                }
	                //按月减少
	                if (appData.type == 2) {
	                    (function () {
	                        if (appData.month == 1) {
	                            --appData.year, appData.month = 12, appData.eDay = 31;
	                        } else {
	                            --appData.month;
	                            appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                        }
	                        appData.sDay = 1;

	                        _this2.setState({
	                            dateRange: appData.year + '年' + appData.month + '月'
	                        });

	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + '01',
	                            endDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);
	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, endDate);
	                        }, 1000);
	                    })();
	                }
	            }
	            //按日/周/月增加 >>>  点击选择时间范围
	            if (e.currentTarget.getAttribute('data-type') === 'plus') {
	                //console.log('------nowYear--nowMonth--nowDay-----',nowYear,nowMonth,nowDay);
	                //console.log('--appData.sWeek,appData.eWeek',appData.sWeek,appData.eWeek)
	                //按日增加
	                if (appData.type == 0) {
	                    var _ret3 = function () {
	                        if (appData.month == nowMonth && appData.year == nowYear && appData.eDay == nowDay) {
	                            console.log('今天以后还没有数据');
	                            het.toast('未来日期没有数据');
	                            return {
	                                v: false
	                            };
	                        }
	                        //每个月中最大的一天
	                        var maxDay = new Date(appData.year, appData.month, 0).getDate();
	                        ++appData.eDay;
	                        console.log('appData.eDay', appData.eDay, 'appData.eDay', appData.eDay);
	                        if (appData.eDay > maxDay) {
	                            appData.month != 12 ? ++appData.month : (++appData.year, appData.month = 1);
	                            appData.eDay = 1;
	                        }
	                        appData.sDay = appData.eDay;
	                        console.log('----------------appData.year------appData.month-eDay--', appData.year, appData.month, appData.eDay);
	                        _this2.setState({
	                            dateRange: appData.year + '.' + appData.month + '.' + appData.eDay
	                        });

	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);
	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, beginDate);
	                        }, 1000);
	                    }();

	                    if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
	                }
	                //按周增加
	                if (appData.type == 1) {
	                    console.log(appData.sWeek, appData.eWeek, 'init values');
	                    var eYear = new Date(appData.eWeek).getFullYear(),
	                        eMonth = new Date(appData.eWeek).getMonth(),
	                        eDate = new Date(appData.eWeek).getDate(),
	                        cDate = new Date().getDate(),
	                        cMonth = new Date().getMonth(),
	                        cYear = new Date().getFullYear();

	                    if (eDate >= cDate && eMonth >= cMonth && eYear >= cYear) {
	                        console.log('未来日期没有数据!');
	                        het.toast('未来日期没有数据');
	                        return false;
	                    }

	                    var nSUTC = new Date(eYear, eMonth, eDate + 1),
	                        nEUTC = new Date(eYear, eMonth, eDate + 7),
	                        nSYear = new Date(nSUTC).getFullYear(),
	                        nSMonth = new Date(nSUTC).getMonth() + 1,
	                        nSDate = new Date(nSUTC).getDate(),
	                        nEYear = new Date(nEUTC).getFullYear(),
	                        nEMonth = new Date(nEUTC).getMonth() + 1,
	                        nEDate = new Date(nEUTC).getDate();

	                    appData.sWeek = nSYear + '-' + (0, _LocalFuns.fillZero)(nSMonth) + '-' + (0, _LocalFuns.fillZero)(nSDate);
	                    appData.eWeek = nEYear + '-' + (0, _LocalFuns.fillZero)(nEMonth) + '-' + (0, _LocalFuns.fillZero)(nEDate);
	                    //如果超过今天强置为今天
	                    if (nEYear >= cYear && nEMonth - 1 >= cMonth && nEDate >= cDate) {
	                        appData.eWeek = cYear + '-' + (0, _LocalFuns.fillZero)(cMonth + 1) + '-' + (0, _LocalFuns.fillZero)(cDate);
	                    }
	                    this.setState({
	                        dateRange: appData.sWeek + '~' + appData.eWeek
	                    });

	                    self.timer = setTimeout(function () {
	                        self.sendParams(appData.sWeek, appData.eWeek);
	                    }, 1000);

	                    console.log('nSUTC', nSUTC, 'nEUTC', nEUTC, 'appData.sWeek', appData.sWeek, 'appData.eWeek', appData.eWeek);
	                }
	                //按月增加
	                if (appData.type == 2) {
	                    var _ret4 = function () {
	                        if (appData.year == new Date().getFullYear() && appData.month == new Date().getMonth() + 1) {
	                            het.toast('未来日期没有数据');
	                            return {
	                                v: false
	                            };
	                        };
	                        appData.sDay = 1;
	                        //当前年就不用递增了
	                        if (appData.year < nowYear) {
	                            if (appData.month == 12) {
	                                ++appData.year;
	                                appData.month = 1;
	                                appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                            } else {
	                                ++appData.month;
	                                appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                            }
	                        } else {
	                            if (appData.month < nowMonth) {
	                                ++appData.month;
	                                appData.eDay = appData.getMonthDays(appData.year, appData.month);
	                            }
	                            if (appData.month == nowMonth) {
	                                //如果等于了当前月，则重置当前月的结束时间为今天的时间
	                                appData.eDay = new Date().getDate();
	                            }
	                        }
	                        _this2.setState({ dateRange: appData.year + '年' + appData.month + '月' });

	                        var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + '01',
	                            endDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);
	                        self.timer = setTimeout(function () {
	                            self.sendParams(beginDate, endDate);
	                        }, 1000);
	                        //console.log('-------year--month---sDay--eDay-----',appData.year,appData.month,appData.sDay,appData.eDay)
	                    }();

	                    if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
	                };
	            }
	            console.log('选择的日月年', appData.eDay, appData.month, appData.year);
	        }
	    }, {
	        key: 'changeView',
	        value: function changeView(e) {
	            var _this3 = this;

	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            };
	            if (e.currentTarget['className'] == 'flex-cell active') return;
	            clearTimeout(this.timer);
	            var self = this,
	                type = e.currentTarget.getAttribute('data-i');
	            if (type == 0) {
	                (function () {
	                    appData.sDay = new Date().getDate();
	                    appData.eDay = appData.sDay;
	                    appData.month = new Date().getMonth() + 1;
	                    appData.eWeek = '';
	                    appData.sWeek = '';
	                    _this3.setState({ dateRange: appData.year + '.' + appData.month + '.' + appData.sDay });
	                    var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.sDay);
	                    self.timer = setTimeout(function () {
	                        self.sendParams(beginDate, beginDate);
	                    }, 1000);
	                })();
	            }
	            if (type == 1) {
	                //获取当前时间
	                var eYear = new Date().getFullYear(),
	                    eMonth = new Date().getMonth(),
	                    eDay = new Date().getDate();

	                appData.eWeek = eYear + '-' + (0, _LocalFuns.fillZero)(eMonth + 1) + '-' + (0, _LocalFuns.fillZero)(eDay);
	                appData.sWeek = appData.Get_Monday_Date(eYear, eMonth, eDay);

	                this.setState({ dateRange: appData.sWeek + '~' + appData.eWeek });
	                self.timer = setTimeout(function () {
	                    self.sendParams(appData.sWeek, appData.eWeek);
	                }, 1000);
	                console.log('appData.eWeek', appData.eWeek, 'appData.sWeek', appData.sWeek);
	            }
	            if (type == 2) {
	                (function () {
	                    appData.year = new Date().getFullYear();
	                    appData.month = new Date().getMonth() + 1, appData.eDay = new Date().getDate();
	                    _this3.setState({ dateRange: appData.year + '年' + appData.month + '月' });
	                    var beginDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + '01',
	                        endDate = appData.year + '-' + (0, _LocalFuns.fillZero)(appData.month) + '-' + (0, _LocalFuns.fillZero)(appData.eDay);
	                    self.timer = setTimeout(function () {
	                        self.sendParams(beginDate, endDate);
	                    }, 1000);
	                })();
	            }
	            appData.type = type;
	            this.setState({
	                type: type
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var viewHeight = window.screen.height,
	                config = {
	                type: this.state.type,
	                caloriesList: this.state.caloriesList != undefined ? this.state.caloriesList : [],
	                stepList: this.state.stepList != undefined ? this.state.stepList : [],
	                timestamp: this.state.timestamp
	            },
	                Nav = React.createElement(
	                'nav',
	                { id: 'nav', className: 'nav' + _LocalFuns.isIOS },
	                React.createElement(
	                    'a',
	                    { onClick: function onClick() {
	                            window.location.href = '#/';
	                        } },
	                    ' '
	                ),
	                React.createElement(
	                    'a',
	                    null,
	                    '\u8FD0\u52A8\u7EDF\u8BA1'
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'none' },
	                    ' '
	                )
	            ),
	                Footer = React.createElement(
	                'section',
	                { className: "module-footer flex" },
	                ['日', '周', '月'].map(function (o, i) {
	                    return React.createElement(
	                        'span',
	                        { className: "flex-cell" + (this.state.type == i ? ' active' : ''),
	                            key: i, 'data-i': i, onTouchTap: this.changeView },
	                        o
	                    );
	                }.bind(this))
	            ),
	                DateRange = React.createElement(
	                'figure',
	                { id: 'arrow-date', className: 'date-select' },
	                React.createElement('i', { 'data-type': 'minus', onClick: this.changeDate }),
	                React.createElement(
	                    'i',
	                    null,
	                    this.state.dateRange
	                ),
	                React.createElement('i', { 'data-type': 'plus', onClick: this.changeDate })
	            ),
	                DailyShow = this.state.type == 0 ? React.createElement(
	                'section',
	                { className: 'sport-daily', style: { height: viewHeight * 0.7 + 'px' } },
	                React.createElement(
	                    'aside',
	                    null,
	                    React.createElement(
	                        'h2',
	                        null,
	                        this.state.isEmpty == true ? '--' : this.state.calories,
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u5343\u5361'
	                        )
	                    ),
	                    React.createElement(
	                        'h5',
	                        null,
	                        '\u70ED\u91CF'
	                    )
	                ),
	                React.createElement(
	                    'aside',
	                    null,
	                    React.createElement(
	                        'h2',
	                        null,
	                        this.state.isEmpty == true ? '--' : this.state.stepCount,
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u6B65'
	                        )
	                    ),
	                    React.createElement(
	                        'h5',
	                        null,
	                        '\u6B65\u6570'
	                    )
	                ),
	                React.createElement(
	                    'aside',
	                    null,
	                    React.createElement(
	                        'h2',
	                        null,
	                        this.state.isEmpty == true ? '--' : this.state.kilometer,
	                        React.createElement(
	                            'span',
	                            null,
	                            'km'
	                        )
	                    ),
	                    React.createElement(
	                        'h5',
	                        null,
	                        '\u8DDD\u79BB'
	                    )
	                )
	            ) : null,
	                Echarts = this.state.type != 0 ? React.createElement(_EchartsSport.EchartsSport, { config: config }) : null;
	            console.log(this.state.caloriesList, '周月数据');
	            console.log('type', this.state.type, 'vH', viewHeight, this.state.dateRange, 'dateRange');
	            //console.log('this.state.dateRange',this.state.dateRange);
	            return React.createElement(
	                'main',
	                { className: "page-sport" + _LocalFuns.isIOS },
	                Nav,
	                DateRange,
	                Echarts,
	                DailyShow,
	                Footer
	            );
	        }
	    }]);

	    return PageSport;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EchartsSport = undefined;

	var _LocalFuns = __webpack_require__(9);

	var stepsChartDOM = null,
	    stepsChart = null,
	    caloriesChartDOM = null,
	    caloriesChart = null,
	    xAxisData = [],
	    stepsData = [],
	    caloriesData = [],
	    stepsOption = {
	    grid: {
	        left: '12%',
	        right: '5%',
	        bottom: '15%',
	        top: '10%'
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        show: false
	    },
	    xAxis: {
	        type: 'category',
	        axisTick: {
	            show: false
	        },
	        boundaryGap: false,
	        data: []
	    },
	    yAxis: {
	        type: 'value',
	        min: 0,
	        max: 12000,
	        interval: 3000,
	        axisLabel: {
	            textStyle: {
	                color: '#6e757b'
	            },
	            formatter: function formatter(v, i) {
	                return v == 0 ? '' : parseInt(v / 1000) + 'k';
	            }
	        },
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        },
	        splitLine: {
	            lineStyle: {
	                color: 'rgba(106,119,249,0.2)'
	            }
	        }
	    },
	    series: [{
	        name: '步数',
	        type: 'line',
	        itemStyle: {
	            normal: {
	                color: '#3dab77'
	            }
	        },
	        data: []
	    }]
	},
	    caloriesOption = {
	    grid: stepsOption.grid,
	    tooltip: stepsOption.tooltip,
	    legend: stepsOption.legend,
	    xAxis: stepsOption.xAxis,
	    yAxis: {
	        type: 'value',
	        min: 0,
	        max: 120,
	        interval: 30,
	        axisLabel: {
	            formatter: function formatter(v, i) {
	                return v == 0 ? '' : parseInt(v) + '/k';
	            }
	        },
	        axisTick: {
	            show: false
	        },
	        axisLine: {
	            show: false
	        },
	        splitLine: {
	            lineStyle: {
	                color: 'rgba(106,119,249,0.2)'
	            }
	        }
	    },
	    series: [{
	        name: '卡路里',
	        type: 'line',
	        itemStyle: {
	            normal: {
	                color: '#3dab77'
	            }
	        },
	        data: []
	    }]
	};
	var EchartsSport = exports.EchartsSport = React.createClass({
	    displayName: 'EchartsSport',
	    getInitialState: function getInitialState() {
	        return {};
	    },
	    componentDidMount: function componentDidMount() {
	        var nav = document.querySelector('#nav').offsetHeight,
	            arrow = document.querySelector('#arrow-date').offsetHeight,
	            viewHeight = window.screen.height,
	            chartWrapperHeight = viewHeight - arrow - nav;
	        this.setState({
	            wrapperHeight: chartWrapperHeight + 'px'
	        });

	        //init calories echart
	        caloriesChartDOM = document.getElementById('calories');
	        caloriesChart = echarts.init(caloriesChartDOM);
	        caloriesChart.setOption(caloriesOption);
	        //init steps echart
	        stepsChartDOM = document.getElementById('steps');
	        stepsChart = echarts.init(stepsChartDOM);
	        stepsChart.setOption(stepsOption);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        xAxisData = [];
	        stepsData = [];
	        caloriesData = [];
	        if (nextProps.config.stepList.length !== 0) {
	            nextProps.config.stepList.map(function (o, i) {

	                o.dateTime = o.dateTime.slice(-5, o.dateTime.length);
	                o.dateTime = o.dateTime.replace('-', '.');
	                xAxisData.push(o.dateTime);
	                if (o.stepCount == null) o.stepCount = 0;
	                stepsData.push(o.stepCount);
	            });
	        }
	        if (nextProps.config.caloriesList.length !== 0) {
	            nextProps.config.caloriesList.map(function (o, i) {
	                if (o.calories == null) o.calories = 0;
	                caloriesData.push(o.calories);
	            });
	        }
	        //console.log(xAxisData,'xAxisData',caloriesData,'caloriesData',stepsData,'stepsData');
	        if ((0, _LocalFuns.arrayMax)(caloriesData) > 120) {
	            caloriesOption.yAxis.max = Math.ceil((0, _LocalFuns.arrayMax)(caloriesData) / 4) * 4;
	            caloriesOption.yAxis.interval = Math.ceil((0, _LocalFuns.arrayMax)(caloriesData) / 4);
	        }
	        if ((0, _LocalFuns.arrayMax)(stepsData) > 12000) {
	            stepsOption.yAxis.max = Math.ceil((0, _LocalFuns.arrayMax)(stepsData) / 4) * 4;
	            stepsOption.yAxis.interval = Math.ceil((0, _LocalFuns.arrayMax)(stepsData) / 4);
	        }

	        caloriesOption.xAxis.data = xAxisData;
	        stepsOption.xAxis.data = xAxisData;
	        caloriesOption.series[0].data = caloriesData;
	        stepsOption.series[0].data = stepsData;

	        //console.log('----nextProps.measurestatus,this.props.measurestatus-------',nextProps.measurestatus,this.props.measurestatus);
	        if (nextProps.config.timestamp != this.props.config.timestamp) {
	            //console.log('timestamp',nextProps.config.timestamp)
	            stepsChart.setOption(stepsOption);
	            caloriesChart.setOption(caloriesOption);
	        }
	        //caloriesOption stepsOption
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        xAxisData = [];
	        stepsData = [];
	        caloriesData = [];
	        caloriesOption.yAxis.max = 120;
	        caloriesOption.yAxis.interval = 30;
	        stepsOption.yAxis.max = 12000;
	        stepsOption.yAxis.interval = 3000;

	        caloriesOption.xAxis.data = [];
	        stepsOption.xAxis.data = [];

	        caloriesOption.series[0].data = [];
	        stepsOption.series[0].data = [];
	        stepsChart.setOption(stepsOption);
	        caloriesChart.setOption(caloriesOption);
	    },
	    render: function render() {
	        return React.createElement(
	            'section',
	            { className: 'sport-echarts', style: { height: this.state.wrapperHeight ? this.state.wrapperHeight : 'auto' } },
	            React.createElement('div', { id: 'calories', style: { height: '250px' } }),
	            React.createElement('div', { id: 'steps', style: { height: '250px', marginBottom: '4rem', marginTop: '1rem' } })
	        );
	    }
	});

/***/ }
/******/ ]);