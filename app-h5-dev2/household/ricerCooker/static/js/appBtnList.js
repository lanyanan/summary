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


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};

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
	    // appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            // if(data.OperationWorkMode!==undefined) alert('enter'+JSON.stringify(data));
	            _this.setState(data);
	        }); // 监听Store

	        _this.handleShakeSwitch = _this.handleShakeSwitch.bind(_this);

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleShakeSwitch',
	        value: function handleShakeSwitch(e) {
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            e.preventDefault();
	            var type = e.currentTarget.getAttribute('data-type');
	            var FuntionSelect = parseInt(this.state.FuntionSelect);
	            var OperationWorkMode = parseInt(this.state.OperationWorkMode);
	            this.setState({ OperationWorkMode: type });
	            _Actions.Actions.handleShakeSwitch(type, 3);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log(this.state.FuntionSelect + 'gongzuomoshi');

	            var PresetSet = parseInt(this.state.PresetSet);
	            var OperationWorkMode = parseInt(this.state.OperationWorkMode);
	            // let mode1=parseInt(this.state.FuntionSelect==undefined ? 0 :this.state.FuntionSelect);
	            var mode2 = OperationWorkMode ? OperationWorkMode : 0;
	            var mode = mode2;
	            var messageArr2 = ['待机中', '保温中', '清洗中', "蒸鱼", "蒸肉", "烹饪中 蒸饭", "蒸土豆", "热饭", '蒸包子', "蒸馒头", "蒸玉米", '蒸红薯', "蒸糕点", "蟹类", "虾类", "贝类", "蒸蛋"];
	            var workText1 = messageArr2[mode];
	            var workText2 = PresetSet == 1 && mode == 5 ? '预约中 蒸饭' : workText1;
	            var workText = this.state.OperationWorkMode == null ? '待机中' : workText2;
	            var fastBtnEvent = mode == 0 ? this.handleShakeSwitch : '';

	            return React.createElement(
	                'div',
	                null,
	                this.state.online == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    workText + ' '
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { 'data-type': '3', className: mode == 0 || mode == 3 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/fisha.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u84B8\u9C7C'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '5', className: mode == 0 || mode == 5 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/rice.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u84B8\u996D'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '4', className: mode == 0 || mode == 4 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/meating .png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u84B8\u8089'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '2', className: mode == 0 || mode == 2 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/cleaning.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6E05\u6D17'
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
	    het.setTitle('C-Life 设备控制');
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

/***/ }
/******/ ]);