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

	var _SettingButton = __webpack_require__(9);

	var _SettingButton2 = _interopRequireDefault(_SettingButton);

	var _TimeSelect = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var Toast = __webpack_require__(8);
	// 定义toast函数，以供多次调用
	var mytoast = function mytoast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};
	var _ReactRouter = ReactRouter,
	    Router = _ReactRouter.Router,
	    Route = _ReactRouter.Route,
	    hashHistory = _ReactRouter.hashHistory;

	// 开始渲染

	document.addEventListener('DOMContentLoaded', function () {
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: App })
	    ), document.getElementById('ROOT'));
	}, false);

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this2.state = {
	            smartModeSwitch: 0,
	            defaulthour: 1,
	            defaultminute: 5,
	            defaultsecond: '单向',
	            recDescription: '',

	            valueH: 0,
	            timeshow: false,

	            activeIndexArr: [],
	            currenActiveIndex: -1
	        };
	        _this2.items = [{ 'name': '额头', 'speed': 1, 'time': '', 'imageClass': 'forehead-img', 'changed': false, 'remark': '' }, { 'name': '鼻子', 'speed': 1, 'time': '', 'imageClass': 'nose-img', 'changed': false, 'remark': '' }, { 'name': '下巴', 'speed': 1, 'time': '', 'imageClass': 'chin-img', 'changed': false, 'remark': '' }, { 'name': '左脸', 'speed': 1, 'time': '', 'imageClass': 'left-face-img', 'changed': false, 'remark': '' }, { 'name': '右脸', 'speed': 1, 'time': '', 'imageClass': 'right-face-img', 'changed': false, 'remark': '' }];
	        _this2.listenStore(_Store.Store); // 监听Store
	        return _this2;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.tclock = setInterval(function () {
	                _Actions.Actions.intervalData();
	            }, 5000);
	            _Actions.Actions.intervalData();
	            mytoast("使用完超声波洁面仪，建议进行肤质测试，以得到更好的效果...");
	        }
	    }, {
	        key: 'switchStateChange',
	        value: function switchStateChange() {
	            var value = this.state.smartModeSwitch;
	            if (this.state.skinType == null && !value) {
	                mytoast('您还未测试肤质，请先测试肤质！');
	                return;
	            } else {
	                _Actions.Actions.switchStateChange(value);
	            }
	        }

	        // 切换部位

	    }, {
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
	                activeIndex == 0 ? this.maxminute = 40 : this.maxminute = 40;
	                switch (parseInt(activeIndex)) {
	                    case 0:
	                        this.recDescription = this.items[0].remark;
	                        h = this.items[0].speed;
	                        m = this.items[0].time;
	                        if (m < 5) {
	                            m = 5;
	                        } else if (m > 40) {
	                            m = 40;
	                        }
	                        break;
	                    case 1:
	                        this.recDescription = this.items[1].remark;
	                        h = this.items[1].speed;
	                        m = this.items[1].time;
	                        break;
	                    case 2:
	                        this.recDescription = this.items[2].remark;
	                        h = this.items[2].speed;
	                        m = this.items[2].time;
	                        break;
	                    case 3:
	                        this.recDescription = this.items[3].remark;
	                        h = this.items[3].speed;
	                        m = this.items[3].time;
	                        break;
	                    case 4:
	                        this.recDescription = this.items[4].remark;
	                        h = this.items[4].speed;
	                        m = this.items[4].time;
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
	        key: 'cancelClock',
	        value: function cancelClock() {
	            this.setState({
	                timeshow: false,
	                arrayInit: true
	            });
	        }
	    }, {
	        key: 'submitClock',
	        value: function submitClock(h, m) {
	            var index = this.state.currenActiveIndex;
	            var items = this.items;
	            if (items[index].speed != h || items[index].time != m) {
	                items[index].changed = true;
	            } else {
	                if (items[index].changed) {
	                    items[index].changed = true;
	                } else {
	                    items[index].changed = false;
	                }
	            }
	            // console.log(items[index].changed);
	            // 这个是改变后的数组
	            items[index].speed = h;
	            items[index].time = m;
	            this.setState({
	                timeshow: false,
	                needSave: true,
	                arrayInit: true
	            });
	            _Actions.Actions.changeGears(items);
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
	            this.items[0].changed = this.state.foreheadChanged !== nextState.foreheadChanged ? nextState.foreheadChanged : this.items[0].changed;
	            this.items[0].remark = this.state.foreheadRemarks !== nextState.foreheadRemarks ? nextState.foreheadRemarks : this.items[0].remark;
	            this.items[1].speed = this.state.noseGears !== nextState.noseGears ? nextState.noseGears : this.items[1].speed; //鼻子速度
	            this.items[1].time = this.state.noseRuntime !== nextState.noseRuntime ? nextState.noseRuntime : this.items[1].time; //鼻子时间
	            this.items[1].changed = this.state.noseChanged !== nextState.noseChanged ? nextState.noseChanged : this.items[1].changed;
	            this.items[1].remark = this.state.noseRemarks !== nextState.noseRemarks ? nextState.noseRemarks : this.items[1].remark;
	            this.items[2].speed = this.state.chinGears !== nextState.chinGears ? nextState.chinGears : this.items[2].speed; //下巴速度
	            this.items[2].time = this.state.chinRuntime !== nextState.chinRuntime ? nextState.chinRuntime : this.items[2].time; //下巴时间
	            this.items[2].changed = this.state.chinChanged !== nextState.chinChanged ? nextState.chinChanged : this.items[2].changed;
	            this.items[2].remark = this.state.chinRemarks !== nextState.chinRemarks ? nextState.chinRemarks : this.items[2].remark;
	            this.items[3].speed = this.state.leftfaceGears !== nextState.leftfaceGears ? nextState.leftfaceGears : this.items[3].speed; //左脸速度
	            this.items[3].time = this.state.leftfaceRuntime !== nextState.leftfaceRuntime ? nextState.leftfaceRuntime : this.items[3].time; //左脸时间
	            this.items[3].changed = this.state.leftfaceChanged !== nextState.leftfaceChanged ? nextState.leftfaceChanged : this.items[3].changed;
	            this.items[3].remark = this.state.leftfaceRemarks !== nextState.leftfaceRemarks ? nextState.leftfaceRemarks : this.items[3].remark;
	            this.items[4].speed = this.state.rightfaceGears !== nextState.rightfaceGears ? nextState.rightfaceGears : this.items[4].speed; //右脸速度
	            this.items[4].time = this.state.rightfaceRuntime !== nextState.rightfaceRuntime ? nextState.rightfaceRuntime : this.items[4].time; //右脸时间
	            this.items[4].changed = this.state.rightfaceChanged !== nextState.rightfaceChanged ? nextState.rightfaceChanged : this.items[4].changed;
	            this.items[4].remark = this.state.rightfaceRemarks !== nextState.rightfaceRemarks ? nextState.rightfaceRemarks : this.items[4].remark;
	        }
	    }, {
	        key: 'submit',
	        value: function submit() {
	            clearInterval(this.tclock);
	            var _this = this;
	            setTimeout(function () {
	                _this.tclock = setInterval(function () {
	                    _Actions.Actions.intervalData();
	                }, 5000);
	            }, 12000);
	            for (var i = 0, len = this.items.length; i < len; i++) {
	                this.items[i].changed = false;
	            }
	            _Actions.Actions.submit(this.items);
	        }
	    }, {
	        key: 'callback',
	        value: function callback(value) {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            // console.log("..................",this.state);
	            var items = this.items;
	            var description = React.createElement('span', null); //智能推荐描述
	            var batteryOrLine = React.createElement('div', null); //设备电量低或者离线在线
	            if (this.state.skinType === null) {
	                description = React.createElement(
	                    'div',
	                    { className: 'tips ' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u672A\u6D4B\u80A4\u65E0\u6CD5\u4E3A\u60A8\u667A\u80FD\u63A8\u8350\uFF0C\u4EE5\u4E0B\u4E3A\u8BBE\u5907\u9ED8\u8BA4\u503C'
	                    )
	                );
	            } else {
	                if (this.state.smartModeSwitch == 0) {
	                    description = React.createElement(
	                        'div',
	                        { className: 'tips' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u9009\u62E9\u4E00\u4E2A\u90E8\u4F4D\uFF0C\u8BBE\u7F6E\u6D01\u9762\u53C2\u6570'
	                        )
	                    );
	                } else {
	                    description = React.createElement(
	                        'div',
	                        { className: 'tips' },
	                        React.createElement(
	                            'p',
	                            null,
	                            '\u5DF2\u6839\u636E\u60A8\u76AE\u80A4\u6570\u636E\u667A\u80FD\u63A8\u8350\u6700\u5408\u9002\u7684\u65B9\u6848'
	                        )
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
	                        { className: 'logo', ref: 'logo' },
	                        batteryOrLine
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'switchArea' },
	                        React.createElement('div', { className: this.state.smartModeSwitch === 1 ? "switchOn" : "switchOff", onTouchEnd: this.switchStateChange.bind(this) })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    description,
	                    React.createElement(
	                        'div',
	                        { className: 'line' },
	                        this.items.map(function (item, index) {
	                            return React.createElement(
	                                'div',
	                                { className: 'item', key: index, 'data-index': index, onTouchStart: _this3.startTouch.bind(_this3), onTouchMove: _this3.moveTouch.bind(_this3), onTouchEnd: _this3.endTouch.bind(_this3) },
	                                React.createElement(
	                                    'p',
	                                    null,
	                                    item.name
	                                ),
	                                React.createElement(
	                                    'div',
	                                    { className: '' },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        '\u6863\u4F4D:',
	                                        React.createElement(
	                                            'em',
	                                            { className: item.changed && _this3.state.activeIndexArr.indexOf(index) != -1 ? 'active' : '' },
	                                            item.speed + "档"
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        '\u65F6\u95F4:',
	                                        React.createElement(
	                                            'em',
	                                            { className: item.changed && _this3.state.activeIndexArr.indexOf(index) != -1 ? 'active' : '' },
	                                            item.time + "S"
	                                        )
	                                    ),
	                                    React.createElement('div', { className: _this3.state.smartModeSwitch === 0 ? 'arrow-right' : '' }),
	                                    React.createElement('div', { className: 'part-img ' + item.imageClass })
	                                )
	                            );
	                        })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'footer' },
	                    React.createElement(_SettingButton2.default, { settingStatus: this.state.needSave ? 'on' : 'off', callback: this.submit.bind(this) })
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { title: this.recDescription, hourshow: true, minuteshow: true, secondshow: true,
	                    cancelClock: this.cancelClock.bind(this), submitClock: this.submitClock.bind(this),
	                    ArrayInit: this.state.arrayInit, defaulthour: this.state.defaulthour, defaultminute: this.state.defaultminute, defaultsecond: this.state.defaultsecond,
	                    statusname: ' ', show: this.state.timeshow, maxminute: this.maxminute, minminute: 5, hourarray: [1, 2, 3, 4, 5],
	                    secondarray: ['单向', '双向-切换1次', '双向-切换2次', '双向-切换3次'], titleshow: false }),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

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
	"switchStateChange", "changeGears", 'submit', 'getToken', 'getData', 'postData', 'intervalData']);

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

	var _fun = __webpack_require__(6);

	var Toast = __webpack_require__(8);

	var needSave = false; // 是否需要保存设置
	var smartModeSwitch = 0; //智能模式开关：0-手动，1-自动
	var showTestSkin = 0; // 智能模式的描述显示
	var AppData = {
	    'skinType': null
	};
	var sendData = {
	    updateFlag: 0
	};
	var recConfigMark = {};
	var currentData = {};
	var appId = '30590';
	var appSecret = "98889238ed6e441aaf9b0691b017695f";

	// 定义toast函数，以供多次调用
	var mytoast = function mytoast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};

	/**
	 * 配置数组到配置对象的转换
	 * @param    {array}      items 设置参数
	 * @return   {json}        返回设置对象
	 */
	function arrToObj(array) {
	    var data = {};
	    data.foreheadGears = array[0].speed; //额头档位
	    data.foreheadRuntime = array[0].time; //额头时间
	    data.foreheadChanged = array[0].changed;
	    data.noseGears = array[1].speed; //鼻子档位
	    data.noseRuntime = array[1].time; //鼻子时间
	    data.noseChanged = array[1].changed;
	    data.chinGears = array[2].speed; //下巴档位
	    data.chinRuntime = array[2].time; //下巴时间
	    data.chinChanged = array[2].changed;
	    data.leftfaceGears = array[3].speed; //左脸档位
	    data.leftfaceRuntime = array[3].time; //左脸时间
	    data.leftfaceChanged = array[3].changed;
	    data.rightfaceGears = array[4].speed; //右脸档位
	    data.rightfaceRuntime = array[4].time; //右脸时间
	    data.rightfaceChanged = array[4].changed;
	    return data;
	}

	function getCurrentDeviceSn() {
	    return het.getDeviceId();
	}

	/**
	 * 拼接返回给页面的字段
	 * @return   {object}        返回给页面的字段
	 */
	function getTriggerData() {
	    var data = {
	        smartModeSwitch: AppData.smartModeSwitch,
	        skinType: AppData.skinType,
	        needSave: needSave,
	        electricity: AppData.electricity,
	        onlineStatus: AppData.onlineStatus,
	        chargeStatus: AppData.chargeStatus
	    };
	    return data;
	}

	function getFaceCleanerConfig(array) {

	    var data = {};

	    //part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
	    array.map(function (item, index) {
	        if (item.part == 11) {
	            data.foreheadGears = item.gears;
	            data.foreheadRuntime = item.runTime;
	            data.foreheadRemarks = item.remark;
	        }
	        if (item.part == 14) {
	            data.chinGears = item.gears;
	            data.chinRuntime = item.runTime;
	            data.chinRemarks = item.remark;
	        }
	        if (item.part == 13) {
	            data.leftfaceGears = item.gears;
	            data.leftfaceRuntime = item.runTime;
	            data.leftfaceRemarks = item.remark;
	        }
	        if (item.part == 15) {
	            data.rightfaceGears = item.gears;
	            data.rightfaceRuntime = item.runTime;
	            data.rightfaceRemarks = item.remark;
	        }
	        if (item.part == 12) {
	            data.noseGears = item.gears;
	            data.noseRuntime = item.runTime;
	            data.noseRemarks = item.remark;
	        }
	    });
	    return data;
	}

	function getCurrentRunConfig(array) {

	    var data = {};

	    //part 部位（11-额头，12-鼻子，13-左脸，14-下颚，15-右脸）
	    array.map(function (item, index) {
	        if (item.part == 11) {
	            data.foreheadGears = item.gears;
	            data.foreheadRuntime = item.runTime;
	            data.foreheadRemarks = item.remark;
	        }
	        if (item.part == 14) {
	            data.chinGears = item.gears;
	            data.chinRuntime = item.runTime;
	            data.chinRemarks = item.remark;
	        }
	        if (item.part == 13) {
	            data.leftfaceGears = item.gears;
	            data.leftfaceRuntime = item.runTime;
	            data.leftfaceRemarks = item.remark;
	        }
	        if (item.part == 15) {
	            data.rightfaceGears = item.gears;
	            data.rightfaceRuntime = item.runTime;
	            data.rightfaceRemarks = item.remark;
	        }
	        if (item.part == 12) {
	            data.noseGears = item.gears;
	            data.noseRuntime = item.runTime;
	            data.noseRemarks = item.remark;
	        }
	    });
	    return data;
	}

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        var _this2 = this;

	        var skinType = void 0,
	            runData = void 0;
	        if (AppData.currentConfig === undefined || AppData.currentConfig == null) {
	            AppData.currentConfig = {};
	        }
	        if (AppData.faceCleanerConfig === undefined || AppData.faceCleanerConfig == null) {
	            AppData.faceCleanerConfig = {};
	        }
	        if (!needSave) {
	            //无数据保存时，接受所有字段
	            if (data.currentRunConfig) {
	                var tempData = getCurrentRunConfig(data.currentRunConfig);
	                currentData = _fun.Funs._extends({}, tempData); // 这个是最原始的当前数据
	                // console.log('原始的当前运行数据转换后的数据',currentData);
	                AppData.currentConfig = _fun.Funs._extends({}, currentData);
	            }
	            if (data.faceCleanerConfig) {

	                var _tempData = getFaceCleanerConfig(data.faceCleanerConfig);

	                AppData.faceCleanerConfig = _tempData;
	                AppData.skinType = 1;
	                AppData.faceCleanerConfig.foreheadChanged = false;
	                AppData.faceCleanerConfig.noseChanged = false;
	                AppData.faceCleanerConfig.chinChanged = false;
	                AppData.faceCleanerConfig.leftfaceChanged = false;
	                AppData.faceCleanerConfig.rightfaceChanged = false;
	                recConfigMark.foreheadRemarks = _tempData.foreheadRemarks;
	                recConfigMark.noseRemarks = _tempData.noseRemarks;
	                recConfigMark.chinRemarks = _tempData.chinRemarks;
	                recConfigMark.leftfaceRemarks = _tempData.leftfaceRemarks;
	                recConfigMark.rightfaceRemarks = _tempData.rightfaceRemarks;
	            }
	            AppData.electricity = typeof data.electricity !== 'undefined' ? data.electricity : AppData.electricity;
	            AppData.onlineStatus = typeof data.onlineStatus !== 'undefined' ? data.onlineStatus : AppData.onlineStatus;
	            AppData.chargeStatus = typeof data.chargeStatus !== 'undefined' ? data.chargeStatus : AppData.chargeStatus;
	            AppData.smartModeSwitch = typeof data.currentRunMode !== 'undefined' ? data.currentRunMode : AppData.smartModeSwitch;

	            if (AppData.smartModeSwitch == 1) {
	                var _tempData2 = getTriggerData();
	                this.trigger(_fun.Funs._extends(AppData.faceCleanerConfig, _tempData2, recConfigMark)); // 推荐数据，和当前的运行数据，每个部位的描述合并
	            } else {
	                var _tempData3 = getTriggerData();
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
	                var _runData = _fun.Funs._extends(AppData.currentConfig, _tempData3, recConfigMark);
	                this.trigger(_runData);
	            }
	        } else {
	            //有数据保存时，仅接受部分字段
	            if (AppData.smartModeSwitch == 1) {
	                var _tempData4 = getTriggerData();
	                this.trigger(_fun.Funs._extends(AppData.faceCleanerConfig, _tempData4, recConfigMark));
	            } else {
	                var _tempData5 = getTriggerData();
	                runData = _fun.Funs._extends(AppData.currentConfig, _tempData5, recConfigMark);
	                this.trigger(runData);
	            }
	        }
	        if (AppData.currentRunMode === undefined && data.currentRunMode == 1) {
	            (function () {
	                var _this = _this2;
	                var objData = {
	                    "updateFlag": 1023,
	                    "gears1": data.currentRunConfig[0].gears,
	                    "runtime1": data.currentRunConfig[0].runTime,
	                    "gears2": data.currentRunConfig[1].gears,
	                    "runtime2": data.currentRunConfig[1].runTime,
	                    "gears3": data.currentRunConfig[2].gears,
	                    "runtime3": data.currentRunConfig[2].runTime,
	                    "gears4": data.currentRunConfig[3].gears,
	                    "runtime4": data.currentRunConfig[3].runTime,
	                    "gears5": data.currentRunConfig[4].gears,
	                    "runtime5": data.currentRunConfig[4].runTime,
	                    "source": 2,
	                    "configMode": 1
	                };
	                var callback = function callback(data) {
	                    var accessToken = data;
	                    var url = (het.getHost() || "https://test.api.clife.cn") + "/v1/app/chairdressing/facecleaner/config/set";
	                    var timestamp = +new Date();
	                    var deviceId = getCurrentDeviceSn();
	                    var source = 2;
	                    var trigger = function trigger() {
	                        needSave = false;
	                        sendData.updateFlag = 0; //每次提交重置自动模式的updateFlag
	                        _this.trigger({ needSave: false });
	                        mytoast("同步成功");
	                    };
	                    var json = JSON.stringify(objData);
	                    var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&" + appSecret));
	                    var obj = "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&sign=" + sign;
	                    _this.onPostData(url, obj, trigger);
	                };
	                var errCall = function errCall() {
	                    _this.trigger({ needSave: true });
	                };
	                het.getToken(callback, errCall);
	            })();
	        }
	    },
	    onGetData: function onGetData(getUrl, callback) {
	        if (!getUrl) return;
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200 || xhr.status === 304) {
	                    var result = JSON.parse(xhr.responseText);
	                    if (result.code == 0) {
	                        callback(result.data);
	                    } else {
	                        // mytoast(result.msg);
	                    }
	                } else {
	                    mytoast('获取运行数据失败');
	                }
	            }
	        };
	        xhr.open('GET', getUrl, true);
	        xhr.send();
	    },
	    onPostData: function onPostData(POSTUrl) {
	        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	        var callback = arguments[2];

	        if (!POSTUrl) return;
	        var _this = this;
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	                if (xhr.status === 200 || xhr.status === 304) {
	                    var result = JSON.parse(xhr.responseText);
	                    if (result.code == 0) {
	                        callback(result.data);
	                    } else {
	                        mytoast('同步失败');
	                        _this.trigger({ needSave: true });
	                    }
	                } else {
	                    mytoast('同步失败');
	                    _this.trigger({ needSave: true });
	                }
	            }
	        };
	        xhr.open("POST", POSTUrl, true);
	        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	        xhr.send(data);
	    },
	    onIntervalData: function onIntervalData() {
	        var _this = this;
	        var callback = function callback(data) {
	            //获取设备在线离线状态
	            var onlineUrl = (het.getHost() || "https://test.api.clife.cn") + "/v1/device/getDeviceInfo";
	            var appType = !!(navigator.userAgent.indexOf('Android') + 1) ? 1 : 2;
	            var timestamp = +new Date();
	            var accessToken = data;
	            var deviceId = getCurrentDeviceSn();
	            if (!deviceId) return;
	            onlineUrl = onlineUrl + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp + "&deviceId=" + deviceId + "&appType=" + appType;
	            var infoCall = function infoCall(data) {
	                var result = { "onlineStatus": data.onlineStatus };
	                AppData.onlineStatus = data.onlineStatus;
	                _this.trigger({ onlineStatus: data.onlineStatus });
	            };
	            _this.onGetData(onlineUrl, infoCall);
	            if (AppData.onlineStatus == 2) return; //离线状态,停止获取数据
	            //获取default接口数据
	            var statusUrl = (het.getHost() || "https://test.api.clife.cn") + "/v1/app/chairdressing/faceCleaner/defaultMode";
	            statusUrl = statusUrl + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp + "&deviceId=" + deviceId;
	            //获取运行数据
	            var runUrl = (het.getHost() || "https://test.api.clife.cn") + "/v1/device/data/get";
	            runUrl = runUrl + "?appId=" + appId + "&accessToken=" + accessToken + "&timestamp=" + timestamp + "&deviceId=" + deviceId;
	            _this.onGetData(statusUrl, _this.onRepaint);
	            _this.onGetData(runUrl, _this.onRepaint);
	        };
	        var errCall = function errCall() {
	            _this.trigger({ needSave: true });
	        };
	        het.getToken(callback, errCall);
	    },
	    onSwitchStateChange: function onSwitchStateChange(value) {
	        needSave = true;
	        if (value == 1) {
	            // 先改变value的值，然后再合并
	            AppData.smartModeSwitch = 0;
	            var tempData = getTriggerData();
	            this.trigger(_fun.Funs._extends(AppData.currentConfig, tempData, recConfigMark));
	        } else if (value == 0) {
	            // 先改变value的值，然后再合并
	            if (AppData.faceCleanerConfig) {
	                AppData.smartModeSwitch = 1;
	            }
	            var _tempData6 = getTriggerData();
	            // if(AppData.faceCleanerConfig && AppData.skinType !== null){
	            //     AppData.faceCleanerConfig.showTestSkin = 1;//智能模式有推荐数据
	            // }else{
	            //     AppData.faceCleanerConfig.showTestSkin = 2;//智能模式无推荐数据
	            // }
	            this.trigger(_fun.Funs._extends(AppData.faceCleanerConfig, _tempData6, recConfigMark));
	        }
	    },


	    //  这个是选择器点击了确定之后
	    onChangeGears: function onChangeGears(items) {
	        needSave = true;
	        var data = arrToObj(items);
	        // console.log(items);
	        var tempData = getTriggerData();
	        AppData.currentConfig = _fun.Funs._extends(AppData.currentConfig, data, tempData, recConfigMark);
	        // console.log("222222",AppData.currentConfig);
	        this.trigger(AppData.currentConfig);
	    },
	    onSubmit: function onSubmit(items) {
	        var _this = this;
	        // console.log("currentData ....",currentData);
	        // needSave = false;
	        sendData.gears1 = items[0].speed; //额头档位
	        sendData.runtime1 = items[0].time; //额头时间
	        sendData.gears2 = items[1].speed; //鼻子档位
	        sendData.runtime2 = items[1].time; //鼻子时间
	        sendData.gears3 = items[2].speed; //下巴档位
	        sendData.runtime3 = items[2].time; //下巴时间
	        sendData.gears4 = items[3].speed; //左脸档位
	        sendData.runtime4 = items[3].time; //左脸时间
	        sendData.gears5 = items[4].speed; //右脸档位
	        sendData.runtime5 = items[4].time; //右脸时间
	        sendData.source = 2;
	        sendData.configMode = AppData.smartModeSwitch;
	        // needSave = false;

	        // console.log("sendData ....",sendData);
	        // this.trigger({needSave:false});
	        if (AppData.smartModeSwitch == 1) {
	            if (AppData.faceCleanerConfig.foreheadGears != AppData.currentConfig.foreheadGears) {
	                sendData.updateFlag |= Math.pow(2, 0);
	            };
	            if (AppData.faceCleanerConfig.noseGears != AppData.currentConfig.noseGears) {
	                sendData.updateFlag |= Math.pow(2, 2);
	            };
	            if (AppData.faceCleanerConfig.leftfaceGears != AppData.currentConfig.leftfaceGears) {
	                //左脸 gear4
	                sendData.updateFlag |= Math.pow(2, 6);
	            };
	            if (AppData.faceCleanerConfig.chinGears != AppData.currentConfig.chinGears) {
	                //下巴  gear3
	                sendData.updateFlag |= Math.pow(2, 4);
	            };
	            if (AppData.faceCleanerConfig.rightfaceGears != AppData.currentConfig.rightfaceGears) {
	                sendData.updateFlag |= Math.pow(2, 8);
	            };

	            if (AppData.faceCleanerConfig.foreheadRuntime != AppData.currentConfig.foreheadRuntime) {
	                sendData.updateFlag |= Math.pow(2, 1);
	            };
	            if (AppData.faceCleanerConfig.noseRuntime != AppData.currentConfig.noseRuntime) {
	                sendData.updateFlag |= Math.pow(2, 3);
	            };
	            if (AppData.faceCleanerConfig.leftfaceRuntime != AppData.currentConfig.leftfaceRuntime) {
	                sendData.updateFlag |= Math.pow(2, 7);
	            };
	            if (AppData.faceCleanerConfig.chinRuntime != AppData.currentConfig.chinRuntime) {
	                sendData.updateFlag |= Math.pow(2, 5);
	            };
	            if (AppData.faceCleanerConfig.rightfaceRuntime != AppData.currentConfig.rightfaceRuntime) {
	                sendData.updateFlag |= Math.pow(2, 9);
	            };
	        } else {
	            // console.log("AcurrentData.foreheadGears",currentData.foreheadGears)
	            // console.log("sendData.gears1",sendData.gears1)
	            if (currentData.foreheadGears != sendData.gears1) {
	                sendData.updateFlag |= Math.pow(2, 0);
	            };
	            if (currentData.noseGears != sendData.gears2) {
	                sendData.updateFlag |= Math.pow(2, 2);
	            };
	            if (currentData.leftfaceGears != sendData.gears4) {
	                //左脸 gear4
	                sendData.updateFlag |= Math.pow(2, 6);
	            };
	            if (currentData.chinGears != sendData.gears3) {
	                //下巴  gear3
	                sendData.updateFlag |= Math.pow(2, 4);
	            };
	            if (currentData.rightfaceGears != sendData.gears5) {
	                sendData.updateFlag |= Math.pow(2, 8);
	            };

	            if (currentData.foreheadRuntime != sendData.runtime1) {
	                sendData.updateFlag |= Math.pow(2, 1);
	            };
	            if (currentData.noseRuntime != sendData.runtime2) {
	                sendData.updateFlag |= Math.pow(2, 3);
	            };
	            if (currentData.chinRuntime != sendData.runtime3) {
	                sendData.updateFlag |= Math.pow(2, 5);
	            };
	            if (currentData.leftfaceRuntime != sendData.runtime4) {
	                sendData.updateFlag |= Math.pow(2, 7);
	            };
	            if (currentData.rightfaceRuntime != sendData.runtime5) {
	                sendData.updateFlag |= Math.pow(2, 9);
	            };
	        }

	        var callback = function callback(data) {
	            var accessToken = data;
	            var url = (het.getHost() || "https://test.api.clife.cn") + "/v1/app/chairdressing/facecleaner/config/set";
	            var timestamp = +new Date();
	            var deviceId = getCurrentDeviceSn();
	            var source = 2;
	            var trigger = function trigger() {
	                needSave = false;
	                sendData.updateFlag = 0; //每次提交重置自动模式的updateFlag
	                _this.trigger({ needSave: false });
	                mytoast("同步成功");
	            };
	            var json = JSON.stringify(sendData);
	            var sign = CryptoJS.enc.Hex.stringify(CryptoJS.MD5("POST" + url + "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&" + appSecret));
	            var obj = "accessToken=" + accessToken + "&appId=" + appId + "&deviceId=" + deviceId + "&json=" + json + "&source=" + source + "&timestamp=" + timestamp + "&sign=" + sign;
	            _this.onPostData(url, obj, trigger);
	        };
	        var errCall = function errCall() {
	            _this.trigger({ needSave: true });
	        };
	        het.getToken(callback, errCall);
	        this.trigger({ needSave: false });
	        AppData.currentConfig.foreheadChanged = false;
	        AppData.currentConfig.noseChanged = false;
	        AppData.currentConfig.chinChanged = false;
	        AppData.currentConfig.leftfaceChanged = false;
	        AppData.currentConfig.rightfaceChanged = false;
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

	"use strict";

	/**
	 * toast组件，用于弹出提示信息
	 * 使用该组件时，需导入toast.css文件
	 * @prop {integer} verticalAlign  垂直对齐，缺省为1，取值0-2，对应top、middle、bottom
	 * @prop {boolean} block          是否宽幅，缺省为false
	 * @prop {integer} secs           显示时间，缺省为2s
	 */
	var Toast = React.createClass({
	    displayName: "Toast",

	    aligns: [{ top: 0 }, { bottom: 100 }, { bottom: 0 }],
	    anim: ["toastD", "toastN", "toastU"],
	    render: function render() {
	        var va = typeof this.props.verticalAlign === "undefined" ? 1 : this.props.verticalAlign;
	        var secs = typeof this.props.secs !== "undefined" ? this.props.secs : 2;
	        var css = this.aligns[va];
	        css.animation = this.anim[va] + " " + (+secs + 2) + "s";
	        // 兼容旧版
	        css["WebkitAnimation"] = css.animation;
	        css["MozAnimation"] = css.animation;
	        css["OAnimation"] = css.animation;
	        return React.createElement(
	            "section",
	            { style: css, className: "toast" },
	            React.createElement(
	                "div",
	                { className: this.props.block ? "block" : "span" },
	                this.props.children
	            )
	        );
	    }
	});

	module.exports = Toast;

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
			// 防止点透
			this.endDefault(e);
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
						{ className: 'timedescription flex' },
						React.createElement(
							'span',
							{ className: 'hour-des' },
							'\u6863\u4F4D'
						),
						React.createElement(
							'span',
							{ className: 'minute-des' },
							'\u65F6\u95F4'
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
								{ className: 'hour', style: { left: minuteshow ? 28 + '%' : 53 + '%', display: hourshow ? 'inline-block' : 'none' } },
								'\u6863'
							),
							React.createElement(
								'span',
								{ className: 'minute', style: { display: minuteshow ? 'inline-block' : 'none', left: hourshow ? 78 + '%' : 53 + '%' } },
								'\u79D2'
							),
							React.createElement(
								'span',
								{ className: 'status' },
								statusname
							)
						),
						React.createElement(
							'section',
							{ className: 'hourvalue flex-column', style: { top: hourtop + '%', left: minuteshow ? 23 + '%' : 60 + '%', display: hourshow ? '' : 'none' } },
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
							{ className: 'minutevalue flex-column', style: { top: minutetop + '%', display: minuteshow ? '' : 'none', left: hourshow ? 70 + '%' : 50 + '%' } },
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

/***/ }
/******/ ]);