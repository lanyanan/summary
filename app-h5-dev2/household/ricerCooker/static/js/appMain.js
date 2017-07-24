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
	'getData', //运行数据初始化界面
	'tasteChoose', //口感选择
	'tasteSwitch', //口感取消
	//'clockSwitch',//定时取消
	'selectTime', //定时确认
	'workStyle', //确定烹饪模式
	'calWork', //退出工作模式，进入待机状态
	'modeStart', //启动烹饪模式，进入烹饪状态
	'willStart', //烹饪预约模式
	'setTmep', //烹饪完毕进入保温模式
	'workPattern', //预约倒计时完毕进入烹饪模式
	'setPattern', //设置清洗模式与保温模式
	'handleShakeSwitch' //appBtnList选择模式
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

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var AppData = {};
	var OldData = {};
	//判断设备是否离线
	var isOffline = function isOffline() {
	    return AppData.online == 2;
	};
	// 判断是否关机状态
	// const isShutdown = ()=>{
	//     return (AppData.bootMode==16);
	// };
	//判断手机是否断网
	var isNetOff = function isNetOff() {
	    return AppData.networkavailable == 2;
	};
	var decToHex = function decToHex(dec) {
	    var hex = parseInt(dec).toString(16);
	    return hex.length === 1 ? '0' + hex : hex;
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        // if(typeof data.OperationWorkMode!=="undefined"&&data.OperationWorkMode !== AppData.OperationWorkMode) alert(JSON.stringify(data));
	        AppData = _fun.Funs._extends(AppData, data);
	        console.log(location.href + data.OperationWorkMode + data.FuntionSelect);
	        // let errormsg = [];
	        // if(data.TopNTCShort==1)  errormsg.push('xuesheng:顶部发热丝短路');
	        // if(data.TopNTCOpen==1) errormsg.push('xuesheng:顶部发热开路');
	        // if(data.BottomNTCShort==1)errormsg.push('底部发热丝短路');
	        // if(data.BottomNTCOpen==1)errormsg.push('底部发热开路');
	        // if(data.HighTemperature==1)errormsg.push('高温保护');
	        // if(errormsg.length>0&&data.HighTemperature==0) {het.toast(errormsg.join(';'));}
	        // if(errormsg.length>0&&data.HighTemperature==1){het.toast('xuesheng:高温保护');}

	        // if(data.WorkReturnTimeHour)AppData.WorkReturnTimeHour=data.WorkReturnTimeHour;
	        // if(data.WorkReturnTimeMinute)AppData.WorkReturnTimeMinute=data.WorkReturnTimeMinute;
	        // if(data.OperationWorkMode)AppData.OperationWorkMode=data.OperationWorkMode;
	        //    if(data.PresetTimehour)AppData.PresetTimehour=data.PresetTimehour;
	        //    if(data.PresetTimeMinute)AppData.PresetTimeMinute=data.PresetTimeMinute;
	        //    if(data.KouGanSheZhi)AppData.KouGanSheZhi=data.KouGanSheZhi;
	        //    if(data.FuntionSelect)AppData.FuntionSelect=data.FuntionSelect;
	        //    if(data.status)AppData.status=data.status;
	        //    if(data.PresetTimeHour)AppData.PresetTimeHour=data.PresetTimeHour;
	        //    if(data.PresetTimeMinute)AppData.PresetTimeMinute=data.PresetTimeMinute;
	        //    if(data.PresetSet)AppData.PresetSet=data.PresetSet;
	        //    if(data.networkavailable)AppData.networkavailable=data.networkavailable;
	        //    if(data.online)AppData.online=data.online;
	        //    if(data.TopNTCShort)AppData.TopNTCShort=data.TopNTCShort;
	        //    if(data.HighTemperature)AppData.HighTemperature=data.HighTemperature;
	        this.trigger(data);
	    },

	    // onTasteSwitch(){
	    // 	AppData.Index = 2;
	    // 	this.trigger({Index:2})
	    // },
	    onTasteChoose: function onTasteChoose(index) {
	        AppData.tasteIndex = index;
	        this.trigger({ tasteIndex: AppData.tasteIndex });
	        AppData.KouGanSheZhi = index;
	    },

	    //   onClockSwitch(hour,minute){
	    //       if(hour==0&& minute== 0){
	    //       	AppData.hourIndex=0;
	    //       	AppData.minuteIndex=0;
	    //       	this.trigger({hourIndex:AppData.hourIndex,minuteIndex:AppData.minuteIndex});
	    // }
	    //   },
	    onSelectTime: function onSelectTime(hour, minute) {
	        AppData.hour = hour;
	        AppData.minute = minute;
	        this.trigger({ hour: AppData.hour, minute: AppData.minute });
	    },
	    onGetData: function onGetData() {
	        this.trigger(AppData);
	    },
	    onWorkStyle: function onWorkStyle(i) {
	        AppData.workIndex = i;
	        this.trigger({ workIndex: i });
	    },
	    onCalWork: function onCalWork() {
	        var _trigger;

	        AppData.workIndex = null;
	        AppData.status = 0;
	        AppData.OperationWorkMode = 0;
	        AppData.hour = null;
	        AppData.minute = null;
	        AppData.PresetTimehour = 0;
	        AppData.PresetTimeMinute = 0;
	        AppData.KouGanSheZhi = 0;
	        AppData.contentIndex = 0;
	        AppData.temperHour = 0;
	        AppData.temperMinute = 0;
	        AppData.PresetSet = 0;
	        AppData.FuntionSelect = 0;
	        AppData.WorkReturnTimeHour = 0;
	        AppData.WorkReturnTimeMinute = 0;
	        AppData.PresetTimeHour = 0;
	        AppData.PresetTimeMinute = 0;
	        AppData.updateFlag = het.hexUpFlag(5, 1, 2, het.hexUpFlag(0, 1, 2));
	        // AppData.updateFlag=het.hexUpFlag(5,1,2)
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        this.trigger((_trigger = { workIndex: AppData.workIndex, status: AppData.status, OperationWorkMode: AppData.OperationWorkMode, hour: AppData.hour, minute: AppData.minute, contentIndex: 0, temperHour: AppData.temperHour, temperMinute: AppData.temperMinute, PresetTimeMinute: AppData.PresetTimehour }, _defineProperty(_trigger, 'PresetTimeMinute', AppData.PresetTimeMinute), _defineProperty(_trigger, 'PresetSet', AppData.PresetSet), _defineProperty(_trigger, 'FuntionSelect', AppData.FuntionSelect), _defineProperty(_trigger, 'WorkReturnTimeHour', AppData.WorkReturnTimeHour), _defineProperty(_trigger, 'WorkReturnTimeMinute', AppData.WorkReturnTimeMinute), _defineProperty(_trigger, 'PresetTimeHour', AppData.PresetTimeHour), _defineProperty(_trigger, 'PresetTimeMinute', AppData.PresetTimeMinute), _trigger));
	    },
	    onModeStart: function onModeStart(workIndex, tasteIndex) {
	        AppData.status = 1;
	        AppData.contentIndex = 1;
	        AppData.PresetTimehour = 0;
	        AppData.PresetTimeMinute = 0;
	        AppData.PresetSet = 0;
	        AppData.FuntionSelect = workIndex;
	        AppData.KouGanSheZhi = '0' + tasteIndex;
	        this.trigger({ status: AppData.status, contentIndex: AppData.contentIndex }); //为烹饪模式的UI界面
	        this.trigger(AppData);
	        //AppData.updateFlag = het.hexUpFlag(0,1,1,het.hexUpFlag(5,1,1));
	        if (workIndex == 5) {
	            AppData.updateFlag = het.hexUpFlag(5, 1, 2, het.hexUpFlag(0, 1, 2));
	        } else {
	            AppData.updateFlag = het.hexUpFlag(5, 1, 2);
	        }

	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onWillStart: function onWillStart(hour, minute, workIndex, tasteIndex) {
	        AppData.status = 1;
	        AppData.contentIndex = 4;
	        AppData.FuntionSelect = workIndex;
	        AppData.PresetSet = 1;
	        AppData.PresetTimehour = hour;
	        AppData.PresetTimeMinute = minute;
	        AppData.KouGanSheZhi = tasteIndex;
	        this.trigger({ status: AppData.status, contentIndex: AppData.contentIndex }); //为预约烹饪模式
	        this.trigger(AppData);
	        AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2, het.hexUpFlag(2, 1, 2, het.hexUpFlag(5, 1, 2, het.hexUpFlag(6, 1, 2)))));
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSetTmep: function onSetTmep() {
	        AppData.OperationWorkMode = 1;
	        AppData.status = 0;
	        AppData.contentIndex = 0;
	        this.trigger({
	            OperationWorkMode: AppData.OperationWorkMode,
	            status: AppData.status,
	            contentIndex: AppData.contentIndex
	        });
	    },

	    // onWorkPattern(index){
	    //     AppData.OperationWorkMode=index;
	    //     AppData.status=0;
	    //     this.trigger({OperationWorkMode:AppData.OperationWorkMode,
	    //                   status:AppData.status  
	    //     })
	    // },
	    onSetPattern: function onSetPattern(index) {
	        AppData.FuntionSelect = index;
	        this.trigger({ FuntionSelect: AppData.FuntionSelect });
	        AppData.updateFlag = het.hexUpFlag(5, 1, 2);
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onHandleShakeSwitch: function onHandleShakeSwitch(type) {
	        AppData.FuntionSelect = type;
	        AppData.OperationWorkMode = type;
	        if (type == 5) {
	            AppData.KouGanSheZhi = 3;
	            AppData.updateFlag = het.hexUpFlag(5, 1, 2, het.hexUpFlag(0, 1, 2));
	        }
	        AppData.updateFlag = het.hexUpFlag(5, 1, 2);
	        this.trigger({ OperationWorkMode: AppData.OperationWorkMode });
	        this.trigger(AppData);
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

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _Selector = __webpack_require__(9);

	var _Pattern = __webpack_require__(10);

	var _Taste = __webpack_require__(11);

	var _TimeSelect = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';

	//import {Tip} from './Tip.es6';
	//import {Content} from './Content.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {},
	        renderConfigData: true
	    });
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

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            contentIndex: 0, //默认为待机模式
	            status: 0,
	            temperHour: 0,
	            temperMinute: 0 //默认保温的初始时间
	        };

	        _this.listenStore(_Store.Store); // 监听Store
	        _this.changeIndex = _this.changeIndex.bind(_this);
	        _this.componentWillMount = _this.componentWillMount.bind(_this);
	        het.setTitle(JSON.stringify({ setNavTitle: 0, title: '模式', setNavRightBtnHiden: 0 }));
	        return _this;
	    }
	    // componentDidUpdate(prevProps, prevState) {
	    //     if(this.state.status==1&&this.state.contentIndex!=1&&this.state.contentIndex!=0)//预约烹饪模式的倒计时
	    //  	{
	    //    	let _this = this;
	    //     clearInterval(this.tclock);
	    //     this.tclock = setInterval(function(){_this.timeclock()},60000);
	    //    }
	    // let isTrue=(this.state.status==1&&this.state.contentIndex==1&&(this.state.workIndex==2||this.state.workIndex==undefined))||(this.state.OperationWorkMode==6&&this.state.status==0);
	    //  if(isTrue)//蒸饭模式的倒计时
	    //    { 
	    //     let _this = this;
	    //     clearInterval(this.tclock);
	    //     this.tclock = setInterval(function(){_this.timeclock1()},500);
	    //    }
	    //   if(this.state.OperationWorkMode==1||this.state.contentIndex==2)
	    //     {
	    //     let _this = this;
	    //     clearInterval(this.tclock);
	    //     this.tclock = setInterval(function(){_this.timeclock2()},100);
	    //    }

	    // } 
	    // timeclock(){
	    //     let hour=this.state.hour;
	    //     let minute=this.state.minute;
	    //     let Index1=this.state.workIndex ? this.state.workIndex :2;
	    //    let Index=Index1+4;
	    //     hour=(0<hour&&hour<10) ? 0+hour:hour;
	    //     minute=(0<minute&&minute<10) ? 0+minute:minute;
	    //     clearInterval(this.tclock);
	    //     if (hour>=0 || minute>0){
	    //         minute -= 1;
	    //        if(minute<=0){
	    //            minute = 59;
	    //            hour -=1;
	    //            if(hour<0)
	    //            {
	    // clearInterval(this.tclock);
	    //             Actions.workPattern(Index);//预约倒计时完毕自动进入烹饪模式
	    //             console.log(Index+'22222')

	    //   }
	    //         }
	    //         this.setState({
	    //         	hour:hour,
	    //         	minute:minute
	    //         })

	    //       }
	    // }
	    // timeclock1(){
	    //     let hour=this.state.WorkReturnTimeHour==undefined ?'00' :this.state.WorkReturnTimeHour;
	    //     let minute=this.state.WorkReturnTimeMinute==undefined ? '40' :this.state.WorkReturnTimeMinute;
	    //     clearInterval(this.tclock);
	    //     if (hour>=0 || minute>0){
	    //         minute -= 1;

	    //        if(minute<=0){
	    //            minute = 59;
	    //            hour -=1;
	    //            if(hour<0)
	    //            {
	    //             clearInterval(this.tclock);
	    //             Actions.setTmep();//烹饪倒计时完成后进入保温模式;

	    //            }
	    //         }
	    //         this.setState({
	    //             WorkReturnTimeHour:hour,
	    //             WorkReturnTimeMinute:minute
	    //         })

	    //       }
	    // }
	    // timeclock2(){

	    //      let hour3=this.state.temperHour;
	    //      let minute3=this.state.temperMinute;
	    //      clearInterval(this.tclock);
	    //         if(hour3<=23){
	    //          minute3 +=1;
	    //          if(minute3>59){
	    //             minute3=0;
	    //             hour3 +=1;
	    //          }
	    //           if(hour3>23){
	    //             clearInterval(this.tclock);
	    //             this.setState({
	    //                 contentIndex:0
	    //             })
	    //             }
	    //         }
	    //         this.setState({
	    //         temperMinute: minute3,
	    //         temperHour:hour3
	    //      });

	    // }


	    _createClass(App, [{
	        key: 'changeIndex',
	        value: function changeIndex(index) {
	            this.setState({ contentIndex: index });
	            //console.log(index);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _Actions.Actions.getData();
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            var TopShort = this.state.TopNTCShort !== nextState.TopNTCShort && nextState.TopNTCShort == 1;
	            var TopOpen = this.state.TopNTCOpen !== nextState.TopNTCOpen && nextState.TopNTCOpen == 1;
	            var BotShort = this.state.BottomNTCShort !== nextState.BottomNTCShort && nextState.BottomNTCShort == 1;
	            var BotOpen = this.state.BottomNTCOpen !== nextState.BottomNTCOpen && nextState.BottomNTCOpen == 1;
	            var HiTem = this.state.HighTemperature !== nextState.HighTemperature && nextState.HighTemperature == 1;
	            if (TopShort && !TopOpen && !BotShort && !BotOpen && !HiTem) het.toast(JSON.stringify({ contactService: '顶部发热丝短路', tel: '400-777-2009' }));
	            if (TopOpen && !TopShort && !BotShort && !BotOpen && !HiTem) het.toast(JSON.stringify({ contactService: '顶部发热丝开路', tel: '400-777-2009' }));
	            if (BotShort && !TopShort && !TopOpen && !BotOpen && !HiTem) het.toast(JSON.stringify({ contactService: '底部发热丝短路', tel: '400-777-2009' }));
	            if (BotOpen && !TopShort && !TopOpen && !BotShort && !HiTem) het.toast(JSON.stringify({ contactService: '底部发热丝开路', tel: '400-777-2009' }));
	            if (HiTem && !TopShort && !TopOpen && !BotShort && !BotOpen) het.toast(JSON.stringify({ contactService: '高温保护', tel: '400-777-2009' }));
	            if (TopShort && BotShort) het.toast(JSON.stringify({ contactService: '1、顶部发热丝短路 2、底部发热丝短路', tel: '400-777-2009' }));
	            if (TopShort && BotOpen) het.toast(JSON.stringify({ contactService: '1、顶部发热丝短路 2、底部发热丝开路', tel: '400-777-2009' }));
	            if (TopOpen && BotShort) het.toast(JSON.stringify({ contactService: '1、顶部发热丝开路 2、底部发热丝短路', tel: '400-777-2009' }));
	            if (TopOpen && BotOpen) het.toast(JSON.stringify({ contactService: '1、顶部发热丝开路 2、底部发热丝开路', tel: '400-777-2009' }));
	            if (HiTem && TopShort) het.toast(JSON.stringify({ contactService: '1、顶部发热丝短路 2、高温保护', tel: '400-777-2009' }));
	            if (HiTem && TopOpen) het.toast(JSON.stringify({ contactService: '1、顶部发热丝开路 2、高温保护', tel: '400-777-2009' }));
	            if (HiTem && BotShort) het.toast(JSON.stringify({ contactService: '1、底部发热丝短路 2、高温保护', tel: '400-777-2009' }));
	            if (HiTem && BotOpen) het.toast(JSON.stringify({ contactService: '1、底部发热丝开路 2、高温保护', tel: '400-777-2009' }));
	            //设备故障处理
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            // console.log(this.state.PresetSet+'预约');
	            // console.log(this.state.OperationWorkMode+'工作模式')
	            // console.log(this.state.FuntionSelect+'控制数据');
	            // if(this.state. TopNTCShort==1||this.state.HighTemperature==1)het.toast("xuesheng:1、上传感器短路 2、传感器超温");
	            var textMessage = void 0,
	                workStyle = void 0,
	                bgStyle = void 0; //分别显示实时工作模式、预报工作时长
	            var workIndex = this.state.workIndex;
	            var contentArr1 = ['待机中', '烹饪中', '保温中', '清洗中', '预约中'];
	            var contentArr2 = ['待机中', '保温中', '清洗中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中', '烹饪中'];
	            var textMessage1 = contentArr1[this.state.contentIndex];
	            var textMessage2 = contentArr2[this.state.OperationWorkMode || this.state.FuntionSelect];
	            var textMessage3 = (this.state.OperationWorkMode == null || this.state.OperationWorkMode == 0) && this.state.FuntionSelect != 0 ? textMessage1 : textMessage2;
	            // let textMessage4=(this.state.OperationWorkMode==0&&this.state.contentIndex!=0) ? textMessage2 : textMessage1;
	            var messageArr1 = ['', '', '保温时长', ''];
	            var messageArr2 = ['', '保温时长', '', "蒸鱼", "蒸肉", "蒸饭", "蒸土豆", "热饭", '蒸包子', "蒸馒头", "蒸玉米", '蒸红薯', "蒸糕点", "蟹类", "虾类", "贝类", "蒸蛋"];
	            var messageArr3 = ['', "蒸饭", "蒸肉", "蒸鱼", "蒸土豆", "热饭", '蒸包子', "蒸馒头", "蒸玉米", '蒸红薯', "蒸糕点", "蟹类", "虾类", "贝类", "蒸蛋"];
	            var workStyle1 = messageArr1[this.state.contentIndex]; //控制保温、清洗模式
	            var workStyle2 = messageArr2[this.state.OperationWorkMode || this.state.FuntionSelect]; //根据运行数据的运行模式
	            var workStyle3 = messageArr3[this.state.workIndex == undefined ? 1 : this.state.workIndex + 1]; //预约烹饪模式
	            var bgcolorArr = [{ background: '#59b30f' }, { background: 'blue' }, { background: '#ff9933' }, { background: '#3399ff' }, { background: 'blue' }];
	            var runColorArr = [{ background: '#59b30f' }, { background: '#ff9933' }, { background: '#3399ff' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }, { background: 'blue' }];
	            var bgStyle1 = (this.state.OperationWorkMode == null || this.state.OperationWorkMode == 0) && this.state.FuntionSelect != 0 ? bgcolorArr[this.state.contentIndex] : runColorArr[this.state.OperationWorkMode || this.state.FuntionSelect]; //不是预约模式title的背景颜色
	            // let bgStyle2=(this.state.OperationWorkMode==0) ? runColorArr[this.state.OperationWorkMode] : bgcolorArr[this.state.contentIndex];//接受运行进入待机状态
	            //let orderHour1=this.state.hour==0 ? '00' :this.state.hour;
	            //let orderMinute1=(this.state.minute>0&&this.state.minute<10) ? '0'+this.state.minute : this.state.minute;
	            // let bgStyle1=bgcolorArr[this.state.contentIndex];
	            // let bgStyle2=runColorArr[this.state.OperationWorkMode];
	            //let orderMinute=(0<this.state.PresetTimeMinute&&this.state.PresetTimeMinute<10)? '0'+this.state.PresetTimeMinute : this.state.PresetTimeMinute;
	            var orderMinute = this.state.PresetTimeMinute == 0 ? '00' : this.state.PresetTimeMinute;
	            //let orderHour=(0<this.state.PresetTimehour&&this.state.PresetTimehour<10)? '0'+this.state.PresetTimehour : this.state.PresetTimehour;
	            var receiveTime = 0 < this.state.PresetTimeHour && this.state.PresetTimeHour < 10 || this.state.PresetTimeHour == 0 ? '0' + this.state.PresetTimeHour : this.state.PresetTimeHour;
	            var orderHour1 = this.state.PresetTimeHour != 0 && this.state.PresetTimeHour != undefined ? receiveTime : this.state.PresetTimehour;
	            //let orderHour=((0<orderHour1||orderHour1==0)&&orderHour1<10&&this.state.PresetTimeHour!=undefined) ? orderHour1 : orderHour1;
	            var workTime1 = orderHour1 + ':' + orderMinute; //设置预约烹饪模式显示的时间
	            //let workTime2=this.state.temperHour+":"+this.state.temperMinute;//设置保温模式显示的时间
	            var thour = this.state.WorkReturnTimeHour ? this.state.WorkReturnTimeHour : this.state.temperHour;
	            var tminute = this.state.WorkReturnTimeMinute ? this.state.WorkReturnTimeMinute : this.state.temperMinute;
	            var workTime2 = (thour >= 0 && thour < 10 ? '0' + thour : thour) + ':' + (tminute >= 0 && tminute < 10 ? '0' + tminute : tminute); //保温状态显示保温的时间;
	            var isTrue = this.state.WorkReturnTimeHour == 0 && this.state.WorkReturnTimeMinute == 0;
	            var Hour = this.state.WorkReturnTimeHour == undefined || isTrue ? '0' : this.state.WorkReturnTimeHour;
	            var Minute = this.state.WorkReturnTimeMinute == undefined || isTrue ? '40' : this.state.WorkReturnTimeMinute;
	            var workHour = (0 < Hour || Hour == 0) && Hour < 10 ? '0' + Hour : Hour;
	            var workMinute = 0 < Minute && Minute < 10 ? '0' + Minute : Minute;
	            var workTime3 = workHour + ':' + workMinute; //蒸饭模式下显示的时间
	            //let workTime3=cleanHour+':'+cleanMinute;
	            var workTime4 = ''; //设置清洗模式不显示时间
	            var workTime = void 0;

	            if (this.state.PresetSet == 1) //为预约烹饪模式
	                {
	                    if (this.state.status == 0 && this.state.OperationWorkMode != null) {
	                        workStyle = workStyle2;
	                    }; //为运行数据渲染预约模式
	                    if (this.state.status == 1 && this.state.OperationWorkMode == null) {
	                        workStyle = workStyle3;
	                    }; //为控制数据渲染预约模式 
	                    if (this.state.status == 1 && this.state.OperationWorkMode == null) {
	                        workTime = workTime1;
	                    }; //设置预约烹饪模式显示的时间;
	                    if (this.state.status == 1 && this.state.OperationWorkMode != null && this.state.FuntionSelect != 0) {
	                        workStyle = workStyle3;workTime = workTime1;
	                    }; //
	                    if (this.state.status == 0 && this.state.OperationWorkMode != null && this.state.FuntionSelect != 0) {
	                        workTime = workTime1;workStyle = workStyle3;
	                    }; //接受预约烹饪模式显示的时间
	                    workTime = workTime1;
	                    textMessage = '预约中';
	                    bgStyle = { background: 'blue' };
	                }
	            if (this.state.PresetSet == 0 && this.state.OperationWorkMode == 5 && (this.state.FuntionSelect == 0 || this.state.FuntionSelect == undefined)) {
	                textMessage = '待机';
	                bgStyle = { background: '#59b30f' };workTime = workTime4;workStyle = "";
	            } //防止从APP首页进入index页造成UI渲染混乱
	            if (this.state.PresetSet == 0 || this.state.PresetSet == undefined) //不设置预约烹饪模式
	                {
	                    if (this.state.status == 0 && this.state.OperationWorkMode != null && this.state.FuntionSelect !== null) {
	                        workStyle = workStyle2;
	                    } //为运行数据渲染工作模式
	                    if (this.state.status == 1 && (this.state.OperationWorkMode == null || this.state.OperationWorkMode == 0) && this.state.FuntionSelect != 0) {
	                        workStyle = workStyle3;
	                    } //为控制数据渲染烹饪工作模式
	                    if (this.state.status == 1 && this.state.OperationWorkMode != 0 && this.state.OperationWorkMode != null) {
	                        workStyle = workStyle2;
	                    }; //运行数据渲染烹饪工作模式;
	                    if (this.state.status == 0 && (this.state.OperationWorkMode == null || this.state.OperationWorkMode == 0)) {
	                        workStyle = workStyle1;
	                    }; //选择保温、清洗模式

	                    if (this.state.status == 0 && this.state.OperationWorkMode == 5 && this.state.FuntionSelect == 5) {
	                        workTime = workTime3;
	                    }; //运行蒸饭模式显示的时间；
	                    if (this.state.status == 0 && this.state.OperationWorkMode != null && this.state.OperationWorkMode != 5 && this.state.OperationWorkMode != 0 && this.state.OperationWorkMode != 1 && this.state.OperationWorkMode != 2 && this.state.OperationWorkMode !== undefined) {
	                        workTime = workTime2;
	                    }; //其他运行烹饪模式显示正计时
	                    if (this.state.status == 1 && (this.state.workIndex != 0 || this.state.workIndex != undefined) && this.state.FuntionSelect != 1 && this.state.FuntionSelect != 2) {
	                        workTime = workTime2;
	                    }; //控制其他烹饪模式显示的正计时
	                    if (this.state.status == 1 && (this.state.workIndex == 0 || this.state.workIndex == undefined)) {
	                        workTime = workTime3;
	                    }; //控制模式下蒸饭模式显示的时间
	                    textMessage = this.state.status == 0 && this.state.OperationWorkMode == null && this.state.FuntionSelect == 0 ? contentArr1[0] : textMessage3;
	                    bgStyle = bgStyle1;
	                    if (this.state.FuntionSelect == 1 || this.state.FuntionSelect == 2) textMessage = textMessage2;bgStyle = runColorArr[this.state.OperationWorkMode || this.state.FuntionSelect];
	                }
	            if (this.state.PresetSet == 0 && this.state.OperationWorkMode == 5 && (this.state.FuntionSelect == 0 || this.state.FuntionSelect == undefined)) {
	                textMessage = '待机';
	                bgStyle = { background: '#59b30f' };workTime = workTime4;workStyle = "";
	            } //防止从APP首页进入index页造成UI渲染混乱
	            if (this.state.status == 0 && (this.state.OperationWorkMode == null || this.state.OperationWorkMode == 0)) {
	                workStyle = workStyle2;
	            }; //选择保温、清洗模式
	            if ((this.state.contentIndex == 2 || this.state.contentIndex == 3) && this.state.FuntionSelect != 0 && this.state.OperationWorkMode != 0) {
	                textMessage = this.state.FuntionSelect == 1 || this.state.FuntionSelect == 2 ? textMessage2 : textMessage3;
	            }
	            if (this.state.status == 0 && this.state.FuntionSelect != 0 && this.state.FuntionSelect != null && this.state.FuntionSelect != 2 && this.state.PresetSet != 1) {
	                textMessage = textMessage2;workTime = workTime2;
	            } //硬件控制APP运行渲染
	            if (this.state.status == 1 && (this.state.FuntionSelect == 1 || this.state.FuntionSelect == 2)) {
	                workStyle = workStyle1;
	            }; //选择保温、清洗模式
	            if (this.state.OperationWorkMode == 0 && this.state.FuntionSelect == 0) {
	                workStyle = workStyle2;bgStyle = bgStyle1;textMessage = textMessage3;
	            }; //清洗模式完毕后进入待机模式 
	            if (this.state.OperationWorkMode == 0 && this.state.FuntionSelect == 0 && this.state.status == 1) {
	                workStyle = workStyle2;bgStyle = bgStyle1;textMessage = textMessage3;
	            }; //避免客户进入pattern模式后回退到首页引起的页面混乱
	            if (this.state.OperationWorkMode == 1 || this.state.FuntionSelect == 1 || this.state.contentIndex == 2 && this.state.FuntionSelect == 1) {
	                workTime = workTime2;
	            }; //保温模式下显示的计时;
	            if (this.state.status == 1 && this.state.FuntionSelect == 1) {
	                workTime = workTime2;
	            }; //保温模式下显示的计时;
	            if (this.state.status == 1 && this.state.FuntionSelect == 2) {
	                workTime = workTime4;
	            }; //清洗模式下不显示计时；
	            if (this.state.status == 1 && this.state.OperationWorkMode == 0 && this.state.FuntionSelect == 0) {
	                workTime = workTime4;
	            } //烹饪模式回到待机状态;
	            if (this.state.status == 1 && this.state.FuntionSelect != 1 && this.state.FuntionSelect != 2 && this.state.FuntionSelect != 0 && this.state.PresetSet == 0) {
	                textMessage = '烹饪中';workStyle = workStyle3;bgStyle = { background: 'blue' };
	            } //运行清洗完模式后直接控制数据进入烹饪模式

	            // if(this.state.OperationWorkMode==null&&this.state.status==0) workStyle=workStyle1;
	            // if(this.state.status==0&&this.state.OperationWorkMode!=null) workStyle=workStyle2;
	            // if(this.state.status==1&&this.state.OperationWorkMode==null) workStyle=workStyle3; 
	            // if(this.state.status==1&&(this.state.workIndex!=2||this.state.workIndex!=undefined))workTime=workTime3;
	            //    if((this.state.OperationWorkMode==null||this.state.OperationWorkMode==0)&&this.state.status==0) workTime='';//待机模式下不显示时间;
	            //   if(this.state.status==1&&this.state.contentIndex==1&&(this.state.workIndex!=2&&this.state.workIndex!=undefined))workTime=workTime4;//设置其它烹饪模式不显示烹饪倒计时
	            //    if(this.state.status==0&&this.state.OperationWorkMode==5) workTime=workTime3;//运行蒸饭模式显示的时间；
	            //    if(this.state.OperationWorkMode==1||this.state.contentIndex==2) workTime=workTime2;//保温模式下显示的计时;
	            //    if(this.state.OperationWorkMode==2||this.state.contentIndex==3) workTime=workTime4;//清洗工作模式不显示时间;
	            //    if(this.state.OperationWorkMode!=0&&this.state.OperationWorkMode!=5&&this.state.OperationWorkMode!=null&&this.state.status==0&&this.state.OperationWorkMode!=1) workTime=workTime4;
	            var Case1 = this.state.FuntionSelect == 2;
	            var Case2 = this.state.OperationWorkMode == 2;
	            var Case = Case1 || Case2;

	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'section',
	                    { className: 'banner-bg' },
	                    React.createElement('img', { src: '../static/img/cooker-bg.jpg' }),
	                    React.createElement(
	                        'p',
	                        { className: this.state.online == 2 ? 'tip-titles' : 'tip-title', style: bgStyle },
	                        textMessage
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { style: { display: this.state.online == 2 ? 'none' : 'block' } },
	                    React.createElement(
	                        'div',
	                        { className: 'content' },
	                        workStyle,
	                        Case ? React.createElement('img', { className: 'cleaning', src: '../static/img/cleaningImage.gif' }) : '',
	                        workTime
	                    ),
	                    React.createElement(_Selector.Selector, { changeIndex: this.changeIndex, contentIndex: this.state.contentIndex, OperationWorkMode: this.state.OperationWorkMode, FuntionSelect: this.state.FuntionSelect, status: this.state.status })
	                ),
	                React.createElement(
	                    'div',
	                    { className: this.state.online == 2 ? 'unline' : 'unlines' },
	                    React.createElement('span', { className: 'unline-bg' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u4E3B\u4EBA\uFF0C\u60A8\u7684\u84B8\u996D\u7172\u4E0D\u5728\u7EBF\u54E6~\uFF01'
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Router, { path: '/pattern', component: _Pattern.Pattern })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(8);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Selector = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;

	var Selector = exports.Selector = function (_BaseComponent) {
	  _inherits(Selector, _BaseComponent);

	  function Selector(state) {
	    _classCallCheck(this, Selector);

	    var _this = _possibleConstructorReturn(this, (Selector.__proto__ || Object.getPrototypeOf(Selector)).call(this, state));

	    _this.state = {
	      status: 0, //默认待机模式下都可选；
	      isShowAlert: false, //默认不弹出提示框
	      canReSet: false
	    };
	    _this.listenStore(_Store.Store); // 监听Store
	    _this.componentWillMount = _this.componentWillMount.bind(_this);
	    return _this;
	  }

	  _createClass(Selector, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _Actions.Actions.getData();
	    }
	  }, {
	    key: 'handerClick',
	    value: function handerClick(index) {

	      if (this.state.status == 0 && (this.props.OperationWorkMode == null || this.props.OperationWorkMode == 0) && (this.props.FuntionSelect == 0 || this.props.FuntionSelect == null)) {
	        this.setState({ status: index });
	        this.props.changeIndex(index);
	        if (index != 1) {
	          _Actions.Actions.setPattern(index - 1);
	        }
	      }
	      if (this.props.OperationWorkMode == 0 && this.props.FuntionSelect == 0 && this.state.status != 0) {
	        this.setState({ status: 0 });
	      }
	      //  if(2<this.props.OperationWorkMode&&this.props.OperationWorkMode<17){
	      //    this.setState({status:1})
	      // }
	    }
	  }, {
	    key: 'resetStatus',
	    value: function resetStatus(index) {
	      this.setState({ status: 0 });
	      var case1 = this.props.FuntionSelect == 0 && (this.props.OperationWorkMode == 0 || this.props.OperationWorkMode == null);
	      var case2 = this.props.contentIndex == 2 || this.props.contentIndex == 3;
	      var case3 = case1 && case2;
	      var case4 = (this.props.OperationWorkMode == 0 || this.props.OperationWorkMode == null) && this.state.status == 0 && this.props.FuntionSelect == 0;
	      if (case3 || case4) {
	        return '';
	      } //防止待机模式下取消按钮可点击
	      // this.props.changeIndex(0);
	      // Actions.calWork();
	      if (2 < this.props.OperationWorkMode < 17 || this.state.status == 1 && this.props.contentIndex == 1) {
	        this.setState({
	          isShowAlert: true

	        });
	      }
	      if (this.props.OperationWorkMode == 1 || this.props.OperationWorkMode == 2 || this.props.contentIndex == 2 || this.props.contentIndex == 3 || this.state.PresetSet == 1) {
	        this.setState({
	          isShowAlert: false
	        });
	        _Actions.Actions.calWork();

	        this.props.changeIndex(0);
	      }
	    }
	  }, {
	    key: 'btnClose',
	    value: function btnClose() {
	      this.props.changeIndex(0);
	      _Actions.Actions.calWork();
	      this.setState({ isShowAlert: false, status: 0 });
	    }
	  }, {
	    key: 'btnCancel',
	    value: function btnCancel() {
	      this.setState({ isShowAlert: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log(this.props.PresetSet + '预约');
	      console.log(this.props.OperationWorkMode + '工作模式');
	      console.log(this.props.FuntionSelect + '控制数据');
	      var selectArr = [{
	        src1: 'unselected-pattern.png',
	        src2: 'pattern.png',
	        src3: 'selected-pattern.png'
	      }, {
	        src1: 'unselected-warm.png',
	        src2: 'warm.png',
	        src3: 'selected-warm.png',
	        text: '保温中'
	      }, {
	        src1: 'unselected-wash.png',
	        src2: 'wash.png',
	        src3: 'selected-wash.png',
	        text: '清洗中'
	      }];

	      var selectImage = [{
	        src: 'selected-pattern.png',
	        text: '模式'
	      }, {
	        src: 'selected-fan.png',
	        text: "蒸饭"
	      }, {
	        src: 'selected-meat.png',
	        text: "蒸肉"
	      }, { src: 'selected-fishing.png',
	        text: "蒸鱼"
	      }, {
	        src: 'selected-tudou.png',
	        text: "蒸土豆"
	      }, {
	        src: 'selected-ricer.png',
	        text: "热饭"
	      }, {
	        src: 'selected-baozi.png',
	        text: '蒸包子'
	      }, {
	        src: 'selected-mantou.png',
	        text: "蒸馒头"
	      }, {
	        src: 'selected-corn.png',
	        text: "玉米"
	      }, {
	        src: 'selected-potato.png',
	        text: '红薯'
	      }, {
	        src: 'selected-cake.png',
	        text: "糕点"
	      }, {
	        src: 'selected-xie.png',
	        text: "蟹类"
	      }, {
	        src: 'selected-fish.png',
	        text: "虾类"
	      }, {
	        src: 'selected-shell.png',
	        text: "贝类"
	      }, {
	        src: 'selected-egg.png',
	        text: "蒸蛋"
	      }];
	      var runImage = [{}, {}, {}, {
	        src: 'selected-fishing.png',
	        text: "蒸鱼"
	      }, {
	        src: 'selected-meat.png',
	        text: "蒸肉"
	      }, {
	        src: 'selected-fan.png',
	        text: "蒸饭"
	      }, {
	        src: 'selected-tudou.png',
	        text: "蒸土豆"
	      }, {
	        src: 'selected-ricer.png',
	        text: "热饭"
	      }, {
	        src: 'selected-baozi.png',
	        text: '蒸包子'
	      }, {
	        src: 'selected-mantou.png',
	        text: "蒸馒头"
	      }, {
	        src: 'selected-corn.png',
	        text: "蒸玉米"
	      }, {
	        src: 'selected-potato.png',
	        text: '蒸红薯'
	      }, {
	        src: 'selected-cake.png',
	        text: "蒸糕点"
	      }, {
	        src: 'selected-xie.png',
	        text: "蒸蟹类"
	      }, {
	        src: 'selected-fish.png',
	        text: "虾类"
	      }, {
	        src: 'selected-shell.png',
	        text: "贝类"
	      }, {
	        src: 'selected-egg.png',
	        text: "蒸蛋"
	      }];
	      var imgSrc1 = void 0,
	          imgSrc2 = void 0,
	          imgSrc3 = void 0,
	          Style1 = void 0,
	          Style2 = void 0,
	          Style3 = void 0,
	          Style4 = void 0,
	          imgUrl = void 0,
	          textMessage = void 0;
	      var Contion1 = 2 < this.props.OperationWorkMode && this.props.OperationWorkMode < 17;
	      var Contion2 = 2 < this.props.FuntionSelect && this.props.FuntionSelect < 17;
	      var path = this.state.status == 1 && !Contion1 && !Contion2 ? "/pattern" : '';
	      if ((this.props.PresetSet == 0 || this.props.PresetSet == undefined) && this.props.OperationWorkMode == 5 && this.props.FuntionSelect == 0) {
	        textMessage = '模式';
	        imgSrc1 = '../static/img/' + selectArr[0].src2;
	        imgSrc2 = '../static/img/' + selectArr[1].src2;
	        imgSrc3 = '../static/img/' + selectArr[2].src2;
	        Style1 = Style2 = Style3 = { color: '#848484' };
	      } ////防止从APP首页进入index页造成UI渲染混乱
	      if (this.state.status == 1) {
	        if (this.props.status == 0) {
	          imgUrl = selectImage[this.state.workIndex == undefined ? 0 : this.state.workIndex].src;
	          //imgUrl=selectImage[this.state.workIndex].src;
	          imgSrc1 = '../static/img/' + imgUrl;
	          textMessage = selectImage[this.state.workIndex == undefined ? 0 : this.state.workIndex].text;
	          //workMessage= messageArr2[this.state.workIndex];
	          Style1 = { color: '#4c91fc' };
	          imgSrc2 = this.state.status == 2 ? '../static/img/' + selectArr[1].src3 : '../static/img/' + selectArr[1].src1;
	          Style2 = this.state.status == 2 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          imgSrc3 = this.state.status == 3 ? '../static/img/' + selectArr[2].src3 : '../static/img/' + selectArr[2].src1;
	          Style3 = this.state.status == 3 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          Style4 = { color: '#848484' };
	        }
	        if (this.props.status == 1 && (this.props.OperationWorkMode != 0 || this.props.FuntionSelect != 0)) {
	          imgUrl = selectImage[this.state.workIndex == undefined ? 1 : this.state.workIndex + 1].src;
	          //imgUrl=selectImage[this.state.workIndex].src;
	          imgSrc1 = '../static/img/' + imgUrl;
	          textMessage = selectImage[this.state.workIndex == undefined ? 1 : this.state.workIndex + 1].text;
	          //workMessage= messageArr2[this.state.workIndex];
	          Style1 = { color: '#4c91fc' };
	          imgSrc2 = this.state.status == 2 ? '../static/img/' + selectArr[1].src3 : '../static/img/' + selectArr[1].src1;
	          Style2 = this.state.status == 2 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          imgSrc3 = this.state.status == 3 ? '../static/img/' + selectArr[2].src3 : '../static/img/' + selectArr[2].src1;
	          Style3 = this.state.status == 3 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          Style4 = { color: '#848484' };
	        }
	        if (this.props.status == 1 && this.props.OperationWorkMode == 0 && this.props.FuntionSelect == 0) {
	          textMessage = '模式';
	          imgSrc1 = '../static/img/' + selectArr[0].src2;
	          imgSrc2 = '../static/img/' + selectArr[1].src2;
	          imgSrc3 = '../static/img/' + selectArr[2].src2;
	          Style1 = Style2 = Style3 = { color: '#848484' };
	        }
	      }
	      if (this.state.status == 0) {
	        if (this.props.OperationWorkMode == null || this.props.OperationWorkMode == 0 || this.props.FuntionSelect == 0) {
	          textMessage = '模式';
	          imgSrc1 = '../static/img/' + selectArr[0].src2;
	          imgSrc2 = '../static/img/' + selectArr[1].src2;
	          imgSrc3 = '../static/img/' + selectArr[2].src2;
	          Style1 = Style2 = Style3 = { color: '#848484' };
	        }
	        if (2 < this.props.OperationWorkMode && this.props.OperationWorkMode < 17 || 2 < this.props.FuntionSelect && this.props.FuntionSelect < 17) {
	          imgUrl = runImage[this.props.OperationWorkMode || this.props.FuntionSelect].src;
	          imgSrc1 = '../static/img/' + imgUrl;
	          textMessage = runImage[this.props.OperationWorkMode || this.props.FuntionSelect].text;
	          //workMessage= messageArr2[this.state.workIndex];
	          Style1 = { color: '#4c91fc' };
	          imgSrc2 = this.state.status == 2 ? '../static/img/' + selectArr[1].src3 : '../static/img/' + selectArr[1].src1;
	          Style2 = this.state.status == 2 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          imgSrc3 = this.state.status == 3 ? '../static/img/' + selectArr[2].src3 : '../static/img/' + selectArr[2].src1;
	          Style3 = this.state.status == 3 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          Style4 = { color: '#848484' };
	        } else if (this.props.OperationWorkMode == 1 || this.props.OperationWorkMode == 2 || this.props.FuntionSelect == 1 || this.props.FuntionSelect == 2) {

	          textMessage = '模式';
	          imgSrc1 = '../static/img/' + selectArr[0].src1;
	          Style1 = { color: '#c7c7c7' };
	          imgSrc2 = this.props.OperationWorkMode == 1 || this.props.FuntionSelect == 1 ? '../static/img/' + selectArr[1].src3 : '../static/img/' + selectArr[1].src1;
	          Style2 = this.props.OperationWorkMode == 1 || this.props.FuntionSelect == 1 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          imgSrc3 = this.props.OperationWorkMode == 2 || this.props.FuntionSelect == 2 ? '../static/img/' + selectArr[2].src3 : '../static/img/' + selectArr[2].src1;
	          Style3 = this.props.OperationWorkMode == 2 || this.props.FuntionSelect == 2 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          Style4 = { color: '#848484' };
	        }
	      } else if (this.state.status != 0 && this.state.status != 1) {
	        if ((this.props.contentIndex == 2 || this.props.contentIndex == 3) && (this.props.OperationWorkMode == 0 || this.props.OperationWorkMode == null) && (this.props.FuntionSelect == 1 || this.props.FuntionSelect == 2)) {
	          textMessage = '模式';
	          imgSrc1 = '../static/img/' + selectArr[0].src1;
	          Style1 = { color: '#c7c7c7' };
	          imgSrc2 = this.props.contentIndex == 2 ? '../static/img/' + selectArr[1].src3 : '../static/img/' + selectArr[1].src1;
	          Style2 = this.props.contentIndex == 2 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          imgSrc3 = this.props.contentIndex == 3 ? '../static/img/' + selectArr[2].src3 : '../static/img/' + selectArr[2].src1;
	          Style3 = this.props.contentIndex == 3 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          Style4 = { color: '#848484' };
	        }
	        if ((2 < this.props.FuntionSelect && this.props.FuntionSelect < 17 || 2 < this.props.OperationWorkMode && this.props.OperationWorkMode < 17) && (this.props.contentIndex == 2 || this.props.contentIndex == 3)) {
	          imgUrl = runImage[this.props.OperationWorkMode || this.props.FuntionSelect].src;
	          imgSrc1 = '../static/img/' + imgUrl;
	          textMessage = runImage[this.props.OperationWorkMode || this.props.FuntionSelect].text;
	          //workMessage= messageArr2[this.state.workIndex];
	          Style1 = { color: '#4c91fc' };
	          imgSrc2 = '../static/img/' + selectArr[1].src1;
	          Style2 = { color: '#c7c7c7' };
	          imgSrc3 = '../static/img/' + selectArr[2].src1;
	          Style3 = { color: '#c7c7c7' };
	          Style4 = { color: '#848484' };
	        }
	        if (this.props.OperationWorkMode == 1 || this.props.OperationWorkMode == 2 || this.props.FuntionSelect == 1 || this.props.FuntionSelect == 2) {
	          textMessage = '模式';
	          imgSrc1 = '../static/img/' + selectArr[0].src1;
	          Style1 = { color: '#c7c7c7' };
	          imgSrc2 = this.props.OperationWorkMode == 1 || this.props.FuntionSelect == 1 ? '../static/img/' + selectArr[1].src3 : '../static/img/' + selectArr[1].src1;
	          Style2 = this.props.OperationWorkMode == 1 || this.props.FuntionSelect == 1 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          imgSrc3 = this.props.OperationWorkMode == 2 || this.props.FuntionSelect == 2 ? '../static/img/' + selectArr[2].src3 : '../static/img/' + selectArr[2].src1;
	          Style3 = this.props.OperationWorkMode == 2 || this.props.FuntionSelect == 2 ? { color: '#4c91fc' } : { color: '#c7c7c7' };
	          Style4 = { color: '#848484' };
	        }
	        if (this.props.OperationWorkMode == 0 && this.props.FuntionSelect == 0) {

	          textMessage = '模式';
	          imgSrc1 = '../static/img/' + selectArr[0].src2;
	          imgSrc2 = '../static/img/' + selectArr[1].src2;
	          imgSrc3 = '../static/img/' + selectArr[2].src2;
	          Style1 = Style2 = Style3 = { color: '#848484' };
	        }
	      }
	      if ((this.props.PresetSet == 0 || this.props.PresetSet == undefined) && this.props.OperationWorkMode == 5 && this.props.FuntionSelect == 0) {
	        textMessage = '模式';
	        imgSrc1 = '../static/img/' + selectArr[0].src2;
	        imgSrc2 = '../static/img/' + selectArr[1].src2;
	        imgSrc3 = '../static/img/' + selectArr[2].src2;
	        Style1 = Style2 = Style3 = { color: '#848484' };
	      } //防止从APP首页进入index页造成UI渲染混乱


	      return React.createElement(
	        'section',
	        { className: 'work-pattern' },
	        React.createElement(
	          'div',
	          { style: { opacity: this.state.isShowAlert == true ? 0.5 : 1 } },
	          React.createElement(
	            'section',
	            { className: 'select-section' },
	            React.createElement(
	              'dl',
	              { onTouchEnd: this.handerClick.bind(this, 1) },
	              React.createElement(
	                Link,
	                { to: path },
	                React.createElement(
	                  'dt',
	                  null,
	                  React.createElement('img', { src: imgSrc1 })
	                ),
	                React.createElement(
	                  'dd',
	                  { style: Style1 },
	                  textMessage
	                )
	              )
	            ),
	            React.createElement(
	              'dl',
	              { onTouchEnd: this.handerClick.bind(this, 2) },
	              React.createElement(
	                'dt',
	                null,
	                React.createElement('img', { src: imgSrc2 })
	              ),
	              React.createElement(
	                'dd',
	                { style: Style2 },
	                '\u4FDD\u6E29'
	              )
	            ),
	            React.createElement(
	              'dl',
	              { onTouchEnd: this.handerClick.bind(this, 3) },
	              React.createElement(
	                'dt',
	                null,
	                React.createElement('img', { src: imgSrc3 })
	              ),
	              React.createElement(
	                'dd',
	                { style: Style3 },
	                '\u6E05\u6D17'
	              )
	            )
	          ),
	          React.createElement('div', { className: 'message' }),
	          React.createElement(
	            'div',
	            { className: 'footer' },
	            React.createElement(
	              'a',
	              { className: 'cancel', onTouchEnd: this.resetStatus.bind(this), style: Style4 },
	              '\u53D6\u6D88'
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'alert', style: { display: this.state.isShowAlert == true ? 'block' : 'none' } },
	          React.createElement(
	            'div',
	            { className: 'innerbox' },
	            React.createElement(
	              'p',
	              { className: 'title' },
	              '\u6E29\u99A8\u63D0\u793A'
	            ),
	            React.createElement(
	              'p',
	              { className: 'text-message' },
	              '\u786E\u5B9A\u8981\u53D6\u6D88\u70F9\u996A\u5417\uFF1F'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'two-button' },
	            React.createElement('input', { type: 'button', value: '\u53D6\u6D88', onTouchStart: this.btnCancel.bind(this), className: 'left' }),
	            React.createElement('input', { type: 'button', value: '\u786E\u5B9A', onTouchStart: this.btnClose.bind(this), className: 'right' })
	          )
	        )
	      );
	    }
	  }]);

	  return Selector;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Pattern = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Taste = __webpack_require__(11);

	var _TimeSelect = __webpack_require__(12);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Pattern = exports.Pattern = function (_BaseComponent) {
	  _inherits(Pattern, _BaseComponent);

	  function Pattern(props) {
	    _classCallCheck(this, Pattern);

	    var _this = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, props));

	    var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	    _this.state = {
	      status: 0, //默认为蒸饭模式	
	      bgColor: false, //默认不透明
	      timeSlect: false, //默认不弹出时间选择框
	      taste: 2,
	      workIndex: 0,
	      hourIndex: 0,
	      minuteIndex: 0,
	      headerTop: isAndroid ? 73 : 63
	    };
	    _this.listenStore(_Store.Store); // 监听Store
	    _this.submitClock = function (h, m) {
	      _Actions.Actions.selectTime(h, m);
	    };
	    // this.cancelClock = function(){

	    //      Actions.clockSwitch(3,'cancel');
	    //  };
	    //      this.canceltasteClock=function(){
	    // 	Actions.tasteSwitch(2);
	    // };
	    _this.submittasteClock = function (b) {
	      _Actions.Actions.tasteChoose(b);
	    };
	    het.setTitle(JSON.stringify({ setNavTitle: 1, title: '模式', setNavRightBtnHiden: 1 }));

	    return _this;
	  }

	  _createClass(Pattern, [{
	    key: 'changeImage',
	    value: function changeImage(i) {
	      this.setState({ status: i });
	      _Actions.Actions.workStyle(i);
	    }
	  }, {
	    key: 'changeTaste',
	    value: function changeTaste(index) {
	      this.setState({ taste: index });
	    }
	  }, {
	    key: 'changeClick',
	    value: function changeClick() {
	      if (this.state.status == 0) {
	        var newSelect = !this.state.timeSlect;
	        this.setState({ timeSlect: newSelect });
	      }
	      /*console.log(1111);*/
	    }
	  }, {
	    key: 'changeTime',
	    value: function changeTime(index1, index2) {
	      this.setState({ hourIndex: index1, minuteIndex: index2 });
	    }
	  }, {
	    key: 'modeStart',
	    value: function modeStart() {

	      //location.href="#/";
	      history.back();
	      var isTrue = this.state.hour == undefined && this.state.minute == undefined;
	      if (isTrue) {
	        var workIndex = this.state.workIndex ? this.state.workIndex : 0;
	        if (this.state.status == 0) {
	          var tasteIndex = this.state.tasteIndex == undefined ? 3 : this.state.tasteIndex + 1;
	          _Actions.Actions.modeStart(this.state.workIndex + 5, tasteIndex); //蒸饭烹饪模式选择口感
	        }
	        if (this.state.status == 2) {
	          _Actions.Actions.modeStart(this.state.workIndex + 1, 0);
	        } else if (this.state.status != 0 && this.state.status != 2) {
	          _Actions.Actions.modeStart(this.state.workIndex + 3, 0); //其他烹饪模式
	        }
	      } else {
	        var _workIndex = this.state.workIndex ? this.state.workIndex : 0;
	        var hour = this.state.hour;
	        var minute1 = this.state.hour == 24 ? '00' : this.state.minute;
	        var minute = this.state.minute == undefined ? '00' : minute1;
	        var _tasteIndex = this.state.tasteIndex == undefined ? 3 : this.state.tasteIndex + 1;
	        if (this.state.status == 0) {
	          _Actions.Actions.willStart(hour, minute, _workIndex + 5, _tasteIndex); //蒸饭模式的预约
	        }
	        if (this.state.status == 2) {
	          _Actions.Actions.modeStart(this.state.workIndex + 1, 0);
	        } else if (this.state.status != 0 && this.state.status != 2) {
	          _Actions.Actions.modeStart(this.state.workIndex + 3, 0); //其他烹饪模式
	        }
	      }
	    }
	  }, {
	    key: 'handlerClick',
	    value: function handlerClick() {
	      if (this.state.status == 0) {
	        var newColor = !this.state.bgColor;
	        this.setState({ bgColor: newColor }); //只有蒸饭模式下口感选项及预约时间项才可选
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var items = [{
	        src1: 'fan.png',
	        src2: 'selected-fan.png',
	        text: "蒸饭",
	        Statue1: true,
	        Statue2: false

	      }, {
	        src1: 'meat.png',
	        src2: 'selected-meat.png',
	        text: "蒸肉",
	        Statue1: true,
	        Statue2: false

	      }, {
	        src1: 'fishing.png',
	        src2: 'selected-fishing.png',
	        text: "蒸鱼",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'tudou.png',
	        src2: 'selected-tudou.png',
	        text: "蒸土豆",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'ricer.png',
	        src2: 'selected-ricer.png',
	        text: "热饭",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'baozi.png',
	        src2: 'selected-baozi.png',
	        text: '蒸包子',
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'mantou.png',
	        src2: 'selected-mantou.png',
	        text: "蒸馒头",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'corn.png',
	        src2: 'selected-corn.png',
	        text: "蒸玉米",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'potato.png',
	        src2: 'selected-potato.png',
	        text: '蒸红薯',
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'cake.png',
	        src2: 'selected-cake.png',
	        text: "蒸糕点",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'xie.png',
	        src2: 'selected-xie.png',
	        text: "蟹类",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'fish.png',
	        src2: 'selected-fish.png',
	        text: "虾类",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'shell.png',
	        src2: 'selected-shell.png',
	        text: "贝类",
	        Statue1: true,
	        Statue2: false
	      }, {
	        src1: 'egg.png',
	        src2: 'selected-egg.png',
	        text: "蒸蛋",
	        Statue1: true,
	        Statue2: false
	      }];

	      var Items = items.map(function (item, index) {
	        var src = item.src1;
	        var startStatus = item.Statue2;
	        if (index == this.state.status) {
	          src = item.src2;
	          startStatus = item.Statue1;
	        };
	        var imgSrc = '../static/img/' + src;
	        return React.createElement(
	          'li',
	          { className: 'list-item', onTouchEnd: this.changeImage.bind(this, index) },
	          React.createElement('img', { src: imgSrc }),
	          React.createElement(
	            'span',
	            { className: "" + (startStatus ? "span-active" : "") },
	            item.text
	          )
	        );
	      }.bind(this));
	      var ulStyle = this.state.bgColor ? { background: 'rgba(0,0,0,0.3)' } : null || this.state.timeSlect ? { background: 'rgba(0,0,0,0.3)' } : null;
	      var taste = ['软', '偏软', '适中', '偏硬', '硬'];
	      var hour = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
	      var minute = ['00', '30'];
	      var tasteStyle = this.state.status == 0 ? { color: '#555555' } : { color: '#c7c7c7' };
	      var chooseStyle = this.state.status == 0 ? { color: '#838383' } : { color: '#c7c7c7' };
	      //let startTime1='-- --';
	      var startTime = '立即启动';
	      var HourIndex = this.state.hourIndex;
	      var MinuteIndex = this.state.hourIndex == 23 ? 0 : this.state.minuteIndex;
	      //let startTime=(this.state.hour==0&&this.state.minute==0) ? startTime2 : startTime1;
	      //let timeInformation='预约'+hour[HourIndex]+'时'+minute[MinuteIndex]+'分';
	      var timeInformation = '预约' + this.state.hour + '时' + (this.state.minute == 0 ? '00' : this.state.minute) + '分';
	      var tasteInformation = this.state.tasteIndex === undefined ? '适中' : taste[this.state.tasteIndex];

	      return React.createElement(
	        'div',
	        null,
	        React.createElement('div', { style: { height: this.state.headerTop, width: '100%', backgroundColor: 'rgb(50,133,255)' } }),
	        React.createElement(
	          'div',
	          { className: 'pattern-page' },
	          React.createElement(
	            'ul',
	            { className: 'pattern-list', style: ulStyle },
	            Items
	          ),
	          React.createElement(
	            'section',
	            { style: { display: this.state.bgColor == true || this.state.timeSlect == true ? 'none' : 'block' } },
	            React.createElement(
	              'div',
	              null,
	              React.createElement(
	                'a',
	                { href: 'javascript:void(0)', onTouchEnd: this.handlerClick.bind(this), className: 'taste-choice' },
	                React.createElement(
	                  'span',
	                  { style: tasteStyle },
	                  '\u53E3\u611F'
	                ),
	                React.createElement(
	                  'span',
	                  { style: chooseStyle },
	                  tasteInformation
	                ),
	                React.createElement('img', { src: '../static/img/patten-change.png' })
	              )
	            ),
	            React.createElement(
	              'div',
	              null,
	              React.createElement(
	                'a',
	                { href: 'javascript:void(0)', onTouchEnd: this.changeClick.bind(this), className: 'taste-choice' },
	                React.createElement(
	                  'span',
	                  { style: tasteStyle },
	                  '\u9884\u7EA6\u65F6\u95F4'
	                ),
	                React.createElement(
	                  'span',
	                  { style: chooseStyle },
	                  this.state.hour === undefined && this.state.minute === undefined ? startTime : timeInformation
	                ),
	                React.createElement('img', { src: '../static/img/patten-change.png' })
	              )
	            ),
	            React.createElement('div', { className: 'blank-space' }),
	            React.createElement(
	              'div',
	              { className: 'pattern-footer' },
	              React.createElement(
	                'a',
	                { className: 'start-work', onTouchEnd: this.modeStart.bind(this) },
	                '\u542F\u52A8'
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { style: { display: this.state.bgColor == true ? 'block' : 'none' } },
	            React.createElement(_Taste.Taste, { changeTaste: this.changeTaste.bind(this), handlerClick: this.handlerClick.bind(this), submittasteClock: this.submittasteClock })
	          ),
	          React.createElement(
	            'div',
	            { style: { display: this.state.timeSlect == true ? 'block' : 'none' } },
	            React.createElement(_TimeSelect.TimeSelect, { changeTime: this.changeTime.bind(this), changeClick: this.changeClick.bind(this), submitClock: this.submitClock, minutearr: ['00', '30'], hourIndex: this.state.hourIndex, minuteIndex: this.state.minuteIndex })
	          )
	        )
	      );
	    }
	  }]);

	  return Pattern;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 11 */
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
	var Taste = exports.Taste = React.createClass({
		displayName: 'Taste',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 2,
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
			{/*let maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
	   let minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
	   let hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
	   let maxlength = parseInt((maxhour-minhour)/hourstep);
	   let hourarr = [];
	   if(this.props.hourarray && this.props.hourarray instanceof Array){
	   hourarr = this.props.hourarray;
	   this.setState({
	   	hourarr:hourarr,
	   	hourtime:minhour
	   });
	   }else{
	   for(let i = 0;i<=maxlength;i++){
	   	let value = minhour+i*hourstep;
	   	value = value<10?'0'+value:value;
	   	hourarr.push(value);
	   }
	   maxhour = maxhour<10?'0'+maxhour:maxhour;
	   if(hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
	   this.setState({
	   	hourarr:hourarr,
	   	hourtime:minhour
	   });
	   }
	   //设置默认小时
	   if(next.defaulthour){
	   let index = hourarr.indexOf(next.defaulthour);
	   if(index!=-1){
	   	this.setState({
	   		hourtime: next.defaulthour,
	   		hourindex:index
	   	});
	   }
	   }*/}
			var maxminute = '硬';
			var minminute = '适中';
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = ['软', '偏软', '适中', '偏硬', '硬'];
			if (this.props.minutearr && this.props.minutearr instanceof Array) {
				minutearr = this.props.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var value = minminute + j * minutestep;
					value = value < 10 ? '0' + value : value;
					minutearr.push(value);
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
			this.props.changeTaste(minuteindex);
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			this.props.handlerClick();
			// this.props.changeTaste(2);
			if (typeof this.props.cancelClock === 'function') {
				// this.props.canceltasteClock(2);


			} else {
					//console.log('error:the cancel callback is not a function');
				}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			this.props.handlerClick();
			if (typeof this.props.submittasteClock === 'function') {
				this.props.submittasteClock(this.state.minuteindex);
				console.log(this.state.minuteindex + 'fffff');
			} else {
				//console.log('error:the submit callback is not a function');
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
				{ ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'tasteselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selecttaste' },
						React.createElement(
							'section',
							{ className: 'select-btn flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell', onTouchEnd: this.cancelclock },
								'\u53D6\u6D88'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell', onTouchEnd: this.submitclock },
								'\u786E\u5B9A'
							)
						),
						React.createElement(
							'p',
							{ className: 'select-taste' },
							'\u53E3\u611F'
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'minute', style: { display: 'inline-block', width: '100%', left: '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: '0%', display: minuteshow ? '' : 'none', left: '0%' } },
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
								{ className: 'taste-line3' },
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
					)
				)
			);
		}
	});

/***/ },
/* 12 */
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
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 24;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 1;
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
			var maxminute = '';
			var minminute = '';
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = ['00', '30'];
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
			console.log(hourindex);

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
			this.props.changeTime(hourindex, minuteindex);
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			this.props.changeClick();
			// this.props.changeTime(0,0);//不用重新初始化预约时间
			if (typeof this.props.cancelClock === 'function') {
				//this.props.cancelClock();
				console.log(555666555);
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			this.props.changeClick();
			if (typeof this.props.submitClock === 'function') {
				var hours = this.state.hourtime == 1 ? '01' : this.state.hourtime;
				this.props.submitClock(hours, this.state.minutetime == '' ? 0 : this.state.minutetime);
				console.log(this.state.hourtime + 'mmmmmmnnnnn');
			} else {
				//console.log('error:the submit callback is not a function');
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
				{ ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'section',
							{ className: 'selectbtn flex' },
							React.createElement(
								'span',
								{ className: 'flex-cell', onTouchEnd: this.cancelclock },
								'\u53D6\u6D88'
							),
							React.createElement(
								'span',
								{ className: 'flex-cell', onTouchEnd: this.submitclock },
								'\u786E\u5B9A'
							)
						),
						React.createElement(
							'p',
							{ className: 'title' },
							'\u9884\u7EA6\u65F6\u95F4'
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
								{ className: 'reminder' },
								'\u9884\u7EA6'
							),
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206'
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
					)
				)
			);
		}
	});

/***/ }
/******/ ]);