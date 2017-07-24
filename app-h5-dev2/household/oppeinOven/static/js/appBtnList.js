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

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _constants = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	het.domReady(function () {
	    het.config({
	        renderConfigData: true
	    });
	});
	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = _constants.STATE;
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        });
	        _this.handleMode = _this.handleMode.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.sendTimer = null;
	        }
	    }, {
	        key: 'handleMode',
	        value: function handleMode() {
	            var _this2 = this;

	            var _state = this.state,
	                modestatus = _state.modestatus,
	                ChildLockStatus = _state.ChildLockStatus,
	                runmode = _state.runmode,
	                online = _state.online;

	            var nextMode = modestatus == 8 ? 1 : modestatus + 1;
	            this.setState({ 'modestatus': nextMode, 'changeMode': true });
	            _Actions.Actions.cacheData({ 'nextMode': nextMode });
	            clearTimeout(this.sendTimer);
	            this.sendTimer = setTimeout(function () {
	                _this2.setState({ 'changeMode': false });
	                _Actions.Actions.sendData({ 'mode': nextMode, 'power': 1, 'pause': 2, 'reservationhour': 0, 'reservationmin': 0, 'workhour': 0, 'workmin': 30, 'temperatureset': _constants.DEFAULTTEMPERATURE[nextMode] });
	            }, 3000);
	        }
	    }, {
	        key: 'renderTopDOM',
	        value: function renderTopDOM() {
	            var _state2 = this.state,
	                networkavailable = _state2.networkavailable,
	                online = _state2.online,
	                modestatus = _state2.modestatus,
	                RapidHeatingState = _state2.RapidHeatingState,
	                runmode = _state2.runmode,
	                changeMode = _state2.changeMode;

	            var text = '';
	            if (networkavailable == 2) {
	                return '网络已断开';
	            }
	            if (online == 2) {
	                return '设备已离线';
	            }
	            if (runmode == 2) {
	                return '设备已关机';
	            }
	            if (runmode == 3) {
	                return '待机中';
	            }
	            return (0, _constants.showStateTxt)(this.state) + '  ' + (modestatus ? '\u6A21\u5F0F\uFF1A' + _constants.RUNMODE[modestatus] : '') + ' ' + (RapidHeatingState === 1 ? '快速加热' : '');
	        }
	    }, {
	        key: 'renderModeDOM',
	        value: function renderModeDOM() {
	            var _state3 = this.state,
	                online = _state3.online,
	                ChildLockStatus = _state3.ChildLockStatus,
	                modestatus = _state3.modestatus,
	                runmode = _state3.runmode;

	            return React.createElement(
	                'article',
	                { className: (0, _constants.hideOverlayer)(ChildLockStatus == 2 && runmode == 3 && online == 1) },
	                React.createElement(
	                    'div',
	                    { onTouchTap: this.handleMode },
	                    React.createElement('img', { src: '../static/img/btnlist/mode' + modestatus + '.png', alt: '' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        _constants.RUNMODE[modestatus]
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var _state4 = this.state,
	                online = _state4.online,
	                networkavailable = _state4.networkavailable,
	                modestatus = _state4.modestatus,
	                ChildLockStatus = _state4.ChildLockStatus,
	                temperature = _state4.temperature,
	                PauseStatus = _state4.PauseStatus,
	                RapidHeatingState = _state4.RapidHeatingState,
	                runmode = _state4.runmode;


	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    this.renderTopDOM()
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: (0, _constants.hideOverlayer)(online == 1 && networkavailable == 1) },
	                        React.createElement(
	                            'div',
	                            { onTouchTap: function onTouchTap(e) {
	                                    (0, _constants.sendPowerData)(_this3.state);
	                                } },
	                            (0, _constants.showPowerIcon)(this.state, 1),
	                            React.createElement(
	                                'p',
	                                null,
	                                (0, _constants.showPowerTxt)(this.state)
	                            )
	                        )
	                    ),
	                    this.renderModeDOM(),
	                    React.createElement(
	                        'article',
	                        { className: (0, _constants.hideOverlayer)(modestatus != 9 && (0, _constants.isRapidheat)(this.state) && ChildLockStatus == 2 && online == 1 && networkavailable == 1 && !(0, _constants.isFinish)(this.state)) },
	                        React.createElement(
	                            'div',
	                            { onTouchTap: function onTouchTap(e) {
	                                    (0, _constants.sendRapidheatData)(_this3.state);
	                                } },
	                            React.createElement('img', { src: '../static/img/btnlist/rapidheating.png', alt: '' }),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u5FEB\u901F\u52A0\u70ED'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: (0, _constants.hideOverlayer)(modestatus != 9 && (0, _constants.isRun)(this.state) && ChildLockStatus == 2 && online == 1 && networkavailable == 1 && !(0, _constants.isFinish)(this.state)) },
	                        React.createElement(
	                            'div',
	                            { onTouchTap: function onTouchTap(e) {
	                                    (0, _constants.sendPauseData)(_this3.state);
	                                } },
	                            React.createElement('img', { src: '../static/img/btnlist/pause' + PauseStatus + '.png', alt: '' }),
	                            React.createElement(
	                                'p',
	                                null,
	                                _constants.PAUSE[PauseStatus]
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	het.domReady(function () {
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', 'sendData', // 发送过滤数据
	'getParam', // 设置配置信息
	'cacheData' // 设置过滤数据，不发送
	]);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Actions = __webpack_require__(2);

	var _constants = __webpack_require__(4);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var dataFilterTimers = _extends({}, _constants.UPDATEFLAG);

	var dataFilter = function dataFilter(data) {
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    return result;
	};
	var setDataTimer = function setDataTimer() {
	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    var time = new Date().getTime() + 10e3;
	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	};
	var calcFlag = function calcFlag() {
	    // 递归计算updateFlag的值
	    return [].concat(Array.prototype.slice.call(arguments)).reduce(function (pre, el) {
	        return het.hexUpFlag(el, 1, 2, pre);
	    }, 0);
	};

	var productId = 0,
	    deviceId = 0; // 设置全局，由于子路由跳转获取不到productId，deviceId
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data, type) {
	        if (data.productId) {
	            productId = data.productId;
	        }
	        if (data.deviceId) {
	            deviceId = data.deviceId;
	        }
	        this.trigger(_extends({}, dataFilter(data)));
	    },
	    onSendData: function onSendData(json) {
	        var _this = this;

	        var updateArray = [],
	            filterArray = [];
	        Object.keys(json).forEach(function (el) {
	            updateArray.push(_constants.UPDATEFLAG[el]);
	            filterArray.push(_constants.DATAFILTER[el]);
	        });

	        het.send(_extends({}, json, { 'updateFlag': calcFlag.apply(undefined, updateArray) }), function (data) {
	            var cacheData = {};
	            for (var k in json) {
	                cacheData[_constants.DATAFILTER[k]] = json[k];
	            }
	            Object.keys(_constants.DATAHAND).forEach(function (el) {
	                // 手动设置过滤的数据
	                if (el in cacheData) {
	                    cacheData[_constants.DATAHAND[el]] = cacheData[el];
	                    filterArray.push(_constants.DATAHAND[el]);
	                }
	            });
	            setDataTimer.apply(undefined, filterArray);
	            _this.trigger(cacheData);
	        }, function (data) {
	            het.toast('命令发送失败');
	        });
	    },
	    onCacheData: function onCacheData(json) {
	        // 只过滤，不发送
	        setDataTimer.apply(undefined, _toConsumableArray(Object.keys(json)));
	        this.trigger(json);
	    },
	    onGetParam: function onGetParam() {
	        if (deviceId) {
	            this.trigger({ deviceId: deviceId });
	        }
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cancelClock = exports.isOwnEmpty = exports.setTitle = exports.isCloudFinished = exports.isFinish = exports.sendRapidheatData = exports.sendPauseData = exports.sendPowerData = exports.hideOverlayer = exports.showOverlayer = exports.showPowerIcon = exports.isRapidheat = exports.addZero = exports.showPowerTxt = exports.isOffline = exports.isRun = exports.showStateTxt = exports.PRODUCTID = exports.SETCLOCK = exports.CONFIGURATION = exports.MENUDETAIL = exports.MENULIST = exports.DOMAIN = exports.TOPDISTANCE = exports.DATAHAND = exports.DATAFILTER = exports.DATEARRAY = exports.UPDATEFLAG = exports.DEFAULTTEMPERATURE = exports.MAXTEMPERATURE = exports.MINTEMPERATURE = exports.CHANGEPOWERVALUE = exports.CHANGEVALUE = exports.STATE = exports.PAUSE = exports.RUNMODE = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _Actions = __webpack_require__(2);

	var RUNMODE = ['模式', '对流烧烤', '对流加热', '静态烘焙', '对流烤', '披萨', '解冻', '烘焙', '烤肉', '云菜谱'];
	var PAUSE = ['停止', '启动', '暂停'];
	var STATE = {
	    networkavailable: 1,
	    online: 1,
	    power: 2,
	    runmode: 2,
	    mode: 1,
	    modestatus: 1,
	    pause: 2,
	    PauseStatus: 2,
	    childlock: 2,
	    ChildLockStatus: 2,
	    temperatureset: 160,
	    temperaturestatus: 0,
	    reservationhour: 0,
	    reservationmin: 0,
	    remainingworkingtimehour: 0,
	    remainingworkingtimemin: 0,
	    remainingreservationtimehour: 0,
	    remainingreservationtimemin: 0,
	    workhour: 0,
	    workmin: 30,
	    SetWorkTimeMin: 0,
	    SetWorkTimeHour: 0,
	    LightStatus: 2,
	    SetReservationTimeHour: 0,
	    SetReservationTimeMin: 0,
	    TempSenserShortCircuitError: 0,
	    NoTempSenserError: 0,
	    HeatingError: 0,
	    RapidHeatingState: 2
	};
	var CHANGEVALUE = [0, 2, 1];
	var CHANGEPOWERVALUE = [0, 3, 3, 2];
	var MINTEMPERATURE = [0, 50, 50, 50, 50, 50, 50, 50, 50];
	var MAXTEMPERATURE = [0, 250, 250, 250, 250, 250, 60, 235, 235];
	var DEFAULTTEMPERATURE = [0, 160, 180, 180, 180, 180, 50, 180, 180];
	var UPDATEFLAG = {
	    'power': 0,
	    'pause': 1,
	    'rapidheating': 2,
	    'temperatureset': 3,
	    'workhour': 4,
	    'workmin': 5,
	    'reservationhour': 6,
	    'reservationmin': 7,
	    'light': 8,
	    'childlock': 9,
	    'mode': 10
	};
	var DATAFILTER = {
	    'power': 'runmode',
	    'pause': 'PauseStatus',
	    'rapidheating': 'RapidHeatingState',
	    'temperatureset': 'temperaturestatus',
	    'workhour': 'SetWorkTimeHour',
	    'workmin': 'SetWorkTimeMin',
	    'reservationhour': 'SetReservationTimeHour',
	    'reservationmin': 'SetReservationTimeMin',
	    'light': 'LightStatus',
	    'childlock': 'ChildLockStatus',
	    'mode': 'modestatus'
	};

	var DATAHAND = {
	    'temperaturestatus': 'temperatureset',
	    'SetWorkTimeHour': 'remainingworkingtimehour',
	    'SetWorkTimeMin': 'remainingworkingtimemin',
	    'SetReservationTimeHour': 'remainingreservationtimehour',
	    'SetReservationTimeMin': 'remainingreservationtimemin'
	};

	var DATEARRAY = ['00', '05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

	var TOPDISTANCE = !!(navigator.userAgent.indexOf('Android') + 1) ? 73 : 64;

	var DOMAIN = '';
	var MENULIST = '/v1/app/customization/cookbook/menu/menuList';
	var MENUDETAIL = '/v1/app/customization/cookbook/menu/getMenuByMenuId';
	var CONFIGURATION = '/v1/device/config/configurationData';
	var SETCLOCK = '/v1/app/customization/cookbook/user/setClockList';
	var CANCELCLOCK = '/v1/app/customization/cookbook/user/cancelClock';
	var PRODUCTID = 1932;

	var showStateTxt = function showStateTxt(state) {
	    // 状态显示文字
	    var online = state.online,
	        runmode = state.runmode,
	        remainingreservationtimehour = state.remainingreservationtimehour,
	        remainingreservationtimemin = state.remainingreservationtimemin,
	        remainingworkingtimehour = state.remainingworkingtimehour,
	        remainingworkingtimemin = state.remainingworkingtimemin,
	        SetWorkTimeHour = state.SetWorkTimeHour,
	        SetWorkTimeMin = state.SetWorkTimeMin,
	        PauseStatus = state.PauseStatus;

	    var modetxt = '';
	    if (online == 2) {
	        modetxt = '设备已离线';
	    } else {
	        if (runmode === 2) {
	            modetxt = '设备已关机';
	        } else if (runmode == 3) {
	            modetxt = '待机中';
	        } else {
	            if (remainingreservationtimehour || remainingreservationtimemin) {
	                //
	                modetxt = '预约中';
	            } else {
	                if (remainingworkingtimehour == 0 && remainingworkingtimemin == 0 && (SetWorkTimeHour != 0 || SetWorkTimeMin != 0)) {
	                    // 设置工作时间不为0，剩余工作时间为0
	                    modetxt = '烘焙完成';
	                } else {
	                    if (PauseStatus == 1) {
	                        modetxt = '暂停';
	                    } else {
	                        modetxt = '烘焙中';
	                    }
	                }
	            }
	        }
	    }
	    return modetxt;
	};
	var isFinish = function isFinish(state) {
	    //判断是否烘焙完成
	    var online = state.online,
	        runmode = state.runmode,
	        remainingworkingtimehour = state.remainingworkingtimehour,
	        remainingworkingtimemin = state.remainingworkingtimemin,
	        SetWorkTimeHour = state.SetWorkTimeHour,
	        SetWorkTimeMin = state.SetWorkTimeMin;

	    return online == 1 && runmode == 1 && remainingworkingtimehour == 0 && remainingworkingtimemin == 0 && (SetWorkTimeHour || SetWorkTimeMin);
	};
	var isRun = function isRun(state) {
	    // 判断是否为烘焙中状态
	    var runmode = state.runmode,
	        remainingreservationtimehour = state.remainingreservationtimehour,
	        remainingreservationtimemin = state.remainingreservationtimemin;

	    return runmode == 1 && remainingreservationtimehour == 0 && remainingreservationtimemin == 0;
	};
	var isOffline = function isOffline(state) {
	    var networkavailable = state.networkavailable,
	        online = state.online;

	    if (networkavailable == 2) {
	        het.toast('网络已断开');
	        return false;
	    }
	    if (online == 2) {
	        het.toast('设备已离线');
	        return false;
	    }
	    return true;
	};
	var showPowerTxt = function showPowerTxt(state) {
	    var ChildLockStatus = state.ChildLockStatus,
	        runmode = state.runmode;

	    var powertxt = '电源';
	    if (ChildLockStatus === 1) {
	        powertxt = '解锁';
	    } else if (ChildLockStatus == 2 && runmode == 1) {
	        powertxt = '取消';
	    }
	    return powertxt;
	};
	var addZero = function addZero() {
	    var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	    var num = num;
	    var str = num.toString();
	    return new Array(3 - str.length).join('0') + str;
	};
	var isRapidheat = function isRapidheat(state) {
	    var temperatureset = state.temperatureset,
	        ChildLockStatus = state.ChildLockStatus,
	        runmode = state.runmode,
	        modestatus = state.modestatus,
	        remainingreservationtimehour = state.remainingreservationtimehour,
	        remainingreservationtimemin = state.remainingreservationtimemin;

	    return runmode == 1 && temperatureset >= 100 && ChildLockStatus == 2 && modestatus > 0 && modestatus < 4 && remainingreservationtimehour == 0 && remainingreservationtimemin == 0;
	};
	var isCloudFinished = function isCloudFinished(state) {
	    var modestatus = state.modestatus,
	        reciperemainingworkingtimehour = state.reciperemainingworkingtimehour,
	        reciperemainingworkingtimemin = state.reciperemainingworkingtimemin,
	        recipenumber = state.recipenumber,
	        recipeworkingnumber = state.recipeworkingnumber;

	    if (modestatus == 9 && reciperemainingworkingtimehour == 0 && reciperemainingworkingtimemin == 0 && recipenumber == recipeworkingnumber) {
	        return true;
	    }
	    return false;
	};
	var showPowerIcon = function showPowerIcon(state, isBt) {
	    var runmode = state.runmode,
	        ChildLockStatus = state.ChildLockStatus,
	        modestatus = state.modestatus,
	        online = state.online;

	    var powIcon = '';
	    if (runmode == 1) {
	        if (ChildLockStatus == 1) {
	            powIcon = 'childlock';
	        } else {
	            powIcon = modestatus ? 'cancel' : 'icon-power1';
	        }
	    } else {
	        powIcon = 'icon-power' + runmode;
	    }
	    return React.createElement('img', { src: '../static/img/' + (isBt ? 'btnlist/' : '') + powIcon + '.png' });
	};
	var showOverlayer = function showOverlayer(show) {
	    return show ? '' : 'hidden';
	};
	var hideOverlayer = function hideOverlayer(hide) {
	    return hide ? 'hidden' : '';
	};
	var cancelClock = function cancelClock(state) {
	    var MenuNumberHigh = state.MenuNumberHigh,
	        MenuNumberLow = state.MenuNumberLow,
	        menuId = MenuNumberHigh * 256 + MenuNumberLow;

	    if (menuId) {
	        het.post(CANCELCLOCK, {
	            menuId: MenuNumberHigh * 256 + MenuNumberLow
	        });
	    }
	};
	var sendPowerData = function sendPowerData(state) {
	    var ChildLockStatus = state.ChildLockStatus,
	        runmode = state.runmode;

	    if (ChildLockStatus == 1) {
	        _Actions.Actions.sendData({ 'childlock': 2 });
	        return false;
	    }

	    var postPower = CHANGEPOWERVALUE[runmode],
	        postPowerJson = { 'power': postPower };
	    var addJson = {};
	    if (postPower == 3) {
	        addJson = { 'mode': 0, 'rapidheating': 2 }; //待机手动初始化mode
	        cancelClock(state);
	    } else if (postPower == 2) {
	        addJson = { 'light': 2 }; // 关机手动初始化关灯状态
	    }
	    _Actions.Actions.sendData(_extends({}, postPowerJson, addJson));
	};
	var sendPauseData = function sendPauseData(state) {
	    _Actions.Actions.sendData({ 'pause': CHANGEVALUE[state.PauseStatus] });
	};
	var sendRapidheatData = function sendRapidheatData(state) {
	    _Actions.Actions.sendData({ 'rapidheating': CHANGEVALUE[state.RapidHeatingState] });
	};
	var setTitle = function setTitle(value) {
	    return het.setTitle(JSON.stringify({
	        setNavTitle: 1,
	        title: value,
	        setNavRightBtnHiden: 0
	    }));
	};
	var isOwnEmpty = function isOwnEmpty(obj) {
	    for (var name in obj) {
	        if (obj.hasOwnProperty(name)) {
	            return false;
	        }
	    }
	    return true;
	};

	exports.RUNMODE = RUNMODE;
	exports.PAUSE = PAUSE;
	exports.STATE = STATE;
	exports.CHANGEVALUE = CHANGEVALUE;
	exports.CHANGEPOWERVALUE = CHANGEPOWERVALUE;
	exports.MINTEMPERATURE = MINTEMPERATURE;
	exports.MAXTEMPERATURE = MAXTEMPERATURE;
	exports.DEFAULTTEMPERATURE = DEFAULTTEMPERATURE;
	exports.UPDATEFLAG = UPDATEFLAG;
	exports.DATEARRAY = DATEARRAY;
	exports.DATAFILTER = DATAFILTER;
	exports.DATAHAND = DATAHAND;
	exports.TOPDISTANCE = TOPDISTANCE;
	exports.DOMAIN = DOMAIN;
	exports.MENULIST = MENULIST;
	exports.MENUDETAIL = MENUDETAIL;
	exports.CONFIGURATION = CONFIGURATION;
	exports.SETCLOCK = SETCLOCK;
	exports.PRODUCTID = PRODUCTID;
	exports.showStateTxt = showStateTxt;
	exports.isRun = isRun;
	exports.isOffline = isOffline;
	exports.showPowerTxt = showPowerTxt;
	exports.addZero = addZero;
	exports.isRapidheat = isRapidheat;
	exports.showPowerIcon = showPowerIcon;
	exports.showOverlayer = showOverlayer;
	exports.hideOverlayer = hideOverlayer;
	exports.sendPowerData = sendPowerData;
	exports.sendPauseData = sendPauseData;
	exports.sendRapidheatData = sendRapidheatData;
	exports.isFinish = isFinish;
	exports.isCloudFinished = isCloudFinished;
	exports.setTitle = setTitle;
	exports.isOwnEmpty = isOwnEmpty;
	exports.cancelClock = cancelClock;

/***/ }
/******/ ]);