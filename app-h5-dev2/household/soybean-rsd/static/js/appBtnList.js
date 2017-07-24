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

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store

	        _this.handleShakeSwitch = _this.handleShakeSwitch.bind(_this);

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleShakeSwitch',
	        value: function handleShakeSwitch(e) {
	            if (this.state.networkavailable == 2) {
	                het.toast('当前网络不可用！');return false;
	            }
	            if (this.state.online == 2) {
	                het.toast('设备已离线');return false;
	            }
	            var type = e.currentTarget.getAttribute('data-type');
	            var WorkCompSta = parseInt(this.state.WorkCompSta);
	            var CurWorkMode = parseInt(this.state.CurWorkMode);
	            this.setState({ CurWorkMode: parseInt(type) });
	            _Actions.Actions.handleShakeSwitch(type, WorkCompSta);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var WorkCompSta = parseInt(this.state.WorkCompSta || 0);
	            var workText = ['待机中', '工作中', '已完成'][WorkCompSta];
	            var CurWorkMode = parseInt(this.state.CurWorkMode || 0);
	            var workMode = [' ', '五谷豆浆', '干/湿豆', '米糊', '绿豆沙', '婴儿辅食', '云菜谱', '果汁搅拌', '轻松洗'][CurWorkMode];

	            var status = this.state.WorkCompSta ? this.state.WorkCompSta : 0;
	            var mode = this.state.CurWorkMode ? this.state.CurWorkMode : 0;
	            // console.log('iiiiiiii',WorkCompSta);
	            if (WorkCompSta == 0) {
	                mode = 0;
	            }
	            var fastBtnEvent = mode == 0 ? this.handleShakeSwitch : '';
	            var btnCss = mode == 0 ? '' : '';
	            // console.log('mode1111111111111111',mode);
	            return React.createElement(
	                'div',
	                null,
	                this.state.online == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    workText + ' ',
	                    CurWorkMode != 0 ? '模式：' + workMode : workMode + '模式：无'
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { 'data-type': '2', className: mode == 0 || mode == 2 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/ganshi1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5E72/\u6E7F\u8C46'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '1', className: mode == 0 || mode == 1 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/wugu1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u4E94\u8C37\u8C46\u6D46'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '3', className: mode == 0 || mode == 3 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/mizhou1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7C73\u7CCA'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { 'data-type': '4', className: mode == 0 || mode == 4 ? 'flex-cell' : "flex-cell disabled", onTouchStart: fastBtnEvent },
	                        React.createElement('img', { src: "../static/img/btnlist/lvdou1.png" }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u7EFF\u8C46\u6C99'
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

	{/*<article data-type='2' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/ganshi1.png":"../static/img/btnlist/ganshi2.png"} alt=""/>
	                           
	                           <p>干/湿豆</p>
	                       </article>
	                       <article data-type='1' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/wugu1.png":"../static/img/btnlist/wugu2.png"} alt=""/>
	                           <p>五谷豆浆</p>
	                       </article>
	                       <article data-type='3' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/mizhou1.png":"../static/img/btnlist/mizhou2.png"} alt=""/>
	                           <p>米糊</p>
	                       </article>
	                       <article data-type='4' className="flex-cell" onTouchStart={this.handleShakeSwitch}>
	                           <img  src={workMode == 0 || WorkCompSta!=2?"../static/img/btnlist/lvdou1.png":"../static/img/btnlist/lvdou2.png"} alt=""/>
	                           <p>绿豆沙</p>
	                       </article>*/}

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

/***/ }
/******/ ]);