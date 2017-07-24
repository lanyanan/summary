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

	module.exports = __webpack_require__(10);


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
	'changeDate', 'getOldData']);

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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _Actions = __webpack_require__(6);

	var _fun = __webpack_require__(2);

	var AppData = {};
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (data.back == 1) {
	            window.history.back();
	        }
	        AppData = _fun.Funs._extends(AppData, data);
	        if (AppData.isBleConnect !== undefined) delete AppData.isBleConnect;
	        // console.log('trigger',data);
	        this.trigger(data);
	    },
	    onGetOldData: function onGetOldData() {
	        this.trigger(AppData);
	    },
	    onChangeDate: function onChangeDate(newdate, data, isConnect) {
	        var timelist = [],
	            templist = [],
	            _this = this;
	        // let datajson={"data": [{"key": "2016-12-09 01:00:00","value": "36.4"},   {"key": "2016-12-09 04:00:00","value": "36.6"},
	        // {"key": "2016-12-09 08:00:00","value": "36.9"}, {"key": "2016-06-12 06:00:00", "value": "37.4" }]};
	        // sucCallback();
	        var url = '/v1/app/chealth/thermometer/getThermometerByMiniute';
	        var haveHistoryUrl = "/v1/app/chealth/thermometer/getLatestThermometer";
	        het.get(haveHistoryUrl, data, function (dt) {
	            var data = JSON.parse(dt),
	                date = data.data || {};
	            for (var i in date) {
	                if (!AppData.haveHistory) {
	                    het.toast('haveHistory');
	                }
	                AppData.haveHistory = true;
	            }
	            var haveHistory = AppData.haveHistory ? true : false;
	            AppData.haveHistory = true;
	            _this.trigger({ haveHistory: haveHistory });
	        }, function (dd) {
	            console.log(dd);
	        });
	        data.date = newdate;
	        het.get(url, data, sucCallback, function (dd) {
	            console.log(dd);
	        });

	        function sucCallback(dt) {
	            // console.log('dt',dt);
	            var data = JSON.parse(dt),
	                obj = data.data || {},
	                date = obj.data;
	            //alert(JSON.stringify(date));
	            // console.log(date);
	            for (var i in date) {
	                /*let time=Funs.dateFormatFull(data[i].key,"-",1);时间戳处理*/
	                /*let time=date[i].key.substring(11,16), */
	                //utc要改为本地时间
	                if (_typeof(date[i]) !== "object") return;
	                var utcDay = date[i].key.split(' ');
	                var utcDate = utcDay[0].split('-'),
	                    utcTime = utcDay[1].split(':'),
	                    timetamp = Math.round(Date.UTC(utcDate[0], utcDate[1] - 1, utcDate[2], utcTime[0], utcTime[1], utcTime[2]) / 1000),
	                    time = _fun.Funs.dateFormatFull(timetamp, "-", 1),
	                    temp = date[i].value < 34 ? '34' : date[i].value > 42 ? '42' : date[i].value;
	                timelist.push(time);
	                templist.push(temp);
	                // console.log(timetamp);
	            }
	            timelist = timelist instanceof Array && timelist.length > 0 ? timelist : ["00:00"];
	            templist = templist instanceof Array && templist.length > 0 ? templist : ["37"];
	            var hour = new Date().getHours();
	            var oneTempArray = [];
	            var oneTimeArray = [];
	            var sixTempArray = [];
	            var sixTimeArray = [];
	            timelist.map(function (item, index) {
	                var arr = item.split(':');
	                if (arr[0] >= hour - 1 && arr[0] < hour) {
	                    oneTimeArray.push(item);
	                    oneTempArray.push(timelist[index]);
	                } else if (arr[0] >= hour - 6 && arr[0] < hour) {
	                    sixTimeArray.push(item);
	                    sixTempArray.push(timelist[index]);
	                }
	            });
	            _this.trigger({ timeArray: timelist, tempArray: templist, highestThermometer: obj.highestThermometer, description: obj.description, dateTime: obj.dataTime, oneTempArray: oneTempArray, oneTimeArray: oneTimeArray, sixTempArray: sixTempArray, sixTimeArray: sixTimeArray, initTimeArray: timelist, initTempArray: templist });
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
	 * @prop {number} tabIndex (0,1,2) 1小时 6小时 24小时
	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Echarts = undefined;

	var _Actions = __webpack_require__(6);

	var _fun = __webpack_require__(2);

	var Echarts = exports.Echarts = React.createClass({
	    displayName: 'Echarts',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement('section', { className: ' chart-container', id: 'chart', ref: 'chart' });
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;
	        setTimeout(function () {
	            var getdata = this.props ? this.props.getdata : false;
	            if (getdata) {
	                var data = this.props.getdata;
	                //console.log(data);
	                var today = _fun.Funs.dateFormatFull(new Date().getTime() / 1000, '-');
	                _Actions.Actions.changeDate(today, data);
	            }
	        }, 1000);
	    },

	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        var _this2 = this;

	        var now = +new Date();
	        var end = 100;
	        var start = 0;
	        if (this.startTime && nextProps.shield) {
	            if (now < this.startTime + 60000) {
	                return;
	            }
	        }

	        //console.log('start',now,this.startTime,nextProps.shield);
	        if (nextProps.timelist instanceof Array && nextProps.timelist.length > 0) {
	            var i;

	            (function () {
	                var timelist = nextProps.timelist,
	                    templist = nextProps.templist,
	                    thermometerAlert = Number(nextProps.thermometerAlert) || 37.5,
	                    chartDom = ReactDOM.findDOMNode(_this2.refs.chart); // dom节点
	                //console.log(nextProps,templist);

	                for (i = 0; i < templist.length; i++) {
	                    if (templist[i] > 42) {
	                        templist[i] = '42';
	                    }
	                }
	                var hourArr = nextProps.timeArray[0].split(':');
	                var dataHour = Number(hourArr[0]);
	                if (typeof nextProps.tabIndex !== 'undefined') {
	                    switch (nextProps.tabIndex.toString()) {//1小时 6小时 24小时切换
	                        case "0":
	                            start = dataHour / 24 * 100;
	                            end = (dataHour + 1) / 24 * 100;
	                            break;
	                        case "1":
	                            start = 0;
	                            end = 6 / 24 * 100;
	                            break;
	                        case "2":
	                            start = 0;
	                            end = 100;
	                            break;
	                    }
	                }

	                //setOption设置时间
	                setTimeout(function () {
	                    var _this3 = this;

	                    // 基于准备好的dom，初始化echarts实例
	                    var myChart = echarts.init(chartDom);
	                    var lineoption = {
	                        grid: {
	                            top: 22,
	                            left: 40,
	                            bottom: 48,
	                            right: 30,
	                            height: 150

	                        },
	                        xAxis: {
	                            type: 'category',
	                            boundaryGap: true,
	                            splitLine: {
	                                show: false
	                            },
	                            axisLine: {
	                                lineStyle: {
	                                    color: '#e1e2ea'
	                                }
	                            },
	                            axisTick: {
	                                show: false
	                            },
	                            axisLabel: {
	                                textStyle: {
	                                    color: '#969696',
	                                    fontSize: '1.0rem'
	                                }
	                            },
	                            data: timelist
	                        },
	                        yAxis: {
	                            type: 'value',
	                            name: "℃/分",
	                            nameLocation: "end",
	                            nameGap: 8,
	                            nameTextStyle: {
	                                color: '#9d9d9d'
	                            },
	                            min: 34,
	                            max: 42,
	                            axisLabel: {
	                                formatter: function formatter(value, index) {
	                                    return value;
	                                },
	                                textStyle: {
	                                    color: '#969696',
	                                    fontSize: '1.0rem'
	                                }
	                            },
	                            splitLine: {
	                                show: true,
	                                lineStyle: {
	                                    color: "#696f96",
	                                    opacity: 0.35
	                                }
	                            },
	                            axisLine: {
	                                show: false
	                            },
	                            axisTick: {
	                                show: false
	                            }

	                        },
	                        visualMap: {
	                            top: 10,
	                            right: 10,
	                            show: false,
	                            pieces: [{
	                                gt: 0,
	                                lte: thermometerAlert,
	                                color: '#3cc6d1'
	                            }, {
	                                gt: thermometerAlert,
	                                lte: 42,
	                                color: '#eb6e4a'
	                            }],
	                            outOfRange: {
	                                color: '#999'
	                            }
	                        },
	                        dataZoom: [{ type: 'inside', start: start, end: end, zoomLock: true }],
	                        series: [{
	                            type: 'line',
	                            label: {
	                                normal: {
	                                    show: true,
	                                    position: 'top',
	                                    textStyle: {
	                                        color: '#eb6e4a'
	                                    }
	                                }
	                            },
	                            markLine: {
	                                data: [{
	                                    name: 'Y 轴值为 100 的水平线',
	                                    yAxis: thermometerAlert
	                                }],
	                                symbolSize: 0,
	                                lineStyle: {
	                                    normal: { type: 'solid', color: '#eb6e4a' }

	                                }
	                            },
	                            symbol: 'circle',
	                            symbolSize: 6,
	                            itemStyle: {
	                                normal: {
	                                    color: '#eb6e4a'
	                                }
	                            },
	                            lineStyle: {
	                                normal: {
	                                    color: '#3cc6d1',
	                                    width: 3
	                                }
	                            },
	                            data: templist
	                        }]
	                    };
	                    myChart.setOption(lineoption);

	                    var startX = 0,
	                        startY = 0;
	                    this.canvasdom = document.querySelector('#chart').querySelector('canvas') || document.querySelector('#chart');
	                    this.canvasdom.addEventListener('touchstart', function (e) {
	                        startX = Number(e.touches[0].pageX); //页面触点X坐标
	                        startY = Number(e.touches[0].pageY); //页面触点Y坐标
	                        _this3.initY = e.touches[0].clientY;
	                        _this3.oriPos = document.body.scrollTop;
	                        _this3.inittime = +new Date();
	                    });
	                    this.canvasdom.addEventListener('touchmove', function (e) {
	                        var touch = e.touches[0],
	                            moveY = touch.clientY - _this3.initY,
	                            totalY = Math.abs(Number(touch.pageY) - startY),
	                            //
	                        totalX = Math.abs(Number(touch.pageX) - startX); //
	                        var now = +new Date();
	                        //判断滑动方向
	                        if (totalY > totalX && now < _this3.inittime + 100) {
	                            e.stopPropagation();
	                            document.body.scrollTop = _this3.oriPos - moveY;
	                        }
	                    });
	                }, 180);

	                // console.log('ps',myChart);
	                // 绘制图表
	                _this2.startTime = +new Date();
	            })();
	        }
	    }

	});

