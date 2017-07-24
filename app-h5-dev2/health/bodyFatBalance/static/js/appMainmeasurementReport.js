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

	module.exports = __webpack_require__(17);


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
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染'
	'ready', 'readyData', 'getData', 'postHisData', 'readyHisData', 'getHisData', 'getNoData', 'sendDate', 'postDate', 'getCalendarData', // 获取日历数据
	//App
	'getAppHisData', 'selectedDate' // 选择日期
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

	var _BaseComponentClass = __webpack_require__(2);

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

	var options = {};
	var data = [];
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
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatDataList';
	        //options.accessToken = data.accessToken ? data.accessToken : options.accessToken
	        options.appId = data.appId ? data.appId : options.appId;
	        options.deviceId = data.deviceId ? data.deviceId : options.deviceId;
	        options.timestamp = data.timestamp ? data.timestamp : options.timestamp;
	        options.memberId = typeof data.memberId !== 'undefined' ? data.memberId : options.memberId;
	        options.userType = typeof data.userType !== 'undefined' ? data.userType : options.userType;
	        options.img = data.img;
	        options.nickname = data.nickname;
	        //data.timestamp = +new Date();
	        //options.timestamp = +new Date();
	        //console.log(data, options, 'from stores1');
	        //this.trigger(data);
	        het.get(url, data, function (data) {
	            //console.log(data, '1');
	            data = JSON.parse(data).data.list;
	            function groupData(data) {
	                var newData = {};
	                var arrData = [];
	                // 分组
	                for (var i in data) {
	                    //data[i].dataTime=Funs.dateFormat( data[i].dataTime, 'yyyy-MM-dd hh:mm:ss', true);
	                    var k = (data[i].dataTime || '').replace(/\s.+$/, '');

	                    if (!newData[k]) {
	                        newData[k] = [];
	                    }
	                    newData[k].push(data[i]);
	                }
	                // 排序
	                for (var j in newData) {
	                    newData[j].sort(function (a, b) {
	                        return a[j] < b[j + 1];
	                    });
	                    arrData.push(newData[j]);
	                }
	                return arrData;
	            };
	            data = groupData(data);
	            //console.log(data, '2');
	            _this.trigger({ 'data': data });
	            //console.log(data, 'suc from readyData1');
	        }, function (data) {
	            console.log('fail sendData', data);
	            het.toast('获取数据失败');
	        });
	    },
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	        console.log(data, 'from repaint');
	    },
	    onSendDate: function onSendDate(data) {
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        //options.accessToken = data.accessToken ? data.accessToken : options.accessToken;
	        options.appId = data.appId ? data.appId : options.appId;
	        options.deviceId = data.deviceId ? data.deviceId : options.deviceId;
	        options.timestamp = data.timestamp ? data.timestamp : options.timestamp;
	        options.memberId = typeof data.memberId !== 'undefined' ? data.memberId : options.memberId;
	        options.userType = typeof data.userType !== 'undefined' ? data.userType : options.userType;
	        options.img = data.img;
	        options.nickname = data.nickname;
	        //console.log(data,'from app ready');
	        //this.trigger(options);
	        het.get(url, data, function (data) {
	            data = JSON.parse(data);
	            //console.log(data,'parse')
	            function classifyFn(data) {
	                data = data.data;
	                var len = data.length,
	                    newArr = {},
	                    _weight = [],
	                    _fatRate = [],
	                    _bmiRate = [],
	                    _meatRate = [],
	                    _dataTime = [],
	                    _boneWeight = [],
	                    _metabolismRate = [],
	                    _moistureRate = [];
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
	                    _bmiRate.push(data[i].bmiRate);
	                    _meatRate.push(data[i].meatRate);
	                    _boneWeight.push(data[i].boneWeight);
	                    _metabolismRate.push(data[i].metabolismRate);
	                    _moistureRate.push(data[i].moistureRate);
	                }
	                return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate, _boneWeight: _boneWeight, _metabolismRate: _metabolismRate, _moistureRate: _moistureRate };
	            };
	            data = classifyFn(data);
	            _this.trigger({ "data": data });
	        }, function () {
	            console.log('fail sendData');
	            het.toast('获取数据失败');
	        });
	    },
	    onGetHisData: function onGetHisData(beginDate, endDate) {
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        options.beginDate = ymd(beginDate);
	        options.endDate = ymd(endDate);
	        console.log(options);
	        if (options.appId) {
	            het.get(url, options, function (data) {
	                data = JSON.parse(data);
	                function classifyFn(data) {
	                    data = data.data;
	                    var len = data.length,
	                        newArr = {},
	                        _weight = [],
	                        _fatRate = [],
	                        _bmiRate = [],
	                        _meatRate = [],
	                        _dataTime = [],
	                        _boneWeight = [],
	                        _metabolismRate = [],
	                        _moistureRate = [];
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
	                        _bmiRate.push(data[i].bmiRate);
	                        _meatRate.push(data[i].meatRate);
	                        _boneWeight.push(data[i].boneWeight);
	                        _metabolismRate.push(data[i].metabolismRate);
	                        _moistureRate.push(data[i].moistureRate);
	                    }
	                    return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate, _boneWeight: _boneWeight, _metabolismRate: _metabolismRate, _moistureRate: _moistureRate };
	                };
	                data = classifyFn(data);
	                _this.trigger({ "data": data });
	            }, function () {
	                console.log('fail sendData');
	                //het.toast('数据请求错误')
	            });
	        }
	    },
	    onPostDate: function onPostDate(data_id) {
	        var data = options,
	            url = '/v1/app/chealth/bodyfat/getBodyFatDataList',
	            _this = this;
	        var reload = options;
	        data.dataId = data_id;
	        het.post('/v1/app/chealth/bodyfat/deleteBodyFatDataById', data, function (data) {
	            //console.log(data, 'suc post');
	            //het.toast('post suc');
	            het.get(url, reload, function (data) {
	                data = JSON.parse(data).data.list;
	                function groupData(data) {
	                    var newData = {};
	                    var arrData = [];

	                    // 分组
	                    for (var i in data) {
	                        var k = (data[i].dataTime || '').replace(/\s.+$/, '');
	                        if (!newData[k]) {
	                            newData[k] = [];
	                        }
	                        newData[k].push(data[i]);
	                    }
	                    // 排序
	                    for (var j in newData) {
	                        newData[j].sort(function (a, b) {
	                            return a[j] < b[j + 1];
	                        });
	                        arrData.push(newData[j]);
	                    }
	                    return arrData;
	                };
	                data = groupData(data);
	                _this.trigger({ 'data': data });
	                console.log(data, 'suc from reload data');
	            }, function (data) {
	                console.log(data, 'err from readyData');
	                //het.toast('数据请求错误')
	            });
	        }, function (data) {
	            console.log(data, 'fail post');
	            het.toast('删除数据失败');
	        });
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
	    onReadyHisData: function onReadyHisData(data) {
	        this.trigger(data);
	    },
	    onGetNoData: function onGetNoData(data) {
	        this.trigger(data);
	    },
	    onGetAppHisData: function onGetAppHisData(beginDate, endDate) {
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        options.beginDate = ymd(beginDate);
	        options.endDate = ymd(endDate);
	        //console.log(options,'*************************');
	        if (options.appId) {
	            het.get(url, options, function (data) {
	                data = JSON.parse(data);
	                function classifyFn(data) {
	                    data = data.data;
	                    var len = data.length,
	                        newArr = {},
	                        _weight = [],
	                        _fatRate = [],
	                        _bmiRate = [],
	                        _meatRate = [],
	                        _dataTime = [],
	                        _boneWeight = [],
	                        _metabolismRate = [],
	                        _moistureRate = [];
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
	                        _bmiRate.push(data[i].bmiRate);
	                        _meatRate.push(data[i].meatRate);
	                        _boneWeight.push(data[i].boneWeight);
	                        _metabolismRate.push(data[i].metabolismRate);
	                        _moistureRate.push(data[i].moistureRate);
	                    }
	                    return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate, _boneWeight: _boneWeight, _metabolismRate: _metabolismRate, _moistureRate: _moistureRate };
	                };
	                data = classifyFn(data);
	                //console.log(data);
	                _this.trigger({ "data": data });
	            }, function (data) {
	                console.log('fail sendData', data);
	                het.toast('获取数据失败');
	            });
	        }
	    },
	    getCalendarData: function getCalendarData(beginDate, endDate) {
	        //let d1 = new Date();
	        //let d2 = new Date();
	        //d1.setMonth(d2.getMonth()-11);
	        options.beginDate = beginDate;
	        options.endDate = endDate;
	        console.log(options, '*************from 22');
	        var _this = this,
	            url = '/v1/app/chealth/bodyfat/getBodyFatMonthData';
	        het.get(url, options, function (data) {
	            data = JSON.parse(data);
	            function classifyFn(data) {
	                data = data.data;
	                var len = data.length,
	                    newArr = {},
	                    _weight = [],
	                    _fatRate = [],
	                    _bmiRate = [],
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
	                    _bmiRate.push(data[i].bmiRate);
	                    _meatRate.push(data[i].meatRate);
	                }
	                return newArr = { _dataTime: _dataTime, _weight: _weight, _fatRate: _fatRate, _bmiRate: _bmiRate, _meatRate: _meatRate };
	            };
	            data = classifyFn(data);
	            _this.trigger({ "data": data });
	        }, function () {
	            console.log('fail sendData');
	            //het.toast('数据请求错误')
	        });
	    }
	});

	//onDelete(id) {
	//    let newData = [];
	//    data.map((it)=> {
	//        if (it.dataId !== id) {
	//            newData.push(it);
	//        }
	//    });
	//    data = newData;
	//    this.trigger(newData)
	//},
	//appId	    是	Integer	应用标识
	//deviceId	是	string	设备id
	//timestamp	是	number	时间戳
	//memberId	是	string	用户编号（切换用户用）
	//userType	是	string	用户身份（1：医生 3：患者）

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(7);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 7 */
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _ContentBmi = __webpack_require__(18);

	var _ContentBmi2 = _interopRequireDefault(_ContentBmi);

	var _ContentFatRate = __webpack_require__(19);

	var _ContentFatRate2 = _interopRequireDefault(_ContentFatRate);

	var _ContentMusclePrc = __webpack_require__(20);

	var _ContentMusclePrc2 = _interopRequireDefault(_ContentMusclePrc);

	var _ContentWaterPrc = __webpack_require__(21);

	var _ContentWaterPrc2 = _interopRequireDefault(_ContentWaterPrc);

	var _ContentDateMetal = __webpack_require__(22);

	var _ContentDateMetal2 = _interopRequireDefault(_ContentDateMetal);

	var _ContentBoneWeight = __webpack_require__(23);

	var _ContentBoneWeight2 = _interopRequireDefault(_ContentBoneWeight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2016-08-10.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	/**
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
	    _Actions.Actions.repaint(data);
	});

	// 接收app推送数据
	het.repaint(function (data) {

	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = { cn: 'bmi' };
	        _this.listenStore(_Store.Store); // 监听Store

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	            window.addEventListener('resize', function () {
	                document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
	            }, false);
	            //$('.measurementReport-ul').on('touchend', 'li', function () {
	            //    $(this).addClass('measurementReport-active').siblings().removeClass('measurementReport-active');
	            //})
	        }
	    }, {
	        key: 'getAttr',
	        value: function getAttr(e) {
	            var eve = e.currentTarget.getAttribute('title');
	            this.setState({ cn: eve });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //console.log(this.state)
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
	                            this.state.weight,
	                            React.createElement(
	                                'span',
	                                { style: { fontSize: '0.3rem' } },
	                                'kg'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-main' },
	                    React.createElement(
	                        'ul',
	                        { className: 'measurementReport-ul' },
	                        React.createElement(
	                            'li',
	                            { onTouchStart: this.getAttr.bind(this), title: 'bmi', className: this.state.cn === 'bmi' ? 'measurementReport-active' : '' },
	                            'BMI'
	                        ),
	                        React.createElement(
	                            'li',
	                            { onTouchStart: this.getAttr.bind(this), title: 'fatRate', className: this.state.cn === 'fatRate' ? 'measurementReport-active' : '' },
	                            '脂肪率'
	                        ),
	                        React.createElement(
	                            'li',
	                            { onTouchStart: this.getAttr.bind(this), title: 'waterPrc', className: this.state.cn === 'waterPrc' ? 'measurementReport-active' : '' },
	                            '水分比例'
	                        ),
	                        React.createElement(
	                            'li',
	                            { onTouchStart: this.getAttr.bind(this), title: 'musclePrc', className: this.state.cn === 'musclePrc' ? 'measurementReport-active' : '' },
	                            '肌肉比例'
	                        ),
	                        React.createElement(
	                            'li',
	                            { onTouchStart: this.getAttr.bind(this), title: 'dateMetal', className: this.state.cn === 'dateMetal' ? 'measurementReport-active' : '' },
	                            '基础代谢'
	                        ),
	                        React.createElement(
	                            'li',
	                            { onTouchStart: this.getAttr.bind(this), title: 'boneWeight', className: this.state.cn === 'boneWeight' ? 'measurementReport-active' : '' },
	                            '骨量'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { id: 'content' },
	                        this.state.cn === 'bmi' ? React.createElement(_ContentBmi2.default, { mydata: this.state.bmiRate, myage: this.state.age, mygender: this.state.gender }) : '',
	                        this.state.cn === 'fatRate' ? React.createElement(_ContentFatRate2.default, { mydata: this.state.fatRate, myage: this.state.age, mygender: this.state.gender }) : '',
	                        this.state.cn === 'waterPrc' ? React.createElement(_ContentWaterPrc2.default, { mydata: this.state.moistureRate, myage: this.state.age, mygender: this.state.gender }) : '',
	                        this.state.cn === 'musclePrc' ? React.createElement(_ContentMusclePrc2.default, { mydata: this.state.meatRate, myage: this.state.age, mygender: this.state.gender }) : '',
	                        this.state.cn === 'dateMetal' ? React.createElement(_ContentDateMetal2.default, { mydata: this.state.metabolismRate, myage: this.state.age, mygender: this.state.gender }) : '',
	                        this.state.cn === 'boneWeight' ? React.createElement(_ContentBoneWeight2.default, { mydata: this.state.boneWeight, myage: this.state.age, mygender: this.state.gender }) : ''
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('测量报告');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('R  OOT'))

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

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2016-08-11.
	 */

	//体重过低 <18.5 —— —— ——
	//体重正常 18.5～23.9 —— 增加 危险高
	//超重 24.0～27.9 增加 危险高 极高
	//肥胖 ≥28 危险高 危险极高 危险极高
	var ContentBmi = React.createClass({
	    displayName: 'ContentBmi',
	    render: function render() {
	        var num = this.props.mydata,
	            show = void 0,
	            age = this.props.myage,
	            gender = this.props.mygender,
	            widthLow = '32%',
	            widthNor = '33%',
	            widthHigh = '32%',
	            spanL = void 0,
	            spanN = void 0,
	            spanH = void 0,
	            lineColor = void 0,
	            pos = void 0;

	        show = gender ? ' ' : 'hiding';
	        if (age < 24 && age >= 0) {
	            widthLow = '16%', widthNor = '20%', widthHigh = '63.9%', spanL = 19, spanN = 24, spanH = 40;
	            if (num < 19) {
	                lineColor = '#3c9fe4';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num <= 24 && num >= 19) {
	                lineColor = '#40db90';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else {
	                lineColor = '#f3ce3c';
	                pos = (num - 15) / 25 * 100 + '%';
	            }
	        }
	        if (age <= 34 && age >= 24) {
	            widthLow = '20%', widthNor = '20%', widthHigh = '59.9%', spanL = 20, spanN = 25, spanH = 40;
	            if (num < 20) {
	                lineColor = '#3c9fe4';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num <= 25 && num >= 20) {
	                lineColor = '#40db90';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else {
	                lineColor = '#f3ce3c';
	                pos = (num - 15) / 25 * 100 + '%';
	            }
	        }
	        if (age < 44 && age >= 35) {
	            widthLow = '24%', widthNor = '20%', widthHigh = '55.9%', spanL = 21, spanN = 26, spanH = 40;
	            if (num < 21) {
	                lineColor = '#3c9fe4';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num <= 26 && num >= 21) {
	                lineColor = '#40db90';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num > 26) {
	                lineColor = '#f3ce3c';
	                pos = (num - 15) / 25 * 100 + '%';
	            }
	        }
	        if (age <= 54 && age >= 44) {
	            widthLow = '28%', widthNor = '20%', widthHigh = '51.9%', spanL = 22, spanN = 27, spanH = 40;
	            if (num < 22) {
	                lineColor = '#3c9fe4';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num <= 27 && num >= 22) {
	                lineColor = '#40db90';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num > 27) {
	                lineColor = '#f3ce3c';
	                pos = (num - 15) / 25 * 100 + '%';
	            }
	        }
	        if (age <= 64 && age >= 55) {
	            widthLow = '32%', widthNor = '20%', widthHigh = '47.9%', spanL = 23, spanN = 28, spanH = 40;
	            if (num < 23) {
	                lineColor = '#3c9fe4';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num <= 28 && num >= 23) {
	                lineColor = '#40db90';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num > 28) {
	                lineColor = '#f3ce3c';
	                pos = (num - 15) / 25 * 100 + '%';
	            }
	        }
	        if (age > 64) {
	            widthLow = '36%', widthNor = '20%', widthHigh = '43.9%', spanL = 24, spanN = 29, spanH = 40;
	            if (num < 24) {
	                lineColor = '#3c9fe4';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num <= 29 && num >= 24) {
	                lineColor = '#40db90';
	                pos = (num - 15) / 25 * 100 + '%';
	            } else if (num > 29) {
	                lineColor = '#f3ce3c';
	                pos = (num - 15) / 25 * 100 + '%';
	            }
	        }

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'content-bmi' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        React.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            num
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "measurementReport-content-pic " + show },
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-low', style: { width: widthLow } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#3c9fe4' } },
	                                '偏低'
	                            ),
	                            React.createElement('input', { className: 'range-low ', type: 'range', min: '0', max: '20' }),
	                            React.createElement(
	                                'div',
	                                { className: 'input-l' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-l-l' },
	                                    '15'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'input-l-r' },
	                                    spanL
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-normal', style: { width: widthNor } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#40db90' } },
	                                '正常'
	                            ),
	                            React.createElement('input', { className: 'range-normal', type: 'range', min: '20', max: '40' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-nor-span' },
	                                    spanN
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-high', style: { width: widthHigh } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#f3ce3c' } },
	                                '偏高'
	                            ),
	                            React.createElement('input', { className: 'range-high', type: 'range', min: '40', max: '60' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-high-span' },
	                                    spanH
	                                )
	                            )
	                        ),
	                        React.createElement('div', { id: 'fixLine', style: { background: lineColor, left: pos } })
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            'BMI：'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            'BMI是用体重公斤数除以身高米数平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '主要用于统计用途，当我们需要比较及分析一个人的体重对于不同高度的人所带来的健康影响时，BMI值是一个中立而可靠的指标。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	exports.default = ContentBmi;
	//switch (gender) {
	//    case 'male':
	//        if (age < 24 && age >= 0) {
	//            widthLow = '16%',
	//                widthNor = '20%',
	//                widthHigh = '63.9%',
	//                spanL = 19,
	//                spanN = 24 ,
	//                spanH = 40;
	//            if (num < 19) {
	//                lineColor = '#3c9fe4';
	//                pos = (num-15 / 25 * 100) + '%';
	//            } else if (num <= 24 && num >= 19) {
	//                lineColor = '#40db90';
	//                pos = (num-15 / 25 * 100) + '%';
	//            } else {
	//                lineColor = '#f3ce3c';
	//                pos = (num-15 / 25 * 100) + '%'
	//            }
	//        }
	//        if (age >= 24 && age <= 34) {
	//            widthLow = '20%',
	//                widthNor = '20%',
	//                widthHigh = '59.9%',
	//                spanL = 20,
	//                spanN = 25 ,
	//                spanH = 40
	//            if (num < 20) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//
	//            } else if (num <= 25 && num >= 20) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age >= 35 && age < 44) {
	//            widthLow = '24%',
	//                widthNor = '20%',
	//                widthHigh = '55.9%',
	//                spanL = 21,
	//                spanN = 26,
	//                spanH = 40
	//            if (num < 21) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//
	//            } else if (num <= 26 && num >= 21) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num > 26) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age >= 44 && age <= 54) {
	//            widthLow = '28%',
	//                widthNor = '20%',
	//                widthHigh = '51.9%',
	//                spanL = 22,
	//                spanN = 27,
	//                spanH = 40
	//            if (num < 22) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num <= 27 && num >= 22) {
	//                lineColor = '#40db90';
	//                pos = (num / 40* 100) + '%';
	//            } else if (num > 27) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age >= 55 && age <= 64) {
	//            widthLow = '32%',
	//                widthNor = '20%',
	//                widthHigh = '47.9%',
	//                spanL = 23,
	//                spanN = 28,
	//                spanH = 40
	//            if (num < 23) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num <= 28 && num >= 23) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num > 28) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age > 64) {
	//            widthLow = '36%',
	//                widthNor = '20%',
	//                widthHigh = '43.9%',
	//                spanL = 24,
	//                spanN = 29,
	//                spanH = 40
	//            if (num < 24) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num <= 29&& num >= 24) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num > 29) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        break;
	//    case 'female':
	//        if (age < 24 && age >= 0) {
	//            widthLow = '16%',
	//                widthNor = '20%',
	//                widthHigh = '63.9%',
	//                spanL = 19,
	//                spanN = 24 ,
	//                spanH = 40;
	//            if (num < 19) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num <= 24 && num >= 19) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age >= 24 && age <= 34) {
	//            widthLow = '20%',
	//                widthNor = '20%',
	//                widthHigh = '59.9%',
	//                spanL = 20,
	//                spanN = 25 ,
	//                spanH = 40
	//            if (num < 20) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//
	//            } else if (num <= 25 && num >= 20) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age >= 35 && age < 44) {
	//            widthLow = '24%',
	//                widthNor = '20%',
	//                widthHigh = '55.9%',
	//                spanL = 21,
	//                spanN = 26,
	//                spanH = 40
	//            if (num < 21) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//
	//            } else if (num <= 26 && num >= 21) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num > 26) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age >= 44 && age <= 54) {
	//            widthLow = '28%',
	//                widthNor = '20%',
	//                widthHigh = '51.9%',
	//                spanL = 22,
	//                spanN = 27,
	//                spanH = 40
	//            if (num < 22) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num <= 27 && num >= 22) {
	//                lineColor = '#40db90';
	//                pos = (num / 40* 100) + '%';
	//            } else if (num > 27) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age >= 55 && age <= 64) {
	//            widthLow = '32%',
	//                widthNor = '20%',
	//                widthHigh = '47.9%',
	//                spanL = 23,
	//                spanN = 28,
	//                spanH = 40
	//            if (num < 23) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num <= 28 && num >= 23) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num > 28) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        if (age > 64) {
	//            widthLow = '36%',
	//                widthNor = '20%',
	//                widthHigh = '43.9%',
	//                spanL = 24,
	//                spanN = 29,
	//                spanH = 40
	//            if (num < 24) {
	//                lineColor = '#3c9fe4';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num <= 29&& num >= 24) {
	//                lineColor = '#40db90';
	//                pos = (num / 40 * 100) + '%';
	//            } else if (num > 29) {
	//                lineColor = '#f3ce3c';
	//                pos = (num / 40 * 100) + '%'
	//            }
	//        }
	//        break;
	//}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2016-08-11.
	 */
	//value={0<(this.props.mydata) <16 ?this.props.mydata:''}
	//value={16<=(this.props.mydata) <=22 ?this.props.mydata:''}
	//value={22<(this.props.mydata) <=30 ?this.props.mydata:''}
	//value={30<(this.props.mydata) <=50 ?this.props.mydata:''}
	var ContentFatRate = React.createClass({
	    displayName: 'ContentFatRate',
	    render: function render() {
	        var num = this.props.mydata,
	            show = void 0,
	            age = this.props.myage,
	            gender = this.props.mygender,
	            widthLow = '32%',
	            widthNor = '32%',
	            widthHigh = '32%',
	            spanL = void 0,
	            spanN = void 0,
	            spanH = void 0,
	            lineColor = void 0,
	            pos = void 0;
	        show = gender ? ' ' : 'hiding';
	        switch (gender) {
	            case 'male':
	                if (age < 20 && age >= 0) {
	                    widthLow = '17.5%', widthNor = '20%', widthHigh = '62.4%', spanL = 12, spanN = 20, spanH = 45;
	                    if (num < 12) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 20 && num >= 12) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 20) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '20%', widthNor = '20%', widthHigh = '59.9%', spanL = 13, spanN = 21, spanH = 45;
	                    if (num < 13) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 21 && num >= 13) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 21) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '25%', widthNor = '20%', widthHigh = '54.9%', spanL = 15, spanN = 23, spanH = 45;
	                    if (num < 15) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 23 && num >= 15) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 23) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '27.5%', widthNor = '20%', widthHigh = '52.4%', spanL = 16, spanN = 24, spanH = 45;
	                    if (num < 16) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 24 && num >= 16) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 24) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '30%', widthNor = '20%', widthHigh = '49.9%', spanL = 17, spanN = 25, spanH = 45;
	                    if (num < 17) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 25 && num >= 17) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 25) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age >= 60) {
	                    widthLow = '32.5%', widthNor = '20%', widthHigh = '47.4%', spanL = 18, spanN = 26, spanH = 45;
	                    if (num < 189) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 26 && num >= 18) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 34) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                break;
	            case 'female':
	                if (age < 30 && age >= 0) {
	                    widthLow = '30%', widthNor = '20%', widthHigh = '49.9%', spanL = 17, spanN = 25, spanH = 45;
	                    if (num < 17) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 25 && num >= 17) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 25) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age >= 30) {
	                    widthLow = '35%', widthNor = '20%', widthHigh = '44.9%', spanL = 19, spanN = 27, spanH = 45;
	                    if (num < 19) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 27 && num >= 19) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 27) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '37.5%', widthNor = '20%', widthHigh = '42.4%', spanL = 20, spanN = 28, spanH = 45;
	                    if (num < 20) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 28 && num >= 20) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 28) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                if (age > 50) {
	                    widthLow = '40%', widthNor = '20%', widthHigh = '39.9%', spanL = 21, spanN = 29, spanH = 45;
	                    if (num < 21) {
	                        lineColor = '#3c9fe4';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num <= 29 && num >= 21) {
	                        lineColor = '#40db90';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    } else if (num > 29) {
	                        lineColor = '#f3ce3c';
	                        pos = (num - 5) / 40 * 100 + '%';
	                    }
	                }
	                break;
	        }
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'content-fatRate' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        React.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            num
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "measurementReport-content-pic " + show },
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-low', style: { width: widthLow } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#3c9fe4' } },
	                                '偏低'
	                            ),
	                            React.createElement('input', { className: 'range-low ', type: 'range', min: '0', max: '20' }),
	                            React.createElement(
	                                'div',
	                                { className: 'input-l' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-l-l' },
	                                    '5'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'input-l-r' },
	                                    spanL
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-normal', style: { width: widthNor } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#40db90' } },
	                                '正常'
	                            ),
	                            React.createElement('input', { className: 'range-normal', type: 'range', min: '20', max: '40' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-nor-span' },
	                                    spanN
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-high', style: { width: widthHigh } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#f3ce3c' } },
	                                '偏高'
	                            ),
	                            React.createElement('input', { className: 'range-high', type: 'range', min: '40', max: '60' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-high-span' },
	                                    spanH
	                                )
	                            )
	                        ),
	                        React.createElement('div', { id: 'fixLine', style: { background: lineColor, left: pos } })
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '脂肪率：'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '是指身体成分中，脂肪组织所占的比率。'
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-ans' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '改善体脂的办法，仅供参考：'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '1、少吃零食：每餐的间隔正是燃烧脂肪的大好时机,不要进食零食增进脂肪；'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '2、饭配菜：外食以五谷杂粮、米饭为主食，以蔬菜为主菜、肉类为配菜；'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '3、慎选食品：外食避免点油炸类食品，避免添加大量糖和盐等调味料；'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '4、晚餐外食以蛋白质为主：人在睡觉时,脂肪会不断累积,所以晚餐应以蛋白质为主，不宜吃脂肪含量极高的食品；'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '5、进行有氧运动：每隔一天进行有氧运动1次，每次运动30分钟左右。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	exports.default = ContentFatRate;

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2016-08-11.
	 */
	/**
	 * Created by Administrator on 2016-08-11.
	 */

	var ContentMusclePrc = React.createClass({
	    displayName: 'ContentMusclePrc',
	    render: function render() {
	        var num = this.props.mydata,
	            show = void 0,
	            age = this.props.myage,
	            gender = this.props.mygender,
	            widthLow = '32%',
	            widthNor = '32%',
	            widthHigh = '32%',
	            spanL = void 0,
	            spanN = void 0,
	            spanH = void 0,
	            lineColor = void 0,
	            pos = void 0;
	        show = gender ? ' ' : 'hiding';
	        switch (gender) {
	            case 'male':
	                if (age < 20 && age >= 0) {
	                    widthLow = '51.3%', widthNor = '24.3%', widthHigh = '24.3%', spanL = 38, spanN = 56, spanH = 74;
	                    if (num < 38) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 74 * 100 + '%';
	                    } else if (num <= 56 && num >= 38) {
	                        lineColor = '#40db90';
	                        pos = num / 74 * 100 + '%';
	                    } else if (num > 56) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 74 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '48.7%', widthNor = '25.6%', widthHigh = '25.6%', spanL = 43, spanN = 64, spanH = 85;
	                    if (num < 43) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 85 * 100 + '%';
	                    } else if (num <= 64 && num >= 43) {
	                        lineColor = '#40db90';
	                        pos = num / 85 * 100 + '%';
	                    } else if (num > 64) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 85 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '53.3%', widthNor = '23.3%', widthHigh = '23.2%', spanL = 48, spanN = 69, spanH = 90;
	                    if (num < 42) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 74 * 100 + '%';
	                    } else if (num <= 58 && num >= 42) {
	                        lineColor = '#40db90';
	                        pos = num / 74 * 100 + '%';
	                    } else if (num > 58) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 74 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '59%', widthNor = '20.5%', widthHigh = '20.5%', spanL = 46, spanN = 62, spanH = 78;
	                    if (num < 46) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 78 * 100 + '%';
	                    } else if (num <= 62 && num >= 46) {
	                        lineColor = '#40db90';
	                        pos = num / 78 * 100 + '%';
	                    } else if (num > 62) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 78 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '54.9%', widthNor = '22.5%', widthHigh = '22.5%', spanL = 39, spanN = 55, spanH = 71;
	                    if (num < 39) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 71 * 100 + '%';
	                    } else if (num <= 55 && num >= 39) {
	                        lineColor = '#40db90';
	                        pos = num / 71 * 100 + '%';
	                    } else if (num > 55) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 71 * 100 + '%';
	                    }
	                }
	                if (age >= 60) {
	                    widthLow = '54.6%', widthNor = '22.6%', widthHigh = '22.7%', spanL = 41, spanN = 58, spanH = 75;
	                    if (num < 41) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 75 * 100 + '%';
	                    } else if (num <= 58 && num >= 41) {
	                        lineColor = '#40db90';
	                        pos = num / 75 * 100 + '%';
	                    } else if (num > 58) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 75 * 100 + '%';
	                    }
	                }
	                break;
	            case 'female':
	                if (age < 20 && age >= 0) {
	                    widthLow = '45.3%', widthNor = '27.3%', widthHigh = '27.3%', spanL = 35, spanN = 56, spanH = 77;
	                    if (num < 35) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 77 * 100 + '%';
	                    } else if (num <= 56 && num >= 35) {
	                        lineColor = '#40db90';
	                        pos = num / 77 * 100 + '%';
	                    } else if (num > 56) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 77 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '47.1%', widthNor = '26.4%', widthHigh = '26.4%', spanL = 38, spanN = 58, spanH = 78;
	                    if (num < 38) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 78 * 100 + '%';
	                    } else if (num <= 58 && num >= 38) {
	                        lineColor = '#40db90';
	                        pos = num / 78 * 100 + '%';
	                    } else if (num > 58) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 78 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '53.2%', widthNor = '23.3%', widthHigh = '23.3%', spanL = 48, spanN = 69, spanH = 90;
	                    if (num < 48) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 90 * 100 + '%';
	                    } else if (num <= 69 && num >= 48) {
	                        lineColor = '#40db90';
	                        pos = num / 90 * 100 + '%';
	                    } else if (num > 69) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 90 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '55.5%', widthNor = '22.2%', widthHigh = '22.2%', spanL = 40, spanN = 56, spanH = 72;
	                    if (num < 40) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 72 * 100 + '%';
	                    } else if (num <= 56 && num >= 40) {
	                        lineColor = '#40db90';
	                        pos = num / 72 * 100 + '%';
	                    } else if (num > 56) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 72 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '54.8%', widthNor = '22.5%', widthHigh = '22.5%', spanL = 39, spanN = 55, spanH = 71;
	                    if (num < 39) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 71 * 100 + '%';
	                    } else if (num <= 55 && num >= 39) {
	                        lineColor = '#40db90';
	                        pos = num / 71 * 100 + '%';
	                    } else if (num > 55) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 71 * 100 + '%';
	                    }
	                }
	                if (age > 60) {
	                    widthLow = '52%', widthNor = '23.9%', widthHigh = '23.9%', spanL = 35, spanN = 51, spanH = 67;
	                    if (num < 35) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 67 * 100 + '%';
	                    } else if (num <= 51 && num >= 35) {
	                        lineColor = '#40db90';
	                        pos = num / 67 * 100 + '%';
	                    } else if (num > 51) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 67 * 100 + '%';
	                    }
	                }
	                break;
	        }
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'content-mus' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        React.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            num
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "measurementReport-content-pic " + show },
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-low', style: { width: widthLow } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#3c9fe4' } },
	                                '偏低'
	                            ),
	                            React.createElement('input', { className: 'range-low ', type: 'range', min: '0', max: '20' }),
	                            React.createElement(
	                                'div',
	                                { className: 'input-l' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-l-l' },
	                                    '0'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'input-l-r' },
	                                    spanL
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-normal', style: { width: widthNor } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#40db90' } },
	                                '正常'
	                            ),
	                            React.createElement('input', { className: 'range-normal', type: 'range', min: '20', max: '40' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-nor-span' },
	                                    spanN
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-high', style: { width: widthHigh } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#f3ce3c' } },
	                                '偏高'
	                            ),
	                            React.createElement('input', { className: 'range-high', type: 'range', min: '40', max: '60' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-high-span' },
	                                    spanH
	                                )
	                            )
	                        ),
	                        React.createElement('div', { id: 'fixLine', style: { background: lineColor, left: pos } })
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '肌肉比例：'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '肌肉比例是根据人体肌肉总量和人体体重、身高等相结合得到的人体的一个比例值。'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '这个值的范围决定一个人的身体健康状况以及力量的多少。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	exports.default = ContentMusclePrc;

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2016-08-11.
	 */

	var ContentWaterPrc = React.createClass({
	    displayName: 'ContentWaterPrc',
	    render: function render() {
	        var num = this.props.mydata,
	            show = void 0,
	            age = this.props.myage,
	            gender = this.props.mygender,
	            widthLow = '32%',
	            widthNor = '32%',
	            widthHigh = '32%',
	            spanL = void 0,
	            spanN = void 0,
	            spanH = void 0,
	            lineColor = void 0,
	            pos = void 0;
	        show = gender ? ' ' : 'hiding';
	        switch (gender) {
	            case 'male':
	                if (age < 20 && age >= 0) {
	                    widthLow = '50%', widthNor = '25%', widthHigh = '25%', spanL = 46, spanN = 69, spanH = 92;
	                    if (num < 46) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 92 * 100 + '%';
	                    } else if (num <= 69 && num >= 46) {
	                        lineColor = '#40db90';
	                        pos = num / 92 * 100 + '%';
	                    } else if (num > 69) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 92 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '53.3%', widthNor = '23.3%', widthHigh = '23.3%', spanL = 48, spanN = 69, spanH = 90;
	                    if (num < 48) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 90 * 100 + '%';
	                    } else if (num <= 69 && num >= 48) {
	                        lineColor = '#40db90';
	                        pos = num / 90 * 100 + '%';
	                    } else if (num > 69) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 90 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '49.5%', widthNor = '25.2%', widthHigh = '25.2%', spanL = 45, spanN = 68, spanH = 91;
	                    if (num < 45) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 91 * 100 + '%';
	                    } else if (num <= 68 && num >= 45) {
	                        lineColor = '#40db90';
	                        pos = num / 91 * 100 + '%';
	                    } else if (num > 68) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 91 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '45.1%', widthNor = '27.4%', widthHigh = '27.4%', spanL = 43, spanN = 69, spanH = 95;
	                    if (num < 43) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 95 * 100 + '%';
	                    } else if (num <= 69 && num >= 43) {
	                        lineColor = '#40db90';
	                        pos = num / 95 * 100 + '%';
	                    } else if (num > 69) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 95 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '49.4%', widthNor = '25.3%', widthHigh = '25.3%', spanL = 43, spanN = 65, spanH = 87;
	                    if (num < 43) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 87 * 100 + '%';
	                    } else if (num <= 65 && num >= 43) {
	                        lineColor = '#40db90';
	                        pos = num / 87 * 100 + '%';
	                    } else if (num > 65) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 87 * 100 + '%';
	                    }
	                }
	                if (age >= 60) {
	                    widthLow = '45.7%', widthNor = '26.1%', widthHigh = '26.1%', spanL = 42, spanN = 68, spanH = 92;
	                    if (num < 42) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 92 * 100 + '%';
	                    } else if (num <= 68 && num >= 42) {
	                        lineColor = '#40db90';
	                        pos = num / 92 * 100 + '%';
	                    } else if (num > 68) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 92 * 100 + '%';
	                    }
	                }
	                break;
	            case 'female':
	                if (age < 20 && age >= 0) {
	                    widthLow = '46.1%', widthNor = '26.9%', widthHigh = '26.9%', spanL = 43, spanN = 68, spanH = 93;
	                    if (num < 43) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 93 * 100 + '%';
	                    } else if (num <= 68 && num >= 43) {
	                        lineColor = '#40db90';
	                        pos = num / 93 * 100 + '%';
	                    } else if (num > 68) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 93 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '47.1%', widthNor = '26.4%', widthHigh = '26.4%', spanL = 43, spanN = 67, spanH = 91;
	                    if (num < 43) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 91 * 100 + '%';
	                    } else if (num <= 67 && num >= 43) {
	                        lineColor = '#40db90';
	                        pos = num / 91 * 100 + '%';
	                    } else if (num > 67) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 91 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '40.7%', widthNor = '29.6%', widthHigh = '29.6%', spanL = 40, spanN = 69, spanH = 98;
	                    if (num < 40) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 98 * 100 + '%';
	                    } else if (num <= 69 && num >= 40) {
	                        lineColor = '#40db90';
	                        pos = num / 98 * 100 + '%';
	                    } else if (num > 69) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 98 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '44.5%', widthNor = '27.7%', widthHigh = '27.7%', spanL = 42, spanN = 68, spanH = 94;
	                    if (num < 42) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 94 * 100 + '%';
	                    } else if (num <= 68 && num >= 42) {
	                        lineColor = '#40db90';
	                        pos = num / 94 * 100 + '%';
	                    } else if (num > 68) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 94 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '47.7%', widthNor = '26.1%', widthHigh = '26.1%', spanL = 42, spanN = 65, spanH = 88;
	                    if (num < 42) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 88 * 100 + '%';
	                    } else if (num <= 65 && num >= 42) {
	                        lineColor = '#40db90';
	                        pos = num / 88 * 100 + '%';
	                    } else if (num > 65) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 88 * 100 + '%';
	                    }
	                }
	                if (age > 60) {
	                    widthLow = '47.1%', widthNor = '26.4%', widthHigh = '26.4%', spanL = 41, spanN = 64, spanH = 87;
	                    if (num < 41) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 87 * 100 + '%';
	                    } else if (num <= 64 && num >= 41) {
	                        lineColor = '#40db90';
	                        pos = num / 87 * 100 + '%';
	                    } else if (num > 64) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 87 * 100 + '%';
	                    }
	                }
	                break;
	        }
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'content-waterPrc' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        React.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            num
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "measurementReport-content-pic " + show },
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-low', style: { width: widthLow } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#3c9fe4' } },
	                                '偏低'
	                            ),
	                            React.createElement('input', { className: 'range-low ', type: 'range', min: '0', max: '20' }),
	                            React.createElement(
	                                'div',
	                                { className: 'input-l' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-l-l' },
	                                    '0'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'input-l-r' },
	                                    spanL
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-normal', style: { width: widthNor } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#40db90' } },
	                                '正常'
	                            ),
	                            React.createElement('input', { className: 'range-normal', type: 'range', min: '20', max: '40' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-nor-span' },
	                                    spanN
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-high', style: { width: widthHigh } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#f3ce3c' } },
	                                '偏高'
	                            ),
	                            React.createElement('input', { className: 'range-high', type: 'range', min: '40', max: '60' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-high-span' },
	                                    spanH
	                                )
	                            )
	                        ),
	                        React.createElement('div', { id: 'fixLine', style: { background: lineColor, left: pos } })
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '水分：'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '是指身体水分占体重的百分比。'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '一个成年人体内的含水量约占人体重的65%左右。人在自己一生的生命活动过程中,随着年龄的增长,体内的含水分量也逐渐的减少。在婴儿时期,体内含水量可达72%,到了成年时期,水的含水量降到65%左右。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	exports.default = ContentWaterPrc;

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2016-08-11.
	 */
	/**
	 * Created by Administrator on 2016-08-11.
	 */

	var ContentDateMetal = React.createClass({
	    displayName: 'ContentDateMetal',
	    render: function render() {
	        var num = this.props.mydata,
	            show = void 0,
	            age = this.props.myage,
	            gender = this.props.mygender,
	            widthLow = '32%',
	            widthNor = '32%',
	            widthHigh = '32%',
	            spanL = void 0,
	            spanN = void 0,
	            spanH = void 0,
	            lineColor = void 0,
	            pos = void 0;
	        show = gender ? ' ' : 'hiding';
	        switch (gender) {
	            case 'male':
	                if (age < 20 && age >= 0) {
	                    widthLow = '30%', widthNor = '35%', widthHigh = '35%', spanL = 1200, spanN = 2600, spanH = 4000;
	                    if (num < 1200) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 4000 * 100 + '%';
	                    } else if (num <= 2600 && num >= 1200) {
	                        lineColor = '#40db90';
	                        pos = num / 4000 * 100 + '%';
	                    } else if (num > 2600) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 4000 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '25.8%', widthNor = '37.1%', widthHigh = '37%', spanL = 1150, spanN = 2800, spanH = 4450;
	                    if (num < 1150) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 4450 * 100 + '%';
	                    } else if (num <= 2800 && num >= 1150) {
	                        lineColor = '#40db90';
	                        pos = num / 4450 * 100 + '%';
	                    } else if (num > 2800) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 4450 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '29.7%', widthNor = '35.1%', widthHigh = '35.1%', spanL = 1100, spanN = 2400, spanH = 3700;
	                    if (num < 1100) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 3700 * 100 + '%';
	                    } else if (num <= 2400 && num >= 1100) {
	                        lineColor = '#40db90';
	                        pos = num / 3700 * 100 + '%';
	                    } else if (num > 2400) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 3700 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '31.5%', widthNor = '34.2%', widthHigh = '34.2%', spanL = 1030, spanN = 2150, spanH = 3270;
	                    if (num < 1030) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 3270 * 100 + '%';
	                    } else if (num <= 2150 && num >= 1030) {
	                        lineColor = '#40db90';
	                        pos = num / 3270 * 100 + '%';
	                    } else if (num > 2150) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 3270 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '31.2%', widthNor = '34.4%', widthHigh = '34.4%', spanL = 980, spanN = 2060, spanH = 3140;
	                    if (num < 980) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 3140 * 100 + '%';
	                    } else if (num <= 2060 && num >= 980) {
	                        lineColor = '#40db90';
	                        pos = num / 3140 * 100 + '%';
	                    } else if (num > 2060) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 3140 * 100 + '%';
	                    }
	                }
	                if (age >= 60) {
	                    widthLow = '25.8%', widthNor = '37.1%', widthHigh = '37.1%', spanL = 720, spanN = 1750, spanH = 2780;
	                    if (num < 720) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 2780 * 100 + '%';
	                    } else if (num <= 1750 && num >= 720) {
	                        lineColor = '#40db90';
	                        pos = num / 2780 * 100 + '%';
	                    } else if (num > 1750) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 2780 * 100 + '%';
	                    }
	                }
	                break;
	            case 'female':
	                if (age < 20 && age >= 0) {
	                    widthLow = '29.7%', widthNor = '35.1%', widthHigh = '35.1%', spanL = 1100, spanN = 2400, spanH = 3700;
	                    if (num < 1100) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 3700 * 100 + '%';
	                    } else if (num <= 2400 && num >= 1100) {
	                        lineColor = '#40db90';
	                        pos = num / 3700 * 100 + '%';
	                    } else if (num > 2400) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 3700 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '25.3%', widthNor = '37.3%', widthHigh = '37.3%', spanL = 1050, spanN = 2600, spanH = 4150;
	                    if (num < 1050) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 4150 * 100 + '%';
	                    } else if (num <= 2600 && num >= 1050) {
	                        lineColor = '#40db90';
	                        pos = num / 4150 * 100 + '%';
	                    } else if (num > 2600) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 4150 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '29.7%', widthNor = '35.1%', widthHigh = '35.1%', spanL = 1000, spanN = 2200, spanH = 3400;
	                    if (num < 1000) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 3400 * 100 + '%';
	                    } else if (num <= 2200 && num >= 1000) {
	                        lineColor = '#40db90';
	                        pos = num / 3400 * 100 + '%';
	                    } else if (num > 2200) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 3400 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '30.2%', widthNor = '34.9%', widthHigh = '34.8%', spanL = 950, spanN = 2050, spanH = 3150;
	                    if (num < 950) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 3150 * 100 + '%';
	                    } else if (num <= 2050 && num >= 950) {
	                        lineColor = '#40db90';
	                        pos = num / 3150 * 100 + '%';
	                    } else if (num > 2050) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 3150 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '31.1%', widthNor = '34.4%', widthHigh = '34.4%', spanL = 950, spanN = 2000, spanH = 3050;
	                    if (num < 950) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 3050 * 100 + '%';
	                    } else if (num <= 2000 && num >= 950) {
	                        lineColor = '#40db90';
	                        pos = num / 3050 * 100 + '%';
	                    } else if (num > 2000) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 3050 * 100 + '%';
	                    }
	                }
	                if (age > 60) {
	                    widthLow = '25%', widthNor = '37.5%', widthHigh = '37.5%', spanL = 600, spanN = 1500, spanH = 2400;
	                    if (num < 600) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 2400 * 100 + '%';
	                    } else if (num <= 1500 && num >= 600) {
	                        lineColor = '#40db90';
	                        pos = num / 2400 * 100 + '%';
	                    } else if (num > 1500) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 2400 * 100 + '%';
	                    }
	                }
	                break;
	        }
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'content-metal' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        React.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            num
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            'kcal'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "measurementReport-content-pic " + show },
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-low', style: { width: widthLow } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#3c9fe4' } },
	                                '偏低'
	                            ),
	                            React.createElement('input', { className: 'range-low ', type: 'range', min: '0', max: '20' }),
	                            React.createElement(
	                                'div',
	                                { className: 'input-l' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-l-l' },
	                                    '0'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'input-l-r' },
	                                    spanL
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-normal', style: { width: widthNor } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#40db90' } },
	                                '正常'
	                            ),
	                            React.createElement('input', { className: 'range-normal', type: 'range', min: '20', max: '40' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-nor-span' },
	                                    spanN
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-high', style: { width: widthHigh } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#f3ce3c' } },
	                                '偏高'
	                            ),
	                            React.createElement('input', { className: 'range-high', type: 'range', min: '40', max: '60' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-high-span' },
	                                    spanH
	                                )
	                            )
	                        ),
	                        React.createElement('div', { id: 'fixLine', style: { background: lineColor, left: pos } })
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '基础代谢率：'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '基础代谢率（BMR）是指人体在清醒而又极端安静的状态下，不受肌肉活动、环境温度、食物及精神紧张等影响时的能量代谢率。'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '婴儿时期，因为身体组织生长旺盛，基础代谢率最高，以后随着年龄的增长而逐渐降低。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	exports.default = ContentDateMetal;

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by Administrator on 2016-09-01.
	 */
	/**
	 * Created by Administrator on 2016-08-11.
	 */
	/**
	 * Created by Administrator on 2016-08-11.
	 */

	var ContentBoneWeight = React.createClass({
	    displayName: 'ContentBoneWeight',
	    render: function render() {
	        var num = this.props.mydata,
	            show = void 0,
	            age = this.props.myage,
	            gender = this.props.mygender,
	            widthLow = '32%',
	            widthNor = '32%',
	            widthHigh = '32%',
	            spanL = void 0,
	            spanN = void 0,
	            spanH = void 0,
	            lineColor = void 0,
	            pos = void 0;
	        show = gender ? ' ' : 'hiding';
	        switch (gender) {
	            case 'female':
	                if (age < 20 && age >= 0) {
	                    widthLow = '30%', widthNor = '35%', widthHigh = '34.9%', spanL = 1.8, spanN = 3.9, spanH = 6;
	                    if (num < 1.8) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 6 * 100 + '%';
	                    } else if (num <= 3.9 && num >= 1.8) {
	                        lineColor = '#40db90';
	                        pos = num / 6 * 100 + '%';
	                    } else if (num > 3.9) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 6 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age >= 20) {
	                    widthLow = '24.6%', widthNor = '37.7%', widthHigh = '37.6%', spanL = 1.5, spanN = 3.8, spanH = 6.1;
	                    if (num < 1.5) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 6.1 * 100 + '%';
	                    } else if (num <= 3.8 && num >= 1.5) {
	                        lineColor = '#40db90';
	                        pos = num / 6.1 * 100 + '%';
	                    } else if (num > 3.8) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 6.1 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '27.6%', widthNor = '36.2%', widthHigh = '36.1%', spanL = 1.6, spanN = 3.7, spanH = 5.8;
	                    if (num < 1.6) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 5.8 * 100 + '%';
	                    } else if (num <= 3.7 && num >= 1.6) {
	                        lineColor = '#40db90';
	                        pos = num / 5.8 * 100 + '%';
	                    } else if (num > 3.7) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 5.8 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '26.3%', widthNor = '36.8%', widthHigh = '36.8%', spanL = 1.5, spanN = 3.6, spanH = 5.7;
	                    if (num < 1.5) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 5.7 * 100 + '%';
	                    } else if (num <= 3.6 && num >= 1.5) {
	                        lineColor = '#40db90';
	                        pos = num / 5.7 * 100 + '%';
	                    } else if (num > 3.6) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 5.7 * 100 + '%';
	                    }
	                }
	                if (age >= 60) {
	                    widthLow = '22.8%', widthNor = '38.6%', widthHigh = '38.5%', spanL = 1.3, spanN = 3.5, spanH = 5.7;
	                    if (num < 1.3) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 5.7 * 100 + '%';
	                    } else if (num <= 3.5 && num >= 1.3) {
	                        lineColor = '#40db90';
	                        pos = num / 5.7 * 100 + '%';
	                    } else if (num > 3.5) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 5.7 * 100 + '%';
	                    }
	                }
	                break;
	            case 'male':
	                if (age < 20 && age >= 0) {
	                    widthLow = '32.3%', widthNor = '33.9%', widthHigh = '33.7%', spanL = 2, spanN = 4.1, spanH = 6.2;
	                    if (num < 2) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 6.2 * 100 + '%';
	                    } else if (num <= 4.1 && num >= 2) {
	                        lineColor = '#40db90';
	                        pos = num / 6.2 * 100 + '%';
	                    } else if (num > 4.1) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 6.2 * 100 + '%';
	                    }
	                }
	                if (age <= 30 && age >= 20) {
	                    widthLow = '35.6%', widthNor = '32.2%', widthHigh = '32.1%', spanL = 2.1, spanN = 4, spanH = 5.9;
	                    if (num < 2.1) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 5.9 * 100 + '%';
	                    } else if (num <= 4 && num >= 2.1) {
	                        lineColor = '#40db90';
	                        pos = num / 5.9 * 100 + '%';
	                    } else if (num > 4) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 5.9 * 100 + '%';
	                    }
	                }
	                if (age < 40 && age > 30) {
	                    widthLow = '53.2%', widthNor = '23.3%', widthHigh = '23.3%', spanL = 1.8, spanN = 4, spanH = 6.2;
	                    if (num < 1.8) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 6.2 * 100 + '%';
	                    } else if (num <= 4 && num >= 1.8) {
	                        lineColor = '#40db90';
	                        pos = num / 6.2 * 100 + '%';
	                    } else if (num > 4) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 6.2 * 100 + '%';
	                    }
	                }
	                if (age <= 50 && age >= 40) {
	                    widthLow = '33.3%', widthNor = '33.3%', widthHigh = '33.3%', spanL = 1.9, spanN = 3.8, spanH = 5.7;
	                    if (num < 1.9) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 5.7 * 100 + '%';
	                    } else if (num <= 3.8 && num >= 1.9) {
	                        lineColor = '#40db90';
	                        pos = num / 5.7 * 100 + '%';
	                    } else if (num > 3.8) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 5.7 * 100 + '%';
	                    }
	                }
	                if (age < 60 && age > 50) {
	                    widthLow = '34.5%', widthNor = '32.7%', widthHigh = '32.7%', spanL = 1.9, spanN = 3.7, spanH = 5.5;
	                    if (num < 1.9) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 5.5 * 100 + '%';
	                    } else if (num <= 3.7 && num >= 1.9) {
	                        lineColor = '#40db90';
	                        pos = num / 5.5 * 100 + '%';
	                    } else if (num > 3.7) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 5.5 * 100 + '%';
	                    }
	                }
	                if (age > 60) {
	                    widthLow = '27.6%', widthNor = '36.2%', widthHigh = '36.1%', spanL = 1.6, spanN = 3.7, spanH = 5.8;
	                    if (num < 1.6) {
	                        lineColor = '#3c9fe4';
	                        pos = num / 5.8 * 100 + '%';
	                    } else if (num <= 3.7 && num >= 1.6) {
	                        lineColor = '#40db90';
	                        pos = num / 5.8 * 100 + '%';
	                    } else if (num > 3.7) {
	                        lineColor = '#f3ce3c';
	                        pos = num / 5.8 * 100 + '%';
	                    }
	                }
	                break;
	        }
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'div',
	                { className: 'content-mus' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-content-show' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '本次测量值:',
	                        React.createElement(
	                            'span',
	                            { className: 'measurementReport-txt' },
	                            num
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            'kg'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: "measurementReport-content-pic " + show },
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-low', style: { width: widthLow } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#3c9fe4' } },
	                                '偏低'
	                            ),
	                            React.createElement('input', { className: 'range-low ', type: 'range', min: '0', max: '20' }),
	                            React.createElement(
	                                'div',
	                                { className: 'input-l' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-l-l' },
	                                    '0'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    {
	                                        className: 'input-l-r' },
	                                    spanL
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-normal', style: { width: widthNor } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#40db90' } },
	                                '正常'
	                            ),
	                            React.createElement('input', { className: 'range-normal', type: 'range', min: '20', max: '40' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-nor-span' },
	                                    spanN
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'range-flex-style input-high', style: { width: widthHigh } },
	                            React.createElement(
	                                'span',
	                                { style: { color: '#f3ce3c' } },
	                                '偏高'
	                            ),
	                            React.createElement('input', { className: 'range-high', type: 'range', min: '40', max: '60' }),
	                            React.createElement(
	                                'div',
	                                { className: 'inputBottom' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'input-high-span' },
	                                    spanH
	                                )
	                            )
	                        ),
	                        React.createElement('div', { id: 'fixLine', style: { background: lineColor, left: pos } })
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'measurementReport-tips' },
	                React.createElement(
	                    'div',
	                    { className: 'measurementReport-tips-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'measurementReport-tips-qus' },
	                        React.createElement(
	                            'dt',
	                            null,
	                            '骨量：'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '单位体积内，骨组织[骨矿物质（钙、磷等）和骨基质（骨胶原、蛋白质、无机盐等等）]含量。'
	                        ),
	                        React.createElement(
	                            'dd',
	                            null,
	                            '骨量是用来代表骨骼的健康情况。不同年龄时间段人体骨量是不同的，增加骨量不仅要补钙，还要补充胶原蛋白。'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	exports.default = ContentBoneWeight;

/***/ }
/******/ ]);