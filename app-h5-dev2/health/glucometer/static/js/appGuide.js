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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
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

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            deviceStatus: 1, // 1-提示打开 2-扫描中 3-无法连接 4-有数据
	            result: 0, // 血糖值
	            personalStatus: 1 // 个人状态
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'clickStatus',
	        value: function clickStatus(e) {
	            e.preventDefault();
	            var val = parseInt(e.currentTarget.getAttribute('data-val'));
	            this.setState({ personalStatus: val });
	        }
	    }, {
	        key: 'submit',
	        value: function submit(e) {
	            e.preventDefault();
	            _Actions.Actions.submitResult(this.state.personalStatus);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'main', style: { 'paddingTop': this.state.headerTop } },
	                React.createElement(
	                    'header',
	                    null,
	                    React.createElement(
	                        'figure',
	                        null,
	                        React.createElement('img', { src: this.state.avatar }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u4F60\u597D\uFF0C',
	                            this.state.nickname
	                        )
	                    )
	                ),
	                this.state.deviceStatus == 1 ? React.createElement(
	                    'section',
	                    { className: 'sec-0' },
	                    React.createElement(
	                        'div',
	                        { className: 'text' },
	                        '\u8BF7\u786E\u4FDD\u8840\u7CD6\u4EEA\u5DF2\u7ECF\u6253\u5F00'
	                    ),
	                    React.createElement('img', { src: '../static/img/misc1.png' })
	                ) : '',
	                this.state.deviceStatus == 2 ? React.createElement(
	                    'section',
	                    { className: 'sec-1' },
	                    React.createElement('div', { className: 'circle1' }),
	                    React.createElement('div', { className: 'circle2' }),
	                    React.createElement(
	                        'div',
	                        { className: 'text' },
	                        '\u626B\u63CF\u4E2D...'
	                    )
	                ) : '',
	                this.state.deviceStatus == 3 ? React.createElement(
	                    'section',
	                    { className: 'sec-2' },
	                    React.createElement(
	                        'div',
	                        { className: 'msg' },
	                        '\u62B1\u6B49\uFF0C\u65E0\u6CD5\u8FDE\u63A5\u5230\u8840\u7CD6\u4EEA'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'health://guide_retry', className: 'ft-button' },
	                        '\u518D\u8BD5\u4E00\u6B21'
	                    )
	                ) : '',
	                this.state.deviceStatus == 4 ? React.createElement(
	                    'section',
	                    { className: 'sec-3' },
	                    React.createElement(
	                        'div',
	                        { className: 'result' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6D4B\u91CF\u7ED3\u679C'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement(
	                                'b',
	                                null,
	                                this.state.result
	                            ),
	                            'mmol/L'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'foot' },
	                        React.createElement(
	                            'div',
	                            { className: 'btns-wrap' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u8BF7\u9009\u62E9\u60A8\u7684\u5F53\u524D\u72B6\u6001'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'flex' },
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '1', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.personalStatus == 1 ? ' active' : '') },
	                                    '\u7A7A\u8179'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '2', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell m' + (this.state.personalStatus == 2 ? ' active' : '') },
	                                    '\u9910\u540E1\u5C0F\u65F6'
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: '#', 'data-val': '3', onTouchStart: this.clickStatus.bind(this), className: 'flex-cell' + (this.state.personalStatus == 3 ? ' active' : '') },
	                                    '\u9910\u540E2\u5C0F\u65F6'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: 'health://guide_status/' + this.state.personalStatus, className: 'ft-button' },
	                            '\u6211\u9009\u597D\u4E86'
	                        )
	                    )
	                ) : ''
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('血糖仪');
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
	var Actions = exports.Actions = Reflux.createActions(['ready', // 接收到ready数据
	'repaint', // 接收到数据，重新渲染
	'getData', // 获取数据
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

	var readyData = {
	    'appId': 0,
	    'deviceId': 'F',
	    'memberId': 0,
	    'userType': 3,
	    'avatar': '../static/img/avatar.jpg'
	};

	var historyData = []; // 历史数据缓存
	var historyPage = 1; // 历史数据页数
	var historyCond = ''; // 保存搜索条件，用于比较

	// 数据分组排序
	function groupData(data, key) {
	    var newData = {};
	    var arrData = [];
	    // 分组
	    for (var i in data) {
	        var k = data[i][key].replace(/\s.+$/, '');
	        if (!newData[k]) {
	            newData[k] = [];
	        }
	        newData[k].push(data[i]);
	    }
	    // 排序
	    for (var j in newData) {
	        /*newData[j].sort(function(a, b){
	            return a[key] > b[key];
	        });*/
	        arrData.push({ key: j, data: newData[j] });
	    }
	    arrData.sort(function (a, b) {
	        return a.data[0][key] < b.data[0][key];
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
	        // readyData.deviceId = data.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.userType = data.userType ? data.userType : readyData.userType;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(readyData);
	    },
	    onRepaint: function onRepaint(data) {
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        // readyData.deviceId = data.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.userType = data.userType ? data.userType : readyData.userType;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(data);
	    },
	    onGetData: function onGetData() {
	        var cfg = {
	            appId: readyData.appId,
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseMeterData', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {
	                    'recordTime': '2016-07-29 12:11:12',
	                    'personalStatusName':'空腹',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高'
	                },
	                {
	                    'recordTime': '2016-07-28 12:12:12',
	                    'personalStatusName':'餐后一小时',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高' 
	                }
	            ];*/
	            _this.trigger({ isInitialization: false });
	            if (!data.data) return;
	            // data.data.sort((a, b)=>a.recordTime<b.recordTime);
	            _this.trigger({ results: data.data });
	        }, function () {
	            _this.trigger({ isInitialization: false });
	        });
	    },
	    onGetHistoryData: function onGetHistoryData(beginDate, endDate, resultIds, personalStatusIds) {
	        var cfg = {
	            appId: readyData.appId,
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            resultIds: resultIds,
	            personalStatusIds: personalStatusIds,
	            beginDate: ymd(beginDate),
	            endDate: ymd(endDate),
	            timestamp: +new Date(),
	            pageIndex: historyPage,
	            pageRows: 20
	        };
	        var _this = this;
	        var cond = cfg.beginDate + cfg.endDate;
	        if (historyCond != cond) {
	            cfg.pageIndex = historyPage = 1; // 重置page
	        }
	        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseDataList', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {
	                    'recordTime': '2016-07-27 12:11:12',
	                    'personalStatusName':'空腹',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高'
	                },
	                {
	                    'recordTime': '2016-07-28 12:11:12',
	                    'personalStatusName':'餐后一小时',
	                    'bloodGlucoseValue':'12.8',
	                    'resultName':'偏高' 
	                }
	            ];*/
	            if (!data.data) return;
	            if (historyCond == cond) {
	                historyData = historyData.concat(groupData(data.data, 'recordTime'));
	                historyPage++;
	            } else {
	                historyData = groupData(data.data, 'recordTime');
	            }
	            _this.trigger({ results: historyData });
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
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            startMonth: ym(d1),
	            endMonth: ym(d2),
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/bloodGlucoseMeter/getBloodGlucoseMeterDateByTime', cfg, function (data) {
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
	    }
	});

/***/ }
/******/ ]);