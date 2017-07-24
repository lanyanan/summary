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
	        filter: {
	            'ManualWash': 0 }
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
	            MachineOperationState: '00'
	        };
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store
	        _this.handleWash = _this.handleWash.bind(_this);
	        _this.liveError = _this.liveError.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'liveError',
	        value: function liveError() {
	            if (this.state.online == 2) {
	                return '设备与APP已断开连接！';
	            }
	            if (this.state.networkavailable == 2) {
	                return '当前网络不可用！';
	            }
	            if (this.state.K1State == '01') {
	                return 'K1电池阀故障';
	            }
	            if (this.state.K2State == '01') {
	                return 'K2电池阀故障';
	            }
	            if (this.state.BoosterPumpState == '01') {
	                return '增压泵故障';
	            }
	            if (this.state.NTCState == '01') {
	                return 'NTC故障';
	            }
	            if (this.state.FlowMeter1State == '01') {
	                return '流量计1故障';
	            }
	            if (this.state.FlowMeter2State == '01') {
	                return '流量计2故障';
	            }
	            if (this.state.MakeWaterOverTime == '01') {
	                return '制水超时故障';
	            }
	            if (this.state.LackWater == '01') {
	                return '缺水故障';
	            }
	            return false;
	        }
	    }, {
	        key: 'handleWash',
	        value: function handleWash(e) {
	            //出来操作
	            if (this.liveError()) {
	                het.toast(this.liveError());return false;
	            }
	            e.preventDefault();
	            parseInt(this.state.MachineOperationState, 16) != 1 && _Actions.Actions.washDevice({ 'ManualWash': '01', MachineOperationState: '01', slide: 2 });
	            //立即更改状态
	            //this.setState({
	            //     ManualWash:'01',
	            //     MachineOperationState:'01'
	            //     slide:2
	            //})
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var online = this.state.online;
	            var networkavailable = this.state.networkavailable;
	            var washStatusTxt = '--';
	            var MachineOperationState = this.state.MachineOperationState ? this.state.MachineOperationState : '';
	            MachineOperationState = parseInt(this.state.MachineOperationState, 16);
	            MachineOperationState == 1 && (washStatusTxt = '');
	            var washStatusArray = ['待机', '冲洗', '制水', '水满'];
	            if (MachineOperationState != undefined || MachineOperationState != '') {
	                washStatusTxt = washStatusArray[MachineOperationState];
	            };
	            var handleWash = MachineOperationState == 1 ? '' : this.handleWash;
	            var btnStyle = online == 2 || networkavailable == 2 || MachineOperationState == 1 ? 'flex-cell triggered' : 'flex-cell';
	            //故障处理主动弹出
	            var activeHint = function activeHint(err, msg) {
	                if (appData['counter' + err] != _this2.state[err]) {
	                    appData['counter' + err] = _this2.state[err];
	                    _this2.state[err] == 1 && het.toast(msg);
	                }
	            };
	            activeHint('K1State', 'K1电池阀故障');
	            activeHint('K2State', 'K2电池阀故障');
	            activeHint('BoosterPumpState', '增压泵故障');
	            activeHint('NTCState', 'NTC故障');
	            activeHint('FlowMeter1State', '流量计1故障');
	            activeHint('FlowMeter2State', '流量计2故障');
	            activeHint('MakeWaterOverTime', '制水超时故障');
	            activeHint('LackWater', '缺水故障');
	            return React.createElement(
	                'figure',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '\xA0\xA0\u72B6\u6001:',
	                    washStatusTxt,
	                    '\xA0\xA0'
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: btnStyle,
	                            onTouchStart: handleWash,
	                            style: online == 2 || networkavailable == 2 || MachineOperationState == 1 ? { opacity: 0.5 } : { opacity: 1 } },
	                        React.createElement('img', { src: '../static/img/btnlist/4.png' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u51B2\u6D17'
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
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));
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
	'waterLines']);

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
	        console.log('请检查网络,调试');
	        return '请检查网络';
	    }
	    if (AppData.online == 2) {
	        console.log('设备与APP已断开连接!,调试');
	        return '设备与APP已断开连接!';
	    }
	    return false;
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
	        //协议定义为16进制，这里未作统一转换，在views里面使用时再做转换，但缓存给全局变量AppData,给回退按钮时不能触发repaint方法请求渲染数据使用
	        //数据延时过滤准备
	        var data = dataFilter(datas);
	        //console.log('data',data);

	        //设备id
	        if (data.deviceId) AppData.deviceId = data.deviceId;
	        //断网离线
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.online) AppData.online = data.online;
	        //设备故障 >>> 网络，离线，电磁阀K1状态，电磁阀K2状态，增压泵状态，NTC状态，流量计1状态，流量计2状态，机器工作状态，缺水或者流量计故障
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.online) AppData.online = data.online;
	        if (data.K1State) AppData.K1State = data.K1State;
	        if (data.K2State) AppData.K2State = data.K2State;
	        if (data.BoosterPumpState) AppData.BoosterPumpState = data.BoosterPumpState;
	        if (data.NTCState) AppData.NTCState = data.NTCState;
	        if (data.FlowMeter1State) AppData.FlowMeter1State = data.FlowMeter1State;
	        if (data.FlowMeter2State) AppData.FlowMeter2State = data.FlowMeter2State;
	        if (data.MachineOperationState) AppData.MachineOperationState = data.MachineOperationState;
	        if (data.LackWater) AppData.LackWater = data.LackWater;

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
	            het.toast(isFault());return false;
	        };
	        var me = this;

	        //https://dp.clife.net 测试  https://test.cms.clife.cn 预发布  https://cms.clife.cn  正式
	        var domain = window.location.host == 'cms.clife.cn' ? 'https://cms.clife.cn' : window.location.host == 'test.cms.clife.cn' ? 'https://test.cms.clife.cn' : 'https://dp.clife.net';
	        //真实环境 相对路径即可
	        var url = '/v1/app/customization/waterPurifier/stat/getStatRunData' || domain + '/v1/app/customization/waterPurifier/stat/getStatRunData';
	        var params = {
	            "deviceId": AppData.deviceId, //此处不能写死，以后必改)
	            "type": parseInt(type) + 1
	        };
	        var sucCallBack = function sucCallBack(success) {
	            var successParse = JSON.parse(success);
	            var successStringify = JSON.stringify(success);
	            if (successParse.code == 0) {
	                me.trigger({
	                    type: type,
	                    codes: successParse.code,
	                    renderWaterline: 1, //是否渲染开关，1开2关，方便调试打印，其实应该为true/fasle
	                    waterlines: successParse.data
	                });
	            } else {
	                het.toast('请求异常');
	            }
	        };
	        var errCallback = function errCallback(fail) {
	            het.toast('请求失败~');
	        };
	        het.post(url, params, sucCallBack, errCallback);
	        //本地调试环境
	        //let urls =
	        //    'http://200.200.200.50/v1/app/customization/waterPurifier/stat/getStatRunData?accessToken=' +
	        //    'fec8722d1df64caf94c63253a975c358' +
	        //    '&appId=10120&appType=1&deviceId=E10A5226860FDC0517F00CDBEC20759B&timestamp='+ new Date().getTime()+
	        //    '&type='+(parseInt(type)+1);
	        //$.ajax({
	        //    async: true,
	        //    type: 'POST',okk
	        //    url:urls,
	        //    dataType: 'json',
	        //    success: function(xhr){
	        //        //het.toast('请求成功'+xhr.code);
	        //        if(xhr.code==0){
	        //            //console.log('post请求到的数据',xhr.msg);
	        //            let data =JSON.stringify(xhr.data);
	        //            me.trigger({
	        //                type:type,
	        //                renderWaterline: 1,
	        //                waterlines: xhr.data,
	        //            })
	        //        }else{
	        //            het.toast(xhr.code)
	        //        }
	        //    },
	        //    error: function (xhr) {
	        //        het.toast('请求失败错误码'+xhr.code)
	        //    }
	        //});
	    },
	    onWashDevice: function onWashDevice(data) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        var me = this;
	        me.trigger(data);
	        setDataTimer('MachineOperationState');
	        data.updateFlag = het.hexUpFlag(10, 1, 6);
	        //console.log('data',data)
	        het.send(data, function (data) {
	            //het.toast("发送成功")
	        }, function (data) {
	            het.toast("命令发送失败");
	        });

	        console.log('冲洗', data);
	    },
	    onResetFilter: function onResetFilter(data) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        var idx = data.updateFlagIdx;
	        data.updateFlag = het.hexUpFlag(idx, 1, 6);
	        delete data.updateFlagIdx;
	        //console.log('data',data)
	        het.send(data, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	        this.trigger(data);
	    }
	});

/***/ }
/******/ ]);