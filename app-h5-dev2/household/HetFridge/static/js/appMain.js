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

	module.exports = __webpack_require__(7);


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
	'local', 'cancelSelect', 'submitSelect', 'launchMode', 'getData']);

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

	var _HexToFloat = __webpack_require__(6);

	var hexToFloat = new _HexToFloat.HexToFloat();

	var appData = {};
	/*
	 5.1.1.	“常规”模式：冷藏室、冷冻室设定温度可调。
	 5.1.2.	“速冷”模式：冷藏室固定2度
	 5.1.3.	“速冻”模式: 冷冻室固定按Tfs=-24℃控制
	 5.1.4.	 “节能”模式：冷藏室设定温度按Trs=8℃运行，冷冻室设定温度按Tfs=-18℃运行。
	 5.1.5.	“智能”模式：冷藏室设定温度按Trs=5℃运行，冷冻室设定温度按Tfs=-18℃运行。
	 */
	var modeArray = [{ id: 0, name: '空' }, { id: 1, name: '常规' }, { id: 2, name: '速冷', setTempStorage: '40000000' }, //冷藏 2
	{ id: 3, name: '速冻', setTempcolorromm: 'c1c00000' }, //冷冻 -24
	{ id: 4, name: '智能', setTempStorage: '40a00000', setTempcolorromm: 'c1900000' }, //冷冻 -18 冷藏 5
	{ id: 5, name: '节能', setTempStorage: '41000000', setTempcolorromm: 'c1900000' }];

	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        return '设备已离线';
	    }
	    return false;
	};
	// 数据过滤计时器setDataTimer('setstoreTemp','coolroomsettemp');
	var dataFilterTimers = {
	    setstoreTemp: 0,
	    coolroomsettemp: 0
	};

	// 返回过滤后的数据
	function dataFilter(data) {
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

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {
	        //console.log("onRepaint data====>"+JSON.stringify(data));
	        var data = dataFilter(datas);
	        appData.modeArray = modeArray;
	        //Html网络请求
	        if (data.accessToken != undefined) appData.accessToken = data.accessToken;
	        if (data.appId != undefined) appData.appId = data.appId;
	        //if(data.deviceId!=undefined) appData.deviceId = data.deviceId;
	        if (data.deviceId != undefined) {
	            appData.deviceId = data.deviceId;
	        }

	        //运行数据
	        //冷藏室设置温度
	        if (data.setstoreTemp != undefined) appData.setstoreTemp = hexToFloat.toFloat(data.setstoreTemp);
	        //冷藏室实际温度
	        if (data.storageroomTemp != undefined) appData.storageroomTemp = hexToFloat.toFloat(data.storageroomTemp);
	        //冷冻室设置温度
	        if (data.coolroomsettemp != undefined) appData.coolroomsettemp = hexToFloat.toFloat(data.coolroomsettemp);
	        //冷冻室实际温度
	        if (data.coleroomtemp != undefined) appData.coleroomtemp = hexToFloat.toFloat(data.coleroomtemp);
	        //变温室设置温度
	        if (data.changeroomsettemp != undefined) appData.changeroomsettemp = hexToFloat.toFloat(data.changeroomsettemp);
	        //变温室实际温度
	        if (data.changroomtemp != undefined) appData.changroomtemp = hexToFloat.toFloat(data.changroomtemp);
	        //工作状态
	        if (data.workStatus != undefined) appData.workStatus = data.workStatus;
	        //console.log("onRepaint data====>",appData);
	        //累计通电时间
	        if (data.TotalPowerTime != undefined) appData.TotalPowerTime = data.TotalPowerTime;
	        //累计耗电量parseInt(x,16)
	        if (data.TotalPowerConsumption != undefined) appData.TotalPowerConsumption = parseInt(parseInt(data.TotalPowerConsumption, 16) * 0.01);
	        //console.log('累计耗电量',appData.TotalPowerConsumption);
	        //实时功率
	        if (data.supplyVoltage != undefined && data.WholeCurrent != undefined) {
	            //console.log('电压和电流',data.supplyVoltage,data.WholeCurrent);
	            appData.PowerCurrent = parseInt(data.supplyVoltage * data.WholeCurrent / 1000);
	            //console.log('功率',appData.PowerCurrent);
	        }

	        //控制数据
	        //冷藏室温度
	        if (data.setTempStorage != undefined) appData.setTempStorage = hexToFloat.toFloat(data.setTempStorage);
	        //冷冻室
	        if (data.setTempcolorromm != undefined) appData.setTempcolorromm = hexToFloat.toFloat(data.setTempcolorromm);
	        //变温室
	        if (data.setchangroom != undefined) appData.setchangroom = hexToFloat.toFloat(data.setchangroom);
	        //工作模式 1正常 2速冷 3速冻 4智能  5节能
	        if (data.workmode != undefined) appData.workmode = data.workmode, appData.modeName = modeArray[data.workmode].name;;
	        //童锁 1 无童锁，2 有童锁
	        if (data.VChip != undefined) appData.VChip = data.VChip;

	        //离线&故障
	        if (data.online != undefined) appData.online = data.online; //1在线 2 离线
	        if (data.networkavailable != undefined) appData.networkavailable = data.networkavailable; //1可用 2不可用
	        //传感器故障

	        var errorArr = [];

	        if (data.SensorFailureInRefrigeratedRoom != undefined && data.SensorFailureInRefrigeratedRoom != 0) errorArr.push('SensorFailureInRefrigeratedRoom');
	        if (data.RefrigeratorEvaporatorSensorFailure != undefined && data.RefrigeratorEvaporatorSensorFailure != 0) errorArr.push('RefrigeratorEvaporatorSensorFailure');
	        if (data.FreezingChamberSensorFailure != undefined && data.FreezingChamberSensorFailure != 0) errorArr.push('FreezingChamberSensorFailure');
	        if (data.RefrigerationRoomEvaporatorSensorFailure != undefined && data.RefrigerationRoomEvaporatorSensorFailure != 0) errorArr.push('RefrigerationRoomEvaporatorSensorFailure');
	        if (data.GreenhouseSensorFailure != undefined && data.GreenhouseSensorFailure != 0) errorArr.push('GreenhouseSensorFailure');
	        if (data.SensorFailureInGreenhouse != undefined && data.SensorFailureInGreenhouse != 0) errorArr.push('SensorFailureInGreenhouse');
	        if (data.PCBAenvironmentSensorFault != undefined && data.PCBAenvironmentSensorFault != 0) errorArr.push('PCBAenvironmentSensorFault');
	        if (data.DoorSwitchFailureSwitchHardwareFailure != undefined && data.DoorSwitchFailureSwitchHardwareFailure != 0) errorArr.push('DoorSwitchFailureSwitchHardwareFailure');
	        if (data.CoolDoorSwitchFailureSwitchHardwareFailure != undefined && data.CoolDoorSwitchFailureSwitchHardwareFailure != 0) errorArr.push('CoolDoorSwitchFailureSwitchHardwareFailure');
	        if (data.ChangDoorSwitchFailureSwitchHardwareFailure != undefined && data.ChangDoorSwitchFailureSwitchHardwareFailure != 0) errorArr.push('ChangDoorSwitchFailureSwitchHardwareFailure');
	        if (data.ACvoltageAbnormalFau != undefined && data.ACvoltageAbnormalFau != 0) errorArr.push('ACvoltageAbnormalFau');
	        if (data.CompressorFault != undefined && data.CompressorFault != 0) errorArr.push('CompressorFault');
	        if (data.FailureOfRefrigerant != undefined && data.FailureOfRefrigerant != 0) errorArr.push('FailureOfRefrigerant');
	        if (data.AgingLayerFault != undefined && data.AgingLayerFault != 0) errorArr.push('AgingLayerFault');
	        if (data.LeakageProtectionFault != undefined && data.LeakageProtectionFault != 0) errorArr.push('LeakageProtectionFault');
	        if (data.CompressorOverTemperatureFault != undefined && data.CompressorOverTemperatureFault != 0) errorArr.push('CompressorOverTemperatureFault');
	        if (data.RefrigeratorDoorIsNotClosedStrict != undefined && data.RefrigeratorDoorIsNotClosedStrict != 0) errorArr.push('RefrigeratorDoorIsNotClosedStrict');
	        if (data.FrozenDoorIsNotClosedStrict != undefined && data.FrozenDoorIsNotClosedStrict != 0) errorArr.push('FrozenDoorIsNotClosedStrict');
	        if (data.MCUFLASHReadWriteError != undefined && data.MCUFLASHReadWriteError != 0) errorArr.push('MCUFLASHReadWriteError');
	        if (data.WIFIFLASHReadWriteError != undefined && data.WIFIFLASHReadWriteError != 0) errorArr.push('WIFIFLASHReadWriteError');
	        if (data.WIFIandMCUCommunicationFault != undefined && data.WIFIandMCUCommunicationFault != 0) errorArr.push('WIFIandMCUCommunicationFault');
	        if (data.SensorFailureInRefrigeratedRoom != undefined) {
	            appData.errorArr = errorArr;
	        }
	        //console.log('运行数据 冷冻设置温度:',appData.coolroomsettemp ,'运行数据 冷藏设置温度:',appData.setstoreTemp);
	        //console.log('控制数据 冷冻设置温度:',appData.setTempcolorromm ,' 控制数据 冷藏设置温度:',appData.setTempStorage);
	        this.trigger(appData);
	    },
	    onGetData: function onGetData(getUrl) {
	        if (!getUrl) return;
	        var xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = function () {
	            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	                var res = JSON.parse(xmlhttp.responseText);
	                if (res.code == 0) {
	                    //数组
	                    var stateData = res.data;
	                    var myDate = new Date();
	                    var currentYear = myDate.getFullYear();
	                    //console.log('用电量告警 ',stateData);
	                    for (var i = 0; i < stateData.length; i++) {
	                        if (stateData[i].checkTime == currentYear) {

	                            if (stateData[i].addRate > 30 && stateData[i].addRate < 50) {
	                                //用电量告警
	                                console.log('用电量告警 ', stateData[i].addRate);
	                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标30%', "tel":"400-777-2009"}));
	                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标30%", "button":"我知道了"}');
	                            } else if (stateData[i].addRate > 50 && stateData[i].addRate < 100) {
	                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标50%', "tel":"400-777-2009"}));
	                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标50%", "button":"我知道了"}');
	                            } else if (stateData[i].addRate > 100 && stateData[i].addRate < 150) {
	                                //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标100%', "tel":"400-777-2009"}))
	                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标100%", "button":"我知道了"}');
	                            } else if (stateData[i].addRate > 150) {
	                                //直接报废
	                                //het.toast(JSON.stringify({"contactService":'设备故障 能耗超标200%', "tel":"400-777-2009"}))
	                                het.toast('{"title":"故障", "content":"用电量告警 能耗超标150% 建议更换整机 ", "button":"我知道了"}');
	                            }
	                        }
	                    }
	                    //console.log('state',stateData);
	                    this.trigger(stateData);
	                };
	            }
	        }.bind(this);
	        xmlhttp.open("GET", getUrl, true);
	        xmlhttp.send();
	    },
	    onLocal: function onLocal(data) {
	        this.trigger(appData);
	    },

	    //时间控件的取消
	    onCancelSelect: function onCancelSelect(data) {
	        this.trigger({ selectshow: false });
	        //this.trigger({openSubscribeClock:false});
	    },
	    onSubmitSelect: function onSubmitSelect(data, type) {

	        //console.log('onSubmitSelect------------',data);
	        //0冷冻  1冷藏
	        var updateFlag = void 0;
	        if (type == 0) {
	            updateFlag = '000f0000'; //het.hexUpFlag(5, 4, 4);
	            var Tempcolorromm = data.setTempcolorromm;
	            if (data.setTempcolorromm == -14) {
	                data.setTempcolorromm = '437F0000';
	            } else {
	                data.setTempcolorromm = hexToFloat.toHex(Tempcolorromm);
	            }
	            appData.coolroomsettemp = Tempcolorromm;
	        } else if (type == 1) {
	            updateFlag = 'f0000000'; //het.hexUpFlag(4, 4, 4);
	            var TempStorage = data.setTempStorage;
	            if (data.setTempStorage == 11) {
	                data.setTempStorage = '437F0000';
	            } else {
	                data.setTempStorage = hexToFloat.toHex(TempStorage);
	            }
	            appData.setstoreTemp = TempStorage;
	        }
	        data.updateFlag = updateFlag;
	        setDataTimer('setstoreTemp', 'coolroomsettemp');
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });

	        this.trigger(appData);
	    },
	    onSelectMode: function onSelectMode(data) {
	        console.log('OnSelectMode', data.function);

	        this.trigger({ function: data.function });
	    },
	    onLaunchMode: function onLaunchMode(data) {
	        var selectMode = data.workmode;
	        var updateFlag = void 0;
	        switch (selectMode) {
	            case 1:
	                //正常
	                //updateFlag= '00000100';
	                updateFlag = 'f00f0100';
	                break;
	            case 2:
	                //速冷
	                //updateFlag=  'f0000100'; //;het.hexUpFlag(4, 1, 4);
	                updateFlag = 'f00f0100';
	                data.setTempStorage = modeArray[selectMode].setTempStorage;
	                appData.setstoreTemp = 2;
	                break;
	            case 3:
	                //速冻
	                data.setTempcolorromm = modeArray[selectMode].setTempcolorromm;
	                //updateFlag= '000f0100';//het.hexUpFlag(4, 1, 4);
	                updateFlag = 'f00f0100';
	                appData.coolroomsettemp = -24;
	                break;
	            case 4:
	                //智能
	                data.setTempStorage = modeArray[selectMode].setTempStorage;
	                data.setTempcolorromm = modeArray[selectMode].setTempcolorromm;
	                updateFlag = 'f00f0100'; //het.hexUpFlag(7, 1, 4,het.hexUpFlag(5, 4, 4,het.hexUpFlag(6, 4, 4)));
	                appData.setstoreTemp = 5;
	                appData.coolroomsettemp = -18;
	                break;
	            case 5:
	                //节能
	                data.setTempStorage = modeArray[selectMode].setTempStorage;
	                data.setTempcolorromm = modeArray[selectMode].setTempcolorromm;
	                console.log('data.setTempStorage ', data.setTempStorage);
	                updateFlag = 'f00f0100'; //het.hexUpFlag(7, 1, 4,het.hexUpFlag(5, 4, 4,het.hexUpFlag(6, 4, 4)));
	                appData.setstoreTemp = 8;
	                appData.coolroomsettemp = -18;
	                break;
	        }
	        data.updateFlag = updateFlag;
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });

	        appData.workmode = data.workmode;
	        setDataTimer('setstoreTemp', 'coolroomsettemp');
	        this.trigger(appData);
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by ben on 2017/1/16.
	 */
	/**
	 * Created by Kalen on 2017-1-16.
	 */
	var HexToFloat = exports.HexToFloat = function () {
	    function HexToFloat() {
	        _classCallCheck(this, HexToFloat);
	    }

	    _createClass(HexToFloat, [{
	        key: 'toFloat',
	        value: function toFloat(s) {
	            var num = parseInt(s, 16); //将十六进制(字符串)转换为十进制数值
	            var res = num.toString(2); //将十进制数值转换为二进制(字符串)
	            //转字符串会损失以0开头的0, 所以要补零

	            var j0 = 32 - res.length;
	            // alert('少了多少个'+j0);
	            if (res.length < 32) {
	                for (var i = 0; i < j0; i++) {
	                    res = '0' + res;
	                }
	            }
	            //alert('res  '+res);


	            //第一个字符代表正负,等于1的时候是负数.等于0是正数
	            var sub0 = res.substr(0, 1);
	            // alert('sub0 '+sub0);
	            if (sub0 == 1) {
	                //负数
	                sub0 = -1;
	            } else {
	                //正数
	                sub0 = 1;
	            }

	            //拆分计算指数
	            var sub1 = res.substr(1, 8); //拆分第二位到第九位的八位二进制数为指数位
	            //alert('sub1 '+sub1);
	            var num2 = parseInt(sub1, 2); //将二进制指数转换为十进制
	            if (num2 - 127 >= 0) {
	                num2 = num2 - 127; //求出指数用转换的十进制数减去127就可以得到
	            }
	            // alert('num2 '+num2);

	            //拆分尾数
	            var sub2 = res.substr(9, 23); //拆分出后23位二进制数为科学计数法的尾数位

	            var numEE = 1;
	            for (var i = 0; i < sub2.length; i++) {
	                numEE += sub2.substr(i, 1) / Math.pow(2, i + 1);
	            }

	            numEE = sub0 * numEE * Math.pow(2, num2);
	            return numEE;
	        }
	    }, {
	        key: 'toHex',
	        value: function toHex(e) {

	            var totalBinary;
	            //1.符号部分
	            if (e > 0) {
	                totalBinary = '0';
	            } else {
	                totalBinary = '1';
	                e = -e;
	            };

	            //把float转成二进制
	            /*将二进制形式的浮点实数转化为规格化的形式:(小数点向左移动7个二进制位可以得到)
	            10110010.001=1.0110010001*2^7 因而产生了以下三项
	            符号位：该数为正数,故第31位为0,占一个二进制位.
	            阶码：指数为7,故其阶码为127+7=134=(10000110)(二进制),占从第30到第23共8个二进制位.
	                尾数为小数点后的部分, 即0110010001.因为尾数共23个二进制位,在后面补13个0,即01100100010000000000000*/
	            var res = e.toString(2);
	            console.log('res ', res);
	            var num1 = res.length - 1;
	            var sub1 = 127 + num1;
	            //指数 指数部分 8位
	            var total1 = sub1.toString(2);
	            console.log('total1 ', total1);

	            //alert('total1 '+total1);
	            //尾数部分 23位
	            // alert('num1 '+res.length);
	            var sub2 = (res / Math.pow(10, num1) - 1).toFixed(8);
	            var total2 = '' + sub2;
	            // alert('total2 '+total2);
	            total2 = total2.substr(2, 8);
	            for (var i = 0; i < 15; i++) {
	                total2 = total2 + '0';
	            };
	            console.log('total2 ', total2);

	            totalBinary = totalBinary + total1 + total2;
	            console.log('totalBinary ', totalBinary);
	            //转十进制
	            var totalInt = parseInt(totalBinary, 2);

	            var totalHex = totalInt.toString(16);
	            console.log('totalHex *******************', totalHex);
	            return totalHex;
	        }
	    }]);

	    return HexToFloat;
	}();

	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _TempSelect = __webpack_require__(8);

	var _Alert = __webpack_require__(10);

	var _Alert2 = _interopRequireDefault(_Alert);

	var _CheckGraph = __webpack_require__(11);

	var _CheckGraph2 = _interopRequireDefault(_CheckGraph);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	var modeArray = [{ id: 1, name: '常规' }, { id: 2, name: '速冷' }, { id: 3, name: '速冻' }, { id: 4, name: '智能' }, { id: 5, name: '节能' }];
	var appData = [{ value: 0, error: 'SensorFailureInRefrigeratedRoom', content: '冷藏室传感器故障' }, { value: 0, error: 'RefrigeratorEvaporatorSensorFailure', content: '冷藏室蒸发器传感器故障' }, { value: 0, error: 'FreezingChamberSensorFailure', content: '冷冻室传感器故障' }, { value: 0, error: 'RefrigerationRoomEvaporatorSensorFailure', content: '冷冻室蒸发器传感器故障' }, { value: 0, error: 'GreenhouseSensorFailure', content: '变温室传感器故障' }, { value: 0, error: 'SensorFailureInGreenhouse', content: '变温室蒸发器传感器故障' }, { value: 0, error: 'PCBAenvironmentSensorFault', content: 'PCBA环境传感器故障' }, { value: 0, error: 'DoorSwitchFailureSwitchHardwareFailure', content: '冷藏室门开关故障（开关硬件故障）' }, { value: 0, error: 'CoolDoorSwitchFailureSwitchHardwareFailure', content: '冷冻室门开关故障（开关硬件故障）' }, { value: 0, error: 'ChangDoorSwitchFailureSwitchHardwareFailure', content: '变温室门开关故障（开关硬件故障）' }, { value: 0, error: 'ACvoltageAbnormalFau', content: '交流电压异常故障' }, { value: 0, error: 'CompressorFault', content: '压机过流故障' }, { value: 0, error: 'FailureOfRefrigerant', content: '缺少制冷剂故障' }, { value: 0, error: 'AgingLayerFault', content: '保温层严重老化（发泡层）' }, { value: 0, error: 'LeakageProtectionFault', content: '漏电保护故障' }, { value: 0, error: 'CompressorOverTemperatureFault', content: '压机过温故障' }, { value: 0, error: 'RefrigeratorDoorIsNotClosedStrict', content: '冷藏室门未关严' }, { value: 0, error: 'FrozenDoorIsNotClosedStrict', content: '冷冻室门未关严' }, { value: 0, error: 'MCUFLASHReadWriteError', content: 'MCU FLASH读写错误' }, { value: 0, error: 'WIFIFLASHReadWriteError', content: 'WIFI FLASH读写错误' }, { value: 0, error: 'WIFIandMCUCommunicationFault', content: 'WIFI与MCU通讯故障' }];

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            ChipSelect: false,
	            beforeMode: 1,
	            workmode: 1,
	            //请求计数
	            requestCount: 0,
	            isShowAlert: false
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.selectMode = _this.selectMode.bind(_this);
	        _this.openSelectTemp = _this.openSelectTemp.bind(_this);
	        _this.cancelClock = _this.cancelClock.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        _this.selectMode = _this.selectMode.bind(_this);
	        _this.childLock = _this.childLock.bind(_this);
	        _this.childSetState = _this.childSetState.bind(_this);
	        _this.checkGraphClick = _this.checkGraphClick.bind(_this);
	        _this.mySwiper;
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: 'HET-风冷双温区冰箱', setNavRightBtnHiden: 0 }));

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.mySwiper = new Swiper('.swiper-container', {
	                pagination: '.swiper-pagination',
	                paginationClickable: true
	            });
	        }
	    }, {
	        key: 'openSelectTemp',
	        value: function openSelectTemp(e) {
	            //data-mode 1冷冻 2冷藏
	            console.log('openSelectTemp');
	            var selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
	            this.setState({
	                boot: selectMode,
	                selectshow: true
	            });
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            //未传任何参数，trigger返回一个假值，关闭控件
	            _Actions.Actions.cancelSelect();
	            console.log('关闭');
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(e, boot) {
	            //传入选择控件选中的小时数组和分钟数组
	            //let where = 1;//this.state.boot;
	            //let selectMode = 1;//this.state.function;
	            ////Actions.submitSelect(h,m,where,selectMode);
	            ////console.log('选中的值',h,m);
	            var temp = e;
	            console.log('temp--------', temp, boot);
	            appData.selectArray = {};
	            if (boot == 0) {
	                appData.selectArray = {
	                    setTempcolorromm: temp
	                };
	                setTimeout(this.setState({
	                    setTempcolorromm: temp, //冷冻
	                    selectshow: false
	                }), "2000");
	            } else if (boot == 1) {
	                appData.selectArray = {
	                    setTempStorage: temp
	                };
	                setTimeout(this.setState({
	                    setstoreTemp: temp, //冷冻
	                    selectshow: false
	                }), "2000");
	            }

	            _Actions.Actions.submitSelect(appData.selectArray, boot);
	        }
	    }, {
	        key: 'childLock',
	        value: function childLock() {
	            console.log('进入童锁');
	            //this.state.ChipSelect = true;
	            this.setState({ ChipSelect: !this.state.ChipSelect });
	        }
	        //选择模式

	    }, {
	        key: 'selectMode',
	        value: function selectMode(e) {
	            console.log('进入模式选择方法');
	            var selectMode = parseInt(e.currentTarget.getAttribute('data-mode'));
	            console.log("selectMode", selectMode);
	            var ChipSelect = this.state.ChipSelect;
	            _Actions.Actions.launchMode({ workmode: selectMode });
	        }
	    }, {
	        key: 'childSetState',
	        value: function childSetState(e) {
	            this.setState({ isShowAlert: e.isShowAlert });
	        }
	    }, {
	        key: 'checkGraphClick',
	        value: function checkGraphClick() {
	            window.location.href = '#/checkGraph';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //进入的时候调用一遍冰箱用电量接口.
	            if (this.state.accessToken != null && this.state.appId != null && this.state.deviceId != null && this.state.requestCount == 0) {
	                var getUrl = 'http://200.200.200.50/v1/app/customization/fridge/hetFridge/power?appId=' + this.state.appId + '&accessToken=' + this.state.accessToken + '&deviceId=' + this.state.deviceId + '&timestamp=' + new Date().getTime();
	                console.log('打印参数 -__________________________ ', getUrl, this.state.deviceId);
	                //Actions.getData(getUrl);
	                this.state.requestCount = 1;
	                het.get('/v1/app/customization/fridge/hetFridge/power', { 'deviceId': this.state.deviceId }, function (responseText) {
	                    console.log("成功", responseText);
	                    var res = JSON.parse(responseText);
	                    if (res.code == 0) {
	                        //数组
	                        var stateData = res.data;
	                        console.log("stateData", stateData);
	                        var myDate = new Date();
	                        var currentYear = myDate.getFullYear();
	                        for (var i = 0; i < stateData.length; i++) {
	                            if (stateData[i].checkTime == currentYear) {
	                                console.log('用电量告警 ', stateData[i].addRate);
	                                if (stateData[i].addRate > 30 && stateData[i].addRate < 50) {
	                                    //用电量告警
	                                    console.log('用电量告警 ', stateData[i].addRate);
	                                    //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标30%', "tel":"400-777-2009"}));
	                                    het.toast('{"title":"故障", "content":"用电量告警 能耗超标30%", "button":"我知道了"}');
	                                } else if (stateData[i].addRate > 50 && stateData[i].addRate < 100) {
	                                    //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标50%', "tel":"400-777-2009"}));
	                                    het.toast('{"title":"故障", "content":"用电量告警 能耗超标50%", "button":"我知道了"}');
	                                } else if (stateData[i].addRate > 100 && stateData[i].addRate < 150) {
	                                    //het.toast(JSON.stringify({"contactService":'用电量告警 能耗超标100%', "tel":"400-777-2009"}))
	                                    het.toast('{"title":"故障", "content":"用电量告警 能耗超标100%", "button":"我知道了"}');
	                                } else if (stateData[i].addRate > 150) {
	                                    //直接报废
	                                    //het.toast(JSON.stringify({"contactService":'设备故障 能耗超标200%', "tel":"400-777-2009"}))
	                                    het.toast('{"title":"故障", "content":"用电量告警 能耗超标150% 建议更换整机 ", "button":"我知道了"}');
	                                }
	                            }
	                        }
	                    }
	                }, function (e) {
	                    console.log("失败", e);
	                });
	            }
	            //离线&故障
	            var online = this.state.online != undefined ? this.state.online : 1; //是否在线  1在线  2离线
	            //let networkavailable =this.state.networkavailable!=undefined?parseInt(this.state.networkavailable):1;
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var BtnCheckGraph = isIOS ? 'Btn-checkGraph ios' : 'Btn-checkGraph android';
	            var indexNum = isIOS ? 'indexNum ios' : 'indexNum android';
	            //故障时样式
	            var runningOk = online != 2 ? true : false;

	            var items = {};
	            items = modeArray;
	            var selectMode = this.state.workmode ? this.state.workmode : 1;

	            var boot = this.state.boot || 0;
	            //冷冻
	            var coldT = this.state.coolroomsettemp || 0;
	            //冷藏
	            var powerColdT = this.state.setstoreTemp || 0;
	            var selectshow = this.state.selectshow ? this.state.selectshow : false;
	            //累计通电时间
	            var totalPowerTime = this.state.TotalPowerTime || 0;
	            //累计耗电量
	            var totalPowerConsumption = this.state.TotalPowerConsumption || 0;
	            //实时功率
	            var powerCurrent = this.state.PowerCurrent || 0;

	            if (powerColdT > 255 || coldT > 255) {
	                powerColdT = 255;
	                coldT = 255;
	                this.state.error = 1;
	            }

	            var tempMaxArr = [-15, 10];
	            var tempMinArr = [-24, 1];
	            var TempSelect_Value = boot == 0 ? coldT : powerColdT;

	            var title = '警告';
	            var message = this.state.message;

	            var errAr = this.state.errorArr;
	            if (errAr != null && errAr.length > 0) {
	                console.log('收到错误信息', errAr.length, errAr);
	                var errorContent = [];
	                for (var i = 0; i < errAr.length; i++) {
	                    console.log('收到错误信息', errAr[i]);
	                    for (var j = 0; j < 21; j++) {
	                        if (appData[j].error == errAr[i]) {
	                            if (appData[j].value == 1) {
	                                break;
	                            }
	                            if (this.state.isShowAlert != true) {
	                                appData[j].value = 1;
	                                errorContent.push(appData[j].content);
	                            }
	                        }
	                    }
	                }
	                if (errorContent.length > 4) {
	                    errorContent.slice(0, 4);
	                }
	                var vContent = '';
	                for (var i = 0; i < errorContent.length; i++) {
	                    vContent += i + 1;
	                    vContent += '.';
	                    vContent += errorContent[i];
	                    vContent += '     \n    ';
	                    console.log('输出的文本', vContent);
	                }
	                //if(vContent!='') het.toast(JSON.stringify({"contactService":vContent, "tel":"400-777-2009"}));
	                if (vContent != '') {
	                    //this.state.message = vContent;
	                    this.setState({ isShowAlert: true, message: vContent });
	                }
	            }

	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'section',
	                    { className: 'app_bgimghg' },
	                    React.createElement(
	                        'div',
	                        { className: 'errorDiv' + (runningOk ? ' off' : '') },
	                        '\u8BBE\u5907\u672A\u8FDE\u63A5,\u8BF7\u5C1D\u8BD5\u91CD\u65B0\u8FDE\u63A5..'
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'swiper-container' },
	                        React.createElement(
	                            'div',
	                            { className: 'swiper-wrapper' },
	                            React.createElement(
	                                'div',
	                                { className: 'bgSection swiper-slide flex' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    React.createElement(
	                                        'i',
	                                        { className: 'bgIndex', onClick: !runningOk || selectMode == 3 || selectMode == 4 || selectMode == 5 || this.state.ChipSelect == true ? '' : this.openSelectTemp, 'data-mode': 0 },
	                                        coldT == 255 || coldT == -14 ? 'OFF' : coldT + ' °',
	                                        ' '
	                                    ),
	                                    React.createElement(
	                                        'h5',
	                                        null,
	                                        '\u51B7\u51BB\u5BA4'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    React.createElement(
	                                        'i',
	                                        { className: 'bgIndex', onClick: !runningOk || selectMode == 2 || selectMode == 4 || selectMode == 5 || this.state.ChipSelect == true ? '' : this.openSelectTemp, 'data-mode': 1 },
	                                        powerColdT == 255 || powerColdT == 11 ? 'OFF' : powerColdT + ' °'
	                                    ),
	                                    React.createElement(
	                                        'h5',
	                                        null,
	                                        '\u51B7\u85CF\u5BA4'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'swiper-slide flex checkGraph' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    React.createElement(
	                                        'div',
	                                        { className: indexNum },
	                                        React.createElement(
	                                            'i',
	                                            null,
	                                            totalPowerTime
	                                        ),
	                                        React.createElement(
	                                            'i',
	                                            { style: { fontSize: '2rem' } },
	                                            'H'
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'h5',
	                                        null,
	                                        '\u7D2F\u8BA1\u901A\u7535\u65F6\u95F4'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    React.createElement(
	                                        'div',
	                                        { className: indexNum },
	                                        React.createElement(
	                                            'i',
	                                            null,
	                                            powerCurrent
	                                        ),
	                                        React.createElement(
	                                            'i',
	                                            { style: { fontSize: '2rem' } },
	                                            'W'
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'h5',
	                                        null,
	                                        '\u5B9E\u65F6\u529F\u7387'
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: BtnCheckGraph, onClick: this.checkGraphClick },
	                                        '\u67E5\u770B\u5B9E\u65F6\u529F\u7387\u66F2\u7EBF'
	                                    )
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { className: 'flex-cell' },
	                                    React.createElement(
	                                        'div',
	                                        { className: indexNum },
	                                        React.createElement(
	                                            'i',
	                                            null,
	                                            totalPowerConsumption
	                                        ),
	                                        React.createElement(
	                                            'i',
	                                            { style: { fontSize: '2rem' } },
	                                            'KWH'
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'h5',
	                                        null,
	                                        '\u7D2F\u8BA1\u8017\u7535\u91CF'
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement('div', { className: 'swiper-pagination' })
	                    )
	                ),
	                React.createElement(
	                    'dl',
	                    { className: 'flex mode-items' },
	                    React.createElement(
	                        'dl',
	                        { className: 'flex mode-items' },
	                        items.map(function (o) {
	                            return React.createElement(
	                                'dd',
	                                { className: 'mode' + (o.id == selectMode && this.state.ChipSelect == false ? ' on' : ''),
	                                    'data-mode': o.id,
	                                    onClick: runningOk && this.state.ChipSelect == false ? this.selectMode : '',
	                                    style: { 'display': o.id == 10 ? 'none' : 'auto', 'opacity': this.state.ChipSelect ? '0.5' : '1',
	                                        'backgroundImage': 'url(../static/img/m-' + o.id + (o.id == selectMode && this.state.ChipSelect == false ? '-on' : '-off') + '.png)' }, key: o.id },
	                                o.name
	                            );
	                        }.bind(this)),
	                        React.createElement(
	                            'dd',
	                            { className: this.state.ChipSelect ? "mode on" : 'mode', style: { 'backgroundImage': 'url(../static/img/m-6' + (this.state.ChipSelect ? '-on' : '-off') + '.png)' }, onClick: runningOk ? this.childLock : '' },
	                            '\u7AE5\u9501'
	                        )
	                    )
	                ),
	                React.createElement(_TempSelect.TempSelect, {
	                    show: selectshow,
	                    boot: boot,
	                    cancelClock: this.cancelClock,
	                    submitClock: this.submitClock, min: tempMinArr[boot], max: tempMaxArr[boot], minus: false, value: TempSelect_Value }),
	                this.state.isShowAlert ? React.createElement(_Alert2.default, { title: title, message: message, childSetState: this.childSetState }) : ''
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('和而泰冰箱');
	    // 无路由方式
	    //ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/checkGraph', component: _CheckGraph2.default })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by ben on 2017/1/11.
	 */
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TempSelect = undefined;

	var _range = __webpack_require__(9);

	var _range2 = _interopRequireDefault(_range);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TempSelect = exports.TempSelect = React.createClass({
	    displayName: 'TempSelect',

	    getInitialState: function getInitialState() {
	        //let min = this.props.min ;
	        //let max = this.props.max;
	        //let value = this.props.value;
	        //if (value < min) {
	        //    value = min;
	        //} else if (value > max) {
	        //    value = max;
	        //}
	        return {
	            showOpacity: 1,
	            timeDisplay: false,
	            temp: null,
	            last: this.props.min
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {
	        var showOpacity = this.state.showOpacity;
	        var min = this.props.min;
	        var max = this.props.max;
	        var value = this.props.value;
	        if (value < min) {
	            value = min;
	        } else if (value > max) {
	            value = max;
	        }
	        this.setState({ initialTemp: value });

	        if (next.show == true) {
	            this.setState({ timeDisplay: true });
	            //clearInterval(this.timr);
	            //this.timr = setInterval(function(){
	            //    showOpacity += 1;
	            //    if(showOpacity>=1){
	            //        clearInterval(this.timr);
	            //        this.setState({showOpacity:showOpacity});
	            //    }
	            //    console.log('showOpacity',showOpacity);
	            //}.bind(this),10)
	            this.setState({ showOpacity: 1 });
	            //console.log('初始温度:',this.state.initialTemp,'props.value',this.props.value);
	        } else if (next.show == false) {
	            clearInterval(this.timr);
	            //时间选择的确定button 和 覆盖的 功能按钮(速冻)位置相同. 时间选择界面消失过快 会导致速冻也被点击.
	            this.timr = setInterval(function () {
	                showOpacity -= 1;
	                // console.log('1',showOpacity,parseInt(showOpacity));
	                if (showOpacity <= 0) {
	                    clearInterval(this.timr);
	                    this.setState({ timeDisplay: false });
	                    this.setState({ showOpacity: showOpacity });
	                }
	            }.bind(this), 10);
	        }
	    },
	    endDefault: function endDefault(e) {
	        //阻止IOS上冒泡触发iscroll事件
	        e.stopPropagation();
	        e.preventDefault();
	    },
	    isNum: function isNum(s) {
	        if (s !== null && s !== '') return !isNaN(s);
	        return false;
	    },
	    touchEnd: function touchEnd(e) {
	        var val = this.isNum(this.state.temp) ? this.state.temp : this.state.last; // 防止无效操作
	        var er1 = typeof this.props.cb === 'function';
	        var er2 = this.state.temp != this.state.last;
	        if (typeof this.props.cb === 'function' && this.state.temp != this.state.last) {
	            this.props.cb(val);
	        }
	    },
	    feedback: function feedback(value) {
	        var val = Math.round(value);
	        //console.log('range:='+val+'this.props.minus='+this.props.minus);
	        this.setState({ temp: this.props.minus ? -val : val });
	    },
	    submitclock: function submitclock(e) {
	        if (typeof this.props.submitClock === 'function') {
	            console.log('初始温度:', this.state.initialTemp, 'this.state.temp', this.state.temp);
	            if (this.state.temp != null) {
	                this.props.submitClock(this.state.temp, this.props.boot);
	                console.log('温度选择,如果不滑动拉杆,看是什么值', this.state.temp);
	                this.state.temp = null;
	            } else {
	                this.props.submitClock(this.state.initialTemp, this.props.boot);
	            }
	        } else {
	            console.log('error:the submit callback is not a function');
	        }
	        e.stopPropagation();
	        e.preventDefault();
	    },
	    cancelclock: function cancelclock(e) {
	        //取消选择
	        if (typeof this.props.cancelClock === 'function') {

	            this.props.cancelClock();
	            console.log('取消选择');
	            //this.setState({temp:0,initialTemp:0});
	            //this.state.temp=0;
	            //this.state.initialTemp = 0;
	        } else {
	            console.log('error:the cancel callback is not a function');
	        }
	        e.stopPropagation();
	        e.preventDefault();
	    },
	    render: function render() {
	        var min = this.props.minus ? -this.props.min : this.props.min;
	        var max = this.props.minus ? -this.props.max : this.props.max;
	        //let value = this.state.initialTemp||min;
	        var value = this.props.value;
	        /*设定range的头文字标题*/
	        var titleValue = this.state.temp === null ? value : this.state.temp; //显示选择的温度or时长
	        if (titleValue == this.props.max + 1 || titleValue == 255) {
	            titleValue = '关闭';
	        } else {
	            titleValue += '℃';
	        }
	        var currentTitle = this.props.boot == 0 ? '冷冻室温度' : '冷藏室温度';
	        return React.createElement(
	            'section',
	            { className: 'timeSelect', style: { display: this.state.timeDisplay ? 'block' : 'none', opacity: this.state.showOpacity } },
	            React.createElement('section', { onTouchEnd: this.cancelclock }),
	            React.createElement(
	                'section',
	                { className: 'timeselect' },
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
	                        'h5',
	                        null,
	                        titleValue
	                    ),
	                    React.createElement(
	                        'h4',
	                        null,
	                        currentTitle
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'range' },
	                    React.createElement(
	                        'span',
	                        { className: 'label1' },
	                        this.props.min
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'rangeblock' },
	                        React.createElement(
	                            'div',
	                            { className: 't-range', onTouchEnd: this.touchEnd },
	                            React.createElement(_range2.default, { min: min, max: max + 1, value: value == 255 ? max + 1 : value, fnFeedback: this.feedback })
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'label2' },
	                        this.props.max
	                    )
	                )
	            )
	        );
	    }
	});

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
	        var value = parseInt(e.currentTarget.value);
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
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
	        return React.createElement(
	            "div",
	            { className: "__range" },
	            React.createElement(
	                "label",
	                { ref: "wrap" },
	                React.createElement("input", { type: "range", min: this.min(), max: this.max(), onChange: this.handlerChange, value: value, disabled: this.props.disabled ? "disabled" : "" }),
	                React.createElement(
	                    "i",
	                    { ref: "cursor", className: "cursor" },
	                    value
	                )
	            )
	        );
	    }
	});

	module.exports = Range;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var Alert = React.createClass({
		displayName: 'Alert',

		propTypes: {
			isShowTitle: React.PropTypes.bool, // 是否显示标题
			title: React.PropTypes.string, // 提示对话框上显示的标题内容
			message: React.PropTypes.string, // 提示对话框上显示的内容
			btnCancel: React.PropTypes.string, //提示对话框取消按钮显示的内容
			btnSure: React.PropTypes.string, // 提示对话框上确认按钮显示的内容
			onAnimationLeave: React.PropTypes.func // 提示对话框上关闭后的回调函数
		},
		getInitialState: function getInitialState() {
			return {
				animationClassName: 'animation-alert-enter',
				opacity: 1
			};
		},
		getDefaultProps: function getDefaultProps() {
			return {
				isShowTitle: true,
				title: '提示',
				message: '请添加内容',
				btnCancel: '取消',
				btnSure: '确定',
				onAnimationLeave: function onAnimationLeave() {}
			};
		},

		animationType: 'enter', //自定义对象属性，用以维护动画显隐
		animationEnd: function animationEnd() {
			//if(this.animationType == 'enter'){
			//	this.animationType = 'leave';
			//	this.setState({opacity: 1});
			//}else{
			//	this.animationType = 'enter';
			//	//this.setState({opacity: 0});
			//	/*,()=>{
			//		this.props.onAnimationLeave()
			//	}*/
			//}
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			//onAnimationEnd react 0.14版本不支持标签上的直接量写法onAnimationEnd={this.animationEnd}
			this.refs['cancel'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false });
			}, false);

			this.refs['sure'].addEventListener('touchstart', function () {
				_this.props.childSetState({ isShowAlert: false, sure: true });
			}, false);

			this.refs['wrapper'].addEventListener('webkitAnimationEnd', function () {
				_this.animationEnd();
			}, false);
		},
		btnTouchClose: function btnTouchClose(e) {
			this.setState({ animationClassName: 'animation-alert-leave', close: 1 });
		},
		render: function render() {
			var _innerBox, _style;

			var style = (_style = {
				wrapper: {
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: '-webkit-box',
					WebkitBoxAlign: 'center',
					WebkitBoxPack: 'center',
					background: 'rgba(0,0,0,0.5)',
					opacity: this.state.opacity,
					zIndex: 2
				},
				innerBox: (_innerBox = {
					width: '86%',
					maxHeight: '60%',
					borderRadius: '5px',
					boxSizing: 'border-box',
					WebkitBoxSizing: 'border-box',
					background: 'rgba(255,255,255,1)',
					padding: '14px 0 0'
				}, _defineProperty(_innerBox, 'borderRadius', '4px'), _defineProperty(_innerBox, 'boxShadow', '0 0 40px rgba(0,0,0,0.4)'), _innerBox),
				title: {
					padding: '0 17px 5px',
					color: 'black',
					fontSize: '18px',
					fontWeight: 'bold',
					textAlign: 'center'
				},
				message: {
					margin: '0 17px 14px'
				},
				text: {
					margin: 0,
					fontSize: '16px',
					lineHeight: '26px',
					wordBreak: 'break-all',
					color: 'rgba(60,60,60,1)'
				},
				btnWrapperSingle: {
					height: '48px',
					textAlign: 'center',
					borderTop: '1px solid #e2e2e4'
				},
				btnWrapperAll: {
					height: '48px',
					lingHeight: '48px',
					textAlign: 'center',
					borderTop: '1px solid #e2e2e4'
				}
			}, _defineProperty(_style, 'btnWrapperAll', {
				before: {
					content: '',
					height: '100%',
					width: '1px'
				}
			}), _defineProperty(_style, 'btnCancel', {
				width: '50%',
				border: '0',
				background: 'rgba(255,255,255,1)',
				borderRadius: '5px',
				color: '#000',
				fontSize: '17px',
				fontWeight: '700',
				outline: 'none',
				lineHeight: '48px',
				verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			}), _defineProperty(_style, 'btnSure', {
				width: '50%',
				border: '0',
				borderRadius: '5px',
				background: 'rgba(255,255,255,1)',
				color: '#3285ff',
				fontSize: '17px',
				fontWeight: '700',
				outline: 'none',
				lineHeight: '48px',
				verticalAlign: 'top',
				WebkitTapHighlightColor: 'transparent'
			}), _style);
			var btnWrapperName = '';
			var animationClassName = this.state.animationClassName;
			animationClassName = '';
			var title = this.props.isShowTitle ? React.createElement(
				'h1',
				{ style: style.title },
				this.props.title
			) : null;

			return React.createElement(
				'div',
				{ style: style.wrapper, className: animationClassName, ref: 'wrapper', onAnimationEnd: this.animationEnd },
				React.createElement(
					'div',
					{ style: style.innerBox },
					title,
					React.createElement(
						'div',
						{ style: style.message },
						React.createElement(
							'p',
							{ style: style.text },
							this.props.message
						)
					),
					React.createElement(
						'div',
						{ className: 'two-btn-wrapper' },
						React.createElement('input', { type: 'button', ref: 'cancel', value: this.props.btnCancel, style: style.btnCancel, onTouchStart: this.btnTouchClose }),
						React.createElement('input', { type: 'button', ref: 'sure', value: this.props.btnSure, style: style.btnSure, onTouchStart: this.btnTouchClose })
					)
				)
			);
		}
	});

	exports.default = Alert;
	//                      

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _Echarts = __webpack_require__(12);

	var _Calendar = __webpack_require__(15);

	var _fun = __webpack_require__(13);

	var _TimeSelect = __webpack_require__(16);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ben on 2017/2/27.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	// import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};

	// 创建React组件

	var CheckGraph = function (_BaseComponent) {
	    _inherits(CheckGraph, _BaseComponent);

	    function CheckGraph(props) {
	        _classCallCheck(this, CheckGraph);

	        var _this = _possibleConstructorReturn(this, (CheckGraph.__proto__ || Object.getPrototypeOf(CheckGraph)).call(this, props));

	        _this.state = {
	            mode: 0,
	            selectshow: false,
	            requestCount: 0
	        };
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '实时功率', setNavRightBtnHiden: 1 }));
	        //Actions.local();
	        //Store.listen((data)=>this.setState(data)); // 监听Store
	        _this.listenStore(_Store.Store);
	        _this.dataSelect = _this.dataSelect.bind(_this);
	        _this.submitClock = _this.submitClock.bind(_this);
	        _this.cancelClock = _this.cancelClock.bind(_this);
	        _this.getRequstPowerList = _this.getRequstPowerList.bind(_this);
	        return _this;
	    }

	    _createClass(CheckGraph, [{
	        key: 'getRequstPowerList',
	        value: function getRequstPowerList(CurrentSelect) {
	            var _this2 = this;

	            var selectDate = '';
	            //console.log('步骤2');
	            if (CurrentSelect != undefined) {
	                (function () {
	                    selectDate = CurrentSelect.replace('年', '-');
	                    selectDate = selectDate.replace('月', '-');
	                    selectDate = selectDate.replace('日', '');
	                    //console.log('替换的选择日期',selectDate);
	                    var that = _this2;
	                    /*请求冰箱功率的列表
	                    返回结果:
	                     {"code": 0,"data": [{"avgPower":70,"createTime":"2017-02-23 08:35"}]}
	                     */
	                    het.get('/v1/app/customization/fridge/hetFridge/getPowerList', { 'date': selectDate, 'deviceId': _this2.state.deviceId }, function (e) {
	                        //console.log("成功",e);
	                        var dataArr = JSON.parse(e).data;
	                        var powerArr = [];
	                        var _powerlist = [];
	                        var _maxPower = '0';
	                        var _maxPowerTime = '00:00';
	                        var _minPower = '0';
	                        var _minPowerTime = '00:00';
	                        if (dataArr.length > 0) {
	                            for (var i = 0; i < dataArr.length; i++) {

	                                //chart  功率的数值数组
	                                powerArr.push(dataArr[i].avgPower);

	                                //chart 功率的时间数组
	                                //let tiemArr = dataArr[i].createTime.split(" ");
	                                //_powerlist.push(tiemArr[1]);


	                                //let createdddTime = Funs.dateFormat(dataArr[i].createTime,' yyyy-MM-dd hh:mm ',true);
	                                //
	                                //_powerlist.push(createdddTime);
	                                var ddddd = dataArr[i].createTime;
	                                var createdddTime = _fun.Funs.dateFormat(ddddd, 'yyyy-MM-dd hh:mm', true);
	                                createdddTime = createdddTime.split(" ")[1];
	                                _powerlist.push(createdddTime);
	                                //console.log('createdddTime',createdddTime,'原来的时间',ddddd);
	                            }
	                            //console.log('1. powerlist/powerArr',_powerlist,powerArr);

	                            //最大功率   具体时间
	                            _maxPower = Math.max.apply(null, powerArr);
	                            var _maxPowerIndex = powerArr.indexOf(_maxPower);
	                            _maxPowerTime = dataArr[_maxPowerIndex].createTime;
	                            if (_maxPowerTime.length > 5) {
	                                if (_maxPowerTime.split(" ").length == 2) {
	                                    _maxPowerTime = _fun.Funs.dateFormat(_maxPowerTime, 'yyyy-MM-dd hh:mm', true);
	                                    _maxPowerTime = _maxPowerTime.split(" ")[1];
	                                }
	                            }

	                            //最小功率   具体时间
	                            _minPower = Math.min.apply(null, powerArr);
	                            var _minPowerIndex = powerArr.indexOf(_minPower);
	                            _minPowerTime = dataArr[_minPowerIndex].createTime;
	                            //_minPowerTime =( _minPowerTime.split(" "))[1];
	                            //console.log("_minPowerTime 之前",_minPowerTime);
	                            if (_minPowerTime.length > 5) {
	                                if (_minPowerTime.split(" ").length == 2) {
	                                    _minPowerTime = _fun.Funs.dateFormat(_minPowerTime, 'yyyy-MM-dd hh:mm', true);
	                                    _minPowerTime = _minPowerTime.split(" ")[1];
	                                }
	                            }
	                        }

	                        //{value:['2016/12/18 6:38:08', 80]},dataArr "data": [{"avgPower":70,"createTime":"2017-02-23 08:35"}]

	                        //console.log("输出的值",_maxPower,_maxPowerTime,_minPower,_minPowerTime);
	                        that.setState({ "maxPower": _maxPower, "maxPowerTime": _maxPowerTime, "minPower": _minPower, "minPowerTime": _minPowerTime, "powerArr": [_powerlist, powerArr] });

	                        //console.log("最大的值",Math.max.apply(null, powerArr),powerArr.indexOf(Math.max.apply(null, powerArr)));
	                    }, function (e) {
	                        console.log("失败", e);
	                    });
	                })();
	            }
	        }
	    }, {
	        key: 'dataSelect',
	        value: function dataSelect() {
	            //console.log('日期选择');
	            this.setState({
	                selectshow: true
	            });
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            //未传任何参数，trigger返回一个假值，关闭控件
	            _Actions.Actions.cancelSelect();
	            //console.log('关闭')
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            //传入选择控件选中的小时数组和分钟数组
	            //let where = this.state.boot;
	            var selectMode = this.state.function;
	            //Actions.submitSelect(h,m,where,selectMode);
	            //console.log('选中的值',h,m);
	            this.setState({
	                selectshow: false,
	                selectData: m

	            });
	            //var myDate = new Date();
	            //var mytime=myDate.toLocaleTimeString(); //获取当前时间
	            //console.log('当前事件',myDate.toLocaleString()); //获取日期与时间  当前事件 2017年3月1日 GMT+8 16:14:05
	            this.getRequstPowerList(m);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //console.log('步骤1');
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'nav ios' : 'nav android';
	            if (this.state.deviceId != null && this.state.requestCount == 0) {
	                this.state.requestCount = 1;
	                //console.log('进入加载流程  ',this.state.deviceId);
	                var _date = new Date();
	                var _year = _date.getFullYear();
	                var _month = _date.getMonth() + 1;
	                var _day = _date.getDate();
	                this.getRequstPowerList(_year + '年' + _month + '月' + _day + '日');
	            }

	            var selectshow = this.state.selectshow ? this.state.selectshow : false;
	            var maxTime = 100;
	            var minTime = 10;
	            //alert(year+'年'+month+'月'+day+'日 '+hour':'+minute+':'+second)
	            var date = new Date();
	            var year = date.getFullYear();
	            var month = date.getMonth() + 1;
	            var day = date.getDate();
	            var today = this.state.selectData || year + '年' + month + '月' + day + '日';

	            var maxPower = this.state.maxPower || 0;
	            var maxPowerTime = this.state.maxPowerTime || '05:00';
	            var minPower = this.state.minPower || 0;
	            var minPowerTime = this.state.minPowerTime || '15:00';

	            var powerArr = this.state.powerArr || [];
	            //console.log("输产品出的值",powerlist.length);

	            //console.log("输产品出的值",this.state.maxPower,this.state.maxPowerTime,this.state.minPower,this.state.minPowerTime);

	            return React.createElement(
	                'section',
	                { className: 'checkGraph-page' },
	                React.createElement('nav', { className: navigation }),
	                React.createElement(
	                    'div',
	                    { className: 'downView' },
	                    React.createElement(
	                        'div',
	                        { className: 'textContent flex' },
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'div',
	                                { className: 'flexCell-center' },
	                                React.createElement(
	                                    'h5',
	                                    { style: { fontSize: '1.5rem', color: '#969696', textAlign: 'center' } },
	                                    '\u6700\u9AD8'
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { style: { textAlign: 'center', position: 'relative', top: '0' } },
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '6rem', color: '#717171' } },
	                                        maxPower
	                                    ),
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '2rem', color: '#717171' } },
	                                        'W'
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { style: { textAlign: 'center', position: 'relative' } },
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '1.5rem', color: '#969696' } },
	                                        '\u65F6\u95F4 :'
	                                    ),
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '1.5rem', color: '#969696' } },
	                                        maxPowerTime
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'flex-cell' },
	                            React.createElement(
	                                'div',
	                                { className: 'flexCell-center' },
	                                React.createElement(
	                                    'h5',
	                                    { style: { fontSize: '1.5rem', color: '#969696', textAlign: 'center' } },
	                                    '\u6700\u4F4E'
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { style: { textAlign: 'center' } },
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '6rem', color: '#717171' } },
	                                        minPower
	                                    ),
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '2rem', color: '#717171' } },
	                                        'W'
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { style: { textAlign: 'center' } },
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '1.5rem', color: '#969696' } },
	                                        '\u65F6\u95F4 :'
	                                    ),
	                                    React.createElement(
	                                        'i',
	                                        { style: { fontSize: '1.5rem', color: '#969696' } },
	                                        minPowerTime
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'GraphChart' },
	                        React.createElement(_Echarts.Echarts, { powerArr: powerArr })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'dataSelect', onClick: this.dataSelect },
	                        React.createElement('i', { className: 'dataText' }),
	                        today
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, {
	                    show: selectshow,
	                    title: '日期选择',
	                    statusshow: 0,

	                    hourshow: false,
	                    hourstep: 1,
	                    hourunit: '小时',
	                    minhour: 1,
	                    maxhour: 8,

	                    minuteshow: true,
	                    minutestep: 15,
	                    minuteunit: '分钟'
	                    //minminute ={minTime}//minminuteSelect
	                    //maxmin={maxTime}


	                    , cancelClock: this.cancelClock,
	                    submitClock: this.submitClock,
	                    hourarray: [0],
	                    ArrayInit: true,
	                    statusname: '开启'
	                })
	            );
	        }
	    }]);

	    return CheckGraph;
	}(_BaseComponentClass.BaseComponent);
	//<Echarts timelist={this.state.timeArray} templist={this.state.tempArray}/>
	//<div className = "GraphChart"></div>
	//<div className = "dataSelect"></div>


	exports.default = CheckGraph;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 图表组件
	 * @prop {array} timelist  x轴时间值
	 * @prop {array} templist  y轴温度值
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Echarts = undefined;

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(13);

	var Echarts = exports.Echarts = React.createClass({
	    displayName: 'Echarts',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement('section', { className: 'flex chart-container', id: 'chart', ref: 'chart' });
	    },
	    componentDidMount: function componentDidMount() {
	        //加载完后,调用一次
	        var _this = this;
	        var nextProps = this.props;
	        this.drawChart(nextProps);
	    },
	    drawChart: function drawChart(nextProps) {
	        console.log('重新绘图');
	        var powerArr = nextProps.powerArr,
	            chartDom = ReactDOM.findDOMNode(this.refs.chart); // dom节点
	        //console.log('2 powerlist/powerArr',powerArr);
	        var powerTime = powerArr[0];
	        var powerValue = powerArr[1];

	        // 基于准备好的dom，初始化echarts实例
	        var myChart = echarts.init(chartDom),
	            options = {
	            title: {
	                text: '功率 (w)'
	            },
	            tooltip: {
	                trigger: 'axis',
	                position: function position(point, params, dom, rect) {
	                    var xbi = point[0];
	                    if (point[0] > 206) {
	                        xbi -= 100;
	                    }
	                    // 固定在顶部
	                    //console.log('point 0 ',point[0]);
	                    return [xbi, ''];
	                },
	                padding: 10,
	                confine: 'true'
	            },
	            xAxis: {
	                type: 'category',
	                boundaryGap: false,
	                //['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
	                data: powerTime || []
	            },
	            yAxis: {
	                type: 'value',
	                axisLabel: {
	                    formatter: '{value}'
	                }
	            },
	            series: [{
	                name: '用电量',
	                type: 'line',
	                smooth: true,
	                //[30, 28, 25, 26, 27, 30, 55, 50, 40, 39, 38, 39, 40, 50, 60, 75, 80, 70, 60, 40]
	                data: powerValue || []
	            }]
	        };

	        // 绘制图表
	        myChart.setOption(options);
	    },
	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        //console.log('nextProps.powerArr',this.props.powerArr,this.isEmpty(nextProps.powerArr));
	        if (nextProps.powerArr != this.props.powerArr && !this.isEmpty(nextProps.powerArr)) {
	            console.log("重新进入了timearrInit");
	            this.drawChart(nextProps);
	        }
	    },
	    isEmpty: function isEmpty(value) {
	        return Array.isArray(value) && value.length === 0 || Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0;
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(14);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 日历组件
	 * @prop {obj} getdata  请求接口需要传的参数
	 * 
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Clndr = undefined;

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(13);

	'use strict';
	var Clndr = exports.Clndr = React.createClass({
	    displayName: 'Clndr',

	    getInitialState: function getInitialState() {
	        return { datelist: [], dt: '' };
	    },

	    render: function render() {
	        return React.createElement('div', { className: 'calendar-wrap', ref: 'calendar' });
	    },
	    //componentDidMount:function(){
	    //    let _this = this;
	    //    setTimeout(function(){
	    //        var datelist=[];
	    //        let data =_this.state.dt,
	    //            url='/v1/app/chealth/thermometer/getThermometerByDate',
	    //            newmonth=Funs.dateFormatFull(new Date().getTime()/1000,'month');
	    //        if(data!=''){
	    //            data.date=newmonth;
	    //            het.get(url,data,sucCallback,function(dd){console.log(dd)});
	    //            function sucCallback(dd){
	    //                console.log(dd);
	    //            let data=JSON.parse(dd),
	    //                date=data.data;
	    //            if(date!=''){
	    //                 for (var i in date)
	    //                {
	    //                    /*let day=Funs.dateFormatFull(data[i].date,"day");时间戳处理*/
	    //                    let day= Number(date[i].date.substring(8,11));
	    //                    datelist.push(day);
	    //                }
	    //            }
	    //
	    //            new Calendar({
	    //                target:'.calendar-wrap',
	    //                className: 'cal',
	    //                tagDates:datelist,
	    //                 //tagDates:[9,15],
	    //                'showToday': true,
	    //                onSelect: _this.selectDate,
	    //                onChangeMonthBefore: function (dateObj) {
	    //                    _this.getTagDates(dateObj);
	    //                },
	    //                onToday: function (dateObj) {
	    //                    //alert(dateObj.type);
	    //                    _this.getTagDates(dateObj);
	    //                    _this.selectDate(dateObj);
	    //                }
	    //                });
	    //            }
	    //        }
	    //    },500);
	    //},
	    componentDidMount: function componentDidMount() {
	        var _this = this;
	        setTimeout(function () {
	            var datelist = [];
	            var data = _this.state.dt,
	                url = '/v1/app/chealth/thermometer/getThermometerByDate',
	                newmonth = _fun.Funs.dateFormatFull(new Date().getTime() / 1000, 'month');
	            new Calendar({
	                target: '.calendar-wrap',
	                className: 'cal',
	                tagDates: datelist,
	                //tagDates:[9,15],
	                'showToday': true,
	                onSelect: _this.selectDate,
	                onChangeMonthBefore: function onChangeMonthBefore(dateObj) {
	                    _this.getTagDates(dateObj);
	                },
	                onToday: function onToday(dateObj) {
	                    alert(dateObj.type);
	                    _this.getTagDates(dateObj);
	                    _this.selectDate(dateObj);
	                }
	            });
	        }, 500);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({ dt: nextProps.getdata });
	    },
	    selectDate: function selectDate(dateObj, e) {
	        var day = dateObj.date > 9 ? dateObj.date : '0' + dateObj.date,
	            month = dateObj.month > 9 ? dateObj.month : '0' + dateObj.month,
	            newdate = dateObj.year + '-' + month + '-' + day,
	            data = this.state.dt;
	        _Actions.Actions.changeDate(newdate, data);
	    },
	    getTagDates: function getTagDates(dateObj) {
	        var datelist = [];
	        var _this = this;
	        var data = _this.state.dt;
	        var url = '/v1/app/chealth/thermometer/getThermometerByDate';
	        var type = dateObj.type,
	            month = dateObj.month,
	            year = dateObj.year,
	            newMonth = type === 'pre' ? month - 1 : type === 'today' ? month : month + 1,
	            trueMonth = newMonth > 9 ? newMonth : '0' + newMonth;
	        console.log(type, trueMonth);
	        if (data != '') {
	            var sucCallback = function sucCallback(dd) {
	                //console.log(dd);
	                var data = JSON.parse(dd),
	                    date = data.data;
	                if (date != '') {
	                    for (var i in date) {
	                        /*let day=Funs.dateFormatFull(data[i].date,"day");时间戳处理*/
	                        var day = Number(date[i].date.substring(8, 11));
	                        datelist.push(day);
	                    }
	                }
	                dateObj.tag(datelist);
	            };

	            data.date = year + '-' + trueMonth;
	            het.get(url, data, sucCallback, function (dd) {
	                console.log(dd);
	            });
	        }
	    }

	});

/***/ },
/* 16 */
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
	 * @prop {number} defaulthour 默认选中的小时(默认值为0) !!不要设置为取值范围(minhour-maxhour)外的值
	 * @prop {number} defaultminute 默认选中的分钟(默认值为0) !!不要设置为取值范围(0-59)外的值
	 * @prop {number} maxhour 可选的最大小时(默认值为23)
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
			var maxminute = parseInt(next.maxmin) || 60;
			var minminute = parseInt(next.minminute) || 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			for (var j = 0; j <= maxlength2; j++) {
				var _value = minminute + j * minutestep;
				_value = _value < 10 ? '0' + _value : _value;
				minutearr.push(_value);
			}
			if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
			//modify by Kalen
			var dataArr = [];
			for (var _i = 0; _i < 7; _i++) {
				var date = new Date();
				date.setDate(date.getDate() - _i); //获取AddDayCount天后的日期
				var y = date.getFullYear();
				var m = date.getMonth() + 1; //获取当前月份的日期
				var d = date.getDate();
				var dataContent = y + "年" + m + "月" + d + "日";
				dataArr.push(dataContent);
			}

			this.setState({
				minutearr: dataArr,
				minutetime: minminute
				//minutearr:[2,6,8,9],
				//minutetime:2
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
			//console.log("hourstep,minhour,maxhour,ArrayInit",next.hourstep!=this.props.hourstep , next.minhour!=this.props.minhour , next.maxhour!=this.props.maxhour , next.ArrayInit===true);
			//更新时间可选值数组
			//||next.minminute!=this.props.minminute||next.maxmin!=this.props.maxmin
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.ArrayInit === true) {
				//console.log("重新进入了timearrInit");
				this.timearrInit(next);
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
				var hourValue = this.state.hourarr[0];
				var minuteValue = this.state.minutearr[0];
				var me = this;
				me.setState({
					hourtime: hourValue,
					minutetime: minuteValue,
					hourindex: 0,
					minuteindex: 0
				});
			} else {
				console.log('error:the cancel callback is not a function');
			}
		},
		submitclock: function submitclock(e) {
			//确认提交时间
			console.log('hhhhhhhhhhhhhhhhhhhhhhhhh');
			if (typeof this.props.submitClock === 'function') {
				console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwww');
				if (this.state.minutetime == 0) {
					this.props.submitClock(this.state.hourtime, this.state.minutearr[0]);
				} else {
					this.props.submitClock(this.state.hourtime, this.state.minutetime);
				}

				//console.log('minutearr',this.state.minutearr);
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
			var hourunit = this.props.hourunit || '时';
			//let minuteunit = this.props.minuteunit || '分';
			var minuteunit = '';
			minuteindex = hourindex == 14 ? 0 : minuteindex;
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
								'电炖锅将在'
							),
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 38 + '%' : 56 + '%', display: hourshow ? 'inline-block' : 'none' } },
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
								'后结束' || statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 30 + '%' : 45 + '%', display: hourshow ? 'block' : 'none' } },
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
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? 'block' : 'none', left: hourshow ? 58 + '%' : 33 + '%' } },
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

	/*
	 <section className='timetext'>
	 <span style={{left:4+'%'}} className={statusshow?'status show':'status'}>{'电炖锅将在'}</span>
	 <span className='hour' style={{left:minuteshow?38+'%':56+'%',display:hourshow?'inline-block':'none'}}>{hourunit}</span>
	 <span className='minute' style={{display:minuteshow?'inline-block':'none',left:hourshow?66+'%':53+'%'}}>{minuteunit}</span>
	 <span className={statusshow?'status show':'status'}>{'后结束'||statusname}</span>
	 </section>
	 */

/***/ }
/******/ ]);