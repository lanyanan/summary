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

	module.exports = __webpack_require__(8);


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
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'send', // 发送控制指令
	'getData', //获取水质检测器最新的检测数据
	'postData', //上传测量数据
	'getTrigger', //更新页面
	'changeAddress', //更新修改过的地址
	'getHisData', //分页获取水质检测器历史检测数据
	'getNearestDistanceT10Data' //获取指定位置最近的10条检测数据
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

	var _fun = __webpack_require__(6);

	var AppData = {
	    'networkavailable': 1,
	    'online': 1,
	    'showerrordialog': false,
	    'isDeviceConnected': false
	};

	/**
	 * 十六进制字符串转字节数组
	 * @param    {str}    十六进制字符串
	 * @return   {array}  字节数组
	 */
	function Str2Bytes(str) {
	    var pos = 0;
	    var len = str.length;
	    if (len % 2 != 0) {
	        return null;
	    }
	    len /= 2;
	    var hexA = new Array();
	    for (var i = 0; i < len; i++) {
	        var s = str.substr(pos, 2);
	        var v = parseInt(s, 16);
	        hexA.push(v);
	        pos += 2;
	    }
	    return hexA;
	}

	/**
	 * 字节数组转十六进制字符串
	 * @param    {arr}   字节数组
	 * @return   {str}   十六进制字符串
	 */
	function Bytes2Str(arr) {
	    var str = "";
	    for (var i = 0; i < arr.length; i++) {
	        var tmp = arr[i].toString(16);
	        if (tmp.length == 1) {
	            tmp = "0" + tmp;
	        }
	        str += tmp;
	    }
	    return str;
	}

	/**
	 * 创建测量数据对象
	 */
	function ObjStory(uploadTime, toc, cod, chroma, turbidity, tds, temperature) {
	    var uploadLocation = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
	    var longitude = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '';
	    var latitude = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : '';

	    this.uploadTime = uploadTime;
	    this.toc = toc;
	    this.cod = cod;
	    this.chroma = chroma;
	    this.turbidity = turbidity;
	    this.tds = tds;
	    this.temperature = temperature;
	    this.uploadLocation = uploadLocation;
	    this.longitude = longitude;
	    this.latitude = latitude;
	    var now = new Date();
	    this.timeZone = -now.getTimezoneOffset(); // 时区 (10*60 统一传分钟)
	}

	function byteToInt(arr, needShift) {
	    var targ = arr[0] & 0xff | arr[1] << 8 & 0xff00 // | 表示安位或
	    | arr[2] << 24 >>> 8 | arr[3] << 24;
	    if (needShift) {
	        targ = targ >>> 0;
	    }
	    return targ;
	}
	/**
	 * 10进制数组 转 16进制数
	 * @param bytes
	 * @returns {Number|number}
	 */
	function bytesToUnxInt(bytes) {
	    var str = "";
	    for (var i = 0; i < bytes.length; i++) {
	        var tmp = bytes[i].toString(16);
	        if (tmp.length == 1) {
	            tmp = "0" + tmp;
	        }
	        str += tmp;
	    }
	    return parseInt(str, 16) || 0;
	}

	//高位在前，低位在后
	function bytes2int(bytes, needShift) {
	    var result = 0;
	    if (bytes.length == 4) {
	        var a = (bytes[0] & 0xff) << 24; //说明二
	        var b = (bytes[1] & 0xff) << 16;
	        var c = (bytes[2] & 0xff) << 8;
	        var d = bytes[3] & 0xff;
	        result = a | b | c | d;
	    }
	    if (needShift) {
	        result = needShift >>> 0;
	    }
	    return result;
	}

	Date.prototype.format = function (format) {
	    var date = {
	        "M+": this.getMonth() + 1,
	        "d+": this.getDate(),
	        "h+": this.getHours(),
	        "m+": this.getMinutes(),
	        "s+": this.getSeconds(),
	        "q+": Math.floor((this.getMonth() + 3) / 3),
	        "S+": this.getMilliseconds()
	    };
	    if (/(y+)/i.test(format)) {
	        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	    }
	    for (var k in date) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
	        }
	    }
	    return format;
	};

	function UtcToLocTime(timestamp) {
	    var dateTime = parseInt(timestamp) + 28800;
	    var newDate = new Date();
	    newDate.setTime(dateTime * 1000);
	    return newDate.format('yyyy-MM-dd h:m:s');
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {
	        console.log("onRepaint data====>" + JSON.stringify(datas) + "====type=====>" + type);
	        if (!!datas.deviceId) {
	            AppData.deviceId = datas.deviceId;
	            this.onGetData();
	        }

	        //位置信息  1、uploadLocation  2、longitude  3、latitude
	        if (datas.addr != undefined) AppData.addr = datas.addr; //定位地址
	        if (datas.lontitude != undefined) AppData.lng = datas.lontitude; //经纬度
	        if (datas.latitude != undefined) AppData.lat = datas.latitude; //经纬度

	        if (datas.isDeviceConnected != undefined) {
	            AppData.loading = 0;
	            AppData.isDeviceConnected = datas.isDeviceConnected; //蓝牙链接状态
	        }

	        AppData.showerrordialog = false;
	        if (datas.bleData != undefined) {
	            AppData.bleData = datas.bleData.toUpperCase(); //数据值
	            AppData.cmdType = datas.cmdType; //数据类型

	            // let data1;
	            var bleDataList = Str2Bytes(AppData.bleData);
	            // data1 = data;
	            // if (AppData.bleData.toUpperCase().startsWith('3A')) {
	            //     data1 = data.slice(6, data.length - 1);
	            // }
	            // let data2 = Bytes2Str(data1).toUpperCase();

	            if (bleDataList.length == 2) {
	                if (AppData.bleData == "5306") {
	                    AppData.showerrordialog = true;
	                } else if (AppData.bleData == "51FE") {}
	            } else if (bleDataList.length == 3) {
	                if (AppData.bleData == "510BFF") {
	                    AppData.loading = 2;
	                } else if (AppData.bleData == "510B01") {
	                    AppData.loading = 0;
	                    het.toast("基线校准成功");
	                } else if (AppData.bleData == "510B00") {
	                    AppData.loading = 0;
	                    het.toast("基线校准失败");
	                }
	            } else {
	                var array = [];
	                if (AppData.cmdType == 8) {
	                    bleDataList = bleDataList.slice(0, 18);
	                    // let timeVal = byteToInt(bleDataList.slice(0, 4), true);
	                    var timeVal = bytesToUnxInt(bleDataList.slice(0, 4));
	                    console.log("-----timeVal-------->>" + timeVal);
	                    // let uploadTime = Funs.timestampToUtc(timeVal, '-');
	                    var uploadTime = UtcToLocTime(timeVal); // 设备传过来的是UTC时间  这里转成本地时间
	                    var toc = (bleDataList[4] * 256 + bleDataList[5]) / 100;
	                    var cod = (bleDataList[6] * 256 + bleDataList[7]) / 100;
	                    var chroma = (bleDataList[8] * 256 + bleDataList[9]) / 100;
	                    var turbidity = (bleDataList[10] * 256 + bleDataList[11]) / 100;
	                    // let tds = byteToInt(bleDataList.slice(12, 16), false);
	                    var tds = bytesToUnxInt(bleDataList.slice(12, 16));
	                    var temperature = (bleDataList[16] * 256 + bleDataList[17]) / 100;
	                    array.push(new ObjStory(uploadTime, toc, cod, chroma, turbidity, tds, temperature, AppData.addr, AppData.lng, AppData.lat));
	                    this.onPostData(array);
	                } else if (AppData.cmdType == 6) {
	                    bleDataList.length % 18 == 2 && (bleDataList = bleDataList.slice(2, bleDataList.length)); //这里排除掉发过来的数据带有2个字节的帧序 去掉2字节的帧序头
	                    for (var i = 0; i < bleDataList.length / 18; i++) {
	                        var dataItem = bleDataList.slice(i * 18, i * 18 + 18);
	                        // let timeVal = byteToInt(dataItem.slice(0, 4), true);
	                        var _timeVal = bytesToUnxInt(dataItem.slice(0, 4));
	                        console.log("-----timeVal-------->>" + _timeVal);
	                        // let uploadTime = Funs.timestampToUtc(timeVal, '-');
	                        var _uploadTime = UtcToLocTime(_timeVal);
	                        var _toc = (dataItem[4] * 256 + dataItem[5]) / 100;
	                        var _cod = (dataItem[6] * 256 + dataItem[7]) / 100;
	                        var _chroma = (dataItem[8] * 256 + dataItem[9]) / 100;
	                        var _turbidity = (dataItem[10] * 256 + dataItem[11]) / 100;
	                        // let tds = byteToInt(dataItem.slice(12, 16), false);
	                        var _tds = bytesToUnxInt(dataItem.slice(12, 16));
	                        var _temperature = (dataItem[16] * 256 + dataItem[17]) / 100;
	                        array.push(new ObjStory(_uploadTime, _toc, _cod, _chroma, _turbidity, _tds, _temperature));
	                    }
	                    AppData.array = array;
	                    location.href = '#/SyncHisData';
	                }
	            }
	        }
	        this.trigger(AppData);
	        console.log(AppData, 'from repaint');
	    },
	    onGetTrigger: function onGetTrigger() {
	        this.trigger(AppData);
	    },
	    onChangeAddress: function onChangeAddress(selectIndex, address, longitude, latitude) {
	        var mydata = AppData.array || [];
	        if (selectIndex != -1 && selectIndex < mydata.length) {
	            mydata[selectIndex].uploadLocation = address;
	            mydata[selectIndex].longitude = longitude;
	            mydata[selectIndex].latitude = latitude;
	            AppData.array = mydata;
	        }
	        this.trigger(AppData);
	    },
	    onSend: function onSend(configType) {
	        var _this2 = this;

	        //1：水质检测命令    2：基线校准命令    3:关闭错误提示框
	        var configContent = void 0;
	        if (configType == 1) {
	            configContent = '03FE';
	            AppData.deviceStatus = 1;
	            AppData.loading = 2;
	        } else if (configType == 2) {
	            configContent = '0203';
	            AppData.loading = 2;
	        } else if (configType == 3) {
	            AppData.showerrordialog = false;
	        }
	        if (configType != 3) {
	            het.send({ bleData: configContent }, function (data) {
	                console.log('成功');
	            }, function (data) {
	                AppData.loading = 0;
	                het.toast("命令发送失败");
	                _this2.trigger(AppData);
	            });
	        }
	        this.trigger(AppData);
	    },
	    onPostData: function onPostData(dataArr) {
	        var _this3 = this;

	        var _this = this;
	        var url = '/v1/device/data/raw/upload';
	        var cfg = {
	            deviceId: AppData.deviceId
	        };
	        cfg.data = JSON.stringify(dataArr);
	        het.post(url, cfg, function (data) {
	            console.log(data, 'suc from post data');
	            AppData.array = [];
	            _this.trigger(AppData);
	            _this3.onGetData();
	        }, function (data) {
	            console.log(data, 'err from post data');
	        });
	    },
	    onGetData: function onGetData() {
	        var cfg = {
	            deviceId: AppData.deviceId
	        };
	        var _this = this;
	        var url = '/v1/app/customization/waterQuailtyDetector/getWaterQuailtyDetectorLatestData';
	        het.get(url, cfg, function (data) {
	            data = JSON.parse(data).data;
	            AppData.data = data;
	            AppData.deviceStatus = 2;
	            AppData.loading = 0;
	            _this.trigger(AppData);
	            console.log(AppData, 'from repaint');
	        }, function (data) {
	            console.log('fail sendData', data);
	            // het.toast('获取数据失败')
	        });
	    },
	    onGetHisData: function onGetHisData(pageIndex) {
	        var cfg = {
	            deviceId: AppData.deviceId,
	            pageIndex: pageIndex || 1,
	            pageRows: 10
	        };
	        var _this = this;
	        var url = '/v1/app/customization/waterQuailtyDetector/getWaterQuailtyDetectorHistoryData';
	        het.get(url, cfg, function (data) {
	            data = JSON.parse(data).data.list;
	            AppData.index = pageIndex;
	            AppData.list = data;
	            _this.trigger(AppData);
	        }, function (data) {
	            console.log('fail sendData');
	            // het.toast('获取数据失败')
	        });
	    },
	    onGetNearestDistanceT10Data: function onGetNearestDistanceT10Data(longitude, latitude) {
	        var cfg = {
	            longitude: longitude,
	            latitude: latitude
	        };
	        var _this = this,
	            url = '/v1/app/customization/waterQuailtyDetector/getNearestDistanceT10Data';
	        het.post(url, cfg, function (data) {
	            data = JSON.parse(data).data;
	            AppData.results = data;
	            _this.trigger(AppData);
	        }, function (data) {});
	    }
	});

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _LoadMainData = __webpack_require__(9);

	var _PromptDetection = __webpack_require__(44);

	var _WaterDetection = __webpack_require__(45);

	var _WaterMap = __webpack_require__(47);

	var _Statistics = __webpack_require__(48);

	var _BaselineCalibration = __webpack_require__(50);

	var _SyncHisData = __webpack_require__(51);

	var _SelectAddress = __webpack_require__(52);

	var _DialogStyle = __webpack_require__(43);

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
	        renderConfigData: true, // 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
	        torporTime: 0,
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };
	        het.setTitle(JSON.stringify({ setNavTitle: 0, setNavRightBtnHiden: 0 }));
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.closeDialog = function () {
	            _Actions.Actions.send(3);
	        };
	        _Actions.Actions.getTrigger();
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var errorTip = '检测到汲取的水量不足或未浸入水中';
	            return React.createElement(
	                'section',
	                { className: 'app-body' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF' } }),
	                React.createElement(
	                    'div',
	                    { className: 'app-content' },
	                    this.state.data ? React.createElement(_LoadMainData.LoadMainData, { mydata: this.state.data }) : React.createElement(_PromptDetection.PromptDetection, null)
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: this.state.showerrordialog, submitClock: this.closeDialog.bind(this),
	                    content: errorTip, canCel: false })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('手持式水质检测仪');
	    // 无路由方式
	    //ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/WaterDetection', component: _WaterDetection.WaterDetection }),
	        React.createElement(Route, { path: '/WaterMap', component: _WaterMap.WaterMap }),
	        React.createElement(Route, { path: '/Statistics', component: _Statistics.Statistics }),
	        React.createElement(Route, { path: '/BaselineCalibration', component: _BaselineCalibration.BaselineCalibration }),
	        React.createElement(Route, { path: '/SyncHisData', component: _SyncHisData.SyncHisData }),
	        React.createElement(Route, { path: '/SelectAddress/:address/:longVal/:latVal/:selectIndex/', component: _SelectAddress.SelectAddress })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LoadMainData = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _DataInfo = __webpack_require__(10);

	var _ActionItem = __webpack_require__(42);

	var _DialogStyle = __webpack_require__(43);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by Administrator on 2017-02-24.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var LoadMainData = exports.LoadMainData = function (_BaseComponent) {
	    _inherits(LoadMainData, _BaseComponent);

	    function LoadMainData(props) {
	        _classCallCheck(this, LoadMainData);

	        var _this = _possibleConstructorReturn(this, (LoadMainData.__proto__ || Object.getPrototypeOf(LoadMainData)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store
	        _this.closeDialog = function () {
	            _this.setState({
	                showhelpdialog: false
	            });
	        };
	        _Actions.Actions.getTrigger();
	        return _this;
	    }

	    _createClass(LoadMainData, [{
	        key: 'handleHelp',
	        value: function handleHelp() {
	            this.setState({
	                showhelpdialog: true
	            });
	        }
	    }, {
	        key: 'closeDialog',
	        value: function closeDialog() {
	            this.setState({
	                showhelpdialog: false
	            });
	        }
	    }, {
	        key: 'handleToWaterDetection',
	        value: function handleToWaterDetection() {
	            if (!(this.state.isDeviceConnected || false)) {
	                het.toast('设备未连接');
	                return false;
	            }
	            location.href = '#/waterDetection';
	        }
	    }, {
	        key: 'handleToWaterMap',
	        value: function handleToWaterMap() {
	            location.href = '#/WaterMap';
	        }
	    }, {
	        key: 'handleToStatistics',
	        value: function handleToStatistics() {
	            location.href = '#/Statistics';
	        }
	    }, {
	        key: 'handleToBaseline',
	        value: function handleToBaseline() {
	            if (!(this.state.isDeviceConnected || false)) {
	                het.toast('设备未连接');
	                return false;
	            }
	            location.href = '#/BaselineCalibration';
	        }
	    }, {
	        key: 'getGrade',
	        value: function getGrade(wqiVal) {
	            var gradeVal = void 0;
	            if (wqiVal <= 60) {
	                gradeVal = "差";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeVal = "中";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeVal = "良";
	            } else {
	                gradeVal = "优";
	            }
	            return gradeVal;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var showhelpdialog = this.state.showhelpdialog;
	            var mydata = this.props.mydata || {};

	            var gradeVal = this.getGrade(mydata.wqi);
	            // let dataTime = Funs.dateFormat(mydata.uploadTime, 'yyyy/MM/dd hh:mm', true);
	            var dataTime = mydata.uploadTime || ""; //直接传的北京时间获取的也是北京时间不用转
	            var contentList = ['总溶解固体量即水中无机物（钠、钙等）含量多少的测定值，但很多对人体有害的致病菌这个测试笔是无法测出来的，矿泉水中的有益物质也无法分辨', '总有机碳是用来描述水系统中有机（含碳有机物）污染物的术语。由于有机物是如糖、蔗糖、酒精、石油、PVC、粘结剂、塑料衍生物等化合物，有机污染物有很多来源', '水的色度是对天然水或处理后的各种水进行颜色定量测定时的指标，产生颜色的原因是由于溶于水的腐殖质、有机物或无机物质所造成的', '水中含有泥土、粉砂、微细有机物、无机物、浮游生物等悬浮物和胶体物都可以使水质变的浑浊而呈现一定浊度', '化学需氧量，采用一定的强氧化剂处理水样时，所消耗的氧化剂量。它是表示水中还原性物质多少的一个指标。作为衡量水中有机物质含量多少的指标。化学需氧量越大，说明水体受有机物的污染越严重'];
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'main_top' },
	                    React.createElement(
	                        'div',
	                        { className: 'index_circle_container' },
	                        React.createElement(
	                            'div',
	                            { className: 'index_circle_center' },
	                            React.createElement(
	                                'div',
	                                { className: 'index_data' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'index-grade' },
	                                    '\u6C34\u8D28\u7B49\u7EA7'
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'index-grade-value' },
	                                    gradeVal
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { className: 'index-score' },
	                                    mydata.wqi + "分"
	                                )
	                            ),
	                            React.createElement(
	                                'a',
	                                { className: 'detection', onTouchEnd: this.handleToWaterDetection.bind(this) },
	                                '\u53BB\u68C0\u6D4B'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'index-shuizhi' },
	                        React.createElement(
	                            'span',
	                            { onTouchEnd: this.handleHelp.bind(this) },
	                            '\u6C34\u8D28\u6307\u6807',
	                            React.createElement(
	                                'i',
	                                null,
	                                '?'
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            null,
	                            dataTime
	                        )
	                    ),
	                    React.createElement(_DataInfo.DataInfo, {
	                        styleMode: '0',
	                        myData: mydata
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'index-item-container' },
	                    React.createElement(_ActionItem.ActionItem, { textVal: '\u6C34\u8D28\u5730\u56FE', touchEnd: this.handleToWaterMap.bind(this) }),
	                    React.createElement(_ActionItem.ActionItem, { textVal: '\u7EDF\u8BA1', touchEnd: this.handleToStatistics.bind(this) }),
	                    React.createElement(_ActionItem.ActionItem, { textVal: '\u57FA\u7EBF\u6821\u51C6', touchEnd: this.handleToBaseline.bind(this) })
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: showhelpdialog, submitClock: this.closeDialog.bind(this),
	                    contentList: contentList, canCel: false })
	            );
	        }
	    }]);

	    return LoadMainData;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataInfo = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(11);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DataInfo = exports.DataInfo = function (_React$Component) {
	    _inherits(DataInfo, _React$Component);

	    function DataInfo(props) {
	        _classCallCheck(this, DataInfo);

	        return _possibleConstructorReturn(this, (DataInfo.__proto__ || Object.getPrototypeOf(DataInfo)).call(this, props));
	    }

	    _createClass(DataInfo, [{
	        key: 'render',
	        value: function render() {
	            var styleMode = this.props.styleMode !== undefined ? this.props.styleMode : 0; //样式判断 0:首页 1：统计页面 2：水质检测页面

	            var tocVal = this.props.myData.toc ? this.props.myData.toc : '0',
	                //toc
	            codVal = this.props.myData.cod ? this.props.myData.cod : '0',
	                //cod
	            chromaVal = this.props.myData.chroma ? this.props.myData.chroma : '0',
	                //色度
	            turbidityVal = this.props.myData.turbidity ? this.props.myData.turbidity : '0',
	                //浊度
	            tdsVal = this.props.myData.tds ? this.props.myData.tds : '0',
	                //tds
	            tempVal = this.props.myData.temperature ? this.props.myData.temperature : '0'; //温度

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: styleMode == 0 ? "tableCell flex" : styleMode == 1 ? "tableCell flex tableCell-statistics" : "tableCell flex tableCell-detection" },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'flex-cell' },
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                tdsVal
	                            ),
	                            'mg/L'
	                        ),
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            'TDS'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'flex-cell centerCell' },
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                tocVal
	                            ),
	                            'mg/L'
	                        ),
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            'TOC'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'flex-cell' },
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                codVal
	                            ),
	                            'mg/L'
	                        ),
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            'COD'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: styleMode == 0 ? "tableCell flex" : styleMode == 1 ? "tableCell flex tableCell-statistics" : "tableCell flex tableCell-detection" },
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'flex-cell' },
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                chromaVal
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '\u8272\u5EA6'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'flex-cell centerCell' },
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                turbidityVal
	                            ),
	                            'NTU'
	                        ),
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '\u6D4A\u5EA6'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'dl',
	                        { className: 'flex-cell' },
	                        _react2.default.createElement(
	                            'dd',
	                            null,
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                tempVal
	                            ),
	                            '\xB0C'
	                        ),
	                        _react2.default.createElement(
	                            'dt',
	                            null,
	                            '\u6E29\u5EA6'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return DataInfo;
	}(_react2.default.Component);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(12);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(14);

	var ReactChildren = __webpack_require__(15);
	var ReactComponent = __webpack_require__(28);
	var ReactPureComponent = __webpack_require__(31);
	var ReactClass = __webpack_require__(32);
	var ReactDOMFactories = __webpack_require__(34);
	var ReactElement = __webpack_require__(19);
	var ReactPropTypes = __webpack_require__(39);
	var ReactVersion = __webpack_require__(40);

	var onlyChild = __webpack_require__(41);
	var warning = __webpack_require__(21);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(35);
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var __spread = _assign;

	if (process.env.NODE_ENV !== 'production') {
	  var warned = false;
	  __spread = function () {
	    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
	    warned = true;
	    return _assign.apply(null, arguments);
	  };
	}

	var React = {

	  // Modern

	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    toArray: ReactChildren.toArray,
	    only: onlyChild
	  },

	  Component: ReactComponent,
	  PureComponent: ReactPureComponent,

	  createElement: createElement,
	  cloneElement: cloneElement,
	  isValidElement: ReactElement.isValidElement,

	  // Classic

	  PropTypes: ReactPropTypes,
	  createClass: ReactClass.createClass,
	  createFactory: createFactory,
	  createMixin: function (mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },

	  // This looks DOM specific but these are actually isomorphic helpers
	  // since they are just generating DOM strings.
	  DOM: ReactDOMFactories,

	  version: ReactVersion,

	  // Deprecated hook for JSX spread, don't use this for anything.
	  __spread: __spread
	};

	module.exports = React;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 13 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var PooledClass = __webpack_require__(16);
	var ReactElement = __webpack_require__(19);

	var emptyFunction = __webpack_require__(22);
	var traverseAllChildren = __webpack_require__(25);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var fourArgumentPooler = PooledClass.fourArgumentPooler;

	var userProvidedKeyEscapeRegex = /\/+/g;
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.func = forEachFunction;
	  this.context = forEachContext;
	  this.count = 0;
	}
	ForEachBookKeeping.prototype.destructor = function () {
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(bookKeeping, child, name) {
	  var func = bookKeeping.func,
	      context = bookKeeping.context;

	  func.call(context, child, bookKeeping.count++);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }
	  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
	  this.result = mapResult;
	  this.keyPrefix = keyPrefix;
	  this.func = mapFunction;
	  this.context = mapContext;
	  this.count = 0;
	}
	MapBookKeeping.prototype.destructor = function () {
	  this.result = null;
	  this.keyPrefix = null;
	  this.func = null;
	  this.context = null;
	  this.count = 0;
	};
	PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

	function mapSingleChildIntoContext(bookKeeping, child, childKey) {
	  var result = bookKeeping.result,
	      keyPrefix = bookKeeping.keyPrefix,
	      func = bookKeeping.func,
	      context = bookKeeping.context;


	  var mappedChild = func.call(context, child, bookKeeping.count++);
	  if (Array.isArray(mappedChild)) {
	    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
	  } else if (mappedChild != null) {
	    if (ReactElement.isValidElement(mappedChild)) {
	      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
	      // Keep both the (mapped) and old keys if they differ, just as
	      // traverseAllChildren used to do for objects as children
	      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
	    }
	    result.push(mappedChild);
	  }
	}

	function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
	  var escapedPrefix = '';
	  if (prefix != null) {
	    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
	  }
	  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func The map function.
	 * @param {*} context Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
	  return result;
	}

	function forEachSingleChildDummy(traverseContext, child, name) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	/**
	 * Flatten a children object (typically specified as `props.children`) and
	 * return an array with appropriately re-keyed children.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
	 */
	function toArray(children) {
	  var result = [];
	  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
	  return result;
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
	  count: countChildren,
	  toArray: toArray
	};

	module.exports = ReactChildren;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(17);

	var invariant = __webpack_require__(18);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function (copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function (a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function (a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fourArgumentPooler = function (a1, a2, a3, a4) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4);
	  }
	};

	var standardReleaser = function (instance) {
	  var Klass = this;
	  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
	  instance.destructor();
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances.
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function (CopyConstructor, pooler) {
	  // Casting as any so that flow ignores the actual implementation and trusts
	  // it to match the type we declared
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fourArgumentPooler: fourArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */
	'use strict';

	/**
	 * WARNING: DO NOT manually require this module.
	 * This is a replacement for `invariant(...)` used by the error code system
	 * and will _only_ be required by the corresponding babel pass.
	 * It always throws.
	 */

	function reactProdInvariant(code) {
	  var argCount = arguments.length - 1;

	  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

	  for (var argIdx = 0; argIdx < argCount; argIdx++) {
	    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
	  }

	  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

	  var error = new Error(message);
	  error.name = 'Invariant Violation';
	  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

	  throw error;
	}

	module.exports = reactProdInvariant;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	if (process.env.NODE_ENV !== 'production') {
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(14);

	var ReactCurrentOwner = __webpack_require__(20);

	var warning = __webpack_require__(21);
	var canDefineProperty = __webpack_require__(23);
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var REACT_ELEMENT_TYPE = __webpack_require__(24);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};

	var specialPropKeyWarningShown, specialPropRefWarningShown;

	function hasValidRef(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }
	  return config.key !== undefined;
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  var warnAboutAccessingKey = function () {
	    if (!specialPropKeyWarningShown) {
	      specialPropKeyWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingKey.isReactWarning = true;
	  Object.defineProperty(props, 'key', {
	    get: warnAboutAccessingKey,
	    configurable: true
	  });
	}

	function defineRefPropWarningGetter(props, displayName) {
	  var warnAboutAccessingRef = function () {
	    if (!specialPropRefWarningShown) {
	      specialPropRefWarningShown = true;
	      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
	    }
	  };
	  warnAboutAccessingRef.isReactWarning = true;
	  Object.defineProperty(props, 'ref', {
	    get: warnAboutAccessingRef,
	    configurable: true
	  });
	}

	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, no instanceof check
	 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @param {*} owner
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allow us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,

	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,

	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  if (process.env.NODE_ENV !== 'production') {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    if (canDefineProperty) {
	      Object.defineProperty(element._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true,
	        value: false
	      });
	      // self and source are DEV only properties.
	      Object.defineProperty(element, '_self', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: self
	      });
	      // Two elements created in two different places should be considered
	      // equal for testing purposes and therefore we hide it from enumeration.
	      Object.defineProperty(element, '_source', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: source
	      });
	    } else {
	      element._store.validated = false;
	      element._self = self;
	      element._source = source;
	    }
	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};

	/**
	 * Create and return a new ReactElement of the given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
	 */
	ReactElement.createElement = function (type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;
	  var self = null;
	  var source = null;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      ref = config.ref;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    self = config.__self === undefined ? null : config.__self;
	    source = config.__source === undefined ? null : config.__source;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    if (process.env.NODE_ENV !== 'production') {
	      if (Object.freeze) {
	        Object.freeze(childArray);
	      }
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (props[propName] === undefined) {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    if (key || ref) {
	      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
	        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
	        if (key) {
	          defineKeyPropWarningGetter(props, displayName);
	        }
	        if (ref) {
	          defineRefPropWarningGetter(props, displayName);
	        }
	      }
	    }
	  }
	  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	};

	/**
	 * Return a function that produces ReactElements of a given type.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
	 */
	ReactElement.createFactory = function (type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
	  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

	  return newElement;
	};

	/**
	 * Clone and return a new ReactElement using element as the starting point.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
	 */
	ReactElement.cloneElement = function (element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = _assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;
	  // Self is preserved since the owner is preserved.
	  var self = element._self;
	  // Source is preserved since cloneElement is unlikely to be targeted by a
	  // transpiler, and the original source is probably a better indicator of the
	  // true owner.
	  var source = element._source;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (hasValidRef(config)) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (hasValidKey(config)) {
	      key = '' + config.key;
	    }

	    // Remaining properties override existing props
	    var defaultProps;
	    if (element.type && element.type.defaultProps) {
	      defaultProps = element.type.defaultProps;
	    }
	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        if (config[propName] === undefined && defaultProps !== undefined) {
	          // Resolve default props
	          props[propName] = defaultProps[propName];
	        } else {
	          props[propName] = config[propName];
	        }
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return ReactElement(element.type, key, ref, self, source, owner, props);
	};

	/**
	 * Verifies the object is a ReactElement.
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function (object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	};

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyFunction = __webpack_require__(22);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var printWarning = function printWarning(format) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    };

	    warning = function warning(condition, format) {
	      if (format === undefined) {
	        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	      }

	      if (format.indexOf('Failed Composite propType: ') === 0) {
	        return; // Ignore CompositeComponent proptype check.
	      }

	      if (!condition) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	          args[_key2 - 2] = arguments[_key2];
	        }

	        printWarning.apply(undefined, [format].concat(args));
	      }
	    };
	  })();
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    // $FlowFixMe https://github.com/facebook/flow/issues/285
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.

	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	module.exports = REACT_ELEMENT_TYPE;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(17);

	var ReactCurrentOwner = __webpack_require__(20);
	var REACT_ELEMENT_TYPE = __webpack_require__(24);

	var getIteratorFn = __webpack_require__(26);
	var invariant = __webpack_require__(18);
	var KeyEscapeUtils = __webpack_require__(27);
	var warning = __webpack_require__(21);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

	/**
	 * This is inlined from ReactElement since this file is shared between
	 * isomorphic and renderers. We could extract this to a
	 *
	 */

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var didWarnAboutMaps = false;

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  // Do some typechecking here since we call this blindly. We want to ensure
	  // that we don't block potential future ES APIs.
	  if (component && typeof component === 'object' && component.key != null) {
	    // Explicit key
	    return KeyEscapeUtils.escape(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null || type === 'string' || type === 'number' ||
	  // The following is inlined from ReactElement. This means we can optimize
	  // some checks. React Fiber also inlines this logic for similar purposes.
	  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
	    callback(traverseContext, children,
	    // If it's the only child, treat the name as if it was wrapped in an array
	    // so that it's consistent if the number of children grows.
	    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
	    return 1;
	  }

	  var child;
	  var nextName;
	  var subtreeCount = 0; // Count of children found in the current subtree.
	  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = nextNamePrefix + getComponentKey(child, i);
	      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = nextNamePrefix + getComponentKey(child, ii++);
	          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	        }
	      } else {
	        if (process.env.NODE_ENV !== 'production') {
	          var mapsAsChildrenAddendum = '';
	          if (ReactCurrentOwner.current) {
	            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
	            if (mapsAsChildrenOwnerName) {
	              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
	            }
	          }
	          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
	            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
	          }
	        }
	      }
	    } else if (type === 'object') {
	      var addendum = '';
	      if (process.env.NODE_ENV !== 'production') {
	        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
	        if (children._isReactElement) {
	          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
	        }
	        if (ReactCurrentOwner.current) {
	          var name = ReactCurrentOwner.current.getName();
	          if (name) {
	            addendum += ' Check the render method of `' + name + '`.';
	          }
	        }
	      }
	      var childrenString = String(children);
	       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', callback, traverseContext);
	}

	module.exports = traverseAllChildren;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/* global Symbol */

	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;

