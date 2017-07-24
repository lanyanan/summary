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
	/**
	 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
	 * @type {actions}
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Actions = exports.Actions = Reflux.createActions(['repaint', // 接收到数据，重新渲染
	'getData', // 获取页面状态
	'cOnoff', // //处理开机事件 (1-关机，2-开机)
	'swicthMode', // //切换直接开始烘焙模式
	'swicthModefun', // //切换到功能选择的模式模式
	'swicthHotWind', // 热风的开机关机
	'cancelElm', //取消状态
	'selectTime', //选择时间
	'selectRateTime', //设置进度条 时间
	'selectRateTemp', //设置进度条 温度
	'modeStart']);

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

	var _StateModel = __webpack_require__(4);

	var stateModel = new _StateModel.StateModel();
	var AppData = {
	    'networkavailable': 1,
	    'online': 1
	};
	var isOffline = function isOffline() {
	    return AppData.online == 2;
	};

	//判断手机是否断网
	var isNetOff = function isNetOff() {
	    return AppData.networkavailable == 2;
	};
	var decToHex = function decToHex(dec) {
	    var hex = parseInt(dec).toString(16);
	    return hex.length === 1 ? '0' + hex : hex;
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

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas) {

	        var data = dataFilter(datas);
	        console.log("onRepaint data====>" + JSON.stringify(data));
	        //console.log('data',data);
	        //设备id
	        if (!!data.deviceId) AppData.deviceId = data.deviceId;
	        //断网离线
	        if (!!data.online) {
	            AppData.online = data.online;if (data.online == 2) {
	                data.loading = 2;AppData.loading = 2;
	            }
	        }
	        if (!!data.networkavailable) {
	            AppData.networkavailable = data.networkavailable;if (data.networkavailable == 2) {
	                data.loading = 2;AppData.loading = 2;
	            }
	        }

	        //回退数据重渲缓存
	        if (data.cOnoff != undefined) {
	            AppData.cOnoff = data.cOnoff;data.loading = 2;AppData.loading = 2;
	        };
	        if (data.cBookingTimeSetHour != undefined) AppData.cBookingTimeSetHour = data.cBookingTimeSetHour;
	        if (data.cBookTimeSetMin != undefined) AppData.cBookTimeSetMin = data.cBookTimeSetMin;
	        if (data.cStoveMode != undefined) AppData.cStoveMode = data.cStoveMode;
	        if (data.cWorkTimeHour != undefined) AppData.cWorkTimeHour = data.cWorkTimeHour;
	        if (data.cWorkTimeMin != undefined) AppData.cWorkTimeMin = data.cWorkTimeMin;
	        if (data.cHotWindSw != undefined) AppData.cHotWindSw = data.cHotWindSw;
	        if (data.cCancle != undefined) AppData.cCancle = data.cCancle;
	        if (data.cWorkSet != undefined) AppData.cWorkSet = data.cWorkSet;
	        if (data.cConfirm != undefined) AppData.cConfirm = data.cConfirm;
	        if (data.updateFlag != undefined) AppData.updateFlag = data.updateFlag;
	        //运行字段
	        if (data.onoff != undefined) {
	            AppData.online = 1;data.online = 1;
	            data.loading = 2;AppData.loading = 2; //有数据过来就直接认为是在线的
	            AppData.cOnoff = data.onoff;data.cOnoff = data.onoff;AppData.onoff = data.onoff;data.loading = 2;AppData.loading = 2;
	        };
	        if (data.workStatus != undefined) AppData.workStatus = data.workStatus;
	        if (data.HotWindStatus != undefined) {
	            AppData.HotWindStatus = data.HotWindStatus;
	            AppData.cHotWindSw = data.HotWindStatus;
	            data.cHotWindSw = data.HotWindStatus;
	        };
	        if (data.SetTemp != undefined) AppData.SetTemp = data.SetTemp;
	        if (data.curTemp != undefined) AppData.curTemp = data.curTemp;
	        if (data.SetTempHigh != undefined) AppData.SetTempHigh = data.SetTempHigh;
	        if (data.setTempLow != undefined) AppData.setTempLow = data.setTempLow;
	        if (data.curTempHigh != undefined) AppData.curTempHigh = data.curTempHigh;
	        if (data.curTempLow != undefined) AppData.curTempLow = data.curTempLow;
	        if (data.setTimeHour != undefined) AppData.setTimeHour = data.setTimeHour;
	        if (data.setTimeMin != undefined) AppData.setTimeMin = data.setTimeMin;
	        if (data.leftTimeHour != undefined) AppData.leftTimeHour = data.leftTimeHour;
	        if (data.leftTimeMin != undefined) AppData.leftTimeMin = data.leftTimeMin;
	        if (data.setBookingTimeHour != undefined) AppData.setBookingTimeHour = data.setBookingTimeHour;
	        if (data.setBookingtimeMin != undefined) AppData.setBookingtimeMin = data.setBookingtimeMin;
	        if (data.leftbookingTimeHour != undefined) AppData.leftbookingTimeHour = data.leftbookingTimeHour;
	        if (data.leftBookingtimeMin != undefined) AppData.leftBookingtimeMin = data.leftBookingtimeMin;
	        //错误字节字段
	        if (data.senseError != undefined) {
	            AppData.senseError = data.senseError; //传感器错误
	        }

	        console.log("onRepaint AppData====>" + JSON.stringify(AppData));
	        this.trigger(data);
	    },
	    onGetData: function onGetData() {
	        console.log("AppData=" + JSON.stringify(AppData));
	        this.trigger(AppData);
	    },
	    onCOnoff: function onCOnoff(value) {
	        var _this2 = this;

	        //处理开机事件 (1-关机，2-开机)
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.cStoveMode = "00";
	        AppData.workStatus = 0;
	        AppData.cHotWindSw = "00";
	        AppData.HotWindStatus = "00";
	        AppData.cOnoff = "0" + value;
	        AppData.updateFlag = het.hexUpFlag(0, 1, 2);
	        het.send({ cOnoff: AppData.cOnoff, updateFlag: AppData.updateFlag }, function (data) {
	            console.log('成功');
	            AppData.onoff = "0" + value;
	            _this2.trigger(AppData); //这里直接显示uI 点击终止烘焙状态/预约模式，下发关机命令
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSwicthMode: function onSwicthMode(mode) {
	        //直接启动的模式
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        var defTime = parseInt(stateModel.getAll()[parseInt(mode + 8)].defTime);
	        var defTemp = parseInt(stateModel.getAll()[parseInt(mode + 8)].defTemp);
	        var setTemp = parseInt(defTemp); //设置温度 如果没有选默认
	        var setTime = parseInt(defTime); //设置时间 如果没有选默认
	        AppData.cStoveMode = '0' + mode;
	        AppData.cWorkSet = setTemp;
	        AppData.cWorkTimeHour = "00";
	        AppData.cWorkTimeMin = setTime;;
	        AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(5, 2, 2, het.hexUpFlag(8, 2, 2)));
	        AppData.cOnoff = 2;
	        AppData.updateFlag = het.hexUpFlag(0, 1, 2, AppData.updateFlag);
	        het.send({ cWorkSet: AppData.cWorkSet, cWorkTimeHour: AppData.cWorkTimeHour, cWorkTimeMin: AppData.cWorkTimeMin, cOnoff: AppData.cOnoff, cStoveMode: AppData.cStoveMode, updateFlag: AppData.updateFlag }, function (data) {
	            console.log('成功');
	            AppData.workStatus = AppData.cStoveMode;
	            AppData.onoff = AppData.cOnoff;
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        this.trigger({ cOnoff: AppData.cOnoff, onoff: AppData.onoff, cStoveMode: AppData.cStoveMode, selectModel: 0, 'workStatus': mode });
	    },
	    onSwicthModefun: function onSwicthModefun(mode) {
	        //直接启动的模式
	        AppData.cStoveMode = '0' + mode;
	        AppData.cConfirm = "01";
	        AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(.11, 1, 2));
	        het.send(AppData, function (data) {
	            console.log('成功');
	            AppData.workStatus = AppData.cStoveMode;
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        this.trigger({ cStoveMode: AppData.cStoveMode, 'workStatus': mode });
	    },
	    onSwicthHotWind: function onSwicthHotWind(cHotWindSw) {
	        var _this3 = this;

	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.cHotWindSw = "0" + cHotWindSw;
	        AppData.updateFlag = het.hexUpFlag(9, 1, 2);
	        het.send({ cHotWindSw: AppData.cHotWindSw, updateFlag: AppData.updateFlag }, function (data) {
	            console.log('成功');
	            AppData.HotWindStatus = "0" + cHotWindSw;
	            _this3.trigger({ 'cHotWindSw': AppData.cHotWindSw, 'HotWindStatus': AppData.cHotWindSw });
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSelectRateTemp: function onSelectRateTemp(value) {
	        AppData.TempcWorkSet = value;
	        this.trigger({ TempcWorkSet: value });
	    },
	    onSelectRateTime: function onSelectRateTime(value) {
	        AppData.Timehour = parseInt(value) / 60;
	        AppData.Timemin = parseInt(value) % 60;
	        AppData.TempcWorkTime = value;
	        this.trigger({ Timehour: AppData.Timehour, Timemin: AppData.Timemin, TempcWorkTime: value });
	    },
	    onSelectTime: function onSelectTime(hour, minute) {
	        this.trigger({ hour: hour, minute: minute, selectshow: false });
	    },
	    onCancelElm: function onCancelElm() {
	        var _this4 = this;

	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        AppData.cCancle = "01";
	        AppData.cStoveMode = "00";
	        AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(10, 1, 2));

	        het.send(AppData, function (data) {
	            //取消之后手动恢复所有运行工作状态
	            AppData.setTimeHour = 0;
	            AppData.setTimeMin = 0;
	            AppData.HotWindStatus = 1;
	            AppData.workStatus = 0;
	            AppData.onoff = 2;
	            AppData.setBookingTimeHour = 0;
	            AppData.setBookingtimeMin = 0;
	            _this4.trigger(AppData);
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onModeStart: function onModeStart(setTimeHour, setTimeMin, SetTemp, WorkModeSelect, setBookingTimeHour, setBookingtimeMin) {
	        var _this = this;
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备不在线');
	            return;
	        }
	        if (setBookingTimeHour != 0 || setBookingtimeMin != 0) {
	            //预约  开始
	            //AppData.cBookTimeSetMin= minute>59?(minute-60):minute;
	            //AppData.cBookingTimeSetHour = (minute>59?hour+1:hour)%24 ;
	            if (parseInt(setBookingTimeHour) == 24 && parseInt(setBookingtimeMin) != 0) {
	                het.toast("预约时长不能大于24个小时,请重新选择预约时长！");
	                return;
	            }
	            AppData.cBookingTimeSetHour = setBookingTimeHour;
	            AppData.cBookTimeSetMin = setBookingtimeMin;
	            AppData.updateFlag = het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2));
	        } else {
	            AppData.cBookingTimeSetHour = '00';
	            AppData.cBookTimeSetMin = '00';
	            AppData.updateFlag = het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2));
	        }

	        AppData.cStoveMode = "00";
	        AppData.cConfirm = "00";
	        var date = new Date();
	        if (WorkModeSelect > 8) {
	            AppData.cStoveMode = "0" + (parseInt(WorkModeSelect) - 8); //直接开始
	            AppData.updateFlag = het.hexUpFlag(2, 1, 2, AppData.updateFlag);
	        } else {
	            AppData.cStoveMode = "0" + (parseInt(WorkModeSelect) + 4); //需要确认开始开始
	            AppData.cConfirm = '01';
	            AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(11, 1, 2, AppData.updateFlag));
	        }
	        AppData.cOnoff = 2;
	        AppData.updateFlag = het.hexUpFlag(0, 1, 2, AppData.updateFlag);
	        if (setTimeHour != 0 || setTimeMin != 0) {
	            AppData.cWorkTimeHour = setTimeHour;
	            AppData.cWorkTimeMin = setTimeMin;
	            AppData.updateFlag = het.hexUpFlag(7, 1, 2, het.hexUpFlag(8, 1, 2, AppData.updateFlag));
	        }
	        if (SetTemp != 0) {
	            AppData.cWorkSet = SetTemp;
	            AppData.updateFlag = het.hexUpFlag(5, 2, 2, AppData.updateFlag);
	        }
	        console.log('send mode', AppData);
	        het.send(AppData, function (data) {
	            console.log('onstart succee');
	            AppData.setBookingTimeHour = AppData.cBookingTimeSetHour;
	            AppData.setBookingtimeMin = AppData.cBookTimeSetMin;
	            AppData.leftbookingTimeHour = AppData.setBookingTimeHour;
	            AppData.leftBookingtimeMin = AppData.setBookingtimeMin;

	            AppData.setTimeHour = AppData.cWorkTimeHour;
	            AppData.setTimeMin = AppData.cWorkTimeMin;
	            AppData.leftTimeHour = AppData.setTimeHour;
	            AppData.leftTimeMin = AppData.setTimeMin;
	            if (parseInt(WorkModeSelect) > 8) {
	                AppData.workStatus = parseInt(WorkModeSelect) - 8; //直接开始
	            } else {
	                AppData.workStatus = parseInt(WorkModeSelect) + 4; //直接开始
	            }
	            AppData.onoff = AppData.cOnoff;
	            _this.trigger({
	                'cOnoff': AppData.cOnoff,
	                'onoff': AppData.onoff,
	                'workStatus': AppData.workStatus,
	                'cStoveMode': AppData.cStoveMode,
	                'cConfirm': AppData.cConfirm,
	                'SetTemp': AppData.cWorkSet,
	                'cWorkSet': AppData.cWorkSet,
	                'setBookingTimeHour': AppData.setBookingTimeHour,
	                'setBookingtimeMin': AppData.setBookingtimeMin,
	                'cBookingTimeSetHour': AppData.cBookingTimeSetHour,
	                'cBookTimeSetMin': AppData.cBookTimeSetMin,
	                'setTimeHour': AppData.setTimeHour,
	                'setTimeMin': AppData.setTimeMin,
	                'leftTimeHour': AppData.leftTimeHour,
	                'leftTimeMin': AppData.leftTimeMin,
	                'cWorkTimeHour': AppData.cWorkTimeHour,
	                'cWorkTimeMin': AppData.cWorkTimeMin
	            });
	            history.back();
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by Administrator on 2016-11-14.
	 */
	var StateModel = exports.StateModel = function () {
	    function StateModel() {
	        _classCallCheck(this, StateModel);

	        this.items = [{ 'modelId': '0', 'name': '发酵', 'defTemp': '48', 'defTime': '40', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo0' }, { 'modelId': '1', 'name': '解冻', 'defTemp': '65', 'defTime': '30', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo1' }, { 'modelId': '2', 'name': '消毒', 'defTemp': '150', 'defTime': '30', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo2' }, { 'modelId': '3', 'name': '饼干', 'defTemp': '180', 'defTime': '20', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo3' }, { 'modelId': '4', 'name': '蛋挞', 'defTemp': '210', 'defTime': '25', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo4' }, { 'modelId': '5', 'name': '面包', 'defTemp': '180', 'defTime': '40', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo5' }, { 'modelId': '6', 'name': '烤肉', 'defTemp': '160', 'defTime': '40', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo6' }, { 'modelId': '7', 'name': '披萨', 'defTemp': '200', 'defTime': '25', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo7' }, { 'modelId': '8', 'name': '烤薯', 'defTemp': '230', 'defTime': '45', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo8' }, { 'modelId': '9', 'name': '上烤', 'defTemp': '180', 'defTime': '30', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo9' }, { 'modelId': '10', 'name': '下烤', 'defTemp': '180', 'defTime': '30', 'mintemp': '35', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo10' }, { 'modelId': '11', 'name': '上下烤', 'defTemp': '220', 'defTime': '40', 'mintemp': '80', 'maxtemp': '230', 'mintime': '1', 'maxtime': '120', photo: 'photo11' }];
	    }

	    _createClass(StateModel, [{
	        key: 'getAll',
	        value: function getAll() {
	            return this.items;
	        }
	    }, {
	        key: 'getItem',
	        value: function getItem(index) {
	            return this.items[index];
	        }
	    }, {
	        key: 'getClassName',
	        value: function getClassName(id) {
	            for (var i in this.items) {
	                if (this.items[i].name == id) {
	                    return this.items[i];
	                }
	            }
	        }
	    }, {
	        key: 'getClassID',
	        value: function getClassID(id) {
	            for (var i in this.items) {
	                if (this.items[i].modelId == id) {
	                    return this.items[i];
	                }
	            }
	        }
	    }]);

	    return StateModel;
	}();

	;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _DialogStyle = __webpack_require__(8);

	var _SelectModel = __webpack_require__(9);

	var _LoadImagModel = __webpack_require__(13);

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
	        renderConfigData: true, // 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        het.setTitle(JSON.stringify({ setNavTitle: 0, setNavRightBtnHiden: 0 }));
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.canceldia = function () {
	            //console.log("canceldia/......");
	            _this.setState({
	                selectdiag: false
	            });
	        };
	        _this.submitdia = function () {
	            //console.log("submitdia/......");
	            _this.setState({
	                selectdiag: false
	            });
	            if ((_this.state.diaId || 1) == 1) {
	                _this.handleCoff();
	            } else if ((_this.state.diaId || 1) == 2) {
	                _this.cancelState();
	            } else {
	                //其他类型
	            }
	        };

	        _this.canceldiaerr = function () {
	            //console.log("canceldia/......");
	            _this.setState({
	                diaErrShow: 1
	            });
	        };
	        _this.submitdiaerr = function () {
	            //console.log("submitdia/......");
	            location.href = "tel:4007772009";
	            //location.href="tel:4006366396";
	            _this.setState({
	                diaErrShow: 1
	            });
	        };
	        _Actions.Actions.getData();
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'cancelState',
	        value: function cancelState() {
	            //取消所有状态  变成待机中
	            if (!this.iscanCanel() || parseInt(this.state.online || 1) == 2) return false;
	            if (parseInt(this.state.senseError || 0) == 1) {
	                this.setState({

	                    diaErrShow: 0
	                });
	                return false;
	            }
	            _Actions.Actions.cancelElm();
	        }
	    }, {
	        key: 'linkSelectModel',
	        value: function linkSelectModel(e) {
	            e.stopPropagation();
	            if (parseInt(this.state.cOnoff || 1) == 1 || parseInt(this.state.online || 1) == 2 || parseInt(this.state.workStatus || 0) != 0) return false;
	            if (parseInt(this.state.senseError || 0) == 1) {
	                this.setState({
	                    diaErrShow: 0
	                });
	                return false;
	            }
	            location.href = "#/SelectModel";
	            e.preventDefault();
	        }
	    }, {
	        key: 'handleCoff',
	        value: function handleCoff() {
	            //处理开机事件 (1-关机，2-开机)
	            if (parseInt(this.state.online || 1) == 2) return false;
	            if (parseInt(this.state.senseError || 0) == 1) {
	                this.setState({
	                    diaErrShow: 0
	                });
	                return false;
	            }
	            var childoff = parseInt(this.state.cOnoff) || 1;
	            childoff == 1 ? childoff = 2 : childoff = 1;
	            _Actions.Actions.cOnoff(childoff);
	        }
	    }, {
	        key: 'handleHotwind',
	        value: function handleHotwind() {
	            //热风选择
	            if (parseInt(this.state.workStatus || 0) == 0 || parseInt(this.state.cOnoff || 1) == 1 || parseInt(this.state.online || 1) == 2 || this.ispoll()) return false;
	            if (parseInt(this.state.senseError || 0) == 1) {
	                this.setState({
	                    diaErrShow: 0
	                });
	                return false;
	            }
	            var cHotWindSw = parseInt(this.state.cHotWindSw) || 1;
	            //console.log("cHotWindSw="+cHotWindSw);
	            cHotWindSw == 1 ? cHotWindSw = 2 : cHotWindSw = 1;
	            _Actions.Actions.swicthHotWind(cHotWindSw);
	        }
	    }, {
	        key: 'isCoff',
	        value: function isCoff() {
	            //true 开机  false  关机
	            var cOnoff = parseInt(this.state.cOnoff) || 1; //是否开关机
	            var onoff = parseInt(this.state.onoff) || 1; //是否开关机
	            return onoff == 2 || this.state.onoff == 'undefined' ? true : false;
	        }
	    }, {
	        key: 'ispoll',
	        value: function ispoll() {
	            //是否是预约状态k
	            var workStatus = parseInt(this.state.workStatus) || 0;
	            var setBookingTimeHour = this.state.setBookingTimeHour || 0; //预约的时间(小时)
	            var setBookingtimeMin = this.state.setBookingtimeMin || 0; //预约时间(分钟)
	            var ispoll = 0;
	            if (setBookingTimeHour == 0 && setBookingtimeMin == 0) {
	                ispoll = 0; //没有预约时间
	            } else {
	                ispoll = 1; //有预约时间
	            }
	            if (parseInt(this.state.cOnoff || 1) == 2 && workStatus != 0 && ispoll == 1) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'iscanCanel',
	        value: function iscanCanel() {
	            var workStatus = parseInt(this.state.workStatus) || 0;
	            if (parseInt(this.state.cOnoff) == 2 && workStatus != 0) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'iswait',
	        value: function iswait() {
	            //待机中
	            var cOnoff = parseInt(this.state.cOnoff) || 1;
	            if (cOnoff == 1) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'isopenDevice',
	        value: function isopenDevice() {
	            //已开机
	            var cOnoff = parseInt(this.state.cOnoff) || 1;
	            var workStatus = parseInt(this.state.workStatus) || 0;
	            if (cOnoff == 2 && workStatus == 0) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'cancelDia',
	        value: function cancelDia() {
	            if (!this.iscanCanel() || parseInt(this.state.online || 1) == 2) return false;
	            if (parseInt(this.state.senseError || 0) == 1) {
	                this.setState({
	                    diaErrShow: 0
	                });
	                return false;
	            }
	            this.openOffCanelDialog(2);
	        }
	    }, {
	        key: 'handDiacOff',
	        value: function handDiacOff() {
	            if (parseInt(this.state.online || 1) == 2) return false;
	            if (parseInt(this.state.senseError || 0) == 1) {
	                this.setState({
	                    diaErrShow: 0
	                });
	                return false;
	            }
	            var childoff = parseInt(this.state.cOnoff) || 1;
	            if (childoff == 2) {
	                this.openOffCanelDialog(1);
	            } else {
	                this.handleCoff();
	            }
	        }

	        //时间的处理先不管  后面再说

	    }, {
	        key: 'openOffCanelDialog',
	        value: function openOffCanelDialog(id) {
	            //id 1 是关机    id 2是取消 3是其他
	            var title = '温馨提示';
	            var content = '确认吗?';
	            var rightpam = '确定';
	            if (this.iswait()) {
	                title = "温馨提示";
	                content = id == 1 ? "待机中, 确定关机吗?" : "待机中, 确定取消吗?";
	                rightpam = id == 1 ? "关机" : "确定";
	            } else if (this.isopenDevice()) {
	                title = "温馨提示";
	                content = id == 1 ? "已开机, 确定关机吗?" : "已开机, 确定取消吗?";
	                rightpam = id == 1 ? "关机" : "确定";
	            } else if (this.ispoll()) {
	                title = "温馨提示";
	                content = id == 1 ? "美食预约中, 确定关机吗?" : "美食预约中, 确定取消吗?";
	                rightpam = id == 1 ? "关机" : "确定";
	            } else {
	                title = "温馨提示";
	                content = id == 1 ? "美食烘焙中, 确定关机吗?" : "美食烘焙中, 确定取消吗?";
	                rightpam = id == 1 ? "关机" : "确定";
	            }
	            this.setState({
	                selectdiag: true,
	                diatitles: title,
	                diacontents: content,
	                diaId: id,
	                diaright: rightpam
	            });
	        }
	    }, {
	        key: 'initTimeFm',
	        value: function initTimeFm(time) {
	            return parseInt(time) > 9 ? parseInt(time) : "0" + parseInt(time);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var senseError = parseInt(this.state.senseError || 0);
	            var selectdiag = this.state.selectdiag;
	            var diaErrShow = this.state.diaErrShow || 0; //0 开 1关
	            var selectdiagErro = senseError == 1 && diaErrShow == 0 ? true : false;

	            var HotWindStatus = parseInt(this.state.HotWindStatus) || 1; //1 关 2开
	            var workarry = ['模式', '上烤', '下烤', '上下烤', '发酵', '解冻', '消毒', '饼干', '蛋挞', '面包', '烤肉', '披萨', '烤薯'];
	            var workTextArry = [{ 'stateName': '待机中', 'modeId': 'stateDev1' }, { 'stateName': '已开机', 'modeId': 'stateDev2' }, { 'stateName': '烘焙中', 'modeId': 'stateDev3' }, { 'stateName': '预约中', 'modeId': 'stateDev4' }, { 'stateName': '离线中', 'modeId': 'stateDev5' }];
	            var workText = parseInt(this.state.online) == 2 ? workTextArry[4] : this.iswait() ? workTextArry[0] : this.isopenDevice() ? workTextArry[1] : this.ispoll() ? workTextArry[3] : workTextArry[2];
	            var workStatus = parseInt(this.state.workStatus) || 0;
	            var mode = parseInt(this.state.workStatus) || 0,
	                modeImgPath = '../static/img/';
	            var online = parseInt(this.state.online) || 1;
	            var onoff = parseInt(this.state.onoff) || 1;
	            var cOnoff = parseInt(this.state.cOnoff) || 1;
	            modeImgPath = modeImgPath + mode + (cOnoff == 1 || online == 2 || workStatus != 0 ? '_1.png' : '_2.png');
	            console.log("====>workStatus=" + workStatus);
	            var hotText = HotWindStatus == 1 ? "" : "热风 ";

	            var TitleText = mode == 0 ? "" : workarry[mode];
	            var leftbookingTimeHour = this.state.leftbookingTimeHour || 0;
	            var leftBookingtimeMin = this.state.leftBookingtimeMin || 0;
	            var bookTime = online == 2 ? "" : React.createElement(
	                'i',
	                null,
	                this.initTimeFm(parseInt(leftbookingTimeHour)),
	                React.createElement(
	                    'span',
	                    { className: 'bookTimeDot' },
	                    ':'
	                ),
	                this.initTimeFm(parseInt(leftBookingtimeMin))
	            );
	            var leftTimeHour = this.state.leftTimeHour || 0;
	            var leftTimeMin = this.state.leftTimeMin || 0;
	            var leftTime = online == 2 ? "" : React.createElement(
	                'i',
	                null,
	                this.initTimeFm(parseInt(leftTimeHour)),
	                React.createElement(
	                    'span',
	                    { className: 'bookTimeDot' },
	                    ':'
	                ),
	                this.initTimeFm(parseInt(leftTimeMin))
	            );
	            //console.log("leftTime="+leftTime);
	            var TitleTextTime = React.createElement(
	                'p',
	                null,
	                online == 2 ? "" : this.iswait() ? "" : this.isopenDevice() ? "已开机,请选择工作模式" : this.ispoll() ? TitleText + "预约中 " : hotText + TitleText + "进行中 ",
	                this.iswait() ? "" : this.isopenDevice() ? "" : this.ispoll() ? bookTime : leftTime
	            );
	            return React.createElement(
	                'section',
	                { className: 'app_body' },
	                React.createElement(
	                    'section',
	                    {
	                        className: online == 2 || onoff == 1 || workStatus == 0 || this.ispoll() ? "app_bgimg_hg" : "app_bgimgHG" },
	                    React.createElement(
	                        'p',
	                        { className: "stateDev " + workText.modeId },
	                        workText.stateName
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'dev_wrokstate' },
	                    React.createElement(
	                        'div',
	                        { className: 'dev-state appointment' },
	                        TitleTextTime
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'dev_select_canel' },
	                    React.createElement(
	                        'div',
	                        { className: 'flex selectmodel' },
	                        React.createElement(
	                            'article',
	                            { className: 'flex-cell ', onTouchEnd: this.handDiacOff.bind(this) },
	                            React.createElement('img', { style: online == 2 ? { opacity: 0.3 } : { opacity: 1 },
	                                src: this.isCoff() ? "../static/img/coff.png" : "../static/img/coff.png", alt: '' }),
	                            React.createElement(
	                                'p',
	                                { style: online == 2 ? { opacity: 0.3 } : { opacity: 1 },
	                                    className: this.isCoff() ? "select_p2" : "select_p2" },
	                                this.isCoff() ? '关机' : '开机'
	                            )
	                        ),
	                        React.createElement(
	                            'article',
	                            { className: 'flex-cell ', onTouchEnd: this.handleHotwind.bind(this) },
	                            React.createElement('img', { style: online == 2 ? { opacity: 0.3 } : this.iscanCanel() ? this.ispoll() ? { opacity: 0.3 } : { opacity: 1 } : { opacity: 0.3 },
	                                src: HotWindStatus == 1 ? "../static/img/hot_wind_off.png" : "../static/img/hot_wind_on.png",
	                                alt: '' }),
	                            React.createElement(
	                                'p',
	                                { style: online == 2 ? { opacity: 0.3 } : this.iscanCanel() ? this.ispoll() ? { opacity: 0.3 } : { opacity: 1 } : { opacity: 0.3 },
	                                    className: HotWindStatus == 1 ? "select_p2" : "select_p1" },
	                                '\u70ED\u98CE'
	                            )
	                        ),
	                        React.createElement(
	                            'article',
	                            { className: 'flex-cell ', onTouchStart: this.linkSelectModel.bind(this) },
	                            React.createElement('img', {
	                                style: cOnoff == 1 || online == 2 || workStatus != 0 ? { opacity: 0.3 } : { opacity: 1 },
	                                src: modeImgPath, alt: '' }),
	                            React.createElement(
	                                'p',
	                                { style: cOnoff == 1 || online == 2 || workStatus != 0 ? { opacity: 0.3 } : { opacity: 1 },
	                                    className: cOnoff == 1 || online == 2 || workStatus != 0 ? "select_p2" : "select_p1" },
	                                workarry[workStatus]
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'footer cancel', onTouchStart: this.cancelDia.bind(this) },
	                        React.createElement(
	                            'div',
	                            { style: online == 2 ? { opacity: 0.3 } : this.iscanCanel() ? { opacity: 1 } : { opacity: 0.3 }, className: 'cancelBtn' },
	                            React.createElement(
	                                'p',
	                                { className: this.iscanCanel() ? "select_p2" : "select_p2" },
	                                '\u53D6\u6D88'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: selectdiag, cancelClock: this.canceldia,
	                    submitClock: this.submitdia,
	                    title: this.state.diatitles, content: this.state.diacontents, rightpam: this.state.diaright || '确定' }),
	                React.createElement(_DialogStyle.DialogStyle, { show: selectdiagErro, cancelClock: this.canceldiaerr.bind(this),
	                    submitClock: this.submitdiaerr.bind(this), rightpam: '\u8054\u7CFB\u5BA2\u670D',
	                    title: '\u8BBE\u5907\u6545\u969C', content: '\u6E29\u5EA6\u4F20\u611F\u5668\u5F02\u5E38' }),
	                React.createElement(_LoadImagModel.LoadImagModel, { showLoad: this.state.loading })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/SelectModel', component: _SelectModel.SelectModel })
	    ), document.getElementById('ROOT'));
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
	            var title = this.props.title == undefined ? "默认标题" : this.props.title;
	            var content = this.props.content == undefined ? "--" : this.props.content;
	            var leftpam = this.props.leftpam == undefined ? "取消" : this.props.leftpam;
	            var rightpam = this.props.rightpam == undefined ? "确定" : this.props.rightpam;
	            var show = this.props.show;
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
	                                React.createElement(
	                                    'p',
	                                    { className: 'pop_content' },
	                                    content
	                                )
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectModel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(6);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _TimeSelect = __webpack_require__(10);

	var _Range = __webpack_require__(11);

	var _RanTime = __webpack_require__(12);

	var _StateModel = __webpack_require__(4);

	var _DialogStyle = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var stateModel = new _StateModel.StateModel();

	// 创建React组件

	var SelectModel = exports.SelectModel = function (_BaseComponent) {
	    _inherits(SelectModel, _BaseComponent);

	    function SelectModel(props) {
	        _classCallCheck(this, SelectModel);

	        var _this2 = _possibleConstructorReturn(this, (SelectModel.__proto__ || Object.getPrototypeOf(SelectModel)).call(this, props));

	        het.setTitle(JSON.stringify({ setNavTitle: 1, title: '模式', setNavRightBtnHiden: 1 }));
	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this2.state = {
	            headerTop: isAndroid ? 73 : 64,
	            TempcWorkSet: 0,
	            TempcWorkTime: 0,
	            Timehour: 0,
	            Timemin: 0
	        };
	        _this2.listenStore(_Store.Store); // 监听Store
	        _this2.submitClock = function (h, m) {
	            //console.log("h"+h+'m'+m);
	            _Actions.Actions.selectTime(h, m);
	        };
	        var _this = _this2;
	        _this2.cancelClock = function () {
	            //console.log("取消");
	            _this.setState({
	                selectshow: false

	            });
	        };
	        return _this2;
	    }

	    _createClass(SelectModel, [{
	        key: 'canceldia',
	        value: function canceldia() {
	            //console.log("canceldia/......");
	            this.setState({
	                diaErrShow: 1
	            });
	        }
	    }, {
	        key: 'submitdia',
	        value: function submitdia() {
	            //console.log("submitdia/......");
	            location.href = "tel:4007772009";
	            //location.href="tel:4006366396";
	            this.setState({
	                diaErrShow: 1
	            });
	        }
	    }, {
	        key: 'startEnd',
	        value: function startEnd(e) {
	            var activeIndex = e.target.getAttribute('data-index');
	            this.setState({ TempcWorkSet: 0, TempcWorkTime: 0, Timehour: 0, Timemin: 0, activeIndex: activeIndex }); //选择模式
	            //console.log('select  activeIndex',activeIndex);
	        }
	    }, {
	        key: 'timeClock',
	        value: function timeClock(e) {
	            this.setState({
	                selectshow: true
	            });
	        }
	    }, {
	        key: 'modeStart',
	        value: function modeStart() {
	            if (parseInt(this.state.online) == 2) return false;
	            if (parseInt(this.state.senseError || 0) == 1) {
	                this.setState({
	                    diaErrShow: 0
	                });
	                return false;
	            }
	            //console.log('modeStart');
	            var Hour = parseInt(this.state.hour === undefined ? 0 : this.state.hour); //预约小时
	            var Min = parseInt(this.state.minute === undefined ? 0 : this.state.minute); //预约分钟
	            var CurWorkMode = this.state.activeIndex || 0;
	            //console.log('modeStart' + 'CurWorkMod='+CurWorkMode + 'Hour='+Hour+'Min='+Min);
	            var defTemp = parseInt(stateModel.getAll()[parseInt(CurWorkMode)].defTemp) - parseInt(stateModel.getItem(CurWorkMode).mintemp) + 1;
	            var defTime = parseInt(stateModel.getAll()[parseInt(CurWorkMode)].defTime);
	            var setTemp = parseInt(this.state.TempcWorkSet == 0 ? defTemp : this.state.TempcWorkSet); //设置温度 如果没有选默认
	            var setTime = parseInt(this.state.TempcWorkTime == 0 ? defTime : this.state.TempcWorkTime); //设置时间 如果没有选默认
	            var setHour = parseInt(setTime / 60);
	            var setmin = parseInt(setTime % 60);
	            //console.log('setTemp='+setTemp + 'setTime='+setTime + 'setHour='+setHour+'setmin='+setmin);
	            if (setTemp != 0) {
	                setTemp = setTemp + parseInt(stateModel.getItem(CurWorkMode).mintemp) - 1;
	            } else {
	                setTemp = 0;
	            }
	            _Actions.Actions.modeStart(setHour, setmin, setTemp, parseInt(CurWorkMode), Hour, Min);
	        }
	    }, {
	        key: 'setTempSeek',
	        value: function setTempSeek(e) {
	            console.log("e+" + e.toString);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var activeIndex = this.state.activeIndex || 0;
	            //console.log('activeIndex',activeIndex);
	            var selectshow = this.state.selectshow;
	            var senseError = parseInt(this.state.senseError || 0);
	            var diaErrShow = this.state.diaErrShow || 0; //0 开 1关
	            var selectdiag = senseError == 1 && diaErrShow == 0 ? true : false;
	            var selectTitle = '预约时间';
	            var statusname = '后启动';
	            var hour = parseInt(this.state.hour);
	            var minute = parseInt(this.state.minute);
	            var TempcWorkSet = this.state.TempcWorkSet || 0; //温度设置

	            var Timehour = this.state.Timehour || 0; //时长设置  小时
	            var Timemin = this.state.Timemin || 0; //时长设置   分钟
	            var TempcWorkTime = parseInt(Timehour) * 60 + parseInt(Timemin);

	            var remainTime = hour > 0 || minute > 0 ? (hour > 0 ? hour + '小时' : '') + (minute > 0 ? minute + '分' : '') + '后开始工作' : '- -';
	            var minTemp = parseInt(stateModel.getItem(activeIndex).mintemp) || 35;
	            var maxTemp = parseInt(stateModel.getItem(activeIndex).maxtemp) || 230;
	            var offeTemp = parseInt(stateModel.getItem(activeIndex).defTemp) || 180;

	            var minTime = parseInt(stateModel.getItem(activeIndex).mintime) || 1;
	            var maxTime = parseInt(stateModel.getItem(activeIndex).maxtime) || 120;
	            var offeTime = parseInt(stateModel.getItem(activeIndex).defTime) || 40;
	            if (TempcWorkSet == 0) {
	                TempcWorkSet = offeTemp - minTemp + 1;
	            }
	            if (Timehour == 0 && Timemin == 0) {
	                TempcWorkTime = offeTime - minTime + 1;
	            }
	            return React.createElement(
	                'section',
	                { className: 'SetMode' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: 'rgb(50,133,255)' } }),
	                React.createElement(
	                    'div',
	                    { className: 'modeSel ' },
	                    stateModel.getAll().map(function (item, index) {
	                        return React.createElement(
	                            'div',
	                            { 'data-index': index, key: index, onTouchEnd: _this3.startEnd.bind(_this3) },
	                            React.createElement('i', { className: item.photo + ' ' + (index == activeIndex ? 'active' : ''), 'data-index': index }),
	                            React.createElement(
	                                'span',
	                                { 'data-index': index, className: index == activeIndex ? 'active' : '' },
	                                item.name
	                            )
	                        );
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'selectseek' },
	                    React.createElement(_Range.Range, { value: TempcWorkSet, min: 0, offe: minTemp, max: maxTemp, rate: 1, rangedisable: false }),
	                    React.createElement(_RanTime.RanTime, { value: TempcWorkTime, min: 0, offe: minTime, max: maxTime, rate: 1, rangedisable: false })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'startModel' },
	                    React.createElement(
	                        'div',
	                        { className: 'modeTime' },
	                        React.createElement(
	                            'div',
	                            { className: 'timeOrder', onTouchEnd: this.timeClock.bind(this) },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u9884\u7EA6\u65F6\u95F4'
	                            ),
	                            React.createElement(
	                                'span',
	                                null,
	                                remainTime,
	                                React.createElement('i', null)
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'start', onTouchEnd: this.modeStart.bind(this) },
	                            remainTime == '- -' ? '启动' : '启动预约'
	                        )
	                    ),
	                    React.createElement(_TimeSelect.TimeSelect, { title: selectTitle, minuteshow: true, hourshow: true, hourstep: 1,
	                        minutestep: 1, defaulthour: 1, statusname: statusname, cancelClock: this.cancelClock,
	                        submitClock: this.submitClock, show: selectshow, hourarray: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'], minutearr: ['00', 10, 20, 30, 40, 50] })
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: selectdiag, cancelClock: this.canceldia.bind(this),
	                    submitClock: this.submitdia.bind(this), rightpam: '\u8054\u7CFB\u5BA2\u670D',
	                    title: '\u8BBE\u5907\u6545\u969C', content: '\u6E29\u5EA6\u4F20\u611F\u5668\u5F02\u5E38' })
	            );
	        }
	    }]);

	    return SelectModel;
	}(_BaseComponentClass.BaseComponent);

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
				minutearr = this.props.minutearr;
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
							React.createElement(
								'span',
								{ className: 'timeLeft' },
								'\u70E4\u7BB1\u5C06\u5728'
							),
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 进度条组件
	 * @prop {boolean} rangedisable  滑动条是否可用
	 * @prop {integer} value  	初始值
	 * @prop {integer} rate  		每档间隔值 用来确定档位范围
	 * @prop {integer} min
	 * @prop {integer} max
	 * @prop {integer} offe
	 * @act  Actions.selectRateTemp([integer])  切换档位时触发
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Range = undefined;

	var _Actions = __webpack_require__(2);

	var Range = exports.Range = React.createClass({
		displayName: 'Range',

		getInitialState: function getInitialState() {
			return {
				'showtip': false
			};
		},
		rangechange: function rangechange(e) {
			//处理滑动更改档位
			//console.log("e--->"+e.target.value);
			if (this.props.rangedisable) return;
			var min = this.props.min;
			var value = parseInt(e.target.value) - min;
			value = parseInt(value / this.props.rate) + 1;
			this.setState({
				showtip: false
			});
			_Actions.Actions.selectRateTemp(value);
		},
		rangeTouchEnd: function rangeTouchEnd(e) {
			this.setState({
				showtip: false
			});
			//console.log("rangeTouchEnd e--->"+e.target.value);
			if (this.props.rangedisable) return;
			var min = this.props.min;
			var value = parseInt(e.target.value) + parseInt(this.props.rate);
			value = parseInt(value / this.props.rate);
			_Actions.Actions.selectRateTemp(value);
		},

		render: function render() {
			var statusId = this.props.rangedisable;
			var rangevalue = (this.props.value - 1) * this.props.rate || '0';
			var value = parseInt(this.props.value);
			var minnub = (parseInt(this.props.max - this.props.offe) - parseInt(this.props.min)) / 100;
			var fblock = parseInt(rangevalue / minnub) + '%';
			//console.log("rangeTouchEnd fblock="+fblock);
			var textTemp = parseInt(value - 1) * parseInt(this.props.rate) + this.props.min + this.props.offe;
			//console.log("rangeTouchEnd rangevalue="+rangevalue);
			return React.createElement(
				'section',
				{ className: 'rangSect' },
				React.createElement(
					'p',
					{ className: 'selectTime' },
					'\u70D8\u7119\u6E29\u5EA6:',
					textTemp,
					'\xB0'
				),
				React.createElement(
					'section',
					{ className: 'range' },
					React.createElement(
						'i',
						null,
						this.props.min + this.props.offe
					),
					React.createElement(
						'section',
						{ className: 'rangeblock' },
						React.createElement(
							'section',
							{ className: statusId ? 'tips-off' : 'tips-on', style: { visibility: this.state.showtip ? 'visible' : 'hidden', left: fblock, marginLeft: '-' + 1 * 0.018 - 0.48 + 'rem' } },
							React.createElement(
								'span',
								{ className: 'ratetext' },
								textTemp,
								'\xB0'
							)
						),
						React.createElement('span', { className: 'slider-runnable-track ' + (statusId ? 'slider-off' : 'slider-on') }),
						React.createElement('span', { className: 'slider-runnable-bg-on' }),
						React.createElement('span', { className: 'slider-runnable-bg', style: { width: fblock } }),
						React.createElement('span', { className: statusId ? 'rangeblock-off' : 'rangeblock-on', style: { left: fblock, marginLeft: '-' + 1 * 0.018 + 'rem' } }),
						React.createElement('input', { type: 'range', value: rangevalue, step: this.props.rate, min: this.props.min, max: this.props.max - this.props.offe, className: 'rangevalue', onChange: this.rangechange, onTouchEnd: this.rangeTouchEnd })
					),
					React.createElement(
						'i',
						null,
						this.props.max
					)
				)
			);
		}
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 进度条组件
	 * @prop {boolean} rangedisable  滑动条是否可用
	 * @prop {integer} value  	初始值
	 * @prop {integer} rate  		每档间隔值 用来确定档位范围
	 * @prop {integer} min
	 * @prop {integer} max
	 * @prop {integer} offe
	 * @act  Actions.selectRate([integer])  切换档位时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RanTime = undefined;

	var _Actions = __webpack_require__(2);

	var RanTime = exports.RanTime = React.createClass({
	    displayName: 'RanTime',

	    getInitialState: function getInitialState() {
	        return {
	            'Timeshowtip': false
	        };
	    },
	    rangechange: function rangechange(e) {
	        //处理滑动更改档位
	        if (this.props.rangedisable) return;
	        var min = this.props.min;
	        var value = parseInt(e.target.value) - min;
	        value = parseInt(value / this.props.rate) + 1;
	        this.setState({
	            Timeshowtip: false
	        });
	        _Actions.Actions.selectRateTime(value);
	    },
	    rangeTouchEnd: function rangeTouchEnd(e) {
	        this.setState({
	            Timeshowtip: false
	        });
	        if (this.props.rangedisable) return;
	        var min = this.props.min;
	        var value = parseInt(e.target.value) + parseInt(this.props.rate);
	        value = parseInt(value / this.props.rate);
	        _Actions.Actions.selectRateTime(value);
	    },
	    initTimeFm: function initTimeFm(time) {
	        return parseInt(time) > 10 ? parseInt(time) : "0" + parseInt(time);
	    },

	    render: function render() {
	        var Timeshowtip = this.state.Timeshowtip || false;
	        var statusId = this.props.rangedisable;
	        var rangevalue = (this.props.value - 1) * this.props.rate || '0';
	        var value = parseInt(this.props.value);
	        var minnub = (parseInt(this.props.max - this.props.offe) - parseInt(this.props.min)) / 100;
	        var fblock = parseInt(rangevalue / minnub) + '%';
	        var textNmb = parseInt(value - 1) * parseInt(this.props.rate) + this.props.min + this.props.offe;
	        var textTime = this.initTimeFm(parseInt(textNmb / 60)) + ":" + this.initTimeFm(textNmb % 60);
	        var minText = this.initTimeFm(parseInt(parseInt(this.props.min) + parseInt(this.props.offe) / 60)) + ":" + this.initTimeFm(parseInt(this.props.min) + parseInt(this.props.offe) % 60);
	        var maxText = this.initTimeFm(parseInt(this.props.max) / 60) + ":" + this.initTimeFm(parseInt(this.props.max) % 60);
	        return React.createElement(
	            'section',
	            { className: 'rangSect' },
	            React.createElement(
	                'p',
	                { className: 'selectTime' },
	                '\u70D8\u7119\u65F6\u957F:',
	                textTime
	            ),
	            React.createElement(
	                'section',
	                { className: 'range' },
	                React.createElement(
	                    'i',
	                    null,
	                    minText
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'rangeblock' },
	                    React.createElement(
	                        'section',
	                        { className: statusId ? 'tips-off' : 'tips-on', style: { visibility: Timeshowtip ? 'visible' : 'hidden', left: fblock, marginLeft: '-' + 1 * 0.018 - 0.48 + 'rem' } },
	                        React.createElement(
	                            'span',
	                            { className: 'ratetext' },
	                            textTime
	                        )
	                    ),
	                    React.createElement('span', { className: 'slider-runnable-track ' + (statusId ? 'slider-off' : 'slider-on') }),
	                    React.createElement('span', { className: 'slider-runnable-bg-on' }),
	                    React.createElement('span', { className: 'slider-runnable-bg', style: { width: fblock } }),
	                    React.createElement('span', { className: statusId ? 'rangeblock-off' : 'rangeblock-on', style: { left: fblock, marginLeft: '-' + 1 * 0.018 + 'rem' } }),
	                    React.createElement('input', { type: 'range', value: rangevalue, step: this.props.rate, min: this.props.min, max: this.props.max - this.props.offe, className: 'rangevalue', onChange: this.rangechange, onTouchEnd: this.rangeTouchEnd })
	                ),
	                React.createElement(
	                    'i',
	                    null,
	                    maxText
	                )
	            )
	        );
	    }
	});

/***/ },
/* 13 */
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
	        var show = this.props.showLoad || 1;
	        return React.createElement(
	            "section",
	            { className: "fade_c_section", style: { display: show == 1 ? "" : "none" } },
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

/***/ }
/******/ ]);