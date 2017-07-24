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

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _WaterLines = __webpack_require__(6);

	var _WaterPlate = __webpack_require__(9);

	var _SettingAnchor = __webpack_require__(10);

	var _SettingPanelPP = __webpack_require__(13);

	var _SettingPanelCO = __webpack_require__(15);

	var _SettingPanelPP2 = __webpack_require__(16);

	var _SettingPanelCO2 = __webpack_require__(17);

	var _SettingPanelRO = __webpack_require__(18);

	var _Tips = __webpack_require__(19);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import {Funs} from '../../../common/src/fun.es6';
	//水质曲线父组件


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var appData = {};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        var _this$state;

	        _classCallCheck(this, App);

	        //构造器里的state组件并未加载完所以取不到最后的值
	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = (_this$state = {
	            ManualWash: '00',
	            washStart: 0,
	            slide: 2,
	            washOver: 0
	        }, _defineProperty(_this$state, 'ManualWash', '00'), _defineProperty(_this$state, 'networkavailable', 1), _defineProperty(_this$state, 'SourceWaterTdsValue', '00'), _defineProperty(_this$state, 'PureWaterTdsValue', '00'), _defineProperty(_this$state, 'MachineOperationState', '00'), _defineProperty(_this$state, 'PP1Life', '00'), _defineProperty(_this$state, 'CO1Life', '00'), _defineProperty(_this$state, 'PP2Life', '00'), _defineProperty(_this$state, 'ROLife', '00'), _defineProperty(_this$state, 'CO2Life', '00'), _defineProperty(_this$state, 'PP1LifeRemain', '00'), _defineProperty(_this$state, 'CO1LifeRemain', '00'), _defineProperty(_this$state, 'PP2LifeRemain', '00'), _defineProperty(_this$state, 'ROLifeRemain', '00'), _defineProperty(_this$state, 'CO2LifeRemain', '00'), _defineProperty(_this$state, 'PP1ClearControl', '00'), _defineProperty(_this$state, 'CO1ClearControl', '00'), _defineProperty(_this$state, 'PP2ClearControl', '00'), _defineProperty(_this$state, 'ROClearControl', '00'), _defineProperty(_this$state, 'CO2ClearControl', '00'), _defineProperty(_this$state, 'tipsMsg', ''), _defineProperty(_this$state, 'showTips', false), _this$state);

	        //轮询数据
	        _this.trainTimer = setInterval(function () {
	            _Actions.Actions.intervalData();
	        }, 5000);
	        _Actions.Actions.intervalData();
	        _this.listenStore(_Store.Store); // 监听Store
	        // 获取故障信息
	        _this.falutTimer = setInterval(function () {
	            _Actions.Actions.getFaultData();
	        }, 5000);

	        _this.showQualityList = _this.showQualityList.bind(_this);
	        _this.washDevice = _this.washDevice.bind(_this);
	        _this.errClickTips = _this.errClickTips.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            clearInterval(this.trainTimer);
	            clearInterval(this.falutTimer);
	        }
	    }, {
	        key: 'showQualityList',
	        value: function showQualityList(e) {
	            e.preventDefault();
	            var slide = this.state.slide === 2 ? 1 : 2;
	            _Actions.Actions.slide({ slide: slide });
	        }
	    }, {
	        key: 'errClickTips',
	        value: function errClickTips() {
	            this.setState({ showTips: false });
	        }
	    }, {
	        key: 'washDevice',
	        value: function washDevice(e) {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());
	                return false;
	            };
	            if (parseInt(this.state.MachineOperationState, 16) != 1) {
	                _Actions.Actions.washDevice({ 'ManualWash': '01', MachineOperationState: '01', slide: 2 });
	                this.setState({ MachineOperationState: '01', slide: 2 });
	            } else {
	                het.toast('设备冲洗中...');
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var washData = {
	                washStart: this.state.washStart,
	                slide: this.state.slide,
	                washOver: this.state.washOver,
	                online: this.state.online,
	                networkavailable: this.state.networkavailable,
	                ManualWash: parseInt(this.state.ManualWash, 16),
	                SourceWaterTdsValue: parseInt(this.state.SourceWaterTdsValue, 16),
	                PureWaterTdsValue: parseInt(this.state.PureWaterTdsValue, 16),
	                MachineOperationState: parseInt(this.state.MachineOperationState, 16)
	            };
	            var settingData = {
	                slide: this.state.slide,
	                SourceWaterTdsValue: parseInt(this.state.SourceWaterTdsValue, 16),
	                PureWaterTdsValue: parseInt(this.state.PureWaterTdsValue, 16),
	                PP1Life: parseInt(this.state.PP1Life, 16),
	                CO1Life: parseInt(this.state.CO1Life, 16),
	                PP2Life: parseInt(this.state.PP2Life, 16),
	                ROLife: parseInt(this.state.ROLife, 16),
	                CO2Life: parseInt(this.state.CO2Life, 16),
	                PP1LifeRemain: parseInt(this.state.PP1LifeRemain, 16),
	                CO1LifeRemain: parseInt(this.state.CO1LifeRemain, 16),
	                PP2LifeRemain: parseInt(this.state.PP2LifeRemain, 16),
	                ROLifeRemain: parseInt(this.state.ROLifeRemain, 16),
	                CO2LifeRemain: parseInt(this.state.CO2LifeRemain, 16)
	            };
	            //console.log('状态---',this.state.MachineOperationState)
	            //导航栏判断安卓73，苹果64
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'app-body ios' : 'app-body android';
	            return React.createElement(
	                'main',
	                { className: navigation },
	                React.createElement(_WaterPlate.WaterPlate, { washDevice: this.washDevice, washData: washData, MachineOperationState: this.state.MachineOperationState }),
	                React.createElement(_SettingAnchor.SettingAnchor, { showQualityList: this.showQualityList, settingData: settingData }),
	                React.createElement('div', { id: 'mytoast' }),
	                React.createElement(_Tips.Tips, { msg: this.state.tipsMsg, btn1: '', btn2: '\u6211\u77E5\u9053\u4E86', show: this.state.showTips, errCallback: this.errClickTips })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	het.domReady(function () {

	    het.config({
	        appId: '30590',
	        appSecret: '98889238ed6e441aaf9b0691b017695f'
	    });

	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App }),
	        React.createElement(Route, { path: '/waterLines', component: _WaterLines.WaterLines }),
	        React.createElement(Route, { path: '/SettingPanelPP1', component: _SettingPanelPP.SettingPanelPP1 }),
	        React.createElement(Route, { path: '/SettingPanelCO1', component: _SettingPanelCO.SettingPanelCO1 }),
	        React.createElement(Route, { path: '/SettingPanelPP2', component: _SettingPanelPP2.SettingPanelPP2 }),
	        React.createElement(Route, { path: '/SettingPanelCO2', component: _SettingPanelCO2.SettingPanelCO2 }),
	        React.createElement(Route, { path: '/SettingPanelRO', component: _SettingPanelRO.SettingPanelRO })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(3);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 3 */
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
/* 4 */
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
	'back', //回退重新请求数据
	'slide', 'washDevice', 'resetFilter', //重置滤芯
	'waterLines', 'postData', //post请求数据
	'intervalData', //轮询获取运行数据
	'getFaultData' // 获取故障数据,
	]);

