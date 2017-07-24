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

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _fun = __webpack_require__(6);

	var _TyraTopScreen = __webpack_require__(9);

	var _DeviceConfig = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // app数据


	var Toast = __webpack_require__(8);
	var SettingButton = __webpack_require__(11);
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	// 定义toast函数，以供多次调用

	function topToast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            type: 2,
	            onlineStatus: 0,
	            mode: 1,
	            gear: 1,
	            recommendMode: 1,
	            recommendGear: 1,
	            currentMode: 1,
	            currentGear: 1,
	            electricity: 5,
	            needSave: false,
	            busiSwitch: 0,
	            modeshow: false,
	            gearshow: false,
	            modechange: false,
	            gearchange: false
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            topToast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
	        }
	    }, {
	        key: 'sync',
	        value: function sync() {
	            _Actions.Actions.sync();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var tempType = this.state.type;
	            console.log(this.state);
	            return React.createElement(
	                'div',
	                { className: 'flex-column', style: { height: '100%' } },
	                React.createElement(_TyraTopScreen.TyraTopScreen, { onlineStatus: this.state.onlineStatus, electricity: this.state.electricity, smartModeSwitch: this.state.busiSwitch }),
	                React.createElement(_DeviceConfig.DeviceConfig, { modechange: this.state.modechange, gearchange: this.state.gearchange, modeshow: this.state.modeshow, gearshow: this.state.gearshow, smartModeSwitch: this.state.busiSwitch, type: this.state.type, mode: this.state.mode - 1, gear: this.state.gear - 1 }),
	                React.createElement(
	                    'div',
	                    { className: 'footer' },
	                    React.createElement(SettingButton, { settingStatus: this.state.needSave ? 'on' : 'off', callback: this.sync.bind(this) })
	                ),
	                React.createElement('div', { id: 'mytoast', style: { fontSize: '12px' } })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('提拉嫩肤仪');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    // 配置sdk
	    het.config({
	        debugMode: "print", // 打印调试数据
	        useUpdateFlag: true, // 自动添加updateFlag标记
	        // 模板数据与接口数据映射表
	        webDataMap: {
	            "type": "type", //当前类型
	            "recommendMode": "mode", // 推荐模式
	            "recommendGear": "gears", //推荐档位
	            "currentMode": "currentMode", //当前模式
	            "currentGear": "currentGears", //当前档位
	            "busiSwitch": "busiSwitch", //自动手动切换
	            "onlineStatus": "onlineStatus", //当前设备状态
	            "electricity": "electricity", //当前设备电量
	            "des": "des" //描述当前结果
	        }
	    });

	    // 路由方式
	    //ReactDOM.render((
	    //<Router history={hashHistory}>
	    //<Route path="/" component={App} />
	    //</Router>
	    //), document.getElementById('ROOT'));
	});

	// 接收到repaint请求后执行此操作
	het.repaint(function (data) {
	    _Actions.Actions.receiveRepaint(data);
	});

/***/ },
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
	var Actions = exports.Actions = Reflux.createActions(['receiveRepaint', // 接收到数据，重新渲染
	'repaint', // 直接重新渲染
	'toggleBusi', // 自动/手动模式切换
	'selectMode', //选择模式
	'selectGear', //选择档位
	'sync' // 同步数据
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

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

	var Toast = __webpack_require__(8);
	// 定义toast函数，以供多次调用
	var topToast = function topToast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};
	var AppData = {};

	var temp = {};

	var needSave = false;

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        _fun.Funs._extends(AppData, data);
	        if (!AppData.busiSwitch) {
	            // 手动模式
	            AppData.mode = AppData.currentMode;
	            AppData.gear = AppData.currentGear;
	        } else {
	            AppData.mode = AppData.recommendMode;
	            AppData.gear = AppData.recommendGear;
	        }
	        this.trigger(AppData);
	    },
	    onReceiveRepaint: function onReceiveRepaint(data, type) {
	        if (needSave) {
	            return;
	        }
	        _fun.Funs._extends(AppData, data);
	        if (AppData.busiSwitch == 1 && (AppData.type == null || AppData.type <= 1)) {
	            AppData.busiSwitch = 0;
	        }
	        if (!AppData.busiSwitch) {
	            // 手动模式
	            AppData.mode = AppData.currentMode;
	            AppData.gear = AppData.currentGear;
	        } else {
	            AppData.mode = AppData.recommendMode;
	            AppData.gear = AppData.recommendGear;
	        }
	        this.trigger(AppData);
	    },

	    onToggleBusi: function onToggleBusi() {
	        needSave = true;
	        if (AppData.busiSwitch != 1 && (AppData.type == null || AppData.type <= 1)) {
	            het.toast("您还未测试肤质，请先测试肤质！");
	            return;
	        }
	        if (AppData.updateFlag == null) {
	            AppData.updateFlag = 0;
	        }
	        AppData.busiSwitch = !AppData.busiSwitch ? 1 : 0;
	        if (AppData.busiSwitch) {
	            // 自动模式
	            AppData.mode = AppData.recommendMode;
	            AppData.gear = AppData.recommendGear;
	        } else {
	            // 切回手动模式
	            AppData.mode = AppData.currentMode;
	            AppData.gear = AppData.currentGear;
	        }
	        if (temp.busiSwitch == null || AppData.busiSwitch == temp.busiSwitch) {
	            AppData.updateFlag += 4;
	        } else if (AppData.updateFlag >= 4) {
	            AppData.updateFlag -= 4;
	        }
	        if (temp.busiSwitch == 0 && AppData.busiSwitch == 1) {
	            AppData.updateFlag = 0;
	        }
	        if (temp.busiSwitch == null) {
	            temp.busiSwitch = AppData.busiSwitch;
	        }
	        if (AppData.updateFlag > 0) {
	            AppData.needSave = true;
	        } else {
	            AppData.needSave = false;
	        }
	        this.trigger(AppData);
	    },
	    onSelectMode: function onSelectMode(data) {
	        needSave = true;
	        if (AppData.updateFlag == null) {
	            AppData.updateFlag = 0;
	        }
	        if (temp.mode == null) {
	            temp.mode = AppData.mode;
	        }
	        if (data.currentMode != null && data.currentMode != temp.mode) {
	            AppData.updateFlag += 1;
	            AppData.modechange = true;
	        } else if (AppData.updateFlag >= 1 && AppData.updateFlag < 2 || AppData.updateFlag >= 3 && AppData.updateFlag < 4 || AppData.updateFlag >= 5 && AppData.updateFlag < 6) {
	            AppData.updateFlag -= 1;
	            AppData.modechange = false;
	        }
	        if (AppData.updateFlag > 0) {
	            AppData.needSave = true;
	        } else {
	            AppData.needSave = false;
	        }
	        _fun.Funs._extends(AppData, data);
	        AppData.mode = AppData.currentMode;
	        this.trigger(AppData);
	    },
	    onSelectGear: function onSelectGear(data) {
	        needSave = true;
	        if (AppData.updateFlag == null) {
	            AppData.updateFlag = 0;
	        }
	        if (temp.gear == null) {
	            temp.gear = AppData.gear;
	        }
	        if (data.currentGear != null && data.currentGear != temp.gear) {
	            AppData.updateFlag += 2;
	            AppData.gearchange = true;
	        } else if (AppData.updateFlag >= 2 && AppData.updateFlag < 4 || AppData.updateFlag >= 6 && AppData.updateFlag < 8) {
	            AppData.updateFlag -= 2;
	            AppData.gearchange = false;
	        }
	        if (AppData.updateFlag > 0) {
	            AppData.needSave = true;
	        } else {
	            AppData.needSave = false;
	        }
	        _fun.Funs._extends(AppData, data);
	        AppData.gear = AppData.currentGear;
	        this.trigger(AppData);
	    },
	    onSync: function onSync() {
	        if (AppData.needSave) {
	            // 同步数据至app
	            temp.mode = AppData.recommendMode;
	            temp.gear = AppData.recommendGear;
	            AppData.recommendMode = AppData.mode;
	            AppData.recommendGear = AppData.gear;
	            het.send(AppData, function (data) {
	                het.toast("同步成功！");
	                _Actions.Actions.repaint({ needSave: false, updateFlag: 0, modechange: false, gearchange: false, currentMode: AppData.mode, currentGear: AppData.gear, recommendMode: temp.mode, recommendGear: temp.gear, busiSwitch: AppData.busiSwitch });
	                topToast("使用完提拉嫩肤仪,建议进行肤质测试,以得到更好的效果...");
	                temp.busiSwitch = null;
	                temp.mode = null;
	                temp.gear = null;
	                needSave = false; // 重置
	            }, function (data) {
	                het.toast("同步失败！");
	                _Actions.Actions.repaint({ updateFlag: 0, needSave: true, modechange: false, gearchange: false });
	                temp.busiSwitch = null;
	                temp.mode = null;
	                temp.gear = null;
	                needSave = true; // 重置
	            });
	            _Actions.Actions.repaint({ updateFlag: 0, needSave: false, currentMode: AppData.mode, currentGear: AppData.gear, modechange: false, gearchange: false });
	        }
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
/* 8 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * toast组件，用于弹出提示信息
	 * 使用该组件时，需导入toast.css文件
	 * @prop {integer} verticalAlign  垂直对齐，缺省为1，取值0-2，对应top、middle、bottom
	 * @prop {boolean} block          是否宽幅，缺省为false
	 * @prop {integer} secs           显示时间，缺省为2s
	 */
	var Toast = React.createClass({
	    displayName: "Toast",

	    aligns: [{ top: 0 }, { bottom: 100 }, { bottom: 0 }],
	    anim: ["toastD", "toastN", "toastU"],
	    render: function render() {
	        var va = typeof this.props.verticalAlign === "undefined" ? 1 : this.props.verticalAlign;
	        var secs = typeof this.props.secs !== "undefined" ? this.props.secs : 2;
	        var css = this.aligns[va];
	        css.animation = this.anim[va] + " " + (+secs + 2) + "s";
	        //兼容旧版
	        css["-webkit-animation"] = css.animation;
	        css["-moz-animation"] = css.animation;
	        css["-o-animation"] = css.animation;
	        return React.createElement(
	            "section",
	            { style: css, className: "toast" },
	            React.createElement(
	                "div",
	                { className: this.props.block ? "block" : "span" },
	                this.props.children
	            )
	        );
	    }
	});

	module.exports = Toast;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TyraTopScreen = undefined;

	var _Actions = __webpack_require__(4);

	/**
	 * [render description]
	 * @param {[Integer]} [smartModeSwitch] [自动/手动模式 1表示智能模式，2表示手动模式]
	 * @param {[Integer]} [onlineStatus] [设备离线状态 1表示在线，2表示离线]
	 * @param {[Integer]} [electricity] [电量类型（1-电量5%及以下，2-电量10%及以下，3-电量20%及以下，4-电量大于20%小于30%，5-电量大于30%小于40%，6-电量40%小于50%，7-电量大于50%小于60%，8-电量大于60%小于70%，9-电量70%小于80%，10-电量大于80%小于90%，11-电量大于90%小于100%，12-电量100%，16-电池电压过高）]
	 * @return {[type]}
	 */
	var TyraTopScreen = exports.TyraTopScreen = React.createClass({
	    displayName: 'TyraTopScreen',

	    handleBusiSwitch: function handleBusiSwitch() {
	        _Actions.Actions.toggleBusi();
	    },
	    render: function render() {
	        var batteryOrLine = React.createElement('div', null); //设备电量低或者离线在线
	        if (this.props.electricity <= 3 && this.props.electricity > 0) {
	            batteryOrLine = React.createElement('div', { className: 'low-battery' });
	        } else if (this.props.onlineStatus == 2) {
	            batteryOrLine = React.createElement('div', { className: 'out-line' });
	        } else {
	            batteryOrLine = React.createElement('div', null);
	        }
	        return React.createElement(
	            'header',
	            null,
	            React.createElement(
	                'div',
	                { className: 'logo' },
	                batteryOrLine
	            ),
	            React.createElement(
	                'div',
	                { className: 'switchArea' },
	                React.createElement('div', { className: this.props.smartModeSwitch === 1 ? "switchOn" : "switchOff", onTouchEnd: this.handleBusiSwitch })
	            )
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DeviceConfig = undefined;

	var _Actions = __webpack_require__(4);

	/**
	 * @param {[Integer]} [smartModeSwitch] [自动/手动模式 1表示智能模式，2表示手动模式]
	 * @param {[Integer]} [mode] [选择模式索引]
	 * @param {[Integer]} [gear] [选择档位索引]
	 * @param {[Integer]} [type] [当前类型]
	 * @return {[html]}
	 */
	var DeviceConfig = exports.DeviceConfig = React.createClass({
	    displayName: 'DeviceConfig',

	    // 基本数据
	    baseData: {
	        modes: ["C提拉紧致", "M粉刺导出", "N营养导入", "L轻松按摩"],
	        gears: ["低", "高"]
	    },
	    startTouch: function startTouch(e) {
	        if (this.props.smartModeSwitch == 1) {
	            return false;
	        }
	        this.newY = 0;
	        this.startY = parseInt(e.touches[0].clientY);
	    },
	    moveTouch: function moveTouch(e) {
	        if (this.props.smartModeSwitch == 1) {
	            return false;
	        }
	        this.newY = parseInt(e.touches[0].clientY);
	    },
	    endTouch: function endTouch(e) {
	        var _this = this;

	        if (this.props.smartModeSwitch == 1) {
	            return false;
	        }
	        var disY = this.newY || this.startY - this.startY;
	        if (Math.abs(disY) <= 20) {
	            var type = e.currentTarget.getAttribute('data-type');

	            (function () {
	                switch (type) {
	                    case 'mode':
	                        clearTimeout(_this.timer1);
	                        var mode = ReactDOM.findDOMNode(_this.refs.mode);
	                        mode.style.background = '#fde7ee';
	                        _this.timer1 = setTimeout(function () {
	                            mode.style.background = '';
	                            this.setState({
	                                modeshow: true
	                            });
	                            _Actions.Actions.repaint({ modeshow: true });
	                        }.bind(_this), 80);
	                        break;
	                    case 'gear':
	                        clearTimeout(_this.timer2);
	                        var gear = ReactDOM.findDOMNode(_this.refs.gear);
	                        gear.style.background = '#fde7ee';
	                        _this.timer2 = setTimeout(function () {
	                            gear.style.background = '';
	                            this.setState({
	                                gearshow: true
	                            });
	                            _Actions.Actions.repaint({ gearshow: true });
	                        }.bind(_this), 80);
	                        break;
	                }
	            })();
	        } else {
	            return false;
	        }
	    },
	    cancelMode: function cancelMode(e) {
	        e.stopPropagation();
	        e.preventDefault();
	        this.setState({
	            modeshow: false
	        });
	        _Actions.Actions.repaint({ modeshow: false });
	    },
	    confirmMode: function confirmMode(e) {
	        var index = e.currentTarget.getAttribute('data-mode');
	        var mode = parseInt(index) + 1;
	        this.setState({ currentMode: mode, modeshow: false });
	        _Actions.Actions.selectMode({ currentMode: mode, modeshow: false });
	    },
	    cancelGear: function cancelGear(e) {
	        e.stopPropagation();
	        e.preventDefault();
	        this.setState({
	            gearshow: false
	        });
	        _Actions.Actions.repaint({ gearshow: false });
	    },
	    confirmGear: function confirmGear(e) {
	        var index = e.currentTarget.getAttribute('data-gear');
	        var gear = parseInt(index) + 1;
	        this.setState({ currentGear: gear, gearshow: false });
	        _Actions.Actions.selectGear({ currentGear: gear, gearshow: false });
	    },
	    endDefault: function endDefault(e) {
	        e.preventDefault();
	        e.stopPropagation();
	    },
	    render: function render() {
	        var _this2 = this;

	        var smartModeSwitch = this.props.smartModeSwitch; //自动/手动
	        var type = this.props.type; //取得类型
	        var mode = this.props.mode; // 取得模式
	        var gear = this.props.gear; //取得档位
	        var modeshow = this.props.modeshow;
	        var gearshow = this.props.gearshow;
	        var description = React.createElement('span', null); //智能推荐描述
	        var modeClass = "noneDisplay";
	        var gearClass = "noneDisplay";
	        if (smartModeSwitch == 1) {
	            modeClass = "noneDisplay";
	            gearClass = "noneDisplay";
	        } else {
	            if (this.props.modechange) {
	                modeClass = "red";
	            } else {
	                modeClass = "grey";
	            }
	            if (this.props.gearchange) {
	                gearClass = "red";
	            } else {
	                gearClass = "grey";
	            }
	        }
	        if (type <= 1) {
	            description = React.createElement(
	                'div',
	                { className: 'tips' },
	                React.createElement(
	                    'span',
	                    null,
	                    '\u672A\u6D4B\u80A4\u65E0\u6CD5\u4E3A\u60A8\u667A\u80FD\u63A8\u8350\uFF0C\u4EE5\u4E0B\u4E3A\u8BBE\u5907\u9ED8\u8BA4\u503C'
	                ),
	                React.createElement(
	                    'a',
	                    { style: { color: '#007eff' }, href: 'cbeauty://cbeauty_single_skintest' },
	                    '\u8D76\u7D27\u53BB\u6D4B\u80A4>>'
	                )
	            );
	        } else {
	            if (smartModeSwitch == 1) {
	                description = React.createElement(
	                    'div',
	                    { className: 'tips' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u6839\u636E\u60A8\u7684\u80A4\u8D28\u667A\u80FD\u63A8\u8350'
	                    )
	                );
	            } else {
	                description = React.createElement(
	                    'div',
	                    { className: 'tips' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u9009\u62E9\u4E00\u79CD\u6A21\u5F0F\uFF0C\u8BBE\u7F6E\u5AE9\u80A4\u6863\u4F4D'
	                    )
	                );
	            }
	        }
	        return React.createElement(
	            'div',
	            { className: 'flex-cell flex-column', style: { height: '100%' } },
	            description,
	            React.createElement(
	                'div',
	                { className: 'flex-cell flex btnList' },
	                React.createElement(
	                    'div',
	                    { 'data-type': 'mode', ref: 'mode', className: 'flex-column btnSwitch vertical-line', onTouchStart: this.startTouch, onTouchMove: this.moveTouch, onTouchEnd: this.endTouch },
	                    React.createElement(
	                        'h1',
	                        null,
	                        React.createElement(
	                            'span',
	                            { className: 'value' },
	                            this.baseData.modes[mode]
	                        )
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u6A21\u5F0F',
	                            React.createElement('em', { className: modeClass })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { 'data-type': 'gear', ref: 'gear', className: 'flex-column btnSwitch', onTouchStart: this.startTouch, onTouchMove: this.moveTouch, onTouchEnd: this.endTouch },
	                    React.createElement(
	                        'h1',
	                        null,
	                        React.createElement(
	                            'span',
	                            { className: 'value' },
	                            this.baseData.gears[gear]
	                        )
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u6863\u4F4D',
	                            React.createElement('em', { className: gearClass })
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'section',
	                { className: 'modeselect-bd', style: modeshow ? {} : { display: 'none' }, onTouchMove: this.endDefault },
	                React.createElement('div', { className: 'modeselect-shade', onTouchEnd: this.cancelMode, onTouchMove: this.endDefault }),
	                React.createElement(
	                    'ul',
	                    { className: 'modeselect-content', style: { bottom: modeshow ? 0 : "-23rem" } },
	                    this.baseData.modes.map(function (its, index) {
	                        return React.createElement(
	                            'li',
	                            { className: 'flex', key: index, 'data-mode': index, onTouchStart: _this2.endDefault, onTouchMove: _this2.endDefault, onTouchEnd: _this2.confirmMode },
	                            React.createElement(
	                                'span',
	                                null,
	                                its
	                            ),
	                            React.createElement('em', { style: mode == index ? {} : { display: 'none' } })
	                        );
	                    })
	                )
	            ),
	            React.createElement(
	                'section',
	                { className: 'modeselect-bd', style: gearshow ? {} : { display: 'none' }, onTouchMove: this.endDefault },
	                React.createElement('div', { className: 'modeselect-shade', onTouchEnd: this.cancelGear, onTouchMove: this.endDefault }),
	                React.createElement(
	                    'ul',
	                    { className: 'gearselect-content', style: { bottom: gearshow ? 0 : "-10rem" } },
	                    this.baseData.gears.map(function (its, idx) {
	                        return React.createElement(
	                            'li',
	                            { className: 'flex', key: idx, 'data-gear': idx, onTouchStart: _this2.endDefault, onTouchMove: _this2.endDefault, onTouchEnd: _this2.confirmGear },
	                            React.createElement(
	                                'span',
	                                null,
	                                its
	                            ),
	                            React.createElement('em', { style: gear == idx ? {} : { display: 'none' } })
	                        );
	                    })
	                )
	            )
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 保存设置按钮组件
	 * @prop {string} settingStatus  设置按钮状态
	 * @act  {function} this.props.callback 点击保存时触发
	 */
	var SettingButton = React.createClass({
	    displayName: 'SettingButton',

	    getInitialState: function getInitialState() {
	        return {
	            valueH: 0
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            settingBtnStatus: nextProps.settingStatus
	        });
	    },
	    TouchStart: function TouchStart(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        var startY = parseInt(e.touches[0].clientY);
	        var oldValue = parseInt(this.state.valueH);
	        // var status = this.state.settingBtnStatus=='active'?'on':'active';
	        this.setState({
	            startY: startY,
	            oldValue: oldValue
	        });
	    },
	    TouchMove: function TouchMove(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        var newY = parseInt(e.touches[0].clientY);
	        var oldY = parseInt(this.state.startY);
	        var valueH = parseInt(this.state.oldValue) + newY - oldY;
	        this.setState({
	            newY: newY,
	            valueH: valueH
	        });
	    },
	    TouchEnd: function TouchEnd(e) {
	        var _this = this;
	        if (_this.state.settingBtnStatus == 'off') return;
	        var newY = _this.state.newY || this.state.startY;
	        var disY = newY - _this.state.startY;
	        var offsetValue = parseInt(_this.state.oldValue);
	        var oldValue = parseInt(_this.state.valueH);
	        var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
	        if (offset <= 20) {
	            var status = _this.state.settingBtnStatus == 'active' ? 'on' : 'active';
	            _this.setState({
	                settingBtnStatus: status
	            });
	            clearInterval(_this.timer);
	            _this.timer = setTimeout(function () {
	                if (typeof _this.props.callback === 'function') {
	                    _this.props.callback();
	                }
	            }, 50);
	        } else {
	            return;
	        }
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        clearInterval(this.timer);
	    },
	    render: function render() {
	        var idx = this.state.settingBtnStatus || this.props.settingStatus || 'off';
	        return React.createElement(
	            'section',
	            { onTouchStart: this.TouchStart, onTouchMove: this.TouchMove, onTouchEnd: this.TouchEnd, className: "settingbtn-" + idx },
	            React.createElement(
	                'em',
	                null,
	                '\u4FDD\u5B58'
	            )
	        );
	    }
	});
	module.exports = SettingButton;

/***/ }
/******/ ]);