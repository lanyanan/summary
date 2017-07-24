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

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	var endDate = new Date();
	var startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1); // 上月今天

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

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            headerTop: isAndroid ? 53 : 64,
	            slidedCalendarShow: false,
	            startDate: startDate,
	            endDate: endDate,
	            resultIds: '1,2,3', // 血糖结果（1,2,3）（1:偏低，2:正常，3：偏高）
	            statusIds: '1,2,3', // 个人状态（1,2,3）（1:空腹，2:餐后一小时，3:餐后二小时）
	            validDates: [],
	            results: []
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
	                    // Actions.getHistoryData(_this.state.startDate, _this.state.endDate, _this.state.resultIds, _this.state.statusIds);
	                }
	            }
	            setTimeout(function () {
	                _Actions.Actions.getHistoryData(startDate, endDate, _this.state.resultIds, _this.state.statusIds);
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
	        key: 'clickSugarResult',
	        value: function clickSugarResult(e) {
	            e.preventDefault();
	            var val = e.currentTarget.getAttribute('data-val');
	            var ids = this.dealArray(this.state.resultIds.split(','), val);
	            this.setState({ resultIds: ids });
	            _Actions.Actions.getHistoryData(this.state.startDate, this.state.endDate, ids, this.state.statusIds);
	        }
	    }, {
	        key: 'clickStatus',
	        value: function clickStatus(e) {
	            e.preventDefault();
	            var val = e.currentTarget.getAttribute('data-val');
	            var ids = this.dealArray(this.state.statusIds.split(','), val);
	            this.setState({ statusIds: ids });
	            _Actions.Actions.getHistoryData(this.state.startDate, this.state.endDate, this.state.resultIds, ids);
	        }
	    }, {
	        key: 'selectedDate',
	        value: function selectedDate(d) {
	            _Actions.Actions.selectedDate(d);
	            _Actions.Actions.getHistoryData(d.startDate, d.endDate, this.state.resultIds, this.state.statusIds);
	        }
	        // 格式化日期为 yyyy.m.d 的格式

	    }, {
	        key: 'ymd',
	        value: function ymd(d) {
	            return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
	        }
	    }, {
	        key: 'dealArray',
	        value: function dealArray(oriArray, value) {
	            var result = [];
	            if (oriArray.indexOf(value) > -1) {
	                // 存在则删除
	                if (oriArray.length <= 1) {
	                    // length<=1 最后一个不允许点掉
	                    het.toast('too_few_options');
	                }
	                oriArray.map(function (v) {
	                    if (v != value || oriArray.length <= 1) {
	                        result.push(v);
	                    }
	                });
	            } else {
	                result = oriArray;
	                result.push(value);
	                result.sort();
	            }
	            return result.join(',').replace(/^,/, '');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var selDateText = this.ymd(this.state.startDate) + '~' + this.ymd(this.state.endDate);
	            var startDate = _fun.Funs.dateFormat(this.state.startDate, 'yyyy-MM-dd');
	            var endDate = _fun.Funs.dateFormat(this.state.endDate, 'yyyy-MM-dd');
	            var datepickerUrl = '#/datepicker/' + startDate + '/' + endDate + '/datepickerCB/' + this.state.headerTop + '/' + this.state.validDates.join(',');
	            return React.createElement(
	                'div',
	                { className: 'viewing-area flex-column' },
	                React.createElement(
	                    'section',
	                    { className: 'condition', style: { marginTop: this.state.headerTop } },
	                    React.createElement(
	                        'dl',
	                        { className: 'flex' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '\u65F6\u3000\u3000\u6BB5'
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'a',
	                                { href: datepickerUrl, className: 'date', onClick: function onClick() {
	                                        return het.toast('enter_datepicker');
	                                    } },
	                                selDateText
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'flex' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '\u8840\u7CD6\u7ED3\u679C'
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'a',
	                                { href: '#', 'data-val': '1', onTouchStart: this.clickSugarResult.bind(this), className: this.state.resultIds.indexOf(1) > -1 ? 'selected' : '' },
	                                '\u504F\u4F4E'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: '#', 'data-val': '2', onTouchStart: this.clickSugarResult.bind(this), className: this.state.resultIds.indexOf(2) > -1 ? 'selected' : '' },
	                                '\u6B63\u5E38'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: '#', 'data-val': '3', onTouchStart: this.clickSugarResult.bind(this), className: this.state.resultIds.indexOf(3) > -1 ? 'selected' : '' },
	                                '\u504F\u9AD8'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'flex' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '\u4E2A\u4EBA\u72B6\u6001'
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'a',
	                                { href: '#', 'data-val': '1', onTouchStart: this.clickStatus.bind(this), className: this.state.statusIds.indexOf(1) > -1 ? 'selected' : '' },
	                                '\u7A7A\u8179'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: '#', 'data-val': '2', onTouchStart: this.clickStatus.bind(this), className: this.state.statusIds.indexOf(2) > -1 ? 'selected' : '' },
	                                '\u9910\u540E1\u5C0F\u65F6'
	                            ),
	                            React.createElement(
	                                'a',
	                                { href: '#', 'data-val': '3', onTouchStart: this.clickStatus.bind(this), className: this.state.statusIds.indexOf(3) > -1 ? 'selected' : '' },
	                                '\u9910\u540E2\u5C0F\u65F6'
	                            )
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
	                            return React.createElement(_ResultTable.ResultTable, { key: idx, date: _fun.Funs.dateFormat((it.data[0] || {}).recordTime, 'M月d日', true), results: it.data });
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

	        return _possibleConstructorReturn(this, (ResultTable.__proto__ || Object.getPrototypeOf(ResultTable)).call(this, props));
	    }

	    _createClass(ResultTable, [{
	        key: 'render',
	        value: function render() {
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
	                                { href: 'health://skip_url/reference.html', style: { visibility: this.props.showRefer ? 'visible' : 'hidden' } },
	                                React.createElement('i', { className: 'h' }),
	                                ' \u8840\u7CD6\u6807\u51C6\u53C2\u8003'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    this.props.results.map(function (it, idx) {
	                        var time = _fun.Funs.dateFormat(it.recordTime, 'hh:mm', true);
	                        var hl = (it.resultName || '').indexOf('高') > -1 ? 'high' : (it.resultName || '').indexOf('低') > -1 ? 'low' : '';
	                        return React.createElement(
	                            'tr',
	                            { key: idx },
	                            React.createElement(
	                                'td',
	                                { className: 'title' },
	                                it.personalStatusName
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'mmol ta-c ' + hl },
	                                it.bloodGlucoseValue,
	                                'mmol/L'
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'conc' },
	                                it.resultName
	                            ),
	                            React.createElement(
	                                'td',
	                                { className: 'time ta-r' },
	                                time
	                            )
	                        );
	                    })
	                )
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

	        var _this2 = _possibleConstructorReturn(this, (SlidedCalendar.__proto__ || Object.getPrototypeOf(SlidedCalendar)).call(this, props));

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
	                        '\u65E5'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E00'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E8C'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E09'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u56DB'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u4E94'
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        '\u516D'
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
	                            '\u5E74',
	                            m.month + 1,
	                            '\u6708'
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
	                                            '\xA0'
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
	                        '\u786E\u5B9A'
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