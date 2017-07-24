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

	module.exports = __webpack_require__(11);


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
	var Actions = exports.Actions = Reflux.createActions(['ready', // 接收到ready数据
	'repaint', // 接收到数据，重新渲染
	'getData', // 获取数据
	'getHistoryData', // 获取历史数据
	'getCalendarData', // 获取日历数据
	'selectedDate', // 选择日期
	'submitResult']);

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

	var readyData = {
	    'appId': 0,
	    'deviceId': 'F',
	    'memberId': 0,
	    'userType': 3,
	    'avatar': '../static/img/avatar.jpg'
	};

	var historyData = []; // 历史数据缓存
	var historyPage = 1; // 历史数据页数
	var historyCond = ''; // 保存搜索条件，用于比较

	// 数据分组排序
	function groupData(data, key) {
	    var newData = {};
	    var arrData = [];
	    // 分组
	    for (var i in data) {
	        var k = data[i][key].replace(/\s.+$/, '');
	        if (!newData[k]) {
	            newData[k] = [];
	        }
	        newData[k].push(data[i]);
	    }
	    // 排序
	    for (var j in newData) {
	        /*newData[j].sort(function(a, b){
	            return a[key] > b[key];
	        });*/
	        arrData.push({ key: j, data: newData[j] });
	    }
	    arrData.sort(function (a, b) {
	        return a.data[0][key] < b.data[0][key];
	    });
	    return arrData;
	}

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
	    onReady: function onReady(data) {
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        // readyData.deviceId = data.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.userType = data.userType ? data.userType : readyData.userType;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(readyData);
	    },
	    onRepaint: function onRepaint(data) {
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        // readyData.deviceId = data.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.userType = data.userType ? data.userType : readyData.userType;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(data);
	    },
	    onGetData: function onGetData() {
	        var cfg = {
	            appId: readyData.appId,
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseMeterData', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {
	                    'recordTime': '2016-07-29 12:11:12',
	                    'personalStatusName':'空腹',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高'
	                },
	                {
	                    'recordTime': '2016-07-28 12:12:12',
	                    'personalStatusName':'餐后一小时',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高' 
	                }
	            ];*/
	            _this.trigger({ isInitialization: false });
	            if (!data.data) return;
	            // data.data.sort((a, b)=>a.recordTime<b.recordTime);
	            _this.trigger({ results: data.data });
	        }, function () {
	            _this.trigger({ isInitialization: false });
	        });
	    },
	    onGetHistoryData: function onGetHistoryData(beginDate, endDate, resultIds, personalStatusIds) {
	        var cfg = {
	            appId: readyData.appId,
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            resultIds: resultIds,
	            personalStatusIds: personalStatusIds,
	            beginDate: ymd(beginDate),
	            endDate: ymd(endDate),
	            timestamp: +new Date(),
	            pageIndex: historyPage,
	            pageRows: 20
	        };
	        var _this = this;
	        var cond = cfg.beginDate + cfg.endDate;
	        if (historyCond != cond) {
	            cfg.pageIndex = historyPage = 1; // 重置page
	        }
	        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseDataList', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {
	                    'recordTime': '2016-07-27 12:11:12',
	                    'personalStatusName':'空腹',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高'
	                },
	                {
	                    'recordTime': '2016-07-28 12:11:12',
	                    'personalStatusName':'餐后一小时',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高' 
	                }
	            ];*/
	            if (!data.data) return;
	            if (historyCond == cond) {
	                historyData = historyData.concat(groupData(data.data, 'recordTime'));
	                historyPage++;
	            } else {
	                historyData = groupData(data.data, 'recordTime');
	            }
	            _this.trigger({ results: historyData });
	        }, function () {});
	    },
	    onSelectedDate: function onSelectedDate(dates) {
	        dates.slidedCalendarShow = false;
	        this.trigger(dates);
	    },
	    getCalendarData: function getCalendarData() {
	        var d1 = new Date();
	        var d2 = new Date();
	        d1.setMonth(d2.getMonth() - 11);
	        var cfg = {
	            appId: readyData.appId,
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            startMonth: ym(d1),
	            endMonth: ym(d2),
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseMeterDateByTime', cfg, function (data) {
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

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(8);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ResultTable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var ResultTable = exports.ResultTable = function (_BaseComponent) {
	    _inherits(ResultTable, _BaseComponent);

	    function ResultTable(props) {
	        _classCallCheck(this, ResultTable);

	        return _possibleConstructorReturn(this, (ResultTable.__proto__ || Object.getPrototypeOf(ResultTable)).call(this, props));
	    }

	    _createClass(ResultTable, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'table',
	                { className: 'report-table' },
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'td',
	                            { colSpan: '2', className: 'ta-l' },
	                            this.props.date
	                        ),
	                        React.createElement(
	                            'td',
	                            { colSpan: '2', className: 'ta-r' },
	                            React.createElement(
	                                'a',
	                                { href: 'health://skip_url/reference.html', style: { visibility: this.props.showRefer ? 'visible' : 'hidden' } },
	                                React.createElement('i', { className: 'h' }),
	                                ' \u8840\u7CD6\u6807\u51C6\u53C2\u8003'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    this.props.results.map(function (it, idx) {
	                        var time = _fun.Funs.dateFormat(it.recordTime, 'hh:mm', true);
	                        var hl = (it.resultName || '').indexOf('高') > -1 ? 'high' : (it.resultName || '').indexOf('低') > -1 ? 'low' : '';
	                        return React.createElement(
	                            'tr',
	                            { key: idx },
	                            React.createElement(
	                                'td',
	                                { className: 'title' },
	                                it.personalStatusName
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'mmol ta-c ' + hl },
	                                it.bloodGlucoseValue,
	                                'mmol/L'
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'conc' },
	                                it.resultName
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'time ta-r' },
	                                time
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return ResultTable;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _ResultTable = __webpack_require__(9);

	var _Help = __webpack_require__(12);

	var _Reference = __webpack_require__(13);

	var _LazyImg = __webpack_require__(14);

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
	        updateFlagMap: {}
	    });
	});

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
	    _Actions.Actions.getData();
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	    _Actions.Actions.getData();
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            results: [],
	            isInitialization: true
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        het.setTitle('血糖仪');
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            if (this.state.isInitialization) return React.createElement('div', null);
	            var latestData = this.state.results[0] || { resultName: '', recordTime: '' };
	            var currentDate = _fun.Funs.dateFormat(latestData.recordTime, 'M月d日', true);
	            var resClass = (latestData.resultName || '').indexOf('高') > -1 ? 'bg-high' : (latestData.resultName || '').indexOf('低') > -1 ? 'bg-low' : 'bg-normal';
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'header',
	                    { style: { 'paddingTop': this.state.headerTop } },
	                    this.state.results.length ? React.createElement(
	                        'figure',
	                        null,
	                        React.createElement(
	                            'dl',
	                            { className: 'user-info' },
	                            React.createElement(
	                                'dd',
	                                null,
	                                React.createElement(
	                                    'a',
	                                    { href: 'health://switch_user', className: 'avatar' },
	                                    React.createElement(_LazyImg.LazyImg, { src: this.state.avatar, 'default': '../static/img/avatar.jpg' })
	                                )
	                            ),
	                            React.createElement(
	                                'dt',
	                                null,
	                                this.state.nickname
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u8840\u7CD6\u503C'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement(
	                                'span',
	                                { className: 'num' },
	                                latestData.bloodGlucoseValue
	                            ),
	                            'mmol/L ',
	                            React.createElement(
	                                'i',
	                                { className: resClass },
	                                latestData.resultName
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'time' },
	                            _fun.Funs.dateFormat(latestData.recordTime, 'yyyy/M/d hh:mm', true),
	                            '\u83B7\u53D6'
	                        )
	                    ) : React.createElement(
	                        'figure',
	                        null,
	                        React.createElement(
	                            'dl',
	                            { className: 'user-info' },
	                            React.createElement(
	                                'dd',
	                                null,
	                                React.createElement(
	                                    'a',
	                                    { href: 'health://switch_user', className: 'avatar' },
	                                    React.createElement(_LazyImg.LazyImg, { src: this.state.avatar, 'default': '../static/img/avatar.jpg' })
	                                )
	                            ),
	                            React.createElement(
	                                'dt',
	                                null,
	                                this.state.nickname
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\xA0'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 's' },
	                            '\u60A8\u8FD8\u6CA1\u6709\u7528\u8FC7\u8840\u7CD6\u4EEA'
	                        )
	                    )
	                ),
	                this.state.results.length ? React.createElement(
	                    'section',
	                    null,
	                    React.createElement(
	                        'div',
	                        { className: 'hd-record' },
	                        currentDate,
	                        React.createElement(
	                            'a',
	                            { href: 'health://skip_url/reference.html' },
	                            React.createElement('i', { className: 'h' }),
	                            ' \u8840\u7CD6\u6807\u51C6\u53C2\u8003'
	                        )
	                    ),
	                    React.createElement(_ResultTable.ResultTable, { date: currentDate, results: this.state.results, showRefer: true })
	                ) : React.createElement(_Help.Help, null),
	                this.state.results.length ? React.createElement(
	                    'footer',
	                    { className: 'ft-buttons' },
	                    React.createElement(
	                        'a',
	                        { href: 'health://skip_url/guide.html' },
	                        '\u540C\u6B65\u6570\u636E'
	                    ),
	                    React.createElement('i', { className: 'vline' }),
	                    React.createElement(
	                        'a',
	                        { href: 'health://skip_url/history.html' },
	                        '\u5386\u53F2\u6570\u636E'
	                    )
	                ) : React.createElement(
	                    'footer',
	                    { className: 'ft-buttons' },
	                    React.createElement(
	                        'a',
	                        { href: 'health://skip_url/guide.html' },
	                        '\u540C\u6B65\u6570\u636E'
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/reference', component: _Reference.Reference })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Help = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var Help = exports.Help = function (_BaseComponent) {
	    _inherits(Help, _BaseComponent);

	    function Help(props) {
	        _classCallCheck(this, Help);

	        return _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).call(this, props));
	    }

	    _createClass(Help, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'section',
	                { className: 'help' },
	                React.createElement(
	                    'h1',
	                    null,
	                    '\u4F7F\u7528\u5E2E\u52A9'
	                ),
	                React.createElement(
	                    'ul',
	                    null,
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'h2',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                '1'
	                            ),
	                            '\u6D88\u6BD2'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7528\u6E29\u6C34\u6D17\u624B\u5E76\u64E6\u5E72\uFF0C\u7528\u9152\u7CBE\u68C9\u7403\u6D88\u6BD2\u8981\u53D6\u8840\u7684\u90E8\u4F4D\u3002'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'h2',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                '2'
	                            ),
	                            '\u51C6\u5907\u91C7\u8840\u9488'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6253\u5F00\u91C7\u8840\u7B14\uFF0C\u5C06\u91C7\u8840\u7B14\u63D2\u5165\u7B14\u82AF\u6746\u4E2D\uFF0C\u62E7\u65AD\u91C7\u8840\u9488\u62A4\u5E3D\uFF0C\u7136\u540E\u628A\u7B14\u5E3D\u76D6\u597D\u3002'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'h2',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                '3'
	                            ),
	                            '\u8C03\u6574\u91C7\u8840\u9488'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6839\u636E\u624B\u6307\u76AE\u80A4\u60C5\u51B5\u8C03\u6574\u6570\u5B57\u73AF\u3002\u6570\u5B57\u8D8A\u5927\uFF0C\u624E\u7684\u8D8A\u6DF1\u3002\u8C03\u6574\u5B8C\u540E\u5C06\u62C9\u5957\u5F80\u540E\u62C9\uFF0C\u62C9\u5957\u81EA\u52A8\u5F39\u56DE\u3002'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'h2',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                '4'
	                            ),
	                            '\u6253\u5F00\u8840\u7CD6\u4EEA'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6253\u5F00\u8840\u7CD6\u4EEA\uFF0C\u5C06\u8BD5\u6761\u63D2\u5165\u4EEA\u5668\u3002'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'h2',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                '5'
	                            ),
	                            '\u91C7\u8840'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u4F7F\u7528\u91C7\u8840\u7B14\u5728\u6D88\u6BD2\u90E8\u4F4D\u91C7\u8840\uFF0C\u6CE8\u610F\uFF1A\u91C7\u8840\u524D\u53EF\u6469\u64E6\u624B\u6307\uFF0C\u589E\u52A0\u8840\u6DB2\u5FAA\u73AF\uFF1B\u4E0D\u8981\u53CD\u590D\u6324\u538B\uFF0C\u4EE5\u514D\u7EC4\u7EC7\u6DB2\u6DF7\u5165\u8840\u6DB2\uFF0C\u5F71\u54CD\u6D4B\u91CF\u7ED3\u679C\u3002'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'h2',
	                            null,
	                            React.createElement(
	                                'i',
	                                null,
	                                '6'
	                            ),
	                            '\u6D4B\u91CF'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6324\u51FA\u6EF4\u72B6\u8840\u6DB2\uFF0C\u4E0E\u8BD5\u6761\u63A5\u89E6\u3002\u8BBE\u5907\u68C0\u6D4B\u5B8C\u6210\uFF0C\u663E\u793A\u6D4B\u91CF\u7ED3\u679C\u3002'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return Help;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Reference = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Reference = exports.Reference = function (_BaseComponent) {
	    _inherits(Reference, _BaseComponent);

	    function Reference(props) {
	        _classCallCheck(this, Reference);

	        var _this = _possibleConstructorReturn(this, (Reference.__proto__ || Object.getPrototypeOf(Reference)).call(this, props));

	        het.setTitle('血糖仪标准参考');
	        return _this;
	    }

	    _createClass(Reference, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'section',
	                { className: 'reference' },
	                React.createElement(
	                    'p',
	                    null,
	                    '\u6B64\u6807\u51C6\u4EC5\u4F9B\u53C2\u8003\uFF0C\u5177\u4F53\u8BF7\u9075\u533B\u5631'
	                ),
	                React.createElement(
	                    'table',
	                    null,
	                    React.createElement(
	                        'thead',
	                        null,
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'th',
	                                null,
	                                '\u4E2A\u4EBA\u72B6\u6001'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '\u504F\u4F4E'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '\u6B63\u5E38'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '\u504F\u9AD8'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'tbody',
	                        null,
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u7A7A\u8179'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                'x\uFF1C3.9'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '3.9\u2264x\u22646.1'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '6.1\uFF1Cx'
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u9910\u540E1\u5C0F\u65F6'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                'x\uFF1C6.7'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '6.7\u2264x\u22649.4'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '9.4\uFF1Cx'
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u9910\u540E2\u5C0F\u65F6'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                'x\uFF1C3.9'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '3.9\u2264x\u22647.8'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '7.8\uFF1Cx'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'ta-r' },
	                    '\u5355\u4F4D\uFF1Ammol/l'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '\xA0'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '\xA0'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '\u5907\u6CE8'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '\u7A7A\u8179\uFF1A\u53D7\u68C0\u8005\u81F3\u5C11\u7A7A\u81798\u5C0F\u65F6\u4EE5\u4E0A'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '\u9910\u540E1\u5C0F\u65F6\uFF1A\u4ECE\u8FDB\u98DF\u7B2C\u4E00\u53E3\u5F00\u59CB\u8BA1\u7B97\uFF0C1\u5C0F\u65F6\u540E'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '\u9910\u540E2\u5C0F\u65F6\uFF1A\u4ECE\u8FDB\u98DF\u7B2C\u4E00\u53E3\u5F00\u59CB\u8BA1\u7B97\uFF0C2\u5C0F\u65F6\u540E'
	                )
	            );
	        }
	    }]);

	    return Reference;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 图片懒加载组件
	 * @props src     {string} 图片地址
	 * @props default {string} 缺省图片地址，如不提供，将无懒加载效果
	 */
	var LazyImg = exports.LazyImg = function (_React$Component) {
	    _inherits(LazyImg, _React$Component);

	    function LazyImg(props) {
	        _classCallCheck(this, LazyImg);

	        return _possibleConstructorReturn(this, (LazyImg.__proto__ || Object.getPrototypeOf(LazyImg)).call(this, props));
	    }

	    _createClass(LazyImg, [{
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            var _this2 = this;

	            var img = new Image();
	            img.onload = function () {
	                ReactDOM.findDOMNode(_this2.refs.img).src = _this2.props.src;
	            };
	            img.src = this.props.src;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var imgSrc = this.props.default ? this.props.default : this.props.src;
	            return React.createElement("img", { ref: "img", src: imgSrc });
	        }
	    }]);

	    return LazyImg;
	}(React.Component);

	;

/***/ }
/******/ ]);