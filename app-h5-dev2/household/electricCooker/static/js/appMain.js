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
	'getData', // 获取页面状态
	'keep', // //处理保温事件 (7-保温)
	'swicthModel', // //切换直接开始烘焙模式
	'modelCancel', //取消状态
	'selectTime', //选择时间
	'modelStart']);

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
	    var time = new Date().getTime() + 2 * 10e3; // 20秒内不接收新数据

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
	        var data = dataFilter(datas);
	        console.log("onRepaint data====>" + JSON.stringify(data) + "====type=====>" + type);
	        //console.log('data',data);
	        //设备id
	        if (!!data.deviceId) AppData.deviceId = data.deviceId;
	        //断网离线
	        if (!!data.online) {
	            AppData.online = data.online;
	            if (data.online == 2) {
	                data.loading = 2;
	                AppData.loading = 2;
	            }
	        }
	        if (!!data.networkavailable) {
	            AppData.networkavailable = data.networkavailable;
	            if (data.networkavailable == 2) {
	                data.loading = 2;
	                AppData.loading = 2;
	            }
	        }

	        //回退数据重渲缓存
	        if (data.preh != undefined) AppData.preh = data.preh;
	        if (data.start != undefined) AppData.start = data.start;
	        if (data.cancel != undefined) AppData.cancel = data.cancel;
	        if (data.updateFlag != undefined) AppData.updateFlag = data.updateFlag;
	        //运行字段
	        if (data.prehour != undefined) AppData.prehour = data.prehour;
	        if (parseInt(type || 0) == 1) {
	            if (data.model != undefined) AppData.model = data.model;
	            if (data.premin != undefined) AppData.premin = data.premin;
	        }
	        //故障字段
	        if (data.BottomNTCFault != undefined) AppData.BottomNTCFault = data.BottomNTCFault; //底盘NTC异常
	        if (data.TopNTCFault != undefined) AppData.TopNTCFault = data.TopNTCFault; //上盖NTC异常
	        if (data.PCBANTCFault != undefined) AppData.PCBANTCFault = data.PCBANTCFault; //环境温度NTC异常
	        if (data.CircuitFault != undefined) AppData.CircuitFault = data.CircuitFault; //主加热电路故障
	        if (data.EEPROMFault != undefined) AppData.EEPROMFault = data.EEPROMFault; //存储器件故障
	        if (data.LeakageFault != undefined) AppData.LeakageFault = data.LeakageFault; //机器漏电异常

	        console.log("onRepaint AppData====>" + JSON.stringify(AppData));
	        if (AppData.preh != undefined) {
	            data.loading = 2;
	            AppData.loading = 2;
	        }
	        this.trigger(AppData);
	    },
	    onGetData: function onGetData() {
	        console.log("AppData=" + JSON.stringify(AppData));
	        this.trigger(AppData);
	    },
	    onKeep: function onKeep() {
	        var _this2 = this;

	        //处理保温事件 (7-保温)
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备已离线');
	            return;
	        }
	        AppData.model = "07";
	        AppData.start = "01";
	        AppData.cancel = "00";
	        AppData.updateFlag = het.hexUpFlag(14, 3, 4);
	        het.send({
	            model: AppData.model,
	            start: AppData.start,
	            cancel: AppData.cancel,
	            updateFlag: AppData.updateFlag
	        }, function (data) {
	            console.log('成功');
	            _this2.trigger(AppData); //这里直接显示uI 点击进入保温模式
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        // setDataTimer('model');
	    },
	    onSwicthModel: function onSwicthModel(model) {
	        //直接启动的模式
	        AppData.model = "0" + model;
	        AppData.start = "01";
	        AppData.cancel = "00";
	        AppData.updateFlag = het.hexUpFlag(14, 3, 4);
	        het.send(AppData, function (data) {
	            console.log('成功');
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        // setDataTimer('model');
	        this.trigger({ model: AppData.model });
	    },
	    onSelectTime: function onSelectTime(hour, minute) {
	        this.trigger({ hour: hour, minute: minute, selectshow: false });
	    },
	    onModelCancel: function onModelCancel() {
	        var _this3 = this;

	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备已离线');
	            return;
	        }
	        AppData.model = "00";
	        AppData.start = "00";
	        AppData.cancel = "01";
	        AppData.updateFlag = het.hexUpFlag(14, 3, 4);
	        het.send(AppData, function (data) {
	            //取消之后手动恢复所有运行工作状态
	            AppData.model = "00";
	            AppData.preh = "00";
	            AppData.prehour = "00";
	            AppData.premin = "00";
	            _this3.trigger(AppData);
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        // setDataTimer('model');
	    },
	    onModelStart: function onModelStart(WorkModelSelect, preh, premin) {
	        var _this = this;
	        if (isNetOff()) {
	            het.toast('网络连接失败，请检查网络');
	            return;
	        }
	        if (isOffline()) {
	            het.toast('设备已离线');
	            return;
	        }
	        console.log('iserr model = ', JSON.stringify(AppData));
	        if (preh != 0 || premin != 0) {
	            //预约  开始
	            if (parseInt(preh) == 24 && parseInt(premin) != 0) {
	                het.toast("预约时长不能大于24个小时,请重新选择预约时长！");
	                return;
	            }
	            AppData.preh = decToHex(preh);
	            AppData.premin = decToHex(premin);
	            AppData.updateFlag = het.hexUpFlag(12, 2, 4);
	        } else {
	            AppData.preh = '00';
	            AppData.premin = '00';
	            AppData.updateFlag = het.hexUpFlag(12, 2, 4);
	        }
	        AppData.model = "0" + (parseInt(WorkModelSelect) + 1);
	        AppData.start = "02";
	        AppData.cancel = "00";
	        AppData.updateFlag = het.hexUpFlag(14, 3, 4, AppData.updateFlag);
	        console.log('send model', AppData);
	        het.send(AppData, function (data) {
	            console.log('onstart succee');
	            AppData.prehour = AppData.preh;
	            _this.trigger({
	                'preh': AppData.preh,
	                'premin': AppData.premin,
	                'model': AppData.model,
	                'start': AppData.start,
	                'cancel': AppData.cancel,
	                'prehour': AppData.prehour
	            });
	            history.back();
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        // setDataTimer('model');
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

	var _DialogStyle = __webpack_require__(7);

	var _SelectModel = __webpack_require__(8);

	var _LoadImagModel = __webpack_require__(11);

	var _LoadImagSmall = __webpack_require__(12);

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
	        renderConfigData: true, // 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data, type);
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
	            _this.modelCancel();
	        };

	        _this.canceldiaerr = function () {
	            //console.log("canceldia/......");
	            _this.setState({
	                selectdiagErro: false
	            });
	        };
	        _this.submitdiaerr = function () {
	            //console.log("submitdia/......");
	            location.href = "tel:0755-26727188";
	            _this.setState({
	                selectdiagErro: false
	            });
	        };
	        _Actions.Actions.getData();
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            //故障判断
	            var isUpdate = false;
	            var ErrItems = [];
	            if (this.state.BottomNTCFault != nextState.BottomNTCFault) {
	                isUpdate = true;
	            }
	            if (this.state.TopNTCFault != nextState.TopNTCFault) {
	                isUpdate = true;
	            }
	            if (this.state.PCBANTCFault != nextState.PCBANTCFault) {
	                isUpdate = true;
	            }
	            if (this.state.CircuitFault != nextState.CircuitFault) {
	                isUpdate = true;
	            }
	            if (this.state.EEPROMFault != nextState.EEPROMFault) {
	                isUpdate = true;
	            }
	            if (this.state.LeakageFault != nextState.LeakageFault) {
	                isUpdate = true;
	            }
	            if (isUpdate) {
	                if (nextState.BottomNTCFault == 1 || nextState.TopNTCFault == 1 || nextState.PCBANTCFault == 1) {
	                    ErrItems.push('传感器开路');
	                }
	                if (nextState.BottomNTCFault == 2 || nextState.TopNTCFault == 2 || nextState.PCBANTCFault == 2) {
	                    ErrItems.push('传感器短路');
	                }
	                if (nextState.BottomNTCFault == 3) {
	                    ErrItems.push('底盘超温');
	                }
	                if (nextState.TopNTCFault == 3) {
	                    ErrItems.push('上盖超温');
	                }
	                if (nextState.PCBANTCFault == 3) {
	                    ErrItems.push('传感器异常');
	                }
	                if (nextState.CircuitFault == 1) {
	                    ErrItems.push('主加热电路故障');
	                }
	                if (nextState.EEPROMFault == 1) {
	                    ErrItems.push('存储器件故障');
	                }
	                if (nextState.LeakageFault == 1) {
	                    ErrItems.push('机器漏电异常');
	                }
	                if (ErrItems.length > 0) {
	                    this.setState({
	                        selectdiag: false,
	                        selectdiagErro: true,
	                        errorcontents: ErrItems
	                    });
	                } else {
	                    this.setState({
	                        selectdiagErro: false,
	                        errorcontents: []
	                    });
	                }
	            }
	        }
	    }, {
	        key: 'handleKeep',
	        value: function handleKeep() {
	            //处理保温事件 (7-保温)
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast('设备已离线');
	                return false;
	            }
	            var ErrItems = this.state.errorcontents || [];
	            if (ErrItems.length > 0) {
	                this.setState({
	                    selectdiagErro: true
	                });
	                return false;
	            }
	            if (parseInt(this.state.model || 0) != 0) {
	                return false;
	            }
	            _Actions.Actions.keep();
	        }
	    }, {
	        key: 'linkSelectModel',
	        value: function linkSelectModel(e) {
	            e.stopPropagation();
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast('设备已离线');
	                return false;
	            }
	            var ErrItems = this.state.errorcontents || [];
	            if (ErrItems.length > 0) {
	                this.setState({
	                    selectdiagErro: true
	                });
	                return false;
	            }
	            if (parseInt(this.state.model || 0) != 0) return false;
	            location.href = "#/SelectModel";
	            e.preventDefault();
	        }
	    }, {
	        key: 'modelCancel',
	        value: function modelCancel() {
	            //取消所有状态  变成待机中
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast('设备已离线');
	                return false;
	            }
	            var ErrItems = this.state.errorcontents || [];
	            if (ErrItems.length > 0) {
	                this.setState({
	                    selectdiagErro: true
	                });
	                return false;
	            }
	            if (!this.isCanCancel()) return false;
	            _Actions.Actions.modelCancel();
	        }
	    }, {
	        key: 'isPoll',
	        value: function isPoll() {
	            //是否是预约状态
	            var online = this.state.online || 1; //设备是否在线
	            var model = this.state.model || 0;
	            var prehour = this.state.prehour || 0; //预约的时间(小时)
	            var premin = this.state.premin || 0; //预约时间(分钟)
	            var isPoll = 0;
	            if (prehour == 0 && premin == 0) {
	                isPoll = 0; //没有预约时间
	            } else {
	                isPoll = 1; //有预约时间
	            }
	            if (online == 1 && model != 0 && model != 7 && isPoll == 1) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'isCanCancel',
	        value: function isCanCancel() {
	            var online = this.state.online || 1; //设备是否在线
	            var model = parseInt(this.state.model) || 0;
	            if (online == 1 && model != 0) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'cancelDia',
	        value: function cancelDia() {
	            if (parseInt(this.state.online || 1) == 2) {
	                het.toast('设备已离线');
	                return false;
	            }
	            var ErrItems = this.state.errorcontents || [];
	            if (ErrItems.length > 0) {
	                this.setState({
	                    selectdiagErro: true
	                });
	                return false;
	            }
	            if (!this.isCanCancel()) return false;
	            this.openCancelDialog();
	        }

	        //时间的处理先不管  后面再说

	    }, {
	        key: 'openCancelDialog',
	        value: function openCancelDialog() {
	            var title = '温馨提示';
	            var content = '确认吗?';
	            var rightpam = '确定';
	            var model = parseInt(this.state.model) || 0;
	            if (this.isPoll()) {
	                content = "美食预约中, 确定取消吗?";
	            } else if (model == 7) {
	                content = "美食保温中, 确定取消吗?";
	            } else {
	                content = "美食烹饪中, 确定取消吗?";
	            }
	            this.setState({
	                selectdiag: true,
	                diatitles: title,
	                diacontents: content,
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
	            var selectdiag = this.state.selectdiag;
	            var selectdiagErro = this.state.selectdiagErro;

	            var workarry = ['模式', '标准', '快煮', '稀饭', '粥/汤', '蒸煮', '热饭'];
	            var workTextArry = [{ 'stateName': '待机中', 'modelId': 'stateDev1' }, { 'stateName': '保温中', 'modelId': 'stateDev2' }, { 'stateName': '烹饪中', 'modelId': 'stateDev2' }, { 'stateName': '预约中', 'modelId': 'stateDev2' }, { 'stateName': '离线中', 'modelId': 'stateDev3' }];
	            var model = parseInt(this.state.model) || 0,
	                modelImgPath = '../static/img/';
	            var online = parseInt(this.state.online) || 1;
	            var workText = online == 2 ? workTextArry[4] : model != 0 ? model == 7 ? workTextArry[1] : this.isPoll() ? workTextArry[3] : workTextArry[2] : workTextArry[0];
	            if (online == 2 || model == 0 || model == 7) {
	                modelImgPath = modelImgPath + "model" + (online == 1 ? model != 0 ? model != 7 ? "_selected.png" : "_disable.png" : "_normal.png" : "_disable.png");
	            } else {
	                modelImgPath = modelImgPath + model + (online == 1 ? model != 0 ? model != 7 ? "_selected.png" : "_disable.png" : "_normal.png" : "_disable.png");
	            }
	            console.log("====>model=" + model);

	            var prehour = parseInt(this.state.prehour, 16) || 0;
	            var premin = parseInt(this.state.premin, 16) || 0;
	            var bookTime = online == 2 ? "" : React.createElement(
	                'i',
	                null,
	                this.initTimeFm(parseInt(prehour)),
	                React.createElement(
	                    'span',
	                    {
	                        className: 'bookTimeDot' },
	                    ':'
	                ),
	                this.initTimeFm(parseInt(premin))
	            );
	            //console.log("leftTime="+leftTime);
	            var TitleTextTime = React.createElement(
	                'p',
	                null,
	                online == 1 && this.isPoll() ? "预约时长" : "",
	                online == 1 && this.isPoll() ? bookTime : ""
	            );

	            var ErrItems = this.state.errorcontents || [];
	            return React.createElement(
	                'section',
	                { className: 'app_body' },
	                React.createElement('section', { className: "app_bgimg_hg" }),
	                React.createElement(
	                    'div',
	                    { className: 'dev_wrokstate' },
	                    React.createElement(
	                        'p',
	                        { className: "stateDev " + workText.modelId },
	                        workText.stateName
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'dev-state appointment' },
	                        TitleTextTime
	                    ),
	                    React.createElement(_LoadImagSmall.LoadImagSmall, { showLoad: online == 1 && model != 0 && !this.isPoll() ? 1 : 2, showSmall: true })
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'dev_select_canel' },
	                    React.createElement(
	                        'div',
	                        { className: 'flex selectmodel' },
	                        React.createElement(
	                            'article',
	                            { onTouchEnd: this.handleKeep.bind(this) },
	                            React.createElement(
	                                'div',
	                                null,
	                                React.createElement('img', {
	                                    src: online == 1 ? model != 0 ? model == 7 ? "../static/img/keep_selected.png" : "../static/img/keep_disable.png" : "../static/img/keep.png" : "../static/img/keep_disable.png",
	                                    alt: '' }),
	                                React.createElement(
	                                    'p',
	                                    { className: online == 1 ? model != 0 ? model == 7 ? "select_p1" : "select_p3" : "select_p2" : "select_p3" },
	                                    '\u4FDD\u6E29'
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'article',
	                            { onTouchStart: this.linkSelectModel.bind(this) },
	                            React.createElement(
	                                'div',
	                                null,
	                                React.createElement('img', { src: modelImgPath, alt: '' }),
	                                React.createElement(
	                                    'p',
	                                    { className: online == 1 ? model != 0 ? model != 7 ? "select_p1" : "select_p3" : "select_p2" : "select_p3" },
	                                    model == 7 ? workarry[0] : workarry[model]
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'section',
	                        { className: 'footer cancel', onTouchStart: this.cancelDia.bind(this) },
	                        React.createElement(
	                            'div',
	                            { className: 'cancelBtn' },
	                            React.createElement(
	                                'p',
	                                { className: this.isCanCancel() ? "select_p1" : "select_p3" },
	                                '\u53D6\u6D88'
	                            )
	                        )
	                    )
	                ),
	                React.createElement(_DialogStyle.DialogStyle, { show: selectdiag, cancelClock: this.canceldia,
	                    submitClock: this.submitdia,
	                    title: this.state.diatitles, canCel: false, content: this.state.diacontents, rightpam: this.state.diaright || '确定' }),
	                React.createElement(_DialogStyle.DialogStyle, { show: selectdiagErro, cancelClock: this.canceldiaerr.bind(this),
	                    submitClock: this.submitdiaerr.bind(this), rightpam: '\u8054\u7CFB\u5BA2\u670D',
	                    title: '\u8BBE\u5907\u6545\u969C', canCel: false, errs: ErrItems }),
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
	                    'ul',
	                    { className: '', key: index },
	                    React.createElement(
	                        'li',
	                        null,
	                        item
	                    )
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectModel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(5);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(3);

	var _TimeSelect = __webpack_require__(9);

	var _StateModel = __webpack_require__(10);

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
	        key: 'startEnd',
	        value: function startEnd(e) {
	            var activeIndex = e.target.getAttribute('data-index');
	            this.setState({ Timehour: 0, Timemin: 0, activeIndex: activeIndex }); //选择模式
	            console.log('select  activeIndex', activeIndex);
	        }
	    }, {
	        key: 'timeClock',
	        value: function timeClock(e) {
	            this.setState({
	                selectshow: true
	            });
	        }
	    }, {
	        key: 'modelStart',
	        value: function modelStart() {
	            if (parseInt(this.state.online) == 2) {
	                het.toast('设备已离线');
	                return false;
	            }
	            //console.log('modelStart');
	            var Hour = parseInt(this.state.hour === undefined ? 0 : this.state.hour); //预约小时
	            var Min = parseInt(this.state.minute === undefined ? 0 : this.state.minute); //预约分钟
	            var CurWorkModel = this.state.activeIndex || 0;
	            console.log('modelStart' + 'CurWorkModel=' + CurWorkModel + 'Hour=' + Hour + 'Min=' + Min);
	            _Actions.Actions.modelStart(parseInt(CurWorkModel), Hour, Min);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var activeIndex = this.state.activeIndex || 0;
	            //console.log('activeIndex',activeIndex);
	            var selectshow = this.state.selectshow;
	            var selectTitle = '预约时间';
	            var statusname = '后启动';
	            var hour = parseInt(this.state.hour);
	            var minute = parseInt(this.state.minute);
	            var remainTime = hour > 0 || minute > 0 ? (hour > 0 ? hour + '小时' : '') + (minute > 0 ? minute + '分' : '') + '后开始工作' : '- -';

	            return React.createElement(
	                'section',
	                { className: 'SetModel' },
	                React.createElement('div', { style: { height: this.state.headerTop + 'px', width: '100%', backgroundColor: 'rgb(50,133,255)' } }),
	                React.createElement(
	                    'div',
	                    { className: 'modelSel ' },
	                    stateModel.getAll().map(function (item, index) {
	                        return React.createElement(
	                            'div',
	                            { 'data-index': index, key: index, onTouchEnd: _this3.startEnd.bind(_this3) },
	                            React.createElement('i', { className: item.photo + ' ' + (index == activeIndex ? 'active' : ''),
	                                'data-index': index }),
	                            React.createElement(
	                                'span',
	                                { 'data-index': index,
	                                    className: index == activeIndex ? 'active' : '' },
	                                item.name
	                            )
	                        );
	                    })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'startModel' },
	                    React.createElement(
	                        'div',
	                        { className: 'modelTime' },
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
	                            { className: 'start', onTouchEnd: this.modelStart.bind(this) },
	                            '\u542F\u52A8'
	                        )
	                    ),
	                    React.createElement(_TimeSelect.TimeSelect, { title: selectTitle, minuteshow: true, hourshow: true, hourstep: 1,
	                        minutestep: 1, defaulthour: 1, statusname: statusname, cancelClock: this.cancelClock,
	                        submitClock: this.submitClock, show: selectshow,
	                        hourarray: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
	                        minutearr: ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'] })
	                )
	            );
	        }
	    }]);

	    return SelectModel;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 9 */
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
								'\u7535\u996D\u7172\u5C06\u5728'
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
/* 10 */
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

	        this.items = [{ 'modelId': '1', 'name': '标准', photo: 'photo0' }, { 'modelId': '2', 'name': '快煮', photo: 'photo1' }, { 'modelId': '3', 'name': '稀饭', photo: 'photo2' }, { 'modelId': '4', 'name': '粥/汤', photo: 'photo3' }, { 'modelId': '5', 'name': '蒸煮', photo: 'photo4' }, { 'modelId': '6', 'name': '热饭', photo: 'photo5' }];
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LoadImagModel = undefined;

	var _LoadImagSmall = __webpack_require__(12);

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
	            React.createElement(_LoadImagSmall.LoadImagSmall, { showLoad: show })
	        );
	    }
	}); /**
	     * 加载圈
	     */

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * 加载圈
	 */
	var LoadImagSmall = exports.LoadImagSmall = React.createClass({
	    displayName: "LoadImagSmall",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        var show = this.props.showLoad || 1;
	        var small = this.props.showSmall || false;
	        return React.createElement(
	            "section",
	            { className: "spinner " + (small ? "small" : "big"), style: { display: show == 1 ? "" : "none" } },
	            React.createElement(
	                "div",
	                { className: "spinner-container container1" },
	                React.createElement("div", { className: "circle1 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle2 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle3 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle4 " + (small ? "small-circle" : "") })
	            ),
	            React.createElement(
	                "div",
	                { className: "spinner-container container2" },
	                React.createElement("div", { className: "circle1 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle2 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle3 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle4 " + (small ? "small-circle" : "") })
	            ),
	            React.createElement(
	                "div",
	                { className: "spinner-container container3" },
	                React.createElement("div", { className: "circle1 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle2 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle3 " + (small ? "small-circle" : "") }),
	                React.createElement("div", { className: "circle4 " + (small ? "small-circle" : "") })
	            )
	        );
	    }
	});

/***/ }
/******/ ]);