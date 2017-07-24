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

	module.exports = __webpack_require__(4);


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
	'handleShakeSwitch', //appBtnList选择模式
	'getData', //初始化路由
	'clockSwitch', //定时器取消
	'selectTime', //定时器选择
	'modeStart', //模式启动
	'timeclock', //倒计时
	'modeCancel', //取消的模式
	'modeFinish', //完成模式
	'timeclock', //分钟的变化
	'timeclocker', //时分的变化
	'workCompSta' //工作中
	]);

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

	var AppData = {};
	var decToHex = function decToHex(dec) {
	    var hex = parseInt(dec).toString(16);
	    return hex.length === 1 ? '0' + hex : hex;
	};
	// 数据过滤计时器
	var dataFilterTimers = {
	    WorkCompSta: 0,
	    WorkStartStop: 0,
	    BespeakSet: 0,
	    BespeakMode: 0,
	    BespeakHour: 0,
	    BespeakMin: 0,
	    CurWorkMode: 0

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
	    var time = new Date().getTime() + 10e3 * 2; // 10秒内不接收新数据

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

	        if (data.CurWorkMode) AppData.CurWorkMode = data.CurWorkMode;
	        if (data.WorkMode) AppData.WorkMode = data.WorkMode;
	        if (data.WorkCompSta) {
	            AppData.WorkCompSta = data.WorkCompSta;data.open = '02';AppData.open = '02';
	        }
	        if (data.online) {
	            AppData.online = data.online;if (data.online == 2) {
	                data.open = '02';
	            }
	        }
	        if (data.networkavailable) {
	            AppData.networkavailable = data.networkavailable;if (data.networkavailable == 2) {
	                data.open = '02';
	            }
	        }
	        if (data.KeyError) AppData.KeyError = data.KeyError;
	        if (data.BespeakHour) AppData.BespeakHour = data.BespeakHour;
	        if (data.BespeakMin) AppData.BespeakMin = data.BespeakMin;
	        if (data.WorkStartStop) AppData.WorkStartStop = data.WorkStartStop;
	        if (data.deviceName) AppData.deviceName = data.deviceName;
	        if (data.KeyFlagSta) AppData.KeyFlagSta = data.KeyFlagSta;
	        if (data.BespeakSta) AppData.BespeakSta = data.BespeakSta;
	        if (data.BespeakMode) AppData.BespeakMode = data.BespeakMode;

	        this.trigger(data);
	    },
	    onGetData: function onGetData() {
	        this.trigger({ CurWorkMode: AppData.CurWorkMode, WorkCompSta: AppData.WorkCompSta,
	            online: AppData.online, KeyError: AppData.KeyError, BespeakHour: AppData.BespeakHour, BespeakMin: AppData.BespeakMin });
	    },
	    onHandleShakeSwitch: function onHandleShakeSwitch(type, WorkCompSta) {
	        // console.log('type',type,WorkCompSta);
	        if (type) {
	            this.trigger({ 'CurWorkMode': type });
	            if (WorkCompSta == 0) {
	                AppData.WorkStartStop = '01';
	                AppData.WorkMode = '0' + type;
	                AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	                console.log('22222', AppData);
	                het.send(AppData, function (data) {

	                    // console.log(data)
	                }, function (data) {
	                    het.toast("命令发送失败");
	                });
	            }
	        } else {
	            return;
	        }
	    },
	    onClockSwitch: function onClockSwitch(hour, minute) {
	        if (hour == 3 && minute == 'cancel') {
	            this.trigger({ remainTime: hour, clockShow: 3, selectshow: false });
	        }
	    },
	    onSelectTime: function onSelectTime(hour, minute) {
	        // if(isFault()){het.toast(isFault());return false};
	        //alert('6666666666666',hour,minute);

	        this.trigger({ hour: hour, minute: minute, clockShow: 3, selectshow: false });
	        // het.send(AppData, function(data){
	        //     // console.log(data)
	        // },function(data){
	        //     het.toast("命令发送失败");
	        // });
	        // }
	    },
	    onModeStart: function onModeStart(BespeakHour, BespeakMin, CurWorkMode) {

	        //this.trigger({open:'02'});
	        setDataTimer('WorkCompSta', 'WorkStartStop', 'BespeakSet', 'BespeakMode', 'BespeakHour', 'BespeakMin', 'CurWorkMode');
	        !isNaN(BespeakHour) ? '00' : BespeakHour;
	        !isNaN(BespeakMin) ? '00' : BespeakMin;
	        AppData.CurWorkMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	        var date = new Date();
	        var hour = date.getHours() + BespeakHour;
	        var minute = date.getMinutes() + BespeakMin;
	        //this.trigger({BespeakHour:hour,BespeakMin:minute,open:'02'});
	        AppData.BespeakHour == '00' && AppData.BespeakMin == '00' ? AppData.WorkCompSta = 1 : AppData.WorkCompSta = 3;
	        if (BespeakHour == 0 && BespeakMin == 0) {
	            AppData.WorkStartStop = '01';
	            AppData.WorkCompSta = '01';
	            AppData.WorkMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	            AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	            //AppData.updateFlag = het.hexUpFlag(0,2,2);
	        } else {

	            AppData.BespeakSet = '01';
	            AppData.WorkCompSta = '03';
	            // AppData.WorkStartStop = '01';
	            AppData.SetBespeakMode = '0' + (parseInt(CurWorkMode) > 4 ? parseInt(CurWorkMode) + 2 : parseInt(CurWorkMode) + 1);
	            AppData.SetBespeakMin = decToHex(minute > 59 ? minute - 60 : minute);
	            AppData.SetBespeakHour = decToHex((minute > 59 ? hour + 1 : hour) % 24);
	            AppData.BespeakHour = AppData.SetBespeakHour;
	            AppData.BespeakMin = AppData.SetBespeakMin;

	            //AppData.BespeakMode = '0'+(parseInt(CurWorkMode)>4?(parseInt(CurWorkMode)+2):(parseInt(CurWorkMode)+1));;
	            AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 1, 2, het.hexUpFlag(4, 1, 2, het.hexUpFlag(5, 1, 2))));
	            this.trigger({ BespeakHour: AppData.BespeakHour, BespeakMin: AppData.BespeakMin, open: '02' });
	            //AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2,het.hexUpFlag(5,2,2))));
	        }

	        //console.log(AppData,'kkkkkkkkkkkkkkkkk');
	        var _this = this;
	        console.log('gggggggggggg', AppData);
	        het.send(AppData, function (data) {
	            // console.log('open222222222222222222222');
	            _this.trigger({ open: '02' });
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        history.back();
	        //this.trigger({BespeakHour:BespeakHour,BespeakMin:BespeakMin});
	    },
	    onModeCancel: function onModeCancel(WorkCompSta, CurWorkMode) {
	        //setDataTimer('WorkCompSta','WorkStartStop');
	        dataFilterTimers.WorkCompSta = 0;
	        dataFilterTimers.CurWorkMode = 0;
	        AppData.WorkCompSta = '0' + parseInt(WorkCompSta);
	        AppData.BespeakHour = '00';
	        AppData.BespeakMin = '00';
	        AppData.CurWorkMode = CurWorkMode;
	        AppData.WorkMode = CurWorkMode;
	        AppData.WorkStartStop = '00';

	        if (WorkCompSta == 1) {
	            AppData.WorkStartStop = '00';
	            AppData.WorkMode = '00';
	            if (AppData.KeyFlagSta == '01') {
	                AppData.KeyFlag = '01';
	                this.trigger({ KeyFlagSta: '01' });
	            } else {
	                AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	            }
	        } else {
	            AppData.BespeakSet = '00';
	            AppData.BespeakMode = '00';
	            AppData.updateFlag = het.hexUpFlag(2, 1, 2, het.hexUpFlag(3, 1, 2));
	            // this.trigger({WorkCompSta:});
	        }
	        this.trigger({ CurWorkMode: AppData.CurWorkMode });
	        //WorkCompSta ==1?(AppData.WorkMode = '01';AppData.updateFlag = het.hexUpFlag(0,2,2,het.hexUpFlag(1,2,2))):(AppData.WorkMode = '03';AppData.BespeakSet ='00';AppData.BespeakMode = '00'; AppData.updateFlag = het.hexUpFlag(3,2,2,het.hexUpFlag(4,2,2)));
	        // console.log('AppData.updateFlag',AppData);
	        var _this = this;
	        het.send(AppData, function (data) {
	            // console.log('suibian');
	            _this.trigger({ WorkCompSta: '00', BespeakSta: '00' });
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onModeFinish: function onModeFinish() {
	        AppData.WorkCompSta = '02';
	        AppData.WorkStartStop = '00';
	        AppData.updateFlag = het.hexUpFlag(0, 1, 1);

	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onTimeclock: function onTimeclock(BespeakMin) {
	        this.trigger({ BespeakMin: BespeakMin });
	    },
	    onTimeclocker: function onTimeclocker(hour, min) {
	        var date = new Date();
	        var BespeakHour = date.getHours() + hour;
	        var BespeakMin = date.getMinutes() + min;
	        if (BespeakMin > 60) {
	            BespeakMin = BespeakMin - 60;
	            BespeakHour++;
	        }
	        AppData.BespeakHour = decToHex(BespeakHour);
	        AppData.BespeakMin = decToHex(BespeakMin);
	        this.trigger({ BespeakHour: AppData.BespeakHour, BespeakMin: AppData.BespeakMin });
	    },
	    onWorkCompSta: function onWorkCompSta(CurWorkMode) {
	        this.trigger({ WorkCompSta: '01' });
	        AppData.WorkMode = CurWorkMode;
	        AppData.WorkStartStop = '01';
	        // console.log(AppData);
	        AppData.updateFlag = het.hexUpFlag(0, 1, 2, het.hexUpFlag(1, 1, 2));
	        het.send(AppData, function (data) {

	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(5);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _SetMode = __webpack_require__(7);

	var _reactMask = __webpack_require__(9);

	var _reactMask2 = _interopRequireDefault(_reactMask);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true,
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    console.log(data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this2.state = {};
	        _this2.listenStore(_Store.Store); // 监听Store

	        _this2.componentDidUpdate = _this2.componentDidUpdate.bind(_this2);
	        _Actions.Actions.getData();
	        het.setTitle('荣事达豆浆机');

	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {
	            var _this3 = this;

	            var WorkCompSta = this.state.WorkCompSta;
	            if (WorkCompSta == 3) {
	                (function () {
	                    var _this = _this3;
	                    clearInterval(_this3.tclock);
	                    _this3.tclock = setInterval(function () {
	                        _this.timeclock();
	                    }, 60000);
	                })();
	            }
	        }
	    }, {
	        key: 'timeclock',
	        value: function timeclock() {
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用！');return false;
	            }
	            var date = new Date();
	            var hour = parseInt(this.state.BespeakHour, 16) - date.getHours() - 1;
	            var minute = parseInt(this.state.BespeakMin, 16) - date.getMinutes() + 60;
	            hour = hour < 0 ? hour + 24 : hour;
	            var minutes = hour * 60 + minute;
	            var BespeakHour = parseInt(minutes / 60);
	            var BespeakMin = minutes % 60;
	            // let BespeakMin = minute<0?minute+60:minute;
	            // let BespeakHour = minute<0?hour-1:hour;
	            clearInterval(this.tclock);
	            if (BespeakHour >= 0 || BespeakMin > 0) {
	                BespeakMin -= 1;
	                // Actions.timeclock(BespeakMin);
	                //this.setState({BespeakMin:BespeakMin});
	                if (BespeakMin <= 0) {
	                    BespeakMin = 59;
	                    BespeakHour -= 1;
	                    //this.setState({BespeakHour:BespeakHour,BespeakMin:BespeakMin});
	                    // Actions.timeclocker(BespeakHour, BespeakMin);
	                    if (BespeakHour < 0) {

	                        clearInterval(this.tclock);
	                        var CurWorkMode = this.state.CurWorkMode;
	                        _Actions.Actions.workCompSta(CurWorkMode);
	                        //this.setState({WorkCompSta:1});
	                    }
	                }
	                _Actions.Actions.timeclocker(BespeakHour, BespeakMin);
	            }
	        }
	    }, {
	        key: 'modeCancel',
	        value: function modeCancel() {
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用！');return false;
	            }
	            var KeyFlagSta = this.state.KeyFlagSta;
	            if (KeyFlagSta == '01') {
	                return false;
	            }
	            clearInterval(this.tclock);
	            var WorkCompSta = this.state.WorkCompSta;
	            var CurWorkMode = this.state.CurWorkMode;
	            if (WorkCompSta == 3) {
	                this.setState({ WorkCompSta: 0 });
	            }

	            _Actions.Actions.modeCancel(WorkCompSta, CurWorkMode);
	        }
	    }, {
	        key: 'modeFinish',
	        value: function modeFinish() {
	            this.setState({ WorkCompSta: 0 });
	            _Actions.Actions.modeFinish();
	        }
	    }, {
	        key: 'modeLink',
	        value: function modeLink(e) {
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用！');return false;
	            }
	            clearInterval(this.tclock);
	            var WorkCompSta = this.state.WorkCompSta;
	            var BespeakSta = this.state.BespeakSta;

	            if (WorkCompSta == '00' && BespeakSta == '00') {
	                location.href = "#/setMode";
	            }
	        }
	    }, {
	        key: 'open',
	        value: function open(e) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var BespeakSta = parseInt(this.state.BespeakSta || 0);
	            var BespeakMode = parseInt(this.state.BespeakMode || 0);
	            var WorkCompSta = parseInt(this.state.WorkCompSta || 0);

	            var CurWorkMode = parseInt(this.state.CurWorkMode != undefined ? this.state.CurWorkMode : 9);

	            BespeakSta == 1 && WorkCompSta == 0 ? (WorkCompSta = 3, CurWorkMode = BespeakMode) : WorkCompSta;
	            var stateMode = ['待机中', '工作中', '工作完成', '预约中'][WorkCompSta];
	            var cirCon = ['设置模式', '五谷豆浆', '干/湿豆', '米糊', '绿豆沙', '婴儿辅食', ' ', '果汁搅拌', '轻松洗'][CurWorkMode];
	            var stateTitle = this.state.KeyError == '01' ? '提示：按键故障' : ' ';

	            var date = new Date();
	            // console.log(this.state.BespeakHour,this.state.BespeakMin,'ggggggggggg');
	            var hour = parseInt(this.state.BespeakHour, 16) - date.getHours() - 1;
	            hour = hour < 0 ? hour + 24 : hour;
	            var minute = parseInt(this.state.BespeakMin, 16) - date.getMinutes() + 60;
	            // console.log('bbbbbbb',hour,minute);
	            var minutes = hour * 60 + minute;
	            // console.log('dddddddd',minutes);
	            var BespeakHour = parseInt(minutes / 60);
	            var BespeakMin = minutes % 60;

	            // console.log('aaaaaaa',BespeakHour,BespeakMin);
	            BespeakHour = BespeakHour < 0 ? BespeakMin < 0 ? BespeakHour + 23 : BespeakHour + 24 : BespeakHour == 0 && BespeakMin < 0 ? 23 : BespeakHour;
	            BespeakHour == 24 ? BespeakHour = 0 : BespeakHour;
	            BespeakMin = BespeakMin < 0 ? BespeakMin + 60 : BespeakMin;
	            // let BespeakMin = minute<0?minute+60:minute;
	            // let BespeakHour = (minute<0?hour-1:hour)<0?0:(minute<0?hour-1:hour);
	            var online = this.state.online || 1;
	            var KeyFlagSta = this.state.KeyFlagSta;
	            //console.log(this.state.BespeakHour,this.state.BespeakMin,'sssssssssssssssss');
	            var open = this.state.open || '01';
	            // console.log('fffffffffffff',WorkCompSta);
	            return React.createElement(
	                'div',
	                { className: 'app-body' },
	                React.createElement('div', { className: 'indexTop' }),
	                React.createElement(
	                    'div',
	                    { className: 'indexCon' },
	                    React.createElement(
	                        'div',
	                        { className: online != 2 ? 'stateCon' : 'stateCons' },
	                        React.createElement(
	                            'p',
	                            { className: 'stateTitle' },
	                            stateTitle
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'stateMode' + ' ' + 'stateMode' + WorkCompSta },
	                            React.createElement(
	                                'span',
	                                null,
	                                stateMode
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'currState' },
	                            this.state.WorkCompSta == 0 ? ' ' : '当前模式'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'stateCir' + ' ' + 'stateCir' + (WorkCompSta == 0 ? 0 : CurWorkMode), onTouchStart: this.modeLink.bind(this) },
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement('i', null)
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                WorkCompSta == 0 ? '设置模式' : cirCon
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: this.state.WorkCompSta == '02' ? 'finished' : 'finisheds' },
	                            '\u8BBE\u5907\u65AD\u7535\u540E\uFF0C\u65B9\u53EF\u91CD\u65B0\u542F\u52A8\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            { className: 'stateDao' },
	                            WorkCompSta == 3 ? '预计' + BespeakHour + '小时' + (BespeakMin < 10 && BespeakMin > 0 ? '0' + BespeakMin : BespeakMin) + '分后开始' : ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: WorkCompSta == 1 || WorkCompSta == 3 ? KeyFlagSta == '01' ? 'KeyFlagSta' : 'cancel' : 'cancels', onTouchEnd: this.modeCancel.bind(this) },
	                            '\u53D6\u6D88'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: online == 2 ? 'unline' : 'unlines' },
	                        React.createElement('span', { className: 'unline-bg' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u4E3B\u4EBA\uFF0C\u60A8\u7684\u8C46\u6D46\u673A\u4E0D\u5728\u7EBF\u54E6~\uFF01'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: open == '01' ? 'layer-loading' : 'layer-loader', onTouchStart: this.open },
	                    React.createElement(
	                        'div',
	                        { className: 'icon-loading' },
	                        React.createElement(
	                            'span',
	                            null,
	                            React.createElement('img', { src: '../static/img/iconfont-loadc-white.svg', className: 'waiting-rotation' })
	                        )
	                    ),
	                    React.createElement(_reactMask2.default, null)
	                )
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
	        React.createElement(Route, { path: '/setMode', component: _SetMode.SetMode })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(6);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 进度条组件
	 * @prop {boolean} rangedisable  滑动条是否可用
	 * @prop {integer} windStall  	运行速率，取值0-92
	 * @prop {integer} rate  		每档间隔值 用来确定档位范围
	 * @act  Actions.selectRate([integer])  切换档位时触发
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SetMode = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(5);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _TimeSelect = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;

	var SetMode = exports.SetMode = function (_BaseComponent) {
	    _inherits(SetMode, _BaseComponent);

	    function SetMode(props) {
	        _classCallCheck(this, SetMode);

	        var _this = _possibleConstructorReturn(this, (SetMode.__proto__ || Object.getPrototypeOf(SetMode)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        //Actions.pushGuiderData(); // 请求推送向导数据
	        _Actions.Actions.getData();
	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64
	        };
	        _this.submitClock = function (h, m) {
	            _Actions.Actions.selectTime(h, m);
	        };
	        _this.cancelClock = function () {
	            _Actions.Actions.clockSwitch(3, 'cancel');
	        };
	        het.setTitle('模式');
	        return _this;
	    }

	    _createClass(SetMode, [{
	        key: 'startEnd',
	        value: function startEnd(e) {
	            var activeIndex = e.target.getAttribute('data-index');
	            this.setState({ activeIndex: activeIndex });
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
	            // console.log('tttttttttttttt');
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用！');return false;
	            }
	            var BespeakHour = parseInt(this.state.hour === undefined ? 0 : this.state.hour);
	            var BespeakMin = parseInt(this.state.minute === undefined ? 0 : this.state.minute);
	            // console.log(this.state.hour,'mmmmmmm');
	            //let CurWorkMode = this.state.CurWorkMode?parseInt(this.state.CurWorkMode)-1: 0 ;
	            var CurWorkMode = this.state.activeIndex || 0;

	            _Actions.Actions.modeStart(BespeakHour, BespeakMin, CurWorkMode);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //let CurWorkMode = this.state.CurWorkMode?parseInt(this.state.CurWorkMode)-1: 0 ;
	            var activeIndex = this.state.activeIndex || 0;
	            activeIndex > 6 ? activeIndex = 0 : activeIndex;
	            // console.log('activeIndex',activeIndex);
	            var selectshow = this.state.selectshow;

	            var rate = 40;
	            this.state.online == 2 ? history.go(-1) : null;
	            var rangedisable = true;

	            var selectTitle = '预约时间';
	            var statusname = '后开启';
	            var hour = parseInt(this.state.hour);
	            var minute = parseInt(this.state.minute);
	            var remainTime = hour > 0 || minute > 0 ? (hour > 0 ? hour + '小时' : '') + (minute > 0 ? minute + '分' : '') + '后开始工作' : '- -';
	            var arrObj = [{ name: '五谷豆浆', photo: 'photo0' }, { name: '干/湿豆', photo: 'photo1' }, { name: '米糊', photo: 'photo4' }, { name: '绿豆沙', photo: 'photo5' }, { name: '婴儿辅食', photo: 'photo6' }, { name: '果汁搅拌', photo: 'photo7' }, { name: '轻松洗', photo: 'photo8' }];
	            return React.createElement(
	                'section',
	                { className: 'SetMode' },
	                React.createElement('div', { style: { height: this.state.headerTop, width: '100%', backgroundColor: 'rgb(50,133,255)' } }),
	                React.createElement(
	                    'div',
	                    { className: 'modeSel ', onTouchEnd: this.startEnd.bind(this) },
	                    arrObj.map(function (item, index) {
	                        return React.createElement(
	                            'div',
	                            { 'data-index': index, key: index },
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
	                            { rangedisable: selectshow ? true : rangedisable },
	                            remainTime,
	                            React.createElement('i', null)
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'start', onTouchEnd: this.modeStart.bind(this) },
	                        '\u542F\u52A8'
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { title: selectTitle, minuteshow: true, hourshow: true, hourstep: 1,
	                    minutestep: 1, defaulthour: 1, statusname: statusname, cancelClock: this.cancelClock,
	                    submitClock: this.submitClock, show: selectshow, minutearr: ['00', 10, 20, 30, 40, 50] }),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return SetMode;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 8 */
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
				{ style: { display: this.state.timeDisplay ? "block" : "none", opacity: this.state.showOpacity }, ref: 'timeSelect', className: 'timeSelect' },
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
								'\u8C46\u6D46\u673A\u5C06\u5728'
							),
							React.createElement(
								'span',
								{ className: 'hour', style: { left: minuteshow ? 49 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
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
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 41 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Mask = React.createClass({
	    displayName: 'Mask',
	    // 栏目管理弹窗遮罩
	    propTypes: {
	        opacity: React.PropTypes.number, // 透明度
	        zIndex: React.PropTypes.number },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            opacity: 50,
	            zIndex: 100
	        };
	    },

	    render: function render() {
	        var opacity = this.props.opacity;
	        var zIndex = this.props.zIndex;
	        var style = {
	            width: '100%',
	            height: '100%',
	            position: 'fixed',
	            left: 0,
	            top: 0,
	            opacity: opacity / 100,
	            filter: 'alpha(opacity=' + opacity + ')',
	            backgroundColor: 'black',
	            zIndex: zIndex
	        };
	        return React.createElement('div', { style: style });
	    }
	});

	exports.default = Mask;

/***/ }
/******/ ]);