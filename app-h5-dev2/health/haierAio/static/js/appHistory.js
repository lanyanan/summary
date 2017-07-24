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

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _HistoryEcharts = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        webDataMap: {
	            'nickname': 'nickname', //昵称
	            'img': 'img', //头像
	            'isXymlOn': 'isXymlOn', //血氧脉率是否测量中
	            'isBloodPressureOn': 'isBloodPressureOn', //血压是否测量中
	            'xymlData': 'xymlData'
	        },
	        renderConfigData: true
	    });
	});

	//SDK准备就绪 回调函数
	het.ready(function (data) {
	    //console.log(data);
	    _Actions.Actions.repaint(data);
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
	            headerTop: isAndroid ? 50 : 64,
	            latestOxygen: '',
	            latestPulse: '',
	            latestdataTime: ''
	        };
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {
	            //console.log(this.state);
	            _Actions.Actions.uploadData(this.state);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var ajaxData = {
	                'userType': this.state.userType ? this.state.userType : 1,
	                'memberId': this.state.memberId ? this.state.memberId : 1,
	                'appId': this.state.appId ? this.state.appId : 1
	            },
	                url = 'https://200.200.200.50' + '/v1/app/chealth/haieraio/getLatestOxygenPulse';
	            _Actions.Actions.lastXyml(url, ajaxData);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var color = ['#FE4147', '#3FDC8F'],
	                text = ['血氧', '脉率'];
	            // xymlData = this.state.xymlData;
	            //console.log(this.state)

	            return React.createElement(
	                'div',
	                { className: 'xyml-history' },
	                React.createElement('header', { style: { 'height': this.state.headerTop } }),
	                React.createElement(
	                    'section',
	                    null,
	                    React.createElement(
	                        'p',
	                        { className: 'measure-time' },
	                        React.createElement('img', { src: '../static/img/ic-time.png', alt: '时间' }),
	                        '测量时间：',
	                        React.createElement(
	                            'span',
	                            { className: '' },
	                            this.state.latestdataTime ? _fun.Funs.utcToLocal(this.state.latestdataTime) : ''
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex', style: { width: '80%', margin: "0 auto", marginTop: '-25px' } },
	                        React.createElement(
	                            'div',
	                            { className: 'measure-data flex-cell' },
	                            React.createElement(
	                                'p',
	                                { className: 'flex', style: { width: '9rem' } },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    '血氧'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    this.state.latestOxygen * 100
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    '%'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'measure-data flex-cell' },
	                            React.createElement(
	                                'p',
	                                { className: 'flex', style: { width: '10.5rem' } },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    '脉率'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    this.state.latestPulse
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    '次/分'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_HistoryEcharts.HistoryEcharts, { type: 'xyml', text: text, color: color })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('海尔一体机-血氧脉率');
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
	exports.Funs = undefined;

	var _fun = __webpack_require__(3);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(5);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 5 */
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
/* 6 */
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
	'updateEchart', // 更新echart,
	'lastXyml', // 上1次血氧脉率数据
	'lastBloodGlucose', // 上1次血糖数据
	'lastBloodPressure', // 上1次血压数据
	'lastTemp', // 上1次体温数据
	'uploadData']);

/***/ },
/* 7 */
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

	var _Actions = __webpack_require__(6);

	var _fun = __webpack_require__(2);

	var Store = exports.Store = Reflux.createStore({
		listenables: [_Actions.Actions],
		onRepaint: function onRepaint(data) {
			//console.log(data);
			this.trigger(data);
		},
		onLastXyml: function onLastXyml(ajaxData) {
			var _this = this,
			    url = 'https://200.200.200.50' + '/v1/app/chealth/haieraio/getLatestOxygenPulse';
			function sucCallback(d) {
				console.log(d);
				var data = {
					"oxygen": "0.88", //血氧
					"pulse": "88", //脉率
					"oxygenStandard": "正常", //血氧标准状态
					"oxygenStandardFlag": "0", //血氧标准状态标识
					"pulseStandard": "正常", //脉率标准状态
					"pulseStandardFlag": "0", //脉率标准状态标识
					"dataTime": "2016-06-06 12:12:12" };

				//let data = (JSON.parse(d)).data;
				//测量时间（本地时间）
				if (data != '') {
					_this.trigger({ noData: false, latestOxygen: data.oxygen, latestPulse: data.pulse, latestdataTime: data.dataTime });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},
		onLastBloodGlucose: function onLastBloodGlucose(ajaxData) {
			var _this = this,
			    url = 'https://200.200.200.50' + '/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose';
			function sucCallback(d) {
				console.log(d);
				var data = {
					"personalStatus": "1", //个人状态（1:空腹，2:餐后一小时，3:餐后二小时）
					"bloodGlucose": "12.8", //血糖值
					"bloodGlucoseStandard": "正常", //血糖标准状态
					"bloodGlucoseStandardFlag": "0", //血糖标准状态标识
					"recordTime": "2016-06-06 12:12:12" };

				//let data = (JSON.parse(d)).data;
				//测量时间
				if (data != '') {
					_this.trigger({ noData: false, showNext: true, latestBloodGlucose: data.bloodGlucose, latestdataTime: data.recordTime, lastStatus: data.personalStatus });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},
		onLastBloodPressure: function onLastBloodPressure(ajaxData) {
			var _this = this,
			    url = 'https://200.200.200.50' + '/v1/app/chealth/haieraio/getLatestBloodPressure';
			function sucCallback(d) {
				console.log(d);
				var data = {
					"systolicPressure": "139", //收缩压
					"diastolicPressure": "88", //舒张压
					"bloodPressureStandard": "正常", //血压标准状态
					"bloodPressureStandardFlag": "0",
					"dataTime": "2016-06-06 12:12:12" };

				//let data = (JSON.parse(d)).data;
				//测量时间（本地时间）
				if (data != '') {
					_this.trigger({ noData: false, latestSystolicPressure: data.systolicPressure, latestdataTime: data.dataTime, lastDiastolicPressure: data.diastolicPressure });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},
		onLastTemp: function onLastTemp(ajaxData) {
			var _this = this,
			    url = 'https://200.200.200.50' + '/v1/app/chealth/thermometer/getThermometerByDate';
			function sucCallback(d) {
				console.log(d);
				var data = [{
					"key": "2016-06-12 10:00:00",
					"value": "36.4"
				}];

				//let data = (JSON.parse(d)).data;
				if (data != '') {
					_this.trigger({ noData: false, latestTemp: data[0].value, latestdataTime: data[0].key });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},


		/* /v1/device/data/raw/upload  app代理 上传服务器*/
		onUploadData: function onUploadData(data) {
			//console.log(data);
			var ajaxData = {
				"userType": data.userType, //用户身份（1：医生  3：患者）
				"memberId": data.memberId, //用户编号（切换用户用）
				/* "status": "",   //个人状态（1：空腹，2：餐后一小时，3：餐后二小时）,如果没有，默认为空*/
				"dataType": "1", //数据类型（1：血氧脉率，2：血压，3：血糖，4：心电，5：体温）
				"dataString": "", //多个值请用,隔开。比如：(血氧,脉率)(收缩压,舒张压)
				"dataTime": "", //测量时间（UTC时间）
				"timeZone": "600" // 时区 (10*60 统一传分钟)
			},
			    url = 'https://200.200.200.50' + '/v1/device/data/raw/upload';
			var xymlData = data.xymlData,
			    tempData = data.tempData,
			    bloodGlucoseData = data.bloodGlucoseData,
			    bloodPressureData = data.bloodPressureData,
			    ecgData = data.ecgData;
			if (xymlData != '' && xymlData != undefined) {
				ajaxData.dataTime = _fun.Funs.timestampToUtc(xymlData.dataTime, '-');
				ajaxData.dataString = xymlData.oxygen + ',' + xymlData.pulse;
				het.get(url, ajaxData, function (d) {
					console.log(d);
				}, function (d) {
					console.log(d);
				});
			}
			if (bloodPressureData != '' && bloodPressureData != undefined) {
				ajaxData.dataTime = _fun.Funs.timestampToUtc(bloodPressureData.dataTime, '-');
				ajaxData.dataString = bloodPressureData.systolicPressure + ',' + bloodPressureData.diastolicPressure;
				ajaxData.dataType = "2";
				het.get(url, ajaxData, function (d) {
					console.log(d);
				}, function (d) {
					console.log(d);
				});
			}
			if (bloodGlucoseData != '' && bloodGlucoseData != undefined) {
				ajaxData.dataTime = _fun.Funs.timestampToUtc(bloodGlucoseData.dataTime, '-');
				ajaxData.dataString = bloodGlucoseData.bloodGlucose;
				ajaxData.dataType = "3";
				het.get(url, ajaxData, function (d) {
					console.log(d);
				}, function (d) {
					console.log(d);
				});
			}
			if (ecgData != '' && ecgData != undefined) {
				ajaxData.dataTime = _fun.Funs.timestampToUtc(ecgData.dataTime, '-');
				ajaxData.dataString = ecgData.heartRate;
				ajaxData.dataType = "4";
				het.get(url, ajaxData, function (d) {
					console.log(d);
				}, function (d) {
					console.log(d);
				});
			}
			if (tempData != '' && tempData != undefined) {
				ajaxData.dataTime = _fun.Funs.timestampToUtc(tempData.dataTime, '-');
				ajaxData.dataString = tempData.temp;
				ajaxData.dataType = "5";
				het.get(url, ajaxData, function (d) {
					console.log(d);
				}, function (d) {
					console.log(d);
				});
			}
		},

		/*
	 *血氧脉率:/v1/app/chealth/haieraio/getLatestOxygenPulseDataList
	 *血压：/v1/app/chealth/haieraio/getLatestBloodPressureDataList
	 *血糖：/v1/app/chealth/haieraio/getLatestBloodGlucoseDataList
	 *体温：/v1/app/chealth/thermometer/getThermometerDataByTime
	 */
		onUpdateEchart: function onUpdateEchart(date, type, ajaxData) {
			var _this = this;
			var url = '/v1/app/chealth/haieraio/getLatestOxygenPulseDataList';
			ajaxData.days = date;
			//console.log(date,type,ajaxData);
			this.trigger({ num: date });
			switch (type) {
				case 'xyml':
					url = '/v1/app/chealth/haieraio/getLatestOxygenPulseDataList';
					_this.onXymlAjax(url, ajaxData);
					break;
				case 'bp':
					url = '/v1/app/chealth/haieraio/getLatestBloodPressureDataList';
					_this.onBloodPressureAjax(url, ajaxData);
					break;
				case 'bg':
					url = '/v1/app/chealth/haieraio/getLatestBloodGlucoseDataList';
					_this.onBloodGlucoseAjax(url, ajaxData);
					break;
				case 'temp':
					url = '/v1/app/chealth/thermometer/getThermometerDataByTime';
					_this, onTempAjax(url, ajaxData);
					break;
			}
		},

		/*血氧脉率历史数据*/
		onXymlAjax: function onXymlAjax(url, ajaxData) {
			var _this = this,
			    yValue = [],
			    xValue = [];
			url = 'https://200.200.200.50' + url;
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
			function sucCallback(result) {
				console.log(result);
				//let data = JSON.parse(result).data;

				var data = [{
					"oxygen": "0.97", //血氧
					"pulse": "83", //脉率
					"dataTime": "2016-06-06 12:12:12" }, //测量时间
				{
					"oxygen": "0.97", //血氧
					"pulse": "83", //脉率
					"dataTime": "2016-06-06 13:12:12" }, //测量时间
				{
					"oxygen": "0.97", //血氧
					"pulse": "83", //脉率
					"dataTime": "2016-06-06 14:12:12" }, //测量时间
				{
					"oxygen": "0.97", //血氧
					"pulse": "83", //脉率
					"dataTime": "2016-06-07 17:12:12" }];
				//求最近一天详情为UTC时间，多天为本地日期）
				//测量时间
				if (data != '') {
					var oxygenStr = data[0].oxygen,
					    pulseStr = data[0].pulse;
					if (ajaxData.days == 1) {
						for (var i in data) {
							var localtime = _fun.Funs.utcToLocal(data[i].dataTime, 1);
							xValue.push(localtime);
							if (i > 0) {
								oxygenStr += ',' + data[i].oxygen;
								pulseStr += ',' + data[i].pulse;
							}

							// console.log(localtime);
						}
					} else {
							for (var i in data) {
								var _localtime = data[i].dataTime.substring(5, 11);
								xValue.push(_localtime);
								if (i > 0) {
									oxygenStr += ',' + data[i].oxygen;
									pulseStr += ',' + data[i].pulse;
								}
								//console.log(localtime);
							}
						}
					yValue.push(oxygenStr);
					yValue.push(pulseStr);
					_this.trigger({ xValue: xValue, yValue: yValue });
				}
			}
		}
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 图表组件
	 * @prop {array} timelist  x轴时间值
	 * @prop {array} templist  y轴温度值
	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HistoryEcharts = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _fun = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HistoryEcharts = exports.HistoryEcharts = function (_React$Component) {
	    _inherits(HistoryEcharts, _React$Component);

	    function HistoryEcharts(props) {
	        _classCallCheck(this, HistoryEcharts);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(HistoryEcharts).call(this, props));

	        _this2.state = {
	            num: 1,
	            xValue: ['4:00', '5:00', '6:00'],
	            yValue: ['100', '200', '150']
	        };
	        _Store.Store.listen(function (data) {
	            return _this2.setState(data);
	        }); // 监听Store
	        return _this2;
	    }

	    _createClass(HistoryEcharts, [{
	        key: 'updateEchart',
	        value: function updateEchart(date) {
	            //console.log(date);
	            var ajaxData = {
	                'userType': this.state.userType ? this.state.userType : 1,
	                'memberId': this.state.memberId ? this.state.memberId : 1,
	                'appId': this.state.appId ? this.state.appId : 1
	            };
	            _Actions.Actions.updateEchart(date, this.props.type, ajaxData);
	            //this.setState({num :date});
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var num = this.state.num;
	            //console.log(this.state,this.props)

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'nav',
	                    { className: 'nav', style: { background: "#E7E7E7", marginTop: '10px' } },
	                    React.createElement(
	                        'ul',
	                        { className: 'flex' },
	                        React.createElement(
	                            'li',
	                            { className: num === 1 ? 'flex-cell active ' : 'flex-cell', onTouchEnd: this.updateEchart.bind(this, 1) },
	                            '1天'
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: num === 7 ? 'flex-cell active ' : 'flex-cell', onTouchEnd: this.updateEchart.bind(this, 7) },
	                            '7天'
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: num === 14 ? 'flex-cell active ' : 'flex-cell', onTouchEnd: this.updateEchart.bind(this, 14) },
	                            '14天'
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: num === 30 ? 'flex-cell active ' : 'flex-cell', onTouchEnd: this.updateEchart.bind(this, 30) },
	                            '30天'
	                        )
	                    )
	                ),
	                React.createElement('section', { className: 'flex chart-container', id: 'chart', ref: 'chart' })
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var ajaxData = {
	                'userType': this.state.userType ? this.state.userType : 1,
	                'memberId': this.state.memberId ? this.state.memberId : 1,
	                'appId': this.state.appId ? this.state.appId : 1
	            };
	            _Actions.Actions.updateEchart(1, this.props.type, ajaxData);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            var _this = this,
	                text = this.props.text,
	                color = this.props.color;
	            var chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点

	            var yAxis = [],
	                series = [];
	            for (var i in text) {
	                var yAxisObj = { type: 'value' },
	                    seriesObj = {
	                    name: text[i],
	                    type: 'line',
	                    symbol: 'none',
	                    yAxisIndex: i,
	                    areaStyle: {
	                        normal: {
	                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                                offset: 0,
	                                color: color[i]
	                            }, {
	                                offset: 1,
	                                color: 'white'
	                            }])
	                        }
	                    },
	                    data: nextState.yValue[i].split(',')
	                };
	                yAxisObj.name = text[i];
	                yAxis.push(yAxisObj);
	                series.push(seriesObj);
	            }
	            //console.log(nextProps,nextState);
	            // 基于准备好的dom，初始化echarts实例
	            var myChart = echarts.init(chartDom),
	                options = {
	                legend: {
	                    right: '4%',
	                    bottom: '1%',
	                    data: text
	                },
	                color: color,
	                grid: {
	                    left: '3%',
	                    right: '2%',
	                    bottom: '9%',
	                    top: "12%",
	                    containLabel: true
	                },
	                textStyle: {
	                    color: '#BDBDBD'
	                },
	                tooltip: {
	                    trigger: 'axis'
	                },
	                xAxis: {
	                    type: 'category',
	                    boundaryGap: true,
	                    data: nextState.xValue,
	                    axisLine: { lineStyle: { color: '#E1E1E1' } }
	                },
	                yAxis: yAxis,
	                series: series
	            };
	            // 绘制图表
	            myChart.setOption(options);
	        }
	    }]);

	    return HistoryEcharts;
	}(React.Component);

	;

/***/ }
/******/ ]);