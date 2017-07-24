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

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store

	        _this.handleSwitch = _this.handleSwitch.bind(_this);
	        _this.handleMode = _this.handleMode.bind(_this);
	        _this.handleAnion = _this.handleAnion.bind(_this);
	        _this.handleLock = _this.handleLock.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleSwitch',
	        value: function handleSwitch(e) {
	            //处理开关机事件
	            if (this.state.childLockMode == 16 || this.state.online == 2) return false;
	            _Actions.Actions.switch();
	        }
	    }, {
	        key: 'handleMode',
	        value: function handleMode(e) {
	            //出来模式选择
	            if (this.state.online == 2 || this.state.childLockMode == 16 || this.state.bootMode == 16 || this.state.bootMode == 'undefined') return false;
	            var modeIndex = this.state.pattern || 1;
	            if (++modeIndex > 5) modeIndex = 1;
	            _Actions.Actions.selectAny(modeIndex);
	        }
	    }, {
	        key: 'handleAnion',
	        value: function handleAnion(e) {
	            //负离子功能处理
	            if (this.state.online == 2 || this.state.childLockMode == 16 || this.state.bootMode == 16 || this.state.bootMode == 'undefined') return false;
	            var anion = this.state.negativeIonSetup == 1 ? 16 : 1;
	            _Actions.Actions.toggleAnion(anion);
	        }
	    }, {
	        key: 'handleLock',
	        value: function handleLock(e) {
	            //童锁功能处理
	            if (this.state.online == 2 || this.state.bootMode == 16 || this.state.bootMode == 'undefined') return false;
	            var lock = this.state.childLockMode || 1,
	                childLockMode = lock == 1 ? 16 : 1;
	            _Actions.Actions.childLock(childLockMode);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var commonMode = this.state.pattern || 1,
	                modeImgPath = '../static/img/airPurifier/',
	                modeName = '自动',
	                voc = this.state.vocGrade || 2,
	                pm = !this.state.returnCurrentPmValue ? '50' : this.state.returnCurrentPmValue,
	                online = this.state.online ? this.state.online : 1,
	                lock = this.state.childLockMode || 1;
	            if (this.state.returnAlarmStatus2 == 1 || this.state.returnAlarmStatus2 == 3) {
	                pm = '故障';
	            };
	            if (this.state.returnAlarmStatus2 == 2 || this.state.returnAlarmStatus2 == 3) {
	                voc = '故障';
	            };
	            switch (+commonMode) {
	                case 1:
	                    modeImgPath = modeImgPath + '2.png';modeName = '自动';break;
	                case 2:
	                    modeImgPath = modeImgPath + '3.png';modeName = '标准';break;
	                case 5:
	                    modeImgPath = modeImgPath + '4.png';modeName = '睡眠';break;
	                case 4:
	                    modeImgPath = modeImgPath + '5.png';modeName = '省电';break;
	                case 3:
	                    modeImgPath = modeImgPath + '6.png';modeName = '速净';break;
	            }
	            return React.createElement(
	                'div',
	                null,
	                this.state.online == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '设备已离线'
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '模式值:',
	                    modeName,
	                    '  Voc检测值:',
	                    voc,
	                    '  PM2.5值:',
	                    pm
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleSwitch },
	                        React.createElement('img', { style: lock == 16 ? { opacity: 0.5 } : { opacity: 1 }, src: '../static/img/airPurifier/1.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            this.state.bootMode == 16 ? '开机' : '关机'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleMode },
	                        React.createElement('img', { style: lock == 16 || this.state.bootMode == 16 || this.state.bootMode == 'undefined' ? { opacity: 0.5 } : { opacity: 1 }, src: modeImgPath, alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            modeName
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleLock },
	                        React.createElement('img', { style: this.state.bootMode == 16 && this.state.bootMode != 'undefined' ? { opacity: 0.5 } : { opacity: 1 }, src: this.state.childLockMode == 16 ? "../static/img/airPurifier/8.png" : "../static/img/airPurifier/7.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '童锁'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleAnion },
	                        React.createElement('img', { style: lock == 16 || this.state.bootMode == 16 || this.state.bootMode == 'undefined' ? { opacity: 0.5 } : { opacity: 1 }, src: this.state.negativeIonSetup == 16 ? "../static/img/airPurifier/9.png" : "../static/img/airPurifier/10.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '负离子'
	                        )
	                    )
	                )
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

/***/ }
/******/ ]);