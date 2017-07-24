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

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	var _SettingButton = __webpack_require__(7);

	var _SettingButton2 = _interopRequireDefault(_SettingButton);

	var _TimeSelect = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var Toast = __webpack_require__(6);
	// 定义toast函数，以供多次调用
	var topToast = function topToast(msg) {
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


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data, type) {
	    _Actions.Actions.repaint(data, type);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            mode: 1,
	            skinType5: 1,
	            updateFlag: 0,
	            chargeStatus: 1, // 充电状态(0-预留，1-无充电，2-正在充电，3-充电满)
	            electricity: 19, // 电量
	            currentRunMode: 1, // 当前运行模式类型(1-补水模式，2-舒缓模式,3-清爽模式,4-滋养模式,5-手动模式)
	            currentRunTime: 100, // 当前运行时间
	            onlineStatus: 1, // 在线状态（1-正常, 2-异常）
	            skinDataCode: 1, // 有无肤质数据(0-无, 1-有)
	            busiSwitch: 0, // 业务开关（0：关 1：开） 0-手动 1-自动
	            runTime: 11, // 自动模式下的运行时间

	            timeshow: false,
	            modeshow: false,
	            defaultMode: '补水',
	            arrayInit: false,
	            defaultminute: 100
	        };
	        _this.baseData = {
	            modes: ["补水模式", "补水模式", "舒缓模式", "清爽模式", "滋养模式", "自定义模式"],
	            skins: ["综合肤质", "干性", "中性偏干", "中性", "混合性偏干", "混合性", "混合性偏油", "油性皮肤"],
	            times: [0, 100, 40, 80, 50, 40]
	        };
	        _this.maxminute = 120;
	        _this.minminute = 10;
	        _this.startY = 0;
	        _this.newY = 0;
	        _this.isModeChange = false;
	        _this.isTimeChange = false;
	        _this.listenStore(_Store.Store); // 监听Store
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps, nextState) {
	            this.isTimeChange = typeof nextState.isTimeChange !== 'undefined' ? nextState.isTimeChange : this.isTimeChange;
	            this.isModeChange = typeof nextState.isModeChange !== 'undefined' ? nextState.isModeChange : this.isModeChange;
	            this.state.mode = typeof nextState.mode !== 'undefined' ? nextState.mode : this.state.mode;
	            this.state.chargeStatus = typeof nextState.chargeStatus !== 'undefined' ? nextState.chargeStatus : this.state.chargeStatus;
	            this.state.electricity = typeof nextState.electricity !== 'undefined' ? nextState.electricity : this.state.electricity;
	            this.state.currentRunMode = typeof nextState.currentRunMode !== 'undefined' ? nextState.currentRunMode : this.state.currentRunMode;
	            this.state.currentRunTime = typeof nextState.currentRunTime !== 'undefined' ? nextState.currentRunTime : this.state.currentRunTime;
	            this.state.onlineStatus = typeof nextState.onlineStatus !== 'undefined' ? nextState.onlineStatus : this.state.onlineStatus;
	            this.state.skinDataCode = typeof nextState.skinDataCode !== 'undefined' ? nextState.skinDataCode : this.state.skinDataCode;
	            this.state.busiSwitch = typeof nextState.busiSwitch !== 'undefined' ? nextState.busiSwitch : this.state.busiSwitch;
	            if (typeof nextState.configMode == 'undefined') {
	                this.state.runTime = typeof nextState.runTime !== 'undefined' ? nextState.runTime : this.state.runTime;
	            }
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            try {
	                myscroller.refresh();
	            } catch (err) {}
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            topToast("使用完喷雾仪，建议进行肤质测试，以得到更好的效果...");
	        }
	    }, {
	        key: 'handlerTouchMove',
	        value: function handlerTouchMove(e) {
	            if (e.target.type !== "range") {
	                e.preventDefault(); // 修复touchmove无效的BUG
	            }
	        }
	    }, {
	        key: 'handlerTounch',
	        value: function handlerTounch(e) {
	            // 自动和手动模式切换
	            var skinDataCode = this.state.skinDataCode;
	            var mode = this.state.mode;
	            var runTime = this.state.runTime;
	            var curMode = this.state.currentRunMode;
	            var curTime = this.state.currentRunTime;
	            var busiSwitch = this.state.busiSwitch;
	            if (!+skinDataCode) {
	                het.toast("您还未测试肤质，请先测试肤质！");
	                return;
	            }
	            _Actions.Actions.changeSmart(busiSwitch);
	        }
	        /**
	         * 判断是否需要保存
	         * @return   {boolean}   如需保存返回true，否则返回false
	         */

	    }, {
	        key: 'getSaveFlag',
	        value: function getSaveFlag(changeObj) {
	            var count = 0;

	            for (var k in changeObj) {
	                if (changeObj[k] !== this.state[k]) count++;
	            }
	            return !!count;
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
	            _Actions.Actions.chooesTime(m);
	            this.setState({ timeshow: false, arrayInit: true });
	        }
	    }, {
	        key: 'startTouch',
	        value: function startTouch(e) {
	            if (this.state.busiSwitch == 1) {
	                return false;
	            }
	            this.newY = 0;
	            this.startY = parseInt(e.touches[0].clientY);
	        }
	    }, {
	        key: 'moveTouch',
	        value: function moveTouch(e) {
	            if (this.state.busiSwitch == 1) {
	                return false;
	            }
	            this.newY = parseInt(e.touches[0].clientY);
	        }
	    }, {
	        key: 'endTouch',
	        value: function endTouch(e) {
	            var _this2 = this;

	            if (this.state.busiSwitch == 1) {
	                return false;
	            }
	            var disY = this.newY || this.startY - this.startY;
	            if (Math.abs(disY) <= 20) {
	                var type = e.currentTarget.getAttribute('data-type');

	                var _ret = function () {
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
	                        case 'time':
	                            if (_this2.state.currentRunMode != 5) {
	                                return {
	                                    v: false
	                                };
	                            }
	                            clearTimeout(_this2.timer3);
	                            var time = ReactDOM.findDOMNode(_this2.refs.time);
	                            time.style.background = '#fde7ee';
	                            _this2.timer2 = setTimeout(function () {
	                                time.style.background = '';
	                                this.maxminute = 120;
	                                this.minminute = 10;
	                                this.setState({ defaultminute: this.state.currentRunTime, timeshow: true, arrayInit: false });
	                            }.bind(_this2), 80);
	                    }
	                }();

	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
	        key: 'cancelMode',
	        value: function cancelMode(e) {
	            e.stopPropagation();
	            e.preventDefault();
	            this.setState({
	                modeshow: false
	            });
	        }
	    }, {
	        key: 'changeMode',
	        value: function changeMode(e) {
	            var index = e.currentTarget.getAttribute('data-mode');
	            this.setState({ modeshow: false });
	            _Actions.Actions.changeMode(index);
	        }
	    }, {
	        key: 'syncData',
	        value: function syncData() {
	            var configMode = void 0,
	                runTime = void 0;
	            var busiSwitch = this.state.busiSwitch;
	            var updateFlag = this.state.updateFlag;
	            this.isModeChange = false;
	            this.isTimeChange = false;
	            if (updateFlag <= 0) {
	                return;
	            }
	            if (+busiSwitch) {
	                configMode = this.state.mode;
	                runTime = this.state.runTime;
	            } else {
	                configMode = this.state.currentRunMode;
	                runTime = this.state.currentRunTime;
	            }

	            // // 更改发送App数据
	            // this.state.currentRunMode = configMode;
	            // this.state.currentRunTime = runTime;
	            // this.state.configMode = configMode;
	            // this.state.runTime = runTime;
	            // this.state.busiSwitch = busiSwitch;

	            _Actions.Actions.sync(updateFlag, busiSwitch, configMode, runTime);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this3 = this;

	            var currentRunMode = parseInt(this.state.currentRunMode);
	            var mode = parseInt(this.state.mode); // 自动模式下的模式
	            var busiSwitch = this.state.busiSwitch; //　模式开关(0-手动模式，1-自动模式)
	            var skinDataCode = this.state.skinDataCode;
	            var currentRunTime = this.state.currentRunTime;
	            var runTime = this.state.runTime; // 自动模式下时间设置
	            var skinType = this.state.skinType5;
	            var recommendMode = this.state.mode;
	            var waterTrend = this.state.waterTrend;

	            var slideStyle = {
	                position: 'absolute',
	                zIndex: 11,
	                top: '2.8rem',
	                right: '1.8rem',
	                fontSize: '16px'
	            };
	            var mitems = ['补水', '舒缓', '清爽', '滋养', '自定义'];
	            var icons = ['../static/img/water.png', '../static/img/restful.png', '../static/img/refreshing.png', '../static/img/nourish.png', '../static/img/custom.png'];

	            var activeStyle = +busiSwitch === 1 ? { display: 'none' } : { display: 'block' };
	            var nonActiveStyle = +busiSwitch === 1 ? { display: 'block' } : { display: 'none' };
	            var batteryOrLine = React.createElement('div', null); //设备电量低或者离线在线
	            var description = React.createElement('span', null); //智能推荐描述

	            var modeIndex;
	            if (+busiSwitch == 0) {
	                modeIndex = currentRunMode - 1;
	            } else {
	                modeIndex = recommendMode - 1;
	            }
	            if (modeIndex == -1) {
	                modeIndex = 0;
	            }
	            if (this.state.skinDataCode === null || this.state.skinDataCode == 0) {
	                description = React.createElement(
	                    'div',
	                    { className: 'tips' },
	                    React.createElement(
	                        'span',
	                        null,
	                        '\u672A\u6D4B\u80A4\u65E0\u6CD5\u4E3A\u60A8\u667A\u80FD\u63A8\u8350\uFF0C\u4EE5\u4E0B\u4E3A\u8BBE\u5907\u9ED8\u8BA4\u503C'
	                    ),
	                    React.createElement(
	                        'a',
	                        { style: { color: '#007eff' }, href: 'cbeauty://cbeauty_single_skintest' },
	                        '\u8D76\u7D27\u53BB\u6D4B\u80A4>>'
	                    )
	                );
	            } else {
	                if (this.state.busiSwitch == 0) {
	                    description = React.createElement(
	                        'div',
	                        { className: 'tips' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u9009\u62E9\u4E00\u79CD\u6A21\u5F0F\uFF0C\u8BBE\u7F6E\u55B7\u96FE\u65F6\u957F'
	                        )
	                    );
	                } else {
	                    description = React.createElement(
	                        'div',
	                        { className: 'tips' },
	                        React.createElement(
	                            'span',
	                            null,
	                            '\u6839\u636E\u60A8\u7684\u80A4\u8D28\u667A\u80FD\u63A8\u8350'
	                        )
	                    );
	                }
	            }

	            if (this.state.electricity <= 3 && this.state.electricity > 0) {
	                batteryOrLine = React.createElement('div', { className: 'low-battery' });
	            } else if (this.state.onlineStatus == 2) {
	                batteryOrLine = React.createElement('div', { className: 'out-line' });
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
	                        React.createElement('a', { className: this.state.busiSwitch === 0 ? 'gear-choose' : 'gear-choose-active', onTouchEnd: this.handlerTounch.bind(this) })
	                    )
	                ),
	                React.createElement(
	                    'section',
	                    null,
	                    description,
	                    React.createElement(
	                        'div',
	                        { className: 'btnList flex' },
	                        React.createElement(
	                            'div',
	                            { className: 'btnSwitch btn1 flex', 'data-type': 'mode', ref: 'mode', onTouchStart: this.startTouch.bind(this), onTouchMove: this.moveTouch.bind(this), onTouchEnd: this.endTouch.bind(this) },
	                            React.createElement('img', { src: icons[modeIndex], alt: 'modeSlect', className: "water" }),
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    +busiSwitch == 0 ? this.baseData.modes[currentRunMode] : this.baseData.modes[mode],
	                                    React.createElement('em', { className: "em" + (this.isModeChange && this.state.updateFlag ? "2" : ""), style: +busiSwitch == 1 ? { display: 'none' } : {} })
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'btnSwitch btn1 flex relative', 'data-type': 'time', ref: 'time', onTouchStart: this.startTouch.bind(this), onTouchMove: this.moveTouch.bind(this), onTouchEnd: this.endTouch.bind(this) },
	                            React.createElement(
	                                'div',
	                                { className: 'clock' },
	                                React.createElement(
	                                    'span',
	                                    { className: 'minute2' },
	                                    +busiSwitch == 0 ? currentRunTime : runTime,
	                                    'sec'
	                                )
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    "时长",
	                                    React.createElement('em', { className: "em" + (this.isTimeChange && this.state.updateFlag ? "2" : ""), style: +busiSwitch == 0 && currentRunMode == 5 ? {} : { display: 'none' } })
	                                )
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'footer',
	                    { className: 'setBut' },
	                    React.createElement(_SettingButton2.default, { settingStatus: this.state.updateFlag ? 'on' : 'off', callback: this.syncData.bind(this) })
	                ),
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
	                                { className: 'flex', key: index, 'data-mode': index, onTouchStart: _this3.endDefault.bind(_this3), onTouchMove: _this3.endDefault.bind(_this3), onTouchEnd: _this3.changeMode.bind(_this3) },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    its
	                                ),
	                                React.createElement('em', { style: +modeIndex == index ? {} : { display: 'none' } })
	                            );
	                        })
	                    )
	                ),
	                React.createElement(_TimeSelect.TimeSelect, { hourshow: false, minuteshow: true, statusname: ' ', unit: '\u79D2', minutestep: 10, title: this.state.hottitle,
	                    cancelClock: this.cancelClock.bind(this), submitClock: this.submitClock.bind(this),
	                    defaultminute: this.state.defaultminute, ArrayInit: this.state.arrayInit,
	                    show: this.state.timeshow, maxminute: this.maxminute, minminute: this.minminute }),
	                React.createElement('div', { id: 'mytoast' })
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('C-Life 设备控制');
	    // 无路由方式
	    ReactDOM.render(React.createElement(App, null), document.getElementById('ROOT'));

	    // 路由方式
	    /*ReactDOM.render((
	        <Router history={hashHistory}>
	            <Route path="/" component={App} />
	        </Router>
	    ), document.getElementById('ROOT'));*/
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
	'sync', // 同步数据
	'changeMode', //手动模式下切换不同模式
	'chooesTime', //自定义模式下改变时间
	'changeSmart']);

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

	var Toast = __webpack_require__(6);
	// 定义toast函数，以供多次调用
	var topToast = function topToast(msg) {
	    document.getElementById('mytoast').innerHTML = "";
	    ReactDOM.render(React.createElement(
	        Toast,
	        { verticalAlign: '0', secs: '10', block: true },
	        msg
	    ), document.getElementById('mytoast'));
	};
	var AppData = {};
	var needSave = false;
	var times = [0, 100, 40, 80, 50, 40];
	var sendDate = {
	    "updateFlag": 0,
	    "busiSwitch": 0,
	    "configMode": 0,
	    "runTime": 0
	};
	var myMode = void 0;
	var myTime = void 0;
	var isSmart = void 0;
	var isModeChanged = false;
	var isTimeChanged = false;
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
	/**
	 * 判断是否需要保存
	 * @return   {boolean}   如需保存返回true，否则返回false
	 */
	function getSaveFlag(idx, time) {
	    var index = parseInt(idx);
	    var t = parseInt(time);
	    if (isSmart) {
	        return true;
	    }
	    if (myMode == index && myTime == t) {
	        return false;
	    } else {
	        return true;
	    }
	}
	/**
	 * 判断模式是否改变
	 * @return   {boolean}   如需保存返回true，否则返回false
	 */
	function getModeFlag(idx) {
	    var index = parseInt(idx);
	    if (isSmart) {
	        return true;
	    }
	    if (myMode == index) {
	        return false;
	    } else {
	        return true;
	    }
	}
	/**
	 * 判断时间是否改变
	 * @return   {boolean}   如需保存返回true，否则返回false
	 */
	function getTimeFlag(time) {
	    var t = parseInt(time);
	    if (isSmart) {
	        return true;
	    }
	    if (myTime == t && !isModeChanged) {
	        return false;
	    } else {
	        return true;
	    }
	}
	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],

	    onRepaint: function onRepaint(data) {
	        console.log("data====", data);
	        if (AppData.updateFlag !== 1) {
	            AppData.mode = typeof data.mode !== 'undefined' ? data.mode : AppData.mode;
	            AppData.chargeStatus = typeof data.chargeStatus !== 'undefined' ? data.chargeStatus : AppData.chargeStatus;
	            AppData.electricity = typeof data.electricity !== 'undefined' ? data.electricity : AppData.electricity;
	            AppData.currentRunMode = typeof data.currentRunMode !== 'undefined' ? data.currentRunMode : AppData.currentRunMode;
	            AppData.currentRunTime = typeof data.currentRunTime !== 'undefined' ? data.currentRunTime : AppData.currentRunTime;
	            AppData.onlineStatus = typeof data.onlineStatus !== 'undefined' ? data.onlineStatus : AppData.onlineStatus;
	            AppData.skinDataCode = typeof data.skinDataCode !== 'undefined' ? data.skinDataCode : AppData.skinDataCode;
	            AppData.busiSwitch = typeof data.busiSwitch !== 'undefined' ? data.busiSwitch : AppData.busiSwitch;
	            if (typeof data.configMode == 'undefined') {
	                AppData.runTime = typeof data.runTime !== 'undefined' ? data.runTime : AppData.runTime;
	            }
	            data.updateFlag = 0;
	            AppData.updateFlag = 0;
	            if (+AppData.busiSwitch) {
	                isSmart = 1;
	                myMode = typeof AppData.mode !== 'undefined' ? AppData.mode : AppData.currentRunMode;
	                myTime = typeof AppData.runTime !== 'undefined' ? AppData.runTime : AppData.currentRunTime;
	            } else {
	                isSmart = 0;
	                myMode = AppData.currentRunMode;
	                myTime = AppData.currentRunTime;
	            }
	            isModeChanged = false;
	            isTimeChanged = false;
	            this.trigger(data);
	        } else {
	            data.chargeStatus = typeof data.chargeStatus !== 'undefined' ? data.chargeStatus : AppData.chargeStatus;
	            data.electricity = typeof data.electricity !== 'undefined' ? data.electricity : AppData.electricity;
	            data.onlineStatus = typeof data.onlineStatus !== 'undefined' ? data.onlineStatus : AppData.onlineStatus;
	            this.trigger({ chargeStatus: data.chargeStatus, electricity: data.electricity, onlineStatus: data.onlineStatus });
	        }
	    },

	    onSync: function onSync(uf, bs, m, t) {
	        var _this = this;

	        // 同步数据至app
	        var mode = myMode;
	        var time = myTime;
	        var smart = isSmart;
	        sendDate.updateFlag = parseInt(uf);
	        sendDate.busiSwitch = parseInt(bs);
	        sendDate.configMode = parseInt(m);
	        sendDate.runTime = parseInt(t);
	        isSmart = parseInt(bs);
	        myMode = parseInt(m);
	        myTime = parseInt(t);
	        AppData.updateFlag = 0;
	        this.trigger({ updateFlag: 0 });
	        het.send(sendDate, function (data) {
	            het.toast('同步成功！');
	            isModeChanged = false;
	            isTimeChanged = false;
	            AppData.updateFlag = 0; // 重置标记位
	            _this.trigger({ updateFlag: AppData.updateFlag, isModeChange: isModeChanged, isTimeChange: isTimeChanged });
	            topToast("使用完喷雾仪,建议进行肤质测试,以得到更好的效果...");
	        }, function (data) {
	            het.toast('同步失败！');
	            isSmart = smart;
	            myMode = mode;
	            myTime = time;
	            AppData.updateFlag = 1; // 重置标记位
	            _this.trigger({ updateFlag: AppData.updateFlag, isModeChange: isModeChanged, isTimeChange: isTimeChanged });
	        });
	    },

	    onChangeMode: function onChangeMode(idx) {
	        var mIndex = parseInt(idx) + 1;
	        var mTime = times[mIndex];
	        // let changeStatus = getSaveFlag(mIndex, mTime);
	        isModeChanged = getModeFlag(mIndex);
	        AppData.currentRunMode = mIndex;
	        AppData.currentRunTime = mTime;
	        if (isModeChanged) {
	            // 更改发送App数据
	            AppData.updateFlag |= 0x01;
	        } else {
	            AppData.updateFlag &= 0x10;
	        }
	        this.trigger({ isModeChange: isModeChanged, updateFlag: AppData.updateFlag, currentRunMode: AppData.currentRunMode, currentRunTime: AppData.currentRunTime });
	    },

	    onChooesTime: function onChooesTime(min) {
	        var mTime = parseInt(min);
	        isTimeChanged = getTimeFlag(mTime);
	        AppData.currentRunTime = mTime;
	        if (isTimeChanged) {
	            // 更改发送App数据
	            AppData.updateFlag |= 0x01;
	        } else {
	            AppData.updateFlag &= 0x10;
	        }
	        this.trigger({ isModeChange: isModeChanged, isTimeChange: isTimeChanged, updateFlag: AppData.updateFlag, currentRunTime: AppData.currentRunTime });
	    },

	    onChangeSmart: function onChangeSmart(busiSwitch) {
	        var mbusiSwitch = parseInt(busiSwitch);
	        if (mbusiSwitch == 0 && mbusiSwitch !== isSmart || mbusiSwitch !== isSmart && !isModeChanged && !isTimeChanged) {
	            AppData.updateFlag = 0;
	        } else {
	            AppData.updateFlag = 1;
	        }
	        if (mbusiSwitch == 1) {
	            mbusiSwitch = 0;
	        } else {
	            mbusiSwitch = 1;
	        }
	        this.trigger({ updateFlag: AppData.updateFlag, busiSwitch: mbusiSwitch });
	    }
	});

/***/ },
/* 6 */
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
	        css["-webkit-animation"] = css.animation;
	        css["-moz-animation"] = css.animation;
	        css["-o-animation"] = css.animation;
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
/* 7 */
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
				React.createElement('section', null),
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

/***/ }
/******/ ]);