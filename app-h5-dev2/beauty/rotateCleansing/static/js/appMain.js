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

	var _baseApp = __webpack_require__(2);

	var _Guider = __webpack_require__(9);

	var _Help = __webpack_require__(13);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory,
	    Link = _ReactRouter.Link;

	var MyApp = function (_App) {
	    _inherits(MyApp, _App);

	    function MyApp(props) {
	        _classCallCheck(this, MyApp);

	        var _this = _possibleConstructorReturn(this, (MyApp.__proto__ || Object.getPrototypeOf(MyApp)).call(this, props));

	        het.setTitle('智能旋转洁面仪');
	        return _this;
	    }

	    return MyApp;
	}(_baseApp.App);

	// 开始渲染


	het.domReady(function () {

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: MyApp }),
	        React.createElement(Route, { path: '/guider', component: _Guider.Guider }),
	        React.createElement(Route, { path: '/help', component: _Help.Help })
	    ), document.getElementById('ROOT'));
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(3);

	var _Actions = __webpack_require__(5);

	var _Store = __webpack_require__(6);

	var _Guider = __webpack_require__(9);

	var _SortPanel = __webpack_require__(10);

	var _TimeSelect = __webpack_require__(11);

	var _SettingButton = __webpack_require__(12);

	var _SettingButton2 = _interopRequireDefault(_SettingButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	        updateFlagMap: {},
	        renderConfigData: false,
	        filter: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = exports.App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        var isAndroid = !!(navigator.userAgent.indexOf('Android') + 1);
	        _this.state = {
	            headerTop: isAndroid ? 73 : 64,
	            work: 0,
	            part: 0,
	            valueH: 0,
	            timeshow: false,
	            model: 0,
	            smartModeSwitch: 0,
	            changed: false,
	            activeIndexArr: [],
	            currenActiveIndex: -1,
	            showTestSkin: 0,
	            currentConfig: {},
	            recommendConfig: {},
	            needSave: false,
	            arr: [],
	            arrayInit: false,
	            defaulthour: '低',
	            defaultminute: 5,
	            defaultsecond: '单向',
	            recDescription: ''
	        };
	        _this.items = [{ 'name': '额头', 'speed': 1, 'time': '', 'direction': 1, 'imageClass': 'forehead-img', 'changed': false, 'remark': '' }, { 'name': '鼻子', 'speed': 1, 'time': '', 'direction': 1, 'imageClass': 'nose-img', 'changed': false, 'remark': '' }, { 'name': '下巴', 'speed': 1, 'time': '', 'direction': 1, 'imageClass': 'chin-img', 'changed': false, 'remark': '' }, { 'name': '左脸', 'speed': 1, 'time': '', 'direction': 1, 'imageClass': 'left-face-img', 'changed': false, 'remark': '' }, { 'name': '右脸', 'speed': 1, 'time': '', 'direction': 1, 'imageClass': 'right-face-img', 'changed': false, 'remark': '' }];
	        _this.minminute = 5;
	        _this.maxminute = 20;
	        _this.recDescription = '';
	        _this.listenStore(_Store.Store); // 监听Store
	        //Actions.refreshData();
	        return _this;
	    }
	    // 切换部位


	    _createClass(App, [{
	        key: 'startTouch',
	        value: function startTouch(e) {
	            var startY = parseInt(e.touches[0].clientY);
	            var oldValue = parseInt(this.state.valueH);
	            this.setState({
	                startY: startY,
	                oldValue: oldValue
	            });
	        }
	    }, {
	        key: 'moveTouch',
	        value: function moveTouch(e) {
	            var newY = parseInt(e.touches[0].clientY);
	            var oldY = parseInt(this.state.startY);
	            var valueH = parseInt(this.state.oldValue) + newY - oldY;
	            this.setState({
	                newY: newY,
	                valueH: valueH
	            });
	        }
	    }, {
	        key: 'endTouch',
	        value: function endTouch(e) {
	            var newY = this.state.newY || this.state.startY;
	            var disY = newY - this.state.startY;
	            var offsetValue = parseInt(this.state.oldValue);
	            var oldValue = parseInt(this.state.valueH);
	            var offset = oldValue < offsetValue ? offsetValue - oldValue : oldValue - offsetValue;
	            var h = void 0,
	                m = void 0,
	                s = void 0;
	            if (offset <= 20) {
	                if (this.state.smartModeSwitch == 1) {
	                    return false;
	                }
	                var activeIndex = e.currentTarget.getAttribute('data-index');
	                this.setState({ currenActiveIndex: activeIndex });
	                var activeIndexArr = this.state.activeIndexArr;
	                if (activeIndexArr.indexOf(activeIndex) == -1) activeIndexArr.push(parseInt(activeIndex));
	                this.setState({ activeIndexArr: activeIndexArr });
	                activeIndex == 0 ? this.maxminute = 40 : this.maxminute = 20;
	                switch (parseInt(activeIndex)) {
	                    case 0:
	                        this.recDescription = this.items[0].remark;
	                        h = this.checkGears(this.items[0].speed);
	                        m = this.items[0].time;
	                        if (m < 5) {
	                            m = 5;
	                        } else if (m > 40) {
	                            m = 40;
	                        }
	                        s = this.checkRotation(this.items[0].direction);
	                        break;
	                    case 1:
	                        this.recDescription = this.items[1].remark;
	                        h = this.checkGears(this.items[1].speed);
	                        m = this.items[1].time;
	                        m = this.checkMinute(m);
	                        s = this.checkRotation(this.items[1].direction);
	                        break;
	                    case 2:
	                        this.recDescription = this.items[2].remark;
	                        h = this.checkGears(this.items[2].speed);
	                        m = this.items[2].time;
	                        m = this.checkMinute(m);
	                        s = this.checkRotation(this.items[2].direction);
	                        break;
	                    case 3:
	                        this.recDescription = this.items[3].remark;
	                        h = this.checkGears(this.items[3].speed);
	                        m = this.items[3].time;
	                        m = this.checkMinute(m);
	                        s = this.checkRotation(this.items[3].direction);
	                        break;
	                    case 4:
	                        this.recDescription = this.items[4].remark;
	                        h = this.checkGears(this.items[4].speed);
	                        m = this.items[4].time;
	                        m = this.checkMinute(m);
	                        s = this.checkRotation(this.items[4].direction);
	                        break;
	                    default:
	                        this.recDescription = '';
	                }
	                this.setState({
	                    defaulthour: h,
	                    defaultminute: m,
	                    defaultsecond: s,
	                    timeshow: true,
	                    arrayInit: false
	                });
	            } else {
	                return;
	            }
	        }
	    }, {
	        key: 'checkMinute',
	        value: function checkMinute(m) {
	            var tp = 0;
	            if (m < 5) {
	                tp = 5;
	            } else if (m > 20) {
	                tp = 20;
	            } else {
	                tp = parseInt(m);
	            }
	            return tp;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            this.items[0].speed = this.state.foreheadGears !== nextState.foreheadGears ? nextState.foreheadGears : this.items[0].speed; //额头速度
	            this.items[0].time = this.state.foreheadRuntime !== nextState.foreheadRuntime ? nextState.foreheadRuntime : this.items[0].time; //额头时间
	            this.items[0].direction = this.state.foreheadRotation !== nextState.foreheadRotation ? nextState.foreheadRotation : this.items[0].direction; //额头旋转方向
	            this.items[0].changed = this.state.foreheadChanged !== nextState.foreheadChanged ? nextState.foreheadChanged : this.items[0].changed;
	            this.items[0].remark = this.state.foreheadRemarks !== nextState.foreheadRemarks ? nextState.foreheadRemarks : this.items[0].remark;
	            this.items[1].speed = this.state.noseGears !== nextState.noseGears ? nextState.noseGears : this.items[1].speed; //鼻子速度
	            this.items[1].time = this.state.noseRuntime !== nextState.noseRuntime ? nextState.noseRuntime : this.items[1].time; //鼻子时间
	            this.items[1].direction = this.state.noseRotation !== nextState.noseRotation ? nextState.noseRotation : this.items[1].direction; //鼻子旋转方向
	            this.items[1].changed = this.state.noseChanged !== nextState.noseChanged ? nextState.noseChanged : this.items[1].changed;
	            this.items[1].remark = this.state.noseRemarks !== nextState.noseRemarks ? nextState.noseRemarks : this.items[1].remark;
	            this.items[2].speed = this.state.chinGears !== nextState.chinGears ? nextState.chinGears : this.items[2].speed; //下巴速度
	            this.items[2].time = this.state.chinRuntime !== nextState.chinRuntime ? nextState.chinRuntime : this.items[2].time; //下巴时间
	            this.items[2].direction = this.state.chinRotation !== nextState.chinRotation ? nextState.chinRotation : this.items[2].direction; //下巴旋转方向
	            this.items[2].changed = this.state.chinChanged !== nextState.chinChanged ? nextState.chinChanged : this.items[2].changed;
	            this.items[2].remark = this.state.chinRemarks !== nextState.chinRemarks ? nextState.chinRemarks : this.items[2].remark;
	            this.items[3].speed = this.state.leftfaceGears !== nextState.leftfaceGears ? nextState.leftfaceGears : this.items[3].speed; //左脸速度
	            this.items[3].time = this.state.leftfaceRuntime !== nextState.leftfaceRuntime ? nextState.leftfaceRuntime : this.items[3].time; //左脸时间
	            this.items[3].direction = this.state.leftfaceRotation !== nextState.leftfaceRotation ? nextState.leftfaceRotation : this.items[3].direction; //左脸旋转方向
	            this.items[3].changed = this.state.leftfaceChanged !== nextState.leftfaceChanged ? nextState.leftfaceChanged : this.items[3].changed;
	            this.items[3].remark = this.state.leftfaceRemarks !== nextState.leftfaceRemarks ? nextState.leftfaceRemarks : this.items[3].remark;
	            this.items[4].speed = this.state.rightfaceGears !== nextState.rightfaceGears ? nextState.rightfaceGears : this.items[4].speed; //右脸速度
	            this.items[4].time = this.state.rightfaceRuntime !== nextState.rightfaceRuntime ? nextState.rightfaceRuntime : this.items[4].time; //右脸时间
	            this.items[4].direction = this.state.rightfaceRotation !== nextState.rightfaceRotation ? nextState.rightfaceRotation : this.items[4].direction; //右脸旋转方向
	            this.items[4].changed = this.state.rightfaceChanged !== nextState.rightfaceChanged ? nextState.rightfaceChanged : this.items[4].changed;
	            this.items[4].remark = this.state.rightfaceRemarks !== nextState.rightfaceRemarks ? nextState.rightfaceRemarks : this.items[4].remark;
	        }
	    }, {
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
	            var index = this.state.currenActiveIndex;
	            var items = this.items;
	            if (items[index].speed != this.checkGearsString(h) || items[index].time != m || items[index].direction != this.checkRotationString(s)) {
	                items[index].changed = true;
	            } else {
	                if (items[index].changed) {
	                    items[index].changed = true;
	                } else {
	                    items[index].changed = false;
	                }
	            }
	            items[index].speed = this.checkGearsString(h);
	            items[index].time = m;
	            items[index].direction = this.checkRotationString(s);
	            this.setState({
	                timeshow: false,
	                needSave: true,
	                arrayInit: true
	            });
	            _Actions.Actions.changeGears(index, h, m, s, items);
	        }
	    }, {
	        key: 'submit',
	        value: function submit() {
	            for (var i = 0, len = this.items.length; i < len; i++) {
	                this.items[i].changed = false;
	            }
	            _Actions.Actions.submit(this.items);
	        }
	    }, {
	        key: 'changeModel',
	        value: function changeModel() {
	            var model = this.state.smartModeSwitch;
	            if (this.state.skinType == null && !model) {
	                het.toast('您还未测试肤质，请先测试肤质！');
	                return;
	            } else {
	                _Actions.Actions.changeMode(model);
	            }
	        }
	    }, {
	        key: 'checkGears',
	        value: function checkGears(gears) {
	            switch (gears) {
	                case 1:
	                    return '低';break;
	                case 2:
	                    return '中';break;
	                case 3:
	                    return '高';break;
	                default:
	                    return '低';
	            }
	        }
	    }, {
	        key: 'checkRotation',
	        value: function checkRotation(rotation) {
	            switch (rotation) {
	                case 1:
	                    return '单向';break;
	                case 2:
	                    return '双向-切换1次';break;
	                case 3:
	                    return '双向-切换2次';break;
	                case 4:
	                    return '双向-切换3次';break;
	                default:
	                    return '单向';
	            }
	        }
	    }, {
	        key: 'checkGearsString',
	        value: function checkGearsString(gearstring) {
	            switch (gearstring) {
	                case '低':
	                    return 1;break;
	                case '中':
	                    return 2;break;
	                case '高':
	                    return 3;break;
	                default:
	                    return 1;
	            }
	        }
	    }, {
	        key: 'checkRotationString',
	        value: function checkRotationString(rotationString) {
	            switch (rotationString) {
	                case '单向':
	                    return 1;break;
	                case '双向-切换1次':
	                    return 2;break;
	                case '双向-切换2次':
	                    return 3;break;
	                case '双向-切换3次':
	                    return 4;break;
	                default:
	                    return 1;
	            }
	        }
	    }, {
	        key: 'testSkin',
	        value: function testSkin() {
	            het.toast('为了使智能洁面仪的使用效果更好，推荐您先使用测肤仪进行肤质测试.');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            console.log('最终数据', this.state);
	            console.log('this.items', this.items);
	            var items = this.items;
	            var description = React.createElement('span', null); //智能推荐描述
	            var batteryOrLine = React.createElement('div', null); //设备电量低或者离线在线
	            if (this.state.skinType === null) {
	                description = React.createElement(
	                    'span',
	                    null,
	                    '\u4E3A\u4F7F\u667A\u80FD\u6D01\u9762\u4EEA\u7684\u6548\u679C\u66F4\u597D,\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5,',
	                    React.createElement(
	                        'a',
	                        { style: { color: '#007eff' }, href: 'cbeauty://cbeauty_single_skintest' },
	                        '\u53BB\u6D4B\u8BD5\u80A4\u8D28>>'
	                    )
	                );
	            } else {
	                if (this.state.smartModeSwitch == 0) {
	                    description = React.createElement(
	                        'span',
	                        null,
	                        '\u9009\u62E9\u4E00\u4E2A\u90E8\u4F4D\uFF0C\u8BBE\u7F6E\u6D01\u9762\u53C2\u6570'
	                    );
	                } else {
	                    description = React.createElement(
	                        'span',
	                        null,
	                        '\u5DF2\u6839\u636E\u60A8\u76AE\u80A4\u6570\u636E\u667A\u80FD\u63A8\u8350\u6700\u5408\u9002\u7684\u65B9\u6848'
	                    );
	                }
	            }
	            if (this.state.electricity <= 3 && this.state.electricity > 0) {
	                batteryOrLine = React.createElement('div', { className: 'low-battery' });
	            } else {
	                batteryOrLine = React.createElement('div', null);
	            }
	            if (this.state.onlineStatus == 2) {
	                batteryOrLine = React.createElement('div', { className: 'out-line' });
	            } else {
	                batteryOrLine = React.createElement('div', null);
	            }
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'header',
	                    null,
	                    React.createElement(
	                        'div',
	                        { className: 'logo' },
	                        batteryOrLine
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'gear' },
	                        React.createElement('a', { className: this.state.smartModeSwitch === 0 ? 'gear-choose' : 'gear-choose-active', onTouchEnd: this.changeModel.bind(this) })
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    null,
	                    React.createElement(
	                        'p',
	                        { className: 'tips' },
	                        description
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'rc-div' },
	                        React.createElement(
	                            'div',
	                            { className: 'rc-right-div' },
	                            items.map(function (item, index) {
	                                return React.createElement(
	                                    'div',
	                                    { className: 'items', key: index, 'data-index': index, onTouchStart: _this2.startTouch.bind(_this2), onTouchMove: _this2.moveTouch.bind(_this2), onTouchEnd: _this2.endTouch.bind(_this2) },
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        item.name
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        null,
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '\u901F\u5EA6:',
	                                            React.createElement(
	                                                'em',
	                                                { className: item.changed && _this2.state.activeIndexArr.indexOf(index) != -1 ? 'active' : '' },
	                                                _this2.checkGears(item.speed)
	                                            )
	                                        ),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '\u65F6\u95F4:',
	                                            React.createElement(
	                                                'em',
	                                                { className: item.changed && _this2.state.activeIndexArr.indexOf(index) != -1 ? 'active' : '' },
	                                                item.time + 'S'
	                                            )
	                                        ),
	                                        React.createElement(
	                                            'span',
	                                            null,
	                                            '\u65B9\u5411:',
	                                            React.createElement(
	                                                'em',
	                                                { className: item.changed && _this2.state.activeIndexArr.indexOf(index) != -1 ? 'active' : '' },
	                                                _this2.checkRotation(item.direction)
	                                            )
	                                        )
	                                    ),
	                                    React.createElement('div', { className: 'part-img ' + item.imageClass }),
	                                    React.createElement('i', { className: _this2.state.smartModeSwitch === 0 ? 'arrow-right' : '' })
	                                );
	                            })
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { id: 'footer' },
	                    React.createElement(_SettingButton2.default, { settingStatus: this.state.needSave ? 'on' : 'off', callback: this.submit.bind(this) })
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { title: this.recDescription, hourshow: true, minuteshow: true, secondshow: true,
	                    cancelClock: this.cancelClock.bind(this), submitClock: this.submitClock.bind(this),
	                    ArrayInit: this.state.arrayInit, defaulthour: this.state.defaulthour, defaultminute: this.state.defaultminute, defaultsecond: this.state.defaultsecond,
	                    statusname: ' ', show: this.state.timeshow, maxminute: this.maxminute, minminute: this.minminute, hourarray: ['低', '中', '高'],
	                    secondarray: ['单向', '双向-切换1次', '双向-切换2次', '双向-切换3次'], titleshow: false })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseComponentClass = __webpack_require__(4);

	Object.defineProperty(exports, 'BaseComponent', {
	  enumerable: true,
	  get: function get() {
	    return _BaseComponentClass.BaseComponent;
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
/* 5 */
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
	'switchPart', // 切换部位
	'showSortPanel', // 显示排序面板
	'switchAuto', // 切换自动手动
	'switchWork', // 切换工作模式（洁面/按摩）
	'changeRuntime', // 调节洁面时间
	'submit', // 保存设置
	'refreshData', // 刷新数据
	'pushGuiderData', // 推送向导数据
	'changeMode', //更换智能模式
	'changeGears']);

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

	var _Actions = __webpack_require__(5);

	var needSave = false; // 是否需要保存设置
	var showTestSkin = 0; // 智能模式的描述显示
	var work = 0; // 工作模式，0-洁面，1-按摩
	var part = 0; // 部位 0-额头 1-鼻子 2-下巴 3-左脸 4-右脸
	var auto = 0; // 自动/手动模式， 0-手动 1-自动
	var smartModeSwitch = 0; //智能模式开关：0-手动，1-自动
	var runConfig = {}; // 运行数据
	var recData = { // 推荐数据
	    'recomondConfig': {
	        "cleanSwitch": null,
	        "foreheadGears": 2,
	        "foreheadRuntime": 20,
	        "foreheadRotation": 2,
	        "noseGears": 2,
	        "noseRuntime": 10,
	        "noseRotation": 3,
	        "chinGears": 2,
	        "chinRuntime": 10,
	        "chinRotation": 2,
	        "leftfaceGears": 1,
	        "leftfaceRuntime": 10,
	        "leftfaceRotation": 2,
	        "rightfaceGears": 1,
	        "rightfaceRuntime": 10,
	        "rightfaceRotation": 2,
	        "smartModeSwitch": null,
	        "foreheadRemarks": "您的肤质为：中性肤质，额头推荐使用双向2次、中速、界面时间20s",
	        "noseRemarks": "您的肤质为：中性肤质，鼻子推荐使用双向3次、中速、界面时间10s",
	        "chinRemarks": "您的肤质为：中性肤质，下巴推荐使用双向2次、中速、界面时间10s",
	        "leftfaceRemarks": "您的肤质为：中性肤质，左脸推荐使用双向2次、低速、界面时间10s",
	        "rightfaceRemarks": "您的肤质为：中性肤质，右脸推荐使用双向2次、低速、界面时间10s"
	    }
	};
	var AppData = {
	    'skinType': null
	};
	var sendData = {};
	var recConfigMark = {};
	/**
	 * 获取模式数据
	 * @return   {json}           返回{gears, runTime}
	 */
	function getMode() {
	    var configs = auto ? recData.recomondConfig : runConfig;
	    var keys = getKeyNames();
	    return {
	        gears: configs[keys.gearName],
	        runTime: configs[keys.runtimeName],
	        recGears: recData.recomondConfig[keys.gearName.replace('commonG', 'g').replace('commonM', 'm')],
	        recRunTime: recData.recomondConfig[keys.runtimeName]
	    };
	}

	// 获取gearName，runtimeName
	function getKeyNames() {
	    var suffix = part + 1;
	    var gearName = void 0,
	        runtimeName = void 0,
	        commonGearName = void 0;
	    if (work === 1) {
	        switch (suffix) {// 按摩模式需要交换suffix（2-4交换、3-5交换）
	            case 2:
	                suffix = 4;break;
	            case 3:
	                suffix = 5;break;
	            case 4:
	                suffix = 2;break;
	            case 5:
	                suffix = 3;break;
	        }
	        commonGearName = 'commonMassageGears' + suffix; // 常用档位名
	        gearName = !auto && runConfig[commonGearName] > 0 ? commonGearName : 'massageGears' + suffix;
	        runtimeName = 'massageRuntime' + suffix;
	    } else {
	        commonGearName = 'commonGears' + suffix; // 常用档位名
	        gearName = !auto && runConfig[commonGearName] > 0 ? commonGearName : 'gears' + suffix;
	        runtimeName = 'runtime' + suffix;
	    }
	    return { gearName: gearName, runtimeName: runtimeName };
	}

	/**
	 * 获取肤质数据
	 * @return   {json}           返回{skinDescribe}
	 */
	function getSkinDescribe() {
	    switch (part) {
	        case 0:
	            return { skinDescribe: recData.forHeadDescribe };
	        case 1:
	            return { skinDescribe: recData.noseDescribe };
	        case 2:
	            return { skinDescribe: recData.chinDescribe };
	        case 3:
	            return { skinDescribe: recData.leftFaceDescribe };
	        case 4:
	            return { skinDescribe: recData.rightFaceDescribe };
	    }
	}

	/**
	 * 获取app需要的数据
	 * @return   {json}   返回app需要的所有数据
	 */
	function getAppData() {
	    var data = {
	        work: work,
	        part: part,
	        auto: auto,
	        skinDataCode: recData.skinDataCode,
	        electricity: runConfig.electricity,
	        onlineStatus: runConfig.onlineStatus,
	        chargeStatus: runConfig.chargeStatus,
	        needSave: needSave
	    };
	    return _fun.Funs._extends(data, getMode(), getSkinDescribe());
	}

	/**
	 * 检测是否含有某字段
	 * @param    {json}      data 待检数据
	 * @param    {...string} keys 键名（rest参数形式）
	 * @return   {Boolean}        返回布尔值
	 */
	function has(data) {
	    var tag = true; // 先假设成立

	    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        keys[_key - 1] = arguments[_key];
	    }

	    for (var i in keys) {
	        if (typeof data[keys[i]] === 'undefined') {
	            tag = false;
	        }
	    }
	    return tag;
	}

	/**
	 * 配置数组到配置对象的转换
	 * @param    {array}      items 设置参数
	 * @return   {json}        返回设置对象
	 */
	function arrToObj(array) {
	    var data = {};
	    data.foreheadGears = array[0].speed; //额头档位
	    data.foreheadRuntime = array[0].time; //额头时间
	    data.foreheadRotation = array[0].direction; //额头方向
	    data.foreheadChanged = array[0].changed;
	    data.noseGears = array[1].speed; //鼻子档位
	    data.noseRuntime = array[1].time; //鼻子时间
	    data.noseRotation = array[1].direction; //鼻子方向
	    data.noseChanged = array[1].changed;
	    data.chinGears = array[2].speed; //下巴档位
	    data.chinRuntime = array[2].time; //下巴时间
	    data.chinRotation = array[2].direction; //下巴方向
	    data.chinChanged = array[2].changed;
	    data.leftfaceGears = array[3].speed; //左脸档位
	    data.leftfaceRuntime = array[3].time; //左脸时间
	    data.leftfaceRotation = array[3].direction; //左脸方向
	    data.leftfaceChanged = array[4].changed;
	    data.rightfaceGears = array[4].speed; //右脸档位
	    data.rightfaceRuntime = array[4].time; //右脸时间
	    data.rightfaceRotation = array[4].direction; //右脸方向
	    data.rightfaceChanged = array[4].changed;
	    return data;
	}

	/**
	 * 档位转换
	 * @param    {string}      gearstring 参数
	 * @return   {number}        返回档位
	 */
	function checkGearsString(gearstring) {
	    switch (gearstring) {
	        case '低':
	            return 1;break;
	        case '中':
	            return 2;break;
	        case '高':
	            return 3;break;
	        default:
	            return 1;
	    }
	}

	/**
	 * 旋转方向转换
	 * @param    {string}      rotationString 参数
	 * @return   {number}        返回旋转方向
	 */
	function checkRotationString(rotationString) {
	    switch (rotationString) {
	        case '单向':
	            return 1;break;
	        case '双向-切换1次':
	            return 2;break;
	        case '双向-切换2次':
	            return 3;break;
	        case '双向-切换3次':
	            return 4;break;
	        default:
	            return 1;
	    }
	}

	/**
	 * 智能推荐模式下不能更改状态
	 * @return   {object}        返回智能模式下changed
	 */
	function getRecChanged() {
	    var data = {};
	    data.foreheadChanged = false;
	    data.noseChanged = false;
	    data.chinChanged = false;
	    data.leftfaceChanged = false;
	    data.rightfaceChanged = false;
	    return data;
	}

	/**
	 * 拼接返回给页面的字段
	 * @return   {object}        返回给页面的字段
	 */
	function getTriggerData() {
	    var data = {
	        skinType: AppData.skinType,
	        needSave: needSave,
	        electricity: AppData.electricity,
	        onlineStatus: AppData.onlineStatus,
	        chargeStatus: AppData.chargeStatus
	    };
	    return data;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        console.log('nnnnnnnnn-----', data);
	        var skinType = void 0,
	            runData = void 0;
	        if (AppData.currentConfig === undefined || AppData.currentConfig == null) {
	            AppData.currentConfig = {};
	        }
	        if (AppData.recommendConfig === undefined || AppData.recommendConfig == null) {
	            AppData.recommendConfig = {};
	        }
	        if (data.currentConfig) {
	            AppData.currentConfig = data.currentConfig;
	            AppData.currentConfig.skinType = data.skinType;
	            AppData.currentConfig.smartModeSwitch = data.currentConfig.smartModeSwitch;
	            smartModeSwitch = data.currentConfig.smartModeSwitch;
	        }
	        if (data.recommendConfig) {
	            AppData.recommendConfig = _fun.Funs._extends(data.recommendConfig);
	            AppData.recommendConfig.skinType = data.skinType;
	            AppData.recommendConfig.smartModeSwitch = AppData.currentConfig.smartModeSwitch;
	            AppData.recommendConfig.model = AppData.currentConfig.smartModeSwitch;
	            AppData.recommendConfig.foreheadChanged = false;
	            AppData.recommendConfig.noseChanged = false;
	            AppData.recommendConfig.chinChanged = false;
	            AppData.recommendConfig.leftfaceChanged = false;
	            AppData.recommendConfig.rightfaceChanged = false;
	            recConfigMark.foreheadRemarks = data.recommendConfig.foreheadRemarks;
	            recConfigMark.noseRemarks = data.recommendConfig.noseRemarks;
	            recConfigMark.chinRemarks = data.recommendConfig.chinRemarks;
	            recConfigMark.leftfaceRemarks = data.recommendConfig.leftfaceRemarks;
	            recConfigMark.rightfaceRemarks = data.recommendConfig.rightfaceRemarks;
	        }
	        AppData.skinType = typeof data.skinType !== 'undefined' ? data.skinType : AppData.skinType;
	        AppData.electricity = typeof data.electricity !== 'undefined' ? data.electricity : AppData.electricity;
	        AppData.onlineStatus = typeof data.onlineStatus !== 'undefined' ? data.onlineStatus : AppData.onlineStatus;
	        AppData.chargeStatus = typeof data.chargeStatus !== 'undefined' ? data.chargeStatus : AppData.chargeStatus;

	        if (!needSave) {
	            //无数据保存时，接受所有字段
	            if (smartModeSwitch == 1) {
	                var tempData = getTriggerData();
	                this.trigger(_fun.Funs._extends(AppData.recommendConfig, tempData, recConfigMark));
	            } else {
	                // sendData = data;
	                var _tempData = getTriggerData();
	                if (data.currentConfig) {
	                    AppData.currentConfig = _fun.Funs._extends(AppData.currentConfig, data.currentConfig);
	                } else {
	                    if (AppData.skinType == null || AppData.skinType === undefined) {
	                        //设备以前绑定了有肤质的智能模式，但是现在绑到了无肤质的用户下
	                        AppData.currentConfig = _fun.Funs._extends(AppData.currentConfig, data, { smartModeSwitch: 0 });
	                    } else {
	                        AppData.currentConfig = _fun.Funs._extends(AppData.currentConfig, data);
	                    }
	                }
	                var _runData = _fun.Funs._extends(AppData.currentConfig, _tempData, recConfigMark);
	                this.trigger(_runData);
	            }
	        } else {
	            //有数据保存时，仅接受部分字段
	            if (smartModeSwitch == 1) {
	                var _tempData2 = getTriggerData();
	                this.trigger(_fun.Funs._extends(AppData.recommendConfig, _tempData2, recConfigMark));
	            } else {
	                var _tempData3 = getTriggerData();
	                runData = _fun.Funs._extends(AppData.currentConfig, _tempData3, recConfigMark);
	                this.trigger(runData);
	            }
	        }
	    },
	    onSubmit: function onSubmit(items) {
	        var _this = this;

	        needSave = false;
	        sendData.foreheadGears = items[0].speed; //额头档位
	        sendData.foreheadRuntime = items[0].time; //额头时间
	        sendData.foreheadRotation = items[0].direction; //额头方向
	        sendData.noseGears = items[1].speed; //鼻子档位
	        sendData.noseRuntime = items[1].time; //鼻子时间
	        sendData.noseRotation = items[1].direction; //鼻子方向
	        sendData.chinGears = items[2].speed; //下巴档位
	        sendData.chinRuntime = items[2].time; //下巴时间
	        sendData.chinRotation = items[2].direction; //下巴方向
	        sendData.leftfaceGears = items[3].speed; //左脸档位
	        sendData.leftfaceRuntime = items[3].time; //左脸时间
	        sendData.leftfaceRotation = items[3].direction; //左脸方向
	        sendData.rightfaceGears = items[4].speed; //右脸档位
	        sendData.rightfaceRuntime = items[4].time; //右脸时间
	        sendData.rightfaceRotation = items[4].direction; //右脸方向
	        sendData.source = 2;
	        sendData.smartModeSwitch = smartModeSwitch;
	        sendData.updateFlag = het.calcUpdateFlag(1);
	        sendData.cleanSwitch = AppData.currentConfig.cleanSwitch;
	        needSave = false;
	        this.trigger({ needSave: false });
	        het.send(sendData, function (data) {
	            het.toast('同步成功！');
	            needSave = false;
	            _this.trigger({ needSave: false });
	        }, function (data) {
	            het.toast('同步失败！');
	            needSave = true;
	            _this.trigger({ needSave: true });
	        });
	        AppData.currentConfig.foreheadChanged = false;
	        AppData.currentConfig.noseChanged = false;
	        AppData.currentConfig.chinChanged = false;
	        AppData.currentConfig.leftfaceChanged = false;
	        AppData.currentConfig.rightfaceChanged = false;
	    },
	    onRefreshData: function onRefreshData() {
	        this.trigger(getAppData());
	    },
	    onChangeMode: function onChangeMode(model) {
	        needSave = true;
	        var tempData = getTriggerData();
	        if (model == 1) {
	            AppData.currentConfig.needSave = true;
	            AppData.currentConfig.showTestSkin = 0;
	            AppData.currentConfig.model = 0;
	            AppData.currentConfig.smartModeSwitch = 0;
	            smartModeSwitch = 0;
	            this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, recConfigMark));
	        } else if (model == 0) {
	            if (AppData.recommendConfig) {
	                AppData.recommendConfig.needSave = true;
	                AppData.recommendConfig.model = 1;
	                AppData.recommendConfig.smartModeSwitch = 1;
	                smartModeSwitch = 1;
	            }
	            if (AppData.recommendConfig && AppData.skinType !== null) {
	                AppData.recommendConfig.showTestSkin = 1; //智能模式有推荐数据
	            } else {
	                AppData.recommendConfig.showTestSkin = 2; //智能模式无推荐数据
	            }
	            this.trigger(_fun.Funs._extends(AppData.recommendConfig, tempData, recConfigMark));
	        }
	    },
	    onChangeGears: function onChangeGears(index, h, m, s, items) {
	        items[index].speed = checkGearsString(h);
	        items[index].time = m;
	        items[index].direction = checkRotationString(s);
	        items[index].changed = items[index].changed;
	        needSave = true;
	        var data = arrToObj(items);
	        var tempData = getTriggerData();
	        AppData.currentConfig = _fun.Funs._extends(AppData.currentConfig, data, tempData, recConfigMark);
	        this.trigger(AppData.currentConfig);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Guider = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(3);

	var _Actions = __webpack_require__(5);

	var _Store = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var Guider = exports.Guider = function (_BaseComponent) {
	    _inherits(Guider, _BaseComponent);

	    function Guider(props) {
	        _classCallCheck(this, Guider);

	        var _this = _possibleConstructorReturn(this, (Guider.__proto__ || Object.getPrototypeOf(Guider)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.pushGuiderData(); // 请求推送向导数据
	        return _this;
	    }

	    _createClass(Guider, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            document.body.scrollTop = 0;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'mark' },
	                    React.createElement('img', { className: 'light', src: '../static/img/light.png' }),
	                    React.createElement(
	                        'div',
	                        { className: 'content' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '1.\u8BF7\u5728\u5173\u673A\u72B6\u6001\u4E0B,\u957F\u6309\u6309\u952E3\u79D2'
	                        ),
	                        React.createElement(
	                            'p',
	                            null,
	                            '2.\u542C\u5230',
	                            React.createElement(
	                                'span',
	                                { className: 'highlight' },
	                                '\u6EF4\u6EF4\u6EF4'
	                            ),
	                            '\u54CD,\u4E14\u84DD\u706F\u5FEB\u95EA'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'footer' },
	                    React.createElement(
	                        'button',
	                        null,
	                        '\u84DD\u706F\u5FEB\u901F\u95EA\u70C1\u4E86'
	                    )
	                )
	            );
	        }
	    }]);

	    return Guider;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SortPanel = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 排序面板
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {boolean}  show     是否显示面板
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {integer}  work     工作模式
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {function} cbOk     点击确定时的回调函数 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @prop {function} cbNo     点击取消时的回调函数
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


	// 创建React组件
	var SortPanel = exports.SortPanel = function (_BaseComponent) {
	    _inherits(SortPanel, _BaseComponent);

	    function SortPanel(props) {
	        _classCallCheck(this, SortPanel);

	        var _this = _possibleConstructorReturn(this, (SortPanel.__proto__ || Object.getPrototypeOf(SortPanel)).call(this, props));

	        _this.dragging = false;
	        _this.startY = 0;
	        _this.state = {
	            show: null
	        };
	        _this.items = [[{ id: 1, text: '额头', order: 1 }, { id: 2, text: '下巴', order: 2 }, { id: 3, text: '鼻子', order: 3 }, { id: 4, text: '左脸', order: 4 }, { id: 5, text: '右脸', order: 5 }], [{ id: 1, text: '眉心', order: 1 }, { id: 2, text: '左法令纹', order: 2 }, { id: 3, text: '右法令纹', order: 3 }, { id: 4, text: '左眼角', order: 4 }, { id: 5, text: '右眼角', order: 5 }]];
	        _this.sort();
	        return _this;
	    }
	    // 排序


	    _createClass(SortPanel, [{
	        key: 'sort',
	        value: function sort() {
	            this.items[0] = this.items[0].sort(function (a, b) {
	                return a.order > b.order;
	            });
	            this.items[1] = this.items[1].sort(function (a, b) {
	                return a.order > b.order;
	            });
	        }
	        // 重排

	    }, {
	        key: 'reSort',
	        value: function reSort(work, orderSequence) {
	            var items = this.items[work];
	            for (var i = 0; i < orderSequence.length; i++) {
	                for (var j in items) {
	                    if (items[j].id == orderSequence[i]) {
	                        items[j].order = i + 1;
	                        break;
	                    }
	                }
	            }
	        }
	        // 点击确定

	    }, {
	        key: 'okCall',
	        value: function okCall() {
	            var work = typeof this.props.work === 'undefined' ? 0 : this.props.work;
	            var list = this.getCurrentIdSequence();
	            this.reSort(work, list);
	            if (typeof this.props.cbOk === 'function') {
	                this.props.cbOk(work, list);
	            }
	            this.hideSortPanel();
	        }
	        // 点击取消

	    }, {
	        key: 'noCall',
	        value: function noCall() {
	            if (typeof this.props.cbNo === 'function') {
	                this.props.cbNo();
	            }
	            this.sort();
	            this.hideSortPanel();
	        }
	        // 获取当前ID序列

	    }, {
	        key: 'getCurrentIdSequence',
	        value: function getCurrentIdSequence() {
	            var doms = ReactDOM.findDOMNode(this.refs.list).children;
	            var list = [];
	            for (var i = 0; i < doms.length; i++) {
	                list.push(doms[i].getAttribute('data-id'));
	            }
	            return list;
	        }
	        // 关闭面板

	    }, {
	        key: 'hideSortPanel',
	        value: function hideSortPanel() {
	            this.setState({
	                show: false
	            });
	        }
	        // 开始拖放

	    }, {
	        key: 'startSort',
	        value: function startSort(e) {
	            e.preventDefault();
	            e.stopPropagation();
	            var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	            this.startY = touchs[0].pageY;
	            this.dragItem = ReactDOM.findDOMNode(e.currentTarget);
	            this.dragItem.style.zIndex = 99;
	            this.dragItem.style.backgroundColor = '#eee';
	            this.top = this.dragItem.offsetTop;
	        }
	        // 拖放中

	    }, {
	        key: 'moveSort',
	        value: function moveSort(e) {
	            if (this.dragging) return;
	            var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	            var y = touchs[0].pageY - this.startY;
	            try {
	                if (this.dragItem.nextSibling && y > this.dragItem.nextSibling.offsetTop - this.top - this.dragItem.scrollHeight / 2) {
	                    this.insertAfter(this.dragItem, this.dragItem.nextSibling);
	                } else if (this.dragItem.previousSibling && y < this.dragItem.previousSibling.offsetTop - this.top + this.dragItem.scrollHeight / 2) {
	                    this.insertBefore(this.dragItem, this.dragItem.previousSibling);
	                }
	            } catch (err) {}
	        }
	        // 拖放结束

	    }, {
	        key: 'endSort',
	        value: function endSort(e) {
	            this.dragging = false;
	            this.dragItem.style.zIndex = 0;
	            this.dragItem.style.backgroundColor = '#fff';
	        }
	    }, {
	        key: 'insertBefore',
	        value: function insertBefore(newEl, targetEl) {
	            var parentEl = targetEl.parentNode;
	            parentEl.insertBefore(newEl, targetEl);
	        }
	    }, {
	        key: 'insertAfter',
	        value: function insertAfter(newEl, targetEl) {
	            var parentEl = targetEl.parentNode;
	            if (parentEl.lastChild == targetEl) {
	                parentEl.appendChild(newEl);
	            } else {
	                parentEl.insertBefore(newEl, targetEl.nextSibling);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var work = typeof this.props.work === 'undefined' ? 0 : this.props.work;
	            var show = this.state.show === null ? this.props.show : this.state.show;
	            this.state.show = null;
	            return React.createElement(
	                'div',
	                { className: 'sort-panel', onTouchStart: this.noCall.bind(this),
	                    style: { display: show ? 'block' : 'none' } },
	                React.createElement(
	                    'div',
	                    { className: 'wrap', onTouchStart: function onTouchStart(e) {
	                            e.preventDefault();e.stopPropagation();
	                        } },
	                    React.createElement(
	                        'h2',
	                        null,
	                        '\u66F4\u6539',
	                        this.props.work === 1 ? '按摩' : '洁面',
	                        '\u987A\u5E8F'
	                    ),
	                    React.createElement(
	                        'ul',
	                        { ref: 'list' },
	                        this.items[work].map(function (it) {
	                            return React.createElement(
	                                'li',
	                                { key: it.id, 'data-id': it.id, onTouchStart: _this2.startSort.bind(_this2),
	                                    onTouchMove: _this2.moveSort.bind(_this2), onTouchEnd: _this2.endSort.bind(_this2) },
	                                React.createElement(
	                                    'b',
	                                    null,
	                                    it.order
	                                ),
	                                it.text,
	                                React.createElement('i', null)
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'sub-wrap' },
	                        React.createElement('input', { className: 'no', type: 'button', value: '\u53D6\u6D88', onTouchStart: this.noCall.bind(this) }),
	                        React.createElement('i', { className: 'hl' }),
	                        React.createElement('input', { className: 'ok', type: 'button', value: '\u786E\u5B9A', onTouchStart: this.okCall.bind(this) })
	                    )
	                )
	            );
	        }
	    }]);

	    return SortPanel;
	}(_BaseComponentClass.BaseComponent);

/***/ },
/* 11 */
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
				secondtime: 0,
				hourindex: 0,
				hourarr: [],
				minuteindex: 0,
				minutearr: [],
				secondindex: 0,
				secondarr: [],
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
					// value = value<10?'0'+value:value;
					hourarr.push(value);
				}
				// maxhour = maxhour<10?'0'+maxhour:maxhour;
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
			if (next.minutearray && next.minutearray instanceof Array) {
				minutearr = next.minutearray;
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			} else {
				for (var j = 0; j <= maxlength2; j++) {
					var _value2 = minminute + j * minutestep;
					// value = value<10?'0'+value:value;
					minutearr.push(_value2);
				}
				// if(maxminute<10) maxminute = '0'+maxminute;
				if (minutearr.indexOf(maxminute) == -1) minutearr.push(maxminute);
				this.setState({
					minutearr: minutearr,
					minutetime: minminute
				});
			}
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

			var maxsecond = parseInt(next.maxsecond) || 59;
			var minsecond = next.secondarray[0] || parseInt(next.minsecond) || 0;
			var secondstep = parseInt(next.secondstep) || parseInt(this.props.secondstep) || 1;
			var maxlength3 = parseInt((maxsecond - minsecond) / secondstep);
			var secondarr = [];
			if (next.secondarray && next.secondarray instanceof Array) {
				secondarr = next.secondarray;
				this.setState({
					secondarr: secondarr,
					secondtime: minsecond
				});
			} else {
				for (var k = 0; k <= maxlength3; k++) {
					var _value4 = minsecond + k * secondstep;
					// value = value<10?'0'+value:value;
					secondarr.push(_value4);
				}
				// if(maxsecond<10) maxsecond = '0'+maxsecond;
				if (secondarr.indexOf(maxsecond) == -1) secondarr.push(maxsecond);
				this.setState({
					secondarr: secondarr,
					secondtime: minsecond
				});
			}
			//设置默认秒
			if (next.defaultsecond || this.state.secondtime) {
				var _value5 = next.defaultsecond === undefined ? this.state.secondtime : next.defaultsecond;
				var secondindex = secondarr.indexOf(_value5);
				if (secondindex != -1) {
					this.setState({
						secondtime: _value5,
						secondindex: secondindex
					});
				}
			}
		},
		componentWillReceiveProps: function componentWillReceiveProps(next) {
			//更新时间可选值数组
			if (next.hourstep != this.props.hourstep || next.minhour != this.props.minhour || next.ArrayInit === true || next.maxhour != this.props.maxhour || next.maxminute != this.props.maxminute || next.maxsecond != this.props.maxsecond || next.defaulthour != this.props.defaulthour || next.defaultminute != this.props.defaultminute || next.defaultsecond != this.props.defaultsecond) {
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
			if (type == 'second') {
				this.setState({
					newy: yvalue,
					secondtop: value
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
			var second = parseInt(this.state.secondtime); //上次选中的秒数值
			var secondarr = this.state.secondarr; //秒数可选值数组
			var secondindex = parseInt(this.state.secondindex); //上次选中的秒数值对应数组中的索引
			var hourstep = parseInt(this.props.hourstep) || 1; //小时的间隔
			var minutestep = parseInt(this.props.minutestep) || 1; //分钟的间隔
			var secondstep = parseInt(this.props.secondstep) || 1; //秒数的间隔
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
			//秒值减小
			if (newy - oldy > 20 && type == "second") {
				var _rangestep4 = parseInt((newy - oldy) / 50) > 0 ? parseInt((newy - oldy) / 50) : 1;
				secondindex = secondindex - _rangestep4;
				secondindex = secondindex < 0 ? 0 : secondindex;
				second = secondarr[secondindex];
				this.setState({
					secondtime: second,
					secondindex: secondindex,
					secondtop: 0
				});
			};
			//秒值增加
			if (newy - oldy < -20 && type == "second") {
				var _rangestep5 = parseInt((oldy - newy) / 50) > 0 ? parseInt((oldy - newy) / 50) : 1;
				secondindex = secondindex + _rangestep5;
				secondindex = secondindex >= secondarr.length ? secondarr.length - 1 : secondindex;
				second = secondarr[secondindex];
				this.setState({
					secondtime: second,
					secondindex: secondindex,
					secondtop: 0
				});
			}
			//重置为未拖动状态
			this.setState({
				hourtop: 0,
				minutetop: 0,
				secondtop: 0
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
				this.props.submitClock(this.state.hourtime, this.state.minutetime, this.state.secondtime);
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
			var secondshow = typeof this.props.secondshow !== 'undefined' && Boolean(this.props.secondshow) === false ? false : true;
			if (!hourshow && !minuteshow && !secondshow) hourshow = true;
			var hourstep = parseInt(this.props.hourstep) || 1;
			var minutestep = parseInt(this.props.minutestep) || 1;
			var secondstep = parseInt(this.props.secondstep) || 1;
			var selecttitle = '';
			var selecttitleShow = false;
			if (this.props.title) selecttitle = this.props.title;
			if (selecttitle) {
				selecttitleShow = true;
			} else {
				selecttitleShow = false;
			}
			var statusname = this.props.statusname || '关闭';
			var hour = this.state.hourtime || '0';
			hour = parseInt(hour) > maxhour ? maxhour : parseInt(hour);
			hour = hour < minhour ? minhour : hour;
			var minute = this.state.minutetime || '0';
			minute = parseInt(minute) > 59 ? 59 : parseInt(minute);
			minute = minute < 0 ? 0 : minute;
			var second = this.state.secondtime || '0';
			second = parseInt(second) > 59 ? 59 : parseInt(second);
			second = second < 0 ? 0 : second;
			var hourtop = this.state.hourtop || 0;
			var minutetop = this.state.minutetop || 0;
			var secondtop = this.state.secondtop || 0;
			var hourarr = this.state.hourarr;
			var hourindex = parseInt(this.state.hourindex);
			var minutearr = this.state.minutearr;
			var minuteindex = parseInt(this.state.minuteindex);
			var secondarr = this.state.secondarr;
			var secondindex = parseInt(this.state.secondindex);
			return React.createElement(
				'section',
				{ style: { display: this.state.timeDisplay ? "block" : "none" }, ref: 'timeSelect', className: 'timeSelect' },
				React.createElement('section', { onTouchEnd: this.cancelclock, onTouchMove: this.endDefault, onTouchStart: this.endDefault }),
				React.createElement(
					'section',
					{ className: 'timeselect', onTouchMove: this.endDefault, style: { bottom: this.state.timeDisplay ? "0" : "-26rem" } },
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
						{ className: 'timedescription' },
						React.createElement(
							'span',
							{ className: 'hour-des' },
							'\u901F\u5EA6'
						),
						React.createElement(
							'span',
							{ className: 'minute-des' },
							'\u65F6\u95F4'
						),
						React.createElement(
							'span',
							{ className: 'second-des' },
							'\u65CB\u8F6C\u65B9\u5411'
						)
					),
					React.createElement(
						'section',
						{ className: 'time' },
						React.createElement('section', { 'data-type': 'hour', style: { width: minuteshow ? '33%' : '100%', display: hourshow ? 'inline-block' : 'none' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'hour' }),
						React.createElement('section', { 'data-type': 'minute', style: { display: minuteshow ? 'inline-block' : 'none', width: hourshow ? '33%' : '100%', left: hourshow ? '33%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'minute' }),
						React.createElement('section', { 'data-type': 'second', style: { display: secondshow ? 'inline-block' : 'none', width: hourshow ? '33%' : '100%', left: hourshow ? '66%' : '0%' },
							onTouchStart: this.startrange, onTouchMove: this.moverange,
							onTouchEnd: this.endrange, className: 'second' }),
						React.createElement(
							'section',
							{ className: 'timetext' },
							React.createElement('span', { className: 'hour', style: { left: minuteshow ? 0 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } }),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 53 + '%' : 53 + '%' } },
								'\u79D2'
							),
							React.createElement('span', { className: 'second', style: { display: secondshow ? 'inline-block' : 'none', left: hourshow ? 66 + '%' : 53 + '%' } }),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 15 + '%' : 45 + '%', display: hourshow ? '' : 'none' } },
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
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 45 + '%' : 45 + '%' } },
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
						),
						React.createElement(
							'section',
							{ className: 'secondvalue flex-column', style: { top: secondtop + '%', display: secondshow ? '' : 'none', left: hourshow && minuteshow ? 64 + '%' : 45 + '%' } },
							React.createElement(
								'span',
								{ className: secondindex - 3 < 0 ? 'line4' : 'line4' },
								secondindex - 3 < 0 ? '' : secondarr[secondindex - 3]
							),
							React.createElement(
								'span',
								{ className: secondindex - 2 < 0 ? 'line4' : 'line1' },
								secondindex - 2 < 0 ? '' : secondarr[secondindex - 2]
							),
							React.createElement(
								'span',
								{ className: secondindex - 1 < 0 ? 'line4' : 'line2' },
								secondindex - 1 < 0 ? '' : secondarr[secondindex - 1]
							),
							React.createElement(
								'span',
								{ className: 'line3' },
								secondarr[secondindex]
							),
							React.createElement(
								'span',
								{ className: secondindex + 1 >= secondarr.length ? 'line4' : 'line2' },
								secondindex + 1 >= secondarr.length ? '' : secondarr[secondindex + 1]
							),
							React.createElement(
								'span',
								{ className: secondindex + 2 >= secondarr.length ? 'line4' : 'line1' },
								secondindex + 2 >= secondarr.length ? '' : secondarr[secondindex + 2]
							),
							React.createElement(
								'span',
								{ className: secondindex + 3 >= secondarr.length ? 'line4' : 'line4' },
								secondindex + 3 >= secondarr.length ? '' : secondarr[secondindex + 3]
							)
						)
					),
					React.createElement(
						'section',
						{ className: 'selecttitle', style: { display: selecttitleShow ? 'block' : 'none' } },
						React.createElement(
							'span',
							{ className: 'title' },
							selecttitle
						)
					)
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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Help = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(3);

	var _Actions = __webpack_require__(5);

	var _Store = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// 创建React组件
	var Help = exports.Help = function (_BaseComponent) {
	    _inherits(Help, _BaseComponent);

	    function Help(props) {
	        _classCallCheck(this, Help);

	        var _this = _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store
	        _Actions.Actions.pushGuiderData(); // 请求推送向导数据
	        return _this;
	    }

	    _createClass(Help, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            document.body.scrollTop = 0;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'h-box' },
	                    React.createElement('img', { className: 'h-light', src: '../static/img/light2.png' })
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'section-1' },
	                    React.createElement(
	                        'div',
	                        { className: 'label-1' },
	                        '01'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'text' },
	                        '\u5982\u679C\u89C9\u5F97\u529B\u5EA6\u548C\u65B9\u5411\u8BA9\u4F60\u611F\u89C9\u4E0D\u8212\u670D\uFF0C\u6309\u4E0B\u6309\u94AE\uFF0C\u4EFB\u610F\u5207\u6362\u6210\u624B\u52A8\u6A21\u5F0F\uFF01'
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    { className: 'section-1 margin-t-30' },
	                    React.createElement(
	                        'div',
	                        { className: 'label-2' },
	                        '02'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'text' },
	                        '\u65F6\u95F4\u5230\u4E86\u4E4B\u540E\uFF0C\u6D01\u9762\u4EEA\u4F1A\u81EA\u52A8\u505C\u6B62\uFF0C\u4EE5\u9632\u6B62\u8FC7\u5EA6\u6E05\u6D01\u3002'
	                    )
	                )
	            );
	        }
	    }]);

	    return Help;
	}(_BaseComponentClass.BaseComponent);

/***/ }
/******/ ]);