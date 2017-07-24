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
	'rename', //自定义烘焙的名称
	'selectMode', //选中烘焙模式
	'selectTime', //烹饪时间及温度确认
	'orderTime', //预约烹饪时间
	'workStyle', //确定烘焙模式
	'turn', //处理开关机事件
	'turnLight', //切换卢灯事件
	'getData', //运行数据初始化界面
	'stop', //暂停按钮事件
	'sethumidity', //设置高低湿度
	'calWork', //退出工作模式，进入待机状态
	'resetTime', //重新设置烘焙时间
	'startWork', //首页快速启动工作模式
	'wetSet', //高低湿设置
	'pullData', //自定义模式从接口拉取数据
	'saveMode', //保存自定义模式
	'modeData', //获取自定义模式保存好的数量
	'deleteMode', //删除自定义模式
	'redefine', //重新定义模式命名
	'begainWork']);

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

	var _fun = __webpack_require__(4);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var AppData = {};
	var OldData = {};
	//判断设备是否离线
	// const AppData.networkavailable==2 = ()=>{
	//     return (AppData.online==2);
	// }

	// //判断手机是否断网
	// const isNetOff = ()=>{
	//     return (AppData.networkavailable==2);
	// };
	var decToHex = function decToHex(dec) {
	  var hex = parseInt(dec).toString(16);
	  return hex.length === 1 ? '0' + hex : hex;
	};
	// 返回过滤后的数据
	var dataFilterTimers = {
	  'setTemperatureLow': 0,
	  'remainingTimeHour': 0,
	  'remainingTimeMin': 0,
	  'Mode': 0,
	  'reservationhour': 0,
	  'reservationmin': 0
	};
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
	    //开启数据筛选
	    var data = dataFilter(datas);
	    if (AppData.returnRepaint === true) return;
	    if (data.end == 1) data.defineWork == false;
	    AppData = _fun.Funs._extends(AppData, data);

	    this.trigger(data);
	  },
	  onRename: function onRename(value) {
	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {

	      het.toast('请检查网络');
	      return;
	    }
	    AppData.value = value;
	    this.trigger({ value: AppData.value });
	  },
	  onGetData: function onGetData() {

	    this.trigger(AppData);
	  },
	  onSelectTime: function onSelectTime(hour, minute) {
	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');

	      return;
	    }
	    AppData.temperature = hour;
	    AppData.time = minute;
	    this.trigger({ temperature: AppData.temperature, time: AppData.time });
	  },
	  onOrderTime: function onOrderTime(h, m) {
	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');
	      return;
	    }
	    AppData.orderHour = h;
	    AppData.orderMinute = m;
	    this.trigger({ orderHour: AppData.orderHour, orderMinute: AppData.orderMinute });
	  },
	  onWorkStyle: function onWorkStyle(mode, tem, time, hour, minute) {

	    AppData.defineWork = false;
	    AppData.returnRepaint = true;
	    setTimeout(function () {
	      AppData.returnRepaint = false;
	    }, 15000);
	    setDataTimer('setTemperatureLow', 'remainingTimeHour', 'remainingTimeMin', 'Mode', 'reservationhour', 'reservationmin');
	    if (AppData.online == 2) {
	      het.toast('设备不在线');

	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');
	      return;
	    }
	    switch (mode.length) {
	      case 1:
	        AppData.mode = mode[0];
	        AppData.temperatureHigh = 0;
	        AppData.temperatureLow = tem[0];
	        AppData.timerHour = parseInt(parseInt(time[0]) / 60);
	        AppData.timerMin = parseInt(time[0]) % 60;
	        AppData.Mode = mode[0];
	        AppData.remainingTimeHour = parseInt(parseInt(time[0]) / 60);
	        AppData.remainingTimeMin = parseInt(time[0]) % 60;
	        AppData.mode1 = 0;
	        AppData.mode2 = 0;
	        AppData.timerHour1 = 0;
	        AppData.timerHour2 = 0;
	        AppData.timerMin1 = 0;
	        AppData.timerMin2 = 0;
	        AppData.temperatureHigh1 = 0;
	        AppData.tempertatureHigh2 = 0;
	        AppData.temperatureLow1 = 0;
	        AppData.temperatureLow2 = 0;
	        AppData.features = 1;
	        AppData.start = 1;
	        AppData.power = 1;
	        AppData.setTemperatureLow = tem[0];
	        if (hour == 0 && minute == 0) {
	          AppData.reservationHour = 0;
	          AppData.reservationMin = 0;
	          this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, Mode: AppData.Mode });
	          var arr1 = [0, 1, 6, 7, 11, 12, 19, 20];
	          AppData.updateFlag = 0;
	          for (var key = 0; key < arr1.length; key++) {
	            AppData.updateFlag = het.hexUpFlag(arr1[key], 1, 6, AppData.updateFlag);
	          }
	          this.trigger(AppData);
	          het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	          });
	        } else {
	          AppData.reservationHour = parseInt(hour) + parseInt(parseInt(time[0]) / 60);
	          AppData.reservationMin = parseInt(minute) + parseInt(time[0]) % 60;
	          AppData.reservationhour = parseInt(hour) + parseInt(parseInt(time[0]) / 60);
	          AppData.reservationmin = parseInt(minute) + parseInt(time[0]) % 60;
	          this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, reservationHour: AppData.reservationHour, reservationMin: AppData.reservationMin, reservationhour: AppData.reservationhour, reservationmin: AppData.reservationmin, Mode: AppData.Mode });
	          var _arr = [0, 1, 4, 5, 6, 7, 11, 12, 19, 20];
	          AppData.updateFlag = 0;
	          for (var _key2 = 0; _key2 < _arr.length; _key2++) {
	            AppData.updateFlag = het.hexUpFlag(_arr[_key2], 1, 6, AppData.updateFlag);
	          }
	          this.trigger(AppData);
	          het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	          });
	        }

	        break;
	      case 2:
	        AppData.mode = mode[0];
	        AppData.mode1 = mode[1];
	        AppData.temperatureHigh = 0;
	        AppData.tempertatureHigh1 = 0;
	        AppData.temperatureLow = tem[0];
	        AppData.temperatureLow1 = tem[1];
	        AppData.timerHour = parseInt(parseInt(time[0]) / 60);
	        AppData.timerHour1 = parseInt(parseInt(time[1]) / 60);
	        AppData.timerMin = parseInt(time[0]) % 60;
	        AppData.timerMin1 = parseInt(time[1]) % 60;
	        AppData.reservationHour = hour;
	        AppData.reservationMin = minute;
	        AppData.Mode = mode[0];
	        AppData.features = 2;
	        AppData.start = 1;
	        AppData.setTemperatureLow = tem[0];
	        AppData.remainingTimeHour = parseInt(parseInt(time[0]) / 60);
	        AppData.remainingTimeMin = parseInt(time[0]) % 60;
	        AppData.power = 1;
	        if (hour == 0 && minute == 0) {
	          AppData.reservationHour = 0;
	          AppData.reservationMin = 0;
	          this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, Mode: AppData.Mode });
	          AppData.updateFlag = 0;
	          var arr2 = [0, 1, 6, 7, 8, 11, 12, 13, 14, 16, 19, 20, 21, 22];
	          for (var _key3 = 0; _key3 < arr2.length; _key3++) {
	            AppData.updateFlag = het.hexUpFlag(arr2[_key3], 1, 6, AppData.updateFlag);
	          }
	          this.trigger(AppData);
	          het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	          });
	        } else {
	          AppData.updateFlag = 0;
	          AppData.reservationHour = parseInt(hour) + parseInt(parseInt(time[0]) / 60);
	          AppData.reservationMin = parseInt(minute) + parseInt(time[0]) % 60;
	          AppData.reservationhour = parseInt(hour) + parseInt(parseInt(time[0]) / 60) + parseInt(parseInt(time[1]) / 60);
	          AppData.reservationmin = parseInt(minute) + parseInt(time[0]) % 60 + parseInt(time[1]) % 60;
	          this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, reservationHour: AppData.reservationHour, reservationMin: AppData.reservationMin, reservationhour: AppData.reservationhour, reservationmin: AppData.reservationmin, Mode: AppData.Mode });
	          var _arr2 = [0, 1, 4, 5, 6, 7, 8, 11, 12, 13, 14, 16, 19, 20, 21, 22];
	          for (var _key4 = 0; _key4 < _arr2.length; _key4++) {
	            AppData.updateFlag = het.hexUpFlag(_arr2[_key4], 1, 6, AppData.updateFlag);
	          }
	          this.trigger(AppData);
	          het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	          });
	        }
	        break;
	      case 3:
	        AppData.mode = mode[0];
	        AppData.mode1 = mode[1];
	        AppData.mode2 = mode[2];
	        AppData.temperatureHigh = 0;
	        AppData.tempertatureHigh1 = 0;
	        AppData.tempertatureHigh2 = 0;
	        AppData.temperatureLow = tem[0];
	        AppData.temperatureLow1 = tem[1];
	        AppData.temperatureLow2 = tem[2];
	        AppData.timerHour = parseInt(parseInt(time[0]) / 60);
	        AppData.timerHour1 = parseInt(parseInt(time[1]) / 60);
	        AppData.timerHour2 = parseInt(parseInt(time[2]) / 60);
	        AppData.timerMin = parseInt(time[0]) % 60;
	        AppData.timerMin1 = parseInt(time[1]) % 60;
	        AppData.timerMin2 = parseInt(time[2]) % 60;
	        AppData.reservationHour = hour;
	        AppData.reservationMin = minute;
	        AppData.updateFlag = 0;
	        AppData.Mode = mode[0];
	        AppData.remainingTimeHour = parseInt(parseInt(time[0]) / 60);
	        AppData.remainingTimeMin = parseInt(parseInt(time[0]) % 60);
	        AppData.features = 2;
	        AppData.updateFlag = 0;
	        AppData.start = 1;
	        AppData.setTemperatureLow = tem[0];
	        AppData.reservationhour = hour;
	        AppData.reservationmin = minute;
	        AppData.power = 1;
	        if (hour == 0 && minute == 0) {
	          AppData.reservationHour = 0;
	          AppData.reservationMin = 0;
	          this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, Mode: AppData.mode });
	          AppData.updateFlag = 0;
	          var arr = [0, 1, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24];
	          for (var _key5 = 0; _key5 < arr.length; _key5++) {
	            AppData.updateFlag = het.hexUpFlag(arr[_key5], 1, 6, AppData.updateFlag);
	          }
	          this.trigger(AppData);
	          het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	          });
	        } else {
	          AppData.updateFlag = 0;
	          AppData.reservationHour = parseInt(hour) + parseInt(parseInt(time[0]) / 60);
	          AppData.reservationMin = parseInt(minute) + parseInt(time[0]) % 60;
	          AppData.reservationhour = parseInt(hour) + parseInt(parseInt(time[0]) / 60);
	          AppData.reservationmin = parseInt(minute) + parseInt(time[0]) % 60;
	          this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, reservationHour: AppData.reservationHour, reservationMin: AppData.reservationMin, reservationhour: AppData.reservationhour, reservationmin: AppData.reservationmin, Mode: AppData.Mode });
	          var _arr3 = [0, 1, 4, 5, 6, 7, 8, 11, 12, 13, 14, 16, 19, 20, 21, 22, 23, 24];
	          for (var _key6 = 0; _key6 < _arr3.length; _key6++) {
	            AppData.updateFlag = het.hexUpFlag(_arr3[_key6], 1, 6, AppData.updateFlag);
	          }
	          this.trigger(AppData);
	          het.send(AppData, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	          });
	        }
	      default:

	        break;
	    }
	  },
	  onTurn: function onTurn(nowper) {

	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {

	      het.toast('请检查网络');
	      return;
	    }
	    AppData.power = nowper;
	    this.trigger({ power: AppData.power });
	    AppData.updateFlag = het.hexUpFlag(0, 1, 6);
	    het.send(AppData, function (data) {}, function (data) {
	      het.toast("命令发送失败");
	    });
	  },
	  onTurnLight: function onTurnLight(light) {
	    if (AppData.online == 2) {
	      het.toast('请检查网络');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    AppData.ovenled = light;
	    AppData.updateFlag = het.hexUpFlag(2, 1, 6);
	    this.trigger(AppData);
	    het.send(AppData, function (data) {}, function (data) {
	      het.toast("命令发送失败");
	    });
	  },
	  onStop: function onStop(stop) {
	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');

	      return;
	    }
	    AppData.start = stop;
	    AppData.updateFlag = het.hexUpFlag(1, 1, 6);
	    this.trigger(AppData);
	    het.send(AppData, function (data) {}, function (data) {
	      het.toast("命令发送失败");
	    });
	  },
	  onSethumidity: function onSethumidity(mode) {
	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');

	      return;
	    }
	    AppData.humidityControl = mode;
	    AppData.updateFlag = het.hexUpFlag(3, 1, 6);
	    this.trigger({ humidityControl: AppData.humidityControl });
	    het.send(AppData, function (data) {}, function (data) {
	      het.toast("命令发送失败");
	    });
	  },
	  onCalWork: function onCalWork() {

	    AppData.returnRepaint = true;
	    setTimeout(function () {
	      AppData.returnRepaint = false;
	    }, 15000); //防止数据对界面引起的跳变
	    setDataTimer('Mode');
	    if (AppData.online == 2) {
	      het.toast('设备不在线');

	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');
	      return;
	    }
	    AppData.power = 1;
	    AppData.ovenled = 3;
	    AppData.mode = 0;
	    AppData.mode1 = 0;
	    AppData.mode2 = 0;
	    AppData.temperatureHigh = 0;
	    AppData.tempertatureHigh1 = 0;
	    AppData.tempertatureHigh2 = 0;
	    AppData.features = 3;
	    AppData.reservationHour = 0;
	    AppData.reservationMin = 0;
	    AppData.timerHour = 0;
	    AppData.timerHour1 = 0;
	    AppData.timerHour2 = 0;
	    AppData.timerMin = 0;
	    AppData.timerMin1 = 0;
	    AppData.timeMin2 = 0;
	    AppData.temperatureLow = 0;
	    AppData.temperatureLow1 = 0;
	    AppData.temperatureLow2 = 0;
	    AppData.humidityControl = 0;
	    AppData.Mode = 0;
	    AppData.reservationhour = 0;
	    AppData.reservationmin = 0;
	    AppData.restart = false;
	    AppData.defineWork = false;
	    this.trigger({ defineWork: AppData.defineWork });
	    // AppData.start=16;
	    this.trigger(_defineProperty({ Mode: AppData.Mode, mode: AppData.mode, start: AppData.start }, 'mode', AppData.mode));
	    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24];
	    for (var key = 0; key < arr.length; key++) {
	      AppData.updateFlag = het.hexUpFlag(arr[key], 1, 2, AppData.updateFlag);
	    }
	    this.trigger(AppData);
	    het.send(AppData, function (data) {
	      console.log(data);
	    }, function (data) {
	      het.toast("命令发送失败");
	    });
	  },
	  onResetTime: function onResetTime(h, m) {
	    AppData.returnRepaint = true;
	    setTimeout(function () {
	      AppData.returnRepaint = false;
	    }, 15000); //防止数据对界面引起的跳变
	    setDataTimer('remainingTimeHour', 'reservationmin');
	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');

	      return;
	    }
	    AppData.timerHour = h;
	    AppData.timerMin = m;
	    AppData.updateFlag = het.hexUpFlag(19, 1, 4, het.hexUpFlag(20, 1, 6));
	    AppData.remainingTimeHour = h;
	    AppData.remainingTimeMin = m;
	    this.trigger({ timerHour: AppData.timerHour, timerMin: AppData.timerMin, remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin });
	    het.send(AppData, function (data) {}, function (data) {
	      het.toast("命令发送失败");
	    });
	  },
	  onStartWork: function onStartWork(pattern, tem) {

	    if (AppData.online == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('请检查网络');

	      return;
	    }
	    AppData.mode = pattern;
	    AppData.temperatureHigh = 0;
	    AppData.temperatureLow = tem;
	    AppData.timerHour = 0;
	    AppData.timerMin = 20;
	    AppData.features = 1;
	    AppData.start = 1;
	    AppData.Mode = pattern;
	    AppData.remainingTimeHour = 0;
	    AppData.remainingTimeMin = 20;
	    AppData.power = 1;
	    this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, Mode: AppData.Mode });
	    var arr = [0, 1, 6, 7, 11, 12, 19, 20];
	    AppData.updateFlag = 0;
	    for (var key = 0; key < arr.length; key++) {
	      AppData.updateFlag = het.hexUpFlag(arr[key], 1, 6, AppData.updateFlag);
	    }
	    het.send(AppData, function (data) {}, function (data) {
	      het.toast("命令发送失败");
	    });
	  },
	  onPullData: function onPullData() {
	    var deviceId = AppData.deviceId;
	    var data = {
	      "deviceId": deviceId
	    };
	    var _this = this;
	    var url = '/v1/app/customization/royalstar/getModeList';
	    var sucCallback = function sucCallback(data) {
	      var res = JSON.parse(data);
	      if (res.code == 0) {

	        _this.trigger({ modeArr: res.data.list, rePull: 1 });
	      } else {
	        het.toast(res.msg);
	      };
	    };
	    var errCallback = function errCallback(data) {
	      het.toast('网络异常或设备不在线');
	    };
	    het.get(url, data, sucCallback, errCallback);
	  },
	  onModeData: function onModeData() {
	    var deviceId = AppData.deviceId;
	    var data = {
	      "deviceId": deviceId
	    };
	    var url = '/v1/app/customization/royalstar/getModeCount';
	    var _this = this;
	    var sucCallback = function sucCallback(data) {
	      var res = JSON.parse(data);
	      if (res.code == 0) {

	        _this.trigger({ modedata: res.data, rePull: 1 });
	      } else {
	        het.toast(res.msg);
	      };
	    };
	    var errCallback = function errCallback(data) {
	      het.toast('网络异常或设备不在线');
	    };
	    het.get(url, data, sucCallback, errCallback);
	  },
	  onSaveMode: function onSaveMode(mode, tem, time, value) {
	    var deviceId = AppData.deviceId;
	    var url1 = '/v1/app/customization/royalstar/delUselessMode';
	    var data1 = {
	      "deviceId": deviceId
	    };
	    var sucCallback = function sucCallback(data) {

	      var res = JSON.parse(data);
	      if (res.code == 0) {
	        var stepList = void 0;
	        switch (mode.length) {
	          case 1:
	            stepList = JSON.stringify([{ 'modeType': mode[0], 'temp': tem[0], 'minutes': time[0] }]);
	            break;
	          case 2:
	            stepList = JSON.stringify([{ 'modeType': mode[0], 'temp': tem[0], 'minutes': time[0] }, { 'modeType': mode[1], 'temp': tem[1], 'minutes': time[1] }]);
	            break;
	          case 3:
	            stepList = JSON.stringify([{ 'modeType': mode[0], 'temp': tem[0], 'minutes': time[0] }, { 'modeType': mode[1], 'temp': tem[1], 'minutes': time[1] }, { 'modeType': mode[2], 'temp': tem[2], 'minutes': time[2] }]);
	            break;
	          default:
	            break;
	        }
	        var url = '/v1/app/customization/royalstar/addMode';
	        var _data = {
	          "deviceId": deviceId,
	          'stepList': stepList,
	          'modeName': value
	        };

	        var sucCallback1 = function sucCallback1(data) {
	          var res = JSON.parse(data);
	          if (res.code == 0) {} else {
	            het.toast(res.msg);
	          };
	        };
	        var errCallback1 = function errCallback1(data) {
	          het.toast('网络异常或设备不在线');
	        };
	        het.get(url, _data, sucCallback1, errCallback);
	      } else {
	        het.toast(res.msg);
	      };
	    };
	    var errCallback = function errCallback(data) {
	      het.toast('网络异常或设备不在线');
	    };

	    het.get(url1, data1, sucCallback, errCallback);
	  },
	  onDeleteMode: function onDeleteMode(mode) {
	    var url = '/v1/app/customization/royalstar/delMode';
	    var deviceId = AppData.deviceId;
	    var data = {
	      "deviceId": deviceId,
	      'modeId': mode
	    };
	    var _this = this;
	    var sucCallback = function sucCallback(data) {
	      var res = JSON.parse(data);
	      if (res.code == 0) {
	        _this.trigger({ rePull: res.code });
	        // alert('进来了没？')

	      } else {
	        het.toast(res.msg);
	      };
	    };
	    var errCallback = function errCallback(data) {
	      het.toast('网络异常或设备不在线');
	    };
	    het.get(url, data, sucCallback, errCallback);
	  },
	  onRedefine: function onRedefine(modeId, name) {
	    var url = '/v1/app/customization/royalstar/updataMode';
	    var deviceId = AppData.deviceId;
	    var data = {
	      'deviceId': deviceId,
	      'modeId': modeId,
	      'modeName': name
	    };

	    var sucCallback = function sucCallback(data) {
	      var res = JSON.parse(data);
	      if (res.code == 0) {} else {
	        het.toast(res.msg);
	      };
	    };
	    var errCallback = function errCallback(data) {
	      het.toast('网络异常或设备不在线');
	    };
	    het.get(url, data, sucCallback, errCallback);
	  },
	  onBegainWork: function onBegainWork(modeArr) {
	    if (AppData.online == 2) {
	      het.toast('请检查网络');
	      return;
	    }
	    if (AppData.networkavailable == 2) {
	      het.toast('设备不在线');
	      return;
	    }
	    AppData.defineWork = true;
	    this.trigger({ defineWork: AppData.defineWork });
	    this.trigger(AppData);
	    AppData.returnRepaint = true;
	    setTimeout(function () {
	      AppData.returnRepaint = false;
	    }, 15000);
	    switch (modeArr.length) {
	      case 1:
	        AppData.mode = modeArr[0].modeType;
	        AppData.temperatureHigh = 0;
	        AppData.temperatureLow = modeArr[0].temp;
	        AppData.timerHour = parseInt(parseInt(modeArr[0].minutes) / 60);
	        AppData.timerMin = parseInt(modeArr[0].minutes) % 60;
	        AppData.Mode = modeArr[0].modeType;
	        AppData.remainingTimeHour = parseInt(parseInt(modeArr[0].minutes) / 60);
	        AppData.remainingTimeMin = parseInt(modeArr[0].minutes) % 60;
	        AppData.features = 1;
	        AppData.start = 1;
	        AppData.power = 1;
	        AppData.setTemperatureLow = modeArr[0].temp;
	        AppData.updateFlag = 0;
	        AppData.reservationHour = 0;
	        AppData.reservationMin = 0;
	        this.trigger(AppData);

	        var arr1 = [0, 1, 6, 7, 11, 12, 19, 20];
	        for (var key = 0; key < arr1.length; key++) {
	          AppData.updateFlag = het.hexUpFlag(arr1[key], 1, 6, AppData.updateFlag);
	        }
	        het.send(AppData, function (data) {}, function (data) {
	          het.toast("命令发送失败");
	        });

	        break;
	      case 2:
	        AppData.mode = modeArr[0].modeType;
	        AppData.mode1 = modeArr[1].modeType;
	        AppData.temperatureHigh = 0;
	        AppData.tempertatureHigh1 = 0;
	        AppData.temperatureLow = modeArr[0].temp;
	        AppData.temperatureLow1 = modeArr[1].temp;
	        AppData.timerHour = parseInt(parseInt(modeArr[0].minutes) / 60);
	        AppData.timerHour1 = parseInt(parseInt(modeArr[1].minutes) / 60);
	        AppData.timerMin = parseInt(modeArr[0].minutes) % 60;
	        AppData.timerMin1 = parseInt(modeArr[1].minutes) % 60;
	        AppData.Mode = modeArr[0].modeType;
	        AppData.features = 2;
	        AppData.start = 1;
	        AppData.setTemperatureLow = modeArr[0].temp;
	        AppData.remainingTimeHour = parseInt(parseInt(modeArr[0].minutes) / 60);
	        AppData.remainingTimeMin = parseInt(modeArr[0].minutes) % 60;
	        AppData.power = 1;
	        AppData.reservationHour = 0;
	        AppData.reservationMin = 0;
	        this.trigger(AppData);
	        var arr2 = [0, 1, 6, 7, 8, 11, 12, 13, 14, 16, 19, 20, 21, 22];
	        AppData.updateFlag = 0;
	        for (var _key7 = 0; _key7 < arr2.length; _key7++) {
	          AppData.updateFlag = het.hexUpFlag(arr2[_key7], 1, 6, AppData.updateFlag);
	        }
	        het.send(AppData, function (data) {}, function (data) {
	          het.toast("命令发送失败");
	        });
	        break;
	      case 3:
	        AppData.mode = modeArr[0].modeType;
	        AppData.mode1 = modeArr[1].modeType;
	        AppData.mode2 = modeArr[2].modeType;
	        AppData.temperatureHigh = 0;
	        AppData.tempertatureHigh1 = 0;
	        AppData.tempertatureHigh2 = 0;
	        AppData.temperatureLow = modeArr[0].temp;
	        AppData.temperatureLow1 = modeArr[1].temp;
	        AppData.temperatureLow2 = modeArr[2].temp;
	        AppData.timerHour = parseInt(parseInt(modeArr[0].minutes) / 60);
	        AppData.timerHour1 = parseInt(parseInt(modeArr[1].minutes) / 60);
	        AppData.timerHour2 = parseInt(parseInt(modeArr[2].minutes) / 60);
	        AppData.timerMin = parseInt(modeArr[0].minutes) % 60;
	        AppData.timerMin1 = parseInt(modeArr[1].minutes) % 60;
	        AppData.timerMin2 = parseInt(modeArr[2].minutes) % 60;
	        AppData.Mode = modeArr[0].modeType;
	        AppData.remainingTimeHour = parseInt(parseInt(modeArr[0].minutes) / 60);
	        AppData.remainingTimeMin = parseInt(parseInt(modeArr[0].minutes) % 60);
	        AppData.features = 2;
	        AppData.start = 1;
	        AppData.setTemperatureLow = modeArr[0].temp;
	        AppData.power = 1;
	        AppData.reservationHour = 0;
	        AppData.reservationMin = 0;
	        AppData.updateFlag = 0;
	        this.trigger({ remainingTimeHour: AppData.remainingTimeHour, remainingTimeMin: AppData.remainingTimeMin, setTemperatureLow: AppData.setTemperatureLow, Mode: AppData.mode });
	        AppData.updateFlag = 0;
	        var arr = [0, 1, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23, 24];
	        for (var _key8 = 0; _key8 < arr.length; _key8++) {
	          AppData.updateFlag = het.hexUpFlag(arr[_key8], 1, 6, AppData.updateFlag);
	        }
	        this.trigger(AppData);
	        het.send(AppData, function (data) {}, function (data) {
	          het.toast("命令发送失败");
	        });
	        break;

	      default:
	        break;

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
	exports.Funs = undefined;

	var _fun = __webpack_require__(5);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _Pattern = __webpack_require__(9);

	var _Define = __webpack_require__(13);

	var _TimeSelect = __webpack_require__(15);

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
	        debugMode: 'print',
	        updateFlagMap: {},
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

	        _this.state = {
	            Mode: 0, //默认为待机模式
	            roastIndex: 0, //默认为烘焙中
	            show: false, //是否显示时间组件
	            modelPop: false, //显示高低湿度组件
	            currentRunMode: 0, //默认当前未选择高低湿度
	            ovenled: 3, //默认卢灯处于关闭状态
	            reservationhour: 0, //预约剩余小时
	            // power:16,
	            reservationmin: 0, //默认选择剩余分钟为0
	            start: 1, //默认为启动的
	            isShowAlert: false, //默认不弹出取消对话框
	            orderAlert: false, //默认不弹出预约取消对话框
	            changeDefault: false };
	        _this.listenStore(_Store.Store);

	        _this.modeSelect = _this.modeSelect.bind(_this);
	        _this.cancelclock = _this.cancelclock.bind(_this);
	        _this.closePop = _this.closePop.bind(_this);
	        _this.changeMode = _this.changeMode.bind(_this);
	        _this.setTime = _this.setTime.bind(_this);
	        _this.turnHandler = _this.turnHandler.bind(_this); //设备开关机操作
	        _this.handLight = _this.handLight.bind(_this); //卢灯切换操作
	        _this.componentWillMount = _this.componentWillMount.bind(_this);
	        _this.handStop = _this.handStop.bind(_this); //暂停按钮操作
	        _this.componentMount = _this.componentMount.bind(_this);
	        _this.cancelWork = _this.cancelWork.bind(_this); //取消工作模式
	        _this.control = _this.control.bind(_this);
	        _this.resetTime = _this.resetTime.bind(_this); //重新设置烘焙时间事件

	        het.setTitle(JSON.stringify({ setNavTitle: 0, title: '模式', setNavRightBtnHiden: 0 }));
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {

	            _Actions.Actions.getData();
	        }
	    }, {
	        key: 'control',
	        value: function control() {
	            this.setState({ changeDefault: false });
	        }
	    }, {
	        key: 'componentMount',
	        value: function componentMount() {}
	    }, {
	        key: 'setTime',
	        value: function setTime() {
	            if (this.state.reservationhour || this.state.reservationmin) return;
	            this.setState({ show: true, changeDefault: true });
	        }
	    }, {
	        key: 'resetTime',
	        value: function resetTime(minute) {
	            var hour = parseInt(parseInt(minute) / 60);
	            var newminute = parseInt(minute) % 60;
	            _Actions.Actions.resetTime(hour, newminute);
	            setTimeout(function (data) {
	                _Actions.Actions.repaint(data);
	            }, 5000);
	        }
	    }, {
	        key: 'handStop',
	        value: function handStop() {
	            if (this.state.reservationhour || this.state.reservationmin) return;
	            if (this.state.Mode) {
	                var newstart = this.state.start == 16 ? 1 : 16;
	                this.setState({ start: newstart });
	                _Actions.Actions.stop(newstart);
	            }
	        }
	    }, {
	        key: 'modeSelect',
	        value: function modeSelect() {
	            if (this.state.reservationhour || this.state.reservationmin) return;
	            if (this.state.power == 16) return;
	            if (this.state.Mode == 2 || this.state.Mode == 3) {
	                this.setState({ modelPop: true });
	            }
	            return;
	        }
	    }, {
	        key: 'turnHandler',
	        value: function turnHandler(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            if (this.state.power == 0 || this.state.power == 16 || this.state.power === undefined) {
	                _Actions.Actions.turn(1);
	            };
	            if (this.state.power === 1) {
	                _Actions.Actions.turn(16);
	            }
	        }
	    }, {
	        key: 'handLight',
	        value: function handLight() {
	            if (this.state.power == 16 || this.state.power == undefined) return;
	            var newOvenled = parseInt(this.state.ovenled == 3 ? 0 : this.state.ovenled) + 1;
	            this.setState({ ovenled: newOvenled });
	            _Actions.Actions.turnLight(newOvenled);
	        }
	    }, {
	        key: 'cancelclock',
	        value: function cancelclock() {
	            this.setState({ show: false });
	        }
	    }, {
	        key: 'changeMode',
	        value: function changeMode(e) {
	            //选择高低湿度
	            if (this.state.Mode == 2 || this.state.Mode == 3 || this.state.mode == 2 || this.state.mode == 3) {
	                var target = e.currentTarget;
	                var currentRunMode = target.getAttribute("data-mode");
	                this.setState({ currentRunMode: currentRunMode, modelPop: false });
	                _Actions.Actions.sethumidity(currentRunMode);
	            }
	        }
	    }, {
	        key: 'closePop',
	        value: function closePop() {
	            // 关闭弹窗
	            if (this.state.modelPop) {
	                this.setState({ modelPop: false });
	            }
	        }
	    }, {
	        key: 'cancelWork',
	        value: function cancelWork() {
	            setTimeout(function (data) {
	                _Actions.Actions.repaint(data);
	            }, 5000);
	            if (this.state.Mode == 0 || this.state.Mode === undefined) return;
	            if (this.state.reservationhour || this.state.reservationmin) {
	                this.setState({ orderAlert: true });
	            } else {
	                this.setState({ isShowAlert: true });
	            }
	        }
	    }, {
	        key: 'btnClose',
	        value: function btnClose() {

	            _Actions.Actions.calWork();
	            this.setState({ isShowAlert: false, orderAlert: false });
	        }
	    }, {
	        key: 'btnCancel',
	        value: function btnCancel() {
	            this.setState({ isShowAlert: false, orderAlert: false });
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            var errorMessage = '';
	            var aLarm1 = this.state.alarm1 !== nextState.alarm1 && nextState.alarm1 == 1;
	            var aLarm2 = this.state.alarm2 !== nextState.alarm2 && nextState.alarm2 == 1;
	            var aLarm3 = this.state.alarm3 !== nextState.alarm3 && nextState.alarm3 == 1;
	            var aLarm4 = this.state.alarm4 !== nextState.alarm4 && nextState.alarm4 == 1;
	            var aLarm5 = this.state.alarm5 !== nextState.alarm5 && nextState.alarm5 == 1;
	            var aLarm6 = this.state.alarm6 !== nextState.alarm6 && nextState.alarm6 == 1;
	            errorMessage = aLarm1 ? '腔体高温保护' : '';
	            errorMessage = aLarm2 ? errorMessage + '蒸发盘高温保护' : errorMessage;
	            errorMessage = aLarm3 ? errorMessage + '腔体低温保护' : errorMessage;
	            errorMessage = aLarm4 ? errorMessage + '蒸发盘低温保护' : errorMessage;
	            errorMessage = aLarm5 ? errorMessage + '传感器连接故障' : errorMessage;
	            errorMessage = aLarm6 ? errorMessage + '传感器感应故障' : errorMessage;
	            if (errorMessage) het.toast(JSON.stringify({ contactService: errorMessage, tel: '400-777-2009' }));
	            // if(this.state.end==1){Actions.calWork();};
	            //设备故障处理
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var is = this.state;
	            var isTrue = is.reservationhour || is.reservationmin ? true : false; //为true时为预约状态
	            var definepath = this.state.power == 16 || this.state.power === undefined ? '' : '/define';

	            var path = this.state.Mode == 0 && this.state.power == 1 ? "/pattern" : ''; //路由的跳转
	            var modelPop = this.state.modelPop;
	            var waitText = ['待机中', '已关机'][this.state.power == 16 || this.state.power === undefined || this.state.power == 0 ? 1 : 0];
	            var roastText = ['烘焙中', '预约中'][isTrue == true ? 1 : 0];
	            var popStyle = modelPop ? { display: 'block' } : { display: 'none' };
	            var modelPopStyle = modelPop ? { bottom: 0 } : { bottom: '-23.75rem' };
	            var currentRunMode = this.state.currentRunMode || this.state.humidityControl;
	            var workImageArr = ['firstMode3.png', 'firstMode3.png', 'secondMode3.png', 'thirdMode3.png', 'fourMode3.png', 'fiveMode3.png', 'sixMode3.png', 'sevenMode3.png', 'eightMode3.png', 'nineMode3.png', 'tenMode3.png', 'elevenMode3.png', 'twelveMode3.png', 'thirteenMode3.png'];
	            var workSrc = '../static/img/' + workImageArr[this.state.Mode]; //模式按钮图标
	            var wetImageArr = ['lowselected.png', 'middleselected.png', 'highselected.png', 'waternormal.png'];
	            var wetSrc1 = '../static/img/' + wetImageArr[this.state.humidityControl == undefined || this.state.humidityControl == 0 ? 3 : this.state.humidityControl - 1]; //高低湿按钮
	            var wetSrc2 = '../static/img/waterdis.png';
	            var wetSrc = (this.state.Mode == 2 || this.state.Mode == 3) && isTrue != true ? wetSrc1 : wetSrc2;
	            var wetArr = ['低湿', '中湿', '高湿'];
	            var wetText1 = wetArr[this.state.humidityControl == undefined || this.state.humidityControl == 0 ? 0 : this.state.humidityControl - 1];
	            var wetText2 = '低湿';
	            var wetText = this.state.Mode == 2 || this.state.Mode == 3 ? wetText1 : wetText2;
	            var defineImageArr = ['define_normal.png', 'define_disabled.png'];
	            var defineSrc = '../static/img/' + defineImageArr[this.state.Mode == 0 && (this.state.power == 16 || this.state.power == undefined || this.state.power == 0) ? 1 : 0]; //自定义模式图标
	            var stopImageArr = ['control_disabled.png', 'control_normal.png', 'start.png'];
	            var stopSrc = '../static/img/' + stopImageArr[this.state.Mode == 0 || isTrue == true ? 0 : this.state.start == 16 ? 2 : this.state.start]; //暂停按钮图标
	            var cancelImgeArr = ['cancel_disabled .png', 'cancel_button_normal.png'];
	            var cancelSrc = '../static/img/' + cancelImgeArr[this.state.Mode == 0 ? 0 : 1]; //取消按钮图标
	            var patterArr = ['moshi.png', 'unmoshi.png'];
	            var patternSrc = '../static/img/' + patterArr[this.state.Mode == 0 && this.state.power == 1 ? 0 : 1]; //模式按钮图标
	            var lightArr = ['light_button_selected.png', 'light_button_selected.png', 'light_normal.png', 'light_disabled.png'];
	            var lightSrc = '../static/img/' + lightArr[this.state.power == 16 || this.state.power === undefined ? 3 : this.state.ovenled === undefined || this.state.ovenled == 0 ? 2 : this.state.ovenled - 1]; //卢灯按钮图标
	            var textArr = ['短亮', '长亮', '炉灯关'];
	            var lightText = textArr[this.state.ovenled == 0 ? 2 : this.state.ovenled - 1];
	            var workingArr = ['firstMode4.png', 'secondMode4.png', 'thirdMode4.png', 'fourMode4.png', 'fiveMode4.png', 'sixMode4.png', 'sevenMode4.png', 'eightMode4.png', 'nineMode4.png', 'tenMode4.png', 'elevenMode4.png', 'twelveMode4.png', 'thirteenMode4.png'];
	            var workingSrc = '../static/img/' + workingArr[this.state.Mode - 1]; //正在运行的图标
	            var willworkArr = ['firstMode2.png', 'secondMode2.png', 'thirdMode2.png', 'fourMode2.png', 'fiveMode2.png', 'sixMode2.png', 'sevenMode2.png', 'eightMode2.png', 'nineMode2.png', 'tenMode2.png', 'elevenMode2.png', 'twelveMode2.png'];
	            var willworkSrc = '../static/img/' + willworkArr[this.state.mode1 - 1];
	            var willworkSrc1 = '../static/img/' + willworkArr[this.state.mode2 - 1];
	            var willworkArr1 = ['firstMode1.png', 'secondMode1.png', 'thirdMode1.png', 'fourMode1.png', 'fiveMode1.png', 'sixMode1.png', 'sevensevenMode1.png', 'eightMode1.png', 'nineMode1.png', 'tenMode1.png', 'elevenMode1.png', 'twelveMode1.png'];
	            var willworkingSrc1 = '../static/img/' + willworkArr1[this.state.mode2 - 1];
	            var workTextArr = ['蒸汽模式', '顶部蒸烤组合', '后部热风蒸组合', '后部热风', '顶部热风', '顶部烧烤', '顶部单管热风', '顶部单管烤', '发酵', '保温', '解冻', '杀菌'];
	            var workingText = workTextArr[this.state.Mode - 1];
	            var willworkText = workTextArr[this.state.mode1 - 1];
	            var willworkText1 = workTextArr[this.state.mode2 - 1];
	            var orderAll = parseInt(this.state.reservationhour - this.state.remainingTimeHour) * 60 + parseInt(this.state.reservationmin) - parseInt(this.state.remainingTimeMin);
	            var orderHour = parseInt(parseInt(orderAll) / 60);
	            var orderMinute = parseInt(orderAll % 60);
	            var timeStyle = parseInt(parseInt(this.state.remainingTimeHour) * 60 + parseInt(this.state.remainingTimeMin));

	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement(
	                    'section',
	                    { style: { display: this.state.online == 2 ? 'none' : '' } },
	                    React.createElement(
	                        'section',
	                        { className: 'banner-bg' },
	                        React.createElement(
	                            'section',
	                            { className: 'wait-index', style: { display: this.state.Mode ? 'none' : '' } },
	                            React.createElement('img', { src: '../static/img/home_image.png' }),
	                            React.createElement(
	                                'p',
	                                { className: 'work-text' },
	                                waitText
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'turn-icon' },
	                                React.createElement('img', { src: '../static/img/home_button_normal.png', onTouchEnd: this.turnHandler })
	                            )
	                        ),
	                        React.createElement(
	                            'section',
	                            { className: 'roast-index', style: { display: this.state.Mode ? '' : 'none' } },
	                            React.createElement('img', { src: '../static/img/home_image.png' }),
	                            React.createElement(
	                                'p',
	                                { className: 'roast-text' },
	                                roastText
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'roast-information', style: { display: isTrue ? 'none' : '' } },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    this.state.setTemperatureLow,
	                                    '\u2103'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    '|'
	                                ),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    this.state.remainingTimeHour < 10 ? '0' + this.state.remainingTimeHour : this.state.remainingTimeHour,
	                                    ':',
	                                    this.state.remainingTimeMin < 10 ? '0' + this.state.remainingTimeMin : this.state.remainingTimeMin
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'roast-information', style: { display: isTrue ? '' : 'none' } },
	                                orderHour < 10 ? '0' + orderHour : orderHour,
	                                ':',
	                                orderMinute < 10 ? '0' + orderMinute : orderMinute
	                            ),
	                            React.createElement(
	                                'section',
	                                { style: { display: this.state.mode2 === undefined || this.state.mode2 == 0 ? 'none' : '' } },
	                                React.createElement(
	                                    'div',
	                                    { className: 'roast-pattern' },
	                                    React.createElement(
	                                        'span',
	                                        { className: 'first-pattern' },
	                                        React.createElement('img', { src: workingSrc })
	                                    ),
	                                    React.createElement('span', { className: 'first-line' }),
	                                    React.createElement(
	                                        'span',
	                                        { className: 'second-pattern' },
	                                        React.createElement('img', { src: willworkSrc })
	                                    ),
	                                    React.createElement('span', { className: 'second-line' }),
	                                    React.createElement(
	                                        'span',
	                                        { className: 'second-pattern' },
	                                        React.createElement('img', { src: willworkSrc1 })
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'pattern-text' },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        workingText
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        willworkText
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        willworkText1
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'section',
	                                { style: { display: this.state.mode2 === undefined || this.state.mode2 == 0 ? '' : 'none' } },
	                                React.createElement(
	                                    'div',
	                                    { className: 'roast-pattern ' },
	                                    React.createElement(
	                                        'span',
	                                        { className: 'circle1-woking' },
	                                        React.createElement(
	                                            'span',
	                                            { className: 'circle2-woking' },
	                                            React.createElement(
	                                                'span',
	                                                { className: 'working-pattern' },
	                                                React.createElement('img', { src: workingSrc })
	                                            )
	                                        )
	                                    ),
	                                    React.createElement('span', { className: 'second-line', style: { display: this.state.mode1 === undefined || this.state.mode1 == 0 ? 'none' : '' } }),
	                                    React.createElement(
	                                        'span',
	                                        { className: 'second-pattern', style: { display: this.state.mode1 === undefined || this.state.mode1 == 0 ? 'none' : '' } },
	                                        React.createElement('img', { src: willworkSrc })
	                                    )
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: 'pattern-text', id: 'twoText' },
	                                    React.createElement(
	                                        'span',
	                                        { style: { paddingLeft: this.state.mode1 === undefined || this.state.mode1 == 0 ? '23%' : '13%', flex: this.state.mode1 === undefined || this.state.mode1 == 0 ? '2' : '1' } },
	                                        workingText
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        { style: { display: this.state.mode1 === undefined ? 'none' : '' } },
	                                        willworkText
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'app-ctrl', style: { display: modelPop ? 'none' : '' } },
	                        React.createElement(
	                            'div',
	                            { className: 'flex app-ctrl-list' },
	                            React.createElement(
	                                Link,
	                                { to: definepath, className: 'flex-cell', style: { color: this.state.Mode == 0 && (this.state.power == 16 || this.state.power == 0 || this.state.power === undefined) ? '#ababab' : '#303030' } },
	                                React.createElement('img', { src: defineSrc }),
	                                '\u81EA\u5B9A\u4E49'
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex-cell', style: { display: this.state.Mode ? 'none' : '', color: this.state.Mode == 0 && this.state.power == 1 ? '#303030' : '#ababab' } },
	                                React.createElement(
	                                    Link,
	                                    { to: path, style: { color: this.state.Mode == 0 && this.state.power == 1 ? '#303030' : '#ababab' } },
	                                    React.createElement('img', { src: patternSrc }),
	                                    '\u6A21\u5F0F'
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex-cell', onTouchEnd: this.setTime, style: { display: this.state.Mode ? '' : 'none' } },
	                                React.createElement('img', { src: workSrc }),
	                                React.createElement(
	                                    'span',
	                                    { style: { color: '#ff7734' } },
	                                    ' ',
	                                    workingText
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex-cell', style: { color: this.state.Mode == 0 || isTrue ? '#ababab' : '#303030' }, onTouchEnd: this.handStop },
	                                React.createElement('img', { src: stopSrc }),
	                                this.state.start == 16 ? '启动' : '暂停'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex app-ctrl-list', style: { color: this.state.Mode == 0 && this.state.power == 16 ? '#ababab' : '#303030' } },
	                            React.createElement(
	                                'div',
	                                { className: 'flex-cell', style: { color: this.state.Mode == 0 && (this.state.power == 16 || this.state.power == 0 || this.state.power === undefined) ? '#ababab' : '#303030' }, onTouchEnd: this.handLight },
	                                React.createElement('img', { src: lightSrc }),
	                                React.createElement(
	                                    'span',
	                                    { style: { color: (this.state.ovenled == 1 || this.state.ovenled == 2) && this.state.power != 16 && this.state.power != undefined ? '#ff7734' : '' } },
	                                    ' ',
	                                    lightText
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex-cell', onTouchEnd: this.modeSelect, style: { color: (this.state.Mode == 2 || this.state.Mode == 3) && this.state.power == 1 && isTrue == false ? '#303030' : '#ababab' } },
	                                React.createElement('img', { src: wetSrc }),
	                                React.createElement(
	                                    'span',
	                                    { style: { color: this.state.humidityControl == undefined || this.state.humidityControl == 0 ? '' : '#ff7734' } },
	                                    ' ',
	                                    wetText
	                                )
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'flex-cell', style: { color: this.state.Mode == 0 ? '#ababab' : '#303030' }, onTouchEnd: this.cancelWork },
	                                React.createElement('img', { src: cancelSrc }),
	                                '\u53D6\u6D88'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'off-line', style: { display: this.state.online == 2 ? '' : 'none' } },
	                    React.createElement(
	                        'div',
	                        { className: 'banner' },
	                        React.createElement('img', { src: '../static/img/home_image.png' })
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u4E3B\u4EBA,\u4F60\u7684\u70E4\u7BB1\u4E0D\u5728\u7EBF\u54E6~!'
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { show: this.state.show, hourshow: false, cancelClock: this.cancelclock, resetTime: this.resetTime, title: workingText, defaultminute: "" + timeStyle + "", arrayInit: this.state.changeDefault, control: this.control }),
	                React.createElement(
	                    'div',
	                    { id: 'panel-pop', style: popStyle },
	                    React.createElement('div', { className: 'model-mask', onTouchEnd: this.closePop }),
	                    React.createElement(
	                        'div',
	                        { className: 'model-pop flex-column', style: modelPopStyle },
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell choosetem' },
	                            '\u8BBE\u7F6E\u9AD8\u4F4E\u6E7F'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '1', onTouchEnd: this.changeMode },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u4F4E\u6E7F'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 1 ? { display: '' } : { display: 'none' } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '2', onTouchEnd: this.changeMode },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u4E2D\u6E7F'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 2 ? { display: '' } : { display: 'none' } })
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'flex-cell', 'data-mode': '3', onTouchEnd: this.changeMode },
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u9AD8\u6E7F'
	                            ),
	                            React.createElement('i', { style: +currentRunMode === 3 ? { display: '' } : { display: 'none' } })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { id: 'alert', style: { display: this.state.isShowAlert == true ? 'block' : 'none' } },
	                    React.createElement('div', { className: 'model-mask' }),
	                    React.createElement(
	                        'section',
	                        { className: 'alert' },
	                        React.createElement(
	                            'div',
	                            { className: 'innerbox' },
	                            React.createElement(
	                                'p',
	                                { className: 'title' },
	                                '\u6E29\u99A8\u63D0\u793A'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'text-message' },
	                                '\u7F8E\u98DF\u70D8\u7119\u4E2D\uFF0C\u786E\u5B9A\u53D6\u6D88\u5417\uFF1F'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'two-button' },
	                            React.createElement('input', { type: 'button', value: '\u53D6\u6D88', onTouchStart: this.btnCancel.bind(this), className: 'left' }),
	                            React.createElement('input', { type: 'button', value: '\u786E\u5B9A', onTouchStart: this.btnClose.bind(this), className: 'right' })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { id: 'alert', style: { display: this.state.orderAlert == true ? 'block' : 'none' } },
	                    React.createElement('div', { className: 'model-mask' }),
	                    React.createElement(
	                        'section',
	                        { className: 'alert' },
	                        React.createElement(
	                            'div',
	                            { className: 'innerbox' },
	                            React.createElement(
	                                'p',
	                                { className: 'title' },
	                                '\u6E29\u99A8\u63D0\u793A'
	                            ),
	                            React.createElement(
	                                'p',
	                                { className: 'text-message' },
	                                '\u7F8E\u98DF\u9884\u7EA6\u4E2D\uFF0C\u786E\u5B9A\u53D6\u6D88\u5417\uFF1F'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'two-button' },
	                            React.createElement('input', { type: 'button', value: '\u53D6\u6D88', onTouchStart: this.btnCancel.bind(this), className: 'left' }),
	                            React.createElement('input', { type: 'button', value: '\u786E\u5B9A', onTouchStart: this.btnClose.bind(this), className: 'right' })
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	het.domReady(function () {
	    het.setTitle('荣事达智能蒸汽烤箱');
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Router, { path: '/pattern', component: _Pattern.Pattern }),
	        React.createElement(Router, { path: '/define', component: _Define.Define })
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Pattern = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _OrderTime = __webpack_require__(10);

	var _ModeSelect = __webpack_require__(11);

	var _reSet = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	het.repaint(function (data) {
	  _Actions.Actions.repaint(data);
	});

	var Pattern = exports.Pattern = function (_BaseComponent) {
	  _inherits(Pattern, _BaseComponent);

	  function Pattern(props) {
	    _classCallCheck(this, Pattern);

	    var _this = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, props));

	    var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	    _this.state = {
	      addMode: 0, //默认进来没有选中烘焙模式
	      showTime: false, //默认不显示预约选择时间组件
	      showMode: false, //默认不显示选择模式组件
	      index: 3, //默认选中第三种工作模式来改变温度选择的间隔
	      deleteIndex: 0, //默认不删除模式
	      timeList: [], //用来保存设置好的时间
	      temList: [], //用来保存设置好的温度
	      modeList: [], //用来保存设置好的模式
	      showSet: false, //默认不显示重新修改模式的时间和温度组件  
	      setMode: 0, //默认不重新修改模式的时间和温度
	      defaultindex: 3, //默认蒸汽模式的温度
	      headerTop: isAndroid ? 73 : 63,
	      changeDefault: false, //默认不更新数组
	      rechangeDefault: false,
	      saveMode: false };
	    het.setTitle(JSON.stringify({ setNavTitle: 1, title: '烘焙模式', setNavRightBtnHiden: 1 }));
	    _this.listenStore(_Store.Store); // 监听Store
	    _this.chooseTime = _this.chooseTime.bind(_this); //选择预约时间
	    _this.cancelclock = _this.cancelclock.bind(_this);
	    _this.cancelclock1 = _this.cancelclock1.bind(_this);
	    _this.cancelclock2 = _this.cancelclock2.bind(_this);
	    _this.chooseMode = _this.chooseMode.bind(_this); //选择工作模式
	    _this.submitIndex = _this.submitIndex.bind(_this);
	    _this.modeChoose = _this.modeChoose.bind(_this);
	    _this.deleteHandler = _this.deleteHandler.bind(_this);
	    _this.setList = _this.setList.bind(_this);
	    _this.resetList = _this.resetList.bind(_this);
	    _this.orderTime = _this.orderTime.bind(_this); //预约烘焙时间
	    _this.changSet = _this.changSet.bind(_this); //修改温度和时间
	    _this.startWoking = _this.startWoking.bind(_this); //启动工作模式
	    _this.changeDefault = _this.changeDefault.bind(_this);
	    _this.savePattern = _this.savePattern.bind(_this); //保存为自定义模式
	    _this.writename = _this.writename.bind(_this);
	    _this.controlDefault = _this.controlDefault.bind(_this);
	    _this.control = _this.control.bind(_this);
	    _this.componentWillMount = _this.componentWillMount.bind(_this);

	    return _this;
	  }

	  _createClass(Pattern, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _Actions.Actions.modeData();
	    }
	  }, {
	    key: 'control',
	    value: function control() {
	      this.setState({ rechangeDefault: false });
	    }
	  }, {
	    key: 'controlDefault',
	    value: function controlDefault() {
	      this.setState({ changeDefault: false });
	    }
	  }, {
	    key: 'chooseTime',
	    value: function chooseTime() {
	      this.setState({ showTime: true });
	    }
	  }, {
	    key: 'changSet',
	    value: function changSet(e) {
	      e.preventDefault();
	      var type = e.currentTarget.getAttribute('data-type');
	      // let newTemArr=this.state.temList;
	      // let newTimeList=this.state.timeList;
	      // newTemArr.splice(type-1,1,this.state.temperature);
	      // newTimeList.splice(type-1,1,this.state.time);
	      this.setState({ setMode: type, showSet: true, rechangeDefault: true });
	    }
	  }, {
	    key: 'resetList',
	    value: function resetList(temperature, time) {
	      var newTemArr = this.state.temList;
	      var newTimeList = this.state.timeList;
	      var index = this.state.setMode - 1;
	      newTemArr.splice(index, 1, temperature);
	      newTimeList.splice(index, 1, time);
	      this.setState({ temList: newTemArr, timeList: newTimeList });
	      _Actions.Actions.selectTime(temperature, time);
	    }
	  }, {
	    key: 'cancelclock',
	    value: function cancelclock() {
	      this.setState({ showTime: false });
	    }
	  }, {
	    key: 'cancelclock1',
	    value: function cancelclock1() {
	      this.setState({ showMode: false });
	    }
	  }, {
	    key: 'cancelclock2',
	    value: function cancelclock2() {
	      this.setState({ showSet: false });
	    }
	  }, {
	    key: 'chooseMode',
	    value: function chooseMode() {

	      this.setState({ showMode: true, deleteIndex: 0 });
	    }
	  }, {
	    key: 'submitIndex',
	    value: function submitIndex(item) {
	      this.setState({ index: item });
	    }
	  }, {
	    key: 'workingTime',
	    value: function workingTime(h, m) {
	      _Actions.Actions.selectTime(h, m);
	    }
	  }, {
	    key: 'orderTime',
	    value: function orderTime(h, m) {
	      _Actions.Actions.orderTime(h, m);
	    }
	  }, {
	    key: 'modeChoose',
	    value: function modeChoose(value) {
	      this.setState({ addMode: value });
	    }
	  }, {
	    key: 'deleteHandler',
	    value: function deleteHandler(e) {
	      e.preventDefault();
	      var type = e.currentTarget.getAttribute('data-type');
	      if (type == 1) {
	        if (this.state.modeList.length == 1) {
	          var newModeArr = this.state.modeList;
	          var newTemArr = this.state.temList;
	          var newTimeList = this.state.timeList;
	          newModeArr.splice(0, 1);
	          newTemArr.splice(0, 1);
	          newTimeList.splice(0, 1);
	          this.setState({ deleteIndex: 0, addMode: 0, modeList: newModeArr, temList: newTemArr, timeList: newTimeList });
	        }
	        if (this.state.modeList.length == 2) {
	          var _newModeArr = this.state.modeList;
	          var _newTemArr = this.state.temList;
	          var _newTimeList = this.state.timeList;
	          _newModeArr.splice(0, 1);
	          _newTemArr.splice(0, 1);
	          _newTimeList.splice(0, 1);
	          this.setState({ deleteIndex: 0, addMode: 1, modeList: _newModeArr, temList: _newTemArr, timeList: _newTimeList });
	        }
	        if (this.state.modeList.length == 3) {
	          var _newModeArr2 = this.state.modeList;
	          var _newTemArr2 = this.state.temList;
	          var _newTimeList2 = this.state.timeList;
	          _newModeArr2.splice(0, 1);
	          _newTemArr2.splice(0, 1);
	          _newTimeList2.splice(0, 1);
	          this.setState({ deleteIndex: 0, addMode: 2, modeList: _newModeArr2, temList: _newTemArr2, timeList: _newTimeList2 });
	        }
	      } else {
	        var _newModeArr3 = this.state.modeList;
	        var _newTemArr3 = this.state.temList;
	        var _newTimeList3 = this.state.timeList;
	        _newModeArr3.splice(type - 1, 1);
	        _newTemArr3.splice(type - 1, 1);
	        _newTimeList3.splice(type - 1, 1);
	        var mode = this.state.addMode - 1;
	        this.setState({ deleteIndex: type, addMode: mode, modeList: _newModeArr3, temList: _newTemArr3, timeList: _newTimeList3 });
	      }
	    }
	  }, {
	    key: 'setList',
	    value: function setList(index, temperature, time) {
	      var newModeArr = this.state.modeList;
	      var newTemArr = this.state.temList;
	      var newTimeList = this.state.timeList;
	      // if(index==this.state.modeList[this.state.modeList.length-1]){let addMode=this.state.addMode;this.setState({addMode:addMode})};
	      newModeArr.push(index);
	      newTemArr.push(temperature);
	      newTimeList.push(time);
	      this.setState({ modeList: newModeArr, temList: newTemArr, timeList: newTimeList });
	    }
	  }, {
	    key: 'startWoking',
	    value: function startWoking(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      var mode1 = this.state.modeList[0];
	      var mode2 = this.state.modeList[1];
	      var mode3 = this.state.modeList[2];
	      var textNode = this.refs.nameValue;
	      var value = textNode.value;
	      if (mode1 == mode2 && mode1 != 0 && mode1 != undefined || mode2 == mode3 && mode2 != undefined && mode2 != 0) {
	        het.toast('不能连续叠加两个相同的模式');return;
	      }

	      if (this.state.modeList.length > 0 && (mode1 != mode2 || mode2 != mode3)) {

	        if (this.state.saveMode && value != '') {
	          history.go(-1);
	          _Actions.Actions.saveMode(this.state.modeList, this.state.temList, this.state.timeList, value);
	          this.setState({ saveMode: false });
	        }
	        if (this.state.saveMode && value == '') {
	          het.toast('请输入自定义名称');
	        } else {
	          history.go(-1);
	          var orderHour = this.state.orderHour === undefined ? 0 : this.state.orderHour;
	          var orderMinute = this.state.orderMinute === undefined ? 0 : this.state.orderMinute;
	          _Actions.Actions.workStyle(this.state.modeList, this.state.temList, this.state.timeList, orderHour, orderMinute);
	        }
	      }
	    }
	  }, {
	    key: 'changeDefault',
	    value: function changeDefault(newindex) {

	      if (newindex !== this.state.defaultindex) {
	        this.setState({ changeDefault: true });
	      }
	      this.setState({ defaultindex: newindex });
	    }
	  }, {
	    key: 'savePattern',
	    value: function savePattern() {
	      if (this.state.modeList.length > 0 && this.state.modedata < 10) {
	        var nowSave = !this.state.saveMode;
	        this.setState({ saveMode: nowSave });
	      }
	    }
	  }, {
	    key: 'writename',
	    value: function writename() {
	      var textNode = this.refs.nameValue;
	      var value = textNode.value;
	      if (value.length > 10) {
	        het.toast('命名长度不能超过10个字符串');
	        value = value.substring(0, 10);
	        textNode = value.substring(0, 10);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var setMode = this.state.setMode;
	      var textIndex = this.state.modeList[setMode - 1];
	      var timeText = this.state.orderHour == undefined && this.state.orderMinute == undefined ? '--:--' : this.state.orderHour + ':' + this.state.orderMinute;
	      var houstepArr = ['5', '10', '10', '10', '11', '11', '11', '11', '11', '11', '11', '11', '11'];
	      var hourstep = houstepArr[this.state.defaultindex - 1];
	      var imgArr = ['icon1.png', 'icon4.png', 'icon2.png', 'icon5.png', 'icon3.png', 'icon6.png'];
	      var items = ['firstMode4.png', 'secondMode4.png', 'thirdMode4.png', 'fourMode4.png', 'fiveMode4.png', 'sixMode4.png', 'sevenMode4.png', 'eightMode4.png', 'nineMode4.png', 'tenMode4.png', 'elevenMode4.png', 'twelveMode4.png'];
	      var workArr = ['蒸汽模式', '顶部蒸烤组合', '后部热风蒸组合', '后部热风', '顶部热风', '顶部烧烤', '顶部单管热风', '顶部单管烤', '发酵', '保温', '解冻', '杀菌'];
	      var mode1 = this.state.modeList[0];
	      var mode2 = this.state.modeList[1];
	      var mode3 = this.state.modeList[2];
	      var workText1 = workArr[mode1 - 1];
	      var workText2 = workArr[mode2 - 1];
	      var workText3 = workArr[mode3 - 1];
	      var modeSrc1 = '../static/img/' + items[mode1 - 1];
	      var modeSrc2 = '../static/img/' + items[mode2 - 1];
	      var modeSrc3 = '../static/img/' + items[mode3 - 1];
	      var iconSrc1 = '../static/img/' + imgArr[1];
	      var iconSrc2 = '../static/img/' + imgArr[3];
	      var iconSrc3 = '../static/img/' + imgArr[5];
	      var Hour = void 0,
	          Minute = void 0;
	      var timeLength = this.state.timeList.length;
	      var modeText = workArr[textIndex - 1];
	      var defaulthourArr = [100, 180, 180, 180, 180, 180, 180, 180, 40, 60, 60, 100];
	      var defaulthour = defaulthourArr[this.state.defaultindex - 1];
	      var hourArr1 = [80, 85, 90, 95, 100, 105, 110, 115];
	      var hourArr2 = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250];
	      var hourArr3 = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250];
	      var hourArr4 = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250];
	      // let hourArr5=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
	      // let hourArr6=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
	      // let hourArr7=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
	      // let hourArr8=[40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250];
	      var hourArr5 = [40, 51, 62, 73, 84, 95, 106, 117, 128, 139, 150, 161, 172, 180, 183, 194, 205, 216, 227, 238, 249];
	      var hourArr6 = [40, 51, 62, 73, 84, 95, 106, 117, 128, 139, 150, 161, 172, 180, 183, 194, 205, 216, 227, 238, 249];
	      var hourArr7 = [40, 51, 62, 73, 84, 95, 106, 117, 128, 139, 150, 161, 172, 180, 183, 194, 205, 216, 227, 238, 249];
	      var hourArr8 = [40, 51, 62, 73, 84, 95, 106, 117, 128, 139, 150, 161, 172, 180, 183, 194, 205, 216, 227, 238, 249];
	      var hourArr9 = [40];
	      var hourArr10 = [60];
	      var hourArr11 = [60];
	      var hourArr12 = [100];
	      var hourArr = [hourArr1, hourArr2, hourArr3, hourArr4, hourArr5, hourArr6, hourArr7, hourArr8, hourArr9, hourArr10, hourArr11, hourArr12];
	      var hourarr = hourArr[this.state.defaultindex - 1];
	      var firstHourArr = hourArr[this.state.modeList[this.state.setMode - 1] - 1];
	      var addSrc = ['button_disabled.png', 'button_normal.png'];
	      var addSrc1 = this.state.addMode == 0 ? '../static/img/' + addSrc[1] : '../static/img/' + addSrc[0];
	      var addSrc2 = this.state.addMode == 1 ? '../static/img/' + addSrc[1] : '../static/img/' + addSrc[0];
	      var addSrc3 = this.state.addMode == 2 ? '../static/img/' + addSrc[1] : '../static/img/' + addSrc[0];
	      var rdefaultminute = this.state.timeList[this.state.setMode - 1];
	      var rdefaulthour = this.state.temList[this.state.setMode - 1];
	      var hourarr1 = hourArr[this.state.modeList[this.state.setMode - 1] - 1];
	      var buttonArr = ['button_off.png', 'button_on.png'];
	      var buttonIndex = this.state.modeList.length > 0 && this.state.saveMode == true ? 1 : 0;
	      var buttonSrc = '../static/img/' + buttonArr[buttonIndex];

	      switch (this.state.timeList.length) {
	        case 0:
	          Hour = 0;
	          Minute = 0;
	          break;
	        case 1:
	          Hour = parseInt(parseInt(this.state.timeList[0]) / 60);
	          Minute = this.state.timeList[0] % 60;
	          break;
	        case 2:
	          Hour = parseInt((parseInt(this.state.timeList[0]) + parseInt(this.state.timeList[1])) / 60);
	          Minute = (parseInt(this.state.timeList[0]) + parseInt(this.state.timeList[1])) % 60;
	          break;
	        case 3:
	          Hour = parseInt((parseInt(this.state.timeList[0]) + parseInt(this.state.timeList[1]) + parseInt(this.state.timeList[2])) / 60);
	          Minute = (parseInt(this.state.timeList[0]) + parseInt(this.state.timeList[1]) + parseInt(this.state.timeList[2])) % 60;
	          break;
	        default:

	          break;
	      }

	      return React.createElement(
	        'div',
	        { className: 'pattenStyle' },
	        React.createElement('div', { style: { height: this.state.headerTop, width: '100%', backgroundColor: '#2A2C35', position: 'fixed', left: 0, top: 0, zIndex: 99999 } }),
	        React.createElement(
	          'section',
	          { className: 'modeChoose', style: { marginTop: this.state.headerTop } },
	          React.createElement(
	            'ul',
	            null,
	            React.createElement(
	              'li',
	              { className: 'modeList' },
	              React.createElement(
	                'section',
	                { style: { display: this.state.addMode == 0 || this.state.deleteIndex == 1 ? '' : 'none' } },
	                React.createElement(
	                  'div',
	                  { className: 'beginChoose' },
	                  React.createElement('img', { src: '../static/img/icon1.png' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'addButton' },
	                  React.createElement('img', { src: addSrc1, onTouchEnd: this.chooseMode })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'workMode', style: { display: this.state.addMode == 0 || this.state.deleteIndex == 1 ? 'none' : '' } },
	                React.createElement(
	                  'div',
	                  { className: 'beginChoose' },
	                  React.createElement('img', { src: iconSrc1 })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'selectMode', 'data-type': '1', onTouchEnd: this.changSet },
	                  React.createElement('img', { src: modeSrc1 })
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  React.createElement(
	                    'span',
	                    null,
	                    workText1
	                  ),
	                  React.createElement(
	                    'span',
	                    null,
	                    this.state.temList[0],
	                    '\u2103/',
	                    this.state.timeList[0],
	                    '\u5206\u949F '
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'delete', 'data-type': '1', onTouchEnd: this.deleteHandler },
	                  React.createElement('img', { src: '../static/img/button_delete.png' })
	                )
	              )
	            ),
	            React.createElement(
	              'li',
	              { className: 'modeList' },
	              React.createElement(
	                'section',
	                { style: { display: this.state.addMode == 2 && this.state.deleteIndex !== 2 || this.state.addMode == 3 && this.state.deleteIndex !== 2 ? 'none' : '' } },
	                React.createElement(
	                  'div',
	                  { className: 'beginChoose' },
	                  React.createElement('img', { src: '../static/img/icon2.png' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'addButton' },
	                  React.createElement('img', { src: addSrc2, onTouchEnd: this.state.addMode == 1 ? this.chooseMode : '' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'workMode', style: { display: this.state.addMode == 2 && this.state.deleteIndex !== 2 || this.state.addMode == 3 && this.state.deleteIndex !== 2 ? '' : 'none' } },
	                React.createElement(
	                  'div',
	                  { className: 'beginChoose' },
	                  React.createElement('img', { src: iconSrc2 })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'selectMode', 'data-type': '2', onTouchEnd: this.changSet },
	                  React.createElement('img', { src: modeSrc2 })
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  React.createElement(
	                    'span',
	                    null,
	                    workText2
	                  ),
	                  React.createElement(
	                    'span',
	                    null,
	                    this.state.temList[1],
	                    '\u2103/',
	                    this.state.timeList[1],
	                    '\u5206\u949F '
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'delete', 'data-type': '2', onTouchEnd: this.deleteHandler },
	                  React.createElement('img', { src: '../static/img/button_delete.png' })
	                )
	              )
	            ),
	            React.createElement(
	              'li',
	              { className: 'modeList' },
	              React.createElement(
	                'section',
	                { style: { display: this.state.addMode == 3 && this.state.deleteIndex !== 3 ? 'none' : '' } },
	                React.createElement(
	                  'div',
	                  { className: 'beginChoose' },
	                  React.createElement('img', { src: '../static/img/icon3.png' })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'addButton' },
	                  React.createElement('img', { src: addSrc3, onTouchEnd: this.state.addMode == 2 ? this.chooseMode : '' })
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'workMode', style: { display: this.state.addMode == 3 && this.state.deleteIndex !== 3 ? '' : 'none' } },
	                React.createElement(
	                  'div',
	                  { className: 'beginChoose' },
	                  React.createElement('img', { src: iconSrc3 })
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'selectMode', 'data-type': '3', onTouchEnd: this.changSet },
	                  React.createElement('img', { src: modeSrc3 })
	                ),
	                React.createElement(
	                  'p',
	                  null,
	                  React.createElement(
	                    'span',
	                    null,
	                    workText3
	                  ),
	                  React.createElement(
	                    'span',
	                    null,
	                    this.state.temList[2],
	                    '\u2103/',
	                    this.state.timeList[2],
	                    '\u5206\u949F '
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'delete', 'data-type': '3', onTouchEnd: this.deleteHandler },
	                  React.createElement('img', { src: '../static/img/button_delete.png' })
	                )
	              )
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'totalTime' },
	          React.createElement(
	            'span',
	            { className: 'note' },
	            '\u6A21\u5F0F\u53E0\u52A0\u5F62\u5F0F\u4E0D\u80FD\u4E3A\'AA\''
	          ),
	          React.createElement(
	            'span',
	            { className: 'note-information' },
	            '\u603B\u8017\u65F6:',
	            Hour,
	            '\u5C0F\u65F6',
	            Minute,
	            '\u5206\u949F'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'order-text', onTouchEnd: this.chooseTime },
	          React.createElement(
	            'span',
	            null,
	            '\u9884\u7EA6\u65F6\u95F4'
	          ),
	          React.createElement(
	            'span',
	            null,
	            timeText
	          ),
	          React.createElement('img', { src: '../static/img/button_back.png' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'savePattern' },
	          React.createElement(
	            'p',
	            { className: 'saveText' },
	            React.createElement(
	              'span',
	              null,
	              '\u4FDD\u5B58\u4E3A "\u81EA\u5B9A\u4E49" \u6A21\u5F0F'
	            ),
	            React.createElement(
	              'span',
	              null,
	              '\u70D8\u7119\u7ED3\u675F\u540E\u81EA\u52A8\u4FDD\u5B58,\u6700\u591A\u53EF\u4FDD\u5B5810\u4E2A'
	            )
	          ),
	          React.createElement('img', { src: buttonSrc, onTouchEnd: this.savePattern })
	        ),
	        React.createElement('input', { type: 'text', placeholder: '\u8BF7\u8F93\u5165\u81EA\u5B9A\u4E49\u540D\u79F0', className: 'changename', ref: 'nameValue', maxLength: '10', onChange: this.writename, style: { display: this.state.saveMode ? '' : 'none' } }),
	        React.createElement('div', { className: 'blankSpace' }),
	        React.createElement(
	          'div',
	          { className: 'startMode', style: { backgroundColor: this.state.modeList.length > 0 ? '#f9661d' : '#9c9cA1' }, onTouchEnd: this.startWoking },
	          '\u542F\u52A8'
	        ),
	        React.createElement(_OrderTime.OrderTime, { show: this.state.showTime, hourshow: true, cancelClock: this.cancelclock, submitClock: this.orderTime, maxhour: 23, minhour: 0, minutestep: 5 }),
	        React.createElement(_reSet.ReSet, { show: this.state.showSet, hourshow: true, cancelClock: this.cancelclock2, hourarr: firstHourArr, hourstep: hourstep, resetList: this.resetList, title: modeText, defaultminute: rdefaultminute, defaulthour: rdefaulthour, arrayInit: this.state.rechangeDefault, control: this.control }),
	        React.createElement(_ModeSelect.ModeSelect, { show: this.state.showMode, hourshow: true, cancelClock: this.cancelclock1, hourarr: hourarr, hourstep: hourstep, submitIndex: this.submitIndex, wokingTime: this.workingTime, addMode: this.state.addMode, modeChoose: this.modeChoose, setList: this.setList, defaultminute: '20', changeDefault: this.changeDefault, defaulthour: defaulthour, arrayInit: this.state.changeDefault, modeList: this.state.modeList, controlDefault: this.controlDefault })
	      );
	    }
	  }]);

	  return Pattern;
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
	 * @prop {array} minutearr 可选的分钟数组(默认无,通过最大最小分钟及分钟间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {boolean} arrayInit 是否需要更新数组
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var OrderTime = exports.OrderTime = React.createClass({
		displayName: 'OrderTime',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 1,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);

			if (this.props.show == true) {
				this.setState({
					showOpacity: 1,
					timeDisplay: true
				});
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
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
					value = value < 10 ? '0' + value : '' + value;
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
			if (next.minutearr && next.minutearr instanceof Array) {
				minutearr = next.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : '' + _value;
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
			this.props.cancelClock();
			if (typeof this.props.submitClock === 'function') {

				this.props.submitClock(this.state.hourtime, this.state.minutetime); //预约烘焙时间

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
			var selecttitle = this.props.title || '预约时间';
			var statusname = this.props.statusname || '';
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
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'ordertime', className: 'Ordertime' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'ordertime', onTouchMove: this.endDefault },
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
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206\u949F'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
					),
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
	 * @prop {array} minutearr 可选的分钟数组(默认无,通过最大最小分钟及分钟间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {boolean} arrayInit 是否需要更新数组
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ModeSelect = exports.ModeSelect = React.createClass({
		displayName: 'ModeSelect',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 1,
				timeDisplay: false,
				value: 0,
				index: 3 //默认选中第三种模式

			};
		},

		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
			if (this.props.show == true) {
				this.setState({
					showOpacity: 1,
					timeDisplay: true
				});
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarr && next.hourarr instanceof Array) {
				hourarr = next.hourarr;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : '' + value;
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
			var maxminute = 180;
			var minminute = 1;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (next.minutearr && next.minutearr instanceof Array) {
				minutearr = next.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : '' + _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute + "") == -1) minutearr.push(maxminute + "");
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
							//初始化DOM
							if (this.offsetGap === undefined) {

								this.offsetGap = document.querySelectorAll('div.son')[1].offsetLeft;
								var gapWidth = document.querySelectorAll('div.son')[1].offsetWidth;
								var gap = (window.screen.availWidth - 4 * this.offsetGap - gapWidth) / 2;
								document.querySelector('div.modelist').style.marginLeft = gap + "px";
								document.querySelector('div.modelist').style.marginRight = gap + "px";
							}
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
			this.props.controlDefault();
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

			e.stopPropagation();
			e.preventDefault();
			this.props.cancelClock();
			if (this.props.modeList[this.props.modeList.length - 1] != this.state.index) {
				var modeValue = this.props.addMode + 1;
				this.props.modeChoose(modeValue);
				this.props.setList(this.state.index, this.state.hourtime, this.state.minutetime);
				this.props.submitIndex(this.state.index);
			}
			if (typeof this.props.wokingTime === 'function') {

				this.props.wokingTime(this.state.hourtime, this.state.minutetime);
			} else {
				console.log('error:the submit callback is not a function');
			}
		},
		start: function start(e) {
			//开始滑动时间刻度 记录初始坐标值
			e.stopPropagation();
			e.preventDefault();
			var Xvalue = parseInt(e.touches[0].clientX);
			var oldValue = parseInt(this.state.value);
			this.setState({
				oldX: Xvalue,
				oldValue: oldValue,
				Xvalue: Xvalue
			});
		},

		//滑动
		moving: function moving(e) {
			//滑动时间刻度 判断滑动类型并改变刻度条的top值 产生滑动视觉效果
			e.stopPropagation();
			e.preventDefault();
			var Xvalue = parseInt(e.touches[0].clientX);
			var oldX = parseInt(this.state.oldX);
			var value = parseInt(this.state.oldValue) + Xvalue - oldX;
			//        if(screen.availWidth<=320){
			//            value = value<-629?-629:value;
			//        } 
			//       if(320<screen.availWidth<=375){value = value<-752?-752:value;console.log(2222)}
			// if(375<screen.availWidth<=414){value = value <-752 ?-840 :value;console.log(111)}

			switch (screen.availWidth) {
				case 320:
					value = value < -629 ? -629 : value;
					break;
				case 375 || 360:
					value = value < -752 ? -752 : value;
					break;
				case 414:
					value = value < -840 ? -840 : value;
					break;
				case 411:
					value = value < -864 ? -864 : value;
					break;
				case 435:
					value = value < -854 ? -854 : value;
					break;
				default:
					value = value < -752 ? -752 : value;
					break;
			}
			value = value > 151 ? 151 : value;
			this.setState({
				value: value,
				Xvalue: Xvalue
			});
		},

		//结束触摸
		end: function end(e) {
			//滑动结束 计算滑动范围 忽略太小的滑动(20内) 然后调整选中值并重置时间刻度条
			e.stopPropagation();
			e.preventDefault();
			var newX = parseInt(this.state.Xvalue); //滑动结束时的x值
			var oldX = parseInt(this.state.oldX); //滑动开始时的x值
			var valueIndex = oldX - newX || 0;
			var offsetValue = parseInt(this.state.oldValue);
			var oldValue = parseInt(this.state.value);
			var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
			// if(e.target.nodeName==='SECTION' && offset<=10){
			//     this.maxSelect(e);
			// };
			if (valueIndex === 0 || Math.abs(valueIndex) < 10) {
				return;
			}
			var ceil = this.offsetGap;
			var distanceValue = parseInt(valueIndex / ceil);
			distanceValue = distanceValue < 12 - this.state.index ? distanceValue : 12 - this.state.index;
			distanceValue = distanceValue > 1 - this.state.index ? distanceValue : 1 - this.state.index;
			var moveValue = offsetValue - distanceValue * ceil;
			this.setState({
				value: moveValue
			});
			// console.log(distanceValue,offsetValue,moveValue);	
			if (Math.abs(valueIndex) < ceil) {

				this.setState({
					value: this.state.oldValue

				});
				return;
			}
			var oldIndex = this.state.index;
			var newIndex = this.state.index + parseInt(distanceValue);
			// console.log(oldIndex,newIndex,distanceValue,valueIndex);
			// if(newIndex==14||newIndex==0){
			// 	return;
			// }
			var modeIndex = e.target.getAttribute('data-index');
			var type = e.target.getAttribute('data-type');
			var deviceStatus = this.state.deviceStatus;
			this.setState({
				oldValue: oldValue,
				disableEvent: false,
				index: newIndex
			});
			// console.log(ceil)
			// this.props.submitIndex(newIndex);
			this.props.changeDefault(newIndex);
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
			var selecttitle = this.props.title || '烘焙设置';
			var statusname = this.props.statusname || '';
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
			var imgSrc = '../static/img/';
			var textModes = ['蒸汽模式', '顶部蒸烤组合', '后部热风蒸组合', '后部热风', '顶部热风', '顶部烧烤', '顶部单管热风', '顶部单管烤', '发酵', '保温', '解冻', '杀菌'];
			var index = this.state.index;
			var items = [index == 1 ? 'firstMode4' : 'firstMode2', index == 2 ? 'secondMode4' : 'secondMode2', index == 3 ? 'thirdMode4' : 'thirdMode2', index == 4 ? 'fourMode4' : 'fourMode2', index == 5 ? 'fiveMode4' : 'fiveMode2', index == 6 ? 'sixMode4' : 'sixMode2', index == 7 ? 'sevenMode4' : 'sevenMode2', index == 8 ? 'eightMode4' : 'eightMode2', index == 9 ? 'nineMode4' : 'nineMode2', index == 10 ? 'tenMode4' : 'tenMode2', index == 11 ? 'elevenMode4' : 'elevenMode2', index == 12 ? 'twelveMode4' : 'twelveMode2'];
			// let imageArr=['firstMode3.png','firstMode3.png','secondMode3.png','thirdMode3.png','fourMode3.png','fiveMode3.png','sixMode3.png','seven.png','eightMode3.png','eightMode3.png','nineMode3.png','tenMode3.png','elevenMode3.png','twelveMode3.png','thirteenMode3.png']
			// let selectSrc='../static/img/'+[this.state.]
			return React.createElement(
				'section',
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'modeselect', className: 'modeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'modeselect', onTouchMove: this.endDefault },
					React.createElement(
						'section',
						{ className: 'selecttitle' },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						),
						React.createElement(
							'div',
							{ className: 'modelist' },
							React.createElement(
								'div',
								{ className: 'parent', onTouchStart: this.start, onTouchMove: this.moving, onTouchEnd: this.end, style: { marginLeft: this.state.value + 'px' } },
								items.map(function (e, index) {
									return React.createElement(
										'div',
										{ className: 'son', key: index, 'data-index': index, style: { backgroundColor: this.state.index == index + 1 ? '#ff7734' : '#ffffff' } },
										React.createElement('img', { src: imgSrc + e + '.png' })
									);
								}.bind(this))
							)
						),
						React.createElement('img', { className: 'centerflag', src: '../static/img/jiantou.png' })
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement(
							'span',
							{ className: 'modename' },
							textModes[this.state.index - 1]
						),
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
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u2103'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206\u949F'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
					),
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
					)
				)
			);
		}
	});

/***/ },
/* 12 */
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
	 * @prop {array} minutearr 可选的分钟数组(默认无,通过最大最小分钟及分钟间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {boolean} arrayInit 是否需要更新数组
	 * @author   xinglin
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var ReSet = exports.ReSet = React.createClass({
		displayName: 'ReSet',

		getInitialState: function getInitialState() {
			return {
				hourtime: 0,
				minutetime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				showOpacity: 1,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);

			if (this.props.show == true) {
				this.setState({
					showOpacity: 1,
					timeDisplay: true
				});
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarr && next.hourarr instanceof Array) {
				hourarr = next.hourarr;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : '' + value;
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
			var maxminute = 180;
			var minminute = 1;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (next.minutearr && next.minutearr instanceof Array) {
				minutearr = next.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : '' + _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute + "") == -1) minutearr.push(maxminute + "");
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
			this.props.control();
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
			this.props.cancelClock();
			this.props.resetList(this.state.hourtime, this.state.minutetime);
			if (typeof this.props.submitClock === 'function') {} else {
				// console.log('error:the submit callback is not a function');
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
			var selecttitle = '修改温度/时间' + '(' + this.props.title + ')';
			var statusname = this.props.statusname || '';
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
				{ style: { visibility: this.state.timeDisplay ? "initial" : "hidden", opacity: this.state.showOpacity }, ref: 'ordertime', className: 'Ordertime' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'ordertime', onTouchMove: this.endDefault },
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
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								' \u2103'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								'\u5206\u949F'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
					),
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
					)
				)
			);
		}
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Define = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _Toast = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	het.repaint(function (data) {
	  // var appData = Funs._extends({}, appData, data);
	  _Actions.Actions.repaint(data);
	});

	var Define = exports.Define = function (_BaseComponent) {
	  _inherits(Define, _BaseComponent);

	  function Define(props) {
	    _classCallCheck(this, Define);

	    var _this = _possibleConstructorReturn(this, (Define.__proto__ || Object.getPrototypeOf(Define)).call(this, props));

	    var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	    _this.state = {
	      showToast: false, //默认不显示重名名提示框
	      showDelete: false, //默认不显示删除提示框
	      headerTop: isAndroid ? 73 : 63,
	      modeArr: [],
	      deleteId: 0, //删除或重命名的模式标志
	      deleteIndex: 0 };
	    _this.listenStore(_Store.Store); // 监听Store

	    _this.handerClick = _this.handerClick.bind(_this);
	    _this.closeToast = _this.closeToast.bind(_this);
	    _this.componentWillMount = _this.componentWillMount.bind(_this);
	    _this.deleteHandler = _this.deleteHandler.bind(_this);
	    // this.deletePattern=this.deletePattern.bind(this);//提交给后台删除自定义模式事件;
	    _this.begainWork = _this.begainWork.bind(_this); //启动工作模式
	    _this.componentWillUpdate = _this.componentWillUpdate.bind(_this);
	    het.setTitle(JSON.stringify({ setNavTitle: 1, title: '自定义模式', setNavRightBtnHiden: 1 }));
	    return _this;
	  }

	  _createClass(Define, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      _Actions.Actions.modeData();
	      _Actions.Actions.pullData();
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate(nextProps, nextState) {
	      if (this.state.rePull != 0 && nextState.rePull === 0) {
	        _Actions.Actions.pullData();
	        _Actions.Actions.modeData();
	      };
	    }
	  }, {
	    key: 'handerClick',
	    value: function handerClick(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var type = e.currentTarget.getAttribute('data-type');
	      var type1 = e.currentTarget.getAttribute('data-type1');
	      this.setState({ showToast: true, deleteId: type, deleteIndex: type1 });
	    }
	  }, {
	    key: 'closeToast',
	    value: function closeToast() {
	      this.setState({ showToast: false, showDelete: false });
	    }
	  }, {
	    key: 'deleteHandler',
	    value: function deleteHandler(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var type = e.currentTarget.getAttribute('data-type');
	      var type1 = e.currentTarget.getAttribute('data-type1');
	      this.setState({ showDelete: true, deleteId: type, deleteIndex: type1 });
	    }
	    // deletePattern(){
	    //   let mode=this.state.deleteId;
	    //    Actions.deleteMode(mode);
	    //    // Actions.modeData();
	    //    // Actions.pullData();
	    // }

	  }, {
	    key: 'begainWork',
	    value: function begainWork(e) {
	      e.preventDefault();
	      if (this.state.Mode === undefined) return;
	      if (this.state.Mode) return;
	      var type = e.currentTarget.getAttribute('data-type');
	      var modeArr = this.state.modeArr[type].modeStepList;
	      _Actions.Actions.begainWork(modeArr);
	      history.go(-1);
	    }
	  }, {
	    key: 'render',
	    value: function render() {

	      var deleteMode = this.state.modeArr;
	      var index = this.state.deleteIndex;
	      var deletText = (deleteMode[index] || { modeName: "" }).modeName;
	      // console.log(index,deletText)
	      var imgArr = ['firstMode4.png', 'secondMode4.png', 'thirdMode4.png', 'fourMode4.png', 'fiveMode4.png', 'sixMode4.png', 'sevenMode4.png', 'eightMode4.png', 'nineMode4.png', 'tenMode4.png', 'elevenMode4.png', 'twelveMode4.png'];
	      var workArr = ['蒸汽模式', '顶部蒸烤组合', '后部热风蒸组合', '后部热风', '顶部热风', '顶部烧烤', '顶部单管热风', '顶部单管烤', '发酵', '保温', '解冻', '杀菌'];
	      var imgSrc = '../static/img/';
	      var startArr = ['start.png', 'un-start.png'];
	      var startSrc = '../static/img/' + startArr[this.state.Mode == 0 ? 0 : 1];

	      return React.createElement(
	        'div',
	        { className: 'defineStyle' },
	        React.createElement('div', { style: { height: this.state.headerTop, width: '100%', backgroundColor: '#2A2C35', position: 'fixed', left: 0, top: 0, zIndex: 99999 } }),
	        React.createElement(
	          'div',
	          { className: 'noteText', style: { display: this.state.modedata == 0 ? '' : 'none' } },
	          '\u4F60\u9700\u8981\u5230 \'\u70D8\u7119\u6A21\u5F0F\' \u9875\u9762\u4FDD\u5B58 \'\u81EA\u5B9A\u4E49\' \u6A21\u5F0F\u54E6'
	        ),
	        React.createElement(
	          'div',
	          { style: { display: this.state.modeArr.length == 0 && this.state.rePull != 0 ? '' : 'none', marginTop: this.state.headerTop }, className: 'loading' },
	          React.createElement('img', { src: '../static/img/loading.gif' }),
	          React.createElement(
	            'span',
	            { style: { display: 'block', margin: '0 auto', fontSize: '14px' } },
	            '\u52A0\u8F7D\u4E2D'
	          )
	        ),
	        React.createElement(
	          'section',
	          { style: { display: this.state.modedata ? '' : 'none', marginTop: this.state.headerTop + 24 + 'px' } },
	          this.state.modeArr.map(function (id, index) {
	            return React.createElement(
	              'div',
	              { key: index },
	              React.createElement(
	                'section',
	                { className: 'modeArea' },
	                React.createElement(
	                  'p',
	                  { className: 'modeName' },
	                  id.modeName
	                ),
	                React.createElement(
	                  'div',
	                  { className: 'modeLine' },
	                  id.modeStepList.map(function (mode, index) {
	                    return React.createElement(
	                      'div',
	                      { className: 'modeStyle', key: index },
	                      React.createElement(
	                        'p',
	                        null,
	                        React.createElement('img', { src: imgSrc + imgArr[mode.modeType - 1] })
	                      ),
	                      React.createElement(
	                        'p',
	                        null,
	                        React.createElement(
	                          'span',
	                          null,
	                          workArr[mode.modeType - 1]
	                        ),
	                        React.createElement(
	                          'span',
	                          null,
	                          mode.temp,
	                          '\u2103/',
	                          mode.minutes,
	                          '\u5206\u949F'
	                        )
	                      )
	                    );
	                  }.bind(this))
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'controlMode' },
	                React.createElement(
	                  'div',
	                  { onTouchEnd: this.deleteHandler, 'data-type': id.modeId, 'data-type1': index },
	                  React.createElement('img', { src: '../static/img/delete.png' }),
	                  React.createElement(
	                    'span',
	                    null,
	                    '\u5220\u9664'
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { onTouchEnd: this.handerClick, 'data-type': id.modeId, 'data-type1': index },
	                  React.createElement('img', { src: '../static/img/rename.png' }),
	                  React.createElement(
	                    'span',
	                    null,
	                    '\u91CD\u547D\u540D'
	                  )
	                ),
	                React.createElement(
	                  'div',
	                  { onTouchEnd: this.begainWork, 'data-type': index },
	                  React.createElement('img', { src: startSrc }),
	                  React.createElement(
	                    'span',
	                    { style: { color: this.state.Mode == 0 ? '#303030' : '#ababab' } },
	                    '\u542F\u52A8'
	                  )
	                )
	              ),
	              React.createElement('div', { className: 'blank' })
	            );
	          }.bind(this))
	        ),
	        React.createElement('div', { className: 'mask', style: { display: this.state.showDelete == true || this.state.showToast == true ? '' : 'none' } }),
	        React.createElement(_Toast.Toast, { closeToast: this.closeToast, showToast: this.state.showToast, showDelete: this.state.showDelete, deletePattern: this.deletePattern, modeId: this.state.deleteId, deleteMode: this.state.deleteId, modeStyle: this.state.modeArr, deletText: deletText })
	      );
	    }
	  }]);

	  return Define;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Toast = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;

	var Toast = exports.Toast = function (_BaseComponent) {
	  _inherits(Toast, _BaseComponent);

	  function Toast(state) {
	    _classCallCheck(this, Toast);

	    var _this = _possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, state));

	    _this.state = {
	      modelName: _this.props.deletText
	    };
	    _this.listenStore(_Store.Store); // 监听Store
	    _this.componentDidMount = _this.componentDidMount.bind(_this);
	    _this.change = _this.change.bind(_this);
	    _this.cancelDelete = _this.cancelDelete.bind(_this);
	    _this.submitDelete = _this.submitDelete.bind(_this);
	    _this.rechange = _this.rechange.bind(_this);
	    _this.rechange = _this.rechange.bind(_this);
	    return _this;
	  }

	  _createClass(Toast, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {}
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.deletText != nextProps.deletText) {
	        this.setState({ modelName: nextProps.deletText });
	      }
	    }
	  }, {
	    key: 'rechange',
	    value: function rechange(e) {
	      var changeevent = e || window.event;
	      var val = changeevent.target.value;
	      this.setState({ modelName: val });
	    }
	  }, {
	    key: 'change',
	    value: function change() {
	      // let textNode=this.refs.nameValue;
	      // let value=textNode.value=="" ?this.props.deletText :textNode.value;
	      var modeId = this.props.modeId;
	      // textNode.setAttribute('placeholder', this.props.deletText)
	      var value = this.state.modelName;
	      // Actions.rename(value);
	      _Actions.Actions.redefine(modeId, value);
	      this.props.closeToast();

	      setTimeout(function (data) {
	        _Actions.Actions.pullData();
	      }, 200);
	      // this.props.rename(value);
	    }
	  }, {
	    key: 'cancelDelete',
	    value: function cancelDelete() {
	      this.props.closeToast();
	    }
	  }, {
	    key: 'submitDelete',
	    value: function submitDelete() {
	      var mode = this.props.deleteMode;
	      this.props.closeToast();
	      _Actions.Actions.deleteMode(mode);
	      // if(this.state.rePull==0){Actions.pullData();alert(重新获取)};
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var text = this.props.deletText;

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'section',
	          { className: 'nameToast', style: { display: this.props.showToast ? '' : 'none' } },
	          React.createElement(
	            'section',
	            { className: 'top' },
	            React.createElement('input', { type: 'text', className: 'change', ref: 'nameValue', maxLength: '10', onChange: this.rechange, value: this.state.modelName })
	          ),
	          React.createElement(
	            'div',
	            { className: 'deleteButton_top' },
	            React.createElement(
	              'span',
	              { onTouchEnd: this.cancelDelete },
	              '\u53D6\u6D88'
	            ),
	            React.createElement(
	              'span',
	              { onTouchEnd: this.change },
	              '\u786E\u5B9A'
	            )
	          )
	        ),
	        React.createElement(
	          'section',
	          { className: 'deletToast', style: { display: this.props.showDelete ? '' : 'none' } },
	          React.createElement(
	            'section',
	            { className: 'topText' },
	            React.createElement(
	              'p',
	              { className: 'title' },
	              '\u6E29\u99A8\u63D0\u793A'
	            ),
	            React.createElement(
	              'p',
	              { className: 'text' },
	              '\u786E\u5B9A\u8981\u5220\u9664\u5F53\u524D"',
	              text,
	              '"\u6A21\u5F0F\u5417'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'deleteButton' },
	            React.createElement(
	              'span',
	              { onTouchEnd: this.cancelDelete },
	              '\u53D6\u6D88'
	            ),
	            React.createElement(
	              'span',
	              { onTouchEnd: this.submitDelete },
	              '\u786E\u5B9A'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Toast;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 15 */
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
	 * @prop {array} minutearr 可选的分钟数组(默认无,通过最大最小分钟及分钟间隔计算得到,
	 * 如果传值则取传值,注意对数组里面的值暂无验证,请传入正确值格式的数组)
	 * @prop {boolean} arrayInit 是否需要更新数组
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
				showOpacity: 1,
				timeDisplay: false
			};
		},
		componentDidMount: function componentDidMount() {
			//初始化时间可选值数组
			this.timearrInit(this.props);
			if (this.props.show == true) {
				this.setState({
					showOpacity: 1,
					timeDisplay: true
				});
			}
		},
		timearrInit: function timearrInit(next) {
			//设置时间可选值数组
			var maxhour = parseInt(next.maxhour) || parseInt(this.props.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.props.minhour) || 0;
			var hourstep = parseInt(next.hourstep) || parseInt(this.props.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarr && next.hourarr instanceof Array) {
				hourarr = next.hourarr;
				this.setState({
					hourarr: hourarr,
					hourtime: minhour
				});
			} else {
				for (var i = 0; i <= maxlength; i++) {
					var value = minhour + i * hourstep;
					value = value < 10 ? '0' + value : '' + value;
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
			var maxminute = 180;
			var minminute = 1;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			if (next.minutearr && next.minutearr instanceof Array) {
				minutearr = next.minutearr;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value = minminute + j * minutestep;
					_value = _value < 10 ? '0' + _value : '' + _value;
					minutearr.push(_value);
				}
				if (minutearr.indexOf(maxminute + "") == -1) minutearr.push(maxminute + "");
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
			this.props.control();
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
			this.props.cancelClock();
			this.props.resetTime(this.state.minutetime);
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
			var selecttitle = '修改时间' + '(' + this.props.title + ')';
			var statusname = this.props.statusname || '';
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
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 55 + '%' } },
								'\u5206\u949F'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
					),
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
					)
				)
			);
		}
	});

/***/ }
/******/ ]);