/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	var _TempHint = __webpack_require__(11);

	var _Echarts = __webpack_require__(8);

	var _DeviceConnect = __webpack_require__(12);

	var _Temperaturemodel = __webpack_require__(13);

	var _MeasureDetails = __webpack_require__(15);

	var _NurseDetaiks = __webpack_require__(17);

	var _Measure = __webpack_require__(18);

	var _Head = __webpack_require__(14);

	var _Guide = __webpack_require__(19);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        webDataMap: {
	            'nickname': 'nickname', //昵称
	            'temp': 'temp', // 温度
	            'img': 'img', //头像
	            'dataTime': 'dataTime' //时间
	        },
	        renderConfigData: true
	    });
	});

	//SDK准备就绪 回调函数
	het.ready(function (data) {
	    // console.log('0000',data);
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

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            timeArr: ["00:00"],
	            tempArr: ["34"],
	            appId: '',
	            deviceId: '',
	            userType: '',
	            memberId: '',
	            headerTop: isAndroid ? 50 : 64 };
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            _Actions.Actions.getOldData();
	            het.toast('tempMode');
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var isConnect = _fun.Funs.getUrlParam('isConnect');
	            // let isBleConnect = Funs.getUrlParam('isBleConnect');
	            // if(isBleConnect === 0 || isBleConnect==="0"){
	            //     this.setState({
	            //         isBleConnect:0 
	            //     });
	            // }
	            var _this = this;
	            setTimeout(function () {
	                var data = {
	                    "appId": _this.state.appId,
	                    "deviceId": _this.state.deviceId,
	                    "userType": _this.state.userType,
	                    "memberId": _this.state.memberId
	                },
	                    today = _fun.Funs.dateFormatFull(new Date().getTime() / 1000, '-');
	                _Actions.Actions.changeDate(today, data, isConnect);
	            }, 1000);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            if (this.state.dataTime) {
	                var dataTime = _fun.Funs.dateFormat(Number(this.state.dataTime), 'hh:mm', false),
	                    timeArr = this.state.timeArr,
	                    tempArr = this.state.tempArr,
	                    lastTime = timeArr[timeArr.length - 1];

	                //console.log(timeArr,lastTime);
	                if (lastTime != dataTime) {
	                    var temp = this.state.temp;
	                    if (temp < 34) {
	                        temp = '34';
	                    } else if (temp > 42) {
	                        temp = '42';
	                    }
	                    timeArr.push(dataTime);
	                    tempArr.push(temp);
	                }

	                if (timeArr.length >= 8 || timeArr[0] === '00:00' && tempArr[0] === '34') {
	                    timeArr.shift();
	                    tempArr.shift();
	                }
	                //console.log(timeArr,tempArr);
	            }
	            var maxtemp = this.state.maxtemp || 0;
	            if (nextState.temp > maxtemp) {
	                var maxtime = _fun.Funs.dateFormat(Number(nextState.dataTime), 'hh:mm:ss', false);
	                this.setState({
	                    maxtemp: nextState.temp,
	                    maxtime: maxtime
	                });
	            }
	            if (!this.state.haveHistory && nextState.haveHistory === false) {
	                het.toast('noHistory');
	                ReactDOM.findDOMNode(this.refs["toGuide"]).click();
	            }
	        }
	    }, {
	        key: 'measure',
	        value: function measure() {
	            this.setState({
	                isBleConnect: 0
	            });
	            het.toast('measure');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var conMeasure = void 0,
	                conHistory = void 0;
	            if (!this.state.isBleConnect || this.state.isBleConnect == 2) {
	                conMeasure = React.createElement(
	                    'a',
	                    { onTouchStart: this.measure.bind(this), href: 'health://skip_url/deviceConnect.html', id: 'measure-btn', className: this.state.isBleConnect ? 'btn flex show' : 'btn flex hide' },
	                    '\u6D4B\u91CF'
	                );
	                conHistory = React.createElement(
	                    'a',
	                    { href: 'health://skip_url/history.html', id: 'hsty-btn', className: 'btn flex' },
	                    '\u5386\u53F2\u6570\u636E'
	                );
	            }
	            if (this.state.isBleConnect == 1) {
	                conMeasure = React.createElement(
	                    Link,
	                    _defineProperty({ className: 'flex', to: { pathname: '/temperature', query: { bedTimes: this.state.bedTimes, bedAvgTemp: this.state.bedAvgTemp, bedTemp: this.state.bedTemp, img: this.state.img, nickname: this.state.nickname } }, id: 'measure-btn' }, 'className', this.state.isBleConnect ? 'btn flex show' : 'btn flex hide'),
	                    '\u8E22\u88AB\u6A21\u5F0F'
	                );
	                conHistory = React.createElement(
	                    'a',
	                    { href: 'health://skip_url/history.html', id: 'hsty-btn', className: 'btn flex' },
	                    '\u5386\u53F2\u6570\u636E'
	                );
	            }
	            var data = {
	                "appId": this.state.appId,
	                "deviceId": this.state.deviceId,
	                "userType": this.state.userType,
	                "memberId": this.state.memberId
	            };
	            return React.createElement(
	                'div',
	                { className: 'temp' },
	                React.createElement(
	                    'section',
	                    { className: 'main' },
	                    React.createElement('header', { style: { 'paddingTop': this.state.headerTop } }),
	                    React.createElement(_Head.Head, { nickname: this.state.nickname, img: this.state.img, memberId: this.state.memberId }),
	                    React.createElement(_DeviceConnect.DeviceConnect, { dataTime: this.state.dataTime || +new Date(), temp: this.state.temp, isBleConnect: this.state.isBleConnect }),
	                    React.createElement(_TempHint.TempHint, { maxtemp: this.state.maxtemp || "--", maxtime: this.state.maxtime || "--" })
	                ),
	                React.createElement(_Echarts.Echarts, { shield: true, timelist: this.state.timeArr, thermometerAlert: this.state.thermometerAlert, templist: this.state.tempArr, getdata: data }),
	                conMeasure,
	                conHistory,
	                React.createElement(Link, { className: 'flex', to: '/guide', ref: 'toGuide', style: { opacity: 0, width: 0, height: 0, display: 'block' } })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('小珂体温贴');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/measure', component: _Measure.Measure }),
	        React.createElement(Route, { path: '/details/:Id', component: _MeasureDetails.MeasureDetails }),
	        React.createElement(Route, { path: '/temperature', component: _Temperaturemodel.Temperaturemodel }),
	        React.createElement(Route, { path: '/guide', component: _Guide.Guide })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 体温高低提示组件
	 * @prop {integer} temp  体温值
	 * @四个等级>35，36~37.2，37.2~38 ， >39
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TempHint = undefined;

	var _Actions = __webpack_require__(6);

	var TempHint = exports.TempHint = React.createClass({
	    displayName: 'TempHint',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        var maxtemp = Number(Number(this.props.maxtemp).toFixed(2)) || '--';
	        return React.createElement(
	            'p',
	            { className: 'tempOneTime flex' },
	            '\u4E00\u5C0F\u65F6\u5185\u6700\u9AD8\u4F53\u6E29',
	            React.createElement(
	                'em',
	                null,
	                maxtemp,
	                React.createElement(
	                    'b',
	                    null,
	                    '\xB0C'
	                )
	            ),
	            React.createElement(
	                'span',
	                { className: 'temp-time' },
	                React.createElement('i', null),
	                this.props.maxtime
	            )
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 设备连接
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DeviceConnect = undefined;

	var _Actions = __webpack_require__(6);

	var _fun = __webpack_require__(2);

	var DeviceConnect = exports.DeviceConnect = React.createClass({
	    displayName: 'DeviceConnect',

	    getInitialState: function getInitialState() {
	        return { temData: 122 };
	    },
	    componentDidMount: function componentDidMount() {
	        this.setState({
	            temData: ReactDOM.findDOMNode(this.refs["temData"]).offsetWidth / 2
	        });
	    },
	    render: function render() {
	        var temp = Number(Number(this.props.temp).toFixed(2)) || 0;
	        var viewImg = void 0,
	            temphint = void 0;
	        if (temp >= 34 && temp <= 35) viewImg = (temp - 34) * 30;
	        if (temp >= 35 && temp <= 36) viewImg = (temp - 35) * 34 + 30;
	        if (temp >= 36 && temp <= 37) viewImg = (temp - 36) * 28 + 64;
	        if (temp >= 37 && temp <= 38) viewImg = (temp - 37) * 41 + 92;
	        if (temp >= 38 && temp <= 39) viewImg = (temp - 38) * 45 + 133;
	        if (temp >= 39 && temp <= 40) viewImg = (temp - 39) * 28 + 178;
	        if (temp >= 40 && temp <= 41) viewImg = (temp - 40) * 36 + 206;
	        if (temp > 41) viewImg = (temp - 41) * 28 + 242;
	        if (temp < 34) temphint = "亲，请检查体温贴是否佩戴在腋下！";
	        if (temp >= 34 && temp <= 36) temphint = '亲，你的体温偏低，请及时就医！';
	        if (temp > 36 && temp < 37.5) temphint = '亲，你的体温正常！';
	        if (temp >= 37.5) temphint = '亲，你已经发热，请及时降温哦！';
	        viewImg = viewImg ? 135 - viewImg : 135;
	        viewImg = viewImg > 135 ? 135 : viewImg;
	        viewImg = viewImg < -135 ? -135 : viewImg;
	        var PI = Math.PI;
	        // console.log(this.state.temData);
	        var leftRig = this.state.temData - (this.state.temData - 10) * Math.sin(viewImg * 2 * PI / 360);
	        var topRig = this.state.temData - (this.state.temData - 10) * Math.cos(viewImg * 2 * PI / 360);
	        var imgPs = void 0;
	        console.log('viewImg', viewImg);
	        if (viewImg >= -135 && viewImg <= 22.5) imgPs = "img3";
	        if (viewImg > 22.5 && viewImg <= 68.2) imgPs = "img1";
	        if (viewImg > 68.2 && viewImg < 135) imgPs = "img2";
	        if (!imgPs) imgPs = "img2";
	        var dataDay = _fun.Funs.dateFormat(Number(this.props.dataTime), 'yyyy-MM-dd', false);
	        var datatext = _fun.Funs.dateFormat(Number(this.props.dataTime), 'hh:mm:ss', false);
	        // 设备连接判断
	        var pp = void 0,
	            lpp = void 0,
	            connectStatus = void 0,
	            ps = void 0,
	            conMeasure = void 0,
	            conHistory = void 0;
	        if (this.props.isBleConnect == 0) {
	            pp = React.createElement(
	                'p',
	                { className: 'prompt mrg-top' },
	                '\u6B63\u5728\u8FDE\u63A5\u8BBE\u5907'
	            );
	            lpp = React.createElement(
	                'p',
	                { className: 'prompt' },
	                '\u8BF7\u8010\u5FC3\u7B49\u5019'
	            );
	            ps = React.createElement(
	                'p',
	                { className: 'dataDay dev-magtop' },
	                dataDay
	            );
	            connectStatus = null;
	        } else if (this.props.isBleConnect == 2) {
	            pp = React.createElement(
	                'p',
	                { className: 'con-text mrg-top' },
	                '\u8FDE\u63A5\u5931\u8D25\uFF01'
	            );
	            lpp = React.createElement(
	                'p',
	                { className: 'prompt con-point' },
	                '\u8BF7\u68C0\u67E5\u8BBE\u5907\u662F\u5426\u5F00\u542F\uFF0C\u84DD\u7259\u662F\u5426\u6253\u5F00'
	            );
	            connectStatus = React.createElement(
	                'ol',
	                { className: 'test-list' },
	                React.createElement(
	                    'li',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u4ECA\u65E5\u6D4B\u91CF\u6700\u9AD8\u4F53\u6E29'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '--'
	                        ),
	                        React.createElement(
	                            'b',
	                            null,
	                            '\xB0C'
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'li',
	                    { className: 'list-border' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u4ECA\u65E5\u6D4B\u91CF\u6700\u9AD8\u4F53\u6E29'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                            'span',
	                            null,
	                            '--'
	                        ),
	                        React.createElement(
	                            'b',
	                            null,
	                            '\xB0C'
	                        )
	                    )
	                )
	            );
	        } else {
	            pp = React.createElement(
	                'p',
	                { className: 'num' },
	                temp || '--',
	                React.createElement(
	                    'b',
	                    null,
	                    '\xB0C'
	                )
	            );
	            lpp = React.createElement(
	                'p',
	                { className: 'datatext' },
	                React.createElement(
	                    'span',
	                    null,
	                    datatext
	                )
	            );
	            connectStatus = React.createElement(
	                'p',
	                { className: temp > 37.5 ? 'tip cor-red' : 'tip' },
	                temphint
	            );
	            ps = React.createElement(
	                'p',
	                { className: 'dataDay' },
	                dataDay
	            );
	        }
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'content' },
	                React.createElement(
	                    'div',
	                    { className: 'temData text-temData', ref: 'temData' },
	                    React.createElement('div', { className: "vImg " + imgPs, style: { top: topRig + 'px', left: leftRig + 'px' } }),
	                    pp,
	                    lpp,
	                    ps,
	                    React.createElement(
	                        'em',
	                        { className: 'temper34' },
	                        '34\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper35' },
	                        '35\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper36' },
	                        '36\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper37' },
	                        '37\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper38' },
	                        '38\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper39' },
	                        '39\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper40' },
	                        '40\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper41' },
	                        '41\u2103'
	                    ),
	                    React.createElement(
	                        'em',
	                        { className: 'temper42' },
	                        '42\u2103'
	                    )
	                ),
	                connectStatus
	            )
	        );
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 设备连接失败
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Temperaturemodel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(6);

	var _BaseComponentClass = __webpack_require__(4);

	var _Store = __webpack_require__(7);

	var _TempHint = __webpack_require__(11);

	var _Head = __webpack_require__(14);

	var _Echarts = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var Temperaturemodel = exports.Temperaturemodel = function (_BaseComponent) {
	    _inherits(Temperaturemodel, _BaseComponent);

	    function Temperaturemodel(props) {
	        _classCallCheck(this, Temperaturemodel);

	        var _this = _possibleConstructorReturn(this, (Temperaturemodel.__proto__ || Object.getPrototypeOf(Temperaturemodel)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 50 : 64 };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(Temperaturemodel, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            document.body.style.height = window.screen.availHeight + 'px';

	            _Actions.Actions.getOldData();
	            het.toast('kickQuilt');
	            document.getElementById("ROOT").style.height = '100%';
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //if()
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var temp = this.state.bedTemp;
	            var overturnAlert = this.state.overturnAlert || 27;
	            var temptip = void 0,
	                tempComfor = void 0;
	            if (temp < 27) {
	                temptip = "被温偏凉";
	                tempComfor = false;
	            } else if (temp > 35) {
	                temptip = "被温偏高";
	                tempComfor = false;
	            } else {
	                temptip = "被温舒适";
	                tempComfor = true;
	            }
	            var dataDay = void 0;
	            var date = new Date();
	            var year = date.getFullYear() < 10 ? '0' + date.getFullYear() : date.getFullYear();
	            var month = date.getMonth() + 1;
	            var day = date.getDate();
	            dataDay = year + "-" + month + "-" + day;
	            // 时分秒
	            var datatext = void 0;
	            var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	            var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	            var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	            datatext = hours + ":" + minutes + ":" + seconds;
	            return React.createElement(
	                'div',
	                { className: 'hig-main' },
	                React.createElement(
	                    'section',
	                    null,
	                    React.createElement('header', { style: { 'paddingTop': this.state.headerTop } }),
	                    React.createElement(
	                        'div',
	                        { className: 'content' },
	                        React.createElement(_Head.Head, { nickname: this.state.nickname, img: this.state.img, memberId: this.state.memberId }),
	                        React.createElement(
	                            'div',
	                            { className: tempComfor ? "temData com-temData" : "temData comup-temData", ref: 'temData' },
	                            React.createElement(
	                                'p',
	                                { className: tempComfor ? "tip com-green ok-model" : 'tip cor-red ok-model' },
	                                temptip
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'num' },
	                                Number(Number(this.state.bedTemp).toFixed(2)) || '--',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '\xB0C'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'datatext' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    datatext
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'dataDay' },
	                                dataDay
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'tip com-green' },
	                            ''
	                        ),
	                        React.createElement('img', { className: 'clife-log', src: '../static/img/c_sleep@2x.png' })
	                    ),
	                    React.createElement(
	                        'ol',
	                        { className: 'com-list' },
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5F53\u524D\u8E22\u88AB\u6B21\u6570'
	                            ),
	                            React.createElement(
	                                'h1',
	                                null,
	                                this.state.bedTimes || '--'
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            { className: 'list-border' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5F53\u524D\u88AB\u7A9D\u5E73\u5747\u6E29\u5EA6'
	                            ),
	                            React.createElement(
	                                'h1',
	                                null,
	                                Number(Number(this.state.bedAvgTemp).toFixed(2)) || '--',
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    '\xB0C'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { to: '/', className: 'flex temp-btn', id: 'hsty-btn' },
	                    '\u4F53\u6E29\u6A21\u5F0F'
	                )
	            );
	        }
	    }]);

	    return Temperaturemodel;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 头部连接
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Head = undefined;

	var _Actions = __webpack_require__(6);

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;
	var Head = exports.Head = React.createClass({
	    displayName: 'Head',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        // console.log('props',this.props);
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'a',
	                { href: 'health://switch_user', className: 'temp-head' },
	                React.createElement('img', { className: 'hdphoto', src: this.props.img && this.props.memberId == 0 ? this.props.img : '../static/img/ic-toadd.png', alt: '\u5934\u50CF' }),
	                React.createElement(
	                    'span',
	                    { className: 'fs16 nikename fl' },
	                    this.props.nickname == '' ? '添加家庭成员' : this.props.nickname
	                ),
	                React.createElement('i', null)
	            ),
	            React.createElement(
	                Link,
	                { to: '/measure', className: 'fr tempkown' },
	                React.createElement('img', { className: 'photo', src: '../static/img/icon_knowledge@2x.png', alt: '\u4FE1\u606F' }),
	                React.createElement(
	                    'span',
	                    { className: 'fs16 nikename fr' },
	                    '\u5B9D\u5B9D\u77E5\u9053\uFF1F'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 帮助中心
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MeasureDetails = undefined;

	var _Actions = __webpack_require__(6);

	var _MeasureNurse = __webpack_require__(16);

	var MeasureDetails = exports.MeasureDetails = React.createClass({
	    displayName: 'MeasureDetails',

	    getInitialState: function getInitialState() {
	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        return {
	            headerTop: isAndroid ? 50 : 64
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        het.toast('knowDetails');
	    },
	    items: [{ title: "宝宝低热怎么办？", step: ["1、不建议用药。多给宝宝喝开水，多休息。", "2、采用物理降温。洗温水澡、贴温湿敷、退热贴等", "3、不要给宝宝穿太多衣服或盖太厚的被子。", "4、采用“小珂体温仪”监测体温，密切注意病情变化。", "5、禁止用酒精给婴儿擦浴。"] }, { title: "宝宝中热怎么办？", step: ["1、宝宝体温在38.5℃以上，需要及时服用退烧。", "2、多给宝宝喝开水，采用物理降温，洗温水澡或贴退热贴等。", "3、不要给宝宝穿太多衣服或盖太厚的被子。", "4、采用“小珂体温仪”监测体温，密切注意病情变化。", "5、禁止用酒精给婴儿擦浴。", "6、如果宝宝体温在38.5℃以上，伴有精神不好，建议去医院"] }, { title: "宝宝高热、超高热怎么办？", step: ["1、必须马上去医院就医诊断。", "2、立即服用退烧药。", "3、不要给宝宝穿太多衣服或盖太厚的被子。", "4、采用“小珂体温仪”监测体温，密切注意病情变化。", "5、禁止用酒精给婴儿擦浴。"] }, { title: "宝宝体温特点有哪些？", step: ["由于宝宝的新陈代谢比成人旺盛，每个人的体温一天之内有波动，早晨相对低一些，下午略高，但是不能相差1℃。", "体温也随着孩子的活动过度、穿衣过多、环境温度过高，以及吃饭哭闹造成体温暂时升高。但是宝宝年龄越小，中枢神经系统体温调节的功能越差，皮肤汗腺发育不健全，所以孩子的体温很容易波动。"] }, { title: "宝宝发热护理要点有哪些？", step: ["1、充分休息：对于感冒，良好的休息是至关重要的，尽量让孩子多睡一会，适当减少户外活动。", "2、多喝白开水：由于患儿身体发热、呼吸增快、咳嗽多及气管中分泌物增多等原因，使体液丢失较多，因此需要多补充体液，最好的体液是白开水。", "3、多吃蔬菜水果：由于患儿身体发热、呼吸增快、咳嗽多及气管中分泌物增多等原因，使体液丢失较多，因此需要多补充体液，最好的体液是白开水。", "4、进食易消化的食物：患感冒的儿童，由于胃中消化酶的活力受到影响，一般会出现食欲不佳的现象，甚而伴有呕吐、腹泻和便秘等症状。所以，给患儿进食的食物要容易消化，不宜过咸或过甜，不进食油腻或刺激性食物。"] }],
	    render: function render() {
	        var index = this.props.params.Id || 0;
	        var items = this.items;
	        return React.createElement(
	            'div',
	            null,
	            React.createElement('header', { style: { 'paddingTop': this.state.headerTop } }),
	            React.createElement(
	                'div',
	                { className: 'low-grade' },
	                React.createElement(
	                    'h1',
	                    null,
	                    items[index].title
	                ),
	                React.createElement(
	                    'ul',
	                    null,
	                    React.createElement(
	                        'li',
	                        null,
	                        items[index].step.map(function (item, i) {
	                            return React.createElement(
	                                'p',
	                                { key: i },
	                                React.createElement(
	                                    'span',
	                                    { style: { opacity: 0, display: index == 3 ? "inline" : 'none' } },
	                                    'ada'
	                                ),
	                                item
	                            );
	                        })
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 退热治疗
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MeasureNurse = undefined;

	var _Actions = __webpack_require__(6);

	var MeasureNurse = exports.MeasureNurse = React.createClass({
	    displayName: 'MeasureNurse',

	    getInitialState: function getInitialState() {
	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        return {
	            headerTop: isAndroid ? 50 : 64
	        };
	    },
	    changeActive: function changeActive(e) {
	        var value = e.currentTarget.getAttribute('data-index');
	        if (typeof this.props.callback === 'function') {
	            this.props.callback(value);
	        }
	    },
	    render: function render() {
	        var index = this.props.active || 0;
	        return React.createElement(
	            'div',
	            null,
	            React.createElement('header', { style: { 'paddingTop': this.state.headerTop } }),
	            React.createElement(
	                'ul',
	                { className: 'MeaTab' },
	                React.createElement(
	                    'li',
	                    { 'data-index': 0, onTouchEnd: this.changeActive },
	                    React.createElement(
	                        'span',
	                        { className: index == 0 ? "span-bk" : '' },
	                        '\u6D4B\u91CF\u53CA\u62A4\u7406'
	                    )
	                ),
	                React.createElement(
	                    'li',
	                    { 'data-index': 1, onTouchEnd: this.changeActive },
	                    React.createElement(
	                        'span',
	                        { className: index == 1 ? "span-bk" : '' },
	                        '\u9000\u70ED\u6CBB\u7597'
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 退热治疗
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NurseDetaiks = undefined;

	var _Actions = __webpack_require__(6);

	var _MeasureNurse = __webpack_require__(16);

	var NurseDetaiks = exports.NurseDetaiks = React.createClass({
	    displayName: 'NurseDetaiks',

	    getInitialState: function getInitialState() {
	        return {};
	    },

	    render: function render() {
	        var index = this.props.index || 0;
	        var items = this.items;
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(_MeasureNurse.MeasureNurse, { timelist: this.state.timeArray, templist: this.state.tempArray }),
	            React.createElement(
	                'div',
	                { className: 'nersebox' },
	                React.createElement(
	                    'h1',
	                    null,
	                    '\u5B9D\u5B9D\u9000\u70ED\u836F\u63A8\u8350'
	                ),
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
	                                'th',
	                                null,
	                                '\u836F\u54C1\u540D\u79F0'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '\u7528\u91CF'
	                            ),
	                            React.createElement(
	                                'th',
	                                null,
	                                '\u836F\u7269\u4F5C\u7528'
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u6251\u70ED\u606F\u75DB'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u95F4\u96946\u5C0F\u65F6\u670D\u7528\u4E00\u6B21\uFF0C\u4E00\u822C\u4F7F\u7528\u4E0D\u8D85\u8FC73\u5929'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u5927\u5242\u91CF\u7684\u4F7F\u7528\u4F1A\u5F15\u8D77\u809D\u810F\u635F\u4F24'
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u5E03\u6D1B\u82AC\uFF08\u82AC\u5FC5\u5F97\u3001\u5F02\u4E01\u82EF\u4E19\u9178\uFF09'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '5-10\u6BEB\u514B/\u516C\u65A4\u4F53\u91CD/\u6B21\uFF0C\u6BCF6-8\u5C0F\u65F61\u6B21'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u9000\u70ED\u5FEB\uFF0C\u80A0\u9053\u523A\u6FC0\u5C0F'
	                            )
	                        ),
	                        React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u5C0F\u513F\u9000\u70ED\u6813'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u4E3B\u8981\u7528\u6765\u585E\u809B\u95E8'
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                '\u80A0\u9053\u5438\u6536\uFF0C\u9000\u70E7\u5FEB\u3002\u5927\u5242\u91CF\u4F7F\u7528\u6613\u9020\u6210\u5B9D\u5B9D\u4F53\u6E29\u9AA4\u964D\u6216\u8005\u8179\u6CFB'
	                            )
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'h1',
	                { className: 'nurborder' },
	                '\u7269\u7406\u964D\u6E29\u65B9\u6CD5\u63A8\u8350'
	            ),
	            React.createElement(
	                'ul',
	                { className: 'nur-list' },
	                React.createElement(
	                    'li',
	                    null,
	                    React.createElement(
	                        'p',
	                        null,
	                        '1\u3001\u6D17\u6E29\u6C34\u6FA1\uFF0C\u6D17\u540E\u53CA\u65F6\u88F9\u4E0A\u6D74\u5DFE\uFF0C\u64E6\u5E72\u8EAB\u4F53\u7A7F\u4E0A\u8863\u670D\u3002'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '2\u3001\u53EF\u4EE5\u4F7F\u7528\u51B7\u6E7F\u6BDB\u5DFE\u64E6\u6D74\u5168\u8EAB\uFF0C\u5C24\u5176\u662F\u5927\u8840\u7BA1\u8D70\u884C\u7684\u4F4D\u7F6E\uFF0C\u5982\uFF1A\u814B\u4E0B\u3001\u8179\u80A1\u6C9F\u7B49\u90E8\u4F4D\uFF0C\u64E6\u81F3\u76AE\u80A4\u53D1\u7EA2\u4E3A\u6B62\u3002'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '3\u3001\u53EF\u4EE5\u5934\u6795\u51B0\u888B\u3001\u51B7\u6C34\u888B\uFF0C\u7528\u51B7\u6C34\u888B\u6216\u51B0\u888B\u653E\u7F6E\u5728\u814B\u4E0B\u3001\u9888\u90E8\u4E24\u4FA7\u3001\u8179\u80A1\u6C9F\u4EE5\u53CA\u989D\u5934\uFF0C\u6700\u597D\u4F7F\u7528\u51B7\u6C34\u888B\u3002'
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 测量及护理
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Measure = undefined;

	var _Actions = __webpack_require__(6);

	var _MeasureNurse = __webpack_require__(16);

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;
	var Measure = exports.Measure = React.createClass({
	    displayName: 'Measure',

	    getInitialState: function getInitialState() {
	        return { index: 0 };
	    },
	    componentWillMount: function componentWillMount() {
	        het.toast('babyKnow');
	    },
	    callback: function callback(value) {
	        if (value == this.state.index) return;
	        this.setState({
	            index: value
	        });
	    },
	    render: function render() {
	        var index = this.state.index || 0;
	        var items = this.items;
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(_MeasureNurse.MeasureNurse, { active: index, callback: this.callback }),
	            index == 0 ? React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'nersebox' },
	                    React.createElement(
	                        'h1',
	                        null,
	                        '\u5B9D\u5B9D\u53D1\u70ED\u7A0B\u5EA6\u5982\u4F55\u5B9A\u4E49'
	                    ),
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
	                                    'th',
	                                    null,
	                                    '\u5B9D\u5B9D\u814B\u4E0B\u6E29\u5EA6'
	                                ),
	                                React.createElement(
	                                    'th',
	                                    null,
	                                    '\u53D1\u70ED\u7A0B\u5EA6'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '34-36\u2103'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u4F53\u6E29\u504F\u4F4E'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '37.5~38\xB0C'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u4F4E\u70ED'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '38.1~39\xB0C'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u4E2D\u5EA6\u70ED'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '39.1~40.4\xB0C'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u9AD8\u70ED'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '>40.5\xB0C'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u8D85\u9AD8\u70ED'
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'h1',
	                        null,
	                        '\u5B9D\u5B9D\u7761\u7720\u8212\u9002\u6E29\u5EA6'
	                    ),
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
	                                    'th',
	                                    null,
	                                    '\u6E29\u5EA6'
	                                ),
	                                React.createElement(
	                                    'th',
	                                    null,
	                                    '\u88AB\u7A9D\u8212\u9002\u5EA6'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '<27\xB0C'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u504F\u51C9'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '27.1~35\xB0C'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u8212\u9002'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '>35\xB0C'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u504F\u70ED'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'nur-list new-list' },
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            Link,
	                            { className: 'flex', to: '/details/0' },
	                            '\u5B9D\u5B9D\u4F4E\u70ED\u600E\u4E48\u529E',
	                            React.createElement('i', null)
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            Link,
	                            { className: 'flex', to: '/details/1' },
	                            '\u5B9D\u5B9D\u4E2D\u70ED\u600E\u4E48\u529E',
	                            React.createElement('i', null)
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            Link,
	                            { className: 'flex', to: '/details/2' },
	                            '\u5B9D\u5B9D\u9AD8\u70ED\u3001\u8D85\u9AD8\u70ED\u600E\u4E48\u529E',
	                            React.createElement('i', null)
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            Link,
	                            { className: 'flex', to: '/details/3' },
	                            '\u5B9D\u5B9D\u4F53\u6E29\u7279\u70B9\u6709\u54EA\u4E9B',
	                            React.createElement('i', null)
	                        )
	                    ),
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            Link,
	                            { className: 'flex', to: '/details/4' },
	                            '\u5B9D\u5B9D\u53D1\u70ED\u62A4\u7406\u8981\u70B9\u6709\u54EA\u4E9B',
	                            React.createElement('i', null)
	                        )
	                    )
	                )
	            ) : React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'nersebox' },
	                    React.createElement(
	                        'h1',
	                        null,
	                        '\u5B9D\u5B9D\u9000\u70ED\u836F\u63A8\u8350'
	                    ),
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
	                                    'th',
	                                    null,
	                                    '\u836F\u54C1\u540D\u79F0'
	                                ),
	                                React.createElement(
	                                    'th',
	                                    null,
	                                    '\u7528\u91CF'
	                                ),
	                                React.createElement(
	                                    'th',
	                                    null,
	                                    '\u836F\u7269\u4F5C\u7528'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u6251\u70ED\u606F\u75DB'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u95F4\u96946\u5C0F\u65F6\u670D\u7528\u4E00\u6B21\uFF0C\u4E00\u822C\u4F7F\u7528\u4E0D\u8D85\u8FC73\u5929'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u5927\u5242\u91CF\u7684\u4F7F\u7528\u4F1A\u5F15\u8D77\u809D\u810F\u635F\u4F24'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u5E03\u6D1B\u82AC\uFF08\u82AC\u5FC5\u5F97\u3001\u5F02\u4E01\u82EF\u4E19\u9178\uFF09'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '5-10\u6BEB\u514B/\u516C\u65A4\u4F53\u91CD/\u6B21\uFF0C\u6BCF6-8\u5C0F\u65F61\u6B21'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u9000\u70ED\u5FEB\uFF0C\u80A0\u9053\u523A\u6FC0\u5C0F'
	                                )
	                            ),
	                            React.createElement(
	                                'tr',
	                                null,
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u5C0F\u513F\u9000\u70ED\u6813'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u4E3B\u8981\u7528\u6765\u585E\u809B\u95E8'
	                                ),
	                                React.createElement(
	                                    'td',
	                                    null,
	                                    '\u80A0\u9053\u5438\u6536\uFF0C\u9000\u70E7\u5FEB\u3002\u5927\u5242\u91CF\u4F7F\u7528\u6613\u9020\u6210\u5B9D\u5B9D\u4F53\u6E29\u9AA4\u964D\u6216\u8005\u8179\u6CFB'
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'h1',
	                    { className: 'nurborder' },
	                    '\u7269\u7406\u964D\u6E29\u65B9\u6CD5\u63A8\u8350'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'nur-list' },
	                    React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'p',
	                            null,
	                            '1\u3001\u6D17\u6E29\u6C34\u6FA1\uFF0C\u6D17\u540E\u53CA\u65F6\u88F9\u4E0A\u6D74\u5DFE\uFF0C\u64E6\u5E72\u8EAB\u4F53\u7A7F\u4E0A\u8863\u670D\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '2\u3001\u53EF\u4EE5\u4F7F\u7528\u51B7\u6E7F\u6BDB\u5DFE\u64E6\u6D74\u5168\u8EAB\uFF0C\u5C24\u5176\u662F\u5927\u8840\u7BA1\u8D70\u884C\u7684\u4F4D\u7F6E\uFF0C\u5982\uFF1A\u814B\u4E0B\u3001\u8179\u80A1\u6C9F\u7B49\u90E8\u4F4D\uFF0C\u64E6\u81F3\u76AE\u80A4\u53D1\u7EA2\u4E3A\u6B62\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '3\u3001\u53EF\u4EE5\u5934\u6795\u51B0\u888B\u3001\u51B7\u6C34\u888B\uFF0C\u7528\u51B7\u6C34\u888B\u6216\u51B0\u888B\u653E\u7F6E\u5728\u814B\u4E0B\u3001\u9888\u90E8\u4E24\u4FA7\u3001\u8179\u80A1\u6C9F\u4EE5\u53CA\u989D\u5934\uFF0C\u6700\u597D\u4F7F\u7528\u51B7\u6C34\u888B\u3002'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Guide = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fun = __webpack_require__(2);

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(6);

	var _Store = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	// 创建React组件

	var Guide = exports.Guide = function (_BaseComponent) {
	    _inherits(Guide, _BaseComponent);

	    function Guide(props) {
	        _classCallCheck(this, Guide);

	        var _this = _possibleConstructorReturn(this, (Guide.__proto__ || Object.getPrototypeOf(Guide)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = { timeArray: ["00:00"],
	            tempArray: ['37'],
	            changeDate: '',
	            appId: '',
	            deviceId: '',
	            userType: '',
	            memberId: '',
	            index: 2,
	            headerTop: isAndroid ? 50 : 64 };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(Guide, [{
	        key: 'measure',
	        value: function measure() {
	            het.toast('measure');
	            ReactDOM.findDOMNode(this.refs["toApp"]).click();
	        }
	    }, {
	        key: 'moveStart',
	        value: function moveStart(e) {
	            //开始拖动,记录初始坐标
	            e.preventDefault();
	            e.stopPropagation();
	            this.initX = e.touches[0].clientX;
	            this.clientX = e.touches[0].clientX;
	            this.initTime = +new Date();
	        }
	    }, {
	        key: 'moveIng',
	        value: function moveIng(e) {
	            //拖动中,根据拖动的偏移量计算拖动后的位置,忽略偏移太大的拖动
	            e.preventDefault();
	            e.stopPropagation();
	            this.clientX = e.touches[0].clientX;
	        }
	    }, {
	        key: 'moveEnd',
	        value: function moveEnd(e) {
	            //结束拖动,如果需要返回值,则返回拖动的值
	            e.preventDefault();
	            e.stopPropagation();
	            var time = +new Date();
	            var index = this.state.activeIndex || 0;
	            if (time - this.initTime < 100) return;
	            if (this.clientX - this.initX > 0) {
	                index -= 1;
	            } else {
	                index += 1;
	            }
	            if (index < 0) index = 0;
	            if (index > 2) index = 2;
	            this.setState({
	                activeIndex: index
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var index = this.state.activeIndex || 0;
	            return React.createElement(
	                'div',
	                { className: 'guide' },
	                React.createElement(
	                    'section',
	                    { className: 'main' },
	                    React.createElement(
	                        'ul',
	                        { className: 'flex', onTouchStart: this.moveStart.bind(this), onTouchMove: this.moveIng.bind(this), onTouchEnd: this.moveEnd.bind(this) },
	                        React.createElement(
	                            'li',
	                            { style: { display: index == 0 ? "block" : 'none' } },
	                            React.createElement('img', { src: '../static/img/guide1.png' })
	                        ),
	                        React.createElement(
	                            'li',
	                            { style: { display: index == 1 ? "block" : 'none' } },
	                            React.createElement('img', { src: '../static/img/guide2.png' })
	                        ),
	                        React.createElement(
	                            'li',
	                            { style: { display: index == 2 ? "block" : 'none' } },
	                            React.createElement('img', { src: '../static/img/guide3.png' }),
	                            React.createElement(
	                                'span',
	                                { onTouchStart: this.measure.bind(this), id: 'device-btn', className: 'btn flex show' },
	                                '\u8FDE\u63A5\u8BBE\u5907'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'radius' },
	                        React.createElement('span', { style: { background: index == 0 ? "#3cc6d1" : '#a0a0a0' } }),
	                        React.createElement('span', { style: { background: index == 1 ? "#3cc6d1" : '#a0a0a0' } }),
	                        React.createElement('span', { style: { background: index == 2 ? "#3cc6d1" : '#a0a0a0' } })
	                    )
	                ),
	                React.createElement(Link, { className: 'flex', to: '/', ref: 'toApp', style: { opacity: 0, width: 0, height: 0, display: 'block' } })
	            );
	        }
	    }]);

	    return Guide;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);