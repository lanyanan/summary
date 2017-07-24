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
	'getTotals', // 获取今日统计数据
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

	var _fun = __webpack_require__(6);

	var readyData = {
	    'appId': 0,
	    'deviceId': 'F',
	    'memberId': 0,
	    'userType': 3,
	    'avatar': '../static/img/avatar.jpg'
	};

	var detailData = []; // 明细数据缓存（用于分页）

	/**
	 * 数据分组排序
	 * @param    {json}     data     目标数据
	 * @param    {string}   groupKey 分组依据字段
	 * @param    {string}   orderKey 可选，排序依据字段。若省略，将以groupKey做排序依据
	 * @return   {json}              分组排序后的数据
	 */
	function groupData(data, groupKey, orderKey) {
	    var newData = {};
	    var arrData = [];
	    orderKey = orderKey ? orderKey : groupKey;
	    // 分组
	    for (var i in data) {
	        var k = data[i][groupKey].replace(/\s.+$/, '');
	        if (!newData[k]) {
	            newData[k] = [];
	        }
	        newData[k].push(data[i]);
	    }
	    // 排序
	    for (var j in newData) {
	        newData[j].sort(function (a, b) {
	            return a[orderKey] < b[orderKey];
	        });
	        arrData.push({ key: j, data: newData[j] });
	    }
	    arrData.sort(function (a, b) {
	        return a.key < b.key;
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
	        readyData.deviceId = data.deviceId ? data.deviceId : readyData.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(readyData);
	    },
	    onRepaint: function onRepaint(data) {
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        readyData.deviceId = data.deviceId ? data.deviceId : readyData.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(data);
	    },
	    onGetData: function onGetData(pageIndex) {
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            // userType: readyData.userType,
	            timestamp: +new Date(),
	            pageIndex: pageIndex || 0,
	            pageRows: 20
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDataList', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = {};
	            data.data.list = [
	                {            
	                    'recordTime': '2016-06-18 10:21:14', // 测量时间
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '46.4'        // 摄入总量(g)    
	                },
	                {            
	                    'recordTime': '2016-06-08 10:23:14', // 测量时间
	                    'foodClassId':'3',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '56.4'        // 摄入总量(g)       
	                },
	                {            
	                    'recordTime': '2016-06-08 10:20:14', // 测量时间
	                    'foodClassId':'4',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '66.4'        // 摄入总量(g)          
	                }     
	            ];*/
	            if (!data.data) return;
	            data = groupData(data.data.list, 'recordTime');
	            detailData = cfg.pageIndex === 0 ? data : detailData.concat(data);
	            _this.trigger({ results: detailData });
	        }, function () {});
	    },
	    onGetTotals: function onGetTotals() {
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            // userType: readyData.userType,
	            timestamp: +new Date(),
	            memberId: readyData.memberId
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDataToDay', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {                      
	                    'foodClassId':'1',          // 食材类别ID
	                    'foodClassName':'谷类',     // 食材类别名称 
	                    'foodWeight': '30'        // 食材重量（g）
	                },
	                {                      
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',      // 食材类别名称    
	                    'foodWeight': '33'         // 食材重量（g）       
	                },
	                {                      
	                    'foodClassId':'3',          // 食材类别ID
	                    'foodClassName':'奶类',      // 食材类别名称 
	                    'foodWeight': '31'        // 食材重量（g）        
	                }
	            ];*/
	            if (!data.data) return;
	            _this.trigger({ totals: data.data });
	        }, function () {});
	    },
	    onGetHistoryData: function onGetHistoryData(beginDate, endDate, foodClassIds) {
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            // userType: readyData.userType,
	            timestamp: +new Date(),
	            memberId: readyData.memberId,
	            foodClassIds: foodClassIds,
	            beginDate: ymd(beginDate),
	            endDate: ymd(endDate)
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceMonthData', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {            
	                    'recordTime': '2016-06-15 10:20:14', // 测量时间
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '46.4'        // 摄入总量(g)    
	                },
	                 {            
	                    'recordTime': '2016-06-18 10:20:14', // 测量时间
	                    'foodClassId':'2',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '56.4'        // 摄入总量(g)       
	                },
	                {            
	                    'recordTime': '2016-06-09 10:20:14', // 测量时间
	                    'foodClassId':'3',          // 食材类别ID
	                    'foodClassName':'鸡蛋',     // 食材类别名称
	                    'foodWeight': '66.4'        // 摄入总量(g)          
	                }
	            ];*/
	            data = groupData(data.data, 'foodClassId', 'recordTime');
	            _this.trigger({ results: data });
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
	            deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            startMonth: ym(d1),
	            endMonth: ym(d2),
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/nutrientBalance/getNutrientBalanceDate', cfg, function (data) {
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
	    },
	    onSubmitResult: function onSubmitResult(weight, foodName, foodClassId) {
	        var now = new Date();
	        var cfg = {
	            appId: readyData.appId,
	            deviceId: readyData.deviceId,
	            // memberId: readyData.memberId,
	            timestamp: +now
	        };
	        var data = {
	            'userType': readyData.userType, //用户身份（1：医生  3：患者）
	            'memberId': readyData.memberId, //用户编号（切换用户用）
	            'foodClassId': foodClassId, // 食材类别ID
	            'foodName': foodName, // 食材名称
	            'foodWeight': weight, // 食材重量（g）
	            'recordTime': _fun.Funs.dateFormat(now, 'yyyy-MM-dd hh:mm:ss'), //测量时间
	            'timeZone': -now.getTimezoneOffset() // 时区 (10*60 统一传分钟)
	        };
	        cfg.data = JSON.stringify(data);
	        het.post('/v1/device/data/raw/upload', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            location.href = 'health://skip_url/index.html';
	        }, function () {});
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
	     * @param    {string}   format 格式，缺省为：yy-MM-dd hh:mm:ss
	     * @param    {Boolean}  isUTC  是否UTC时间，如传入为UTC时间，将自动转为本地时间
	     * @return   {string}          按format格式输出日期
	     */
	    dateFormat: function dateFormat(date, format, isUTC) {
	        var timezoneOffset = 0;
	        date = new Date(date);
	        format = format || 'yy-MM-dd hh:mm:ss';
	        if (isUTC) {
	            // 处理utc时间
	            timezoneOffset = new Date().getTimezoneOffset();
	            date.setMinutes(date.getMinutes() - timezoneOffset);
	        }
	        var map = {
	            'M': date.getMonth() + 1, //月份
	            'd': date.getDate(), //日
	            'h': date.getHours(), //小时
	            'm': date.getMinutes(), //分
	            's': date.getSeconds(), //秒
	            'q': Math.floor((date.getMonth() + 3) / 3), //季度
	            'S': date.getMilliseconds() //毫秒
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
	                return (date.getFullYear() + '').substr(4 - all.length);
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

	var _ResultTable = __webpack_require__(9);

	var _SlidedCalendar = __webpack_require__(11);

	var _FoodClass = __webpack_require__(10);

	var _MyChart = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import {SlidedCalendar} from './SlidedCalendar.es6';


	var foodClass = new _FoodClass.FoodClass();

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	var endDate = new Date();
	var startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1); // 上月今天
	var foodClassIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

	// 日期选择器回调函数
	window.datepickerCB = function (date) {
	    endDate = date.endDate;
	    startDate = date.startDate;
	};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
	    _Actions.Actions.getCalendarData();
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	    _Actions.Actions.getCalendarData();
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            headerTop: isAndroid ? 73 : 64,
	            slidedCalendarShow: false,
	            foodClassIds: foodClassIds,
	            startDate: startDate,
	            endDate: endDate,
	            validDates: [],
	            results: []
	        };
	        _this2.myScroll; // 定义iscroll容器
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            setTimeout(function () {
	                _Actions.Actions.getHistoryData(startDate, endDate, _this.state.foodClassIds.join(','));
	            }, 1000);
	            document.body.scrollTop = 0; // 修复从日期选择器返回时滚动高度不对的BUG
	        }
	    }, {
	        key: 'clickFoodClass',
	        value: function clickFoodClass(e) {
	            var val = parseInt(e.currentTarget.getAttribute('data-id'));
	            var index = this.state.foodClassIds.indexOf(val);
	            e.preventDefault();
	            if (index > -1) {
	                foodClassIds.splice(index, 1);
	            } else {
	                foodClassIds.push(val);
	            }
	            this.setState({
	                foodClassIds: foodClassIds
	            });
	            _Actions.Actions.getHistoryData(startDate, endDate, this.state.foodClassIds.join(','));
	        }
	        // selectedDate(d) {
	        //     Actions.selectedDate(d);
	        //     Actions.getHistoryData(d.startDate, d.endDate, this.state.foodClassIds.join(','));
	        // }
	        // 格式化日期为 yyyy.m.d 的格式

	    }, {
	        key: 'ymd',
	        value: function ymd(d) {
	            return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var selDateText = this.ymd(this.state.startDate) + '~' + this.ymd(this.state.endDate);
	            var FC = foodClass.getAll();
	            var startDate = _fun.Funs.dateFormat(this.state.startDate, 'yyyy-MM-dd', true);
	            var endDate = _fun.Funs.dateFormat(this.state.endDate, 'yyyy-MM-dd', true);
	            var datepickerUrl = '#/datepicker/' + startDate + '/' + endDate + '/datepickerCB/' + this.state.validDates.join(',');
	            return React.createElement(
	                'div',
	                { className: 'viewing-area flex-column' },
	                React.createElement(
	                    'section',
	                    { className: 'condition flex-cell' },
	                    React.createElement(
	                        'header',
	                        { style: { paddingTop: this.state.headerTop } },
	                        React.createElement(
	                            'a',
	                            { href: datepickerUrl, className: 'date' },
	                            selDateText
	                        )
	                    ),
	                    React.createElement(
	                        'nav',
	                        { className: 'flex' },
	                        FC.map(function (it, i) {
	                            if (i < 6) {
	                                var className = 'flex-cell ';
	                                className += _this3.state.foodClassIds.indexOf(parseInt(it.foodClassId)) > -1 ? 'active' : '';
	                                return React.createElement(
	                                    'a',
	                                    { key: i, 'data-id': it.foodClassId, onClick: _this3.clickFoodClass.bind(_this3), className: className },
	                                    it.foodClassName
	                                );
	                            }
	                        })
	                    ),
	                    React.createElement(
	                        'nav',
	                        { className: 'flex' },
	                        FC.map(function (it, i) {
	                            if (i >= 6) return React.createElement(
	                                'a',
	                                { key: i, 'data-id': it.foodClassId,
	                                    onClick: _this3.clickFoodClass.bind(_this3),
	                                    className: 'flex-cell' + (_this3.state.foodClassIds.indexOf(parseInt(it.foodClassId)) > -1 ? ' active' : '') },
	                                it.foodClassName
	                            );
	                        })
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { id: 'history-wrap' },
	                    this.state.results.map(function (it, idx) {
	                        return React.createElement(
	                            'div',
	                            { className: 'chart-wrap', key: idx },
	                            React.createElement(
	                                'h2',
	                                null,
	                                foodClass.getClassName(it.key),
	                                '(g)'
	                            ),
	                            React.createElement(_MyChart.MyChart, { data: it.data })
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('历史数据');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/datepicker/:startDate/:endDate/:cbName', component: _SlidedCalendar.SlidedCalendar }),
	        React.createElement(Route, { path: '/datepicker/:startDate/:endDate/:cbName/:validDates', component: _SlidedCalendar.SlidedCalendar })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ResultTable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _FoodClass = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var foodClass = new _FoodClass.FoodClass();

	// 创建React组件

	var ResultTable = exports.ResultTable = function (_BaseComponent) {
	    _inherits(ResultTable, _BaseComponent);

	    function ResultTable(props) {
	        _classCallCheck(this, ResultTable);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultTable).call(this, props));
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
	                            { colSpan: '3', className: 'ta-l' },
	                            this.props.date
	                        ),
	                        React.createElement(
	                            'td',
	                            { colSpan: '2', className: 'ta-r' },
	                            React.createElement(
	                                'a',
	                                { href: 'health://skip_url/reference.html', style: { visibility: this.props.showRefer ? 'visible' : 'hidden' } },
	                                React.createElement('i', { className: 'h' }),
	                                ' 血糖标准参考'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    this.props.results.map(function (it, idx) {
	                        var time = it.recordTime.replace(/^.+\s|\:\d+$/g, ''); // 只保留时分
	                        var hl = (it.resultName || '').indexOf('高') > -1 ? 'high' : (it.resultName || '').indexOf('低') > -1 ? 'low' : '';
	                        return React.createElement(
	                            'tr',
	                            { key: idx },
	                            React.createElement(
	                                'td',
	                                { className: 'img' },
	                                React.createElement('img', { src: foodClass.getClassIcon(it.foodClassId) })
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'ta-l' },
	                                foodClass.getClassName(it.foodClassId)
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'ta-c' },
	                                it.foodClassName
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'ta-c' },
	                                it.foodWeight,
	                                'g'
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
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// 食物分类处理类

	var FoodClass = exports.FoodClass = function () {
	    function FoodClass() {
	        _classCallCheck(this, FoodClass);

	        this.items = [{
	            'foodClassId': '1',
	            'foodClassName': '谷类',
	            'foodClassIconUrl': '../static/img/foodClass/1.png'
	        }, {
	            'foodClassId': '2',
	            'foodClassName': '蛋类',
	            'foodClassIconUrl': '../static/img/foodClass/2.png'
	        }, {
	            'foodClassId': '3',
	            'foodClassName': '奶类',
	            'foodClassIconUrl': '../static/img/foodClass/3.png'
	        }, {
	            'foodClassId': '4',
	            'foodClassName': '豆类',
	            'foodClassIconUrl': '../static/img/foodClass/4.png'
	        }, {
	            'foodClassId': '5',
	            'foodClassName': '肉类',
	            'foodClassIconUrl': '../static/img/foodClass/5.png'
	        }, {
	            'foodClassId': '6',
	            'foodClassName': '蔬菜类',
	            'foodClassIconUrl': '../static/img/foodClass/6.png'
	        }, {
	            'foodClassId': '7',
	            'foodClassName': '瓜果类',
	            'foodClassIconUrl': '../static/img/foodClass/7.png'
	        }, {
	            'foodClassId': '8',
	            'foodClassName': '根茎类',
	            'foodClassIconUrl': '../static/img/foodClass/8.png'
	        }, {
	            'foodClassId': '9',
	            'foodClassName': '鱼虾类',
	            'foodClassIconUrl': '../static/img/foodClass/9.png'
	        }, {
	            'foodClassId': '10',
	            'foodClassName': '贝类',
	            'foodClassIconUrl': '../static/img/foodClass/10.png'
	        }, {
	            'foodClassId': '11',
	            'foodClassName': '干果类',
	            'foodClassIconUrl': '../static/img/foodClass/11.png'
	        }, {
	            'foodClassId': '12',
	            'foodClassName': '调味品',
	            'foodClassIconUrl': '../static/img/foodClass/12.png'
	        }];
	    }

	    _createClass(FoodClass, [{
	        key: 'getAll',
	        value: function getAll() {
	            return this.items;
	        }
	    }, {
	        key: 'getClassName',
	        value: function getClassName(id) {
	            for (var i in this.items) {
	                if (this.items[i].foodClassId == id) {
	                    return this.items[i].foodClassName;
	                }
	            }
	        }
	    }, {
	        key: 'getClassIcon',
	        value: function getClassIcon(id) {
	            for (var i in this.items) {
	                if (this.items[i].foodClassId == id) {
	                    return this.items[i].foodClassIconUrl;
	                }
	            }
	        }
	    }]);

	    return FoodClass;
	}();

	;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 滑动式日期区间选择器
	 * !! 因为需要跳转页面，所以需要配置路由来调用。配置方法参见eg
	 * @route {string}  :cbName     点确定时的回调函数名。该回调须登记于window下，否则将无法调用。
	 *                              该回调返回date对象，格式：{startDate: Date1, endDate: Date2}
	 * @route {date}    :startDate  开始时间，可选。格式：'2016-1-1'
	 * @route {date}    :endDate    结束时间，可选。格式：'2016-1-1'
	 * @route {integer} :months     可选月数，缺省为12个月
	 * @route {string}  :validDates 有数据的日期数组，格式：'2016-1-1, 2016-1-2, ...'
	 * @eg.   <Route path="/datepicker/:startDate/:endDate/:cbName/:validDates" component={SlidedCalendar} />
	 */

	// 创建React组件

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SlidedCalendar = exports.SlidedCalendar = function (_React$Component) {
	    _inherits(SlidedCalendar, _React$Component);

	    function SlidedCalendar(props) {
	        _classCallCheck(this, SlidedCalendar);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SlidedCalendar).call(this, props));

	        var _this = _this2;
	        _this2.top = _this2.props.top ? _this2.props.top : 0;
	        _this2.calendar = _this2.createCalendarData(_this2.props.months || 12);
	        _this2.state = {
	            validDates: (props.params.validDates || '').split(',').map(function (d) {
	                return _this2.zeroTimestamp(d);
	            }),
	            startDate: props.params.startDate ? _this.zeroTimestamp(props.params.startDate) : Infinity,
	            endDate: props.params.endDate ? _this.zeroTimestamp(props.params.endDate) : 0
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
	            document.body.scrollTop = main.scrollHeight;
	        }
	        // 生成0点时间戳，用于对比

	    }, {
	        key: 'zeroTimestamp',
	        value: function zeroTimestamp(date) {
	            var time = new Date(date.toString().replace(/(?=\b\d\b)/g, '0'));
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
	                this.setState({ startDate: date, endDate: 0 });
	                // alert('结束时间不能小于开始时间');
	            } else {
	                    this.setState({ endDate: date });
	                }
	        }
	    }, {
	        key: 'submit',
	        value: function submit(e) {
	            e.preventDefault();
	            var _this = this;
	            var cb = window[this.props.params.cbName];
	            if (typeof cb === 'function') {
	                cb({
	                    startDate: new Date(_this.state.startDate),
	                    endDate: new Date(_this.state.endDate)
	                });
	            }
	            setTimeout(function () {
	                return history.back();
	            }, 100);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var today = this.zeroTimestamp(new Date().toString());
	            return React.createElement(
	                'div',
	                { ref: 'main', className: 'slided-calendar', style: { top: this.top } },
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
	                                        classNames += _this3.state.validDates.indexOf(theDay) > -1 ? ' sc-vali' : '';
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
	                        { href: '#', onTouchEnd: this.submit },
	                        '确定'
	                    )
	                )
	            );
	        }
	    }]);

	    return SlidedCalendar;
	}(React.Component);

	;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MyChart = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MyChart = exports.MyChart = function (_BaseComponent) {
	    _inherits(MyChart, _BaseComponent);

	    function MyChart(props) {
	        _classCallCheck(this, MyChart);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MyChart).call(this, props));

	        props.data.reverse();
	        _this.option = {
	            tooltip: {},
	            textStyle: {
	                color: '#919191'
	            },
	            xAxis: {
	                data: _this.getXAxis(props),
	                axisLine: {
	                    lineStyle: {
	                        color: '#cccccc'
	                    }
	                }
	            },
	            yAxis: {
	                axisLine: {
	                    lineStyle: {
	                        color: '#cccccc'
	                    }
	                }
	            },
	            series: [{
	                type: 'line',
	                itemStyle: {
	                    normal: {
	                        color: '#31c27c'
	                    }
	                },
	                areaStyle: {
	                    normal: {
	                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                            offset: 0,
	                            color: '#c0edd7'
	                        }, {
	                            offset: 1,
	                            color: '#ffffff'
	                        }])
	                    }
	                },
	                data: _this.getSeriesData(props)
	            }]
	        };
	        return _this;
	    }

	    _createClass(MyChart, [{
	        key: 'getXAxis',
	        value: function getXAxis(props) {
	            var axis = [];
	            props.data.map(function (it) {
	                axis.push(_fun.Funs.dateFormat(it.recordTime, 'M.d'));
	            });
	            return axis;
	        }
	    }, {
	        key: 'getSeriesData',
	        value: function getSeriesData(props) {
	            var data = [];
	            props.data.map(function (it) {
	                data.push(it.foodWeight);
	            });
	            return data;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var chartDOM = ReactDOM.findDOMNode(this.refs.chart);
	            this.chart = echarts.init(chartDOM);
	            this.chart.setOption(this.option);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            props.data.reverse();
	            this.option.xAxis.data = this.getXAxis(props);
	            this.option.series.data = this.getSeriesData(props);
	            this.chart.setOption(this.option);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', { ref: 'chart', className: 'chart' });
	        }
	    }]);

	    return MyChart;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ }
/******/ ]);