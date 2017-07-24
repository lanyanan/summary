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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by yuanyunlong on 16/11/24.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;
	var Link = _ReactRouter.Link;

	var appData = {};

	het.domReady(function () {
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 开启控制数据渲染，以便filter能取到控制数据
	        filter: {}
	    });
	});
	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});

	var lastTouchModeIndex = 0;

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _Store.Store.listen(function (data) {
	            if (!_this.isMounted(_this)) return;
	            _this.setState(data);
	        }); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'isMounted',
	        value: function isMounted(component) {
	            try {
	                ReactDOM.findDOMNode(component);
	                return true;
	            } catch (e) {
	                return false;
	            }
	        }
	    }, {
	        key: 'touchAction',
	        value: function touchAction(e) {
	            var index = e.currentTarget.getAttribute("data-index");
	            lastTouchModeIndex = index;
	            _Actions.Actions.modeAction(index);
	        }
	    }, {
	        key: 'closeAction',
	        value: function closeAction() {

	            _Actions.Actions.closeLightAction();
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var switchStatus = this.state.switchStatue;
	            var switchImaPath = "../static/img/main/pic_switch_on.png";
	            var switchTitle = switchStatus ? "关机" : "开机";
	            var modeIndex = parseInt(this.state.lightIndex);
	            console.log("render mode: " + modeIndex);
	            if (switchStatus == false) {
	                modeIndex = 4;
	            }
	            if (this.state.online == '2') {
	                modeIndex = 4;
	                switchImaPath = "../static/img/main/pic_switch_off.png";
	            }
	            // 保留当前点击的模式
	            lastTouchModeIndex = modeIndex;

	            var whiteImgUrl = modeIndex == 1 || modeIndex == 4 ? "../static/img/main/pic_modebutton_1_off.png" : "../static/img/main/pic_modebutton_1_on.png";
	            var warmImgUrl = modeIndex == 2 || modeIndex == 4 ? "../static/img/main/pic_modebutton_2_off.png" : "../static/img/main/pic_modebutton_2_on.png";
	            var inteImgUrl = modeIndex == 3 || modeIndex == 4 ? "../static/img/main/pic_modebutton_3_off.png" : "../static/img/main/pic_modebutton_3_on.png";

	            var selectedColor = "selected";
	            var unSelectedColor = "unselected";
	            var whitefontColor = modeIndex == 1 || modeIndex == 4 ? selectedColor : unSelectedColor;
	            var warmfontColor = modeIndex == 2 || modeIndex == 4 ? selectedColor : unSelectedColor;
	            var intefontColor = modeIndex == 3 || modeIndex == 4 ? selectedColor : unSelectedColor;
	            var switchColor = unSelectedColor;

	            var modeName = "--";
	            var switchMode = "开机";
	            switch (modeIndex) {
	                case 1:
	                    {
	                        modeName = "冷光";switchMode = "开机";break;
	                    }
	                case 2:
	                    {
	                        modeName = "暖光";switchMode = "开机";break;
	                    }
	                case 3:
	                    {
	                        modeName = "智能";switchMode = "开机";break;
	                    }
	                case 0:
	                    {
	                        modeName = "--";switchMode = "开机";break;
	                    }
	                default:
	                    {
	                        switchMode = "关机";modeName = "--";
	                    }
	            }

	            var statusBar = switchMode + ' 模式:' + modeName;
	            if (this.state.online == '2') {
	                statusBar = '设备已离线';
	                switchColor = selectedColor;
	            }
	            if (this.state.networkavailable == '2') statusBar = '当前网络不可用';
	            console.log("render mode1: " + modeIndex + " " + statusBar + ' ' + appData.online);

	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    statusBar
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btn-list' },
	                    React.createElement(
	                        'dl',
	                        { className: 'flex-cell', key: '0', 'data-index': '0', onTouchStart: this.closeAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: switchImaPath })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: switchColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                switchTitle
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'flex-cell', key: '1', 'data-index': '1', onTouchStart: this.touchAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: whiteImgUrl })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: whitefontColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u51B7\u5149'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'flex-cell', key: '2', 'data-index': '2', onTouchStart: this.touchAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: warmImgUrl })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: warmfontColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6696\u5149'
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'flex-cell', key: '3', 'data-index': '3', onTouchStart: this.touchAction.bind(this) },
	                        React.createElement(
	                            'dd',
	                            null,
	                            React.createElement('img', { src: inteImgUrl })
	                        ),
	                        React.createElement(
	                            'dt',
	                            { className: intefontColor },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u667A\u80FD'
	                            )
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	het.domReady(function () {
	    het.setTitle('C-Life 快捷方式');
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
	'closeLightAction', 'modeAction', 'lightValueAction', 'siteCheckAction', 'closeAlert']);

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

	//  运行数据
	// "type" : "1",
	//     "data" : {
	//     "standardsittingstatus" : 0,

	//         "lightlevel" : 0,
	//         "Wrongsittingtime" : 0,
	//         "Correctsittingtime" : 0,
	//         "runmode" : 0,
	//         "sittingstatus" : 1,
	//         "workmode" : 3,
	//         "modelightlevel" : 1
	// }

	//     控制数据
	//     "warm" : 0,
	//     "updateFlag" : "0200",
	//     "mode" : 3,
	//     "power" : 1,
	//     "white" : 0,
	//     "reserve" : "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
	//     "sittingdetection" : 16,
	//     "errortime" : 15

	// 告警数据
	// "IR" : 1,
	//     "light" : 0,        // 亮度报警
	//     "Ultrasonic" : 0,
	//     "voice" : 0,
	//     "reserve" : "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
	//     "sitting" : 1     // 坐姿报警

	// 数据过滤计时器
	var dataFilterTimers = {
	    workmode: 0,
	    standardsittingstatus: 0,
	    sittingstatus: 0
	};

	var isFirstInput = true;
	var countInputData = 0;
	var yunxingshujuInputCount = 0;
	var isReceiveControlData = false;
	// 返回过滤后的数据
	function dataFilter(data) {
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	            } else {
	                console.log("yy filter: " + k);
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

	var appData = {
	    timer: null,
	    online: '2'
	};

	var lastSiteErrorRecordTime = 0;

	function setLightValue() {
	    // lignht Value
	    var whiteValue = appData.white || 0;
	    var warmValue = appData.warm || 0;
	    var intelegeValue = appData.lightlevel || 0;
	    var lightValue = 0;
	    switch (appData.lightIndex) {
	        case 1:
	            lightValue = whiteValue;break;
	        case 2:
	            lightValue = warmValue;break;
	        case 3:
	            lightValue = intelegeValue;break;
	        case 0:
	            lightValue = 0;break;
	        default:
	            lightValue = 4;
	    }
	    appData.lightValue = lightValue;
	}

	// 设置 第几个button
	function setLightIndex(index) {
	    appData.lightIndex = index;
	    if (index != 3) {
	        appData.sittingdetection = false;
	        appData.sittingstatus = true;
	    }
	}

	function switchAndNetWorkCheck() {
	    var netWorkStatus = appData.networkavailable == 2;
	    if (netWorkStatus) {
	        het.toast("当前网络不可用");
	        return false;
	    }

	    var onLineStatus = appData.online == 2;
	    if (onLineStatus) {
	        het.toast("设备已离线");
	        return false;
	    }

	    var switchStatua = appData.switchStatue;
	    if (!switchStatua) {
	        het.toast("请开机");
	        return false;
	    }

	    return true;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(datas, type) {

	        var data = dataFilter(datas);
	        console.log("yy" + JSON.stringify(data));

	        //type 0
	        // 坐姿检测开启后，默认坐姿正常，标准坐姿没有录入
	        if (data.sittingdetection != undefined) {
	            //console.log("i received the sittingdetection");
	            appData.sittingdetection = data.sittingdetection == 1;
	        }

	        if (data.mode != undefined) {
	            setLightIndex(data.mode);
	            countInputData += 1;
	            if (countInputData == 1) {
	                window.receiveAppData = data;
	            }
	            // 收到控制命令后，忽略模式设置字段10s
	            // 第一次进来，过滤掉了这个数据
	            // if(isFirstInput){
	            //     isFirstInput = false;
	            // }else{
	            setDataTimer("workmode");
	            // }

	            if (data.mode == 0 && data.power == 0 && data.sittingdetection == 0) {
	                appData.loadingShow = true;
	            } else {
	                appData.loadingShow = false;
	            }
	        }

	        if (data.power != undefined) {

	            appData.switchStatue = data.power == 1;
	            // if (!appData.switchStatue){
	            //     // 收到关机命令后，10s不接受状态数据
	            //     //  setDataTimer("workmode");
	            // }
	        }

	        if (data.mode != undefined) appData.md = data.mode;
	        if (data.white != undefined) appData.white = data.white;
	        if (data.warm != undefined) appData.warm = data.warm;

	        //type 1
	        if (data.lightlevel != undefined) appData.lightlevel = data.lightlevel;
	        if (data.Wrongsittingtime != undefined) appData.Wrongsittingtime = data.Wrongsittingtime;
	        if (data.Correctsittingtime != undefined) appData.Correctsittingtime = data.Correctsittingtime;
	        if (data.runmode != undefined) appData.runmode = data.runmode;

	        // 坐姿状态  == 1 正常
	        if (data.sittingstatus != undefined) appData.sittingstatus = data.sittingstatus == 2 ? false : true;
	        // 是否有采集标准坐姿   === 1 录入了
	        if (data.standardsittingstatus != undefined) appData.standardsittingstatus = data.standardsittingstatus == 1;

	        //模式选择 1 冷光 2 暖光 3 智能 0 待机
	        if (data.workmode != undefined) {
	            setLightIndex(data.workmode);
	            // setDataTimer("workmode");
	            yunxingshujuInputCount += 1;
	        }
	        if (data.modelightlevel != undefined) appData.modelightlevel = data.modelightlevel;

	        //离线&故障
	        if (data.online) appData.online = data.online;
	        if (data.networkavailable) appData.networkavailable = data.networkavailable;
	        if (data.online == 2) {
	            appData.switchStatue = false;
	            appData.lightIndex = 4;
	        }

	        if (data.light != undefined) appData.light = data.light == 1;
	        if (data.Ultrasonic != undefined) appData.Ultrasonic = data.Ultrasonic == 1;

	        // 坐姿报警
	        // if(data.sitting != undefined)                 {
	        //     let siteErrorRecordTime = data.record_time;
	        //     if (lastSiteErrorRecordTime != siteErrorRecordTime) {
	        //         lastSiteErrorRecordTime =  siteErrorRecordTime;
	        //         let currentDate = (new Date()).valueOf();
	        //         let valueOfTime =  currentDate - lastSiteErrorRecordTime;
	        //         // 30s内报警有效
	        //         if(valueOfTime < (90 + 8*60*60)*1000 ){
	        //             appData.site  = (data.sitting == 1);
	        //         }
	        //         console.log("当前时间戳 " + currentDate +  " 硬件时间戳：" +lastSiteErrorRecordTime +" 时间差： " + valueOfTime);
	        //     }
	        //     console.log("i receive sitting alert " + appData.site + " " + siteErrorRecordTime );
	        // }

	        // 设置 灯的亮度级别
	        setLightValue();

	        console.log("运行数据 count: " + yunxingshujuInputCount + " 收到控制命令: " + countInputData);

	        this.trigger(appData);
	    },
	    onCloseLightAction: function onCloseLightAction() {

	        console.log("close start");
	        if (appData.online == '2') {
	            het.toast("设备已离线");
	            return;
	        }

	        if (appData.switchStatue != undefined) {
	            appData.switchStatue = !appData.switchStatue;
	        } else {
	            appData.switchStatue = true;
	        }

	        var switchData = {};
	        // index length 总共的长度

	        if (appData.switchStatue) {
	            var updateFlag = het.hexUpFlag(0, 1, 2);
	            switchData = {
	                power: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	        } else {
	            var _updateFlag = het.hexUpFlag(0, 1, 2);
	            switchData = {
	                power: parseInt("16", 10),
	                updateFlag: _updateFlag

	            };
	        }
	        console.log("before mode:" + " " + appData.lightIndex);
	        het.send(switchData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        this.trigger(appData);
	        setDataTimer("power");
	    },
	    onModeAction: function onModeAction(index) {

	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        var updateFlag = het.hexUpFlag(1, 1, 2);
	        var modeData = {
	            mode: parseInt(index),
	            updateFlag: updateFlag
	        };
	        setLightIndex(index);
	        het.send(modeData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        this.trigger(appData);
	        setDataTimer("workmode");
	    },
	    onLightValueAction: function onLightValueAction(value) {
	        appData.lightValue = value;
	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        var currentMode = appData.lightIndex;
	        var updateFlag = 0;
	        var modeData = {};
	        if (currentMode == 1) {
	            updateFlag = het.hexUpFlag(2, 1, 2);
	            modeData = {
	                white: value,
	                updateFlag: updateFlag
	            };
	        } else if (currentMode == 2) {
	            updateFlag = het.hexUpFlag(3, 1, 2);
	            modeData = {
	                warm: value,
	                updateFlag: updateFlag
	            };
	        } else {
	            het.toast("当前模式不能设置亮度");
	            this.trigger(appData);
	            return;
	        }

	        het.send(modeData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        this.trigger(appData);
	    },
	    onSiteCheckAction: function onSiteCheckAction() {
	        var cureentMode = appData.lightIndex;
	        if (!switchAndNetWorkCheck()) {
	            return;
	        }

	        if (cureentMode != 3) {
	            het.toast("请在智能模式下，选择坐姿检测");
	            return;
	        }

	        var siteMode = appData.sittingdetection;
	        var updateFlag = het.hexUpFlag(4, 1, 2);
	        var modeData = {};

	        if (siteMode) {
	            modeData = {
	                sittingdetection: parseInt("16", 10),
	                updateFlag: updateFlag
	            };
	            appData.sittingdetection = false;
	        } else {
	            modeData = {
	                sittingdetection: parseInt("1", 10),
	                updateFlag: updateFlag
	            };
	            appData.sittingdetection = true;
	        }
	        het.send(modeData, function (data) {}, function (data) {
	            het.toast("发送失败");
	        });
	        console.log(appData.lightIndex);
	        this.trigger(appData);
	    },
	    onCloseAlert: function onCloseAlert() {
	        appData.site = false;
	    }
	});

/***/ }
/******/ ]);