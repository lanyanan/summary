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

	var _TimeSelect = __webpack_require__(8);

	var _ModeSelect = __webpack_require__(9);

	var _Swicth = __webpack_require__(10);

	var _LightCh = __webpack_require__(11);

	var _SettingButton = __webpack_require__(12);

	var _SettingButton2 = _interopRequireDefault(_SettingButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;
	// alert(document.documentElement.clientWidth);

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: false,
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    _Actions.Actions.repaint(data);
	});

	/**
	* 将档位的字符串转化为对应的数字
	**/
	//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-绿光，9-蓝光
	function stringToGear(gearString) {
	    var value = "";
	    switch (gearString) {
	        case '关闭':
	            value = 0;break;
	        case '关':
	            value = 0;break;
	        case '1档':
	            value = 1;break;
	        case '2档':
	            value = 2;break;
	        case '3档':
	            value = 3;break;
	        case '4档':
	            value = 4;break;
	        case '5档':
	            value = 5;break;
	        case '开':
	            value = 6;break;
	        case '红光':
	            value = 7;break;
	        case '蓝光':
	            value = 8;break;
	        case '绿光':
	            value = 9;break;
	        default:
	            value = '';break;
	    }
	    return value;
	}

	/**
	* 将档位的数字转化为对应的字符串
	**/
	//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-绿光，9-蓝光
	function gearToString(gear) {
	    var value = "";
	    switch (gear) {
	        case 0:
	            value = '关闭';break;
	        case 1:
	            value = '1档';break;
	        case 2:
	            value = '2档';break;
	        case 3:
	            value = '3档';break;
	        case 4:
	            value = '4档';break;
	        case 5:
	            value = '5档';break;
	        case 6:
	            value = '开';break;
	        case 7:
	            value = '红光';break;
	        case 8:
	            value = '蓝光';break;
	        case 9:
	            value = '绿光';break;
	        default:
	            value = '';break;
	    }
	    return value;
	}
	/**
	* 将角标的数字转化为对应的字符串
	**/
	//0-没有角标 1-普通角标 2-红色角标
	function transCorner(value) {
	    var res = '';
	    switch (value) {
	        case 0:
	            res = 'corners';break;
	        case 1:
	            res = 'corner';break;
	        case 2:
	            res = 'redCorner';break;
	        default:
	            res = 'corners';break;
	    }
	    return res;
	}

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            modelIndex: 4, //模式自定义默认
	            soundGear: 0, //超声波默认
	            exportGear: 0, //导入导出档位默认
	            exportText: 0, //导入导出默认默认-导入
	            switchMode: 0, //按摩模式默认关
	            lightMode: 0, //灯光默认红
	            runTime: 5, //运行时间默认10
	            modeCorner: 1, //模式角标
	            soundCorner: 1, //超声波角标
	            exportCorner: 1, //导入导出角标
	            switchCorner: 1, //按摩角标
	            ligntCorner: 1, //灯光角标
	            timeCorner: 1, //运行时间角标
	            modeShow: false,
	            gearShow: false,
	            exportShow: false,
	            modelSwitchShow: false,
	            lightShow: false,
	            runTimeShow: false,
	            defaultSound: '1档', //超声波default档位
	            defaultExportText: '导入', //导入导出default描述
	            defaultExportGear: '1档', //导入导出default档位
	            defaultRunTime: 10 //运行时间default值
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'setMode',
	        value: function setMode(e) {
	            //模式选择
	            var busiSwitch = this.state.busiSwitch;
	            if (busiSwitch == 1) {
	                return false;
	            }
	            this.setState({
	                modeShow: true
	            });
	        }
	    }, {
	        key: 'closeMode',
	        value: function closeMode(e) {}
	    }, {
	        key: 'modeChoice',
	        value: function modeChoice() {
	            //超声波档位
	            var busiSwitch = this.state.busiSwitch;
	            var mode = this.state.modelIndex;
	            if (busiSwitch == 1 || mode != 4) {
	                return false;
	            }
	            var soundGear = this.state.soundGear;
	            var soundGearStr = gearToString(soundGear);
	            this.setState({
	                defaultSound: soundGearStr,
	                gearShow: true,
	                arrayInit: false
	            });
	        }
	    }, {
	        key: 'submitSoundGear',
	        value: function submitSoundGear(h, m) {
	            //超声波档位确认
	            var mode = this.state.modelIndex;
	            this.setState({
	                gearShow: false,
	                arrayInit: true
	            });
	            _Actions.Actions.setGear(mode, m);
	        }
	    }, {
	        key: 'export',
	        value: function _export() {
	            //导入导出
	            var busiSwitch = this.state.busiSwitch;
	            var mode = this.state.modelIndex;
	            if (busiSwitch == 1 || mode != 4) {
	                return false;
	            }
	            var exportText = this.state.exportText;
	            var exportGear = this.state.exportGear;
	            var exportTextStr = ['导入/导出', '导出', '导入'][exportText];
	            var exportGearStr = gearToString(exportGear);
	            this.setState({
	                defaultExportText: exportTextStr,
	                defaultExportGear: exportGearStr,
	                exportShow: true,
	                arrayInit: false
	            });
	        }
	    }, {
	        key: 'submitClockExport',
	        value: function submitClockExport(h, m) {
	            //导入导出档位确认
	            console.log('导入导出：', h, m);
	            var mode = this.state.modelIndex;
	            this.setState({
	                exportShow: false,
	                arrayInit: true
	            });
	            _Actions.Actions.setExport(mode, h, m);
	        }
	    }, {
	        key: 'modeOpen',
	        value: function modeOpen() {
	            //按摩模式设置
	            var busiSwitch = this.state.busiSwitch;
	            var mode = this.state.modelIndex;
	            if (busiSwitch == 1 || mode != 4) {
	                return false;
	            }
	            this.setState({
	                modelSwitchShow: true
	            });
	        }
	    }, {
	        key: 'modeLight',
	        value: function modeLight() {
	            //灯光模式设置
	            var busiSwitch = this.state.busiSwitch;
	            var mode = this.state.modelIndex;
	            if (busiSwitch == 1 || mode != 4) {
	                return false;
	            }
	            this.setState({
	                lightShow: true
	            });
	        }
	    }, {
	        key: 'openClick',
	        value: function openClick() {
	            //运行时间设置
	            var busiSwitch = this.state.busiSwitch;
	            var mode = this.state.modelIndex;
	            if (busiSwitch == 1 || mode != 4) {
	                return false;
	            }
	            var runTime = this.state.runTime;
	            this.setState({
	                defaultRunTime: runTime,
	                runTimeShow: true,
	                arrayInit: false
	            });
	        }
	    }, {
	        key: 'submitRunTime',
	        value: function submitRunTime(h, m) {
	            var mode = this.state.modelIndex;
	            _Actions.Actions.submitRunTime(mode, m);
	        }
	    }, {
	        key: 'swiSmart',
	        value: function swiSmart() {
	            //手动-智能模式切换
	            if (this.state.skinDataCode == 0) {
	                het.toast('您还未测试肤质，请先测试肤质！');
	                return;
	            }
	            var busiSwitch = this.state.busiSwitch;
	            busiSwitch == 0 ? busiSwitch = 1 : busiSwitch = 0;
	            _Actions.Actions.busiSwitch(busiSwitch);
	        }
	    }, {
	        key: 'submit',
	        value: function submit() {
	            //保存
	            _Actions.Actions.submit();
	        }
	    }, {
	        key: 'cancelClock',
	        value: function cancelClock() {
	            //时间空间取消操作
	            this.setState({
	                timeshow: false,
	                gearShow: false,
	                exportShow: false,
	                runTimeShow: false,
	                arrayInit: true
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            console.log("最终数据:", JSON.stringify(this.state));
	            var busiSwitch = this.state.busiSwitch; //切换手动 智能
	            var mode = parseInt(this.state.modelIndex); //1-清洁模式，2-回春模式,3-滋养模式,4-美白模式,5-手动模式
	            var modeName = ['清洁模式', '回春模式', '滋养模式', '美白模式', '自定义'][mode];
	            var soundGear = this.state.soundGear; //超声波档位
	            var soundGearBg = this.state.soundGear ? 'photo1' : 'soundGearOff';
	            var exportGear = this.state.exportGear; //导出档位
	            var exportText = this.state.exportText; //导入/导出描述
	            var exportName = ['导入/导出', '导出', '导入'][exportText];
	            var switchMode = this.state.switchMode == 6 ? 0 : 1; //按摩模式设置
	            var switchName = '按摩';
	            var lightMode = 0; //灯光设置
	            if (this.state.lightMode == 7) {
	                lightMode = 0;
	            } else if (this.state.lightMode == 8) {
	                lightMode = 1;
	            } else if (this.state.lightMode == 9) {
	                lightMode = 2;
	            } else {
	                lightMode = 3;
	            }
	            var lightName = ['红光', '蓝光', '绿光', '彩光'][lightMode];
	            var minute = this.state.runTime;
	            var corner = React.createElement('em', { className: 'corner' }); //模式角标
	            var otherCorner = React.createElement('div', null); //其他块角标

	            var upSection = [{ name: modeName, photo: 'photo0', corner: transCorner(this.state.modeCorner) }, { name: '超声波', photo: soundGearBg, corner: transCorner(this.state.soundCorner) }, { name: exportName, photo: 'photo2', corner: transCorner(this.state.exportCorner) }];
	            // console.log('upSection:',upSection);
	            var downSection = [{ name: switchName, photo: 'photo3', corner: transCorner(this.state.switchCorner) }, { name: lightName, photo: 'photo4', corner: transCorner(this.state.ligntCorner) }, { name: '时长', photo: 'photo5', corner: transCorner(this.state.timeCorner) }];
	            // console.log('downSection:',downSection);

	            var description = React.createElement('span', null); //智能推荐描述
	            var batteryOrLine = React.createElement('div', null); //设备电量低或者离线在线
	            if (this.state.skinDataCode == 0) {
	                description = React.createElement(
	                    'span',
	                    null,
	                    '\u672A\u6D4B\u80A4\u65E0\u6CD5\u4E3A\u60A8\u667A\u80FD\u63A8\u8350,\u4EE5\u4E0B\u4E3A\u8BBE\u5907\u9ED8\u8BA4\u503C',
	                    React.createElement(
	                        'a',
	                        { style: { color: '#007eff', display: 'block' }, href: 'cbeauty://cbeauty_single_skintest' },
	                        '\u8D76\u7D27\u53BB\u6D4B\u80A4>>'
	                    )
	                );
	            } else {
	                if (this.state.busiSwitch == 1) {
	                    description = React.createElement(
	                        'span',
	                        null,
	                        '\u6839\u636E\u80A4\u8D28\u4E3A\u60A8\u667A\u80FD\u63A8\u8350'
	                    );
	                } else {
	                    description = React.createElement(
	                        'span',
	                        null,
	                        '\u9009\u62E9\u4E00\u79CD\u6A21\u5F0F,\u8BBE\u7F6E\u5F69\u5149\u6863\u4F4D\u3001\u65F6\u957F'
	                    );
	                }
	            }
	            if (this.state.electricity <= 3 && this.state.electricity > 0) {
	                batteryOrLine = React.createElement('div', { className: 'low-battery' });
	            }
	            if (this.state.onlineStatus == 2) {
	                batteryOrLine = React.createElement('div', { className: 'out-line' });
	            }
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'indexTop' },
	                    React.createElement(
	                        'div',
	                        { className: 'indexImg' },
	                        batteryOrLine
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'smartSwitch' },
	                        React.createElement('div', { className: busiSwitch ? 'busiSwitch1' : 'busiSwitch0', onTouchTap: this.swiSmart.bind(this) })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'indexCon' },
	                    React.createElement(
	                        'div',
	                        { className: 'conTitle' },
	                        description
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'context flex' },
	                        upSection.map(function (item, index) {
	                            return React.createElement(
	                                'div',
	                                { 'data-index': index, key: index, className: 'flex-cell', onTouchTap: index == 1 ? _this2.modeChoice.bind(_this2) : index == 0 ? _this2.setMode.bind(_this2) : _this2.export.bind(_this2) },
	                                React.createElement(
	                                    'i',
	                                    { className: item.photo == 'photo0' ? item.photo + mode : item.photo == 'photo2' ? item.photo + exportText : item.photo, 'data-index': index },
	                                    index == 2 && exportGear != 0 ? React.createElement(
	                                        'a',
	                                        { className: 'minRight' },
	                                        exportGear,
	                                        '\u6863'
	                                    ) : '',
	                                    index == 1 && soundGear != 0 ? React.createElement(
	                                        'span',
	                                        { className: 'ultrasonic' },
	                                        soundGear,
	                                        React.createElement(
	                                            'em',
	                                            { className: 'dang' },
	                                            '\u6863'
	                                        )
	                                    ) : ''
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { 'data-index': index, className: 'cornerSpan' },
	                                    item.name,
	                                    React.createElement('em', { className: item.corner })
	                                )
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'context contexts flex' },
	                        downSection.map(function (item, index) {
	                            return React.createElement(
	                                'div',
	                                { 'data-index': index, key: index, className: 'flex-cell', onTouchTap: index == 2 ? _this2.openClick.bind(_this2) : index == 0 ? _this2.modeOpen.bind(_this2) : _this2.modeLight.bind(_this2) },
	                                React.createElement(
	                                    'i',
	                                    { className: item.photo == 'photo3' ? item.photo + switchMode : item.photo == 'photo4' ? item.photo + lightMode : item.photo, 'data-index': index },
	                                    item.name == '时长' ? React.createElement(
	                                        'a',
	                                        { className: 'minRight' },
	                                        minute,
	                                        'min'
	                                    ) : ''
	                                ),
	                                React.createElement(
	                                    'span',
	                                    { 'data-index': index, className: 'cornerSpan' },
	                                    item.name,
	                                    React.createElement('em', { className: item.corner })
	                                )
	                            );
	                        })
	                    ),
	                    React.createElement('div', { className: 'border' }),
	                    React.createElement(
	                        'div',
	                        { id: 'footer' },
	                        React.createElement(_SettingButton2.default, { settingStatus: this.state.needSave ? 'on' : 'off', callback: this.submit.bind(this) })
	                    )
	                ),
	                React.createElement(_ModeSelect.ModeSelect, { modeShow: this.state.modeShow, modelIndex: this.state.modelIndex }),
	                React.createElement(_TimeSelect.TimeSelect, { hourshow: false, minuteshow: true, defaultminute: this.state.defaultSound, cancelClock: this.cancelClock.bind(this), arrayInit: this.state.arrayInit,
	                    submitClock: this.submitSoundGear.bind(this), show: this.state.gearShow, minutearr: ['关闭', '1档', '2档', '3档', '4档', '5档'] }),
	                React.createElement(_TimeSelect.TimeSelect, { hourshow: true, minuteshow: true, arrayInit: this.state.arrayInit,
	                    defaulthour: this.state.defaultExportText, defaultminute: this.state.defaultExportGear, cancelClock: this.cancelClock.bind(this),
	                    submitClock: this.submitClockExport.bind(this), show: this.state.exportShow, hourarray: ['导入', '导出'], minutearr: ['关闭', '1档', '2档', '3档', '4档', '5档'] }),
	                React.createElement(_Swicth.Swicth, { switchShow: this.state.modelSwitchShow, swicthIndex: switchMode, mode: this.state.modelIndex }),
	                React.createElement(_LightCh.LightCh, { lightShow: this.state.lightShow, lightIndex: lightMode, mode: this.state.modelIndex }),
	                React.createElement(_TimeSelect.TimeSelect, { hourshow: false, minuteshow: true, defaultminute: this.state.defaultRunTime, arrayInit: this.state.arrayInit,
	                    cancelClock: this.cancelClock.bind(this), minuteText: 'min', submitClock: this.submitRunTime.bind(this), show: this.state.runTimeShow, minutearr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19] })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('彩光导入仪');
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
	'setMode', //设置模式
	'setGear', //选择档位
	'setExport', //选择导入导出
	'modeSwicth', //取消开关
	'setLight', //取消灯光
	'busiSwitch', //手动 智能切换
	'submitRunTime', //运行时间确认
	'submit']);

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

	var _fun = __webpack_require__(6);

	var _Actions = __webpack_require__(4);

	var AppData = {};
	var needSave = false;
	//modelIndex:0-清洁,1-回春,2-滋养,3-美白,4-自定义
	//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-蓝，9-绿
	//exportText:0-导入/导出 1-导出 2-导入
	//(modeCorner,soundCorner,exportCorner,switchCorner,ligntCorner,timeCorner) 0-没有角标 1-普通角标 2-红色角标
	var configData = [{ modelIndex: 0, soundGear: 3, exportGear: 3, exportText: 1, switchMode: 6, lightMode: 8, runTime: 15, modeCorner: 1, soundCorner: 0, exportCorner: 0, switchCorner: 0, ligntCorner: 0, timeCorner: 0 }, { modelIndex: 1, soundGear: 0, exportGear: 3, exportText: 2, switchMode: 6, lightMode: 9, runTime: 10, modeCorner: 1, soundCorner: 0, exportCorner: 0, switchCorner: 0, ligntCorner: 0, timeCorner: 0 }, { modelIndex: 2, soundGear: 0, exportGear: 3, exportText: 2, switchMode: 6, lightMode: 7, runTime: 15, modeCorner: 1, soundCorner: 0, exportCorner: 0, switchCorner: 0, ligntCorner: 0, timeCorner: 0 }, { modelIndex: 3, soundGear: 3, exportGear: 3, exportText: 1, switchMode: 6, lightMode: 9, runTime: 13, modeCorner: 1, soundCorner: 0, exportCorner: 0, switchCorner: 0, ligntCorner: 0, timeCorner: 0 }, { modelIndex: 4, soundGear: 0, exportGear: 0, exportText: 0, switchMode: 0, lightMode: 0, runTime: 5, modeCorner: 1, soundCorner: 1, exportCorner: 1, switchCorner: 1, ligntCorner: 1, timeCorner: 1 }];

	//默认设置的角标信息
	var configCorner = [{ modeCorner: 1, soundCorner: 0, exportCorner: 0, switchCorner: 0, ligntCorner: 0, timeCorner: 0, needSave: false }, { modeCorner: 1, soundCorner: 1, exportCorner: 1, switchCorner: 1, ligntCorner: 1, timeCorner: 1, needSave: false }, { modeCorner: 0, soundCorner: 0, exportCorner: 0, switchCorner: 0, ligntCorner: 0, timeCorner: 0, needSave: false }];
	/**
	* 将档位的字符串转化为对应的数字
	**/
	//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-蓝，9-绿
	function stringToGear(gearString) {
	    var value = "";
	    switch (gearString) {
	        case 0:
	            value = 0;break;
	        case '关闭':
	            value = 0;break;
	        case '关':
	            value = 0;break;
	        case '导入':
	            value = 2;break;
	        case '导出':
	            value = 1;break;
	        case '1档':
	            value = 1;break;
	        case '2档':
	            value = 2;break;
	        case '3档':
	            value = 3;break;
	        case '4档':
	            value = 4;break;
	        case '5档':
	            value = 5;break;
	        case '开':
	            value = 6;break;
	        case '红光':
	            value = 7;break;
	        case '蓝光':
	            value = 8;break;
	        case '绿光':
	            value = 9;break;
	        default:
	            value = '';break;
	    }
	    return value;
	}

	/**
	* 将档位的数字转化为对应的字符串
	**/
	//0-关，1-1档，2-2档，3-3档，4-4档，5-5档，6-开，7-红，8-绿光，9-蓝光
	function gearToString(gear) {
	    var value = "";
	    switch (gear) {
	        case 0:
	            value = '关闭';break;
	        case 1:
	            value = '1档';break;
	        case 2:
	            value = '2档';break;
	        case 3:
	            value = '3档';break;
	        case 4:
	            value = '4档';break;
	        case 5:
	            value = '5档';break;
	        case 6:
	            value = '开';break;
	        case 7:
	            value = '红光';break;
	        case 8:
	            value = '蓝光';break;
	        case 9:
	            value = '绿光';break;
	        default:
	            value = '';break;
	    }
	    return value;
	}

	/**
	* 获取当前运行模式,智能开关位,电量,离线等信息
	**/
	function getAppData() {
	    // let modelIndex;
	    // AppData.busiSwitch ? modelIndex = AppData.mode : modelIndex = AppData.currentRunMode;
	    return {
	        mode: AppData.mode,
	        // modelIndex: AppData.modelIndex,
	        busiSwitch: AppData.busiSwitch,
	        skinDataCode: AppData.skinDataCode,
	        electricity: AppData.electricity,
	        onlineStatus: AppData.onlineStatus,
	        chargeStatus: AppData.chargeStatus,
	        needSave: needSave
	    };
	}

	/**
	* 转换gear信息
	**/
	function transGear(data) {
	    if (data.gears1 === undefined) {
	        return;
	    }
	    var modelIndex = void 0;
	    var exportText = void 0;
	    modelIndex = data.currentRunMode - 1;
	    if (data.gears2) {
	        exportText = 1;
	    } else if (data.gears3) {
	        exportText = 2;
	    } else {
	        exportText = 0;
	    }
	    return {
	        modelIndex: modelIndex,
	        soundGear: data.gears1,
	        exportGear: data.gears2 || data.gears3,
	        exportText: exportText,
	        switchMode: data.gears4,
	        lightMode: data.gears5,
	        runTime: data.runTime
	    };
	}
	/**
	* 获取每个档位的角标信息
	**/
	//(modeCorner,soundCorner,exportCorner,switchCorner,ligntCorner,timeCorner) 0-没有角标 1-普通角标 2-红色角标       
	function getCorner(index) {
	    return {
	        modeCorner: configData[index].modeCorner,
	        soundCorner: configData[index].soundCorner,
	        exportCorner: configData[index].exportCorner,
	        switchCorner: configData[index].switchCorner,
	        ligntCorner: configData[index].ligntCorner,
	        timeCorner: configData[index].timeCorner
	    };
	}

	/**
	* 保存成功重置各个模式的角标信息
	**/
	function resetCorner(index) {
	    var mode = void 0;
	    configData.map(function (item, index) {
	        if (index == 4) {
	            item.modeCorner = 1;
	            item.soundCorner = 1;
	            item.exportCorner = 1;
	            item.switchCorner = 1;
	            item.ligntCorner = 1;
	            item.timeCorner = 1;
	        } else {
	            item.modeCorner = 1;
	            item.soundCorner = 0;
	            item.exportCorner = 0;
	            item.switchCorner = 0;
	            item.ligntCorner = 0;
	            item.timeCorner = 0;
	        }
	    });
	    if (AppData.busiSwitch == 1) {
	        mode = configCorner[2];
	    } else {
	        index == 4 ? mode = configCorner[1] : mode = configCorner[0];
	    }
	    AppData.currentRunConfig = _fun.Funs._extends(AppData.currentRunConfig, mode);
	    return mode;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        console.log('nnnnnnnnns-----', data);

	        AppData.electricity = typeof data.electricity !== 'undefined' ? data.electricity : AppData.electricity;
	        AppData.onlineStatus = typeof data.onlineStatus !== 'undefined' ? data.onlineStatus : AppData.onlineStatus;
	        AppData.chargeStatus = typeof data.chargeStatus !== 'undefined' ? data.chargeStatus : AppData.chargeStatus;

	        if (!needSave) {
	            //无需要保存的数据
	            if (data.currentRunConfig) {
	                AppData.currentRunConfig = transGear(data.currentRunConfig);
	                AppData.currentRunConfig.modelIndex = data.currentRunMode - 1;
	                if (data.currentRunMode - 1 == 4) {
	                    configData[4] = _fun.Funs._extends(configData[4], AppData.currentRunConfig);
	                    AppData.currentRunConfig = _fun.Funs._extends(AppData.currentRunConfig, configData[4]);
	                }
	                console.log('AppData.currentRunConfig:', JSON.stringify(AppData.currentRunConfig));
	            }
	            if (data.importExportConfig) {
	                AppData.importExportConfig = transGear(data.importExportConfig);
	                AppData.importExportConfig.modelIndex = data.mode - 1;
	                AppData.importExportConfig.modeCorner = 0;
	                AppData.importExportConfig.soundCorner = 0;
	                AppData.importExportConfig.exportCorner = 0;
	                AppData.importExportConfig.switchCorner = 0;
	                AppData.importExportConfig.ligntCorner = 0;
	                AppData.importExportConfig.timeCorner = 0;
	                console.log('AppData.importExportConfig:', JSON.stringify(AppData.importExportConfig));
	            }
	            AppData.mode = typeof data.mode !== 'undefined' ? data.mode : AppData.mode;
	            AppData.currentRunMode = typeof data.currentRunMode !== 'undefined' ? data.currentRunMode : AppData.currentRunMode;
	            AppData.busiSwitch = typeof data.busiSwitch !== 'undefined' ? data.busiSwitch : AppData.busiSwitch;
	            AppData.skinDataCode = typeof data.skinDataCode !== 'undefined' ? data.skinDataCode : AppData.skinDataCode;
	            // AppData.busiSwitch == 1 ? AppData.modelIndex = AppData.mode-1 : AppData.modelIndex = AppData.currentRunMode-1;
	            if (AppData.busiSwitch == 1) {
	                var data1 = getAppData();
	                var tempData = _fun.Funs._extends(AppData.importExportConfig, data1);
	                this.trigger(tempData);
	            } else {
	                var _data = getAppData();
	                AppData.currentRunConfig = _fun.Funs._extends({}, AppData.currentRunConfig, transGear(data));
	                var corner = getCorner(AppData.currentRunConfig.modelIndex);
	                if (AppData.currentRunConfig.modelIndex == 4) {
	                    configData[4] = _fun.Funs._extends({}, configData[4], transGear(data));
	                }
	                console.log('收到新数据的：', JSON.stringify(AppData.currentRunConfig));
	                AppData.currentRunConfig = _fun.Funs._extends({}, configData[AppData.modelIndex], AppData.currentRunConfig, corner);
	                console.log('合并configData数据的：', JSON.stringify(AppData.currentRunConfig));
	                _data = _fun.Funs._extends(AppData.currentRunConfig, _data);
	                // console.log('AppData.currentRunConfig2222',configData);
	                this.trigger(_data);
	            }
	        } else {
	            //有数据保存时
	            if (AppData.busiSwitch == 1) {
	                var _data2 = getAppData();
	                var _tempData = _fun.Funs._extends(AppData.importExportConfig, _data2);
	                this.trigger(_tempData);
	            } else {
	                var _data3 = getAppData();
	                var _tempData2 = _fun.Funs._extends(AppData.currentRunConfig, _data3);
	                this.trigger(_tempData2);
	            }
	        }
	    },
	    onSetMode: function onSetMode(mode) {
	        //模式选择
	        var oldMode = AppData.currentRunConfig.modelIndex;
	        if (mode != oldMode) {
	            AppData.updateFlag |= Math.pow(2, 0);
	            configData[mode].modeCorner = 2;
	            needSave = true;
	        } else {
	            needSave ? needSave = true : needSave = false;
	        }
	        var tempData = {
	            modeShow: false
	        };
	        AppData.modelIndex = mode;
	        var data1 = getAppData();
	        AppData.currentRunConfig = _fun.Funs._extends({}, AppData.currentRunConfig, configData[mode]);
	        tempData = _fun.Funs._extends({}, AppData.currentRunConfig, data1, tempData);
	        this.trigger(tempData);
	    },
	    onSetGear: function onSetGear(mode, gear) {
	        //超声波模式选择
	        var oldSound = AppData.currentRunConfig.soundGear;
	        if (stringToGear(gear) != oldSound) {
	            AppData.updateFlag |= Math.pow(2, 1);
	            configData[mode].soundCorner = 2;
	            needSave = true;
	        } else {
	            needSave ? needSave = true : needSave = false;
	        }
	        configData[mode].soundGear = stringToGear(gear);
	        var tempData = void 0;
	        var data1 = getAppData();
	        AppData.currentRunConfig = _fun.Funs._extends({}, AppData.currentRunConfig, configData[mode]);
	        tempData = _fun.Funs._extends(AppData.currentRunConfig, data1);
	        this.trigger(tempData);
	    },
	    onSetExport: function onSetExport(mode, h, m) {
	        //导入导出设置
	        var oldExpText = AppData.currentRunConfig.exportText;
	        var oldExpGear = AppData.currentRunConfig.exportGear;
	        if (oldExpText != stringToGear(h) || oldExpGear != stringToGear(m)) {
	            AppData.updateFlag |= Math.pow(2, 2);
	            AppData.updateFlag |= Math.pow(2, 3);
	            configData[mode].exportCorner = 2;
	            needSave = true;
	        } else {
	            needSave ? needSave = true : needSave = false;
	        }
	        if (stringToGear(m) == 0) {
	            configData[mode].exportGear = 0;
	            configData[mode].exportText = 0;
	        } else {
	            configData[mode].exportGear = stringToGear(m);
	            configData[mode].exportText = h == '导出' ? 1 : 2;
	        }
	        var data1 = getAppData();
	        AppData.currentRunConfig = _fun.Funs._extends({}, AppData.currentRunConfig, configData[mode]);
	        var tempData = _fun.Funs._extends(AppData.currentRunConfig, data1);
	        this.trigger(tempData);
	    },
	    onModeSwicth: function onModeSwicth(mode, modeOpen) {
	        //按摩模式设置
	        var oldSwitch = AppData.currentRunConfig.switchMode;
	        var newSwitch = modeOpen ? 0 : 6;
	        if (oldSwitch != newSwitch) {
	            AppData.updateFlag |= Math.pow(2, 4);
	            configData[mode].switchCorner = 2;
	            needSave = true;
	        } else {
	            needSave ? needSave = true : needSave = false;
	        }
	        configData[mode].switchMode = newSwitch;
	        var tempData = {
	            modelSwitchShow: false
	        };
	        var data1 = getAppData();
	        AppData.currentRunConfig = _fun.Funs._extends({}, AppData.currentRunConfig, configData[mode]);
	        tempData = _fun.Funs._extends({}, AppData.currentRunConfig, data1, tempData);
	        this.trigger(tempData);
	    },
	    onSetLight: function onSetLight(mode, modeLight) {
	        //灯光设置
	        var oldLight = AppData.currentRunConfig.lightMode;
	        var light = void 0;
	        switch (modeLight) {
	            case 0:
	                light = 7;break;
	            case 1:
	                light = 8;break;
	            case 2:
	                light = 9;break;
	            default:
	                light = 0;break;
	        }
	        if (light != oldLight) {
	            AppData.updateFlag |= Math.pow(2, 5);
	            configData[mode].ligntCorner = 2;
	            needSave = true;
	        } else {
	            needSave ? needSave = true : needSave = false;
	        }
	        var tempData = {
	            lightShow: false
	        };
	        configData[mode].lightMode = light;
	        var data1 = getAppData();
	        AppData.currentRunConfig = _fun.Funs._extends({}, AppData.currentRunConfig, configData[mode]);
	        tempData = _fun.Funs._extends({}, AppData.currentRunConfig, data1, tempData);
	        this.trigger(tempData);
	    },
	    onSubmitRunTime: function onSubmitRunTime(mode, time) {
	        //运行时间设置
	        var oldRunTime = AppData.currentRunConfig.runTime;
	        if (oldRunTime != time) {
	            AppData.updateFlag |= Math.pow(2, 6);
	            configData[mode].timeCorner = 2;
	            needSave = true;
	        } else {
	            needSave ? needSave = true : needSave = false;
	        }
	        var tempData = {
	            runTimeShow: false
	        };
	        configData[mode].runTime = time;
	        var data1 = getAppData();
	        AppData.currentRunConfig = _fun.Funs._extends({}, AppData.currentRunConfig, configData[mode]);
	        tempData = _fun.Funs._extends(AppData.currentRunConfig, data1, tempData);
	        this.trigger(tempData);
	    },

	    //手动智能切换
	    onBusiSwitch: function onBusiSwitch(busiSwitch) {
	        needSave = true;
	        AppData.busiSwitch = busiSwitch;
	        AppData.updateFlag |= Math.pow(2, 2);
	        var corner = void 0;
	        if (busiSwitch == 1) {
	            var recommend = AppData.importExportConfig;
	            var data = getAppData();
	            var runData = _fun.Funs._extends(recommend, data);
	            this.trigger(runData);
	        } else {
	            corner = getCorner(AppData.currentRunConfig.modelIndex);
	            var current = AppData.currentRunConfig;
	            var _data4 = getAppData();
	            var _runData = _fun.Funs._extends(current, _data4, corner);
	            this.trigger(_runData);
	        }
	    },
	    onSubmit: function onSubmit() {
	        var _this = this;

	        var sendData = {};
	        var tempData = void 0;
	        if (AppData.busiSwitch == 1) {
	            tempData = AppData.importExportConfig;
	        } else {
	            tempData = AppData.currentRunConfig;
	        }
	        console.log('123123212', JSON.stringify(tempData));
	        sendData.gears1 = tempData.soundGear;
	        if (tempData.exportText == 0) {
	            sendData.gears2 = tempData.exportGear;
	            sendData.gears3 = tempData.exportGear;
	        } else if (tempData.exportText == 1) {
	            sendData.gears2 = tempData.exportGear;
	            sendData.gears3 = 0;
	        } else {
	            sendData.gears2 = 0;
	            sendData.gears3 = tempData.exportGear;
	        }
	        sendData.gears4 = tempData.switchMode;
	        sendData.gears5 = tempData.lightMode;
	        sendData.runTime = tempData.runTime;
	        sendData.busiSwitch = AppData.busiSwitch;
	        sendData.configMode = tempData.modelIndex + 1;
	        sendData.updateFlag = AppData.updateFlag;
	        console.log('sendData:', sendData);
	        needSave = false;
	        var triggerData = resetCorner(tempData.modelIndex);
	        this.trigger(triggerData);
	        het.send(sendData, function (data) {
	            het.toast('同步成功！');
	            needSave = false;
	            _this.trigger(triggerData);
	        }, function (data) {
	            het.toast('同步失败！');
	            needSave = true;
	            var tempData = _fun.Funs._extends({}, triggerData, { needSave: true });
	            _this.trigger(tempData);
	        });
	        AppData.updateFlag = 0;
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
				showOpacity: 1,
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
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.maxhour != this.props.maxhour || next.arrayInit === true || next.defaulthour != this.props.defaulthour || next.defaultminute != this.props.defaultminute) {
				this.timearrInit(next);
			}
			var showOpacity = this.state.showOpacity;
			if (next.show != this.props.show) {
				if (next.show == true) {
					this.setState({ timeDisplay: true });
				} else if (next.show == false) {
					this.setState({ timeDisplay: false });
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
			// let statusname = this.props.statusname || '关闭';
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
			var minuteText = this.props.minuteText;
			return React.createElement(
				'section',
				{ style: { display: this.state.timeDisplay ? "block" : "none" }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault, onTouchStart: this.endDefault },
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
							React.createElement('span', { className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } }),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 55 + '%' } },
								minuteText
							),
							'            '
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 20 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
							React.createElement(
								'span',
								{ className: hourindex - 3 < 0 ? 'line4' : 'line4' },
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
								{ className: hourindex + 3 >= hourarr.length ? 'line4' : 'line4' },
								hourindex + 3 >= hourarr.length ? '' : hourarr[hourindex + 3]
							)
						),
						React.createElement(
							'section',
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 58 + '%' : 45 + '%' } },
							React.createElement(
								'span',
								{ className: minuteindex - 3 < 0 ? 'line4' : 'line4' },
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
								{ className: minuteindex + 3 >= minutearr.length ? 'line4' : 'line4' },
								minuteindex + 3 >= minutearr.length ? '' : minutearr[minuteindex + 3]
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ModeSelect = undefined;

	var _Actions = __webpack_require__(4);

	var ModeSelect = exports.ModeSelect = React.createClass({
		displayName: 'ModeSelect',

		getInitialState: function getInitialState() {
			return {
				modeShow: false
			};
		},
		cancelMode: function cancelMode() {
			var mode = this.state.modelIndex;
			_Actions.Actions.setMode(mode);
		},
		modeAct: function modeAct(e) {
			var target = parseInt(e.currentTarget.getAttribute('data-index'));
			_Actions.Actions.setMode(target);
			e.stopPropagation();
			e.preventDefault();
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			this.setState({
				modelIndex: next.modelIndex,
				modelShow: next.modeShow
			});
		},
		render: function render() {
			var _this = this;

			var modeAct = this.state.modelIndex;
			var modeShow = this.state.modelShow ? "modeSelect" : "modeShow";
			return React.createElement(
				'section',
				{ className: modeShow },
				React.createElement('section', { onTouchTap: this.cancelMode, className: 'canBG' }),
				React.createElement(
					'section',
					{ className: 'modeCon' },
					[{ name: '清洁' }, { name: '回春' }, { name: '滋养' }, { name: '美白' }, { name: '自定义' }].map(function (item, index) {
						return React.createElement(
							'span',
							{ 'data-index': index, key: index, onTouchTap: _this.modeAct, className: 'modeSpan' },
							item.name,
							modeAct == index ? React.createElement('i', null) : ''
						);
					})
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
	exports.Swicth = undefined;

	var _Actions = __webpack_require__(4);

	var Swicth = exports.Swicth = React.createClass({
		displayName: 'Swicth',

		getInitialState: function getInitialState() {
			return {
				modeSwicth: 0
			};
		},
		modeSwicth: function modeSwicth() {
			var modelIndex = this.state.mode;
			var target = this.state.modeIndex;
			_Actions.Actions.modeSwicth(modelIndex, target);
		},
		modeSwi: function modeSwi(e) {
			var target = parseInt(e.currentTarget.getAttribute('data-index'));
			var modelIndex = this.state.mode;
			_Actions.Actions.modeSwicth(modelIndex, target);
			e.stopPropagation();
			e.preventDefault();
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			this.setState({
				modeIndex: next.swicthIndex,
				modelSwitchShow: next.switchShow,
				mode: next.mode
			});
		},
		render: function render() {
			var _this = this;

			var modeSwicth = this.state.modeIndex;
			var modeOpen = this.state.modelSwitchShow ? "modeOpen" : "modeClose";
			return React.createElement(
				'section',
				{ className: modeOpen },
				React.createElement('section', { onTouchTap: this.modeSwicth, className: 'canBG' }),
				React.createElement(
					'section',
					{ className: 'modeCon modeOpenBG' },
					[{ name: '开' }, { name: '关' }].map(function (item, index) {
						return React.createElement(
							'span',
							{ 'data-index': index, key: index, onTouchTap: _this.modeSwi, className: 'modeSpan' },
							item.name,
							modeSwicth == index ? React.createElement('i', null) : ''
						);
					})
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
	exports.LightCh = undefined;

	var _Actions = __webpack_require__(4);

	var LightCh = exports.LightCh = React.createClass({
		displayName: 'LightCh',

		getInitialState: function getInitialState() {
			return {
				modeLight: 1
			};
		},
		modeSwicth: function modeSwicth() {
			var target = this.state.lightIndex;
			var mode = this.state.mode;
			_Actions.Actions.setLight(mode, target);
		},
		modeSwi: function modeSwi(e) {
			var target = parseInt(e.currentTarget.getAttribute('data-index'));
			var mode = this.state.mode;
			_Actions.Actions.setLight(mode, target);
			e.stopPropagation();
			e.preventDefault();
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			this.setState({
				mode: next.mode,
				lightShow: next.lightShow,
				lightIndex: next.lightIndex
			});
		},
		render: function render() {
			var _this = this;

			var lightIndex = this.state.lightIndex;
			var lightOpen = this.state.lightShow ? "lightOpen" : "lightClose";
			return React.createElement(
				'section',
				{ className: lightOpen },
				React.createElement('section', { onTouchTap: this.modeSwicth, className: 'canBG' }),
				React.createElement(
					'section',
					{ className: 'modeCon lightOpenBG' },
					[{ name: '红光' }, { name: '蓝光' }, { name: '绿光' }, { name: '关闭' }].map(function (item, index) {
						return React.createElement(
							'span',
							{ 'data-index': index, key: index, onTouchTap: _this.modeSwi, className: 'modeSpan' },
							item.name,
							lightIndex == index ? React.createElement('i', null) : ''
						);
					})
				)
			);
		}
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 保存设置按钮组件
	 * @prop {string} settingStatus  设置按钮状态
	 * @act  {function} this.props.callback 点击保存时触发
	 */
	var SettingButton = React.createClass({
	    displayName: 'SettingButton',

	    getInitialState: function getInitialState() {
	        return {
	            valueH: 0
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            settingBtnStatus: nextProps.settingStatus
	        });
	    },
	    TouchStart: function TouchStart(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        var startY = parseInt(e.touches[0].clientY);
	        var oldValue = parseInt(this.state.valueH);
	        // var status = this.state.settingBtnStatus=='active'?'on':'active';
	        this.setState({
	            startY: startY,
	            oldValue: oldValue
	        });
	    },
	    TouchMove: function TouchMove(e) {
	        if (this.state.settingBtnStatus == 'off') return;
	        var newY = parseInt(e.touches[0].clientY);
	        var oldY = parseInt(this.state.startY);
	        var valueH = parseInt(this.state.oldValue) + newY - oldY;
	        this.setState({
	            newY: newY,
	            valueH: valueH
	        });
	    },
	    TouchEnd: function TouchEnd(e) {
	        var _this = this;
	        if (_this.state.settingBtnStatus == 'off') return;
	        var newY = _this.state.newY || this.state.startY;
	        var disY = newY - _this.state.startY;
	        var offsetValue = parseInt(_this.state.oldValue);
	        var oldValue = parseInt(_this.state.valueH);
	        var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
	        if (offset <= 20) {
	            var status = _this.state.settingBtnStatus == 'active' ? 'on' : 'active';
	            _this.setState({
	                settingBtnStatus: status
	            });
	            clearInterval(_this.timer);
	            _this.timer = setTimeout(function () {
	                if (typeof _this.props.callback === 'function') {
	                    _this.props.callback();
	                }
	            }, 50);
	        } else {
	            return;
	        }
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        clearInterval(this.timer);
	    },
	    render: function render() {
	        var idx = this.state.settingBtnStatus || this.props.settingStatus || 'off';
	        return React.createElement(
	            'section',
	            { onTouchStart: this.TouchStart, onTouchMove: this.TouchMove, onTouchEnd: this.TouchEnd, className: "settingbtn-" + idx },
	            React.createElement(
	                'em',
	                null,
	                '\u4FDD\u5B58'
	            )
	        );
	    }
	});
	module.exports = SettingButton;

/***/ }
/******/ ]);