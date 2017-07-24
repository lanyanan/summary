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
	            selectModel: 0
	        };
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _this.startTime = _this.startTime.bind(_this);
	        _this.ispoll = _this.ispoll.bind(_this);
	        _this.iscanCanel = _this.iscanCanel.bind(_this);
	        _this.iswait = _this.iswait.bind(_this);
	        _this.isopenDevice = _this.isopenDevice.bind(_this);
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
	            this.timer = setTimeout(function () {
	                //console.log("handleMode selectModel="+selectModel);
	                if (selectModel != 0) {
	                    _Actions.Actions.swicthMode(selectModel);
	                }
	            }, 3000);
	        }
	    }, {
	        key: 'handleCoff',
	        value: function handleCoff() {
	            //处理开机事件 (1-关机，2-开机)
	            if (parseInt(this.state.online || 2) == 2) {
	                het.toast("设备已离线");return false;
	            }
	            var childoff = parseInt(this.state.cOnoff) || 1;
	            childoff == 1 ? childoff = 2 : childoff = 1;
	            _Actions.Actions.cOnoff(childoff);
	            if (this.timer != undefined) {
	                clearTimeout(this.timer);
	                //console.log("清楚计数器");
	            }
	        }
	    }, {
	        key: 'handleMode',
	        value: function handleMode() {
	            //出来模式选择
	            if (parseInt(this.state.online || 2) == 2) {
	                het.toast("设备已离线");return false;
	            }
	            if (parseInt(this.state.cOnoff) == 1 || parseInt(this.state.workStatus) != 0) return false;
	            var selectModel = this.state.selectModel || 0;
	            if (++selectModel > 3) selectModel = 0;

	            this.setState({ 'selectModel': selectModel });
	            if (this.timer != undefined) {
	                clearTimeout(this.timer);
	                //console.log("清楚计数器");
	            }
	            this.startTime(selectModel);
	        }
	    }, {
	        key: 'handleHotwind',
	        value: function handleHotwind() {
	            //热风选择
	            if (parseInt(this.state.online || 2) == 2) {
	                het.toast("设备已离线");return false;
	            }
	            if (parseInt(this.state.workStatus) == 0 || parseInt(this.state.cOnoff) == 1 || this.ispoll()) return false;
	            var cHotWindSw = parseInt(this.state.cHotWindSw) || 1;
	            cHotWindSw == 1 ? cHotWindSw = 2 : cHotWindSw = 1;
	            _Actions.Actions.swicthHotWind(cHotWindSw);
	        }
	    }, {
	        key: 'handlecanle',
	        value: function handlecanle() {
	            if (parseInt(this.state.online || 2) == 2) {
	                het.toast("设备已离线");return false;
	            }
	            if (!this.iscanCanel()) return false;
	            _Actions.Actions.cancelElm();
	        }
	    }, {
	        key: 'ispoll',
	        value: function ispoll() {
	            //是否是预约状态
	            var workStatus = this.state.workStatus || 0;
	            var setBookingTimeHour = this.state.setBookingTimeHour || 0; //预约的时间(小时)
	            var setBookingtimeMin = this.state.setBookingtimeMin || 0; //预约时间(分钟)
	            var ispoll = 0;
	            if (setBookingTimeHour == 0 && setBookingtimeMin == 0) {
	                ispoll = 0; //没有预约时间
	            } else {
	                ispoll = 1; //有预约时间
	            }
	            if (parseInt(this.state.cOnoff) == 2 && workStatus != 0 && ispoll == 1) {
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
	        key: 'render',
	        value: function render() {
	            var workarry = ['无模式', '上烤', '下烤', '上下烤', '发酵', '解冻', '消毒', '饼干', '蛋挞', '面包', '烤肉', '披萨', '烤薯'];
	            var cOnoff = parseInt(this.state.cOnoff) || 1;
	            var HotWindStatus = parseInt(this.state.HotWindStatus) || 1; //1 关 2开
	            var selectModel = this.state.selectModel || 0;
	            var workStatus = parseInt(this.state.workStatus) || 0;
	            var workTextArry = ['待机中', '已开机', '烘焙中', '预约中'];
	            var workText = this.iswait() ? workTextArry[0] : this.isopenDevice() ? workTextArry[1] : this.ispoll() ? workTextArry[3] : workTextArry[2];
	            var mode = parseInt(this.state.workStatus) || 0,
	                modeImgPath = '../static/img/btnlist/',
	                modeName = '无模式',
	                online = this.state.online || 2; //设备是否在线
	            console.log("mode=" + mode);
	            var imgModel = selectModel;
	            if (workStatus != 0) {
	                modeImgPath = modeImgPath + workStatus + '_1.png';
	                modeName = workarry[workStatus];
	            } else {
	                modeImgPath = modeImgPath + imgModel + '_1.png';modeName = workarry[imgModel];
	            }
	            //console.log("modeImgPath="+modeImgPath);
	            var hotText = HotWindStatus == 1 ? "" : " 热风";
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
	                    workStatus != 0 ? '模式：' + workarry[workStatus] + hotText : '模式：无'
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-1', onTouchEnd: this.handleCoff.bind(this) },
	                        React.createElement('img', { style: online == 2 ? { opacity: 0.3 } : { opacity: 1 }, src: cOnoff == 2 ? "../static/img/btnlist/1.png" : "../static/img/btnlist/1.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            cOnoff == 1 ? "开机" : "关机"
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-2', onTouchEnd: this.handleMode.bind(this) },
	                        React.createElement('img', { style: cOnoff == 2 ? workStatus == 0 && online == 1 ? { opacity: 1 } : { opacity: 0.3 } : { opacity: 0.3 }, src: modeImgPath, alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            modeName
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-3', onTouchEnd: this.handleHotwind.bind(this) },
	                        React.createElement('img', { style: this.iscanCanel() ? this.ispoll() ? { opacity: 0.3 } : { opacity: 1 } : { opacity: 0.3 }, src: HotWindStatus == 1 ? "../static/img/btnlist/hotoff.png" : "../static/img/btnlist/hoton.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u70ED\u98CE'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-4', onTouchEnd: this.handlecanle.bind(this) },
	                        React.createElement('img', { style: this.iscanCanel() ? { opacity: 1 } : { opacity: 0.3 }, src: "../static/img/btnlist/cancel.png", alt: '' }),
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
	    het.setTitle('荣事达烤箱');
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

/***/ }
/******/ ]);