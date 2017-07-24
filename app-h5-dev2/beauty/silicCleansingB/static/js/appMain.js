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

	        het.setTitle('智能硅胶洁面仪(舒适版)');
	        return _this;
	    }

	    return MyApp;
	}(_baseApp.App);

	// 开始渲染


	het.domReady(function () {
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/', component: MyApp }),
	        React.createElement(Route, { path: '/guider', component: _Guider.Guider })
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

	var _qslidor = __webpack_require__(11);

	var _qslidor2 = _interopRequireDefault(_qslidor);

	var _range = __webpack_require__(12);

	var _range2 = _interopRequireDefault(_range);

	var _SettingButton = __webpack_require__(13);

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
	        renderConfigData: true,
	        filter: {
	            'busiSwitch': 1, 'gears1': 1, 'runtime1': 1, 'gears2': 1, 'runtime2': 1, 'gears3': 1, 'runtime3': 1, 'gears4': 1, 'runtime4': 1, 'gears5': 1, 'runtime5': 1, 'massageGears1': 1, 'massageGears2': 1, 'massageGears3': 1, 'massageGears4': 1, 'massageGears5': 1,
	            'massageRuntime1': 1, 'massageRuntime2': 1, 'massageRuntime3': 1, 'massageRuntime4': 1, 'massageRuntime15': 1,
	            'commonGears1': 1, 'commonGears2': 1, 'commonGears3': 1, 'commonGears4': 1, 'commonGears5': 1,
	            'commonMassageGears1': 1, 'commonMassageGears2': 1, 'commonMassageGears3': 1, 'commonMassageGears4': 1, 'commonMassageGears5': 1,
	            'cleanSwitch': function cleanSwitch(type, data) {
	                if (type === 1 && data.busiSwitch == 1) {
	                    // 自动模式下不接受运行值
	                    return false;
	                }
	                return true;
	            }, 'massageSwitch': function massageSwitch(type, data) {
	                if (type === 1 && data.busiSwitch == 1) {
	                    // 自动模式下不接受运行值
	                    return false;
	                }
	                return true;
	            }
	        }
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

	        _this.state = {
	            work: 0,
	            part: 0
	        };
	        _this.listenStore(_Store.Store); // 监听Store
	        _this.gearsList = [{ id: '1', text: '一档' }, { id: '2', text: '二档' }, { id: '3', text: '三档' }, { id: '4', text: '四档' }, { id: '5', text: '五档' }];
	        _Actions.Actions.refreshData();
	        return _this;
	    }
	    // 切换部位


	    _createClass(App, [{
	        key: 'switchPart',
	        value: function switchPart(e) {
	            var part = parseInt(e.currentTarget.getAttribute('data-part'));
	            _Actions.Actions.switchPart(part);
	        }
	        // 切换手动自动

	    }, {
	        key: 'switchAuto',
	        value: function switchAuto() {
	            if (this.state.skinDataCode == 0 && !this.state.auto) {
	                // alert('您还未测试肤质，请先测试肤质！');
	                het.toast('您还未测试肤质，请先测试肤质！');
	            } else {
	                _Actions.Actions.switchAuto();
	            }
	        }
	        // 切换工作模式（洁面/按摩）

	    }, {
	        key: 'switchWork',
	        value: function switchWork() {
	            _Actions.Actions.switchWork();
	            if (this.state.work === 1) {
	                het.toast('已切换到洁面功能');
	            } else {
	                het.toast('已切换到按摩功能');
	            }
	        }
	        // 档位调整

	    }, {
	        key: 'changeGears',
	        value: function changeGears(value) {
	            _Actions.Actions.changeGears(value);
	        }
	        // 洁面时间调整

	    }, {
	        key: 'changeRuntime',
	        value: function changeRuntime(value) {
	            _Actions.Actions.changeRuntime(value);
	        }
	        // 显示排序面板

	    }, {
	        key: 'showSortPanel',
	        value: function showSortPanel() {
	            _Actions.Actions.showSortPanel(true);
	        }
	        // 关闭排序面板

	    }, {
	        key: 'closeSortPanel',
	        value: function closeSortPanel() {
	            _Actions.Actions.showSortPanel(false);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'header',
	                    null,
	                    React.createElement(
	                        'div',
	                        { className: 'panelswitch' },
	                        React.createElement(
	                            'b',
	                            { className: this.state.work === 0 ? 'active' : '', onTouchStart: this.switchWork.bind(this) },
	                            '\u6D01\u9762'
	                        ),
	                        React.createElement(
	                            'b',
	                            { className: this.state.work === 1 ? 'active' : '', onTouchStart: this.switchWork.bind(this) },
	                            '\u6309\u6469'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'face' },
	                        React.createElement(
	                            'b',
	                            { 'data-part': '0', className: 'part1' + (this.state.part === 0 ? ' active' : ''), onTouchStart: this.switchPart.bind(this) },
	                            this.state.work !== 1 ? '额头' : '眉心'
	                        ),
	                        React.createElement(
	                            'b',
	                            { 'data-part': '4', className: 'part2' + (this.state.part === 4 ? ' active' : ''), onTouchStart: this.switchPart.bind(this) },
	                            this.state.work !== 1 ? '右脸' : '右眼角'
	                        ),
	                        React.createElement(
	                            'b',
	                            { 'data-part': '2', className: 'part3' + (this.state.part === 2 ? ' active' : ''), onTouchStart: this.switchPart.bind(this) },
	                            this.state.work !== 1 ? '下巴' : '右法令纹'
	                        ),
	                        React.createElement(
	                            'b',
	                            { 'data-part': '1', className: 'part4' + (this.state.part === 1 ? ' active' : ''), onTouchStart: this.switchPart.bind(this) },
	                            this.state.work !== 1 ? '鼻子' : '左法令纹'
	                        ),
	                        React.createElement(
	                            'b',
	                            { 'data-part': '3', className: 'part5' + (this.state.part === 3 ? ' active' : ''), onTouchStart: this.switchPart.bind(this) },
	                            this.state.work !== 1 ? '左脸' : '左眼角'
	                        ),
	                        this.state.onlineStatus == 2 ? React.createElement(
	                            'span',
	                            { className: 'offline' },
	                            '\u60A8\u7684\u8BBE\u5907\u5DF2\u79BB\u7EBF'
	                        ) : ''
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'gadget' },
	                        React.createElement(Link, { className: 'guide', to: 'guider' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'gear pk-flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'gear-left color-00000' },
	                        '\u6863\u4F4D\u9009\u62E9'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'gear-right pk-flex-right' },
	                        this.state.auto ? React.createElement(
	                            'div',
	                            { className: 'gear-choose', onTouchEnd: this.switchAuto.bind(this) },
	                            React.createElement(
	                                'div',
	                                { className: 'gear-txt' },
	                                '\u81EA\u52A8'
	                            ),
	                            React.createElement('div', { className: 'gear-circle' })
	                        ) : React.createElement(
	                            'div',
	                            { className: 'gear-choose', onTouchEnd: this.switchAuto.bind(this) },
	                            React.createElement(
	                                'div',
	                                { className: 'gear-txts' },
	                                '\u624B\u52A8'
	                            ),
	                            React.createElement('div', { className: 'gear-circle gear-circles' })
	                        )
	                    )
	                ),
	                React.createElement(_qslidor2.default, { value: this.state.gears, disabled: this.state.auto, items: this.gearsList, fnFeedback: this.changeGears.bind(this) }),
	                React.createElement(
	                    'div',
	                    { className: 'cleansing-time color-00000' },
	                    '\u6D01\u9762\u65F6\u95F4'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'pk-range' },
	                    React.createElement(_range2.default, { disabled: this.state.auto, value: this.state.runTime, max: this.state.work === 1 ? 30 : 40, min: '5', fnFeedback: this.changeRuntime.bind(this) })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'pk-range-value pk-flex' },
	                    React.createElement(
	                        'div',
	                        { className: 'pk-range-lvalue' },
	                        '5s'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'pk-range-rvalue tr' },
	                        this.state.work === 1 ? 30 : 40,
	                        's'
	                    )
	                ),
	                this.state.skinDataCode ? React.createElement(
	                    'div',
	                    { className: 'cleansing-time color-00000' },
	                    '\u60A8\u7684',
	                    [['额头', '鼻子', '下巴', '左脸', '右脸'], ['眉心', '左法令纹', '右法令纹', '左眼角', '右眼角']][this.state.work][this.state.part],
	                    '\u76AE\u80A4\u5C5E\u4E8E',
	                    React.createElement(
	                        'span',
	                        { className: 'fb84a6' },
	                        ' ',
	                        this.state.skinDescribe
	                    )
	                ) : '',
	                this.state.skinDataCode ? React.createElement(
	                    'div',
	                    { className: 'info-wrap' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u6863\u4F4D\uFF1A',
	                        this.state.recGears,
	                        '\u6863'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u6E05\u6D01\u65F6\u95F4\uFF1A',
	                        this.state.recRunTime,
	                        'S'
	                    )
	                ) : React.createElement(
	                    'div',
	                    { className: 'info-wrap' },
	                    React.createElement(
	                        'p',
	                        null,
	                        '\u4E3A\u4F7F\u7845\u80F6\u6D01\u9762\u4EEA\u7684\u4F7F\u7528\u6548\u679C\u66F4\u597D\uFF0C\u63A8\u8350\u60A8\u5148\u4F7F\u7528\u6D4B\u80A4\u4EEA\u8FDB\u884C\u80A4\u8D28\u6D4B\u8BD5...',
	                        React.createElement(
	                            'a',
	                            { href: 'cbeauty://cbeauty_single_skintest', className: 'fb84a6' },
	                            '\u53BB\u6D4B\u8BD5\u80A4\u8D28>>'
	                        )
	                    )
	                ),
	                this.state.electricity < 5 && this.state.chargeStatus < 2 && this.state.onlineStatus == 1 ? React.createElement(
	                    'div',
	                    { className: 'battery' },
	                    '\u7535\u91CF\u4E0D\u8DB3\uFF0C\u8BF7\u5145\u7535'
	                ) : '',
	                React.createElement(
	                    'div',
	                    { id: 'footer', onTouchEnd: this.handlerSubmit },
	                    React.createElement(_SettingButton2.default, { settingStatus: this.state.needSave ? 'on' : 'off', callback: _Actions.Actions.submit })
	                )
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
	'changeGears', // 调节档位
	'changeRuntime', // 调节洁面时间
	'submit', // 保存设置
	'refreshData', // 刷新数据
	'pushGuiderData']);

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
	var work = 0; // 工作模式，0-洁面，1-按摩
	var part = 0; // 部位 0-额头 1-鼻子 2-下巴 3-左脸 4-右脸
	var auto = 0; // 自动/手动模式， 0-手动 1-自动
	var runConfig = {}; // 运行数据
	var recData = { // 推荐数据
	    'forHeadDescribe': '轻度偏油', //额头肤质说明
	    'noseDescribe': '中性', //鼻子肤质说明
	    'chinDescribe': '中性', //下巴肤质说明 
	    'leftFaceDescribe': '中性', //左脸肤质说明
	    'rightFaceDescribe': '中性', //右脸肤质说明
	    'recomondConfig': {
	        'gears1': 4, //洁面模式 number
	        'runtime1': 40, //洁面模式 number
	        'gears2': 4, //洁面模式 number
	        'runtime2': 20, //洁面模式 number
	        'gears3': 4, //洁面模式 number
	        'runtime3': 20, //洁面模式 number
	        'gears4': 2, //洁面模式 number
	        'runtime4': 20, //洁面模式 number
	        'gears5': 2, //洁面模式 number
	        'runtime5': 20, //洁面模式 number
	        'massageGears1': 2, //按摩模式 number
	        'massageRuntime1': 20, //按摩模式 number
	        'massageGears2': 2, //按摩模式 number
	        'massageRuntime2': 20, //按摩模式 number
	        'massageGears3': 2, //按摩模式 number
	        'massageRuntime3': 20, //按摩模式 number
	        'massageGears4': 1, //按摩模式 number
	        'massageRuntime4': 20, //按摩模式 number
	        'massageGears5': 1, //按摩模式 number
	        'massageRuntime5': 20 //按摩模式 number
	    }
	};

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

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        if (!needSave) {
	            // 无数据需要保存时，接受所有字段
	            if (has(data, 'recomondConfig')) {
	                // 检测是否推荐数据
	                recData = data;
	                runConfig = _fun.Funs._extends(runConfig, data.siliconeFacecleannerConfig);
	            } else {
	                // 其它数据当运行数据处理
	                runConfig = _fun.Funs._extends(runConfig, data);
	            }
	            if (runConfig.cleanSwitch == 1) {
	                work = 0;
	            } else if (runConfig.massageSwitch == 1) {
	                work = 1;
	            }
	        } else {
	            // 有数据需要保存时，仅接受部分状态字段
	            if (has(data, 'recomondConfig')) {
	                // 检测是否推荐数据
	                var c = data.siliconeFacecleannerConfig;
	                runConfig.electricity = typeof c.electricity !== 'undefined' ? c.electricity : runConfig.electricity;
	                runConfig.onlineStatus = typeof c.onlineStatus !== 'undefined' ? c.onlineStatus : runConfig.onlineStatus;
	                runConfig.chargeStatus = typeof c.chargeStatus !== 'undefined' ? c.chargeStatus : runConfig.chargeStatus;
	            } else {
	                runConfig.electricity = typeof data.electricity !== 'undefined' ? data.electricity : runConfig.electricity;
	                runConfig.onlineStatus = typeof data.onlineStatus !== 'undefined' ? data.onlineStatus : runConfig.onlineStatus;
	                runConfig.chargeStatus = typeof data.chargeStatus !== 'undefined' ? data.chargeStatus : runConfig.chargeStatus;
	            }
	        }
	        auto = parseInt(runConfig.busiSwitch);
	        this.trigger(getAppData()); // 有数据需要保存时，不进行渲染
	    },
	    onSwitchPart: function onSwitchPart(value) {
	        part = value;
	        this.trigger(getAppData());
	    },
	    onShowSortPanel: function onShowSortPanel(value) {
	        this.trigger({ sortPanelShow: value });
	    },
	    onSwitchAuto: function onSwitchAuto() {
	        auto = auto === 1 ? 0 : 1;
	        needSave = true;
	        runConfig.busiSwitch = auto;
	        this.trigger(getAppData());
	    },
	    onSwitchWork: function onSwitchWork() {
	        work = work === 1 ? 0 : 1;
	        needSave = true;
	        this.trigger(getAppData());
	    },
	    onChangeGears: function onChangeGears(value) {
	        var key = getKeyNames().gearName.replace('commonG', 'g').replace('commonM', 'm'); // 数据不能保存到常用模式里
	        needSave = true;
	        runConfig[key] = value;
	        if (auto == 0) {
	            // 把常用档位归零
	            runConfig['common' + key.replace(/^g/, 'G').replace(/^m/, 'M')] = 0;
	        }
	        this.trigger(getAppData());
	    },
	    onChangeRuntime: function onChangeRuntime(value) {
	        var key = getKeyNames().runtimeName;
	        needSave = true;
	        runConfig[key] = value;
	        this.trigger(getAppData());
	    },
	    onSubmit: function onSubmit() {
	        var sendData = auto ? _fun.Funs._extends({}, runConfig, recData.recomondConfig) : runConfig;
	        needSave = false;
	        if (work === 1) {
	            // 按摩模式
	            sendData.cleanSwitch = 2;
	            sendData.massageSwitch = 1;
	        } else {
	            // 洁面模式
	            sendData.cleanSwitch = 1;
	            sendData.massageSwitch = 2;
	        }
	        het.send(sendData, function (data) {
	            het.toast('同步成功！');
	        }, function (data) {
	            het.toast('同步失败！');
	        });
	        this.trigger(getAppData());
	    },
	    onRefreshData: function onRefreshData() {
	        this.trigger(getAppData());
	    },
	    onPushGuiderData: function onPushGuiderData() {
	        var configs = auto ? recData.recomondConfig : runConfig;
	        this.trigger(_fun.Funs._extends({ work: work }, configs));
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
	        _this.items = [{ text: '', gears: 1, runtime: 0 }, { text: '', gears: 1, runtime: 0 }, { text: '', gears: 1, runtime: 0 }, { text: '', gears: 1, runtime: 0 }, { text: '', gears: 1, runtime: 0 }];
	        _Actions.Actions.pushGuiderData(); // 请求推送向导数据
	        return _this;
	    }

	    _createClass(Guider, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            document.body.scrollTop = 0;
	            // console.log(document.body.scrollTop);
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate() {
	            var work = this.state.work;
	            this.items = [{
	                text: work ? '眉心' : '额头',
	                gears: work ? this.state.commonMassageGears1 ? this.state.commonMassageGears1 : this.state.massageGears1 : this.state.commonGears1 ? this.state.commonGears1 : this.state.gears1,
	                runtime: work ? this.state.massageRuntime1 : this.state.runtime1
	            }, {
	                text: work ? '左眼角' : '鼻子', // 鼻子 2
	                gears: work ? this.state.commonMassageGears2 ? this.state.commonMassageGears2 : this.state.massageGears2 : this.state.commonGears2 ? this.state.commonGears2 : this.state.gears2,
	                runtime: work ? this.state.massageRuntime2 : this.state.runtime2
	            }, {
	                text: work ? '右眼角' : '下巴', // 下巴 3
	                gears: work ? this.state.commonMassageGears3 ? this.state.commonMassageGears3 : this.state.massageGears3 : this.state.commonGears3 ? this.state.commonGears3 : this.state.gears3,
	                runtime: work ? this.state.massageRuntime3 : this.state.runtime3
	            }, {
	                text: work ? '左法令纹' : '左脸', // 左脸 4
	                gears: work ? this.state.commonMassageGears4 ? this.state.commonMassageGears4 : this.state.massageGears4 : this.state.commonGears4 ? this.state.commonGears4 : this.state.gears4,
	                runtime: work ? this.state.massageRuntime4 : this.state.runtime4
	            }, {
	                text: work ? '右法令纹' : '右脸', // 右脸 5
	                gears: work ? this.state.commonMassageGears5 ? this.state.commonMassageGears5 : this.state.massageGears5 : this.state.commonGears5 ? this.state.commonGears5 : this.state.gears5,
	                runtime: work ? this.state.massageRuntime5 : this.state.runtime5
	            }];
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            het.setTitle(this.state.work != 1 ? '洁面步骤' : '按摩步骤');
	            return React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'c-steps-title' },
	                    '\u8BF7\u6309\u4EE5\u4E0B\u6B65\u9AA4\u8FDB\u884C',
	                    this.state.work ? '按摩' : '洁面'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'c-step-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fr c-step-head' },
	                            this.items[0].text
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'c-step-circle' },
	                            '1'
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fr c-step-text' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6863\u4F4D:',
	                                this.items[0].gears,
	                                '\u6863'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6D01\u9762\u65F6\u95F4:',
	                                this.items[0].runtime,
	                                's'
	                            )
	                        ),
	                        React.createElement('dd', { className: 'c-step-hr' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'c-step-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fl tar c-step-head' },
	                            this.items[1].text
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'c-step-circle' },
	                            '2'
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fl tar c-step-text' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6863\u4F4D:',
	                                this.items[1].gears,
	                                '\u6863'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6D01\u9762\u65F6\u95F4:',
	                                this.items[1].runtime,
	                                's'
	                            )
	                        ),
	                        React.createElement('dd', { className: 'c-step-hr' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'c-step-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fr c-step-head' },
	                            this.items[2].text
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'c-step-circle' },
	                            '3'
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fr c-step-text' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6863\u4F4D:',
	                                this.items[2].gears,
	                                '\u6863'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6D01\u9762\u65F6\u95F4:',
	                                this.items[2].runtime,
	                                's'
	                            )
	                        ),
	                        React.createElement('dd', { className: 'c-step-hr' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'c-step-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fl tar c-step-head' },
	                            this.items[3].text
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'c-step-circle' },
	                            '4'
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fl tar c-step-text' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6863\u4F4D:',
	                                this.items[3].gears,
	                                '\u6863'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6D01\u9762\u65F6\u95F4:',
	                                this.items[3].runtime,
	                                's'
	                            )
	                        ),
	                        React.createElement('dd', { className: 'c-step-hr' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'c-step-wrap' },
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fr c-step-head' },
	                            this.items[4].text
	                        ),
	                        React.createElement(
	                            'dd',
	                            { className: 'c-step-circle' },
	                            '5'
	                        )
	                    ),
	                    React.createElement(
	                        'dl',
	                        { className: 'fclear' },
	                        React.createElement(
	                            'dd',
	                            { className: 'fr c-step-text' },
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6863\u4F4D:',
	                                this.items[4].gears,
	                                '\u6863'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '\u6D01\u9762\u65F6\u95F4:',
	                                this.items[4].runtime,
	                                's'
	                            )
	                        )
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

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {array}    items       传入组件，格式：[{id:ID,text:TEXT},..]
	 * @prop {integer}  value       传入初始值
	 * @prop {boolean}  disabled    是否可以点击
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 */
	var QSlidor = React.createClass({
	    displayName: "QSlidor",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    slidable: false,
	    XY: { startX: 0, startY: 0, endX: 0, endY: 0 },
	    handlerTouchStart: function handlerTouchStart(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        this.XY.startX = this.XY.endX = touchs[0].pageX;
	        this.XY.startY = this.XY.endY = touchs[0].pageY;
	        // 检测滑动是否有效
	        if (touchs.length === 1 && !this.props.disabled) {
	            cursor.style.marginLeft = 0;
	            this.props.items.forEach(function (item) {
	                var el = ReactDOM.findDOMNode(this.refs["item" + item.id]);
	                if (this.XY.startX >= el.offsetLeft && this.XY.startX <= el.offsetLeft + el.offsetWidth) {
	                    // 检测是否位于已激活的选项内开始滑动的。如否，则不允许滑动
	                    // this.slidable = el.className.indexOf("active")>-1; 
	                    this.slidable = true;
	                }
	            }.bind(this));
	        }
	    },
	    handlerTouchMove: function handlerTouchMove(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
	        var parent = ReactDOM.findDOMNode(this.refs["qslider"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var left = touchs[0].pageX - parent.offsetLeft - cursor.offsetWidth / 2;
	        e.preventDefault();
	        if (this.slidable) {
	            cursor.style.opacity = 1;
	            cursor.style.left = left + "px";
	        }
	    },
	    handlerTouchEnd: function handlerTouchEnd(e) {
	        var touchs = e.originalEvent ? e.originalEvent.touches : e.changedTouches;
	        var parent = ReactDOM.findDOMNode(this.refs["qslider"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var ml = 0;
	        this.XY.endX = touchs[0].pageX;
	        this.XY.endY = touchs[0].pageY;
	        if (this.slidable) {
	            this.props.items.forEach(function (item) {
	                var el = ReactDOM.findDOMNode(this.refs["item" + item.id]);
	                if (this.XY.endX >= el.offsetLeft && this.XY.endX <= el.offsetLeft + el.offsetWidth) {
	                    ml = el.offsetLeft - (this.XY.endX - parent.offsetLeft - cursor.offsetWidth * 3 / 2);
	                    cursor.style.marginLeft = ml + "px";
	                    cursor.style.opacity = 0;
	                    this.sendResult(item.id);
	                }
	            }.bind(this));
	        }
	        this.slidable = false;
	    },
	    sendResult: function sendResult(value) {
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        return React.createElement(
	            "menu",
	            { ref: "qslider", className: "qslider flex", onTouchStart: this.handlerTouchStart, onTouchEnd: this.handlerTouchEnd, onTouchMove: this.handlerTouchMove },
	            React.createElement("i", { ref: "cursor", className: "qslider-cursor" }),
	            this.props.items.map(function (item, key) {
	                return React.createElement(
	                    "a",
	                    { key: key, ref: "item" + item.id, className: "flex-cell " + (item.id == value ? "active" : "") },
	                    React.createElement("i", null),
	                    item.text
	                );
	            }.bind(this))
	        );
	    }
	});

	module.exports = QSlidor;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 滑动选择器组件
	 * @prop {integer}  value       传入初始值
	 * @prop {function} fnFeedback  用于接收处理结果的函数
	 * @prop {integer}  min         可选，最小值，缺省为0
	 * @prop {integer}  max         可选，最大值，缺省为100
	 * @prop {boolean}  disabled    可选，是否可以点击
	 */
	var Range = React.createClass({
	    displayName: "Range",

	    getInitialState: function getInitialState() {
	        return {};
	    },
	    min: function min() {
	        return this.props.min || "0";
	    },
	    max: function max() {
	        return this.props.max || "100";
	    },
	    // 定位
	    pos: function pos(value) {
	        var wrap = ReactDOM.findDOMNode(this.refs["wrap"]);
	        var cursor = ReactDOM.findDOMNode(this.refs["cursor"]);
	        var rate = (value - this.min()) / (this.max() - this.min()); // 比率
	        var left = (wrap.offsetWidth - cursor.offsetWidth) / 100 * rate * 100;
	        cursor.style.left = left + "px";
	    },
	    handlerChange: function handlerChange(e) {
	        var value = parseInt(e.target.value);
	        this.setState({ value: value });
	        if (typeof this.props.fnFeedback === "function") {
	            this.props.fnFeedback(value); // 反馈处理结果
	        }
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        this.oldPropValue = this.props.value; // oldPropValue用于比较prop修改时的状态
	        this.state.value = value; // 强行保持state与value同步
	        this.pos(value);
	    },
	    componentDidMount: function componentDidMount() {
	        this.componentDidUpdate();
	    },
	    render: function render() {
	        var value = typeof this.state.value !== "undefined" && this.oldPropValue === this.props.value ? this.state.value : this.props.value;
	        return React.createElement(
	            "div",
	            { className: "__range" },
	            React.createElement(
	                "label",
	                { ref: "wrap" },
	                React.createElement("input", { type: "range", min: this.min(), max: this.max(), onChange: this.handlerChange, value: value, disabled: this.props.disabled ? "disabled" : "" }),
	                React.createElement(
	                    "i",
	                    { ref: "cursor", className: "cursor" },
	                    value
	                )
	            )
	        );
	    }
	});

	module.exports = Range;

/***/ },
/* 13 */
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
	        var status = this.state.settingBtnStatus || this.props.settingStatus || 'off';
	        if (status == 'off') return;
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