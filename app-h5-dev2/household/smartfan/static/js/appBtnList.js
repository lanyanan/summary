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

	var appData = {};

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true, // 控制数据是否用于页面渲染
	        updateFlagMap: {},
	        filter: {
	            windStall: function windStall(type, data) {
	                if (type == 0 && data.boot == 1) {
	                    //关机的时候，全部取运行数据
	                    return false;
	                }
	                if (type == 0 && data.wind == 4) {
	                    //智能风的时候，取运行数据
	                    return false;
	                }
	                return true;
	            }
	        }
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

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _Store.Store.listen(function (data) {
	            return _this.setState(data);
	        }); // 监听Store

	        _this.handleSwitch = _this.handleSwitch.bind(_this);
	        _this.handleMode = _this.handleMode.bind(_this);
	        _this.handleShakeSwitch = _this.handleShakeSwitch.bind(_this);
	        _this.handleSelectRate = _this.handleSelectRate.bind(_this);

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'handleSwitch',
	        value: function handleSwitch(e) {
	            //处理开关机事件
	            // if(this.state.online==2){het.toast('设备已离线');return false;}
	            var boot = this.state.boot == 1 ? 2 : 1;
	            _Actions.Actions.switch(boot);
	        }
	    }, {
	        key: 'handleMode',
	        value: function handleMode(e) {
	            //出来模式选择
	            // if(this.state.online==2){het.toast('设备已离线');return false;}
	            if (this.state.boot == 1 || typeof this.state.boot == 'undefined') return false;
	            var windType = this.state.wind || 1;
	            if (++windType > 5) windType = 1;
	            _Actions.Actions.selectMode(windType);
	        }
	    }, {
	        key: 'handleShakeSwitch',
	        value: function handleShakeSwitch(e) {
	            // if(this.state.online==2){het.toast('设备已离线');return false;}
	            if (this.state.boot == 1 || typeof this.state.boot == 'undefined') return false;
	            var shookHeadStatus = this.state.shookHead == 1 ? 2 : 1;
	            _Actions.Actions.shakeSwitch(shookHeadStatus);
	        }
	    }, {
	        key: 'handleSelectRate',

	        /**
	         * 标准模式，在1，8，16，24切换，
	           自然风和睡眠风在1，2，3切换
	           智能风按钮不可用
	         */
	        value: function handleSelectRate(e) {
	            // if(this.state.online==2){het.toast('设备已离线');return false;}
	            if (this.state.boot == 1 || typeof this.state.boot == 'undefined') return false;
	            var windType = this.state.wind || 1;
	            var windStall = this.state.windStall || 1;
	            switch (+windType) {
	                case 1:
	                    {
	                        if (windStall != 1 && windStall != 8 && windStall != 16 && windStall != 24) windStall = 1;
	                        if (windStall == 1) {
	                            windStall = 8;
	                        } else if (windStall >= 24) {
	                            windStall = 1;
	                        } else {
	                            windStall = windStall + 8;
	                        }
	                        _Actions.Actions.selectRate(windStall);
	                        break;
	                    };
	                case 2:
	                case 3:
	                    {
	                        if (windStall >= 3) {
	                            windStall = 1;
	                        } else {
	                            windStall = ++windStall;
	                        }
	                        _Actions.Actions.selectRate(windStall);
	                        break;
	                    };
	                case 4:
	                case 5:
	                    return false;break;
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            //模式处理
	            var windType = this.state.wind || 1,
	                modeImgPathSrc = '../static/img/btnlist/',
	                modeImgPath = '../static/img/btnlist/2.png',
	                modeName = '标准风',
	                powerIdName = this.state.boot == 2 ? '开机' : '关机',
	                shookHeadStatusName = this.state.shookHead == 2 ? '开' : '关';
	            switch (+windType) {
	                case 1:
	                    modeImgPath = modeImgPathSrc + '2.png';modeName = '标准风';break;
	                case 2:
	                    modeImgPath = modeImgPathSrc + '3.png';modeName = '自然风';break;
	                case 3:
	                    modeImgPath = modeImgPathSrc + '4.png';modeName = '睡眠风';break;
	                case 4:
	                    modeImgPath = modeImgPathSrc + '5.png';modeName = '智能风';break;
	                case 5:
	                    modeImgPath = modeImgPathSrc + '6.png';modeName = '采集风';break;
	            }
	            //档位处理
	            var windStall = this.state.windStall || 1,
	                windImg = "../static/img/btnlist/9.png";
	            if (windType == 1) {
	                switch (+windStall) {
	                    case 1:
	                        windImg = "../static/img/btnlist/9.png";break;
	                    case 8:
	                        windImg = "../static/img/btnlist/10.png";break;
	                    case 16:
	                        windImg = "../static/img/btnlist/11.png";break;
	                    case 24:
	                        windImg = "../static/img/btnlist/12.png";break;
	                }
	            } else if (windType == 2 || windType == 3) {
	                switch (+windStall) {
	                    case 1:
	                        windImg = "../static/img/btnlist/9.png";break;
	                    case 2:
	                        windImg = "../static/img/btnlist/10.png";break;
	                    case 3:
	                        windImg = "../static/img/btnlist/11.png";break;
	                }
	            };
	            //智能风采集风时，档位标志
	            var isClick = true;
	            if (windType == 4 || windType == 5) {
	                isClick = false;
	            } else {
	                isClick = true;
	            }
	            return React.createElement(
	                'div',
	                null,
	                this.state.online == 2 ? React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    '设备已离线'
	                ) : React.createElement(
	                    'h1',
	                    { className: 'btn-title' },
	                    powerIdName,
	                    '  ',
	                    modeName,
	                    '  摇头:',
	                    shookHeadStatusName,
	                    '  档数:',
	                    windStall
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'flex btnlist' },
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleSwitch },
	                        React.createElement('img', { src: '../static/img/btnlist/1.png', alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            this.state.boot == 1 && this.state.boot != 'undefined' ? '开机' : '关机'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleMode },
	                        React.createElement('img', { style: this.state.boot == 1 ? { opacity: 0.5 } : { opacity: 1 }, src: modeImgPath, alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            modeName
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleShakeSwitch },
	                        React.createElement('img', { style: this.state.boot == 1 ? { opacity: 0.5 } : { opacity: 1 }, src: this.state.shookHead == 2 ? "../static/img/btnlist/7.png" : "../static/img/btnlist/8.png", alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '摇头'
	                        )
	                    ),
	                    React.createElement(
	                        'article',
	                        { className: 'flex-cell', onTouchEnd: this.handleSelectRate },
	                        React.createElement('img', { style: this.state.boot == 1 || !isClick ? { opacity: 0.5 } : { opacity: 1 }, src: windImg, alt: '' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            '档数'
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
	    het.setTitle('智能风扇');
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
	'switch', //开关机
	'shakeSwitch', //摇头开关
	'clockSwitch', //定时开关
	'selectTime', //选取定时时间
	'selectRate', //选取档位
	'selectMode', //选取模式
	'selectRateValue' //档位回显
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

	var isFault = function isFault() {
	    if (AppData.networkavailable == 2) {
	        return '请检查网络';
	    }
	    if (AppData.online == 2) {
	        return '设备已离线';
	    }
	    return false;
	};

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (data.online) AppData.online = data.online;
	        if (data.online == 2) {
	            data.boot = 1;
	        };
	        if (data.networkavailable) AppData.networkavailable = data.networkavailable;
	        if (data.wind) {
	            data.wind = data.wind % 8;
	        }
	        if (data.remainTimeH || data.remainTimeL) {
	            AppData.remaintime = data.remainTime = +data.remainTimeH * 256 + +data.remainTimeL;
	        }
	        if (data.windStall) {
	            AppData.windStall = data.windStall;
	        };
	        if (data.tip) AppData.tip = data.tip;
	        if (data.remainTime != 0) {
	            data.clockId = data.timingMode;
	        }
	        if (data.timingMode == 3) {
	            data.clockId = 3;
	        }
	        this.trigger(data);
	    },
	    onSwitch: function onSwitch(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.boot = value;
	        if (AppData.timingMode == 1 || AppData.timingMode == 2) {
	            AppData.timingMode = 3;
	            AppData.updateFlag = 3 * 256;
	        } else {
	            AppData.updateFlag = 1 * 256;
	        }
	        if (this.tclock) clearInterval(this.tclock);
	        this.trigger({ boot: value, clockId: 3, remainTimeL: 0, remainTimeH: 0, remainTime: 0, clockShow: 3, wind: 1, windStall: 1, shookHead: 1 });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onShakeSwitch: function onShakeSwitch(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.shookHead = value;
	        AppData.updateFlag = 32 * 256;
	        this.trigger({ shookHead: value });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        });
	    },
	    onClockSwitch: function onClockSwitch(value, type) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.timingMode = value;
	        if (value == 3 && type !== 'cancel') {
	            AppData.updateFlag = 2 * 256;
	            this.trigger({ clockId: value, clockShow: value, remainTime: 0, remainTimeL: 0, remainTimeH: 0 });
	            het.send(AppData, function (data) {
	                // console.log(data)
	            }, function (data) {
	                het.toast("命令发送失败");
	            });
	        } else {
	            this.trigger({ clockId: value, clockShow: value, remainTime: 0, remainTimeL: 0, remainTimeH: 0 });
	        }
	    },
	    onSelectTime: function onSelectTime(hour, minute) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        var remaintime = parseInt(hour * 60) + parseInt(minute);
	        AppData.tip = hour;
	        AppData.remaintime = remaintime;
	        AppData.updateFlag = 6 * 256;
	        this.trigger({ remainTime: remaintime, clockShow: 3 });
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	        // }
	    },
	    onSelectRate: function onSelectRate(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.windStall = value;
	        AppData.updateFlag = 16 * 256;
	        this.trigger({ windStall: value });
	        het.send(AppData, function (data) {
	            // console.log('调用了--onSelectRate')
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    },
	    onSelectRateValue: function onSelectRateValue(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        AppData.windStall = value;
	        // AppData.updateFlag = 16*256;
	        this.trigger({ windStall: value });
	    },
	    onSelectMode: function onSelectMode(value) {
	        if (isFault()) {
	            het.toast(isFault());return false;
	        };
	        var windStall = AppData.windStall;
	        AppData.wind = value;
	        AppData.updateFlag = 8 * 256;
	        this.trigger({ wind: value, windStall: windStall });
	        // AppData.windStall = 0;
	        het.send(AppData, function (data) {
	            // console.log(data)
	        }, function (data) {
	            het.toast("命令发送失败");
	        });
	    }
	});

/***/ }
/******/ ]);