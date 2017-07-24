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

	var _LightMist = __webpack_require__(8);

	var _ColorPick = __webpack_require__(9);

	var _ClockPick = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 53 : 44,
	            tipShow: false,
	            light: 3,
	            mist: 3,
	            getDOM: 0,
	            offHeight: '100%'
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.componentDidMount = _this.componentDidMount.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            _Actions.Actions.getData();
	        }

	        // componentWillUpdate(){
	        //     Actions.getData();
	        //     console.log("willUpdata",this.state);
	        // }

	    }, {
	        key: 'domLoad',
	        value: function domLoad() {
	            if (this.state.getDOM > 10) return;
	            var offHeight = document.querySelector('#ROOT').offsetHeight;
	            var getDOM = this.state.getDOM + 1;
	            this.setState({
	                offHeight: offHeight,
	                getDOM: getDOM
	            });
	        }
	    }, {
	        key: 'hiddenTips',
	        value: function hiddenTips() {
	            this.setState({
	                tipShow: false
	            });
	        }
	    }, {
	        key: 'changeSwitch',
	        value: function changeSwitch() {
	            _Actions.Actions.changeSwitch();
	        }
	    }, {
	        key: 'getRunning',
	        value: function getRunning() {
	            return !(this.state.light == 3 && this.state.mist == 3);
	        }
	    }, {
	        key: 'closeTips',
	        value: function closeTips() {
	            this.setState({ tipsShow: false });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var isRunning = this.getRunning();
	            var activeColor = this.state.color || 0;

	            // console.log("render",this.state);

	            // if(this.state.warningStatus == 1){
	            //     console.log("加湿机已经因为停水自动暂停了，注意加水不能超过最高刻度线");

	            // }

	            return React.createElement(
	                'div',
	                { id: 'main', onLoad: this.domLoad.bind(this) },
	                React.createElement(
	                    'header',
	                    { style: { paddingTop: this.state.headerTop } },
	                    React.createElement(
	                        'p',
	                        { className: 'tips', style: { visibility: this.state.tips && this.state.tipsShow ? 'visible' : 'hidden' }, onTouchStart: this.closeTips.bind(this) },
	                        this.state.tips,
	                        React.createElement('i', { className: 'close' })
	                    ),
	                    React.createElement(
	                        'p',
	                        { style: { visibility: this.state.warningStatus == 1 ? this.state.tipShow ? 'hidden' : 'hidden' : this.state.tipShow ? 'visible' : 'hidden' } },
	                        React.createElement('i', { className: 'tips-icon' }),
	                        '主人及时清理雾化网，可以延长我的寿命哦~',
	                        React.createElement(
	                            'label',
	                            { className: 'ignore-btn', onTouchEnd: this.hiddenTips.bind(this) },
	                            '忽略'
	                        )
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: this.state.warningStatus == 1 ? 'warning-on' : 'warning-off' },
	                        '加湿机已经因为缺水自动暂停了，注意加水不能超过最高刻度线'
	                    ),
	                    React.createElement(
	                        'figure',
	                        null,
	                        React.createElement('img', { src: "../static/img/humidifier_icon" + activeColor + ".png" })
	                    ),
	                    React.createElement('span', { onTouchEnd: this.changeSwitch.bind(this), className: isRunning ? 'switch-on' : 'switch-off' })
	                ),
	                React.createElement(_LightMist.LightMist, { light: this.state.light == 100 ? 3 : this.state.light, mist: this.state.mist }),
	                React.createElement(
	                    'h2',
	                    null,
	                    '颜色'
	                ),
	                React.createElement(_ColorPick.ColorPick, { color: this.state.color, light: this.state.light }),
	                React.createElement(
	                    'h2',
	                    null,
	                    '定时'
	                ),
	                React.createElement(_ClockPick.ClockPick, { timeValue: this.state.timeValue, disable: !this.getRunning() }),
	                React.createElement('div', { className: isRunning ? '' : 'all-off', style: { height: isRunning ? '0' : this.state.offHeight } })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('加湿器');
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BaseComponent).call(this, props));

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
	var Actions = exports.Actions = Reflux.createActions(['getData', // 拉取数据
	'changeSwitch', //开关机
	'changeLight', //更改灯值
	'changeMist', //更改雾值
	'changeColor', //更改颜色值
	'changeTime']);

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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _Actions = __webpack_require__(4);

	var _fun = __webpack_require__(6);

	var deviceId = _fun.Funs.getUrlParam('deviceId');
	var path = location.host === 'weixin.clife.cn' || location.host === 'localhost' ? '/clife-wechat-test/wechat/hotel' : // 测试环境
	location.host === 'weixin.hetyj.com' ? '/clife-wechat-preRelease/wechat/hotel' : // 预发布环境
	'/clife-wechat/wechat/hotel'; // 正式环境
	var source = 8; // 来源
	var postUrl = path + '/device/config/set';
	var AppData = {
	    light: 3,
	    mist: 2,
	    level: 1
	};
	var isShutdown = function isShutdown() {
	    return AppData.light == 3 && AppData.mist == 2;
	};
	// 数据过滤计时器
	var dataFilterTimers = {
	    color: 0,
	    light: 0,
	    mist: 0,
	    timerPresetTime: 0
	};

	// 返回过滤后的数据
	function dataFilter(data) {
	    // console.log("dataFilterTimers===========",dataFilterTimers);
	    var time = new Date().getTime();
	    var result = {};
	    for (var k in data) {
	        // console.log("####",data);
	        if (typeof dataFilterTimers[k] !== 'undefined') {
	            if (dataFilterTimers[k] < time) {
	                dataFilterTimers[k] = 0;
	                result[k] = data[k];
	                // console.log('$$$$$',result[k] );
	            }
	        } else {
	            result[k] = data[k];
	        }
	    }
	    // console.log('123',result);
	    return result;
	}

	// 设置过滤器过期时间
	function setDataTimer() {
	    // console.log("dataFilterTimers",dataFilterTimers,keys);
	    var time = new Date().getTime() + 20e3; // 10秒内不接收新数据

	    for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
	        keys[_key] = arguments[_key];
	    }

	    for (var i in keys) {
	        dataFilterTimers[keys[i]] = time;
	    }
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onGetData: function onGetData(type) {
	        var _this = this;
	        var timestamp = +new Date();
	        var url = path + '/device/data/get?deviceId=' + deviceId;
	        het.get(url, {}, function (data) {
	            data = JSON.parse(data);
	            if (data.code == 103005001) {
	                // 未授权，跳转授权页面
	                location.href = '/wechat/user/login?format=json&type=1&redirect=' + location.href;
	            }
	            // console.log("1",data);
	            if (data) {
	                data.tips = '';
	                data.tipsShow = false;
	                if (data.code == 100022006 && data.msg) {
	                    data.tips = '设备不在线';
	                    data.tipsShow = true;
	                }
	                _this.trigger(dataFilter(data));
	            } else if (data.msg) {
	                _this.trigger({ tips: data.msg, tipsShow: true });
	            }

	            if (data.data) {

	                // console.log("@@@@@2222",data.data);
	                data.data = dataFilter(data.data);
	                // console.log("@@@@@",data.data);
	                if (data.data.remainingTime !== undefined && data.data.remainingTime !== null) data.data.timeValue = data.data.remainingTime;
	                AppData.light = data.data.light;
	                AppData.level = data.data.level;
	                AppData.mist = data.data.mist;
	                if (data.data.mist == 2) data.data.mist = 3;
	                if (data.data.mist == 1 && data.data.level == 2) data.data.mist = 2;
	                _this.trigger(data.data);
	                if (!_this.getClock) {
	                    _this.getClock = setInterval(function () {
	                        _this.onGetData();
	                    }, 6000);
	                }

	                if (data.data.light == 3 && data.data.mist == 3 && type == 'open') {
	                    AppData.light = 1;
	                    AppData.mist = 1;
	                    var _data = {
	                        deviceId: deviceId,
	                        source: source,
	                        json: JSON.stringify({
	                            level: 1,
	                            light: 1,
	                            mist: 1,
	                            updateFlag: 7
	                        })
	                    };
	                    het.post(postUrl, _data, function (res) {
	                        var d = JSON.parse(res);
	                        if (d.code === 0) {
	                            setDataTimer('light', 'mist');
	                            _this.trigger({ light: 1, mist: 1 });
	                            console.log('调节开关成功');
	                        }
	                    });
	                }
	            }
	        });
	    },
	    onChangeSwitch: function onChangeSwitch() {
	        var _this2 = this;

	        if (this.getClock) clearInterval(this.getClock);
	        if (isShutdown()) {
	            var _ret = function () {
	                // 关机

	                // AppData.light = 1;
	                // AppData.mist = 1;
	                // AppData.level = 1;
	                // let _this = this;
	                // _this.getClock = setInterval(function(){
	                //     _this.onGetData();
	                // },6000);
	                // this.onGetData('open');
	                // return;
	                AppData.light = 1;
	                AppData.mist = 1;
	                var data = {
	                    deviceId: deviceId,
	                    source: source,
	                    json: JSON.stringify({
	                        level: 1,
	                        light: 1,
	                        mist: 1,
	                        updateFlag: 7
	                    })
	                };
	                setDataTimer('light', 'mist');
	                _this2.trigger({ light: 1, mist: 1 });
	                var _this = _this2;
	                _this.getClock = setInterval(function () {
	                    _this.onGetData();
	                }, 6000);
	                het.post(postUrl, data, function (res) {
	                    var d = JSON.parse(res);
	                    if (d.code === 0) {
	                        console.log('调节开关成功');
	                    }
	                });
	                return {
	                    v: void 0
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	            AppData.light = 3;
	            AppData.mist = 2;
	        }
	        var mist = void 0;
	        if (AppData.mist == 1 && AppData.level == 1) mist = 1;
	        if (AppData.mist == 1 && AppData.level == 2) mist = 2;
	        if (AppData.mist == 2) mist = 3;
	        setDataTimer('light', 'mist');
	        this.trigger({ light: AppData.light, mist: mist });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                level: 1,
	                light: AppData.light,
	                mist: AppData.mist,
	                updateFlag: isShutdown() ? 7 : 3
	            })
	        };
	        var _this = this;
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                _this.getClock = setInterval(function () {
	                    _this.onGetData();
	                }, 6000);
	                console.log('调节开关成功');
	            }
	        });
	    },
	    onChangeLight: function onChangeLight(value) {
	        if (isShutdown()) return;
	        if (this.getClock) clearInterval(this.getClock);
	        setDataTimer('light');
	        this.trigger({
	            light: parseInt(value)
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                light: parseInt(value),
	                updateFlag: 0x02
	            })
	        };
	        AppData.light = parseInt(value);
	        var _this = this;
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                _this.getClock = setInterval(function () {
	                    _this.onGetData();
	                }, 6000);
	                console.log('调节亮度成功');
	            }
	        });
	    },
	    onChangeMist: function onChangeMist(value) {
	        if (isShutdown()) return;
	        if (this.getClock) clearInterval(this.getClock);
	        setDataTimer('mist');
	        this.trigger({
	            mist: parseInt(value)
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                level: parseInt(value) == 1 ? 1 : 2,
	                mist: parseInt(value) == 3 ? 2 : 1,
	                updateFlag: parseInt(value) == 3 ? 1 : 5
	            })
	        };
	        AppData.mist = parseInt(value) == 3 ? 2 : 1;
	        var _this = this;
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            console.log("res", d);
	            if (d.code === 0) {
	                _this.getClock = setInterval(function () {
	                    _this.onGetData();
	                }, 6000);
	                console.log('调节喷雾成功');
	            }
	            //加湿器下发命令失败，应刷回原有的状态
	            if (d.code === 100022800) {
	                _this.onGetData();
	            }
	        });
	    },
	    onChangeColor: function onChangeColor(value) {
	        if (isShutdown()) return;
	        if (this.getClock) clearInterval(this.getClock);
	        setDataTimer('color');
	        this.trigger({
	            color: parseInt(value)
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                color: parseInt(value),
	                updateFlag: 8
	            })
	        };
	        var _this = this;
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                _this.getClock = setInterval(function () {
	                    _this.onGetData();
	                }, 6000);
	                console.log('调节颜色成功');
	            }
	        });
	    },
	    onChangeTime: function onChangeTime(value) {
	        console.log(value);
	        if (isShutdown()) return;
	        if (this.getClock) clearInterval(this.getClock);
	        setDataTimer('timerPresetTime', 'remainingTime');
	        this.trigger({
	            timeValue: parseInt(value)
	        });
	        var data = {
	            deviceId: deviceId,
	            source: source,
	            json: JSON.stringify({
	                timerPresetTime: parseInt(value),
	                updateFlag: 16
	            })
	        };
	        var _this = this;
	        het.post(postUrl, data, function (res) {
	            var d = JSON.parse(res);
	            if (d.code === 0) {
	                _this.getClock = setInterval(function () {
	                    _this.onGetData();
	                }, 6000);
	                console.log('调节时间成功');
	            }
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
	exports.Funs = undefined;

	var _fun = __webpack_require__(7);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LightMist = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 切换灯,雾组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {number}    light 当前灯值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {number}    mist  当前雾值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var LightMist = exports.LightMist = function (_React$Component) {
	    _inherits(LightMist, _React$Component);

	    function LightMist() {
	        _classCallCheck(this, LightMist);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LightMist).call(this));

	        _this.lightitem = ['全亮灯', '半亮灯', '关闭灯'];
	        _this.mistitem = ['全喷雾', '半喷雾', '关闭雾'];
	        return _this;
	    }

	    _createClass(LightMist, [{
	        key: 'changeLight',
	        value: function changeLight() {
	            var newlight = this.props.light ? Number(this.props.light) + 1 : 1;
	            newlight = newlight > 3 ? 1 : newlight;
	            _Actions.Actions.changeLight(newlight);
	        }
	    }, {
	        key: 'changeMist',
	        value: function changeMist() {
	            var newmist = this.props.mist ? Number(this.props.mist) + 1 : 1;
	            newmist = newmist > 3 ? 1 : newmist;
	            _Actions.Actions.changeMist(newmist);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // console.log("mist",mist);
	            var light = Number(this.props.light) || 1;
	            var mist = Number(this.props.mist) || 1;

	            return React.createElement(
	                'section',
	                { className: 'lightmist flex' },
	                React.createElement(
	                    'section',
	                    { className: 'flex-cell', onTouchEnd: this.changeLight.bind(this) },
	                    React.createElement('img', { src: '../static/img/light-' + light + '.png' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        this.lightitem[light - 1]
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex-cell', onTouchEnd: this.changeMist.bind(this) },
	                    React.createElement('img', { src: '../static/img/mist-' + mist + '.png' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        this.mistitem[mist - 1]
	                    )
	                )
	            );
	        }
	    }]);

	    return LightMist;
	}(React.Component);

	;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ColorPick = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 切换灯,雾组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {number}    light 当前灯值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {number}    mist  当前雾值
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var ColorPick = exports.ColorPick = function (_React$Component) {
	    _inherits(ColorPick, _React$Component);

	    function ColorPick() {
	        _classCallCheck(this, ColorPick);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(ColorPick).call(this));
	    }

	    _createClass(ColorPick, [{
	        key: 'changeColor',
	        value: function changeColor(e) {

	            if (this.props.light == 3) return; //如果灯关闭，颜色不可选并且背景置灰
	            var newcolor = e.currentTarget.getAttribute('data-value');
	            if (newcolor == this.props.color) return;
	            _Actions.Actions.changeColor(newcolor);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var color = Number(this.props.color) || 0;
	            var items = [1, 2, 3, 4, 5, 6, 7];
	            var limit = void 0; //如果灯关闭，颜色不可选并且背景置灰
	            if (this.props.light == 3) {
	                limit = 0;
	            }
	            return React.createElement(
	                'ul',
	                { className: 'colorpick flex', id: limit == 0 ? 'li' : 'mit' },
	                items.map(function (item, index) {
	                    // console.log('this.this.props.',color,index);
	                    return React.createElement(
	                        'li',
	                        { key: index, className: 'flex-cell', 'data-value': item, onTouchEnd: _this2.changeColor.bind(_this2) },
	                        React.createElement('img', { src: color - 1 == index ? '../static/img/color-' + item + '-on.png' : '../static/img/color-' + item + '.png' })
	                    );
	                })
	            );
	        }
	    }]);

	    return ColorPick;
	}(React.Component);

	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ClockPick = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Actions = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 定时选择组件
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer} timeValue  定时时间值，取值30分钟的整数倍
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @act  AppActions.toggleTimeClock([integer])  选择时间时触发
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	var ClockPick = exports.ClockPick = function (_React$Component) {
	    _inherits(ClockPick, _React$Component);

	    function ClockPick() {
	        _classCallCheck(this, ClockPick);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClockPick).call(this));

	        _this.state = {
	            value: 0,
	            toastShow: true,
	            opacity: 0
	        };
	        _this.items = [{ name: "关闭", value: "0" }, { name: "20分钟", value: "20" }, { name: "40分钟", value: "40" }, { name: "60分钟", value: "60" }];
	        _this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
	        _this.componentWillUpdate = _this.componentWillUpdate.bind(_this);
	        _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
	        return _this;
	    }

	    _createClass(ClockPick, [{
	        key: "componentWillReceiveProps",
	        value: function componentWillReceiveProps(next) {
	            if (next.timeValue !== this.props.timeValue) {
	                this.setState({
	                    value: next.timeValue
	                });
	            }
	        }
	    }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	            if (this.toastclock) clearInterval(this.toastclock);
	            // if(this.shutdownclock) clearTimeout(this.shutdownclock);
	        }
	    }, {
	        key: "componentWillUpdate",
	        value: function componentWillUpdate(nextProps, nextState) {
	            var _this2 = this;

	            if (nextState.toastShow !== this.state.toastShow && nextState.toastShow == true) {
	                (function () {
	                    var opacity = 1;
	                    _this2.toastclock = setInterval(function () {
	                        opacity -= 0.1;
	                        if (opacity < 0) {
	                            clearInterval(this.toastclock);
	                            this.setState({
	                                toastclock: false,
	                                opacity: 0
	                            });
	                        } else {
	                            this.setState({
	                                opacity: opacity
	                            });
	                        }
	                    }.bind(_this2), 400);
	                })();
	            }
	        }
	    }, {
	        key: "rangechange",
	        value: function rangechange(e) {
	            if (this.props.disable) return;
	            var newtime = e.target.value;
	            this.setState({
	                value: newtime,
	                toastShow: false,
	                opacity: 0
	            });
	            if (this.toastclock) clearInterval(this.toastclock);
	        }
	    }, {
	        key: "submitTime",
	        value: function submitTime(e) {
	            // let trueValue = e.target.value==90?120:e.target.value;
	            var trueValue = e.target.value;
	            if (this.props.timeValue == trueValue) return;
	            // if(this.shutdownclock) clearTimeout(this.shutdownclock);
	            _Actions.Actions.changeTime(trueValue);
	            this.setState({
	                toastShow: true
	            });
	            // let clocktime = parseInt(trueValue)*60*1000;
	            // if(clocktime){
	            //     this.shutdownclock = setTimeout(function(){
	            //         Actions.changeSwitch();
	            //     }.bind(this),clocktime);
	            // }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var time = this.state.value || this.props.timeValue || 0;
	            // time = time==120?90:time;
	            var left = 100 * time / 60 + '%';
	            var mLeft = '-' + 22 * time / 60 + 'px';
	            return React.createElement(
	                "section",
	                { className: "clockpick" },
	                React.createElement(
	                    "section",
	                    { className: "clock" },
	                    React.createElement("input", { type: "range", min: "0", max: "60", step: "1", value: time, onTouchEnd: this.submitTime.bind(this), onChange: this.rangechange.bind(this) }),
	                    React.createElement("span", { className: "slider-on" }),
	                    React.createElement("span", { className: "rangeblock-on", style: { left: left, marginLeft: mLeft } }),
	                    this.items.map(function (item, index) {
	                        return React.createElement(
	                            "label",
	                            { className: 'stallName' + index, style: { left: 100 * index / 3 + '%' }, key: index },
	                            item.name
	                        );
	                    }),
	                    React.createElement(
	                        "div",
	                        { className: "toast", style: { visibility: this.state.toastShow ? 'visible' : 'hidden', opacity: this.state.opacity } },
	                        '您选择的是' + time + '分钟'
	                    )
	                )
	            );
	        }
	    }]);

	    return ClockPick;
	}(React.Component);

	;

/***/ }
/******/ ]);