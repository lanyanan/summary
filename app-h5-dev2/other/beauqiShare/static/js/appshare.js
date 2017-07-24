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

	module.exports = __webpack_require__(7);


/***/ },
/* 1 */,
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
	                originComponentDidMount();
	            }
	        };
	        // 重定义子类componentWillUnmount
	        _this.componentWillUnmount = function () {
	            _this.superComponentWillUnmount();
	            if (typeof originComponentWillUnmount === 'function') {
	                originComponentWillUnmount();
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
	var Actions = exports.Actions = Reflux.createActions(['repaint']);

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

	var Store = exports.Store = Reflux.createStore({
	    listenables: [_Actions.Actions],
	    onRepaint: function onRepaint(data) {
	        this.trigger(data);
	    }
	});

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _BaseComponentClass = __webpack_require__(2);

	var _Actions = __webpack_require__(4);

	var _Store = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import {Funs} from '../../../common/src/fun.es6';


	var _ReactRouter = ReactRouter;
	var Router = _ReactRouter.Router;
	var Route = _ReactRouter.Route;
	var hashHistory = _ReactRouter.hashHistory;


	het.domReady(function () {
	    // 配置sdk
	    het.config({
	        debugMode: 'print', // 打印调试数据
	        updateFlagMap: {}
	    });
	});

	// 接收app推送数据
	het.repaint(function (data) {
	    // var appData = Funs._extends({}, appData, data);
	    _Actions.Actions.repaint(data);
	});

	// 创建React组件

	var App = function (_BaseComponent) {
	    _inherits(App, _BaseComponent);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.state = {};
	        _this.listenStore(_Store.Store); // 监听Store

	        return _this;
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            //console.log();
	            var apply = this.props.params.apply || "1"; //是否已经申请
	            var num = this.props.params.num; //已参加人数
	            var date1 = new Date(parseInt(this.props.params.date1)); //开始时间戳
	            var date2 = new Date(parseInt(this.props.params.date2)); //结束时间戳
	            var date4 = new Date().getTime();
	            var date3 = this.props.params.date2 - date4; //时间差的毫秒
	            //计算出相差天数
	            var days = Math.floor(date3 / (24 * 3600 * 1000));
	            //计算出小时数
	            var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
	            var hours = Math.floor(leave1 / (3600 * 1000));
	            if (days < 0) {
	                days = 0;
	            }
	            if (hours < 0) {
	                hours = 0;
	            }
	            return React.createElement(
	                'div',
	                { className: 'shareDiv' },
	                React.createElement(
	                    'div',
	                    { className: 'shareHader' },
	                    React.createElement(
	                        'div',
	                        { className: 'timeDiv' },
	                        '剩余',
	                        days,
	                        '天',
	                        hours,
	                        '小时'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'activityNews' },
	                    React.createElement(
	                        'div',
	                        { className: 'activityNumber' },
	                        React.createElement(
	                            'span',
	                            { className: 'text' },
	                            '数量'
	                        ),
	                        React.createElement('br', null),
	                        React.createElement(
	                            'span',
	                            { className: 'number' },
	                            '20'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'activityValue' },
	                        React.createElement(
	                            'span',
	                            { className: 'text' },
	                            '价值'
	                        ),
	                        React.createElement('br', null),
	                        React.createElement(
	                            'span',
	                            { className: 'number' },
	                            React.createElement(
	                                'span',
	                                { className: 'moneyIcon' },
	                                '￥'
	                            ),
	                            '999'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'activityPeople' },
	                        React.createElement(
	                            'span',
	                            { className: 'text' },
	                            '参加人数'
	                        ),
	                        React.createElement('br', null),
	                        React.createElement(
	                            'span',
	                            { className: 'number' },
	                            num
	                        )
	                    )
	                ),
	                apply === "1" ? React.createElement(
	                    'div',
	                    { className: 'apply_zero translateX', onTouchStart: function onTouchStart() {
	                            return location.href = "cbeauty://cbeauty_activityapply";
	                        } },
	                    React.createElement('span', { className: 'love' }),
	                    React.createElement(
	                        'span',
	                        { className: 'text' },
	                        '0元申请'
	                    )
	                ) : apply === "2" ? React.createElement(
	                    'div',
	                    { className: 'applyDiv translateX', onTouchStart: function onTouchStart() {
	                            return location.href = "cbeauty://cbeauty_editaddress";
	                        } },
	                    React.createElement(
	                        'p',
	                        null,
	                        '已申请',
	                        React.createElement('img', { className: 'verticalBar', src: '../static/images/verticalBar.png', alt: '' }),
	                        '查看收货地址',
	                        React.createElement('img', { className: 'OkArrows', src: '../static/images/OkArrows.png', alt: '' })
	                    )
	                ) : React.createElement(
	                    'div',
	                    { className: 'applyDiv translateX', onTouchStart: function onTouchStart() {
	                            return location.href = "cbeauty://cbeauty_editaddress";
	                        } },
	                    React.createElement(
	                        'p',
	                        null,
	                        '已申请',
	                        React.createElement('img', { className: 'verticalBar', src: '../static/images/verticalBar.png', alt: '' }),
	                        '填写收货地址',
	                        React.createElement('img', { className: 'OkArrows', src: '../static/images/OkArrows.png', alt: '' })
	                    )
	                ),
	                ';',
	                React.createElement('div', { className: 'Awi translateX' }),
	                React.createElement(
	                    'div',
	                    { className: 'activeDirectory translateX' },
	                    React.createElement(
	                        'div',
	                        { className: 'width-auto translateX' },
	                        React.createElement(
	                            'div',
	                            { className: 'roundDiv  roundDiv_1' },
	                            React.createElement(
	                                'p',
	                                { className: 'pTop' },
	                                '免费'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '申请'
	                            )
	                        ),
	                        React.createElement('div', { className: 'Splice' }),
	                        React.createElement(
	                            'div',
	                            { className: 'roundDiv roundDiv_2' },
	                            React.createElement(
	                                'p',
	                                { className: 'pTop' },
	                                '参加'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '抽奖'
	                            )
	                        ),
	                        React.createElement('div', { className: 'Splice' }),
	                        React.createElement(
	                            'div',
	                            { className: 'roundDiv roundDiv_3' },
	                            React.createElement(
	                                'p',
	                                { className: 'pTop' },
	                                '体验'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '产品'
	                            )
	                        ),
	                        React.createElement('div', { className: 'Splice' }),
	                        React.createElement(
	                            'div',
	                            { className: 'roundDiv roundDiv_4' },
	                            React.createElement(
	                                'p',
	                                { className: 'pTop' },
	                                '撰写'
	                            ),
	                            React.createElement(
	                                'p',
	                                null,
	                                '点评'
	                            )
	                        )
	                    )
	                ),
	                React.createElement('div', { className: 'Awi_details translateX' }),
	                React.createElement(
	                    'div',
	                    { className: 'activity_rule translateX' },
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold' },
	                        '活动规则'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '活动时间：',
	                        date1.getMonth() + 1,
	                        '月',
	                        date1.getDate(),
	                        '日—',
	                        date2.getMonth() + 1,
	                        '月',
	                        date2.getDate(),
	                        '日'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '试用产品：超声波智能洁面仪一套'
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold p_top' },
	                        '申请方式'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '1.戳击“0元申请”按钮'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '2.把活动资讯分享给微信好友'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '3.填写详细的资料信息'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '4.关注微信公众号（关注CLady),查看获奖名单'
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold p_top' },
	                        '获奖须知'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '1.活动结束后将随机抽取20位幸运用户'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '2.奖品将在9月7日寄出,获奖用户请留意查收'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '3.获得试用资格的用户，提交使用反馈有惊喜大礼等着你'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '4.如有任何疑问,请在微信公众号留言即可'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '5.本次活动解释权归和而泰家居在线所有'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'two_dimension_div' },
	                    React.createElement('img', { src: '../static/images/two_dimension_code1.png', alt: '' }),
	                    React.createElement(
	                        'p',
	                        null,
	                        '获取更多最新活动消息'
	                    )
	                ),
	                React.createElement('div', { className: 'award_Tetail translateX' }),
	                React.createElement(
	                    'div',
	                    { className: 'award_img translateX' },
	                    React.createElement('img', { src: '../static/images/award1.png', alt: '' })
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'activity_rule' },
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold' },
	                        '1.深层洁净'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '清洁效果比普通洁面仪提升３倍'
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold p_top' },
	                        '２.改善痘痘肌'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '祛除老化角质,延缓肌肤衰老,恢复光滑细致,清除堵塞毛孔油脂,减少黑头形成'
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold p_top' },
	                        '３.去角质去黑头'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '深层洁净,让皮肤自由呼吸,从根本抑制痘痘生成'
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold p_top' },
	                        '４.细致毛孔排毒素'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '清洁+按摩,让皮肤恢复细致,快速有效清除皮肤有害物质'
	                    ),
	                    React.createElement(
	                        'p',
	                        { className: 'p_bold p_top' },
	                        '５.轻松卸妆'
	                    ),
	                    React.createElement(
	                        'p',
	                        null,
	                        '高效快速卸妆,安全无残留'
	                    )
	                )
	            );
	        }
	    }]);

	    return App;
	}(_BaseComponentClass.BaseComponent);

	// 开始渲染


	het.domReady(function () {
	    het.setTitle('免费领取洁面仪');
	    // 无路由方式
	    // ReactDOM.render(<App />, document.getElementById('ROOT'));

	    // 路由方式
	    ReactDOM.render(React.createElement(
	        Router,
	        { history: hashHistory },
	        React.createElement(Route, { path: '/:apply/:num/:date1/:date2', component: App })
	    ), document.getElementById('ROOT'));
	});

/***/ }
/******/ ]);