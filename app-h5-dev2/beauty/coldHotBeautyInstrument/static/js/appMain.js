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

	var _Actions = __webpack_require__(2);

	var _App = __webpack_require__(3);

	// import {Helper} from './Helper.es6';
	// import {addDevice} from './addDevice.es6';

	// import {Funs} from '../../../common/src/fun.es6';
	// import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;
	// import {Store} from './Store.es6';

	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        callbackExpire: 40000,
	        debugMode: 'print', // 打印调试数据
	        renderConfigData: true,
	        filter: {
	            'electricity': 1
	        },
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// // 创建React组件
	// class App extends BaseComponent {
	//     constructor(props) {
	//         super(props);
	//         this.state = {};
	//         this.listenStore(Store); // 监听Store
	//     }
	//     render() {
	//         return <div>receive: {JSON.stringify(this.state)}</div>;
	//     }
	// }

	// 开始渲染
	het.domReady(function () {
	    het.setTitle('冷热美颜仪');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: _App.App })
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
	'changeMode', //切换智能手动模式
	'confirmMode', //手动模式下切换不同模式
	'confirmShock', //震动选择
	'submitHot', //改变热护理温度
	'submitCold', //改变冷护理温度
	'submitClock', //改变时长
	'submit', //保存设置
	'selectColdRate', //选取冷档位
	'selectHotRate', //选取热档位
	'cancelHotRange', //关闭档位选择
	'cancelColdRange']);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	var _Store = __webpack_require__(6);

	var _SettingButton = __webpack_require__(9);

	var _SettingButton2 = _interopRequireDefault(_SettingButton);

	var _TimeSelect = __webpack_require__(10);

	var _Range = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getHotGear(deg) {
	    var index = 0;
	    switch (deg) {
	        case 38:
	            index = 1;
	            break;
	        case 40:
	            index = 2;
	            break;
	        case 42:
	            index = 3;
	            break;
	        case 44:
	            index = 4;
	            break;
	        case 46:
	            index = 5;
	            break;
	        default:
	            index = 1;
	    }
	    return index;
	}
	function getColdGear(deg) {
	    var index = 0;
	    switch (deg) {
	        case 14:
	            index = 1;
	            break;
	        case 12:
	            index = 2;
	            break;
	        case 10:
	            index = 3;
	            break;
	        case 8:
	            index = 4;
	            break;
	        case 6:
	            index = 5;
	            break;
	        default:
	            index = 1;
	    }
	    return index;
	}

	// 创建React组件

	var App = exports.App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            showHotRange: false,
	            showColdRange: false,
	            needSave: false,
	            skinTypeName: '',
	            timeshow: false,
	            hotshow: false,
	            coldshow: false,
	            modeshow: false,
	            shockshow: false,
	            smartModeSwitch: 0,
	            massageSwitch: 0,
	            arrayInit: false,
	            modeName: 2,
	            modeWord: '弹性护理',
	            modeImg: 'flex',
	            hotTemp: 42,
	            coldTemp: 8,
	            workMinutes: 8,
	            steps: [{ 'name': '热护理', 'timeLength': 6, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }],
	            defaultminute: 42,
	            currentActiveIndex: -1
	        };
	        //[{'modeName':2,'modeWord':'弹性护理','modeImg':'Flex','modeChanged':false,'hotTemp':42,'coldTemp':8,'workMinutes':8,'steps': [{'name':'热护理','timeLength':6},{'name':'冷护理','timeLength':6}]}]
	        _this.maxminute = 46;
	        _this.minminute = 38;
	        _this.startY = 0;
	        _this.newY = 0;
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'cancelClock',
	        value: function cancelClock() {
	            this.setState({
	                timeshow: false,
	                arrayInit: true
	            });
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m, s) {
	            var index = this.state.currentActiveIndex;
	            var modeName = this.state.modeName;
	            var workMinutes = 0;
	            if (modeName == 10 || modeName == 16 || modeName == 17) {
	                var steps = this.state.steps;
	                var tl = steps[index].timeLength;
	                steps[index].timeLength = m;
	                for (var i = 0, len = steps.length; i < len; i++) {
	                    workMinutes += steps[i].timeLength;
	                }
	                if (workMinutes == 0) {
	                    het.toast('护理时长最少1分钟');
	                    steps[index].timeLength = tl;
	                    return false;
	                } else if (workMinutes > 10) {
	                    het.toast('护理时长不超过10分钟');
	                    steps[index].timeLength = tl;
	                    return false;
	                }
	                this.setState({
	                    timeshow: false,
	                    arrayInit: true
	                });
	                _Actions.Actions.submitClock(m, index, modeName, workMinutes);
	            }
	        }
	    }, {
	        key: 'submitHot',
	        value: function submitHot(value) {
	            var modeName = this.state.modeName;
	            _Actions.Actions.selectHotRate(value, modeName);
	        }
	    }, {
	        key: 'submitCold',
	        value: function submitCold(value) {
	            var modeName = this.state.modeName;
	            _Actions.Actions.selectColdRate(value, modeName);
	        }
	    }, {
	        key: 'cancelHot',
	        value: function cancelHot() {
	            _Actions.Actions.cancelHotRange();
	        }
	    }, {
	        key: 'cancelCold',
	        value: function cancelCold() {
	            _Actions.Actions.cancelColdRange();
	        }
	    }, {
	        key: 'cancelMode',
	        value: function cancelMode(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            this.setState({
	                modeshow: false
	            });
	        }
	    }, {
	        key: 'cancelShock',
	        value: function cancelShock(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            this.setState({
	                shockshow: false
	            });
	        }
	    }, {
	        key: 'changeMode',
	        value: function changeMode() {
	            var model = this.state.smartModeSwitch;
	            if (this.state.skinTypeName == null && model == 0) {
	                het.toast('您还未测试肤质，请先测试肤质！');
	                return;
	            } else {
	                _Actions.Actions.changeMode(model);
	            }
	        }
	    }, {
	        key: 'confirmMode',
	        value: function confirmMode(e) {
	            var index = e.currentTarget.getAttribute('data-mode');
	            this.setState({ mIndex: index, modeshow: false });
	            _Actions.Actions.confirmMode(index);
	        }
	    }, {
	        key: 'confirmShock',
	        value: function confirmShock(e) {
	            this.setState({ shockshow: false });
	            var index = e.currentTarget.getAttribute('data-shock');
	            var modeName = this.state.modeName;
	            _Actions.Actions.confirmShock(index, modeName);
	        }
	    }, {
	        key: 'submit',
	        value: function submit() {
	            var data = {};
	            data.smartModeSwitch = this.state.smartModeSwitch, data.massageSwitch = this.state.massageSwitch, data.modeName = this.state.modeName;
	            data.workMinutes = this.state.workMinutes;
	            data.hotTemp = this.state.hotTemp, data.coldTemp = this.state.coldTemp, data.steps = this.state.steps;
	            _Actions.Actions.submit(data);
	        }
	    }, {
	        key: 'startTouch',
	        value: function startTouch(e) {
	            if (this.state.smartModeSwitch == 1) {
	                return false;
	            }
	            this.newY = 0;
	            this.startY = parseInt(e.touches[0].clientY);
	        }
	    }, {
	        key: 'moveTouch',
	        value: function moveTouch(e) {
	            if (this.state.smartModeSwitch == 1) {
	                return false;
	            }
	            this.newY = parseInt(e.touches[0].clientY);
	        }
	    }, {
	        key: 'endTouch',
	        value: function endTouch(e) {
	            var _this2 = this;

	            if (this.state.smartModeSwitch == 1) {
	                return false;
	            }
	            var disY = this.newY || this.startY - this.startY;
	            if (Math.abs(disY) <= 20) {
	                var type = e.currentTarget.getAttribute('data-type');

	                (function () {
	                    switch (type) {
	                        case 'mode':
	                            clearTimeout(_this2.timer1);
	                            var mode = ReactDOM.findDOMNode(_this2.refs.mode);
	                            mode.style.background = '#fde7ee';
	                            _this2.timer1 = setTimeout(function () {
	                                mode.style.background = '';
	                                this.setState({
	                                    modeshow: true
	                                });
	                            }.bind(_this2), 80);
	                            break;
	                        case 'shock':
	                            clearTimeout(_this2.timer2);
	                            var shock = ReactDOM.findDOMNode(_this2.refs.shock);
	                            shock.style.background = '#fde7ee';
	                            _this2.timer2 = setTimeout(function () {
	                                shock.style.background = '';
	                                this.setState({
	                                    shockshow: true
	                                });
	                            }.bind(_this2), 80);
	                            break;
	                        case 'hot':
	                            clearTimeout(_this2.timer3);
	                            var hot = ReactDOM.findDOMNode(_this2.refs.hot);
	                            hot.style.background = '#fde7ee';
	                            _this2.timer3 = setTimeout(function () {
	                                hot.style.background = '';
	                                this.maxminute = 46;
	                                this.minminute = 38;
	                                //this.setState({defaultminute: this.state.hotTemp,hotshow:true,arrayInit: false})
	                                this.setState({ showHotRange: true });
	                            }.bind(_this2), 80);

	                            break;
	                        case 'cold':
	                            clearTimeout(_this2.timer4);
	                            var cold = ReactDOM.findDOMNode(_this2.refs.cold);
	                            cold.style.background = '#fde7ee';
	                            _this2.timer4 = setTimeout(function () {
	                                cold.style.background = '';
	                                this.maxminute = 6;
	                                this.minminute = 14;
	                                //this.setState({defaultminute: this.state.coldTemp,coldshow: true,arrayInit: false});
	                                this.setState({ showColdRange: true });
	                            }.bind(_this2), 80);

	                            break;
	                    }
	                })();
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'proStart',
	        value: function proStart(e) {
	            if (this.state.smartModeSwitch == 1) {
	                return false;
	            }
	            var md = this.state.modeName;
	            if (md == 10 || md == 16 || md == 17) {
	                this.newY = 0;
	                this.startY = parseInt(e.touches[0].clientY);
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'proMove',
	        value: function proMove(e) {
	            if (this.state.smartModeSwitch == 1) {
	                return false;
	            }
	            var md = this.state.modeName;
	            if (md == 10 || md == 16 || md == 17) {
	                this.newY = parseInt(e.touches[0].clientY);
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'proEnd',
	        value: function proEnd(e) {
	            if (this.state.smartModeSwitch == 1) {
	                return false;
	            }
	            var md = this.state.modeName;
	            if (md == 10 || md == 16 || md == 17) {
	                var disY = this.newY || this.startY - this.startY;
	                if (Math.abs(disY) <= 20) {
	                    var activeIndex = e.currentTarget.getAttribute('data-step');
	                    this.setState({ currentActiveIndex: parseInt(activeIndex) });
	                    var steps = this.state.steps;
	                    this.setState({
	                        defaultminute: steps[activeIndex].timeLength,
	                        timeshow: true,
	                        arrayInit: false
	                    });
	                } else {
	                    return false;
	                }
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'endDefault',
	        value: function endDefault(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            //console.log(getColdGear(this.state.coldTemp))
	            //智能模式下提示
	            var infoStyle1 = { padding: '0.666667rem 1.333333rem', color: '#353535', fontSize: '16px', borderBottom: '1px solid #E3E3E3', lineHeight: '2.416667rem', background: '#FFF' };
	            var infoStyle2 = { color: '#353535', fontSize: '14px', height: '3.958333rem', width: '100%', borderBottom: '1px solid #E3E3E3', lineHeight: '3.958333rem', textAlign: 'center', background: '#FFF' };
	            var modeInfo1 = React.createElement(
	                'div',
	                { style: infoStyle1 },
	                '\u4E3A\u4F7F\u667A\u80FD\u51B7\u70ED\u7F8E\u989C\u4EEA\u7684\u6548\u679C\u66F4\u597D,\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5,',
	                React.createElement(
	                    'a',
	                    { style: { color: '#007eff' }, href: 'cbeauty://cbeauty_single_skintest' },
	                    '\u53BB\u6D4B\u8BD5\u80A4\u8D28>>'
	                )
	            );
	            var modeInfo2 = React.createElement(
	                'div',
	                { style: infoStyle2 },
	                '\u6839\u636E\u60A8\u6D4B\u80A4\u6570\u636E\uFF0C\u667A\u80FD\u63A8\u8350\u62A4\u7406\u6A21\u5F0F'
	            );
	            var desInfo = null;
	            //console.log('肤质名',this.state.smartModeSwitch,this.state.skinTypeName)
	            if (this.state.smartModeSwitch === 0 && this.state.skinTypeName === null) {
	                desInfo = modeInfo1;
	            }
	            if (this.state.smartModeSwitch === 1 && this.state.skinTypeName) {
	                desInfo = modeInfo2;
	            }
	            //设备模式提示
	            var modeTip = ['offline', 'lowbat'];
	            var mt = '';
	            if (this.state.electricity <= 3 && this.state.electricity > 0) {
	                mt = modeTip[1];
	            }
	            if (this.state.onlineStatus == 2) {
	                mt = modeTip[0];
	            }
	            //不同模式的护理流程的侧边栏
	            var proc = null;
	            var fiveProc = React.createElement(
	                'aside',
	                { className: 'side-logo' },
	                React.createElement(
	                    'div',
	                    { className: 'side-container flex' },
	                    React.createElement('div', { className: 'hot' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement('div', { className: 'cold' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement('div', { className: 'hot' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement('div', { className: 'cold' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement('div', { className: 'hot' })
	                )
	            );
	            var fourProc = React.createElement(
	                'aside',
	                { className: 'side-logo' },
	                React.createElement(
	                    'div',
	                    { className: 'side-container flex' },
	                    React.createElement('div', { className: 'hot' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement('div', { className: 'cold' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement('div', { className: 'hot' }),
	                    React.createElement('div', { className: 'line' }),
	                    React.createElement('div', { className: 'cold' })
	                )
	            );
	            //console.log('模式名',this.state.modeName);
	            switch (this.state.modeName) {
	                case 1:
	                    proc = fourProc;
	                    break;
	                case 2:
	                    proc = React.createElement(
	                        'aside',
	                        { className: 'side-logo' },
	                        React.createElement(
	                            'div',
	                            { className: 'side-container flex' },
	                            React.createElement('div', { className: 'hot' }),
	                            React.createElement('div', { className: 'line' }),
	                            React.createElement('div', { className: 'cold' })
	                        )
	                    );
	                    break;
	                case 3:
	                    proc = fiveProc;
	                    break;
	                case 4:
	                    proc = fourProc;
	                    break;
	                case 10:
	                    proc = fiveProc;
	                    break;
	                case 16:
	                    proc = fiveProc;
	                    break;
	                case 17:
	                    proc = fiveProc;
	                    break;
	            };

	            //护理流程
	            var steps = this.state.steps;
	            var len = steps.length;
	            var items = steps.map(function (item, index) {
	                var last = '';
	                var borderShow = '';
	                if (index == len - 1) {
	                    last = 'last';
	                }
	                if (_this3.state.smartModeSwitch == 0 && (_this3.state.modeName == 10 || _this3.state.modeName == 16 || _this3.state.modeName == 17)) {
	                    borderShow = 'active';
	                }
	                // console.log(borderShow)
	                return React.createElement(
	                    'li',
	                    { className: "flex " + borderShow + " " + last, onTouchStart: _this3.proStart.bind(_this3), onTouchMove: _this3.proMove.bind(_this3), onTouchEnd: _this3.proEnd.bind(_this3), key: index, 'data-type': item.mark, 'data-step': index },
	                    React.createElement(
	                        'p',
	                        null,
	                        item.name
	                    ),
	                    React.createElement(
	                        'span',
	                        null,
	                        item.timeLength + '分钟'
	                    ),
	                    React.createElement('img', { src: '../static/img/rightArrow.png', alt: '\u53F3\u7BAD\u5934', style: _this3.state.smartModeSwitch == 0 && (_this3.state.modeName == 10 || _this3.state.modeName == 16 || _this3.state.modeName == 17) ? {} : { display: 'none' } })
	                );
	            });

	            //模式及震动选择弹窗
	            var mitems = ['水润护理', '弹性护理', '清爽护理', '控油护理', '自定义'];
	            var sitems = ['震动开', '震动关'];

	            var imgCold = ['../static/img/cold-small.png', '../static/img/cold-big.png'];
	            var imgHot = ['../static/img/hot-small.png', '../static/img/hot-big.png'];
	            return React.createElement(
	                'div',
	                { className: 'm-main' },
	                React.createElement(
	                    'header',
	                    { className: 'm-header flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'photo' },
	                        React.createElement(
	                            'div',
	                            { className: 'mode-con' },
	                            React.createElement('div', { className: "deviceTip " + mt })
	                        )
	                    ),
	                    React.createElement('div', { className: "modeSwitch " + (this.state.smartModeSwitch ? "auto" : "hand"), onTouchTap: this.changeMode.bind(this) })
	                ),
	                desInfo,
	                React.createElement(
	                    'menu',
	                    { className: 'btnList flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'btnSwitch btn1 flex', 'data-type': 'mode', ref: 'mode', onTouchEnd: this.endTouch.bind(this), onTouchMove: this.moveTouch.bind(this), onTouchStart: this.startTouch.bind(this) },
	                        React.createElement('img', { src: "../static/img/" + this.state.modeImg + ".png", alt: 'modeSlect', className: this.state.modeImg }),
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                this.state.modeWord,
	                                React.createElement('em', { style: this.state.smartModeSwitch == 1 ? { display: 'none' } : {} })
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'btnSwitch flex', 'data-type': 'shock', ref: 'shock', onTouchStart: this.startTouch.bind(this), onTouchMove: this.moveTouch.bind(this), onTouchEnd: this.endTouch.bind(this) },
	                        React.createElement('img', { src: "../static/img/" + (this.state.massageSwitch ? "shockOn" : "shockOff") + ".png", alt: 'shockSwitch', className: 'shock' }),
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                this.state.massageSwitch ? "震动开" : "震动关",
	                                React.createElement('em', { style: this.state.smartModeSwitch == 1 ? { display: 'none' } : {} })
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'menu',
	                    { className: 'btnList flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'btnSwitch btn2 flex', 'data-type': 'hot', ref: 'hot', onTouchStart: this.startTouch.bind(this), onTouchMove: this.moveTouch.bind(this), onTouchEnd: this.endTouch.bind(this) },
	                        React.createElement(
	                            'h1',
	                            null,
	                            React.createElement(
	                                'span',
	                                { className: 'value' },
	                                getHotGear(this.state.hotTemp)
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'unit' },
	                                '\u6863'
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u70ED\u62A4\u7406',
	                                React.createElement('em', { style: this.state.smartModeSwitch == 1 ? { display: 'none' } : {} })
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'btnSwitch flex', 'data-type': 'cold', ref: 'cold', onTouchStart: this.startTouch.bind(this), onTouchMove: this.moveTouch.bind(this), onTouchEnd: this.endTouch.bind(this) },
	                        React.createElement(
	                            'h1',
	                            null,
	                            React.createElement(
	                                'span',
	                                { className: 'value' },
	                                getColdGear(this.state.coldTemp)
	                            ),
	                            React.createElement(
	                                'span',
	                                { className: 'unit' },
	                                '\u6863'
	                            )
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            React.createElement(
	                                'span',
	                                null,
	                                '\u51B7\u62A4\u7406',
	                                React.createElement('em', { style: this.state.smartModeSwitch == 1 ? { display: 'none' } : {} })
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'm-process' },
	                    React.createElement(
	                        'header',
	                        { className: 'title flex' },
	                        React.createElement(
	                            'h2',
	                            null,
	                            '\u62A4\u7406\u6D41\u7A0B'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5171',
	                            this.state.workMinutes,
	                            '\u5206\u949F'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'step-con flex' },
	                        proc,
	                        React.createElement(
	                            'ul',
	                            { className: 'step-list' },
	                            items
	                        )
	                    )
	                ),
	                React.createElement(
	                    'footer',
	                    { id: 'footer', className: 'setBut' },
	                    React.createElement(_SettingButton2.default, { settingStatus: this.state.needSave ? 'on' : 'off', callback: this.submit.bind(this) })
	                ),
	                React.createElement(_Range.Range, { showRange: this.state.showColdRange, rate: 25, windStall: getColdGear(this.state.coldTemp), callback: this.submitCold.bind(this), cancelback: this.cancelCold.bind(this), imgSrc: imgCold }),
	                React.createElement(_Range.Range, { showRange: this.state.showHotRange, rate: 25, windStall: getHotGear(this.state.hotTemp), callback: this.submitHot.bind(this), cancelback: this.cancelHot.bind(this), imgSrc: imgHot }),
	                React.createElement(_TimeSelect.TimeSelect, { minutestep: 1, hourshow: false, minuteshow: true, statusname: ' ', unit: '\u5206\u949F',
	                    cancelClock: this.cancelClock.bind(this), submitClock: this.submitClock.bind(this),
	                    defaultminute: this.state.defaultminute, ArrayInit: this.state.arrayInit,
	                    show: this.state.timeshow, maxminute: 10, minminute: 0 }),
	                React.createElement(
	                    'section',
	                    { className: 'modeselect-bd', style: this.state.modeshow ? {} : { display: 'none' }, onTouchMove: this.endDefault.bind(this) },
	                    React.createElement('div', { className: 'modeselect-shade', onTouchEnd: this.cancelMode.bind(this), onTouchMove: this.endDefault.bind(this) }),
	                    React.createElement(
	                        'ul',
	                        { className: 'modeselect-content', style: { bottom: this.state.modeshow ? 0 : "-23rem" } },
	                        mitems.map(function (its, index) {
	                            return React.createElement(
	                                'li',
	                                { className: 'flex', key: index, 'data-mode': index, onTouchStart: _this3.endDefault.bind(_this3), onTouchMove: _this3.endDefault.bind(_this3), onTouchEnd: _this3.confirmMode.bind(_this3) },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    its
	                                ),
	                                React.createElement('em', { style: _this3.state.mIndex == index ? {} : { display: 'none' } })
	                            );
	                        })
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'shockselect-bd', style: this.state.shockshow ? {} : { display: 'none' }, onTouchMove: this.endDefault.bind(this) },
	                    React.createElement('div', { className: 'shockselect-shade', onTouchEnd: this.cancelShock.bind(this), onTouchMove: this.endDefault.bind(this) }),
	                    React.createElement(
	                        'ul',
	                        { className: 'shockselect-content', style: { bottom: this.state.shockshow ? 0 : "-10rem" } },
	                        sitems.map(function (its, idx) {
	                            return React.createElement(
	                                'li',
	                                { className: 'flex', key: idx, 'data-shock': idx, onTouchStart: _this3.endDefault.bind(_this3), onTouchMove: _this3.endDefault.bind(_this3), onTouchEnd: _this3.confirmShock.bind(_this3) },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    its
	                                ),
	                                React.createElement('em', { style: _this3.state.massageSwitch != idx ? {} : { display: 'none' } })
	                            );
	                        })
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(5);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
	  }
	});

/***/ },
/* 5 */
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
/* 6 */
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

	var _fun = __webpack_require__(7);

	var _Actions = __webpack_require__(2);

	var needSave = false;
	var smartModeSwitch = 0;
	var AppData = {};
	var sendData = {};
	var items = [{ 'modeWord': '水润护理', mIndex: 0, coldtitle: '10', hottitle: '40', 'modeImg': 'water', 'massageSwitch': 0, 'hotTemp': 40, 'coldTemp': 10, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 3, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 3, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }] }, { 'modeWord': '弹性护理', mIndex: 1, coldtitle: '8', hottitle: '42', 'modeImg': 'flex', 'massageSwitch': 0, 'hotTemp': 42, 'coldTemp': 8, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 6, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }] }, { 'modeWord': '清爽护理', mIndex: 2, coldtitle: '8', hottitle: '42', 'modeImg': 'cool', 'massageSwitch': 0, 'hotTemp': 42, 'coldTemp': 8, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }] }, { 'modeWord': '控油护理', mIndex: 3, coldtitle: '6', hottitle: '44', 'modeImg': 'control', 'massageSwitch': 0, 'hotTemp': 44, 'coldTemp': 6, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }] }, { 'modeWord': '自定义', mIndex: 4, coldtitle: '', hottitle: '', 'modeImg': 'custom', 'massageSwitch': 0, 'hotTemp': 42, 'coldTemp': 8, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 6, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 0, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 0, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 0, 'mark': 'hot' }] }];

	var recItems = [{ 'modeWord': '水润护理', mIndex: 0, coldtitle: '', hottitle: '', 'modeImg': 'water', 'massageSwitch': 0, 'hotTemp': 40, 'coldTemp': 10, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 3, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 3, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }] }, { 'modeWord': '弹性护理', mIndex: 1, coldtitle: '', hottitle: '', 'modeImg': 'flex', 'massageSwitch': 0, 'hotTemp': 42, 'coldTemp': 8, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 6, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }] }, { 'modeWord': '清爽护理', mIndex: 2, coldtitle: '', hottitle: '', 'modeImg': 'cool', 'massageSwitch': 0, 'hotTemp': 42, 'coldTemp': 8, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 1, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }] }, { 'modeWord': '控油护理', mIndex: 3, coldtitle: '', hottitle: '', 'modeImg': 'control', 'massageSwitch': 0, 'hotTemp': 44, 'coldTemp': 6, 'workMinutes': 8, 'steps': [{ 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }, { 'name': '热护理', 'timeLength': 2, 'mark': 'hot' }, { 'name': '冷护理', 'timeLength': 2, 'mark': 'cold' }] }];
	/**
	 * 拼接返回给页面的字段
	 * @return   {object}        返回给页面的字段
	 */
	function getTriggerData() {
	    var data = {
	        skinTypeName: AppData.skinTypeName,
	        needSave: needSave,
	        electricity: AppData.electricity,
	        onlineStatus: AppData.onlineStatus
	    };
	    return data;
	}
	function getRecRenderData(modeName) {
	    var data = {};
	    switch (modeName) {
	        case 1:
	            data = recItems[0];
	            break;
	        case 2:
	            data = recItems[1];
	            break;
	        case 3:
	            data = recItems[2];
	            break;
	        case 4:
	            data = recItems[3];
	            break;
	    }
	    return data;
	}
	function getRenderData(modeName) {
	    var data = {};
	    switch (modeName) {
	        case 1:
	            data = items[0];
	            break;
	        case 2:
	            data = items[1];
	            break;
	        case 3:
	            data = items[2];
	            break;
	        case 4:
	            data = items[3];
	            break;
	        case 10:
	            data = items[4];
	            break;
	        case 16:
	            data = items[4];
	            break;
	        case 17:
	            data = items[4];
	            break;
	    }
	    return data;
	}
	function getHotGear(deg) {
	    var index = 0;
	    switch (deg) {
	        case 38:
	            index = 1;
	            break;
	        case 40:
	            index = 2;
	            break;
	        case 42:
	            index = 3;
	            break;
	        case 44:
	            index = 4;
	            break;
	        case 46:
	            index = 5;
	            break;
	    }
	    return index;
	}
	function getColdGear(deg) {
	    var index = 0;
	    switch (deg) {
	        case 14:
	            index = 1;
	            break;
	        case 12:
	            index = 2;
	            break;
	        case 10:
	            index = 3;
	            break;
	        case 8:
	            index = 4;
	            break;
	        case 6:
	            index = 5;
	            break;
	    }
	    return index;
	}
	function getHotDeg(num) {
	    var deg = 0;
	    switch (num) {
	        case 0:
	            deg = 38;
	            break;
	        case 1:
	            deg = 38;
	            break;
	        case 2:
	            deg = 40;
	            break;
	        case 3:
	            deg = 42;
	            break;
	        case 4:
	            deg = 44;
	            break;
	        case 5:
	            deg = 46;
	            break;
	    }
	    return deg;
	}
	function getColdDeg(num) {
	    var deg = 0;
	    switch (num) {
	        case 0:
	            deg = 14;
	            break;
	        case 1:
	            deg = 14;
	            break;
	        case 2:
	            deg = 12;
	            break;
	        case 3:
	            deg = 10;
	            break;
	        case 4:
	            deg = 8;
	            break;
	        case 5:
	            deg = 6;
	            break;
	    }
	    return deg;
	}
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        // console.log('数据中的肤质名',data.skinTypeName);
	        if (data.modeName == 0) {
	            return false;
	        }
	        var skinTypeName = void 0,
	            runData = void 0;
	        if (AppData.currentConfig === undefined || AppData.currentConfig == null) {
	            AppData.currentConfig = {};
	        }
	        if (AppData.recommendConfig === undefined || AppData.recommendConfig == null) {
	            AppData.recommendConfig = {};
	        }
	        if (data.currentConfig) {
	            AppData.currentConfig = data.currentConfig;
	            AppData.currentConfig.skinTypeName = data.skinTypeName;
	            smartModeSwitch = data.currentConfig.smartModeSwitch;
	            if (typeof data.recommendConfig === 'undefined' && typeof data.skinTypeName === 'undefined') {
	                AppData.skinTypeName = null;
	            }
	        }
	        if (data.recommendConfig) {
	            AppData.recommendConfig = data.recommendConfig;
	            AppData.recommendConfig.skinTypeName = data.skinTypeName;
	            AppData.recommendConfig.smartModeSwitch = AppData.currentConfig.smartModeSwitch;
	        }

	        AppData.skinTypeName = typeof data.skinTypeName !== 'undefined' ? data.skinTypeName : AppData.skinTypeName;
	        //console.log('Appdata里面的skinTypeName',AppData.skinTypeName)
	        AppData.electricity = typeof data.electricity !== 'undefined' ? data.electricity : AppData.electricity;
	        AppData.onlineStatus = typeof data.onlineStatus !== 'undefined' ? data.onlineStatus : AppData.onlineStatus;
	        if (!needSave) {
	            //无数据保存时，接受所有字段
	            if (smartModeSwitch == 1) {
	                var tempData = getTriggerData();
	                var renderData = getRecRenderData(AppData.recommendConfig.modeName);
	                this.trigger(_fun.Funs._extends(AppData.recommendConfig, tempData, renderData));
	            } else {
	                // sendData = data;
	                var _tempData = getTriggerData();
	                if (data.currentConfig) {
	                    AppData.currentConfig = _fun.Funs._extends(AppData.currentConfig, data.currentConfig);
	                    var index = AppData.currentConfig.modeName;
	                    if (index == 10 || index == 16 || index == 17) {
	                        items[4].massageSwitch = AppData.currentConfig.massageSwitch;

	                        items[4].hotTemp = getHotDeg(AppData.currentConfig.hotCompressGears1);
	                        items[4].coldTemp = getColdDeg(AppData.currentConfig.coldCompressGears1);
	                        items[4].workMinutes = AppData.currentConfig.workMinutes;
	                        items[4].steps[0].timeLength = AppData.currentConfig.hotCompressRuntime1;
	                        items[4].steps[1].timeLength = AppData.currentConfig.coldCompressRuntime1;
	                        items[4].steps[2].timeLength = AppData.currentConfig.hotCompressRuntime2;
	                        items[4].steps[3].timeLength = AppData.currentConfig.coldCompressRuntime2;
	                        items[4].steps[4].timeLength = AppData.currentConfig.hotCompressRuntime3;
	                    } else {
	                        items[index - 1].massageSwitch = AppData.currentConfig.massageSwitch;

	                        items[index - 1].hotTemp = getHotDeg(AppData.currentConfig.hotCompressGears1);
	                        items[index - 1].coldTemp = getColdDeg(AppData.currentConfig.coldCompressGears1);
	                        items[index - 1].workMinutes = AppData.currentConfig.workMinutes;
	                        if (items[index - 1].steps[0]) {
	                            items[index - 1].steps[0].timeLength = AppData.currentConfig.hotCompressRuntime1;
	                        }
	                        if (items[index - 1].steps[1]) {
	                            items[index - 1].steps[1].timeLength = AppData.currentConfig.coldCompressRuntime1;
	                        }
	                        if (items[index - 1].steps[2]) {
	                            items[index - 1].steps[2].timeLength = AppData.currentConfig.hotCompressRuntime2;
	                        }
	                        if (items[index - 1].steps[3]) {
	                            items[index - 1].steps[3].timeLength = AppData.currentConfig.coldCompressRuntime2;
	                        }
	                        if (items[index - 1].steps[4]) {
	                            items[index - 1].steps[4].timeLength = AppData.currentConfig.hotCompressRuntime3;
	                        }
	                    }
	                } else if (typeof data.smartModeSwitch !== 'undefined') {
	                    AppData.currentConfig.smartModeSwitch = data.smartModeSwitch;
	                    AppData.currentConfig.modeName = data.modeName;
	                    var _index = data.modeName;
	                    if (_index == 10 || _index == 16 || _index == 17) {
	                        items[4].massageSwitch = data.massageSwitch;

	                        items[4].hotTemp = getHotDeg(data.hotCompressGears1);
	                        items[4].coldTemp = getColdDeg(data.coldCompressGears1);
	                        items[4].workMinutes = data.workMinutes;
	                        items[4].steps[0].timeLength = data.hotCompressRuntime1;
	                        items[4].steps[1].timeLength = data.coldCompressRuntime1;
	                        items[4].steps[2].timeLength = data.hotCompressRuntime2;
	                        items[4].steps[3].timeLength = data.coldCompressRuntime2;
	                        items[4].steps[4].timeLength = data.hotCompressRuntime3;
	                    } else {
	                        items[_index - 1].massageSwitch = data.massageSwitch;

	                        items[_index - 1].hotTemp = getHotDeg(data.hotCompressGears1);
	                        items[_index - 1].coldTemp = getColdDeg(data.coldCompressGears1);
	                        items[_index - 1].workMinutes = data.workMinutes;
	                        if (items[_index - 1].steps[0]) {
	                            items[_index - 1].steps[0].timeLength = data.hotCompressRuntime1;
	                        }
	                        if (items[_index - 1].steps[1]) {
	                            items[_index - 1].steps[1].timeLength = data.coldCompressRuntime1;
	                        }
	                        if (items[_index - 1].steps[2]) {
	                            items[_index - 1].steps[2].timeLength = data.hotCompressRuntime2;
	                        }
	                        if (items[_index - 1].steps[3]) {
	                            items[_index - 1].steps[3].timeLength = data.coldCompressRuntime2;
	                        }
	                        if (items[_index - 1].steps[4]) {
	                            items[_index - 1].steps[4].timeLength = data.hotCompressRuntime3;
	                        }
	                    }
	                    var sm = {};
	                    if (AppData.skinTypeName == null || AppData.skinTypeName === undefined) {
	                        sm = { smartModeSwitch: 0 };
	                    }
	                    AppData.currentConfig = _fun.Funs._extends(AppData.currentConfig, data, sm);
	                }
	                var _renderData = getRenderData(AppData.currentConfig.modeName);
	                var _runData = _fun.Funs._extends(AppData.currentConfig, _tempData, _renderData);
	                //console.log(111111,runData)
	                this.trigger(_runData);
	            }
	        } else {
	            //有数据保存时，仅接受部分字段
	            if (smartModeSwitch == 1) {
	                var _tempData2 = getTriggerData();
	                var _renderData2 = getRecRenderData(AppData.recommendConfig.modeName);
	                this.trigger(_fun.Funs._extends(AppData.recommendConfig, _tempData2, _renderData2));
	            } else {
	                var _tempData3 = getTriggerData();
	                runData = _fun.Funs._extends(AppData.currentConfig, _tempData3);
	                this.trigger(runData);
	            }
	        }
	    },
	    onChangeMode: function onChangeMode(model) {
	        needSave = true;
	        var tempData = getTriggerData();
	        if (model == 1) {
	            var renderData = {};
	            AppData.currentConfig.needSave = true;
	            AppData.currentConfig.smartModeSwitch = 0;
	            smartModeSwitch = 0;
	            var modeName = AppData.currentConfig.modeName;
	            renderData = getRenderData(modeName);
	            this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData));
	        } else if (model == 0) {
	            if (AppData.recommendConfig) {
	                AppData.recommendConfig.needSave = true;
	                AppData.recommendConfig.smartModeSwitch = 1;
	                smartModeSwitch = 1;
	                var _renderData3 = getRecRenderData(AppData.recommendConfig.modeName);
	                this.trigger(_fun.Funs._extends(AppData.recommendConfig, tempData, _renderData3));
	            }
	        }
	    },
	    onConfirmMode: function onConfirmMode(idx) {
	        needSave = true;
	        var index = parseInt(idx);
	        var tempData = getTriggerData();
	        if (index == 4) {
	            AppData.currentConfig.modeName = index + 6;
	        } else {
	            AppData.currentConfig.modeName = index + 1;
	        }
	        var renderData = getRenderData(AppData.currentConfig.modeName);
	        this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData));
	    },
	    onConfirmShock: function onConfirmShock(idx, md) {
	        needSave = true;
	        var index = void 0,
	            massageSwitch = void 0;
	        switch (md) {
	            case 1:
	                index = 0;
	                break;
	            case 2:
	                index = 1;
	                break;
	            case 3:
	                index = 2;
	                break;
	            case 4:
	                index = 3;
	                break;
	            case 10:
	                index = 4;
	                break;
	            case 16:
	                index = 4;
	                break;
	            case 17:
	                index = 4;
	                break;
	        }
	        if (idx == 0) {
	            massageSwitch = 1;
	        } else if (idx == 1) {
	            massageSwitch = 0;
	        }

	        items[index].massageSwitch = massageSwitch;
	        AppData.currentConfig.massageSwitch = massageSwitch;
	        AppData.currentConfig.modeName = md;
	        var tempData = getTriggerData();
	        var renderData = getRenderData(AppData.currentConfig.modeName);
	        this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData));
	    },
	    onSubmitHot: function onSubmitHot(m, md) {
	        needSave = true;
	        var index = void 0;
	        var tempData = getTriggerData();
	        switch (md) {
	            case 1:
	                index = 0;
	                break;
	            case 2:
	                index = 1;
	                break;
	            case 3:
	                index = 2;
	                break;
	            case 4:
	                index = 3;
	                break;
	            case 10:
	                index = 4;
	                break;
	            case 16:
	                index = 4;
	                break;
	            case 17:
	                index = 4;
	                break;
	        };
	        items[index].hotTemp = m;
	        AppData.currentConfig.modeName = md;
	        var renderData = getRenderData(AppData.currentConfig.modeName);
	        this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData));
	    },
	    onSubmitCold: function onSubmitCold(m, md) {
	        needSave = true;
	        var index = void 0;
	        var tempData = getTriggerData();
	        switch (md) {
	            case 1:
	                index = 0;
	                break;
	            case 2:
	                index = 1;
	                break;
	            case 3:
	                index = 2;
	                break;
	            case 4:
	                index = 3;
	                break;
	            case 10:
	                index = 4;
	                break;
	            case 16:
	                index = 4;
	                break;
	            case 17:
	                index = 4;
	                break;
	        };
	        items[index].coldTemp = m;
	        AppData.currentConfig.modeName = md;
	        var renderData = getRenderData(AppData.currentConfig.modeName);
	        this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData));
	    },
	    onSubmitClock: function onSubmitClock(m, idx, md, wk) {
	        needSave = true;
	        if (md == 10 || md == 16 || md == 17) {
	            items[4].steps[parseInt(idx)].timeLength = m;
	            // let workMinutes=0;
	            // for(let i=0,len=items[4].steps.length;i<len;i++){
	            // 	workMinutes += items[4].steps[i].timeLength;
	            // }
	            items[4].workMinutes = wk;
	            AppData.currentConfig.modeName = md;
	            var tempData = getTriggerData();
	            var renderData = getRenderData(AppData.currentConfig.modeName);
	            this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData));
	        }
	    },
	    onSubmit: function onSubmit(data) {
	        var _this = this;

	        sendData.smartModeSwitch = data.smartModeSwitch;
	        sendData.massageSwitch = data.massageSwitch;
	        var md = data.modeName;
	        if (md == 16 || md == 17) md = 10;
	        sendData.modeName = md;
	        sendData.workMinutes = data.workMinutes;
	        var hotTemp = getHotGear(data.hotTemp),
	            coldTemp = getColdGear(data.coldTemp);
	        sendData.hotCompressGears1 = hotTemp;
	        sendData.coldCompressGears1 = coldTemp;
	        sendData.hotCompressGears2 = hotTemp;
	        sendData.coldCompressGears2 = coldTemp;
	        sendData.hotCompressGears3 = hotTemp;
	        var steps = data.steps;
	        sendData.hotCompressRuntime1 = steps[0] ? steps[0].timeLength : 0;
	        sendData.coldCompressRuntime1 = steps[1] ? steps[1].timeLength : 0;
	        sendData.hotCompressRuntime2 = steps[2] ? steps[2].timeLength : 0;
	        sendData.coldCompressRuntime2 = steps[3] ? steps[3].timeLength : 0;
	        sendData.hotCompressRuntime3 = steps[4] ? steps[4].timeLength : 0;
	        sendData.updateFlag = het.calcUpdateFlag(1);
	        // console.log(sendData)
	        this.trigger({ needSave: false });
	        het.send(sendData, function (data) {
	            het.toast('同步成功！');
	            //this.trigger({needSave:false});
	            needSave = false;
	        }, function (data) {
	            het.toast('同步失败！');
	            needSave = true;
	            _this.trigger({ needSave: true });
	        });
	    },
	    onSelectColdRate: function onSelectColdRate(value, md) {
	        needSave = true;
	        var index = void 0;
	        var tempData = getTriggerData();
	        switch (md) {
	            case 1:
	                index = 0;
	                break;
	            case 2:
	                index = 1;
	                break;
	            case 3:
	                index = 2;
	                break;
	            case 4:
	                index = 3;
	                break;
	            case 10:
	                index = 4;
	                break;
	            case 16:
	                index = 4;
	                break;
	            case 17:
	                index = 4;
	                break;
	        };
	        var m = getColdDeg(value);
	        items[index].coldTemp = m;
	        AppData.currentConfig.modeName = md;
	        var renderData = getRenderData(AppData.currentConfig.modeName);
	        this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData, { showColdRange: false }));
	    },
	    onSelectHotRate: function onSelectHotRate(value, md) {
	        needSave = true;
	        var index = void 0;
	        var tempData = getTriggerData();
	        switch (md) {
	            case 1:
	                index = 0;
	                break;
	            case 2:
	                index = 1;
	                break;
	            case 3:
	                index = 2;
	                break;
	            case 4:
	                index = 3;
	                break;
	            case 10:
	                index = 4;
	                break;
	            case 16:
	                index = 4;
	                break;
	            case 17:
	                index = 4;
	                break;
	        };
	        var m = getHotDeg(value);
	        items[index].hotTemp = m;
	        AppData.currentConfig.modeName = md;
	        var renderData = getRenderData(AppData.currentConfig.modeName);
	        this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, renderData, { showHotRange: false }));
	    },
	    onCancelColdRange: function onCancelColdRange() {
	        this.trigger({ showColdRange: false });
	    },
	    onCancelHotRange: function onCancelHotRange() {
	        this.trigger({ showHotRange: false });
	    }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Funs = undefined;

	var _fun = __webpack_require__(8);

	var _fun2 = _interopRequireDefault(_fun);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Funs = _fun2.default;

