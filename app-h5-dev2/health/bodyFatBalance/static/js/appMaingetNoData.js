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

	module.exports = __webpack_require__(15);


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
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'getData', 'postHisData', 'getHisData', 'getChangeData', 'ready', 'getCalendarData', // 获取日历数据
	'selectedDate' // 选择日期
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

	var _Actions = __webpack_require__(4);

	var options = {};

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
	    onRepaint: function onRepaint(opt) {
	        options.accessToken = opt.accessToken, options.appId = opt.appId, options.deviceId = opt.deviceId, options.timestamp = opt.timestamp, options.memberId = opt.memberId, options.userType = opt.userType, options.headerUrl = opt.headerUrl;
	        this.trigger(options);
	    },
	    onReady: function onReady(opt) {
	        options.accessToken = opt.accessToken, options.appId = opt.appId, options.deviceId = opt.deviceId, options.timestamp = opt.timestamp, options.memberId = opt.memberId, options.userType = opt.userType, options.headerUrl = opt.headerUrl;
	        this.trigger(options);
	    },
	    onGetData: function onGetData(opt) {
	        var _this = this;
	        //options.accessToken = opt.accessToken,
	        options.appId = opt.appId, options.deviceId = opt.deviceId, options.timestamp = opt.timestamp, options.memberId = opt.memberId, options.userType = opt.userType;
	        het.get('/v1/app/chealth/bodyfat/getBodyFatDataList', {
	            //'options': opt.accessToken,
	            'appId': opt.appId,
	            'timestamp': opt.timestamp,
	            'accessToken': opt.accessToken,
	            'userType': opt.userType,
	            'deviceId': opt.deviceId,
	            'memberId': opt.memberId
	        }, function (data) {
	            var mydata = data;
	            //console.log(data);
	            mydata.headerUrl = options.headerUrl;
	            _this.trigger({ 'data': _this.groupData(mydata) });
	        }, function () {
	            het.toast('数据请求错误');
	        });
	    },
	    onPostDate: function onPostDate(data_id) {
	        var data = options;
	        data.dataId = data_id;
	        //options.dataId = data_id;
	        het.post('/v1/app/chealth/bodyfat/getBodyFatDataList', data, function () {
	            het.toast('post suc');
	        }, function () {
	            het.toast('post fail');
	        });
	    },
	    onGetHisData: function onGetHisData(startDate, endDate) {
	        var _this = this,
	            mydata = options;
	        mydata.startDate = startDate, mydata.endDate = endDate;
	        het.get('/v1/app/chealth/bodyfat/getBodyFatMonthData', mydata, function (data) {
	            _this.trigger({ "data": _this.classifyFn(data) });
	        }, function () {
	            het.toast('数据请求错误');
	        });
	        this.trigger(mydata);
	    },
	    onSelectedDate: function onSelectedDate(dates) {
	        dates.slidedCalendarShow = false;
	        this.trigger(dates);
	    },
	    groupData: function groupData(data) {
	        var newData = {};
	        var arrData = [];
	        // 分组
	        data = data.data.list;
	        for (var i in data) {
	            var key = data[i].dataTime.replace(/\s.+$/, '');
	            if (!newData[key]) {
	                newData[key] = [];
	            }
	            newData[key].push(data[i]);
	        }
	        // 排序
	        for (var j in newData) {
	            newData[j].sort(function (a, b) {
	                return a.dataTime > b.dataTime;
	            });
	            arrData.push(newData[j]);
	        }
	        arrData.sort(function (a, b) {
	            return a[0].dataTime < b[0].dataTime;
	        });
	        return arrData;
	    },
	    classifyFn: function classifyFn(data) {
	        data = data.data;
	        var len = data.length,
	            newArr = {},
	            _weight = [],
	            _fatRate = [],
	            _boneWeight = [],
	            _meatRate = [],
	            _dataTime = [];
	        for (var i = 0; i < len; i++) {
	            if (data[i].dataTime[5] == 0) {
	                if (data[i].dataTime[8] == 0) {
	                    _dataTime.push(data[i].dataTime.substring(6, 7) + '.' + data[i].dataTime.substring(9));
	                } else {
	                    _dataTime.push(data[i].dataTime.substring(6).replace('-', '.'));
	                }
	            } else {
	                if (data[i].dataTime[8] == 0) {
	                    _dataTime.push(data[i].dataTime.substring(5, 7) + '.' + data[i].dataTime.substring(9));
	                } else {
	                    _dataTime.push(data[i].dataTime.substring(5).replace('-', '.'));
	                }
	            }
	            _weight.push(data[i].weight);
	            _fatRate.push(data[i].fatRate);
	            _boneWeight.push(data[i].boneWeight);
	            _meatRate.push(data[i].meatRate);
	        }
	        return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _boneWeight: _boneWeight, _meatRate: _meatRate };
	    },
	    onGetCalendarData: function onGetCalendarData() {
	        var d1 = new Date();
	        var d2 = new Date();
	        d1.setMonth(d2.getMonth() - 11);
	        var cfg = {
	            appId: options.appId,
	            deviceId: options.deviceId,
	            memberId: options.memberId,
	            userType: options.userType,
	            startMonth: ym(d1),
	            endMonth: ym(d2),
	            timestamp: +new Date()
	        };
	        var _this = this;
	        het.get('/v1/app/chealth/bodyfat/getBodyFatDate', cfg, function (data) {
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

	//appId	    是	Integer	应用标识
	//deviceId	是	string	设备id
	//timestamp	是	number	时间戳
	//memberId	是	string	用户编号（切换用户用）
	//userType	是	string	用户身份（1：医生 3：患者）

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016-08-10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	/**
	 * Created by Administrator on 2016-08-09.
	 */
	// import {Funs} from '../../../common/src/fun.es6';


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

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleSwitch',
	        value: function handleSwitch() {
	            console.log(JSON.stringify(this.state));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	            window.addEventListener('resize', function () {
	                document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	            }, false);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var content_pic = './../static/img/get-no-data-warn.png';
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'header',
	                    { className: 'get-no-data-header' },
	                    React.createElement('div', null),
	                    React.createElement(
	                        'div',
	                        { className: 'get-no-data-header-flex' },
	                        React.createElement(
	                            'span',
	                            { className: 'get-no-data-w' },
	                            '体重'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'get-no-data-w-data' },
	                            this.state.weightData,
	                            React.createElement(
	                                'span',
	                                { className: 'get-no-data-w-data-un' },
	                                'kg'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'get-no-data-content' },
	                    React.createElement(
	                        'div',
	                        { className: 'get-no-data-content-h' },
	                        React.createElement('img', { className: 'get-no-data-content-pic', src: content_pic }),
	                        React.createElement(
	                            'span',
	                            null,
	                            '未获得数据'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'get-no-data-content-f' },
	                        React.createElement(
	                            'dl',
	                            { className: 'get-no-data-content-dl' },
	                            React.createElement(
	                                'dt',
	                                null,
	                                '如何获取到准确的数据'
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '1.应该赤足测量;脚必须与电极有良好的接触'
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '2.把秤放在平坦且坚硬的地面上,否则会出现较大误差'
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '3.脚底不要沾有泥土。如果您的脚底干硬或有厚茧，可能导致错误的测量结果。'
	                            ),
	                            React.createElement(
	                                'dd',
	                                null,
	                                '4.确保电池电量充足。'
	                            )
	                        ),
	                        React.createElement(
	                            'a',
	                            { href: 'health://skip_url/getNoData', className: 'get-no-data-content-f-a' },
	                            '我知道了'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('体脂秤');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('R  OOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
	});

	//<span>暖心小贴士,快速get用秤技巧</span>
	//<div>
	//<img />
	//<ul>
	//<li>打开手机蓝牙</li>
	//<li>把秤放在平坦切坚硬的地面上,否则会出现较大误差</li>
	//<li>脱掉袜子,双脚平均踩在上面,才能准确测出各项指标</li>
	//<li>设备数据同步到手机上后,可在APP上查看各项身体指标</li>
	//</ul>
	//</div>

/***/ }
/******/ ]);