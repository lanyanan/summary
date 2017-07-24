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

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 血氧脉率图表组件
	 * @prop {array} spo2  血氧值
	 * @prop {array} pr  脉率值
	 * @prop {array} seList  血氧事件
	 * @prop {array} peList  脉率事件
	 * @prop {array} oMarkPointData  血氧异常点
	 * @prop {array} pMarkPointData  脉率异常点
	 * @prop {array} time  x轴 时间
	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OxygenEcharts = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _fun = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OxygenEcharts = exports.OxygenEcharts = function (_BaseComponent) {
	    _inherits(OxygenEcharts, _BaseComponent);

	    function OxygenEcharts(props) {
	        _classCallCheck(this, OxygenEcharts);

	        var _this2 = _possibleConstructorReturn(this, (OxygenEcharts.__proto__ || Object.getPrototypeOf(OxygenEcharts)).call(this, props));

	        _this2.state = { tabIndex: 1, seArr: [], peArr: [], historyResult: '' };
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(OxygenEcharts, [{
	        key: 'handleSwitch',
	        value: function handleSwitch(index) {
	            // Actions.chartClick([],[],false);
	            this.setState({ tabIndex: index });
	        }
	    }, {
	        key: 'timeFormat',
	        value: function timeFormat(str) {
	            var timeArr = str.indexOf('-') > 0 ? str.split('-') : '',
	                curr_date = this.state.historyResult.recordTime ? this.state.historyResult.recordTime : '',
	                contentTime = _fun.Funs.dateFormat(curr_date + ' ' + timeArr[0], 'hh:mm:ss', true) + '-' + _fun.Funs.dateFormat(curr_date + ' ' + timeArr[1], 'hh:mm:ss', true);
	            return contentTime;
	        }
	        // chartClick(params,seList,peList){
	        //     let peArr=[],seArr=[],
	        //     xAxis = params.data.xAxis,
	        //     seriesIndex = params.seriesIndex;

	        //     if(seriesIndex ==0){// 0:血氧 1：脉率
	        //         for(let i in seList){
	        //             let seTime = Funs.dateFormat(seList[i].seTime,"hh:mm",true);
	        //             if(seTime ==xAxis){
	        //                 let seObj = {'id':i,"seContent":seList[i].seContent,'seContentTime':this.timeFormat(seList[i].seContentTime)};
	        //                 seArr.push(seObj);
	        //             }
	        //         }
	        //     }else{
	        //         for(let i in peList){
	        //             let peTime = Funs.dateFormat(peList[i].peTime,"hh:mm",true);
	        //             if(peTime ==xAxis){
	        //                 let peObj = {'id':i,"peContent":peList[i].peContent,'peContentTime':this.timeFormat(peList[i].peContentTime)};
	        //                 peArr.push(peObj);
	        //             }
	        //         }
	        //     }
	        //     Actions.chartClick(seArr,peArr,true);
	        // }

	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            //console.log(nextProps.nofresh,nextState.nofresh);
	            return !nextProps.nofresh;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'article',
	                null,
	                React.createElement(
	                    'ul',
	                    { className: 'flex timeTab' },
	                    React.createElement(
	                        'li',
	                        { className: this.state.tabIndex == 1 ? 'flex-cell checked' : 'flex-cell', onTouchTap: this.handleSwitch.bind(this, 1) },
	                        '1\u5C0F\u65F6'
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: this.state.tabIndex == 6 ? 'flex-cell checked' : 'flex-cell', onTouchTap: this.handleSwitch.bind(this, 6) },
	                        '6\u5C0F\u65F6'
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: this.state.tabIndex == 24 ? 'flex-cell checked' : 'flex-cell', onTouchTap: this.handleSwitch.bind(this, 24) },
	                        '24\u5C0F\u65F6'
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'yAxis-name' },
	                    React.createElement(
	                        'span',
	                        null,
	                        'SPO2'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        'PR'
	                    )
	                ),
	                React.createElement('div', { className: 'flex chart', id: 'chart', ref: 'chart' }),
	                React.createElement(
	                    'ul',
	                    { className: 'flex legend' },
	                    React.createElement(
	                        'li',
	                        { className: 'flex-cell' },
	                        React.createElement('b', { className: 'circleIcon green' }),
	                        React.createElement(
	                            'b',
	                            null,
	                            '\u8840\u6C27\u6B63\u5E38'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'flex-cell' },
	                        React.createElement('b', { className: 'circleIcon blue' }),
	                        React.createElement(
	                            'b',
	                            null,
	                            '\u8109\u7387\u6B63\u5E38'
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'flex-cell' },
	                        React.createElement('b', { className: 'circleIcon orange' }),
	                        React.createElement(
	                            'b',
	                            null,
	                            '\u5F02\u5E38'
	                        )
	                    ),
	                    '                '
	                )
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.handleSwitch(1);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            var _this3 = this;

	            var time = nextProps.time,
	                _this = this,
	                startTime = nextProps.startTime,
	                spo2 = nextProps.spo2,
	                pr = nextProps.pr,
	                peList = nextProps.peList,
	                seList = nextProps.seList,
	                pMarkPointData = nextProps.pMarkPointData,
	                oMarkPointData = nextProps.oMarkPointData;

	            //console.log('diyici',nextProps);
	            var chartDom = ReactDOM.findDOMNode(this.refs.chart),
	                // dom节点
	            chart = echarts.init(chartDom),
	                // 基于准备好的dom，初始化echarts实例
	            end = 100 / 24,
	                start = 0;

	            switch (nextState.tabIndex) {//1小时 6小时 24小时切换
	                case 1:
	                    if (startTime != null && startTime != '00') {
	                        start = parseInt(startTime) / 24 * 100;
	                        end = (parseInt(startTime) + 1) / 24 * 100;
	                    } else {
	                        end = 1 / 24 * 100;
	                    }
	                    break;
	                case 6:
	                    if (startTime != null && startTime != '00') {
	                        start = parseInt(startTime) / 24 * 100;
	                        end = (parseInt(startTime) + 6) / 24 * 100;
	                    } else {
	                        end = 6 / 24 * 100;
	                    }

	                    break;
	                case 24:
	                    end = 100;
	                    break;
	            }

	            var options = {
	                color: ["#3FB57D", '#4DB8BE'],
	                tooltip: {
	                    trigger: 'axis',
	                    triggerOn: 'click',
	                    alwaysShowContent: false,
	                    position: function position(point, params, dom) {
	                        var position = ["40%", "50%"];;
	                        if (params[0]) {
	                            if (params[0].data == '') {
	                                position = [-500, -500];
	                            }
	                        }
	                        // console.log(point,position);
	                        return position;
	                    },
	                    formatter: function formatter(params, ticket, callback) {
	                        var seriesName = void 0,
	                            data = void 0,
	                            name = void 0;
	                        if (params[0]) {
	                            seriesName = params[0].seriesName;
	                            data = params[0].data;
	                            name = params[0].name;
	                            if (seriesName == '血氧') {
	                                if (data < 90) {
	                                    seriesName = '血氧非常危险';
	                                } else if (data >= 90 && data < 95) {
	                                    seriesName = '血氧危险';
	                                } else {
	                                    seriesName = '血氧正常';
	                                }
	                            } else {
	                                if (data < 40 || data > 140) {
	                                    seriesName = '脉率非常危险';
	                                } else if (data >= 40 && data < 60 || data >= 101 && data <= 140) {
	                                    seriesName = '脉率危险';
	                                } else {
	                                    seriesName = '脉率正常';
	                                }
	                            }
	                        } else {
	                            seriesName = params.name;
	                        }

	                        return (name ? name + '<p></p>' : '') + seriesName + (data ? '：' + data : '');
	                    },
	                    axisPointer: { lineStyle: { color: 'rgba(128, 128, 128, 0)' } }
	                },
	                grid: [{ x: '10%', y: '7%', width: "85%", height: "38%" }, { x: '10%', y: '55%', width: "85%", height: "38%" }],
	                xAxis: [{
	                    gridIndex: 0,
	                    type: 'category',
	                    data: time,
	                    axisTick: { show: false },
	                    axisLabel: { show: false },
	                    splitLine: { show: false },
	                    axisLine: { lineStyle: { color: '#D2D4DF' } }
	                }, {
	                    gridIndex: 1,
	                    type: 'category',
	                    data: time,
	                    axisLine: { lineStyle: { color: '#D2D4DF' } },
	                    axisLabel: { textStyle: { color: '#969696' } }
	                }],
	                yAxis: [{
	                    type: 'value',
	                    name: 'SpO2',
	                    nameLocation: "start",
	                    nameGap: 8,
	                    min: 60,
	                    max: 100,
	                    interval: 10,
	                    axisLabel: { textStyle: { color: "#969696" } },
	                    axisLine: { lineStyle: { color: 'transparent' } },
	                    splitLine: { lineStyle: { color: '#E1E2EA' } }
	                }, {
	                    gridIndex: 1,
	                    type: 'value',
	                    nameGap: 20,
	                    name: 'PR',
	                    nameLocation: "start",
	                    min: 30,
	                    max: 170,
	                    interval: 35,
	                    axisLabel: { textStyle: { color: "#969696" } },
	                    axisLine: { lineStyle: { color: 'transparent' } },
	                    splitLine: { lineStyle: { color: '#E1E2EA' } }
	                }],
	                dataZoom: [{ type: 'inside', xAxisIndex: [0, 1], start: start, end: end, zoomLock: true }],
	                visualMap: [{
	                    seriesIndex: 0,
	                    show: false,
	                    dimension: 1,
	                    pieces: [{
	                        gt: 0,
	                        lte: 94,
	                        color: '#EB6E4A'
	                    }, {
	                        gt: 94,
	                        lte: 100,
	                        color: '#3FB57D'
	                    }]

	                }, {
	                    seriesIndex: 1,
	                    show: false,
	                    dimension: 1,
	                    pieces: [{
	                        gt: 60,
	                        lte: 100,
	                        color: '#4DB8BE'
	                    }],
	                    outOfRange: {
	                        color: '#EB6E4A'
	                    }
	                }],
	                series: [{
	                    name: '血氧',
	                    type: 'line',
	                    xAxisIndex: 0,
	                    yAxisIndex: 0,
	                    data: spo2
	                }, {
	                    name: '脉率',
	                    type: 'line',
	                    xAxisIndex: 1,
	                    yAxisIndex: 1,
	                    data: pr
	                }]
	            };

	            // 绘制图表
	            chart.setOption(options);
	            // if(startTime){
	            //     chart.setOption(options);
	            // }
	            // chart.on('click', function (params) {
	            //     _this.chartClick(params,seList,peList);
	            // }); 

	            /*解决图表区域内上下滑时 页面无法滚动且图表左右滑的bug*/
	            var startX = 0,
	                startY = 0;
	            this.canvasdom = document.querySelector('#chart').querySelector('canvas') || document.querySelector('#chart');
	            this.canvasdom.addEventListener('touchstart', function (e) {
	                var touch = e.touches[0];
	                _this3.initY = touch.clientY;
	                _this3.obj = {
	                    oriPosi: document.body.scrollTop,
	                    num: 2, //预研次数
	                    hor: true, //是否水平方向
	                    data: null //保存num次移动情况
	                };
	                startX = Number(touch.pageX); //页面触点X坐标
	                startY = Number(touch.pageY); //页面触点Y坐标
	            });
	            this.canvasdom.addEventListener('touchmove', function (e) {
	                var _obj = _this3.obj,
	                    oriPosi = _obj.oriPosi,
	                    num = _obj.num,
	                    hor = _obj.hor,
	                    data = _obj.data,
	                    touch = e.touches[0];

	                var moveY = touch.clientY - _this3.initY;
	                if (num > 0) {
	                    _this3.obj.data = touch;
	                    e.stopPropagation();
	                    _this3.obj.num--;
	                    return;
	                } else if (num === 0) {
	                    var x = Number(_this3.obj.data.pageX),
	                        //页面触点X坐标
	                    y = Number(_this3.obj.data.pageY),
	                        //页面触点Y坐标
	                    totalY = Math.abs(y - startY),
	                        //
	                    totalX = Math.abs(x - startX); //
	                    //判断滑动方向
	                    if (totalY > totalX) {
	                        _this3.obj.hor = false;
	                    }
	                }
	                // console.log('touchmove:',totalY,totalX,this.obj.hor);
	                if (!_this3.obj.hor) {
	                    e.stopPropagation();
	                    document.body.scrollTop = oriPosi - moveY;
	                }
	            }, true);

	            //      var startX = 0,
	            //     startY = 0;
	            // function touchStart(evt){
	            //     try{
	            //         var touch = evt.touches[0], //获取第一个触点
	            //                 x = Number(touch.pageX), //页面触点X坐标
	            //                 y = Number(touch.pageY); //页面触点Y坐标
	            //         //记录触点初始位置
	            //         startX = x;
	            //         startY = y;
	            //     }catch(e){
	            //         console.log(e.message)
	            //     }
	            // }

	            // function touchMove(evt){
	            //     try{
	            //         var touch = evt.touches[0], //获取第一个触点
	            //                 x = Number(touch.pageX), //页面触点X坐标
	            //                 y = Number(touch.pageY), //页面触点Y坐标
	            //            totalY = Math.abs(y - startY),//
	            //            totalX = Math.abs(x - startX);//

	            //         //判断滑动方向
	            //         if (totalX > totalY) {
	            //             console.log('左右滑了！');
	            //         }else{
	            //             evt.preventDefault();
	            //             document.body.scrollTop += totalY;
	            //             console.log(document.body.scrollTop);
	            //         }
	            //     }catch(e){
	            //         console.log(e.message)
	            //     }
	            // }

	            //  this.canvasdom.addEventListener('touchstart',touchStart,false);
	            //  this.canvasdom.addEventListener('touchmove',touchMove,false);
	        }
	    }]);

	    return OxygenEcharts;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _OxygenEcharts = __webpack_require__(9);

	var _Range = __webpack_require__(12);

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
	    _Actions.Actions.getLastestData();
	    //Actions.getAlert();
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	    if (data.uploadDone || data.disconnect) {
	        _Actions.Actions.getLastestData();
	    }
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

	    /*    componentDidMount(){
	            let oxygen = this.state.oxygen,
	            pulse = this.state.pulse,
	            dataTime = Funs.dateFormat(this.state.dataTime,"yyyy-MM-dd"),3
	            pulseAlertArr = this.state.pulseAlert.split(','),
	            pulseAlertMin = pulseAlertArr[0],
	            pulseAlertMax = pulseAlertArr[1];
	    
	    
	            if(oxygen < this.state.oxygenAlert ){
	                alert('血氧超出预警值了');
	            }
	            if(pulse < pulseAlertMin || pulse > pulseAlertMax ){
	                alert('血氧超出预警值了');
	            }
	        }*/

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            // console.log(this.state);
	            var oxygen = this.state.oxygen != null ? parseInt(this.state.oxygen) : '',
	                pulse = this.state.pulse != null ? parseInt(this.state.pulse) : '',

	            // oxygenAlert = this.state.oxygenAlert?parseInt(this.state.oxygenAlert):'',
	            dataTime = this.state.dataTime ? _fun.Funs.dateFormat(this.state.dataTime, "hh:mm:ss") : '',
	                lastTime = this.state.lastTime ? _fun.Funs.dateFormat(this.state.lastTime, "yyyy-MM-dd hh:mm:ss", true) : '';
	            // pulseAlertArr = this.state.pulseAlert.split(','),
	            // pulseAlertMin = pulseAlertArr[0],
	            // pulseAlertMax = pulseAlertArr[1];


	            // if(oxygen < oxygenAlert ){
	            //     //alert('血氧超出预警值了');
	            //     console.log('血氧超出预警值了');
	            // }
	            // if(pulse < pulseAlertMin || pulse > pulseAlertMax ){
	            //     //alert('血氧超出预警值了');
	            //     console.log('脉率超出预警值了');
	            // }


	            return React.createElement(
	                'article',
	                { className: 'main' },
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
	                React.createElement(_Range.Range, { oxygen: oxygen, pulse: pulse, dataTime: dataTime, lastTime: lastTime, showLastTime: this.state.showLastTime }),
	                React.createElement(
	                    'section',
	                    { className: 'footer flex' },
	                    React.createElement(
	                        'a',
	                        { href: 'health://connect', id: 'connect', className: this.state.disconnect ? 'btn flex-cell show' : 'btn flex-cell hide' },
	                        '\u8FDE\u63A5\u8BBE\u5907'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'health://history', id: 'history', className: 'btn flex-cell' },
	                        '\u5386\u53F2\u6570\u636E'
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
/* 12 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 血氧脉率状态条组件
	 * @prop {number} oxygen  血氧值
	 * @prop {number} pulse  脉率值
	 * @prop {number} dataTime  时间
	 * @prop {number} lastTime  历史时间
	 * @非常危险:<90%  
	 * @危险    :90%~94%
	 * @正常    :95%~98%
	 * max min : 99 35
	 *
	 * 血氧值脉率值都为0时  即手指脱落
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Range = exports.Range = React.createClass({
	    displayName: 'Range',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        //console.log(this.props);
	        var oxygen = this.props.oxygen,
	            pulse = this.props.pulse,
	            dataTime = this.props.dataTime,
	            lastTime = this.props.lastTime,
	            oxygenLevel = void 0,
	            pulseLevel = void 0;

	        if (oxygen < 90) {
	            oxygenLevel = 'flex-cell cor-orange';
	        } else if (oxygen >= 90 && oxygen < 95) {
	            oxygenLevel = 'flex-cell cor-yellow';
	        } else {
	            oxygenLevel = 'flex-cell cor-green';
	        }

	        if (pulse < 40 || pulse > 140) {
	            pulseLevel = 'flex-cell cor-orange';
	        } else if (pulse >= 40 && pulse < 60 || pulse >= 101 && pulse <= 140) {
	            pulseLevel = 'flex-cell cor-yellow';
	        } else {
	            pulseLevel = 'flex-cell cor-green';
	        }

	        return React.createElement(
	            'section',
	            { style: { paddingBottom: '60px', overflow: "auto" } },
	            React.createElement(
	                'p',
	                { className: 'measure-time' },
	                oxygen == 0 && pulse == 0 ? '手指脱落' : !this.props.showLastTime ? "正在测量：" + dataTime : "上次测量时间：" + lastTime
	            ),
	            React.createElement(
	                'p',
	                { className: 'measure-data flex' },
	                React.createElement(
	                    'span',
	                    { className: 'flex-cell' },
	                    '\u8840\u6C27'
	                ),
	                React.createElement(
	                    'span',
	                    { className: oxygenLevel },
	                    oxygen > 0 ? oxygen : '--'
	                ),
	                React.createElement(
	                    'span',
	                    { className: oxygenLevel },
	                    '%'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'd-range' },
	                React.createElement('input', { type: 'range', disabled: true, max: '99', min: '79', value: oxygen }),
	                React.createElement(
	                    'p',
	                    { className: 'range-line' },
	                    React.createElement('span', { style: { background: '#EB6E4A', width: '50%' } }),
	                    React.createElement('span', { style: { background: '#F7A905', width: '25%' } }),
	                    React.createElement('span', { style: { background: '#3FB57D', width: '25%' } })
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'range-text' },
	                    React.createElement(
	                        'span',
	                        { style: { left: '1%', color: '#EB6E4A' } },
	                        '0%'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '48%', color: '#EB6E4A' } },
	                        '90%'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '72%', color: '#3FB57D' } },
	                        '95%'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '91%', color: '#3FB57D' } },
	                        '100%'
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'range-text' },
	                    React.createElement(
	                        'span',
	                        { style: { left: '18%', top: '38px', color: '#EB6E4A' } },
	                        '\u975E\u5E38\u5371\u9669'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '53%', top: '38px', color: '#F7A905' } },
	                        '\u5371\u9669'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '80%', top: '38px', color: '#3FB57D' } },
	                        '\u6B63\u5E38'
	                    )
	                )
	            ),
	            React.createElement('p', { className: 'line' }),
	            React.createElement(
	                'p',
	                { className: 'measure-data flex' },
	                React.createElement(
	                    'span',
	                    { className: 'flex-cell' },
	                    '\u8109\u7387'
	                ),
	                React.createElement(
	                    'span',
	                    { className: pulseLevel },
	                    pulse > 0 ? pulse : '--'
	                ),
	                React.createElement(
	                    'span',
	                    { className: pulseLevel },
	                    '\u6B21/\u5206'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'd-range' },
	                React.createElement('input', { type: 'range', disabled: true, max: '180', min: '0', value: pulse }),
	                React.createElement(
	                    'p',
	                    { className: 'range-line' },
	                    React.createElement('span', { style: { background: '#EB6E4A', width: '22.2%' } }),
	                    React.createElement('span', { style: { background: '#F7A905', width: '11.1%' } }),
	                    React.createElement('span', { style: { background: '#3FB57D', width: '22.2%' } }),
	                    React.createElement('span', { style: { background: '#F7A905', width: '22.2%' } }),
	                    React.createElement('span', { style: { background: '#EB6E4A', width: '22.2%' } })
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'range-text' },
	                    React.createElement(
	                        'span',
	                        { style: { left: '1%', color: '#EB6E4A' } },
	                        '0'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '20%', color: '#EB6E4A' } },
	                        '40'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '32%', color: '#3FB57D' } },
	                        '60'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '52%', color: '#3FB57D' } },
	                        '100'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '75%', color: '#F7A905' } },
	                        '140'
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'range-text' },
	                    React.createElement(
	                        'span',
	                        { style: { left: '2%', top: '38px', color: '#EB6E4A' } },
	                        '\u975E\u5E38\u5371\u9669'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '24%', top: '38px', color: '#F7A905' } },
	                        '\u5371\u9669'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '40%', top: '38px', color: '#3FB57D' } },
	                        '\u6B63\u5E38'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '62%', top: '38px', color: '#F7A905' } },
	                        '\u5371\u9669'
	                    ),
	                    React.createElement(
	                        'span',
	                        { style: { left: '80%', top: '38px', color: '#EB6E4A' } },
	                        '\u975E\u5E38\u5371\u9669'
	                    )
	                )
	            )
	        );
	    }
	});

/***/ }
/******/ ]);