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

	module.exports = __webpack_require__(13);


/***/ },
/* 1 */,
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.HeartRateChart = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HeartRateChart = exports.HeartRateChart = function (_BaseComponent) {
	    _inherits(HeartRateChart, _BaseComponent);

	    function HeartRateChart(props) {
	        _classCallCheck(this, HeartRateChart);

	        var _this = _possibleConstructorReturn(this, (HeartRateChart.__proto__ || Object.getPrototypeOf(HeartRateChart)).call(this, props));

	        _this.option = {
	            tooltip: {
	                trigger: 'axis'
	            },
	            grid: {
	                left: '3%',
	                right: '4%',
	                bottom: '3%',
	                containLabel: true
	            },
	            color: ['#FFB379'],
	            xAxis: [{
	                type: 'category',
	                boundaryGap: false,
	                axisTick: { show: false },
	                splitLine: { show: false },
	                axisLabel: { show: false },
	                axisLine: { lineStyle: { color: '#E1E1E1' } },
	                data: _this.getSeriesData(props)
	            }],
	            yAxis: [{
	                type: 'value',
	                axisLabel: { show: false },
	                splitLine: { show: false },
	                axisLine: { lineStyle: { color: '#E1E1E1' } },
	                axisTick: { show: false }
	            }],
	            series: [{
	                type: 'line',
	                symbol: 'none',
	                areaStyle: {
	                    normal: {
	                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                            offset: 0,
	                            color: '#FFB379'
	                        }, {
	                            offset: 1,
	                            color: 'white'
	                        }])
	                    }
	                },
	                data: _this.getSeriesData(props)
	            }]
	        };
	        return _this;
	    }
	    // getXAxis(props){
	    //     let axis = [];
	    //     props.data.map(it=>{
	    //         axis.push(Funs.dateFormat(it.dataTime, 'M.d'));
	    //     });
	    //     return axis;
	    // }


	    _createClass(HeartRateChart, [{
	        key: 'getSeriesData',
	        value: function getSeriesData(props) {
	            var data = props.data.heartEcg ? props.data.heartEcg.split(':') : ['11', '81', '21', '28'];
	            return data;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var chartDOM = ReactDOM.findDOMNode(this.refs.chart);
	            this.chart = echarts.init(chartDOM);
	            this.chart.setOption(this.option);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(props) {
	            this.option.xAxis[0].data = this.getSeriesData(props);
	            this.option.series[0].data = this.getSeriesData(props);
	            this.chart.setOption(this.option);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement('div', { ref: 'chart', className: 'chart' });
	        }
	    }]);

	    return HeartRateChart;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _BloodPressure = __webpack_require__(14);

	var _BloodGlucose = __webpack_require__(16);

	var _Xyml = __webpack_require__(18);

	var _Ecg = __webpack_require__(21);

	var _Temp = __webpack_require__(22);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link,
	    IndexLink = _ReactRouter.IndexLink;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        webDataMap: {
	            'nickname': 'nickname', //昵称
	            'img': 'img', //头像
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

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            filter: ['userType', 'memberId', 'appId', 'deviceId', 'bloodGlucoseData', 'xymlData', 'bloodPressureData', 'tempData']
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'changeTab',
	        value: function changeTab(type) {
	            switch (type) {
	                case 'xyml':
	                    this.setState({
	                        filter: ['userType', 'memberId', 'appId', 'deviceId', 'xymlData']
	                    });
	                    break;
	                case 'bp':
	                    this.setState({
	                        filter: ['userType', 'memberId', 'appId', 'deviceId', 'bloodPressureData']
	                    });
	                    break;
	                case 'bg':
	                    this.setState({
	                        filter: ['userType', 'memberId', 'appId', 'deviceId', 'bloodGlucoseData']
	                    });
	                    break;
	                case 'temp':
	                    this.setState({
	                        filter: ['userType', 'memberId', 'appId', 'deviceId', 'tempData']
	                    });
	                    break;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var active = this.state.active;

	            var data = {
	                'userType': this.state.userType ? this.state.userType : '3',
	                'memberId': this.state.memberId ? this.state.memberId : '0',
	                'appId': this.state.appId ? this.state.appId : '10121',
	                'deviceId': this.state.deviceId ? this.state.deviceId : '',
	                'tempData': this.state.tempData ? this.state.tempData : '',
	                'xymlData': this.state.xymlData ? this.state.xymlData : '',
	                'bloodPressureData': this.state.bloodPressureData ? this.state.bloodPressureData : '',
	                'bloodGlucoseData': this.state.bloodGlucoseData ? this.state.bloodGlucoseData : '',
	                'ecgData': this.state.ecgData ? this.state.ecgData : ''
	            };
	            var filter = this.state.filter;
	            var total = {};
	            filter.map(function (it) {
	                total[it] = data[it];
	            });

	            return React.createElement(
	                'div',
	                { className: '' },
	                React.createElement(
	                    'section',
	                    { className: 'header' },
	                    React.createElement(
	                        'a',
	                        { href: 'health://switch_user' },
	                        React.createElement('img', { className: 'photo', src: this.state.img ? this.state.img : '../static/img/ic-default.png', alt: '\u5934\u50CF' }),
	                        React.createElement(
	                            'span',
	                            { className: 'nikename' },
	                            this.state.nickname
	                        )
	                    )
	                ),
	                React.createElement(
	                    'nav',
	                    { className: 'nav' },
	                    React.createElement(
	                        'ul',
	                        { className: 'flex' },
	                        React.createElement(
	                            'li',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                IndexLink,
	                                { to: '/', activeClassName: 'active', onClick: this.changeTab.bind(this, 'xyml') },
	                                '\u8840\u6C27\u8109\u7387'
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                Link,
	                                { to: '/bloodPressure', activeClassName: 'active', onClick: this.changeTab.bind(this, 'bp') },
	                                '\u8840\u538B'
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                Link,
	                                { to: '/bloodGlucose', activeClassName: 'active', onClick: this.changeTab.bind(this, 'bg') },
	                                '\u8840\u7CD6'
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                Link,
	                                { to: '/temp', activeClassName: 'active', onClick: this.changeTab.bind(this, 'temp') },
	                                '\u4F53\u6E29'
	                            )
	                        )
	                    )
	                ),
	                React.cloneElement(this.props.children, { total: total })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('海尔一体机健康监测仪');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    var routes = {
	        path: '/',
	        component: App,
	        indexRoute: { component: __webpack_require__(18).default },
	        childRoutes: [{ path: 'xyml', component: __webpack_require__(18).default }, { path: 'bloodPressure', component: _BloodPressure.BloodPressure }, { path: 'bloodGlucose', component: _BloodGlucose.BloodGlucose }, { path: 'ecg', component: _Ecg.Ecg }, { path: 'temp', component: _Temp.Temp }]
	    };

	    ReactDOM.render(React.createElement(Router, { history: hashHistory, routes: routes }), document.getElementById('ROOT'));
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BloodPressure = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _BloodPressureRange = __webpack_require__(15);

	var _fun = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 血压组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * /v1/app/chealth/haieraio/getLatestBloodPressure
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var BloodPressure = exports.BloodPressure = function (_React$Component) {
	    _inherits(BloodPressure, _React$Component);

	    function BloodPressure(props) {
	        _classCallCheck(this, BloodPressure);

	        var _this2 = _possibleConstructorReturn(this, (BloodPressure.__proto__ || Object.getPrototypeOf(BloodPressure)).call(this, props));

	        _this2.state = {
	            noData: true,
	            latestSystolicPressure: '',
	            latestdataTime: '',
	            lastDiastolicPressure: ''
	        };
	        //Store.listen((data)=>this.setState(data)); // 监听Store

	        return _this2;
	    }

	    _createClass(BloodPressure, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this,
	                url = '/v1/app/chealth/haieraio/getLatestBloodPressure';
	            setTimeout(function () {
	                var ajaxData = {
	                    'userType': _this.props.total.userType ? _this.props.total.userType : 1,
	                    'memberId': _this.props.total.memberId ? _this.props.total.memberId : 1,
	                    'appId': _this.props.total.appId ? _this.props.total.appId : '10121',
	                    'timestamp': new Date().getTime()
	                };
	                function sucCallback(d) {
	                    var data = typeof d === 'string' ? JSON.parse(d) : d;
	                    if (!data.data || data.data.dataTime == undefined) return;
	                    _this.setState({ noData: false, latestSystolicPressure: data.data.systolicPressure, latestdataTime: data.data.dataTime, lastDiastolicPressure: data.data.diastolicPressure });
	                }
	                het.get(url, ajaxData, sucCallback, function (e) {
	                    alert(e);
	                });
	            }, 500);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //console.log(this.state);
	            var bloodPressureData = this.props.total.bloodPressureData != '' && this.props.total.bloodPressureData.systolicPressure != '0' ? this.props.total.bloodPressureData : false,
	                systolic = bloodPressureData ? bloodPressureData.systolicPressure : this.state.latestSystolicPressure,
	                diastolic = bloodPressureData ? bloodPressureData.diastolicPressure : this.state.lastDiastolicPressure,
	                time = bloodPressureData ? _fun.Funs.dateFormatFull(bloodPressureData.dataTime / 1000, 'full') : this.state.latestdataTime ? _fun.Funs.utcToLocal(this.state.latestdataTime) : '';

	            return React.createElement(
	                'article',
	                { className: 'blood-pressure' },
	                bloodPressureData || this.state.noData === false ? React.createElement(
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
	                        { className: 'measure-data' },
	                        React.createElement(
	                            'p',
	                            { className: 'flex' },
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                '\u6536\u7F29\u538B'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                systolic
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                'mmHg'
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'refer' },
	                            '\u53C2\u8003\u503C 90~139'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'measure-data', style: { margin: '40px auto' } },
	                        React.createElement(
	                            'p',
	                            { className: 'flex' },
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                '\u8212\u5F20\u538B'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                diastolic
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                'mmHg'
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'refer' },
	                            '\u53C2\u8003\u503C 60~89'
	                        )
	                    ),
	                    React.createElement(_BloodPressureRange.BloodPressureRange, { systolic: systolic, diastolic: diastolic }),
	                    React.createElement(
	                        'a',
	                        { className: 'flex hsty-btn', id: 'hsty-btn', href: 'health://skip_url/bloodpressurehistory.html' },
	                        '\u5386\u53F2\u6570\u636E'
	                    )
	                ) : React.createElement(
	                    'section',
	                    { className: 'dev-info' },
	                    React.createElement('img', { className: 'bg-img', src: '../static/img/bg-xy.png', alt: '\u8840\u538B' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u5C06\u8840\u538B\u8896\u5E26\u63D2\u5934\u4E0E\u68C0\u6D4B\u4EEA\u7684\u201CNIBP\u201D\u63A5\u53E3\u76F8\u8FDE\u63A5\uFF0C\u4F69\u6234\u8896\u5E26\uFF0C\u6309\u4E0B\u8840\u538B\u952E\uFF0C\u5373\u53EF\u5F00\u59CB\u6D4B\u91CF\u8840\u538B\u3002'
	                    )
	                )
	                //   this.props.total.isBloodPressureOn==false ? (
	                //     <section className='dev-info'>
	                //         <img className='bg-img' src='../static/img/bg-xy.png' alt='血压' /> 
	                //         <p>将血压袖带插头与检测仪的“NIBP”接口相连接，佩戴袖带，按下血压键，即可开始测量血压。</p>
	                //     </section>
	                // ) : (
	                //     <section className='is-on'> 
	                //         <div className="circle-img"></div>
	                //         <span className='circle-text'>测量中</span>
	                //     </section>
	                // )

	            );
	        }
	    }]);

	    return BloodPressure;
	}(React.Component);

	;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 血压状态条组件
	 * @prop {string} systolic  收缩压值
	 * @prop {string} diastolic  舒张压值
	 * @低血压:舒张压<60 收缩压<90
	 * @正常血压    :舒张压60~89 收缩压90~139
	 * @高血压    :舒张压 >90  收缩压 >140
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var BloodPressureRange = exports.BloodPressureRange = React.createClass({
	    displayName: 'BloodPressureRange',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        //console.log(this.props.systolic);
	        var systolic = parseFloat(this.props.systolic),
	            diastolic = parseFloat(this.props.diastolic),
	            rangeValue = '5';
	        if (systolic < 90 || diastolic < 60) {
	            rangeValue = '5';
	        } else if (140 > systolic && systolic >= 90 && 89 >= diastolic && diastolic >= 60) {
	            rangeValue = '15';
	        } else if (systolic >= 140 || diastolic >= 90) {
	            rangeValue = '25';
	        }
	        //console.log(systolic,diastolic,rangeValue);
	        return React.createElement(
	            'div',
	            { className: 'd-range' },
	            React.createElement('input', { type: 'range', disabled: true, max: '30', min: '0', value: rangeValue }),
	            React.createElement(
	                'p',
	                { className: 'range-line' },
	                React.createElement('span', { style: { background: '#FDB27B', width: '33%' } }),
	                React.createElement('span', { style: { background: '#40DA91', width: '33%' } }),
	                React.createElement('span', { style: { background: '#FF503D', width: '33%' } })
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '12%', top: '38px', color: '#FDB27B' } },
	                    '\u504F\u4F4E'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '45%', top: '38px', color: '#40DA91' } },
	                    '\u6B63\u5E38'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '78%', top: '38px', color: '#FF503D' } },
	                    '\u504F\u9AD8'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BloodGlucose = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _BloodGlucoseRange = __webpack_require__(17);

	var _fun = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 血糖组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * /v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  @prop personalStatus 个人状态（1:空腹，2:餐后一小时，3:餐后二小时）
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var BloodGlucose = exports.BloodGlucose = function (_React$Component) {
	    _inherits(BloodGlucose, _React$Component);

	    function BloodGlucose(props) {
	        _classCallCheck(this, BloodGlucose);

	        var _this2 = _possibleConstructorReturn(this, (BloodGlucose.__proto__ || Object.getPrototypeOf(BloodGlucose)).call(this, props));

	        _this2.state = {
	            noData: true,
	            showFirst: false,
	            showNext: false,
	            latestBloodGlucose: '',
	            lastStatus: '',
	            latestdataTime: '',
	            myStatus: ''
	        };
	        //Store.listen((data)=>this.setState(data)); // 监听Store

	        return _this2;
	    }

	    _createClass(BloodGlucose, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var ajaxData = this.props.total.ajaxData;
	            //Actions.lastBloodGlucose(ajaxData);
	            var _this = this,
	                url = '/v1/app/chealth/bloodGlucoseMeter/getLatestBloodGlucose';
	            setTimeout(function () {
	                var ajaxData = {
	                    'userType': _this.props.total.userType ? _this.props.total.userType : '3',
	                    'memberId': _this.props.total.memberId ? _this.props.total.memberId : 1,
	                    'appId': _this.props.total.appId ? _this.props.total.appId : '10121',
	                    'timestamp': new Date().getTime()
	                };
	                function sucCallback(d) {
	                    var data = typeof d === 'string' ? JSON.parse(d) : d;
	                    if (!data.data || data.data.dataTime == undefined) return;
	                    // if(_this.props.total.bloodGlucoseData){
	                    //     _this.setState({showFirst:true,showNext:false});
	                    // }
	                    _this.setState({ noData: false, showNext: true, latestBloodGlucose: data.data.bloodGlucose, latestdataTime: data.data.dataTime, lastStatus: data.data.personalStatus });
	                }
	                het.get(url, ajaxData, sucCallback, function (e) {
	                    alert(e);
	                });
	            }, 500);
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var bloodGlucoseData = nextProps.total.bloodGlucoseData;
	            //console.log(this.props);
	            if (bloodGlucoseData != '') {
	                this.setState({ showFirst: true, showNext: false });
	            }
	            if (this.props.total.bloodGlucoseData) {
	                if (this.props.total.bloodGlucoseData.bloodGlucose == bloodGlucoseData.bloodGlucose && this.props.total.bloodGlucoseData.dataTime == bloodGlucoseData.dataTime) {
	                    this.setState({ showFirst: false, showNext: true });
	                }
	            }
	        }
	    }, {
	        key: 'goForward',
	        value: function goForward(status) {
	            if (status != '') {
	                this.setState({ showFirst: false, showNext: true });
	            }
	        }
	    }, {
	        key: 'resetGlucoseStatus',
	        value: function resetGlucoseStatus(status) {
	            this.setState({ myStatus: status });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //console.log('caocaooc',this.props)
	            var bloodGlucoseData = this.props.total.bloodGlucoseData != '' ? this.props.total.bloodGlucoseData : false,
	                status = this.state.myStatus != '' ? this.state.myStatus : this.state.lastStatus,
	                statusArr = ['空腹', '餐后1小时', '餐后2小时'],
	                time = bloodGlucoseData ? _fun.Funs.dateFormatFull(bloodGlucoseData.dataTime / 1000, 'full') : this.state.latestdataTime ? _fun.Funs.utcToLocal(this.state.latestdataTime) : '',
	                bloodGlucose = bloodGlucoseData ? bloodGlucoseData.bloodGlucose : parseFloat(this.state.latestBloodGlucose),
	                myStatus = this.state.myStatus,
	                uploadHref = 'health://guide_status/' + myStatus; //health://guide_status/

	            var standard1 = void 0,
	                standard2 = void 0,
	                max = void 0,
	                min = void 0,
	                color = void 0;
	            switch (status) {
	                case '1':
	                    standard1 = '3.9';
	                    standard2 = '6.1';
	                    break;
	                case '2':
	                    standard1 = '6.7';
	                    standard2 = '9.4';
	                    break;
	                case '3':
	                    standard1 = '3.9';
	                    standard2 = '7.8';
	                    break;
	            }
	            max = (2 * standard2 - standard1) * 10;
	            min = (standard1 - (standard2 - standard1)) * 10;
	            if (bloodGlucose < standard1) {
	                color = '#FF4045';
	            } else if (bloodGlucose < standard2) {
	                color = '#40DA91';
	            } else {
	                color = '#F2CE3C';
	            }

	            return React.createElement(
	                'article',
	                { className: 'blood-glucose' },
	                bloodGlucoseData || this.state.noData === false ? this.state.showFirst === true ? React.createElement(
	                    'section',
	                    null,
	                    React.createElement(
	                        'div',
	                        { className: 'measure-data', style: { marginTop: '40px', width: "14rem" } },
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
	                                { className: 'flex-cell', style: { color: '#5E5E5E' } },
	                                bloodGlucoseData ? bloodGlucoseData.bloodGlucose : ''
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                'mmol/L'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'chose-status' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u8BF7\u9009\u62E9\u60A8\u7684\u9009\u62E9\u72B6\u6001\uFF1A'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex' },
	                            React.createElement(
	                                'p',
	                                { className: myStatus === "1" ? 'glucoseBtn flex-cell' : 'glucoseBtn flex-cell off', onTouchEnd: this.resetGlucoseStatus.bind(this, "1") },
	                                '\u7A7A\u8179'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: myStatus === "2" ? 'glucoseBtn flex-cell' : 'glucoseBtn flex-cell off', onTouchEnd: this.resetGlucoseStatus.bind(this, "2") },
	                                '\u9910\u540E1\u5C0F\u65F6'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: myStatus === "3" ? 'glucoseBtn flex-cell' : 'glucoseBtn flex-cell off', onTouchEnd: this.resetGlucoseStatus.bind(this, "3") },
	                                '\u9910\u540E2\u5C0F\u65F6'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'a',
	                        { className: myStatus != '' ? 'flex hsty-btn ' : 'flex hsty-btn unable', style: { position: 'absolute', bottom: '0' }, href: uploadHref, onClick: this.goForward.bind(this, myStatus) },
	                        '\u6211\u9009\u597D\u4E86'
	                    )
	                ) : React.createElement(
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
	                        { className: 'measure-data', style: { width: "14rem" } },
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
	                                { className: 'flex-cell', style: { color: color } },
	                                bloodGlucose
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                'mmol/L'
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'glucoseBtn' },
	                            statusArr[status - 1]
	                        )
	                    ),
	                    React.createElement(_BloodGlucoseRange.BloodGlucoseRange, { glucose: bloodGlucose, status: status, max: max, min: min, standard1: standard1, standard2: standard2 }),
	                    React.createElement(
	                        'a',
	                        { className: 'flex hsty-btn', id: 'hsty-btn', href: 'health://skip_url/bloodglucosehistory.html' },
	                        '\u5386\u53F2\u6570\u636E'
	                    )
	                ) : React.createElement(
	                    'section',
	                    { className: 'dev-info' },
	                    React.createElement('img', { className: 'bg-img', src: '../static/img/bg-xt.png', alt: '\u8840\u7CD6' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u901A\u8FC7USB\u6570\u636E\u7EBF\u5C06\u8840\u7CD6\u4EEA\u7684\u63A5\u53E3\u4E0E\u68C0\u6D4B\u4EEA\u7684\u201C'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'cor-red' },
	                        'GLU'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u201D \u63A5\u53E3\u76F8\u8FDE\u63A5\uFF0C\u4F7F\u7528\u91C7\u8840\u7B14\u91C7\u96C60.7ul\u8840\u91CF\u540E\uFF0C\u8FDB\u884C\u8840\u7CD6\u6D4B\u91CF\u3002'
	                    )
	                )
	            );
	        }
	    }]);

	    return BloodGlucose;
	}(React.Component);

	;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 血糖状态条组件
	 * @prop {string} status 个人状态（1:空腹，2:餐后一小时，3:餐后二小时）
	 * @prop {string} glucose 血糖值
	 *                          偏低     正常               偏高
	 *  空腹全血血糖  mmol/L   x<3.9  3.9<=x<=6.1    6.1<x<=6.7  >6.7   
	 *  餐后一小时血糖 mmol/L  x<6.7  6.7<=x<=9.4    9.4<x<=10.0 >10             
	 *  餐后二小时血糖 mmol/L  x<3.9  3.9<=x<=7.8    7.8<x<=10   >10            
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var BloodGlucoseRange = exports.BloodGlucoseRange = React.createClass({
	    displayName: 'BloodGlucoseRange',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        //console.log(this.props);
	        var status = this.props.status,
	            standard1 = this.props.standard1,
	            standard2 = this.props.standard2,
	            max = this.props.max,
	            min = this.props.min,
	            glucose = this.props.glucose * 10;

	        return React.createElement(
	            'div',
	            { className: 'd-range' },
	            React.createElement('input', { type: 'range', disabled: true, max: max, min: min, value: glucose }),
	            React.createElement(
	                'p',
	                { className: 'range-line' },
	                React.createElement('span', { style: { background: '#FF4045', width: '33%' } }),
	                React.createElement('span', { style: { background: '#40DA91', width: '33%' } }),
	                React.createElement('span', { style: { background: '#F2CE3C', width: '33%' } })
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '30%' } },
	                    standard1
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '64%' } },
	                    standard2
	                )
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '14%', top: '38px', color: '#FF4045' } },
	                    '\u4E0D\u8DB3'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '47%', top: '38px', color: '#40DA91' } },
	                    '\u6B63\u5E38'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '80%', top: '38px', color: '#F2CE3C' } },
	                    '\u8D85\u6807'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _fun = __webpack_require__(2);

	var _OxygenRange = __webpack_require__(19);

	var _PulseRange = __webpack_require__(20);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 血氧脉率组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {object}   ajaxData 请求接口所需参数
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * /v1/app/chealth/haieraio/getLatestOxygenPulse    获取最新血氧脉率数据
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Xyml = function (_React$Component) {
	    _inherits(Xyml, _React$Component);

	    function Xyml(props) {
	        _classCallCheck(this, Xyml);

	        var _this2 = _possibleConstructorReturn(this, (Xyml.__proto__ || Object.getPrototypeOf(Xyml)).call(this, props));

	        _this2.state = {
	            noData: true,
	            latestOxygen: '',
	            latestPulse: '',
	            latestdataTime: ''
	        };
	        //Store.listen((data)=>this.setState(data)); // 监听Store
	        return _this2;
	    }

	    _createClass(Xyml, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //Actions.lastXyml(ajaxData);
	            var _this = this,
	                url = '/v1/app/chealth/haieraio/getLatestOxygenPulse';
	            setTimeout(function () {
	                var ajaxData = {
	                    'userType': _this.props.total.userType ? _this.props.total.userType : '3',
	                    'memberId': _this.props.total.memberId ? _this.props.total.memberId : '0',
	                    'appId': _this.props.total.appId ? _this.props.total.appId : '10121',
	                    'timestamp': new Date().getTime()
	                };
	                function sucCallback(d) {
	                    var data = typeof d === 'string' ? JSON.parse(d) : d;
	                    if (!data.data || data.data.dataTime == undefined) return;
	                    _this.setState({ noData: false, latestOxygen: data.data.oxygen, latestPulse: data.data.pulse, latestdataTime: data.data.dataTime });
	                }
	                het.get(url, ajaxData, sucCallback, function (e) {
	                    alert(e);
	                });
	            }, 100);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // console.log(this.props);
	            var xymlData = this.props.total.xymlData != '' && this.props.total.xymlData.oxygen != "0" ? this.props.total.xymlData : false,
	                time = xymlData ? _fun.Funs.dateFormatFull(xymlData.dataTime / 1000, 'full') : this.state.latestdataTime ? _fun.Funs.utcToLocal(this.state.latestdataTime) : '',
	                pulse = xymlData ? xymlData.pulse : this.state.latestPulse,
	                oxygen = xymlData ? xymlData.oxygen : this.state.latestOxygen;
	            return React.createElement(
	                'article',
	                { className: 'xyml' },
	                xymlData || this.state.noData === false ? React.createElement(
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
	                        'p',
	                        { className: 'measure-data flex' },
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            '\u8840\u6C27'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            oxygen
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            '%'
	                        )
	                    ),
	                    React.createElement(_OxygenRange.OxygenRange, { oxygen: oxygen }),
	                    React.createElement('p', { className: 'line' }),
	                    React.createElement(
	                        'p',
	                        { className: 'measure-data flex' },
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            '\u8109\u7387'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            pulse
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            '\u6B21/\u5206'
	                        )
	                    ),
	                    React.createElement(_PulseRange.PulseRange, { pulse: pulse }),
	                    React.createElement(
	                        'a',
	                        { className: 'flex hsty-btn', id: 'hsty-btn', href: './xymlhistory.html' },
	                        '\u5386\u53F2\u6570\u636E'
	                    )
	                ) : React.createElement(
	                    'section',
	                    { className: 'dev-info' },
	                    React.createElement('img', { className: '', src: '../static/img/bg-xyml.png', alt: '\u8840\u6C27\u8109\u7387' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u5C06\u667A\u80FD\u8840\u6C27\u63A2\u5934\u7684\u63D2\u5934\u4E0E\u68C0\u6D4B\u4EEA\u7684\u201CSp02\u201D\u63A5\u53E3\u76F8\u8FDE \u63A5\u540E\uFF0C\u624B\u6307\uFF08\u5EFA\u8BAE\u4F7F\u7528\u98DF\u6307\uFF09\u4F38\u5165\u63A2\u5934\u5185\uFF0C\u5373\u53EF\u5F00\u59CB\u6D4B\u91CF\u8840\u6C27\u548C\u8109\u7387\u3002'
	                    )
	                )
	                // { this.props.total.isXymlOn==false ? (
	                //     <section className='dev-info'>
	                //         <img className='' src='../static/img/bg-xyml.png' alt='血氧脉率' /> 
	                //         <span>将智能血氧探头的插头与检测仪的“Sp02”接口相连 接后，手指（建议使用食指）伸入探头内，即可开始测量血氧和脉率。</span>
	                //     </section>
	                // ) : (
	                //     <section className='is-on'> 
	                //          <div className="circle-img"></div>
	                //         <span className='circle-text'>测量中</span>
	                //     </section>
	                // )}

	            );
	        }
	    }]);

	    return Xyml;
	}(React.Component);

	exports.default = Xyml;
	;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 血氧状态条组件
	 * @prop {number} oxygen  血氧值
	 * @非常危险:<90%  
	 * @危险    :90%~94%
	 * @正常    :95%~98%
	 * max min : 99 35
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var OxygenRange = exports.OxygenRange = React.createClass({
	    displayName: 'OxygenRange',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        console.log(this.props.oxygen);
	        return React.createElement(
	            'div',
	            { className: 'd-range' },
	            React.createElement('input', { type: 'range', disabled: true, max: '99', min: '79', value: this.props.oxygen }),
	            React.createElement(
	                'p',
	                { className: 'range-line' },
	                React.createElement('span', { style: { background: '#FF4045', width: '50%' } }),
	                React.createElement('span', { style: { background: '#F2CE3C', width: '25%' } }),
	                React.createElement('span', { style: { background: '#40DA91', width: '25%' } })
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '1%' } },
	                    '0'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '48%' } },
	                    '90%'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '72%' } },
	                    '95%'
	                )
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '18%', top: '38px', color: '#FF4045' } },
	                    '\u975E\u5E38\u5371\u9669'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '53%', top: '38px', color: '#F2CE3C' } },
	                    '\u5371\u9669'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '80%', top: '38px', color: '#40DA91' } },
	                    '\u6B63\u5E38'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 脉率状态条组件
	 * @prop {number} pulse  脉率值
	 * @非常危险:<40 或 >140 
	 * @危险    :40~59 或 101~140
	 * @正常    :60~100
	 * max min :200 30
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var PulseRange = exports.PulseRange = React.createClass({
	    displayName: 'PulseRange',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {

	        return React.createElement(
	            'div',
	            { className: 'd-range' },
	            React.createElement('input', { type: 'range', disabled: true, max: '180', min: '0', value: this.props.pulse }),
	            React.createElement(
	                'p',
	                { className: 'range-line' },
	                React.createElement('span', { style: { background: '#FF4045', width: '22.2%' } }),
	                React.createElement('span', { style: { background: '#F2CE3C', width: '11.1%' } }),
	                React.createElement('span', { style: { background: '#40DA91', width: '22.2%' } }),
	                React.createElement('span', { style: { background: '#F2CE3C', width: '22.2%' } }),
	                React.createElement('span', { style: { background: '#FF4045', width: '22.2%' } })
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '1%' } },
	                    '0'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '20%' } },
	                    '40'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '32%' } },
	                    '60'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '52%' } },
	                    '100'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '75%' } },
	                    '140'
	                )
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '2%', top: '38px', color: '#FF4045' } },
	                    '\u975E\u5E38\u5371\u9669'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '24%', top: '38px', color: '#F2CE3C' } },
	                    '\u5371\u9669'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '40%', top: '38px', color: '#40DA91' } },
	                    '\u6B63\u5E38'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '62%', top: '38px', color: '#F2CE3C' } },
	                    '\u5371\u9669'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '80%', top: '38px', color: '#FF4045' } },
	                    '\u975E\u5E38\u5371\u9669'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Ecg = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _fun = __webpack_require__(2);

	var _HeartRateChart = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 心电组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var Ecg = exports.Ecg = function (_BaseComponent) {
	    _inherits(Ecg, _BaseComponent);

	    function Ecg(props) {
	        _classCallCheck(this, Ecg);

	        var _this2 = _possibleConstructorReturn(this, (Ecg.__proto__ || Object.getPrototypeOf(Ecg)).call(this, props));

	        _this2.state = {
	            noData: true
	        };
	        _this2.listenStore(_Store.Store); // 监听Store

	        return _this2;
	    }

	    _createClass(Ecg, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this;
	            setTimeout(function () {
	                var ajaxData = {
	                    'userType': _this.props.total.userType ? _this.props.total.userType : '',
	                    'memberId': _this.props.total.memberId ? _this.props.total.memberId : '',
	                    'appId': _this.props.total.appId ? _this.props.total.appId : '10121',
	                    'timestamp': new Date().getTime()
	                };
	                _Actions.Actions.lastECG(ajaxData);
	            }, 500);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            console.log(this.state, this.props);
	            var ecgData = this.props.total.ecgData != '' ? this.props.total.ecgData : false,
	                time = ecgData ? _fun.Funs.dateFormatFull(ecgData.dataTime / 1000, 'full') : this.state.latestdataTime ? _fun.Funs.utcToLocal(this.state.latestdataTime) : '',
	                //安卓传的毫秒。。。
	            heartRate = ecgData ? ecgData.heartRate : this.state.latestHeartRate,
	                heartEcg = ecgData ? ecgData.heartEcg : this.state.latestHeartEcg;
	            return React.createElement(
	                'article',
	                { className: 'blood-glucose' },
	                ecgData || this.state.noData === false ? React.createElement(
	                    'div',
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
	                        { className: 'measure-data', style: { marginBottom: '30px' } },
	                        React.createElement(
	                            'p',
	                            { className: 'flex' },
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                '\u5FC3\u7387'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell', style: { color: '#5D5D5D' } },
	                                heartRate
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell' },
	                                '\u6B21/\u5206'
	                            )
	                        )
	                    ),
	                    React.createElement('p', { className: 'line' }),
	                    React.createElement(_HeartRateChart.HeartRateChart, { data: ecgData ? ecgData : [] }),
	                    React.createElement(
	                        'a',
	                        { className: 'flex hsty-btn', id: 'hsty-btn', href: 'health://skip_url/ecghistory.html' },
	                        '\u5386\u53F2\u6570\u636E'
	                    )
	                ) : React.createElement(
	                    'div',
	                    { className: 'dev-info' },
	                    React.createElement('img', { className: 'bg-img', src: '../static/img/bg-xd1.png', alt: '\u5FC3\u75351' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u5C06\u5FEB\u901F\u5FC3\u7535\u68C0\u6D4B\u4EEA\u7684\u63D2\u5934\u4E0E\u68C0\u6D4B\u4EEA\u7684\u201CECG\u201D\u63A5\u53E3\u76F8 \u8FDE\u63A5\uFF0C\u6309\u5FC3\u7535\u4EEA\u201C\u5F00\u59CB\u201D\u6309\u94AE\uFF0C\u5373\u53EF\u5F00\u59CB\u6D4B\u91CF\u5FC3\u7535'
	                    )
	                )
	            );
	        }
	    }]);

	    return Ecg;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Temp = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _TempRange = __webpack_require__(23);

	var _fun = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 体温组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {string}   text 该项名称
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * /v1/app/chealth/thermometer/getThermometerByDate
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var Temp = exports.Temp = function (_React$Component) {
	    _inherits(Temp, _React$Component);

	    function Temp(props) {
	        _classCallCheck(this, Temp);

	        var _this2 = _possibleConstructorReturn(this, (Temp.__proto__ || Object.getPrototypeOf(Temp)).call(this, props));

	        _this2.state = {
	            noData: true,
	            latestTemp: '',
	            latestdataTime: ''
	        };
	        //Store.listen((data)=>this.setState(data)); // 监听Store
	        return _this2;
	    }

	    _createClass(Temp, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this = this,
	                url = '/v1/app/chealth/thermometer/getLatestThermometer';
	            setTimeout(function () {
	                var ajaxData = {
	                    'userType': _this.props.total.userType ? _this.props.total.userType : 1,
	                    'memberId': _this.props.total.memberId ? _this.props.total.memberId : 1,
	                    'appId': _this.props.total.appId ? _this.props.total.appId : '10121',
	                    'deviceId': _this.props.total.deviceId ? _this.props.total.deviceId : '',
	                    'timestamp': new Date().getTime()
	                };
	                function sucCallback(d) {
	                    var data = typeof d === 'string' ? JSON.parse(d) : d;
	                    if (!data.data || data.data[0].key == undefined) return;
	                    _this.setState({ noData: false, latestTemp: data.data[0].value, latestdataTime: data.data[0].key });
	                }
	                het.get(url, ajaxData, sucCallback, function (e) {
	                    alert(e);
	                });
	            }, 500);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var tempData = this.props.total.tempData != '' ? this.props.total.tempData : false,
	                time = tempData ? _fun.Funs.dateFormatFull(tempData.dataTime / 1000, 'full') : this.state.latestdataTime ? _fun.Funs.utcToLocal(this.state.latestdataTime) : '',
	                temp = tempData ? tempData.temp : this.state.latestTemp,
	                color = '';
	            if (temp < 36) {
	                color = '#FF4045';
	            } else if (temp < 37.1) {
	                color = '#40DA91';
	            } else {
	                color = '#F2CE3C';
	            }

	            return React.createElement(
	                'article',
	                { className: 'temp' },
	                tempData || this.state.noData === false ? React.createElement(
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
	                        'p',
	                        { className: 'measure-data flex' },
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            '\u4F53\u6E29'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell', style: { color: color } },
	                            temp
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            '\xB0C'
	                        )
	                    ),
	                    React.createElement(_TempRange.TempRange, { temp: temp }),
	                    React.createElement(
	                        'a',
	                        { className: 'flex hsty-btn', href: 'health://skip_url/temphistory.html', style: { position: 'absolute', bottom: '0' } },
	                        '\u5386\u53F2\u6570\u636E'
	                    )
	                ) : React.createElement(
	                    'section',
	                    { className: 'dev-info' },
	                    React.createElement('img', { className: '', src: '../static/img/bg-temp.png', alt: '\u4F53\u6E29' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u5C06\u611F\u6E29\u67AA\u7684\u63D2\u5934\u4E0E\u68C0\u6D4B\u4EEA\u7684\u201C'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'cor-green' },
	                        'TEMP'
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u201D\u63A5\u53E3\u76F8\u8FDE\u63A5\uFF0C\u8BA9\u611F\u6E29\u5934\u63A5\u89E6\u76AE\u80A4\u5E76\u6309\u4E0B\u6D4B\u91CF\u952E\uFF0C\u5373\u53EF\u5F00\u59CB\u6D4B\u91CF\u4F53\u6E29\u3002'
	                    )
	                )
	            );
	        }
	    }]);

	    return Temp;
	}(React.Component);

	;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 体温状态条组件
	 * @prop {string} temp  体温值
	 * @高温:<37
	 * @正常    :36-37
	 * @低温    :35
	 * max min : 40 35
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var TempRange = exports.TempRange = React.createClass({
	    displayName: 'TempRange',

	    getInitialState: function getInitialState() {
	        return {
	            temp: this.props.temp
	        };
	    },
	    changeValue: function changeValue(event) {
	        console.log(event.target.value);
	        //this.setState({temp: event.target.value});
	    },
	    render: function render() {
	        console.log(this.props.temp);
	        return React.createElement(
	            'div',
	            { className: 'd-range', style: { marginTop: '60px' } },
	            React.createElement('input', { type: 'range', disabled: true, max: '40', min: '35', value: this.props.temp, onChange: this.changeValue }),
	            React.createElement(
	                'p',
	                { className: 'range-line' },
	                React.createElement('span', { style: { background: '#FF4045', width: '20%' } }),
	                React.createElement('span', { style: { background: '#40DA91', width: '20%' } }),
	                React.createElement('span', { style: { background: '#F2CE3C', width: '60%' } })
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '15%' } },
	                    '36.0'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '35%' } },
	                    '37.0'
	                )
	            ),
	            React.createElement(
	                'p',
	                { className: 'range-text' },
	                React.createElement(
	                    'span',
	                    { style: { left: '5%', top: '38px', color: '#FF4045' } },
	                    '\u4F4E\u6E29'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '26%', top: '38px', color: '#40DA91' } },
	                    '\u6B63\u5E38'
	                ),
	                React.createElement(
	                    'span',
	                    { style: { left: '65%', top: '38px', color: '#F2CE3C' } },
	                    '\u9AD8\u6E29'
	                )
	            )
	        );
	    }
	});

/***/ }
/******/ ]);