/***/ },
/* 5 */
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

	var _Actions = __webpack_require__(4);

	var AppData = {
	    online: 1,
	    networkavailable: 1
	};

	var isFault = function isFault() {
	    if (AppData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (AppData.online == 2) {
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	// 数据过滤计时器
	var dataFilterTimers = {
	    MachineOperationState: 0
	};

	var domain = 'https://test.api.clife.cn';
	var postCtrlUrl = domain + '/v1/device/config/set'; // 下发设备控制数据接口 -- 临时定义
	var getRunUrl = domain + '/v1/device/data/get'; // 获取设备运行数据接口 -- 临时定义
	var getWaterDataUrl = domain + '/v1/app/customization/waterPurifier/stat/getStatRunData';
	var getFaultPath = domain + '/v1/device/data/getErrorData';
	var deviceId = het.getDeviceId();

	/**
	 * json 转化为Querystring
	 */
	var jsonToQueryString = function jsonToQueryString(json) {
	    return Object.keys(json).map(function (key) {
	        return encodeURIComponent(key) + '=' + (json[key] != undefined ? encodeURIComponent(json[key]) : '');
	    }).join('&');
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
	        //console.log('data',data);
	        //设备id
	        if (data.deviceId) AppData.deviceId = data.deviceId;
	        //断网离线
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.online) AppData.online = data.online;
	        //回退数据重渲缓存
	        if (data.MachineOperationState) AppData.MachineOperationState = data.MachineOperationState;
	        if (data.PureWaterTdsValue) AppData.PureWaterTdsValue = data.PureWaterTdsValue;
	        if (data.SourceWaterTdsValue) AppData.SourceWaterTdsValue = data.SourceWaterTdsValue;
	        if (data.PP1ClearControl) AppData.PP1ClearControl = data.PP1ClearControl;
	        if (data.PP2ClearControl) AppData.PP2ClearControl = data.PP2ClearControl;
	        if (data.CO1ClearControl) AppData.CO1ClearControl = data.CO1ClearControl;
	        if (data.CO2ClearControl) AppData.CO2ClearControl = data.CO2ClearControl;
	        if (data.ROClearControl) AppData.ROClearControl = data.ROClearControl;
	        if (data.PP1Life) AppData.PP1Life = data.PP1Life;
	        if (data.CO1Life) AppData.CO1Life = data.CO1Life;
	        if (data.PP2Life) AppData.PP2Life = data.PP2Life;
	        if (data.ROLife) AppData.ROLife = data.ROLife;
	        if (data.PP2Life) AppData.PP2Life = data.PP2Life;
	        if (data.CO2Life) AppData.CO2Life = data.CO2Life;
	        if (data.PP1LifeRemain) AppData.PP1LifeRemain = data.PP1LifeRemain;
	        if (data.CO1LifeRemain) AppData.CO1LifeRemain = data.CO1LifeRemain;
	        if (data.ROLifeRemain) AppData.ROLifeRemain = data.ROLifeRemain;
	        if (data.PP2LifeRemain) AppData.PP2LifeRemain = data.PP2LifeRemain;
	        if (data.CO2LifeRemain) AppData.CO2LifeRemain = data.CO2LifeRemain;

	        data.renderWaterline = 2;
	        this.trigger(data);
	    },
	    onBack: function onBack() {
	        this.trigger(AppData);
	    },
	    onSlide: function onSlide(data) {
	        this.trigger(data);
	    },
	    onWaterLines: function onWaterLines(type) {
	        if (isFault()) {
	            het.toast(isFault());
	            return false;
	        };
	        var me = this;
	        var sucCallBack = function sucCallBack(successParse) {
	            if (successParse.code == 0) {
	                me.trigger({
	                    type: type,
	                    codes: successParse.code,
	                    renderWaterline: 1, //是否渲染开关，1开2关，方便调试打印，其实应该为true/fasle
	                    waterlines: successParse.data
	                });
	            }
	        };

	        var fnGetParams = function fnGetParams(token) {
	            return {
	                "accessToken": token,
	                "deviceId": deviceId,
	                "type": parseInt(type) + 1,
	                "appId": '30590',
	                "timestamp": +new Date()
	            };
	        };
	        het.getToken(function (token) {
	            var params = fnGetParams(token);
	            $.ajax({
	                'type': 'POST',
	                'url': getWaterDataUrl,
	                'data': params,
	                'dataType': 'json',
	                'success': function success(response) {
	                    response.code === 0 && sucCallBack(response);
	                },
	                'error': function error(xhr, type) {
	                    het.toast('请求失败~');
	                }
	            });
	        }, function () {
	            het.toast('请求失败~');
	        });
	    },
	    onWashDevice: function onWashDevice(data) {
	        if (isFault()) {
	            het.toast(isFault());
	            return false;
	        };
	        var me = this;
	        me.trigger(data);
	        setDataTimer('MachineOperationState');
	        data.updateFlag = het.hexUpFlag(10, 1, 6);
	        this.onPostData(data);
	    },
	    onResetFilter: function onResetFilter(data) {
	        if (isFault()) {
	            het.toast(isFault());
	            return false;
	        };
	        var idx = data.updateFlagIdx;
	        data.updateFlag = het.hexUpFlag(idx, 1, 6);
	        delete data.updateFlagIdx;
	        this.onPostData(data);
	        this.trigger(data);
	    },
	    onIntervalData: function onIntervalData() {
	        var _this = this;
	        het.get(getRunUrl, '', function (response) {
	            var result = JSON.parse(response);
	            result.code === 0 && _this.onRepaint(result.data);
	        });
	    },
	    onPostData: function onPostData(appData) {
	        het.post(postCtrlUrl, appData, function (response) {
	            var result = JSON.parse(response);
	            if (result.code === 0) {
	                het.toast('命令发送成功', '1');
	            } else {
	                het.toast(result.msg);
	            }
	        });
	    },
	    onGetFaultData: function onGetFaultData() {
	        var _this = this;
	        var fnGetParams = function fnGetParams(token) {
	            return {
	                "accessToken": token,
	                "deviceId": deviceId,
	                "appId": '30590',
	                "timestamp": +new Date()
	            };
	        };
	        het.getToken(function (token) {
	            var params = fnGetParams(token);
	            $.ajax({
	                type: 'GET',
	                url: getFaultPath,
	                data: params,
	                dataType: 'json',
	                success: function success(response) {
	                    if (response.code === 0) {
	                        if (response.data.K1State == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: 'K1电池阀故障' });
	                        }
	                        if (response.data.K2State == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: 'K2电池阀故障' });
	                        }
	                        if (response.data.BoosterPumpState == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: '增压泵故障' });
	                        }

	                        if (response.data.NTCState == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: 'NTC故障' });
	                        }
	                        if (response.data.FlowMeter1State == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: '流量计1故障' });
	                        }
	                        if (response.data.FlowMeter2State == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: '流量计2故障' });
	                        }
	                        if (response.data.MakeWaterOverTime == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: '制水超时故障' });
	                        }
	                        if (response.data.LackWater == '01') {
	                            _this.trigger({ showTips: true, tipsMsg: '缺水故障' });
	                        }
	                    }
	                }
	            });
	        });
	    }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WaterLines = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _EchartsBar = __webpack_require__(7);

	var _EchartsLiner = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WaterLines = exports.WaterLines = function (_BaseComponent) {
	    _inherits(WaterLines, _BaseComponent);

	    function WaterLines(props) {
	        _classCallCheck(this, WaterLines);

	        var _this = _possibleConstructorReturn(this, (WaterLines.__proto__ || Object.getPrototypeOf(WaterLines)).call(this, props));

	        _this.state = {
	            codes: _this.state.codes,
	            waterlines: [],
	            count: 1,
	            type: 0
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.changeType = _this.changeType.bind(_this);
	        return _this;
	    }

	    _createClass(WaterLines, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.waterLines(0);
	        }
	    }, {
	        key: 'changeType',
	        value: function changeType(e) {
	            if (e.currentTarget.getAttribute('class') == 'flex-cell active') return false;
	            var idx = e.currentTarget.getAttribute('data-idx');
	            _Actions.Actions.waterLines(idx);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'ios' : 'android';
	            var changeCycleArray = ['日', '月', '年'];
	            var idx = this.state.type != undefined ? this.state.type : 0;
	            //let waterlines = this.state.waterlines? this.state.waterlines:[];
	            return React.createElement(
	                'main',
	                null,
	                React.createElement(
	                    'section',
	                    { className: "charts-area " + navigation },
	                    React.createElement(
	                        'div',
	                        { className: 'liner-box' },
	                        React.createElement('i', { id: 'liner-title' }),
	                        React.createElement(_EchartsLiner.EchartsLiner, { waterlines: this.state.waterlines, renderWaterline: this.state.renderWaterline })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'bar-box' },
	                        React.createElement(_EchartsBar.EchartsBar, { waterlines: this.state.waterlines, renderWaterline: this.state.renderWaterline }),
	                        React.createElement('i', { id: 'bar-title' }),
	                        React.createElement(
	                            'div',
	                            { id: 'change-cycle', className: 'flex change-type' },
	                            changeCycleArray.map(function (element, index) {
	                                return React.createElement(
	                                    'span',
	                                    { key: index, className: 'flex-cell' + (index == idx ? ' active' : ''), 'data-idx': index, onTouchStart: _this2.changeType },
	                                    element
	                                );
	                            }.bind(this))
	                        )
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return WaterLines;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 图表组件
	 * @prop {lineOption}   图表参数
	 * @prop {waterlines}   图表参数数组汇总对象
	 *
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var EchartsBar = exports.EchartsBar = React.createClass({
	    displayName: "EchartsBar",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement("div", { id: "bar", ref: "bar" });
	    },
	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        var _this = this;

	        //console.log('--------',nextProps.renderWaterline,nextState.renderWaterline);
	        if (nextProps.renderWaterline == 2) {
	            return false;
	        }
	        setTimeout(function () {
	            if (nextProps !== '') {
	                (function () {
	                    var data = nextProps.waterlines;
	                    var timeDesc = [],
	                        pureWaterTotal = [],
	                        sourceWaterTotal = [],
	                        sourceWaterTdsValue = [],
	                        pureWaterTdsValue = [];
	                    data.map(function (item, i) {
	                        return timeDesc[i] = item.timeDesc.replace(/\./, "-"), pureWaterTdsValue[i] = item.pureWaterTdsValue, sourceWaterTdsValue[i] = item.sourceWaterTdsValue, pureWaterTotal[i] = item.pureWaterTotal, sourceWaterTotal[i] = item.sourceWaterTotal;
	                    });
	                    var chartDom = ReactDOM.findDOMNode(_this.refs.bar);
	                    var barChart = echarts.init(chartDom);
	                    //图表配置项
	                    var barOption = {
	                        title: {
	                            text: '净水量(L)',
	                            textStyle: {
	                                color: "#949494",
	                                fontSize: 16
	                            },
	                            icon: "image:/../../static/img/linetitle.png",
	                            padding: [10, 0, 7, 55]
	                        },
	                        tooltip: {
	                            trigger: 'axis',
	                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
	                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	                            }
	                        },
	                        legend: {
	                            data: ['净水', '自来水'],
	                            right: 10,
	                            top: 45
	                        },
	                        grid: {
	                            left: '0%',
	                            bottom: '3%',
	                            containLabel: true
	                        },
	                        xAxis: {
	                            type: 'category',
	                            data: timeDesc,
	                            axisLine: {
	                                show: false
	                            },
	                            axisTick: {
	                                show: false
	                            }
	                        },
	                        yAxis: {
	                            type: 'value',
	                            axisTick: {
	                                show: false
	                            },
	                            axisLine: {
	                                show: false
	                            },
	                            splitLine: {
	                                show: false
	                            },
	                            axisLabel: {
	                                show: false
	                            }
	                        },
	                        series: [{
	                            name: '自来水',
	                            type: 'bar',
	                            stack: '总量',
	                            label: {
	                                normal: {
	                                    show: true,
	                                    position: 'insideTop',
	                                    formatter: function formatter(a, b, c) {
	                                        //格式化，为0时，不显示数字
	                                        if (a.value == 0) {
	                                            return '';
	                                        }
	                                        if (a.value >= 10000) {
	                                            a.value = parseInt(a.value / 10000) + '万';
	                                            return a.value;
	                                        }
	                                    }
	                                }
	                            },
	                            itemStyle: {
	                                normal: {
	                                    color: '#788a9a',
	                                    barBorderRadius: [0, 0, 3, 3]
	                                }
	                            },
	                            data: sourceWaterTotal
	                        }, {
	                            name: '净水',
	                            type: 'bar',
	                            stack: '总量',
	                            label: {
	                                normal: {
	                                    show: true,
	                                    position: 'insideTop',
	                                    formatter: function formatter(a, b, c) {
	                                        if (a.value == 0) {
	                                            //格式化，为0时，不显示数字
	                                            return '';
	                                        }
	                                        if (a.value >= 10000) {
	                                            a.value = parseInt(a.value / 10000) + '万';
	                                            return a.value;
	                                        }
	                                    }
	                                }
	                            },
	                            itemStyle: {
	                                normal: {
	                                    color: '#5ed6ed',
	                                    barBorderRadius: [3, 3, 0, 0]
	                                }
	                            },
	                            data: pureWaterTotal
	                        }]
	                    };
	                    barChart.setOption(barOption);
	                })();
	            }
	        }, 3000);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {}
	});

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * 图表组件
	 * @prop {lineOption}   图表参数
	 * @prop {waterlines}   图表参数数组汇总对象
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var EchartsLiner = exports.EchartsLiner = React.createClass({
	    displayName: "EchartsLiner",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    render: function render() {
	        return React.createElement("div", { id: "liner", ref: "chart" });
	    },
	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        var _this = this;

	        if (nextProps.renderWaterline == 2) {
	            return false;
	        }
	        setTimeout(function () {
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            if (nextProps) {
	                (function () {
	                    var data = nextProps.waterlines;
	                    var timeDesc = [],
	                        pureWaterTotal = [],
	                        sourceWaterTotal = [],
	                        sourceWaterTdsValue = [],
	                        pureWaterTdsValue = [];
	                    data.map(function (item, i) {
	                        return timeDesc[i] = item.timeDesc.replace(/\./, "-"), pureWaterTdsValue[i] = item.pureWaterTdsValue, sourceWaterTdsValue[i] = item.sourceWaterTdsValue, pureWaterTotal[i] = item.pureWaterTotal, sourceWaterTotal[i] = item.sourceWaterTotal;
	                    });
	                    //console.log('--------------------1-',timeDesc);
	                    //console.log('--------------------2-',pureWaterTdsValue);
	                    //console.log('--------------------3-',sourceWaterTdsValue);
	                    //console.log('--------------------4-',pureWaterTotal);
	                    //console.log('--------------------5-',sourceWaterTotal);
	                    var chartDom = ReactDOM.findDOMNode(_this.refs.chart);
	                    var lineChart = echarts.init(chartDom);
	                    //图标配置项
	                    var lineOption = {
	                        title: {
	                            text: '水质TDS值(TDS)',
	                            textStyle: {
	                                color: "#949494",
	                                fontSize: 16
	                            },
	                            //icon: 'image://../static/img/i-circle-blue-big.png',
	                            padding: [10, 0, 7, 55]
	                        },
	                        tooltip: {
	                            trigger: 'axis'
	                        },
	                        legend: {
	                            data: [{
	                                name: '净水',
	                                textStyle: {
	                                    fontSize: 12
	                                },
	                                icon: 'image://../static/img/i-circle-blue-big.png'
	                            }, {
	                                name: '自来水',
	                                textStyle: {
	                                    fontSize: 12
	                                },
	                                icon: 'image://../static/img/i-circle-gray-big.png'
	                            }],
	                            right: 5,
	                            top: 8
	                        },
	                        grid: {
	                            left: '0%',
	                            bottom: '3%',
	                            containLabel: true
	                        },
	                        xAxis: {
	                            data: timeDesc,
	                            axisLine: {
	                                show: false
	                            },
	                            axisTick: {
	                                show: false
	                            },
	                            type: 'category',
	                            boundaryGap: false
	                        },
	                        yAxis: {
	                            max: 2000,
	                            axisTick: {
	                                show: false
	                            },
	                            axisLine: {
	                                show: false
	                            },
	                            splitLine: {
	                                show: false
	                            },
	                            axisLabel: {
	                                show: false
	                            }
	                        },
	                        series: [{
	                            name: '净水',
	                            type: 'line',
	                            stack: '总量',
	                            symbol: isIOS ? 'image://../static/img/i-circle-blue.png' : 'emptyCircle', //echarts3 'emptyCircle' 在ios下有bug，用图标展示
	                            symbolSize: isIOS ? 10 : 10,
	                            data: pureWaterTdsValue,
	                            showAllSymbol: true,
	                            label: {
	                                normal: {
	                                    show: true,
	                                    formatter: function formatter(a, b, c) {
	                                        return c;
	                                    },
	                                    textStyle: {
	                                        color: "#788a9a",
	                                        fontSize: 12
	                                    },
	                                    zlevel: 99999
	                                }
	                            },
	                            itemStyle: {
	                                normal: {
	                                    borderColor: "#788a9a",
	                                    color: "#b2b2b2"
	                                }
	                            },
	                            markLine: {
	                                silent: true
	                            },
	                            markArea: {
	                                label: {
	                                    normal: {
	                                        show: true,
	                                        //formatter: 'tds',
	                                        formatter: function formatter(a, b, c) {
	                                            return c;
	                                        },
	                                        textStyle: {
	                                            color: "#788a9a",
	                                            fontSize: 12
	                                        }
	                                    }
	                                }
	                            },
	                            legendHoverLink: true,
	                            smooth: true,
	                            clipOverflow: false,
	                            zlevel: 400
	                        }, {
	                            name: '自来水',
	                            type: 'line',
	                            stack: '总量',
	                            data: sourceWaterTdsValue,
	                            symbol: isIOS ? 'image://../static/img/i-circle-gray.png' : 'emptyCircle', //echarts3 'emptyCircle' 在ios下有bug，用图标展示
	                            symbolSize: isIOS ? 10 : 10,
	                            showAllSymbol: true,
	                            label: {
	                                normal: {
	                                    show: true,
	                                    formatter: function formatter(a, b, c) {
	                                        return c;
	                                    },
	                                    textStyle: {
	                                        color: "#67d9ee",
	                                        fontSize: 12
	                                    }
	                                }
	                            },
	                            itemStyle: {
	                                normal: {
	                                    borderColor: "#5ed6ed",
	                                    color: "#b2b2b2"
	                                }
	                            },
	                            markLine: {
	                                silent: true
	                            },
	                            legendHoverLink: true,
	                            smooth: true,
	                            clipOverflow: false
	                        }]
	                    };
	                    lineChart.setOption(lineOption);
	                })();
	            }
	        }, 3000);
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.WaterPlate = undefined;

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;

	var appData = {};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	// 接收app推送数据
	var WaterPlate = exports.WaterPlate = React.createClass({
	    displayName: 'WaterPlate',

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(next) {
	        //console.log('-------isClicked当前，之前,',next.washData.isClicked,next.MachineOperationState,this.props.MachineOperationState,next.washData.online,next.washData.networkavailable);
	        if (next.MachineOperationState == 1 && appData.washStart != 1 && next.washData.online !== 2 && next.washData.networkavailable !== 2) {
	            //console.log('执行定时器');
	            appData.washStart = 1;
	            appData.timerA = setInterval(function () {
	                if (document.getElementsByClassName("eleName").length > 0) {
	                    document.getElementsByClassName("eleName")[0].className = "washContent-i";
	                }
	            }.bind(this), 30000 / 74);
	        };
	        //washStart字段用于防止定时器重复触发，只有当washStart=0时才能触发开启动画定时器
	        if (appData.timerA && (next.washData.MachineOperationState != 1 || next.washData.online == 2 || next.washData.networkavailable == 2)) {
	            appData.washStart = 0;
	            clearInterval(appData.timerA);
	            $(".washContent-i").attr('class', 'eleName');
	            //console.log('如果有定时器，清除定时器');
	        }
	    },
	    render: function render() {
	        var washData = this.props.washData;
	        var SourceWaterTdsValue = washData.SourceWaterTdsValue;
	        var PureWaterTdsValue = washData.PureWaterTdsValue;
	        // console.log('---PureWaterTdsValue--',PureWaterTdsValue)
	        var quality = function quality(v) {
	            return isNaN(parseFloat(v)) == false && (v >= 1000 && '水质极差' || v >= 500 && '水质较差' || v >= 200 && '有较多杂质' || v >= 100 && '有些许杂质' || v >= 50 && '有少量杂质' || v >= 0 && '水质极佳') || '加载中...';
	        };
	        var WaterQuality = quality(PureWaterTdsValue);
	        var item = [];
	        for (var i = 0; i <= 74; i++) {
	            item[i] = i * 5;
	        }
	        var washStatus = washData.MachineOperationState;
	        var washIndex = washData.networkavailable == 2 || washData.online == 2 || washStatus != 1 || washData.washOver == 1 ? 'wash-index' : 'hidden';
	        var washPlate = washData.online == 2 || washData.networkavailable == 2 || washStatus != 1 || washData.washOver == 1 ? 'hidden' : 'wash-plate';

	        var toggleMinify = washData.slide == 2 ? 'index-top normal' : 'index-top minify';
	        var washCircle = 'eleName';
	        var washSatusTxt = ['待机', '设备冲洗中', '制水', '水满'][washStatus];
	        return React.createElement(
	            'section',
	            { className: toggleMinify, id: 'waterPlate' },
	            React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'div',
	                    { className: washIndex, id: 'washIndex' },
	                    React.createElement(
	                        'p',
	                        { className: 'top-title' },
	                        '\u81EA\u6765\u6C34\u6C34\u8D28\uFF1A',
	                        SourceWaterTdsValue,
	                        'TDS'
	                    ),
	                    React.createElement(
	                        Link,
	                        { to: 'waterLines', className: 'flex flex-column top-plate' },
	                        React.createElement(
	                            'figure',
	                            { className: 'flex-cell top-plate-a' },
	                            'TDS'
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'flex-cell top-plate-b' },
	                            PureWaterTdsValue
	                        ),
	                        React.createElement(
	                            'figure',
	                            { className: 'flex-cell top-plate-c' },
	                            React.createElement(
	                                'span',
	                                null,
	                                WaterQuality
	                            )
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'figure',
	                { className: washPlate, id: 'washPlate' },
	                React.createElement(
	                    'div',
	                    { className: 'washContent', id: 'washContent' },
	                    React.createElement(
	                        'p',
	                        null,
	                        washSatusTxt
	                    ),
	                    item.map(function (o, index) {
	                        return React.createElement('i', { key: index, className: washCircle, style: { '-webkitTransform': 'rotate(' + o + 'deg)', transform: 'rotate(' + o + 'deg)' } });
	                    }.bind(this))
	                )
	            ),
	            React.createElement(
	                'span',
	                { className: 'wash', 'data-wash': washStatus, onClick: this.props.washDevice },
	                '\u51B2\u6D17'
	            )
	        );
	    }
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingAnchor = undefined;

	var _fun = __webpack_require__(11);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _ReactRouter = ReactRouter,
	    Link = _ReactRouter.Link;
	var SettingAnchor = exports.SettingAnchor = React.createClass({
	    displayName: 'SettingAnchor',
	    render: function render() {
	        var toFixed = function toFixed(s) {
	            var changenum = (parseInt(this * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
	            var index = changenum.indexOf(".");
	            if (index < 0 && s > 0) {
	                changenum = changenum + ".";
	                for (var i = 0; i < s; i++) {
	                    changenum = changenum + "0";
	                }
	            } else {
	                index = changenum.length - index;
	                for (var _i = 0; _i < s - index + 1; _i++) {
	                    changenum = changenum + "0";
	                }
	            }
	            return changenum;
	        };
	        var computePercent = function computePercent(remain, all) {
	            var percent = remain / all * 100;
	            if (remain == 0 || remain > all) return percent = 0;
	            if (percent < 1) {
	                return percent = 1;
	            }
	            if (percent > 99.5 && percent < 100) {
	                return percent = 99;
	            } else {
	                return percent = (remain / all * 100).toFixed(0);
	            }
	        };
	        var settingData = this.props.settingData;
	        var SourceWaterTdsValue = settingData.SourceWaterTdsValue,
	            PureWaterTdsValue = settingData.PureWaterTdsValue;
	        // console.log('-----------自来水，纯水',SourceWaterTdsValue,PureWaterTdsValue)
	        //(1 - 纯水TDS值/ 源水TDS值) * 100  水质排名
	        //纯水，源水其中都不能为0，排名计算纯水值越大，水质越好，但需要纯水值小于源水值，否则出现负数，排名计算无效
	        var WaterRanking = ((1 - PureWaterTdsValue / SourceWaterTdsValue) * 100).toFixed(0);
	        if (SourceWaterTdsValue == 0 || SourceWaterTdsValue < PureWaterTdsValue) WaterRanking = 0;
	        if ((1 - PureWaterTdsValue / SourceWaterTdsValue) * 100 < 1) WaterRanking = 1;
	        //PP1滤芯
	        var PP1Life = settingData.PP1Life;
	        var PP1LifeRemain = settingData.PP1LifeRemain;
	        var PP1LifePercent = computePercent(PP1LifeRemain, PP1Life);
	        //CO1滤芯
	        var CO1Life = settingData.CO1Life;
	        var CO1LifeRemain = settingData.CO1LifeRemain;
	        var CO1LifePercent = computePercent(CO1LifeRemain, CO1Life);
	        //PP2滤芯
	        var PP2Life = settingData.PP2Life;
	        var PP2LifeRemain = settingData.PP2LifeRemain;
	        var PP2LifePercent = computePercent(PP2LifeRemain, PP2Life);
	        //RO滤芯
	        var ROLife = settingData.ROLife;
	        var ROLifeRemain = settingData.ROLifeRemain;
	        var ROLifePercent = computePercent(ROLifeRemain, ROLife);
	        //CO2滤芯
	        var CO2Life = settingData.CO2Life;
	        var CO2LifeRemain = settingData.CO2LifeRemain;
	        var CO2LifePercent = computePercent(CO2LifeRemain, CO2Life);

	        var slideClass = settingData.slide == 2 ? 'index-slide slideDown' : 'index-slide slideUp';
	        //console.log('---------settingData---',settingData);
	        return React.createElement(
	            'section',
	            { className: slideClass },
	            React.createElement(
	                'figure',
	                { className: 'slide-title', id: 'slide', style: { marginBottom: '0' } },
	                React.createElement(
	                    'p',
	                    { className: 'slide-rank' },
	                    '\u60A8\u7684\u6C34\u8D28\u6218\u80DC\u4E86\u5168\u56FD',
	                    React.createElement(
	                        'span',
	                        { className: 'cut' },
	                        WaterRanking
	                    ),
	                    '%\u7684\u5730\u533A'
	                ),
	                React.createElement('span', { className: 'slide-arrow', onTouchStart: this.props.showQualityList })
	            ),
	            React.createElement(
	                'figure',
	                { className: 'slide-inner', id: 'slider' },
	                React.createElement(
	                    Link,
	                    { to: 'SettingPanelPP1', className: 'flex slide-item' },
	                    React.createElement(
	                        'span',
	                        { className: 'number' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            '1'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'txt' },
	                        React.createElement(
	                            'div',
	                            null,
	                            'PP\u68C9\u6EE4\u82AF'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                            PP1LifeRemain,
	                            '\u5929'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'per' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            PP1Life
	                        ),
	                        React.createElement(
	                            'i',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'arrow' },
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { to: 'SettingPanelCO1', className: 'flex slide-item' },
	                    React.createElement(
	                        'span',
	                        { className: 'number' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            '2'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'txt' },
	                        React.createElement(
	                            'div',
	                            null,
	                            '\u9897\u7C92\u6D3B\u6027\u70AD\u6EE4\u82AF'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                            CO1LifeRemain,
	                            '\u5929'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'per' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            CO1Life
	                        ),
	                        React.createElement(
	                            'i',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'arrow' },
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { to: 'SettingPanelPP2', className: 'flex slide-item' },
	                    React.createElement(
	                        'span',
	                        { className: 'number' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            '3'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'txt' },
	                        React.createElement(
	                            'div',
	                            null,
	                            '\u6DF1\u5EA6\u51C0\u5316PP\u68C9\u6EE4\u82AF'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                            PP2LifeRemain,
	                            '\u5929'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'per' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            PP2Life
	                        ),
	                        React.createElement(
	                            'i',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'arrow' },
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { to: 'SettingPanelCO2', className: 'flex slide-item', style: { background: '#fff' } },
	                    React.createElement(
	                        'span',
	                        { className: 'number' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            '4'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'txt' },
	                        React.createElement(
	                            'div',
	                            null,
	                            '\u540E\u7F6E\u6D3B\u6027\u70AD\u6EE4\u82AF'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                            CO2LifeRemain,
	                            '\u5929'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'per' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            CO2Life
	                        ),
	                        React.createElement(
	                            'i',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'arrow' },
	                        React.createElement('i', null)
	                    )
	                ),
	                React.createElement(
	                    Link,
	                    { to: 'SettingPanelRO', className: 'flex slide-item', style: { background: '#fff' } },
	                    React.createElement(
	                        'span',
	                        { className: 'number' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            '5'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'txt' },
	                        React.createElement(
	                            'div',
	                            null,
	                            'RO\u53CD\u6E17\u900F\u819C'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                            ROLifeRemain,
	                            '\u5929'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'per' },
	                        React.createElement(
	                            'strong',
	                            null,
	                            ROLife
	                        ),
	                        React.createElement(
	                            'i',
	                            null,
	                            '%'
	                        )
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'arrow' },
	                        React.createElement('i', null)
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(12);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	/**
	 * 重置滤芯
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingPanelPP1 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _InnerPage = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var appData = {};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	var SettingPanelPP1 = exports.SettingPanelPP1 = function (_BaseComponent) {
	    _inherits(SettingPanelPP1, _BaseComponent);

	    function SettingPanelPP1(props) {
	        _classCallCheck(this, SettingPanelPP1);

	        var _this = _possibleConstructorReturn(this, (SettingPanelPP1.__proto__ || Object.getPrototypeOf(SettingPanelPP1)).call(this, props));

	        _this.state = {
	            ManualWash: '00',
	            slide: 2,
	            washOver: 0,
	            SourceWaterTdsValue: '00',
	            PureWaterTdsValue: '00', //这里组件并未加载完所以取不到最后的值
	            MachineOperationState: '00',
	            PP1Life: '00',
	            CO1Life: '00',
	            PP2Life: '00',
	            ROLife: '00',
	            CO2Life: '00',
	            PP1LifeRemain: '00',
	            CO1LifeRemain: '00',
	            PP2LifeRemain: '00',
	            ROLifeRemain: '00',
	            CO2LifeRemain: '00',

	            PP1ClearControl: '00',
	            CO1ClearControl: '00',
	            PP2ClearControl: '00',
	            ROClearControl: '00',
	            CO2ClearControl: '00'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.back();
	        _this.resetFilter = _this.resetFilter.bind(_this);
	        _this.goShoping = _this.goShoping.bind(_this);
	        return _this;
	    }

	    _createClass(SettingPanelPP1, [{
	        key: 'resetFilter',
	        value: function resetFilter(e) {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            var idx = e.currentTarget.getAttribute('data-idx');
	            var data = { 'PP1ClearControl': '01', 'updateFlagIdx': idx };
	            _Actions.Actions.resetFilter(data);
	        }
	    }, {
	        key: 'goShoping',
	        value: function goShoping() {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            //PP棉滤芯~
	            het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87074');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //PP1滤芯 PP1Life = 剩余时间百分比;
	            var PP1Life = parseInt(this.state.PP1Life, 16);
	            var PP1LifeRemain = parseInt(this.state.PP1LifeRemain, 16);
	            //let PP1LifePercent= computePercent(PP1LifeRemain,PP1Life);

	            //圆形进度条
	            var percent = PP1Life <= 100 ? PP1Life : 100;
	            var rightCircle = -135;
	            var leftCircle = -135;
	            if (percent <= 50) {
	                //初始度数减去135度，0对应-135
	                rightCircle = percent * 360 / 100 - 135;
	                //console.log('percent----R--------',percent);
	            } else {
	                rightCircle = 45;
	                leftCircle = (percent - 50) * 360 / 100 - 135;
	                //console.log('percent-----L-------',percent);
	            }
	            //导航栏判断安卓73，苹果64
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'ios' : 'android';
	            var buyHref = isIOS ? 'http://www.clife.cn' : 'http://www.clife.cn';
	            //<InnerPage percent={percent} rightCircle={rightCircle} leftCircle={leftCircle} />
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: navigation },
	                    React.createElement(
	                        'div',
	                        { className: 'setting-percent' },
	                        React.createElement(
	                            'div',
	                            { className: 'circle-progress-wrapper' },
	                            parseInt(percent),
	                            '%',
	                            React.createElement(
	                                'div',
	                                { className: 'wrapper right' },
	                                React.createElement('div', { className: 'circle-progress right-circle', style: { 'WebkitTransform': 'rotate(' + rightCircle + 'deg)' } })
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'wrapper left' },
	                                React.createElement('div', { className: 'circle-progress left-circle', style: { 'WebkitTransform': 'rotate(' + leftCircle + 'deg)' } })
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'setting-inner' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                            React.createElement(
	                                'b',
	                                null,
	                                PP1LifeRemain
	                            ),
	                            '\u5929'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6EE4\u82AF\u8BF4\u660E\uFF1A\u6EE4\u9664\u6C34\u4E2D',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u94C1\u5C51'
	                            ),
	                            '\u3001',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u6DE4\u6CE5'
	                            ),
	                            '\u3001',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u6BDB\u53D1'
	                            ),
	                            '\u3001',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u6C99\u77F3'
	                            ),
	                            '\u3001',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u6F02\u6D6E\u7269'
	                            ),
	                            '\u7B49'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5EFA\u8BAE\u66F4\u6362\u5468\u671F\uFF1A',
	                            React.createElement(
	                                'span',
	                                null,
	                                '6~9'
	                            ),
	                            '\u4E2A\u6708'
	                        ),
	                        React.createElement(
	                            'strong',
	                            { 'data-idx': '4', onClick: this.resetFilter },
	                            '\u6EE4\u82AF\u6570\u636E\u91CD\u7F6E'
	                        )
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return SettingPanelPP1;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.InnerPage = undefined;

	var _fun = __webpack_require__(11);

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var InnerPage = exports.InnerPage = React.createClass({
		displayName: 'InnerPage',

		getInitialState: function getInitialState() {
			return {};
		},
		render: function render() {
			var percent = this.props.percent;
			var rightCircle = this.props.rightCircle;
			var leftCircle = this.props.leftCircle;
			return React.createElement(
				'div',
				{ className: 'setting-percent' },
				React.createElement(
					'div',
					{ className: 'circle-progress-wrapper' },
					parseInt(percent),
					'%',
					React.createElement(
						'div',
						{ className: 'wrapper right' },
						React.createElement('div', { className: 'circle-progress right-circle', style: { 'WebkitTransform': 'rotate(' + rightCircle + 'deg)' } })
					),
					React.createElement(
						'div',
						{ className: 'wrapper left' },
						React.createElement('div', { className: 'circle-progress left-circle', style: { 'WebkitTransform': 'rotate(' + leftCircle + 'deg)' } })
					)
				)
			);
		}
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingPanelCO1 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _InnerPage = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var appData = {};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	var SettingPanelCO1 = exports.SettingPanelCO1 = function (_BaseComponent) {
	    _inherits(SettingPanelCO1, _BaseComponent);

	    function SettingPanelCO1(props) {
	        _classCallCheck(this, SettingPanelCO1);

	        var _this = _possibleConstructorReturn(this, (SettingPanelCO1.__proto__ || Object.getPrototypeOf(SettingPanelCO1)).call(this, props));

	        _this.state = {
	            ManualWash: '00',
	            slide: 2,
	            washOver: 0,
	            SourceWaterTdsValue: '00',
	            PureWaterTdsValue: '00', //这里组件并未加载完所以取不到最后的值
	            MachineOperationState: '00',
	            PP1Life: '00',
	            CO1Life: '00',
	            PP2Life: '00',
	            ROLife: '00',
	            CO2Life: '00',
	            PP1LifeRemain: '00',
	            CO1LifeRemain: '00',
	            PP2LifeRemain: '00',
	            ROLifeRemain: '00',
	            CO2LifeRemain: '00',

	            PP1ClearControl: '00',
	            CO1ClearControl: '00',
	            PP2ClearControl: '00',
	            ROClearControl: '00',
	            CO2ClearControl: '00'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.back();
	        _this.resetFilter = _this.resetFilter.bind(_this);
	        _this.goShoping = _this.goShoping.bind(_this);
	        return _this;
	    }

	    _createClass(SettingPanelCO1, [{
	        key: 'resetFilter',
	        value: function resetFilter(e) {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            var idx = e.currentTarget.getAttribute('data-idx');
	            var data = { 'CO1ClearControl': '01', 'updateFlagIdx': idx };
	            _Actions.Actions.resetFilter(data);
	        }
	    }, {
	        key: 'goShoping',
	        value: function goShoping() {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            //前置碳
	            het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87142');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var toFixed = function toFixed(s) {
	                var changenum = (parseInt(this * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
	                var index = changenum.indexOf(".");
	                if (index < 0 && s > 0) {
	                    changenum = changenum + ".";
	                    for (var i = 0; i < s; i++) {
	                        changenum = changenum + "0";
	                    }
	                } else {
	                    index = changenum.length - index;
	                    for (var _i = 0; _i < s - index + 1; _i++) {
	                        changenum = changenum + "0";
	                    }
	                }
	                return changenum;
	            };
	            var computePercent = function computePercent(remain, all) {
	                var percent = remain / all * 100;
	                if (remain == 0 || remain > all) return percent = 0;
	                if (percent < 1) {
	                    return percent = 1;
	                }
	                if (percent > 99.5 && percent < 100) {
	                    return percent = 99;
	                } else {
	                    return percent = (remain / all * 100).toFixed(0);
	                }
	            };

	            //对应规则
	            //PP棉：  2160小时；3个月  PP1
	            //前置炭：4320小时；6个月  CO1
	            //PP棉：  4320小时；6个月  PP2
	            //RO膜： 17280小时；2年    RO
	            //后置炭：8640小时；12个月  CO2

	            //CO1滤芯 CO1Life=设备剩余时间百分比
	            var CO1Life = parseInt(this.state.CO1Life, 16);
	            var CO1LifeRemain = parseInt(this.state.CO1LifeRemain, 16);
	            var CO1LifePercent = computePercent(CO1LifeRemain, 180);

	            //圆形进度条
	            var percent = CO1Life <= 100 ? CO1Life : 100;
	            var rightCircle = -135;
	            var leftCircle = -135;
	            if (percent <= 50) {
	                //初始度数减去135度，0对应-135
	                rightCircle = percent * 360 / 100 - 135;
	                //console.log('percent----R--------',percent);
	            } else {
	                rightCircle = 45;
	                leftCircle = (percent - 50) * 360 / 100 - 135;
	                //console.log('percent-----L-------',percent);
	            }
	            //导航栏判断安卓73，苹果64
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'ios' : 'android';

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'section',
	                    { className: navigation },
	                    React.createElement(_InnerPage.InnerPage, { percent: percent, rightCircle: rightCircle, leftCircle: leftCircle }),
	                    React.createElement(
	                        'div',
	                        { className: 'setting-inner' },
	                        React.createElement(
	                            'h3',
	                            null,
	                            '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                            React.createElement(
	                                'b',
	                                null,
	                                CO1LifeRemain
	                            ),
	                            '\u5929'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u6EE4\u82AF\u8BF4\u660E\uFF1A\u6EE4\u9664\u6C34\u4E2D',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u4F59\u6C2F'
	                            ),
	                            '\u3001',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u4E09\u6C2F\u7532\u70F7'
	                            ),
	                            '\u3001',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u6F02\u767D\u5242'
	                            ),
	                            '\u3001',
	                            React.createElement(
	                                'span',
	                                { className: 'blue' },
	                                '\u519C\u836F'
	                            ),
	                            '\u7B49\u5316\u5B66\u7269\u8D28\u53CA\u6742\u8272\u3001\u5F02\u5473\u3002'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5EFA\u8BAE\u66F4\u6362\u5468\u671F\uFF1A',
	                            React.createElement(
	                                'span',
	                                null,
	                                '6~9'
	                            ),
	                            '\u4E2A\u6708'
	                        ),
	                        React.createElement(
	                            'strong',
	                            { 'data-idx': '5', onClick: this.resetFilter },
	                            '\u6EE4\u82AF\u6570\u636E\u91CD\u7F6E'
	                        )
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return SettingPanelCO1;
	}(_BaseComponentClass.BaseComponent);

	;
	//

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingPanelPP2 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _InnerPage = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var appData = {};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	var SettingPanelPP2 = exports.SettingPanelPP2 = function (_BaseComponent) {
	    _inherits(SettingPanelPP2, _BaseComponent);

	    function SettingPanelPP2(props) {
	        _classCallCheck(this, SettingPanelPP2);

	        var _this = _possibleConstructorReturn(this, (SettingPanelPP2.__proto__ || Object.getPrototypeOf(SettingPanelPP2)).call(this, props));

	        _this.state = {
	            ManualWash: '00',
	            slide: 2,
	            washOver: 0,
	            SourceWaterTdsValue: '00',
	            PureWaterTdsValue: '00', //这里组件并未加载完所以取不到最后的值
	            MachineOperationState: '00',
	            PP1Life: '00',
	            CO1Life: '00',
	            PP2Life: '00',
	            ROLife: '00',
	            CO2Life: '00',
	            PP1LifeRemain: '00',
	            CO1LifeRemain: '00',
	            PP2LifeRemain: '00',
	            ROLifeRemain: '00',
	            CO2LifeRemain: '00',

	            PP1ClearControl: '00',
	            CO1ClearControl: '00',
	            PP2ClearControl: '00',
	            ROClearControl: '00',
	            CO2ClearControl: '00'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.back();
	        _this.resetFilter = _this.resetFilter.bind(_this);
	        _this.goShoping = _this.goShoping.bind(_this);
	        return _this;
	    }

	    _createClass(SettingPanelPP2, [{
	        key: 'resetFilter',
	        value: function resetFilter(e) {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            var idx = e.currentTarget.getAttribute('data-idx');
	            var data = { 'PP2ClearControl': '01', 'updateFlagIdx': idx };
	            _Actions.Actions.resetFilter(data);
	        }
	    }, {
	        key: 'goShoping',
	        value: function goShoping() {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            //深度活性净化PP棉
	            het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87188');
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            //PP2滤芯
	            var PP2Life = parseInt(this.state.PP2Life, 16); //剩余百分比
	            var PP2LifeRemain = parseInt(this.state.PP2LifeRemain, 16); //剩余天数
	            //let PP2LifePercent= computePercent(PP2LifeRemain,PP2Life);

	            //圆形进度条
	            var percent = PP2Life <= 100 ? PP2Life : 100;
	            var rightCircle = -135;
	            var leftCircle = -135;
	            if (percent <= 50) {
	                //初始度数减去135度，0对应-135
	                rightCircle = percent * 360 / 100 - 135;
	                //console.log('percent----R--------',percent);
	            } else {
	                rightCircle = 45;
	                leftCircle = (percent - 50) * 360 / 100 - 135;
	                //console.log('percent-----L-------',percent);
	            }
	            //导航栏判断安卓73，苹果64
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'ios' : 'android';
	            return React.createElement(
	                'section',
	                { className: navigation },
	                React.createElement(_InnerPage.InnerPage, { percent: percent, rightCircle: rightCircle, leftCircle: leftCircle }),
	                React.createElement(
	                    'div',
	                    { className: 'setting-inner' },
	                    React.createElement(
	                        'h3',
	                        null,
	                        '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                        React.createElement(
	                            'b',
	                            null,
	                            PP2LifeRemain
	                        ),
	                        '\u5929'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u6EE4\u82AF\u8BF4\u660E\uFF1A\u53EF\u5C06\u6C34\u4E2D',
	                        React.createElement(
	                            'span',
	                            { className: 'blue' },
	                            '\u7EC6\u5FAE\u6742\u8D28'
	                        ),
	                        '\u518D\u6B21\u7CBE\u5BC6\u8FC7\u6EE4\u3002'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u5EFA\u8BAE\u66F4\u6362\u5468\u671F\uFF1A',
	                        React.createElement(
	                            'span',
	                            null,
	                            '6~9'
	                        ),
	                        '\u4E2A\u6708'
	                    ),
	                    React.createElement(
	                        'strong',
	                        { 'data-idx': '6', onClick: this.resetFilter },
	                        '\u6EE4\u82AF\u6570\u636E\u91CD\u7F6E'
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return SettingPanelPP2;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingPanelCO2 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _InnerPage = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var appData = {};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	var SettingPanelCO2 = exports.SettingPanelCO2 = function (_BaseComponent) {
	    _inherits(SettingPanelCO2, _BaseComponent);

	    function SettingPanelCO2(props) {
	        _classCallCheck(this, SettingPanelCO2);

	        var _this = _possibleConstructorReturn(this, (SettingPanelCO2.__proto__ || Object.getPrototypeOf(SettingPanelCO2)).call(this, props));

	        _this.state = {
	            ManualWash: '00',
	            slide: 2,
	            washOver: 0,
	            SourceWaterTdsValue: '00',
	            PureWaterTdsValue: '00', //这里组件并未加载完所以取不到最后的值
	            MachineOperationState: '00',
	            PP1Life: '00',
	            CO1Life: '00',
	            PP2Life: '00',
	            ROLife: '00',
	            CO2Life: '00',
	            PP1LifeRemain: '00',
	            CO1LifeRemain: '00',
	            PP2LifeRemain: '00',
	            ROLifeRemain: '00',
	            CO2LifeRemain: '00',

	            PP1ClearControl: '00',
	            CO1ClearControl: '00',
	            PP2ClearControl: '00',
	            ROClearControl: '00',
	            CO2ClearControl: '00'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.back();
	        _this.resetFilter = _this.resetFilter.bind(_this);
	        _this.goShoping = _this.goShoping.bind(_this);
	        return _this;
	    }

	    _createClass(SettingPanelCO2, [{
	        key: 'resetFilter',
	        value: function resetFilter(e) {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            var idx = e.currentTarget.getAttribute('data-idx');
	            var data = { 'CO2ClearControl': '01', 'updateFlagIdx': idx };
	            _Actions.Actions.resetFilter(data);
	        }
	    }, {
	        key: 'goShoping',
	        value: function goShoping() {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            //后置碳
	            het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87138');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //CO2滤芯 CO2Life=剩余时间百分比
	            var CO2Life = parseInt(this.state.CO2Life, 16);
	            var CO2LifeRemain = parseInt(this.state.CO2LifeRemain, 16);
	            //let CO2LifePercent= computePercent(CO2LifeRemain,CO2Life);

	            //圆形进度条
	            var percent = CO2Life <= 100 ? CO2Life : 100;
	            var rightCircle = -135;
	            var leftCircle = -135;
	            if (percent <= 50) {
	                //初始度数减去135度，0对应-135
	                rightCircle = percent * 360 / 100 - 135;
	            } else {
	                rightCircle = 45;
	                leftCircle = (percent - 50) * 360 / 100 - 135;
	            }
	            //导航栏判断安卓73，苹果64
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'ios' : 'android';

	            return React.createElement(
	                'section',
	                { className: navigation },
	                React.createElement(_InnerPage.InnerPage, { percent: percent, rightCircle: rightCircle, leftCircle: leftCircle }),
	                React.createElement(
	                    'div',
	                    { className: 'setting-inner' },
	                    React.createElement(
	                        'h3',
	                        null,
	                        '\u9884\u8BA1\u5269\u4F59\u5929\u6570 ',
	                        React.createElement(
	                            'b',
	                            null,
	                            CO2LifeRemain
	                        ),
	                        '\u5929'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u6EE4\u82AF\u8BF4\u660E\uFF1A\u8C03\u8282\u6C34\u8D28\u3001\u6539\u5584\u53E3\u611F\u3001\u5438\u9644\u5F02\u5473\u3002'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u5EFA\u8BAE\u66F4\u6362\u5468\u671F\uFF1A',
	                        React.createElement(
	                            'span',
	                            null,
	                            '6~9'
	                        ),
	                        '\u4E2A\u6708'
	                    ),
	                    React.createElement(
	                        'strong',
	                        { 'data-idx': '8', onClick: this.resetFilter },
	                        '\u6EE4\u82AF\u6570\u636E\u91CD\u7F6E'
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return SettingPanelCO2;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SettingPanelRO = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _InnerPage = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var appData = {};
	var isFault = function isFault() {
	    if (appData.networkavailable == 2) {
	        console.log('请检查网络');
	        return '请检查网络';
	    }
	    if (appData.online == 2) {
	        console.log('设备与APP已断开连接!');
	        return '设备与APP已断开连接!';
	    }
	    return false;
	};

	var SettingPanelRO = exports.SettingPanelRO = function (_BaseComponent) {
	    _inherits(SettingPanelRO, _BaseComponent);

	    function SettingPanelRO(props) {
	        _classCallCheck(this, SettingPanelRO);

	        var _this = _possibleConstructorReturn(this, (SettingPanelRO.__proto__ || Object.getPrototypeOf(SettingPanelRO)).call(this, props));

	        _this.state = {
	            ManualWash: '00',
	            slide: 2,
	            washOver: 0,
	            SourceWaterTdsValue: '00',
	            PureWaterTdsValue: '00', //这里组件并未加载完所以取不到最后的值
	            MachineOperationState: '00',
	            PP1Life: '00',
	            CO1Life: '00',
	            PP2Life: '00',
	            ROLife: '00',
	            CO2Life: '00',
	            PP1LifeRemain: '00',
	            CO1LifeRemain: '00',
	            PP2LifeRemain: '00',
	            ROLifeRemain: '00',
	            CO2LifeRemain: '00',

	            PP1ClearControl: '00',
	            CO1ClearControl: '00',
	            PP2ClearControl: '00',
	            ROClearControl: '00',
	            CO2ClearControl: '00'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.back();
	        _this.resetFilter = _this.resetFilter.bind(_this);
	        _this.goShoping = _this.goShoping.bind(_this);
	        return _this;
	    }

	    _createClass(SettingPanelRO, [{
	        key: 'resetFilter',
	        value: function resetFilter(e) {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            var idx = e.currentTarget.getAttribute('data-idx');
	            var data = { 'ROClearControl': '01', 'updateFlagIdx': idx };
	            _Actions.Actions.resetFilter(data);
	        }
	    }, {
	        key: 'goShoping',
	        value: function goShoping() {
	            appData.online = this.state.online;
	            appData.networkavailable = this.state.networkavailable;
	            if (isFault()) {
	                het.toast(isFault());return false;
	            };
	            //RO
	            het.toast('http://rsdxjd.rsdmall.com/mall/goods/goodsM_UI?userId=168&id=87135');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //RO滤芯
	            var ROLife = parseInt(this.state.ROLife, 16); //剩余百分比
	            var ROLifeRemain = parseInt(this.state.ROLifeRemain, 16); //剩余天数
	            //let ROLifePercent= computePercent(ROLifeRemain,ROLife);

	            //圆形进度条
	            var percent = ROLife <= 100 ? ROLife : 100;
	            var rightCircle = -135;
	            var leftCircle = -135;
	            if (percent <= 50) {
	                //初始度数减去135度，0对应-135
	                rightCircle = percent * 360 / 100 - 135;
	            } else {
	                rightCircle = 45;
	                leftCircle = (percent - 50) * 360 / 100 - 135;
	            }
	            //导航栏判断安卓73，苹果64
	            var isIOS = !!navigator.userAgent.match(/iPad|iPhone|iPod/);
	            var navigation = isIOS ? 'ios' : 'android';

	            return React.createElement(
	                'section',
	                { className: navigation },
	                React.createElement(_InnerPage.InnerPage, { percent: percent, rightCircle: rightCircle, leftCircle: leftCircle }),
	                React.createElement(
	                    'div',
	                    { className: 'setting-inner' },
	                    React.createElement(
	                        'h3',
	                        null,
	                        '\u9884\u8BA1\u5269\u4F59\u5929\u6570',
	                        React.createElement(
	                            'b',
	                            null,
	                            ROLifeRemain
	                        ),
	                        '\u5929'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u6EE4\u82AF\u8BF4\u660E\uFF1A\u901A\u8FC7\u589E\u538B\u6C34\u6CF5\u7684\u589E\u538B\uFF0C\u5229\u7528\u53CD\u6E17\u900F\u539F\u7406\u5C06\u6C34\u4E2D\u7684',
	                        React.createElement(
	                            'span',
	                            { className: 'blue' },
	                            '\u65E0\u673A\u76D0'
	                        ),
	                        '\u3001',
	                        React.createElement(
	                            'span',
	                            { className: 'blue' },
	                            '\u91CD\u91D1\u5C5E'
	                        ),
	                        '\u3001',
	                        React.createElement(
	                            'span',
	                            { className: 'blue' },
	                            '\u7EC6\u83CC'
	                        ),
	                        '\u3001',
	                        React.createElement(
	                            'span',
	                            { className: 'blue' },
	                            '\u75C5\u6BD2'
	                        ),
	                        '\u7B49\u5BF9\u4EBA\u4F53\u6709\u5BB3\u7684\u6C61\u67D3\u7269\u548C\u7EAF\u6C34\u5206\u79BB'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u5EFA\u8BAE\u66F4\u6362\u5468\u671F\uFF1A',
	                        React.createElement(
	                            'span',
	                            null,
	                            '6~9'
	                        ),
	                        '\u4E2A\u6708'
	                    ),
	                    React.createElement(
	                        'strong',
	                        { 'data-idx': '7', onClick: this.resetFilter },
	                        '\u6EE4\u82AF\u6570\u636E\u91CD\u7F6E'
	                    )
	                ),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return SettingPanelRO;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * tips组件
	 * @prop {string} msg  弹框消息
	 * @prop {string} btn1  确定按钮文字
	 * @prop {string} btn2  取消按钮文字
	 * @prop {boolean} show  弹框是否显示
	 * @prop {boolean} layerCancel  点击透明遮罩背景部分是否触发取消回调
	 * @prop {function} sucCallback  用户点击确定的回调事件
	 * @prop {function} errCallback  用户点击取消的回调事件
	 */

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var Tips = exports.Tips = React.createClass({
		displayName: 'Tips',
		getInitialState: function getInitialState() {
			return { show: false };
		},
		componentDidMount: function componentDidMount() {
			if (this.props.show === true) {
				this.setState({
					show: true
				});
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (!this.props.show && nextProps.show === true) {
				this.setState({
					show: true
				});
			}
		},
		boxtouch: function boxtouch(e) {
			e.preventDefault();
			e.stopPropagation();
			if (this.props.layerCancel && e.target.getAttribute('id') == 'tips') {
				this.noTouch(e);
			}
		},
		yesTouch: function yesTouch(e) {
			e.preventDefault();
			e.stopPropagation();
			if (typeof this.props.sucCallback === 'function') {
				this.props.sucCallback();
			}
			this.setState({
				show: false
			});
		},
		noTouch: function noTouch(e) {
			e.preventDefault();
			e.stopPropagation();
			if (typeof this.props.errCallback === 'function') {
				this.props.errCallback();
			}
			this.setState({
				show: false
			});
		},

		render: function render() {
			var msg = this.props.msg || '';
			var show = this.state.show || false;
			var btn1 = this.props.btn1;
			var btn2 = this.props.btn2;
			return React.createElement(
				'section',
				{ className: 'tips', id: 'tips', onTouchStart: this.boxtouch, style: { display: show ? 'block' : 'none' } },
				React.createElement(
					'section',
					{ className: 'tips-main' },
					React.createElement(
						'p',
						{ className: 'box-tips' },
						msg
					),
					React.createElement(
						'div',
						{ className: 'box-btn', onTouchEnd: this.yesTouch },
						btn1 || '确定'
					),
					React.createElement(
						'div',
						{ className: 'box-btn', onTouchEnd: this.noTouch },
						btn2 || '取消'
					)
				)
			);
		}
	});

/***/ }
/******/ ]);