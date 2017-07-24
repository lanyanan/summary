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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EnterInfo = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _ControlDegree = __webpack_require__(8);

	var _DeviceData = __webpack_require__(9);

	var _EchartsData = __webpack_require__(10);

	var _AllData = __webpack_require__(11);

	var _DetailInfo = __webpack_require__(12);

	var _Locations = __webpack_require__(13);

	var _AllNationnal = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	het.ready(function (data) {

	    // console.log('------1---', data);

	});
	// 接收app推送数据
	het.repaint(function (data) {});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };

	        _Actions.Actions.checkOnline();
	        //获取卧室数据
	        _Actions.Actions.getbedroom();
	        //获取设备运行数据
	        _Actions.Actions.getOnlineData();

	        _Actions.Actions.newCity();
	        _Actions.Actions.getScoreLevel();

	        _this.handleSwitchLight = _this.handleSwitchLight.bind(_this);
	        // this.handleLocation    = this.handleLocation.bind(this);
	        return _this;
	    }

	    // componentWillReceiveProps(nextProps){
	    //      console.log("componentWillReceiveProps",nextProps);
	    //     //   setInterval(function(){
	    //     //   Actions.getOnlineData()
	    //     // },3000);
	    // }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            //判断设备是否在线
	            // console.log('456')
	            _Actions.Actions.checkOnline();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            setInterval(function () {
	                _Actions.Actions.getOnlineData(1);
	            }, 4000);
	        }

	        //指示灯开关

	    }, {
	        key: 'handleSwitchLight',
	        value: function handleSwitchLight(e) {
	            _Actions.Actions.getTime();
	            var a = this.state.boxswitch;
	            var index = this.state.boxswitch == 0 ? 1 : 0; //(0:关,1:开);
	            _Actions.Actions.onoffLight(index);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {

	            _Actions.Actions.checkOnline();

	            //修改标题
	            var $body = $('body');
	            document.title = '智慧盒子';
	            // hack在微信等webview中无法修改document.title的情况
	            var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	            $iframe.on('load', function () {
	                setTimeout(function () {
	                    $iframe.off('load').remove();
	                }, 0);
	            }).appendTo($body);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //交互
	            //判断当前设备开关，若设备关则显示开，反之.
	            var nowlight = this.state.boxswitch == 0 ? '开' : '关';

	            var getTime = new Date();
	            var nowYear = getTime.getFullYear();
	            var nowMonth = getTime.getMonth() + 1;
	            var nowDate = getTime.getDate();
	            var nowTime = nowYear + '-' + nowMonth + '-' + nowDate;
	            var time = getTime.toLocaleString();

	            var nowHour = getTime.getHours();
	            var nowMin = getTime.getMinutes();
	            if (nowHour < 10) {
	                nowHour = '0' + nowHour;
	            }
	            if (nowMin < 10) {
	                nowMin = '0' + nowMin;
	            }
	            var freshen = nowHour + ':' + nowMin;
	            var kaiguan = this.state.boxswitch;
	            //定位---选择其他城市的判断
	            var selectCity = this.state.city ? this.state.city : '1';
	            this.state.echatTime = this.state.echatTime ? this.state.echatTime : "1";

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'headBj' },
	                    React.createElement('header', { className: 'headerTop' }),
	                    React.createElement(
	                        'div',
	                        { className: 'headContent' },
	                        React.createElement(
	                            'div',
	                            { className: 'headContentL' },
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement(
	                                    Link,
	                                    { to: '/allNation' },
	                                    React.createElement(
	                                        'span',
	                                        { className: 'ample' },
	                                        this.state.getScoreLevel
	                                    ),
	                                    React.createElement('span', { className: this.state.LevelColor }),
	                                    ' '
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '睡眠环境指数'
	                                ),
	                                ' '
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '刷新时间:',
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    freshen
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { onClick: this.handleSwitchLight },
	                                React.createElement(
	                                    'span',
	                                    { className: this.state.boxswitch == 0 ? 'openLight' : 'shutLight' },
	                                    '  ',
	                                    nowlight,
	                                    ' 指示灯   '
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'headContentR' },
	                            React.createElement(
	                                Link,
	                                { to: '/enterposition' },
	                                React.createElement('img', { src: './../static/img/position.png' }),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    this.state.setLocation ? this.state.setLocation : ' '
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_ControlDegree.ControlDegree, { temperature: this.state.temperature, humidity: this.state.humidity }),
	                React.createElement('div', { className: 'Middle-layer' }),
	                React.createElement(
	                    'section',
	                    { className: 'BedroomEnvir-sec' },
	                    React.createElement(
	                        'div',
	                        { className: 'BedroomTitle' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '卧室环境'
	                        ),
	                        React.createElement(
	                            Link,
	                            { to: '/alldata', level: this.state.level },
	                            ' >'
	                        ),
	                        this.props.children
	                    )
	                ),
	                React.createElement(_EchartsData.EchartsData, { echatTime: this.state.echatTime, echatLevel: this.state.echatLevel, echatLevelWords: this.state.echatLevelWords, renderIf: this.state.renderIf, renderIf2: this.state.renderIf2 }),
	                React.createElement('div', { className: 'Middle-layer' }),
	                React.createElement(_DeviceData.DeviceData, null)
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	var EnterInfo = exports.EnterInfo = React.createClass({
	    displayName: 'EnterInfo',
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(_DetailInfo.DetailInfo, null)
	        );
	    }
	});

	// 开始渲染
	het.domReady(function () {
	    het.setTitle('智慧盒子');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: 'alldata', component: _AllData.AllData }),
	        React.createElement(Route, { path: 'enterinfo', component: EnterInfo }),
	        React.createElement(Route, { path: 'enterposition', component: _Locations.Locations }),
	        React.createElement(Route, { path: 'allNation', component: _AllNationnal.AllNationnal })
	    ), document.getElementById('ROOT'));
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

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
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染  
	'getbedroom', //获取卧室数据
	'getToken', //获取token
	'locations', //获取全国城市的列表
	'place', //定位
	'getOnlineData', //获取授权 获取设备运行数据
	'onoffLight', //指示灯开关
	'getAllSleepData', //获取全国睡眠数据
	'otherCity', //选择其他城市
	'historyData', //个人历史数据
	'getDetailbed', //个人详细数据             
	'getScoreLevel', // 盒子首页环境评分
	'getTime', //获取当前时间
	'newCity', //选取其它城市的
	'checkOnline' //判断设备是否在线

	]);

