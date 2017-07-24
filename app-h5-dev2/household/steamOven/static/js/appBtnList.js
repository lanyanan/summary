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

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
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

	        _this.state = {

	            restart: false, //默认可以切换工作模式
	            selectMode: 0 };
	        _Store.Store.listen(function (data) {
	            // if(data.OperationWorkMode!==undefined) alert('enter'+JSON.stringify(data));
	            _this.setState(data);
	        }); // 监听Store
	        _this.startWork = _this.startWork.bind(_this);
	        _this.handCancel = _this.handCancel.bind(_this);
	        _this.handStop = _this.handStop.bind(_this);
	        _this.setWet = _this.setWet.bind(_this);

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handCancel',
	        value: function handCancel() {
	            if (this.state.online == 2) het.toast('设备不在线');
	            if (this.state.power == 16 || this.state.power == 0 || this.state.power === undefined) {
	                _Actions.Actions.turn(1);
	            };
	            if (this.state.power == 1) {
	                _Actions.Actions.turn(16);
	            };
	            if (0 < this.state.mode && this.state.mode < 13 || 0 < this.state.Mode && this.state.Mode < 13) {
	                this.setState({ restart: false });_Actions.Actions.calWork();
	            }
	        }
	    }, {
	        key: 'startWork',
	        value: function startWork() {
	            if (this.state.online == 2) het.toast('设备不在线');
	            if (this.state.power == 0 || this.state.power == 16 || this.state.power === undefined) return;

	            // if(this.state.restart==true)return;
	            if (this.state.Mode != 0 && this.state.Mode != undefined) return;
	            if (this.state.reservationhour || this.state.reservationmin) return;

	            clearTimeout(this.clock);
	            var temArr = [100, 180, 180, 180, 180, 180, 180, 180, 40, 60, 60, 100];
	            var time = 20;
	            var chooseMode = this.state.selectMode == 5 ? 1 : this.state.selectMode + 1;

	            this.setState({ selectMode: chooseMode });

	            this.clock = setTimeout(function () {
	                var mode = this.state.selectMode;
	                _Actions.Actions.startWork(mode, temArr[mode - 1]);
	                this.setState({ selectMode: 0 });
	            }.bind(this), 5000);
	        }
	    }, {
	        key: 'handStop',
	        value: function handStop() {
	            if (this.state.online == 2) het.toast('设备不在线');
	            if (this.state.reservationhour || this.state.reservationmin) return;
	            if (this.state.Mode || this.state.mode) {
	                var newstart = this.state.start == 16 ? 1 : 16;
	                this.setState({ start: newstart });
	                _Actions.Actions.stop(newstart);
	            }
	        }
	    }, {
	        key: 'setWet',
	        value: function setWet() {
	            if (this.state.online == 2) het.toast('设备不在线');
	            if (this.state.power == 0 || this.state.power == undefined || this.state.power == 16) return;
	            if (this.state.reservationhour || this.state.reservationmin) return;
	            if (this.state.Mode != 2 && this.state.Mode != 3) return;
	            var setmode = this.state.humidityControl == undefined ? 0 : this.state.humidityControl;
	            var newsetmode = parseInt(setmode) + 1;
	            var mode = newsetmode > 3 ? 1 : newsetmode;
	            _Actions.Actions.sethumidity(mode);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _React$createElement;

	            var is = this.state;
	            var isTrue = is.reservationhour || is.reservationmin ? true : false; //为true时为预约状态

	            var messageArr1 = ['已预约 蒸汽模式', '已预约 顶部蒸烤组合', '已预约 后部热风蒸组合', '已预约 后部热风', '已预约 顶部热风', '已预约 顶部烧烤', '已预约 顶部单管热风', '已预约 顶部单管烤', '已预约 发酵', '已预约 保温', '已预约 解冻', '已预约 杀菌'];
	            var messageArr2 = ['烘焙中 蒸汽模式', '烘焙中 顶部蒸烤组合', '烘焙中 后部热风蒸组合', '烘焙中 后部热风', '烘焙中 顶部热风', '烘焙中 顶部烧烤', '烘焙中 顶部单管热风', '烘焙中 顶部单管烤', '烘焙中 发酵', '烘焙中 保温', '烘焙中 解冻', '烘焙中 杀菌'];
	            var workText1 = messageArr1[this.state.Mode ? this.state.Mode - 1 : this.state.mode - 1];
	            var workText2 = messageArr2[this.state.Mode ? this.state.Mode - 1 : this.state.mode - 1];
	            var workText3 = isTrue ? workText1 : workText2;
	            var workText4 = (this.state.mode == 0 || this.state.Mode == 0) && this.state.power == 1 ? '待机中' : '关机中';
	            var workText = this.state.Mode || this.state.mode ? workText3 : workText4;
	            var wetArr = ['lowwet.png', 'lowwet.png', 'middlewet.png', 'highwet.png'];
	            var wetSrc = '../static/img/' + wetArr[this.state.humidityControl === undefined ? 0 : this.state.humidityControl];
	            var wetTextArr = ['低湿', '中湿', '高湿'];
	            var wetText = wetTextArr[this.state.humidityControl === undefined || this.state.humidityControl == 0 ? 0 : this.state.humidityControl - 1];
	            var stopImageArr = ['aStart.png', 'aStop.png'];
	            var stopSrc = '../static/img/' + stopImageArr[this.state.Mode == 0 || this.state.mode == 0 || this.state.Mode == undefined ? 1 : this.state.start == 16 || this.state.start == 0 ? 0 : this.state.start]; //暂停按钮图标
	            var workImageArr = ['mode1.png', 'mode2.png', 'mode3.png', 'mode4.png', 'mode5.png', 'mode6.png', 'mode7.png', 'mode8.png', 'mode9.png', 'mode10.png', 'mode11.png', 'mode12.png'];
	            var messageArr3 = [' 蒸汽模式', '顶部蒸烤组合', '后部热风蒸组合', '后部热风', '顶部热风', '顶部烧烤', '顶部单管热风', '顶部单管烤', '发酵', ' 保温', ' 解冻', '杀菌'];
	            var workSrc = '../static/img/' + workImageArr[this.state.Mode == undefined || this.state.Mode == 0 || this.state.mode == 0 || this.state.mode === undefined ? 0 : this.state.Mode == 0 && this.state.mode != 0 ? this.state.mode - 1 : this.state.Mode - 1];
	            var workingText = messageArr3[this.state.Mode == undefined || this.state.Mode == 0 || this.state.mode == 0 || this.state.mode === undefined ? 0 : this.state.Mode == 0 && this.state.mode != 0 ? this.state.mode - 1 : this.state.Mode - 1];
	            var firstArr = ['aCancel.png', 'turn-on.png'];
	            var firstextArr = ['开机', '关机', '取消'];
	            var firstSrc = '../static/img/' + firstArr[this.state.mode == 0 || this.state.Mode == 0 || this.state.mode === undefined || this.state.Mode === undefined ? 1 : 0];
	            var firstText = void 0;
	            if ((this.state.power == 16 || this.state.power == undefined || this.state.power == 0) && (this.state.Mode == 0 || this.state.Mode === undefined || this.state.mode == 0 || this.state.mode === undefined)) {
	                firstText = '开机';
	            }
	            if (this.state.power == 1 && (this.state.Mode == 0 || this.state.Mode === undefined || this.state.mode == 0 || this.state.mode === undefined)) {
	                firstText = '关机';
	            }
	            if ((this.state.Mode != 0 || this.state.mode != 0) && this.state.mode != undefined && this.state.Mode != undefined) {
	                firstText = '取消';
	            }
	            var noteText = this.state.online == 2 ? '设备已离线' : '网络不可用';

	            return React.createElement(
	                'div',
	                null,
	                this.state.online == 2 || this.state.networkavailable == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    noteText
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    workText + ''
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: this.state.online == 1 ? 'flex-cell' : "flex-cell disabled", onTouchEnd: this.handCancel },
	                        React.createElement('img', { src: firstSrc }),
	                        React.createElement(
	                            'p',
	                            null,
	                            firstText
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        (_React$createElement = { className: 'flex-cell' }, _defineProperty(_React$createElement, 'className', (this.state.Mode == 0 || this.state.Mode === undefined || this.state.mode == 0) && this.state.online == 1 && this.state.power == 1 ? 'flex-cell' : "flex-cell disabled"), _defineProperty(_React$createElement, 'onTouchStart', this.startWork), _React$createElement),
	                        React.createElement('img', { src: workSrc }),
	                        React.createElement(
	                            'p',
	                            null,
	                            workingText
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: (this.state.Mode == 2 || this.state.Mode == 3) && isTrue == false && this.state.online == 1 ? 'flex-cell' : "flex-cell disabled", onTouchEnd: this.setWet },
	                        React.createElement('img', { src: wetSrc }),
	                        React.createElement(
	                            'p',
	                            null,
	                            wetText
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: (this.state.Mode || this.state.mode) && isTrue == false && this.state.online == 1 ? 'flex-cell' : "flex-cell disabled", onTouchStart: this.handStop },
	                        React.createElement('img', { src: stopSrc }),
	                        React.createElement(
	                            'p',
	                            null,
	                            this.state.start == 16 ? '启动' : '暂停'
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
	    het.setTitle('C-Life 设备控制');
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

/***/ }
/******/ ]);