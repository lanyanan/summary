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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {},
	        renderConfigData: true

	    });
	});

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
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

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 50 : 64
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'connect',
	        value: function connect() {
	            this.setState({ goNext: true, failConnect: false });
	            // var percent=0;  
	            // var loading=setInterval(function(){ 
	            //     document.getElementById("left").style.webkitTransform = "rotate("+(18/5)*percent+"deg)";  
	            //     document.getElementById('num').innerHTML = percent;  
	            //     if(percent>50){  
	            //         document.getElementById("circle").className = "circle clip-auto"; 
	            //         document.getElementById("right").className = 'percent right';  
	            //     }  
	            //     if(percent<99) percent++;  

	            // },200);  
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'article',
	                { className: 'guide-main' },
	                React.createElement(
	                    'section',
	                    { className: this.state.goNext ? 'step1 hide' : 'step1 show' },
	                    React.createElement(
	                        'section',
	                        { className: 'header' },
	                        React.createElement('header', { style: { 'height': this.state.headerTop } }),
	                        React.createElement(
	                            'a',
	                            { href: 'health://switch_user' },
	                            React.createElement('img', { className: 'photo', src: this.state.img ? this.state.img : '../static/img/ic-default.png', alt: '\u5934\u50CF' }),
	                            React.createElement('img', { className: 'switch', src: '../static/img/ic-switch.png', alt: '\u5207\u6362\u56FE\u6807' }),
	                            React.createElement(
	                                'span',
	                                { className: 'nikename' },
	                                this.state.nickname
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'guide' },
	                        React.createElement('img', { src: '../static/img/ic-device.png', className: 'guide-img', alt: '\u8BBE\u5907\u56FE' }),
	                        React.createElement(
	                            'ul',
	                            null,
	                            React.createElement(
	                                'li',
	                                null,
	                                '\u7B2C\u4E00\u6B65\uFF1A\u77ED\u6309\u201C\u53E3\u201D\u952E\uFF0C\u8BBE\u5907\u5F00\u673A\u3002'
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                '\u7B2C\u4E8C\u6B65\uFF1A\u786E\u8BA4\u624B\u673A\u84DD\u7259\u662F\u5426\u6253\u5F00\uFF0C\u5982\u672A\u6253\u5F00\uFF0C\u8BF7\u5728\u624B\u673A\u8BBE\u7F6E\u9009\u9879\u4E2D\u6253\u5F00\u84DD\u7259\u3002'
	                            ),
	                            React.createElement(
	                                'li',
	                                null,
	                                '\u7B2C\u4E09\u6B65\uFF1A\u84DD\u7259\u8FDE\u63A5\u6210\u529F\uFF0C\u5F00\u59CB\u6D4B\u91CF\u3002'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'footer flex' },
	                            React.createElement(
	                                'a',
	                                { href: 'health://firstConnect', id: 'connect', className: 'btn flex-cell', onClick: this.connect.bind(this) },
	                                '\u5F00\u59CB\u8FDE\u63A5'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: this.state.goNext && !this.state.failConnect ? 'step2 show' : 'step2  hide' },
	                    React.createElement('img', { src: '../static/img/ic-loading.png', className: 'guide-img', alt: '\u52A0\u8F7D' }),
	                    React.createElement(
	                        'div',
	                        { className: 'tip' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u8BBE\u5907\u8FDE\u63A5\u4E2D'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u8BF7\u8010\u5FC3\u7B49\u5019'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: this.state.failConnect ? 'failed guide show' : 'failed hide' },
	                    React.createElement('img', { src: '../static/img/ic-fail.png', className: 'guide-img', alt: 'shibai', style: { marginTop: "78px" } }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u62B1\u6B49\uFF0C\u8FDE\u63A5\u5931\u8D25\uFF01'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u53EF\u70B9\u51FB\u4E0B\u65B9\u8FDE\u63A5\u8BBE\u5907\u6309\u94AE\u91CD\u65B0\u8FDE\u63A5\u3002'
	                    ),
	                    React.createElement(
	                        'ul',
	                        null,
	                        React.createElement(
	                            'li',
	                            null,
	                            '\u6E29\u99A8\u63D0\u793A\uFF1A'
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            '1.\u8BF7\u786E\u4FDD\u60A8\u7684\u8BBE\u5907\u5DF2\u7ECF\u5F00\u542F\u3002 '
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            '2.\u8BF7\u786E\u4FDD\u60A8\u7684\u8BBE\u5907\u5728\u60A8\u8EAB\u8FB9\u4E00\u7C73\u4E4B\u5185\u3002'
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            '3.\u8BF7\u68C0\u67E5\u60A8\u7684\u624B\u673A\u84DD\u7259\u662F\u5426\u6253\u5F00\u3002'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'footer flex' },
	                        React.createElement(
	                            'a',
	                            { href: 'health://firstConnect', id: 'connect', className: 'btn flex-cell', onClick: this.connect.bind(this) },
	                            '\u8FDE\u63A5\u8BBE\u5907'
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
	    het.setTitle('血氧仪');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    // 路由方式
	    /*ReactDOM.render((
	        <Router history={hashHistory}>
	            <Route path="/" component={App} />
	        </Router>
	    ), document.getElementById('ROOT'));*/
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
	var Actions = exports.Actions = Reflux.createActions(['ready', // 接收到ready数据
	'repaint', // 接收到数据，重新渲染
	'changeDay', // 前一天后一天
	'getLastestData', // 获取最后一次血氧脉率数据(首页)
	'getLastestHistoryData', // 获取最后一次历史数据(历史页面)
	'getAlert', // 获取预警值
	'getOneDayData', // 获取单日历史数据
	'getValidDate', // 获取当月有数据的日期
	'selectDate', //日历选择某一天返回
	'chartClick']);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 * @type {store}
	 *
	 
	 * 1.获取最新血氧脉率数据
	 * https://api.clife.cn/v1/app/chealth/haieraio/getLatestOxygenPulse
	 * 2.查询血氧仪参数（预警值）   
	 *  "oxygenAlert": 2,  //血氧报警值
	 *  "pulseAlert": "60,100",  //脉率报警值（最低值，最高值）
	 * http(s)://api.clife.cn/v1/app/chealth/OxygenPulse/getParameter
	 * 3、查询单日血氧报告（单日总结报告+单日数据明细）
	 * http(s)://api.clife.cn/v1/app/chealth/OxygenPulse/getOxygenPulseReport
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _Actions = __webpack_require__(6);

	var _fun = __webpack_require__(2);

	var readyData = {
	    'appId': 0,
	    'memberId': 0,
	    'userType': 3
	};
	var curr_date = _fun.Funs.dateFormat(new Date().getTime(), 'yyyy-MM-dd'); //当前日期

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onReady: function onReady(data) {
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.userType = data.userType ? data.userType : readyData.userType;
	        readyData.img = data.img ? data.img : readyData.img;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(readyData);
	    },
	    onRepaint: function onRepaint(data, type) {
	        data.showLastTime = false;
	        this.trigger(data);
	    },
	    onSelectDate: function onSelectDate(flag, date) {
	        if (date) {
	            this.onGetOneDayData(date);
	        }
	        this.trigger({ showClndr: flag });
	    },
	    onChartClick: function onChartClick(seArr, peArr, nofresh) {
	        this.trigger({ seArr: seArr, peArr: peArr, nofresh: nofresh });
	    },
	    onGetValidDate: function onGetValidDate(month, dateObj) {
	        var cfg = {
	            appId: readyData.appId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            timestamp: +new Date(),
	            date: month
	        };
	        var _this = this,
	            tagDates = [];
	        // console.log("111111",dateObj);

	        het.get('/v1/app/chealth/OxygenPulse/getOxygenPulseDateList', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            //          data.data = [
	            //     {
	            //         "date": "2016-04-02"
	            //     },
	            //     {
	            //         "date": "2016-04-04"
	            //     },
	            //     {
	            //         "date": "2016-04-16"
	            //     },
	            //     {
	            //         "date": "2016-04-19"
	            //     }
	            // ];
	            // if (!data.data) return;
	            if (data.data) {
	                data.data.map(function (it) {
	                    var date = parseInt(_fun.Funs.dateFormat(it.date, "dd"));
	                    tagDates.push(date);
	                });
	            }
	            if (dateObj) {
	                dateObj.tag(tagDates);
	            }
	            _this.trigger({ tagDates: tagDates });
	        }, function () {});
	    },
	    onGetOneDayData: function onGetOneDayData(date) {
	        var cfg = {
	            appId: readyData.appId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            date: date,
	            timestamp: +new Date()
	        };
	        var _this = this,
	            noHistory = false;
	        het.get('/v1/app/chealth/OxygenPulse/getOxygenPulseReport', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            if (!data.data) {
	                data.data = { recordTime: curr_date };
	                noHistory = true;
	            }
	            _this.trigger({ historyResult: data.data, noHistory: noHistory });
	        }, function () {});
	    },
	    onChangeDay: function onChangeDay(param, day) {
	        var dt = new Date(day);
	        curr_date = _fun.Funs.dateFormat(dt.setDate(dt.getDate(dt) + param), 'yyyy-MM-dd');
	        this.onGetOneDayData(curr_date);
	    },
	    onGetLastestData: function onGetLastestData() {
	        var cfg = {
	            appId: readyData.appId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/haieraio/getLatestOxygenPulse', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            //  data.data = {
	            //       "oxygen": "97",   //血氧
	            // "pulse": "83",  //脉率
	            // "oxygenStandard": "正常", //血氧标准状态
	            // "oxygenStandardFlag": "0",  //血氧标准状态标识
	            // "pulseStandard": "正常",  //脉率标准状态
	            // "pulseStandardFlag": "0",   //脉率标准状态标识
	            // "dataTime": "2016-06-06 12:12:12", //测量时间（UTC时间）
	            //      };
	            // if (!data.data) return;
	            console.log(data);
	            if (data.data) {
	                _this.trigger({ oxygen: data.data.oxygen, pulse: data.data.pulse, lastTime: data.data.dataTime, showLastTime: true });
	            }
	        }, function () {});
	    },
	    onGetLastestHistoryData: function onGetLastestHistoryData() {
	        var cfg = {
	            appId: readyData.appId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            timestamp: +new Date()
	        };
	        var _this = this,
	            noHistory = false;
	        het.get('/v1/app/chealth/OxygenPulse/getLatestOxygenPulseReport', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            // data.data = {"recordNum":295,"oxygenAbnormalNum":0,"pulseAbnormalNum":46,"oxygenAbnormal85Num":0,"oxygenAbnormal90Num":0,"oxygenAbnormal80Num":0,"oxygenAbnormal70Num":0,"pulseMaxValue":120,"pulseMinValue":76,"pulseAvgValue":94,"recordTime":"2017-02-28","seList":[],"peList":[{"peTime":"2017-02-28 02:06:00","peContentTime":"02:06:33-02:06:49","peContent":"脉率从105bpm下降到99bpm，持续了16秒","peTitle":"脉率异常事件"}],"oxygenPulse":[{"oxygen":97.0,"dataTime":"2017-02-28 02:04:00","pulse":94},{"oxygen":97.23,"dataTime":"2017-02-28 02:05:00","pulse":90},{"oxygen":97.0,"dataTime":"2017-02-28 02:06:00","pulse":93},{"oxygen":97.1,"dataTime":"2017-02-28 02:07:00","pulse":97},{"oxygen":96.57,"dataTime":"2017-02-28 02:08:00","pulse":89},{"oxygen":97.0,"dataTime":"2017-02-28 02:09:00","pulse":103}]};
	            // if (!data.data) return;
	            // console.log('success',data);
	            if (data.data) {
	                var dataTime = data.data.recordTime;
	                curr_date = _fun.Funs.dateFormat(dataTime, 'yyyy-MM-dd', true);
	            }
	            if (!data.data) {
	                data.data = { recordTime: curr_date };
	                noHistory = true;
	            }
	            _this.trigger({ historyResult: data.data, noHistory: noHistory });
	        }, function (data) {
	            var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1),
	                msg = isAndroid ? data : JSON.parse(data).msg;
	            // console.log('error',typeof data==='string',data);

	            het.toast(msg ? 'toast:' + msg : 'toast:数据统计中');
	            _this.trigger({ historyResult: { recordTime: curr_date }, noHistory: true });
	        });
	    }
	});

/***/ }
/******/ ]);