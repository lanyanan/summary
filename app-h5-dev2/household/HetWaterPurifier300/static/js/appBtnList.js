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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var model = parseInt(this.state.MachineOperationState || 0);
	            var online = parseInt(this.state.online || 1);
	            var TextDeviceState = ["设备待机中", "设备冲洗中", "设备制水中", ""];

	            var SourceWater = {
	                SourceWaterTds: parseInt(this.state.SourceWaterTds) || 0,
	                SourceSpectrumTOC: parseInt(this.state.SourceSpectrumTOC) / 100 || 0,
	                SourceSpectrumCOD: parseInt(this.state.SourceSpectrumCOD) / 100 || 0,
	                SourceSpectrumColor: parseInt(this.state.SourceSpectrumColor) / 100 || 0,
	                SourceSpectrumTurbidity: parseInt(this.state.SourceSpectrumTurbidity) / 100 || 0,
	                SourceWaterTemprature: parseInt(this.state.SourceWaterTemprature || 0)
	            };
	            var SourcenWaternmb = 0;
	            if (SourceWater.SourceWaterTds > 1000) SourcenWaternmb++;
	            if (SourceWater.SourceSpectrumTOC > 5) SourcenWaternmb++;
	            if (SourceWater.SourceSpectrumCOD > 5) SourcenWaternmb++;
	            if (SourceWater.SourceSpectrumColor > 15) SourcenWaternmb++;
	            if (SourceWater.SourceSpectrumTurbidity > 3) SourcenWaternmb++;
	            if (SourceWater.SourceWaterTemprature > 38 || SourceWater.SourceWaterTemprature < 5 && SourceWater.SourceWaterTemprature != 0) SourcenWaternmb++;

	            var PureWater = {
	                PureWaterTds: parseInt(this.state.PureWaterTds) || 0,
	                PureSpectrumTOC: parseInt(this.state.PureSpectrumTOC) / 100 || 0,
	                PureSpectrumCOD: parseInt(this.state.PureSpectrumCOD) / 100 || 0,
	                PureSpectrumColor: parseInt(this.state.PureSpectrumColor) / 100 || 0,
	                PureSpectrumTurbidity: parseInt(this.state.PureSpectrumTurbidity) / 100 || 0
	            };
	            var PureWaternmb = 0;
	            if (PureWater.PureWaterTds > 1000) PureWaternmb++;
	            if (PureWater.PureSpectrumTOC > 5) PureWaternmb++;
	            if (PureWater.PureSpectrumCOD > 5) PureWaternmb++;
	            if (PureWater.PureSpectrumColor > 15) PureWaternmb++;
	            if (PureWater.PureSpectrumTurbidity > 3) PureWaternmb++;

	            var workText = React.createElement(
	                'i',
	                null,
	                TextDeviceState[model]
	            );
	            workText = SourcenWaternmb != 0 ? React.createElement(
	                'i',
	                null,
	                TextDeviceState[model] + " 源水: ",
	                React.createElement(
	                    'span',
	                    { style: { color: '#ff4723' } },
	                    SourcenWaternmb
	                ),
	                "项异常" + ""
	            ) : workText;
	            workText = PureWaternmb != 0 ? React.createElement(
	                'i',
	                null,
	                workText,
	                ' ',
	                " 纯水: ",
	                React.createElement(
	                    'span',
	                    { style: { color: '#ff4723' } },
	                    PureWaternmb
	                ),
	                "项异常" + ""
	            ) : workText;
	            var tocText = PureWater.PureSpectrumTOC;
	            var codText = PureWater.PureSpectrumCOD;
	            var colorText = PureWater.PureSpectrumColor;
	            var turbidityText = PureWater.PureSpectrumTurbidity;

	            return React.createElement(
	                'div',
	                null,
	                online == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    workText
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-1' },
	                        React.createElement('img', { src: '../static/img/TOS.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            tocText + "mg/L"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-2' },
	                        React.createElement('img', { src: '../static/img/COD.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            codText + "mg/L"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-3' },
	                        React.createElement('img', { src: "../static/img/colorD.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            colorText + "铂钴色度"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-3' },
	                        React.createElement('img', { src: "../static/img/dityD.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            turbidityText + "NTU"
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(React.Component);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('和而泰净水器');
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

/***/ }
/******/ ]);