/***/ },
/* 7 */
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

	var _Actions = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(4);

	var _fun = __webpack_require__(2);

	var deviceId = _fun.Funs.getUrlParam('deviceId');
	var path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
	location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
	'/clife-wechat/wechat/hotel'; // 正式环境

	var AppData = {
	  Citydata: 2
	};

	var Store = exports.Store = Reflux.createStore({
	  listenables: [_Actions.Actions],
	  onRepaint: function onRepaint(data) {

	    if (AppData.addLocation != undefined) {
	      data.addLocation = AppData.addLocation;
	    }

	    data.rendenrIf = 2;
	    this.trigger(data);
	  },


	  //判断设备是否在线
	  onCheckOnline: function onCheckOnline() {
	    console.log('123');
	    var _this = this;
	    var url = path + '/device/checkOnline?deviceId=' + deviceId;
	    het.get(url, {}, function (Succ) {
	      var ChangeSucc = JSON.parse(Succ);
	      var Msg = ChangeSucc.msg;
	      // console.log( '+++++++',ChangeSucc,ChangeSucc.msg);

	      if (ChangeSucc.msg == '设备不在线') {
	        //无按钮弹窗

	        var showMsg = function showMsg(msg) {
	          var msgWrap = $("#msg-warning");
	          var msgBox = $('<div class="msg-content"></div>');
	          if (msgWrap.length === 0) {
	            msgWrap = $('<div id="msg-warning"></div>');
	            $("body").append(msgWrap);
	          }
	          msgWrap.empty();
	          msgBox.addClass("fade-in").text(msg).appendTo(msgWrap);
	        };

	        ;
	        showMsg('设备离线状态');
	      }
	    }, function (Fail) {
	      console.log(Fail);
	    });
	  },


	  //获取卧室数据
	  onGetbedroom: function onGetbedroom(dev) {
	    var bed = this;
	    var bedWords = this;
	    var bedTime = []; //存储 时间
	    var bedLevel = []; //存储 等级
	    var bedLevelWords = []; //存储 等级文字

	    var SuccList = null;
	    var url = path + '/wisdombox/dayDataPageList?deviceId=' + deviceId;
	    het.get(url, {}, function (Succ) {
	      // console.log('个人全',Succ);  
	      var bedJson = JSON.parse(Succ);
	      SuccList = bedJson.data.dataList;

	      //后台每天10:30进行统计的，10:30之前，昨天的数据应该还没有 （故10:30之前只显示昨天的昨天的 09-28 那只显示09-26的）

	      var getTime = new Date();
	      var getHours = getTime.getHours();
	      var getMinutes = getTime.getMinutes();
	      var getSeconds = getTime.getSeconds();
	      var nowTime = getHours + getMinutes + getSeconds;

	      //卧室环境--- Echats时间
	      for (var i = 0; i < SuccList.length; i++) {
	        var c = SuccList[i].dataTime;
	        var d = c.substr(5).replace(/\//g, '-');
	        bedTime.push(d);
	      }

	      // 卧室环境--等级         
	      for (var i = 0; i < SuccList.length; i++) {
	        var l = SuccList[i].level;
	        bedLevel.push(l);
	      }

	      //卧室等级--等级文字
	      for (var i = 0; i < SuccList.length; i++) {
	        var w = SuccList[i].level;
	        bedLevelWords.push(w);
	      }
	      // 数据反转
	      bedTime = bedTime.reverse();
	      bedLevel = bedLevel.reverse();
	      bedLevelWords = bedLevelWords.reverse();

	      if (bedTime.length == 1) {
	        bedTime.push(null, null, null, null, null, null);
	      } else if (bedTime.length == 2) {
	        bedTime.push(null, null, null, null, null);
	      } else if (bedTime.length == 3) {
	        bedTime.push("", "", "", "");
	      } else if (bedTime.length == 4) {
	        bedTime.push("", "", "");
	      } else if (bedTime.length == 5) {
	        bedTime.push(null, null);
	      } else if (bedTime.length == 6) {
	        bedTime.push(null);
	      } else {
	        bedTime = bedTime;
	      }

	      if (bedLevel.length == 1) {
	        bedLevel.push(null, null, null, null, null, null);
	      } else if (bedLevel.length == 2) {
	        bedLevel.push(null, null, null, null, null);
	      } else if (bedLevel.length == 3) {
	        bedLevel.push("", "", "", "");
	      } else if (bedLevel.length == 4) {
	        bedLevel.push("", "", "");
	      } else if (bedLevel.length == 5) {
	        bedLevel.push(null, null);
	      } else if (bedLevel.length == 6) {
	        bedLevel.push(null);
	      } else {
	        bedLevel = bedLevel;
	      }

	      if (bedLevelWords.length == 1) {
	        bedLevelWords.push(null, null, null, null, null, null);
	      } else if (bedLevelWords.length == 2) {
	        bedLevelWords.push(null, null, null, null, null);
	      } else if (bedLevelWords.length == 3) {
	        bedLevelWords.push("", "", "", "");
	      } else if (bedLevelWords.length == 4) {
	        bedLevelWords.push("", "", "");
	      } else if (bedLevelWords.length == 5) {
	        bedLevelWords.push(null, null);
	      } else if (bedLevelWords.length == 6) {
	        bedLevelWords.push(null);
	      } else {
	        bedLevelWords = bedLevelWords;
	      }

	      for (var k = 0; k < bedLevel.length; k++) {
	        if (bedLevel[k] == '优') {
	          bedLevel[k] = 8;
	        } else if (bedLevel[k] == '良') {
	          bedLevel[k] = 6;
	        } else if (bedLevel[k] == '中') {
	          bedLevel[k] = 4;
	        } else if (bedLevel[k] == '差') {
	          bedLevel[k] = 2;
	        } else if (bedLevel[k] == '糟') {
	          bedLevel[k] = 0;
	        }
	      }
	      bed.trigger({ echatTime: bedTime, echatLevel: bedLevel, echatLevelWords: bedLevelWords });
	    }, function (fail) {
	      console.log('返回错误', fail);
	    });

	    return bedTime;
	  },


	  //请求接口，获取全国城市的列表
	  onLocations: function onLocations() {
	    var thisCitys = this;
	    var c = null;

	    var pathCh = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat' : // 测试环境
	    location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat' : // 预发布环境
	    '/clife-wechat/wechat'; // 正式环境

	    var url = pathCh + '/weather/getCityList';
	    het.get(url, '', function (dataPos) {
	      var a = JSON.parse(dataPos);
	      c = a.data;
	      thisCitys.trigger({ citys: c });
	    }, function (data) {
	      console.log(data, 'fail');
	      // het.toast('数据请求错误---全国城市列表接口')
	    });
	  },


	  //定位
	  onPlace: function onPlace(index) {
	    var _this = this;
	    var url = path + '/wisdombox/getLocation?deviceId=' + deviceId;
	    het.get(url, {}, function (Succ) {
	      var obOK = JSON.parse(Succ);
	      var obData = obOK.data.onlineLocation.city;
	      //新增盒子地理位置--参数
	      var dataCode = obOK.data.onlineLocation.cityCode;
	      var urladd = path + '/wisdombox/addLocation?deviceId=' + deviceId;
	      het.get(urladd + '&code=' + dataCode, {}, function (Succ) {
	        // console.log('定位--新增盒子地理位置成功',Succ);
	      }, function (Fail) {
	        // console.log("定位--新增盒子地理位置失败",Fail);
	      });

	      _this.trigger({ positionCity: obData });
	    }, function (Fail) {
	      console.log(Fail);
	    });
	  },


	  //获取设备运行数据
	  onGetOnlineData: function onGetOnlineData(index) {
	    var _this = this;
	    var url = path + '/device/data/get?deviceId=' + deviceId;
	    het.get(url, {}, function (sucData) {
	      var alterdata = sucData;
	      var newalterdata = JSON.parse(alterdata);
	      var dealine = newalterdata.data.temperature;
	      var humidity = newalterdata.data.humidity;
	      var renderIf2 = void 0;
	      if (index == 1) {
	        renderIf2 = 3;
	      } else {
	        renderIf2 = null;
	      }
	      _this.trigger({ temperature: dealine, humidity: humidity, renderIf2: renderIf2 });
	    }, function (failData) {
	      console.log('请求数据-错误参数等原因返回的数据', failData);
	    });
	  },


	  //改变灯开关
	  onOnoffLight: function onOnoffLight(index) {
	    console.log(index);
	    var a = this.onGetTime();
	    var light = this;

	    light.trigger({ boxswitch: index, rendenrIf: 2 });
	    // 控制设备--先判断设备开关当前状态，  当点击按钮时（开->关，关->开） 控制设备开关灯变化
	    var data = {
	      deviceId: deviceId,
	      source: 8,
	      json: JSON.stringify({
	        boxSwitch: index,
	        updateFlag: Math.pow(2, 0),
	        controlCode: "0"
	      })
	    };
	    var url = path + '/device/config/set'; //控制设备的接口
	    var geturl = path + '/device/data/get?deviceId=' + deviceId; //获取设备运行状态

	    //点击控制开关先判断设备是否连线,连线了则调接口控制开关。离线则alert（totat）弹出提示

	    het.post(url, data, function (enSuccData) {
	      var d = JSON.parse(enSuccData);
	      if (d.msg === '设备不在线') {
	        //无按钮弹窗

	        var showMsg = function showMsg(msg) {
	          var msgWrap = $("#msg-warning");
	          var msgBox = $('<div class="msg-content"></div>');
	          if (msgWrap.length === 0) {
	            msgWrap = $('<div id="msg-warning"></div>');
	            $("body").append(msgWrap);
	          }
	          msgWrap.empty();
	          msgBox.addClass("fade-in").text(msg).appendTo(msgWrap);
	        };

	        ;
	        showMsg('设备不在线');
	      }
	    }, function (enFuaiData) {
	      console.log("调节开关-失败", enFuaiData);
	    });
	  },
	  onGetTime: function onGetTime() {
	    var getTime = new Date();
	    var nowYear = getTime.getFullYear();
	    var nowMonth = getTime.getMonth() + 1;
	    var nowDate = getTime.getDate();
	    if (nowMonth < 10) {
	      nowMonth = '0' + nowMonth;
	    }
	    var nowTime = nowYear + '-' + nowMonth + '-' + nowDate;
	    return nowTime;
	  },


	  //获取 优 全国数据
	  onGetAllSleepData: function onGetAllSleepData() {
	    //修改标题
	    var $body = $('body');
	    document.title = '睡眠环境指数';
	    // hack在微信等webview中无法修改document.title的情况
	    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	    $iframe.on('load', function () {
	      setTimeout(function () {
	        $iframe.off('load').remove();
	      }, 0);
	    }).appendTo($body);

	    //调用全国数据需要参数
	    var nowTime = this.onGetTime();
	    var nationSleep = this;
	    var nationDataList = []; //存储全国卧室环境

	    var bedTimeNation = []; //存储 对比时间
	    var bedLevelPersonal = []; //存储 个人等级

	    var SuccList = null;
	    //-dayDataPageList-获取最近统计数据--智慧盒子卧室环境
	    var url2 = path + '/wisdombox/dayDataPageList?deviceId=' + deviceId;
	    het.get(url2, {}, function (Succ) {
	      var bedJson = JSON.parse(Succ);
	      SuccList = bedJson.data.dataList;
	      //反转后不管是前还是后，再方法里都是反转后的
	      SuccList.reverse();
	      //判断如果是10:30之前，那就不显示昨天的。
	      var getTime = new Date();
	      var getHours = getTime.getHours();
	      var getMinutes = getTime.getMinutes();
	      var getSeconds = getTime.getSeconds();
	      var nowTime2 = getHours + '-' + getMinutes + '-' + getSeconds;

	      if (getHours <= 10 && getMinutes <= 30 || getHours <= 10 && getMinutes >= 30) {
	        for (var i = 0; i < SuccList.length - 1; i++) {
	          var c = SuccList[i].dataTime;
	          var d = SuccList[i].level;
	          bedTimeNation.push(c);
	          bedLevelPersonal.push(d);
	        }
	      } else {
	        for (var i = 0; i < SuccList.length; i++) {
	          var c = SuccList[i].dataTime;
	          var d = SuccList[i].level;
	          bedTimeNation.push(c);
	          bedLevelPersonal.push(d);
	        }
	      }

	      //截取年份   
	      for (var w = 0; w < bedTimeNation.length; w++) {
	        bedTimeNation[w] = bedTimeNation[w].substr(5);
	      }

	      if (bedTimeNation.length == 1) {
	        bedTimeNation.push(null, null, null, null, null, null);
	      } else if (bedTimeNation.length == 2) {
	        bedTimeNation.push(null, null, null, null, null);
	      } else if (bedTimeNation.length == 3) {
	        bedTimeNation.push("", "", "", "");
	      } else if (bedTimeNation.length == 4) {
	        bedTimeNation.push("", "", "");
	      } else if (bedTimeNation.length == 5) {
	        bedTimeNation.push(null, null);
	      } else if (bedTimeNation.length == 6) {
	        bedTimeNation.push(null);
	      } else {
	        bedTimeNation = bedTimeNation;
	      }

	      //存储 个人等级
	      if (bedLevelPersonal.length == 1) {
	        bedLevelPersonal.push(null, null, null, null, null, null);
	      } else if (bedLevelPersonal.length == 2) {
	        bedLevelPersonal.push(null, null, null, null, null);
	      } else if (bedLevelPersonal.length == 3) {
	        bedLevelPersonal.push("", "", "", "");
	      } else if (bedLevelPersonal.length == 4) {
	        bedLevelPersonal.push("", "", "");bedLevelPersonal;
	      } else if (bedLevelPersonal.length == 5) {
	        bedLevelPersonal.push(null, null);
	      } else if (bedLevelPersonal.length == 6) {
	        bedLevelPersonal.push(null);
	      } else {
	        bedLevelPersonal = bedLevelPersonal;
	      }
	      //存储 个人等级---转化
	      for (var k = 0; k < bedLevelPersonal.length; k++) {
	        if (bedLevelPersonal[k] == '优') {
	          bedLevelPersonal[k] = 8;
	        } else if (bedLevelPersonal[k] == '良') {
	          bedLevelPersonal[k] = 6;
	        } else if (bedLevelPersonal[k] == '中') {
	          bedLevelPersonal[k] = 4;
	        } else if (bedLevelPersonal[k] == '差') {
	          bedLevelPersonal[k] = 2;
	        } else if (bedLevelPersonal[k] == '糟') {
	          bedLevelPersonal[k] = 0;
	        }
	      }
	      //这个是全国-个人优的等级（数据）要不同于首页的。因为睡眠环境指数-全国的10:30才更新昨天的。故10:30之前要显示少一天  
	      //dayListCountryData-智慧盒子获取指定日期的全国统计记录列表
	      var url = path + '/wisdombox/dayListCountryData?dataTime=';
	      het.get(url + nowTime, {}, function (Succ) {
	        var nationList = JSON.parse(Succ);

	        console.log(nationList);

	        var getNationData = nationList.data;
	        //全国卧室环境---nationDataList-所有的我是环境的等级 Echats level  等级
	        //获取的全国环境记录-日期按照新到老
	        getNationData.reverse();
	        // console.log("反", getNationData);
	        var dd = [];
	        for (var i = 0; i < getNationData.length; i++) {
	          nationDataList.push(getNationData[i].level);
	          dd.push(getNationData[i].dataTime);
	        }
	        //还有问题是 全国的时间与个人的时间有可能不一致。所以还要做处理
	        //获取最近的7天的全国环境指数
	        //
	        var aa = [];
	        var bb = [];
	        //获取全国日期时间

	        for (var i = 0; i < getNationData.length; i++) {
	          getNationData[i].dataTime = getNationData[i].dataTime.substr(5);
	          aa.push(getNationData[i].dataTime);
	        }

	        //通过两次循环 获取了全国与个人相同时间的睡眠数据
	        for (var j = 0; j < aa.length; j++) {
	          for (var k = 0; k < bedTimeNation.length; k++) {
	            if (aa[j] == bedTimeNation[k]) {
	              bb.push(aa[j]);
	            }
	          }
	        }
	        // console.log('//通过两次循环 获取了全国与个人相同时间的睡眠数据',bb);
	        //然后通过这个数据从全国那里取对应天数的等级
	        var real = [];
	        //getNationData  全国的数据
	        //bb             对比后的天数  

	        getNationData.map(function (data, index) {
	          bb.map(function (geta, getb) {
	            if (data.dataTime == geta) {
	              real.push(data);
	            }
	          });
	        });

	        // console.log('取真正获取对应到的全国数据',real);

	        // real.reverse();
	        // console.log('取真正获取对应到的全国数据',real);
	        //取真正获取对应到的全国数据的等级
	        var getLevel = [];
	        for (var i = 0; i < real.length; i++) {
	          getLevel.push(real[i].level);
	        }

	        for (var k = 0; k < getLevel.length; k++) {
	          if (getLevel[k] == '优') {
	            getLevel[k] = 8;
	          } else if (getLevel[k] == '良') {
	            getLevel[k] = 6;
	          } else if (getLevel[k] == '中') {
	            getLevel[k] = 4;
	          } else if (getLevel[k] == '差') {
	            getLevel[k] = 2;
	          } else if (getLevel[k] == '糟') {
	            getLevel[k] = 0;
	          }
	        }

	        if (getLevel.length == 1) {
	          getLevel.push(null, null, null, null, null, null);
	        } else if (getLevel.length == 2) {
	          getLevel.push(null, null, null, null, null);
	        } else if (getLevel.length == 3) {
	          getLevel.push("", "", "", "");
	        } else if (getLevel.length == 4) {
	          getLevel.push("", "", "");
	        } else if (getLevel.length == 5) {
	          getLevel.push(null, null);
	        } else if (getLevel.length == 6) {
	          getLevel.push(null);
	        } else {
	          getLevel = getLevel;
	        }

	        // console.log('取真正获取对应到的全国数据的等级',getLevel);
	        // console.log("trigger出去",getLevel,bedTimeNation,bedLevelPersonal);
	        //个人的睡眠时间和等级-bedTimeNation--bedLevelPersonal
	        nationSleep.trigger({ nationLevel: getLevel, bedTimeNation: bedTimeNation, bedLevelPersonal: bedLevelPersonal });
	      }, function (Fail) {
	        console.log("获取盒子卧室环境失败失败", Fail);
	      });
	    }, function (Fail) {
	      console.log(Fail);
	    });
	  },


	  //当选择其他城市时
	  onOtherCity: function onOtherCity(selectCity, dataCode) {
	    var _this = this;
	    var url = path + '/wisdombox/addLocation?deviceId=' + deviceId;
	    het.get(url + '&code=' + dataCode, {}, function (Succ) {
	      // console.log('选择其他城市时成功',Succ);
	    }, function (Fail) {
	      // console.log("选择其他城市时失败",Fail);
	    });
	  },


	  //个人历史数据
	  onHistoryData: function onHistoryData(dev) {
	    //修改标题
	    var $body = $('body');
	    document.title = '所有已记录的数据';
	    // hack在微信等webview中无法修改document.title的情况
	    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	    $iframe.on('load', function () {
	      setTimeout(function () {
	        $iframe.off('load').remove();
	      }, 0);
	    }).appendTo($body);

	    var nowTime = this.onGetTime();
	    var personal = this;
	    var bedWords = this;
	    var PersonalBedTime = []; //存储 时间
	    var PersonalLevel = []; //存储 等级

	    var url = path + '/wisdombox/dayDataPageList?deviceId=' + deviceId;
	    het.get(url + '&dataTime=' + nowTime + '&pageIndex=1&pageRows=31', {}, function (Succ) {
	      var bedTime = [];
	      var bedJson = JSON.parse(Succ);
	      var SuccList = bedJson.data.dataList;
	      SuccList[1].sty = 1;
	      var sty = [];
	      for (var i = 0; i < SuccList.length; i++) {
	        sty.push(SuccList[i].level);
	      }
	      //样式-点
	      for (var j = 0; j < sty.length; j++) {
	        if (sty[j] == '优') {
	          sty[j] = 'dataInfo-y';
	        } else if (sty[j] == '良') {
	          sty[j] = 'dataInfo-L';
	        } else if (sty[j] == '中') {
	          sty[j] = 'dataInfo-z';
	        } else if (sty[j] == '差') {
	          sty[j] = 'dataInfo-c';
	        } else {
	          sty[j] = 'dataInfo-za';
	        }
	      }

	      for (var k = 0; k < SuccList.length; k++) {
	        SuccList[k].sty = sty[k];
	      }

	      personal.trigger({ PersonalBedList: SuccList });
	    }, function (fail) {
	      console.log('返回错误', fail);
	    });
	  },


	  // 获取某个智慧盒子卧室环境点击的时间
	  onGetDetailbed: function onGetDetailbed(indexing) {
	    // document.title = '详细信息';

	    //修改标题
	    var $body = $('body');
	    document.title = '详细信息';
	    // hack在微信等webview中无法修改document.title的情况
	    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	    $iframe.on('load', function () {
	      setTimeout(function () {
	        $iframe.off('load').remove();
	      }, 0);
	    }).appendTo($body);

	    var detail = this;
	    var getLevel = null;
	    var url = path + '/wisdombox/dayDataDetail?deviceId=' + deviceId;

	    het.get(url + ' &dataTime=' + indexing, {}, function (Succ) {
	      var detailChange = JSON.parse(Succ);
	      var detailData = detailChange.data;
	      var detailDataTime = detailData.dataTime;
	      detailData.ChangedataTime = detailDataTime.substr(5);
	      detail.trigger({ detailData: detailData });
	    }, function (Fail) {
	      console.log('个人详细睡眠记录--请求错误', Fail);
	    });
	    return getLevel;
	  },


	  //个人首页-优-
	  onGetScoreLevel: function onGetScoreLevel() {

	    var me = this;
	    var LevelColor = null;
	    //盒子首页环境评分
	    var url = path + '/wisdombox/getScoreLevel?deviceId=' + deviceId;
	    het.get(url, {}, function (Succ) {
	      var detailChange = JSON.parse(Succ);
	      var getScoreLevel = detailChange.data.level;

	      switch (getScoreLevel) {
	        case '优':
	          LevelColor = 'LevelColor-y';
	          break;
	        case '良':
	          LevelColor = 'LevelColor-L';
	          break;
	        case '中':
	          LevelColor = 'LevelColor-z';
	          break;
	        case '差':
	          LevelColor = 'LevelColor-c';
	          break;
	        case '糟':
	          LevelColor = 'LevelColor-za';
	          break;
	        default:
	          console.log('盒子首页环境评分错误');
	      }
	      me.trigger({ getScoreLevel: getScoreLevel, LevelColor: LevelColor });
	    }, function (Fail) {
	      console.log('盒子首页环境评分---------->失败', Fail);
	    });
	  },


	  //首页--获取位置信息
	  onNewCity: function onNewCity() {
	    var _this = this;
	    var url = path + '/wisdombox/getLocation?deviceId=' + deviceId;
	    het.get(url, {}, function (Succ) {
	      var obOK = JSON.parse(Succ);
	      var obData = obOK.data.onlineLocation.city;
	      var setLocation = obOK.data.setLocation.city;
	      _this.trigger({ setLocation: setLocation });
	    }, function (Fail) {
	      console.log(Fail);
	    });
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *灯开关控制
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ControlDegree = undefined;

	var _Actions = __webpack_require__(6);

	var AppData = {};

	var ControlDegree = exports.ControlDegree = React.createClass({
	    displayName: 'ControlDegree',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(next) {
	        console.log("next", next);
	        var oldTemperature = this.props.temperature ? this.props.temperature : '';
	        var newTemperature = next.temperature ? next.temperature : "";

	        var oldhumidity = this.props.humidity ? this.props.humidity : '';
	        var newhumidity = next.humidity ? next.humidity : "";

	        AppData.temperature = newTemperature;
	        AppData.newhumidity = newhumidity;

	        // console.log("123",newTemperature,"+++",oldTemperature);
	        if (newTemperature > oldTemperature) {
	            AppData.change = 1;
	        } else if (newTemperature < oldTemperature) {
	            AppData.change = 2;
	        } else {
	            AppData.change = 3;
	        }

	        if (newhumidity > oldhumidity) {
	            AppData.change2 = 1;
	        } else if (newhumidity < oldhumidity) {
	            AppData.change2 = 2;
	        } else {
	            AppData.change2 = 3;
	        }
	    },


	    render: function render() {
	        // console.log(' 每隔8秒获取设备运行数据+++');
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                { className: 'ControlDegree-sec' },
	                React.createElement(
	                    'div',
	                    { className: 'temperature' },
	                    React.createElement('img', { className: 'temImg', src: './../static/img/temperature.png' }),
	                    React.createElement(
	                        'span',
	                        { className: 'temtrue' },
	                        '温度'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        React.createElement(
	                            'b',
	                            null,
	                            AppData.temperature,
	                            '°c'
	                        )
	                    ),
	                    React.createElement('img', { className: 'arrowImg', style: { visibility: AppData.change == 3 ? 'hidden' : 'visible' }, src: AppData.change == 1 ? "./../static/img/1.png" : AppData.change == 2 ? "./../static/img/2.png" : "" })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'dampness' },
	                    React.createElement('img', { className: 'temImg', src: './../static/img/dampness.png' }),
	                    React.createElement(
	                        'span',
	                        { className: 'temtrue' },
	                        '湿度'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        React.createElement(
	                            'b',
	                            null,
	                            AppData.newhumidity,
	                            '%'
	                        )
	                    ),
	                    React.createElement('img', { className: 'arrowImg', style: { visibility: AppData.change2 == 3 ? 'hidden' : 'visible' }, src: AppData.change2 == 1 ? "./../static/img/1.png" : AppData.change2 == 2 ? "./../static/img/2.png" : "" })
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
	 *灯开关控制
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DeviceData = undefined;

	var _Actions = __webpack_require__(6);

	var DeviceData = exports.DeviceData = React.createClass({
	    displayName: 'DeviceData',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                { className: 'DeviceData-sec' },
	                React.createElement(
	                    'div',
	                    { className: 'DeviceDataTitle' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '设备指数'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'DeviceInfo' },
	                    React.createElement(
	                        'div',
	                        { className: 'DeviceInfo-t' },
	                        React.createElement(
	                            'div',
	                            { className: 'air-condition' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '空调'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '26',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '°c'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'sound' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '音响'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '助眠音乐'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'DeviceInfo-b' },
	                        React.createElement(
	                            'div',
	                            { className: 'sleep' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '助眠灯'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '弱红光'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'curtain' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '窗帘'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '关闭'
	                            )
	                        )
	                    )
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
	 *智慧盒子图表
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EchartsData = undefined;

	var _Actions = __webpack_require__(6);

	het.ready(function (data) {});

	het.repaint(function (data) {});

	var EchartsData = exports.EchartsData = React.createClass({
	    displayName: 'EchartsData',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    // componentWillReceiveProps(nextProps){
	    //      // Actions.getOnlineData();
	    //      console.log("componentWillReceiveProps",nextProps);

	    //     //   setInterval(function(){
	    //     //   Actions.getOnlineData()
	    //     // },3000);
	    // },

	    render: function render() {
	        var ad = this.props.echatLevelWords ? this.props.echatLevelWords : [" ", " ", " ", " ", " ", " ", " "];
	        return React.createElement(
	            'div',
	            { className: 'echarts-out' },
	            React.createElement(
	                'ul',
	                { className: 'echat' },
	                ad.map(function (kk, index) {
	                    return React.createElement(
	                        'li',
	                        { className: 'echat-li', key: index, 'data-index': index },
	                        kk,
	                        ' '
	                    );
	                }.bind(this))
	            ),
	            React.createElement('div', { id: 'main' })
	        );
	    },

	    //     componentDidMount(){

	    //          //获取卧室数据
	    //          Actions.getbedroom();
	    //          // console.log("this.componentDidMount",th);

	    //       console.log("this.componentDidMount",this.props.echatTime);

	    //       let time  = this.state.echatTime?this.state.echatTime:[];
	    //       let level = this.state.echatLevel?this.state.echatLevel:[];

	    // console.log("this.time",time,level);
	    //         // 基于准备好的dom，初始化echarts实例
	    //       var myChart = echarts.init(document.getElementById('main'));

	    //        // 指定图表的配置项和数据

	    //      var   option = {

	    //     color:['#fcad3d'],
	    //     tooltip: {
	    //         trigger: 'axis',
	    //         show:false
	    //     },
	    //     grid: {
	    //         left: '1%',
	    //         right: '4%',
	    //         bottom: '3%',
	    //         containLabel: true
	    //     },

	    //     xAxis: {
	    //         type: 'category',
	    //         boundaryGap: false,
	    //         data: time,

	    //     },
	    //     yAxis: {
	    //         type: 'value',
	    //         axisTick:{    // y轴一横一横的
	    //                  show:false
	    //                 },
	    //         axisLabel:{
	    //           show:false
	    //         }
	    //     },
	    //     series: [
	    //         {
	    //             name:'邮件营销',
	    //             type:'line',
	    //             stack: '总量',
	    //             data:level
	    //         }
	    //     ]
	    // };
	    //            myChart.setOption(option);
	    //            

	    //     shouldComponentUpdate( nextProps,  nextState){
	    //       console.log("shouldComponentUpdate",nextProps);
	    //       // let a;

	    //        return false

	    // },

	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        console.log(nextProps);
	        // console.log(nextProps.rendenrIf,nextProps.rendenrIf2);
	        // console.log("----",nextProps.echatTime);
	        // console.log("----",this.props.echatTime);
	        if (nextProps.renderIf == 2) return false;
	        if (nextProps.renderIf2 == 3) return false;

	        var aa = this.props.echatTime;
	        var echatTime = nextProps.echatTime ? nextProps.echatTime : ["09-26"];
	        var echatLevel = nextProps.echatLevel ? nextProps.echatLevel : ["09-26"];
	        // 基于准备好的dom，初始化echarts实例
	        var myChart = echarts.init(document.getElementById('main'));

	        // console.log("---next",nextProps.echatTime);
	        // console.log("this.props.",this.props.echatTime);

	        // 指定图表的配置项和数据

	        var option = {

	            color: ['#fcad3d'],
	            tooltip: {
	                trigger: 'axis',
	                show: false
	            },
	            grid: {
	                left: '1%',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true
	            },

	            xAxis: {
	                type: 'category',
	                boundaryGap: false,
	                data: echatTime

	            },
	            yAxis: {
	                type: 'value',
	                axisTick: { // y轴一横一横的
	                    show: false
	                },
	                axisLabel: {
	                    show: false
	                }
	            },
	            series: [{
	                name: '邮件营销',
	                type: 'line',
	                stack: '总量',
	                data: echatLevel
	            }]
	        };

	        // 没有取到值得时候，会显示图表数据正在努力加载 
	        // myChart.showLoading({
	        //   text: "图表数据正在努力加载..."
	        // });

	        // 使用刚指定的配置项和数据显示图表。

	        // var timeLength = echatTime.length ;
	        // console.log(timeLength,nextProps.echatTime.length);
	        // if(nextProps.echatTime.length != timeLength){
	        //  console.log("a")
	        myChart.setOption(option);
	        // }
	    }

	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *定位页
	 *
	 */
	//定位路由页面

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AllData = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _DetailInfo = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是Location  页面的  组件

	var AllData = exports.AllData = function (_BaseComponent) {
	    _inherits(AllData, _BaseComponent);

	    function AllData(props) {
	        _classCallCheck(this, AllData);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AllData).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64

	        };

	        _Actions.Actions.historyData();

	        // this.singleClick = this.singleClick.bind(this);
	        _this.handleSingleClick = _this.handleSingleClick.bind(_this);

	        return _this;
	    }
	    //加载默认数据
	    // componentDidMount() {
	    //   // Actions.getDefaultData();   
	    //   let cao = this.state.gan;
	    //    console.log("componentDidMount:",this.state);
	    // }  

	    _createClass(AllData, [{
	        key: 'handleSingleClick',
	        value: function handleSingleClick(e) {

	            e.stopPropagation();
	            e.preventDefault();
	            // console.log(e);
	            // console.log(e.currentTarget.getAttribute("data-in"));
	            // let gancao     = e.currentTarget.getAttribute('data-in');
	            var dataTime = e.currentTarget.getAttribute('data-time');
	            // console.log('------++++++-----',dataTime);

	            // var getDeviceId = getUrlParam('deviceId');

	            _Actions.Actions.getDetailbed(dataTime);

	            // e.target()
	            // var sw = 0;
	            // var  flag = "0001";
	            // var json = {"boxSwitch":sw,"updateFlag":flag,"controlCode":0};
	            // var tjson = JSON.stringify(json);
	            // console.log(tjson);
	            // console.log( )
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {

	            // document.title="所有已记录的数据";
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var PersonalBedList = this.state.PersonalBedList ? this.state.PersonalBedList : [];
	            console.log(this.state.PersonalBedList);
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: 'AllData-sec' },
	                    React.createElement(
	                        'div',
	                        { className: 'dataInfo' },
	                        React.createElement(
	                            'ul',
	                            null,
	                            PersonalBedList.map(function (i, k) {
	                                return React.createElement(
	                                    'li',
	                                    { onClick: this.handleSingleClick, 'data-time': i.dataTime, key: 'mykey' + k },
	                                    ' ',
	                                    React.createElement(
	                                        Link,
	                                        { to: '/enterinfo' },
	                                        '  ',
	                                        React.createElement(
	                                            'i',
	                                            { className: i.sty },
	                                            '  '
	                                        ),
	                                        React.createElement(
	                                            'p',
	                                            null,
	                                            React.createElement(
	                                                'span',
	                                                null,
	                                                i.level
	                                            ),
	                                            ' ',
	                                            React.createElement(
	                                                'span',
	                                                { className: 'dataInfoTime' },
	                                                i.dataTime ? i.dataTime.substr(5) : '',
	                                                ' ',
	                                                React.createElement(
	                                                    'b',
	                                                    null,
	                                                    '>'
	                                                ),
	                                                ' '
	                                            )
	                                        ),
	                                        ' '
	                                    )
	                                );
	                            }.bind(this))
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return AllData;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	    // het.setTitle('所有已记录的数据');

	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	/**
	 *
	 *
	 */
	//数据详细页

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DetailInfo = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是DetailInfo  页面的  组件

	var DetailInfo = exports.DetailInfo = function (_BaseComponent) {
	  _inherits(DetailInfo, _BaseComponent);

	  function DetailInfo(props) {
	    _classCallCheck(this, DetailInfo);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DetailInfo).call(this, props));

	    _this.state = {};
	    _this.listenStore(_Store.Store); // 监听Store

	    var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	    _this.state = {
	      headerTop: isAndroid ? 73 : 64

	    };

	    return _this;
	  }
	  //加载默认数据


	  _createClass(DetailInfo, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var level = this.state.detailData ? this.state.detailData.level : ' ';
	      var time = this.state.detailData ? this.state.detailData.ChangedataTime : ' ';
	      var dataSource = this.state.detailData ? this.state.detailData.dataSource : ' ';
	      var temperature = this.state.detailData ? this.state.detailData.temperature : ' ';
	      var humidity = this.state.detailData ? this.state.detailData.humidity : ' ';

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'section',
	          { className: 'DetailInfo-sec' },
	          React.createElement(
	            'div',
	            { className: 'detailInfoData' },
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'span',
	                  null,
	                  '环境等级'
	                ),
	                React.createElement(
	                  'span',
	                  { className: 'detailInfo-r' },
	                  level
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'span',
	                  null,
	                  '记录日期'
	                ),
	                React.createElement(
	                  'span',
	                  { className: 'detailInfo-r' },
	                  time
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'span',
	                  null,
	                  '数据来源'
	                ),
	                React.createElement(
	                  'span',
	                  { className: 'detailInfo-r' },
	                  dataSource
	                )
	              ),
	              React.createElement('div', { className: 'Middle-layer' }),
	              React.createElement(
	                'li',
	                null,
	                '指数详情'
	              ),
	              React.createElement(
	                'li',
	                { className: 'detailInfo-b' },
	                React.createElement(
	                  'p',
	                  null,
	                  React.createElement(
	                    'span',
	                    null,
	                    '温度 '
	                  ),
	                  ' ',
	                  React.createElement(
	                    'span',
	                    { className: 'detailInfo-r' },
	                    temperature
	                  )
	                ),
	                React.createElement('b', null),
	                React.createElement(
	                  'p',
	                  null,
	                  React.createElement(
	                    'span',
	                    null,
	                    '湿度 '
	                  ),
	                  ' ',
	                  React.createElement(
	                    'span',
	                    { className: 'detailInfo-r' },
	                    humidity
	                  ),
	                  ' '
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return DetailInfo;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	  // het.setTitle('详细信息');
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *定位页
	 *
	 */
	//定位路由页面

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Locations = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _appMain = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是Location  页面的  组件

	var Locations = exports.Locations = function (_BaseComponent) {
	  _inherits(Locations, _BaseComponent);

	  function Locations(props) {
	    _classCallCheck(this, Locations);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Locations).call(this, props));

	    _this.state = {};
	    _this.listenStore(_Store.Store); // 监听Store

	    var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	    _this.state = {
	      headerTop: isAndroid ? 73 : 64
	    };

	    _Actions.Actions.locations();

	    _Actions.Actions.newCity();

	    _this.positionClick = _this.positionClick.bind(_this);
	    _this.locationClick = _this.locationClick.bind(_this);
	    return _this;
	  }
	  //加载默认数据


	  _createClass(Locations, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Actions.getDefaultData();  
	      // document.title = '选择城市';

	      //修改标题
	      var $body = $('body');
	      document.title = '选择城市';
	      // hack在微信等webview中无法修改document.title的情况
	      var $iframe = $('<iframe src="/favicon.ico"></iframe>');
	      $iframe.on('load', function () {
	        setTimeout(function () {
	          $iframe.off('load').remove();
	        }, 0);
	      }).appendTo($body);
	    }
	  }, {
	    key: 'locationClick',
	    value: function locationClick() {
	      _Actions.Actions.place();
	      setTimeout('window.history.back()', 1500);
	      clearTimeout();
	    }
	  }, {
	    key: 'positionClick',
	    value: function positionClick(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      var dataCity = e.currentTarget.getAttribute('data-city');
	      var dataCode = e.currentTarget.getAttribute('data-code');

	      _Actions.Actions.otherCity(dataCity, dataCode);
	      // window.history.back();
	      setTimeout('window.history.back()', 1500);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      //交互       
	      var citys = this.state.citys ? this.state.citys : '';
	      //经常选择的城市
	      var citysList = [];
	      //a-z的遍历
	      var allCitys = [];
	      var str = void 0;
	      var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y', 'z'];
	      var ff = [];
	      var cityA = [],
	          cityB = [],
	          cityC = [],
	          cityD = [],
	          cityE = [],
	          cityF = [],
	          cityG = [],
	          cityH = [],
	          cityJ = [],
	          cityK = [],
	          cityL = [],
	          cityM = [],
	          cityN = [],
	          cityP = [],
	          cityQ = [],
	          cityR = [],
	          cityS = [],
	          cityT = [],
	          cityW = [],
	          cityX = [],
	          cityY = [],
	          cityZ = [];
	      if (citys) {
	        //经常选择的城市
	        citysList = citys.hostCityList;
	        // console.log("######################",citys)；
	        // 所有城市
	        cityA = citys.a;
	        cityB = citys.b;
	        cityC = citys.c;
	        cityD = citys.d;
	        cityE = citys.e, cityF = citys.f, cityG = citys.g, cityH = citys.h, cityJ = citys.j, cityK = citys.k, cityL = citys.l, cityM = citys.m, cityN = citys.n, cityP = citys.p, cityQ = citys.q, cityR = citys.r, cityS = citys.s, cityT = citys.t, cityW = citys.w, cityX = citys.x, cityY = citys.y, cityZ = citys.z;

	        for (var i = 0; i < arr.length; i++) {
	          var index = arr[i];
	          ff.push(citys[index]);
	        }
	      }
	      //若还未点击定位，则给空
	      this.state.positionCity = this.state.positionCity ? this.state.positionCity : '';

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'section',
	          { className: 'locations-sec' },
	          React.createElement(
	            'div',
	            { className: 'RightSide' },
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#Jing' },
	                  '#'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#Xing' },
	                  '☆'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#AA' },
	                  'A'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#BB' },
	                  'B'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#CC' },
	                  'C'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#DD' },
	                  'D'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#EE' },
	                  'E'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#FF' },
	                  'F'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#GG' },
	                  'G'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#HH' },
	                  'H'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#HH' },
	                  'I'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#JJ' },
	                  'J'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#KK' },
	                  'K'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#LL' },
	                  'L'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#MM' },
	                  'M'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#NN' },
	                  'N'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#NN' },
	                  'O'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#PP' },
	                  'P'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#QQ' },
	                  'Q'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#RR' },
	                  'R'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#SS' },
	                  'S'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#TT' },
	                  'T'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#TT' },
	                  'U'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#TT' },
	                  'V'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#WW' },
	                  'W'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#XX' },
	                  'X'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#YY' },
	                  'Y'
	                )
	              ),
	              React.createElement(
	                'li',
	                null,
	                React.createElement(
	                  'a',
	                  { href: '#ZZ' },
	                  'Z'
	                )
	              )
	            )
	          ),
	          React.createElement('div', { className: 'Locations-top' }),
	          React.createElement(
	            'div',
	            { className: 'allCitys-title' },
	            '你当前的位置可能是'
	          ),
	          React.createElement(
	            'div',
	            { className: 'Current-loc  allCitys-often-nvg' },
	            React.createElement(
	              'span',
	              { className: 'Current-loc-left' },
	              ' ',
	              this.state.positionCity,
	              '   '
	            ),
	            React.createElement(
	              'span',
	              { className: 'Current-loc-right', onClick: this.locationClick },
	              '定位'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'AlsoSelect' },
	            React.createElement(
	              'p',
	              { className: 'allCitys-title' },
	              '经常选择的城市'
	            ),
	            React.createElement(
	              'ul',
	              null,
	              citysList.map(function (i, k) {
	                var dd = i.cityName;
	                // console.log(i);
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': dd, key: k, 'data-code': i.code },
	                  dd
	                );
	              })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'allCitys' },
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'Jing' },
	                React.createElement(
	                  'p',
	                  null,
	                  'A'
	                )
	              ),
	              cityA.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'BB' },
	                React.createElement(
	                  'p',
	                  null,
	                  'B'
	                )
	              ),
	              cityB.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'CC' },
	                React.createElement(
	                  'p',
	                  null,
	                  'C'
	                )
	              ),
	              cityC.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'DD' },
	                React.createElement(
	                  'p',
	                  null,
	                  'D'
	                )
	              ),
	              cityD.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'EE' },
	                React.createElement(
	                  'p',
	                  null,
	                  'E'
	                )
	              ),
	              cityE.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'FF' },
	                '  ',
	                React.createElement(
	                  'p',
	                  null,
	                  'F'
	                )
	              ),
	              cityF.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'GG' },
	                React.createElement(
	                  'p',
	                  null,
	                  'G'
	                )
	              ),
	              cityG.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'HH' },
	                React.createElement(
	                  'p',
	                  null,
	                  'H'
	                )
	              ),
	              cityH.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'JJ' },
	                React.createElement(
	                  'p',
	                  null,
	                  'J'
	                )
	              ),
	              cityJ.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'KK' },
	                React.createElement(
	                  'p',
	                  null,
	                  'K'
	                )
	              ),
	              cityK.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'LL' },
	                React.createElement(
	                  'p',
	                  null,
	                  'L'
	                )
	              ),
	              cityL.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'MM' },
	                React.createElement(
	                  'p',
	                  null,
	                  'M'
	                )
	              ),
	              cityM.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'NN' },
	                React.createElement(
	                  'p',
	                  null,
	                  'N'
	                )
	              ),
	              cityN.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'PP' },
	                React.createElement(
	                  'p',
	                  null,
	                  'P'
	                )
	              ),
	              cityP.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'QQ' },
	                React.createElement(
	                  'p',
	                  null,
	                  'Q'
	                )
	              ),
	              cityQ.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'RR' },
	                React.createElement(
	                  'p',
	                  null,
	                  'R'
	                )
	              ),
	              cityR.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'SS' },
	                React.createElement(
	                  'p',
	                  null,
	                  'S'
	                )
	              ),
	              cityS.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'TT' },
	                React.createElement(
	                  'p',
	                  null,
	                  'T'
	                )
	              ),
	              cityT.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'WW' },
	                React.createElement(
	                  'p',
	                  null,
	                  'W'
	                )
	              ),
	              cityW.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'SS' },
	                React.createElement(
	                  'p',
	                  null,
	                  'S'
	                )
	              ),
	              cityS.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'YY' },
	                React.createElement(
	                  'p',
	                  null,
	                  'Y'
	                )
	              ),
	              cityY.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            ),
	            React.createElement(
	              'ul',
	              null,
	              React.createElement(
	                'li',
	                { className: 'allCitys-nvg', id: 'ZZ' },
	                React.createElement(
	                  'p',
	                  null,
	                  'Z'
	                )
	              ),
	              cityZ.map(function (i, k) {
	                return React.createElement(
	                  'li',
	                  { className: 'allCitys-often-nvg', onClick: _this2.positionClick, 'data-city': i.cityName, key: k, 'data-code': i.code },
	                  ' ',
	                  i.cityName,
	                  '   '
	                );
	              })
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Locations;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	  // het.setTitle('选择城市');
	  // 无路由方式
	  // ReactDOM.render(<App />, document.getElementById('ROOT'));

	  // 路由方式
	  // ReactDOM.render((
	  //     <Router history={hashHistory}>
	  //         <Route path="/" component={appMain} />

	  //     </Router>
	  // ), document.getElementById('ROOT'));
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *定位页
	 *
	 */
	//定位路由页面

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AllNationnal = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _NationalEchartsData = __webpack_require__(15);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AppData = {};
	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	// 创建React    这个是Location  页面的  组件

	var AllNationnal = exports.AllNationnal = function (_BaseComponent) {
	    _inherits(AllNationnal, _BaseComponent);

	    function AllNationnal(props) {
	        _classCallCheck(this, AllNationnal);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AllNationnal).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };

	        _Actions.Actions.getAllSleepData();
	        _Actions.Actions.getbedroom();
	        _Actions.Actions.newCity();
	        _Actions.Actions.getScoreLevel();

	        return _this;
	    }

	    //加载默认数据


	    _createClass(AllNationnal, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {}
	        // setInterval(function(){
	        //  Actions.getOnlineData(1);
	        //  console.log('123')
	        // },7000);

	        // componentWillUpdate(next,two){
	        //      console.log("-1",this.state);

	        // }

	        // shouldComponentUpdate( nextProps,  nextState){
	        //       console.log("shouldComponentUpdate",nextProps);
	        //       if(nextProps.renderIf2 != null){
	        //         return false
	        //       }

	        //        return false

	        // }

	    }, {
	        key: 'render',
	        value: function render() {

	            //刷新时间
	            var getTime = new Date();
	            var nowYear = getTime.getFullYear();
	            var nowMonth = getTime.getMonth() + 1;
	            var nowDate = getTime.getDate();
	            var nowTime = nowYear + '-' + nowMonth + '-' + nowDate;
	            var time = getTime.toLocaleString();

	            var nowHour = getTime.getHours();
	            var nowMin = getTime.getMinutes();
	            if (nowHour < 10) {
	                nowHour = '0' + nowHour;
	            }
	            if (nowMin < 10) {
	                nowMin = '0' + nowMin;
	            }

	            var freshen = nowHour + ':' + nowMin;

	            // console.log(this.state);

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'headBj' },
	                    React.createElement('header', { className: 'headerTop' }),
	                    React.createElement(
	                        'div',
	                        { className: 'headContent' },
	                        React.createElement(
	                            'div',
	                            { className: 'headContentL' },
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    ' ',
	                                    this.state.getScoreLevel,
	                                    ' '
	                                ),
	                                '    '
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '刷新时间:',
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    freshen
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'headContentR' },
	                            React.createElement('img', { src: './../static/img/position.png' }),
	                            React.createElement(
	                                'span',
	                                null,
	                                this.state.setLocation ? this.state.setLocation : this.state.setLocation
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'headTip' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '睡眠环境拖累了全国指数,快去改善吧!'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_NationalEchartsData.NationalEchartsData, _defineProperty({ renderIf2: this.state.renderIf2, bedTimeNation: this.state.bedTimeNation, nationLevel: this.state.nationLevel, echatTime: this.state.echatTime, echatLevel: this.state.echatLevel, bedLevelPersonal: this.state.bedLevelPersonal }, 'renderIf2', this.state.renderIf2)),
	                React.createElement(
	                    'div',
	                    { className: 'Nationnal-info' },
	                    React.createElement(
	                        'h6',
	                        null,
	                        '智慧盒子小提示'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '光亮:'
	                        ),
	                        '人在睡眠时,光亮会造成眼皮刺激是神经,而且一直松果体分泌褪黑素,故睡眠时寝室光线宜暗不宜亮。"静"和"暗"是睡眠的两大要素 '
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '枕头:'
	                        ),
	                        '不宜太高也不宜太低。以自己的拳头高为宜，硬度适中;其长度和肩宽相等,头凉足热是最舒畅的睡眠方法'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '当前时间： ',
	                        nowTime
	                    )
	                )
	            );
	        }
	    }]);

	    return AllNationnal;
	}(_BaseComponentClass.BaseComponent);

	// // 开始渲染


	het.domReady(function () {
	    // het.setTitle('睡眠环境指数');

	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 *智慧盒子图表
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NationalEchartsData = undefined;

	var _Actions = __webpack_require__(6);

	het.ready(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    // Actions.repaint(data);
	});

	het.repaint(function (data) {});

	var NationalEchartsData = exports.NationalEchartsData = React.createClass({
	    displayName: 'NationalEchartsData',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {

	        return React.createElement(
	            'section',
	            { className: 'nationGan' },
	            React.createElement(
	                'div',
	                { className: 'echarts-nationl', ref: 'chart', id: 'mainChart' },
	                ' '
	            ),
	            React.createElement(
	                'p',
	                { className: 'sleepTip' },
	                '睡眠环境对比图',
	                React.createElement(
	                    'span',
	                    { className: 'sleepTip-span' },
	                    React.createElement(
	                        'span',
	                        { className: 'myColor' },
	                        React.createElement('b', null),
	                        '  我的'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'allColor' },
	                        React.createElement('b', null),
	                        ' 全国'
	                    )
	                )
	            )
	        );
	    },

	    // shouldComponentUpdate( nextProps,  nextState){
	    //       console.log("shouldComponentUpdate",nextProps);
	    //       return true
	    // },

	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {

	        var bedTimeNation = nextProps.bedTimeNation ? nextProps.bedTimeNation : [];
	        var bedLevelPersonal = nextProps.bedLevelPersonal ? nextProps.bedLevelPersonal : [];
	        var nationLevel = nextProps.nationLevel ? nextProps.nationLevel : [];

	        // console.log("--",nextProps);
	        if (nextProps.renderIf2 == 3) return false;

	        // console.log('----------------',bedTimeNation,bedLevelPersonal, nationLevel);
	        // 基于准备好的dom，初始化echarts实例
	        var myChart = echarts.init(document.getElementById('mainChart'));
	        // 指定图表的配置项和数据
	        var option = {

	            color: ['#fcad3d'],

	            title: {
	                text: '',
	                link: "http://www.baidu.com"
	            },
	            tooltip: {
	                trigger: 'axis',
	                show: false
	            },

	            grid: {
	                left: '1%',
	                right: '4%',
	                bottom: '6%',

	                containLabel: true,
	                backgroundColor: '#dedede',
	                borderColor: '#458B00',
	                borderWidth: 22

	            },

	            xAxis: {
	                type: 'category',
	                boundaryGap: false,
	                data: bedTimeNation
	            },
	            yAxis: {
	                // type: 'category',
	                boundaryGap: false,
	                // data: [0,1,2,3,3],
	                axisLabel: {
	                    formatter: function formatter(value) {
	                        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',value);
	                        if (value == 0) {
	                            return '糟';
	                        }
	                        if (value == 2) {
	                            return '差';
	                        }
	                        if (value == 4) {
	                            return '中';
	                        }
	                        if (value == 6) {
	                            return '良';
	                        }
	                        if (value == 8) {
	                            return '优';
	                        }
	                    }
	                },
	                splitLine: {
	                    show: false
	                }

	            },
	            series: [{
	                name: '全国睡眠指数',
	                type: 'line',
	                stack: '5',
	                data: nationLevel,
	                itemStyle: {
	                    normal: {
	                        color: '#ffc007'
	                    }
	                }
	            }, {
	                name: '个人睡眠指数',
	                type: 'line',
	                stack: '8',
	                data: bedLevelPersonal,
	                itemStyle: {
	                    normal: {
	                        color: '#afd119'
	                    }
	                }
	            }]

	        };
	        // 没有取到值得时候，会显示图表数据正在努力加载 
	        // myChart.showLoading({
	        //   text: "图表数据正在努力加载..."
	        // });
	        // 使用刚指定的配置项和数据显示图表。
	        myChart.setOption(option);
	    }

	});

/***/ }
/******/ ]);