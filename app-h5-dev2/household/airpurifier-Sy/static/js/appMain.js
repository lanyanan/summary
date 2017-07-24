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

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
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
	'selectAny', // 选择模式
	'switch', // 开关机
	'toggleTimeClock', // 切换定时时间
	'toggleTimeId', //切换定时模式ID
	'toggleUV', // 切换紫外线
	'toggleAnion', // 切换负离子
	'childLock' //童锁开关
	]);

/***/ },
/* 3 */
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

	var _Actions = __webpack_require__(2);

	var _fun = __webpack_require__(4);

	var AppData = {};
	var OldData = {};
	//判断设备是否离线
	var isOffline = function isOffline() {
	    return AppData.online == 2;
	};
	// 判断是否关机状态
	var isShutdown = function isShutdown() {
	    return AppData.bootMode == 16;
	};
	//判断手机是否断网
	var isNetOff = function isNetOff() {
	    return AppData.networkavailable == 2;
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (data.online) AppData.online = data.online;
	        if (data.online == 2) {
	            data.bootMode = 16;
	        };
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.bootMode) AppData.bootMode = data.bootMode;
	        if (data.timeMode) {
	            AppData.timeMode = data.timeMode;
	        } else {
	            data.timeMode = AppData.timeMode;
	        }
	        this.trigger(data);
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
	        if (isShutdown()) {
	            // 关机状态，开机
	            AppData.updateFlag = 4096;
	            AppData.bootMode = 1;
	            AppData.childLockMode = 1;
	            AppData.negativeIonSetup = 16;
	            AppData.timeMode = 25;
	            AppData.uvMode = 1;
	            AppData.pattern = 1;
	            AppData.returnRestTime = 0;
	            this.trigger(AppData);
	        } else {
	            AppData.updateFlag = 4096;
	            AppData.bootMode = 16;
	            this.trigger(AppData);
	        }
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
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
	        AppData.updateFlag = 32768;
	        AppData.pattern = value;
	        this.trigger({ pattern: value });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onToggleTimeClock: function onToggleTimeClock(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            this.trigger({ timeMode: 25, returnRestTime: 0 });
	            return;
	        }
	        AppData.updateFlag = 1;
	        AppData.timeMode = value;
	        var truevalue = value == 25 ? 0 : value * 60;
	        this.trigger({ timeMode: value, returnRestTime: truevalue });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onToggleTimeId: function onToggleTimeId(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            this.trigger({ timeMode: 25, returnRestTime: 0 });
	            return;
	        }
	        AppData.timeMode = value;
	        this.trigger({ timeMode: value });
	    },
	    onToggleUV: function onToggleUV(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.updateFlag = 256;
	        AppData.uvMode = value;
	        this.trigger({ uvMode: value });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onToggleAnion: function onToggleAnion(value) {
	        if (isNetOff()) {
	            het.toast('请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.updateFlag = 512;
	        AppData.negativeIonSetup = value;
	        this.trigger({ negativeIonSetup: value });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
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
	        AppData.updateFlag = 2048;
	        AppData.childLockMode = value;
	        this.trigger({ childLockMode: value });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(5);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _Anion = __webpack_require__(7);

	var _Clock = __webpack_require__(8);

	var _FilterLife = __webpack_require__(9);

	var _Modes = __webpack_require__(10);

	var _PM = __webpack_require__(11);

	var _UV = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;

	var myscroller;
	var appData = {};

	function isEmptyObject(obj) {
	    for (var n in obj) {
	        return false;
	    }
	    return true;
	}
	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true,
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    appData = _fun.Funs._extends(appData, data);
	    if (isEmptyObject(appData)) {
	        return false;
	    } // 忽略接收到的空数据对象
	    _Actions.Actions.repaint(appData);
	});

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _this.baseData = {
	            airIndoorValue: "未知",
	            location: "深圳",
	            weather: "小雨",
	            temp: '12',
	            timeId: "1",
	            PMLevel: ['--', "优", "良", "中", "差", '故障'],
	            modeIndex: "1",
	            uvSwitch: "1",
	            anSwitch: "16"
	        };
	        _this.calcPMLevel = function () {
	            var pmvalue = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	            var pmlevel = void 0;
	            if (!Number(pmvalue)) pmvalue = 0;
	            if (pmvalue > 0 && pmvalue <= 50) pmlevel = 1;
	            if (pmvalue > 50 && pmvalue <= 100) pmlevel = 2;
	            if (pmvalue > 100 && pmvalue <= 150) pmlevel = 3;
	            if (pmvalue > 150) pmlevel = 4;
	            if (pmvalue <= 0) pmlevel = 5;
	            return pmlevel;
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var airIndoorValue = this.state.returnAlarmStatus2 == 1 || this.state.returnAlarmStatus2 == 3 ? this.baseData.airIndoorValue : this.state.returnCurrentPmValue;
	            airIndoorValue = airIndoorValue || '未知';
	            var pm = this.state.pm25 || '未知';
	            var outerPMLevel = this.baseData.PMLevel[this.calcPMLevel(pm)];
	            var innerPMLevel = this.baseData.PMLevel[this.calcPMLevel(airIndoorValue)];
	            var timeId = void 0;
	            switch (this.state.timeMode) {
	                case 25:
	                    timeId = 1;
	                    break;
	                case 1:
	                    timeId = 2;
	                    break;
	                case 2:
	                    timeId = 3;
	                    break;
	                case 4:
	                    timeId = 4;
	                    break;
	                case 8:
	                    timeId = 5;
	                    break;
	                default:
	                    timeId = this.baseData.timeId;
	                    break;
	            }
	            timeId = this.state.online == 2 ? 1 : timeId;
	            var modeIndex = this.state.pattern ? this.state.pattern : this.baseData.modeIndex;
	            var temp = this.state.temp ? this.state.temp : this.baseData.temp;
	            if (temp >= 50 || temp <= 0) temp = 12;
	            var location = this.state.cityName || this.state.city || this.baseData.location;
	            var weather = this.state.wtext ? this.state.wtext : this.baseData.weather;
	            var voc = this.state.vocGrade ? this.state.vocGrade : 2;
	            if (voc > 4) voc = 2;
	            voc = this.state.returnAlarmStatus2 == 2 || this.state.returnAlarmStatus2 == 3 ? 6 : voc;
	            var uvSwitch = this.state.uvMode ? this.state.uvMode : this.baseData.uvSwitch;
	            var anSwitch = this.state.negativeIonSetup ? this.state.negativeIonSetup : this.baseData.anSwitch;
	            var remainTime = this.state.returnRestTime && this.state.online != 2 && timeId != 1 ? this.state.returnRestTime : 0;
	            var remainTimeH = parseInt(remainTime / 60);
	            var remainTimeM = parseInt(remainTime - remainTimeH * 60);
	            var online = this.state.online ? this.state.online : 1;
	            var lock = this.state.childLockMode ? this.state.childLockMode : 1;
	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { id: 'panel-scroller', style: { display: typeof this.state.bootMode === 'undefined' || this.state.bootMode == 16 ? "none" : "block" } },
	                    React.createElement(
	                        'section',
	                        null,
	                        React.createElement(
	                            'section',
	                            { className: "startupface " + (typeof this.state.bootMode === 'undefined' || this.state.bootMode == 16 ? "slide-down" : "slide-up") },
	                            React.createElement(_PM.PM, { airIndoorValue: airIndoorValue,
	                                VOCValue: voc, location: location, weather: weather,
	                                temperature: temp, outerPMLevel: outerPMLevel, innerPMLevel: innerPMLevel, PMOutdoor: pm, lock: lock,
	                                headerTop: this.state.headerTop }),
	                            React.createElement('div', { id: 'childlock', style: { display: lock == 16 ? 'block' : 'none' } }),
	                            React.createElement(_Modes.Modes, { modeIndex: modeIndex }),
	                            React.createElement(_Clock.Clock, { timeId: timeId, online: online, remainTime: remainTime,
	                                remainTimeH: remainTimeH, remainTimeM: remainTimeM }),
	                            React.createElement(_UV.UV, { uvSwitchValue: uvSwitch }),
	                            React.createElement(_Anion.Anion, { anSwitchValue: anSwitch }),
	                            React.createElement(_FilterLife.FilterLife, { remainingLife: this.state.screenOneWorkHours })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: "shutdownface " + (typeof this.state.bootMode === 'undefined' || this.state.bootMode == 16 ? "slide-up" : "slide-down"), style: { 'paddingTop': this.state.headerTop } },
	                    React.createElement('div', { className: 'pic' }),
	                    React.createElement('a', { href: 'javascript:', className: 'power', onTouchEnd: _Actions.Actions.switch })
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('三洋空气净化器');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));

	    /*setTimeout(function(){
	        myscroller = new IScroll("#panel-scroller",{
	            preventDefault:false
	        });
	        myscroller.on('beforeScrollStart', function() {
	            var target = event.target;
	            while (target.nodeType != 1) target = target.parentNode;
	            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
	            event.preventDefault();
	        });
	    },100);*/
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 负离子开关组件
	 * @prop {integer} anSwitchValue  负离子开关value值
	 * @act  Actions.toggleAnion([integer])  更改负离子开关时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Anion = undefined;

	var _Actions = __webpack_require__(2);

	var Anion = exports.Anion = React.createClass({
	    displayName: 'Anion',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    handlerSwitch: function handlerSwitch(e) {
	        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.anSwitchValue) == 1 ? 16 : 1;
	        e.preventDefault();
	        //this.setState({value:value});
	        _Actions.Actions.toggleAnion(value);
	    },
	    render: function render() {
	        var anvalue = typeof this.state.value !== "undefined" ? this.state.value : this.props.anSwitchValue;
	        return React.createElement(
	            'section',
	            { className: 'flex anion' },
	            React.createElement(
	                'span',
	                { className: 'boxtitle flex-cell' },
	                '负离子'
	            ),
	            React.createElement(
	                'span',
	                { className: 'flex-cell ' },
	                React.createElement('a', { href: 'javascript:void(0);', onTouchEnd: this.handlerSwitch, className: anvalue == 1 ? "off" : "on" })
	            )
	        );
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 定时选择组件
	 * @prop {integer} timeId  定时id，取值1-5
	 * @act  Actions.toggleTimeClock([integer])  选择时间时触发
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Clock = undefined;

	var _Actions = __webpack_require__(2);

	var Clock = exports.Clock = React.createClass({
		displayName: 'Clock',

		getInitialState: function getInitialState() {
			return {};
		},
		items: [{ id: 1, value: "0", data: 25 }, { id: 2, value: "1", data: 0x01 }, { id: 3, value: "2", data: 0x02 }, { id: 4, value: "4", data: 0x04 }, { id: 5, value: "8", data: 0x08 }],
		timeclock: function timeclock() {
			if (this.state.remaintimem || this.state.remaintimeh) {
				if (this.state.remaintimem == 0) {
					this.setState({ remaintimem: 59 });
					var remaintimeh = this.state.remaintimeh - 1;
					this.setState({ remaintimeh: remaintimeh });
				} else {
					var remaintimem = this.state.remaintimem - 1;
					this.setState({ remaintimem: remaintimem });
				}
			} else if (this.props.remainTimeM || this.props.remainTimeH) {
				if (this.props.remainTimeM == 0) {
					this.setState({ remaintimem: 59 });
					var _remaintimeh = this.props.remainTimeH - 1;
					this.setState({ remaintimeh: _remaintimeh });
				} else {
					var _remaintimem = this.props.remainTimeM - 1;
					this.setState({ remaintimem: _remaintimem });
				}
			}
		},
		componentDidMount: function componentDidMount() {
			this.setState({ remainvalue: 2 });
			var _this = this;
			this.tclock = setInterval(function () {
				_this.timeclock();
			}, 60000);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			//获取设备预约剩余时间，保持和设备时间一致
			if (this.props.remainTime !== nextProps.remainTime) {
				this.setState({
					remainvalue: nextProps.remainTime,
					remaintimeh: nextProps.remainTimeH,
					remaintimem: nextProps.remainTimeM
				});
			}
		},
		handlerPlusClick: function handlerPlusClick(e) {
			if (this.props.online == 2) {
				_Actions.Actions.toggleTimeClock(0);
				return;
			}
			var oid = parseInt(this.props.timeId);
			if (oid > 0 && oid < 5) {
				oid += 1;
				this.setState({ remainvalue: 0 });
				clearTimeout(this.retime);
				clearInterval(this.tclock);
			} else {
				return false;
			}
			e.preventDefault();
			var value = this.items[oid - 1].data;
			_Actions.Actions.toggleTimeId(value);
			var _this = this;
			this.retime = setTimeout(function () {
				_this.setState({ remainvalue: 1 });
				_this.setState({ remaintimeh: value });
				_this.setState({ remaintimem: 0 });
				_this.tclock = setInterval(function () {
					_this.timeclock();
				}, 60000);
				_Actions.Actions.toggleTimeClock(value);
			}, 5000);
		},
		handlerMinusClick: function handlerMinusClick(e) {
			if (this.props.online == 2) {
				_Actions.Actions.toggleTimeClock(0);
				return;
			}
			this.setState({ remainvalue: 0 });
			clearTimeout(this.retime);
			clearInterval(this.tclock);
			var oid = parseInt(this.props.timeId);
			if (oid > 1 && oid < 6) {
				oid -= 1;
			} else {
				// console.log(this.props.remainTime,typeof this.props.remainTime);
				// Actions.toggleTimeClock(this.items[oid-1].data);
				return false;
			}
			e.preventDefault();
			var _this = this;
			var value = this.items[oid - 1].data;
			_Actions.Actions.toggleTimeId(value); //用于回显
			if (oid !== 1) {
				_this.retime = setTimeout(function () {
					_this.setState({ remainvalue: 1 });
					_this.setState({ remaintimeh: value });
					_this.setState({ remaintimem: 0 });
					_this.tclock = setInterval(function () {
						_this.timeclock();
					}, 60000);
					_Actions.Actions.toggleTimeClock(value);
				}, 5000);
			} else {
				_this.setState({ remainvalue: 0 });
				_Actions.Actions.toggleTimeClock(value);
			}
		},
		render: function render() {
			var tid = parseInt(this.props.timeId);
			var remainvalue = typeof this.state.remainvalue !== "undefined" && this.state.remainvalue != 2 && this.props.online != 2 && this.props.timeId != 1 ? this.state.remainvalue : this.props.remainTime;
			var remaintimeh = typeof this.state.remaintimeh !== "undefined" && this.props.online != 2 && this.props.timeId != 1 ? '0' + this.state.remaintimeh : '0' + this.props.remainTimeH;
			var remaintimem = typeof this.state.remaintimem !== "undefined" && this.props.online != 2 && this.props.timeId != 1 ? this.state.remaintimem : this.props.remainTimeM;
			remaintimem = remaintimem < 10 ? '0' + remaintimem : remaintimem;
			return React.createElement(
				'section',
				{ className: 'clock flex' },
				React.createElement(
					'span',
					{ className: 'boxtitle flex-cell' },
					'定时'
				),
				React.createElement('span', { className: 'flex-cell left-btn', onTouchEnd: this.handlerMinusClick }),
				React.createElement(
					'span',
					{ className: "center-cell " + (remainvalue ? "mvalue-off" : "mvalue-on") },
					this.items[tid - 1].value,
					React.createElement(
						'span',
						{ className: 'svalue' },
						'(小时)'
					)
				),
				React.createElement(
					'span',
					{ className: "center-cell " + (remainvalue ? "remain-on" : "remain-off") },
					React.createElement(
						'span',
						{ className: 'svalue' },
						'(剩余)'
					),
					remaintimeh,
					':',
					remaintimem
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
	 * 滤网寿命提示组件
	 * @prop {integer} remainingLife  剩余寿命值
	 * @act  Actions.toggleFilterLife([integer])  滤网寿命有更改时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FilterLife = undefined;

	var _Actions = __webpack_require__(2);

	var FilterLife = exports.FilterLife = React.createClass({
	    displayName: 'FilterLife',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        var value = Math.abs(Math.round((2000 - this.props.remainingLife) / 2000 * 10000) / 100.00);
	        value = value > 100 ? "100%" : value + "%";
	        var remainingLife = isNaN(parseInt(2000 - this.props.remainingLife, 10)) ? "" : parseInt(2000 - this.props.remainingLife, 10);
	        return React.createElement(
	            'div',
	            { className: 'flex filterlife' },
	            React.createElement(
	                'span',
	                { className: ' boxtitle' },
	                '滤网寿命'
	            ),
	            React.createElement(
	                'span',
	                { className: 'flex-cell rangespan' },
	                React.createElement('div', { id: 'fa' }),
	                React.createElement('div', { style: { width: value }, id: 'fb' })
	            ),
	            React.createElement(
	                'span',
	                { className: 'smalltitle' },
	                '(剩余:',
	                remainingLife,
	                '小时)'
	            )
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 自动/标准/速净/省电/睡眠
	 * @prop {integer} modeIndex  模式索引，与id对应。取值1-5，超出范围默认为1
	 * @act  Actions.selectAny([integer])  切换灯时触发该动作
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Modes = undefined;

	var _Actions = __webpack_require__(2);

	var Modes = exports.Modes = React.createClass({
	    displayName: 'Modes',

	    items: [{ id: 1, name: "自动" }, { id: 2, name: "标准" }, { id: 3, name: "速净" }, { id: 4, name: "省电" }, { id: 5, name: "睡眠" }],
	    handlerClick: function handlerClick(e) {
	        var index = e.currentTarget.getAttribute('data-value');
	        //console.log('index',index,this.props.modeIndex);
	        if (index == this.props.modeIndex) return;
	        _Actions.Actions.selectAny(index);
	    },
	    render: function render() {
	        var idx = this.props.modeIndex;
	        return React.createElement(
	            'section',
	            { className: 'modes flex' },
	            this.items.map(function (o) {
	                return React.createElement(
	                    'dl',
	                    { key: o.id, className: (idx == o.id ? "on" : "") + " flex-cell", 'data-value': o.id, onTouchEnd: this.handlerClick },
	                    React.createElement(
	                        'dd',
	                        null,
	                        React.createElement('img', { src: idx == o.id ? "../static/img/airPurifier/mode" + o.id + "-on.png" : "../static/img/airPurifier/mode" + o.id + "-off.png" })
	                    ),
	                    React.createElement(
	                        'dt',
	                        null,
	                        o.name
	                    )
	                );
	            }.bind(this))
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 主界面组件
	 * @prop {integer} airIndoorValue  室内空气质量值
	 * @prop {integer} PMIndoorValue  室内PM2.5值
	 * @prop {integer} PMOutdoorValue  室外PM2.5值
	 * @prop {integer} VOCValue VOC等级
	 * @prop {integer} headerTop 顶部距离
	 * @act  Actions.switch([event])  更改开机开关时触发
	 * @act  Actions.childLock([event])  更改童锁开关时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PM = undefined;

	var _Actions = __webpack_require__(2);

	var PM = exports.PM = React.createClass({
	    displayName: 'PM',

	    items: [{ id: 1, name: "优", value: "bg-y" }, { id: 2, name: "良", value: "bg-l" }, { id: 3, name: "中", value: "bg-z" }, { id: 4, name: "差", value: "bg-c" }, { id: 5, name: "---", value: "bg-y" }, { id: 6, name: "故障", value: "bg-w" }],
	    getInitialState: function getInitialState() {
	        return {};
	    },
	    handlerSwitch: function handlerSwitch(e) {
	        return _Actions.Actions.switch(e);
	    },
	    handlerChildLock: function handlerChildLock() {
	        var value = this.props.lock == 1 ? 16 : 1;
	        _Actions.Actions.childLock(value);
	    },
	    render: function render() {
	        var vocid = this.props.VOCValue ? this.props.VOCValue : 2;
	        var vocvalue = this.items[vocid - 1].name;
	        var bglevel = this.items[vocid - 1].value;
	        var lock = this.props.lock;
	        return React.createElement(
	            'section',
	            { className: "mainscreen " + bglevel, style: { 'paddingTop': this.props.headerTop } },
	            React.createElement(
	                'section',
	                { className: 'devscreen' },
	                React.createElement(
	                    'ul',
	                    { className: 'screenul' },
	                    React.createElement(
	                        'li',
	                        { className: 'titleli' },
	                        '室内空气质量'
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'airli' },
	                        this.props.airIndoorValue
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'pmli' },
	                        'PM2.5值:',
	                        this.props.innerPMLevel
	                    ),
	                    React.createElement(
	                        'li',
	                        { className: 'vocli' },
	                        'VOC:',
	                        vocvalue
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
	                    '  ',
	                    this.props.location,
	                    React.createElement(
	                        'span',
	                        { className: 'inforspacing' },
	                        this.props.weather
	                    ),
	                    '  ',
	                    this.props.temperature,
	                    '℃'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'flex-cell divr' },
	                    '室外PM2.5 : ',
	                    this.props.PMOutdoor,
	                    ' ( ',
	                    this.props.outerPMLevel,
	                    ' )'
	                )
	            ),
	            React.createElement(
	                'a',
	                { href: 'javascript:void(0)', className: 'pos-a al' },
	                React.createElement('img', { src: "../static/img/airPurifier/mood" + (lock == 16 ? "-on" : "") + ".png", onTouchEnd: this.handlerChildLock })
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 紫外线开关组件
	 * @prop {integer} uvSwitchValue  开关value值
	 * @act  Actions.toggleUV([integer])  更改紫外线开关时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.UV = undefined;

	var _Actions = __webpack_require__(2);

	var UV = exports.UV = React.createClass({
	    displayName: 'UV',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    handlerSwitch: function handlerSwitch(e) {
	        var value = parseInt(typeof this.state.value !== "undefined" ? this.state.value : this.props.uvSwitchValue) == 1 ? 16 : 1;
	        e.preventDefault();
	        //this.setState({value:value});
	        _Actions.Actions.toggleUV(value);
	    },
	    render: function render() {
	        var uvvalue = typeof this.state.value !== "undefined" ? this.state.value : this.props.uvSwitchValue;
	        return React.createElement(
	            'section',
	            { className: 'flex uv' },
	            React.createElement(
	                'span',
	                { className: 'boxtitle flex-cell' },
	                '紫外线'
	            ),
	            React.createElement(
	                'span',
	                { className: 'flex-cell ' },
	                React.createElement('a', { href: 'javascript:void(0);', onTouchEnd: this.handlerSwitch, className: uvvalue == 1 ? "off" : "on" })
	            )
	        );
	    }
	});

/***/ }
/******/ ]);