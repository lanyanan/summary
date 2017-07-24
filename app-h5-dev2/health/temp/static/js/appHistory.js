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

	module.exports = __webpack_require__(8);


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
	'changeDate' //更新图表数据
	]);

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

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    },
	    onChangeDate: function onChangeDate(newdate, data) {
	        var timelist = [],
	            templist = [],
	            _this = this;
	        //datajson={"data": [{"key": "2016-06-12 10:00:00","value": "36.4"},   {"key": "2016-06-12 11:00:00","value": "36.6"},
	        // {"key": "2016-06-12 15:00:00","value": "36.9"}, {"key": "2016-06-12 18:00:00", "value": "37.4" }]};

	        var url = '/v1/app/chealth/thermometer/getThermometerByDate';
	        data.date = newdate;
	        het.get(url, data, sucCallback, function (dd) {
	            console.log(dd);
	        });
	        // het.get(url,data,function(dd){console.log('sucCallback'+dd);},function(dd){alert('error'+dd);});


	        function sucCallback(dt) {
	            var data = JSON.parse(dt),
	                date = data.data;
	            //console.log(date);
	            for (var i in date) {
	                /*let time=Funs.dateFormatFull(data[i].key,"-",1);时间戳处理*/
	                /*let time=date[i].key.substring(11,16), */
	                //utc要改为本地时间
	                var utcDay = date[i].key.split(' '),
	                    utcDate = utcDay[0].split('-'),
	                    utcTime = utcDay[1].split(':'),
	                    timetamp = Math.round(Date.UTC(utcDate[0], utcDate[1] - 1, utcDate[2], utcTime[0], utcTime[1], utcTime[2]) / 1000),
	                    time = _fun.Funs.dateFormatFull(timetamp, "-", 1),
	                    temp = date[i].value < 34 ? '34' : date[i].value > 42 ? '42' : date[i].value;
	                timelist.push(time);
	                templist.push(temp);
	                console.log(timetamp);
	            }
	            console.log(timelist, templist);
	            _this.trigger({ timeArray: timelist, tempArray: templist });
	        }
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _Echarts = __webpack_require__(9);

	var _Calendar = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/*import {SimpleCalendar, utils} from 'react-easy-calendar';
	*/


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	//SDK准备就绪 回调函数
	het.ready(function (data) {
	    _Actions.Actions.repaint(data);
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

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = { timeArray: ["00:00"],
	            tempArray: ['37'],
	            changeDate: '',
	            appId: '',
	            deviceId: '',
	            userType: '',
	            memberId: '',
	            headerTop: isAndroid ? 50 : 64 };
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var data = {
	                "appId": this.state.appId,
	                "deviceId": this.state.deviceId,
	                "userType": this.state.userType,
	                "memberId": this.state.memberId
	            };
	            return React.createElement(
	                'div',
	                { className: 'history' },
	                React.createElement(
	                    'section',
	                    { className: 'main' },
	                    React.createElement('header', { style: { 'paddingTop': this.state.headerTop } }),
	                    React.createElement(_Calendar.Clndr, { getdata: data })
	                ),
	                React.createElement(_Echarts.Echarts, { timelist: this.state.timeArray, templist: this.state.tempArray, getdata: data })
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            setTimeout(function () {
	                var data = {
	                    "appId": _this.state.appId,
	                    "deviceId": _this.state.deviceId,
	                    "userType": _this.state.userType,
	                    "memberId": _this.state.memberId
	                },
	                    today = _fun.Funs.dateFormatFull(new Date().getTime() / 1000, '-');
	                _Actions.Actions.changeDate(today, data);
	            }, 500);
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);
	// 开始渲染


	het.domReady(function () {
	    het.setTitle('历史数据');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    /* // 路由方式
	     ReactDOM.render((
	         <Router history={hashHistory}>
	             <Route path="/" component={App} />
	         </Router>
	     ), document.getElementById('ROOT'));*/
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 图表组件
	 * @prop {array} timelist  x轴时间值
	 * @prop {array} templist  y轴温度值
	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Echarts = undefined;

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(6);

	var Echarts = exports.Echarts = React.createClass({
	    displayName: 'Echarts',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement('section', { className: 'flex chart-container', id: 'chart', ref: 'chart' });
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;
	        setTimeout(function () {
	            var getdata = this.props ? this.props.getdata : false;
	            if (getdata) {
	                var data = this.props.getdata;
	                //console.log(data);
	                var today = _fun.Funs.dateFormatFull(new Date().getTime() / 1000, '-');
	                _Actions.Actions.changeDate(today, data);
	            }
	        }, 1000);
	    },
	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        if (nextProps.timelist != '') {
	            var timelist = nextProps.timelist,
	                templist = nextProps.templist,
	                chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点
	            //console.log(nextProps,templist);

	            for (var i = 0; i < templist.length; i++) {
	                if (templist[i] > 42) {
	                    templist[i] = '42';
	                }
	            }

	            // 基于准备好的dom，初始化echarts实例
	            var myChart = echarts.init(chartDom),
	                options = {
	                color: ['#FFB9C4'],
	                grid: {
	                    left: '3%',
	                    right: '5%',
	                    bottom: '5%',
	                    top: "12%",
	                    containLabel: true
	                },
	                textStyle: {
	                    color: '#BDBDBD'
	                },
	                tooltip: {
	                    trigger: 'axis'
	                },
	                xAxis: {
	                    type: 'category',
	                    boundaryGap: false,
	                    data: timelist,
	                    axisLine: { lineStyle: { color: '#E1E1E1' } }
	                },
	                yAxis: {
	                    type: 'value',
	                    splitNumber: 1,
	                    interval: 1,
	                    min: 34,
	                    max: 42,
	                    axisLine: { lineStyle: { color: 'transparent ', type: 'dashed' } }
	                },
	                series: [{
	                    name: '温度',
	                    type: 'line',
	                    data: templist
	                }]
	            };
	            // 绘制图表
	            myChart.setOption(options);
	        }
	    }

	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 日历组件
	 * @prop {obj} getdata  请求接口需要传的参数
	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clndr = undefined;

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(6);

	var Clndr = exports.Clndr = React.createClass({
	    displayName: 'Clndr',

	    getInitialState: function getInitialState() {
	        return { datelist: [], dt: '' };
	    },

	    render: function render() {
	        return React.createElement('div', { className: 'calendar-wrap', ref: 'calendar' });
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;
	        setTimeout(function () {
	            var datelist = [];
	            var data = _this.state.dt,
	                url = '/v1/app/chealth/thermometer/getThermometerByDate',
	                newmonth = _fun.Funs.dateFormatFull(new Date().getTime() / 1000, 'month');
	            if (data != '') {
	                var sucCallback = function sucCallback(dd) {
	                    console.log(dd);
	                    var data = JSON.parse(dd),
	                        date = data.data;
	                    if (date != '') {
	                        for (var i in date) {
	                            /*let day=Funs.dateFormatFull(data[i].date,"day");时间戳处理*/
	                            var day = Number(date[i].date.substring(8, 11));
	                            datelist.push(day);
	                        }
	                    }

	                    new Calendar({
	                        target: '.calendar-wrap',
	                        className: 'cal',
	                        tagDates: datelist,
	                        //tagDates:[9,15],
	                        'showToday': true,
	                        onSelect: _this.selectDate,
	                        onChangeMonthBefore: function onChangeMonthBefore(dateObj) {
	                            _this.getTagDates(dateObj);
	                        },
	                        onToday: function onToday(dateObj) {
	                            //alert(dateObj.type);
	                            _this.getTagDates(dateObj);
	                            _this.selectDate(dateObj);
	                        }
	                    });
	                };

	                data.date = newmonth;
	                het.get(url, data, sucCallback, function (dd) {
	                    console.log(dd);
	                });
	            }
	        }, 500);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({ dt: nextProps.getdata });
	    },
	    selectDate: function selectDate(dateObj, e) {
	        var day = dateObj.date > 9 ? dateObj.date : '0' + dateObj.date,
	            month = dateObj.month > 9 ? dateObj.month : '0' + dateObj.month,
	            newdate = dateObj.year + '-' + month + '-' + day,
	            data = this.state.dt;
	        _Actions.Actions.changeDate(newdate, data);
	    },
	    getTagDates: function getTagDates(dateObj) {
	        var datelist = [];
	        var _this = this;
	        var data = _this.state.dt;
	        var url = '/v1/app/chealth/thermometer/getThermometerByDate';
	        var type = dateObj.type,
	            month = dateObj.month,
	            year = dateObj.year,
	            newMonth = type === 'pre' ? month - 1 : type === 'today' ? month : month + 1,
	            trueMonth = newMonth > 9 ? newMonth : '0' + newMonth;
	        console.log(type, trueMonth);
	        if (data != '') {
	            var sucCallback = function sucCallback(dd) {
	                //console.log(dd);
	                var data = JSON.parse(dd),
	                    date = data.data;
	                if (date != '') {
	                    for (var i in date) {
	                        /*let day=Funs.dateFormatFull(data[i].date,"day");时间戳处理*/
	                        var day = Number(date[i].date.substring(8, 11));
	                        datelist.push(day);
	                    }
	                }
	                dateObj.tag(datelist);
	            };

	            data.date = year + '-' + trueMonth;
	            het.get(url, data, sucCallback, function (dd) {
	                console.log(dd);
	            });
	        }
	    }

	});

/***/ }
/******/ ]);