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

	module.exports = __webpack_require__(13);


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
/* 8 */,
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
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _ResultTable = __webpack_require__(9);

	var _Help = __webpack_require__(14);

	var _Reference = __webpack_require__(15);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
	    _Actions.Actions.getTotals();
	    _Actions.Actions.getData();
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	    _Actions.Actions.getTotals();
	    _Actions.Actions.getData();
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            results: []
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        het.setTitle('营养秤');
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'header',
	                    { style: { 'paddingTop': this.state.headerTop } },
	                    this.state.results.length ? this.state.totals ? React.createElement(
	                        'figure',
	                        null,
	                        React.createElement(
	                            'a',
	                            { href: 'health://switch_user', className: 'avatar' },
	                            React.createElement('img', { src: this.state.avatar })
	                        ),
	                        React.createElement(
	                            'h2',
	                            null,
	                            '今日摄入食物统计'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex' },
	                            React.createElement(
	                                'dl',
	                                { className: 'flex-cell' },
	                                React.createElement(
	                                    'dt',
	                                    null,
	                                    (this.state.totals[0] || {}).foodClassName
	                                ),
	                                React.createElement(
	                                    'dd',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        { className: 'num' },
	                                        (this.state.totals[0] || {}).foodWeight
	                                    ),
	                                    'g'
	                                )
	                            ),
	                            React.createElement('b', { className: 'vline2' }),
	                            React.createElement(
	                                'dl',
	                                { className: 'flex-cell' },
	                                React.createElement(
	                                    'dt',
	                                    null,
	                                    (this.state.totals[1] || {}).foodClassName
	                                ),
	                                React.createElement(
	                                    'dd',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        { className: 'num' },
	                                        (this.state.totals[1] || {}).foodWeight
	                                    ),
	                                    'g'
	                                )
	                            ),
	                            React.createElement('b', { className: 'vline2' }),
	                            React.createElement(
	                                'dl',
	                                { className: 'flex-cell' },
	                                React.createElement(
	                                    'dt',
	                                    null,
	                                    (this.state.totals[2] || {}).foodClassName
	                                ),
	                                React.createElement(
	                                    'dd',
	                                    null,
	                                    React.createElement(
	                                        'span',
	                                        { className: 'num' },
	                                        (this.state.totals[2] || {}).foodWeight
	                                    ),
	                                    'g'
	                                )
	                            )
	                        )
	                    ) : React.createElement(
	                        'figure',
	                        null,
	                        React.createElement(
	                            'a',
	                            { href: 'health://switch_user', className: 'avatar' },
	                            React.createElement('img', { src: this.state.avatar })
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            ' '
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 's' },
	                            '今日还没有摄入食物统计'
	                        )
	                    ) : React.createElement(
	                        'figure',
	                        null,
	                        React.createElement(
	                            'a',
	                            { href: 'health://switch_user', className: 'avatar' },
	                            React.createElement('img', { src: this.state.avatar })
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            ' '
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 's' },
	                            '您还没有用过营养秤哦~'
	                        )
	                    )
	                ),
	                this.state.results.length ? this.state.results.map(function (it, idx) {
	                    return React.createElement(_ResultTable.ResultTable, { key: idx, date: _fun.Funs.dateFormat(it.key, 'M月d日'), results: it.data });
	                }) : React.createElement(_Help.Help, null),
	                this.state.results.length ? React.createElement(
	                    'footer',
	                    { className: 'ft-buttons' },
	                    React.createElement(
	                        'a',
	                        { href: 'health://skip_url/guide.html' },
	                        '称重'
	                    ),
	                    React.createElement('i', { className: 'vline' }),
	                    React.createElement(
	                        'a',
	                        { href: 'health://skip_url/history.html' },
	                        '历史数据'
	                    )
	                ) : React.createElement(
	                    'footer',
	                    { className: 'ft-buttons' },
	                    React.createElement(
	                        'a',
	                        { href: 'health://skip_url/guide.html' },
	                        '称重'
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
/* 14 */
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

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Help).call(this, props));
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
	                    '暖心小贴士，快速get用秤技巧'
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
	                            '打开手机蓝牙'
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
	                            '把称放在平坦且坚硬的地面上，否则会出现较大误差'
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
	                            '触摸ON/OFF键，显示屏显示字符3秒后自动清零，进入称重等待状态'
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
	                            '触摸OFF键，6秒后关机；无任何操作时，60秒后自动关机'
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
/* 15 */
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Reference).call(this, props));

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
	                    '此标准仅供参考，具体请遵医嘱'
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
	                                '个人状态'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '偏低'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '正常'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '偏高'
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
	                                '空腹'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                'x＜3.9'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '3.9＜x≤6.1'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '6.1＜x'
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '餐后1小时'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                'x＜6.7'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '6.7≤x＜9.4'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '9.4＜x'
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '餐后2小时'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                'x＜3.9'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '3.9≤x＜7.8'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '7.8＜x'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'ta-r' },
	                    '单位：mmol/l'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    ' '
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    ' '
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '备注'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '空腹：受检者至少空腹8小时以上'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '餐后1小时：从进食第一口开始计算，1小时后'
	                ),
	                React.createElement(
	                    'p',
	                    null,
	                    '餐后2小时：从进食第一口开始计算，2小时后'
	                )
	            );
	        }
	    }]);

	    return Reference;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ }
/******/ ]);