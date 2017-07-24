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

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
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

	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
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
	            var myData = this.state.data || {};
	            console.log("-------------" + JSON.stringify(myData));

	            var tocVal = myData.toc ? myData.toc : '0',
	                //toc
	            codVal = myData.cod ? myData.cod : '0',
	                //cod
	            chromaVal = myData.chroma ? myData.chroma : '0',
	                //色度
	            tdsVal = myData.tds ? myData.tds : '0',
	                //tds
	            wqiVal = myData.wqi ? myData.wqi : '0'; //wqi

	            var gradeVal = myData.wqi ? this.getGrade(wqiVal) : "--";
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '水质状况：' + gradeVal + ' ',
	                    '综合评分：' + wqiVal + '分'
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: '../static/img/TDS.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            tdsVal + "mg/L"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: '../static/img/TOC.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            tocVal + "mg/L"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: "../static/img/COD.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            codVal + "mg/L"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell' },
	                        React.createElement('img', { src: "../static/img/color.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            chromaVal
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
	    het.setTitle('手持式水质检测仪');
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

/***/ }
/******/ ]);