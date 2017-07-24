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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _ResultTable = __webpack_require__(9);

	var _SlidedCalendar = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;

	var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	var endDate = new Date();
	var startDate = new Date();
	startDate.setDate(startDate.getDate() - 7); // 7天以前

	// 日期选择器回调函数
	window.datepickerCB = function (date) {
	    endDate = date.endDate;
	    startDate = date.startDate;
	    het.toast('leave_datepicker');
	};
	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	het.ready(function (data) {
	    _Actions.Actions.ready(data);
	    _Actions.Actions.getCalendarData();
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	    _Actions.Actions.getCalendarData();
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this2.state = {
	            headerTop: isAndroid ? 50 : 0,
	            slidedCalendarShow: false,
	            startDate: startDate,
	            endDate: endDate,
	            results: [],
	            validDates: [],
	            countResult: {}
	        };
	        _this2.myScroll; // 定义iscroll容器
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            this.myScroll = new IScroll('#history-wrap', {
	                probeType: 3,
	                //        momentum: false,//关闭惯性滑动
	                scrollbars: false, //滚动条可见
	                useTransform: true, //CSS转化
	                useTransition: true, //CSS过渡
	                bounce: true, //反弹
	                startX: 0,
	                startY: 0
	            });
	            this.myScroll.on('scrollEnd', pullUp);
	            function pullUp() {
	                if (this.directionY !== 1) return; // 上拉
	                if (this.y <= this.maxScrollY) {
	                    _Actions.Actions.getHistoryData(_this.state.startDate, _this.state.endDate);
	                }
	            }
	            setTimeout(function () {
	                _Actions.Actions.getHistoryData(startDate, endDate);
	            }, 1000);
	            document.body.scrollTop = 0; // 修复从日期选择器返回时滚动高度不对的BUG
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.myScroll.refresh();
	        }
	    }, {
	        key: 'clickDate',
	        value: function clickDate(e) {
	            e.preventDefault();
	            het.toast('datepicker_show');
	            this.setState({ slidedCalendarShow: true });
	        }
	    }, {
	        key: 'selectedDate',
	        value: function selectedDate(d) {
	            _Actions.Actions.selectedDate(d);
	            _Actions.Actions.getHistoryData(d.startDate, d.endDate);
	        }
	        // 格式化日期为 yyyy.m.d 的格式

	    }, {
	        key: 'ymd',
	        value: function ymd(d) {
	            return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var selDateText = this.ymd(this.state.startDate) + '~' + this.ymd(this.state.endDate);
	            var bpH = (this.state.countResult.highBloodPressure || '0,0').split(',');
	            var bpL = (this.state.countResult.lowBloodPressure || '0,0').split(',');
	            var startDate = _fun.Funs.dateFormat(this.state.startDate, 'yyyy-MM-dd');
	            var endDate = _fun.Funs.dateFormat(this.state.endDate, 'yyyy-MM-dd');
	            var datepickerUrl = '#/datepicker/' + startDate + '/' + endDate + '/datepickerCB/' + this.state.headerTop + '/' + this.state.validDates.join(',');
	            return React.createElement(
	                'div',
	                { className: 'viewing-area flex-column' },
	                React.createElement(
	                    'section',
	                    { className: 'condition', style: { marginTop: isAndroid ? 73 : 0 } },
	                    React.createElement(
	                        'table',
	                        null,
	                        React.createElement(
	                            'tbody',
	                            null,
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    { className: 'title' },
	                                    '时　　段'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { colSpan: '3' },
	                                    React.createElement(
	                                        'a',
	                                        { href: datepickerUrl, className: 'date', onClick: function onClick() {
	                                                return het.toast('enter_datepicker');
	                                            } },
	                                        selDateText
	                                    )
	                                )
	                            ),
	                            !this.state.countResult.highTimes && !this.state.countResult.lowTimes ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '血压结果'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-l diag' },
	                                    '正常'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r' },
	                                    ' '
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'rs ta-r red' },
	                                    ' '
	                                )
	                            ) : null,
	                            this.state.countResult.highTimes ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '血压结果'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-l diag' },
	                                    '偏高: ',
	                                    this.state.countResult.highTimes + '次'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r' },
	                                    '最高: '
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'rs ta-r red' },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        bpH[0],
	                                        '/',
	                                        bpH[1]
	                                    ),
	                                    'mmHg'
	                                )
	                            ) : null,
	                            this.state.countResult.lowTimes ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    this.state.countResult.highTimes ? '' : '血压结果'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-l diag' },
	                                    '偏低: ',
	                                    this.state.countResult.lowTimes + '次'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r' },
	                                    '最低: '
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'rs ta-r red' },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        bpL[0],
	                                        '/',
	                                        bpL[1]
	                                    ),
	                                    'mmHg'
	                                )
	                            ) : null,
	                            !this.state.countResult.fastTimes && !this.state.countResult.slowTimes ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '心率结果'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-l diag' },
	                                    '正常'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r' },
	                                    ' '
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'rs ta-r red' },
	                                    ' '
	                                )
	                            ) : null,
	                            this.state.countResult.fastTimes ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '心率结果'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-l diag' },
	                                    '偏快: ',
	                                    this.state.countResult.fastTimes + '次'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r' },
	                                    '最快: '
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'rs ta-r red' },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        this.state.countResult.fastHeartRate || 0
	                                    ),
	                                    '次/分钟'
	                                )
	                            ) : null,
	                            this.state.countResult.slowTimes ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    this.state.countResult.fastTimes ? '' : '心率结果'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-l diag' },
	                                    '偏慢: ',
	                                    this.state.countResult.slowTimes ? this.state.countResult.slowTimes + '次' : '正常'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r' },
	                                    '最慢: '
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'rs ta-r blu' },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        this.state.countResult.slowHeartRate || 0
	                                    ),
	                                    '次/分钟'
	                                )
	                            ) : null
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { id: 'history-wrap', className: 'flex-cell' },
	                    React.createElement(
	                        'div',
	                        null,
	                        this.state.results.map(function (it, idx) {
	                            return React.createElement(_ResultTable.ResultTable, { key: idx, date: it.key, results: it.data, renderMode: 2 });
	                        })
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('历史数据');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/datepicker/:startDate/:endDate/:cbName/:top', component: _SlidedCalendar.SlidedCalendar }),
	        React.createElement(Route, { path: '/datepicker/:startDate/:endDate/:cbName/:top/:validDates', component: _SlidedCalendar.SlidedCalendar })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(8);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 8 */
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
	    }
	};
	module.exports = Funs;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ResultTable = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(7);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件

	var ResultTable = exports.ResultTable = function (_BaseComponent) {
	    _inherits(ResultTable, _BaseComponent);

	    function ResultTable(props) {
	        _classCallCheck(this, ResultTable);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ResultTable).call(this, props));
	    }

	    _createClass(ResultTable, [{
	        key: 'getBP',
	        value: function getBP(data) {
	            var result = 0; // 0-正常，1-低血压，2-高血压
	            if (data.diastolicPressure < 60 || data.systolicPressure < 90) {
	                result = 1;
	            } else if (data.diastolicPressure >= 90 || data.systolicPressure >= 140) {
	                result = 2;
	            }
	            return result;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            // 渲染模式renderMode：1-高低血压分行显示，2-高低血压同行显示
	            var renderMode = this.props.renderMode ? this.props.renderMode : 1;
	            return React.createElement(
	                'table',
	                { className: 'report-table' },
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'td',
	                            { colSpan: '2', className: 'ta-l' },
	                            this.props.date
	                        ),
	                        React.createElement(
	                            'td',
	                            { colSpan: '2', className: 'ta-r' },
	                            React.createElement(
	                                'a',
	                                { href: '#reference', style: { visibility: this.props.showRefer ? 'visible' : 'hidden' } },
	                                React.createElement('i', { className: 'h' }),
	                                ' 血压心率标准参考'
	                            )
	                        )
	                    )
	                ),
	                this.props.results.map(function (it, idx) {
	                    var bp = _this2.getBP(it);
	                    var time = _fun.Funs.dateFormat(it.dataTime, 'hh:mm', true);
	                    var hl = ['', 'low', 'high'][bp];
	                    var resultName = ['正常', '低压', '高压'][bp];
	                    var hasHR = !isNaN(it.heartRate); // 判断是否有心率数据
	                    var hr = it.heartRate < 60 ? 1 : it.heartRate > 100 ? 2 : 0;
	                    var hrName = ['正常', '偏低', '偏高'][hr];
	                    var hrClass = ['', 'low', 'high'][hr];
	                    if (_this2.props.renderMode == 2) {
	                        return React.createElement(
	                            'tbody',
	                            { key: idx },
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    { className: 'title' },
	                                    '血压'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'mm ta-r ' + hl },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        it.systolicPressure,
	                                        '/',
	                                        it.diastolicPressure
	                                    ),
	                                    'mmHg'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'rs ta-c ' + hl },
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        resultName
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r time' },
	                                    time
	                                )
	                            ),
	                            hasHR ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '脉搏'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'mm ta-r ' + hrClass },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        it.heartRate
	                                    ),
	                                    '次/分钟'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-c rs ' + hrClass },
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        hrName
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    ' '
	                                )
	                            ) : null
	                        );
	                    } else {
	                        return React.createElement(
	                            'tbody',
	                            { key: idx },
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    { className: 'title' },
	                                    '高压'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'mm ta-c ' + hl },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        it.systolicPressure
	                                    ),
	                                    'mmHg'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { rowSpan: '2', className: 'rs ta-c ' + hl },
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        resultName
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-r time' },
	                                    time
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '低压'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'mm ta-c ' + hl },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        it.diastolicPressure
	                                    ),
	                                    'mmHg'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    ' '
	                                )
	                            ),
	                            hasHR ? React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '脉搏'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'mm ta-c ' + hrClass },
	                                    React.createElement(
	                                        'b',
	                                        null,
	                                        it.heartRate
	                                    ),
	                                    '次/分钟'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    { className: 'ta-c rs ' + hrClass },
	                                    React.createElement(
	                                        'i',
	                                        null,
	                                        hrName
	                                    )
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    ' '
	                                )
	                            ) : null
	                        );
	                    };
	                })
	            );
	        }
	    }]);

	    return ResultTable;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 滑动式日期区间选择器
	 * !! 因为需要跳转页面，所以需要配置路由来调用。配置方法参见eg
	 * @route {string}  :cbName     点确定时的回调函数名。该回调须登记于window下，否则将无法调用。
	 *                              该回调返回date对象，格式：{startDate: Date1, endDate: Date2}
	 * @route {date}    :startDate  开始时间，可选。格式：'2016-1-1'
	 * @route {date}    :endDate    结束时间，可选。格式：'2016-1-1'
	 * @route {integer} :months     可选月数，缺省为12个月
	 * @route {string}  :validDates 有数据的日期数组，格式：'2016-1-1, 2016-1-2, ...'
	 * @route {string}  :top        距离顶部的距离，默认为0
	 * @eg.   <Route path="/datepicker/:startDate/:endDate/:cbName/:validDates" component={SlidedCalendar} />
	 */

	// 创建React组件

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SlidedCalendar = exports.SlidedCalendar = function (_React$Component) {
	    _inherits(SlidedCalendar, _React$Component);

	    function SlidedCalendar(props) {
	        _classCallCheck(this, SlidedCalendar);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(SlidedCalendar).call(this, props));

	        var _this = _this2;
	        _this2.top = props.params.top ? props.params.top : 0;
	        _this2.calendar = _this2.createCalendarData(_this2.props.months || 12);
	        _this2.state = {
	            validDates: (props.params.validDates || '').split(',').map(function (d) {
	                return _this2.zeroTimestamp(d);
	            }),
	            startDate: props.params.startDate ? _this.zeroTimestamp(props.params.startDate) : Infinity,
	            endDate: props.params.endDate ? _this.zeroTimestamp(props.params.endDate) : 0
	        };
	        _this2.touchCounter = 0; // 点击计数器
	        _this2.selectDate = _this2.selectDate.bind(_this2);
	        _this2.submit = _this2.submit.bind(_this2);
	        return _this2;
	    }

	    _createClass(SlidedCalendar, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var main = ReactDOM.findDOMNode(this.refs.main);
	            document.body.scrollTop = main.scrollHeight;
	        }
	        // 生成0点时间戳，用于对比

	    }, {
	        key: 'zeroTimestamp',
	        value: function zeroTimestamp(date) {
	            var time = new Date(date.toString().replace(/(?=\b\d\b)/g, '0'));
	            time.setHours(0);
	            time.setMinutes(0);
	            time.setSeconds(0);
	            return time.getTime();
	        }
	        // 生成日历数据

	    }, {
	        key: 'createCalendarData',
	        value: function createCalendarData(forwardMonth) {
	            forwardMonth = parseInt(forwardMonth);
	            var cData = [];
	            var cursor = new Date();
	            cursor.setMonth(cursor.getMonth() - forwardMonth);
	            for (var i = forwardMonth; i > 0; i--) {
	                cursor.setMonth(cursor.getMonth() + 1);
	                cData.push({
	                    year: cursor.getFullYear(),
	                    month: cursor.getMonth(),
	                    data: monthData(cursor)
	                });
	            }
	            function monthData(date) {
	                var d = new Date(date);
	                var wData = []; // 周数据
	                var mData = []; // 月数据
	                var m = d.getMonth();
	                d.setDate(1);
	                for (var h = 0; h < d.getDay(); h++) {
	                    wData.push(0);
	                }
	                for (var _i = 0; _i < 6; _i++) {
	                    for (var j = _i === 0 ? h : 0; j < 7; j++) {
	                        if (d.getMonth() - m === 0) {
	                            wData.push(d.getDate());
	                        } else {
	                            if (_i >= 4 && j === 0) {
	                                // 排除最后一周全空的情况
	                                break;
	                            }
	                            wData.push(0);
	                        }
	                        d.setDate(d.getDate() + 1);
	                    }
	                    mData.push(wData);
	                    wData = [];
	                }
	                return mData;
	            }
	            return cData;
	        }
	    }, {
	        key: 'selectDate',
	        value: function selectDate(e) {
	            var date = parseInt(e.currentTarget.getAttribute('data-date'));
	            if (date > new Date().getTime()) return; // 不允许选择超过当天的时间
	            this.touchCounter++;
	            if (this.touchCounter % 2) {
	                this.setState({ startDate: date, endDate: 0 });
	            } else if (this.state.startDate > date) {
	                this.touchCounter--;
	                this.setState({ startDate: date, endDate: 0 });
	                // alert('结束时间不能小于开始时间');
	            } else {
	                    this.setState({ endDate: date });
	                }
	        }
	    }, {
	        key: 'submit',
	        value: function submit(e) {
	            e.preventDefault();
	            var _this = this;
	            var cb = window[this.props.params.cbName];
	            if (!this.state.endDate) return;
	            if (typeof cb === 'function') {
	                cb({
	                    startDate: new Date(_this.state.startDate),
	                    endDate: new Date(_this.state.endDate)
	                });
	            }
	            setTimeout(function () {
	                return history.back();
	            }, 100);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var today = this.zeroTimestamp(new Date().toString());
	            return React.createElement(
	                'div',
	                { ref: 'main', className: 'slided-calendar', style: { top: this.top } },
	                React.createElement(
	                    'ul',
	                    { className: 'sc-row head', style: { top: this.top } },
	                    React.createElement(
	                        'li',
	                        null,
	                        '日'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '一'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '二'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '三'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '四'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '五'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '六'
	                    )
	                ),
	                this.calendar.map(function (m, idx1) {
	                    // 遍历月份
	                    return React.createElement(
	                        'section',
	                        { key: idx1 },
	                        React.createElement(
	                            'h2',
	                            null,
	                            m.year,
	                            '年',
	                            m.month + 1,
	                            '月'
	                        ),
	                        m.data.map(function (w, idx2) {
	                            // 遍历周
	                            return React.createElement(
	                                'ul',
	                                { key: idx2, className: 'sc-row' },
	                                w.map(function (d, idx3) {
	                                    // 遍历天
	                                    if (d !== 0) {
	                                        var theDay = _this3.zeroTimestamp(m.year + '-' + (m.month + 1) + '-' + d);
	                                        var txt = theDay === today ? '今' : d;
	                                        var classNames = '';
	                                        // 当天0时时间戳
	                                        // 有效日期样式
	                                        classNames += _this3.state.validDates.indexOf(theDay) > -1 ? ' sc-vali' : '';
	                                        // 今天样式
	                                        classNames += theDay === today ? ' sc-today' : '';
	                                        // 开始样式
	                                        classNames += theDay === _this3.state.startDate ? ' sc-start' : '';
	                                        // 结束样式
	                                        classNames += theDay === _this3.state.endDate ? ' sc-end' : '';
	                                        // 区间样式
	                                        classNames += theDay > _this3.state.startDate && theDay < _this3.state.endDate ? ' sc-among' : '';
	                                        return React.createElement(
	                                            'li',
	                                            { key: idx3, className: classNames, 'data-date': theDay, onClick: _this3.selectDate },
	                                            React.createElement(
	                                                'i',
	                                                null,
	                                                txt
	                                            )
	                                        );
	                                    } else {
	                                        return React.createElement(
	                                            'li',
	                                            { key: idx3, className: 'sc-e' },
	                                            ' '
	                                        );
	                                    }
	                                })
	                            );
	                        })
	                    );
	                }),
	                React.createElement(
	                    'footer',
	                    { className: 'sc-footer' },
	                    React.createElement(
	                        'a',
	                        { href: '#', onTouchEnd: this.submit, className: this.state.endDate ? 'enable' : '' },
	                        '确定'
	                    )
	                )
	            );
	        }
	    }]);

	    return SlidedCalendar;
	}(React.Component);

	;

/***/ }
/******/ ]);