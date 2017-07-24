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


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data, type);
	});

	// 创建React组件

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            selectModel: 0
	        };

	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _this.startTime = _this.startTime.bind(_this);
	        _this.liveError = _this.liveError.bind(_this);
	        _this.isPoll = _this.isPoll.bind(_this);
	        _this.isCanCancel = _this.isCanCancel.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            if (this.timer != undefined) {
	                //console.log("componentWillUnmount清楚计数器");
	                clearTimeout(this.timer);
	            }
	        }
	    }, {
	        key: 'startTime',
	        value: function startTime(selectModel) {
	            var _this2 = this;

	            this.timer = setTimeout(function () {
	                console.log("handleMode selectModel=" + selectModel);
	                if (selectModel != 0) {
	                    _Actions.Actions.swicthModel(selectModel);
	                    _this2.state = {
	                        selectModel: 0
	                    };
	                }
	            }, 3000);
	        }
	    }, {
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.online == 2) {
	                return '设备已离线';
	            }
	            if (this.state.networkavailable == 2) {
	                return '网络连接失败，请检查网络';
	            }

	            var isHaveError = false;
	            var ErrItems = [];
	            if (this.state.BottomNTCFault != 0) {
	                isHaveError = true;
	            }
	            if (this.state.TopNTCFault != 0) {
	                isHaveError = true;
	            }
	            if (this.state.PCBANTCFault != 0) {
	                isHaveError = true;
	            }
	            if (this.state.CircuitFault != 0) {
	                isHaveError = true;
	            }
	            if (this.state.EEPROMFault != 0) {
	                isHaveError = true;
	            }
	            if (this.state.LeakageFault != 0) {
	                isHaveError = true;
	            }
	            if (isHaveError) {
	                if (this.state.BottomNTCFault == 1 || this.state.TopNTCFault == 1 || this.state.PCBANTCFault == 1) {
	                    ErrItems.push('传感器开路');
	                }
	                if (this.state.BottomNTCFault == 2 || this.state.TopNTCFault == 2 || this.state.PCBANTCFault == 2) {
	                    ErrItems.push('传感器短路');
	                }
	                if (this.state.BottomNTCFault == 3) {
	                    ErrItems.push('底盘超温');
	                }
	                if (this.state.TopNTCFault == 3) {
	                    ErrItems.push('上盖超温');
	                }
	                if (this.state.PCBANTCFault == 3) {
	                    ErrItems.push('传感器异常');
	                }
	                if (this.state.CircuitFault == 1) {
	                    ErrItems.push('主加热电路故障');
	                }
	                if (this.state.EEPROMFault == 1) {
	                    ErrItems.push('存储器件故障');
	                }
	                if (this.state.LeakageFault == 1) {
	                    ErrItems.push('机器漏电异常');
	                }
	                if (ErrItems.length > 0) {
	                    return ErrItems.toString();
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'handleKeep',
	        value: function handleKeep() {
	            //处理保温事件 (7-保温)
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            }
	            if (parseInt(this.state.model) != 0) return false;
	            _Actions.Actions.keep();
	            if (this.timer != undefined) {
	                clearTimeout(this.timer);
	                //console.log("清楚计数器");
	            }
	        }
	    }, {
	        key: 'handleModel',
	        value: function handleModel() {
	            //出来模式选择
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            }
	            if (parseInt(this.state.model) != 0) return false;
	            var selectModel = this.state.selectModel || 0;
	            if (++selectModel > 6) selectModel = 1;

	            this.setState({ 'selectModel': selectModel });
	            if (this.timer != undefined) {
	                clearTimeout(this.timer);
	                //console.log("清楚计数器");
	            }
	            this.startTime(selectModel);
	        }
	    }, {
	        key: 'handleCancel',
	        value: function handleCancel() {
	            if (this.liveError()) {
	                het.toast(this.liveError());
	                return false;
	            }
	            if (!this.isCanCancel()) return false;
	            _Actions.Actions.modelCancel();
	        }
	    }, {
	        key: 'isPoll',
	        value: function isPoll() {
	            //是否是预约状态
	            var model = this.state.model || 0;
	            var prehour = this.state.prehour || 0; //预约的时间(小时)
	            var premin = this.state.premin || 0; //预约时间(分钟)
	            var isPoll = 0;
	            if (prehour == 0 && premin == 0) {
	                isPoll = 0; //没有预约时间
	            } else {
	                isPoll = 1; //有预约时间
	            }
	            if (this.state.online == 1 && model != 0 && model != 7 && isPoll == 1) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'isCanCancel',
	        value: function isCanCancel() {
	            var model = parseInt(this.state.model) || 0;
	            var online = parseInt(this.state.online) || 1;
	            if (online == 1 && model != 0) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var model = parseInt(this.state.model) || 0,
	                modelImgPath = '../static/img/btnlist/',
	                modelName = '无模式',
	                online = this.state.online || 1; //设备是否在线
	            var workarry = ['', '标准', '快煮', '稀饭', '粥/汤', '蒸煮', '热饭'];
	            var workTextArry = ['待机中', '预约中', '保温中', '烹饪中'];
	            var selectModel = this.state.selectModel || 0;
	            var workText = model != 0 ? model == 7 ? workTextArry[2] : this.isPoll() ? workTextArry[1] : workTextArry[3] : workTextArry[0];
	            console.log("model=" + model);
	            var imgModel = selectModel == 0 ? 1 : selectModel;
	            if (online == 2) {
	                modelImgPath = modelImgPath + '1_1.png';
	                modelName = workarry[1];
	            } else if (model != 0 && model != 7) {
	                modelImgPath = modelImgPath + model + '_1.png';
	                modelName = workarry[model];
	            } else {
	                modelImgPath = modelImgPath + imgModel + '_1.png';
	                modelName = workarry[imgModel];
	            }
	            //console.log("modelImgPath="+modelImgPath);
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
	                    workText + ' ',
	                    model != 0 && model != 7 ? '模式：' + workarry[model] : ''
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleKeep.bind(this) },
	                        React.createElement('img', { style: (model == 0 || model == 7) && online == 1 ? { opacity: 1 } : { opacity: 0.3 },
	                            src: "../static/img/btnlist/keep.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u4FDD\u6E29'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleModel.bind(this) },
	                        React.createElement('img', {
	                            style: model != 7 && online == 1 ? { opacity: 1 } : { opacity: 0.3 },
	                            src: modelImgPath, alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            modelName
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleCancel.bind(this) },
	                        React.createElement('img', { style: this.isCanCancel() || online == 1 && model == 0 ? { opacity: 1 } : { opacity: 0.3 },
	                            src: "../static/img/btnlist/cancel.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u53D6\u6D88'
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
	    het.setTitle('电饭煲');
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

/***/ }
/******/ ]);