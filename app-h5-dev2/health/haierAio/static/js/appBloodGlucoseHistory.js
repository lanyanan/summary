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

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        webDataMap: {},
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

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this2.state = {
	            latestBloodGlucose: '',
	            lastStatus: '',
	            latestdataTime: ''
	        };
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }
	    // componentWillUpdate(){
	    //     //console.log(this.state);
	    //     Actions.uploadData(this.state);
	    // }


	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            setTimeout(function () {
	                console.log('setTimeout', _this.state);
	                var ajaxData = {
	                    'userType': _this.state.userType ? _this.state.userType : '3',
	                    'memberId': _this.state.memberId ? _this.state.memberId : "0",
	                    'appId': _this.state.appId ? _this.state.appId : '10121',
	                    'timestamp': new Date().getTime()
	                };
	                _Actions.Actions.lastBloodGlucose(ajaxData);
	            }, 500);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var color = ['#4BDD96'],
	                text = ['血糖'];
	            //console.log(this.state)
	            var time = this.state.latestdataTime ? _fun.Funs.utcToLocal(this.state.latestdataTime) : '';

	            return React.createElement(
	                'div',
	                { className: 'xyml-history' },
	                React.createElement(
	                    'section',
	                    null,
	                    React.createElement(
	                        'p',
	                        { className: 'measure-time' },
	                        React.createElement('img', { src: '../static/img/ic-time.png', alt: '\u65F6\u95F4' }),
	                        '\u6D4B\u91CF\u65F6\u95F4\uFF1A',
	                        React.createElement(
	                            'span',
	                            { className: '' },
	                            time
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
	                                { className: 'flex' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    '\u8840\u7CD6'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    this.state.latestBloodGlucose
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    'mmol/L'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_HistoryEcharts.HistoryEcharts, { type: 'bg', text: text, color: color })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('海尔一体机-血糖');
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
	'lastECG', // 上1次心电心率数据（最新一次数据）
	'uploadData', //上传数据到服务器
	'resetGlucoseStatus', //血糖---改变状态（空腹，餐后） 
	'getECGHistoryData', // 心电历史数据
	'getHeartRateDetail' // 心电详情
	]);

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

	var yValueArr = [],
	    glucoseStatus = void 0,
	    days = void 0;

	var Store = exports.Store = Reflux.createStore({
		listenables: [_Actions.Actions],
		onRepaint: function onRepaint(data) {
			this.trigger(data);
		},

		//获取最新血氧脉率数据
		onLastXyml: function onLastXyml(ajaxData) {
			var _this = this,
			    url = '/v1/app/chealth/haieraio/getLatestOxygenPulse';
			function sucCallback(d) {
				//console.log(d);
				var data = JSON.parse(d).data;
				if (data != '' && data != undefined) {
					_this.trigger({ noData: false, latestOxygen: data.oxygen, latestPulse: data.pulse, latestdataTime: data.dataTime });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},

		//获取最新血糖数据
		onLastBloodGlucose: function onLastBloodGlucose(ajaxData) {
			var _this = this,
			    url = '/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose';
			//console.log('dddddddddd',ajaxData);
			function sucCallback(d) {
				console.log(d);
				var data = JSON.parse(d).data;
				if (data != '' && data != undefined) {
					_this.trigger({ noData: false, showNext: true, latestBloodGlucose: data.bloodGlucose, latestdataTime: data.dataTime, lastStatus: data.personalStatus });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},
		onLastBloodPressure: function onLastBloodPressure(ajaxData) {
			var _this = this,
			    url = '/v1/app/chealth/haieraio/getLatestBloodPressure';
			function sucCallback(d) {
				//console.log(d);
				var data = JSON.parse(d).data;
				if (data != '' && data != undefined) {
					_this.trigger({ noData: false, latestSystolicPressure: data.systolicPressure, latestdataTime: data.dataTime, lastDiastolicPressure: data.diastolicPressure });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},
		onLastTemp: function onLastTemp(ajaxData) {
			var _this = this,
			    url = '/v1/app/chealth/thermometer/getLatestThermometer';
			function sucCallback(d) {
				//console.log('99999999',d);
				var data = JSON.parse(d).data;
				if (data != '' && data != undefined) {
					_this.trigger({ noData: false, latestTemp: data[0].value, latestdataTime: data[0].key });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},

		//获取最新心率心电数据
		onLastECG: function onLastECG(ajaxData) {
			var _this = this,
			    url = '/v1/app/chealth/haieraio/getLatestHeartRate';
			function sucCallback(d) {
				//console.log('99999999',d);
				var data = JSON.parse(d).data;
				if (data != '' && !data) {
					_this.trigger({ noData: false, latestHeartRate: data.heartRate, latestHeartEcg: data.heartEcg, latestdataTime: data.dataTime });
				}
			}
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
		},


		/* /v1/device/data/raw/upload  app代理 上传服务器*/
		//   onUploadData(data,status){
		//   	console.log('hahahahaaha',data);
		//   	let ajaxData = {
		//   		'appId':data.appId,
		//   		'timestamp':new Date().getTime(),
		//   		'deviceId':data.deviceId,
		//   		"data":{
		// 	    "userType": data.userType,  //用户身份（1：医生  3：患者）
		// 	    "memberId": data.memberId,  //用户编号（切换用户用）
		// 	   /* "status": "",   //个人状态（1：空腹，2：餐后一小时，3：餐后二小时）,如果没有，默认为空*/
		// 	    "dataType": "1",    //数据类型（1：血氧脉率，2：血压，3：血糖，4：心电，5：体温）
		// 	    "dataString": "",    //多个值请用,隔开。比如：(血氧,脉率)(收缩压,舒张压)
		// 	    "dataTime": "",  //测量时间（UTC时间）
		// 	    "timeZone": "600"   // 时区 (10*60 统一传分钟)
		// 	}
		//   	},
		//   	url = '/v1/device/data/raw/upload';
		// if(data){
		// 	let xymlData = data.xymlData,
		//    		tempData = data.tempData,
		//    		bloodGlucoseData = data.bloodGlucoseData,
		//    		bloodPressureData = data.bloodPressureData,
		//    		ecgData = data.ecgData;
		// 	if(xymlData!=''&& xymlData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(xymlData.dataTime,'-');
		// 		ajaxData.data.dataString = xymlData.oxygen + ',' + xymlData.pulse;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// 	if(bloodPressureData!=''&& bloodPressureData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(bloodPressureData.dataTime,'-');
		// 		ajaxData.data.dataString = bloodPressureData.systolicPressure + ','+ bloodPressureData.diastolicPressure ;
		// 		ajaxData.data.dataType = "2" ;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// 	if(bloodGlucoseData!=''&& bloodGlucoseData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(bloodGlucoseData.dataTime,'-');
		// 		ajaxData.data.dataString = bloodGlucoseData.bloodGlucose ;
		// 		ajaxData.data.dataType = "3" ;
		// 		if(status) ajaxData.data.status = status;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// 	if(tempData!=''&& tempData != undefined){
		// 		ajaxData.data.dataTime = Funs.timestampToUtc(tempData.dataTime,'-');
		// 		ajaxData.data.dataString = tempData.temp ;
		// 		ajaxData.data.dataType = "5" ;
		// 		het.post(url,JSON.stringify(ajaxData),function(d){console.log(d)},function(d){console.log(d)})
		// 	}
		// }
		//   },
		/*
	 *血氧脉率:/v1/app/chealth/haieraio/getLatestOxygenPulseDataList
	 *血压：/v1/app/chealth/haieraio/getLatestBloodPressureDataList
	 *血糖：/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose
	 *体温：/v1/app/chealth/thermometer/getThermometerDataByTime
	 */
		onUpdateEchart: function onUpdateEchart(date, type, ajaxData) {
			var _this = this;
			var url = '/v1/app/chealth/haieraio/getLatestOxygenPulseDataList';
			if (type == 'temp') {
				ajaxData.day = date;
			} else {
				ajaxData.days = date;
			}
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
					days = date;
					_this.onBloodGlucoseAjax(ajaxData);
					break;
				case 'temp':
					url = '/v1/app/chealth/thermometer/getThermometerDataByTime';
					_this.onTempAjax(url, ajaxData);
					break;
			}
		},

		/*血氧脉率历史数据*/
		onXymlAjax: function onXymlAjax(url, ajaxData) {
			var _this = this,
			    oxygenXValue = [],
			    oxygenYValue = [],
			    pulseYValue = [];
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
			function sucCallback(result) {
				var data = JSON.parse(result).data;
				//  	let data = [
				//     {   
				//         "oxygen": "93",   //血氧
				//         "pulse": "37",  //脉率
				//         "dataTime": "2016-06-06 12:12:12", //测量时间（求最近一天详情为UTC时间，多天为本地日期）
				//     },
				//     {   
				//         "oxygen": "97",   //血氧
				//         "pulse": "116",  //脉率
				//         "dataTime": "2016-06-06 14:12:12", //测量时间
				//     },
				//     {
				//         "oxygen": "90",   //血氧
				//         "pulse": "199",  //脉率
				//         "dataTime": "2016-06-06 14:13:12", //测量时间
				//     },
				//     {
				//         "oxygen": "88",   //血氧
				//         "pulse": "83",  //脉率
				//         "dataTime": "2016-06-06 14:25:12", //测量时间
				//     }
				// ];
				//console.log(data);
				//求最近一天详情为UTC时间，多天为本地日期）
				if (data != '' && data != undefined) {
					if (ajaxData.days == 1) {
						for (var i in data) {
							var localtime = _fun.Funs.utcToLocal(data[i].dataTime, 1);
							oxygenXValue.push(localtime);
							oxygenYValue.push(data[i].oxygen);
							pulseYValue.push(data[i].pulse);
						}
					} else {
						for (var i in data) {
							var _localtime = data[i].dataTime.substring(5, 11);
							oxygenXValue.push(_localtime);
							oxygenYValue.push(data[i].oxygen);
							pulseYValue.push(data[i].pulse);
						}
					}
				}
				_this.trigger({ oxygenXValue: oxygenXValue, oxygenYValue: oxygenYValue, pulseXValue: oxygenXValue, pulseYValue: pulseYValue });
			}
		},

		//血压历史数据
		onBloodPressureAjax: function onBloodPressureAjax(url, ajaxData) {
			var _this = this,
			    yValue = [],
			    xValue = [];
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
			function sucCallback(result) {
				//console.log(result);
				var data = JSON.parse(result).data;
				//求最近一天详情为UTC时间，多天为本地日期）
				if (data != '' && data != undefined) {
					var sPressureStr = data[0].systolicPressure,
					    pPressureStr = data[0].diastolicPressure;
					if (ajaxData.days == 1) {
						for (var i in data) {
							var localtime = _fun.Funs.utcToLocal(data[i].dataTime, 1);
							xValue.push(localtime);
							if (i > 0) {
								sPressureStr += ',' + data[i].systolicPressure;
								pPressureStr += ',' + data[i].diastolicPressure;
							}
						}
					} else {
						for (var i in data) {
							var _localtime2 = data[i].dataTime.substring(5, 11);
							xValue.push(_localtime2);
							if (i > 0) {
								sPressureStr += ',' + data[i].systolicPressure;
								pPressureStr += ',' + data[i].diastolicPressure;
							}
						}
					}
					yValue.push(sPressureStr);
					yValue.push(pPressureStr);
				}
				_this.trigger({ xValue: xValue, yValue: yValue });
			}
		},

		//体温历史数据
		onTempAjax: function onTempAjax(url, ajaxData) {
			var _this = this,
			    yValue = [],
			    xValue = [];
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
			function sucCallback(result) {
				var data = JSON.parse(result).data;

				//求最近一天详情为UTC时间，多天为本地日期）
				if (data != '' && data != undefined) {
					var tempStr = data[0].value;
					if (ajaxData.day == 1) {
						for (var i in data) {
							var localtime = _fun.Funs.utcToLocal(data[i].key, 1);
							xValue.push(localtime);
							if (i > 0) {
								tempStr += ',' + (data[i].value > 42 ? "42" : data[i].value < 35 ? '35' : data[i].value);
							}
						}
					} else {
						for (var i in data) {
							var _localtime3 = data[i].key.substring(5, 11);
							xValue.push(_localtime3);
							if (i > 0) {
								tempStr += ',' + (data[i].value > 42 ? "42" : data[i].value < 35 ? '35' : data[i].value);
							}
						}
					}
					yValue.push(tempStr);
				}
				_this.trigger({ xValue: xValue, yValue: yValue });
			}
		},

		//血糖历史数据
		onBloodGlucoseAjax: function onBloodGlucoseAjax(ajaxData, personalStatus) {
			this.onResetGlucoseStatus(ajaxData, '1');
		},
		onResetGlucoseStatus: function onResetGlucoseStatus(ajaxData, glucoseStatus) {
			var _this = this,
			    url = '/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucoseDataList',
			    yValue = [],
			    xValue = [];
			this.trigger({ glucoseStatus: glucoseStatus });
			ajaxData.days = days;
			ajaxData.personalStatus = glucoseStatus;
			het.get(url, ajaxData, sucCallback, function (e) {
				alert(e);
			});
			function sucCallback(result) {
				//console.log(result);
				var data = JSON.parse(result).data;
				yValueArr = data;
				//求最近一天详情为UTC时间，多天为本地日期）
				if (yValueArr != '' && yValueArr != undefined) {
					var glucoseStr = '';
					if (days == 1) {
						for (var i in yValueArr) {
							var localtime = _fun.Funs.utcToLocal(yValueArr[i].dataTime, 1);
							glucoseStr += ',' + yValueArr[i].bloodGlucose;
							xValue.push(localtime);
						}
					} else {
						for (var i in yValueArr) {
							var _localtime4 = yValueArr[i].dataTime.substring(5, 11);
							glucoseStr += ',' + yValueArr[i].bloodGlucose;
							xValue.push(_localtime4);
						}
					}
					yValue.push(glucoseStr.substring(1, glucoseStr.length));
				}
				_this.trigger({ xValue: xValue, yValue: yValue });
			}
		},

		// 获取心电历史数据
		onGetECGHistoryData: function onGetECGHistoryData(data) {
			var _this = this;
			het.get('/v1/app/chealth/haieraio/getHeartRateDataList', data, function (data) {
				data = typeof data === 'string' ? JSON.parse(data) : data;
				if (!data.data) return;
				data = groupECGData(data.data, 'dataTime');
				_this.trigger({ history: data });
			}, function () {});
		},

		// 获取心电详情
		onGetHeartRateDetail: function onGetHeartRateDetail(data) {
			var _this = this;
			het.get('/v1/app/chealth/haieraio/getHeartRateByDataId', data, function (data) {
				data = typeof data === 'string' ? JSON.parse(data) : data;
				if (!data.data) return;
				//data = groupECGData(data.data, 'dataTime');
				_this.trigger({ detail: data.data });
			}, function () {});
		}
	});

	// 心跳数据分组排序
	function groupECGData(data, key) {
		var monData = {};
		var monArr = [];
		var dayData = {};
		var dayArr = [];
		// 按月分组
		for (var i in data) {
			var mk = _fun.Funs.dateFormat(data[i][key], 'yyyy-MM', true);
			var dk = _fun.Funs.dateFormat(data[i][key], 'yyyy-MM-dd', true);
			if (!monData[mk]) {
				monData[mk] = {};
			}
			if (!dayData[dk]) {
				dayData[dk] = [];
			}
			dayData[dk].push(data[i]);
			monData[mk][dk] = dayData[dk];
		}
		// 排序并组织成数组形式
		for (var j in monData) {
			dayArr = [];
			for (var k in monData[j]) {
				monData[j][k].sort(function (a, b) {
					return a[key] < b[key];
				});
				dayArr.push({ day: k, data: monData[j][k] });
			}
			dayArr.sort(function (a, b) {
				return a.day < b.day;
			});
			monArr.push({ month: j, data: dayArr });
		}
		monArr.sort(function (a, b) {
			return a.month < b.month;
		});
		return monArr;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 历史数据图表组件
	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HistoryEcharts = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _fun = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HistoryEcharts = exports.HistoryEcharts = function (_BaseComponent) {
	    _inherits(HistoryEcharts, _BaseComponent);

	    function HistoryEcharts(props) {
	        _classCallCheck(this, HistoryEcharts);

	        var _this2 = _possibleConstructorReturn(this, (HistoryEcharts.__proto__ || Object.getPrototypeOf(HistoryEcharts)).call(this, props));

	        _this2.state = {
	            num: 1,
	            glucoseStatus: "1",
	            glucosedays: '1',
	            xValue: [],
	            yValue: []
	        };
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(HistoryEcharts, [{
	        key: 'updateEchart',
	        value: function updateEchart(date) {
	            //console.log(date);
	            var ajaxData = {
	                'userType': this.state.userType ? this.state.userType : '3',
	                'memberId': this.state.memberId ? this.state.memberId : '0',
	                'appId': this.state.appId ? this.state.appId : '10121',
	                'timestamp': new Date().getTime()
	            },
	                type = this.props.type;
	            if (type == 'temp') {
	                ajaxData.deviceId = this.state.deviceId ? this.state.deviceId : '';
	            }
	            if (type == 'bg') {
	                ajaxData.personalStatus = '1';
	            }
	            _Actions.Actions.updateEchart(date, type, ajaxData);
	        }
	    }, {
	        key: 'resetGlucoseStatus',
	        value: function resetGlucoseStatus(glucoseStatus) {
	            var ajaxData = {
	                'userType': this.state.userType ? this.state.userType : '3',
	                'memberId': this.state.memberId ? this.state.memberId : '0',
	                'appId': this.state.appId ? this.state.appId : 1,
	                'timestamp': new Date().getTime()
	            };
	            _Actions.Actions.resetGlucoseStatus(ajaxData, glucoseStatus);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var num = this.state.num,
	                glucoseStatus = this.state.glucoseStatus;
	            console.log('chart', this.state);
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
	                            '1\u5929'
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: num === 7 ? 'flex-cell active ' : 'flex-cell', onTouchEnd: this.updateEchart.bind(this, 7) },
	                            '7\u5929'
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: num === 14 ? 'flex-cell active ' : 'flex-cell', onTouchEnd: this.updateEchart.bind(this, 14) },
	                            '14\u5929'
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: num === 30 ? 'flex-cell active ' : 'flex-cell', onTouchEnd: this.updateEchart.bind(this, 30) },
	                            '30\u5929'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: this.props.type === 'bg' ? 'chose-status show' : 'hide', style: { margin: '-15px' } },
	                    React.createElement(
	                        'div',
	                        { className: 'flex' },
	                        React.createElement(
	                            'p',
	                            { className: glucoseStatus === "1" ? 'glucoseBtn flex-cell' : 'glucoseBtn flex-cell off', onTouchEnd: this.resetGlucoseStatus.bind(this, "1") },
	                            '\u7A7A\u8179'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: glucoseStatus === "2" ? 'glucoseBtn flex-cell' : 'glucoseBtn flex-cell off', onTouchEnd: this.resetGlucoseStatus.bind(this, "2") },
	                            '\u9910\u540E1\u5C0F\u65F6'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: glucoseStatus === "3" ? 'glucoseBtn flex-cell' : 'glucoseBtn flex-cell off', onTouchEnd: this.resetGlucoseStatus.bind(this, "3") },
	                            '\u9910\u540E2\u5C0F\u65F6'
	                        )
	                    )
	                ),
	                React.createElement('section', { className: 'flex chart-container', id: 'chart', ref: 'chart' })
	            );
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            setTimeout(function () {
	                var ajaxData = {
	                    'userType': _this.state.userType ? _this.state.userType : '',
	                    'memberId': _this.state.memberId ? _this.state.memberId : '',
	                    'appId': _this.state.appId ? _this.state.appId : '',
	                    'timestamp': new Date().getTime()
	                },
	                    type = _this.props.type;
	                if (type == 'temp') {
	                    ajaxData.deviceId = _this.state.deviceId ? _this.state.deviceId : '';
	                }
	                _Actions.Actions.updateEchart(1, type, ajaxData);
	            }, 500);
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
	            //console.log(this.props);
	            //alert(nextState);
	            for (var i in text) {
	                var yAxisObj = {
	                    type: 'value',
	                    axisLine: {
	                        lineStyle: { color: '#E1E1E1' }
	                    }
	                },
	                    seriesObj = {
	                    name: text[i],
	                    type: 'line',
	                    symbol: nextState.xValue.length > 1 ? 'none' : 'circle',
	                    yAxisIndex: _this.props.oneYAxis ? 0 : i,
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
	                    data: nextState.yValue[i] ? nextState.yValue[i].indexOf(',') > 0 ? nextState.yValue[i].split(',') : new Array(nextState.yValue[i]) : ''
	                };
	                yAxisObj.name = text[i];
	                yAxis.push(yAxisObj);
	                series.push(seriesObj);
	            }
	            if (this.props.oneYAxis) {
	                yAxis = [{ type: 'value' }];
	            }
	            if (this.props.type === 'temp') {
	                yAxis = [{ type: 'value', splitNumber: 1, interval: 1, min: 35, max: 42 }];
	            }
	            if (series.length < 2) {
	                text = '';
	            }
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
	            console.log(options);
	            myChart.setOption(options);
	        }
	    }]);

	    return HistoryEcharts;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ }
/******/ ]);