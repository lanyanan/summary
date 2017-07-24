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
	        if (data.deviceId != undefined) appData.deviceId = data.deviceId;

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
	        if (data.FailureOfRefrigerant != undefined && data.FailureOfRefrigerant != 0) errorArr.push('data.FailureOfRefrigerant');
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
	                    console.log('用电量告警 ', stateData);
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
	                    console.log('state', stateData);
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

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.appCheckGraph = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

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

	var appCheckGraph = exports.appCheckGraph = function (_BaseComponent) {
	    _inherits(appCheckGraph, _BaseComponent);

	    function appCheckGraph(props) {
	        _classCallCheck(this, appCheckGraph);

	        var _this = _possibleConstructorReturn(this, (appCheckGraph.__proto__ || Object.getPrototypeOf(appCheckGraph)).call(this, props));

	        _this.state = {
	            mode: 0
	        };
	        //Actions.local();
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _this.mySwiper;
	        return _this;
	    }

	    _createClass(appCheckGraph, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.mySwiper = new Swiper('.swiper-container', {
	                pagination: '.swiper-pagination',
	                paginationClickable: true
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'h1',
	                null,
	                'this is Router1'
	            );
	        }
	    }]);

	    return appCheckGraph;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);