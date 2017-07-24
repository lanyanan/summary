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

	var _App = __webpack_require__(2);

	var _History = __webpack_require__(12);

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    het.config({
	        appId: '30590',
	        appSecret: '98889238ed6e441aaf9b0691b017695f',
	        host: het.getHost()
	    });
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: _App.App }),
	        React.createElement(Route, { path: '/history', component: _History.History })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(3);

	var _BaseComponentClass = __webpack_require__(5);

	var _Actions = __webpack_require__(7);

	var _Store = __webpack_require__(8);

	var _MeasureParts = __webpack_require__(9);

	var _MeasureResult = __webpack_require__(10);

	var _localAll = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;

	var App = exports.App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            water: 0,
	            oil: 0,
	            elasticity: 0,
	            battery: 10,
	            onlineStatus: 1,
	            //测试动画维护
	            measureStatus: 0,
	            isMeasuring: false,
	            selectPart: null,
	            progress: 0,
	            //测试结果展示
	            skinGuide: '暂无数据',
	            skinTypeName: '暂无数据',
	            skinProblem: '暂无数据',
	            skinTypeDesc: {
	                tightTypeDesc: '暂无数据',
	                dryOilTypeDesc: ''
	            }
	        };
	        _this.listenStore(_Store.Store);
	        _this.skinMeasure = _this.skinMeasure.bind(_this);
	        _this.clearAll = _this.clearAll.bind(_this);
	        _this.reSubmit = _this.reSubmit.bind(_this);
	        _this.lxTimer = null;
	        _Actions.Actions.location();
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            clearInterval(this.lxTimer);
	            this.lxTimer = setInterval(function () {
	                _Actions.Actions.repaint();
	            }, 5000);
	            _Actions.Actions.repaint();
	            _Actions.Actions.location();
	        }
	    }, {
	        key: 'skinMeasure',
	        value: function skinMeasure(e) {
	            //测试中不可再测试
	            if (this.state.measureStatus !== 0) return;
	            if (this.state.onlineStatus == 2) return;
	            //选中不可再选中
	            if (e.currentTarget.getAttribute('class') === 'part measured') return;
	            //点击测试清零设备
	            var selectPart = parseInt(e.currentTarget.getAttribute('data-part'));
	            var selectPartName = e.currentTarget.getAttribute('data-partname');
	            _Actions.Actions.setting({
	                updateFlag: 0,
	                selectPart: selectPart,
	                selectPartName: selectPartName,
	                measureTime: _fun.Funs.dateFormat(new Date())
	            });
	            this.setState({
	                updateFlag: 0, selectPart: selectPart,
	                selectPartName: selectPartName,
	                measureStatus: 1,
	                isMeasuring: true
	            });
	        }
	    }, {
	        key: 'clearAll',
	        value: function clearAll() {
	            _Actions.Actions.reMeasure(); //清零重测
	        }
	    }, {
	        key: 'reSubmit',
	        value: function reSubmit() {
	            _Actions.Actions.measureResult(); //上传失败再手动上传
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var measureDataArray = this.state.measureDataArray || [];
	            var min = 5;
	            var measureStatus = this.state.measureStatus;
	            measureStatus === 0 && measureDataArray.map(function (item, index) {
	                //即使遍历五次也还是在开始的位置
	                if (!item.isMeasured) {
	                    if (index < min) min = index;
	                }
	            });
	            var selectState = {
	                onlineStatus: this.state.onlineStatus,
	                battery: this.state.battery !== null ? this.state.battery : 10,
	                progress: this.state.progress,
	                selectPart: this.state.selectPart,
	                selectPartName: this.state.selectPartName,
	                measureStatus: this.state.measureStatus,
	                measureDataArray: measureDataArray,
	                min: min,
	                skinMeasure: this.skinMeasure
	            };
	            var resultState = {
	                onlineStatus: this.state.onlineStatus,
	                skinTypeName: this.state.skinTypeName,
	                skinTypeDesc: this.state.skinTypeDesc,
	                skinProblem: this.state.skinProblem,
	                skinGuide: this.state.skinGuide,
	                measureStatus: this.state.measureStatus,
	                reSubmit: this.reSubmit,
	                clearAll: this.clearAll
	            };
	            //调试打印
	            //<aside id="console">{ 'measureStatus:' + measureStatus }</aside>
	            return React.createElement(
	                'section',
	                { className: 'container' },
	                React.createElement(_MeasureParts.MeasureParts, { selectState: selectState }),
	                React.createElement(_MeasureResult.MeasureResult, { resultState: resultState }),
	                React.createElement(
	                    Link,
	                    { to: '/history', className: 'history-btn' },
	                    ' '
	                ),
	                React.createElement(
	                    'aside',
	                    { id: 'mytoast' },
	                    ' '
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(4);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(6);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', //数据汇总返回
	'setting', //实际上只是设备清零
	'getting', //获取运行到的水油弹
	'measureResult', //拿到水油弹请求‘所谓的’测试结果
	'reMeasure', //清空数据，重新测试
	'location', //获取地理位置
	'deviceInfo', //获取是否在线等字段
	'getHistoryData', // 获取某一天历史数据
	'getValidDate']);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 公共store，建议所有store事件都在此文件定义
	 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
	 *
	 * @measureStatus 0:请选择 1:初始化 2:请贴近 3:正在测试中 4:测试成功 5:测试失败，请重新测试 6:初始化失败 7:请求‘所谓的’测试结果成功 8:请求汇总结果失败 9:offline
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _fun = __webpack_require__(3);

	var _Actions = __webpack_require__(7);

	var MeasureStatusDescription = {
	    0: '请选择一个部位',
	    1: '设备初始化中', //点击，请求清零接口（set）
	    2: '请将设备贴近额头', //清零成功（set），请求水油弹数据（get）接口
	    3: '正在测试额头...', //轮询水油弹(get)21次
	    4: '测试成功', //获取水油弹成功
	    5: '测试失败，请重新测试', //获取水油弹失败（轮询21次也未取到数据，或者接口请求失败，回到未选择状态）
	    6: '初始化失败', //清零失败（set）
	    7: '五点测试完成，请求所谓的测试结果成功', //五点结果接口请求成功
	    8: '五点测试完成，请求所谓的测试结果失败',
	    9: '五点测试完成，还未请求测试结果接口',
	    10: '设备不在线'
	};
	var AppData = {
	    measureDataArray: [{
	        part: 0,
	        name: '额头',
	        water: 0,
	        oil: 0,
	        elasticity: 0,
	        isMeasured: false
	    }, {
	        part: 1,
	        name: '右脸',
	        water: 0,
	        oil: 0,
	        elasticity: 0,
	        isMeasured: false
	    }, {
	        part: 2,
	        name: '鼻子',
	        water: 0,
	        oil: 0,
	        elasticity: 0,
	        isMeasured: false
	    }, {
	        part: 3,
	        name: '下巴',
	        water: 0,
	        oil: 0,
	        elasticity: 0,
	        isMeasured: false
	    }, {
	        part: 4,
	        name: '左脸',
	        water: 0,
	        oil: 0,
	        elasticity: 0,
	        isMeasured: false
	    }]
	};
	var docker = {
	    //华为         accessToken是一个异步的接口请求
	    appId: '30590',
	    appType: !!(navigator.userAgent.indexOf('Android') + 1) ? 1 : 2,
	    appSecret: '98889238ed6e441aaf9b0691b017695f',
	    cityCode: '101010100',
	    deviceId: het.getDeviceId(),
	    host: het.getHost() || 'https://test.api.clife.cn' || 'https://200.200.200.50',
	    progress: 0,
	    locker: true,
	    clearLocker: true,
	    resetStatus: function resetStatus(json) {
	        json = json || {};
	        if (json.measureStatus !== undefined) AppData.measureStatus = json.measureStatus || 0;
	        if (json.selectPart !== undefined) AppData.selectPart = json.selectPart || 0;
	        if (json.online !== undefined) AppData.selectPart = json.selectPart || 1;
	        if (json.progress !== undefined) AppData.progress = json.progress;
	        return json;
	    },
	    dataTimer: null,
	    step0Timer: null,
	    step1Timer: null,
	    step2Timer: null,
	    step3Timer: null,
	    step4Timer: null,
	    step5Timer: null,
	    step6Timer: null,
	    iSwitch: true
	};
	var measureRec = [{
	    part: 11,
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    skinType: 1,
	    skinSubType: 1,
	    skinAgeType: 1,
	    skinMeterId: docker.deviceId
	}, {
	    part: 15,
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    skinType: 1,
	    skinSubType: 1,
	    skinAgeType: 1,
	    skinMeterId: docker.deviceId,
	    measureTime: "2017-01-01 00:00:00" //每次的测量时间
	}, {
	    part: 12,
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    skinType: 1,
	    skinSubType: 1,
	    skinAgeType: 1,
	    skinMeterId: docker.deviceId,
	    measureTime: "2017-01-01 00:00:00" //每次的测量时间
	}, {
	    part: 14,
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    skinType: 1,
	    skinSubType: 1,
	    skinAgeType: 1,
	    skinMeterId: docker.deviceId,
	    measureTime: "2017-01-01 00:00:00" //每次的测量时间
	}, {
	    part: 13,
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    skinType: 1,
	    skinSubType: 1,
	    skinAgeType: 1,
	    skinMeterId: docker.deviceId,
	    measureTime: "2017-01-01 00:00:00" //每次的测量时间
	}];

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint() {
	        // 本地测试五个部位，注释掉华为hw_plugin_public可见
	        // AppData.measureDataArray[1].isMeasured  = true;
	        // AppData.measureDataArray[2].isMeasured  = true;
	        // AppData.measureDataArray[3].isMeasured  = true;
	        // AppData.measureDataArray[4].isMeasured  = true;
	        // AppData.measureDataArray[0].isMeasured  = true;
	        this.onDeviceInfo();
	        this.trigger(AppData);
	    },
	    onSetting: function onSetting(data) {
	        clearInterval(docker.dataTimer);
	        clearTimeout(docker.step0Timer);
	        clearTimeout(docker.step3Timer);
	        var self = this;
	        var url = docker.host + '/v1/app/chairdressing/elasticskinmeter/config/set';
	        var sendData = {
	            updateFlag: 0,
	            //后台顺序 : 11-额头 15-右脸 12-鼻子 14-下巴 13-左脸
	            //前端顺序 : 0-额头  1-右脸  2-鼻子  3-下巴  4-左脸
	            part: [11, 15, 12, 14, 13][data.selectPart]
	        };

	        //全局变量层层依赖，监听机制
	        AppData.selectPart = data.selectPart;
	        AppData.isMeasuring = true;
	        AppData.measureStatus = 1;
	        AppData.measureTime = data.measureTime;

	        het.post(url, sendData, function (xhr) {
	            xhr = JSON.parse(xhr);
	            if (xhr.code == 0) {
	                //设备滴一声，并不是清零成功（所以是设备还在初始化中），开始请求水油弹运行数据，呵呵哒，此刻，用户一定是懵逼的
	                docker.clearLocker = true; //设备响应,开启接收数据
	                docker.locker = true;

	                self.onGetting({
	                    part: sendData.part,
	                    selectPart: data.selectPart,
	                    optTimestamp: xhr.data.optTimestamp,
	                    measureTime: sendData.measureTime
	                });
	            } else {
	                clearTimeout(docker.step0Timer);
	                //展示4秒初始化失败文案
	                docker.resetStatus({ selectPart: null, measureStatus: 6 });
	                self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 6 }));
	                //4秒展示完成，跳转到请选择一个部位
	                docker.step0Timer = setTimeout(function () {
	                    docker.resetStatus({ selectPart: null, measureStatus: 0 });
	                    self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
	                }, 4000);
	            }
	        }, function (xhr) {

	            clearTimeout(docker.step0Timer);
	            //展示4秒初始化失败文案
	            docker.resetStatus({ selectPart: null, measureStatus: 6 });
	            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 6 }));
	            //4秒展示完成，跳转到请选择一个部位
	            docker.step0Timer = setTimeout(function () {
	                docker.resetStatus({ selectPart: null, measureStatus: 0 });
	                self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
	            }, 4000);
	        });
	    },
	    onGetting: function onGetting(data) {

	        clearInterval(docker.dataTimer);
	        clearTimeout(docker.step3Timer);
	        clearTimeout(docker.step4Timer);

	        var self = this,
	            url = docker.host + '/v1/app/chairdressing/elasticskinmeter/data/get',
	            params = {
	            appType: docker.appType,
	            part: data.part,
	            optTimestamp: data.optTimestamp
	        },
	            selectPart = data.selectPart,
	            measureTime = data.measureTime;
	        var lxNumber = 0;
	        var lxGetting = function lxGetting() {
	            het.get(url, params, function (res) {
	                res = JSON.parse(res);
	                if (res.code == 0) {
	                    //电量轮询汇总返回就好，不用即刻返回
	                    AppData.battery = res.data.electricity;
	                    //轮询21次
	                    lxNumber++;
	                    if (lxNumber == 20) {
	                        clearInterval(docker.dataTimer);
	                        clearTimeout(docker.step3Timer);
	                        clearTimeout(docker.step5Timer);
	                        if (AppData.measureStatus == 1) {
	                            //提示初始化失败3秒，然后跳转到位选择状态
	                            docker.resetStatus({ selectPart: null, measureStatus: 6 });
	                            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 6 }));
	                        } else {
	                            //提示测试失败3秒，然后跳转到位选择状态
	                            docker.resetStatus({ selectPart: null, measureStatus: 5 });
	                            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 5 }));
	                        }
	                        //跳转到请选择一个部位
	                        docker.step5Timer = setTimeout(function () {
	                            docker.resetStatus({ selectPart: null, measureStatus: 0 });
	                            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
	                        }, 3000);
	                        return false;
	                    }
	                    //清零成功
	                    if (res.data.cleanStatus == 0 && docker.clearLocker) {
	                        clearTimeout(docker.step3Timer);
	                        docker.clearLocker = false;
	                        //清零成功，提示请将设备贴近测试部位，3秒后跳转到测试中动画
	                        docker.resetStatus({ measureStatus: 2 });
	                        self.trigger(docker.resetStatus({ measureStatus: 2 }));

	                        //进入测试中动画
	                        docker.step3Timer = setTimeout(function () {
	                            docker.resetStatus({ measureStatus: 3 }), self.trigger(docker.resetStatus({ measureStatus: 3 }));
	                        }, 3000);
	                    }
	                    //设备响应，清零成功，有测试并上传测试数据到服务器
	                    if (res.data.testStatus == 0 && res.data.cleanStatus == 0 && res.data.water !== null && res.data.oil !== null && res.data.elasticity !== null && docker.locker) {
	                        docker.locker = false; //接收到一条数据后立即，停止接收数据，防止设备重复发送数据过来
	                        docker.progress++; //接收到一条数据保存一个进度，知道进度等于5，测试完成
	                        // clearInterval(docker.dataTimer);
	                        //将获取到的水油弹数据缓存起来
	                        AppData.measureDataArray[selectPart].isMeasured = true;
	                        AppData.measureDataArray[selectPart].water = res.data.water;
	                        AppData.measureDataArray[selectPart].oil = res.data.oil;
	                        AppData.measureDataArray[selectPart].elasticity = res.data.elasticity;

	                        //请求所谓的测试结果接口的参数对象
	                        measureRec[selectPart].water = res.data.water;
	                        measureRec[selectPart].oil = res.data.oil;
	                        measureRec[selectPart].elasticity = res.data.elasticity;
	                        measureRec[selectPart].measureTime = measureTime;

	                        //开启计数器，每成功一次记录一次，五次之后请求汇总结果接口
	                        //het.toast(docker.progress);

	                        if (docker.progress == 5) {
	                            //het.toast(docker.progress+'点测试全部完成');
	                            //五点测试完成，请求所谓的测试结果还有一点点间隔，这个时候的状态提示文案也需要处理
	                            docker.resetStatus({ selectPart: null, measureStatus: 9 });
	                            self.trigger(docker.resetStatus({
	                                selectPart: null, measureStatus: 9, measureDataArray: AppData.measureDataArray
	                            }));
	                            self.onMeasureResult();
	                            clearInterval(docker.dataTimer);
	                            return false;
	                        }
	                        if (docker.progress < 5) {
	                            clearTimeout(docker.step4Timer);
	                            //拉取到水油弹数据，提示测试成功,三秒后跳转到默认状态
	                            docker.resetStatus({ selectPart: null, measureStatus: 4 });
	                            self.trigger(docker.resetStatus({
	                                selectPart: null, measureStatus: 4,
	                                measureDataArray: AppData.measureDataArray
	                            }));
	                            //
	                            docker.step4Timer = setTimeout(function () {
	                                docker.resetStatus({ selectPart: null, measureStatus: 0 });
	                                self.trigger(docker.resetStatus({
	                                    selectPart: null, measureStatus: 0, measureDataArray: AppData.measureDataArray
	                                }));
	                            }, 3000);
	                        }
	                        clearInterval(docker.dataTimer);
	                    }
	                    //测试出错
	                    if (res.data.testFailDescrip) {
	                        //提示测试失败3秒，然后跳转到位选择状态
	                        docker.resetStatus({ selectPart: null, measureStatus: 5 });
	                        self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 5 }));
	                        //
	                        clearTimeout(docker.step5Timer);
	                        docker.step5Timer = setTimeout(function () {
	                            docker.resetStatus({ selectPart: null, measureStatus: 0 });
	                            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0 }));
	                        }, 3000);

	                        clearInterval(docker.dataTimer);
	                        return;
	                    }
	                }
	            }, function (res) {
	                //het.toast('请检查网络或设备在线情况');
	            });
	        };
	        lxGetting();
	        docker.dataTimer = setInterval(lxGetting, 2000);
	    },
	    onMeasureResult: function onMeasureResult() {
	        var self = this;
	        var url = docker.host + '/v1/app/chairdressing/skinMeasure/uploadSkinTestResult';

	        het.getToken(
	        //成功回调
	        function (xhr) {
	            var accessToken = xhr;
	            //字符串拼接的时候一定要细心，一错全错
	            var sendObj = 'skinType5=' + 1 + '&skinAgeType=' + 1 + '&avgOil=' + 1 + '&avgWater=' + 1 + '&avgElasticity=' + 1 + "&location=" + docker.cityCode + '&measureTime=' + _fun.Funs.dateFormat(new Date()) + "&appId=" + docker.appId + "&accessToken=" + accessToken + '&timestamp=' + +new Date() + '&measureRec=' + JSON.stringify(measureRec);

	            //console.log('sendObj--------------',sendObj);
	            var sucCallback = function sucCallback(xhr) {
	                xhr = JSON.parse(xhr);
	                xhr.code === 0 && _fun.Funs._extends(AppData, xhr.data);
	                if (xhr.code === 0) {
	                    //het.toast('上传成功');
	                    docker.resetStatus({ selectPart: null, measureStatus: 7 });
	                    self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 7 }));
	                } else {
	                    //上传成功，但是参数错误等原因导致返回结果不正确，也是上传失败
	                    //het.toast('上传失败，请重新上传');
	                    docker.resetStatus({ selectPart: null, measureStatus: 8 });
	                    self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 8 }));
	                }
	            };
	            var errCallback = function errCallback(xhr) {
	                //token错误，域名或服务器错误，网络延迟等导致的上传失败
	                //het.toast('请检查网络或设备在线情况');
	                docker.resetStatus({ selectPart: null, measureStatus: 8 });
	                self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 8 }));
	            };
	            het.post(url, sendObj, sucCallback, errCallback, 1);
	        },
	        //失败回调
	        function (xhr) {
	            //token错误，域名或服务器错误，网络延迟等导致的上传失败
	            //het.toast('请检查网络或设备在线情况');
	            docker.resetStatus({ selectPart: null, measureStatus: 8 });
	            self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 8 }));
	        });
	    },
	    onReMeasure: function onReMeasure() {
	        AppData.measureDataArray.map(function (item, index) {
	            item.water = 0;
	            item.oil = 0;
	            item.elasticity = 0;
	            item.isMeasured = false;
	        });
	        docker.progress = 0;
	        docker.resetStatus({ selectPart: null, measureStatus: 0 });
	        self.trigger(docker.resetStatus({ selectPart: null, measureStatus: 0, measureDataArray: AppData.measureDataArray }));
	    },
	    onDeviceInfo: function onDeviceInfo() {
	        var self = this;
	        var tokenSuc = function tokenSuc(data) {
	            var accessToken = data;
	            //获取设备基础信息，仅网络字段onlineStatus有用,~_~
	            var url = docker.host + '/v1/device/getDeviceInfo';
	            url += '?accessToken=' + accessToken + '&appId=' + docker.appId + '&appType=' + docker.appType + '&deviceId=' + docker.deviceId + '&timestamp=' + +new Date();
	            var scb = function scb(xhr) {
	                xhr = JSON.parse(xhr);
	                if (xhr.code == 0) {
	                    AppData.onlineStatus = xhr.data.onlineStatus;
	                } else {
	                    AppData.onlineStatus = 2;
	                    AppData.measureStatus = 0;
	                    AppData.selectPart = null;
	                    AppData.isMeasuring = false;
	                    self.trigger({ selectPart: null, measureStatus: 0, isMeasuring: false });
	                }
	            };
	            var ecb = function ecb(xhr) {
	                //接口调用失败，则返回离线状态
	                //het.toast('请检查网络或设备在线情况');
	                AppData.onlineStatus = 2;
	                AppData.measureStatus = 0;
	                AppData.selectPart = null;
	                AppData.isMeasuring = false;
	                self.trigger({ selectPart: null, measureStatus: 0, isMeasuring: false });
	            };
	            het.get(url, '', scb, ecb, 1);
	        };
	        var tokenErr = function tokenErr(data) {
	            //tokenErr也返回离线状态
	            //het.toast('请检查网络或设备在线情况');
	            AppData.onlineStatus = 2;
	            AppData.measureStatus = 0;
	            AppData.selectPart = null;
	            AppData.isMeasuring = false;
	            self.trigger({ selectPart: null, measureStatus: 0, isMeasuring: false });
	        };
	        het.getToken(tokenSuc, tokenErr);
	    },
	    onLocation: function onLocation() {
	        //获取位置信息，非必须，因为有默认值
	        var url = docker.host + '/v1/web/env/location/get?city=ip';
	        var scb = function scb(xhr) {
	            xhr = JSON.parse(xhr);
	            if (xhr.code == 0) docker.cityCode = xhr.data.cityCode;
	            return;
	        };
	        var ecb = function ecb() {
	            return;
	        };
	        het.get(url, '', scb, ecb, 1);
	    },
	    onGetHistoryData: function onGetHistoryData(data) {
	        var me = this;
	        var url = docker.host + '/v1/app/chairdressing/skinMeasure/getHistorySkinDataByday';
	        het.get(url, data ? data : '', function (xhr) {
	            var result = JSON.parse(xhr);
	            //模拟数据
	            // result.data=[
	            //     {
	            //         "skinMeasureId": 3320,
	            //         "measureTime": "2016-11-01 18:18:13",
	            //         "skinTypeDesc": "您的肤质为：干性肤质",
	            //         "partMeasureVOs": [
	            //             {
	            //                 "partMeasureId": 22611,
	            //                 "part": 14,
	            //                 "water": 15.9,
	            //                 "oil": 9.5,
	            //                 "elasticity": 9.9,
	            //                 "skinTypeName": "重度干燥"
	            //             },
	            //             {
	            //                 "partMeasureId": 22612,
	            //                 "part": 15,
	            //                 "water": 50,
	            //                 "oil": 24.5,
	            //                 "elasticity": 8.7,
	            //                 "skinTypeName": "中性"
	            //             },
	            //             {
	            //                 "partMeasureId": 22613,
	            //                 "part": 11,
	            //                 "water": 20,
	            //                 "oil": 12,
	            //                 "elasticity": 9.5,
	            //                 "skinTypeName": "重度干燥"
	            //             },
	            //             {
	            //                 "partMeasureId": 22614,
	            //                 "part": 13,
	            //                 "water": 19.5,
	            //                 "oil": 11.7,
	            //                 "elasticity": 9.9,
	            //                 "skinTypeName": "重度干燥"
	            //             },
	            //             {
	            //                 "partMeasureId": 22615,
	            //                 "part": 12,
	            //                 "water": 19.6,
	            //                 "oil": 11.8,
	            //                 "elasticity": 9.3,
	            //                 "skinTypeName": "重度干燥"
	            //             }
	            //         ]
	            //     },
	            //     {
	            //         "skinMeasureId": 3319,
	            //         "measureTime": "2016-11-01 10:43:05",
	            //         "skinTypeDesc": "您的肤质为：干性肤质.紧致",
	            //         "partMeasureVOs": [
	            //             {
	            //                 "partMeasureId": 22603,
	            //                 "part": 14,
	            //                 "water": 21.1,
	            //                 "oil": 12.1,
	            //                 "elasticity": 6.2,
	            //                 "skinTypeName": "缺油性偏干"
	            //             },
	            //             {
	            //                 "partMeasureId": 22604,
	            //                 "part": 15,
	            //                 "water": 19.8,
	            //                 "oil": 11.9,
	            //                 "elasticity": 7.5,
	            //                 "skinTypeName": "重度干燥"
	            //             },
	            //             {
	            //                 "partMeasureId": 22605,
	            //                 "part": 11,
	            //                 "water": 19.9,
	            //                 "oil": 11.9,
	            //                 "elasticity": 8.2,
	            //                 "skinTypeName": "重度干燥"
	            //             },
	            //             {
	            //                 "partMeasureId": 22606,
	            //                 "part": 13,
	            //                 "water": 19.6,
	            //                 "oil": 11.8,
	            //                 "elasticity": 6.8,
	            //                 "skinTypeName": "重度干燥"
	            //             },
	            //             {
	            //                 "partMeasureId": 22607,
	            //                 "part": 12,
	            //                 "water": 19.2,
	            //                 "oil": 11.5,
	            //                 "elasticity": 6.3,
	            //                 "skinTypeName": "重度干燥"
	            //             }
	            //         ]
	            //     }
	            // ];
	            //真实数据
	            if (result.data.length != 0) {
	                me.trigger({ history: result.data, showClndr: false });
	            } else {
	                me.trigger({ history: '', showClndr: false });
	            }
	        }, function (response) {
	            het.toast('请检查网络或设备在线情况');
	        });
	    },
	    onGetValidDate: function onGetValidDate(data, dateObj, month) {
	        //console.log('data',data,'dateObj',dateObj);
	        var self = this,
	            url = docker.host + '/v1/app/chairdressing/skinMeasure/getAllSkinTestRecord';
	        het.get(url, data ? data : '', function (response) {
	            var result = JSON.parse(response);
	            if (result.code == 0) {
	                (function () {
	                    //模拟数据
	                    // result.data=[
	                    //     {
	                    //         "times": "2",
	                    //         "measureTime": "2016-11-01 10:18:13"
	                    //     },
	                    //     {
	                    //         "times": "1",
	                    //         "measureTime": "2016-11-02 01:03:17"
	                    //     },
	                    //     {
	                    //         "times": "1",
	                    //         "measureTime": "2016-11-10 08:00:20"
	                    //     },
	                    //     {
	                    //         "times": "1",
	                    //         "measureTime": "2016-11-15 07:06:44"
	                    //     },
	                    //     {
	                    //         "times": "2",
	                    //         "measureTime": "2016-11-16 11:05:29"
	                    //     },
	                    //     {
	                    //         "times": "1",
	                    //         "measureTime": "2016-11-17 12:07:07"
	                    //     },
	                    //     {
	                    //         "times": "11",
	                    //         "measureTime": "2016-11-18 02:40:30"
	                    //     },
	                    //     {
	                    //         "times": "1",
	                    //         "measureTime": "2016-11-22 05:27:08"
	                    //     }
	                    // ];
	                    //真实数据
	                    var tagArr = [];
	                    if (result.data.length > -1) {
	                        result.data.map(function (res) {
	                            tagArr.push(Number(res.measureTime.substring(8, 10)));
	                        });
	                    }

	                    //重绘日历，日期对象函数返回方法tag();
	                    if (dateObj) {
	                        dateObj.tag(tagArr);
	                    };

	                    //缓存第一次请求月所有可用日期数组，用作每次日历打开时候渲染
	                    if (docker.iSwitch /*&& month!='undefined' && month == (new Date().getMonth()+1)*/) {
	                            docker.iSwitch = false;
	                            self.trigger({
	                                firstTagDates: tagArr
	                            });
	                        }
	                    //返回有测试数据的日期数组
	                    self.trigger({
	                        tagDates: tagArr
	                    });
	                })();
	            };
	        }, function (response) {
	            het.toast('请检查网络或设备在线情况');
	        });
	    }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var MeasureParts = exports.MeasureParts = React.createClass({
		displayName: 'MeasureParts',
		componentDidMount: function componentDidMount() {},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},

		render: function render() {
			var data = this.props.selectState;
			var onlineStatus = data.onlineStatus;
			var battery = data.battery;
			var selectPart = data.selectPart;
			var selectPartName = data.selectPartName;
			var measureStatus = data.measureStatus;
			var measureDataArray = data.measureDataArray;
			var skinMeasure = onlineStatus == 2 ? data.skinMeasure : data.skinMeasure;
			var min = data.min;
			//进度条
			var progress = 0;
			measureDataArray.map(function (o, i) {
				o.isMeasured && progress++;
			});
			progress = progress * 20;
			//电量
			battery < 4 && het.toast('battery' + battery);
			//状态动画提示文案
			var measureStatusTxt = ['请选择一个部位', '设备初始化中...', '请将设备贴近' + selectPartName, '正在测试' + selectPartName + '...', '测试成功,请选择下一个部位', '测试失败，请重新测试', '初始化失败', '', //请求汇总结果成功
			'', //请求汇总结果失败
			'五点设备全部测试完成', '' //offline不在这里维护
			][measureStatus];
			var offline = React.createElement(
				'p',
				{ className: 'offline' },
				React.createElement(
					'span',
					null,
					'\u8BBE\u5907\u4E0D\u5728\u7EBF'
				),
				React.createElement(
					'span',
					null,
					'\u8BF7\u5F00\u542F\u8BBE\u5907\uFF0C\u5E76\u786E\u4FDD\u7F51\u7EDC\u8FDE\u63A5\u6B63\u5E38'
				)
			);

			//测试过程动画
			var measureAnima = null;
			if (measureStatus == 0) measureAnima = React.createElement('div', { className: 'pulse' });
			if (measureStatus == 1) measureAnima = React.createElement('div', { className: 'initialize' });
			if (measureStatus == 2) measureAnima = React.createElement('div', { className: 'measuring' });
			if (measureStatus == 3) measureAnima = React.createElement('div', { className: 'measuring' });
			var partArr = ['额头', '右脸', '鼻子', '下巴', ' 左脸'];
			var Btns = measureDataArray.map(function (item, index) {
				return React.createElement(
					'dd',
					{ className: item.isMeasured ? 'part measured' : 'part', onTouchStart: skinMeasure, 'data-part': index, 'data-partname': item.name, key: index },
					index == min && onlineStatus != 2 ? React.createElement(
						'div',
						{ className: 'pulse' },
						React.createElement(
							'div',
							{ className: 'un-measuring' },
							React.createElement('i', null),
							React.createElement('i', null),
							React.createElement('i', null)
						)
					) : null,
					index == selectPart ? measureAnima : null,
					React.createElement(
						'span',
						{ className: 'txt' },
						item.name
					),
					item.isMeasured && React.createElement(
						'aside',
						{ className: 'measure-tips' },
						React.createElement(
							'p',
							null,
							React.createElement(
								'span',
								null,
								'\u6C34:',
								item.water,
								'%'
							),
							React.createElement(
								'span',
								null,
								' \u6CB9:',
								item.oil,
								'%'
							)
						),
						React.createElement(
							'p',
							null,
							'\u5F39:',
							item.elasticity,
							' '
						)
					),
					true
				);
			}.bind(this));

			return React.createElement(
				'figure',
				{ className: measureStatus == 7 || measureStatus == 8 ? measureStatus == 7 ? "action-area special-suc" : 'action-area special-err' : 'action-area' },
				React.createElement(
					'aside',
					{ className: 'progress-bar', style: { width: progress + '%' } },
					' '
				),
				React.createElement(
					'dl',
					{ className: 'measure-parts' },
					Btns
				),
				React.createElement(
					'aside',
					{ className: measureStatus != 7 && measureStatus != 8 ? "measure-status" : "" },
					onlineStatus == 2 ? offline : React.createElement(
						'p',
						{ className: 'status-txt' },
						measureStatusTxt
					),
					battery < 4 ? React.createElement(
						'p',
						{ className: 'battery' },
						'\u8BBE\u5907\u7535\u91CF\u4F4E\uFF0C\u8BF7\u53CA\u65F6\u5145\u7535'
					) : null
				)
			);
		}
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var MeasureResult = exports.MeasureResult = React.createClass({
		displayName: "MeasureResult",
		componetDidMount: function componetDidMount() {},

		render: function render() {
			var data = this.props.resultState,
			    onlineStatus = data.onlineStatus,
			    measureStatus = data.measureStatus,
			    skinTypeName = data.skinTypeName,
			    skinTypeDesc = data.skinTypeDesc,
			    skinProblem = data.skinProblem,
			    skinGuide = data.skinGuide,
			    reSubmit = data.reSubmit,
			    clearAll = data.clearAll;

			var resultArea = React.createElement(
				"section",
				{ className: "measure-data" },
				React.createElement(
					"aside",
					{ className: "measure-intro" },
					React.createElement(
						"h4",
						null,
						"\u80A4\u8D28\u7C7B\u578B\u8BF4\u660E"
					),
					React.createElement(
						"p",
						null,
						skinTypeDesc.tightTypeDesc
					),
					React.createElement(
						"p",
						null,
						skinTypeDesc.dryOilTypeDesc
					)
				),
				React.createElement(
					"aside",
					{ className: "measure-problem" },
					React.createElement(
						"h4",
						null,
						"\u80A4\u8D28\u95EE\u9898"
					),
					React.createElement(
						"p",
						null,
						skinProblem
					)
				),
				React.createElement(
					"aside",
					{ className: "measure-suggest" },
					React.createElement(
						"h4",
						null,
						"\u62A4\u80A4\u6307\u5357"
					),
					React.createElement(
						"p",
						null,
						skinGuide
					)
				)
			);

			return React.createElement(
				"figure",
				{ className: measureStatus == 7 || measureStatus == 8 ? measureStatus == 8 ? 'result-area err' : 'result-area suc' : 'result-area hide' },
				React.createElement(
					"section",
					{ className: "measure-again" },
					measureStatus == 8 ? React.createElement(
						"div",
						{ className: "getting-failed" },
						React.createElement(
							"p",
							{ className: "failed-txt" },
							"\u83B7\u53D6\u80A4\u8D28\u5206\u6790\u7ED3\u679C\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5"
						),
						React.createElement(
							"h3",
							{ className: "failed-btn", onTouchStart: reSubmit },
							React.createElement(
								"span",
								null,
								React.createElement("i", { src: "../static/img/i-refresh.png" }),
								React.createElement(
									"b",
									null,
									"\u5237\u65B0\u91CD\u8BD5"
								)
							)
						)
					) : React.createElement(
						"div",
						{ className: "getting-success" },
						React.createElement(
							"h5",
							null,
							'您的肤质为'
						),
						React.createElement(
							"h4",
							null,
							skinTypeName
						)
					),
					React.createElement(
						"h3",
						{ ref: "history", onTouchStart: clearAll },
						React.createElement(
							"span",
							null,
							"\u91CD\u65B0\u6D4B\u8BD5"
						)
					)
				),
				measureStatus == 7 ? resultArea : null
			);
		}
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var measureDataArray = [{
	    part: 0,
	    name: '额头',
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    isMeasured: false
	}, {
	    part: 1,
	    name: '右脸',
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    isMeasured: false
	}, {
	    part: 2,
	    name: '鼻子',
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    isMeasured: false
	}, {
	    part: 3,
	    name: '下巴',
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    isMeasured: false
	}, {
	    part: 4,
	    name: '左脸',
	    water: 0,
	    oil: 0,
	    elasticity: 0,
	    isMeasured: false
	}];
	var developerNotes = {
	    number: '80011266',
	    version: '1.0.0',
	    beginTime: '2016/12/20',
	    endTime: '2017/1/20',
	    MeasureStatusDescription: {
	        0: '请选择一个部位',
	        1: '设备初始化中', //点击，请求清零接口（set）
	        2: '请将设备贴近额头', //清零成功（set），请求水油弹数据（get）接口
	        3: '正在测试额头...', //轮询水油弹(get)21次
	        4: '测试成功', //获取水油弹成功
	        5: '测试失败，请重新测试', //获取水油弹失败（轮询21次也未取到数据，或者接口请求失败，回到未选择状态）
	        6: '初始化失败', //清零失败（set）
	        7: '五点测试完成，请求所谓的测试结果成功', //五点结果接口请求成功
	        8: '五点测试完成，请求所谓的测试结果失败',
	        9: '五点测试完成，还未请求测试结果接口',
	        10: '设备不在线'
	    }
	};
	var Arr = {
	    datas: [],
	    readProps: function readProps() {
	        return undefined.datas;
	    },
	    writeProps: function writeProps(data) {
	        undefined.datas.push(data);
	    }
	};

	exports.measureDataArray = measureDataArray;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 历史数据组件
	 * @prop {obj} getdata  请求接口需要传的参数
	 * /v1/app/chairdressing/skinMeasure/getAllSkinTestRecord
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.History = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(5);

	var _fun = __webpack_require__(3);

	var _Actions = __webpack_require__(7);

	var _Store = __webpack_require__(8);

	var _Calendar = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var measureTime = new Date();

	var History = exports.History = function (_BaseComponent) {
	    _inherits(History, _BaseComponent);

	    function History(props) {
	        _classCallCheck(this, History);

	        var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, props));

	        _this.state = { hideStatus: {}, showClndr: false, month: new Date().getMonth() + 1 };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(History, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //请求当日历史数据
	            var year = new Date().getFullYear(),
	                month = new Date().getMonth() + 1,

	            //时区参数
	            timeZone = new Date().getTimezoneOffset() / 60,

	            //历史数据参数
	            yesterday = _fun.Funs.dateFormat(new Date() - 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00',
	                today = _fun.Funs.dateFormat(new Date(), 'yyyy-MM-dd') + ' 16:00:00',

	            //有数据日期接口参数
	            beginDate = _fun.Funs.dateFormat(new Date(year, month - 1, 1) - 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00',
	                //上月最后一天日期
	            endDate = _fun.Funs.dateFormat(new Date(year, month, 0), 'yyyy-MM-dd') + ' 16:00:00'; //本月最后一天

	            //请求当天历史数据
	            _Actions.Actions.getHistoryData({ measureDateBeginNew: yesterday, measureDateEndNew: today, timeZone: timeZone });
	            //请求当月有测试数据日期，用作渲染日历插件，UTC时间
	            _Actions.Actions.getValidDate({ measureDateBeginNew: beginDate, measureDateEndNew: endDate, timeZone: timeZone } /*,null,month*/);
	        }
	    }, {
	        key: 'handleClndr',
	        value: function handleClndr() {
	            //请求月有测试数据的日期
	            var year = new Date().getFullYear(),
	                month = new Date().getMonth() + 1,

	            //时区参数
	            timeZone = new Date().getTimezoneOffset() / 60,

	            //有数据日期接口参数
	            beginDate = _fun.Funs.dateFormat(new Date(year, month - 1, 1) - 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00',
	                //上月最后一天日期
	            endDate = _fun.Funs.dateFormat(new Date(year, month, 0), 'yyyy-MM-dd') + ' 16:00:00'; //本月最后一天
	            //请求当月有测试数据日期，用作渲染日历插件，UTC时间
	            _Actions.Actions.getValidDate({ measureDateBeginNew: beginDate, measureDateEndNew: endDate, timeZone: timeZone });

	            var showClndr = this.state.showClndr;
	            this.setState({ showClndr: !showClndr, month: month });
	        }
	    }, {
	        key: 'getOneDate',
	        value: function getOneDate(index) {
	            //接口参数格式 2017-02-28 16:00:00 VS 前端渲染格式2017.02.28
	            var timeZone = new Date().getTimezoneOffset() / 60,
	                today = void 0,
	                yesterday = void 0,

	            //测量当日时间的时间戳
	            timestamp = new Date(_fun.Funs.dateFormat(new Date(measureTime), 'yyyy-MM-dd')).getTime();

	            if (index > 0) {
	                //下一天
	                today = _fun.Funs.dateFormat(timestamp + 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00';
	                yesterday = _fun.Funs.dateFormat(measureTime, 'yyyy-MM-dd') + ' 16:00:00';
	            } else {
	                //上一天
	                today = _fun.Funs.dateFormat(timestamp - 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00';
	                yesterday = _fun.Funs.dateFormat(timestamp - 2 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00';
	            }

	            _Actions.Actions.getHistoryData({ measureDateBeginNew: yesterday, measureDateEndNew: today, timeZone: timeZone });
	            this.setState({ today: _fun.Funs.dateFormat(today, 'yyyy.MM.dd') });
	        }
	    }, {
	        key: 'handleList',
	        value: function handleList(index) {
	            var hideStatus = this.state.hideStatus;
	            hideStatus[index] = !hideStatus[index];
	            this.setState({ hideStatus: hideStatus });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var today = this.state.today ? this.state.today : _fun.Funs.dateFormat(new Date(), 'yyyy.MM.dd'),
	                history = this.state.history ? this.state.history : null,
	                tagDates = this.state.tagDates ? this.state.tagDates : [],
	                firstTagDates = this.state.firstTagDates ? this.state.firstTagDates : [],
	                hideStatus = this.state.hideStatus;
	            //het.toast('------'+tagDates.toString()+'------')
	            //全局变量，此处更改后，获取单日数据会用到
	            measureTime = history ? _fun.Funs.dateFormat(history[0].measureTime, 'yyyy.MM.dd') : today;
	            var partObj = {
	                11: "额头",
	                12: "鼻子",
	                13: "左脸",
	                14: "下颚",
	                15: "右脸"
	            };
	            // <aside id="console" style={{top:'330px'}}>
	            //     {
	            //         ' history:' + (history==null?'数据为空':measureTime) +
	            //         ' tagDates:'+ (this.state.tagDates?this.state.tagDates:'数据为空')+
	            //         ' firstTagDates:'+ (this.state.firstTagDates?this.state.firstTagDates:'首次数据为空')
	            //     }
	            // </aside>
	            return React.createElement(
	                'main',
	                { className: 'history' },
	                React.createElement(
	                    'nav',
	                    { className: 'header' },
	                    React.createElement(
	                        'i',
	                        { className: 'arrow arrow-left', onClick: this.getOneDate.bind(this, -1) },
	                        ' '
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'clndr-btn', onClick: this.handleClndr.bind(this) },
	                        React.createElement('img', { className: 'clndr-icon', src: '../static/img/ic-clndr.png', alt: '\u65E5\u5386\u56FE\u6807' }),
	                        React.createElement(
	                            'b',
	                            { className: '' },
	                            measureTime
	                        )
	                    ),
	                    React.createElement(
	                        'i',
	                        { className: 'arrow arrow-right', onClick: this.getOneDate.bind(this, 1) },
	                        ' '
	                    )
	                ),
	                this.state.showClndr ? React.createElement(
	                    'section',
	                    null,
	                    React.createElement('div', { className: 'calendar-ctrl', id: 'calendar-ctrl', onTouchEnd: this.handleClndr.bind(this) }),
	                    React.createElement(_Calendar.Clndr, { tagDates: tagDates, firstTagDates: firstTagDates, month: this.state.month })
	                ) : null,
	                React.createElement(
	                    'section',
	                    { className: 'list' },
	                    history ? history.map(function (o, i) {
	                        return React.createElement(
	                            'dl',
	                            { key: i },
	                            React.createElement(
	                                'dt',
	                                { ref: 'ti', className: 'title', 'data-value': i, onTouchEnd: this.handleList.bind(this, i) },
	                                React.createElement('img', { className: 'updown', src: hideStatus[i] ? '../static/img/ic-up.png' : '../static/img/ic-down.png', alt: '\u6298\u53E0\u5C55\u5F00' }),
	                                React.createElement(
	                                    'p',
	                                    { className: 'time' },
	                                    _fun.Funs.dateFormat(o.measureTime, 'hh:mm:ss', true)
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'describe' },
	                                    o.skinTypeDesc
	                                )
	                            ),
	                            React.createElement(
	                                'dt',
	                                { className: hideStatus[i] ? "list-detail" : "list-detail hide" },
	                                React.createElement(
	                                    'ul',
	                                    { className: 'flex' },
	                                    React.createElement(
	                                        'li',
	                                        { className: 'flex-cell' },
	                                        '\u90E8\u4F4D'
	                                    ),
	                                    React.createElement(
	                                        'li',
	                                        { className: 'flex-cell' },
	                                        '\u6C34\u5206'
	                                    ),
	                                    React.createElement(
	                                        'li',
	                                        { className: 'flex-cell' },
	                                        '\u6CB9\u6027'
	                                    ),
	                                    React.createElement(
	                                        'li',
	                                        { className: 'flex-cell' },
	                                        '\u5F39\u6027'
	                                    ),
	                                    React.createElement(
	                                        'li',
	                                        { className: 'flex-cell' },
	                                        '\u72B6\u6001'
	                                    )
	                                ),
	                                o.partMeasureVOs.map(function (it, i2) {
	                                    return React.createElement(
	                                        'ul',
	                                        { className: 'flex item', key: i2 },
	                                        React.createElement(
	                                            'li',
	                                            { className: 'flex-cell' },
	                                            partObj[it.part]
	                                        ),
	                                        React.createElement(
	                                            'li',
	                                            { className: 'flex-cell' },
	                                            it.water,
	                                            '%'
	                                        ),
	                                        React.createElement(
	                                            'li',
	                                            { className: 'flex-cell' },
	                                            it.oil,
	                                            '%'
	                                        ),
	                                        React.createElement(
	                                            'li',
	                                            { className: 'flex-cell' },
	                                            it.elasticity
	                                        ),
	                                        React.createElement(
	                                            'li',
	                                            { className: 'flex-cell' },
	                                            it.skinTypeName
	                                        )
	                                    );
	                                })
	                            )
	                        );
	                    }.bind(this)) : React.createElement(
	                        'h2',
	                        { className: 'no-history' },
	                        '\u4ECA\u65E5\u6CA1\u6709\u6D4B\u8BD5\u6570\u636E'
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return History;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 日历组件
	 * @prop {array} tagDates  有数据的日期
	 * @function  {fun} getTagDates 获取有请求月有数据的日期数组
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clndr = undefined;

	var _fun = __webpack_require__(3);

	var _Actions = __webpack_require__(7);

	var timeZone = new Date().getTimezoneOffset() / 60;
	var timer = null;
	var Clndr = exports.Clndr = React.createClass({
	    displayName: 'Clndr',
	    render: function render() {
	        return React.createElement('div', { className: 'calendar-wrap', ref: 'calendar' });
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {},
	    componentDidMount: function componentDidMount() {
	        var self = this,
	            tagDates = self.props.tagDates ? self.props.tagDates : [],
	            firstTagDates = self.props.firstTagDates ? self.props.firstTagDates : [],
	            month = this.props.month;
	        clearTimeout(timer);
	        timer = setTimeout(function () {
	            //console.log('calendar',tagDates);
	            new Calendar({
	                target: '.calendar-wrap',
	                className: 'cal',
	                tagDates: month == new Date().getMonth() + 1 ? firstTagDates : tagDates,
	                onReady: function onReady(dateObj) {},
	                onChangeMonthBefore: function onChangeMonthBefore(dateObj, type) {
	                    self.getTagDates(dateObj, type);
	                },
	                onSelect: self.selectDate.bind(self),
	                onChangeMonth: function onChangeMonth(dateObj) {}
	            });
	        }, 100);
	    },
	    selectDate: function selectDate(dateObj, e) {
	        var tagDates = this.props.tagDates ? this.props.tagDates : [];
	        var day = dateObj.date > 9 ? dateObj.date : '0' + dateObj.date,
	            month = dateObj.month > 9 ? dateObj.month : '0' + dateObj.month,
	            newdate = dateObj.year + '-' + month + '-' + day;

	        var dateTime = new Date(newdate).getTime(),
	            todayTime = new Date().getTime();

	        if (dateTime > todayTime) {
	            //未来日期比较
	            het.toast("未来日期没有测试数据");
	            return false;
	        } else {
	            if (tagDates.indexOf(dateObj.date) != -1) {
	                //是否为有数据的日期
	                //het.toast('有测试数据'+curTagDates.toString());
	                var yesterday = _fun.Funs.dateFormat(dateTime - 24 * 60 * 60 * 1000, 'yyyy-MM-dd') + ' 16:00:00';
	                _Actions.Actions.getHistoryData({ "measureDateBeginNew": yesterday, "measureDateEndNew": newdate + ' 16:00:00', timeZone: timeZone });
	            } else {
	                het.toast('今日没有测试数据');
	            }
	        }
	    },
	    getTagDates: function getTagDates(dateObj, type) {
	        var month = dateObj.month,
	            year = dateObj.year,
	            newMonth = type === 'pre' ? month - 1 : type === 'today' ? month : month + 1,
	            trueMonth = newMonth > 9 ? newMonth : '0' + newMonth;
	        if (newMonth > 12) {
	            trueMonth = "01";
	            year++;
	        } else if (newMonth < 1) {
	            trueMonth = 12;
	            year--;
	        }

	        /*获取当月有数据日期  UTC时间*/
	        var firstdate = _fun.Funs.dateFormat(new Date(year, trueMonth - 1, 1) - 24 * 60 * 60 * 1000, 'yyyy-MM-dd'),
	            endDate = new Date(year, trueMonth, 0).getDate(),
	            measureDateBeginNew = firstdate + ' 16:00:00',
	            measureDateEndNew = year + '-' + trueMonth + '-' + endDate + ' 16:00:00';

	        //月份变更，请求有数据的日期
	        _Actions.Actions.getValidDate({
	            measureDateBeginNew: measureDateBeginNew, measureDateEndNew: measureDateEndNew, timeZone: timeZone
	        }, dateObj);
	    }
	});

/***/ }
/******/ ]);