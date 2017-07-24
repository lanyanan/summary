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
	    hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        webDataMap: {
	            'childLock': 'lockSet',
	            'temp1': 'freezerTemp',
	            'temp2': 'refgTemp',
	            'mode': 'mode',
	            'power': 'refgSwitch',
	            'hour': 'freezerSetTime'
	        },
	        updateFlagMap: {
	            'mode': 9,
	            'temp2': 10,
	            'temp1': 12,
	            'hour': 13,
	            'power': 14,
	            'childLock': 16
	        },
	        renderConfigData: true,
	        filter: {
	            'childLock': 1,
	            'temp1': 0, // 冷冻室
	            'temp2': 0, // 冷藏室
	            'mode': 1,
	            'power': 1,
	            'hour': 1
	        }
	    });
	});

	// 接收app推送数据 
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
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

	        _this.handleLock = _this.handleLock.bind(_this);
	        _this.handleMode = _this.handleMode.bind(_this);
	        _this.handlePower = _this.handlePower.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleLock',
	        value: function handleLock(e) {
	            //处理童锁事件 (1-无，2-有)
	            if (this.state.online == 2) return false;
	            var childLock = this.state.childLock || 1;
	            childLock == 1 ? childLock = 2 : childLock = 1;
	            _Actions.Actions.lock(childLock);
	        }
	    }, {
	        key: 'handleMode',
	        value: function handleMode(e) {
	            //出来模式选择
	            if (this.state.childLock == 2 || this.state.online == 2) return false;
	            var mode = this.state.mode || 4;
	            // if(mode==5) mode =1;
	            if (++mode > 5) mode = 1;
	            _Actions.Actions.swicthMode(mode);
	        }
	    }, {
	        key: 'handlePower',
	        value: function handlePower(e) {
	            if (this.state.childLock == 2 || this.state.online == 2 || this.state.mode == 1) return false;
	            var power = this.state.power == 1 ? 2 : 1;
	            _Actions.Actions.switchPower(power);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var mode = this.state.mode || 4,
	                modeImgPath = '../static/img/btnlist/',
	                modeName = '智能模式',
	                lock = this.state.childLock == 2 ? '开启' : '关闭',
	                online = this.state.online || 1; //设备是否在线
	            switch (+mode) {
	                case 4:
	                    modeImgPath = modeImgPath + '3.png';modeName = '智能模式';break;
	                case 3:
	                    modeImgPath = modeImgPath + '4.png';modeName = '假日模式';break;
	                case 1:
	                    modeImgPath = modeImgPath + '5.png';modeName = '速冷模式';break;
	                case 2:
	                    modeImgPath = modeImgPath + '6.png';modeName = '速冻模式';break;
	                case 5:
	                    modeImgPath = modeImgPath + '9.png';modeName = '无模式';break;
	            }
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
	                    modeName,
	                    '\xA0\u513F\u7AE5\u9501:',
	                    lock,
	                    '\xA0\u51B7\u85CF\u5BA4:',
	                    this.state.temp2 == 255 ? '-' : this.state.temp2,
	                    '\u2103\xA0\u51B7\u51BB\u5BA4:',
	                    this.state.temp1 == 255 ? '-' : this.state.temp1,
	                    '\u2103'
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-1', onTouchEnd: this.handleLock },
	                        React.createElement('img', { src: this.state.childLock == 2 || this.state.childLock == 'undefined' ? "../static/img/btnlist/2.png" : "../static/img/btnlist/1.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u513F\u7AE5\u9501'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-2', onTouchEnd: this.handleMode },
	                        React.createElement('img', { style: this.state.childLock == 2 ? { opacity: 0.3 } : { opacity: 1 }, src: modeImgPath, alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            modeName
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell art-3', onTouchEnd: this.handlePower },
	                        React.createElement('img', { style: this.state.childLock == 2 ? { opacity: 0.3 } : { opacity: 1 }, src: this.state.power == 1 ? "../static/img/btnlist/8.png" : "../static/img/btnlist/7.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u51B7\u85CF\u5BA4'
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
	'lock', // 童锁
	'swicthMode', // 切换模式
	'switchPower', // 电源开关
	'adjustCold', // 调节冷藏室
	'adjustFreez', // 调节冷冻室
	'adjustTime' // 调节冷冻时间
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

	var currentMode = 5; // 记忆当前模式
	// 退出模式记忆
	var exitMode = {
	    mode: 5,
	    temp1: -18,
	    temp2: 5
	};
	// 模式基本设定
	var modes = {
	    // 速冷模式
	    1: {
	        mode: 1,
	        temp1: exitMode.temp1, // 冷冻室
	        temp2: 2, // 冷藏室
	        power: 2
	    },
	    // 速冻模式
	    2: {
	        mode: 2,
	        temp1: -24,
	        temp2: exitMode.temp2
	    },
	    // 假日模式
	    3: {
	        mode: 3,
	        temp1: -15,
	        temp2: 7
	    },
	    // 智能模式
	    4: {
	        mode: 4,
	        temp1: -18,
	        temp2: 5
	    },
	    // 退出模式
	    5: exitMode
	};

	// 记忆温度
	function memorizeTemp(key, value) {
	    var mode = key === 'temp1' ? 1 : 2;
	    exitMode[key] = value;
	    modes[mode][key] = value;
	};

	// 导出常量
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (typeof data.temp1 !== 'undefined') {
	            memorizeTemp('temp1', data.temp1);
	        }
	        if (typeof data.temp2 !== 'undefined') {
	            memorizeTemp('temp2', data.temp2);
	        }
	        if (typeof data.mode !== 'undefined') {
	            currentMode = data.mode;
	        }
	        if (currentMode == 2) {
	            // 冷冻模式只取预设温度
	            this.trigger(modes[currentMode]);
	        } else {
	            this.trigger(data);
	        }
	    },
	    onLock: function onLock(value) {
	        this.trigger({ childLock: value });
	        /*het.send({childLock: value}, (data)=>{},(data)=>{
	            het.toast("命令发送失败");
	        });*/
	    },
	    onSwicthMode: function onSwicthMode(value) {
	        currentMode = value;
	        this.trigger(modes[value]);
	        het.send(modes[value], function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSwitchPower: function onSwitchPower(value) {
	        this.trigger({ power: value });
	        het.send({ power: value }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onAdjustFreez: function onAdjustFreez(value) {
	        memorizeTemp('temp1', value);
	        if (currentMode === 1) {
	            this.trigger({ temp1: value });
	        } else {
	            this.trigger({ temp1: value, mode: 5 });
	        }
	        het.send({ temp1: value, mode: 5 }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onAdjustCold: function onAdjustCold(value) {
	        memorizeTemp('temp2', value);
	        if (currentMode === 2) {
	            this.trigger({ temp2: value });
	        } else {
	            this.trigger({ temp2: value, mode: 5 });
	        }
	        het.send({ temp2: value, mode: 5 }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onAdjustTime: function onAdjustTime(value) {
	        this.trigger({ hour: value });
	        het.send({ hour: value }, function (data) {}, function (data) {
	            het.toast("命令发送失败");
	        });
	    }
	});

/***/ }
/******/ ]);