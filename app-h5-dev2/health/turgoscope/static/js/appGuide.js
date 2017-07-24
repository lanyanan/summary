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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            deviceStatus: 1, // 1-提示打开 2-扫描中 3-无法连接
	            errorMessage: '抱歉，无法连接到血压计'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
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
	                            '你好，',
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
	                        '请确保血压计已经打开'
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
	                        '正在测量...'
	                    )
	                ) : '',
	                this.state.deviceStatus == 3 ? React.createElement(
	                    'section',
	                    { className: 'sec-2' },
	                    React.createElement(
	                        'div',
	                        { className: 'msg' },
	                        this.state.errorMessage ? this.state.errorMessage : '抱歉，无法连接到血压计'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'health://guide_retry', className: 'ft-button' },
	                        '再试一次'
	                    )
	                ) : ''
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('血压计');
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
	'getHistoryData', // 获取历史数据
	'getDataCount', // 获取统计数据
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

	var readyData = { // ready数据缓存
	    'appId': 0,
	    'deviceId': 'F',
	    'memberId': 0,
	    'userType': 3,
	    'avatar': '../static/img/avatar.jpg'
	};

	var historyData = []; // 历史数据缓存
	var historyPage = 0; // 历史数据页数
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
	            return a[key] < b[key];
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
	        data = typeof data === 'string' ? JSON.parse(data) : data;
	        readyData.appId = data.appId ? data.appId : readyData.appId;
	        // readyData.deviceId = data.deviceId;
	        readyData.memberId = data.memberId ? data.memberId : readyData.memberId;
	        readyData.userType = data.userType ? data.userType : readyData.userType;
	        readyData.avatar = data.avatar ? data.avatar : readyData.avatar;
	        readyData.nickname = data.nickname ? data.nickname : readyData.nickname;
	        this.trigger(readyData);
	    },
	    onRepaint: function onRepaint(data) {
	        data = typeof data === 'string' ? JSON.parse(data) : data;
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
	        het.get('/v1/app/chealth/sphygmomanometer/getLatestDataList', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {   
	                    'systolicPressure': '142',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '--',  //心率
	                    'dataTime': '2016-06-06 12:12:12', //测量时间
	                },
	                {   
	                    'systolicPressure': '132',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '56',  //心率
	                    'dataTime': '2016-06-06 14:12:12', //测量时间
	                }
	            ];*/
	            _this.trigger({ isInitialization: false });
	            if (!data.data) return;
	            // data.data.sort((a, b)=>a.dataTime<b.dataTime);
	            _this.trigger({ results: data.data });
	        }, function () {
	            _this.trigger({ isInitialization: false });
	        });
	    },
	    onGetHistoryData: function onGetHistoryData(beginDate, endDate) {
	        var cfg = {
	            appId: readyData.appId,
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            startDate: ymd(beginDate),
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
	        het.get('/v1/app/chealth/sphygmomanometer/getDataList', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = [
	                {
	                    'systolicPressure': '142',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '--',  //心率
	                    'dataTime': '2016-06-07 14:13:12', //测量时间
	                },
	                {
	                    'systolicPressure': '142',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '86',  //心率
	                    'dataTime': '2016-06-07 14:13:12', //测量时间
	                },
	                {
	                    'systolicPressure': '142',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '86',  //心率
	                    'dataTime': '2016-06-07 14:13:12', //测量时间
	                },
	                {
	                    'systolicPressure': '142',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '86',  //心率
	                    'dataTime': '2016-06-07 14:13:12', //测量时间
	                },
	                {
	                    'systolicPressure': '142',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '86',  //心率
	                    'dataTime': '2016-06-09 14:13:12', //测量时间
	                },
	                {
	                    'systolicPressure': '132',  //收缩压
	                    'diastolicPressure': '83',  //舒张压
	                    'heartRate': '186',  //心率
	                    'dataTime': '2016-06-07 14:12:12', //测量时间
	                }
	            ];*/
	            if (!data.data) return;
	            if (historyCond == cond) {
	                historyData = historyData.concat(groupData(data.data, 'dataTime'));
	                historyPage++;
	            } else {
	                historyData = groupData(data.data, 'dataTime');
	            }
	            _this.trigger({ results: historyData });
	        }, function () {});
	        this.onGetDataCount(beginDate, endDate); // 同时获取统计数据
	    },
	    onGetDataCount: function onGetDataCount(beginDate, endDate) {
	        var cfg = {
	            appId: readyData.appId,
	            // deviceId: readyData.deviceId,
	            memberId: readyData.memberId,
	            userType: readyData.userType,
	            startDate: ymd(beginDate),
	            endDate: ymd(endDate),
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/sphygmomanometer/getDataCount', cfg, function (data) {
	            data = typeof data === 'string' ? JSON.parse(data) : data;
	            // 模拟数据
	            /*data.data = {
	                'highTimes': 1,//血压偏高次数
	                'highBloodPressure': '83,156',  //血压最高数据（收缩压,舒张压）
	                'lowTimes': 4,//血压偏低次数
	                'lowBloodPressure': '62,96',    //血压最低数据（收缩压,舒张压）
	                'fastTimes': 1,//心率偏快次数
	                'fastHeartRate': '183', //心率最快数据(心率)
	                'slowTimes': 2,   //心率偏慢次数
	                'slowHeartRate': '63'  //心率最慢数据(心率)
	            };*/
	            if (!data.data) return;
	            _this.trigger({ countResult: data.data });
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
	        het.get('/v1/app/chealth/sphygmomanometer/getMonthDataListByTime', cfg, function (data) {
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