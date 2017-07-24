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

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _ModeSelect = __webpack_require__(8);

	var _DialogStyle = __webpack_require__(11);

	var _MenuList = __webpack_require__(12);

	var _MenuDetail = __webpack_require__(45);

	var _range = __webpack_require__(9);

	var _range2 = _interopRequireDefault(_range);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        // debugMode:'print',
	        renderConfigData: true
	    });
	});
	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = _extends({}, _constants.STATE, { setShow: false, err: false, confirmShow: false, errorContent: '' });
	        _this.listenStore(_Store.Store);
	        _this.handleLight = _this.handleLight.bind(_this);
	        _this.handlePower = _this.handlePower.bind(_this);
	        _this.handleSet = _this.handleSet.bind(_this);
	        _this.handleTemperatureSet = _this.handleTemperatureSet.bind(_this);
	        _this.handleWorkTimeSet = _this.handleWorkTimeSet.bind(_this);
	        _this.handleRunCancel = _this.handleRunCancel.bind(_this);
	        _this.handleRunConfirm = _this.handleRunConfirm.bind(_this);
	        _this.handleCancelError = _this.handleCancelError.bind(_this);
	        _this.handleContact = _this.handleContact.bind(_this);
	        _this.handlePowerConfirm = _this.handlePowerConfirm.bind(_this);
	        _this.handlePoweCancel = _this.handlePoweCancel.bind(_this);
	        _this.handleConfirmCancel = _this.handleConfirmCancel.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            het.setTitle(JSON.stringify({
	                setNavTitle: 0,
	                title: '欧派烤箱',
	                setNavRightBtnHiden: 0
	            }));
	        }
	    }, {
	        key: 'showAppointTime',
	        value: function showAppointTime() {
	            // 动态显示预约时间 
	            var _state = this.state,
	                runmode = _state.runmode,
	                remainingreservationtimemin = _state.remainingreservationtimemin,
	                remainingreservationtimehour = _state.remainingreservationtimehour,
	                online = _state.online,
	                modestatus = _state.modestatus,
	                recipeworkingnumber = _state.recipeworkingnumber,
	                recipenumber = _state.recipenumber;

	            if (online == 1 && runmode == 1) {
	                if (modestatus == 9) {
	                    return React.createElement(
	                        'span',
	                        null,
	                        recipeworkingnumber,
	                        '/',
	                        recipenumber
	                    );
	                }
	                if (remainingreservationtimehour || remainingreservationtimemin) {
	                    return React.createElement(
	                        'span',
	                        null,
	                        (0, _constants.addZero)(remainingreservationtimehour) + ':' + (0, _constants.addZero)(remainingreservationtimemin)
	                    );
	                }
	            }
	        }
	    }, {
	        key: 'showPowerIcon',
	        value: function showPowerIcon() {
	            // 动态显示电源图标
	            var _state2 = this.state,
	                runmode = _state2.runmode,
	                ChildLockStatus = _state2.ChildLockStatus,
	                modestatus = _state2.modestatus;

	            var powIcon = 'icon-power2';
	            if (runmode == 1) {
	                if (ChildLockStatus == 1) {
	                    powIcon = 'childlock2';
	                } else {
	                    powIcon = modestatus ? 'cancel' : 'icon-power1';
	                }
	            } else if (runmode == 3) {
	                powIcon = 'icon-power1';
	            }
	            return React.createElement('img', { src: '../static/img/' + powIcon + '.png' });
	        }
	    }, {
	        key: 'showTime',
	        value: function showTime() {
	            var _state3 = this.state,
	                SetWorkTimeHour = _state3.SetWorkTimeHour,
	                SetWorkTimeMin = _state3.SetWorkTimeMin,
	                remainingworkingtimehour = _state3.remainingworkingtimehour,
	                remainingworkingtimemin = _state3.remainingworkingtimemin,
	                reciperemainingworkingtimemin = _state3.reciperemainingworkingtimemin,
	                reciperemainingworkingtimehour = _state3.reciperemainingworkingtimehour,
	                modestatus = _state3.modestatus;

	            if (modestatus == 9) {
	                return React.createElement(
	                    'span',
	                    null,
	                    (0, _constants.addZero)(parseInt(reciperemainingworkingtimehour)),
	                    ' : ',
	                    (0, _constants.addZero)(reciperemainingworkingtimemin)
	                );
	            }
	            return (0, _constants.isRun)(this.state) ? React.createElement(
	                'span',
	                null,
	                (0, _constants.addZero)(remainingworkingtimehour),
	                ':',
	                (0, _constants.addZero)(remainingworkingtimemin)
	            ) : React.createElement(
	                'span',
	                null,
	                (0, _constants.addZero)(SetWorkTimeHour),
	                ':',
	                (0, _constants.addZero)(SetWorkTimeMin)
	            );
	        }
	    }, {
	        key: 'showTemperature',
	        value: function showTemperature() {
	            // 如果是烘焙中
	            var _state4 = this.state,
	                temperaturestatus = _state4.temperaturestatus,
	                temperatureset = _state4.temperatureset,
	                recipetemperature = _state4.recipetemperature,
	                modestatus = _state4.modestatus;

	            if (modestatus == 9) {
	                return React.createElement(
	                    'span',
	                    { className: 'temperature-num' },
	                    recipetemperature,
	                    '\u2103'
	                );
	            }
	            return (0, _constants.isRun)(this.state) ? React.createElement(
	                'span',
	                { className: 'temperature-num' },
	                temperaturestatus ? temperaturestatus + '\u2103' : '--'
	            ) : React.createElement(
	                'span',
	                { className: 'temperature-num' },
	                temperatureset ? temperatureset + '\u2103' : '--'
	            );
	        }
	    }, {
	        key: 'handleLight',
	        value: function handleLight() {
	            _Actions.Actions.sendData({ 'light': _constants.CHANGEVALUE[this.state.LightStatus] });
	        }
	    }, {
	        key: 'handlePower',
	        value: function handlePower() {
	            (0, _constants.sendPowerData)(this.state);
	        }
	    }, {
	        key: 'handleSet',
	        value: function handleSet() {
	            this.setState({ 'setShow': true });
	        }
	    }, {
	        key: 'handleTemperatureSet',
	        value: function handleTemperatureSet(value) {
	            this.setState({ 'changeTemperature': value });
	        }
	    }, {
	        key: 'handleWorkTimeSet',
	        value: function handleWorkTimeSet(value) {
	            this.setState({ 'chWorkhour': parseInt(value / 60), 'chWorkmin': value % 60 });
	        }
	    }, {
	        key: 'handleRunCancel',
	        value: function handleRunCancel() {
	            this.setState({ 'changeTemperature': undefined, 'chWorkhour': undefined, 'chWorkmin': undefined, 'setShow': false });
	        }
	    }, {
	        key: 'handleRunConfirm',
	        value: function handleRunConfirm() {
	            var _state5 = this.state,
	                temperatureset = _state5.temperatureset,
	                changeTemperature = _state5.changeTemperature,
	                SetWorkTimeHour = _state5.SetWorkTimeHour,
	                chWorkhour = _state5.chWorkhour,
	                SetWorkTimeMin = _state5.SetWorkTimeMin,
	                chWorkmin = _state5.chWorkmin,
	                t = changeTemperature === undefined ? temperatureset : changeTemperature,
	                h = chWorkhour == undefined ? SetWorkTimeHour : chWorkhour,
	                m = chWorkmin == undefined ? SetWorkTimeMin : chWorkmin;

	            _Actions.Actions.sendData({ 'temperatureset': t, 'workhour': h, 'workmin': m });
	            this.setState({ 'setShow': false });
	        }
	    }, {
	        key: 'handleCancelError',
	        value: function handleCancelError() {
	            this.setState({ 'err': true });
	        }
	    }, {
	        key: 'handleContact',
	        value: function handleContact() {
	            location.href = 'tel:4007772009';
	            this.setState({ 'err': true });
	        }
	    }, {
	        key: 'handlePowerConfirm',
	        value: function handlePowerConfirm() {
	            (0, _constants.sendPowerData)(this.state);
	            this.setState({ 'confirmShow': false });
	        }
	    }, {
	        key: 'handlePoweCancel',
	        value: function handlePoweCancel() {
	            this.setState({ 'confirmShow': false });
	        }
	    }, {
	        key: 'handleConfirmCancel',
	        value: function handleConfirmCancel() {
	            this.setState({ 'confirmShow': true });
	        }
	    }, {
	        key: 'renderModeDOM',
	        value: function renderModeDOM() {
	            var _state6 = this.state,
	                modestatus = _state6.modestatus,
	                runmode = _state6.runmode,
	                ChildLockStatus = _state6.ChildLockStatus;

	            if (runmode == 2) {
	                return React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'div',
	                        { className: 'app-ctrl-con' },
	                        React.createElement('img', { src: '../static/img/icon-mode' + modestatus + '-off.png' }),
	                        _constants.RUNMODE[modestatus]
	                    )
	                );
	            }
	            if (runmode == 3) {
	                return React.createElement(
	                    'div',
	                    { className: 'hidden' },
	                    React.createElement(
	                        Link,
	                        { to: '/ModeSelect' },
	                        React.createElement(
	                            'div',
	                            { className: 'app-ctrl-con' },
	                            React.createElement('img', { src: '../static/img/icon-mode0.png' }),
	                            '\u6A21\u5F0F'
	                        )
	                    )
	                );
	            }

	            if (runmode == 1) {
	                return React.createElement(
	                    'div',
	                    { className: (0, _constants.showOverlayer)(modestatus == 9 || ChildLockStatus == 1 || (0, _constants.isFinish)(this.state)) },
	                    React.createElement(
	                        'div',
	                        { className: 'app-ctrl-con', onTouchTap: this.handleSet },
	                        React.createElement('img', { src: '../static/img/icon-mode' + modestatus + '.png' }),
	                        modestatus == 9 ? '模式' : _constants.RUNMODE[modestatus]
	                    )
	                );
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var _state7 = this.state,
	                online = _state7.online,
	                temperatureset = _state7.temperatureset,
	                temperaturestatus = _state7.temperaturestatus,
	                changeTemperature = _state7.changeTemperature,
	                reservationhour = _state7.reservationhour,
	                reservationmin = _state7.reservationmin,
	                SetWorkTimeHour = _state7.SetWorkTimeHour,
	                chWorkhour = _state7.chWorkhour,
	                SetWorkTimeMin = _state7.SetWorkTimeMin,
	                chWorkmin = _state7.chWorkmin,
	                mode = _state7.mode,
	                modestatus = _state7.modestatus,
	                ChildLockStatus = _state7.ChildLockStatus,
	                LightStatus = _state7.LightStatus,
	                runmode = _state7.runmode,
	                RapidHeatingState = _state7.RapidHeatingState,
	                PauseStatus = _state7.PauseStatus,
	                setShow = _state7.setShow,
	                confirmShow = _state7.confirmShow,
	                NoTempSenserError = _state7.NoTempSenserError,
	                TempSenserShortCircuitError = _state7.TempSenserShortCircuitError,
	                HeatingError = _state7.HeatingError,
	                err = _state7.err,
	                errorContent = _state7.errorContent,
	                networkavailable = _state7.networkavailable,
	                MenuNumberHigh = _state7.MenuNumberHigh,
	                MenuNumberLow = _state7.MenuNumberLow,
	                showWorkhour = chWorkhour === undefined ? SetWorkTimeHour : chWorkhour,
	                showWorkmin = chWorkmin === undefined ? SetWorkTimeMin : chWorkmin,
	                errorShow = (parseInt(NoTempSenserError) || parseInt(TempSenserShortCircuitError) || parseInt(HeatingError)) && !err ? 1 : 0,
	                errNum = parseInt(NoTempSenserError) + parseInt(TempSenserShortCircuitError) + parseInt(HeatingError),
	                showErrorContent = '' + (errNum > 1 ? '<ol>' : '<ul>') + (parseInt(NoTempSenserError) ? '<li>无温度传感器故障</li>' : '') + (parseInt(TempSenserShortCircuitError) ? '<li>温度传感器短路故障</li>' : '') + (parseInt(HeatingError) ? '<li>加热故障</li>' : '') + (errNum > 1 ? '</ol>' : '</ul>');

	            if (networkavailable == 2) {
	                het.toast('网络断开连接');
	            }
	            var menuId = MenuNumberHigh * 256 + MenuNumberLow;
	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'div',
	                    { className: 'app-bg ' + ((0, _constants.isRun)(this.state) ? 'app-run-bg' : '') },
	                    React.createElement(
	                        'div',
	                        { className: 'app-txt' },
	                        React.createElement(
	                            'div',
	                            { className: 'app-state' },
	                            (0, _constants.showStateTxt)(this.state),
	                            ' ',
	                            this.showAppointTime()
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'app-temper' },
	                            modestatus && runmode == 1 && online == 1 ? React.createElement(
	                                'div',
	                                null,
	                                this.showTemperature(),
	                                this.showTime()
	                            ) : '-- : --'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'app-ctrl' },
	                    online == 2 ? React.createElement(
	                        'div',
	                        { className: 'off-line' },
	                        React.createElement('img', { src: '../static/img/off-line.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u4E3B\u4EBA\uFF0C\u60A8\u7684\u70E4\u7BB1\u4E0D\u5728\u7EBF\u54E6~\uFF01'
	                        )
	                    ) : '',
	                    React.createElement(
	                        'div',
	                        { className: 'flex app-ctrl-list' },
	                        React.createElement(
	                            'div',
	                            { className: 'hidden' },
	                            React.createElement(
	                                'div',
	                                { className: 'app-ctrl-con', onTouchTap: (0, _constants.isRun)(this.state) && ChildLockStatus == 2 ? this.handleConfirmCancel : this.handlePower },
	                                (0, _constants.showPowerIcon)(this.state),
	                                (0, _constants.showPowerTxt)(this.state)
	                            )
	                        ),
	                        this.renderModeDOM(),
	                        React.createElement(
	                            'div',
	                            { className: (0, _constants.hideOverlayer)(runmode != 2 && ChildLockStatus === 2 && (modestatus == 0 || modestatus == 9)) },
	                            React.createElement(
	                                Link,
	                                { to: '/' + (menuId && modestatus == 9 ? 'MenuDetail?menuId=' + menuId : 'MenuList') },
	                                React.createElement(
	                                    'div',
	                                    { className: 'app-ctrl-con' },
	                                    React.createElement('img', { src: '../static/img/menu' + (modestatus == 9 ? '' : '-off') + '.png' }),
	                                    '\u4E91\u83DC\u8C31'
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'flex app-ctrl-list' },
	                        React.createElement(
	                            'div',
	                            { className: (0, _constants.hideOverlayer)(modestatus != 9 && ChildLockStatus == 2 && (0, _constants.isRun)(this.state) && !(0, _constants.isFinish)(this.state)) },
	                            React.createElement(
	                                'div',
	                                { className: 'app-ctrl-con', onTouchTap: function onTouchTap(e) {
	                                        (0, _constants.sendPauseData)(_this2.state);
	                                    } },
	                                React.createElement('img', { src: '../static/img/pause' + PauseStatus + ((0, _constants.isRun)(this.state) ? '' : '-off') + '.png' }),
	                                _constants.PAUSE[PauseStatus]
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: (0, _constants.showOverlayer)(runmode == 2) },
	                            React.createElement(
	                                'div',
	                                { className: 'app-ctrl-con', onTouchTap: this.handleLight },
	                                React.createElement('img', { src: '../static/img/light' + LightStatus + '.png' }),
	                                '\u7167\u660E'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: (0, _constants.hideOverlayer)(modestatus != 9 && (0, _constants.isRapidheat)(this.state) && ChildLockStatus === 2 && !(0, _constants.isFinish)(this.state)) },
	                            React.createElement(
	                                'div',
	                                { className: 'app-ctrl-con', onTouchTap: function onTouchTap(e) {
	                                        (0, _constants.sendRapidheatData)(_this2.state);
	                                    } },
	                                React.createElement('img', { src: '../static/img/rapidheat' + RapidHeatingState + '.png' }),
	                                '\u5FEB\u901F\u52A0\u70ED'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'run-set', style: setShow ? { 'opacity': 1, 'display': 'block' } : { 'opacity': 0, 'display': 'none' } },
	                    React.createElement(
	                        'div',
	                        { className: 'run-set-con' },
	                        React.createElement(
	                            'div',
	                            { className: 'run-set-bt flex' },
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell cancel', onTouchTap: this.handleRunCancel },
	                                '\u53D6\u6D88'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell confirm', onTouchTap: this.handleRunConfirm },
	                                '\u786E\u5B9A'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'mode-ctrl' },
	                            React.createElement(
	                                'h3',
	                                null,
	                                '\u70D8\u7119\u6E29\u5EA6  ',
	                                changeTemperature === undefined ? _constants.DEFAULTTEMPERATURE[modestatus] : changeTemperature,
	                                '\u2103'
	                            ),
	                            React.createElement(_range2.default, { value: changeTemperature === undefined ? _constants.DEFAULTTEMPERATURE[modestatus] : changeTemperature, min: _constants.MINTEMPERATURE[modestatus], max: _constants.MAXTEMPERATURE[modestatus], fnFeedback: this.handleTemperatureSet }),
	                            React.createElement(
	                                'h3',
	                                null,
	                                '\u70D8\u7119\u65F6\u957F  ',
	                                (0, _constants.addZero)(showWorkhour),
	                                ' : ',
	                                (0, _constants.addZero)(showWorkmin),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '(\u5C0F\u65F6)'
	                                )
	                            ),
	                            React.createElement(_range2.default, { value: showWorkhour * 60 + showWorkmin, min: 1, max: 599, type: 'time', fnFeedback: this.handleWorkTimeSet })
	                        )
	                    )
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: errorShow, title: '\u8BBE\u5907\u6545\u969C', content: showErrorContent, rightpam: '\u8054\u7CFB\u5BA2\u670D', submitClock: this.handleContact, cancelClock: this.handleCancelError }),
	                React.createElement(_DialogStyle.DialogStyle, { show: confirmShow, title: '\u6E29\u99A8\u63D0\u793A', content: '\u7F8E\u98DF\u70D8\u7119\u4E2D\uFF0C\u786E\u5B9A\u53D6\u6D88\u5417\uFF1F', submitClock: this.handlePowerConfirm, cancelClock: this.handlePoweCancel })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	het.domReady(function () {
	    if (location.href.match(/page\/menuDetail.html/)) {
	        // 菜单详情页面需单独选择，供app从外部跳转到项目
	        ReactDOM.render(React.createElement(_MenuDetail.MenuDetail, null), document.getElementById('ROOT'));
	    } else {
	        ReactDOM.render(React.createElement(
	            Router,
	            { history: hashHistory },
	            React.createElement(Route, { path: '/', component: App }),
	            React.createElement(Route, { path: '/ModeSelect', component: _ModeSelect.ModeSelect }),
	            React.createElement(Route, { path: '/MenuList', component: _MenuList.MenuList }),
	            React.createElement(Route, { path: '/MenuDetail', component: _MenuDetail.MenuDetail })
	        ), document.getElementById('ROOT'));
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(7);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModeSelect = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _range = __webpack_require__(9);

	var _range2 = _interopRequireDefault(_range);

	var _TimeSelect = __webpack_require__(10);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ModeSelect = exports.ModeSelect = function (_BaseComponent) {
	    _inherits(ModeSelect, _BaseComponent);

	    function ModeSelect(props) {
	        _classCallCheck(this, ModeSelect);

	        // this.listenStore(Store);
	        var _this = _possibleConstructorReturn(this, (ModeSelect.__proto__ || Object.getPrototypeOf(ModeSelect)).call(this, props));

	        _this.state = _extends({}, _constants.STATE, { minTemperature: 50, maxTemperature: 250, reservationshow: false, mode: 1 });
	        _this.handleTemperatureSet = _this.handleTemperatureSet.bind(_this);
	        _this.handleModeSet = _this.handleModeSet.bind(_this);
	        _this.handleWorkTimeSet = _this.handleWorkTimeSet.bind(_this);
	        _this.handleReservationSet = _this.handleReservationSet.bind(_this);
	        _this.handleCancelReserv = _this.handleCancelReserv.bind(_this);
	        _this.handleSubmitReserv = _this.handleSubmitReserv.bind(_this);
	        _this.handleStart = _this.handleStart.bind(_this);
	        return _this;
	    }

	    _createClass(ModeSelect, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            (0, _constants.setTitle)('模式');
	        }
	    }, {
	        key: 'handleTemperatureSet',
	        value: function handleTemperatureSet(value) {
	            this.setState({ 'temperatureset': value });
	        }
	    }, {
	        key: 'handleModeSet',
	        value: function handleModeSet(e) {
	            var newMode = +e.target.getAttribute('data-mode');
	            if (newMode != this.state.mode) {
	                this.setState({ 'mode': newMode, 'temperatureset': _constants.DEFAULTTEMPERATURE[newMode] });
	            }
	        }
	    }, {
	        key: 'handleWorkTimeSet',
	        value: function handleWorkTimeSet(value) {
	            this.setState({
	                'workhour': parseInt(value / 60),
	                'workmin': value % 60
	            });
	        }
	    }, {
	        key: 'handleReservationSet',
	        value: function handleReservationSet() {
	            this.setState({ 'reservationshow': true });
	        }
	    }, {
	        key: 'handleCancelReserv',
	        value: function handleCancelReserv() {
	            this.setState({ 'reservationshow': false });
	        }
	    }, {
	        key: 'handleSubmitReserv',
	        value: function handleSubmitReserv(h, m) {
	            this.setState({
	                'reservationhour': +h,
	                'reservationmin': +m,
	                'reservationshow': false
	            });
	        }
	    }, {
	        key: 'handleStart',
	        value: function handleStart() {
	            var _state = this.state,
	                temperatureset = _state.temperatureset,
	                workhour = _state.workhour,
	                workmin = _state.workmin,
	                reservationhour = _state.reservationhour,
	                reservationmin = _state.reservationmin,
	                mode = _state.mode;

	            var power = 1;
	            var pause = 2;
	            _Actions.Actions.sendData({ power: power, temperatureset: temperatureset, workhour: workhour, workmin: workmin, reservationhour: reservationhour, reservationmin: reservationmin, mode: mode, pause: pause });
	            history.back();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var _state2 = this.state,
	                temperatureset = _state2.temperatureset,
	                minTemperature = _state2.minTemperature,
	                maxTemperature = _state2.maxTemperature,
	                mode = _state2.mode,
	                remainingreservationtimehour = _state2.remainingreservationtimehour,
	                remainingreservationtimemin = _state2.remainingreservationtimemin,
	                reservationhour = _state2.reservationhour,
	                reservationmin = _state2.reservationmin,
	                workhour = _state2.workhour,
	                workmin = _state2.workmin;

	            return React.createElement(
	                'div',
	                { className: 'mode' },
	                React.createElement('div', { className: 'mode-nav', style: { height: _constants.TOPDISTANCE } }),
	                React.createElement(
	                    'div',
	                    { className: 'mode-list' },
	                    React.createElement(
	                        'ul',
	                        null,
	                        _constants.RUNMODE.map(function (cur, index, array) {
	                            if (index > 0 && index < 9) {
	                                return React.createElement(
	                                    'li',
	                                    { key: index, onTouchTap: _this2.handleModeSet, 'data-mode': index },
	                                    React.createElement('img', { 'data-mode': index, src: '../static/img/icon-mode' + index + (index == _this2.state.mode ? '' : '-off') + '.png' }),
	                                    React.createElement(
	                                        'p',
	                                        { 'data-mode': index, className: '' + (index == _this2.state.mode ? 'mode-selected' : '') },
	                                        _constants.RUNMODE[index]
	                                    )
	                                );
	                            }
	                        })
	                    )
	                ),
	                React.createElement('div', { className: 'mode-txt' }),
	                React.createElement(
	                    'div',
	                    { className: 'mode-ctrl' },
	                    React.createElement(
	                        'h3',
	                        null,
	                        '\u70D8\u7119\u6E29\u5EA6  ',
	                        temperatureset,
	                        '\u2103'
	                    ),
	                    React.createElement(_range2.default, { value: temperatureset, min: _constants.MINTEMPERATURE[mode], max: _constants.MAXTEMPERATURE[mode], fnFeedback: this.handleTemperatureSet }),
	                    React.createElement(
	                        'h3',
	                        null,
	                        ' \u70D8\u7119\u65F6\u957F  ',
	                        (0, _constants.addZero)(workhour),
	                        ' : ',
	                        (0, _constants.addZero)(workmin),
	                        ' ',
	                        React.createElement(
	                            'span',
	                            null,
	                            '(\u5C0F\u65F6)'
	                        )
	                    ),
	                    React.createElement(_range2.default, { value: workhour * 60 + workmin, min: 1, max: 599, type: 'time', fnFeedback: this.handleWorkTimeSet }),
	                    React.createElement(
	                        'div',
	                        { className: 'reservation', onTouchTap: this.handleReservationSet },
	                        React.createElement(
	                            'span',
	                            { className: 'reservation-txt' },
	                            '\u9884\u7EA6\u65F6\u95F4'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'reservation-num' },
	                            React.createElement(
	                                'span',
	                                null,
	                                reservationhour == 0 && reservationmin == 0 ? '- -' : reservationhour + '\u5C0F\u65F6' + reservationmin + '\u5206\u949F\u540E\u5DE5\u4F5C'
	                            ),
	                            React.createElement('i', { className: 'reservation-icon' })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'reservation-start', onTouchTap: this.handleStart },
	                    '\u542F\u52A8'
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { title: '\u9884\u7EA6\u65F6\u95F4', show: this.state.reservationshow, maxhour: 10, minutearr: _constants.DATEARRAY, cancelClock: this.handleCancelReserv, submitClock: this.handleSubmitReserv })
	            );
	        }
	    }]);

	    return ModeSelect;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {integer}  value       传入初始值
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 * @prop {integer}  min         可选，最小值，缺省为0
	 * @prop {integer}  max         可选，最大值，缺省为100
	 * @prop {boolean}  disabled    可选，是否可以点击
	 */

	var Range = React.createClass({
	    displayName: "Range",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    min: function min() {
	        return this.props.min || "0";
	    },
	    max: function max() {
	        return this.props.max || "100";
	    },
	    // 定位
	    pos: function pos(value) {
	        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var rate = (value - this.min()) / (this.max() - this.min()); // 比率
	        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
	        cursor.style.left = left + "px";
	    },
	    handlerChange: function handlerChange(e) {
	        var value = parseInt(e.target.value);
	        //this.setState({value:value});
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	        this.props.fnFeedback(value);

	        //Actions.slide(value);
	    },
	    selectRange: function selectRange(e) {

	        var range = parseInt(e.target.value);
	        // console.log(range);
	        // this.props.fnFeedback(range);
	        //Actions.selectRange(range);
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        this.pos(value);
	    },
	    componentDidMount: function componentDidMount() {
	        this.componentDidUpdate();
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        var hourtext = parseInt(this.max() / 60);
	        var mintext = this.max() % 60;
	        return React.createElement(
	            "div",
	            { className: "__range" },
	            React.createElement(
	                "span",
	                null,
	                this.props.type == 'time' ? '00:01' : this.min()
	            ),
	            React.createElement(
	                "label",
	                { ref: "wrap" },
	                React.createElement("input", { type: "range", min: this.min(), max: this.max(), onTouchEnd: this.selectRange, onChange: this.handlerChange, value: value || 0, disabled: this.props.disabled ? "disabled" : "" }),
	                React.createElement(
	                    "i",
	                    { ref: "cursor", className: "cursor", id: "glide" },
	                    value
	                )
	            ),
	            React.createElement(
	                "span",
	                null,
	                this.props.type == 'time' ? hourtext + ":" + mintext : this.max()
	            )
	        );
	    }
	});

	module.exports = Range;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 时间选择组件
	 * @prop {boolean} show  时间选择组件是否显示(默认为false)
	 * @prop {boolean} hourshow  小时选择条是否显示(默认为true)
	 * @prop {boolean} minuteshow  分钟选择条是否显示(默认为true)
	 * @prop {string} title  时间组件的标题(默认为设置时间)
	 * @prop {string} statusname  状态名 用于显示多少时间后开启/关闭等(默认为关闭)
	 * @prop {number} hourstep  小时的间隔(默认为1)
	 * @prop {number} minutestep 分钟的间隔(默认为1)
	 * @prop {function} cancelClock 点击取消触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {function} submitClock 点击确认触发回调函数(无默认,传入空值或者非法值时console提示)
	 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {array} minutearr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TimeSelect = undefined;

	var _constants = __webpack_require__(4);

	var TimeSelect = exports.TimeSelect = React.createClass({
		displayName: 'TimeSelect',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 0,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (this.props.hourarray && this.props.hourarray instanceof Array) {
				hourarr = this.props.hourarray;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : value;
					hourarr.push(value);
				}
				maxhour = maxhour < 10 ? '0' + maxhour : maxhour;
				if (hourarr.indexOf(maxhour) == -1) hourarr.push(maxhour);
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			}
			//设置默认小时
			if (next.defaulthour) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 59;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (this.props.minutearr && this.props.minutearr instanceof Array) {
				minutearr = this.state.minutearr.length == 1 || this.props.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			}
			//设置默认分钟
			if (next.defaultminute) {
				var mindex = minutearr.indexOf(next.defaultminute);
				if (mindex != -1) {
					this.setState({
						minutetime: next.defaultminute,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.arrayInit === true) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 0.1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 0.1;
						// console.log('1',showOpacity,parseInt(showOpacity));
						if (showOpacity <= 0) {
							clearInterval(this.timr);
							this.setState({ timeDisplay: false });
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 30);
				}
			}
		},
		startrange: function startrange(e) {
			//开始滑动时间刻度 记录初始坐标值
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			this.setState({
				oldy: yvalue
			});
		},
		moverange: function moverange(e) {
			//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
			e.stopPropagation();
			e.preventDefault();
			var yvalue = parseInt(e.touches[0].clientY);
			var oldy = parseInt(this.state.oldy);
			var value = (yvalue - oldy) / 1.72;
			if (value > 20) value = 20;
			if (value < -20) value = -20;
			var type = e.target.getAttribute('data-type');
			if (type == 'hour') {
				this.setState({
					newy: yvalue,
					hourtop: value
				});
			}
			if (type == 'minute') {
				this.setState({
					newy: yvalue,
					minutetop: value
				});
			}
		},
		endrange: function endrange(e) {
			//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
			e.stopPropagation();
			e.preventDefault();
			var newy = parseInt(this.state.newy); //滑动结束时的y值
			var oldy = parseInt(this.state.oldy); //滑动开始时的y值
			var hour = parseInt(this.state.hourtime); //上一次选中的小时值
			var hourarr = this.state.hourarr; //小时可选值数组
			var hourindex = parseInt(this.state.hourindex); //上次选中的小时值对应数组中索引
			var minutearr = this.state.minutearr; //分钟可选值数组
			var minuteindex = parseInt(this.state.minuteindex); //上次选中的分钟值对应数组索引
			var minute = parseInt(this.state.minutetime); //上次选中的分钟值
			var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
			var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
			var maxhour = parseInt(this.props.maxhour) || 23; //设置的最大小时值
			var minhour = parseInt(this.props.minhour) || 0; //设置的最小小时值
			var type = e.target.getAttribute('data-type'); //滑动更改的类型
			//小时减小
			if (newy - oldy > 20 && type == 'hour') {
				var rangestep = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				hourindex = hourindex - rangestep;
				hourindex = hourindex < 0 ? 0 : hourindex;
				hour = hourarr[hourindex];
				if (hour != 10) {
					this.setState({ minutearr: _constants.DATEARRAY });
				}
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//小时增加
			if (newy - oldy < -20 && type == 'hour') {
				var _rangestep = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				hourindex = hourindex + _rangestep;

				hourindex = hourindex >= hourarr.length ? hourarr.length - 1 : hourindex;
				hour = hourarr[hourindex];

				if (hour == 10) {
					this.setState({ minutearr: ['00'], minutetime: 0, minuteindex: 0 });
				}
				this.setState({
					hourtime: hour,
					hourindex: hourindex,
					hourtop: 0
				});
			};
			//分钟减小
			if (newy - oldy > 20 && type == 'minute') {
				var _rangestep2 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				minuteindex = minuteindex - _rangestep2;
				minuteindex = minuteindex < 0 ? 0 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//分钟增加
			if (newy - oldy < -20 && type == 'minute') {
				var _rangestep3 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				minuteindex = minuteindex + _rangestep3;
				minuteindex = minuteindex >= minutearr.length ? minutearr.length - 1 : minuteindex;
				minute = minutearr[minuteindex];
				this.setState({
					minutetime: minute,
					minuteindex: minuteindex,
					minutetop: 0
				});
			};
			//重置为未拖动状态
			this.setState({
				hourtop: 0,
				minutetop: 0
			});
		},
		endDefault: function endDefault(e) {
			//阻止IOS上冒泡触发iscroll事件
			e.stopPropagation();
			e.preventDefault();
		},
		cancelclock: function cancelclock(e) {
			//取消选择
			if (typeof this.props.cancelClock === 'function') {
				this.props.cancelClock();
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			if (typeof this.props.submitClock === 'function') {
				this.props.submitClock(this.state.hourtime, this.state.minutetime);
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusname = this.props.statusname || '关闭';
			var hour = this.state.hourtime || '0';
			hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
			hour = hour < minhour ? minhour : hour;
			var minute = this.state.minutetime || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			return React.createElement(
				'section',
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.cancelclock },
							'\u53D6\u6D88'
						),
						React.createElement(
							'span',
							{ className: 'flex-cell', onTouchEnd: this.submitclock },
							'\u786E\u5B9A'
						)
					),
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '50%' : '100%', display: hourshow ? 'inline-block' : 'none' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'hour' }),
						React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '50%' : '100%', left: hourshow ? '50%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement(
							'section',
							{ className: 'timetext' },
							React.createElement('span', { className: 'timeLeft' }),
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 42 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 68 + '%' : 53 + '%' } },
								'\u5206'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 32 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
							React.createElement(
								'span',
								{ className: hourindex - 3 < 0 ? 'line4' : 'line1' },
								hourindex - 3 < 0 ? '' : hourarr[hourindex - 3]
							),
							React.createElement(
								'span',
								{ className: hourindex - 2 < 0 ? 'line4' : 'line1' },
								hourindex - 2 < 0 ? '' : hourarr[hourindex - 2]
							),
							React.createElement(
								'span',
								{ className: hourindex - 1 < 0 ? 'line4' : 'line2' },
								hourindex - 1 < 0 ? '' : hourarr[hourindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								hourarr[hourindex]
							),
							React.createElement(
								'span',
								{ className: hourindex + 1 >= hourarr.length ? 'line4' : 'line2' },
								hourindex + 1 >= hourarr.length ? '' : hourarr[hourindex + 1]
							),
							React.createElement(
								'span',
								{ className: hourindex + 2 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 2 >= hourarr.length ? '' : hourarr[hourindex + 2]
							),
							React.createElement(
								'span',
								{ className: hourindex + 3 >= hourarr.length ? 'line4' : 'line1' },
								hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
							)
						),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
							React.createElement(
								'span',
								{ className: minuteindex - 3 < 0 ? 'line4' : 'line1' },
								minuteindex - 3 < 0 ? '' : minutearr[minuteindex - 3]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 2 < 0 ? 'line4' : 'line1' },
								minuteindex - 2 < 0 ? '' : minutearr[minuteindex - 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex - 1 < 0 ? 'line4' : 'line2' },
								minuteindex - 1 < 0 ? '' : minutearr[minuteindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								minutearr[minuteindex]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 1 >= minutearr.length ? 'line4' : 'line2' },
								minuteindex + 1 >= minutearr.length ? '' : minutearr[minuteindex + 1]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 2 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 2 >= minutearr.length ? '' : minutearr[minuteindex + 2]
							),
							React.createElement(
								'span',
								{ className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line1' },
								minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 11 */
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
	 * 弹出框组件
	 * @prop {string}   title 标题
	 * @prop {string}   leftpam 左边点击框文字
	 * @prop {string}   rightpam 左边点击框文字
	 * @prop {boolean}   show 是否显示
	 * @prop {function}  cancelClock   取消，点击后的回调函数
	 * @prop {function} submitClock   确定，点击后的回调函数
	 * @prop {string} content   内容
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
	        key: 'touchconform',
	        value: function touchconform(e) {
	            e.stopPropagation();
	            if (typeof this.props.submitClock === 'function') {
	                this.props.submitClock();
	            }
	        }
	    }, {
	        key: 'touchcanle',
	        value: function touchcanle(e) {
	            e.stopPropagation(); //取消时间冒泡
	            if (typeof this.props.cancelClock === 'function') {
	                this.props.cancelClock();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var title = this.props.title == undefined ? "温馨提示" : this.props.title;
	            var content = this.props.content == undefined ? "--" : this.props.content;
	            var leftpam = this.props.leftpam == undefined ? "取消" : this.props.leftpam;
	            var rightpam = this.props.rightpam == undefined ? "确定" : this.props.rightpam;
	            var show = this.props.show;
	            var html = this.props.html == undefined ? '--' : this.props.html;
	            return React.createElement(
	                'section',
	                { style: { display: show ? "" : "none" }, className: 'fade_c_section' },
	                React.createElement(
	                    'section',
	                    { className: 'fade_c_section' },
	                    React.createElement(
	                        'section',
	                        { onTouchMove: this.endDefault },
	                        React.createElement('div', { className: 'fade_c' }),
	                        React.createElement(
	                            'div',
	                            { className: 'succ-pop' },
	                            React.createElement(
	                                'p',
	                                { className: 'title' },
	                                title
	                            ),
	                            React.createElement(
	                                'section',
	                                { className: 'pop_div' },
	                                React.createElement('p', { className: 'pop_content', dangerouslySetInnerHTML: { __html: content } })
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex conformd' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell', onTouchEnd: this.touchcanle.bind(this) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        leftpam
	                                    )
	                                ),
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MenuList = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(6);

	var _reactInfiniteScrollComponent = __webpack_require__(13);

	var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

	var _constants = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;


	var getMoreData = function getMoreData(context) {
	    var that = context;
	    het.get(_constants.MENULIST, { pageIndex: that.state.pageIndex, productId: _constants.PRODUCTID }, function (response) {
	        var responseData = JSON.parse(response);
	        if (responseData.code == 0 && responseData.data.list.length) {
	            var pager = responseData.data.pager,
	                hasNextPage = pager.hasNextPage,
	                pageIndex = pager.pageIndex;
	            that.setState({ menuItems: that.state.menuItems.concat(responseData.data.list), hasNextPage: hasNextPage, pageIndex: pageIndex + 1 });
	        }
	    }, function () {
	        het.toast('请求失败，稍后重试');
	    });
	};

	var MenuList = exports.MenuList = function (_BaseComponent) {
	    _inherits(MenuList, _BaseComponent);

	    function MenuList(props) {
	        _classCallCheck(this, MenuList);

	        var _this = _possibleConstructorReturn(this, (MenuList.__proto__ || Object.getPrototypeOf(MenuList)).call(this, props));

	        _this.state = {
	            menuItems: [],
	            pageIndex: 1,
	            hasNextPage: true
	        };
	        _this.listenStore(_Store.Store);
	        _this.handleLoad = _this.handleLoad.bind(_this);
	        _this.handleClick = _this.handleClick.bind(_this);
	        _this.handleJumpDetail = _this.handleJumpDetail.bind(_this);
	        return _this;
	    }

	    _createClass(MenuList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            getMoreData(this);
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            (0, _constants.setTitle)('云菜谱');
	        }
	    }, {
	        key: 'handleLoad',
	        value: function handleLoad() {
	            getMoreData(this);
	        }
	    }, {
	        key: 'handleClick',
	        value: function handleClick(id) {
	            if (!(0, _constants.isOffline)(this.state)) return;
	            het.toast(JSON.stringify({ menuId: id }));
	        }
	    }, {
	        key: 'handleJumpDetail',
	        value: function handleJumpDetail(id) {
	            if (!(0, _constants.isOffline)(this.state)) return;
	            var _state = this.state,
	                MenuNumberHigh = _state.MenuNumberHigh,
	                MenuNumberLow = _state.MenuNumberLow,
	                menuId = MenuNumberHigh * 256 + MenuNumberLow;

	            if (menuId != id && menuId != 0 && !isNaN(menuId)) {
	                het.toast('当前已有云菜谱正在烹饪，无法切换菜谱');
	                return;
	            }
	            ReactRouter.hashHistory.push('/MenuDetail?menuId=' + id);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return React.createElement(
	                'div',
	                { className: 'menu-list' },
	                React.createElement('div', { className: 'menu-bar', style: { height: _constants.TOPDISTANCE } }),
	                React.createElement(
	                    _reactInfiniteScrollComponent2.default,
	                    { next: this.handleLoad, hasMore: this.state.hasNextPage, endMessage: React.createElement('div', { className: 'loading fade-out' }), loader: React.createElement(
	                            'div',
	                            { className: 'loading' },
	                            '\u52A0\u8F7D\u4E2D...'
	                        ), style: { marginTop: _constants.TOPDISTANCE } },
	                    this.state.menuItems.map(function (item) {
	                        return React.createElement(
	                            'div',
	                            { className: 'menu-item', key: item.menuId },
	                            React.createElement('img', { src: item.cover, onClick: function onClick(e) {
	                                    _this2.handleClick(item.menuId);
	                                }, alt: '' }),
	                            React.createElement(
	                                'div',
	                                { className: 'menu-con' },
	                                React.createElement(
	                                    'div',
	                                    { className: 'menu-context' },
	                                    React.createElement(
	                                        'p',
	                                        { className: 'menu-name' },
	                                        item.name
	                                    ),
	                                    React.createElement(
	                                        'p',
	                                        { className: 'cooking-time' },
	                                        '\u5236\u4F5C\u65F6\u95F4\uFF1A',
	                                        item.cookingTime
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'menu-start', onTouchTap: function onTouchTap() {
	                                            _this2.handleJumpDetail(item.menuId);
	                                        } },
	                                    '\u4E00\u952E\u70F9\u996A'
	                                )
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return MenuList;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory(__webpack_require__(14));
		else if(typeof define === 'function' && define.amd)
			define(["react"], factory);
		else if(typeof exports === 'object')
			exports["InfiniteScroll"] = factory(require("react"));
		else
			root["InfiniteScroll"] = factory(root["React"]);
	})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
	return /******/ (function(modules) { // webpackBootstrap
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

		'use strict';

		Object.defineProperty(exports, '__esModule', {
		  value: true
		});

		var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

		var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

		function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

		var _react = __webpack_require__(2);

		var _react2 = _interopRequireDefault(_react);

		var _utilsThrottle = __webpack_require__(1);

		var _utilsThrottle2 = _interopRequireDefault(_utilsThrottle);

		var InfiniteScroll = (function (_Component) {
		  _inherits(InfiniteScroll, _Component);

		  function InfiniteScroll(props) {
		    _classCallCheck(this, InfiniteScroll);

		    _get(Object.getPrototypeOf(InfiniteScroll.prototype), 'constructor', this).call(this);
		    this.state = {
		      showLoader: false,
		      lastScrollTop: 0,
		      actionTriggered: false,
		      pullToRefreshThresholdBreached: false
		    };
		    // variables to keep track of pull down behaviour
		    this.startY = 0;
		    this.currentY = 0;
		    this.dragging = false;
		    // will be populated in componentDidMount
		    // based on the height of the pull down element
		    this.maxPullDownDistance = 0;

		    this.onScrollListener = this.onScrollListener.bind(this);
		    this.throttledOnScrollListener = (0, _utilsThrottle2['default'])(this.onScrollListener, 150).bind(this);
		    this.onStart = this.onStart.bind(this);
		    this.onMove = this.onMove.bind(this);
		    this.onEnd = this.onEnd.bind(this);
		  }

		  _createClass(InfiniteScroll, [{
		    key: 'componentDidMount',
		    value: function componentDidMount() {
		      this.el = this.props.height ? this._infScroll : window;
		      this.el.addEventListener('scroll', this.throttledOnScrollListener);

		      if (this.props.pullDownToRefresh) {
		        document.addEventListener('touchstart', this.onStart);
		        document.addEventListener('touchmove', this.onMove);
		        document.addEventListener('touchend', this.onEnd);

		        document.addEventListener('mousedown', this.onStart);
		        document.addEventListener('mousemove', this.onMove);
		        document.addEventListener('mouseup', this.onEnd);

		        // get BCR of pullDown element to position it above
		        this.maxPullDownDistance = this._pullDown.firstChild.getBoundingClientRect().height;
		        this.forceUpdate();

		        if (typeof this.props.refreshFunction !== 'function') {
		          throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'');
		        }
		      }
		    }
		  }, {
		    key: 'componentWillUnmount',
		    value: function componentWillUnmount() {
		      this.el.removeEventListener('scroll', this.throttledOnScrollListener);

		      if (this.props.pullDownToRefresh) {
		        document.removeEventListener('touchstart', this.onStart);
		        document.removeEventListener('touchmove', this.onMove);
		        document.removeEventListener('touchend', this.onEnd);

		        document.removeEventListener('mousedown', this.onStart);
		        document.removeEventListener('mousemove', this.onMove);
		        document.removeEventListener('mouseup', this.onEnd);
		      }
		    }
		  }, {
		    key: 'componentWillReceiveProps',
		    value: function componentWillReceiveProps(props) {
		      // new data was sent in
		      this.setState({
		        showLoader: false,
		        actionTriggered: false,
		        pullToRefreshThresholdBreached: false
		      });
		    }
		  }, {
		    key: 'onStart',
		    value: function onStart(evt) {
		      evt.preventDefault();

		      if (this.state.lastScrollTop) return;

		      this.dragging = true;
		      this.startY = evt.pageY || evt.touches[0].pageY;
		      this.currentY = this.startY;

		      this._infScroll.style.willChange = 'transform';
		      this._infScroll.style.transition = 'transform 0.2s cubic-bezier(0,0,0.31,1)';
		    }
		  }, {
		    key: 'onMove',
		    value: function onMove(evt) {
		      if (!this.dragging) return;
		      this.currentY = evt.pageY || evt.touches[0].pageY;

		      // user is scrolling down to up
		      if (this.currentY < this.startY) return;

		      if (this.currentY - this.startY >= this.props.pullDownToRefreshThreshold) {
		        this.setState({
		          pullToRefreshThresholdBreached: true
		        });
		      }

		      // so you can drag upto 1.5 times of the maxPullDownDistance
		      if (this.currentY - this.startY > this.maxPullDownDistance * 1.5) return;

		      this._infScroll.style.overflow = 'visible';
		      this._infScroll.style.transform = 'translate3d(0px, ' + (this.currentY - this.startY) + 'px, 0px)';

		      evt.preventDefault();
		    }
		  }, {
		    key: 'onEnd',
		    value: function onEnd(evt) {
		      var _this = this;

		      this.startY = 0;
		      this.currentY = 0;

		      this.dragging = false;

		      if (this.state.pullToRefreshThresholdBreached) {
		        this.props.refreshFunction && this.props.refreshFunction();
		      }

		      requestAnimationFrame(function () {
		        _this._infScroll.style.overflow = 'auto';
		        _this._infScroll.style.transform = 'none';
		        _this._infScroll.style.willChange = 'none';
		      });

		      evt.preventDefault();
		    }
		  }, {
		    key: 'isElementAtBottom',
		    value: function isElementAtBottom(target) {
		      var scrollThreshold = arguments.length <= 1 || arguments[1] === undefined ? 0.8 : arguments[1];

		      var clientHeight = target === document.body || target === document.documentElement ? window.screen.availHeight : target.clientHeight;

		      var scrolled = scrollThreshold * (target.scrollHeight - target.scrollTop);
		      return scrolled <= clientHeight;
		    }
		  }, {
		    key: 'onScrollListener',
		    value: function onScrollListener(event) {
		      var target = this.props.height ? event.target : document.documentElement.scrollTop ? document.documentElement : document.body;

		      // if user scrolls up, remove action trigger lock
		      if (target.scrollTop < this.state.lastScrollTop) {
		        this.setState({
		          actionTriggered: false,
		          lastScrollTop: target.scrollTop
		        });
		        return; // user's going up, we don't care
		      }

		      // return immediately if the action has already been triggered,
		      // prevents multiple triggers.
		      if (this.state.actionTriggered) return;

		      var atBottom = this.isElementAtBottom(target, this.props.scrollThreshold);

		      // call the `next` function in the props to trigger the next data fetch
		      if (atBottom && this.props.hasMore) {
		        this.props.next();
		        this.setState({ actionTriggered: true, showLoader: true });
		      }
		      this.setState({ lastScrollTop: target.scrollTop });
		    }
		  }, {
		    key: 'render',
		    value: function render() {
		      var _this2 = this;

		      var style = _extends({
		        height: this.props.height || 'auto',
		        overflow: 'auto',
		        WebkitOverflowScrolling: 'touch'
		      }, this.props.style);
		      var hasChildren = this.props.hasChildren || !!(this.props.children && this.props.children.length);

		      // because heighted infiniteScroll visualy breaks
		      // on drag down as overflow becomes visible
		      var outerDivStyle = this.props.pullDownToRefresh && this.props.height ? { overflow: 'auto' } : {};
		      return _react2['default'].createElement(
		        'div',
		        { style: outerDivStyle },
		        _react2['default'].createElement(
		          'div',
		          {
		            className: 'infinite-scroll-component',
		            ref: function (infScroll) {
		              return _this2._infScroll = infScroll;
		            },
		            style: style
		          },
		          this.props.pullDownToRefresh && _react2['default'].createElement(
		            'div',
		            {
		              style: { position: 'relative' },
		              ref: function (pullDown) {
		                return _this2._pullDown = pullDown;
		              }
		            },
		            _react2['default'].createElement(
		              'div',
		              { style: {
		                  position: 'absolute',
		                  left: 0,
		                  right: 0,
		                  top: -1 * this.maxPullDownDistance
		                } },
		              !this.state.pullToRefreshThresholdBreached && this.props.pullDownToRefreshContent,
		              this.state.pullToRefreshThresholdBreached && this.props.releaseToRefreshContent
		            )
		          ),
		          this.props.children,
		          !this.state.showLoader && !hasChildren && this.props.hasMore && this.props.loader,
		          this.state.showLoader && this.props.loader,
		          !this.props.hasMore && _react2['default'].createElement(
		            'p',
		            { style: { textAlign: 'center' } },
		            this.props.endMessage || _react2['default'].createElement(
		              'b',
		              null,
		              'Yay! You have seen it all'
		            )
		          )
		        )
		      );
		    }
		  }]);

		  return InfiniteScroll;
		})(_react.Component);

		exports['default'] = InfiniteScroll;

		InfiniteScroll.defaultProps = {
		  pullDownToRefreshContent: _react2['default'].createElement(
		    'h3',
		    null,
		    'Pull down to refresh'
		  ),
		  releaseToRefreshContent: _react2['default'].createElement(
		    'h3',
		    null,
		    'Release to refresh'
		  ),
		  pullDownToRefreshThreshold: 100,
		  disableBrowserPullToRefresh: true
		};

		InfiniteScroll.propTypes = {
		  next: _react.PropTypes.func,
		  hasMore: _react.PropTypes.bool,
		  children: _react.PropTypes.node,
		  loader: _react.PropTypes.node.isRequired,
		  scrollThreshold: _react.PropTypes.number,
		  endMessage: _react.PropTypes.node,
		  style: _react.PropTypes.object,
		  height: _react.PropTypes.number,
		  hasChildren: _react.PropTypes.bool,
		  pullDownToRefresh: _react.PropTypes.bool,
		  pullDownToRefreshContent: _react.PropTypes.node,
		  releaseToRefreshContent: _react.PropTypes.node,
		  pullDownToRefreshThreshold: _react.PropTypes.number,
		  refreshFunction: _react.PropTypes.func
		};
		module.exports = exports['default'];

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		// https://remysharp.com/2010/07/21/throttling-function-calls
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = throttle;

		function throttle(fn, threshhold, scope) {
		  threshhold || (threshhold = 250);
		  var last, deferTimer;
		  return function () {
		    var context = scope || this;

		    var now = +new Date(),
		        args = arguments;
		    if (last && now < last + threshhold) {
		      // hold on to it
		      clearTimeout(deferTimer);
		      deferTimer = setTimeout(function () {
		        last = now;
		        fn.apply(context, args);
		      }, threshhold);
		    } else {
		      last = now;
		      fn.apply(context, args);
		    }
		  };
		}

		module.exports = exports["default"];

	/***/ },
	/* 2 */
	/***/ function(module, exports) {

		module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(15);


/***/ },
/* 15 */
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

	var _assign = __webpack_require__(17);

	var ReactChildren = __webpack_require__(18);
	var ReactComponent = __webpack_require__(31);
	var ReactPureComponent = __webpack_require__(34);
	var ReactClass = __webpack_require__(35);
	var ReactDOMFactories = __webpack_require__(37);
	var ReactElement = __webpack_require__(22);
	var ReactPropTypes = __webpack_require__(42);
	var ReactVersion = __webpack_require__(43);

	var onlyChild = __webpack_require__(44);
	var warning = __webpack_require__(24);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(38);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 16 */
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
/* 17 */
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
/* 18 */
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

	var PooledClass = __webpack_require__(19);
	var ReactElement = __webpack_require__(22);

	var emptyFunction = __webpack_require__(25);
	var traverseAllChildren = __webpack_require__(28);

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
/* 19 */
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

	var _prodInvariant = __webpack_require__(20);

	var invariant = __webpack_require__(21);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 20 */
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
/* 21 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 22 */
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

	var _assign = __webpack_require__(17);

	var ReactCurrentOwner = __webpack_require__(23);

	var warning = __webpack_require__(24);
	var canDefineProperty = __webpack_require__(26);
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var REACT_ELEMENT_TYPE = __webpack_require__(27);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 23 */
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
/* 24 */
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

	var emptyFunction = __webpack_require__(25);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 25 */
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
/* 26 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 27 */
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

	var _prodInvariant = __webpack_require__(20);

	var ReactCurrentOwner = __webpack_require__(23);
	var REACT_ELEMENT_TYPE = __webpack_require__(27);

	var getIteratorFn = __webpack_require__(29);
	var invariant = __webpack_require__(21);
	var KeyEscapeUtils = __webpack_require__(30);
	var warning = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 29 */
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
/* 30 */
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
/* 31 */
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

	var _prodInvariant = __webpack_require__(20);

	var ReactNoopUpdateQueue = __webpack_require__(32);

	var canDefineProperty = __webpack_require__(26);
	var emptyObject = __webpack_require__(33);
	var invariant = __webpack_require__(21);
	var warning = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 32 */
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

	var warning = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 33 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 34 */
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

	var _assign = __webpack_require__(17);

	var ReactComponent = __webpack_require__(31);
	var ReactNoopUpdateQueue = __webpack_require__(32);

	var emptyObject = __webpack_require__(33);

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
/* 35 */
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

	var _prodInvariant = __webpack_require__(20),
	    _assign = __webpack_require__(17);

	var ReactComponent = __webpack_require__(31);
	var ReactElement = __webpack_require__(22);
	var ReactPropTypeLocationNames = __webpack_require__(36);
	var ReactNoopUpdateQueue = __webpack_require__(32);

	var emptyObject = __webpack_require__(33);
	var invariant = __webpack_require__(21);
	var warning = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 36 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

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

	var ReactElement = __webpack_require__(22);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */
	var createDOMFactory = ReactElement.createFactory;
	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(38);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 38 */
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

	var ReactCurrentOwner = __webpack_require__(23);
	var ReactComponentTreeHook = __webpack_require__(39);
	var ReactElement = __webpack_require__(22);

	var checkReactTypeSpec = __webpack_require__(40);

	var canDefineProperty = __webpack_require__(26);
	var getIteratorFn = __webpack_require__(29);
	var warning = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 39 */
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

	var _prodInvariant = __webpack_require__(20);

	var ReactCurrentOwner = __webpack_require__(23);

	var invariant = __webpack_require__(21);
	var warning = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 40 */
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

	var _prodInvariant = __webpack_require__(20);

	var ReactPropTypeLocationNames = __webpack_require__(36);
	var ReactPropTypesSecret = __webpack_require__(41);

	var invariant = __webpack_require__(21);
	var warning = __webpack_require__(24);

	var ReactComponentTreeHook;

	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(39);
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
	            ReactComponentTreeHook = __webpack_require__(39);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 41 */
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
/* 42 */
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

	var ReactElement = __webpack_require__(22);
	var ReactPropTypeLocationNames = __webpack_require__(36);
	var ReactPropTypesSecret = __webpack_require__(41);

	var emptyFunction = __webpack_require__(25);
	var getIteratorFn = __webpack_require__(29);
	var warning = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 43 */
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
/* 44 */
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

	var _prodInvariant = __webpack_require__(20);

	var ReactElement = __webpack_require__(22);

	var invariant = __webpack_require__(21);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MenuDetail = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _fun = __webpack_require__(46);

	var _BaseComponentClass = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _range = __webpack_require__(9);

	var _range2 = _interopRequireDefault(_range);

	var _DialogStyle = __webpack_require__(11);

	var _constants = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var source = function source() {
	    var u = navigator.userAgent;
	    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
	        return 4;
	    }
	    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
	        return 3;
	    }
	};

	var transformTem = function transformTem(h, l) {
	    // 注意:箭头函数没有arguments对象，所有不能使用
	    if (arguments.length == 1) {
	        // 转化为高低位
	        return [parseInt(h / 256).toString(), (h % 256).toString()];
	    } else if (arguments.length == 2) {
	        // 转化为实际温度
	        return +h * 256 + +l;
	    }
	};

	var transformTime = function transformTime(h, m) {
	    return h * 60 + +m;
	};

	var getMenuId = function getMenuId(that) {
	    if (location.href.match(/page\/menuDetail.html/)) {
	        return _fun.Funs.getUrlParam('menuId');
	    }
	    return that.props.location.query['menuId'];
	};

	var callback = function callback() {
	    var isParam = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var that = arguments[1];
	    var postJson = arguments[2];

	    return function (response) {
	        var responseData = JSON.parse(response);
	        if (responseData.code == 0) {
	            if (isParam) {
	                // 如果是发送配置数据
	                var firstData = postJson.ModeSet[0],
	                    menuId = +getMenuId(that);
	                _Actions.Actions.cacheData({
	                    'modestatus': 9,
	                    'PauseStatus': 2,
	                    'recipeworkingnumber': 1,
	                    'recipetemperature': firstData.ModeTempHigh * 256 + firstData.ModeTempLow,
	                    'reciperemainingworkingtimehour': firstData.ModeTimingHour,
	                    'reciperemainingworkingtimemin': firstData.ModeTimingMin,
	                    'MenuNumberHigh': parseInt(menuId / 256),
	                    'MenuNumberLow': menuId % 256
	                });
	            }
	        } else {
	            het.toast(responseData.msg);
	        }
	    };
	};

	var errCallback = function errCallback(msg) {
	    het.toast('请求失败，请稍后再试');
	};

	var postClockList = function postClockList(that) {
	    // post 定时器列表
	    var _that$state = that.state,
	        configList = _that$state.configList,
	        recipeworkingnumber = _that$state.recipeworkingnumber,
	        modestatus = _that$state.modestatus,
	        newConfigList = _extends({}, configList),
	        clockList = [],
	        timeTotal = 0; // 总时长


	    for (var k in newConfigList) {
	        var item = newConfigList[k],
	            modeTime = transformTime(item['ModeTimingHour'], item['ModeTimingMin']),
	            steamTime = transformTime(item['SteamTimingHour'], item['SteamTimingMin']),
	            stepInterval = item['SteamSwitch'] == '1' ? Math.max(modeTime, steamTime) : modeTime,
	            // 取最大着计算时间
	        isStop = modestatus == 9 ? recipeworkingnumber <= +k : 1; // 判断是否为中途暂停
	        if (item['isRemind'] && isStop) {
	            // 若需要提醒，添加数组
	            clockList.push(timeTotal + stepInterval - 1);
	        }
	        if (isStop) {
	            timeTotal += stepInterval; // 时间累加
	        }
	    }
	    if (clockList.length) {
	        het.post(_constants.SETCLOCK, {
	            timestamp: +new Date(),
	            menuId: getMenuId(that),
	            startTime: _fun.Funs.dateFormat(new Date()),
	            name: that.state.name,
	            clockList: JSON.stringify(clockList),
	            bell: '泉水叮咚'
	        }, callback(0, that), errCallback);
	    }
	};

	var MenuDetail = exports.MenuDetail = function (_BaseComponent) {
	    _inherits(MenuDetail, _BaseComponent);

	    function MenuDetail(props) {
	        _classCallCheck(this, MenuDetail);

	        var _this = _possibleConstructorReturn(this, (MenuDetail.__proto__ || Object.getPrototypeOf(MenuDetail)).call(this, props));

	        _this.state = {
	            clockList: [], // 定时数组
	            MenuNumber: 0,
	            TotalNumberOfStages: 0,
	            configList: {}, // 配置数据
	            cancelShow: false,
	            setShow: false,
	            selectedStep: 1,
	            tempShow: true,
	            stopShow: false, // 暂停提示
	            name: '' // "菜单名称",
	        };
	        _this.listenStore(_Store.Store);
	        _this.handleSwitch = _this.handleSwitch.bind(_this);
	        _this.handleConfirm = _this.handleConfirm.bind(_this);
	        _this.handleCancel = _this.handleCancel.bind(_this);
	        _this.handleSetParam = _this.handleSetParam.bind(_this);
	        _this.handleTemperatureSet = _this.handleTemperatureSet.bind(_this);
	        _this.handleTimeSet = _this.handleTimeSet.bind(_this);
	        _this.handleStart = _this.handleStart.bind(_this);
	        _this.handleStop = _this.handleStop.bind(_this);
	        _this.handleNextStep = _this.handleNextStep.bind(_this);
	        _this.handleCancelMode = _this.handleCancelMode.bind(_this);
	        _this.handleCancelCook = _this.handleCancelCook.bind(_this);
	        _this.handleHideDialog = _this.handleHideDialog.bind(_this);

	        return _this;
	    }

	    _createClass(MenuDetail, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var that = this;
	            het.get(_constants.MENUDETAIL, { timestamp: +new Date(), menuId: getMenuId(that), productId: _constants.PRODUCTID }, function (response) {
	                var responseData = JSON.parse(response);
	                if (responseData.code != 0) return false;
	                var name = responseData.data.name; // 获取菜单名称，定时接口需要
	                (0, _constants.setTitle)(name);
	                that.setState({ name: name });
	                var configList = responseData.data.menuPropertyConfigList[0].stepConfigList.slice(0);
	                var newConfig = {},
	                    MenuNumber = 0,
	                    TotalNumberOfStages = 0;
	                if (configList.length) {
	                    configList.forEach(function (item) {
	                        var temObj = {
	                            'Stages': '0',
	                            'Pause': '1',
	                            'TriggerSignal': '2',
	                            'StageMode': '1',
	                            'ModeTimingHour': '0',
	                            'ModeTimingMin': '0',
	                            'ModeTempHigh': '0',
	                            'ModeTempLow': '50',
	                            'SteamSwitch': '0',
	                            'SteamTimingHour': '0',
	                            'SteamTimingMin': '0'
	                        };
	                        temObj.isRemind = item.isRemind;
	                        temObj.Stages = item.step;
	                        item['propertyConfigList'].forEach(function (k) {
	                            temObj[k.property] = k.value;
	                        });
	                        newConfig[temObj.Stages] = temObj;
	                    });
	                    that.setState({ 'configList': newConfig, 'MenuNumber': getMenuId(that), 'TotalNumberOfStages': configList.length });
	                }
	            });
	            _Actions.Actions.getParam();
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            (0, _constants.setTitle)('云菜谱');
	        }
	    }, {
	        key: 'handleCancelCook',
	        value: function handleCancelCook() {
	            (0, _constants.cancelClock)(this.state);
	            _Actions.Actions.sendData({ mode: 0, rapidheating: 2, light: 2, power: 3 });
	            this.handleHideDialog();
	        }
	    }, {
	        key: 'handleHideDialog',
	        value: function handleHideDialog() {
	            this.setState({ 'cancelShow': false });
	        }
	    }, {
	        key: 'handleTemperatureSet',
	        value: function handleTemperatureSet(value) {
	            this.setState({ 'changeTemperature': value });
	        }
	    }, {
	        key: 'handleTimeSet',
	        value: function handleTimeSet(value) {
	            this.setState({ 'changeTimeHour': parseInt(value / 60), 'changeTimeMin': value % 60 });
	        }
	    }, {
	        key: 'handleSwitch',
	        value: function handleSwitch(on, stepsNum) {
	            var state = _extends({}, this.state);
	            state.configList[stepsNum]['isRemind'] = !on;
	            this.setState({ configList: state.configList });
	        }
	    }, {
	        key: 'handleConfirm',
	        value: function handleConfirm() {
	            var _state = this.state,
	                changeTemperature = _state.changeTemperature,
	                selectedStep = _state.selectedStep,
	                changeTimeHour = _state.changeTimeHour,
	                changeTimeMin = _state.changeTimeMin,
	                tempShow = _state.tempShow,
	                state = _extends({}, this.state),
	                stepParam = state.configList[selectedStep];

	            if (changeTemperature != undefined) {
	                var _transformTem = transformTem(changeTemperature),
	                    _transformTem2 = _slicedToArray(_transformTem, 2),
	                    ModeTempHigh = _transformTem2[0],
	                    ModeTempLow = _transformTem2[1];

	                stepParam['ModeTempHigh'] = ModeTempHigh;
	                stepParam['ModeTempLow'] = ModeTempLow;
	            }
	            if (changeTimeHour != undefined && changeTimeMin != undefined) {
	                if (tempShow) {
	                    stepParam['ModeTimingHour'] = changeTimeHour + '';
	                    stepParam['ModeTimingMin'] = changeTimeMin + '';
	                } else {
	                    stepParam['SteamTimingHour'] = changeTimeHour + '';
	                    stepParam['SteamTimingMin'] = changeTimeMin + '';
	                }
	            }
	            this.setState({ configList: state.configList, 'changeTemperature': undefined, 'changeTimeHour': undefined, 'changeTimeMin': undefined, setShow: false });
	            document.body.className = '';
	        }
	    }, {
	        key: 'handleCancel',
	        value: function handleCancel() {
	            this.setState({ 'changeTemperature': undefined, 'changeTimeHour': undefined, 'changeTimeMin': undefined, 'setShow': false });
	            document.body.className = '';
	        }
	    }, {
	        key: 'handleSetParam',
	        value: function handleSetParam(stepsNum, tempShow) {
	            document.body.className = 'ovh';
	            this.setState({ setShow: true, selectedStep: stepsNum, tempShow: tempShow });
	        }
	    }, {
	        key: 'handleStart',
	        value: function handleStart() {
	            var modestatus = this.state.modestatus;

	            if (!(0, _constants.isOffline)(this.state)) return;
	            if (modestatus == 9 && !this._isMenuIdEq()) {
	                // 如果运行的是云菜谱，id不相等
	                het.toast('请先取消正在烹饪的云菜谱！');
	                return;
	            }
	            this._postJson();
	        }
	    }, {
	        key: '_postJson',
	        value: function _postJson() {
	            var _state2 = this.state,
	                configList = _state2.configList,
	                deviceId = _state2.deviceId,
	                MenuNumber = _state2.MenuNumber,
	                TotalNumberOfStages = _state2.TotalNumberOfStages,
	                modestatus = _state2.modestatus,
	                MenuNumberHigh = _state2.MenuNumberHigh,
	                MenuNumberLow = _state2.MenuNumberLow,
	                newConfigList = _extends({}, configList),
	                postJson = {
	                ModeSet: [],
	                ConfigurationType: 1,
	                MenuNumber: getMenuId(this),
	                TotalNumberOfStages: +TotalNumberOfStages
	            },
	                that = this;

	            for (var k in newConfigList) {
	                var item = _extends({}, newConfigList[k]);
	                delete item['isRemind'];
	                delete item['ConfigurationType'];
	                delete item['MenuNumber'];
	                delete item['TotalNumberOfStages'];
	                for (var m in item) {
	                    item[m] = +item[m];
	                }
	                postJson.ModeSet[k - 1] = item;
	            }
	            het.post(_constants.CONFIGURATION, { // 发送配置数据
	                json: JSON.stringify(postJson),
	                source: source(),
	                deviceId: deviceId,
	                isSentDown: 0
	            }, callback(1, that, postJson), errCallback, 1);
	            postClockList(that);
	        }
	    }, {
	        key: 'handleStop',
	        value: function handleStop() {
	            this.setState({ cancelShow: true });
	        }
	    }, {
	        key: 'handleNextStep',
	        value: function handleNextStep() {
	            postClockList(this);
	            _Actions.Actions.sendData({ 'pause': 2 });
	        }
	    }, {
	        key: 'handleCancelMode',
	        value: function handleCancelMode() {
	            (0, _constants.cancelClock)(this.state);
	            _Actions.Actions.sendData({ mode: 0, rapidheating: 2, light: 2, power: 3 });
	        }
	    }, {
	        key: 'renderParamListDOM',
	        value: function renderParamListDOM(items, stepsNum) {
	            var _this2 = this;

	            var StageMode = items.StageMode,
	                ModeTimingHour = items.ModeTimingHour,
	                ModeTimingMin = items.ModeTimingMin,
	                ModeTempHigh = items.ModeTempHigh,
	                ModeTempLow = items.ModeTempLow,
	                SteamSwitch = items.SteamSwitch,
	                SteamTimingHour = items.SteamTimingHour,
	                SteamTimingMin = items.SteamTimingMin;

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'step-items-param', onTouchTap: function onTouchTap() {
	                            _this2.handleSetParam(stepsNum, 1);
	                        } },
	                    React.createElement(
	                        'div',
	                        { className: 'step-name' },
	                        _constants.RUNMODE[StageMode]
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'step-time' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6E29\u5EA6\uFF1A',
	                            transformTem(ModeTempHigh, ModeTempLow),
	                            '\xB0C'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u65F6\u95F4\uFF1A',
	                            (0, _constants.addZero)(+ModeTimingHour),
	                            ':',
	                            (0, _constants.addZero)(+ModeTimingMin)
	                        )
	                    ),
	                    React.createElement('div', { className: 'step-status' })
	                ),
	                SteamSwitch == '1' ? React.createElement(
	                    'div',
	                    { className: 'step-items-param', onTouchTap: function onTouchTap() {
	                            _this2.handleSetParam(stepsNum, 0);
	                        } },
	                    React.createElement(
	                        'div',
	                        { className: 'step-name' },
	                        '\u84B8\u6C7D'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'step-time' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u65F6\u95F4\uFF1A',
	                            (0, _constants.addZero)(+SteamTimingHour),
	                            ':',
	                            (0, _constants.addZero)(+SteamTimingMin)
	                        )
	                    ),
	                    React.createElement('div', { className: 'step-status' })
	                ) : null
	            );
	        }
	    }, {
	        key: 'renderParamDOM',
	        value: function renderParamDOM(item, stepsNum) {
	            var _this3 = this;

	            var _state3 = this.state,
	                recipeworkingnumber = _state3.recipeworkingnumber,
	                modestatus = _state3.modestatus;

	            return React.createElement(
	                'div',
	                { className: 'step-items-list' },
	                this.renderParamListDOM(item, stepsNum),
	                React.createElement(
	                    'div',
	                    { className: 'step-warn' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u5B8C\u6210\u524D1\u5206\u949F\u63D0\u9192'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'warn-switch', onClick: function onClick() {
	                                _this3.handleSwitch(item.isRemind, stepsNum);
	                            } },
	                        React.createElement('span', { className: item.isRemind ? '' : 'off' })
	                    )
	                )
	            );
	        }
	    }, {
	        key: 'renderStepDOM',
	        value: function renderStepDOM() {
	            var _this4 = this;

	            var _state4 = this.state,
	                configList = _state4.configList,
	                recipeworkingnumber = _state4.recipeworkingnumber,
	                modestatus = _state4.modestatus,
	                newConfigList = [];


	            for (var k in configList) {
	                newConfigList[k - 1] = configList[k];
	            }

	            var showClassName = function showClassName(stage) {
	                if (modestatus != 9 || modestatus == 9 && !_this4._isMenuIdEq()) {
	                    return '';
	                }
	                if ((0, _constants.isCloudFinished)(_this4.state)) {
	                    return 'step-actived';
	                } else {
	                    if (recipeworkingnumber == stage) {
	                        return 'step-active';
	                    }
	                    if (recipeworkingnumber > stage) {
	                        return 'step-actived';
	                    }
	                }
	                return '';
	            };
	            var maxStep = Math.max.apply(Math, _toConsumableArray(Object.keys(configList)));
	            return React.createElement(
	                'div',
	                { className: '' + (modestatus == 9 && this._isMenuIdEq() ? 'cloudMenuDoing' : '') },
	                newConfigList.map(function (item, index) {
	                    return React.createElement(
	                        'div',
	                        { className: 'step-list ' + showClassName(item.Stages), key: item.Stages },
	                        React.createElement(
	                            'div',
	                            { className: 'step-num' },
	                            item.Stages
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'step-items' },
	                            _this4.renderParamDOM(item, item.Stages)
	                        )
	                    );
	                }),
	                React.createElement(
	                    'div',
	                    { className: 'step-list step-finish ' + ((0, _constants.isCloudFinished)(this.state) && 'step-active') },
	                    React.createElement(
	                        'div',
	                        { className: 'step-num' },
	                        maxStep + 1
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'step-items' },
	                        React.createElement(
	                            'div',
	                            { className: 'step-finish-txt' },
	                            '\u70F9\u996A\u5B8C\u6210'
	                        )
	                    )
	                )
	            );
	        }
	    }, {
	        key: '_isMenuIdEq',
	        value: function _isMenuIdEq() {
	            var _state5 = this.state,
	                MenuNumberHigh = _state5.MenuNumberHigh,
	                MenuNumberLow = _state5.MenuNumberLow,
	                menuId = MenuNumberHigh * 256 + MenuNumberLow;

	            return menuId == getMenuId(this);
	        }
	    }, {
	        key: 'renderButton',
	        value: function renderButton() {
	            var modestatus = this.state.modestatus;

	            if (modestatus == 0 || modestatus == void 0 || modestatus == 9 && !this._isMenuIdEq()) {
	                // 非云菜谱模式 或者 云菜谱id不相等
	                return React.createElement(
	                    'span',
	                    { className: 'cacel', onTouchTap: this.handleStart },
	                    '\u542F\u52A8'
	                );
	            }
	            if (modestatus != 9 && modestatus != 0 || (0, _constants.isCloudFinished)(this.state)) {
	                return;
	            }
	            return React.createElement(
	                'span',
	                { onTouchTap: this.handleStop },
	                '\u53D6\u6D88'
	            );
	        }
	    }, {
	        key: 'renderTopDOM',
	        value: function renderTopDOM() {
	            var _state6 = this.state,
	                networkavailable = _state6.networkavailable,
	                online = _state6.online,
	                modestatus = _state6.modestatus,
	                configList = _state6.configList,
	                recipeworkingnumber = _state6.recipeworkingnumber,
	                recipetemperature = _state6.recipetemperature,
	                reciperemainingworkingtimehour = _state6.reciperemainingworkingtimehour,
	                reciperemainingworkingtimemin = _state6.reciperemainingworkingtimemin,
	                PauseStatus = _state6.PauseStatus;

	            if ((0, _constants.isCloudFinished)(this.state)) {
	                return React.createElement(
	                    'span',
	                    { className: 'wait' },
	                    '\u70D8\u7119\u5B8C\u6210'
	                );
	            }
	            if (networkavailable == 2) {
	                return React.createElement(
	                    'span',
	                    { className: 'wait' },
	                    '\u7F51\u7EDC\u5DF2\u65AD\u5F00'
	                );
	            }
	            if (online == 2) {
	                return React.createElement(
	                    'span',
	                    { className: 'wait' },
	                    '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                );
	            }
	            return modestatus != 9 || modestatus == 9 && !this._isMenuIdEq() ? React.createElement(
	                'span',
	                { className: 'wait' },
	                '\u7B49\u5F85\u70F9\u996A'
	            ) : React.createElement(
	                'div',
	                { className: 'cooking' },
	                React.createElement(
	                    'p',
	                    { className: 'cook-mode' },
	                    _constants.RUNMODE[configList[String(recipeworkingnumber)].StageMode]
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'temperature' },
	                    recipetemperature,
	                    React.createElement(
	                        'span',
	                        null,
	                        '\xB0C'
	                    )
	                ),
	                React.createElement(
	                    'p',
	                    { className: 'time' },
	                    (0, _constants.addZero)(parseInt(reciperemainingworkingtimehour)),
	                    ':',
	                    (0, _constants.addZero)(reciperemainingworkingtimemin)
	                ),
	                React.createElement('span', { className: '' + (PauseStatus == 1 ? 'stop-rotate' : 'rotate') })
	            );
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _state7 = this.state,
	                cancelShow = _state7.cancelShow,
	                stopShow = _state7.stopShow,
	                PauseStatus = _state7.PauseStatus,
	                setShow = _state7.setShow,
	                changeTemperature = _state7.changeTemperature,
	                selectedStep = _state7.selectedStep,
	                tempShow = _state7.tempShow,
	                configList = _state7.configList,
	                changeTimeHour = _state7.changeTimeHour,
	                changeTimeMin = _state7.changeTimeMin,
	                modestatus = _state7.modestatus,
	                recipetemperature = _state7.recipetemperature,
	                reciperemainingworkingtimehour = _state7.reciperemainingworkingtimehour,
	                reciperemainingworkingtimemin = _state7.reciperemainingworkingtimemin,
	                recipeworkingnumber = _state7.recipeworkingnumber;

	            if ((0, _constants.isOwnEmpty)(configList)) {
	                return React.createElement(
	                    'div',
	                    null,
	                    React.createElement('div', { className: 'menu-bar', style: { height: _constants.TOPDISTANCE } }),
	                    React.createElement(
	                        'div',
	                        { className: 'menu-detail' },
	                        React.createElement(
	                            'div',
	                            null,
	                            '\u6570\u636E\u52A0\u8F7D\u4E2D..'
	                        )
	                    )
	                );
	            }
	            var _configList$selectedS = configList[selectedStep],
	                StageMode = _configList$selectedS.StageMode,
	                ModeTempHigh = _configList$selectedS.ModeTempHigh,
	                ModeTempLow = _configList$selectedS.ModeTempLow,
	                ModeTimingHour = _configList$selectedS.ModeTimingHour,
	                ModeTimingMin = _configList$selectedS.ModeTimingMin,
	                SteamSwitch = _configList$selectedS.SteamSwitch,
	                SteamTimingHour = _configList$selectedS.SteamTimingHour,
	                SteamTimingMin = _configList$selectedS.SteamTimingMin,
	                showHour = tempShow ? ModeTimingHour : SteamTimingHour,
	                showMin = tempShow ? ModeTimingMin : SteamTimingMin,
	                showRangTime = changeTimeHour != undefined && changeTimeMin != undefined ? changeTimeHour * 60 + changeTimeMin : showHour * 60 + +showMin,
	                showTimeTxt = changeTimeHour != undefined && changeTimeMin != undefined ? (0, _constants.addZero)(changeTimeHour) + ' : ' + (0, _constants.addZero)(changeTimeMin) : (0, _constants.addZero)(+showHour) + ' : ' + (0, _constants.addZero)(+showMin),
	                showTemp = changeTemperature === undefined ? transformTem(ModeTempHigh, ModeTempLow) : changeTemperature,
	                nofinished = (0, _constants.isCloudFinished)(this.state);

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'menu-detail' },
	                    React.createElement('div', { className: 'menu-bar', style: { height: _constants.TOPDISTANCE } }),
	                    React.createElement(
	                        'div',
	                        { className: 'menu-top', style: { marginTop: _constants.TOPDISTANCE } },
	                        React.createElement(
	                            'div',
	                            { className: 'menu-top-con' },
	                            this.renderTopDOM()
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'menu-step' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            '\u70F9\u996A\u6B65\u9AA4'
	                        ),
	                        this.renderStepDOM()
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'run-set', style: setShow ? { 'opacity': 1, 'display': 'block' } : { 'opacity': 0, 'display': 'none' } },
	                    React.createElement(
	                        'div',
	                        { className: 'run-set-con' },
	                        React.createElement(
	                            'div',
	                            { className: 'run-set-bt flex' },
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell cancel', onTouchTap: this.handleCancel },
	                                '\u53D6\u6D88'
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'flex-cell confirm', onTouchTap: this.handleConfirm },
	                                '\u786E\u5B9A'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'mode-ctrl' },
	                            tempShow ? React.createElement(
	                                'div',
	                                null,
	                                React.createElement(
	                                    'h3',
	                                    null,
	                                    '\u6E29\u5EA6  ',
	                                    showTemp,
	                                    '\u2103'
	                                ),
	                                React.createElement(_range2.default, { value: showTemp, min: _constants.MINTEMPERATURE[+StageMode], max: _constants.MAXTEMPERATURE[+StageMode], fnFeedback: this.handleTemperatureSet })
	                            ) : null,
	                            React.createElement(
	                                'h3',
	                                null,
	                                '\u65F6\u95F4  ',
	                                showTimeTxt,
	                                ' ',
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '(\u5C0F\u65F6)'
	                                )
	                            ),
	                            React.createElement(_range2.default, { value: showRangTime, min: 1, max: 599, type: 'time', fnFeedback: this.handleTimeSet })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'menu-btn' },
	                    this.renderButton()
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: PauseStatus == 1 && modestatus == 9 && !(0, _constants.isCloudFinished)(this.state) && this._isMenuIdEq(), content: '\u5F53\u524D\u6B65\u9AA4\u5DF2\u5B8C\u6210\uFF0C\u8BF7\u6267\u884C\u4E0B\u4E00\u6B65', leftpam: '\u53D6\u6D88\u70F9\u996A', rightpam: '\u4E0B\u4E00\u6B65', submitClock: this.handleNextStep, cancelClock: this.handleCancelMode }),
	                React.createElement(_DialogStyle.DialogStyle, { show: cancelShow, content: '\u7F8E\u98DF\u70F9\u996A\u4E2D\uFF0C\u786E\u5B9A\u53D6\u6D88\u5417\uFF1F', submitClock: this.handleCancelCook, cancelClock: this.handleHideDialog })
	            );
	        }
	    }]);

	    return MenuDetail;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(47);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 47 */
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