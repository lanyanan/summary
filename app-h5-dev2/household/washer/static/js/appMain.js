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
	'changeToWorkingPage', 'appMainViewUpdateState', 'startAction', 'stopAction', 'switchAction', 'childLockAction', 'kuaisuModeAction', 'biaozhunModeAction', 'setFirstInputSetingPage']);

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

	var _washerConstData = __webpack_require__(6);

	var _DeviceTokenCache = __webpack_require__(7);

	var appData = {
	    isFirstInputThisPage: true,
	    isWorking: false,
	    count: 1,
	    online: 2,
	    onLinestatue: false,
	    networkavailable: '1',
	    get_selectModeValue: 0, //modex  index
	    get_orderTimeValue: 0,
	    get_waterLevelValue: '6档',
	    get_processValue: '洗涤+漂洗+脱水',
	    get_specialValue: '无',
	    washerIsStop: true, // 洗衣机是否暂定
	    washerChildLock: false, // 童锁关闭  true 童锁打开
	    washerSwitchLock: false, // true 开机
	    WorkStep: 8

	};

	// ModeKey: mode,                      CodeMode
	//     OrderKey: orderIndex + 1,       OrderMode
	//     WaterLevelKey:waterLevel + 1,   MaxWaterLevel
	//     ProcessKey:processKey + 1,      ProcessMode
	//     FuntionKey:specialKey + 1,      FuntionMode
	//     StartStopKey: parseInt("1",10),  MachineRunStatus
	//     updateFlag: updateFlagSpecial,

	var dataFilterTimers = {
	    CodeMode: 0,
	    ChildLock: 0,
	    MachineRunStatus: 0,
	    WorkMode: 0,
	    OrderMode: 0,
	    ProcessMode: 0,
	    FuntionMode: 0,
	    MaxWaterLevel: 0,

	    CurWashModeSurplusTim: 0,
	    CurOrderSurplusTime: 0,
	    CurSoakSurplusTime: 0,
	    CurWashSurplusTime: 0,
	    CurRinseSurplusTime: 0,
	    CurDehydrationSurplusTime: 0,

	    WorkStep: 0

	};
	function dataFilter(data) {
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	            } else {
	                console.log("yy filter: " + k);
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    return result;
	}
	// 设置过滤器过期时间
	function setDataTimer() {
	    var time = new Date().getTime() + 10e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	// 运行
	//   工作模式  0x00关机模式 0x03为洗衣模式       WorkMode = 0;
	//   工作阶段  0 -8 0=参数设置阶段 1=预约 2=称重 3=浸泡 4=洗涤  WorkStep
	//                 05=漂洗  6=脱水  7=风干  8=洗涤结束阶段

	//   机器运行状态   0x00为暂停状态 0x01为运行状态    MachineRunStatus
	//   童锁状态       0x00 为无童锁 0x01 为有童锁   ChildLock
	// OrderMode      预约模式否属性值定义删除
	// ProcessMode    过程模式否属性值定义删除
	// FuntionMode    特殊功能模式否属性值定义删除
	// MaxWaterLevel

	//   当前洗衣总时间   十六进制数据，单位分钟        CurWashModeTotalTime
	///  当前洗衣剩余时间                           CurWashModeSurplusTim
	//   当前程序预约总时间                         CurOrderTotalTime
	//   当前程序预约剩余时间                       CurOrderSurplusTime
	//   前洗衣浸泡总时间                          CurSoakTotalTime
	//   当前洗衣浸泡剩余时间                       CurSoakSurplusTime
	//   当前洗衣洗涤总时间                         CurWashTotalTime
	//   当前洗衣洗涤剩余时间                       CurWashSurplusTime
	//   当前洗衣漂洗总时间                        CurRinseTotalTime
	//   当前洗衣漂洗剩余时间                      CurRinseSurplusTime
	//   当前洗衣漂洗次数                        CurRinseTimes
	//   当前洗衣脱水总时间                       CurDehydrationTotalTime
	//   当前洗衣脱水剩余时间                    CurDehydrationSurplusTime
	//   当前洗衣风干总时间                       CurAirDryTotalTime
	//   当前洗衣风干剩余时间                      CurAirDrySurplusTime
	//    留水状态 0x00,非留水状态 0x01,留水状态     LeaveWaterStatus


	//控制
	// FuntionKey = 1;
	// LockOnOffKey = 2;
	// ModeKey = 1;
	// OrderKey = 1;
	// PowerOnOffKey = 1;
	// ProcessKey = 1;
	// StartStopKey = 2;  {1, 2}对应工作模式={启动，暂停}
	// WaterLevelKey = 6;

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {

	        var data = dataFilter(datas);

	        //运行数据
	        if (data.CodeMode != undefined) {
	            appData.CodeMode = data.CodeMode;appData.get_selectModeValue = parseInt(appData.CodeMode) - 1;
	        } // 工作模式  程序 标准,快速,强力,羊毛,化纤,牛仔,棉麻,仿生,童衣,内衣
	        if (data.WorkMode != undefined) {
	            appData.WorkMode = data.WorkMode;appData.washerSwitchLock = appData.WorkMode == 3;
	        }
	        if (data.WorkStep != undefined) {
	            appData.WorkStep = data.WorkStep;
	        }
	        if (data.MachineRunStatus != undefined) {
	            appData.MachineRunStatus = data.MachineRunStatus;appData.washerIsStop = appData.MachineRunStatus == 0;
	        }
	        if (data.ChildLock != undefined) {
	            appData.ChildLock = data.ChildLock;appData.washerChildLock = appData.ChildLock == 1;
	        }

	        if (data.OrderMode != undefined) {
	            appData.OrderMode = data.OrderMode;
	            var index = parseInt(appData.OrderMode) > 0 ? parseInt(appData.OrderMode) - 1 : 0;
	            appData.get_orderTimeValue = _washerConstData.orderDataArray[index];
	        }
	        if (data.ProcessMode != undefined) {
	            appData.ProcessMode = data.ProcessMode;
	            var _index = parseInt(appData.ProcessMode) > 0 ? parseInt(appData.ProcessMode) - 1 : 0;
	            appData.get_processValue = _washerConstData.processDataArray[_index];
	        }
	        if (data.FuntionMode != undefined) {
	            appData.FuntionMode = data.FuntionMode;
	            var _index2 = parseInt(appData.FuntionMode) > 0 ? parseInt(appData.FuntionMode) - 1 : 0;
	            appData.get_specialValue = _washerConstData.specialDataArray[_index2];
	            if (appData.get_specialValue == '洁桶') {
	                appData.CurWashSurplusTime = '8';
	                appData.get_processValue = '洗涤+脱水';
	            }
	        }
	        if (data.MaxWaterLevel != undefined) {
	            appData.MaxWaterLevel = data.MaxWaterLevel;
	            var _index3 = parseInt(appData.MaxWaterLevel) > 0 ? parseInt(appData.MaxWaterLevel) - 1 : 0;
	            appData.get_waterLevelValue = _washerConstData.waterLevelDataArray[_index3];
	        }

	        //洗衣总时间
	        if (data.CurWashModeTotalTime != undefined) {
	            appData.CurWashModeTotalTime = data.CurWashModeTotalTime;
	        }
	        if (data.CurWashModeSurplusTim != undefined) {
	            appData.CurWashModeSurplusTim = data.CurWashModeSurplusTim;
	        }
	        // 预约时间
	        if (data.CurOrderTotalTime != undefined) {
	            appData.CurOrderTotalTime = data.CurOrderTotalTime;
	        }
	        if (data.CurOrderSurplusTime != undefined) {
	            appData.CurOrderSurplusTime = data.CurOrderSurplusTime;
	        }
	        // 浸泡时间
	        if (data.CurSoakTotalTime != undefined) {
	            appData.CurSoakTotalTime = data.CurSoakTotalTime;
	        }
	        if (data.CurSoakSurplusTime != undefined) {
	            appData.CurSoakSurplusTime = data.CurSoakSurplusTime;
	        }
	        // 洗涤时间
	        if (data.CurWashTotalTime != undefined) {
	            appData.CurWashTotalTime = data.CurWashTotalTime;
	        }
	        if (data.CurWashSurplusTime != undefined) {
	            appData.CurWashSurplusTime = data.CurWashSurplusTime;
	        }
	        //漂洗 时间
	        if (data.CurRinseTotalTime != undefined) {
	            appData.CurRinseTotalTime = data.CurRinseTotalTime;
	        }
	        if (data.CurRinseSurplusTime != undefined) {
	            appData.CurRinseSurplusTime = data.CurRinseSurplusTime;
	        }
	        if (data.CurRinseTimes != undefined) {
	            appData.CurRinseTimes = data.CurRinseTimes;
	        }
	        //脱水时间
	        if (data.CurDehydrationTotalTime != undefined) {
	            appData.CurDehydrationTotalTime = data.CurDehydrationTotalTime;
	        }
	        if (data.CurDehydrationSurplusTime != undefined) {
	            appData.CurDehydrationSurplusTime = data.CurDehydrationSurplusTime;
	        }
	        // 风干时间
	        if (data.CurAirDryTotalTime != undefined) {
	            appData.CurAirDryTotalTime = data.CurAirDryTotalTime;
	        }
	        if (data.CurAirDrySurplusTime != undefined) {
	            appData.CurAirDrySurplusTime = data.CurAirDrySurplusTime;
	        }
	        // 留水
	        if (data.LeaveWaterStatus != undefined) {
	            appData.LeaveWaterStatus = data.LeaveWaterStatus;
	        }

	        // 控制数据
	        if (data.FuntionKey != undefined) {
	            appData.FuntionKey = data.FuntionKey;
	        } //功能
	        if (data.LockOnOffKey != undefined) {
	            appData.LockOnOffKey = data.LockOnOffKey;appData.washerChildLock = appData.LockOnOffKey == 1;
	        } //开/关童锁
	        if (data.ModeKey != undefined) {
	            appData.ModeKey = data.ModeKey;appData.get_selectModeValue = appData.ModeKey - 1;
	        } // 程序 标准,快速,强力,羊毛,化纤,牛仔,棉麻,仿生,童衣,内衣
	        if (data.OrderKey != undefined) {
	            appData.OrderKey = data.OrderKey;
	        } //预约
	        if (data.ProcessKey != undefined) {
	            appData.ProcessKey = data.ProcessKey;
	        } // 过程 洗涤+漂洗+脱水,浸泡+洗涤+漂洗+脱水,洗涤,洗涤+漂洗,漂洗+脱水,脱水
	        if (data.StartStopKey != undefined) {
	            appData.StartStopKey = data.StartStopKey;appData.washerIsStop = appData.StartStopKey == 2;
	        } //启动/暂停
	        if (data.WaterLevelKey != undefined) {
	            appData.WaterLevelKey = data.WaterLevelKey;
	        } //水位
	        if (data.PowerOnOffKey != undefined) {
	            appData.PowerOnOffKey = data.PowerOnOffKey;
	            console.log("yy receive switch: " + appData.PowerOnOffKey);
	            appData.washerSwitchLock = appData.PowerOnOffKey == 1;
	        } //开关机


	        //离线&故障
	        if (data.online) appData.online = data.online;
	        if (data.networkavailable) appData.networkavailable = data.networkavailable;
	        if (data.online == 2) {
	            appData.onLinestatue = false;
	        } else {
	            appData.onLinestatue = true;
	        }

	        if (data.appId != undefined) appData.appId = data.appId;
	        if (data.deviceId != undefined) appData.deviceId = data.deviceId;
	        if (data.accessToken != undefined) appData.accessToken = data.accessToken;
	        if (data.deviceId != undefined && data.accessToken != undefined && !(0, _DeviceTokenCache.hasSetRequest)()) {
	            (0, _DeviceTokenCache.setDeviceInfo)(data.accessToken, data.deviceId);
	        }

	        // 故障数据
	        if (data.Error1 != undefined) {
	            appData.Error1 = data.Error1;
	        }
	        if (data.Error2 != undefined) {
	            appData.Error2 = data.Error2;
	        }
	        if (data.Error3 != undefined) {
	            appData.Error3 = data.Error3;
	        }
	        if (data.Error4 != undefined) {
	            appData.Error4 = data.Error4;
	        }
	        if (data.Error5 != undefined) {
	            appData.Error5 = data.Error5;
	        }
	        if (data.Error6 != undefined) {
	            appData.Error6 = data.Error6;
	        }
	        if (data.Error7 != undefined) {
	            appData.Error7 = data.Error7;
	        }
	        if (data.Error8 != undefined) {
	            appData.Error8 = data.Error8;
	        }
	        if (data.Error9 != undefined) {
	            appData.Error9 = data.Error9;
	        }
	        if (data.Error10 != undefined) {
	            appData.Error10 = data.Error10;
	        }
	        if (data.Error11 != undefined) {
	            appData.Error11 = data.Error11;
	        }
	        if (data.Error12 != undefined) {
	            appData.Error12 = data.Error12;
	        }
	        if (data.Error13 != undefined) {
	            appData.Error13 = data.Error13;
	        }
	        if (data.Error14 != undefined) {
	            appData.Error14 = data.Error14;
	        }
	        if (data.Error15 != undefined) {
	            appData.Error15 = data.Error15;
	        }
	        if (data.Error16 != undefined) {
	            appData.Error16 = data.Error16;
	        }
	        if (data.Error17 != undefined) {
	            appData.Error17 = data.Error17;
	        }

	        // 工作状态
	        if (!appData.washerIsStop && appData.washerSwitchLock && appData.onLinestatue) {
	            console.log("yy set isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);
	            appData.isWorking = true;
	        }
	        // 预约状态
	        else if (appData.washerIsStop && appData.washerSwitchLock && appData.onLinestatue && appData.WorkStep > 0 && appData.WorkStep < 8) {
	                console.log("yy set yuyue isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);
	                appData.isWorking = true;
	            } else {
	                console.log("yy set clear isWorking true switch: " + appData.washerSwitchLock + " stop:" + appData.washerIsStop);

	                appData.isWorking = false;
	            }

	        this.trigger(appData);
	    },
	    onChangeToWorkingPage: function onChangeToWorkingPage(value) {
	        appData.isWorking = value;
	        console.log("stroe is work: " + appData.isWorking);
	        var count = appData.count;

	        count += 1;
	        appData.count = count;
	        this.trigger(appData);
	    },
	    onAppMainViewUpdateState: function onAppMainViewUpdateState() {
	        this.trigger(appData);
	    },
	    onStartAction: function onStartAction(data) {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        if (!orderCheck()) {
	            return;
	        }

	        startWasher(data.set_selectModeValue, data.set_orderTimeValue, data.set_waterLevelValue, data.set_processValue, data.set_specialValue);
	    },
	    onStopAction: function onStopAction(data) {
	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        appData.washerIsStop = data;

	        var updateFlag = het.hexUpFlag(11, 1, 4);
	        var switchData = {};
	        if (appData.washerIsStop) {
	            switchData = {
	                StartStopKey: parseInt("2", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            switchData = {
	                StartStopKey: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });

	        console.log("控制命令 设置暂停: " + appData.washerIsStop);
	        setDataTimer("MachineRunStatus");
	        this.trigger(appData);
	    },
	    onSwitchAction: function onSwitchAction(data) {

	        if (!NetWokrCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        // Actions.changeToWorkingPage(false);
	        appData.isWorking = false;
	        appData.washerSwitchLock = data;

	        var updateFlag = het.hexUpFlag(4, 1, 4);
	        var switchData = {};
	        if (appData.washerSwitchLock) {
	            switchData = {
	                PowerOnOffKey: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            appData.MachineRunStatus = 0;
	            appData.washerIsStop = true;
	            appData.WorkStep = 0;
	            var updateFlagStop = het.hexUpFlag(11, 1, 4, updateFlag);
	            switchData = {
	                StartStopKey: parseInt("2", 10),
	                PowerOnOffKey: parseInt("2", 10),
	                updateFlag: updateFlagStop
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });

	        setDataTimer("WorkMode", "MachineRunStatus", 'WorkStep');
	        console.log("控制命令 ");
	        this.trigger(appData);
	    },
	    onChildLockAction: function onChildLockAction(data) {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        appData.washerChildLock = data;

	        var updateFlag = het.hexUpFlag(5, 1, 4);
	        var switchData = {};
	        if (appData.washerChildLock) {
	            switchData = {
	                LockOnOffKey: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            switchData = {
	                LockOnOffKey: parseInt("2", 10),
	                updateFlag: updateFlag
	            };
	        }
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log("控制命令 ");
	        setDataTimer("ChildLock");
	        this.trigger(appData);
	    },
	    onSetFirstInputSetingPage: function onSetFirstInputSetingPage(data) {
	        appData.isFirstInputThisPage = data;
	        this.trigger(appData);
	    },
	    onKuaisuModeAction: function onKuaisuModeAction() {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        if (!childLockCheck()) {
	            return;
	        }

	        if (!orderCheck()) {
	            return;
	        }

	        var modeIndex = appData.get_selectModeValue || 0;
	        var onWashing = appData.washerIsStop != undefined ? appData.washerIsStop : true;
	        if (!onWashing) {
	            if (modeIndex != 1) {
	                het.toast("正在洗衣，请暂停后切换模式");
	            }
	            return;
	        }

	        startWasher("1", "0", "6档", "洗涤+漂洗+脱水", "无");
	    },
	    onBiaozhunModeAction: function onBiaozhunModeAction() {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }
	        if (!childLockCheck()) {
	            return;
	        }
	        if (!orderCheck()) {
	            return;
	        }

	        var modeIndex = appData.get_selectModeValue || 0;
	        var onWashing = appData.washerIsStop != undefined ? appData.washerIsStop : true;
	        if (!onWashing) {
	            console.log("正在洗衣服");
	            if (modeIndex != 0) {
	                het.toast("正在洗衣，请暂停后切换模式");
	            }
	            return;
	        }
	        startWasher("0", "0", "6档", "洗涤+漂洗+脱水", "无");
	    }
	});

	function startWasher(selectMode, orderTimerValue, waterLevelValue, processValue, specialValue) {
	    appData.get_selectModeValue = parseInt(selectMode);
	    appData.get_orderTimeValue = orderTimerValue;
	    appData.get_waterLevelValue = waterLevelValue;
	    appData.get_processValue = processValue;
	    appData.get_specialValue = specialValue;
	    appData.washerIsStop = false;
	    appData.isWorking = true;

	    var currentModeConfigData = _washerConstData.washerModeS[appData.get_selectModeValue];

	    // 设置模式后，强制设置一次时间，方便显示
	    //洗衣总时间
	    appData.CurWashModeSurplusTim = currentModeConfigData.totalTime;
	    // 预约时间
	    appData.CurOrderSurplusTime = parseInt(appData.get_orderTimeValue) * 60;
	    // 浸泡时间
	    appData.CurSoakSurplusTime = currentModeConfigData.SoakTotalTime;
	    // 洗涤时间
	    appData.CurWashSurplusTime = currentModeConfigData.WashTotalTime;
	    //漂洗 时间
	    appData.CurRinseSurplusTime = currentModeConfigData.RinseTotalTime;
	    //脱水时间
	    appData.CurDehydrationSurplusTime = currentModeConfigData.DehydrationTotalTime;

	    if (specialValue == '洁桶') {
	        appData.CurWashSurplusTime = '8';
	        appData.get_processValue = '洗涤+脱水';
	    }

	    // 模式发送
	    var updateFlag = het.hexUpFlag(11, 1, 4);
	    var updateFlagMode = het.hexUpFlag(6, 1, 4, updateFlag);
	    var updateFlagOrder = het.hexUpFlag(7, 1, 4, updateFlagMode);
	    var updateFlagWater = het.hexUpFlag(8, 1, 4, updateFlagOrder);
	    var updateFlagProcess = het.hexUpFlag(9, 1, 4, updateFlagWater);
	    var updateFlagSpecial = het.hexUpFlag(10, 1, 4, updateFlagProcess);

	    var mode = appData.get_selectModeValue + 1;
	    var orderIndex = _washerConstData.orderDataArray.indexOf(appData.get_orderTimeValue) || 0;
	    var waterLevel = _washerConstData.waterLevelDataArray.indexOf(appData.get_waterLevelValue) || 0;
	    var processKey = _washerConstData.processDataArray.indexOf(appData.get_processValue) || 0;
	    var specialKey = _washerConstData.specialDataArray.indexOf(appData.get_specialValue) || 0;

	    var switchData = {
	        ModeKey: mode,
	        OrderKey: orderIndex + 1,
	        WaterLevelKey: waterLevel + 1,
	        ProcessKey: processKey + 1,
	        FuntionKey: specialKey + 1,
	        updateFlag: updateFlagSpecial,
	        StartStopKey: parseInt("1", 10)
	    };

	    // if( appData.get_orderTimeValue == 0){
	    //    // switchData["StartStopKey"] = parseInt("1",10);
	    // }else{
	    //   //  switchData["StartStopKey"] = parseInt("2",10);
	    //     appData.WorkStep = 1;
	    //     appData.OrderMode =  orderIndex + 1;
	    // }

	    var workModeArray = ["参数设置阶段", "预约", "称重", "浸泡", "洗涤", "漂洗", "脱水", "风干", "洗涤结束"];
	    var processData = appData.get_processValue || '洗涤+漂洗+脱水';
	    var processArray = processData.split("+");
	    if (appData.get_orderTimeValue != 0) {
	        processArray.splice(0, 0, "预约");
	    }
	    var firstStep = processArray[0] || "";
	    var firstStepIndex = workModeArray.indexOf(firstStep);
	    appData.WorkStep = firstStepIndex;

	    het.send(switchData, function (data) {}, function (data) {
	        het.toast("发送失败");
	    });

	    console.log("控制命令 预设第一个模式：" + firstStepIndex);

	    //强制设置模式后，不在获取模式，工作步骤等，先强制设置，如果成功了，就取这个结果
	    setDataTimer("CodeMode", "OrderMode", "ProcessMode", "FuntionMode", "MaxWaterLevel", "MachineRunStatus", "WorkStep");

	    setDataTimer("CurWashModeSurplusTim", "CurOrderSurplusTime", "CurSoakSurplusTime", "CurWashSurplusTime", "CurRinseSurplusTime", "CurDehydrationSurplusTime");

	    console.log("启动模式：" + _washerConstData.washerModeS[appData.get_selectModeValue].name + " " + appData.get_orderTimeValue + " " + appData.get_waterLevelValue + " " + appData.get_processValue + " " + appData.get_specialValue);
	    this.trigger(appData);
	}

	function orderCheck() {
	    var workStep = appData.WorkStep || 0;
	    if (workStep == 1) {
	        het.toast("预约中");
	        return false;
	    }
	    return true;
	}

	function childLockCheck() {
	    var childlOCKData = appData.washerChildLock;
	    if (childlOCKData) {
	        het.toast("童锁已打开");
	        return false;
	    }
	    return true;
	}

	function switchAndNetWorkCheck() {

	    if (!NetWokrCheck()) {
	        return false;
	    }

	    var switchStatua = appData.washerSwitchLock;
	    if (!switchStatua) {
	        het.toast("请开机");
	        return false;
	    }

	    return true;
	}

	function NetWokrCheck() {
	    var netWorkStatus = appData.networkavailable == 2;
	    if (netWorkStatus) {
	        het.toast("当前网络不可用");
	        return false;
	    }

	    var onLineStatus = appData.online == 2;
	    if (onLineStatus) {
	        het.toast("设备已离线");
	        return false;
	    }
	    return true;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Created by yuanyunlong on 2017/1/10.
	 */

	var orderDataArray = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	var waterLevelDataArray = ['1档', '2档', '3档', '4档', '5档', '6档', '7档', '8档', '9档', '10档'];
	var processDataArray = ['洗涤+漂洗+脱水', '浸泡+洗涤+漂洗+脱水', '洗涤', '洗涤+漂洗', '漂洗+脱水', '脱水'];
	var specialDataArray = ['无', '留水', '夜间', '洁桶', '风干90分钟'];

	// totalTime 【洗衣总时间】 SoakTotalTime【浸泡总时间】 WashTotalTime【洗涤总时间】  RinseTotalTime【漂洗总时间】  DehydrationTotalTime【脱水总时间】
	var washerModeS = [{ id: 0, name: '标准', totalTime: 43, SoakTotalTime: 12, WashTotalTime: 12, RinseTotalTime: 24, DehydrationTotalTime: 5 }, { id: 1, name: '快速', totalTime: 26, SoakTotalTime: 12, WashTotalTime: 9, RinseTotalTime: 9, DehydrationTotalTime: 3 }, { id: 2, name: '强力', totalTime: 48, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 30, DehydrationTotalTime: 7 }, { id: 3, name: '羊毛', totalTime: 31, SoakTotalTime: 12, WashTotalTime: 9, RinseTotalTime: 18, DehydrationTotalTime: 2 }, { id: 4, name: '化纤', totalTime: 43, SoakTotalTime: 12, WashTotalTime: 12, RinseTotalTime: 24, DehydrationTotalTime: 5 }, { id: 5, name: '牛仔', totalTime: 59, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 45, DehydrationTotalTime: 7 }, { id: 6, name: '棉麻', totalTime: 48, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 30, DehydrationTotalTime: 7 }, { id: 7, name: '仿生', totalTime: 43, SoakTotalTime: 12, WashTotalTime: 12, RinseTotalTime: 24, DehydrationTotalTime: 5 }, { id: 8, name: '童衣', totalTime: 59, SoakTotalTime: 12, WashTotalTime: 15, RinseTotalTime: 45, DehydrationTotalTime: 7 }, { id: 9, name: '内衣', totalTime: 26, SoakTotalTime: 12, WashTotalTime: 9, RinseTotalTime: 9, DehydrationTotalTime: 3 }];
	exports.orderDataArray = orderDataArray;
	exports.waterLevelDataArray = waterLevelDataArray;
	exports.processDataArray = processDataArray;
	exports.specialDataArray = specialDataArray;
	exports.washerModeS = washerModeS;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Created by yuanyunlong on 2017/2/22.
	 */

	var requestInfo = {
	    userToken: '',
	    deviceId: ''
	};

	var hasSet = false;

	function setDeviceInfo(uerToken1, deviceid1) {
	    if (uerToken1 && deviceid1) {
	        requestInfo.userToken = uerToken1;
	        requestInfo.deviceId = deviceid1;

	        if (uerToken1.length > 3 && deviceid1.length > 3) {
	            hasSet = true;
	        }
	    }
	}

	function getDeviceInfo() {
	    return requestInfo;
	}

	function hasSetRequest() {
	    return hasSet;
	}

	module.exports = { setDeviceInfo: setDeviceInfo, getDeviceInfo: getDeviceInfo, hasSetRequest: hasSetRequest };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _SetingPage = __webpack_require__(9);

	var _WorkingPage = __webpack_require__(12);

	var _CircleAnimation = __webpack_require__(48);

	var _Wave = __webpack_require__(46);

	var _WashHistory = __webpack_require__(49);

	var _WasherWave = __webpack_require__(52);

	var _DeviceTokenCache = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {},
	        renderConfigData: true });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});
	var isIOS = false;
	var screenHeight = 375;
	// 创建React组件

	var appError = {
	    Error1: {
	        value: 0,
	        level: 1,
	        message: '进水异常'
	    },
	    Error2: {
	        value: 0,
	        level: 2,
	        message: '排水异常'
	    },
	    Error3: {
	        value: 0,
	        level: 3,
	        message: '脱水异常'
	    },
	    Error4: {
	        value: 0,
	        level: 4,
	        message: '开盖异常'
	    },
	    Error5: {
	        value: 0,
	        level: 5,
	        message: '水位传感器异常'
	    },
	    Error6: {
	        value: 0,
	        level: 6,
	        message: '童锁报警'
	    },
	    Error7: {
	        value: 0,
	        level: 7,
	        message: 'PCBA温度传感器异常'
	    },
	    Error8: {
	        value: 0,
	        level: 8,
	        message: '环境温度传感器异'
	    },
	    Error9: {
	        value: 0,
	        level: 9,
	        message: '交流电压过高'
	    },
	    Error10: {
	        value: 0,
	        level: 10,
	        message: '交流电压过低'
	    },
	    Error11: {
	        value: 0,
	        level: 11,
	        message: '交流过流'
	    },
	    Error12: {
	        value: 0,
	        level: 12,
	        message: '功率模块故障'
	    },
	    Error13: {
	        value: 0,
	        level: 13,
	        message: '漏电'
	    },
	    Error14: {
	        value: 0,
	        level: 14,
	        message: '电机温度过高'
	    },
	    Error15: {
	        value: 0,
	        level: 15,
	        message: '进水流量计损坏'
	    },
	    Error16: {
	        value: 0,
	        level: 16,
	        message: '出水流量计损坏'
	    }
	};

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.appMainViewUpdateState();
	        console.log("app constructor");

	        _this.state = {
	            showToHisPage: false
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleToSettingPage',
	        value: function handleToSettingPage(e) {

	            var switchLock = this.state.washerSwitchLock || false;
	            if (!switchLock) {
	                return;
	            }
	            if (!this.childLockCheckAction()) {
	                return;
	            }

	            var workModeIndex = this.state.WorkStep || 0; // 这个正在工作的模式  //如果是预约模式，只有关机和童锁可以点击
	            var orderMode = this.state.OrderMode || 0;
	            if (orderMode && workModeIndex == 1 && this.state.isWorking) {
	                console.log("有预约，不能设置");
	                return;
	            }

	            var isWorking = this.state.isWorking;
	            var isStop = this.state.washerIsStop || false;

	            if (isWorking && !isStop) {
	                het.toast("请暂停后修改模式!");
	                return;
	            }

	            window.location.href = '#/seting';
	            _Actions.Actions.setFirstInputSetingPage(true);
	        }
	    }, {
	        key: 'handleToHistoryPage',
	        value: function handleToHistoryPage() {
	            window.location.href = '#/washhis';
	        }
	    }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            console.log("appmain componentWillMount");
	            het.setTitle(JSON.stringify({
	                setNavTitle: 0,
	                setNavRightBtnHiden: 0
	            }));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            console.log("appmain componentDidMount");
	            //导航栏:{ios:73,android:64}
	            isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            screenHeight = window.screen.height;
	        }
	    }, {
	        key: 'childLockCheckAction',
	        value: function childLockCheckAction() {
	            if (this.state.online == '2') {
	                het.toast("设备已离线");
	                return false;
	            }

	            var childLock = this.state.washerChildLock || false;
	            if (childLock) {
	                het.toast("童锁已经打开");
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: 'stopAction',
	        value: function stopAction() {

	            var workModeIndex = this.state.WorkStep || 0; // 这个正在工作的模式  //如果是预约模式，只有关机和童锁可以点击
	            var orderMode = this.state.OrderMode || 0;
	            if (orderMode && workModeIndex == 1 && this.state.isWorking) {
	                console.log("有预约，不能设置");
	                return;
	            }
	            if (!this.childLockCheckAction()) {
	                return;
	            }

	            var isStop = this.state.washerIsStop || false;
	            _Actions.Actions.stopAction(!isStop);
	        }
	    }, {
	        key: 'switchAction',
	        value: function switchAction() {
	            // let isWorking = (this.state.isWorking !== undefined) ? !this.state.isWorking : false ;
	            // this.setState.isWorking = isWorking;
	            //if(!this.childLockCheckAction()){return;}

	            var switchData = !this.state.washerSwitchLock;
	            _Actions.Actions.switchAction(switchData);

	            // 加快页面切换
	            if (switchData == false) {
	                this.setState({
	                    isWorking: false
	                });
	            }
	        }
	    }, {
	        key: 'childLockAction',
	        value: function childLockAction() {

	            var childLockData = !this.state.washerChildLock;
	            _Actions.Actions.childLockAction(childLockData);
	        }
	    }, {
	        key: 'handleAlert',
	        value: function handleAlert() {

	            var hasError = false;
	            var ErrorMessage = '';
	            var lastErrorLevel = 17; // 17最低  最新显示告警级别

	            for (var i = 1; i < 17; i++) {
	                var errorNum = 'Error' + i;
	                if (this.state[errorNum] != undefined && this.state[errorNum] == 1) {
	                    // 有没有告警
	                    if (this.state[errorNum] != appError[errorNum].value) {
	                        // 有没有显示过告警  != ：没有显示过该告警
	                        if (appError[errorNum].level < lastErrorLevel) {
	                            //
	                            lastErrorLevel = appError[errorNum].level;
	                            appError[errorNum].value = this.state[errorNum];
	                            ErrorMessage = appError[errorNum].message;
	                            hasError = true;
	                        }
	                    }
	                }
	            }

	            if (hasError) {
	                // het.toast(JSON.stringify({"title":ErrorMessage, "content":"主人，请与售后联系，电话：400-777-2009", "button":"我知道了"}));
	                het.toast(JSON.stringify({ "contactService": ErrorMessage, "tel": "400-777-2009" }));
	            }
	        }
	    }, {
	        key: 'showToWashHisPage',
	        value: function showToWashHisPage(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            this.setState({
	                showToHisPage: true
	            });
	        }
	    }, {
	        key: 'hiddenToWashHisPage',
	        value: function hiddenToWashHisPage(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            this.setState({
	                showToHisPage: false
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var childLock = this.state.washerChildLock || false;
	            var switchLock = this.state.washerSwitchLock || false;

	            var isWorking = this.state.isWorking;
	            var washerTransform = this.state.showToHisPage ? 140 : 0;

	            console.log("isWorking :" + isWorking + " count:" + this.state.count + " 暂停： " + this.state.washerIsStop);
	            var workstatus = '待机中';
	            var workAlert = '点击设置洗衣模式';

	            var canToSeting = switchLock;
	            if (childLock) {
	                canToSeting = false;
	            }

	            if (switchLock == false) {
	                workstatus = '关机';
	            }
	            if (this.state.online == '2') {
	                workstatus = '设备已离线';
	                isWorking = false;
	                childLock = false;
	                switchLock = false;
	            }

	            var hasGetDeviceId = (0, _DeviceTokenCache.hasSetRequest)();
	            if (isWorking) {
	                hasGetDeviceId = false;
	            };
	            // let hasGetDeviceId = true;
	            var canShowWashHis = hasGetDeviceId ? { visibility: 'visible' } : { visibility: 'hidden' };

	            var toSetingImagePath = canToSeting ? '../static/image/washer/wash_mode.png' : '../static/image/washer/wash_mode_off.png';
	            this.handleAlert();

	            return React.createElement(
	                'div',
	                { className: 'container' },
	                React.createElement(
	                    'div',
	                    { className: 'watingPage' },
	                    React.createElement(
	                        'div',
	                        { className: 'diveceView' },
	                        React.createElement(
	                            'div',
	                            { className: 'device_nav' },
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'deviceWasherImage' },
	                            React.createElement(
	                                'div',
	                                { className: 'deviceWashAnimation' },
	                                React.createElement(_WasherWave.WasherWave, { className: 'waterWave' })
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'device_control' },
	                            React.createElement(
	                                'div',
	                                { className: 'device_control_relative' },
	                                React.createElement(
	                                    'dl',
	                                    { className: 'wash_children_lock', onTouchStart: this.childLockAction.bind(this) },
	                                    React.createElement(
	                                        'dd',
	                                        null,
	                                        React.createElement('img', { src: "../static/image/washer/childerlock_" + (childLock ? "on.png" : "off.png"), width: '36', height: '36' })
	                                    ),
	                                    React.createElement(
	                                        'dt',
	                                        null,
	                                        '\u7AE5\u9501'
	                                    )
	                                ),
	                                React.createElement(
	                                    'dl',
	                                    { className: 'wash_switch', onTouchStart: this.switchAction.bind(this) },
	                                    React.createElement(
	                                        'dd',
	                                        null,
	                                        React.createElement('img', { src: '../static/image/washer/wash_switch.png', width: '36', height: '36' })
	                                    ),
	                                    React.createElement(
	                                        'dt',
	                                        null,
	                                        switchLock ? '关机' : '开机'
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'ControlPannelUpWave' },
	                        React.createElement(_Wave.Wave, { waveID: 'workWave' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'diveceSetingView' },
	                        React.createElement(
	                            'div',
	                            { className: 'deviceSeting_status' },
	                            React.createElement(
	                                'span',
	                                null,
	                                workstatus
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'deviceSeting_modeImage', onTouchStart: this.handleToSettingPage.bind(this) },
	                            React.createElement('img', { src: toSetingImagePath })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: "deviceSeting_alert " + (canToSeting ? '' : 'off') },
	                            workAlert
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'show_wash_his_button', onTouchStart: this.showToWashHisPage.bind(this), style: canShowWashHis },
	                            React.createElement('img', { src: '../static/image/arrow_up.png' })
	                        )
	                    )
	                ),
	                React.createElement(_WorkingPage.Working, {

	                    operate: this.state,
	                    show: isWorking,
	                    childLockAction: this.childLockAction.bind(this),
	                    switchAction: this.switchAction.bind(this), å: true,
	                    setingPageAction: this.handleToSettingPage.bind(this),
	                    stopAction: this.stopAction.bind(this)
	                }),
	                React.createElement(
	                    'div',
	                    { className: 'wash_his_button', style: { transform: "translateY(-" + washerTransform + "px)", WebkitTransform: "translateY(-" + washerTransform + "px)" } },
	                    React.createElement(
	                        'h2',
	                        { onTouchStart: this.hiddenToWashHisPage.bind(this) },
	                        React.createElement('img', { src: '../static/image/arrow_down.png' })
	                    ),
	                    React.createElement(
	                        'h1',
	                        { onTouchStart: this.handleToHistoryPage.bind(this) },
	                        '\u6D17\u6DA4\u8BB0\u5F55'
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/seting', component: _SetingPage.Seting }),
	        React.createElement(Route, { path: '/washhis', component: _WashHistory.WashHistory })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Seting = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _TimeSelect = __webpack_require__(10);

	var _Loading = __webpack_require__(11);

	var _washerConstData = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 2016/12/28.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;


	var liushuiIndexArray = [0, 1, 4];
	var orderSelect = {
	    selecttitle: '洗衣机时间设置',
	    statusshow: 1,

	    hourshow: true,
	    hourstep: 1,
	    hourunit: '小时',
	    hourarray: _washerConstData.orderDataArray,
	    maxhour: 23,
	    minhour: 0,
	    defaulthour: 0,

	    minuteshow: false,
	    minutestep: 1,
	    minuteunit: '分钟',
	    maxmin: 0,
	    minminute: 0,
	    ArrayInit: [0],
	    defaultminute: 0
	};

	var waterLevel = {

	    selecttitle: '水位设置',
	    statusshow: 0,

	    hourshow: true,
	    hourstep: 1,
	    hourunit: '',
	    hourarray: _washerConstData.waterLevelDataArray,
	    maxhour: 10,
	    minhour: 0,
	    defaulthour: '6档',

	    minuteshow: false,
	    minutestep: 0,
	    minuteunit: '',
	    maxmin: 0,
	    minminute: 0,
	    ArrayInit: [0],
	    defaultminute: 0
	};

	var processArray = {
	    selecttitle: '过程设置',
	    statusshow: 0,

	    hourshow: true,
	    hourstep: 1,
	    hourunit: '',
	    hourarray: _washerConstData.processDataArray,
	    maxhour: 5,
	    minhour: 0,
	    defaulthour: _washerConstData.processDataArray[0],

	    minuteshow: false,
	    minutestep: 0,
	    minuteunit: '',
	    maxmin: 0,
	    minminute: 0,
	    ArrayInit: [0],
	    defaultminute: 0
	};

	var specialArray = {
	    selecttitle: '特色功能设置',
	    statusshow: 0,

	    hourshow: true,
	    hourstep: 1,
	    hourunit: '',
	    hourarray: _washerConstData.specialDataArray,
	    maxhour: 4,
	    minhour: 0,
	    defaulthour: '无',

	    minuteshow: false,
	    minutestep: 0,
	    minuteunit: '',
	    maxmin: 0,
	    minminute: 0,
	    ArrayInit: [0],
	    defaultminute: 0
	};

	var isIOS = true;
	var modeDefaultValue = 0;
	var orderDefaultValue = _washerConstData.orderDataArray[0];
	var waterDefaultValue = _washerConstData.waterLevelDataArray[0];
	var processDefaultValue = _washerConstData.processDataArray[0];
	var specialDefaultValue = '无';

	var Seting = exports.Seting = function (_BaseComponent) {
	    _inherits(Seting, _BaseComponent);

	    function Seting(props) {
	        _classCallCheck(this, Seting);

	        var _this = _possibleConstructorReturn(this, (Seting.__proto__ || Object.getPrototypeOf(Seting)).call(this, props));

	        _this.state = { isWorking: false,
	            selectshow: false,

	            selectIndex: 0,

	            set_selectModeValue: modeDefaultValue, //modex  index
	            set_orderTimeValue: orderDefaultValue,
	            set_waterLevelValue: waterDefaultValue,
	            set_processValue: processDefaultValue,
	            set_specialValue: specialDefaultValue, // 这个东西是一个可变的值
	            loadingShow: false,
	            isEnableLiushui: false,
	            isEnableYejian: false

	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.cancelClock = _this.cancelClock.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        return _this;
	    }

	    _createClass(Seting, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            het.setTitle(JSON.stringify({
	                setNavTitle: 1,
	                title: '模式',
	                setNavRightBtnHiden: 1
	            }));

	            //导航栏:{ios:73,android:64}
	            isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	        }
	    }, {
	        key: 'handleTouchTap',
	        value: function handleTouchTap(e) {
	            var _this2 = this;

	            var modeData = {
	                set_selectModeValue: this.state.set_selectModeValue, //modex  index
	                set_orderTimeValue: this.state.set_orderTimeValue,
	                set_waterLevelValue: this.state.set_waterLevelValue,
	                set_processValue: this.state.set_processValue,
	                set_specialValue: this.state.set_specialValue
	            };
	            _Actions.Actions.startAction(modeData);

	            this.setState({
	                loadingShow: true
	            });
	            setTimeout(function () {
	                _this2.setState({
	                    loadingShow: false
	                });
	            }, 4000);

	            setTimeout(function () {
	                history.back();
	            }, 5000);
	        }
	    }, {
	        key: 'handleMode',
	        value: function handleMode(e) {
	            var index = parseInt(e.currentTarget.getAttribute('data-mode'));
	            console.log("mode:" + _washerConstData.washerModeS[index].name);
	            this.setState({
	                set_selectModeValue: index
	            });
	        }
	    }, {
	        key: 'handleOrderAction',
	        value: function handleOrderAction() {

	            this.setState({
	                selectshow: true,
	                selectIndex: 0
	            });
	        }
	    }, {
	        key: 'handleWaterLevelAction',
	        value: function handleWaterLevelAction() {

	            this.setState({
	                selectshow: true,
	                selectIndex: 1
	            });
	        }
	    }, {
	        key: 'handleProcessAction',
	        value: function handleProcessAction() {
	            console.log("handleProcessAction");
	            this.setState({
	                selectshow: true,
	                selectIndex: 2
	            });
	        }
	    }, {
	        key: 'handleSpecialAction',
	        value: function handleSpecialAction() {

	            this.setState({
	                selectshow: true,
	                selectIndex: 3
	            });
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            this.setState({
	                selectshow: false
	            });
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            //传入选择控件选中的小时数组和分钟数组


	            var tableCellIndex = parseInt(this.state.selectIndex);
	            console.log("index: " + tableCellIndex + " h: " + h + " m: " + m);
	            switch (tableCellIndex) {
	                case 0:
	                    this.state.set_orderTimeValue = h;orderSelect.defaulthour = h;break;
	                case 1:
	                    this.state.set_waterLevelValue = h;waterLevel.defaulthour = h;break;
	                case 2:
	                    {
	                        this.state.set_processValue = h;
	                        processArray.defaulthour = h;
	                        specialArray.defaulthour = '无';
	                        this.state.set_specialValue = '无';
	                        specialArray.hourarray = generatorSpecialFunction(this.state.set_processValue);
	                        break;
	                    }
	                case 3:
	                    {
	                        this.state.set_specialValue = h;specialArray.defaulthour = h;
	                        if (h == '洁桶') {
	                            this.state.set_processValue = _washerConstData.processDataArray[0];
	                        }
	                        break;
	                    }
	                default:
	                    break;
	            }

	            this.setState({
	                selectshow: false
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // 获取正在工作的模式
	            if (this.state.isFirstInputThisPage != undefined && this.state.isFirstInputThisPage) {
	                this.state.set_selectModeValue = this.state.get_selectModeValue || modeDefaultValue;
	                this.state.set_orderTimeValue = this.state.get_orderTimeValue || orderDefaultValue;
	                this.state.set_waterLevelValue = this.state.get_waterLevelValue || waterDefaultValue;
	                this.state.set_processValue = this.state.get_processValue || processDefaultValue;
	                this.state.set_specialValue = this.state.get_specialValue || specialDefaultValue;

	                orderSelect.defaulthour = this.state.get_orderTimeValue || orderDefaultValue;
	                waterLevel.defaulthour = this.state.get_waterLevelValue || waterDefaultValue;
	                processArray.defaulthour = this.state.get_processValue || processDefaultValue;
	                specialArray.defaulthour = this.state.get_specialValue || specialDefaultValue;

	                _Actions.Actions.setFirstInputSetingPage(false);
	            }

	            var selectModeIndex = this.state.set_selectModeValue;
	            var selectshow = this.state.selectshow;
	            var loadingShow = this.state.loadingShow;
	            var selectIndex = this.state.selectIndex;
	            var selectMode = [orderSelect, waterLevel, processArray, specialArray][selectIndex];

	            var navigation = isIOS ? ' ios' : ' android';

	            var orderTime = this.state.set_orderTimeValue + '小时';
	            var orderTableCellClassName = 'flex set';

	            var waterlevel = this.state.set_waterLevelValue;
	            var waterlevelTableCellClassName = 'flex set';

	            var process = this.state.set_processValue;
	            var processTableCellClassName = 'flex set';

	            var specialFunction = this.state.set_specialValue;
	            var specialTableCellClassName = 'flex set ';

	            console.log("orderTimeIndex: " + this.state.set_orderTimeValue);
	            console.log("set_waterLevelIndex: " + this.state.set_waterLevelValue);
	            console.log("set_processIndex: " + this.state.set_processValue);
	            console.log("set_specialIndex: " + this.state.set_specialValue);

	            var stateData = this.state;
	            console.log('washhistory state: ' + JSON.stringify(stateData));

	            return React.createElement(
	                'div',
	                { className: 'washerSetingPage' },
	                React.createElement('div', { className: navigation }),
	                React.createElement(
	                    'dl',
	                    { className: 'flex mode-items' },
	                    _washerConstData.washerModeS.map(function (o) {
	                        var isOn = o.id === selectModeIndex;
	                        var typeImage = isOn ? '-on.png)' : '-off.png)';
	                        return React.createElement(
	                            'dd',
	                            { style: { 'backgroundImage': 'url(../static/image/mode/m-' + o.id + typeImage },
	                                className: 'mode' + (o.id == selectModeIndex ? ' on' : ''),
	                                key: o.id,
	                                'data-mode': o.id,
	                                onTouchStart: this.handleMode.bind(this) },
	                            o.name
	                        );
	                    }.bind(this))
	                ),
	                React.createElement(
	                    'dl',
	                    { className: orderTableCellClassName, onTouchStart: this.handleOrderAction.bind(this) },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u9884\u7EA6'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            orderTime
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: waterlevelTableCellClassName, onTouchStart: this.handleWaterLevelAction.bind(this) },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u6C34\u4F4D'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            waterlevel
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: processTableCellClassName, onTouchStart: this.handleProcessAction.bind(this) },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u8FC7\u7A0B'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            process
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: specialTableCellClassName, onTouchStart: this.handleSpecialAction.bind(this) },
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tal' },
	                        '\u7279\u6B8A\u529F\u80FD'
	                    ),
	                    React.createElement(
	                        'dd',
	                        { className: 'flex-cell tar' },
	                        React.createElement(
	                            'span',
	                            null,
	                            specialFunction
	                        ),
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    'h2',
	                    { className: 'toggle-mode', onTouchStart: this.handleTouchTap.bind(this) },
	                    '\u542F\u52A8'
	                ),
	                React.createElement(_TimeSelect.TimeSelect, {

	                    needUpdateArray: selectIndex == 3,
	                    show: selectshow,
	                    title: selectMode.selecttitle,
	                    statusshow: selectMode.statusshow,

	                    hourshow: selectMode.hourshow,
	                    hourstep: selectMode.hourstep,
	                    hourunit: selectMode.hourunit,
	                    minhour: selectMode.minhour,
	                    maxhour: selectMode.maxhour,

	                    minuteshow: selectMode.minuteshow,
	                    minutestep: selectMode.minutestep,
	                    minuteunit: selectMode.minuteunit,
	                    minminute: selectMode.minminute,
	                    maxmin: selectMode.maxmin,

	                    defaulthour: selectMode.defaulthour,
	                    defaultminute: selectMode.defaultminute,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    hourarray: selectMode.hourarray,
	                    ArrayInit: selectMode.ArrayInit
	                }),
	                React.createElement(_Loading.Loading, { show: loadingShow })
	            );
	        }
	    }]);

	    return Seting;
	}(_BaseComponentClass.BaseComponent);

	;

	function generatorSpecialFunction(processIndex) {

	    var specialDataResultArray = ['无', '夜间', '洁桶'];
	    if (processIndex == 0 || processIndex == 1 || processIndex == 4) {
	        specialDataResultArray.push('留水');
	    }

	    if (processIndex == 0 || processIndex == 1 || processIndex == 4 || processIndex == 5) {
	        specialDataResultArray.push('风干90分钟');
	    }

	    return specialDataResultArray;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

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
	 * @prop {number} defaulthour 默认选中的不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!
	 * @prop {number} minhour 可选的最小小时(默认值为0)
	 * @prop {array} hourarr 可选的小时数组(默认无,通过最大最小小时及小时间隔计算得到,
	 * @prop {boolean} ArrayInit 是否更新可选数组
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
				timeDisplay: false,
				resetTimer: null
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || 60;
			var minhour = parseInt(next.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarray && next.hourarray instanceof Array) {
				hourarr = next.hourarray;
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
			if (next.defaulthour !== undefined) {
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: next.defaulthour,
						hourindex: index
					});
				}
			}
			var maxminute = 45;
			var minminute = 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
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
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.ArrayInit === true || next.needUpdateArray == true) {
				this.timearrInit(next);
			}

			//设置默认小时
			if (next.defaulthour !== undefined && this.props.show !== undefined) {
				if (this.props.show === false && next.show === true) {
					var hourarr = next.hourarray;
					var defaultHour = next.defaulthour;
					var index = hourarr.indexOf(defaultHour);
					if (index != -1) {
						this.setState({
							hourtime: next.defaulthour,
							hourindex: index
						});
					}
				}
			}

			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity += 1;
						if (showOpacity >= 1) {
							clearInterval(this.timr);
							this.setState({ showOpacity: showOpacity });
						}
					}.bind(this), 10);
				} else if (next.show == false) {
					clearInterval(this.timr);
					this.timr = setInterval(function () {
						showOpacity -= 1;
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
			var value = (yvalue - oldy) / 1.72; //获取滑动距离，px为单位，但是要转换为百分比，所以除以1.72当范围大于20的时候，算作一格，负数一样
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
				var hourValue = this.state.hourarr[0];
				var minuteValue = this.state.minutearr[0];
				var me = this;
				me.setState({
					hourtime: hourValue,
					minutetime: minuteValue,
					hourindex: 0,
					minuteindex: 0
				});
				/*//不让用户看到重置的过程，呵呵哒
	   this.state.resetTimer && clearTimeout(this.state.resetTimer);
	   this.state.resetTimer = setTimeout(()=>{
	   	me.setState({
	   		hourindex:0,
	   		minuteindex:0
	   	});
	   	console.log('10000');
	   },2000);*/
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		render: function render() {
			var _React$createElement;

			var show = this.props.show || false;
			var maxhour = parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(this.props.minhour) || 0;
			var hourshow = typeof this.props.hourshow !== 'undefined' && Boolean(this.props.hourshow) === false ? false : true;
			var minuteshow = typeof this.props.minuteshow !== 'undefined' && Boolean(this.props.minuteshow) === false ? false : true;
			if (!hourshow && !minuteshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var selecttitle = this.props.title || '设置时间';
			var statusshow = this.props.statusshow || false;
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
			var hourunit = this.props.hourunit || '';
			var minuteunit = this.props.minuteunit || '';
			minuteindex = hourindex == 14 ? 0 : minuteindex;

			var hourseAppendStyle = { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? 'block' : 'none' };
			if (!statusshow && !minuteshow) {
				hourseAppendStyle = { top: minutetop + '%', display: hourshow ? 'block' : 'none', left: hourshow ? 20 + '%' : 45 + '%',
					width: '60%' };
			}
			//visibility:this.state.timeDisplay?"initial":"hidden" visibility这个属性在华为某些机型下居然hidden不掉...，呵呵哒
			return React.createElement(
				'section',
				(_React$createElement = { ref: 'selecter', style: { display: this.state.timeDisplay ? 'block' : 'none', opacity: this.state.showOpacity } }, _defineProperty(_React$createElement, 'ref', 'timeSelect'), _defineProperty(_React$createElement, 'className', 'timeSelect'), _React$createElement),
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
							React.createElement(
								'span',
								{ style: { left: 4 + '%' }, className: statusshow ? 'status show' : 'status' },
								'洗衣机将在'
							),
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 56 + '%', display: hourshow ? 'inline-block' : 'none' } },
								hourunit
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								minuteunit
							),
							React.createElement(
								'span',
								{ className: statusshow ? 'status show' : 'status' },
								'后启动' || statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: hourseAppendStyle },
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
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? 'block' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
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
	/**
	 * 菊花
	 * @prop {boolean} show  是否显示loading动画
	 * @prop {string}  info  显示文案信息，可选
	 * @author   tomy
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Loading = exports.Loading = React.createClass({
		displayName: 'Loading',

		getInitialState: function getInitialState() {
			return {
				show: false,
				info: '请耐心等待，正在联动设备...'
			};
		},
		render: function render() {
			var show = this.props.show;
			var showOpacity = show ? 1 : 0;
			var showInfo = this.props.info || this.state.info;
			return React.createElement(
				'section',
				{ ref: 'loading', className: 'loading', style: { visibility: show ? "initial" : "hidden", opacity: showOpacity } },
				React.createElement('figure', null),
				React.createElement(
					'figure',
					{ className: 'loading-flower' },
					React.createElement(
						'span',
						null,
						showInfo
					)
				)
			);
		}
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Working = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _Store = __webpack_require__(5);

	var _Actions = __webpack_require__(4);

	var _Wave = __webpack_require__(46);

	var _WorkingLoadingAnimation = __webpack_require__(47);

	var _washerConstData = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 2016/12/28.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var isIOS = false;
	var controlPanel = [{ id: 0, name: '童锁' }, { id: 1, name: '暂停' }, { id: 2, name: '模式' }, { id: 3, name: '关机' }];

	var Working = exports.Working = function (_BaseComponent) {
	    _inherits(Working, _BaseComponent);

	    function Working(props) {
	        _classCallCheck(this, Working);

	        var _this = _possibleConstructorReturn(this, (Working.__proto__ || Object.getPrototypeOf(Working)).call(this, props));

	        _this.state = {
	            isToMain: false
	        };
	        return _this;
	    }

	    _createClass(Working, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            //导航栏:{ios:73,android:64}
	            isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	        }
	    }, {
	        key: 'generatorPorcessArray',
	        value: function generatorPorcessArray() {

	            var operate = this.props.operate;
	            var set_orderTimeIndex = operate.get_orderTimeValue || 0;
	            var processData = operate.get_processValue || '洗涤+漂洗+脱水';
	            var workModeIndex = operate.WorkStep || 0; // 这个正在工作的模式 1- 7 为工作


	            // let userSetWasherMode = operate.get_selectModeValue || 0;
	            // let washConfigData =  washerModeS[userSetWasherMode];
	            var workModeArray = ["参数设置阶段", "预约", "称重", "浸泡", "洗涤", "漂洗", "脱水", "风干", "洗涤结束"];
	            var currentWorkName = workModeArray[workModeIndex];

	            var processWorkArray = []; // 工作数组，用来产生动画页面

	            console.log("TimeIndex: " + set_orderTimeIndex + " processData" + processData + " workModeIndex: " + workModeIndex);
	            var leftTime = 0;
	            switch (workModeIndex) {
	                case 1:
	                    leftTime = operate.CurOrderSurplusTime || 0;break;
	                case 3:
	                    leftTime = operate.CurSoakSurplusTime || 0;break;
	                case 4:
	                    leftTime = operate.CurWashSurplusTime || 0;break;
	                case 5:
	                    leftTime = operate.CurRinseSurplusTime || 0;break;
	                case 6:
	                    leftTime = operate.CurDehydrationSurplusTime || 0;break;
	                case 7:
	                    leftTime = operate.CurAirDrySurplusTime || 0;break;
	                default:
	                    leftTime = 1;
	                    break;
	            }

	            var processArray = processData.split("+");
	            if (set_orderTimeIndex != 0) {
	                processArray.splice(0, 0, "预约");
	            }
	            for (var i = 0; i < processArray.length; i++) {
	                var modeData = {
	                    isLine: false,
	                    name: processArray[i],
	                    id: i,
	                    isWorkingProcess: currentWorkName == processArray[i],
	                    leftTime: leftTime
	                };
	                var lineModeData = {
	                    isLine: true,
	                    name: '0',
	                    id: i,
	                    isWorkingProcess: '0'
	                };
	                if (i != 0) {
	                    processWorkArray.push(lineModeData);
	                }
	                processWorkArray.push(modeData);
	            }

	            console.log("processWorkArray done");
	            return processWorkArray;
	        }
	    }, {
	        key: 'touchModeAction',
	        value: function touchModeAction(e) {

	            var modeIndex = parseInt(e.currentTarget.getAttribute("data-mode"));

	            switch (modeIndex) {
	                case 0:
	                    if (typeof this.props.childLockAction === 'function') {
	                        this.props.childLockAction();
	                    }
	                    break;
	                case 1:
	                    if (typeof this.props.stopAction === 'function') {
	                        this.props.stopAction();
	                    }
	                    break;
	                case 2:
	                    if (typeof this.props.setingPageAction === 'function') {
	                        this.props.setingPageAction();
	                    }

	                    break;
	                case 3:
	                    if (typeof this.props.switchAction === 'function') {
	                        this.props.switchAction();
	                    }
	                    break;
	                default:
	                    break;
	            }
	        }
	    }, {
	        key: 'handleToSeting',
	        value: function handleToSeting() {
	            console.log('touchTap事件测试');
	            window.location.href = '#/seting';
	        }
	    }, {
	        key: 'handleToMainPage',
	        value: function handleToMainPage() {
	            // let isWorking = ( this.props.show ) ? ! this.props.show  : false ;
	            //  Actions.changeToWorkingPage(false);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //控制数据

	            var operate = this.props.operate;

	            console.log("operate: ");
	            var processWorkArray = this.generatorPorcessArray(); //洗涤+漂洗+脱水
	            // let processWorkArray = ["洗涤","漂洗","脱水"];
	            console.log("processArray:  " + processWorkArray);

	            var workClassName = this.props.show ? 'workingPage slide-up' : 'workingPage  slide-down';
	            var zIndex = this.props.show ? { 'zIndex': '3', 'display': 'block' } : { 'zIndex': '-1', 'display': 'block' };
	            var navigation = isIOS ? ' ios' : ' android';

	            var modeIndex = operate.get_selectModeValue || 0;
	            var workMode = _washerConstData.washerModeS[modeIndex];
	            var workModeSubMode = "(" + operate.get_specialValue + ")";

	            var stopLock = operate.washerIsStop || false; // true  为暂定工作
	            var childLock = operate.washerChildLock || false; // true 打开童锁
	            var switchLock = operate.washerSwitchLock || false; // true 打开的
	            var workModeIndex = operate.WorkStep || 0; // 这个正在工作的模式  //如果是预约模式，只有关机和童锁可以点击

	            var workStatus = '工作中';

	            if (stopLock) {
	                workStatus = '暂停中';
	            }

	            if (workModeIndex == 8) {
	                workStatus = '洗衣完成';
	            }

	            console.log("mode: " + workMode.name + " subMode: " + workModeSubMode + " stopLock：" + stopLock + " childlock: " + childLock + " workModeIndex:" + workModeIndex);

	            return _react2.default.createElement(
	                'div',
	                { className: workClassName, style: zIndex },
	                _react2.default.createElement('nav', { className: navigation }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'controlView flex' },
	                    controlPanel.map(function (o, index) {
	                        var path = '../static/image/work/m-' + o.id + '-off.png';
	                        if (o.id == 3) {
	                            path = '../static/image/work/m-' + o.id + '-off.png';
	                        } else if (o.id == 0) {
	                            //path = '../static/image/work/m-' + o.id + (childLock?'-on.png':'-off.png');
	                            path = '../static/image/work/m-' + o.id + '-off.png';
	                        } else if (o.id == 1) {
	                            path = '../static/image/work/m-' + o.id + (stopLock ? '-on.png' : '-off.png');
	                            // 正在预约，不能点击
	                            if (workModeIndex == 1) {
	                                path = '../static/image/work/m-1-on.png';
	                            }
	                        } else if (o.id == 2) {
	                            path = '../static/image/work/m-' + o.id + (stopLock ? '-off.png' : '-on.png');
	                            // 正在预约，不能点击
	                            if (workModeIndex == 1) {
	                                path = '../static/image/work/m-2-on.png';
	                            }
	                        }

	                        if (childLock) {
	                            path = '../static/image/work/m-' + o.id + '-on.png';
	                            if (o.id == 0) {
	                                path = '../static/image/work/m-' + o.id + '-off.png';
	                            }
	                        }

	                        return _react2.default.createElement(
	                            'dl',
	                            { className: 'flex-cell', key: index, name: o.id, 'data-mode': o.id, onTouchStart: this.touchModeAction.bind(this) },
	                            _react2.default.createElement(
	                                'dd',
	                                null,
	                                _react2.default.createElement('img', { src: path, width: '36', height: '36' })
	                            ),
	                            _react2.default.createElement(
	                                'dt',
	                                null,
	                                o.name
	                            )
	                        );
	                    }.bind(this))
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'workWaveDiv' },
	                    _react2.default.createElement(_Wave.Wave, { waveID: 'workingWave' })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'workStatus' },
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        workStatus
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'workDetailMode' },
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'workDetailModeSub1' },
	                        workMode.name
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'workDetailModeSub2' },
	                        workModeSubMode
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'WorkingLoadingStatusView ' },
	                    processWorkArray.map(function (mode, index) {
	                        //console.log("mode: "+mode.name + "  " + mode.id + " " +  + mode.isLine + " " + mode.isWorkingProcess);
	                        if (mode.isLine) {
	                            return _react2.default.createElement('div', { key: index, className: 'veriticalLine1', height: 15 - mode.id * 2 });
	                        } else {
	                            if (mode.isWorkingProcess) {
	                                return _react2.default.createElement(_WorkingLoadingAnimation.WorkingLoadingAnimation, { key: index, name: mode.name, leftTime: mode.leftTime });
	                            } else {
	                                return _react2.default.createElement(
	                                    'div',
	                                    { className: 'mode', key: index },
	                                    mode.name,
	                                    ' '
	                                );
	                            }
	                        }
	                    }.bind(this))
	                )
	            );
	        }
	    }]);

	    return Working;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(14);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	'use strict';

	var _assign = __webpack_require__(16);

	var ReactChildren = __webpack_require__(17);
	var ReactComponent = __webpack_require__(29);
	var ReactPureComponent = __webpack_require__(32);
	var ReactClass = __webpack_require__(33);
	var ReactDOMFactories = __webpack_require__(38);
	var ReactElement = __webpack_require__(21);
	var ReactPropTypes = __webpack_require__(43);
	var ReactVersion = __webpack_require__(44);

	var onlyChild = __webpack_require__(45);
	var warning = __webpack_require__(23);

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(39);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
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
			var test1 = new String('abc');  // eslint-disable-line
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
		} catch (e) {
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

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */

	'use strict';

	var PooledClass = __webpack_require__(18);
	var ReactElement = __webpack_require__(21);

	var emptyFunction = __webpack_require__(24);
	var traverseAllChildren = __webpack_require__(26);

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
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;

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
	  var result = bookKeeping.result;
	  var keyPrefix = bookKeeping.keyPrefix;
	  var func = bookKeeping.func;
	  var context = bookKeeping.context;


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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(19);

	var invariant = __webpack_require__(20);

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

	var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
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
	  fourArgumentPooler: fourArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule reactProdInvariant
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
/* 20 */
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

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var _assign = __webpack_require__(16);

	var ReactCurrentOwner = __webpack_require__(22);

	var warning = __webpack_require__(23);
	var canDefineProperty = __webpack_require__(25);
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	// The Symbol used to tag the ReactElement type. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

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
	    var shadowChildren = Array.isArray(props.children) ? props.children.slice(0) : props.children;

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
	      Object.defineProperty(element, '_shadowChildren', {
	        configurable: false,
	        enumerable: false,
	        writable: false,
	        value: shadowChildren
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
	      element._shadowChildren = shadowChildren;
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

	ReactElement.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;

	module.exports = ReactElement;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
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
/* 23 */
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

	var emptyFunction = __webpack_require__(24);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 24 */
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
	 * @providesModule canDefineProperty
	 */

	'use strict';

	var canDefineProperty = false;
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    Object.defineProperty({}, 'x', { get: function () {} });
	    canDefineProperty = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	module.exports = canDefineProperty;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

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
	 * @providesModule traverseAllChildren
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(19);

	var ReactCurrentOwner = __webpack_require__(22);
	var ReactElement = __webpack_require__(21);

	var getIteratorFn = __webpack_require__(27);
	var invariant = __webpack_require__(20);
	var KeyEscapeUtils = __webpack_require__(28);
	var warning = __webpack_require__(23);

	var SEPARATOR = '.';
	var SUBSEPARATOR = ':';

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

	  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

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
	 * @providesModule getIteratorFn
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
/* 28 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule KeyEscapeUtils
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(19);

	var ReactNoopUpdateQueue = __webpack_require__(30);

	var canDefineProperty = __webpack_require__(25);
	var emptyObject = __webpack_require__(31);
	var invariant = __webpack_require__(20);
	var warning = __webpack_require__(23);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNoopUpdateQueue
	 */

	'use strict';

	var warning = __webpack_require__(23);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 31 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPureComponent
	 */

	'use strict';

	var _assign = __webpack_require__(16);

	var ReactComponent = __webpack_require__(29);
	var ReactNoopUpdateQueue = __webpack_require__(30);

	var emptyObject = __webpack_require__(31);

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
	 * @providesModule ReactClass
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(19),
	    _assign = __webpack_require__(16);

	var ReactComponent = __webpack_require__(29);
	var ReactElement = __webpack_require__(21);
	var ReactPropTypeLocations = __webpack_require__(34);
	var ReactPropTypeLocationNames = __webpack_require__(36);
	var ReactNoopUpdateQueue = __webpack_require__(30);

	var emptyObject = __webpack_require__(31);
	var invariant = __webpack_require__(20);
	var keyMirror = __webpack_require__(35);
	var keyOf = __webpack_require__(37);
	var warning = __webpack_require__(23);

	var MIXINS_KEY = keyOf({ mixins: null });

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});

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
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,

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
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

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
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

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
	  render: SpecPolicy.DEFINE_ONCE,

	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

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
	  componentDidMount: SpecPolicy.DEFINE_MANY,

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
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

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
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

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
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

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
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

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
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,

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
	  updateComponent: SpecPolicy.OVERRIDE_BASE

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
	      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
	    }
	    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
	  },
	  contextTypes: function (Constructor, contextTypes) {
	    if (process.env.NODE_ENV !== 'production') {
	      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
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
	      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
	    }
	    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
	  },
	  statics: function (Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  },
	  autobind: function () {} };

	// noop
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
	    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (isAlreadyDefined) {
	    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
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
	          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
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
	    var Constructor = function (props, context, updater) {
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
	    };
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

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
	 * @providesModule ReactPropTypeLocations
	 */

	'use strict';

	var keyMirror = __webpack_require__(35);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(20);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function keyMirror(obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

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
	 * @providesModule ReactPropTypeLocationNames
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 37 */
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
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function keyOf(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMFactories
	 */

	'use strict';

	var ReactElement = __webpack_require__(21);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @private
	 */
	var createDOMFactory = ReactElement.createFactory;
	if (process.env.NODE_ENV !== 'production') {
	  var ReactElementValidator = __webpack_require__(39);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(22);
	var ReactComponentTreeHook = __webpack_require__(40);
	var ReactElement = __webpack_require__(21);
	var ReactPropTypeLocations = __webpack_require__(34);

	var checkReactTypeSpec = __webpack_require__(41);

	var canDefineProperty = __webpack_require__(25);
	var getIteratorFn = __webpack_require__(27);
	var warning = __webpack_require__(23);

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
	    checkReactTypeSpec(componentClass.propTypes, element.props, ReactPropTypeLocations.prop, name, element, null);
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
	      process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2016-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentTreeHook
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(19);

	var ReactCurrentOwner = __webpack_require__(22);

	var invariant = __webpack_require__(20);
	var warning = __webpack_require__(23);

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

	var itemMap;
	var rootIDSet;

	var itemByKey;
	var rootByKey;

	if (canUseCollections) {
	  itemMap = new Map();
	  rootIDSet = new Set();
	} else {
	  itemByKey = {};
	  rootByKey = {};
	}

	var unmountedIDs = [];

	// Use non-numeric keys to prevent V8 performance issues:
	// https://github.com/facebook/react/pull/7232
	function getKeyFromID(id) {
	  return '.' + id;
	}
	function getIDFromKey(key) {
	  return parseInt(key.substr(1), 10);
	}

	function get(id) {
	  if (canUseCollections) {
	    return itemMap.get(id);
	  } else {
	    var key = getKeyFromID(id);
	    return itemByKey[key];
	  }
	}

	function remove(id) {
	  if (canUseCollections) {
	    itemMap['delete'](id);
	  } else {
	    var key = getKeyFromID(id);
	    delete itemByKey[key];
	  }
	}

	function create(id, element, parentID) {
	  var item = {
	    element: element,
	    parentID: parentID,
	    text: null,
	    childIDs: [],
	    isMounted: false,
	    updateCount: 0
	  };

	  if (canUseCollections) {
	    itemMap.set(id, item);
	  } else {
	    var key = getKeyFromID(id);
	    itemByKey[key] = item;
	  }
	}

	function addRoot(id) {
	  if (canUseCollections) {
	    rootIDSet.add(id);
	  } else {
	    var key = getKeyFromID(id);
	    rootByKey[key] = true;
	  }
	}

	function removeRoot(id) {
	  if (canUseCollections) {
	    rootIDSet['delete'](id);
	  } else {
	    var key = getKeyFromID(id);
	    delete rootByKey[key];
	  }
	}

	function getRegisteredIDs() {
	  if (canUseCollections) {
	    return Array.from(itemMap.keys());
	  } else {
	    return Object.keys(itemByKey).map(getIDFromKey);
	  }
	}

	function getRootIDs() {
	  if (canUseCollections) {
	    return Array.from(rootIDSet.keys());
	  } else {
	    return Object.keys(rootByKey).map(getIDFromKey);
	  }
	}

	function purgeDeep(id) {
	  var item = get(id);
	  if (item) {
	    var childIDs = item.childIDs;

	    remove(id);
	    childIDs.forEach(purgeDeep);
	  }
	}

	function describeComponentFrame(name, source, ownerName) {
	  return '\n    in ' + name + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
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
	    var item = get(id);
	    item.childIDs = nextChildIDs;

	    for (var i = 0; i < nextChildIDs.length; i++) {
	      var nextChildID = nextChildIDs[i];
	      var nextChild = get(nextChildID);
	      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
	      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
	      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
	      if (nextChild.parentID == null) {
	        nextChild.parentID = id;
	        // TODO: This shouldn't be necessary but mounting a new root during in
	        // componentWillMount currently causes not-yet-mounted components to
	        // be purged from our tree data so their parent ID is missing.
	      }
	      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
	    }
	  },
	  onBeforeMountComponent: function (id, element, parentID) {
	    create(id, element, parentID);
	  },
	  onBeforeUpdateComponent: function (id, element) {
	    var item = get(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.element = element;
	  },
	  onMountComponent: function (id) {
	    var item = get(id);
	    item.isMounted = true;
	    var isRoot = item.parentID === 0;
	    if (isRoot) {
	      addRoot(id);
	    }
	  },
	  onUpdateComponent: function (id) {
	    var item = get(id);
	    if (!item || !item.isMounted) {
	      // We may end up here as a result of setState() in componentWillUnmount().
	      // In this case, ignore the element.
	      return;
	    }
	    item.updateCount++;
	  },
	  onUnmountComponent: function (id) {
	    var item = get(id);
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
	    var item = get(id);
	    return item ? item.isMounted : false;
	  },
	  getCurrentStackAddendum: function (topElement) {
	    var info = '';
	    if (topElement) {
	      var type = topElement.type;
	      var name = typeof type === 'function' ? type.displayName || type.name : type;
	      var owner = topElement._owner;
	      info += describeComponentFrame(name || 'Unknown', topElement._source, owner && owner.getName());
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
	    var item = get(id);
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
	    var item = get(id);
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
	    var item = get(id);
	    return item ? item.parentID : null;
	  },
	  getSource: function (id) {
	    var item = get(id);
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
	    var item = get(id);
	    return item ? item.updateCount : 0;
	  },


	  getRegisteredIDs: getRegisteredIDs,

	  getRootIDs: getRootIDs
	};

	module.exports = ReactComponentTreeHook;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

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
	 * @providesModule checkReactTypeSpec
	 */

	'use strict';

	var _prodInvariant = __webpack_require__(19);

	var ReactPropTypeLocationNames = __webpack_require__(36);
	var ReactPropTypesSecret = __webpack_require__(42);

	var invariant = __webpack_require__(20);
	var warning = __webpack_require__(23);

	var ReactComponentTreeHook;

	if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
	  // Temporary hack.
	  // Inline requires don't work well with Jest:
	  // https://github.com/facebook/react/issues/7240
	  // Remove the inline requires when we don't need them anymore:
	  // https://github.com/facebook/react/pull/7178
	  ReactComponentTreeHook = __webpack_require__(40);
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
	            ReactComponentTreeHook = __webpack_require__(40);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypesSecret
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	var ReactElement = __webpack_require__(21);
	var ReactPropTypeLocationNames = __webpack_require__(36);
	var ReactPropTypesSecret = __webpack_require__(42);

	var emptyFunction = __webpack_require__(24);
	var getIteratorFn = __webpack_require__(27);
	var warning = __webpack_require__(23);

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
	          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in the next major version. You may be ' + 'seeing this warning due to a third-party PropTypes library. ' + 'See https://fb.me/react-warning-dont-call-proptypes for details.', propFullName, componentName) : void 0;
	          manualPropTypeCallCache[cacheKey] = true;
	        }
	      }
	    }
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new PropTypeError('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactVersion
	 */

	'use strict';

	module.exports = '15.3.2';

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';

	var _prodInvariant = __webpack_require__(19);

	var ReactElement = __webpack_require__(21);

	var invariant = __webpack_require__(20);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Wave = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 2017/1/3.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var yy_wave_num = 2;
	var yy_wave_width = 360;
	var height = 60;

	var Wave = exports.Wave = function (_Component) {
	    _inherits(Wave, _Component);

	    function Wave(props) {
	        _classCallCheck(this, Wave);

	        var _this2 = _possibleConstructorReturn(this, (Wave.__proto__ || Object.getPrototypeOf(Wave)).call(this, props));

	        _this2.state = {

	            yy_start_point: [-180, -180, -190],
	            yy_seeds: [1.0, 0.6, 0.5],
	            yy_wave_phase: [35, 35, 15],
	            yy_wave_color: ['rgba(42,204,250,0.2)', 'rgba(42,204,250,0.4)', 'rgba(42,204,250,1)'],
	            yy_wave_centers: [35, 28, 10],
	            yy_wave_directions: [true, true, true], // true up , false down
	            yy_wave_dangerous_point: [0, 0, -10]

	        };
	        return _this2;
	    }

	    _createClass(Wave, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var waveID = this.props.waveID || 'wave';
	            var drawing = document.querySelector('#' + waveID);
	            drawing.width = window.screen.width;
	            yy_wave_width = window.screen.width;
	            var context = drawing.getContext('2d');

	            this.setState({
	                drawing: drawing,
	                context: context
	            });

	            var _this = this;

	            setInterval(function () {

	                _this.yyDrawWave();
	            }, 1000 / 60);
	        }
	    }, {
	        key: 'yyDrawWave',
	        value: function yyDrawWave() {

	            var start_point = this.state.yy_start_point;
	            var seeds = this.state.yy_seeds;
	            var phases = this.state.yy_wave_phase;
	            var colors = this.state.yy_wave_color;
	            var directions = this.state.yy_wave_directions;
	            var dangerous_point = this.state.yy_wave_dangerous_point;
	            var centers = this.state.yy_wave_centers;
	            var drawing = this.state.drawing;
	            var context = this.state.context;
	            context.clearRect(0, 0, drawing.width, drawing.height);

	            for (var index = 0; index < 3; index++) {
	                if (start_point[index] >= dangerous_point[index]) {
	                    start_point[index] = -yy_wave_width;
	                }
	                start_point[index] += seeds[index];
	                this.yyDrawBezierCurveLine(start_point[index], centers[index], phases[index], colors[index], directions[index]);
	            }
	        }
	    }, {
	        key: 'yyDrawBezierCurveLine',
	        value: function yyDrawBezierCurveLine(spx, centerY, hn, color, direction) {

	            var drawing = this.state.drawing;
	            var context = this.state.context;
	            var width = yy_wave_width / yy_wave_num;
	            context.strokeStyle = color;
	            context.fillStyle = color;
	            context.save();
	            context.beginPath();
	            context.moveTo(spx, centerY);

	            var controlP1 = 0;
	            var endP1 = 0;
	            for (var i = 0; i < yy_wave_num; i++) {
	                controlP1 = spx + width + yy_wave_width * i;
	                endP1 = spx + yy_wave_width * (i + 1);
	                var centerY1 = centerY - hn;
	                var centerY2 = centerY + hn;
	                context.bezierCurveTo(controlP1, centerY1, controlP1, centerY2, endP1, centerY);
	            }
	            if (direction) {
	                context.lineTo(endP1, 0);
	                context.lineTo(0, 0);
	            } else {
	                context.lineTo(endP1, height);
	                context.lineTo(0, height);
	            }

	            context.closePath();
	            context.stroke();
	            context.fill();
	            context.restore();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var width = yy_wave_width;
	            var waveID = this.props.waveID || 'wave';
	            return _react2.default.createElement(
	                'div',
	                { className: 'wave_animation' },
	                _react2.default.createElement('canvas', { id: waveID, width: width, height: '60' })
	            );
	        }
	    }]);

	    return Wave;
	}(_react.Component);

	;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WorkingLoadingAnimation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 2017/1/6.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var WorkingLoadingAnimation = exports.WorkingLoadingAnimation = function (_React$Component) {
	    _inherits(WorkingLoadingAnimation, _React$Component);

	    function WorkingLoadingAnimation(props) {
	        _classCallCheck(this, WorkingLoadingAnimation);

	        return _possibleConstructorReturn(this, (WorkingLoadingAnimation.__proto__ || Object.getPrototypeOf(WorkingLoadingAnimation)).call(this, props));
	    }

	    _createClass(WorkingLoadingAnimation, [{
	        key: 'render',
	        value: function render() {

	            var workName = this.props.name;
	            var leftTimeALLMinte = this.props.leftTime || '90';
	            var leftTimeHour = parseInt(parseInt(leftTimeALLMinte) / 60);
	            if (leftTimeHour < 10) {
	                leftTimeHour = "0" + String(leftTimeHour);
	            }
	            var leftTimeMinte = parseInt(leftTimeALLMinte) % 60;
	            if (leftTimeMinte < 10) {
	                leftTimeMinte = "0" + String(leftTimeMinte);
	            }
	            var leftTime = leftTimeHour + ':' + leftTimeMinte;
	            var leftAlertTile = '剩余时间';
	            var width = window.screen.width * 0.285;

	            return _react2.default.createElement(
	                'div',
	                { className: 'WorkingLoading flex' },
	                _react2.default.createElement('img', { src: '../static/image/work/workingQuanquan.png' }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'workName' },
	                    workName
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'leftTime' },
	                    leftTime
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'leftalert' },
	                    leftAlertTile
	                )
	            );
	        }
	    }]);

	    return WorkingLoadingAnimation;
	}(_react2.default.Component);

	;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CircleAnimation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 2016/12/30.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var CircleAnimation = exports.CircleAnimation = function (_React$Component) {
	    _inherits(CircleAnimation, _React$Component);

	    function CircleAnimation(props) {
	        _classCallCheck(this, CircleAnimation);

	        return _possibleConstructorReturn(this, (CircleAnimation.__proto__ || Object.getPrototypeOf(CircleAnimation)).call(this, props));
	    }

	    _createClass(CircleAnimation, [{
	        key: "render",
	        value: function render() {
	            return _react2.default.createElement(
	                "div",
	                { className: "circleAnimation" },
	                _react2.default.createElement("img", { src: "../static/image/ic-dot.png", style: { width: 100, height: 100 } }),
	                "hello"
	            );
	        }
	    }]);

	    return CircleAnimation;
	}(_react2.default.Component);

	;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WashHistory = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _BaseComponentClass = __webpack_require__(2);

	var _Loading = __webpack_require__(11);

	var _washerConstData = __webpack_require__(6);

	var _fun = __webpack_require__(50);

	var _DeviceTokenCache = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 2017/2/17.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;


	var myScroll,
	    pullDownEl,
	    pullDownOffset,
	    pullUpEl,
	    pullUpOffset,
	    generatedCount = 0;

	var hasNextPage = false;
	var isRequest = false;

	var pageIndex = 0;
	var powerTotal = 0; // 总耗电量
	var waterConsumeTotal = 0; //总好水量


	// {
	//     "waterTemp" : 0,
	//     "washId" : 64,
	//     "power" : 0,
	//     "startTime" : "2017-02-09 12:43:04",
	//     "mode" : 5,
	//     "waterConsume" : 0,
	//     "useTime" : 34
	// }

	var hasRequest = false;
	var isIOS = true;

	var WashHistory = exports.WashHistory = function (_BaseComponent) {
	    _inherits(WashHistory, _BaseComponent);

	    function WashHistory(props) {
	        _classCallCheck(this, WashHistory);

	        //this.listenStore(Store); // 监听Store
	        var _this = _possibleConstructorReturn(this, (WashHistory.__proto__ || Object.getPrototypeOf(WashHistory)).call(this, props));

	        _this.state = {
	            dataArray: []
	        };
	        console.log(" his constructor");
	        return _this;
	    }

	    _createClass(WashHistory, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            het.setTitle(JSON.stringify({
	                setNavTitle: 1,
	                title: '洗涤记录',
	                setNavRightBtnHiden: 1
	            }));

	            //导航栏:{ios:73,android:64}
	            isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);

	            console.log('componentWillMount');
	            pageIndex = 0;
	            hasRequest = false; // 这个用来判断 render 的第一次请求
	            isRequest = false; // 这个用来记录是否正在请求
	            this.setState({
	                dataArray: []
	            });
	            powerTotal = 0; // 总耗电量
	            waterConsumeTotal = 0; //总好水量
	        }
	    }, {
	        key: 'getWashHistoryData',
	        value: function getWashHistoryData(doneAction) {
	            //let getUrl = 'http://200.200.200.50/v1/app/customization/fridge/hetFridge/power?appId='+this.state.appId+'&accessToken='+this.state.accessToken+'&deviceId='+this.state.deviceId+'&timestamp='+new Date().getTime();
	            if (isRequest) {

	                if (typeof doneAction === "function") {
	                    doneAction(null, null);
	                }
	                return;
	            }

	            console.log("getWashHistoryData");
	            pageIndex++;
	            this.setState({
	                pageIndex: pageIndex
	            });

	            var requestInfo = (0, _DeviceTokenCache.getDeviceInfo)();
	            var url = '/v1/app/customization/mavell/getWashingList';
	            var data = {
	                "accessToken": requestInfo.userToken,
	                "deviceId": requestInfo.deviceId,
	                "pageIndex": pageIndex,
	                "pageRows": '20'
	            };

	            var successcallback = function successcallback(data) {
	                var dataString = data.toString();

	                var jsondata = JSON.parse(dataString);
	                jsondata = jsondata['data'];

	                var marvellWashNaviPage = jsondata['marvellWashNaviPage'];
	                var list = marvellWashNaviPage['list'] || [];

	                powerTotal = jsondata['powerTotal'] || 0;
	                waterConsumeTotal = jsondata['waterConsumeTotal'] || 0;
	                var pageInfo = marvellWashNaviPage['pager'] || { "hasNextPage": true };
	                hasNextPage = pageInfo['hasNextPage'] || false;
	                isRequest = false;
	                if (typeof doneAction === "function") {
	                    doneAction(list, null);
	                }
	            };
	            var failedcallback = function failedcallback(error) {
	                console.log("请求失败" + error.toString());
	                isRequest = false;

	                if (typeof doneAction === "function") {
	                    doneAction(null, error);
	                }
	            };

	            isRequest = true;
	            het.get(url, data, successcallback, failedcallback, false);
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.loaded();
	        }
	    }, {
	        key: 'pullDownAction',
	        value: function pullDownAction() {
	            var that = this;
	            pageIndex = 0;

	            console.log('get request hahahaah');
	            this.getWashHistoryData(function (data, error) {
	                if (error) {
	                    het.toast('请求失败！');
	                } else if (data) {
	                    console.log('i receive data' + data.toString());
	                    that.setState({
	                        dataArray: data
	                    });
	                }
	                myScroll.refresh();
	            });

	            // setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
	            //     let dataArray = that.state.dataArray;
	            //     console.log("pullDownAction");
	            //     let length = dataArray.length;
	            //     dataArray.push(length);
	            //     that.setState({
	            //         dataArray : dataArray
	            //     });
	            //     myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
	            // }, 2000);	// <-- Simulate network congestion, remove setTimeout from production!
	        }
	    }, {
	        key: 'pullUpAction',
	        value: function pullUpAction() {
	            var that = this;

	            console.log('get up request hahahaah');
	            this.getWashHistoryData(function (data, error) {
	                if (error) {
	                    het.toast('请求失败！');
	                    console.log('receive error');
	                } else if (data) {

	                    var dataArray = that.state.dataArray;

	                    var newDataArray = dataArray.concat(data);

	                    that.setState({
	                        dataArray: newDataArray
	                    });
	                }
	                myScroll.refresh();
	            });

	            // setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
	            //     let dataArray = that.state.dataArray;
	            //     console.log("pullUpAction");
	            //     let length = dataArray.length;
	            //     dataArray.push(length);
	            //     that.setState({
	            //         dataArray : dataArray
	            //     });
	            //     myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
	            // }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
	        }
	    }, {
	        key: 'loaded',
	        value: function loaded() {

	            pullDownEl = document.getElementById('pullDown');
	            pullDownOffset = pullDownEl.offsetHeight;
	            pullUpEl = document.getElementById('pullUp');
	            pullUpOffset = pullUpEl.offsetHeight;

	            this.pullDownAction = this.pullDownAction.bind(this);
	            var self = this;
	            myScroll = new iScroll('wrapper', {

	                useTransition: false, /* 此属性不知用意，本人从true改为false */
	                topOffset: pullDownOffset,
	                onRefresh: function onRefresh() {
	                    if (pullDownEl.className.match('loadingProcess')) {
	                        pullDownEl.className = '';
	                        // pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
	                    } else if (pullUpEl.className.match('loadingProcess')) {
	                        console.log("hello ");
	                        pullUpEl.className = '';
	                        if (hasNextPage) {
	                            console.log("hello 0");
	                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
	                        } else {
	                            console.log("hello 1");
	                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多数据了...';
	                        }
	                    }
	                },
	                onScrollMove: function onScrollMove() {
	                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
	                        pullDownEl.className = 'flip';
	                        // pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
	                        this.minScrollY = 0;
	                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
	                        pullDownEl.className = '';
	                        // pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
	                        this.minScrollY = -pullDownOffset;
	                    } else if (this.y < this.maxScrollY - 5 && !pullUpEl.className.match('flip')) {
	                        pullUpEl.className = 'flip';
	                        // pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
	                        this.maxScrollY = this.maxScrollY;
	                    } else if (this.y > this.maxScrollY + 5 && pullUpEl.className.match('flip')) {
	                        pullUpEl.className = '';
	                        // pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
	                        this.maxScrollY = pullUpOffset;
	                    }
	                },
	                onScrollEnd: function onScrollEnd() {
	                    if (pullDownEl.className.match('flip')) {
	                        pullDownEl.className = 'loadingProcess';
	                        self.pullDownAction(); // Execute custom function (ajax call?)
	                    } else if (pullUpEl.className.match('flip')) {
	                        pullUpEl.className = 'loadingProcess';
	                        if (hasNextPage) {
	                            self.pullUpAction(); // Execute custom function (ajax call?)
	                        }
	                    }
	                }

	            });

	            setTimeout(function () {
	                document.getElementById('wrapper').style.left = '0';
	            }, 800);
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            if (!hasRequest) {
	                this.pullDownAction();
	                hasRequest = true;

	                console.log("i request");
	            }

	            console.log("render");
	            var navigation = isIOS ? ' ios' : ' android';
	            var marginTop = navigation ? 64 : 73;

	            var screenheight = window.screen.height;
	            var scrollHeight = screenheight - marginTop;

	            var dataArray = this.state.dataArray;
	            var needToShowFooter = dataArray.length > 19;

	            // console.log('i am render a a a a aa a ');

	            var pullUpStyle = needToShowFooter ? { visibility: 'visible' } : { visibility: 'hidden' };
	            var pullUpContent = hasNextPage ? '上拉加载更多... ' : '没有更多数据了...';
	            return _react2.default.createElement(
	                'div',
	                { className: 'washhistory' },
	                _react2.default.createElement('div', { className: navigation }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'contanner_history', style: { marginTop: marginTop, height: scrollHeight } },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'header flex' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'waterConsumer flex-cell' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'title' },
	                                '\u7D2F\u8BA1\u7528\u6C34\u91CF'
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'value' },
	                                waterConsumeTotal,
	                                'L'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'powerConsumer flex-cell' },
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'title' },
	                                '\u7D2F\u8BA1\u7528\u7535\u91CF'
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'value' },
	                                powerTotal,
	                                '\u5EA6'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { id: 'wrapper' },
	                        _react2.default.createElement(
	                            'div',
	                            { id: 'scroller' },
	                            _react2.default.createElement(
	                                'div',
	                                { id: 'pullDown' },
	                                _react2.default.createElement('span', { className: 'pullDownIcon' })
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { id: 'thelist' },
	                                dataArray.map(function (value, mapIndex) {
	                                    var index = value.mode - 1 || 0;
	                                    var mode = _washerConstData.washerModeS[index].name || '标准';
	                                    var power = Number(value.power) || 0;
	                                    var waterCom = value.waterConsume || 0;
	                                    var useTime = value.useTime || 0;
	                                    var data = value.startTime || new Date();
	                                    var localTime = _fun.Funs.dateFormat(data, 'yyyy-MM-dd hh:mm:ss', true);

	                                    return _react2.default.createElement(
	                                        'div',
	                                        { className: 'tableCell', key: mapIndex },
	                                        _react2.default.createElement(
	                                            'div',
	                                            { className: 'cellContent' },
	                                            _react2.default.createElement(
	                                                'div',
	                                                { className: 'flex workMode' },
	                                                _react2.default.createElement(
	                                                    'div',
	                                                    { className: 'flex-cell flex' },
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        { className: 'flex-cell' },
	                                                        '\u7A0B  \u5E8F\uFF1A'
	                                                    ),
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        { className: 'flex-cell' },
	                                                        mode
	                                                    )
	                                                ),
	                                                _react2.default.createElement('div', { className: 'flex-cell ' })
	                                            ),
	                                            _react2.default.createElement(
	                                                'div',
	                                                { className: 'flex consumer' },
	                                                _react2.default.createElement(
	                                                    'div',
	                                                    { className: 'flex-cell flex' },
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        { className: 'flex-cell' },
	                                                        '\u5355\u6B21\u8017\u7535\uFF1A'
	                                                    ),
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        { className: 'flex-cell' },
	                                                        power,
	                                                        '\u5EA6'
	                                                    )
	                                                ),
	                                                _react2.default.createElement(
	                                                    'div',
	                                                    { className: 'flex-cell flex' },
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        { className: 'flex-cell' },
	                                                        '\u5355\u6B21\u7528\u6C34\uFF1A'
	                                                    ),
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        { className: 'flex-cell' },
	                                                        waterCom,
	                                                        '\u5347'
	                                                    )
	                                                )
	                                            ),
	                                            _react2.default.createElement(
	                                                'div',
	                                                { className: 'flex worktime' },
	                                                _react2.default.createElement(
	                                                    'div',
	                                                    { className: 'flex-cell ' },
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        null,
	                                                        '\u542F\u52A8\u65F6\u95F4\uFF1A'
	                                                    ),
	                                                    _react2.default.createElement(
	                                                        'span',
	                                                        null,
	                                                        localTime,
	                                                        ' \u7528\u65F6',
	                                                        useTime,
	                                                        '\u5206\u949F'
	                                                    )
	                                                )
	                                            )
	                                        )
	                                    );
	                                })
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { id: 'pullUp', style: pullUpStyle },
	                                _react2.default.createElement(
	                                    'span',
	                                    { className: 'pullUpLabel' },
	                                    pullUpContent
	                                )
	                            )
	                        )
	                    )
	                ),
	                _react2.default.createElement(_Loading.Loading, {
	                    show: isRequest,
	                    info: " "
	                })
	            );
	        }
	    }]);

	    return WashHistory;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(51);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 51 */
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
	        console.log("dateFormate .. . .  ..");
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WasherWave = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(13);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 2017/1/3.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var wave_width = 140;
	var wave_angle = 10;
	var wave_height = 10; // 浪的峰值

	var WasherWave = exports.WasherWave = function (_Component) {
	    _inherits(WasherWave, _Component);

	    function WasherWave(props) {
	        _classCallCheck(this, WasherWave);

	        var _this2 = _possibleConstructorReturn(this, (WasherWave.__proto__ || Object.getPrototypeOf(WasherWave)).call(this, props));

	        _this2.status = {
	            flag: 0,
	            step: 0,
	            lines: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)']
	        };
	        console.log("child constructor");
	        return _this2;
	    }

	    _createClass(WasherWave, [{
	        key: 'defaultProps',
	        value: function defaultProps() {}
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {

	            var drawing = document.querySelector('#washerCanvas');

	            var context = drawing.getContext('2d');

	            this.setState({
	                drawing: drawing,
	                context: context
	            });

	            var _this = this;

	            // setTimeout(function () {
	            //     _this.draw();
	            // }, 1000);

	            setInterval(function () {
	                _this.init();
	            }, 1000 / 60);
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            this.draw();
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {

	            var ctx = this.state.context;
	            var lines = this.status.lines;
	            var step = this.status.step;

	            ctx.clearRect(0, 0, wave_width + 1, wave_width + 1);
	            step++;

	            this.status.step = step;

	            var circleRadius = wave_width / 2;
	            var circleDistance = wave_width;

	            for (var j = lines.length - 1; j >= 0; j--) {

	                //转化为弧度
	                var stepAngle = (step + j * 90) * Math.PI / 180;
	                var deltaHeight = Math.sin(stepAngle) * wave_angle;

	                var deltaHeightRight = Math.cos(stepAngle) * wave_angle;

	                var y = circleRadius + deltaHeight;

	                //计算在左半圆上随着y值上下移动，对应的x值
	                // 90*90
	                var expression = circleRadius * circleRadius - Math.pow(circleRadius - y, 2);
	                var x = circleRadius - Math.sqrt(expression);

	                var rightY = circleRadius + deltaHeightRight;
	                var expressionRight = circleRadius * circleRadius - Math.pow(circleRadius - rightY, 2);
	                //取右侧的X坐标（同一个y值会有两个x坐标）
	                var rightX = circleDistance - (circleRadius - Math.sqrt(expressionRight));
	                // alert("rightX:"+rightX+" rightY:"+rightY+" x:"+x+" y:"+y);

	                ctx.lineWidth = 0.1;
	                ctx.strokeStyle = lines[j];
	                ctx.fillStyle = lines[j];
	                ctx.beginPath();
	                ctx.moveTo(x, y);

	                ctx.bezierCurveTo(circleRadius, y - wave_height, circleRadius, rightY - wave_height, rightX, rightY);
	                //计算圆起始点（与X轴平行的直径的右侧端点）与圆左侧给定Y坐标的点


	                var distance = Math.sqrt(Math.pow(circleDistance - x, 2) + Math.pow(circleRadius - y, 2));
	                //sina=d/2r   a为夹角的一半  2a为两点的圆心角   Math.asin最终结果为弧度 如asin(1)=1/2*PI
	                var angle = Math.asin(distance / circleDistance) * 2;

	                var distanceRight = Math.sqrt(Math.pow(circleDistance - rightX, 2) + Math.pow(circleRadius - rightY, 2));
	                var angleRight = Math.asin(distanceRight / circleDistance) * 2;
	                //如果在左侧上半圆则用2PI-弧度
	                if (y < circleRadius) {
	                    angle = 2 * Math.PI - angle;
	                }

	                if (rightY < circleRadius) {
	                    angleRight = -angleRight;
	                }

	                ctx.arc(circleRadius, circleRadius, circleRadius, angleRight, angle, false);

	                ctx.stroke();
	                ctx.fill();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            return _react2.default.createElement(
	                'div',
	                { className: 'washerAnimation' },
	                _react2.default.createElement('canvas', { id: 'washerCanvas', width: wave_width, height: wave_width }),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'washerClothes' },
	                    _react2.default.createElement('img', { src: '../static/image/washer/clothes_logo_2.png', width: '85', height: '85' })
	                )
	            );
	        }
	    }]);

	    return WasherWave;
	}(_react.Component);

	;

/***/ }
/******/ ]);