/***/ },
/* 8 */
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
/* 9 */
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

/***/ },
/* 10 */
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
			var maxhour = parseInt(next.maxhour) || 23;
			var minhour = parseInt(next.minhour) || parseInt(this.state.hourtime) || 0;
			var hourstep = parseInt(next.hourstep) || 1;
			var maxlength = parseInt((maxhour - minhour) / hourstep);
			var hourarr = [];
			if (next.hourarray && next.hourarray instanceof Array) {
				hourarr = next.hourarray;
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
			if (next.defaulthour || this.state.hourtime) {
				var _value = next.defaulthour === undefined ? this.state.hourtime : next.defaulthour;
				var index = hourarr.indexOf(next.defaulthour);
				if (index != -1) {
					this.setState({
						hourtime: _value,
						hourindex: index
					});
				}
			}
			var maxminute = parseInt(next.maxminute) || 59;
			var minminute = parseInt(next.minminute) || 0;
			var minutestep = parseInt(next.minutestep) || parseInt(this.props.minutestep) || 1;
			var maxlength2 = parseInt((maxminute - minminute) / minutestep);
			var minutearr = [];
			for (var j = 0; j <= maxlength2; j++) {
				var _value2 = minminute + j * minutestep;
				// value = value<10?'0'+value:value;
				minutearr.push(_value2);
			}
			// console.log(minutearr)
			// if(maxminute<10) maxminute = '0'+maxminute;
			if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
			this.setState({
				minutearr: minutearr,
				minutetime: minminute
			});
			//设置默认分钟
			if (next.defaultminute || this.state.minutetime) {
				var _value3 = next.defaultminute === undefined ? this.state.minutetime : next.defaultminute;
				var mindex = minutearr.indexOf(_value3);
				if (mindex != -1) {
					this.setState({
						minutetime: _value3,
						minuteindex: mindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.ArrayInit === true || next.maxhour != this.props.maxhour || next.maxminute != this.props.maxminute || next.defaultminute != this.props.defaultminute) {
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
			//let selecttitle = this.props.title || '设置时间';
			var selectTipShow = this.props.title ? true : false;
			var selectTip = this.props.title || '';
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
				{ style: { display: this.state.timeDisplay ? "block" : "none" }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock, onTouchMove: this.endDefault, onTouchStart: this.endDefault }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault, style: { bottom: this.state.timeDisplay ? 0 : "-20rem" } },
					React.createElement(
						'section',
						{ className: 'selectbtn flex' },
						React.createElement(
							'span',
							{ onTouchEnd: this.cancelclock },
							'\u53D6\u6D88'
						),
						React.createElement(
							'span',
							{ onTouchEnd: this.submitclock },
							'\u786E\u8BA4'
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
								{ className: 'hour', style: { left: minuteshow ? 33 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u65F6'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } },
								this.props.unit
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 25 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
					),
					React.createElement(
						'section',
						{ className: 'selectTip flex', style: selectTipShow ? {} : { display: 'none' } },
						React.createElement(
							'span',
							{ className: 'tipWord' },
							'\u63A8\u8350\u6E29\u5EA6\u4E3A',
							selectTip,
							'\xB0C'
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
	exports.Range = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(4);

	var _Actions = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	/**
	 * 进度条组件
	 * @prop {boolean} rangedisable  滑动条是否可用
	 * @prop {integer} windStall  	运行速率，取值0-100
	 * @prop {integer} rate  		每档间隔值 用来确定档位范围
	 * @act  Actions.selectRate([integer])  切换档位时触发
	 */


	var Range = exports.Range = function (_BaseComponent) {
		_inherits(Range, _BaseComponent);

		function Range(props) {
			_classCallCheck(this, Range);

			var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, props));

			var windStall = parseInt(_this.props.windStall);
			var rate = parseInt(_this.props.rate);
			_this.state = {
				windStall: windStall,
				rate: rate
			};
			return _this;
		}

		_createClass(Range, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				this.offsetLeft = ReactDOM.findDOMNode(this.refs["rangeblock"]).offsetLeft;
				this.offsetWidth = ReactDOM.findDOMNode(this.refs["rangevalue"]).offsetWidth;
				//console.log(this.offsetLeft,this.offsetWidth)
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (nextProps.windStall !== this.state.windStall) {
					this.setState({ windStall: nextProps.windStall, rate: nextProps.rate });
				}
			}
		}, {
			key: 'rangeChange',
			value: function rangeChange(e) {
				e.preventDefault();
				e.stopPropagation();
				//处理滑动更改档位
				var windStall = parseInt(e.target.value) + this.state.rate;
				windStall = parseInt(windStall / this.state.rate);
				this.setState({ windStall: windStall });
			}
		}, {
			key: 'rangeTouchEnd',
			value: function rangeTouchEnd(e) {
				e.preventDefault();
				e.stopPropagation();
				// if(this.props.showRange) return;
				var windStall = e.changedTouches[0].clientX - parseInt(this.offsetLeft);
				windStall = windStall > this.offsetWidth ? this.offsetWidth : windStall;
				windStall = windStall < 0 ? 0 : windStall;
				windStall = windStall * 100 / this.offsetWidth;
				if (windStall >= 0 && windStall < 12.5) {
					windStall = 1;
				} else if (windStall >= 12.5 && windStall < 37.5) {
					windStall = 2;
				} else if (windStall >= 37.5 && windStall < 62.5) {
					windStall = 3;
				} else if (windStall >= 62.5 && windStall < 87.5) {
					windStall = 4;
				} else if (windStall >= 87.5 && windStall <= 100) {
					windStall = 5;
				}
				// windStall = parseInt(windStall/this.props.rate)+1;
				this.setState({ windStall: windStall });
			}
		}, {
			key: 'confirmValue',
			value: function confirmValue(e) {
				this.props.callback(this.state.windStall);
			}
		}, {
			key: 'cancelRange',
			value: function cancelRange(e) {
				e.preventDefault();
				e.stopPropagation();
				this.props.cancelback();
			}
		}, {
			key: 'preDefault',
			value: function preDefault(e) {
				var range = e.target.getAttribute('type');
				if (range !== 'range') {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				// console.log(this.state.windStall)
				var statusId = this.props.showRange;
				var rangevalue = (this.state.windStall - 1) * this.state.rate || '0';
				var windStall = parseInt(this.state.windStall);
				var fblock = parseInt(rangevalue) + '%';
				return React.createElement(
					'section',
					{ className: 'm-range', style: statusId ? { display: '' } : { display: 'none' }, onTouchStart: this.preDefault.bind(this) },
					React.createElement('section', { className: 'range-shade', onTouchStart: this.cancelRange.bind(this) }),
					React.createElement(
						'section',
						{ className: 'range-con', style: { bottom: statusId ? 0 : "-15rem" } },
						React.createElement(
							'section',
							{ className: 'confirm-btn flex' },
							React.createElement(
								'span',
								{ onTouchTap: this.cancelRange.bind(this) },
								'\u53D6\u6D88'
							),
							React.createElement(
								'span',
								{ onTouchTap: this.confirmValue.bind(this) },
								'\u786E\u8BA4'
							)
						),
						React.createElement(
							'section',
							{ className: 'range-detail flex' },
							React.createElement(
								'section',
								{ className: 'rangeblock', ref: 'rangeblock' },
								React.createElement(
									'section',
									{ className: 'tip-text', style: { left: fblock, marginLeft: '-' + rangevalue * 0.01667 - 0.48 + 'rem' } },
									React.createElement(
										'span',
										{ className: 'ratetext' },
										windStall
									)
								),
								React.createElement('input', { type: 'range', ref: 'rangevalue', value: rangevalue, min: '0', max: '100', className: 'rangevalue', onChange: this.rangeChange.bind(this), onTouchEnd: this.rangeTouchEnd.bind(this) }),
								React.createElement('span', { className: 'color-bar', style: { width: fblock } }),
								React.createElement('span', { className: 'rangeblock-on', style: { left: fblock, marginLeft: '-' + rangevalue * 0.01667 + 'rem' } })
							)
						),
						React.createElement(
							'section',
							{ className: 'range-icon flex' },
							React.createElement('img', { src: this.props.imgSrc[0] }),
							React.createElement('img', { src: this.props.imgSrc[1] })
						)
					)
				);
			}
		}]);

		return Range;
	}(_BaseComponentClass.BaseComponent);

	;

/***/ }
/******/ ]);