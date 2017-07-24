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

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */
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
	'getData', // 获取数据
	'sendRst', // l滤芯复位
	'getWaterStat']);

/***/ },
/* 3 */
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

	var _Actions = __webpack_require__(2);

	var _CmdItem = __webpack_require__(4);

	var _ErrItem = __webpack_require__(5);

	var AppData = {
	    'networkavailable': 1,
	    'online': 1
	};

	// 数据过滤计时器
	var dataFilterTimers = {
	    MachineOperationState: 0
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

	function isoutData(data) {
	    return data != undefined && parseInt(data) >= 0 && parseInt(data) <= 100;
	}

	function isErr(data) {
	    return data != undefined && parseInt(data) == 1;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {
	        //区分运行数据肯控制数据
	        var data = dataFilter(datas);
	        //console.log("onRepaint data====>"+JSON.stringify(data));
	        //设备id
	        if (!!data.deviceId) AppData.deviceId = data.deviceId;
	        //断网离线
	        if (!!data.online) {
	            AppData.online = data.online;
	        }
	        if (!!data.networkavailable) {
	            parseInt(data.networkavailable) == 2 ? het.toast('当前网络不可用，请检查你的网络') : '';
	            AppData.networkavailable = data.networkavailable;
	        }
	        //运行数据
	        if (data.MachineOperationState != undefined) AppData.MachineOperationState = data.MachineOperationState; //设备运行状态
	        // 原水数据
	        if (data.SourceWaterTds != undefined) AppData.SourceWaterTds = data.SourceWaterTds; //原水TDS值
	        if (data.SourceWaterTotal != undefined) AppData.SourceWaterTotal = data.SourceWaterTotal; //源水总量
	        if (data.SourceWaterTemprature != undefined) AppData.SourceWaterTemprature = data.SourceWaterTemprature; //源水水温
	        if (data.SourceSpectrumTOC != undefined) AppData.SourceSpectrumTOC = data.SourceSpectrumTOC; //光谱源水TOC
	        if (data.SourceSpectrumCOD != undefined) AppData.SourceSpectrumCOD = data.SourceSpectrumCOD; //光谱源水COD
	        if (data.SourceSpectrumColor != undefined) AppData.SourceSpectrumColor = data.SourceSpectrumColor; //光谱源水色度
	        if (data.SourceSpectrumTurbidity != undefined) AppData.SourceSpectrumTurbidity = data.SourceSpectrumTurbidity; //光谱源水浊度
	        if (data.SourceSpectrumTemprature != undefined) AppData.SourceSpectrumTemprature = data.SourceSpectrumTemprature; //光谱源水温度
	        // 纯水数据
	        if (data.PureWaterTds != undefined) AppData.PureWaterTds = data.PureWaterTds; //纯水TDS值
	        if (data.PureWaterTotal != undefined) AppData.PureWaterTotal = data.PureWaterTotal; //纯水总量
	        if (data.PureSpectrumTOC != undefined) AppData.PureSpectrumTOC = data.PureSpectrumTOC; //光谱纯水TOC
	        if (data.PureSpectrumCOD != undefined) AppData.PureSpectrumCOD = data.PureSpectrumCOD; //光谱纯水COD
	        if (data.PureSpectrumColor != undefined) AppData.PureSpectrumColor = data.PureSpectrumColor; //光谱纯水色度
	        if (data.PureSpectrumTurbidity != undefined) AppData.PureSpectrumTurbidity = data.PureSpectrumTurbidity; //光谱纯水浊度
	        if (data.PureSpectrumTemprature != undefined) AppData.PureSpectrumTemprature = data.PureSpectrumTemprature; //光谱纯水温度
	        //控制数据

	        //滤芯
	        var FilterItems = [];
	        if (isoutData(data.UFFilterLife)) FilterItems.push(new _CmdItem.CmdItem(1, "中空纤维超滤膜滤芯", "UF", data.UFFilterLife, 10));
	        if (isoutData(data.ROFilterLife)) FilterItems.push(new _CmdItem.CmdItem(2, "反渗透膜滤芯", "RO", data.ROFilterLife, 10));
	        if (isoutData(data.KLJXYKHXTFilterLife)) FilterItems.push(new _CmdItem.CmdItem(3, "颗粒精洗椰壳活性炭滤芯", "KLJXYKHXT", data.KLJXYKHXTFilterLife, 10));
	        if (isoutData(data.CTOFilterLife)) FilterItems.push(new _CmdItem.CmdItem(4, "块状烧结活性炭滤芯", "CTO", data.CTOFilterLife, 10));
	        if (isoutData(data.PPFilterLife)) FilterItems.push(new _CmdItem.CmdItem(5, "PP棉滤芯", "PP", data.PPFilterLife, 10));
	        if (isoutData(data.KDFFilterLife)) FilterItems.push(new _CmdItem.CmdItem(6, "KDF滤芯", "KDF", data.KDFFilterLife, 10));
	        if (isoutData(data.MFSFilterLife)) FilterItems.push(new _CmdItem.CmdItem(7, "麦饭石滤芯", "MFS", data.MFSFilterLife, 10));
	        if (isoutData(data.TCFilterLife)) FilterItems.push(new _CmdItem.CmdItem(8, "陶瓷滤芯", "TC", data.TCFilterLife, 10));
	        if (isoutData(data.YHWKHSFilterLife)) FilterItems.push(new _CmdItem.CmdItem(9, "远红外矿化球滤芯", "YHWKHS", data.YHWKHSFilterLife, 10));
	        if (isoutData(data.HZHXTFilterLife)) FilterItems.push(new _CmdItem.CmdItem(10, "后置活性炭", "HZHXT", data.HZHXTFilterLife, 10));
	        if (isoutData(data.FLZNLQFilterLife)) FilterItems.push(new _CmdItem.CmdItem(11, "负离子能量球滤芯", "FLZNLQ", data.FLZNLQFilterLife, 10));
	        if (isoutData(data.RHFilterLife)) FilterItems.push(new _CmdItem.CmdItem(12, "软化滤芯", "RH", data.RHFilterLife, 10));
	        if (isoutData(data.CHFilterLife)) FilterItems.push(new _CmdItem.CmdItem(13, "磁化滤芯", "CH", data.CHFilterLife, 10));
	        if (isoutData(data.GLJFilterLife)) FilterItems.push(new _CmdItem.CmdItem(14, "硅磷精滤芯", "GLJ", data.GLJFilterLife, 10));
	        if (isoutData(data.SYSFilterLife)) FilterItems.push(new _CmdItem.CmdItem(15, "石英砂滤芯", "SYS", data.SYSFilterLife, 10));
	        if (isoutData(data.MSFilterLife)) FilterItems.push(new _CmdItem.CmdItem(16, "锰沙滤芯", "MS", data.MSFilterLife, 10));
	        if (data.UFFilterLife) AppData.FilterLists = FilterItems;

	        //故障数据
	        var ErrItems = [];
	        if (isErr(data.RTCLowVoltage)) ErrItems.push(new _ErrItem.ErrItem(1, "RTC电池低压"));
	        if (isErr(data.FlowMeter1Fault)) ErrItems.push(new _ErrItem.ErrItem(2, "流量计1异常"));
	        if (isErr(data.FlowMeter2Fault)) ErrItems.push(new _ErrItem.ErrItem(3, "流量计2异常"));
	        if (isErr(data.LowWaterPressureFault)) ErrItems.push(new _ErrItem.ErrItem(4, "低水压异常"));
	        if (isErr(data.ForgetCloseWaterFault)) ErrItems.push(new _ErrItem.ErrItem(5, "忘记关水"));
	        if (isErr(data.HighPressureSwitchFault)) ErrItems.push(new _ErrItem.ErrItem(6, "高压开关故障"));
	        if (isErr(data.MachineLeakWaterFault)) ErrItems.push(new _ErrItem.ErrItem(7, "机器漏水故障"));
	        if (isErr(data.TapLeakWaterFault)) ErrItems.push(new _ErrItem.ErrItem(8, "逆止阀漏水或水龙头漏水"));
	        if (isErr(data.SolenoidValve1Fault)) ErrItems.push(new _ErrItem.ErrItem(9, "电磁阀K1故障"));
	        if (isErr(data.SolenoidValve2Fault)) ErrItems.push(new _ErrItem.ErrItem(10, "电磁阀K2故障"));
	        if (isErr(data.SolenoidValve3Fault)) ErrItems.push(new _ErrItem.ErrItem(11, "电磁阀K3故障"));
	        if (isErr(data.SolenoidValve4Fault)) ErrItems.push(new _ErrItem.ErrItem(12, "电磁阀K4故障"));
	        if (isErr(data.SolenoidValve5Fault)) ErrItems.push(new _ErrItem.ErrItem(13, "电磁阀K5故障"));
	        if (isErr(data.BoosterPumpFault)) ErrItems.push(new _ErrItem.ErrItem(14, "增压泵故障"));
	        if (isErr(data.MCUStorageFault)) ErrItems.push(new _ErrItem.ErrItem(15, "MCU读写EEPROM或FLASH错误"));
	        if (isErr(data.WifiStorageFault)) ErrItems.push(new _ErrItem.ErrItem(16, "Wifi读写EEPROM或FLASH错误"));
	        if (isErr(data.WifiMcuComFault)) ErrItems.push(new _ErrItem.ErrItem(17, "WIFI与MCU通讯故障"));
	        if (data.RTCLowVoltage != undefined) AppData.Errs = ErrItems;
	        this.trigger(AppData);
	    },
	    onGetData: function onGetData() {
	        //console.log("AppData="+JSON.stringify(AppData));
	        this.trigger(AppData);
	    },
	    onSendRst: function onSendRst(cmdRest) {
	        //console.log("cmdRest sendCmd="+JSON.stringify(cmdRest.sendCmd));
	        het.send(cmdRest.sendCmd, function (data) {
	            //console.log('成功');
	            het.toast('滤芯复位成功');
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onGetWaterStat: function onGetWaterStat() {
	        var _this = this;

	        var url = '/v1/app/clife/hetWater/getWaterStat';
	        var params = {
	            "deviceId": AppData.deviceId,
	            "statType": '1',
	            "fields": 'SourceWaterTds,PureWaterTds,SourceWaterTotal,PureWaterTotal,CleanWaterTotal'
	        };
	        var sucCallBack = function sucCallBack(success) {
	            var successParse = JSON.parse(success);
	            //console.log('data =' + JSON.stringify(successParse.data));
	            if (successParse.code == 0) {
	                _this.trigger({
	                    showLoad: 1,
	                    waterlines: successParse.data
	                });
	            } else {
	                _this.trigger({
	                    showLoad: 2
	                });
	                het.toast('请求异常');
	            }
	        };
	        var errCallback = function errCallback(fail) {
	            _this.trigger({
	                showLoad: 2
	            });
	            het.toast('请求失败~');
	        };
	        if (AppData.deviceId == undefined) {
	            this.trigger({
	                showLoad: 3
	            });
	        } else {
	            het.get(url, params, sucCallBack, errCallback);
	        }
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by liuzh on 2016-11-14.
	 * id h5添加标签使用
	 * nameFilter 滤芯名字
	 * JdFilter 滤芯名字简称
	 * lifeTime 剩余寿命 %
	 * coefficient 寿命百分比换算天数的 系数
	 * sendCmd 滤芯复位的参数
	 */
	var CmdItem = exports.CmdItem = function CmdItem(id, nameFilter, JdFilter, lifeTime, coefficient) {
	    _classCallCheck(this, CmdItem);

	    this.id = id || 1, this.nameFilter = nameFilter || "", this.JdFilter = JdFilter || "", this.lifeTime = lifeTime || '0', this.coefficient = coefficient || 10, this.items = [{ UFReset: "01", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(4, 1, 6) }, { UFReset: "00", ROFilterReset: "01", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(5, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "01", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(6, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "01", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(7, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "01",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(8, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "01", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(9, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "01", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(10, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "01", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(11, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "01", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(12, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "01",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(13, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "01", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(14, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "01", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(15, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "01", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(16, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "01", SYSFilterReset: "00",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(17, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "01",
	        MSFilterReset: "00", updateFlag: het.hexUpFlag(18, 1, 6) }, { UFReset: "00", ROFilterReset: "00", KLJXYKHXTFilterReset: "00", CTOFilterReset: "00", PPFilterReset: "00",
	        KDFFilterReset: "00", MFSFilterReset: "00", TCFilterReset: "00", YHWKHSFilterReset: "00", HZHXTFilterReset: "00",
	        FLZNLQFilterReset: "00", RHFilterReset: "00", CHFilterReset: "00", GLJFilterReset: "00", SYSFilterReset: "00",
	        MSFilterReset: "01", updateFlag: het.hexUpFlag(19, 1, 6) }];
	    this.sendCmd = this.items[id - 1];
	};

	;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by liuzh on 2016-11-14.
	 * id h5添加标签使用
	 */
	var ErrItem = exports.ErrItem = function ErrItem(id, errString) {
	    _classCallCheck(this, ErrItem);

	    this.id = id || 1, this.errString = errString || "";
	};

	;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _SwiperIndex = __webpack_require__(9);

	var _SwiperSend = __webpack_require__(10);

	var _Wave = __webpack_require__(11);

	var _TdsInfo = __webpack_require__(12);

	var _CurveModel = __webpack_require__(13);

	var _DialogStyle = __webpack_require__(21);

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

	        het.setTitle(JSON.stringify({ setNavTitle: 0, setNavRightBtnHiden: 0 }));
	        _this.oldErrItems = [];
	        _this.state = {
	            showdialogC: false,
	            showdiaFilter: {}
	        };
	        _this.listenStore(_Store.Store);
	        _this.canceldia = function () {
	            _this.setState({
	                showdialogC: false
	            });
	        };
	        _this.submitdia = function () {
	            _this.setState({
	                showdialogC: false
	            });
	            _Actions.Actions.sendRst(_this.state.showdiaFilter);
	        };
	        _this.canceldiaerr = function () {
	            _this.setState({
	                diaErrShow: 1
	            });
	        };
	        _this.submitdiaerr = function () {
	            location.href = "tel:0755-26727188";
	            _this.setState({
	                diaErrShow: 1
	            });
	        };
	        _Actions.Actions.getData();
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'showDialog',
	        value: function showDialog(filter) {
	            //console.log("---this.state.online----" + this.state.online);
	            if ((parseInt(this.state.online) || 1) == 2) {
	                het.toast('设备未连接');return;
	            }
	            if ((parseInt(this.state.networkavailable) || 1) == 2) {
	                het.toast('网络异常,请检查网络是否连接正常!');return;
	            }
	            this.setState({
	                showdialogC: true,
	                showdiaFilter: filter
	            });
	            //console.log("send filter===>"+JSON.stringify(filter));
	        }
	    }, {
	        key: 'ischangeErr',
	        value: function ischangeErr() {
	            var ErrItems = this.state.Errs || []; //故障列表
	            var olderrs = this.oldErrItems;
	            if (ErrItems.length != olderrs.length) return true;
	            for (var index in olderrs) {
	                var olderr = olderrs[index];
	                var newerr = ErrItems[index];
	                if (olderr.id != newerr.id) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'ischangeErr2',
	        value: function ischangeErr2(olderrs, ErrItems) {
	            if (ErrItems.length != olderrs.length) return true;
	            for (var index in olderrs) {
	                var olderr = olderrs[index];
	                var newerr = ErrItems[index];
	                if (olderr.id != newerr.id) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            //render 之前可以先判断是否改变了
	            var olderrs = this.state.Errs || []; //故障列表
	            var ErrItems = nextState.Errs || [];
	            //故障判断
	            if (this.ischangeErr2(olderrs, ErrItems)) {
	                this.setState({
	                    diaErrShow: 0,
	                    showdialogC: false
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var swiper = new Swiper('.swiper-container', {
	                direction: 'vertical',
	                simulateTouch: true,
	                nextButton: '.arrow2',
	                onSlideChangeEnd: function onSlideChangeEnd(swiper) {
	                    //console.log("swiper.activeIndex = " + swiper.activeIndex);
	                    if (swiper.activeIndex == 0) {
	                        het.setTitle(JSON.stringify({ setNavTitle: 0, setNavRightBtnHiden: 0 }));
	                    } else if (swiper.activeIndex == 1) {
	                        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '滤芯详情', setNavRightBtnHiden: 0 }));
	                    }
	                }
	            });
	            var SourceWater = {
	                SourceWaterTds: parseInt(this.state.SourceWaterTds) || 0,
	                SourceSpectrumTOC: parseInt(this.state.SourceSpectrumTOC) / 100 || 0,
	                SourceSpectrumCOD: parseInt(this.state.SourceSpectrumCOD) / 100 || 0,
	                SourceSpectrumColor: parseInt(this.state.SourceSpectrumColor) / 100 || 0,
	                SourceSpectrumTurbidity: parseInt(this.state.SourceSpectrumTurbidity) / 100 || 0,
	                SourceWaterTemprature: parseInt(this.state.SourceWaterTemprature || 0)
	            };
	            var PureWater = {
	                PureWaterTds: parseInt(this.state.PureWaterTds) || 0,
	                PureSpectrumTOC: parseInt(this.state.PureSpectrumTOC) / 100 || 0,
	                PureSpectrumCOD: parseInt(this.state.PureSpectrumCOD) / 100 || 0,
	                PureSpectrumColor: parseInt(this.state.PureSpectrumColor) / 100 || 0,
	                PureSpectrumTurbidity: parseInt(this.state.PureSpectrumTurbidity) / 100 || 0
	            };
	            var Filters = this.state.FilterLists || [];

	            var Waterinfo = {
	                SourceWater: SourceWater,
	                PureWater: PureWater,
	                MachineOperationState: parseInt(this.state.MachineOperationState) || 0,
	                online: parseInt(this.state.online) || 0
	            };
	            var selectdiag = this.state.showdialogC || false;
	            var diatitles = "您已经确定更换了滤芯吗？";
	            var ErrItems = this.state.Errs || []; //故障列表
	            var senseError = parseInt(ErrItems.length || 0);
	            var diaErrShow = this.state.diaErrShow || 0; //0 开 1关
	            var selectdiagErro = senseError > 0 && diaErrShow == 0 ? true : false;
	            return React.createElement(
	                'section',
	                { className: 'app-body' },
	                React.createElement(
	                    'section',
	                    { className: 'swiper-container sw2' },
	                    React.createElement(
	                        'section',
	                        { className: 'swiper-wrapper' },
	                        React.createElement(
	                            'section',
	                            { className: 'swiper-slide' },
	                            React.createElement(_SwiperIndex.SwiperIndex, { waterData: Waterinfo, className: 'index_swp' })
	                        ),
	                        React.createElement('section', { className: 'arrow2' }),
	                        React.createElement(
	                            'section',
	                            { className: 'swiper-slide' },
	                            React.createElement(_SwiperSend.SwiperSend, { filters: Filters, changeflr: this.showDialog.bind(this), className: 'index_swp' })
	                        )
	                    )
	                ),
	                React.createElement(_Wave.Wave, null),
	                React.createElement(_DialogStyle.DialogStyle, { show: selectdiag, cancelClock: this.canceldia,
	                    submitClock: this.submitdia,
	                    title: " ", canCel: false, content: diatitles, rightpam: this.state.diaright || '确定' }),
	                React.createElement(_DialogStyle.DialogStyle, { show: selectdiagErro, cancelClock: this.canceldiaerr.bind(this),
	                    submitClock: this.submitdiaerr.bind(this), rightpam: '\u8054\u7CFB\u5BA2\u670D',
	                    title: '\u8BBE\u5907\u6545\u969C', canCel: false, errs: ErrItems })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('和而泰净水器');
	    // 无路由方式
	    //ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/TdsInfo', component: _TdsInfo.TdsInfo }),
	        React.createElement(Route, { path: '/CurveModel', component: _CurveModel.CurveModel })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(8);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 首页
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SwiperIndex = exports.SwiperIndex = function (_React$Component) {
	    _inherits(SwiperIndex, _React$Component);

	    function SwiperIndex(props) {
	        _classCallCheck(this, SwiperIndex);

	        return _possibleConstructorReturn(this, (SwiperIndex.__proto__ || Object.getPrototypeOf(SwiperIndex)).call(this, props));
	    }

	    _createClass(SwiperIndex, [{
	        key: 'handle2Tds',
	        value: function handle2Tds() {
	            location.href = '#/TdsInfo';
	        }
	    }, {
	        key: 'handle2Curve',
	        value: function handle2Curve() {
	            location.href = '#/CurveModel';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var waterInfo = this.props.waterData;
	            var TextWaterTDs = waterInfo.SourceWater.SourceWaterTds + "/" + waterInfo.PureWater.PureWaterTds;
	            var MachineOperationState = waterInfo.MachineOperationState;
	            var online = waterInfo.online;
	            var TextDeviceState = ["设备未连接", "设备待机中", "设备冲洗中", "设备制水中", ""];
	            var TextDevice = online == 2 ? TextDeviceState[0] : MachineOperationState == 0 ? TextDeviceState[1] : MachineOperationState == 1 ? TextDeviceState[2] : MachineOperationState == 2 ? TextDeviceState[3] : TextDeviceState[4];
	            var setMode = MachineOperationState == 1 ? 1 : 0;
	            var error = false;
	            var errorTmp = false;
	            if (waterInfo.SourceWater.SourceWaterTds > 1000 || waterInfo.SourceWater.SourceSpectrumTOC > 5 || waterInfo.SourceWater.SourceSpectrumCOD > 5 || waterInfo.SourceWater.SourceSpectrumColor > 15 || waterInfo.SourceWater.SourceSpectrumTurbidity > 3 || waterInfo.PureWater.PureWaterTds > 1000 || waterInfo.PureWater.PureSpectrumTOC > 5 || waterInfo.PureWater.PureSpectrumCOD > 5 || waterInfo.PureWater.PureSpectrumColor > 15 || waterInfo.PureWater.PureSpectrumTurbidity > 3) {
	                error = true;
	            }
	            if (waterInfo.SourceWater.SourceWaterTemprature > 38 || waterInfo.SourceWater.SourceWaterTemprature < 5 && waterInfo.SourceWater.SourceWaterTemprature != 0) {
	                errorTmp = true;
	            }
	            var TextErr = error ? React.createElement(
	                'p',
	                { style: { color: "#ff632c", fontSize: '1.16rem' } },
	                errorTmp ? "水温&水质异常" : "水质异常"
	            ) : errorTmp ? React.createElement(
	                'p',
	                { style: { color: "#ff632c", fontSize: '1.16rem' } },
	                '\u6C34\u6E29\u5F02\u5E38'
	            ) : "";
	            return React.createElement(
	                'section',
	                { className: 'index_Swp' },
	                React.createElement(
	                    'section',
	                    { className: 'tds_cir' },
	                    React.createElement(
	                        'article',
	                        { onTouchEnd: this.handle2Curve.bind(this) },
	                        React.createElement('img', { src: '../static/img/tongji.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7EDF\u8BA1'
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'out_cir' },
	                        React.createElement('section', { className: MachineOperationState == 1 ? "out_cir_rd" : "" }),
	                        React.createElement(
	                            'section',
	                            { className: 'in_cir' },
	                            React.createElement(
	                                'figure',
	                                null,
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    '\u6E90\u6C34\u6C34\u8D28/\u7EAF\u6C34\u6C34\u8D28 '
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { style: { fontSize: TextWaterTDs.length > 8 ? "3.46rem" : "4.5rem" } },
	                                    TextWaterTDs,
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        'TDS'
	                                    )
	                                ),
	                                React.createElement(
	                                    'p',
	                                    { onTouchEnd: this.handle2Tds.bind(this) },
	                                    '\u70B9\u51FB\u67E5\u770B\u6C34\u8D28\u8BE6\u60C5'
	                                ),
	                                TextErr
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'device_state' },
	                        React.createElement(
	                            'p',
	                            null,
	                            TextDevice
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return SwiperIndex;
	}(React.Component);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 滤芯详情页
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SwiperSend = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Wave = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SwiperSend = exports.SwiperSend = function (_React$Component) {
	    _inherits(SwiperSend, _React$Component);

	    function SwiperSend(props) {
	        _classCallCheck(this, SwiperSend);

	        var _this = _possibleConstructorReturn(this, (SwiperSend.__proto__ || Object.getPrototypeOf(SwiperSend)).call(this, props));

	        _this.state = {
	            activeIndex: 0
	        };
	        return _this;
	    }

	    _createClass(SwiperSend, [{
	        key: 'handle2dig',
	        value: function handle2dig(e) {
	            var activeIndex = this.state.activeIndex || 0;
	            var filters = this.props.filters;
	            var filter = void 0;
	            if (filters.length > 0) filter = filters[activeIndex];
	            if (filter == undefined && activeIndex != 0) {
	                activeIndex = 0;filter = filters[activeIndex];
	            }
	            e.preventDefault();
	            if (typeof this.props.changeflr === 'function') {
	                this.props.changeflr(filters[activeIndex]);
	            }
	            e.stopPropagation(); //取消冒泡
	        }
	    }, {
	        key: 'handleItem',
	        value: function handleItem(e) {
	            var activeIndex = e.target.getAttribute('data-index');
	            this.setState({ activeIndex: activeIndex });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var activeIndex = this.state.activeIndex || 0;
	            var filters = this.props.filters;
	            var filter = void 0;
	            if (filters.length > 0) filter = filters[activeIndex];
	            if (filter == undefined && activeIndex != 0) {
	                activeIndex = 0;filter = filters[activeIndex];
	            }
	            var items = [];
	            for (var index in filters) {
	                if (index > 4) break;
	                var item = filters[index];
	                items.push(React.createElement(
	                    'article',
	                    { className: index == activeIndex ? "flex-cell activ" : "flex-cell", 'data-index': index, key: index, onTouchEnd: this.handleItem.bind(this) },
	                    React.createElement('i', { 'data-index': index, style: { display: parseInt(item.lifeTime) <= 10 ? "" : "none" } }),
	                    React.createElement(
	                        'p',
	                        { 'data-index': index },
	                        item.lifeTime + '%'
	                    ),
	                    React.createElement(
	                        'p',
	                        { 'data-index': index },
	                        item.nameFilter
	                    ),
	                    React.createElement(
	                        'p',
	                        { style: { visibility: "hidden" }, 'data-index': index },
	                        item.JdFilter
	                    )
	                ));
	            }

	            var TextTimeDef = filter != undefined ? filter.nameFilter + "寿命剩余" : "没有发现设备滤芯数据";
	            var TextTime = filter != undefined ? filter.lifeTime + "%" : "";
	            var Textday = filter != undefined ? parseInt(filter.lifeTime) * filter.coefficient + "天" : "";
	            return React.createElement(
	                'section',
	                { className: 'index_Swp' },
	                React.createElement(
	                    'section',
	                    { className: 'tds_cir' },
	                    React.createElement(
	                        'section',
	                        { className: 'sd_1' },
	                        React.createElement('img', { src: '../static/img/ic_dev.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            TextTimeDef,
	                            React.createElement(
	                                'span',
	                                null,
	                                TextTime
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            Textday
	                        ),
	                        React.createElement(
	                            'p',
	                            { style: { display: filter != undefined ? "" : "none" }, onTouchEnd: this.handle2dig.bind(this) },
	                            '\u6EE4\u82AF\u6570\u636E\u91CD\u7F6E'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'sd_swp' },
	                    React.createElement(
	                        'section',
	                        { className: 'flex art' },
	                        items
	                    )
	                )
	            );
	        }
	    }]);

	    return SwiperSend;
	}(React.Component);

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	/**
	 *波浪动画组件
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Wave = exports.Wave = React.createClass({
	    displayName: 'Wave',
	    componentDidMount: function componentDidMount() {
	        var canvas = document.getElementById('waveCanvas');
	        var ctx = canvas.getContext('2d');
	        var leaf = new Image();
	        canvas.width = canvas.parentNode.offsetWidth;
	        canvas.height = canvas.parentNode.offsetHeight / 2;
	        window.requestAnimFrame = function () {
	            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	                window.setTimeout(callback, 1000 / 60);
	            };
	        }();
	        var step = 0;
	        var lines = ["rgba(1,208,255, 1)", "rgba(1,208,255,0.2)", "rgba(1,208,255, 0.4)", "rgba(1,208,255, 0.25)"];
	        function loop() {
	            ctx.clearRect(0, 0, canvas.width, canvas.height);
	            step++;

	            //画3个不同颜色的矩形
	            for (var j = lines.length - 1; j >= 0; j--) {
	                if (j === 0) {
	                    var imageY = canvas.height / 2 + deltaHeight - 75;
	                    imageY = imageY < 10 ? Math.abs(imageY) : imageY;
	                }
	                //每个矩形的角度都不同，每个之间相差45度
	                var angle = (step + j * 45) * Math.PI / 180;
	                var deltaHeight = Math.sin(angle) * 20;
	                var deltaHeightRight = Math.cos(angle) * 20;
	                ctx.beginPath();
	                ctx.fillStyle = lines[j];
	                ctx.moveTo(0, canvas.height / 2 + deltaHeight);
	                ctx.bezierCurveTo(canvas.width / 2, canvas.height / 2 + deltaHeight - 20, canvas.width / 2, canvas.height / 2 + deltaHeightRight - 20, canvas.width, canvas.height / 2 + deltaHeightRight);
	                ctx.lineTo(canvas.width, canvas.height);
	                ctx.lineTo(0, canvas.height);
	                ctx.lineTo(0, canvas.height / 2 + deltaHeight);
	                ctx.closePath();
	                ctx.fill();
	            }
	            requestAnimFrame(loop);
	        }
	        loop();
	    },
	    render: function render() {
	        return React.createElement('canvas', { id: 'waveCanvas' });
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 水质详情页
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TdsInfo = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TdsInfo = exports.TdsInfo = function (_BaseComponent) {
	    _inherits(TdsInfo, _BaseComponent);

	    function TdsInfo(props) {
	        _classCallCheck(this, TdsInfo);

	        var _this = _possibleConstructorReturn(this, (TdsInfo.__proto__ || Object.getPrototypeOf(TdsInfo)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '水资源详情', setNavRightBtnHiden: 1 }));
	        _Actions.Actions.getData();
	        return _this;
	    }

	    _createClass(TdsInfo, [{
	        key: 'render',
	        value: function render() {
	            //console.log("TdsInfo--->");
	            var SourceWater = {
	                SourceWaterTds: parseInt(this.state.SourceWaterTds || 0),
	                SourceSpectrumTOC: parseInt(this.state.SourceSpectrumTOC || 0) / 100,
	                SourceSpectrumCOD: parseInt(this.state.SourceSpectrumCOD || 0) / 100,
	                SourceSpectrumColor: parseInt(this.state.SourceSpectrumColor || 0) / 100,
	                SourceSpectrumTurbidity: parseInt(this.state.SourceSpectrumTurbidity || 0) / 100,
	                SourceWaterTemprature: parseInt(this.state.SourceWaterTemprature || 0)
	            };
	            var PureWater = {
	                PureWaterTds: parseInt(this.state.PureWaterTds || 0),
	                PureSpectrumTOC: parseInt(this.state.PureSpectrumTOC || 0) / 100,
	                PureSpectrumCOD: parseInt(this.state.PureSpectrumCOD || 0) / 100,
	                PureSpectrumColor: parseInt(this.state.PureSpectrumColor || 0) / 100,
	                PureSpectrumTurbidity: parseInt(this.state.PureSpectrumTurbidity || 0) / 100
	            };
	            var PureWateritems = [];
	            var PureWaterArrayTds = [{ id: 1, itemName: "TDS", value: PureWater.PureWaterTds, unit: "mg/L", isNerr: PureWater.PureWaterTds > 1000 ? "#ff632c" : "" }, { id: 2, itemName: "TOC", value: PureWater.PureSpectrumTOC, unit: "mg/L", isNerr: PureWater.PureSpectrumTOC > 5 ? "#ff632c" : "" }, { id: 3, itemName: "COD", value: PureWater.PureSpectrumCOD, unit: "mg/L", isNerr: PureWater.PureSpectrumCOD > 5 ? "#ff632c" : "" }, { id: 4, itemName: "色度", value: PureWater.PureSpectrumColor, unit: "铂钴色度", isNerr: PureWater.PureSpectrumColor > 15 ? "#ff632c" : "" }, { id: 5, itemName: "浊度", value: PureWater.PureSpectrumTurbidity, unit: "NTU", isNerr: PureWater.PureSpectrumTurbidity > 3 ? "#ff632c" : "" }];

	            PureWaterArrayTds.forEach(function (item) {
	                PureWateritems.push(React.createElement(
	                    'li',
	                    { className: 'itemli', style: { color: item.isNerr }, key: item.id },
	                    React.createElement(
	                        'span',
	                        null,
	                        item.value + item.unit
	                    )
	                ));
	            });
	            var SourceWateritems = [];

	            var SourceWaterArrayTds = [{ id: 1, itemName: "TDS", value: SourceWater.SourceWaterTds, unit: "mg/L", isNerr: SourceWater.SourceWaterTds > 1000 ? "#ff632c" : "" }, { id: 2, itemName: "TOC", value: SourceWater.SourceSpectrumTOC, unit: "mg/L", isNerr: SourceWater.SourceSpectrumTOC > 5 ? "#ff632c" : "" }, { id: 3, itemName: "COD", value: SourceWater.SourceSpectrumCOD, unit: "mg/L", isNerr: SourceWater.SourceSpectrumCOD > 5 ? "#ff632c" : "" }, { id: 4, itemName: "色度", value: SourceWater.SourceSpectrumColor, unit: "铂钴色度", isNerr: SourceWater.SourceSpectrumColor > 15 ? "#ff632c" : "" }, { id: 5, itemName: "浊度", value: SourceWater.SourceSpectrumTurbidity, unit: "NTU", isNerr: SourceWater.SourceSpectrumTurbidity > 3 ? "#ff632c" : "" }, { id: 6, itemName: "水温", value: SourceWater.SourceWaterTemprature, unit: "℃", isNerr: SourceWater.SourceWaterTemprature > 38 || SourceWater.SourceWaterTemprature != 0 && SourceWater.SourceWaterTemprature < 5 ? "#ff632c" : "" }];
	            SourceWaterArrayTds.forEach(function (item) {
	                SourceWateritems.push(React.createElement(
	                    'li',
	                    { className: 'itemli', style: { color: item.isNerr }, key: item.id },
	                    React.createElement(
	                        'span',
	                        null,
	                        item.value + item.unit
	                    )
	                ));
	            });
	            var untList = [];
	            SourceWaterArrayTds.forEach(function (item) {
	                untList.push(React.createElement(
	                    'li',
	                    { className: 'itemli', key: item.id },
	                    React.createElement(
	                        'span',
	                        null,
	                        item.itemName
	                    )
	                ));
	            });
	            //items.push(<li><span>{item.itemName+': '+item.value + item.unit}</span></li>);
	            return React.createElement(
	                'section',
	                { className: 'Tdsbody' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: 'rgb(42,204,250)' } }),
	                React.createElement(
	                    'figure',
	                    { className: 'flex' },
	                    React.createElement('p', { className: 'flex-cell' }),
	                    React.createElement(
	                        'p',
	                        { className: 'flex-cell' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u6E90\u6C34\u6C34\u8D28'
	                        )
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'flex-cell' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u7EAF\u6C34\u6C34\u8D28'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex Tdslist' },
	                    React.createElement(
	                        'section',
	                        { className: 'flex-cell arul' },
	                        React.createElement(
	                            'ul',
	                            { className: 'ul1' },
	                            untList
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'flex-cell' },
	                        React.createElement(
	                            'ul',
	                            { className: 'ul1' },
	                            SourceWateritems
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'flex-cell' },
	                        React.createElement(
	                            'ul',
	                            { className: 'ul2' },
	                            PureWateritems
	                        )
	                    )
	                ),
	                React.createElement(
	                    'article',
	                    { className: 'footerArt' },
	                    React.createElement(
	                        'section',
	                        null,
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement('i', null),
	                            'TDS: \u603B\u6EB6\u89E3\u56FA\u4F53\u91CF\uFF0C\u5373\u6C34\u4E2D\u65E0\u673A\u7269 (\u9499\u3001\u94A0\u7B49) \u542B\u91CF\u591A\u5C11\u7684\u6D4B\u5B9A\u503C\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            'TOC: \u7528\u6765\u63CF\u8FF0\u6C34\u7CFB\u7EDF\u4E2D\u6709\u673A (\u542B\u78B3\u6709\u673A\u7269) \u6C61\u67D3\u7269\u7684\u7A0B\u5EA6\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            'COD: \u5316\u5B66\u9700\u6C27\u91CF\u8D8A\u5927\uFF0C \u8BF4\u660E\u6C34\u4F53\u53D7\u6709\u673A\u7269\u7684\u6C61\u67D3\u8D8A\u4E25\u91CD\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u8272\u5EA6: \u5BF9\u5929\u7136\u6C34\u6216\u5904\u7406\u540E\u7684\u5404\u79CD\u6C34\u8FDB\u884C\u989C\u8272\u5B9A\u91CF\u6D4B\u5B9A\u65F6\u7684\u6307\u6807\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6D4A\u5EA6: \u6307\u6C34\u4E2D\u60AC\u6D6E\u7269\u5BF9\u5149\u7EBF\u900F\u8FC7\u65F6\u6240\u53D1\u751F\u7684\u963B\u788D\u7A0B\u5EA6\u3002'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return TdsInfo;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 统计曲线
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CurveModel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _TdsChartModel = __webpack_require__(14);

	var _LoadImagModel = __webpack_require__(19);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _MultView = __webpack_require__(20);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CurveModel = exports.CurveModel = function (_BaseComponent) {
	    _inherits(CurveModel, _BaseComponent);

	    function CurveModel(props) {
	        _classCallCheck(this, CurveModel);

	        var _this = _possibleConstructorReturn(this, (CurveModel.__proto__ || Object.getPrototypeOf(CurveModel)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            showLoad: 0
	        };
	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '统计', setNavRightBtnHiden: 1 }));
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.getWaterStat();
	        return _this;
	    }

	    _createClass(CurveModel, [{
	        key: 'tryAgain',
	        value: function tryAgain() {
	            var showLoad = this.state.showLoad;
	            if (showLoad == 3) return;
	            _Actions.Actions.getWaterStat();
	            this.setState({
	                showLoad: 0
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var waterlines = this.state.waterlines || [];
	            var show = waterlines.length > 0 ? true : false;
	            var showTop = true;
	            var showLoad = this.state.showLoad;
	            var TexterrArr = ['暂无数据哦 ！', '数据加载错误,点击重试 ！', '当前版本不支持设备统计接口调用！'];
	            var Texterr = showLoad == 2 ? TexterrArr[1] : showLoad == 3 ? TexterrArr[2] : TexterrArr[0];
	            return React.createElement(_MultView.MultView, { ErrtryCall: this.tryAgain.bind(this),
	                showD: show,
	                showLoad: showLoad,
	                showTop: showTop,
	                textErr: Texterr,
	                itemView: React.createElement(_TdsChartModel.TdsChartModel, { lines: waterlines })
	            });
	        }
	    }]);

	    return CurveModel;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 曲线图表
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.TdsChartModel = undefined;

	var _EcharWater = __webpack_require__(15);

	var _EcharTds = __webpack_require__(18);

	var TdsChartModel = exports.TdsChartModel = React.createClass({
	    displayName: 'TdsChartModel',

	    getInitialState: function getInitialState() {
	        return {
	            activeIndex: 1,
	            showchar: 1
	        };
	    },
	    handleTab: function handleTab(e) {
	        var activeIndex = e.target.getAttribute('data-index');
	        this.setState({ activeIndex: activeIndex, showchar: activeIndex }); //选择曲线
	    },
	    render: function render() {

	        var activeIndex = this.state.activeIndex || 1;
	        var showChars = this.state.showchar || activeIndex;
	        var waterlines = this.props.lines || [];

	        return React.createElement(
	            'section',
	            { className: 'StastiBody' },
	            React.createElement(
	                'article',
	                { className: 'tabHead flex' },
	                React.createElement(
	                    'div',
	                    { 'data-index': 1, className: 'flex-cell', onTouchEnd: this.handleTab },
	                    React.createElement(
	                        'p',
	                        { 'data-index': 1 },
	                        '\u6C34\u8D28TDS\u503C'
	                    ),
	                    React.createElement('i', { 'data-index': 1, className: activeIndex == 1 ? "activt" : "unactivt" })
	                ),
	                React.createElement(
	                    'div',
	                    { 'data-index': 2, className: 'flex-cell', onTouchEnd: this.handleTab },
	                    React.createElement(
	                        'p',
	                        { 'data-index': 2 },
	                        '\u7528\u6C34\u603B\u91CF'
	                    ),
	                    React.createElement('i', { 'data-index': 2, className: activeIndex == 2 ? "activt" : "unactivt" })
	                )
	            ),
	            React.createElement(
	                'article',
	                { className: showChars == 1 ? 'chart1' : 'chart1' },
	                waterlines.length > 0 ? showChars == 1 ? React.createElement(_EcharTds.EcharTds, { TdsList: waterlines }) : React.createElement(_EcharWater.EcharWater, { WaterTotal: waterlines }) : ""
	            )
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 用水图表
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EcharWater = undefined;

	var _EcharBar = __webpack_require__(16);

	var EcharWater = exports.EcharWater = React.createClass({
	    displayName: 'EcharWater',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    compareDate: function compareDate(checkStartDate, checkEndDate) {
	        var arys1 = [];
	        var arys2 = [];
	        if (checkStartDate != null && checkEndDate != null) {
	            arys1 = checkStartDate.split('-');
	            var sdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
	            arys2 = checkEndDate.split('-');
	            var edate = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2]);
	            if (sdate > edate) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    },
	    componentDidMount: function componentDidMount() {
	        var compareDate = this.compareDate;
	        var TdsList = this.props.WaterTotal;
	        var STotal = void 0;
	        var PTotal = void 0;
	        var CTotal = void 0;
	        for (var index in TdsList) {
	            for (var i in TdsList[index]) {
	                if (i == 'SourceWaterTotal') {
	                    STotal = TdsList[index];
	                } else if (i == 'PureWaterTotal') {
	                    PTotal = TdsList[index];
	                } else if (i == 'CleanWaterTotal') {
	                    CTotal = TdsList[index];
	                }
	            }
	        }
	        var SourceWaterTotal = STotal != undefined ? STotal : '';
	        var PureWaterTotal = PTotal != undefined ? PTotal : '';
	        var CleanWaterTotal = CTotal != undefined ? CTotal : '';

	        var xAxisList = [];
	        var SourcedataList = [];
	        var PureWaterdataList = [];
	        var CleanWaterdataList = [];
	        if (SourceWaterTotal != '') {
	            for (var _index in SourceWaterTotal) {
	                for (var _i in SourceWaterTotal[_index]) {
	                    SourcedataList.push({ date: _i, value: SourceWaterTotal[_index][_i] });
	                    SourcedataList.sort(function (a, b) {
	                        return compareDate(a.date, b.date);
	                    });
	                }
	            }
	        }
	        SourcedataList.forEach(function (item) {
	            var arys1 = item.date.split('-');
	            xAxisList.push(arys1[1] + "-" + arys1[2]);
	        });
	        if (PureWaterTotal != '') {
	            for (var _index2 in PureWaterTotal) {
	                for (var _i2 in PureWaterTotal[_index2]) {
	                    PureWaterdataList.push({ date: _i2, value: PureWaterTotal[_index2][_i2] });
	                    PureWaterdataList.sort(function (a, b) {
	                        return compareDate(a.date, b.date);
	                    });
	                }
	            }
	        }
	        if (CleanWaterTotal != '') {
	            for (var _index3 in CleanWaterTotal) {
	                for (var _i3 in CleanWaterTotal[_index3]) {
	                    CleanWaterdataList.push({ date: _i3, value: CleanWaterTotal[_index3][_i3] });
	                    CleanWaterdataList.sort(function (a, b) {
	                        return compareDate(a.date, b.date);
	                    });
	                }
	            }
	        }
	        var dataList = [];
	        var tempList = [];
	        SourcedataList.forEach(function (item) {
	            tempList.push(item.value);
	        });
	        var Sourcemax = Math.max.apply(null, tempList);

	        tempList = [];
	        CleanWaterdataList.forEach(function (item) {
	            tempList.push(item.value);
	        });
	        var CleanWatermax = Math.max.apply(null, tempList);
	        tempList = [];
	        PureWaterdataList.forEach(function (item) {
	            tempList.push(item.value);
	        });
	        var PureWatermax = Math.max.apply(null, tempList);
	        var maxs = Math.max.apply(null, [Sourcemax, CleanWatermax, PureWatermax]);
	        var id = maxs == 0 ? 0 : maxs == Sourcemax ? 1 : maxs == CleanWatermax ? 2 : maxs == PureWatermax ? 3 : 1;

	        dataList.push(new _EcharBar.EcharBar('源水', 'bar', 'circle', 4, SourcedataList, '#B8CFE1', 8, id == 1 ? true : false));
	        dataList.push(new _EcharBar.EcharBar('净水', 'bar', 'circle', 4, CleanWaterdataList, '#8696E4', 8, id == 2 ? true : false));
	        dataList.push(new _EcharBar.EcharBar('纯水', 'bar', 'circle', 4, PureWaterdataList, '#2ACCFA', 8, id == 3 ? true : false));

	        var chart = ReactDOM.findDOMNode(this.refs.chart);
	        var myChart = echarts.init(chart);
	        var option = {
	            title: {
	                text: '总量(L)',
	                padding: 20,
	                textStyle: {
	                    fontSize: 12,
	                    fontWeight: 'normal',
	                    color: '#848484'
	                }
	            },
	            tooltip: {
	                trigger: 'axis',
	                showDelay: 30,
	                axisPointer: {
	                    type: 'none'
	                }
	            },
	            legend: {
	                data: ['源水', '净水', '纯水'],
	                x: 'right',
	                padding: 20,
	                textStyle: {
	                    color: '#848484'
	                }
	            },
	            calculable: true,
	            xAxis: [{
	                type: 'category',
	                axisLabel: {
	                    interval: 0
	                },
	                boundaryGap: false,
	                axisLine: {
	                    show: true,
	                    lineStyle: {
	                        type: 'dotted',
	                        color: '#848484'
	                    }
	                },
	                axisTick: {
	                    show: false,
	                    inside: true
	                },
	                data: xAxisList
	            }],
	            yAxis: [{
	                type: 'value',
	                show: false

	            }],
	            series: dataList
	        };
	        myChart.setOption(option);
	    },

	    render: function render() {
	        return React.createElement(
	            'section',
	            { className: 'StastiBody' },
	            React.createElement('div', { id: 'Waterchart', className: 'charts', ref: 'chart' })
	        );
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EcharBar = undefined;

	var _EcharsLine2 = __webpack_require__(17);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by liuzh on 2016-11-14.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * echars bar class
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var EcharBar = exports.EcharBar = function (_EcharsLine) {
	    _inherits(EcharBar, _EcharsLine);

	    function EcharBar(name, type, symbol, symbolSize, data, color, barWidth, showMartline) {
	        _classCallCheck(this, EcharBar);

	        var _this = _possibleConstructorReturn(this, (EcharBar.__proto__ || Object.getPrototypeOf(EcharBar)).call(this, name, type, symbol, symbolSize, data, color));

	        _this.barWidth = barWidth || 8;
	        //this.stack = '水质';
	        if (showMartline) {
	            _this.markLine = {
	                data: [{ type: 'max', name: '最大值' }, { type: 'average', name: '平均值' }],
	                itemStyle: {
	                    normal: {
	                        label: {
	                            show: true,
	                            textStyle: {
	                                align: 'center',
	                                baseline: 'bottom'
	                            }
	                        }
	                    }
	                }
	            };
	        } else {
	            _this.markLine = {};
	        };
	        _this.precision = 1;
	        _this.itemStyle = {
	            normal: {
	                color: color || '#B8CFE1',
	                barBorderRadius: 5,
	                label: {
	                    show: false,
	                    textStyle: {
	                        color: '#848484'
	                    }
	                }
	            }
	        };
	        return _this;
	    }

	    return EcharBar;
	}(_EcharsLine2.EcharsLine);

	;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by liuzh on 2016-11-14.
	 * echars line class
	 */
	var EcharsLine = exports.EcharsLine = function EcharsLine(name, type, symbol, symbolSize, data, color) {
	    _classCallCheck(this, EcharsLine);

	    this.name = name || '';
	    this.type = type || 'line';
	    this.symbol = symbol || 'circle';
	    this.symbolSize = symbolSize || 4;
	    this.data = data || [];
	    this.itemStyle = {
	        normal: {
	            color: color || '#B8CFE1',
	            label: {
	                show: true,
	                textStyle: {
	                    color: '#848484'
	                }
	            }
	        }
	    };
	};

	;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * TDS图表
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EcharTds = undefined;

	var _EcharsLine = __webpack_require__(17);

	var EcharTds = exports.EcharTds = React.createClass({
	    displayName: 'EcharTds',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    compareDate: function compareDate(checkStartDate, checkEndDate) {
	        var arys1 = [];
	        var arys2 = [];
	        if (checkStartDate != null && checkEndDate != null) {
	            arys1 = checkStartDate.split('-');
	            var sdate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
	            arys2 = checkEndDate.split('-');
	            var edate = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2]);
	            if (sdate > edate) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    },
	    componentDidMount: function componentDidMount() {
	        var compareDate = this.compareDate;
	        var TdsList = this.props.TdsList;
	        var STds = void 0;
	        var PTds = void 0;
	        for (var index in TdsList) {
	            for (var i in TdsList[index]) {
	                if (i == 'SourceWaterTds') {
	                    STds = TdsList[index];
	                } else if (i == 'PureWaterTds') {
	                    PTds = TdsList[index];
	                }
	            }
	        }
	        var SourceWaterTds = STds != undefined ? STds : '';
	        var PureWaterTds = PTds != undefined ? PTds : '';

	        var xAxisList = [];
	        var SourcedataList = [];
	        var PureWaterdataList = [];
	        if (SourceWaterTds != '') {
	            for (var _index in SourceWaterTds) {
	                for (var _i in SourceWaterTds[_index]) {
	                    SourcedataList.push({ date: _i, value: SourceWaterTds[_index][_i] });
	                    SourcedataList.sort(function (a, b) {
	                        return compareDate(a.date, b.date);
	                    });
	                }
	            }
	        }
	        SourcedataList.forEach(function (item) {
	            var arys1 = item.date.split('-');
	            xAxisList.push(arys1[1] + "-" + arys1[2]);
	        });
	        if (PureWaterTds != '') {
	            for (var _index2 in PureWaterTds) {
	                for (var _i2 in PureWaterTds[_index2]) {
	                    PureWaterdataList.push({ date: _i2, value: PureWaterTds[_index2][_i2] });
	                    PureWaterdataList.sort(function (a, b) {
	                        return compareDate(a.date, b.date);
	                    });
	                }
	            }
	        }
	        var dataList = [];
	        dataList.push(new _EcharsLine.EcharsLine('源水', 'line', 'circle', 4, SourcedataList, '#B8CFE1'));
	        dataList.push(new _EcharsLine.EcharsLine('纯水', 'line', 'circle', 4, PureWaterdataList, '#2ACCFA'));
	        var chart = ReactDOM.findDOMNode(this.refs.chart);
	        var myChart = echarts.init(chart);
	        var option = {
	            title: {
	                text: '水质TDS值',
	                subtext: '(mg/L)',
	                padding: 20,
	                textStyle: {
	                    fontSize: 12,
	                    fontWeight: 'normal',
	                    color: '#848484'
	                },
	                subtextStyle: {
	                    fontSize: 12,
	                    fontWeight: 'normal',
	                    color: '#848484'
	                }
	            },
	            tooltip: {
	                trigger: 'axis',
	                showDelay: 30,
	                axisPointer: {
	                    type: 'none'
	                }
	            },
	            legend: {
	                data: ['源水', '纯水'],
	                x: 'right',
	                padding: 20,
	                textStyle: {
	                    color: '#848484'
	                }
	            },
	            grid: {
	                y: 80
	            },
	            calculable: true,
	            xAxis: [{
	                type: 'category',
	                axisLabel: {
	                    interval: 0
	                },
	                boundaryGap: false,
	                axisLine: {
	                    show: true,
	                    lineStyle: {
	                        type: 'dotted',
	                        color: '#848484'
	                    }
	                },
	                axisTick: {
	                    show: false,
	                    inside: true
	                },

	                data: xAxisList
	            }],
	            yAxis: [{
	                type: 'value',
	                show: false
	            }],
	            series: dataList
	        };

	        myChart.setOption(option);
	    },

	    render: function render() {

	        return React.createElement(
	            'section',
	            { className: 'StastiBody' },
	            React.createElement('div', { id: 'Tdschart', className: 'chart', ref: 'chart' })
	        );
	    }
	});

/***/ },
/* 19 */
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
	            { className: "fade_c_section", style: { display: show == 0 ? "" : "none" } },
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * @fileName: MultView.jsx
	 * Created by liuzh on 2017-01-18
	 * 空白错误
	 * @prop {function} ErrtryCall  错误点击的回调函数
	 * @prop {number} showLoad    是否显示提示信息的 1 2 3 ['暂无数据哦 ！','数据加载错误,点击重试 ！','当前版本不支持设备统计接口调用！'];
	 * @prop {string} textErr     显示数据的提示语
	 * @prop {boolean} showD       是否显示数据部分
	 * @prop {boolean} showTop     是否显示Title条
	 * @prop {View} itemView    数据显示部分的View
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.MultView = undefined;

	var _LoadImagModel = __webpack_require__(19);

	var MultView = exports.MultView = React.createClass({
	    displayName: 'MultView',

	    getInitialState: function getInitialState() {
	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        return {
	            headerTop: isAndroid ? 73 : 64
	        };
	    },
	    touchcanle: function touchcanle(e) {
	        e.stopPropagation(); //取消时间冒泡
	        if (typeof this.props.ErrtryCall === 'function') {
	            this.props.ErrtryCall();
	        }
	    },
	    render: function render() {
	        var itemView = this.props.itemView;
	        var show = this.props.showD;
	        var showLoad = this.props.showLoad || 0;
	        var Texterr = this.props.textErr;
	        var showTop = this.props.showTop;
	        return React.createElement(
	            'section',
	            { className: 'app-body' },
	            React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: 'rgb(42,204,250)',
	                    visibility: showTop ? "visible" : 'hidden' } }),
	            React.createElement(
	                'section',
	                { className: 'StastiBody' },
	                React.createElement(
	                    'section',
	                    { className: 'stastiTu', style: { visibility: show ? showLoad == 0 ? "hidden" : 'visible' : 'hidden' } },
	                    itemView
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'emptyS', style: { visibility: show ? 'hidden' : showLoad == 0 ? 'hidden' : 'visible' } },
	                    React.createElement('img', { onTouchEnd: this.touchcanle, src: '../static/img/emptys.png' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        Texterr
	                    )
	                ),
	                React.createElement(_LoadImagModel.LoadImagModel, { showLoad: showLoad })
	            )
	        );
	    }
	});

/***/ },
/* 21 */
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
	 * @prop {function}  cancelClock   取消，点击后的回调函数
	 * @prop {function} submitClock   确定，点击后的回调函数
	 * @prop {string} content   内容
	 * @prop {array} errs   故障列表
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
	            var canCel = this.props.canCel || false;
	            if (canCel && typeof this.props.cancelClock === 'function') {
	                this.props.cancelClock();
	            }
	        }
	    }, {
	        key: 'touchcanle2',
	        value: function touchcanle2(e) {
	            e.stopPropagation(); //取消时间冒泡
	            if (typeof this.props.cancelClock === 'function') {
	                this.props.cancelClock();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var title = this.props.title == undefined ? "默认标题" : this.props.title;
	            var content = this.props.content == undefined ? "--" : this.props.content;
	            var leftpam = this.props.leftpam == undefined ? "取消" : this.props.leftpam;
	            var rightpam = this.props.rightpam == undefined ? "确定" : this.props.rightpam;
	            var show = this.props.show;

	            var ErrItems = this.props.errs == undefined ? [] : this.props.errs;
	            var items = [];
	            for (var index in ErrItems) {
	                if (index > 3) break;
	                var item = ErrItems[index];
	                items.push(React.createElement(
	                    'li',
	                    { key: index },
	                    ' ',
	                    item.errString,
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
	                                ErrItems.length == 0 ? React.createElement(
	                                    'p',
	                                    { className: 'pop_content' },
	                                    content
	                                ) : React.createElement(
	                                    'ul',
	                                    { className: 'pop_con' },
	                                    items
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex conformd' },
	                                React.createElement(
	                                    'p',
	                                    { className: 'flex-cell', onTouchEnd: this.touchcanle2.bind(this) },
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

/***/ }
/******/ ]);