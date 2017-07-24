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

	module.exports = __webpack_require__(4);


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
	'switch', //开关机
	'shakeSwitch', //摇头开关
	'clockSwitch', //定时开关
	'selectTime', //选取定时时间
	'selectRate', //选取档位
	'selectMode', //选取模式
	'selectRateValue' //档位回显
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

	var AppData = {};

	var isFault = function isFault() {
	    if (AppData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (AppData.online == 2) {
	        return '设备已离线';
	    }
	    return false;
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (data.online) AppData.online = data.online;
	        if (data.online == 2) {
	            data.boot = 1;
	        };
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.wind) {
	            data.wind = data.wind % 8;
	        }
	        if (data.remainTimeH || data.remainTimeL) {
	            AppData.remaintime = data.remainTime = +data.remainTimeH * 256 + +data.remainTimeL;
	        }
	        if (data.windStall) {
	            AppData.windStall = data.windStall;
	        };
	        if (data.tip) AppData.tip = data.tip;
	        if (data.remainTime != 0) {
	            data.clockId = data.timingMode;
	        }
	        if (data.timingMode == 3) {
	            data.clockId = 3;
	        }
	        this.trigger(data);
	    },
	    onSwitch: function onSwitch(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.boot = value;
	        if (AppData.timingMode == 1 || AppData.timingMode == 2) {
	            AppData.timingMode = 3;
	            AppData.updateFlag = 3 * 256;
	        } else {
	            AppData.updateFlag = 1 * 256;
	        }
	        if (this.tclock) clearInterval(this.tclock);
	        this.trigger({ boot: value, clockId: 3, remainTimeL: 0, remainTimeH: 0, remainTime: 0, clockShow: 3, wind: 1, windStall: 1, shookHead: 1 });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onShakeSwitch: function onShakeSwitch(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.shookHead = value;
	        AppData.updateFlag = 32 * 256;
	        this.trigger({ shookHead: value });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        });
	    },
	    onClockSwitch: function onClockSwitch(value, type) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.timingMode = value;
	        if (value == 3 && type !== 'cancel') {
	            AppData.updateFlag = 2 * 256;
	            this.trigger({ clockId: value, clockShow: value, remainTime: 0, remainTimeL: 0, remainTimeH: 0 });
	            het.send(AppData, function (data) {
	                // console.log(data)
	            }, function (data) {
	                het.toast("命令发送失败");
	            });
	        } else {
	            this.trigger({ clockId: value, clockShow: value, remainTime: 0, remainTimeL: 0, remainTimeH: 0 });
	        }
	    },
	    onSelectTime: function onSelectTime(hour, minute) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        var remaintime = parseInt(hour * 60) + parseInt(minute);
	        AppData.tip = hour;
	        AppData.remaintime = remaintime;
	        AppData.updateFlag = 6 * 256;
	        this.trigger({ remainTime: remaintime, clockShow: 3 });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        // }
	    },
	    onSelectRate: function onSelectRate(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.windStall = value;
	        AppData.updateFlag = 16 * 256;
	        this.trigger({ windStall: value });
	        het.send(AppData, function (data) {
	            // console.log('调用了--onSelectRate')
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSelectRateValue: function onSelectRateValue(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.windStall = value;
	        // AppData.updateFlag = 16*256;
	        this.trigger({ windStall: value });
	    },
	    onSelectMode: function onSelectMode(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        var windStall = AppData.windStall;
	        AppData.wind = value;
	        AppData.updateFlag = 8 * 256;
	        this.trigger({ wind: value, windStall: windStall });
	        // AppData.windStall = 0;
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(5);

	var _TimeSelect = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _FanMain = __webpack_require__(8);

	var _WaveCloud = __webpack_require__(9);

	var _Range = __webpack_require__(10);

	var _Modes = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;

	var myscroller; // iscroll滚动容器
	var appData = {};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
	        torporTime: 1,
	        updateFlagMap: {},
	        filter: {
	            windStall: function windStall(type, data) {
	                if (type == 0 && data.boot == 1) {
	                    //关机的时候，全部取运行数据
	                    return false;
	                }
	                if (type == 0 && data.wind == 4) {
	                    //智能风的时候，取运行数据
	                    return false;
	                }
	                return true;
	            }
	        }
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    appData = _fun.Funs._extends(appData, data);
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
	            //处理倒计时回显跳变问题
	            if (data.clockId && data.clockId == 3) {
	                appData.remainTime = 0;
	                appData.remainTimeH = 0;
	                appData.remainTimeL = 0;
	            } else {
	                appData.remainTime = data.remainTime;
	            };
	            //处理档位跳变问题
	            if (data.windStall) {
	                appData.windStall = data.windStall;
	            }
	            _this.setState(data, function () {
	                // console.log('data-2',appData);
	            });
	        }); // 监听Store
	        _this.items = [{ id: 1, name: "标准风", rate: 4 }, { id: 2, name: "自然风", rate: 46 }, { id: 3, name: "睡眠风", rate: 46 }, { id: 4, name: "智能风" }, { id: 5, name: "采集风" }, { id: 6, name: "" }];
	        _this.submitClock = function (h, m) {
	            _Actions.Actions.selectTime(h, m);
	        };
	        _this.cancelClock = function () {
	            _Actions.Actions.clockSwitch(3, 'cancel');
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var selectshow = this.state.clockShow == 1 || this.state.clockShow == 2 ? true : false;
	            var windType = this.state.wind || 6;
	            var modeName = '';
	            var rate = 40;
	            if (this.items[windType - 1]) {
	                modeName = this.items[windType - 1]['name'] || '';
	                rate = this.items[windType - 1]['rate'] || 40;
	            }
	            var disable = this.state.boot == 2 ? false : true;
	            var rangedisable = this.state.boot == 2 && windType > 0 && windType < 4 ? false : true;
	            var windStall = this.state.windStall || 1;
	            // windStall = windStall*rate>120 ? parseInt(120/rate) : windStall;
	            var shookHeadStatus = this.state.shookHead || 1;
	            var boot = this.state.boot || 1;
	            var clockId = this.state.remainTime > 0 ? this.state.clockId || 3 : 3;
	            var remainTime = this.state.remainTime || 0;
	            var humidity = this.state.humidity || '80';
	            var temp = this.state.temp || '20';
	            var selectTitle = boot == 2 ? '设置关闭时间' : '设置开启时间';
	            var statusname = boot == 2 ? '后关闭' : '后开启';
	            return React.createElement(
	                'div',
	                { style: selectshow ? { "overflow-y": "hidden" } : { "overflow-y": "auto" }, className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { id: 'panel-scroller' },
	                    React.createElement(
	                        'section',
	                        null,
	                        React.createElement(
	                            'section',
	                            { className: 'mainbg', style: { 'paddingTop': this.state.headerTop } },
	                            React.createElement(_FanMain.FanMain, { shookHeadStatus: shookHeadStatus, windStall: windStall,
	                                clockId: clockId, modeName: modeName, remainTime: remainTime,
	                                temp: temp, humidity: humidity, devStatus: boot }),
	                            React.createElement(_WaveCloud.WaveCloud, null)
	                        ),
	                        React.createElement(_Range.Range, { windStall: windStall, rate: rate, rangedisable: selectshow ? true : rangedisable }),
	                        React.createElement(_Modes.Modes, { windType: windType, modedisable: disable })
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { title: selectTitle, minuteshow: false, hourshow: true, hourstep: 1,
	                    minutestep: 1, defaulthour: 1, statusname: statusname, cancelClock: this.cancelClock,
	                    submitClock: this.submitClock, show: selectshow, hourarray: [1, 2, 4, 8] }),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('智能风扇');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));

	    // setTimeout(function(){
	    //     myscroller = new IScroll("#panel-scroller",{
	    //         preventDefault:false
	    //     });
	    //     myscroller.on('beforeScrollStart', function() {
	    //         var target = event.target;
	    //         while (target.nodeType != 1) target = target.parentNode;
	    //         if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
	    //         event.preventDefault();
	    //     });
	    // },100);
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(6);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 时间选择组件
	 * @prop {boolean} show  时间选择组件是否显示(默认为false)
	 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
	 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
	 * @prop {string} title  时间组件的标题(默认为设置时间)
	 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
	 * @prop {number} hourstep  小时的间隔(默认为1)
	 * @prop {number} minutestep 分钟的间隔(默认为1)
	 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {array} minutearr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var TimeSelect = exports.TimeSelect = React.createClass({
		displayName: 'TimeSelect',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 0,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (this.props.hourarray && this.props.hourarray instanceof Array) {
				hourarr = this.props.hourarray;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : value;
					hourarr.push(value);
				}
				maxhour = maxhour < 10 ? '0' + maxhour : maxhour;
				if (hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			}
			//设置默认小时
			if (next.defaulthour) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 59;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (this.props.minutearr && this.props.minutearr instanceof Array) {
				minutearr = this.props.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			}
			//设置默认分钟
			if (next.defaultminute) {
				var mindex = minutearr.indexOf(next.defaultminute);
				if (mindex != -1) {
					this.setState({
						minutetime: next.defaultminute,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.arrayInit === true) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 0.1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 0.1;
						// console.log('1',showOpacity,parseInt(showOpacity));
						if (showOpacity <= 0) {
							clearInterval(this.timr);
							this.setState({ timeDisplay: false });
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 30);
				}
			}
		},
		startrange: function startrange(e) {
			//开始滑动时间刻度 记录初始坐标值
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			this.setState({
				oldy: yvalue
			});
		},
		moverange: function moverange(e) {
			//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			var oldy = parseInt(this.state.oldy);
			var value = (yvalue - oldy) / 1.72;
			if (value > 20) value = 20;
			if (value < -20) value = -20;
			var type = e.target.getAttribute('data-type');
			if (type == 'hour') {
				this.setState({
					newy: yvalue,
					hourtop: value
				});
			}
			if (type == 'minute') {
				this.setState({
					newy: yvalue,
					minutetop: value
				});
			}
		},
		endrange: function endrange(e) {
			//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
			e.stopPropagation();
			e.preventDefault();
			var newy = parseInt(this.state.newy); //滑动结束时的y值
			var oldy = parseInt(this.state.oldy); //滑动开始时的y值
			var hour = parseInt(this.state.hourtime); //上一次选中的小时值
			var hourarr = this.state.hourarr; //小时可选值数组
			var hourindex = parseInt(this.state.hourindex); //上次选中的小时值对应数组中索引
			var minutearr = this.state.minutearr; //分钟可选值数组
			var minuteindex = parseInt(this.state.minuteindex); //上次选中的分钟值对应数组索引
			var minute = parseInt(this.state.minutetime); //上次选中的分钟值
			var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
			var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
			var maxhour = parseInt(this.props.maxhour) || 23; //设置的最大小时值
			var minhour = parseInt(this.props.minhour) || 0; //设置的最小小时值
			var type = e.target.getAttribute('data-type'); //滑动更改的类型
			//小时减小
			if (newy - oldy > 20 && type == 'hour') {
				var rangestep = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				hourindex = hourindex - rangestep;
				hourindex = hourindex < 0 ? 0 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//小时增加
			if (newy - oldy < -20 && type == 'hour') {
				var _rangestep = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				hourindex = hourindex + _rangestep;
				hourindex = hourindex >= hourarr.length ? hourarr.length - 1 : hourindex;
				hour = hourarr[hourindex];
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//分钟减小
			if (newy - oldy > 20 && type == 'minute') {
				var _rangestep2 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				minuteindex = minuteindex - _rangestep2;
				minuteindex = minuteindex < 0 ? 0 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//分钟增加
			if (newy - oldy < -20 && type == 'minute') {
				var _rangestep3 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				minuteindex = minuteindex + _rangestep3;
				minuteindex = minuteindex >= minutearr.length ? minutearr.length - 1 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//重置为未拖动状态
			this.setState({
				hourtop: 0,
				minutetop: 0
			});
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			if (typeof this.props.cancelClock === 'function') {
				this.props.cancelClock();
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			if (typeof this.props.submitClock === 'function') {
				this.props.submitClock(this.state.hourtime, this.state.minutetime);
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusname = this.props.statusname || '关闭';
			var hour = this.state.hourtime || '0';
			hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
			hour = hour < minhour ? minhour : hour;
			var minute = this.state.minutetime || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			return React.createElement(
				'section',
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '50%' : '100%', display: hourshow ? 'inline-block' : 'none' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'hour' }),
						React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '50%' : '100%', left: hourshow ? '50%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement(
							'section',
							{ className: 'timetext' },
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'时'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'分'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
							React.createElement(
								'span',
								{ className: hourindex - 3 < 0 ? 'line4' : 'line1' },
								hourindex - 3 < 0 ? '' : hourarr[hourindex - 3]
							),
							React.createElement(
								'span',
								{ className: hourindex - 2 < 0 ? 'line4' : 'line1' },
								hourindex - 2 < 0 ? '' : hourarr[hourindex - 2]
							),
							React.createElement(
								'span',
								{ className: hourindex - 1 < 0 ? 'line4' : 'line2' },
								hourindex - 1 < 0 ? '' : hourarr[hourindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								hourarr[hourindex]
							),
							React.createElement(
								'span',
								{ className: hourindex + 1 >= hourarr.length ? 'line4' : 'line2' },
								hourindex + 1 >= hourarr.length ? '' : hourarr[hourindex + 1]
							),
							React.createElement(
								'span',
								{ className: hourindex + 2 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 2 >= hourarr.length ? '' : hourarr[hourindex + 2]
							),
							React.createElement(
								'span',
								{ className: hourindex + 3 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
							)
						),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
							React.createElement(
								'span',
								{ className: minuteindex - 3 < 0 ? 'line4' : 'line1' },
								minuteindex - 3 < 0 ? '' : minutearr[minuteindex - 3]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 2 < 0 ? 'line4' : 'line1' },
								minuteindex - 2 < 0 ? '' : minutearr[minuteindex - 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 1 < 0 ? 'line4' : 'line2' },
								minuteindex - 1 < 0 ? '' : minutearr[minuteindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								minutearr[minuteindex]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 1 >= minutearr.length ? 'line4' : 'line2' },
								minuteindex + 1 >= minutearr.length ? '' : minutearr[minuteindex + 1]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 2 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 2 >= minutearr.length ? '' : minutearr[minuteindex + 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
							)
						)
					),
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.cancelclock },
							'取消'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.submitclock },
							'确定'
						)
					)
				)
			);
		}
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 风扇主界面组件
	 * @prop {integer} temp  温度value值
	 * @prop {integer} humidity  湿度value值
	 * @prop {string} modeName  运行模式
	 * @prop {integer} windStall  运行速率
	 * @prop {integer} remainTime 剩余时间
	 * @prop {integer} devStatus 设备状态(1开2关)
	 * @prop {integer} clockId 定时模式(1为开启-显示剩余多少时间关闭,2为关闭-显示剩余多少时间开启)
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FanMain = undefined;

	var _Actions = __webpack_require__(2);

	var FanMain = exports.FanMain = React.createClass({
	    displayName: 'FanMain',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    setswitch: function setswitch(e) {
	        var type = e.currentTarget.getAttribute('data-type');
	        var value = void 0;
	        switch (type) {
	            case 'shake':
	                if (this.props.devStatus == 1) return;
	                value = this.props.shookHeadStatus == 1 ? 2 : 1;
	                _Actions.Actions.shakeSwitch(value);
	                break;
	            case 'power':
	                value = this.props.devStatus == 1 ? 2 : 1;
	                _Actions.Actions.switch(value);
	                break;
	            case 'clock':
	                // value = this.props.clockId==1?2:1;
	                if (this.props.clockId == 1 || this.props.clockId == 2) {
	                    value = 3;
	                } else {
	                    value = this.props.devStatus == 1 ? 2 : 1;
	                }
	                _Actions.Actions.clockSwitch(value);
	                break;
	            default:
	                break;
	        }
	    },
	    baseData: ['disable', 'off', 'on', 'disable'],
	    render: function render() {
	        var tempValue = this.props.temp ? this.props.temp + '℃' : '20℃';
	        var humidityValue = this.props.humidity ? this.props.humidity + '%' : '80%';
	        var modeName = this.props.modeName || '';
	        var rateValue = this.props.windStall || '0';
	        var remainTime = this.props.remainTime || 0;
	        var remainTimeH = parseInt(remainTime / 60);
	        var remainTimeM = parseInt(remainTime - remainTimeH * 60);
	        remainTimeH = remainTimeH < 10 ? '0' + remainTimeH : remainTimeH;
	        remainTimeM = remainTimeM < 10 ? '0' + remainTimeM : remainTimeM;
	        remainTime = remainTimeH + ':' + remainTimeM;
	        // console.log('remainTime',remainTime);;
	        var shookHeadStatus = this.props.shookHeadStatus || 1;
	        var devStatus = this.props.devStatus || 1;
	        var clockId = this.props.clockId || 3;
	        if (devStatus != 2) {
	            shookHeadStatus = 3;
	        }
	        return React.createElement(
	            'section',
	            { className: 'fanmain' },
	            React.createElement(
	                'section',
	                { className: 'weatherinfo' },
	                React.createElement(
	                    'label',
	                    { className: 'temp' },
	                    React.createElement('img', { src: '../static/img/smartFan/temp-icon.png' }),
	                    tempValue
	                ),
	                React.createElement(
	                    'label',
	                    { className: 'humidity' },
	                    React.createElement('img', { src: '../static/img/smartFan/humidity-icon.png' }),
	                    humidityValue
	                )
	            ),
	            React.createElement(
	                'section',
	                { className: 'faninfo' },
	                React.createElement('section', { className: 'faninfobg' })
	            ),
	            React.createElement(
	                'section',
	                { className: 'fantext' },
	                devStatus == 2 ? React.createElement(
	                    'span',
	                    null,
	                    React.createElement(
	                        'span',
	                        { className: 'modeName' },
	                        modeName,
	                        ' '
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'rateValue' },
	                        rateValue,
	                        '档 '
	                    )
	                ) : React.createElement(
	                    'span',
	                    { className: 'offline' },
	                    '关机 '
	                ),
	                clockId == 1 || clockId == 2 ? devStatus == 2 ? React.createElement(
	                    'span',
	                    null,
	                    React.createElement(
	                        'span',
	                        { className: 'rateValue' },
	                        remainTime
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'remainTime' },
	                        ' 后关闭风扇'
	                    )
	                ) : React.createElement(
	                    'span',
	                    null,
	                    React.createElement(
	                        'span',
	                        { className: 'remainTime' },
	                        '剩余 '
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'rateValue' },
	                        remainTime
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'remainTime' },
	                        '后开启风扇'
	                    )
	                ) : null
	            ),
	            React.createElement(
	                'section',
	                { className: 'clock' },
	                React.createElement(
	                    'div',
	                    { 'data-type': 'shake', onTouchEnd: this.setswitch, className: 'shake-' + this.baseData[shookHeadStatus] },
	                    React.createElement(
	                        'span',
	                        null,
	                        '摇头'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { 'data-type': 'power', onTouchEnd: this.setswitch, className: 'switch-' + this.baseData[devStatus] },
	                    React.createElement(
	                        'span',
	                        null,
	                        devStatus == 2 ? '关机' : '开机'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { 'data-type': 'clock', onTouchEnd: this.setswitch, className: 'clock-' + (clockId == 1 || clockId == 2 ? 'on' : 'off') },
	                    React.createElement(
	                        'span',
	                        null,
	                        '定时'
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 波浪云动画
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var WaveCloud = exports.WaveCloud = React.createClass({
	    displayName: 'WaveCloud',

	    getInitialState: function getInitialState() {
	        return {
	            seed: 20,
	            start_point: { x: -360, y: 70 },
	            control_point_1: { x: -200, y: 30 },
	            control_point_2: { x: -100, y: 50 },
	            control_point_3: { x: 100, y: 30 },
	            control_point_4: { x: 200, y: 50 },
	            end_point_1: { x: 0, y: 70 },
	            end_point_2: { x: 360, y: 70 },
	            start_points_x: [-300, -100, -200],
	            control_points_x_1: [-200, 0, -100],
	            control_points_x_2: [-100, 100, 0],
	            control_points_x_3: [100, 300, 200],
	            control_points_x_4: [200, 400, 300],
	            height_number: [10, 30, 50],
	            end_points_x_1: [0, 200, 100],
	            end_points_x_2: [300, 500, 400],
	            seeds: [0.5, -0.6, 0.3],
	            opacitys: [0.7, 0.5, 0.3],
	            dangerous_points: [0, 360, -360],
	            cloud_size_w: [26, 17, 12, 17, 22],
	            cloud_size_h: [17, 12, 8, 12, 14],
	            cloud_start_x: [20, 80, 150, 260, 300],
	            cloud_x: [20, 80, 150, 260, 300],
	            cloud_end_x: [50, 130, 240, 290, 320],
	            cloud_seeds: [0.3, 0.5, 0.6, 0.3, 0.2]
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        //初始化所需canvas以及图片 设置定时器
	        var drawing = document.querySelector('#wavecloud');
	        drawing.width = window.screen.width; //重置canvas宽度为百分百
	        var context = drawing.getContext('2d');
	        var arr = [];
	        for (var i = 1; i < 6; i++) {
	            var img = new Image();
	            img.src = "../static/img/smartFan/cloud" + i + ".png";
	            arr.push(img);
	        }
	        this.setState({
	            cloud_img: arr,
	            drawing: drawing,
	            context: context
	        });
	        var _this = this;
	        this.tanimation = setInterval(function () {
	            _this.drawWave();
	        }, 1000 / 60);
	    },
	    drawWave: function drawWave() {
	        //画波浪 2段贝塞尔弧线4个控制点 设置曲线参数
	        var start_point = this.state.start_point;
	        var control_point_1 = this.state.control_point_1;
	        var control_point_2 = this.state.control_point_2;
	        var control_point_3 = this.state.control_point_3;
	        var control_point_4 = this.state.control_point_4;
	        var end_point_1 = this.state.end_point_1;
	        var end_point_2 = this.state.end_point_2;

	        var start_points_x = this.state.start_points_x;
	        var control_points_x_1 = this.state.control_points_x_1;
	        var control_points_x_2 = this.state.control_points_x_2;
	        var control_points_x_3 = this.state.control_points_x_3;
	        var control_points_x_4 = this.state.control_points_x_4;
	        var end_points_x_1 = this.state.end_points_x_1;
	        var end_points_x_2 = this.state.end_points_x_2;
	        var seeds = this.state.seeds;
	        var opacitys = this.state.opacitys;
	        var dangerous_points = this.state.dangerous_points;
	        for (var i = 0; i < seeds.length; i++) {
	            var seed = seeds[i];
	            var start_point_x = start_points_x[i];
	            var end_point_x_1 = end_points_x_1[i];
	            var end_point_x_2 = end_points_x_2[i];

	            if (start_point_x >= dangerous_points[0] - seed || start_point_x <= dangerous_points[2] - seed) {
	                seeds[i] = -seed;
	            }

	            start_points_x[i] += seed;
	            control_points_x_1[i] += seed;
	            control_points_x_2[i] += seed;
	            control_points_x_3[i] += seed;
	            control_points_x_4[i] += seed;
	            end_points_x_1[i] += seed;
	            end_points_x_2[i] += seed;
	        }
	        var drawing = this.state.drawing;
	        var context = this.state.context;
	        context.clearRect(0, 0, drawing.width, drawing.height);
	        var randomnumber = this.state.height_number;
	        for (var j = 0; j < this.state.seeds.length; j++) {
	            this.drawBezierCurveLine(start_points_x[j], control_points_x_1[j], control_points_x_2[j], control_points_x_3[j], control_points_x_4[j], end_points_x_1[j], end_points_x_2[j], opacitys[j], randomnumber[j]);
	        }
	        this.drawCloud();
	    },
	    drawCloud: function drawCloud() {
	        //画云 5片云朵 设置云朵移动参数
	        var drawing = this.state.drawing;
	        var context = this.state.context;
	        var cloud_size_w = this.state.cloud_size_w;
	        var cloud_size_h = this.state.cloud_size_h;
	        var cloud_x = this.state.cloud_x;
	        var cloud_start_x = this.state.cloud_start_x;
	        var cloud_end_x = this.state.cloud_end_x;
	        var seeds = this.state.cloud_seeds;
	        for (var j = 0; j < cloud_start_x.length; j++) {
	            var seed = seeds[j];
	            if (cloud_x[j] >= cloud_end_x[j] - seed || cloud_x[j] <= cloud_start_x[j] - seed) {
	                seeds[j] = -seed;
	            }
	            cloud_x[j] += seed;
	        }
	        var img = this.state.cloud_img;
	        for (var i = 1; i < 6; i++) {
	            context.drawImage(img[i - 1], cloud_x[i - 1], 30 - cloud_size_h[i - 1], cloud_size_w[i - 1], cloud_size_h[i - 1]);
	        }
	    },
	    drawBezierCurveLine: function drawBezierCurveLine(spx, cpx1, cpx2, cpx3, cpx4, epx1, epx2, opacity, hn) {
	        //根据传入的参数画贝塞尔曲线
	        var drawing = this.state.drawing;
	        var context = this.state.context;
	        context.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
	        context.fillStyle = 'rgba(255,255,255,' + opacity + ')';
	        context.save();
	        context.beginPath();
	        context.moveTo(spx, 70);
	        context.bezierCurveTo(cpx1, 30 + hn, cpx2, 50 - hn, epx1, 70);
	        context.bezierCurveTo(cpx3, 30 + hn, cpx4, 50 - hn, epx2, 70);
	        context.closePath();
	        context.restore();
	        context.stroke();
	        context.fill();
	    },
	    render: function render() {
	        return React.createElement(
	            'section',
	            { className: 'animation' },
	            React.createElement('canvas', { id: 'wavecloud', width: '360', height: '70' })
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 进度条组件
	 * @prop {boolean} rangedisable  滑动条是否可用
	 * @prop {integer} windStall  	运行速率，取值0-92
	 * @prop {integer} rate  		每档间隔值 用来确定档位范围
	 * @act  Actions.selectRate([integer])  切换档位时触发
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Range = undefined;

	var _Actions = __webpack_require__(2);

	var Range = exports.Range = React.createClass({
		displayName: 'Range',

		getInitialState: function getInitialState() {
			return {};
		},
		rangechange: function rangechange(e) {
			//处理滑动更改档位
			if (this.props.rangedisable) return;
			var windStall = parseInt(e.target.value) + parseInt(this.props.rate);
			if (windStall == this.props.windStall * this.props.rate) return;
			windStall = parseInt(windStall / this.props.rate);
			if (windStall == this.props.windStall) return;
			_Actions.Actions.selectRateValue(windStall);
		},
		changerate: function changerate(e) {
			//处理按钮加减更改档位
			if (this.props.rangedisable) return;
			var type = e.target.getAttribute('data-type');
			if (type == 'minus') {
				var value = parseInt(this.props.windStall * this.props.rate) - this.props.rate;
				if (value <= 0) {
					return;
				} else {
					value = parseInt(value / this.props.rate);
					_Actions.Actions.selectRate(value);
				}
			} else if (type == 'plus') {
				var _value = parseInt(this.props.windStall * this.props.rate) + parseInt(this.props.rate);
				if (_value > 92 + parseInt(this.props.rate)) {
					return;
				} else {
					_value = parseInt(_value / this.props.rate);
					_Actions.Actions.selectRate(_value);
				}
			}
		},
		rangeTouchEnd: function rangeTouchEnd(e) {
			if (this.props.rangedisable) return;
			var windStall = parseInt(e.target.value) + parseInt(this.props.rate);
			windStall = parseInt(windStall / this.props.rate);
			_Actions.Actions.selectRate(windStall);
		},

		render: function render() {
			var statusId = this.props.rangedisable;
			var rangevalue = (this.props.windStall - 1) * this.props.rate || '0';
			var windStall = parseInt(this.props.windStall);
			var fblock = parseInt(rangevalue / 0.92) + '%';
			return React.createElement(
				'section',
				{ className: 'range' },
				React.createElement('a', { className: statusId ? 'minus-off' : 'minus-on', 'data-type': 'minus', onTouchEnd: this.changerate, href: 'javascript:void(0)' }),
				React.createElement(
					'section',
					{ className: 'rangeblock' },
					React.createElement(
						'section',
						{ className: statusId ? 'tips-off' : 'tips-on', style: { left: fblock, marginLeft: '-' + rangevalue * 0.018 - 0.48 + 'rem' } },
						React.createElement(
							'span',
							{ className: 'ratetext' },
							windStall,
							'档'
						)
					),
					React.createElement('input', { type: 'range', value: rangevalue, min: '0', max: '92', className: 'rangevalue', onChange: this.rangechange, onTouchEnd: this.rangeTouchEnd }),
					React.createElement('span', { className: 'slider-runnable-track ' + (statusId ? 'slider-off' : 'slider-on') }),
					React.createElement('span', { className: statusId ? 'rangeblock-off' : 'rangeblock-on', style: { left: fblock, marginLeft: '-' + rangevalue * 0.018 + 'rem' } })
				),
				React.createElement('a', { className: statusId ? 'plus-off' : 'plus-on', 'data-type': 'plus', onTouchEnd: this.changerate, href: 'javascript:void(0)' })
			);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 标准风/自然风/睡眠风/智能风/采集风
	 * @prop {integer} windType  模式索引，与id对应。取值1-5，超出范围默认为6
	 * @act  Actions.selectMode([integer])  切换模式时触发该动作
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Modes = undefined;

	var _Actions = __webpack_require__(2);

	var Modes = exports.Modes = React.createClass({
	    displayName: 'Modes',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    items: [{ id: 1, name: "标准风" }, { id: 2, name: "自然风" }, { id: 3, name: "睡眠风" }, { id: 4, name: "智能风" }, { id: 5, name: "采集风" }],
	    handlerClick: function handlerClick(e) {
	        var index = e.currentTarget.getAttribute('data-value');
	        if (index == this.props.windType) return;
	        _Actions.Actions.selectMode(index);
	    },
	    render: function render() {
	        var idx = this.props.windType || 6;
	        return React.createElement(
	            'section',
	            { className: 'modes flex' },
	            this.items.map(function (o) {
	                if (this.props.modedisable) {
	                    return React.createElement(
	                        'dl',
	                        { className: 'flex-cell', key: o.id },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: "../static/img/smartFan/mode" + o.id + "-disable.png" })
	                        ),
	                        React.createElement(
	                            'dt',
	                            null,
	                            o.name
	                        )
	                    );
	                } else {
	                    return React.createElement(
	                        'dl',
	                        { className: 'flex-cell', key: o.id, 'data-value': o.id, onTouchEnd: this.handlerClick },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: idx == o.id ? "../static/img/smartFan/mode" + o.id + "-on.png" : "../static/img/smartFan/mode" + o.id + "-off.png" })
	                        ),
	                        React.createElement(
	                            'dt',
	                            null,
	                            o.name
	                        )
	                    );
	                }
	            }.bind(this))
	        );
	    }
	});

/***/ }
/******/ ]);