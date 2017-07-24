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

	module.exports = __webpack_require__(12);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
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
	'getData', 'postHisData', 'getHisData', 'getChangeData', 'ready', 'getCalendarData', // 获取日历数据
	'selectedDate' // 选择日期
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

	var options = {};

	// 格式化日期为 yyyy-MM-dd的形式
	function ymd(d) {
	    return (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()).replace(/(?=\b\d\b)/g, '0');
	}
	// 格式化日期为 yyyy-MM的形式
	function ym(d) {
	    return (d.getFullYear() + '-' + (d.getMonth() + 1)).replace(/(?=\b\d\b)/g, '0');
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(opt) {
	        options.accessToken = opt.accessToken, options.appId = opt.appId, options.deviceId = opt.deviceId, options.timestamp = opt.timestamp, options.memberId = opt.memberId, options.userType = opt.userType, options.headerUrl = opt.headerUrl;
	        this.trigger(options);
	    },
	    onReady: function onReady(opt) {
	        options.accessToken = opt.accessToken, options.appId = opt.appId, options.deviceId = opt.deviceId, options.timestamp = opt.timestamp, options.memberId = opt.memberId, options.userType = opt.userType, options.headerUrl = opt.headerUrl;
	        this.trigger(options);
	    },
	    onGetData: function onGetData(opt) {
	        var _this = this;
	        //options.accessToken = opt.accessToken,
	        options.appId = opt.appId, options.deviceId = opt.deviceId, options.timestamp = opt.timestamp, options.memberId = opt.memberId, options.userType = opt.userType;
	        het.get('/v1/app/chealth/bodyfat/getBodyFatDataList', {
	            //'options': opt.accessToken,
	            'appId': opt.appId,
	            'timestamp': opt.timestamp,
	            'accessToken': opt.accessToken,
	            'userType': opt.userType,
	            'deviceId': opt.deviceId,
	            'memberId': opt.memberId
	        }, function (data) {
	            var mydata = data;
	            //console.log(data);
	            mydata.headerUrl = options.headerUrl;
	            _this.trigger({ 'data': _this.groupData(mydata) });
	        }, function () {
	            het.toast('数据请求错误');
	        });
	    },
	    onPostDate: function onPostDate(data_id) {
	        var data = options;
	        data.dataId = data_id;
	        //options.dataId = data_id;
	        het.post('/v1/app/chealth/bodyfat/getBodyFatDataList', data, function () {
	            het.toast('post suc');
	        }, function () {
	            het.toast('post fail');
	        });
	    },
	    onGetHisData: function onGetHisData(startDate, endDate) {
	        var _this = this,
	            mydata = options;
	        mydata.startDate = startDate, mydata.endDate = endDate;
	        het.get('/v1/app/chealth/bodyfat/getBodyFatMonthData', mydata, function (data) {
	            _this.trigger({ "data": _this.classifyFn(data) });
	        }, function () {
	            het.toast('数据请求错误');
	        });
	    },
	    onSelectedDate: function onSelectedDate(dates) {
	        dates.slidedCalendarShow = false;
	        this.trigger(dates);
	    },
	    groupData: function groupData(data) {
	        var newData = {};
	        var arrData = [];
	        // 分组
	        data = data.data.list;
	        for (var i in data) {
	            var key = data[i].dataTime.replace(/\s.+$/, '');
	            if (!newData[key]) {
	                newData[key] = [];
	            }
	            newData[key].push(data[i]);
	        }
	        // 排序
	        for (var j in newData) {
	            newData[j].sort(function (a, b) {
	                return a.dataTime > b.dataTime;
	            });
	            arrData.push(newData[j]);
	        }
	        arrData.sort(function (a, b) {
	            return a[0].dataTime < b[0].dataTime;
	        });
	        return arrData;
	    },
	    classifyFn: function classifyFn(data) {
	        data = data.data;
	        var len = data.length,
	            newArr = {},
	            _weight = [],
	            _fatRate = [],
	            _boneWeight = [],
	            _meatRate = [],
	            _dataTime = [];
	        for (var i = 0; i < len; i++) {
	            if (data[i].dataTime[5] == 0) {
	                if (data[i].dataTime[8] == 0) {
	                    _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
	                } else {
	                    _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
	                }
	            } else {
	                if (data[i].dataTime[8] == 0) {
	                    _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
	                } else {
	                    _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
	                }
	            }
	            _weight.push(data[i].weight);
	            _fatRate.push(data[i].fatRate);
	            _boneWeight.push(data[i].boneWeight);
	            _meatRate.push(data[i].meatRate);
	        }
	        return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _boneWeight: _boneWeight, _meatRate: _meatRate };
	    },
	    onGetCalendarData: function onGetCalendarData() {
	        var d1 = new Date();
	        var d2 = new Date();
	        d1.setMonth(d2.getMonth() - 11);
	        var cfg = {
	            appId: options.appId,
	            deviceId: options.deviceId,
	            memberId: options.memberId,
	            userType: options.userType,
	            startMonth: ym(d1),
	            endMonth: ym(d2),
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/bodyfat/getBodyFatDate', cfg, function (data) {
	            var d = [];
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	             {
	             'date': '2016-06-12'
	             },
	             {
	             'date': '2016-04-14'
	             },
	             {
	             'date': '2016-04-16'
	             },
	             {
	             'date': '2016-04-19'
	             }
	             ];*/
	            if (!data.data) return;
	            data.data.map(function (v) {
	                return d.push(v.date);
	            });
	            _this.trigger({ validDates: d });
	        }, function () {});
	    }
	});

	//appId	    是	Integer	应用标识
	//deviceId	是	string	设备id
	//timestamp	是	number	时间戳
	//memberId	是	string	用户编号（切换用户用）
	//userType	是	string	用户身份（1：医生 3：患者）

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(10);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 10 */
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
	        }
	        return res;
	    }
	};
	module.exports = Funs;

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(9);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _BaseComponentClass = __webpack_require__(13);

	var _SlidedCalendar = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016-08-06.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});
	//设备参数获取
	het.ready(function (data) {
	    _Actions.Actions.ready(data);
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'selectDate',
	        value: function selectDate(d) {
	            console.log(d);
	            het.send(d, function () {
	                console.log('send date suc');
	            }, function () {
	                console.log('send date fail');
	            });
	        }
	        //componentDidMount() {
	        //    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	        //    window.addEventListener('resize', function () {
	        //        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	        //    }, false);
	        //validDates={['2016-7-1', '2016-7-3']}  startDate="2016-2-1" endDate="2016-3-2"
	        //}

	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(_SlidedCalendar.SlidedCalendar, { show: 'true', cb: this.selectDate })
	            );
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {}
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);
	// 开始渲染


	het.domReady(function () {
	    het.setTitle('体脂秤');
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016-08-15.
	 */
	'use strict';
	/**
	 * 滑动式日期区间选择器
	 * @prop {boolean}  show       是否显示该组件，缺省为false
	 * @prop {array}    validDates 有数据的日期数组，格式：['2016-1-1', '2016-1-2', ...]
	 * @prop {date}     startDate  开始时间，可选。格式：'2016-1-1'
	 * @prop {date}     endDate    结束时间，可选。格式：'2016-1-1'
	 * @prop {integer}  months     可选月数，缺省为12个月
	 * @prop {function} cb         点确定的回调函数，返回格式：{startDate: 1469980800000, endDate: 1472572800000}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SlidedCalendar = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件

	var SlidedCalendar = exports.SlidedCalendar = function (_BaseComponent) {
	    _inherits(SlidedCalendar, _BaseComponent);

	    function SlidedCalendar(props) {
	        _classCallCheck(this, SlidedCalendar);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SlidedCalendar).call(this, props));

	        var _this = _this2;
	        _this2.top = _this2.props.top ? _this2.props.top : 0;
	        _this2.calendar = _this2.createCalendarData(_this2.props.months || 12);
	        _this2.validDates = (_this2.props.validDates || []).map(function (d) {
	            return _this2.zeroTimestamp(d);
	        });
	        _this2.state = {
	            show: _this.props.show ? _this.props.show : false,
	            startDate: _this.props.startDate ? _this.zeroTimestamp(_this.props.startDate) : Infinity,
	            endDate: _this.props.endDate ? _this.zeroTimestamp(_this.props.endDate) : 0
	        };
	        _this2.touchCounter = 0; // 点击计数器
	        _this2.selectDate = _this2.selectDate.bind(_this2);
	        _this2.submit = _this2.submit.bind(_this2);
	        return _this2;
	    }

	    _createClass(SlidedCalendar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var main = ReactDOM.findDOMNode(this.refs.main);
	            main.scrollTop = main.scrollHeight;
	        }
	        // 生成0点时间戳，用于对比

	    }, {
	        key: 'zeroTimestamp',
	        value: function zeroTimestamp(date) {
	            var time = new Date(date.toString());
	            time.setHours(0);
	            time.setMinutes(0);
	            time.setSeconds(0);
	            return time.getTime();
	        }
	        // 生成日历数据

	    }, {
	        key: 'createCalendarData',
	        value: function createCalendarData(forwardMonth) {
	            forwardMonth = parseInt(forwardMonth);
	            var cData = [];
	            var cursor = new Date();
	            cursor.setMonth(cursor.getMonth() - forwardMonth);
	            for (var i = forwardMonth; i > 0; i--) {
	                cursor.setMonth(cursor.getMonth() + 1);
	                cData.push({
	                    year: cursor.getFullYear(),
	                    month: cursor.getMonth(),
	                    data: monthData(cursor)
	                });
	            }
	            function monthData(date) {
	                var d = new Date(date);
	                var wData = []; // 周数据
	                var mData = []; // 月数据
	                var m = d.getMonth();
	                d.setDate(1);
	                for (var h = 0; h < d.getDay(); h++) {
	                    wData.push(0);
	                }
	                for (var _i = 0; _i < 6; _i++) {
	                    for (var j = _i === 0 ? h : 0; j < 7; j++) {
	                        if (d.getMonth() - m === 0) {
	                            wData.push(d.getDate());
	                        } else {
	                            if (_i >= 4 && j === 0) {
	                                // 排除最后一周全空的情况
	                                break;
	                            }
	                            wData.push(0);
	                        }
	                        d.setDate(d.getDate() + 1);
	                    }
	                    mData.push(wData);
	                    wData = [];
	                }
	                return mData;
	            }
	            return cData;
	        }
	    }, {
	        key: 'selectDate',
	        value: function selectDate(e) {
	            var date = parseInt(e.currentTarget.getAttribute('data-date'));
	            this.touchCounter++;
	            if (this.touchCounter % 2) {
	                this.setState({ startDate: date, endDate: 0 });
	            } else if (this.state.startDate > date) {
	                this.touchCounter--;
	                alert('结束时间不能小于开始时间');
	            } else {
	                this.setState({ endDate: date });
	            }
	        }
	    }, {
	        key: 'submit',
	        value: function submit() {
	            var _this = this;
	            if (typeof this.props.cb === 'function') {
	                this.props.cb({
	                    startDate: _this.state.startDate,
	                    endDate: _this.state.endDate
	                });
	            }
	            this.setState({ show: false });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var today = this.zeroTimestamp(new Date().toString());
	            return React.createElement(
	                'div',
	                { ref: 'main', className: 'slided-calendar', style: { top: this.top + 40, display: this.state.show ? 'block' : 'none' } },
	                React.createElement(
	                    'ul',
	                    { className: 'sc-row head', style: { top: this.top } },
	                    React.createElement(
	                        'li',
	                        null,
	                        '日'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '一'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '二'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '三'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '四'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '五'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '六'
	                    )
	                ),
	                this.calendar.map(function (m, idx1) {
	                    // 遍历月份
	                    return React.createElement(
	                        'section',
	                        { key: idx1 },
	                        React.createElement(
	                            'h2',
	                            null,
	                            m.year,
	                            '年',
	                            m.month + 1,
	                            '月'
	                        ),
	                        m.data.map(function (w, idx2) {
	                            // 遍历周
	                            return React.createElement(
	                                'ul',
	                                { key: idx2, className: 'sc-row' },
	                                w.map(function (d, idx3) {
	                                    // 遍历天
	                                    if (d !== 0) {
	                                        var theDay = _this3.zeroTimestamp(m.year + '-' + (m.month + 1) + '-' + d);
	                                        var txt = theDay === today ? '今' : d;
	                                        var classNames = '';
	                                        // 当天0时时间戳
	                                        // 有效日期样式
	                                        classNames += _this3.validDates.indexOf(theDay) > -1 ? ' sc-vali' : '';
	                                        // 今天样式
	                                        classNames += theDay === today ? ' sc-today' : '';
	                                        // 开始样式
	                                        classNames += theDay === _this3.state.startDate ? ' sc-start' : '';
	                                        // 结束样式
	                                        classNames += theDay === _this3.state.endDate ? ' sc-end' : '';
	                                        // 区间样式
	                                        classNames += theDay > _this3.state.startDate && theDay < _this3.state.endDate ? ' sc-among' : '';
	                                        return React.createElement(
	                                            'li',
	                                            { key: idx3, className: classNames, 'data-date': theDay, onClick: _this3.selectDate },
	                                            React.createElement(
	                                                'i',
	                                                null,
	                                                txt
	                                            )
	                                        );
	                                    } else {
	                                        return React.createElement(
	                                            'li',
	                                            { key: idx3, className: 'sc-e' },
	                                            ' '
	                                        );
	                                    }
	                                })
	                            );
	                        })
	                    );
	                }),
	                React.createElement(
	                    'footer',
	                    { className: 'sc-footer' },
	                    React.createElement(
	                        'a',
	                        { href: 'health://skip_url/datePick/startDate=' + this.state.startDate + 'endDate=' + this.state.endDate, onTouchEnd: this.submit },
	                        '确定'
	                    )
	                )
	            );
	        }
	    }]);

	    return SlidedCalendar;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ }
/******/ ]);