/***/ },
/* 27 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	/**
	 * Escape and wrap key so it is safe to use as a reactid
	 *
	 * @param {string} key to be escaped.
	 * @return {string} the escaped key.
	 */

	function escape(key) {
	  var escapeRegex = /[=:]/g;
	  var escaperLookup = {
	    '=': '=0',
	    ':': '=2'
	  };
	  var escapedString = ('' + key).replace(escapeRegex, function (match) {
	    return escaperLookup[match];
	  });

	  return '$' + escapedString;
	}

	/**
	 * Unescape and unwrap key for human-readable display
	 *
	 * @param {string} key to unescape.
	 * @return {string} the unescaped key.
	 */
	function unescape(key) {
	  var unescapeRegex = /(=0|=2)/g;
	  var unescaperLookup = {
	    '=0': '=',
	    '=2': ':'
	  };
	  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

	  return ('' + keySubstring).replace(unescapeRegex, function (match) {
	    return unescaperLookup[match];
	  });
	}

	var KeyEscapeUtils = {
	  escape: escape,
	  unescape: unescape
	};

	module.exports = KeyEscapeUtils;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(17);

	var ReactNoopUpdateQueue = __webpack_require__(29);

	var canDefineProperty = __webpack_require__(23);
	var emptyObject = __webpack_require__(30);
	var invariant = __webpack_require__(18);
	var warning = __webpack_require__(21);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context, updater) {
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	ReactComponent.prototype.isReactComponent = {};

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function (partialState, callback) {
	  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
	  this.updater.enqueueSetState(this, partialState);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'setState');
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function (callback) {
	  this.updater.enqueueForceUpdate(this);
	  if (callback) {
	    this.updater.enqueueCallback(this, callback, 'forceUpdate');
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (process.env.NODE_ENV !== 'production') {
	  var deprecatedAPIs = {
	    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
	    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
	  };
	  var defineDeprecationWarning = function (methodName, info) {
	    if (canDefineProperty) {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function () {
	          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
	          return undefined;
	        }
	      });
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var warning = __webpack_require__(21);

	function warnNoop(publicInstance, callerName) {
	  if (process.env.NODE_ENV !== 'production') {
	    var constructor = publicInstance.constructor;
	    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
	  }
	}

	/**
	 * This is the abstract API for an update queue.
	 */
	var ReactNoopUpdateQueue = {

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @param {ReactClass} publicInstance The instance we want to test.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function (publicInstance) {
	    return false;
	  },

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function (publicInstance, callback) {},

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldComponentUpdate`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function (publicInstance) {
	    warnNoop(publicInstance, 'forceUpdate');
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function (publicInstance, completeState) {
	    warnNoop(publicInstance, 'replaceState');
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function (publicInstance, partialState) {
	    warnNoop(publicInstance, 'setState');
	  }
	};

	module.exports = ReactNoopUpdateQueue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var emptyObject = {};

	if (process.env.NODE_ENV !== 'production') {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _assign = __webpack_require__(14);

	var ReactComponent = __webpack_require__(28);
	var ReactNoopUpdateQueue = __webpack_require__(29);

	var emptyObject = __webpack_require__(30);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactPureComponent(props, context, updater) {
	  // Duplicated from ReactComponent.
	  this.props = props;
	  this.context = context;
	  this.refs = emptyObject;
	  // We initialize the default updater but the real one gets injected by the
	  // renderer.
	  this.updater = updater || ReactNoopUpdateQueue;
	}

	function ComponentDummy() {}
	ComponentDummy.prototype = ReactComponent.prototype;
	ReactPureComponent.prototype = new ComponentDummy();
	ReactPureComponent.prototype.constructor = ReactPureComponent;
	// Avoid an extra prototype jump for these methods.
	_assign(ReactPureComponent.prototype, ReactComponent.prototype);
	ReactPureComponent.prototype.isPureReactComponent = true;

	module.exports = ReactPureComponent;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(17),
	    _assign = __webpack_require__(14);

	var ReactComponent = __webpack_require__(28);
	var ReactElement = __webpack_require__(19);
	var ReactPropTypeLocationNames = __webpack_require__(33);
	var ReactNoopUpdateQueue = __webpack_require__(29);

	var emptyObject = __webpack_require__(30);
	var invariant = __webpack_require__(18);
	var warning = __webpack_require__(21);

	var MIXINS_KEY = 'mixins';

	// Helper function to allow the creation of anonymous functions which do not
	// have .name set to the name of the variable being assigned to.
	function identity(fn) {
	  return fn;
	}

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */


	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or host components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will be available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: 'DEFINE_MANY',

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: 'DEFINE_MANY',

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: 'DEFINE_MANY',

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: 'DEFINE_MANY',

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: 'DEFINE_MANY',

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: 'DEFINE_MANY_MERGED',

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: 'DEFINE_MANY_MERGED',

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: 'DEFINE_MANY_MERGED',

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: 'DEFINE_ONCE',

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: 'DEFINE_MANY',

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: 'DEFINE_MANY',

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: 'DEFINE_MANY',

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: 'DEFINE_ONCE',

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: 'DEFINE_MANY',

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: 'DEFINE_MANY',

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: 'DEFINE_MANY',

	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: 'OVERRIDE_BASE'

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function (Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function (Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function (Constructor, childContextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, childContextTypes, 'childContext');
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, 'context');
	    }
	    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function (Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function (Constructor, propTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, propTypes, 'prop');
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but only in __DEV__
	      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
	    }
	  }
	}

	function validateMethodOverride(isAlreadyDefined, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classes.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    if (process.env.NODE_ENV !== 'production') {
	      var typeofSpec = typeof spec;
	      var isMixinValid = typeofSpec === 'object' && spec !== null;

	      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
	    }

	    return;
	  }

	  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
	  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

	  var proto = Constructor.prototype;
	  var autoBindPairs = proto.__reactAutoBindPairs;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above.
	      continue;
	    }

	    var property = spec[name];
	    var isAlreadyDefined = proto.hasOwnProperty(name);
	    validateMethodOverride(isAlreadyDefined, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

	      if (shouldAutoBind) {
	        autoBindPairs.push(name, property);
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride.
	          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === 'DEFINE_MANY_MERGED') {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === 'DEFINE_MANY') {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (process.env.NODE_ENV !== 'production') {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

	    var isInherited = name in Constructor;
	    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (process.env.NODE_ENV !== 'production') {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    boundMethod.bind = function (newThis) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
	      } else if (!args.length) {
	        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  var pairs = component.__reactAutoBindPairs;
	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];
	    var method = pairs[i + 1];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function (newState, callback) {
	    this.updater.enqueueReplaceState(this, newState);
	    if (callback) {
	      this.updater.enqueueCallback(this, callback, 'replaceState');
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function () {
	    return this.updater.isMounted(this);
	  }
	};

	var ReactClassComponent = function () {};
	_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function (spec) {
	    // To keep our warnings more understandable, we'll use a little hack here to
	    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
	    // unnecessarily identify a class without displayName as 'Constructor'.
	    var Constructor = identity(function (props, context, updater) {
	      // This constructor gets overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (process.env.NODE_ENV !== 'production') {
	        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindPairs.length) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.refs = emptyObject;
	      this.updater = updater || ReactNoopUpdateQueue;

	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (process.env.NODE_ENV !== 'production') {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (initialState === undefined && this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

	      this.state = initialState;
	    });
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;
	    Constructor.prototype.__reactAutoBindPairs = [];

	    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged.
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

	    if (process.env.NODE_ENV !== 'production') {
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
	      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function (mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (process.env.NODE_ENV !== 'production') {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var ReactElement = __webpack_require__(19);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */
	var createDOMFactory = ReactElement.createFactory;
	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(35);
	  createDOMFactory = ReactElementValidator.createFactory;
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOMFactories = {
	  a: createDOMFactory('a'),
	  abbr: createDOMFactory('abbr'),
	  address: createDOMFactory('address'),
	  area: createDOMFactory('area'),
	  article: createDOMFactory('article'),
	  aside: createDOMFactory('aside'),
	  audio: createDOMFactory('audio'),
	  b: createDOMFactory('b'),
	  base: createDOMFactory('base'),
	  bdi: createDOMFactory('bdi'),
	  bdo: createDOMFactory('bdo'),
	  big: createDOMFactory('big'),
	  blockquote: createDOMFactory('blockquote'),
	  body: createDOMFactory('body'),
	  br: createDOMFactory('br'),
	  button: createDOMFactory('button'),
	  canvas: createDOMFactory('canvas'),
	  caption: createDOMFactory('caption'),
	  cite: createDOMFactory('cite'),
	  code: createDOMFactory('code'),
	  col: createDOMFactory('col'),
	  colgroup: createDOMFactory('colgroup'),
	  data: createDOMFactory('data'),
	  datalist: createDOMFactory('datalist'),
	  dd: createDOMFactory('dd'),
	  del: createDOMFactory('del'),
	  details: createDOMFactory('details'),
	  dfn: createDOMFactory('dfn'),
	  dialog: createDOMFactory('dialog'),
	  div: createDOMFactory('div'),
	  dl: createDOMFactory('dl'),
	  dt: createDOMFactory('dt'),
	  em: createDOMFactory('em'),
	  embed: createDOMFactory('embed'),
	  fieldset: createDOMFactory('fieldset'),
	  figcaption: createDOMFactory('figcaption'),
	  figure: createDOMFactory('figure'),
	  footer: createDOMFactory('footer'),
	  form: createDOMFactory('form'),
	  h1: createDOMFactory('h1'),
	  h2: createDOMFactory('h2'),
	  h3: createDOMFactory('h3'),
	  h4: createDOMFactory('h4'),
	  h5: createDOMFactory('h5'),
	  h6: createDOMFactory('h6'),
	  head: createDOMFactory('head'),
	  header: createDOMFactory('header'),
	  hgroup: createDOMFactory('hgroup'),
	  hr: createDOMFactory('hr'),
	  html: createDOMFactory('html'),
	  i: createDOMFactory('i'),
	  iframe: createDOMFactory('iframe'),
	  img: createDOMFactory('img'),
	  input: createDOMFactory('input'),
	  ins: createDOMFactory('ins'),
	  kbd: createDOMFactory('kbd'),
	  keygen: createDOMFactory('keygen'),
	  label: createDOMFactory('label'),
	  legend: createDOMFactory('legend'),
	  li: createDOMFactory('li'),
	  link: createDOMFactory('link'),
	  main: createDOMFactory('main'),
	  map: createDOMFactory('map'),
	  mark: createDOMFactory('mark'),
	  menu: createDOMFactory('menu'),
	  menuitem: createDOMFactory('menuitem'),
	  meta: createDOMFactory('meta'),
	  meter: createDOMFactory('meter'),
	  nav: createDOMFactory('nav'),
	  noscript: createDOMFactory('noscript'),
	  object: createDOMFactory('object'),
	  ol: createDOMFactory('ol'),
	  optgroup: createDOMFactory('optgroup'),
	  option: createDOMFactory('option'),
	  output: createDOMFactory('output'),
	  p: createDOMFactory('p'),
	  param: createDOMFactory('param'),
	  picture: createDOMFactory('picture'),
	  pre: createDOMFactory('pre'),
	  progress: createDOMFactory('progress'),
	  q: createDOMFactory('q'),
	  rp: createDOMFactory('rp'),
	  rt: createDOMFactory('rt'),
	  ruby: createDOMFactory('ruby'),
	  s: createDOMFactory('s'),
	  samp: createDOMFactory('samp'),
	  script: createDOMFactory('script'),
	  section: createDOMFactory('section'),
	  select: createDOMFactory('select'),
	  small: createDOMFactory('small'),
	  source: createDOMFactory('source'),
	  span: createDOMFactory('span'),
	  strong: createDOMFactory('strong'),
	  style: createDOMFactory('style'),
	  sub: createDOMFactory('sub'),
	  summary: createDOMFactory('summary'),
	  sup: createDOMFactory('sup'),
	  table: createDOMFactory('table'),
	  tbody: createDOMFactory('tbody'),
	  td: createDOMFactory('td'),
	  textarea: createDOMFactory('textarea'),
	  tfoot: createDOMFactory('tfoot'),
	  th: createDOMFactory('th'),
	  thead: createDOMFactory('thead'),
	  time: createDOMFactory('time'),
	  title: createDOMFactory('title'),
	  tr: createDOMFactory('tr'),
	  track: createDOMFactory('track'),
	  u: createDOMFactory('u'),
	  ul: createDOMFactory('ul'),
	  'var': createDOMFactory('var'),
	  video: createDOMFactory('video'),
	  wbr: createDOMFactory('wbr'),

	  // SVG
	  circle: createDOMFactory('circle'),
	  clipPath: createDOMFactory('clipPath'),
	  defs: createDOMFactory('defs'),
	  ellipse: createDOMFactory('ellipse'),
	  g: createDOMFactory('g'),
	  image: createDOMFactory('image'),
	  line: createDOMFactory('line'),
	  linearGradient: createDOMFactory('linearGradient'),
	  mask: createDOMFactory('mask'),
	  path: createDOMFactory('path'),
	  pattern: createDOMFactory('pattern'),
	  polygon: createDOMFactory('polygon'),
	  polyline: createDOMFactory('polyline'),
	  radialGradient: createDOMFactory('radialGradient'),
	  rect: createDOMFactory('rect'),
	  stop: createDOMFactory('stop'),
	  svg: createDOMFactory('svg'),
	  text: createDOMFactory('text'),
	  tspan: createDOMFactory('tspan')
	};

	module.exports = ReactDOMFactories;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(20);
	var ReactComponentTreeHook = __webpack_require__(36);
	var ReactElement = __webpack_require__(19);

	var checkReactTypeSpec = __webpack_require__(37);

	var canDefineProperty = __webpack_require__(23);
	var getIteratorFn = __webpack_require__(26);
	var warning = __webpack_require__(21);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  var info = getDeclarationErrorAddendum();

	  if (!info) {
	    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
	    if (parentName) {
	      info = ' Check the top-level render call using <' + parentName + '>.';
	    }
	  }
	  return info;
	}

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (!element._store || element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

	  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
	  if (memoizer[currentComponentErrorInfo]) {
	    return;
	  }
	  memoizer[currentComponentErrorInfo] = true;

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwner = '';
	  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
	    // Give the component that originally created this child.
	    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
	  }

	  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (typeof node !== 'object') {
	    return;
	  }
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    if (node._store) {
	      node._store.validated = true;
	    }
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  var componentClass = element.type;
	  if (typeof componentClass !== 'function') {
	    return;
	  }
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
	  }
	}

	var ReactElementValidator = {

	  createElement: function (type, props, children) {
	    var validType = typeof type === 'string' || typeof type === 'function';
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    if (!validType) {
	      if (typeof type !== 'function' && typeof type !== 'string') {
	        var info = '';
	        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
	        }
	        info += getDeclarationErrorAddendum();
	        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
	      }
	    }

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)
	    if (validType) {
	      for (var i = 2; i < arguments.length; i++) {
	        validateChildKeys(arguments[i], type);
	      }
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function (type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (process.env.NODE_ENV !== 'production') {
	      if (canDefineProperty) {
	        Object.defineProperty(validatedFactory, 'type', {
	          enumerable: false,
	          get: function () {
	            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
	            Object.defineProperty(this, 'type', {
	              value: type
	            });
	            return type;
	          }
	        });
	      }
	    }

	    return validatedFactory;
	  },

	  cloneElement: function (element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(17);

	var ReactCurrentOwner = __webpack_require__(20);

	var invariant = __webpack_require__(18);
	var warning = __webpack_require__(21);

	function isNative(fn) {
	  // Based on isNative() from Lodash
	  var funcToString = Function.prototype.toString;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	  var reIsNative = RegExp('^' + funcToString
	  // Take an example native function source for comparison
	  .call(hasOwnProperty)
	  // Strip regex characters so we can use it for regex
	  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  // Remove hasOwnProperty from the template to make it generic
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	  try {
	    var source = funcToString.call(fn);
	    return reIsNative.test(source);
	  } catch (err) {
	    return false;
	  }
	}

	var canUseCollections =
	// Array.from
	typeof Array.from === 'function' &&
	// Map
	typeof Map === 'function' && isNative(Map) &&
	// Map.prototype.keys
	Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
	// Set
	typeof Set === 'function' && isNative(Set) &&
	// Set.prototype.keys
	Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

	var setItem;
	var getItem;
	var removeItem;
	var getItemIDs;
	var addRoot;
	var removeRoot;
	var getRootIDs;

	if (canUseCollections) {
	  var itemMap = new Map();
	  var rootIDSet = new Set();

	  setItem = function (id, item) {
	    itemMap.set(id, item);
	  };
	  getItem = function (id) {
	    return itemMap.get(id);
	  };
	  removeItem = function (id) {
	    itemMap['delete'](id);
	  };
	  getItemIDs = function () {
	    return Array.from(itemMap.keys());
	  };

	  addRoot = function (id) {
	    rootIDSet.add(id);
	  };
	  removeRoot = function (id) {
	    rootIDSet['delete'](id);
	  };
	  getRootIDs = function () {
	    return Array.from(rootIDSet.keys());
	  };
	} else {
	  var itemByKey = {};
	  var rootByKey = {};

	  // Use non-numeric keys to prevent V8 performance issues:
	  // https://github.com/facebook/react/pull/7232
	  var getKeyFromID = function (id) {
	    return '.' + id;
	  };
	  var getIDFromKey = function (key) {
	    return parseInt(key.substr(1), 10);
	  };

	  setItem = function (id, item) {
	    var key = getKeyFromID(id);
	    itemByKey[key] = item;
	  };
	  getItem = function (id) {
	    var key = getKeyFromID(id);
	    return itemByKey[key];
	  };
	  removeItem = function (id) {
	    var key = getKeyFromID(id);
	    delete itemByKey[key];
	  };
	  getItemIDs = function () {
	    return Object.keys(itemByKey).map(getIDFromKey);
	  };

	  addRoot = function (id) {
	    var key = getKeyFromID(id);
	    rootByKey[key] = true;
	  };
	  removeRoot = function (id) {
	    var key = getKeyFromID(id);
	    delete rootByKey[key];
	  };
	  getRootIDs = function () {
	    return Object.keys(rootByKey).map(getIDFromKey);
	  };
	}

	var unmountedIDs = [];

	function purgeDeep(id) {
	  var item = getItem(id);
	  if (item) {
	    var childIDs = item.childIDs;

	    removeItem(id);
	    childIDs.forEach(purgeDeep);
	  }
	}

	function describeComponentFrame(name, source, ownerName) {
	  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
	}

	function getDisplayName(element) {
	  if (element == null) {
	    return '#empty';
	  } else if (typeof element === 'string' || typeof element === 'number') {
	    return '#text';
	  } else if (typeof element.type === 'string') {
	    return element.type;
	  } else {
	    return element.type.displayName || element.type.name || 'Unknown';
	  }
	}

	function describeID(id) {
	  var name = ReactComponentTreeHook.getDisplayName(id);
	  var element = ReactComponentTreeHook.getElement(id);
	  var ownerID = ReactComponentTreeHook.getOwnerID(id);
	  var ownerName;
	  if (ownerID) {
	    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
	  }
	  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
	  return describeComponentFrame(name, element && element._source, ownerName);
	}

	var ReactComponentTreeHook = {
	  onSetChildren: function (id, nextChildIDs) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.childIDs = nextChildIDs;

	    for (var i = 0; i < nextChildIDs.length; i++) {
	      var nextChildID = nextChildIDs[i];
	      var nextChild = getItem(nextChildID);
	      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
	      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
	      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
	      if (nextChild.parentID == null) {
	        nextChild.parentID = id;
	        // TODO: This shouldn't be necessary but mounting a new root during in
	        // componentWillMount currently causes not-yet-mounted components to
	        // be purged from our tree data so their parent id is missing.
	      }
	      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
	    }
	  },
	  onBeforeMountComponent: function (id, element, parentID) {
	    var item = {
	      element: element,
	      parentID: parentID,
	      text: null,
	      childIDs: [],
	      isMounted: false,
	      updateCount: 0
	    };
	    setItem(id, item);
	  },
	  onBeforeUpdateComponent: function (id, element) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.element = element;
	  },
	  onMountComponent: function (id) {
	    var item = getItem(id);
	    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
	    item.isMounted = true;
	    var isRoot = item.parentID === 0;
	    if (isRoot) {
	      addRoot(id);
	    }
	  },
	  onUpdateComponent: function (id) {
	    var item = getItem(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.updateCount++;
	  },
	  onUnmountComponent: function (id) {
	    var item = getItem(id);
	    if (item) {
	      // We need to check if it exists.
	      // `item` might not exist if it is inside an error boundary, and a sibling
	      // error boundary child threw while mounting. Then this instance never
	      // got a chance to mount, but it still gets an unmounting event during
	      // the error boundary cleanup.
	      item.isMounted = false;
	      var isRoot = item.parentID === 0;
	      if (isRoot) {
	        removeRoot(id);
	      }
	    }
	    unmountedIDs.push(id);
	  },
	  purgeUnmountedComponents: function () {
	    if (ReactComponentTreeHook._preventPurging) {
	      // Should only be used for testing.
	      return;
	    }

	    for (var i = 0; i < unmountedIDs.length; i++) {
	      var id = unmountedIDs[i];
	      purgeDeep(id);
	    }
	    unmountedIDs.length = 0;
	  },
	  isMounted: function (id) {
	    var item = getItem(id);
	    return item ? item.isMounted : false;
	  },
	  getCurrentStackAddendum: function (topElement) {
	    var info = '';
	    if (topElement) {
	      var name = getDisplayName(topElement);
	      var owner = topElement._owner;
	      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
	    }

	    var currentOwner = ReactCurrentOwner.current;
	    var id = currentOwner && currentOwner._debugID;

	    info += ReactComponentTreeHook.getStackAddendumByID(id);
	    return info;
	  },
	  getStackAddendumByID: function (id) {
	    var info = '';
	    while (id) {
	      info += describeID(id);
	      id = ReactComponentTreeHook.getParentID(id);
	    }
	    return info;
	  },
	  getChildIDs: function (id) {
	    var item = getItem(id);
	    return item ? item.childIDs : [];
	  },
	  getDisplayName: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element) {
	      return null;
	    }
	    return getDisplayName(element);
	  },
	  getElement: function (id) {
	    var item = getItem(id);
	    return item ? item.element : null;
	  },
	  getOwnerID: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (!element || !element._owner) {
	      return null;
	    }
	    return element._owner._debugID;
	  },
	  getParentID: function (id) {
	    var item = getItem(id);
	    return item ? item.parentID : null;
	  },
	  getSource: function (id) {
	    var item = getItem(id);
	    var element = item ? item.element : null;
	    var source = element != null ? element._source : null;
	    return source;
	  },
	  getText: function (id) {
	    var element = ReactComponentTreeHook.getElement(id);
	    if (typeof element === 'string') {
	      return element;
	    } else if (typeof element === 'number') {
	      return '' + element;
	    } else {
	      return null;
	    }
	  },
	  getUpdateCount: function (id) {
	    var item = getItem(id);
	    return item ? item.updateCount : 0;
	  },


	  getRootIDs: getRootIDs,
	  getRegisteredIDs: getItemIDs
	};

	module.exports = ReactComponentTreeHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(17);

	var ReactPropTypeLocationNames = __webpack_require__(33);
	var ReactPropTypesSecret = __webpack_require__(38);

	var invariant = __webpack_require__(18);
	var warning = __webpack_require__(21);

	var ReactComponentTreeHook;

	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(36);
	}

	var loggedTypeFailures = {};

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?object} element The React element that is being type-checked
	 * @param {?number} debugID The React component instance that is being type-checked
	 * @private
	 */
	function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
	  for (var typeSpecName in typeSpecs) {
	    if (typeSpecs.hasOwnProperty(typeSpecName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
	        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	      } catch (ex) {
	        error = ex;
	      }
	      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var componentStackInfo = '';

	        if (process.env.NODE_ENV !== 'production') {
	          if (!ReactComponentTreeHook) {
	            ReactComponentTreeHook = __webpack_require__(36);
	          }
	          if (debugID !== null) {
	            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
	          } else if (element !== null) {
	            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
	          }
	        }

	        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
	      }
	    }
	  }
	}

	module.exports = checkReactTypeSpec;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * 
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	var ReactElement = __webpack_require__(19);
	var ReactPropTypeLocationNames = __webpack_require__(33);
	var ReactPropTypesSecret = __webpack_require__(38);

	var emptyFunction = __webpack_require__(22);
	var getIteratorFn = __webpack_require__(26);
	var warning = __webpack_require__(21);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),
	  symbol: createPrimitiveTypeChecker('symbol'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: createElementTypeChecker(),
	  instanceOf: createInstanceTypeChecker,
	  node: createNodeChecker(),
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	/**
	 * inlined Object.is polyfill to avoid requiring consumers ship their own
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	 */
	/*eslint-disable no-self-compare*/
	function is(x, y) {
	  // SameValue algorithm
	  if (x === y) {
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    return x !== 0 || 1 / x === 1 / y;
	  } else {
	    // Step 6.a: NaN == NaN
	    return x !== x && y !== y;
	  }
	}
	/*eslint-enable no-self-compare*/

	/**
	 * We use an Error-like object for backward compatibility as people may call
	 * PropTypes directly and inspect their output. However we don't use real
	 * Errors anymore. We don't inspect their stack anyway, and creating them
	 * is prohibitively expensive if they are created too often, such as what
	 * happens in oneOfType() for any type before the one that matched.
	 */
	function PropTypeError(message) {
	  this.message = message;
	  this.stack = '';
	}
	// Make `instanceof Error` still work for returned errors.
	PropTypeError.prototype = Error.prototype;

	function createChainableTypeChecker(validate) {
	  if (process.env.NODE_ENV !== 'production') {
	    var manualPropTypeCallCache = {};
	  }
	  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	    componentName = componentName || ANONYMOUS;
	    propFullName = propFullName || propName;
	    if (process.env.NODE_ENV !== 'production') {
	      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
	        var cacheKey = componentName + ':' + propName;
	        if (!manualPropTypeCallCache[cacheKey]) {
	          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
	          manualPropTypeCallCache[cacheKey] = true;
	        }
	      }
	    }
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        if (props[propName] === null) {
	          return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	        }
	        return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location, propFullName);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location, propFullName, secret) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	    }
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    if (!ReactElement.isValidElement(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      var actualClassName = getClassName(props[propName]);
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  if (!Array.isArray(expectedValues)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (is(propValue, expectedValues[i])) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (typeof typeChecker !== 'function') {
	      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	    }
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  if (!Array.isArray(arrayOfTypeCheckers)) {
	    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	    return emptyFunction.thatReturnsNull;
	  }

	  function validate(props, propName, componentName, location, propFullName) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location, propFullName) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location, propFullName) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }

	      var iteratorFn = getIteratorFn(propValue);
	      if (iteratorFn) {
	        var iterator = iteratorFn.call(propValue);
	        var step;
	        if (iteratorFn !== propValue.entries) {
	          while (!(step = iterator.next()).done) {
	            if (!isNode(step.value)) {
	              return false;
	            }
	          }
	        } else {
	          // Iterator will provide entry [k,v] tuples rather than values.
	          while (!(step = iterator.next()).done) {
	            var entry = step.value;
	            if (entry) {
	              if (!isNode(entry[1])) {
	                return false;
	              }
	            }
	          }
	        }
	      } else {
	        return false;
	      }

	      return true;
	    default:
	      return false;
	  }
	}

	function isSymbol(propType, propValue) {
	  // Native Symbol.
	  if (propType === 'symbol') {
	    return true;
	  }

	  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	  if (propValue['@@toStringTag'] === 'Symbol') {
	    return true;
	  }

	  // Fallback for non-spec compliant Symbols which are polyfilled.
	  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	    return true;
	  }

	  return false;
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  if (isSymbol(propType, propValue)) {
	    return 'symbol';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	// Returns class name of the object, if any.
	function getClassName(propValue) {
	  if (!propValue.constructor || !propValue.constructor.name) {
	    return ANONYMOUS;
	  }
	  return propValue.constructor.name;
	}

	module.exports = ReactPropTypes;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	module.exports = '15.4.2';

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	'use strict';

	var _prodInvariant = __webpack_require__(17);

	var ReactElement = __webpack_require__(19);

	var invariant = __webpack_require__(18);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection.
	 *
	 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
	 *
	 * The current implementation of this function assumes that a single child gets
	 * passed without a wrapper, but the purpose of this helper function is to
	 * abstract away the particular structure of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactElement} The first and only `ReactElement` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
	  return children;
	}

	module.exports = onlyChild;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 列表点击项  水质地图/统计/基线校准
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ActionItem = exports.ActionItem = function (_React$Component) {
	    _inherits(ActionItem, _React$Component);

	    function ActionItem(props) {
	        _classCallCheck(this, ActionItem);

	        return _possibleConstructorReturn(this, (ActionItem.__proto__ || Object.getPrototypeOf(ActionItem)).call(this, props));
	    }

	    _createClass(ActionItem, [{
	        key: 'handleTouchEnd',
	        value: function handleTouchEnd(e) {
	            e.stopPropagation();
	            if (typeof this.props.touchEnd === 'function') {
	                this.props.touchEnd();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var text = this.props.textVal || '';
	            return React.createElement(
	                'div',
	                { className: 'actionItem', onClick: this.handleTouchEnd.bind(this) },
	                React.createElement(
	                    'span',
	                    null,
	                    text,
	                    React.createElement('i', null)
	                )
	            );
	        }
	    }]);

	    return ActionItem;
	}(React.Component);

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @fileName: DialogStyle.jsx
	 * Created by liuzh on 2017-01-18
	 * 弹出框组件
	 * @prop {string}   title 标题
	 * @prop {string}   leftpam 左边点击框文字
	 * @prop {string}   rightpam 左边点击框文字
	 * @prop {boolean}   show 是否显示
	 * @prop {function} submitClock   确定，点击后的回调函数
	 * @prop {string} content   内容
	 * @prop {array} contentList   内容列表
	 */
	var DialogStyle = exports.DialogStyle = function (_React$Component) {
	    _inherits(DialogStyle, _React$Component);

	    function DialogStyle(props) {
	        _classCallCheck(this, DialogStyle);

	        var _this = _possibleConstructorReturn(this, (DialogStyle.__proto__ || Object.getPrototypeOf(DialogStyle)).call(this, props));

	        _this.state = {
	            showOpacity: 0,
	            timeDisplay: false
	        };
	        return _this;
	    }

	    _createClass(DialogStyle, [{
	        key: 'endDefault',
	        value: function endDefault(e) {
	            //阻止touchend事件向上冒泡
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    }, {
	        key: 'touchcanle',
	        value: function touchcanle(e) {
	            e.stopPropagation(); //取消时间冒泡
	            var canCel = this.props.canCel || false;
	            if (canCel && typeof this.props.cancelClock === 'function') {
	                this.props.cancelClock();
	            }
	        }
	    }, {
	        key: 'touchconform',
	        value: function touchconform(e) {
	            e.stopPropagation();
	            if (typeof this.props.submitClock === 'function') {
	                this.props.submitClock();
	            }
	            e.preventDefault();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var content = this.props.content == undefined ? "--" : this.props.content;
	            var rightpam = this.props.rightpam == undefined ? "知道了" : this.props.rightpam;
	            var show = this.props.show;

	            var contentList = this.props.contentList == undefined ? [] : this.props.contentList;
	            var lis = [];
	            var items = ['TDS:', 'TOC:', '色度:', '浊度:', 'COD:'];
	            for (var index in contentList) {
	                lis.push(React.createElement(
	                    'li',
	                    { key: index },
	                    React.createElement(
	                        'span',
	                        null,
	                        items[index]
	                    ),
	                    contentList[index],
	                    ' '
	                ));
	            }
	            return React.createElement(
	                'section',
	                { style: { display: show ? "" : "none" }, className: 'fade_c_section' },
	                React.createElement(
	                    'section',
	                    { className: 'fade_c_section', onTouchEnd: this.touchcanle.bind(this) },
	                    React.createElement(
	                        'section',
	                        { onTouchMove: this.endDefault },
	                        React.createElement('div', { className: 'fade_c', onTouchEnd: contentList.length == 0 ? "" : this.touchconform.bind(this) }),
	                        React.createElement(
	                            'div',
	                            { className: contentList.length == 0 ? "succ-pop" : "succ-pop tips" },
	                            React.createElement(
	                                'section',
	                                { className: 'pop_div' },
	                                contentList.length == 0 ? React.createElement(
	                                    'p',
	                                    { className: 'pop_content' },
	                                    content
	                                ) : React.createElement(
	                                    'ul',
	                                    { className: 'pop_con' },
	                                    lis
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex conformd', style: { display: contentList.length == 0 ? "" : "none" } },
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell', onTouchEnd: this.touchconform.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        rightpam
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return DialogStyle;
	}(React.Component);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PromptDetection = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 无检测数据页面
	 */
	var PromptDetection = exports.PromptDetection = function (_BaseComponent) {
	    _inherits(PromptDetection, _BaseComponent);

	    function PromptDetection(props) {
	        _classCallCheck(this, PromptDetection);

	        var _this = _possibleConstructorReturn(this, (PromptDetection.__proto__ || Object.getPrototypeOf(PromptDetection)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store
	        _this.closeDialog = function () {
	            _this.setState({
	                showhelpdialog: false
	            });
	        };
	        _Actions.Actions.getTrigger();
	        return _this;
	    }

	    _createClass(PromptDetection, [{
	        key: 'handleToWaterDetection',
	        value: function handleToWaterDetection() {
	            if (!(this.state.isDeviceConnected || false)) {
	                het.toast('设备未连接');
	                return false;
	            }
	            location.href = '#/waterDetection';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'main_top no-data' },
	                React.createElement(
	                    'div',
	                    { className: 'index_circle_container' },
	                    React.createElement(
	                        'div',
	                        { className: 'index_circle_center' },
	                        React.createElement(
	                            'p',
	                            { className: 'no-detection-hint' },
	                            ' \u4EB2\uFF0C\u60A8\u8FD8\u6CA1\u6709\u68C0\u6D4B\u6570\u636E\u54E6\uFF0C \u5FEB\u53BB\u4F7F\u7528\u68C0\u6D4B\u4EEA\u68C0\u6D4B\u6C34\u8D28\u5427\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'detection', onTouchEnd: this.handleToWaterDetection.bind(this) },
	                            '\u53BB\u68C0\u6D4B'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return PromptDetection;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 水质检测页面
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WaterDetection = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _DialogStyle = __webpack_require__(43);

	var _DataInfo = __webpack_require__(10);

	var _LoadImagModel = __webpack_require__(46);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var WaterDetection = exports.WaterDetection = function (_BaseComponent) {
	    _inherits(WaterDetection, _BaseComponent);

	    function WaterDetection(props) {
	        _classCallCheck(this, WaterDetection);

	        var _this = _possibleConstructorReturn(this, (WaterDetection.__proto__ || Object.getPrototypeOf(WaterDetection)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '水质检测', setNavRightBtnHiden: 1 }));
	        _this.closeDialog = function () {
	            _Actions.Actions.send(3);
	        };
	        _Actions.Actions.send(1);
	        return _this;
	    }

	    _createClass(WaterDetection, [{
	        key: 'getGrade',
	        value: function getGrade(wqiVal) {
	            var gradeVal = void 0;
	            if (wqiVal <= 60) {
	                gradeVal = "差";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeVal = "中";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeVal = "良";
	            } else {
	                gradeVal = "优";
	            }
	            return gradeVal;
	        }
	    }, {
	        key: 'getGradeColor',
	        value: function getGradeColor(wqiVal) {
	            var gradeColor = void 0;
	            if (wqiVal <= 60) {
	                gradeColor = "red-color";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeColor = "yellow-color";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeColor = "blue-color";
	            } else {
	                gradeColor = "green-color";
	            }
	            return gradeColor;
	        }
	    }, {
	        key: 'handleToIndex',
	        value: function handleToIndex() {
	            history.back();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var errorTip = '检测到汲取的水量不足或未浸入水中';

	            var deviceStatus = this.state.deviceStatus || 1;
	            var mydata = this.state.data || {};

	            var wqiVal = this.state.data ? this.state.data.wqi : '0';
	            var gradeVal = this.getGrade(wqiVal);

	            return React.createElement(
	                'div',
	                { className: 'waterdetection-body' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF' } }),
	                React.createElement(
	                    'div',
	                    { className: 'waterdetection-content' },
	                    deviceStatus == 1 ? React.createElement(
	                        'section',
	                        { className: 'waterdetection-parent' },
	                        React.createElement(
	                            'div',
	                            { className: 'waterdetection-left' },
	                            React.createElement(
	                                'i',
	                                null,
	                                '1'
	                            ),
	                            React.createElement('div', { className: 'line' }),
	                            React.createElement(
	                                'i',
	                                null,
	                                '2'
	                            ),
	                            React.createElement('div', { className: 'line' }),
	                            React.createElement(
	                                'i',
	                                null,
	                                '3'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'waterdetection-container' },
	                            React.createElement(
	                                'figure',
	                                null,
	                                React.createElement('img', { src: '../static/img/starting-up.png', alt: '' }),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '\u5F00\u673A'
	                                )
	                            ),
	                            React.createElement(
	                                'figure',
	                                null,
	                                React.createElement('img', { src: '../static/img/bluetooth.png', alt: '' }),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '\u8BF7\u786E\u4FDD\u84DD\u7259\u5DF2\u8FDE\u63A5'
	                                )
	                            ),
	                            React.createElement(
	                                'figure',
	                                null,
	                                React.createElement('img', { src: '../static/img/getting-water.png', alt: '' }),
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '\u53D6\u6C34'
	                                )
	                            )
	                        )
	                    ) : '',
	                    deviceStatus == 2 ? React.createElement(
	                        'section',
	                        null,
	                        React.createElement(
	                            'figure',
	                            { className: 'waterdetection-finish' },
	                            React.createElement('img', { src: '../static/img/detection-finish.png', alt: '' }),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u68C0\u6D4B\u5B8C\u6210'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'waterdetection-result' },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u60A8\u672C\u6B21\u6C34\u8D28\u68C0\u6D4B\u5F97\u5206\u4E3A\uFF1A',
	                                React.createElement(
	                                    'span',
	                                    { className: 'score' },
	                                    wqiVal + "分"
	                                )
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u7B49\u7EA7\u4E3A\uFF1A',
	                                React.createElement(
	                                    'span',
	                                    { className: this.getGradeColor(wqiVal) },
	                                    gradeVal
	                                )
	                            )
	                        ),
	                        React.createElement(_DataInfo.DataInfo, {
	                            styleMode: '2',
	                            myData: mydata
	                        }),
	                        React.createElement(
	                            'div',
	                            { className: 'waterdetection-hint' },
	                            '\u70B9\u51FB\u786E\u5B9A\u5B8C\u6210\u672C\u6B21\u68C0\u6D4B\u524D\uFF0C\u8BF7\u786E\u4FDD\u5DF2\u5C06\u8BBE\u5907\u9000\u6C34\uFF0C\u4EE5\u514D\u9020\u6210\u6570\u636E\u8BEF\u5DEE'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'bottom-btn', onTouchEnd: this.handleToIndex.bind(this) },
	                            '\u786E\u5B9A'
	                        )
	                    ) : '',
	                    React.createElement(_DialogStyle.DialogStyle, { show: this.state.showerrordialog, submitClock: this.closeDialog.bind(this),
	                        content: errorTip, canCel: false })
	                ),
	                React.createElement(_LoadImagModel.LoadImagModel, { showLoad: this.state.loading })
	            );
	        }
	    }]);

	    return WaterDetection;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 加载圈
	 */
	var LoadImagModel = exports.LoadImagModel = React.createClass({
	    displayName: "LoadImagModel",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        var show = this.props.showLoad || 0;
	        return React.createElement(
	            "section",
	            { className: "fade_c_section", style: { display: show == 0 ? "none" : "" } },
	            React.createElement("div", { className: "fade_c" }),
	            React.createElement(
	                "div",
	                { className: "spinner" },
	                React.createElement(
	                    "div",
	                    { className: "spinner-container container1" },
	                    React.createElement("div", { className: "circle1" }),
	                    React.createElement("div", { className: "circle2" }),
	                    React.createElement("div", { className: "circle3" }),
	                    React.createElement("div", { className: "circle4" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "spinner-container container2" },
	                    React.createElement("div", { className: "circle1" }),
	                    React.createElement("div", { className: "circle2" }),
	                    React.createElement("div", { className: "circle3" }),
	                    React.createElement("div", { className: "circle4" })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "spinner-container container3" },
	                    React.createElement("div", { className: "circle1" }),
	                    React.createElement("div", { className: "circle2" }),
	                    React.createElement("div", { className: "circle3" }),
	                    React.createElement("div", { className: "circle4" })
	                )
	            )
	        );
	    }
	});

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 水质地图页面
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WaterMap = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _DataInfo = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var WaterMap = exports.WaterMap = function (_BaseComponent) {
	    _inherits(WaterMap, _BaseComponent);

	    function WaterMap(props) {
	        _classCallCheck(this, WaterMap);

	        var _this2 = _possibleConstructorReturn(this, (WaterMap.__proto__ || Object.getPrototypeOf(WaterMap)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            headerTop: isAndroid ? 73 : 64,
	            longVal: "",
	            latVal: "",
	            info: {},
	            listData: [],
	            showInfo: false
	        };
	        _this2.listenStore(_Store.Store); // 监听Store
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '水质地图', setNavRightBtnHiden: 1 }));
	        _Actions.Actions.getTrigger();
	        return _this2;
	    }

	    _createClass(WaterMap, [{
	        key: 'getGrade',
	        value: function getGrade(wqiVal) {
	            var gradeVal = void 0;
	            if (wqiVal <= 60) {
	                gradeVal = "差";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeVal = "中";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeVal = "良";
	            } else {
	                gradeVal = "优";
	            }
	            return gradeVal;
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var mp = new BMap.Map("allmap");
	            mp.centerAndZoom(new BMap.Point(105.881905, 32.657434), 15);
	            mp.enableScrollWheelZoom();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if ((this.state.lng != nextState.lng || nextState.lng == undefined) && this.state.longVal == "") {

	                //noinspection JSAnnotator
	                var ComplexCustomOverlay = function ComplexCustomOverlay(point) {
	                    this._point = point;
	                };

	                var _this = this;
	                var map = new BMap.Map("allmap");
	                var point = new BMap.Point(116.404, 39.915);
	                map.centerAndZoom(point, 15);

	                ComplexCustomOverlay.prototype = new BMap.Overlay();
	                ComplexCustomOverlay.prototype.initialize = function (map) {
	                    this._map = map;
	                    var div = this._div = document.createElement("div");
	                    div.style.position = "relative";
	                    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	                    div.style.background = "rgba(75, 162, 255, 0.2) no-repeat content-box";
	                    div.style.border = "1px solid rgba(75, 162, 255, 0.4)";
	                    div.style.backgroundSize = "100% 100%";
	                    div.style.width = "133px";
	                    div.style.height = "133px";
	                    div.style.webkitBorderRadius = "50%";
	                    div.style.orderRadius = "50%";
	                    div.style.whiteSpace = "nowrap";
	                    div.style.MozUserSelect = "none";
	                    div.style.MozUserSelect = "none";

	                    var div1 = document.createElement("div");
	                    div.appendChild(div1);
	                    div1.style.background = "url('../static/img/dotbig.png') no-repeat content-box";
	                    div1.style.backgroundSize = "100% 100%";
	                    div1.style.width = "20.5px";
	                    div1.style.height = "18px";
	                    div1.style.position = "absolute";
	                    div1.style.top = "50%";
	                    div1.style.left = "50%";
	                    div1.style.transform = "translate(-50%, -50%)";

	                    map.getPanes().labelPane.appendChild(div);
	                    return div;
	                };
	                ComplexCustomOverlay.prototype.draw = function () {
	                    var map = this._map;
	                    var pixel = map.pointToOverlayPixel(this._point);
	                    this._div.style.left = pixel.x - 133 / 2 + "px";
	                    this._div.style.top = pixel.y - 133 / 2 + "px";
	                };

	                if (nextState.lng) {
	                    point = new BMap.Point(nextState.lng, nextState.lat);
	                    _this.getNearestDistanceT10Data(nextState.lng, nextState.lat);
	                    map.centerAndZoom(point, 15);
	                    var myCompOverlay = new ComplexCustomOverlay(point);
	                    map.addOverlay(myCompOverlay);
	                } else {
	                    var geolocation = new BMap.Geolocation();
	                    geolocation.getCurrentPosition(function (r) {
	                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
	                            point = new BMap.Point(r.point.lng, r.point.lat);
	                            _this.getNearestDistanceT10Data(r.point.lng, r.point.lat);
	                            map.centerAndZoom(point, 15);
	                            var myCompOverlay = new ComplexCustomOverlay(point);
	                            map.addOverlay(myCompOverlay);
	                        }
	                    }, { enableHighAccuracy: true });
	                }
	            }
	            var mydata = nextState.results || [];
	            if (this.state.results !== nextState.results && mydata.length > 0) {
	                //noinspection JSAnnotator
	                var ComplexCustomOverlay1 = function ComplexCustomOverlay1(point) {
	                    this._point = point;
	                };

	                // 复杂的自定义覆盖物
	                //noinspection JSAnnotator
	                var _ComplexCustomOverlay = function _ComplexCustomOverlay(point, dataItem) {
	                    this._dataItem = dataItem;
	                    this._point = point;
	                };

	                var _this3 = this;

	                console.log("------------mydata---" + JSON.stringify(mydata));
	                // 百度地图API功能
	                var mp = new BMap.Map("allmap");
	                mp.centerAndZoom(new BMap.Point(_this3.state.longVal, _this3.state.latVal), 15);
	                mp.enableScrollWheelZoom();

	                ComplexCustomOverlay1.prototype = new BMap.Overlay();
	                ComplexCustomOverlay1.prototype.initialize = function (map) {
	                    this._map = map;
	                    var div = this._div = document.createElement("div");
	                    div.style.position = "relative";
	                    div.style.zIndex = BMap.Overlay.getZIndex(_this3.state.latVal);
	                    div.style.background = "rgba(75, 162, 255, 0.2) no-repeat content-box";
	                    div.style.border = "1px solid rgba(75, 162, 255, 0.4)";
	                    div.style.backgroundSize = "100% 100%";
	                    div.style.width = "133px";
	                    div.style.height = "133px";
	                    div.style.webkitBorderRadius = "50%";
	                    div.style.orderRadius = "50%";
	                    div.style.whiteSpace = "nowrap";
	                    div.style.MozUserSelect = "none";
	                    div.style.MozUserSelect = "none";

	                    var div1 = document.createElement("div");
	                    div.appendChild(div1);
	                    div1.style.background = "url('../static/img/dotbig.png') no-repeat content-box";
	                    div1.style.backgroundSize = "100% 100%";
	                    div1.style.width = "20.5px";
	                    div1.style.height = "18px";
	                    div1.style.position = "absolute";
	                    div1.style.top = "50%";
	                    div1.style.left = "50%";
	                    div1.style.transform = "translate(-50%, -50%)";

	                    mp.getPanes().labelPane.appendChild(div);
	                    return div;
	                };
	                ComplexCustomOverlay1.prototype.draw = function () {
	                    var map = this._map;
	                    var pixel = map.pointToOverlayPixel(new BMap.Point(_this3.state.longVal, _this3.state.latVal));
	                    this._div.style.left = pixel.x - 133 / 2 + "px";
	                    this._div.style.top = pixel.y - 133 / 2 + "px";
	                };

	                var myCompOverlay1 = new ComplexCustomOverlay1(_this3.state.longVal, _this3.state.latVal);
	                mp.addOverlay(myCompOverlay1);

	                _ComplexCustomOverlay.prototype = new BMap.Overlay();
	                _ComplexCustomOverlay.prototype.initialize = function (map) {
	                    this._map = map;
	                    var wqiVal = this._dataItem.wqi;
	                    var grade = _this3.getGrade(wqiVal);
	                    var __this = this;
	                    var div = this._div = document.createElement("div");
	                    div.style.position = "absolute";
	                    div.style.zIndex = BMap.Overlay.getZIndex(this._dataItem.latitude);
	                    div.style.background = "url('../static/img/marker-icon.png') no-repeat content-box";
	                    div.style.backgroundSize = "100% 100%";
	                    if (wqiVal <= 60) {
	                        div.style.color = "#ff6969";
	                    } else if (wqiVal > 60 && wqiVal < 80) {
	                        div.style.color = "#FFCB6E";
	                    } else if (wqiVal >= 80 && wqiVal < 90) {
	                        div.style.color = "#7BB8FF";
	                    } else {
	                        div.style.color = "#59d691";
	                    }
	                    div.style.width = "3.11rem";
	                    div.style.height = "4.58rem";
	                    div.style.textAlign = "center";
	                    div.style.lineHeight = "2.91rem";
	                    div.style.whiteSpace = "nowrap";
	                    div.style.MozUserSelect = "none";
	                    div.style.fontSize = "12px";
	                    var span = this._span = document.createElement("span");
	                    div.appendChild(span);
	                    span.appendChild(document.createTextNode(grade));

	                    var tmpfun = map.onclick;
	                    map.onclick = null;
	                    div.addEventListener("touchstart", function () {
	                        map.onclick = tmpfun;
	                        if (__this._dataItem == _this3.state.info) {
	                            _this3.setState({
	                                showInfo: false,
	                                info: {}
	                            });
	                        } else {
	                            _this3.setState({
	                                showInfo: true,
	                                info: __this._dataItem
	                            });
	                        }
	                    });

	                    mp.getPanes().labelPane.appendChild(div);
	                    return div;
	                };
	                _ComplexCustomOverlay.prototype.draw = function () {
	                    var map = this._map;
	                    var pixel = map.pointToOverlayPixel(this._point);
	                    this._div.style.left = pixel.x / 12 - 1.472 + "rem";
	                    this._div.style.top = pixel.y / 12 - 4.025 + "rem";
	                };
	                for (var x in mydata) {
	                    var dadt = mydata[x];
	                    var myCompOverlay = new _ComplexCustomOverlay(new BMap.Point(dadt.longitude, dadt.latitude), dadt);
	                    mp.addOverlay(myCompOverlay);
	                }
	            }
	            return true;
	        }
	    }, {
	        key: 'getNearestDistanceT10Data',
	        value: function getNearestDistanceT10Data(longitude, latitude) {
	            this.setState({
	                longVal: longitude,
	                latVal: latitude
	            });
	            _Actions.Actions.getNearestDistanceT10Data(longitude, latitude);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var showInfo = this.state.showInfo;
	            var info = this.state.info;
	            var grade = this.getGrade(info.wqi);
	            return React.createElement(
	                'div',
	                { className: 'waterdetection-body' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF' } }),
	                React.createElement(
	                    'div',
	                    { className: 'watermap-content', style: { height: window.innerHeight - this.state.headerTop } },
	                    React.createElement('div', { id: 'allmap' }),
	                    React.createElement(
	                        'div',
	                        { className: 'watermap-top-container', style: { display: showInfo ? "" : "none" } },
	                        React.createElement(
	                            'div',
	                            { className: 'watermap-info' },
	                            React.createElement(
	                                'span',
	                                null,
	                                info.uploadLocation
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                "水质" + grade
	                            )
	                        ),
	                        React.createElement(_DataInfo.DataInfo, {
	                            styleMode: '1',
	                            myData: info
	                        })
	                    )
	                )
	            );
	        }
	    }]);

	    return WaterMap;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 统计页面
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Statistics = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _StatisticsList = __webpack_require__(49);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pageSize = 10;

	var Statistics = exports.Statistics = function (_BaseComponent) {
	    _inherits(Statistics, _BaseComponent);

	    function Statistics(props) {
	        _classCallCheck(this, Statistics);

	        var _this = _possibleConstructorReturn(this, (Statistics.__proto__ || Object.getPrototypeOf(Statistics)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            showDialog: false,
	            activeIndex: -1,
	            dataList: null,
	            dataIndex: 1,
	            message: null
	        };
	        _this.unBindDataStore = _Store.Store.listen(_this.onGetResult.bind(_this)); // 监听Store
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '统计', setNavRightBtnHiden: 1 }));
	        return _this;
	    }

	    _createClass(Statistics, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.getHisData('refresh');
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            this.unBindDataStore();
	        }
	    }, {
	        key: 'onGetResult',
	        value: function onGetResult(data) {
	            if (data.index == 1) {
	                this.setState({ dataList: data.list });
	            } else if (this.state.dataList) {
	                if (data.list.length <= 0) {
	                    this.showToast('没有数据了');
	                }
	                this.setState({ dataList: this.state.dataList.concat(data.list) });
	            }
	        }
	    }, {
	        key: 'getHisData',
	        value: function getHisData(state) {
	            if (state == 'refresh') {
	                this.state.dataIndex = 1;
	                this.setState({ dataList: null });
	            } else {
	                this.state.dataIndex++;
	            }
	            _Actions.Actions.getHisData(this.state.dataIndex, pageSize);
	        }
	    }, {
	        key: 'showToast',
	        value: function showToast(text) {
	            var self = this;
	            this.setState({ message: text });
	            setTimeout(function () {
	                self.setState({ message: null });
	            }, 2000);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var myDataList = this.state.dataList || [];
	            console.log("---myDataList---------" + JSON.stringify(myDataList));
	            return React.createElement(
	                'div',
	                { className: 'statistics-full' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF' } }),
	                React.createElement(
	                    'div',
	                    { className: 'statistics-tab' },
	                    myDataList.length > 0 ? React.createElement(_StatisticsList.StatisticsList, { datas: myDataList, dataMethod: this.getHisData.bind(this) }) : React.createElement('div', null)
	                ),
	                React.createElement(
	                    'div',
	                    { style: { display: this.state.message == null ? 'none' : 'block' } },
	                    React.createElement('div', { className: 'statistics-cover-layout' }),
	                    React.createElement(
	                        'div',
	                        { className: 'statistics-message' },
	                        this.state.message
	                    )
	                )
	            );
	        }
	    }]);

	    return Statistics;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StatisticsList = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _DataInfo = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 统计列表
	 * */
	var StatisticsList = function (_BaseComponent) {
	    _inherits(StatisticsList, _BaseComponent);

	    function StatisticsList(props) {
	        _classCallCheck(this, StatisticsList);

	        var _this2 = _possibleConstructorReturn(this, (StatisticsList.__proto__ || Object.getPrototypeOf(StatisticsList)).call(this, props));

	        _this2.state = {};
	        _this2.state.activeIndex = -1;
	        _this2.state.listData = props.datas || [];
	        _this2.state.imgCount = _this2.state.listData.length;
	        _this2.state.imgComIndex = 0;
	        _this2.state.pageIndex = 1;
	        return _this2;
	    }

	    _createClass(StatisticsList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var scroller = this.refs.scroll,
	                pullDown = this.refs.pullDown,
	                pullDownLabel = this.refs.pullDownLabel,
	                pullUp = this.refs.pullUp,
	                pullUpLabel = this.refs.pullUpLabel,
	                goTop = this.refs.goTop,
	                _this = this,
	                step = 0; //加载状态：默认0,1为加载状态，2为执行加载
	            this.myScroll = new IScroll(this.refs.scroll, {
	                probeType: 2, //probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。
	                scrollbars: false, //有滚动条
	                mouseWheel: true, //允许滑轮滚动
	                fadeScrollbars: false, //滚动时显示滚动条，默认影藏，并且是淡出淡入效果
	                bounce: true, //边界反弹
	                preventDefault: false,
	                interactiveScrollbars: false, //滚动条可以拖动
	                shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.
	                click: false, // 允许点击事件
	                keyBindings: false, //允许使用按键控制
	                momentum: true });
	            this.myScroll.on('scroll', function () {
	                if (step == 0 && this.y > 10 && this.y <= 30) {
	                    pullDown.style.display = 'block';
	                    this.refresh();
	                    step = 1;
	                } else if (step == 1 && this.y > 30) {
	                    pullDownLabel.innerHTML = '松手马上刷新...';
	                    pullDown.className = 'flip';
	                    step = 2;
	                }
	                if (step == 0 && this.y < this.maxScrollY - 10 && this.y > this.maxScrollY - 30) {
	                    pullUp.style.display = 'block';
	                    this.refresh();
	                    step = 1;
	                } else if (step == 1 && this.y <= this.maxScrollY - 30) {
	                    pullUpLabel.innerHTML = '松手马上加载...';
	                    pullUp.className = 'flip';
	                    step = 2;
	                } else if (step == 2 && this.y < this.maxScrollY && this.pointY < 1) {
	                    this.scrollTo(0, this.maxScrollY, 400);
	                    return;
	                }
	            });
	            this.myScroll.on('scrollEnd', function () {
	                if (step == 1) {
	                    pullDown.style.display = 'none';
	                    pullUp.style.display = 'none';
	                    step = 0;
	                    this.refresh();
	                }
	                if (step == 2) {
	                    if (pullDown.className == 'flip') {
	                        pullDownLabel.innerHTML = '正在刷新...';
	                        pullDown.className = 'pull-tips';
	                        step = 0;
	                        _this.props.dataMethod('refresh');
	                    }
	                    if (pullUp.className == 'flip') {
	                        pullUpLabel.innerHTML = '正在加载...';
	                        pullUp.className = 'pull-tips';
	                        step = 0;
	                        _this.props.dataMethod('load');
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(props) {
	            this.state.activeIndex = -1;
	            this.state.listData = props.datas || [];
	            this.state.imgCount = this.state.listData.length;
	            this.state.imgComIndex = 1;
	            this.state.pullDownLoading = false;
	            this.state.pullUpLoading = false;
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.refs.pullDown.style.display = this.state.pullDownLoading ? 'block' : 'none';
	            if (!this.state.pullDownLoading) this.refs.pullDownLabel.innerText = '下拉刷新';
	            this.refs.pullUp.style.display = this.state.pullUpLoading ? 'block' : 'none';
	            if (!this.state.pullUpLoading) this.refs.pullUpLabel.innerText = '上拉加载更多...';
	        }
	    }, {
	        key: 'getGrade',
	        value: function getGrade(wqiVal) {
	            var gradeVal = void 0;
	            if (wqiVal <= 60) {
	                gradeVal = "差";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeVal = "中";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeVal = "良";
	            } else {
	                gradeVal = "优";
	            }
	            return gradeVal;
	        }
	    }, {
	        key: 'getGradeColor',
	        value: function getGradeColor(wqiVal) {
	            var gradeColor = void 0;
	            if (wqiVal <= 60) {
	                gradeColor = "red-color";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeColor = "yellow-color";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeColor = "blue-color";
	            } else {
	                gradeColor = "green-color";
	            }
	            return gradeColor;
	        }
	    }, {
	        key: 'handleItem',
	        value: function handleItem(index, e) {
	            e.preventDefault();
	            var currIndex = this.state.activeIndex;
	            this.setState({
	                activeIndex: currIndex == index ? '-1' : index
	            });
	            e.stopPropagation();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var mydata = this.state.listData || [];
	            var len = mydata.length;
	            var activeIndex = this.state.activeIndex;
	            return React.createElement(
	                'div',
	                { className: 'statistics-scroll', ref: 'scroll' },
	                React.createElement(
	                    'div',
	                    { style: { display: len > 0 ? 'block' : 'none' } },
	                    React.createElement(
	                        'div',
	                        { ref: 'pullDown', className: 'pull-tips', style: { display: 'none' } },
	                        React.createElement(
	                            'span',
	                            { ref: 'pullDownLabel' },
	                            '\u4E0B\u62C9\u5237\u65B0'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'statistics--full' },
	                        mydata.map(function (item, index) {
	                            var wqiVal = item.wqi;
	                            return React.createElement(
	                                'div',
	                                {
	                                    className: 'statistics-li', key: index },
	                                React.createElement(
	                                    'div',
	                                    { className: 'statistics-li-parent', 'data-index': index,
	                                        onClick: this.handleItem.bind(this, index) },
	                                    React.createElement(
	                                        'div',
	                                        null,
	                                        React.createElement(
	                                            'p',
	                                            { className: 'statistics-li-location' },
	                                            item.uploadLocation != "" ? item.uploadLocation : "未知地址"
	                                        ),
	                                        React.createElement(
	                                            'p',
	                                            null,
	                                            item.uploadTime
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        { className: this.getGradeColor(wqiVal) },
	                                        this.getGrade(wqiVal),
	                                        React.createElement('i', { className: index == activeIndex ? "statistics-li-zankai" : "" })
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'statistics-li-children',
	                                        style: { display: index == activeIndex ? "" : "none" } },
	                                    React.createElement(_DataInfo.DataInfo, {
	                                        styleMode: '1',
	                                        myData: item
	                                    })
	                                )
	                            );
	                        }.bind(this))
	                    ),
	                    React.createElement(
	                        'div',
	                        { ref: 'pullUp', className: 'pull-tips', style: { display: 'none' } },
	                        React.createElement(
	                            'span',
	                            { ref: 'pullUpLabel' },
	                            '\u4E0A\u62C9\u52A0\u8F7D\u66F4\u591A...'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return StatisticsList;
	}(_BaseComponentClass.BaseComponent);

	exports.StatisticsList = StatisticsList;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 统计页面
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BaselineCalibration = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _LoadImagModel = __webpack_require__(46);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var BaselineCalibration = exports.BaselineCalibration = function (_BaseComponent) {
	    _inherits(BaselineCalibration, _BaseComponent);

	    function BaselineCalibration(props) {
	        _classCallCheck(this, BaselineCalibration);

	        var _this = _possibleConstructorReturn(this, (BaselineCalibration.__proto__ || Object.getPrototypeOf(BaselineCalibration)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '基线校准', setNavRightBtnHiden: 1 }));
	        return _this;
	    }

	    _createClass(BaselineCalibration, [{
	        key: 'startCalibration',
	        value: function startCalibration() {
	            _Actions.Actions.send(2);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var dataText = "请确保检测器已经完全、可靠的浸入水中；基线校准时必须使用合格的蒸馏水或者超纯水，且在室温约为25°C时进行";
	            return React.createElement(
	                'section',
	                null,
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF' } }),
	                React.createElement(
	                    'div',
	                    { className: 'calibration-container' },
	                    React.createElement(
	                        'figure',
	                        { className: 'calibration-top' },
	                        React.createElement('img', { src: '../static/img/baseline-calibration-icon.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            dataText
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'bottom-btn', onTouchEnd: this.startCalibration.bind(this) },
	                        '\u5F00\u59CB\u6821\u51C6'
	                    )
	                ),
	                React.createElement(_LoadImagModel.LoadImagModel, { showLoad: this.state.loading })
	            );
	        }
	    }]);

	    return BaselineCalibration;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 同步数据列表页面
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SyncHisData = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var address = " ";
	var longVal = " ";
	var latVal = " ";
	var selectIndex = -1;

	// 创建React组件

	var SyncHisData = exports.SyncHisData = function (_BaseComponent) {
	    _inherits(SyncHisData, _BaseComponent);

	    function SyncHisData(props) {
	        _classCallCheck(this, SyncHisData);

	        var _this = _possibleConstructorReturn(this, (SyncHisData.__proto__ || Object.getPrototypeOf(SyncHisData)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            showDialog: false,
	            address: address,
	            longVal: longVal,
	            latVal: latVal,
	            selectIndex: selectIndex
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '水质检测器', setNavRightBtnHiden: 1 }));
	        _Actions.Actions.getTrigger();
	        return _this;
	    }

	    _createClass(SyncHisData, [{
	        key: 'getGrade',
	        value: function getGrade(wqiVal) {
	            var gradeVal = void 0;
	            if (wqiVal <= 60) {
	                gradeVal = "差";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeVal = "中";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeVal = "良";
	            } else {
	                gradeVal = "优";
	            }
	            return gradeVal;
	        }
	    }, {
	        key: 'getGradeColor',
	        value: function getGradeColor(wqiVal) {
	            var gradeColor = void 0;
	            if (wqiVal <= 60) {
	                gradeColor = "red-color";
	            } else if (wqiVal > 60 && wqiVal < 80) {
	                gradeColor = "yellow-color";
	            } else if (wqiVal >= 80 && wqiVal < 90) {
	                gradeColor = "blue-color";
	            } else {
	                gradeColor = "green-color";
	            }
	            return gradeColor;
	        }
	    }, {
	        key: 'handleItem',
	        value: function handleItem(e) {
	            var mydata = this.state.array || [];
	            var index = e.target.getAttribute('data-index');
	            if (mydata.length > 0 && index < mydata.length) {
	                var _address = mydata[index].uploadLocation ? mydata[index].uploadLocation : " ";
	                var _longVal = mydata[index].longitude ? mydata[index].longitude : " ";
	                var _latVal = mydata[index].latitude ? mydata[index].latitude : " ";
	                location.href = '#/SelectAddress/' + _address + '/' + _longVal + '/' + _latVal + '/' + index + '/';
	            }
	        }
	    }, {
	        key: 'getWqiVal',
	        value: function getWqiVal(toc, cod, chroma, turbidity, tds) {
	            var tocVal = void 0,
	                codVal = void 0,
	                chromaVal = void 0,
	                turbidityVal = void 0,
	                tdsVal = void 0,
	                wqiVal = void 0;
	            if (toc <= 10) {
	                tocVal = this.getValue(99.83217, -2.16162, 0.2634, -0.04584, toc);
	            } else {
	                tocVal = this.getValue(105.54348, -5.5088, 0.09213, -4.34783e-4, toc);
	            }
	            if (cod <= 10) {
	                codVal = this.getValue(99.83217, -2.16162, 0.2634, -0.04584, cod);
	            } else {
	                codVal = this.getValue(105.54348, -5.5088, 0.09213, -4.34783e-4, cod);
	            }
	            if (chroma <= 15) {
	                chromaVal = this.getValue(99.6998, 0.6071, -0.15363, 0.00466, chroma);
	            } else {
	                chromaVal = this.getValue(133.7001, 3.54933, 0.04674, -2.7218E-4, chroma);
	            }
	            if (turbidity <= 10) {
	                turbidityVal = this.getValue(99.83217, 0.17483, -1.58042, 0.07692, turbidity);
	            } else {
	                turbidityVal = this.getValue(27.28261, -0.41315, -0.03971, 8.4058E-4, turbidity);
	            }
	            if (tds <= 400) {
	                tdsVal = this.getValue(99.80276, -0.04722, 1.23839E-4, -1.67599E-7, tds);
	            } else {
	                tdsVal = this.getValue(110, -0.05, 3.32491E-19, -1.01761E-22, tds);
	            }

	            var isHave = false;
	            if (tocVal <= 60) {
	                isHave = true;
	            } else if (chromaVal <= 60) {
	                isHave = true;
	            } else if (turbidityVal <= 60) {
	                isHave = true;
	            } else if (tdsVal <= 60) {
	                isHave = true;
	            }
	            if (isHave) {
	                wqiVal = Math.min(tocVal, codVal, chromaVal, turbidityVal, tdsVal);
	            } else {
	                wqiVal = tocVal * 0.4 + codVal * 0.2 + chromaVal * 0.2 + turbidityVal * 0.15 + tdsVal * 0.05;
	            }
	            wqiVal = Math.round(wqiVal);
	            return wqiVal;
	        }
	    }, {
	        key: 'getValue',
	        value: function getValue(intercept, b1, b2, b3, value) {
	            return intercept + b1 * value + b2 * value + b3 * value;
	        }
	    }, {
	        key: 'syncData',
	        value: function syncData() {
	            var mydata = this.state.array || [];
	            console.log("-----syncData---------" + JSON.stringify(mydata));
	            if (mydata.length > 0) {
	                _Actions.Actions.postData(mydata);
	                history.back();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var mydata = this.state.array || [];
	            return React.createElement(
	                'div',
	                { className: 'waterdetection-body' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF' } }),
	                React.createElement(
	                    'div',
	                    { className: 'waterdetection-content' },
	                    React.createElement(
	                        'ul',
	                        { className: 'syncdata-ul' },
	                        mydata.map(function (item, index) {
	                            var wqiVal = this.getWqiVal(item.toc, item.cod, item.chroma, item.turbidity, item.tds);
	                            return React.createElement(
	                                'li',
	                                {
	                                    className: 'statistics-li', key: index },
	                                React.createElement(
	                                    'article',
	                                    { className: 'statistics-li-parent' },
	                                    React.createElement(
	                                        'div',
	                                        null,
	                                        React.createElement(
	                                            'p',
	                                            { className: item.uploadLocation ? "" : "data-no-address" },
	                                            item.uploadLocation ? item.uploadLocation : '请同步检测地址'
	                                        ),
	                                        React.createElement(
	                                            'p',
	                                            null,
	                                            item.uploadTime
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'a',
	                                        { onTouchEnd: this.handleItem.bind(this), className: 'syncdata-grade-container' },
	                                        React.createElement(
	                                            'span',
	                                            { 'data-index': index,
	                                                className: "syncdata-grade " + this.getGradeColor(wqiVal) },
	                                            this.getGrade(wqiVal)
	                                        )
	                                    )
	                                )
	                            );
	                        }.bind(this))
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'bottom-btn', onTouchEnd: this.syncData.bind(this) },
	                        '\u786E\u5B9A'
	                    )
	                )
	            );
	        }
	    }]);

	    return SyncHisData;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 水质地图页面
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectAddress = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var SelectAddress = exports.SelectAddress = function (_BaseComponent) {
	    _inherits(SelectAddress, _BaseComponent);

	    function SelectAddress(props) {
	        _classCallCheck(this, SelectAddress);

	        var _this2 = _possibleConstructorReturn(this, (SelectAddress.__proto__ || Object.getPrototypeOf(SelectAddress)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            headerTop: isAndroid ? 73 : 64,
	            longVal: props.params.longVal ? props.params.longVal : " ",
	            latVal: props.params.latVal ? props.params.latVal : " ",
	            havaLng: false,
	            address: props.params.address ? props.params.address : " ",
	            selectIndex: props.params.selectIndex ? props.params.selectIndex : -1
	        };
	        _this2.listenStore(_Store.Store); // 监听Store
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '地图选点', setNavRightBtnHiden: 1 }));
	        _Actions.Actions.getTrigger();
	        return _this2;
	    }

	    _createClass(SelectAddress, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var mp = new BMap.Map("allmap");
	            mp.centerAndZoom(new BMap.Point(this.state.longVal != " " ? (this.state.longVal, this.state.latVal) : (116.404, 39.915)), 15);
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps, nextState) {
	            if (this.state.lng != nextState.lng || !this.state.havaLng) {

	                //noinspection JSAnnotator
	                var ComplexCustomOverlay = function ComplexCustomOverlay(point) {
	                    this._point = point;
	                };

	                // 百度地图API功能
	                var _this = this;
	                var map = new BMap.Map("allmap");
	                var point = new BMap.Point(_this.state.longVal != " " ? (_this.state.longVal, _this.state.latVal) : (116.404, 39.915));
	                map.centerAndZoom(point, 15);

	                ComplexCustomOverlay.prototype = new BMap.Overlay();
	                ComplexCustomOverlay.prototype.initialize = function (map) {
	                    this._map = map;
	                    var div = this._div = document.createElement("div");
	                    div.style.position = "relative";
	                    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
	                    div.style.background = "rgba(75, 162, 255, 0.2) no-repeat content-box";
	                    div.style.border = "1px solid rgba(75, 162, 255, 0.4)";
	                    div.style.backgroundSize = "100% 100%";
	                    div.style.width = "133px";
	                    div.style.height = "133px";
	                    div.style.webkitBorderRadius = "50%";
	                    div.style.orderRadius = "50%";
	                    div.style.whiteSpace = "nowrap";
	                    div.style.MozUserSelect = "none";
	                    div.style.MozUserSelect = "none";

	                    var div1 = document.createElement("div");
	                    div.appendChild(div1);
	                    div1.style.background = "url('../static/img/dotbig.png') no-repeat content-box";
	                    div1.style.backgroundSize = "100% 100%";
	                    div1.style.width = "20.5px";
	                    div1.style.height = "18px";
	                    div1.style.position = "absolute";
	                    div1.style.top = "50%";
	                    div1.style.left = "50%";
	                    div1.style.transform = "translate(-50%, -50%)";

	                    map.getPanes().labelPane.appendChild(div);
	                    return div;
	                };
	                ComplexCustomOverlay.prototype.draw = function () {
	                    var map = this._map;
	                    var pixel = map.pointToOverlayPixel(this._point);
	                    this._div.style.left = pixel.x - 133 / 2 + "px";
	                    this._div.style.top = pixel.y - 133 / 2 + "px";
	                };

	                map.addEventListener("dragend", function () {
	                    var pt = map.getCenter(); //获取marker的位置
	                    _this.getAddressVal(pt);
	                });

	                if (_this.state.longVal != " ") {
	                    point = new BMap.Point(_this.state.longVal, _this.state.latVal);
	                    _this.getAddressVal(point);
	                    map.centerAndZoom(point, 15);
	                }
	                if (nextState.lng) {
	                    point = new BMap.Point(nextState.lng, nextState.lat);
	                    _this.getAddressVal(point);
	                    if (_this.state.longVal == " ") {
	                        map.centerAndZoom(point, 15);
	                    }
	                    var myCompOverlay = new ComplexCustomOverlay(point);
	                    map.addOverlay(myCompOverlay);
	                } else {
	                    var geolocation = new BMap.Geolocation();
	                    geolocation.getCurrentPosition(function (r) {
	                        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
	                            point = new BMap.Point(r.point.lng, r.point.lat);
	                            _this.getAddressVal(point);
	                            if (_this.state.longVal == " ") {
	                                map.centerAndZoom(point, 15);
	                            }
	                            var myCompOverlay = new ComplexCustomOverlay(point);
	                            map.addOverlay(myCompOverlay);
	                        }
	                    }, { enableHighAccuracy: true });
	                }
	                _this.setState({
	                    havaLng: true
	                });
	            }
	            return true;
	        }
	    }, {
	        key: 'getAddressVal',
	        value: function getAddressVal(point) {
	            var _this = this;
	            var myGeo = new BMap.Geocoder();
	            myGeo.getLocation(point, function (rs) {
	                var addComp = rs.addressComponents;
	                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
	                _this.setState({
	                    address: address,
	                    longVal: point.lng,
	                    latVal: point.lat
	                });
	                console.log("-----address----------" + address);
	            });
	        }
	    }, {
	        key: 'submit',
	        value: function submit(e) {
	            e.preventDefault();
	            var _this = this;
	            var addressVal = _this.refs.address.innerHTML;
	            _Actions.Actions.changeAddress(_this.state.selectIndex, addressVal, _this.state.longVal, _this.state.latVal);
	            setTimeout(function () {
	                return history.back();
	            }, 100);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var address = this.state.address;
	            return React.createElement(
	                'div',
	                { className: 'waterdetection-body' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: '#4BA2FF' } }),
	                React.createElement(
	                    'div',
	                    { className: 'watermap-content', style: { height: window.innerHeight - this.state.headerTop } },
	                    React.createElement('div', { id: 'allmap' }),
	                    React.createElement(
	                        'div',
	                        { className: 'watermap-top-container' },
	                        React.createElement(
	                            'div',
	                            { className: 'watermap-info' },
	                            React.createElement(
	                                'span',
	                                { ref: 'address' },
	                                address
	                            )
	                        )
	                    ),
	                    React.createElement('img', { className: 'map-center', src: '../static/img/mylocation-icon.png', alt: '' }),
	                    React.createElement(
	                        'div',
	                        { className: 'bottom-btn', onTouchEnd: this.submit.bind(this) },
	                        '\u786E\u5B9A'
	                    )
	                )
	            );
	        }
	    }]);

	    return SelectAddress;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);