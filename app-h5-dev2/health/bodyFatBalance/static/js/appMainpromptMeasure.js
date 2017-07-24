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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);


/***/ },

/***/ 2:
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

/***/ 3:
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

/***/ 4:
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

/***/ 5:
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

/***/ 6:
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

/***/ 7:
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

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
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
	    //Actions.getData(data);
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    //Actions.repaint(data);

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
	            var imgSrc = './../static/img/prompt-tips.png';
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'header',
	                    { className: 'mpt-header' },
	                    React.createElement('div', null),
	                    React.createElement(
	                        'div',
	                        { className: 'mpt-header-flex' },
	                        React.createElement('img', { className: 'user-port', src: './../static/img/user-mes.png' }),
	                        React.createElement(
	                            'span',
	                            { className: 'mpt-header-span' },
	                            '美男子,请上秤测量你的身体指标'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'mpt-wrap-tips' },
	                    React.createElement('img', { className: 'mpt-wrap-tips-pic', src: imgSrc })
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'mpt-footer ', href: 'health://skip_url/promptMeasure' },
	                    '上秤'
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

/******/ });